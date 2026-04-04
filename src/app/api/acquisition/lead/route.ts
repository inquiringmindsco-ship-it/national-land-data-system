import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// POST /api/acquisition/lead — submit a new lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      budget_cents,
      budget_display,
      interest_level,
      timeline,
      listing_id,
      listing_address,
      listing_price_cents,
      zip_code,
      deal_score,
      session_id,
      group_deal_id,
      preferred_role,
    } = body;

    // Basic validation
    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    if (!email?.trim() || !email.includes('@')) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    if (!interest_level) return NextResponse.json({ error: 'Interest level is required' }, { status: 400 });
    if (!budget_cents && budget_cents !== 0) return NextResponse.json({ error: 'Budget is required' }, { status: 400 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      budget_cents,
      budget_display: budget_display ?? null,
      interest_level,
      timeline: timeline ?? 'flexible',
      listing_id: listing_id ?? null,
      listing_address: listing_address ?? null,
      listing_price_cents: listing_price_cents ?? null,
      zip_code: zip_code ?? null,
      deal_score: deal_score ?? null,
      session_id: session_id ?? null,
      group_deal_id: group_deal_id ?? null,
      preferred_role: preferred_role ?? 'individual',
      status: 'new',
      source: group_deal_id ? 'group_deal' : 'deals_page',
      utm_source: body.utm_source ?? null,
      utm_medium: body.utm_medium ?? null,
      utm_campaign: body.utm_campaign ?? null,
    };

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from('nlds_acquisition_leads')
        .insert(leadData)
        .select('id')
        .single();

      if (error) {
        console.error('[acquisition/lead] Supabase error:', error);
        return NextResponse.json({ error: 'Could not save your info. Please try again.' }, { status: 500 });
      }

      // Log activity
      await supabase.from('nlds_lead_activity').insert({
        lead_id: data.id,
        activity_type: 'submitted_form',
        metadata: { interest_level, budget_display, listing_id, zip_code },
        actor: 'lead',
      });

      return NextResponse.json({ success: true, leadId: data.id, mode: 'supabase' });
    }

    // Standalone mode: log to console + return mock
    console.log('╔══════════════════════════════════════╗');
    console.log('║   NEW ACQUISITION LEAD — STANDALONE   ║');
    console.log('╠══════════════════════════════════════╣');
    console.log(`║ Name:    ${name.padEnd(29)}║`);
    console.log(`║ Email:   ${email.padEnd(29)}║`);
    console.log(`║ Budget:  ${(budget_display ?? String(budget_cents)).padEnd(29)}║`);
    console.log(`║ Interest:${interest_level.padEnd(29)}║`);
    console.log(`║ Listing: ${(listing_address ?? listing_id ?? 'none').substring(0, 29).padEnd(29)}║`);
    console.log(`║ Zip:     ${(zip_code ?? 'none').padEnd(29)}║`);
    console.log(`║ Score:   ${String(deal_score ?? '—').padEnd(29)}║`);
    console.log('╚══════════════════════════════════════╝');

    return NextResponse.json({ success: true, leadId: 'standalone-' + Date.now(), mode: 'standalone' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[acquisition/lead]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/acquisition/lead — list leads (operator only)
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? '';
  const token = auth.replace('Bearer ', '').trim();
  const secret = process.env.DASHBOARD_SECRET ?? process.env.CRON_SECRET;

  if (!secret || token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { searchParams } = req.nextUrl;
  const status = searchParams.get('status') ?? 'all';
  const limit = parseInt(searchParams.get('limit') ?? '50', 10);

  let query = supabase
    .from('nlds_acquisition_leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Aggregate stats
  const stats = {
    total: count ?? 0,
    byStatus: {} as Record<string, number>,
    byBudget: {} as Record<string, number>,
    byInterest: {} as Record<string, number>,
    byZip: {} as Record<string, number>,
    hotLeads: 0,
    avgBudget: 0,
  };

  let budgetSum = 0;
  for (const lead of (data ?? [])) {
    stats.byStatus[lead.status] = (stats.byStatus[lead.status] ?? 0) + 1;
    stats.byBudget[lead.budget_display ?? 'unknown'] = (stats.byBudget[lead.budget_display ?? 'unknown'] ?? 0) + 1;
    stats.byInterest[lead.interest_level] = (stats.byInterest[lead.interest_level] ?? 0) + 1;
    if (lead.zip_code) stats.byZip[lead.zip_code] = (stats.byZip[lead.zip_code] ?? 0) + 1;
    if (lead.interest_level === 'ready' || lead.interest_level === 'committed') stats.hotLeads++;
    budgetSum += lead.budget_cents ?? 0;
  }
  stats.avgBudget = count ? Math.round(budgetSum / count) : 0;

  return NextResponse.json({ leads: data, stats, mode: 'supabase' });
}
