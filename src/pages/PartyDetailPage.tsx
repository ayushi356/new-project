import { useEffect, useState, useMemo } from 'react';
import {
  supabase,
  type Leader,
  type Work,
  type Party,
  type Yojna,
  type Promise_ as PromiseType,
  type Incident,
  type GovernanceTenure,
  type LegislativePolicyRecord,
} from '@/lib/supabase';
import { PARTY_TENURES, SEED_LEGISLATIVE_RECORDS } from '@/data/politicalData';
import { SAMPLE_FINANCE_RECORDS } from '@/data/publicFinanceData';
import type { PublicFinanceRecord } from '@/types/finance';
import { useParty } from '@/lib/hooks/parties';
import { useNavigate } from '@/lib/router';
import { WorkCard } from '@/components/Work';
import {
  ArrowLeft,
  Loader,
  Landmark,
  Users as UsersIcon,
  Compass,
  Calendar,
  FileText,
  BadgeCheck,
  AlertTriangle,
  ExternalLink,
  MapPin,
  ShieldAlert,
  Coins,
  BookOpen,
  Filter,
  RotateCcw,
  CheckCircle2,
  Building2,
  Layers,
  Scale,
  Receipt,
  ShieldCheck,
  Award,
} from 'lucide-react';

export function PartyDetailPage({ id }: { id: string }) {
  const { party, loading } = useParty(id);
  const navigate = useNavigate();

  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [yojnas, setYojnas] = useState<Yojna[]>([]);
  const [promises, setPromises] = useState<PromiseType[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  // Filters & Tabs
  const [activePillarTab, setActivePillarTab] = useState<
    'all' | 'overview' | 'works' | 'promises' | 'tax' | 'incidents' | 'leaders' | 'policies'
  >('all');
  const [timePeriodFilter, setTimePeriodFilter] = useState<'all' | '2020s' | '2010s' | 'pre2010'>('all');
  const [govLevelFilter, setGovLevelFilter] = useState<'all' | 'national' | 'state' | 'opposition'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    if (!id) return;
    supabase.from('leaders').select('*').eq('party_id', id).order('name').then(({ data }) => setLeaders(data ?? []));
    supabase.from('works').select('*').eq('party_id', id).order('date_year', { ascending: false, nullsFirst: false }).then(({ data }) => setWorks(data ?? []));
    supabase.from('yojnas').select('*').eq('party_id', id).order('launched_year', { ascending: false, nullsFirst: false }).then(({ data }) => setYojnas(data ?? []));
    supabase.from('promises').select('*').eq('party_id', id).order('election_year', { ascending: false, nullsFirst: false }).then(({ data }) => setPromises(data ?? []));
    supabase.from('incidents').select('*').eq('party_id', id).order('date_year', { ascending: false, nullsFirst: false }).then(({ data }) => setIncidents(data ?? []));
  }, [id]);

  // Tenures for this party
  const tenures: GovernanceTenure[] = useMemo(() => {
    if (!id) return [];
    return PARTY_TENURES[id] ?? [];
  }, [id]);

  // Legislative records for this party
  const legislativeRecords: LegislativePolicyRecord[] = useMemo(() => {
    if (!id) return [];
    return SEED_LEGISLATIVE_RECORDS.filter((r) => r.party_id === id);
  }, [id]);

  // Public finance records relevant to this party
  const relevantFinanceRecords: PublicFinanceRecord[] = useMemo(() => {
    if (!id) return [];
    if (id === 'party-bjp') {
      // BJP Union Government (2014-present)
      return SAMPLE_FINANCE_RECORDS.filter((r) =>
        ['rev-sample-01', 'alloc-sample-01', 'exp-sample-01', 'sch-sample-01', 'aud-sample-01', 'aud-sample-02'].includes(r.id)
      );
    }
    if (id === 'party-inc') {
      // INC Union UPA / State welfare records
      return SAMPLE_FINANCE_RECORDS.filter((r) =>
        ['tax-sample-01', 'comp-sample-01', 'st-sample-01'].includes(r.id)
      );
    }
    if (id === 'party-aap') {
      // AAP Delhi/Punjab state public records
      return SAMPLE_FINANCE_RECORDS.filter((r) =>
        ['st-sample-02', 'proc-sample-01'].includes(r.id)
      );
    }
    if (id === 'party-tmc') {
      // TMC West Bengal state public records
      return SAMPLE_FINANCE_RECORDS.filter((r) =>
        ['st-sample-01', 'st-sample-02'].includes(r.id)
      );
    }
    return [];
  }, [id]);

  // Distinct categories across works and incidents for category filter
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    works.forEach((w) => w.category && set.add(w.category));
    incidents.forEach((i) => i.category && set.add(i.category));
    yojnas.forEach((y) => y.category && set.add(y.category));
    return Array.from(set).sort();
  }, [works, incidents, yojnas]);

  // Year filter helper
  const matchesYear = (year: number | null | undefined) => {
    if (timePeriodFilter === 'all') return true;
    if (!year) return false;
    if (timePeriodFilter === '2020s') return year >= 2020;
    if (timePeriodFilter === '2010s') return year >= 2010 && year <= 2019;
    if (timePeriodFilter === 'pre2010') return year < 2010;
    return true;
  };

  // Filtered Works
  const filteredWorks = useMemo(() => {
    return works.filter((w) => {
      if (!matchesYear(w.date_year)) return false;
      if (categoryFilter !== 'all' && w.category !== categoryFilter) return false;
      return true;
    });
  }, [works, timePeriodFilter, categoryFilter]);

  // Filtered Incidents
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      if (!matchesYear(inc.date_year)) return false;
      if (categoryFilter !== 'all' && inc.category !== categoryFilter) return false;
      return true;
    });
  }, [incidents, timePeriodFilter, categoryFilter]);

  // Filtered Yojnas
  const filteredYojnas = useMemo(() => {
    return yojnas.filter((y) => {
      if (!matchesYear(y.launched_year)) return false;
      if (categoryFilter !== 'all' && y.category !== categoryFilter) return false;
      return true;
    });
  }, [yojnas, timePeriodFilter, categoryFilter]);

  // Filtered Promises
  const filteredPromises = useMemo(() => {
    return promises.filter((pr) => {
      return matchesYear(pr.election_year);
    });
  }, [promises, timePeriodFilter]);

  // Filtered Legislative Records
  const filteredLegislative = useMemo(() => {
    return legislativeRecords.filter((leg) => {
      return matchesYear(leg.year);
    });
  }, [legislativeRecords, timePeriodFilter]);

  // Filtered Tenures
  const filteredTenures = useMemo(() => {
    if (govLevelFilter === 'all') return tenures;
    return tenures.filter((t) => t.level === govLevelFilter);
  }, [tenures, govLevelFilter]);

  const hasActiveFilters = timePeriodFilter !== 'all' || govLevelFilter !== 'all' || categoryFilter !== 'all';

  const resetFilters = () => {
    setTimePeriodFilter('all');
    setGovLevelFilter('all');
    setCategoryFilter('all');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24 text-slate-400">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!party) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-slate-600">This party profile could not be found.</p>
        <button
          onClick={() => navigate('/parties')}
          className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
        >
          &larr; Back to all parties
        </button>
      </div>
    );
  }

  const goodWorks = filteredWorks.filter((w) => w.type === 'good');
  const badWorks = filteredWorks.filter((w) => w.type === 'bad');

  return (
    <div className="pb-24">
      {/* 1. Header Banner */}
      <div className="border-b border-[#E5E0D8] bg-[#F4F1EA] py-12 text-[#181A19]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <button
            onClick={() => navigate('/parties')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5C6460] hover:text-[#181A19] transition cursor-pointer"
          >
            <ArrowLeft size={14} strokeWidth={1.5} /> Back to Parties Directory
          </button>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-[#E5E0D8] bg-white text-xl font-bold text-[#181A19] shadow-xs">
              {party.abbreviation.slice(0, 4)}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-serif text-3xl font-extrabold tracking-tight sm:text-4xl text-[#181A19]">{party.name}</h1>
                <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-xs font-bold text-[#181A19] uppercase tracking-wider">
                  {party.abbreviation}
                </span>
                {party.founded_year && (
                  <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-xs font-medium text-[#5C6460]">
                    Est. {party.founded_year}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-[#4A524D] max-w-3xl leading-relaxed">
                {party.ideology ?? 'National Political Party'}
              </p>
            </div>
          </div>

          {/* 7 Section Quick Tab Navigation */}
          <div className="mt-8 flex flex-wrap gap-2 pt-3 border-t border-[#E5E0D8] text-xs font-medium">
            <button
              onClick={() => setActivePillarTab('overview')}
              className={`rounded-lg px-3 py-1.5 transition font-semibold cursor-pointer ${
                activePillarTab === 'overview'
                  ? 'bg-[#1A3D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-[#5C6460] border border-[#E5E0D8] hover:text-[#181A19] hover:bg-[#FAF8F5]'
              }`}
            >
              1. Overview & Tenures
            </button>
            <button
              onClick={() => setActivePillarTab('works')}
              className={`rounded-lg px-3 py-1.5 transition font-semibold cursor-pointer ${
                activePillarTab === 'works'
                  ? 'bg-[#1A3D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-[#5C6460] border border-[#E5E0D8] hover:text-[#181A19] hover:bg-[#FAF8F5]'
              }`}
            >
              2. Achievements & Works ({works.length})
            </button>
            <button
              onClick={() => setActivePillarTab('promises')}
              className={`rounded-lg px-3 py-1.5 transition font-semibold cursor-pointer ${
                activePillarTab === 'promises'
                  ? 'bg-[#1A3D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-[#5C6460] border border-[#E5E0D8] hover:text-[#181A19] hover:bg-[#FAF8F5]'
              }`}
            >
              3. Promises & Schemes ({promises.length + yojnas.length})
            </button>
            <button
              onClick={() => setActivePillarTab('tax')}
              className={`rounded-lg px-3 py-1.5 transition font-semibold cursor-pointer ${
                activePillarTab === 'tax'
                  ? 'bg-[#1A3D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-[#5C6460] border border-[#E5E0D8] hover:text-[#181A19] hover:bg-[#FAF8F5]'
              }`}
            >
              4. Tax & Public Spending
            </button>
            <button
              onClick={() => setActivePillarTab('incidents')}
              className={`rounded-lg px-3 py-1.5 transition font-semibold cursor-pointer ${
                activePillarTab === 'incidents'
                  ? 'bg-[#1A3D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-[#5C6460] border border-[#E5E0D8] hover:text-[#181A19] hover:bg-[#FAF8F5]'
              }`}
            >
              5. Incidents & Legal Records ({incidents.length})
            </button>
            <button
              onClick={() => setActivePillarTab('leaders')}
              className={`rounded-lg px-3 py-1.5 transition font-semibold cursor-pointer ${
                activePillarTab === 'leaders'
                  ? 'bg-[#1A3D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-[#5C6460] border border-[#E5E0D8] hover:text-[#181A19] hover:bg-[#FAF8F5]'
              }`}
            >
              6. Leaders & Ministers ({leaders.length})
            </button>
            <button
              onClick={() => setActivePillarTab('policies')}
              className={`rounded-lg px-3 py-1.5 transition font-semibold cursor-pointer ${
                activePillarTab === 'policies'
                  ? 'bg-[#1A3D2F] text-white shadow-xs font-bold'
                  : 'bg-white text-[#5C6460] border border-[#E5E0D8] hover:text-[#181A19] hover:bg-[#FAF8F5]'
              }`}
            >
              7. Policies & Bills ({legislativeRecords.length})
            </button>
            <button
              onClick={() => setActivePillarTab('all')}
              className={`rounded-lg px-3 py-1.5 transition font-medium border border-white/20 ${
                activePillarTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'bg-white/5 text-white/90 hover:bg-white/15'
              }`}
            >
              All Sections
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
        {/* Governance Snapshot KPI Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <button
            onClick={() => setActivePillarTab('overview')}
            className={`rounded-xl border p-3 text-center transition ${
              activePillarTab === 'overview'
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
            }`}
          >
            <p className="text-xl font-black">{tenures.length}</p>
            <p className={`mt-0.5 text-[10px] font-bold uppercase ${activePillarTab === 'overview' ? 'text-slate-300' : 'text-slate-500'}`}>
              Governance Terms
            </p>
          </button>
          <button
            onClick={() => setActivePillarTab('works')}
            className={`rounded-xl border p-3 text-center transition ${
              activePillarTab === 'works'
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
            }`}
          >
            <p className="text-xl font-black">
              <span className={activePillarTab === 'works' ? 'text-emerald-300' : 'text-emerald-600'}>{goodWorks.length}</span>
              {' / '}
              <span className={activePillarTab === 'works' ? 'text-rose-300' : 'text-rose-600'}>{badWorks.length}</span>
            </p>
            <p className={`mt-0.5 text-[10px] font-bold uppercase ${activePillarTab === 'works' ? 'text-slate-300' : 'text-slate-500'}`}>
              Works (Good / Bad)
            </p>
          </button>
          <button
            onClick={() => setActivePillarTab('promises')}
            className={`rounded-xl border p-3 text-center transition ${
              activePillarTab === 'promises'
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
            }`}
          >
            <p className="text-xl font-black">{promises.length + yojnas.length}</p>
            <p className={`mt-0.5 text-[10px] font-bold uppercase ${activePillarTab === 'promises' ? 'text-slate-300' : 'text-slate-500'}`}>
              Promises & Yojnas
            </p>
          </button>
          <button
            onClick={() => setActivePillarTab('tax')}
            className={`rounded-xl border p-3 text-center transition ${
              activePillarTab === 'tax'
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
            }`}
          >
            <p className="text-xl font-black">{relevantFinanceRecords.length}</p>
            <p className={`mt-0.5 text-[10px] font-bold uppercase ${activePillarTab === 'tax' ? 'text-slate-300' : 'text-slate-500'}`}>
              Finance & Audits
            </p>
          </button>
          <button
            onClick={() => setActivePillarTab('incidents')}
            className={`rounded-xl border p-3 text-center transition ${
              activePillarTab === 'incidents'
                ? 'border-rose-700 bg-rose-700 text-white shadow-sm'
                : 'border-rose-200 bg-rose-50/50 text-rose-800 hover:border-rose-300'
            }`}
          >
            <p className="text-xl font-black">{incidents.length}</p>
            <p className={`mt-0.5 text-[10px] font-bold uppercase ${activePillarTab === 'incidents' ? 'text-rose-200' : 'text-rose-700'}`}>
              Crises & Protests
            </p>
          </button>
          <button
            onClick={() => setActivePillarTab('leaders')}
            className={`rounded-xl border p-3 text-center transition ${
              activePillarTab === 'leaders'
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
            }`}
          >
            <p className="text-xl font-black">{leaders.length}</p>
            <p className={`mt-0.5 text-[10px] font-bold uppercase ${activePillarTab === 'leaders' ? 'text-slate-300' : 'text-slate-500'}`}>
              Tracked Leaders
            </p>
          </button>
        </div>
        {/* Interactive Filter Controls Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Filter size={15} strokeWidth={1.5} />
              <span>Filter Dossier Records</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Time Period Filter */}
              <select
                value={timePeriodFilter}
                onChange={(e) => setTimePeriodFilter(e.target.value as any)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Time Periods</option>
                <option value="2020s">2020 – Present (Recent)</option>
                <option value="2010s">2010 – 2019 (Prior Decade)</option>
                <option value="pre2010">Pre-2010 (Historic)</option>
              </select>

              {/* Government Level Filter */}
              <select
                value={govLevelFilter}
                onChange={(e) => setGovLevelFilter(e.target.value as any)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Governance Levels</option>
                <option value="national">Union / National Government</option>
                <option value="state">State Governments</option>
                <option value="opposition">Parliamentary Opposition</option>
              </select>

              {/* Category Filter */}
              {allCategories.length > 0 && (
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:outline-hidden"
                >
                  <option value="all">All Categories</option>
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            SECTION 1: OVERVIEW & TIME IN GOVERNMENT
            ======================================================== */}
        {(activePillarTab === 'all' || activePillarTab === 'overview') && (
          <section id="overview" className="scroll-mt-24 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pillar 1 of 7</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Overview & Time in Government</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Neutral Profile Details */}
              <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900">About {party.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{party.description}</p>

                {party.represents && (
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed">
                    <strong className="font-bold text-slate-900">Electoral & Social Footprint:</strong> {party.represents}
                  </div>
                )}
              </div>

              {/* Quick Profile Specs */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Constitutional Profile</h3>
                <dl className="space-y-4 text-xs">
                  <InfoRow icon={Calendar} label="Founded Year" value={party.founded_year ? party.founded_year.toString() : '—'} />
                  <InfoRow icon={Compass} label="Ideological Orientation" value={party.ideology ?? '—'} />
                  <InfoRow icon={Landmark} label="Party Code" value={party.abbreviation} />
                  <InfoRow icon={UsersIcon} label="Representation" value={party.represents ? 'National / Multi-State' : '—'} />
                </dl>
              </div>
            </div>

            {/* Tenures: Union vs State vs Opposition */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Documented Governance Periods</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clear distinction between National Government, State Government, and Opposition periods.
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Showing {filteredTenures.length} of {tenures.length} terms
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTenures.map((t, idx) => {
                  const isNational = t.level === 'national';
                  const isState = t.level === 'state';

                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border p-4 text-xs transition ${
                        isNational
                          ? 'border-indigo-200 bg-indigo-50/40'
                          : isState
                          ? 'border-emerald-200 bg-emerald-50/40'
                          : 'border-slate-200 bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                            isNational
                              ? 'bg-indigo-100 text-indigo-800'
                              : isState
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isNational ? 'Union Government' : isState ? 'State Government' : 'Opposition'}
                        </span>
                        <span className="font-semibold text-slate-500 text-[11px]">{t.period}</span>
                      </div>

                      <h4 className="mt-3 font-bold text-slate-900 text-sm">{t.title}</h4>
                      <p className="mt-0.5 font-medium text-slate-500 text-[11px]">Jurisdiction: {t.jurisdiction}</p>
                      <p className="mt-2 leading-relaxed text-slate-600 text-xs">{t.details}</p>

                      <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <ShieldCheck size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
                          Evidence & Sources:
                        </span>
                        <span className="text-slate-500 font-medium">ECI Gazette & Sansad Record</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            SECTION 2: ACHIEVEMENTS & COMPLETED WORKS
            ======================================================== */}
        {(activePillarTab === 'all' || activePillarTab === 'works') && (
          <section id="works" className="scroll-mt-24 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pillar 2 of 7</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Achievements & Completed Works</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Key policy achievements contrasted neutrally against recorded scams, failures, and controversies.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-emerald-800">
                  {goodWorks.length} Positive Works
                </span>
                <span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-red-800">
                  {badWorks.length} Documented Concerns
                </span>
              </div>
            </div>

            {filteredWorks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-500">
                No works records match your active filter criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredWorks.map((w) => (
                  <WorkCard key={w.id} work={w} partyName={party.name} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            SECTION 3: PROMISES & SCHEMES
            ======================================================== */}
        {(activePillarTab === 'all' || activePillarTab === 'promises') && (
          <section id="promises-schemes" className="scroll-mt-24 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pillar 3 of 7</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Promises & Welfare Schemes</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Election manifesto commitments contrasted with welfare scheme implementation on the ground.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/yojnas')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  All Schemes &rarr;
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => navigate('/promises')}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  All Promises &rarr;
                </button>
              </div>
            </div>

            {/* Dual Column: Schemes & Manifesto Promises */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Government Schemes (Yojnas) */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText size={18} strokeWidth={1.5} className="text-[#1A3D2F]" />
                    <h3 className="font-bold text-slate-900 text-base">Flagship Schemes (Yojnas)</h3>
                  </div>
                  <span className="rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs font-bold">
                    {filteredYojnas.length} Tracked
                  </span>
                </div>

                {filteredYojnas.length === 0 ? (
                  <p className="text-xs text-slate-500">No schemes listed under the current filter.</p>
                ) : (
                  <div className="space-y-4">
                    {filteredYojnas.map((y) => (
                      <div key={y.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{y.title}</h4>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0 ${
                              y.implementation_status === 'implemented'
                                ? 'bg-emerald-100 text-emerald-800'
                                : y.implementation_status === 'partial'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {y.implementation_status === 'implemented'
                              ? 'Implemented'
                              : y.implementation_status === 'partial'
                              ? 'Partial / Mixed'
                              : 'Delivery Shortfall'}
                          </span>
                        </div>

                        <p className="mt-2 text-slate-600 leading-relaxed">{y.description}</p>

                        {y.claimed_target && (
                          <div className="mt-2.5 rounded-lg bg-white border border-slate-200/80 p-2 text-[11px] text-slate-700">
                            <strong>Target Claimed:</strong> {y.claimed_target}
                          </div>
                        )}

                        {y.actual_implementation && (
                          <div className="mt-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 p-2 text-[11px] text-emerald-900">
                            <strong>Ground Reality:</strong> {y.actual_implementation}
                          </div>
                        )}

                        {/* Evidence, Sources & Updates */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-700 flex items-center gap-1">
                            <ShieldCheck size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
                            Evidence, Sources & Updates:
                          </span>
                          {y.source_url ? (
                            <a
                              href={y.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:underline inline-flex items-center gap-1 truncate max-w-[200px]"
                            >
                              <span>{y.source_name ?? 'Ministry Dashboard'}</span>
                              <ExternalLink size={10} strokeWidth={1.5} />
                            </a>
                          ) : (
                            <span className="text-slate-500 font-medium truncate max-w-[200px]">
                              {y.source_name ?? 'Outcome Budget & Ministry Reports'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Election Manifesto Promises */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BadgeCheck size={18} strokeWidth={1.5} className="text-[#1A3D2F]" />
                    <h3 className="font-bold text-slate-900 text-base">Manifesto Promises Reality Check</h3>
                  </div>
                  <span className="rounded-full bg-purple-50 text-purple-700 px-2 py-0.5 text-xs font-bold">
                    {filteredPromises.length} Tracked
                  </span>
                </div>

                {filteredPromises.length === 0 ? (
                  <p className="text-xs text-slate-500">No promises listed under the current filter.</p>
                ) : (
                  <div className="space-y-4">
                    {filteredPromises.map((pr) => (
                      <div key={pr.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{pr.title}</h4>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold shrink-0 ${
                              pr.status === 'fulfilled'
                                ? 'bg-emerald-100 text-emerald-800'
                                : pr.status === 'partially_fulfilled'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {pr.status === 'fulfilled'
                              ? 'Fulfilled'
                              : pr.status === 'partially_fulfilled'
                              ? 'Partially Fulfilled'
                              : 'Broken / Unmet'}
                          </span>
                        </div>

                        <p className="mt-2 text-slate-600 leading-relaxed">{pr.description}</p>

                        {pr.reality_check && (
                          <div className="mt-2.5 rounded-lg bg-white border border-slate-200/80 p-2 text-[11px] text-slate-700">
                            <strong>Reality Check:</strong> {pr.reality_check}
                          </div>
                        )}

                        {/* Evidence, Sources & Updates */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-700 flex items-center gap-1">
                            <ShieldCheck size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
                            Evidence, Sources & Updates:
                          </span>
                          {pr.source_url ? (
                            <a
                              href={pr.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-purple-600 hover:underline inline-flex items-center gap-1 truncate max-w-[200px]"
                            >
                              <span>{pr.source_name ?? 'Official Manifesto'}</span>
                              <ExternalLink size={10} strokeWidth={1.5} />
                            </a>
                          ) : (
                            <span className="text-slate-500 font-medium truncate max-w-[200px]">
                              {pr.source_name ?? 'Party Manifesto & Parliamentary Starred Qs'}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            SECTION 4: TAX & PUBLIC SPENDING
            ======================================================== */}
        {(activePillarTab === 'all' || activePillarTab === 'tax') && (
          <section id="tax-spending" className="scroll-mt-24 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pillar 4 of 7</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Tax & Public Spending Records</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official budget authorizations, capital expenditures, and CAG audits associated with this party's tenure.
                </p>
              </div>
              <button
                onClick={() => navigate('/public-money')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
              >
                <span>National Public Money Tracker (10 Pillars)</span>
                <ExternalLink size={12} strokeWidth={1.5} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {relevantFinanceRecords.map((fin) => (
                <div
                  key={fin.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
                        {fin.figureType.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{fin.financialYear}</span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">{fin.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{fin.departmentOrMinistry}</p>

                    <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tracked Amount</p>
                      <p className="text-lg font-black text-slate-900">
                        ₹{fin.amountCr.toLocaleString('en-IN')} Crore
                      </p>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {fin.plainSummary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <ShieldCheck size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
                        Evidence, Sources & Updates:
                      </span>
                      <span className="text-slate-500 font-medium truncate max-w-[180px]" title={fin.source.documentTitle}>
                        {fin.source.documentTitle}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-50">
                      <span className="text-slate-400">Ref: {fin.source.tableOrPageReference}</span>
                      <button
                        onClick={() => navigate(`/public-money/${fin.section}`)}
                        className="font-semibold text-blue-600 hover:underline shrink-0"
                      >
                        View audit dossier &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            SECTION 5: INCIDENTS & LEGAL RECORDS
            ======================================================== */}
        {(activePillarTab === 'all' || activePillarTab === 'incidents') && (
          <section id="incidents" className="scroll-mt-24 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Pillar 5 of 7</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Incidents, Legal Records & Crises</h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Specific mass protests, agitations, violent incidents, and controversies under this party's state or union tenure.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-rose-100 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-800">
                  {filteredIncidents.length} Documented Records
                </span>
                <button
                  onClick={() => navigate('/incidents')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  View All National Records &rarr;
                </button>
              </div>
            </div>

            {filteredIncidents.length === 0 ? (
              <div className="rounded-xl border border-dashed border-rose-200 p-8 text-center text-xs text-slate-500">
                No incidents match the active filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {filteredIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {inc.category === 'protest' && (
                            <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                              Mass Agitation & Protest
                            </span>
                          )}
                          <h3 className="font-bold text-slate-900 text-base leading-snug">{inc.title}</h3>
                        </div>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            inc.severity === 'extreme'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {inc.severity === 'extreme' ? <ShieldAlert size={12} strokeWidth={1.5} /> : <AlertTriangle size={12} strokeWidth={1.5} />}
                          {inc.severity === 'extreme' ? 'Extreme' : 'Mild'}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        {inc.date_year && (
                          <span className="flex items-center gap-1 font-medium text-slate-600">
                            <Calendar size={12} strokeWidth={1.5} /> {inc.date_year}
                          </span>
                        )}
                        {inc.location && (
                          <span className="flex items-center gap-1 text-slate-600">
                            <MapPin size={12} strokeWidth={1.5} /> {inc.location}
                          </span>
                        )}
                        {inc.deaths_reported != null && inc.deaths_reported > 0 && (
                          <span className="flex items-center gap-1 font-bold text-red-700">
                            ~{inc.deaths_reported.toLocaleString('en-IN')} casualties
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{inc.description}</p>

                      {inc.demands && (
                        <div className="mt-3 rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A3D2F]">Protesters' Demands</p>
                          <p className="mt-1 text-xs text-slate-700 leading-relaxed">{inc.demands}</p>
                        </div>
                      )}

                      {inc.state_response && (
                        <div className="mt-2.5 rounded-lg border border-amber-200/80 bg-amber-50/60 p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-900">State Action & Police Response</p>
                          <p className="mt-1 text-xs text-slate-700 leading-relaxed">{inc.state_response}</p>
                        </div>
                      )}

                      {inc.citizen_impact && (
                        <div className="mt-2.5 rounded-lg border border-red-100 bg-red-50/70 p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-red-800">Impact on Citizens</p>
                          <p className="mt-1 text-xs text-slate-700 leading-relaxed">{inc.citizen_impact}</p>
                        </div>
                      )}
                    </div>

                    {(inc.source_url || inc.source_name) && (
                      <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
                          <ShieldCheck size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
                          Evidence, Sources & Updates:
                        </span>
                        {inc.source_url ? (
                          <a
                            href={inc.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
                          >
                            <span>{inc.source_name ?? 'Official Record'}</span>
                            <ExternalLink size={12} strokeWidth={1.5} />
                          </a>
                        ) : (
                          <span className="font-medium text-slate-600">{inc.source_name}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            SECTION 6: LEADERS
            ======================================================== */}
        {(activePillarTab === 'all' || activePillarTab === 'leaders') && (
          <section id="leaders" className="scroll-mt-24 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pillar 6 of 7</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Leaders</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Party leadership figures, parliamentary constituencies, and individual dossiers.
                </p>
              </div>
              <button
                onClick={() => navigate('/parties')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Browse all parties &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {leaders.map((l) => (
                <div
                  key={l.id}
                  onClick={() => navigate(`/leaders/${l.id}`)}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 cursor-pointer"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E5E0D8] bg-[#F5F2EB] font-bold text-[#181A19] shadow-xs text-base">
                        {l.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition text-base truncate">
                          {l.name}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{l.role}</p>
                        {l.represents && (
                          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 truncate">
                            <MapPin size={10} strokeWidth={1.5} /> {l.represents}
                          </p>
                        )}
                      </div>
                    </div>
                    {l.bio && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
                        {l.bio}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <ShieldCheck size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
                      Individual Record
                    </span>
                    <span className="font-semibold text-blue-600 group-hover:underline">
                      ECI Affidavits & Works &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            SECTION 7: POLICIES & LEGISLATIVE RECORD
            ======================================================== */}
        {(activePillarTab === 'all' || activePillarTab === 'policies') && (
          <section id="policies" className="scroll-mt-24 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pillar 7 of 7</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Policies & Legislative Record</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Landmark parliamentary acts passed, constitutional positions championed, and key legislative stances.
              </p>
            </div>

            {filteredLegislative.length === 0 ? (
              <p className="text-xs text-slate-500">No legislative records match the active filter.</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {filteredLegislative.map((leg) => (
                  <div
                    key={leg.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          leg.type === 'constitutional_amendment'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : leg.type === 'enacted_act'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : leg.type === 'opposed_bill'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {leg.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{leg.year}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{leg.title}</h3>

                    <p className="text-xs leading-relaxed text-slate-600">{leg.summary}</p>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                      <strong className="text-slate-800">Party Stance / Rationale:</strong>{' '}
                      <span className="text-slate-600">{leg.stance}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <ShieldCheck size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
                        Evidence, Sources & Updates:
                      </span>
                      {leg.source_url ? (
                        <a
                          href={leg.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:underline inline-flex items-center gap-1"
                        >
                          <span>{leg.source_name}</span>
                          <ExternalLink size={11} strokeWidth={1.5} />
                        </a>
                      ) : (
                        <span>{leg.source_name}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Compass; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#1A3D2F]" />
      <div>
        <dt className="text-[11px] font-bold uppercase tracking-wider text-[#717A74]">{label}</dt>
        <dd className="mt-0.5 font-medium text-[#181A19] text-xs">{value}</dd>
      </div>
    </div>
  );
}
