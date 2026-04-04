import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ============================================================
// POST /api/analytics
// Tracks all user events: page views, deal clicks, unlocks, zips
// In production: write to Supabase. Standalone mode: in-memory.
// ============================================================

type EventType =
  | 'page_view'
  | 'listing_view'
  | 'listing_expand'
  | 'unlock_view'
  | 'unlock_click'
  | 'unlock_complete'
  | 'zip_view'
  | 'dealtype_view'
  | 'search'
  | 'signal_view'
  | 'email_click'
  | 'deactivated';

interface AnalyticsPayload {
  event: EventType;
  sessionId?: string;
  listingId?: string;
  listingAddress?: string;
  zip?: string;
  dealType?: string;
  signal?: string;
  page?: string;
  referrer?: string;
  query?: string;
  tier?: string;
  score?: number;
  city?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  duration?: number; // seconds on page
  metadata?: Record<string, unknown>;
}

// In-memory store (resets on cold start — only for standalone mode)
const inMemoryEvents: Array<AnalyticsPayload & { timestamp: string; ipHash: string }> = [];
const MAX_IN_MEMORY = 1000;

function hashIP(ip: string): string {
  // Simple hash for rate limiting — not reversible
  let hash = 0;
  const str = ip + 'nlds-salt-2026';
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function isRateLimited(ipHash: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const maxEvents = 100;    // per minute per IP

  const recent = inMemoryEvents.filter(
    e => e.ipHash === ipHash && now - new Date(e.timestamp).getTime() < windowMs
  );

  if (recent.length >= maxEvents) return true;

  // Clean old entries periodically
  if (inMemoryEvents.length > MAX_IN_MEMORY * 2) {
    const cutoff = now - windowMs;
    inMemoryEvents.splice(0, inMemoryEvents.findIndex(e => new Date(e.timestamp).getTime() > cutoff));
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body: AnalyticsPayload = await req.json();
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
             ?? req.headers.get('x-real-ip') ?? '127.0.0.1';
    const ipHash = hashIP(ip);

    if (isRateLimited(ipHash)) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
    }

    const event: AnalyticsPayload & { timestamp: string; ipHash: string } = {
      ...body,
      timestamp: new Date().toISOString(),
      ipHash,
    };

    // Try Supabase first
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('nlds_events').insert({
          event_type: event.event,
          session_id: event.sessionId,
          ip_hash: ipHash,
          event_data: {
            listing_id: event.listingId,
            listing_address: event.listingAddress,
            zip: event.zip,
            deal_type: event.dealType,
            signal: event.signal,
            page: event.page,
            referrer: event.referrer,
            query: event.query,
            tier: event.tier,
            score: event.score,
            city: event.city,
            utm_source: event.utmSource,
            utm_medium: event.utmMedium,
            utm_campaign: event.utmCampaign,
            duration: event.duration,
            metadata: event.metadata,
          },
        });
        return NextResponse.json({ ok: true, mode: 'supabase' });
      } catch {
        // Fall through to in-memory
      }
    }

    // Standalone: store in memory
    inMemoryEvents.push(event);
    return NextResponse.json({ ok: true, mode: 'standalone', stored: inMemoryEvents.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET: Return analytics summary (for internal use / operator dashboard)
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? '';
  const token = auth.replace('Bearer ', '').trim();
  const dashboardSecret = process.env.DASHBOARD_SECRET ?? 'nlds-dashboard-secret';

  if (token !== dashboardSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Standalone summary
    const now = Date.now();
    const window = 7 * 24 * 60 * 60 * 1000; // 7 days
    const recent = inMemoryEvents.filter(e => now - new Date(e.timestamp).getTime() < window);

    const byType: Record<string, number> = {};
    for (const e of recent) { byType[e.event] = (byType[e.event] ?? 0) + 1; }

    const byZip: Record<string, number> = {};
    for (const e of recent) { if (e.zip) { byZip[e.zip] = (byZip[e.zip] ?? 0) + 1; } }

    return NextResponse.json({
      mode: 'standalone',
      totalEvents: recent.length,
      byType,
      topZips: Object.entries(byZip).sort((a, b) => b[1] - a[1]).slice(0, 10),
      oldestEvent: recent[0]?.timestamp ?? null,
      newestEvent: recent[recent.length - 1]?.timestamp ?? null,
    });
  }

  // Supabase query
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const { data: events } = await supabase
    .from('nlds_events')
    .select('event_type, event_data, created_at')
    .gte('created_at', weekAgo.toISOString());

  const byType: Record<string, number> = {};
  const byZip: Record<string, number> = {};
  const byPage: Record<string, number> = {};
  let unlockCompletes = 0;

  for (const e of (events ?? [])) {
    const t = e.event_type as string;
    byType[t] = (byType[t] ?? 0) + 1;
    const d = e.event_data as Record<string, unknown> | null;
    if (d?.zip) byZip[d.zip as string] = (byZip[d.zip as string] ?? 0) + 1;
    if (d?.page) byPage[d.page as string] = (byPage[d.page as string] ?? 0) + 1;
    if (t === 'unlock_complete') unlockCompletes++;
  }

  const { data: unlockUsers } = await supabase
    .from('nlds_users')
    .select('email, unlock_count, total_paid_cents, created_at')
    .order('created_at', { ascending: false });

  const revenue = (unlockUsers ?? []).reduce((s, u) => s + (u.total_paid_cents ?? 0), 0);
  const totalUnlocks = (unlockUsers ?? []).reduce((s, u) => s + (u.unlock_count ?? 0), 0);
  const activeUnlocks = await supabase
    .from('nlds_active_access')
    .select('id', { count: 'exact', head: true })
    .gt('expires_at', now.toISOString());

  return NextResponse.json({
    mode: 'supabase',
    period: '7d',
    totalEvents: events?.length ?? 0,
    byType,
    topZips: Object.entries(byZip).sort((a, b) => b[1] - a[1]).slice(0, 10),
    topPages: Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 10),
    revenue: { cents: revenue, formatted: `$${(revenue / 100).toFixed(2)}` },
    unlockCompletes,
    totalUsers: unlockUsers?.length ?? 0,
    totalUnlocks,
    activeUnlocks: activeUnlocks.count ?? 0,
  });
}
