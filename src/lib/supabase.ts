import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Party = {
  id: string;
  name: string;
  abbreviation: string;
  ideology: string | null;
  represents: string | null;
  founded_year: number | null;
  color_hex: string | null;
  description: string | null;
  logo_url: string | null;
};

export type Leader = {
  id: string;
  party_id: string | null;
  name: string;
  role: string | null;
  bio: string | null;
  represents: string | null;
  ideology: string | null;
  image_url: string | null;
};

export type Work = {
  id: string;
  party_id: string | null;
  leader_id: string | null;
  title: string;
  description: string;
  type: 'good' | 'bad';
  severity: 'mild' | 'extreme' | null;
  category: string | null;
  date_year: number | null;
  impact: string | null;
  source_url: string | null;
  source_name: string | null;
};

export type LeaderWithParty = Leader & { party: Party | null };
export type WorkWithParty = Work & { party: Party | null };
export type PartyWithCounts = Party & {
  leader_count: number;
  work_count: number;
};

export type Yojna = {
  id: string;
  party_id: string | null;
  title: string;
  description: string;
  claimed_target: string | null;
  actual_implementation: string | null;
  implementation_status: 'implemented' | 'partial' | 'failed' | 'fluke';
  launched_year: number | null;
  budget_announced: string | null;
  category: string | null;
  source_url: string | null;
  source_name: string | null;
};

export type Promise_ = {
  id: string;
  party_id: string | null;
  title: string;
  description: string;
  election_year: number | null;
  election_context: string | null;
  status: 'broken' | 'partially_fulfilled' | 'abandoned' | 'fulfilled';
  reality_check: string | null;
  source_url: string | null;
  source_name: string | null;
};

export type Incident = {
  id: string;
  party_id: string | null;
  title: string;
  description: string;
  date_year: number | null;
  location: string | null;
  severity: 'mild' | 'extreme';
  citizen_impact: string | null;
  deaths_reported: number | null;
  source_url: string | null;
  source_name: string | null;
};
