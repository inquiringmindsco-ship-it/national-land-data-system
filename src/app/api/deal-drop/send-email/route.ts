import { NextRequest, NextResponse } from 'next/server';
import { STLOUIS_LISTINGS } from '@/data/stlouis-listings';
import { runDealDropCycle, saveDealDrop, generateEmailDigest } from '@/lib/proprietary/deal-drop';

// POST — manually trigger email digest to configured recipients
export async function POST(req: NextRequest) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailList = process.env.NLDS_EMAIL_LIST;

    if (!resendApiKey || !emailList) {
      return NextResponse.json({ error: 'Resend API key or email list not configured' }, { status: 500 });
    }

    // Run deal drop
    const drop = runDealDropCycle(STLOUIS_LISTINGS);
    await saveDealDrop(drop);
    const email = generateEmailDigest(drop);

    // Send via Resend
    const { Resend } = require('resend');
    const resend = new Resend(resendApiKey);
    const recipients = emailList.split(',').map(e => e.trim()).filter(Boolean);

    let sent = 0;
    const errors: string[] = [];

    for (const to of recipients) {
      try {
        await resend.emails.send({
          from: 'NLDS <noreply@nationallanddata.com>',
          to,
          subject: email.subject,
          html: email.html,
        });
        sent++;
      } catch (err: any) {
        errors.push(`${to}: ${err.message}`);
      }
    }

    return NextResponse.json({
      success: true,
      dropId: drop.id,
      cycleLabel: drop.cycleLabel,
      emailsSent: sent,
      recipients,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
