import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, email, city = 'st-louis' } = await req.json();

    if (!sessionId && !email) {
      return NextResponse.json({ hasAccess: false, error: 'sessionId or email required' }, { status: 400 });
    }

    // Standalone mode — client-side unlock via localStorage
    // Full server-side verification with Supabase when env vars are set
    const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

    if (!hasSupabase) {
      // Standalone: use client-side session-based unlock
      return NextResponse.json({
        hasAccess: true,
        tier: 'standard',
        expiresAt: null,
        city,
        mode: 'standalone',
      });
    }

    // Supabase mode
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    let expiresAt: string | null = null;
    let tier: string | null = null;

    if (sessionId) {
      const { data } = await supabase
        .from('nlds_unlocks')
        .select('expires_at, tier, active, city')
        .eq('stripe_session_id', sessionId)
        .eq('active', true)
        .limit(1);

      const unlock = (data as Array<{ expires_at: string; tier: string; active: boolean; city: string }> | null)?.[0];
      if (unlock && unlock.city === city) {
        expiresAt = unlock.expires_at;
        tier = unlock.tier;
      }
    }

    if (!expiresAt && email) {
      const { data: userData } = await supabase
        .from('nlds_users').select('id').eq('email', email).single();

      if (userData) {
        const uid = (userData as { id: string }).id;
        const { data: active } = await supabase
          .from('nlds_active_access')
          .select('expires_at, tier')
          .eq('user_id', uid)
          .gt('expires_at', new Date().toISOString())
          .limit(1);

        const row = (active as Array<{ expires_at: string; tier: string }> | null)?.[0];
        if (row) {
          expiresAt = row.expires_at;
          tier = row.tier;
        }
      }
    }

    const hasAccess = !!expiresAt && new Date(expiresAt) > new Date();

    return NextResponse.json({ hasAccess, tier, expiresAt, city, mode: 'supabase' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[verify-unlock]', message);
    return NextResponse.json({ hasAccess: false, error: message }, { status: 500 });
  }
}
