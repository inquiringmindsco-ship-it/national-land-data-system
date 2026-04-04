-- ============================================================
-- NLDS Revenue System — Supabase Schema
-- No subscriptions. Access = time-window unlock.
-- ============================================================

-- Users who purchase or sign up
CREATE TABLE IF NOT EXISTS public.nlds_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_access_at TIMESTAMPTZ,
  unlock_count INTEGER DEFAULT 0,
  total_paid_cents INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

-- Individual unlock purchases
CREATE TABLE IF NOT EXISTS public.nlds_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.nlds_users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('supporter', 'standard', 'patron', 'founder')),
  price_cents INTEGER NOT NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  access_hours INTEGER NOT NULL,          -- 48, 72, 168, 720
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  redeemed_at TIMESTAMPTZ,
  active BOOLEAN DEFAULT TRUE,
  city TEXT DEFAULT 'st-louis',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Current active unlock per user (denormalized for fast lookups)
CREATE TABLE IF NOT EXISTS public.nlds_active_access (
  user_id UUID PRIMARY KEY REFERENCES public.nlds_users(id) ON DELETE CASCADE,
  unlock_id UUID REFERENCES public.nlds_unlocks(id),
  tier TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  last_refreshed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Top Deals cache (auto-generated weekly)
CREATE TABLE IF NOT EXISTS public.nlds_top_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL DEFAULT 'st-louis',
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  deal_rank INTEGER NOT NULL CHECK (deal_rank BETWEEN 1 AND 5),
  listing_id TEXT NOT NULL,
  listing_address TEXT NOT NULL,
  listing_zip TEXT,
  listing_price_cents INTEGER,
  opportunity_score INTEGER,
  deal_type TEXT,
  strategic_insight TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(city, week_start, deal_rank)
);

-- Email digest log
CREATE TABLE IF NOT EXISTS public.nlds_digest_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.nlds_users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  digest_week_start DATE,
  digest_type TEXT DEFAULT 'weekly' CHECK (digest_type IN ('weekly', 'unlock', 'welcome')),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'bounced', 'failed'))
);

-- Analytics events
CREATE TABLE IF NOT EXISTS public.nlds_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.nlds_users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,  -- 'unlock_view', 'unlock_purchase', 'search', 'listing_view', 'deals_page_view'
  event_data JSONB DEFAULT '{}',
  ip_hash TEXT,              -- hashed IP for rate limiting
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE public.nlds_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nlds_unlocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nlds_active_access ENABLE ROW LEVEL SECURITY;

-- Users can see/edit their own data
CREATE POLICY "Users can view own profile"
  ON public.nlds_users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.nlds_users FOR UPDATE
  USING (auth.uid() = id);

-- Unlocks: users can view their own
CREATE POLICY "Users can view own unlocks"
  ON public.nlds_unlocks FOR SELECT
  USING (auth.uid() = user_id);

-- Active access: public to check (for client-side gate)
CREATE POLICY "Active access check is public"
  ON public.nlds_active_access FOR SELECT
  USING (true);

-- Top deals: public read
CREATE POLICY "Top deals are public"
  ON public.nlds_top_deals FOR SELECT
  USING (true);

-- Analytics: insert only, no deletes
CREATE POLICY "Analytics insert"
  ON public.nlds_events FOR INSERT
  WITH CHECK (true);

-- ============================================================
-- Helper Functions
-- ============================================================

-- Check if an unlock is currently active for a given user
CREATE OR REPLACE FUNCTION public.has_active_unlock(p_user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.nlds_active_access
    WHERE user_id = p_user_id
    AND expires_at > NOW()
  );
$$ LANGUAGE SQL STABLE;

-- Get active unlock for user (null if expired)
CREATE OR REPLACE FUNCTION public.get_active_unlock(p_user_id UUID)
RETURNS public.nlds_active_access AS $$
  SELECT * FROM public.nlds_active_access
  WHERE user_id = p_user_id
  AND expires_at > NOW()
  LIMIT 1;
$$ LANGUAGE SQL STABLE;

-- Refresh active access when a new unlock is created
CREATE OR REPLACE FUNCTION public.refresh_active_access(p_unlock_id UUID)
RETURNS VOID AS $$
  DECLARE
    v_unlock RECORD;
  BEGIN
    SELECT u.user_id, u.id, u.tier, u.expires_at
    INTO v_unlock
    FROM public.nlds_unlocks u
    WHERE u.id = p_unlock_id AND u.active = TRUE;

    IF v_unlock.user_id IS NOT NULL THEN
      INSERT INTO public.nlds_active_access (user_id, unlock_id, tier, expires_at, last_refreshed_at)
      VALUES (v_unlock.user_id, v_unlock.id, v_unlock.tier, v_unlock.expires_at, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        unlock_id = v_unlock.id,
        tier = v_unlock.tier,
        expires_at = GREATEST(v_unlock.expires_at, nlds_active_access.expires_at),
        last_refreshed_at = NOW();
    END IF;
  END;
$$ LANGUAGE plpgsql;

-- Grant tier hours
CREATE OR REPLACE FUNCTION public.tier_hours(p_tier TEXT)
RETURNS INTEGER AS $$
  CASE p_tier
    WHEN 'supporter' THEN 48
    WHEN 'standard' THEN 72
    WHEN 'patron' THEN 168
    WHEN 'founder' THEN 720
    ELSE 72
  END;
$$ LANGUAGE SQL IMMUTABLE;

-- ============================================================
-- Stripe Webhook Handler
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_stripe_checkout_completed(
  p_session JSONB
) RETURNS VOID AS $$
  DECLARE
    v_email TEXT;
    v_tier TEXT;
    v_price_cents INTEGER;
    v_session_id TEXT;
    v_customer_id TEXT;
    v_user_id UUID;
    v_unlock_id UUID;
    v_access_hours INTEGER;
    v_expires_at TIMESTAMPTZ;
  BEGIN
    v_email := p_session->>'customer_email';
    v_session_id := p_session->>'id';
    v_customer_id := p_session->>'customer';

    -- Parse line items to get tier
    v_tier := p_session->'line_items'->'data'->0->'price'->'metadata'->>'tier';
    v_price_cents := (p_session->'line_items'->'data'->0->'price'->'unit_amount')::INTEGER;

    -- Get or create user
    SELECT id INTO v_user_id FROM public.nlds_users WHERE email = v_email;
    IF v_user_id IS NULL THEN
      INSERT INTO public.nlds_users (email, stripe_customer_id, total_paid_cents, unlock_count)
      VALUES (v_email, v_customer_id, v_price_cents, 1)
      ON CONFLICT (email) DO UPDATE SET
        stripe_customer_id = COALESCE(NULLIF(public.nlds_users.stripe_customer_id, ''), v_customer_id),
        total_paid_cents = public.nlds_users.total_paid_cents + v_price_cents,
        unlock_count = public.nlds_users.unlock_count + 1
      RETURNING id INTO v_user_id;
    ELSE
      UPDATE public.nlds_users SET
        total_paid_cents = total_paid_cents + v_price_cents,
        unlock_count = unlock_count + 1
      WHERE id = v_user_id;
    END IF;

    -- Create unlock
    v_access_hours := public.tier_hours(COALESCE(v_tier, 'standard'));
    v_expires_at := NOW() + (v_access_hours || ' hours')::INTERVAL;

    INSERT INTO public.nlds_unlocks (user_id, tier, price_cents, stripe_session_id, access_hours, expires_at)
    VALUES (v_user_id, COALESCE(v_tier, 'standard'), v_price_cents, v_session_id, v_access_hours, v_expires_at)
    ON CONFLICT (stripe_session_id) DO NOTHING
    RETURNING id INTO v_unlock_id;

    -- Refresh active access
    IF v_unlock_id IS NOT NULL THEN
      PERFORM public.refresh_active_access(v_unlock_id);
    END IF;
  END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Unlock tier configuration
-- ============================================================

CREATE TABLE IF NOT EXISTS public.nlds_tiers (
  tier TEXT PRIMARY KEY,
  price_cents INTEGER NOT NULL,
  access_hours INTEGER NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0
);

INSERT INTO public.nlds_tiers (tier, price_cents, access_hours, label, description, sort_order) VALUES
  ('supporter', 500, 48, 'Supporter', 'Full access for 48 hours. Perfect for browsing and researching.', 1),
  ('standard', 1100, 72, 'Standard', 'Full access for 72 hours. Come back anytime.', 2),
  ('patron', 2500, 168, 'Patron', 'Full access for 7 days. For serious investors.', 3),
  ('founder', 10000, 720, 'Founder', '30 days full access. Name on Founder Wall. First access to new cities.', 4)
ON CONFLICT (tier) DO UPDATE SET
  price_cents = EXCLUDED.price_cents,
  access_hours = EXCLUDED.access_hours;
