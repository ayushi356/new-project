/*
# Add Yojnas, Promises, and Incidents tables

## Overview
Separates three new record types from the existing "works" table, as requested:
1. Yojnas — government schemes tracked by claimed targets vs actual on-ground implementation.
2. Promises — election promises and whether they were kept, broken, or abandoned.
3. Incidents — major events/cases (riots, violence, crises) with citizen impact.

These are shown under their own tabs in the UI, distinct from "Works & Records".

## Tables

### yojnas
- id, party_id (FK), title, description
- claimed_target — what the scheme claimed it would deliver
- actual_implementation — text describing ground reality
- implementation_status — 'implemented' | 'partial' | 'failed' | 'fluke'
- launched_year, budget_announced (text), category, source_url, source_name

### promises
- id, party_id (FK), title, description
- election_year, election_context (e.g. "2014 Lok Sabha manifesto")
- status — 'broken' | 'partially_fulfilled' | 'abandoned' | 'fulfilled'
- reality_check — text explaining what actually happened
- source_url, source_name

### incidents
- id, party_id (FK, nullable), title, description
- date_year, location
- severity — 'mild' | 'extreme'
- citizen_impact — text describing impact on citizens
- deaths_reported (int, nullable), source_url, source_name

## Security
- Single-tenant public app: RLS enabled, anon+authenticated SELECT.
*/

CREATE TABLE IF NOT EXISTS yojnas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id uuid REFERENCES parties(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  claimed_target text,
  actual_implementation text,
  implementation_status text NOT NULL CHECK (implementation_status IN ('implemented','partial','failed','fluke')),
  launched_year int,
  budget_announced text,
  category text,
  source_url text,
  source_name text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE yojnas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_yojnas" ON yojnas;
CREATE POLICY "anon_select_yojnas" ON yojnas FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX IF NOT EXISTS yojnas_party_idx ON yojnas(party_id);
CREATE INDEX IF NOT EXISTS yojnas_status_idx ON yojnas(implementation_status);

CREATE TABLE IF NOT EXISTS promises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id uuid REFERENCES parties(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  election_year int,
  election_context text,
  status text NOT NULL CHECK (status IN ('broken','partially_fulfilled','abandoned','fulfilled')),
  reality_check text,
  source_url text,
  source_name text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE promises ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_promises" ON promises;
CREATE POLICY "anon_select_promises" ON promises FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX IF NOT EXISTS promises_party_idx ON promises(party_id);
CREATE INDEX IF NOT EXISTS promises_status_idx ON promises(status);

CREATE TABLE IF NOT EXISTS incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id uuid REFERENCES parties(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  date_year int,
  location text,
  severity text NOT NULL CHECK (severity IN ('mild','extreme')),
  citizen_impact text,
  deaths_reported int,
  source_url text,
  source_name text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_incidents" ON incidents;
CREATE POLICY "anon_select_incidents" ON incidents FOR SELECT TO anon, authenticated USING (true);
CREATE INDEX IF NOT EXISTS incidents_party_idx ON incidents(party_id);
CREATE INDEX IF NOT EXISTS incidents_severity_idx ON incidents(severity);
