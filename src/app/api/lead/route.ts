import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export async function POST(req: NextRequest) {
  const { email, name, source = 'deals_page', intent = 'browsing' } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = url && key ? createClient(url, key) : null;

  let sessionId = generateSessionId();
  let existingSession = false;

  if (supabase) {
    // Check for existing session/lead by email
    const { data: existing } = await supabase
      .from('nlds_acquisition_leads')
      .select('id, email, session_id, source')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle() as { data: { id: string; email: string; session_id: string; source: string } | null };

    if (existing) {
      sessionId = existing.session_id ?? sessionId;
      existingSession = true;

      // Update last contact
      await supabase.from('nlds_acquisition_leads').update({
        last_contact_at: new Date().toISOString(),
        source: existing.source !== 'deals_page' ? existing.source : source,
      }).eq('id', existing.id);
    } else {
      // Create new lead
      const { data: newLead } = await supabase
        .from('nlds_acquisition_leads')
        .insert({
          email: email.toLowerCase().trim(),
          name: name ?? '',
          source,
          interest_level: intent,
          session_id: sessionId,
          status: 'new',
        } as Record<string, unknown>)
        .select('session_id')
        .single() as { data: { session_id: string } | null };

      if (newLead?.session_id) sessionId = newLead.session_id;

      // Record event
      await supabase.from('nlds_events').insert({
        user_id: null,
        event_type: 'lead_captured',
        event_data: { email: email.toLowerCase().trim(), name, source, intent },
      } as Record<string, unknown>);
    }
  }

  return NextResponse.json({
    success: true,
    sessionId,
    existingSession,
    message: existingSession
      ? 'Welcome back. We\'ll keep you updated on new deals.'
      : 'You\'re on the list. We\'ll send you the best deals weekly.',
  });
}
