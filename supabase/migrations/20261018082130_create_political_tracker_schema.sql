/*
# Indian Political Tracker Schema

## Overview
Creates a single-tenant (no auth) public-read database for tracking
Indian political parties, their main leaders, and works/contributions
(good and bad) attributed to them, with source links and severity labels.

## Tables

### parties
- id (uuid, PK)
- name (text, unique) — official party name
- abbreviation (text) — e.g. BJP, INC
- ideology (text) — political ideology
- represents (text) — who/what the party represents
- founded_year (int) — year founded
- color_hex (text) — brand color for UI
- description (text) — summary of the party
- logo_url (text, nullable) — optional logo image

### leaders
- id (uuid, PK)
- party_id (uuid, FK -> parties)
- name (text)
- role (text) — title/position
- bio (text)
- represents (text) — constituency/group represented
- ideology (text) — personal political stance
- image_url (text, nullable)

### works
- id (uuid, PK)
- party_id (uuid, FK -> parties, nullable) — party responsible
- leader_id (uuid, FK -> leaders, nullable) — specific leader
- title (text)
- description (text)
- type (text) — 'good' or 'bad'
- severity (text) — 'mild' | 'extreme' | null (only for bad)
- category (text) — e.g. Economy, Infrastructure, Scam, Rights
- date_year (int, nullable)
- impact (text) — impact on economy/society
- source_url (text, nullable)
- source_name (text, nullable)

## Security
- Single-tenant public app: RLS enabled, anon+authenticated full CRUD.
- Data is intentionally public/shared (read-only browsing app).

## Notes
1. Works can be attributed to a party, a leader, or both.
2. Severity only meaningful for 'bad' works (mild/extreme crime label).
*/

CREATE TABLE IF NOT EXISTS parties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  abbreviation text NOT NULL,
  ideology text,
  represents text,
  founded_year int,
  color_hex text DEFAULT '#1f2937',
  description text,
  logo_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE parties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_parties" ON parties;
CREATE POLICY "anon_select_parties" ON parties FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id uuid REFERENCES parties(id) ON DELETE SET NULL,
  name text NOT NULL,
  role text,
  bio text,
  represents text,
  ideology text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_leaders" ON leaders;
CREATE POLICY "anon_select_leaders" ON leaders FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS works (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id uuid REFERENCES parties(id) ON DELETE SET NULL,
  leader_id uuid REFERENCES leaders(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('good','bad')),
  severity text CHECK (severity IN ('mild','extreme')),
  category text,
  date_year int,
  impact text,
  source_url text,
  source_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE works ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_works" ON works;
CREATE POLICY "anon_select_works" ON works FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS works_party_idx ON works(party_id);
CREATE INDEX IF NOT EXISTS works_leader_idx ON works(leader_id);
CREATE INDEX IF NOT EXISTS works_type_idx ON works(type);
CREATE INDEX IF NOT EXISTS leaders_party_idx ON leaders(party_id);
