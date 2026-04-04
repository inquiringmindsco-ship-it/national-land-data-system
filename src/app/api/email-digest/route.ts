import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'NLDS <deals@nlds.com>';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://national-land-data-system.vercel.app';

// Load the deal drop data
async function getDealDrop() {
  try {
    const res = await fetch(`${BASE_URL}/api/deal-drop`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json() as { drop?: unknown };
    return data.drop ?? null;
  } catch {
    return null;
  }
}

async function getAllUsersWithActiveAccess() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);

  const now = new Date().toISOString();
  const { data } = await supabase
    .from('nlds_active_access')
    .select('user_id, tier, expires_at, nlds_users(email)')
    .gt('expires_at', now) as {
      data: { user_id: string; tier: string; expires_at: string; nlds_users: { email: string } }[] | null
    };

  return data ?? [];
}

async function getAllEmailLeads() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from('nlds_acquisition_leads')
    .select('email, name, interest_level')
    .eq('status', 'new')
    .limit(500) as { data: { email: string; name: string }[] | null };
  return data ?? [];
}

function buildDigestHtml(dealDrop: {
  cycleLabel: string;
  totalListingsScanned: number;
  previewDeals: {
    listing: { address: string; city: string; state: string; price: number };
    score: { total: number; grade: string };
    oneLiner: string;
  }[];
  report: {
    avgScore: number;
    topZip: string;
    operatorNote: string;
  };
}) {
  const deals = dealDrop.previewDeals.slice(0, 3);
  const fmtPrice = (c: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c / 100);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000; color: #fff; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 20px; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
    .logo { font-size: 18px; font-weight: 900; color: #10b981; }
    .logo span { color: #fff; }
    .badge { background: #064e3b; color: #10b981; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px; }
    h1 { font-size: 26px; font-weight: 900; margin: 0 0 8px; color: #fff; }
    .meta { color: #6b7280; font-size: 13px; margin-bottom: 28px; }
    .deal-card { background: #0f0f0f; border: 1px solid #1f2937; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .deal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .deal-address { font-size: 16px; font-weight: 700; color: #fff; }
    .deal-city { font-size: 13px; color: #9ca3af; margin-top: 2px; }
    .score { font-size: 28px; font-weight: 900; color: #10b981; }
    .score-label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
    .deal-type { display: inline-block; background: #1f2937; color: #d1d5db; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; margin-bottom: 8px; }
    .deal-desc { font-size: 14px; color: #9ca3af; line-height: 1.6; }
    .cta-block { text-align: center; margin: 32px 0; }
    .cta { display: inline-block; background: #10b981; color: #000; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 8px; text-decoration: none; }
    .report-block { background: #0a1a14; border: 1px solid #065f46; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .report-title { font-size: 12px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
    .report-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; }
    .report-key { color: #6b7280; }
    .report-val { color: #d1d5db; font-weight: 600; }
    .operator-note { background: #1c1200; border: 1px solid #92400e; border-radius: 8px; padding: 12px; font-size: 13px; color: #fbbf24; line-height: 1.6; margin-top: 12px; }
    .footer { text-align: center; color: #4b5563; font-size: 12px; margin-top: 40px; border-top: 1px solid #1f2937; padding-top: 24px; }
    .footer a { color: #10b981; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">NLDS<span>™</span></div>
      <div class="badge">${dealDrop.cycleLabel}</div>
    </div>

    <h1>Top Land Deals This Week</h1>
    <div class="meta">
      ${dealDrop.totalListingsScanned.toLocaleString()} properties scanned · Avg score ${dealDrop.report.avgScore}/100
    </div>

    ${deals.map(deal => `
    <div class="deal-card">
      <div class="deal-header">
        <div>
          <div class="deal-address">${deal.listing.address}</div>
          <div class="deal-city">${deal.listing.city}, ${deal.listing.state}</div>
        </div>
        <div style="text-align:right">
          <div class="score">${deal.score.total}</div>
          <div class="score-label">${deal.score.grade}</div>
        </div>
      </div>
      <div class="deal-desc">${deal.oneLiner}</div>
      ${deal.listing.price ? `<div style="margin-top:10px;font-size:18px;font-weight:800;color:#fff">${fmtPrice(deal.listing.price)}</div>` : ''}
    </div>
    `).join('')}

    <div class="report-block">
      <div class="report-title">Cycle Intelligence</div>
      <div class="report-row"><span class="report-key">Avg score</span><span class="report-val">${dealDrop.report.avgScore}/100</span></div>
      <div class="report-row"><span class="report-key">Top zip</span><span class="report-val">${dealDrop.report.topZip}</span></div>
      <div class="operator-note">💡 <strong>Analyst note:</strong> ${dealDrop.report.operatorNote}</div>
    </div>

    <div class="cta-block">
      <a href="${BASE_URL}/deals" class="cta">See All Deals →</a>
    </div>

    <div class="footer">
      You&apos;re receiving this because you unlocked NLDS access.<br>
      <a href="${BASE_URL}/unlock">Manage access</a> · <a href="${BASE_URL}/learn">Learn how land deals work</a>
    </div>
  </div>
</body>
</html>
`;
}

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.warn(`[email-digest] RESEND_API_KEY not set — would send to ${to}: ${subject}`);
    return { skipped: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend ${res.status}: ${err}`);
  }

  const data = await res.json() as { id: string };
  console.log(`[email-digest] Sent to ${to}: ${data.id}`);
  return { id: data.id };
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET ?? '';

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dealDrop = await getDealDrop();
  if (!dealDrop) {
    return NextResponse.json({ error: 'No deal drop data' }, { status: 500 });
  }

  const html = buildDigestHtml(dealDrop as Parameters<typeof buildDigestHtml>[0]);
  const cycleLabel = (dealDrop as { cycleLabel: string }).cycleLabel;
  const subject = `🏠 ${cycleLabel} — Top Land Deals in St. Louis`;

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Send to paying users with active access
  const activeUsers = await getAllUsersWithActiveAccess();
  for (const user of activeUsers) {
    try {
      const email = user.nlds_users?.email;
      if (!email) continue;
      await sendEmail(email, subject, html);
      sent++;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`user ${user.user_id}: ${msg}`);
    }
  }

  // Send to email leads (prospects)
  const leads = await getAllEmailLeads();
  for (const lead of leads) {
    try {
      if (!lead.email) continue;
      await sendEmail(lead.email, subject, html);
      sent++;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`lead ${lead.email}: ${msg}`);
    }
  }

  console.log(`[email-digest] Complete — sent=${sent}, skipped=${skipped}, errors=${errors.length}`);
  return NextResponse.json({
    sent,
    skipped,
    errors: errors.slice(0, 10),
    cycle: cycleLabel,
  });
}
