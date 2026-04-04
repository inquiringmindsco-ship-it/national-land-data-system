import { NextRequest, NextResponse } from 'next/server';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { computeOpportunityScore } from '@/lib/proprietary/parcel-intelligence';
import { detectEmergingHotspots, generateMarketReport } from '@/lib/proprietary/market-intelligence';
import { runDealDropCycle, loadDealDrop } from '@/lib/proprietary/deal-drop';

// ============================================================
// GET /api/system-status
// Daily check — revenue readiness, email status, user activity,
// system health. Called by operator or cron monitoring.
// Authorization: Bearer <DASHBOARD_SECRET>
// ============================================================

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? '';
  const token = auth.replace('Bearer ', '').trim();
  const secret = process.env.DASHBOARD_SECRET ?? process.env.CRON_SECRET;

  if (!secret || token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // ── System health ──
  const stripeKey = !!process.env.STRIPE_SECRET_KEY;
  const webhookSecret = !!process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseConfigured = !!(supabaseUrl && supabaseKey);
  const baseUrl = !!process.env.NEXT_PUBLIC_BASE_URL;

  const systemHealth = {
    status: stripeKey && baseUrl ? 'operational' : 'partial',
    stripe: stripeKey ? 'configured' : 'MISSING',
    stripeWebhook: webhookSecret ? 'configured' : 'MISSING',
    supabase: supabaseConfigured ? 'configured' : 'not configured',
    baseUrl: baseUrl ? (process.env.NEXT_PUBLIC_BASE_URL ?? 'set') : 'MISSING',
  };

  // ── Revenue readiness ──
  const canAcceptPayments = stripeKey && baseUrl;
  const canSendEmail = !!(process.env.RESEND_API_KEY ?? process.env.SENDGRID_API_KEY ?? process.env.LOOPS_API_KEY);

  // ── Current deal drop ──
  let dealDrop = await loadDealDrop();
  if (!dealDrop) {
    dealDrop = runDealDropCycle(STLOUIS_LISTINGS);
  }

  const cycleAge = Math.round((Date.now() - new Date(dealDrop.generatedAt).getTime()) / (1000 * 60 * 60 * 24)); // days

  // ── Market snapshot ──
  const hotspots = detectEmergingHotspots(STLOUIS_LISTINGS, STLOUIS_LISTINGS);
  const marketReport = generateMarketReport(STLOUIS_LISTINGS, STLOUIS_LISTINGS);

  // ── Supabase analytics ──
  let revenue = { cents: 0, users: 0, unlocks: 0, activeUnlocks: 0 };
  let recentActivity = { events7d: 0, pageViews7d: 0, unlocks7d: 0 };

  if (supabaseUrl && supabaseKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      const [{ data: users }, { data: activeAccess }, { count: eventCount }, { count: pageViewCount }, { count: unlockCount }] = await Promise.all([
        supabase.from('nlds_users').select('id, total_paid_cents', { count: 'exact' }),
        supabase.from('nlds_active_access').select('id', { count: 'exact' }).gt('expires_at', new Date().toISOString()),
        supabase.from('nlds_events').select('id', { count: 'exact' }).gte('created_at', weekAgo),
        supabase.from('nlds_events').select('id', { count: 'exact' }).eq('event_type', 'page_view').gte('created_at', weekAgo),
        supabase.from('nlds_events').select('id', { count: 'exact' }).eq('event_type', 'unlock_complete').gte('created_at', weekAgo),
      ]);

      const totalCents = (users ?? []).reduce((s: number, u: Record<string, unknown>) => s + ((u.total_paid_cents as number) ?? 0), 0);
      revenue = { cents: totalCents, users: users?.length ?? 0, unlocks: (users ?? []).reduce((s: number, u: Record<string, unknown>) => s + ((u.unlock_count as number) ?? 0), 0), activeUnlocks: activeAccess?.length ?? 0 };
      recentActivity = { events7d: eventCount ?? 0, pageViews7d: pageViewCount ?? 0, unlocks7d: unlockCount ?? 0 };
    } catch {
      // Supabase not accessible
    }
  }

  // ── Deal quality assessment ──
  const avgScoreAll = Math.round(
    STLOUIS_LISTINGS.reduce((s, l) => s + computeOpportunityScore(l, STLOUIS_LISTINGS, 'investor').total, 0) / STLOUIS_LISTINGS.length
  );

  const dealQuality:
    | 'exceptional'
    | 'strong'
    | 'normal'
    | 'weak' =
    avgScoreAll >= 80 ? 'exceptional'
    : avgScoreAll >= 70 ? 'strong'
    : avgScoreAll >= 55 ? 'normal'
    : 'weak';

  const emailRecommendation =
    dealQuality === 'exceptional' || dealQuality === 'strong'
      ? 'SEND — high-quality cycle, strong deals'
      : dealQuality === 'normal'
      ? 'SEND — normal cycle, proceed as usual'
      : 'REVIEW — below-average scores, operator review recommended';

  // ── Deployment readiness ──
  const deploymentReadiness = {
    payments_live: canAcceptPayments,
    email_live: canSendEmail,
    analytics_live: supabaseConfigured,
    can_deploy: !!process.env.NEXT_PUBLIC_BASE_URL,
    blockers: [
      !process.env.NEXT_PUBLIC_BASE_URL ? 'NEXT_PUBLIC_BASE_URL not set' : null,
      !process.env.STRIPE_SECRET_KEY ? 'STRIPE_SECRET_KEY not set' : null,
    ].filter(Boolean),
  };

  const response = {
    generatedAt: new Date().toISOString(),
    system: {
      health: systemHealth,
      revenueReadiness: {
        canAcceptPayments,
        canSendEmail,
        stripeConfigured: stripeKey,
        emailProviderConfigured: canSendEmail,
      },
    },
    dealDrop: {
      id: dealDrop.id,
      cycleLabel: dealDrop.cycleLabel,
      generatedAt: dealDrop.generatedAt,
      cycleAgeDays: cycleAge,
      totalScanned: dealDrop.totalListingsScanned,
      selectedCount: dealDrop.selectedDeals.length,
      previewCount: dealDrop.previewDeals.length,
      needsRefresh: cycleAge >= 7,
    },
    revenue: {
      total: revenue.cents > 0 ? `$${(revenue.cents / 100).toFixed(2)}` : '$0.00',
      totalCents: revenue.cents,
      totalUsers: revenue.users,
      totalUnlocks: revenue.unlocks,
      activeUnlocks: revenue.activeUnlocks,
    },
    activity: {
      events7d: recentActivity.events7d,
      pageViews7d: recentActivity.pageViews7d,
      unlockCompletes7d: recentActivity.unlocks7d,
      conversionRate: recentActivity.pageViews7d > 0
        ? `${((recentActivity.unlocks7d / recentActivity.pageViews7d) * 100).toFixed(1)}%`
        : 'N/A',
    },
    market: {
      avgDealScore: avgScoreAll,
      dealQuality,
      topZip: marketReport.topHotspot.zip,
      topZipScore: marketReport.topHotspot.overallScore,
      emergingZonesCount: marketReport.emergingZones.length,
      emailRecommendation,
    },
    deployment: deploymentReadiness,
    nextSteps: [
      !canAcceptPayments ? '→ Add Stripe keys to activate payments' : '✓ Payments ready',
      !canSendEmail ? '→ Add email provider key to activate broadcasts' : '✓ Email ready',
      !supabaseConfigured ? '→ Add Supabase to activate user tracking + revenue dashboard' : '✓ Analytics ready',
      deploymentReadiness.can_deploy ? '→ Ready to deploy to Vercel' : '→ Set BASE_URL to enable deployment',
      cycleAge >= 7 ? '→ Deal drop is 7+ days old — trigger new cycle via POST /api/deal-drop/run' : null,
    ].filter(Boolean),
  };

  return NextResponse.json(response);
}
