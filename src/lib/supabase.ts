import { createClient } from '@supabase/supabase-js';
import {
  SEED_PARTIES,
  SEED_LEADERS,
  SEED_WORKS,
  SEED_YOJNAS,
  SEED_PROMISES,
  SEED_INCIDENTS,
  SEED_LEGISLATIVE_RECORDS,
  type GovernanceTenure,
  type LegislativePolicyRecord,
} from '@/data/politicalData';
import {
  COUNCIL_OF_MINISTERS,
  MINISTRIES_DIRECTORY,
  PORTFOLIO_CHANGE_LOGS,
  type Minister,
  type Ministry,
  type PortfolioChangeLog,
  type MinisterDesignation,
  type MinisterStatus,
} from '@/data/ministersData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const hasValidSupabaseConfig =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  typeof supabaseUrl === 'string' &&
  supabaseUrl.startsWith('http');

const realSupabase = hasValidSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
  incident_count?: number;
  yojna_count?: number;
  promise_count?: number;
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
  category?: 'protest' | 'violence' | 'scandal' | 'terror' | 'crisis' | string | null;
  demands?: string | null;
  state_response?: string | null;
};

export type {
  GovernanceTenure,
  LegislativePolicyRecord,
  Minister,
  Ministry,
  PortfolioChangeLog,
  MinisterDesignation,
  MinisterStatus,
};

// Fallback in-memory database
const TABLE_STORE: Record<string, any[]> = {
  parties: SEED_PARTIES,
  leaders: SEED_LEADERS,
  works: SEED_WORKS,
  yojnas: SEED_YOJNAS,
  promises: SEED_PROMISES,
  incidents: SEED_INCIDENTS,
  legislative_records: SEED_LEGISLATIVE_RECORDS,
  ministers: COUNCIL_OF_MINISTERS,
  ministries: MINISTRIES_DIRECTORY,
  portfolio_changes: PORTFOLIO_CHANGE_LOGS,
};

type QueryFilter = { col: string; val: any };

class LocalQueryBuilder<T = any> implements PromiseLike<{ data: T[] | null; error: any; count?: number | null }> {
  private tableName: string;
  private filters: QueryFilter[] = [];
  private orderCol: string | null = null;
  private orderAscending = true;
  private limitCount: number | null = null;
  private isHeadOnly = false;
  private countMode: string | null = null;
  private singleMode = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  select(_cols?: string, options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }) {
    if (options?.head) {
      this.isHeadOnly = true;
    }
    if (options?.count) {
      this.countMode = options.count;
    }
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push({ col: column, val: value });
    return this;
  }

  order(column: string, options?: { ascending?: boolean; nullsFirst?: boolean }) {
    this.orderCol = column;
    this.orderAscending = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  maybeSingle(): PromiseLike<{ data: T | null; error: any }> {
    this.singleMode = true;
    return this as any;
  }

  single(): PromiseLike<{ data: T | null; error: any }> {
    this.singleMode = true;
    return this as any;
  }

  private executeLocal(): { data: any; error: null; count?: number } {
    const rawList = TABLE_STORE[this.tableName] ?? [];
    let items = [...rawList];

    for (const filter of this.filters) {
      items = items.filter((item) => item[filter.col] === filter.val);
    }

    if (this.orderCol) {
      const col = this.orderCol;
      const asc = this.orderAscending;
      items.sort((a, b) => {
        const valA = a[col];
        const valB = b[col];
        if (valA === valB) return 0;
        if (valA == null) return 1;
        if (valB == null) return -1;
        if (typeof valA === 'number' && typeof valB === 'number') {
          return asc ? valA - valB : valB - valA;
        }
        return asc
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    const totalCount = items.length;

    if (this.limitCount != null) {
      items = items.slice(0, this.limitCount);
    }

    if (this.isHeadOnly) {
      return { data: null, error: null, count: totalCount };
    }

    if (this.singleMode) {
      return { data: items[0] ?? null, error: null };
    }

    return {
      data: items,
      error: null,
      count: this.countMode ? totalCount : undefined,
    };
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    const localResult = this.executeLocal();

    // If real Supabase is configured, attempt real fetch and fallback if empty or error
    if (realSupabase) {
      return new Promise<any>((resolve) => {
        let q: any = realSupabase.from(this.tableName);
        if (this.isHeadOnly || this.countMode) {
          q = q.select('*', { count: this.countMode ?? 'exact', head: this.isHeadOnly });
        } else {
          q = q.select('*');
        }

        for (const f of this.filters) {
          q = q.eq(f.col, f.val);
        }
        if (this.orderCol) {
          q = q.order(this.orderCol, { ascending: this.orderAscending });
        }
        if (this.limitCount != null) {
          q = q.limit(this.limitCount);
        }

        const run = this.singleMode ? q.maybeSingle() : q;
        run.then((res: any) => {
          if (res.error || !res.data || (Array.isArray(res.data) && res.data.length === 0)) {
            resolve(localResult);
          } else {
            resolve(res);
          }
        }).catch(() => resolve(localResult));
      }).then(onfulfilled, onrejected);
    }

    return Promise.resolve(localResult).then(onfulfilled, onrejected);
  }
}

export const supabase = {
  from: (table: string) => {
    return new LocalQueryBuilder(table);
  },
};
