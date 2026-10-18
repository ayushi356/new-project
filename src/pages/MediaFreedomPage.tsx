import { useState, useMemo } from 'react';
import { useNavigate } from '@/lib/router';
import {
  Newspaper,
  ShieldAlert,
  Scale,
  Building2,
  Tv,
  Mic,
  DollarSign,
  WifiOff,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Filter,
  Search,
  BookOpen,
  ArrowRight,
  UserCheck,
  Calendar,
  MapPin,
  TrendingUp,
  FileText,
  Info,
  Radio,
  Share2,
} from 'lucide-react';
import {
  MEDIA_INCIDENTS,
  LEADER_INTERVIEW_RECORDS,
  PERIOD_COMPARISONS,
  METHODOLOGY_SOURCE_LIBRARY,
} from '@/data/mediaFreedomData';
import type { MediaCategory, MediaIncident } from '@/types/mediaFreedom';

const CATEGORY_TABS: { id: MediaCategory | 'all'; label: string; icon: any }[] = [
  { id: 'all', label: 'All Topics', icon: Newspaper },
  { id: 'unscripted_interviews', label: 'Unscripted Press Access', icon: Mic },
  { id: 'journalist_safety', label: 'Journalist Safety', icon: ShieldAlert },
  { id: 'legal_cases', label: 'Criminal & UAPA Cases', icon: Scale },
  { id: 'media_ownership', label: 'Media Ownership', icon: Building2 },
  { id: 'regulatory_censorship', label: 'Regulatory Censorship', icon: Tv },
  { id: 'govt_ads_financial', label: 'Government Ads & Spending', icon: DollarSign },
  { id: 'digital_blockades', label: 'Internet Shutdowns', icon: WifiOff },
  { id: 'disinformation_corrections', label: 'Fact-Check Corrections', icon: CheckCircle2 },
];

export function MediaFreedomPage() {
  const navigate = useNavigate();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory | 'all'>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [evidenceFilter, setEvidenceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Leader interviews party filter
  const [leaderPartyFilter, setLeaderPartyFilter] = useState<string>('all');

  // Expanded card state
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Filtered incidents
  const filteredIncidents = useMemo(() => {
    return MEDIA_INCIDENTS.filter((inc) => {
      // Category
      if (selectedCategory !== 'all' && inc.category !== selectedCategory) return false;

      // Year
      if (yearFilter !== 'all') {
        if (yearFilter === '2026' && inc.year !== 2026) return false;
        if (yearFilter === '2025' && inc.year !== 2025) return false;
        if (yearFilter === '2024' && inc.year !== 2024) return false;
        if (yearFilter === '2023' && inc.year !== 2023) return false;
        if (yearFilter === 'pre2023' && inc.year >= 2023) return false;
      }

      // State
      if (stateFilter !== 'all' && !inc.state.toLowerCase().includes(stateFilter.toLowerCase())) {
        return false;
      }

      // Evidence Status
      if (evidenceFilter !== 'all' && inc.evidenceStatus !== evidenceFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          inc.title.toLowerCase().includes(q) ||
          inc.whatHappened.toLowerCase().includes(q) ||
          inc.whoWasInvolved.toLowerCase().includes(q) ||
          inc.institution.toLowerCase().includes(q) ||
          inc.state.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [selectedCategory, yearFilter, stateFilter, evidenceFilter, searchQuery]);

  // Filtered leaders
  const filteredLeaders = useMemo(() => {
    if (leaderPartyFilter === 'all') return LEADER_INTERVIEW_RECORDS;
    return LEADER_INTERVIEW_RECORDS.filter((l) => l.partyId === leaderPartyFilter);
  }, [leaderPartyFilter]);

  // Unique states for filter
  const stateOptions = useMemo(() => {
    const set = new Set<string>();
    MEDIA_INCIDENTS.forEach((i) => {
      const parts = i.state.split(/[/,&]/);
      parts.forEach((p) => set.add(p.trim()));
    });
    return Array.from(set).sort();
  }, []);

  const resetFilters = () => {
    setSelectedCategory('all');
    setYearFilter('all');
    setStateFilter('all');
    setEvidenceFilter('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    yearFilter !== 'all' ||
    stateFilter !== 'all' ||
    evidenceFilter !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="pb-24">
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-14 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1 text-xs font-bold text-indigo-300 uppercase tracking-wider">
              <Radio size={14} className="animate-pulse" />
              <span>Public Accountability & Fourth Estate</span>
            </div>
            <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white">
              Media & Press Freedom
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-medium text-indigo-200/90 leading-relaxed">
              Can the public access information, question those in power, and hold institutions accountable?
            </p>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              An evidence-backed public record tracking journalist safety, criminal prosecutions, corporate ownership concentration, regulatory emergency orders, internet blockades, and direct unscripted press access across governing periods.
            </p>
          </div>

          {/* Quick Pillar Jump Navigation */}
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-800 text-xs font-semibold">
            <a href="#overview" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 transition">
              1. Overview & Trends
            </a>
            <a href="#leader-interviews" className="rounded-lg bg-indigo-500/30 hover:bg-indigo-500/40 border border-indigo-400/40 text-indigo-200 px-3 py-1.5 transition flex items-center gap-1.5 font-bold">
              <Mic size={13} />
              <span>Leader Interview Tracker</span>
            </a>
            <a href="#browse-topics" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 transition">
              2. Browse by Topic
            </a>
            <a href="#case-records" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 transition">
              3. Case Records ({MEDIA_INCIDENTS.length})
            </a>
            <a href="#compare-periods" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 transition">
              4. Compare Administrations
            </a>
            <a href="#methodology" className="rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 transition">
              5. Methodology & Sources
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-16">
        {/* ========================================================
            SECTION 1: OVERVIEW AND TRENDS
            ======================================================== */}
        <section id="overview" className="scroll-mt-24 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Section 1</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Overview & National Trends</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Macro indicators tracking press safety, legal actions, censorship orders, and global benchmarks.
            </p>
          </div>

          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tracked Incidents</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{MEDIA_INCIDENTS.length}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Judicially Documented</p>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-600">World Press Rank</p>
              <p className="text-2xl font-black text-rose-700 mt-1">159 / 180</p>
              <p className="text-[11px] text-rose-600 mt-0.5">Down from 140 in 2014</p>
            </div>
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">PM Press Meets</p>
              <p className="text-2xl font-black text-indigo-700 mt-1">0</p>
              <p className="text-[11px] text-indigo-600 mt-0.5">Solo Open Conferences (12 yrs)</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Net Shutdowns</p>
              <p className="text-2xl font-black text-amber-700 mt-1">#1 Global</p>
              <p className="text-[11px] text-amber-700 mt-0.5">5 Consecutive Years</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Central Ad Spend</p>
              <p className="text-2xl font-black text-slate-900 mt-1">₹6,490+ Cr</p>
              <p className="text-[11px] text-slate-500 mt-0.5">CBC Central 10-Yr Total</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Judicial Stays</p>
              <p className="text-2xl font-black text-emerald-700 mt-1">4 Major</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">Sec 66A, FCU, MediaOne, Purkayastha</p>
            </div>
          </div>

          {/* Scope, Sources & Critical Data Gaps Overview Box */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar size={15} className="text-blue-600" />
                <span>Period & Geographic Coverage</span>
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Covers national and state-level records from <strong>2014 to October 2026</strong>, benchmarked against a 2004–2014 historical baseline. Geographic scope includes the National Capital (Union Government jurisdiction) and major states across India (West Bengal, Punjab, Karnataka, Uttar Pradesh, Maharashtra, Kerala, Jammu & Kashmir).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FileText size={15} className="text-emerald-600" />
                <span>Primary Verification Sources</span>
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Aggregates certified Supreme Court and High Court judgments, parliamentary answers in Lok Sabha/Rajya Sabha, CAG performance audits, SEBI filings, Ministry of I&B notifications, Press Council of India (PCI) directives, and NBDSA self-regulatory rulings.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5 shadow-xs">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle size={15} className="text-amber-600" />
                <span>Recognized Gaps in Public Data</span>
              </h3>
              <p className="mt-2 text-xs text-amber-800 leading-relaxed">
                State police frequently register FIRs under generic penal provisions rather than journalist-specific records; private cross-media shareholding structures and algorithmic shadow-bans on digital platforms remain opaque due to lack of mandatory statutory disclosure laws.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            SPECIAL FEATURE: INDEPENDENT INTERVIEWS & PRESS CONFERENCES
            ======================================================== */}
        <section id="leader-interviews" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <UserCheck size={14} />
                <span>Executive Accountability</span>
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                Independent Interviews & Press Conferences Given by Leaders
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified tally of unscripted one-on-one interviews with critical/adversarial press vs open press conferences where spontaneous floor questions were permitted.
              </p>
            </div>

            {/* Filter by Party */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">
              <span className="px-2 text-slate-400 uppercase text-[10px] font-bold">Party:</span>
              {['all', 'party-bjp', 'party-inc', 'party-aap', 'party-tmc'].map((pId) => (
                <button
                  key={pId}
                  onClick={() => setLeaderPartyFilter(pId)}
                  className={`rounded-lg px-2.5 py-1 text-xs transition ${
                    leaderPartyFilter === pId
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pId === 'all'
                    ? 'All'
                    : pId === 'party-bjp'
                    ? 'BJP'
                    : pId === 'party-inc'
                    ? 'INC'
                    : pId === 'party-aap'
                    ? 'AAP'
                    : 'TMC'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredLeaders.map((l) => (
              <div
                key={l.leaderId}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:shadow-md"
              >
                <div>
                  {/* Leader Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-xs text-base"
                        style={{ backgroundColor: l.avatarColor }}
                      >
                        {l.leaderName.charAt(0)}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{l.leaderName}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{l.partyName}</p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shrink-0 ${
                        l.accessRating === 'High Open Access'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : l.accessRating === 'Moderate / Selective'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {l.accessRating}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-600 mt-2">{l.role}</p>

                  {/* Core Metrics Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-2.5">
                      <p className="text-lg font-black text-slate-900">
                        {l.independentUnscriptedInterviews}
                      </p>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        Unscripted 1-on-1s
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-2.5">
                      <p className="text-lg font-black text-indigo-700">{l.openPressConferences}</p>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                        Open Press Meets
                      </p>
                    </div>
                  </div>

                  {/* Scripted vs Unscripted Ratio Bar */}
                  <div className="mt-3 rounded-lg bg-slate-50 p-2 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Scripted / Friendly: <strong>{l.scriptedFriendlyInterviews}</strong></span>
                      <span className="font-semibold text-slate-700">{l.ratioDescription}</span>
                    </div>
                  </div>

                  {/* Notable Encounters & Press Policy */}
                  <div className="mt-3.5 space-y-2 text-xs text-slate-600 leading-relaxed">
                    <p>
                      <strong className="text-slate-800">Media Policy:</strong> {l.recordedPressPolicy}
                    </p>
                    <p className="line-clamp-3 text-[11px] text-slate-500">
                      <strong className="text-slate-700">Notable Record:</strong> {l.keyNotableEncounters}
                    </p>
                  </div>
                </div>

                {/* Evidence Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[220px]" title={l.evidenceReference}>
                    {l.evidenceReference}
                  </span>
                  <button
                    onClick={() => navigate(`/leaders/${l.leaderId}`)}
                    className="font-semibold text-blue-600 hover:underline shrink-0"
                  >
                    View Dossier &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 2: BROWSE BY TOPIC (8 CATEGORIES & FILTERS)
            ======================================================== */}
        <section id="browse-topics" className="scroll-mt-24 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Section 2</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Browse by Topic</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore documented records across the eight constitutional pillars of media freedom.
            </p>
          </div>

          {/* 8 Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = selectedCategory === tab.id;
              const count =
                tab.id === 'all'
                  ? MEDIA_INCIDENTS.length
                  : MEDIA_INCIDENTS.filter((i) => i.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Multi-Filter Bar: Year, State, Evidence Status, Search */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {/* Search Query */}
              <div className="relative lg:col-span-2">
                <Search size={14} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search journalist, case, law, agency..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Year Filter */}
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Years</option>
                <option value="2026">2026 (Latest)</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="pre2023">2022 & Prior</option>
              </select>

              {/* State Filter */}
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All States / Regions</option>
                {stateOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {/* Evidence Status */}
              <select
                value={evidenceFilter}
                onChange={(e) => setEvidenceFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Evidence Types</option>
                <option value="Documented Judicial Record">Documented Judicial Record</option>
                <option value="Official Gazette / Order">Official Gazette / Order</option>
                <option value="Verified Media Investigation">Verified Investigation</option>
              </select>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>
                  Showing {filteredIncidents.length} of {MEDIA_INCIDENTS.length} case records
                </span>
                <button
                  onClick={resetFilters}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: CASE RECORDS (WHAT HAPPENED, ESTABLISHED VS DISPUTED)
            ======================================================== */}
        <section id="case-records" className="scroll-mt-24 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Section 3</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              Verified Case Records & Forensic Disclosures
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Each record separates proven facts and certified court findings from contested political claims, response from the state, and current legal status.
            </p>
          </div>

          {filteredIncidents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-xs text-slate-500">
              No press freedom records match your active filter criteria.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredIncidents.map((inc) => {
                const isExpanded = expandedCardId === inc.id;

                return (
                  <article
                    key={inc.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:shadow-md"
                  >
                    {/* Header meta badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-900 text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          {inc.categoryLabel}
                        </span>
                        <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-0.5 text-[11px] font-semibold flex items-center gap-1">
                          <MapPin size={11} /> {inc.state}
                        </span>
                        <span className="rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-0.5 text-[10px] font-bold">
                          {inc.governingLevel}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
                          {inc.evidenceStatus}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">{inc.year}</span>
                      </div>
                    </div>

                    {/* Incident Title */}
                    <h3 className="mt-3 text-lg sm:text-xl font-bold text-slate-900">
                      {inc.title}
                    </h3>

                    {/* What Happened (Core summary) */}
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {inc.whatHappened}
                    </p>

                    {/* Who Was Involved */}
                    <div className="mt-3.5 rounded-xl bg-slate-50 border border-slate-100 p-3 text-xs">
                      <strong className="text-slate-800">Parties Involved:</strong>{' '}
                      <span className="text-slate-600">{inc.whoWasInvolved}</span>
                    </div>

                    {/* Deep Dive Grid: Established vs Disputed */}
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-[11px] uppercase tracking-wider mb-1.5">
                          <CheckCircle2 size={13} className="text-emerald-700" />
                          <span>What Is Established</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{inc.whatIsEstablished}</p>
                      </div>

                      <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px] uppercase tracking-wider mb-1.5">
                          <AlertTriangle size={13} className="text-amber-700" />
                          <span>What Is Disputed</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{inc.whatIsDisputed}</p>
                      </div>
                    </div>

                    {/* Response from Government or Outlet */}
                    <div className="mt-3.5 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs">
                      <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
                        Response from Government or Media Outlet:
                      </p>
                      <p className="text-slate-600 leading-relaxed">{inc.responseFromGovtOrOutlet}</p>
                    </div>

                    {/* Current Status and Evidence Source Footer */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">Current Status:</span>
                        <span className="text-slate-600 font-medium">{inc.currentStatus}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-slate-400 text-[11px]">Source: {inc.sourceName}</span>
                        {inc.sourceUrl && (
                          <a
                            href={inc.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 underline text-xs"
                          >
                            <span>Inspect Source</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================================
            SECTION 4: COMPARE PERIODS AND ADMINISTRATIONS
            ======================================================== */}
        <section id="compare-periods" className="scroll-mt-24 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Section 4</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              Compare Periods & Administrations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Rigorous comparative baseline data distinguishing Union Government responsibilities from State Government police jurisdictions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PERIOD_COMPARISONS.map((period, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                      {period.level} Governance
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{period.timeline}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-900">{period.periodName}</h3>
                  <p className="text-xs font-medium text-indigo-600 mt-0.5">{period.governingBody}</p>

                  {/* Quantitative Baseline Metrics */}
                  <div className="mt-5 space-y-2.5 border-y border-slate-100 py-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Avg Journalist Arrests/Yr:</span>
                      <strong className="text-slate-900">{period.metrics.avgJournalistArrestsPerYear}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Avg Internet Shutdowns/Yr:</span>
                      <strong className="text-slate-900">{period.metrics.avgInternetShutdownsPerYear}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">World Press Freedom Rank:</span>
                      <strong className="text-rose-700">{period.metrics.worldPressFreedomRankRange}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Unscripted PM/CM Press Meets:</span>
                      <strong className="text-slate-900">{period.metrics.unscriptedPressConferencesByHead}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">UAPA/Sedition Cases on Media:</span>
                      <strong className="text-slate-900">{period.metrics.seditionOrUAPAMediaCasesTotal}</strong>
                    </div>
                  </div>

                  {/* Key Policy Milestones */}
                  <div className="mt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Structural Developments
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {period.keyPolicyMilestones.map((milestone, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-1.5">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Attribution Methodology Analysis */}
                <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 p-3 text-[11px] text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Attribution Analysis:</strong>{' '}
                  {period.attributionAnalysis}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SECTION 5: METHODOLOGY AND SOURCE LIBRARY
            ======================================================== */}
        <section id="methodology" className="scroll-mt-24 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Section 5</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              Methodology & Source Library
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Auditable evidentiary standards, correction procedures, and direct access to primary legal records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Evidentiary Selection Criteria */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Scale size={18} className="text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Evidentiary Qualification Criteria</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                {METHODOLOGY_SOURCE_LIBRARY.selectionCriteria.map((crit, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Correction & Review Protocol
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {METHODOLOGY_SOURCE_LIBRARY.correctionProtocol}
                </p>
              </div>
            </div>

            {/* Direct Source Library Inspector */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base">Constitutional Document Library</h3>
                </div>
                <span className="text-xs text-slate-400">Direct Certified Links</span>
              </div>

              <div className="space-y-3">
                {METHODOLOGY_SOURCE_LIBRARY.sourceLibraryDocuments.map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 transition hover:bg-slate-100/70"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-900 text-xs leading-snug">{doc.title}</h4>
                      <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shrink-0">
                        {doc.citation}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">{doc.description}</p>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 underline"
                    >
                      <span>Inspect Official Record</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
