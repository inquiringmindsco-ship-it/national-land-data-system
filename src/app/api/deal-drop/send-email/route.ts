import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import path from 'path'

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'deal-drop.json')
    const drop = JSON.parse(readFileSync(filePath, 'utf8'))

    const { cycleLabel, totalListingsScanned, previewDeals, selectedDeals, report } = drop
    const avgScore = report?.avgScore ?? 'N/A'
    const operatorNote = report?.operatorNote ?? ''

    const resendKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.EMAIL_FROM ?? 'NLDS <deals@national-land-data-system.com>'
    const toEmail = process.env.EMAIL_TO ?? 'operator@porterful.com'

    if (!resendKey) {
      return NextResponse.json({
        sent: false, reason: 'no_resend_key', cycle: cycleLabel,
        deals: selectedDeals?.length ?? 0,
        message: 'Set RESEND_API_KEY env var to enable email delivery',
      })
    }

    const dealsList = (selectedDeals ?? previewDeals ?? []).slice(0, 5).map(
      (d: { address?: string; city?: string; state?: string; price?: number; score?: number }) => {
        const a = d.address ?? ''
        const c = d.city ?? ''
        const s = d.state ?? ''
        const p = typeof d.price === 'number' ? `$${d.price.toLocaleString()}` : 'TBD'
        const sc = d.score ?? 'N/A'
        return `• ${a}${c ? `, ${c}` : ''}${s ? `, ${s}` : ''} — ${p} | Score: ${sc}`
      }
    )

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:#e5e7eb;margin:0;padding:20px;">
<div style="max-width:600px;margin:0 auto;">
  <div style="background:#065f46;border-radius:12px 12px 0 0;padding:24px;text-align:center;">
    <h1 style="color:#6ee7b7;margin:0;">NLDS Deal Drop</h1>
    <p style="color:#a7f3d0;margin:4px 0 0;">${cycleLabel}</p>
  </div>
  <div style="background:#111;border:1px solid #1f2937;border-top:none;padding:24px;border-radius:0 0 12px 12px;">
    <div style="display:flex;gap:12px;margin-bottom:20px;">
      <div style="flex:1;background:#1a1a1a;border:1px solid #374151;border-radius:8px;padding:12px;text-align:center;">
        <div style="font-size:24px;font-weight:bold;color:#6ee7b7;">${totalListingsScanned ?? 0}</div>
        <div style="font-size:11px;color:#9ca3af;margin-top:2px;text-transform:uppercase;">Scanned</div>
      </div>
      <div style="flex:1;background:#1a1a1a;border:1px solid #374151;border-radius:8px;padding:12px;text-align:center;">
        <div style="font-size:24px;font-weight:bold;color:#6ee7b7;">${selectedDeals?.length ?? 0}</div>
        <div style="font-size:11px;color:#9ca3af;margin-top:2px;text-transform:uppercase;">Selected</div>
      </div>
      <div style="flex:1;background:#1a1a1a;border:1px solid #374151;border-radius:8px;padding:12px;text-align:center;">
        <div style="font-size:24px;font-weight:bold;color:#6ee7b7;">${avgScore}</div>
        <div style="font-size:11px;color:#9ca3af;margin-top:2px;text-transform:uppercase;">Avg Score</div>
      </div>
    </div>
    <div style="margin-top:16px;">${dealsList.map((d: string) => `<div style="background:#1a1a1a;border:1px solid #374151;border-radius:8px;padding:12px 14px;margin-bottom:8px;font-size:13px;color:#d1d5db;">${d}</div>`).join('')}</div>
    ${operatorNote ? `<div style="background:#064e3b;border:1px solid #065f46;border-radius:8px;padding:12px;font-size:13px;color:#a7f3d0;margin-top:16px;"><strong style="color:#6ee7b7;">Operator Note:</strong> ${operatorNote}</div>` : ''}
    <div style="text-align:center;margin-top:16px;">
      <a href="https://national-land-data-system.vercel.app" style="display:inline-block;background:#059669;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">View All Deals</a>
    </div>
  </div>
</div></body></html>`

    const { Resend } = await import('resend')
    const resend = new Resend(resendKey)
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[NLDS] ${cycleLabel} — ${selectedDeals?.length ?? 0} Deals Selected`,
      html,
    })

    if (error) return NextResponse.json({ sent: false, error }, { status: 500 })
    return NextResponse.json({ sent: true, to: toEmail, cycle: cycleLabel })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ sent: false, error: msg }, { status: 500 })
  }
}
