import { NextRequest, NextResponse } from 'next/server';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { runDealDropCycle, saveDealDrop, generateEmailDigest, loadDealDrop } from '@/lib/proprietary/deal-drop';

// ============================================================
// POST /api/deal-drop/run
// CRON endpoint — runs the full autonomous deal drop cycle
//
// Frequency: daily or weekly (set via Vercel Cron or GitHub Actions)
// Auth: Bearer token in Authorization header
//
// Example Vercel cron (vercel.json):
// { "path": "/api/deal-drop/run", "schedule": "0 9 * * 1" }
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization') ?? '';
    const token = authHeader.replace('Bearer ', '').trim();
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && token !== cronSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── Step 1: Run deal selection ──
    const drop = runDealDropCycle(STLOUIS_LISTINGS);

    // ── Step 2: Persist deal drop ──
    await saveDealDrop(drop);

    // ── Step 3: Generate email digest ──
    const email = generateEmailDigest(drop);

    // ── Step 4: Send email digest to all active users ──
    const emailResult = await sendEmailDigest(drop, email);

    return NextResponse.json({
      success: true,
      dropId: drop.id,
      cycleLabel: drop.cycleLabel,
      generatedAt: drop.generatedAt,
      totalScanned: drop.totalListingsScanned,
      selectedCount: drop.selectedDeals.length,
      previewCount: drop.previewDeals.length,
      report: drop.report,
      emailsSent: emailResult.sent,
      emailsQueued: emailResult.queued,
      operatorNote: drop.report.operatorNote,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[deal-drop/run]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET: Returns current active deal drop (for /deals page)
export async function GET() {
  try {
    const drop = await loadDealDrop();

    if (!drop) {
      // Generate fresh if no saved drop
      const fresh = runDealDropCycle(STLOUIS_LISTINGS);
      await saveDealDrop(fresh);
      return NextResponse.json({ drop: fresh, source: 'generated' });
    }

    return NextResponse.json({ drop, source: 'cache' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[deal-drop]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ──────────────────────────────────────────────────────────────
// EMAIL DISPATCH — sends digest to all active unlock users
// ──────────────────────────────────────────────────────────────

async function sendEmailDigest(
  drop: ReturnType<typeof runDealDropCycle>,
  email: { subject: string; html: string; text: string }
): Promise<{ sent: number; queued: number }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Standalone mode: log to console
    console.log('╔══════════════════════════════════════╗');
    console.log('║   AUTONOMOUS DEAL DROP — EMAIL QUEUE  ║');
    console.log('╠══════════════════════════════════════╣');
    console.log(`║ Cycle:   ${drop.cycleLabel.padEnd(29)}║`);
    console.log(`║ Deals:    ${drop.selectedDeals.length} selected / ${drop.totalListingsScanned} scanned`.padEnd(49) + '║');
    console.log(`║ AvgScore: ${drop.report.avgScore}/100`.padEnd(49) + '║');
    console.log(`║ TopZip:   ${drop.report.topZip}`.padEnd(49) + '║');
    console.log(`║ Operator: ${drop.report.operatorNote.substring(0, 29).padEnd(29)}║`);
    console.log('╠══════════════════════════════════════╣');
    console.log(`║ EMAIL WOULD SEND TO: all unlocked users`.padEnd(49) + '║');
    console.log(`║ Subject:  ${email.subject.substring(0, 30).padEnd(30)}║`);
    console.log('╠══════════════════════════════════════╣');
    drop.previewDeals.forEach((d, i) => {
      console.log(`║ #${i + 1} ${d.headline.substring(0, 35).padEnd(35)}║`);
    });
    console.log('╚══════════════════════════════════════╝');
    return { sent: 0, queued: 0 };
  }

  // Production: query Supabase for active users and send via email provider
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get users who unlocked in last 90 days
  const { data: users } = await supabase
    .from('nlds_users')
    .select('id, email, name')
    .gte('last_access_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
    .order('last_access_at', { ascending: false });

  if (!users || users.length === 0) {
    console.log('[deal-drop] No active users to email');
    return { sent: 0, queued: 0 };
  }

  // Integrate your email provider here (Resend, SendGrid, Loops, etc.)
  // Example pattern:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // for (const user of users) {
  //   await resend.emails.send({
  //     from: 'NLDS <deals@nationallanddata.com>',
  //     to: user.email,
  //     subject: email.subject,
  //     html: email.html,
  //   });
  //   await supabase.from('nlds_digest_log').insert({
  //     user_id: user.id, email: user.email,
  //     digest_type: 'weekly', status: 'sent',
  //     digest_week_start: drop.id,
  //   });
  // }

  console.log(`[deal-drop] Would email ${users.length} users: "${email.subject}"`);
  return { sent: 0, queued: users.length };
}
