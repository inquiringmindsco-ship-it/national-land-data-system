-- ============================================================
-- NLDS Acquisition Leads — Supabase Schema
-- Run in Supabase SQL Editor
-- ============================================================

-- Lead status enum
CREATE TYPE acquisition_status AS ENUM (
  'new', 'contacted', 'qualified', 'interested', 'enrolled', 'closed', 'lost'
);

-- Main leads table
CREATE TABLE IF NOT EXISTS nlds_acquisition_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Contact
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,

  -- Interest
  budget_cents INTEGER NOT NULL DEFAULT 0,
  budget_display TEXT, -- "Under $1K", "$1K-$5K", etc.
  interest_level TEXT NOT NULL DEFAULT 'browsing',
    -- 'browsing' | 'researching' | 'ready' | 'committed'
  timeline TEXT DEFAULT 'flexible',
    -- 'asap' | '1-3months' | '3-6months' | 'flexible'

  -- Property interest (if specific)
  listing_id TEXT,
  listing_address TEXT,
  listing_price_cents INTEGER,
  zip_code TEXT,
  deal_score INTEGER,

  -- Lead quality
  status acquisition_status DEFAULT 'new',
  source TEXT DEFAULT 'deals_page',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  session_id TEXT,
  notes TEXT,
  assigned_to TEXT,

  -- Group deal interest
  group_deal_id TEXT,
  preferred_role TEXT, -- 'individual' | 'pool_participant'
  contribution_cents INTEGER,

  -- Consent
  consent_given BOOLEAN DEFAULT TRUE,
  consent_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_email ON nlds_acquisition_leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON nlds_acquisition_leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_listing ON nlds_acquisition_leads(listing_id);
CREATE INDEX IF NOT EXISTS idx_leads_zip ON nlds_acquisition_leads(zip_code);
CREATE INDEX IF NOT EXISTS idx_leads_group_deal ON nlds_acquisition_leads(group_deal_id);
CREATE INDEX IF NOT EXISTS idx_leads_created ON nlds_acquisition_leads(created_at DESC);

-- RLS
ALTER TABLE nlds_acquisition_leads ENABLE ROW LEVEL SECURITY;

-- Public insert (no auth needed for form submissions)
CREATE POLICY "Anyone can submit a lead" ON nlds_acquisition_leads
  FOR INSERT WITH CHECK (true);

-- Admin read (restrict in production)
CREATE POLICY "Admin can read leads" ON nlds_acquisition_leads
  FOR SELECT USING (
    auth.jwt() IS NOT NULL
  );

-- Update status (internal use)
CREATE POLICY "Service can update leads" ON nlds_acquisition_leads
  FOR UPDATE USING (
    auth.jwt() IS NOT NULL
  );

-- ============================================================
-- Group Deals table
-- ============================================================
CREATE TYPE group_deal_status AS ENUM (
  'forming', 'active', 'funded', 'acquired', 'cancelled', 'expired'
);

CREATE TABLE IF NOT EXISTS nlds_group_deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Property
  listing_id TEXT NOT NULL,
  listing_address TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  price_cents INTEGER NOT NULL,

  -- Deal structure
  target_amount_cents INTEGER NOT NULL, -- total cost including fees
  max_participants INTEGER NOT NULL DEFAULT 5,
  min_participants INTEGER NOT NULL DEFAULT 3,
  current_participants INTEGER DEFAULT 0,
  cost_per_person_cents INTEGER NOT NULL,

  -- Funding
  amount_raised_cents INTEGER DEFAULT 0,
  status group_deal_status DEFAULT 'forming',

  -- Details
  headline TEXT,
  summary TEXT,
  acquisition_pathway TEXT,
  score INTEGER,
  expires_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,

  -- Tracking
  total_views INTEGER DEFAULT 0,
  total_interests INTEGER DEFAULT 0,
  conversion_leads INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_group_deals_status ON nlds_group_deals(status);
CREATE INDEX IF NOT EXISTS idx_group_deals_zip ON nlds_group_deals(zip_code);
CREATE INDEX IF NOT EXISTS idx_group_deals_listing ON nlds_group_deals(listing_id);

ALTER TABLE nlds_group_deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active group deals" ON nlds_group_deals
  FOR SELECT USING (status IN ('forming', 'active', 'funded'));

CREATE POLICY "Anyone can create group deals" ON nlds_group_deals
  FOR INSERT WITH CHECK (true);

-- ============================================================
-- Lead activity log
-- ============================================================
CREATE TABLE IF NOT EXISTS nlds_lead_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  lead_id UUID REFERENCES nlds_acquisition_leads(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  -- 'viewed_listing' | 'opened_form' | 'submitted_form' | 'viewed_group_deal'
  -- | 'joined_pool' | 'status_change' | 'note_added' | 'email_sent'
  metadata JSONB DEFAULT '{}',
  actor TEXT DEFAULT 'lead', -- 'lead' | 'operator' | 'system'
  ip_hash TEXT
);

CREATE INDEX IF NOT EXISTS idx_activity_lead ON nlds_lead_activity(lead_id);
CREATE INDEX IF NOT EXISTS idx_activity_type ON nlds_lead_activity(activity_type);

ALTER TABLE nlds_lead_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can log activity" ON nlds_lead_activity FOR INSERT WITH CHECK (true);
