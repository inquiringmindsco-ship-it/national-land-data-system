-- ============================================================
-- NLDS Referral System — Supabase Schema Add-on
-- Run this AFTER the main schema.sql and acquisition-schema.sql
-- ============================================================

-- Add referral fields to existing leads table
ALTER TABLE nlds_acquisition_leads
  ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS deals_unlocked INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES nlds_acquisition_leads(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS referred_by_code TEXT,
  ADD COLUMN IF NOT EXISTS last_contact_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_leads_referral_code ON nlds_acquisition_leads(referral_code);
CREATE INDEX IF NOT EXISTS idx_leads_referred_by ON nlds_acquisition_leads(referred_by);

-- New referral events table
CREATE TABLE IF NOT EXISTS nlds_referral_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  referrer_id UUID REFERENCES nlds_acquisition_leads(id) ON DELETE SET NULL,
  referee_email TEXT NOT NULL,
  referral_code TEXT NOT NULL,
  status TEXT DEFAULT 'claimed'
    CHECK (status IN ('claimed', 'converted', 'expired')),
  converted_at TIMESTAMPTZ,
  deals_credited INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_referral_events_referrer ON nlds_referral_events(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referral_events_code ON nlds_referral_events(referral_code);

ALTER TABLE nlds_referral_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can create referral events" ON nlds_referral_events FOR INSERT WITH CHECK (true);
