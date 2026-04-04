import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'NLDS-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// GET /api/referral?session_id=xxx
// Returns or creates a referral code for the session
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') ?? '';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://national-land-data-system.vercel.app';

  const supabase = getSupabase();

  let referralCode = '';
  let referralCount = 0;
  let dealsUnlocked = 0;
  let nextThreshold = 2;
  let referralLink = '';

  if (supabase && sessionId) {
    // Find lead by session_id
    const { data: lead } = await supabase
      .from('nlds_acquisition_leads')
      .select('id, referral_code, referral_count, deals_unlocked')
      .eq('session_id', sessionId)
      .maybeSingle() as {
        data: { id: string; referral_code: string; referral_count: number; deals_unlocked: number } | null
      };

    if (lead) {
      if (lead.referral_code) {
        referralCode = lead.referral_code;
      } else {
        referralCode = generateReferralCode();
        await supabase.from('nlds_acquisition_leads').update({
          referral_code: referralCode,
        }).eq('id', lead.id);
      }
      referralCount = lead.referral_count ?? 0;
      dealsUnlocked = lead.deals_unlocked ?? 0;
      nextThreshold = 2 - (referralCount % 2);
    } else {
      referralCode = generateReferralCode();
      const { data: newLead } = await supabase
        .from('nlds_acquisition_leads')
        .insert({
          session_id: sessionId,
          email: '',
          name: '',
          source: 'referral_system',
          referral_code: referralCode,
          referral_count: 0,
          deals_unlocked: 0,
        } as Record<string, unknown>)
        .select('referral_code')
        .single() as { data: { referral_code: string } | null };
      referralCode = newLead?.referral_code ?? referralCode;
    }
  } else {
    referralCode = generateReferralCode();
  }

  referralLink = `${baseUrl}/referral?code=${referralCode}`;

  return NextResponse.json({
    code: referralCode,
    link: referralLink,
    referralCount,
    dealsUnlocked,
    nextThreshold,
    cta: referralCount >= 2
      ? 'You\'ve unlocked bonus deals. Keep referring to unlock more.'
      : `Refer ${nextThreshold} more friend${nextThreshold > 1 ? 's' : ''} to unlock 3 more deals.`,
  });
}

// POST /api/referral/claim
// Claim a referral using a code
export async function POST(req: NextRequest) {
  const { code, email, name } = await req.json();

  if (!code || !email) {
    return NextResponse.json({ error: 'Code and email required' }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    // If no DB, still return success (graceful degradation)
    return NextResponse.json({ success: true, message: 'Referral recorded.' });
  }

  // Find the referrer by code
  const { data: referrer } = await supabase
    .from('nlds_acquisition_leads')
    .select('id, email, referral_count, deals_unlocked')
    .eq('referral_code', code.toUpperCase().trim())
    .maybeSingle() as {
      data: { id: string; email: string; referral_count: number; deals_unlocked: number } | null
    };

  if (!referrer) {
    return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 });
  }

  // Check if already referred this email
  const { data: existing } = await supabase
    .from('nlds_acquisition_leads')
    .select('id')
    .eq('email', email.toLowerCase().trim())
    .eq('referred_by', referrer.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ success: true, message: 'Already credited.' });
  }

  // Credit referrer
  const newCount = (referrer.referral_count ?? 0) + 1;
  const newDealsUnlocked = referrer.deals_unlocked ?? 0;
  const bonusDeals = Math.floor(newCount / 2) * 3 - Math.floor((newCount - 1) / 2) * 3;

  await supabase.from('nlds_acquisition_leads').update({
    referral_count: newCount,
    deals_unlocked: newDealsUnlocked + bonusDeals,
  }).eq('id', referrer.id);

  // Create or update referee
  const { data: referee } = await supabase
    .from('nlds_acquisition_leads')
    .select('id')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle() as { data: { id: string } | null };

  if (referee) {
    await supabase.from('nlds_acquisition_leads').update({
      referred_by: referrer.id,
      last_contact_at: new Date().toISOString(),
    }).eq('id', referee.id);
  } else {
    await supabase.from('nlds_acquisition_leads').insert({
      email: email.toLowerCase().trim(),
      name: name ?? '',
      source: 'referral',
      referral_code: generateReferralCode(),
      referral_count: 0,
      deals_unlocked: 0,
      referred_by: referrer.id,
      interest_level: 'browsing',
      status: 'new',
    } as Record<string, unknown>);
  }

  // Record event
  await supabase.from('nlds_events').insert({
    user_id: referrer.id,
    event_type: 'referral_signup',
    event_data: { referee_email: email, code, new_count: newCount },
  } as Record<string, unknown>);

  return NextResponse.json({
    success: true,
    message: `Referred by ${referrer.email}. You&apos;ve been credited.`,
    referralCount: newCount,
    dealsUnlocked: newDealsUnlocked,
  });
}
