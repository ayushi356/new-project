import { useState, useMemo } from 'react';
import { useNavigate } from '@/lib/router';
import {
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  MEDIA_INCIDENTS,
  LEADER_INTERVIEW_RECORDS,
  PERIOD_COMPARISONS,
  METHODOLOGY_SOURCE_LIBRARY,
} from '@/data/mediaFreedomData';
import type { MediaCategory, MediaIncident } from '@/types/mediaFreedom';
import { AccessibleChart } from '@/components/AccessibleChart';

const SHUTDOWN_TREND_DATA = [
  { label: '2014', value: 6, note: '6 documented orders (Localized preventive suspensions)', color: '#1A3D2F' },
  { label: '2016', value: 31, note: '31 orders (Burhan Wani unrest, Haryana quota protests)', color: '#1A3D2F' },
  { label: '2018', value: 134, note: '134 orders (National peak in state-level preemptive orders)', color: '#B45309' },
  { label: '2020', value: 109, note: '109 orders (J&K post-370 speed restrictions & CAA protests)', color: '#1A3D2F' },
  { label: '2022', value: 84, note: '84 orders (Agnipath protests, communal tension orders)', color: '#1A3D2F' },
  { label: '2024', value: 106, note: '106 orders (Manipur ethnic conflict 7+ months & Farmer march)', color: '#1A3D2F' },
  { label: '2026', value: 88, note: '88 orders (Exam cheating prevention & local law-and-order)', color: '#1A3D2F' },
];

const CATEGORY_TABS: { id: MediaCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'unscripted_interviews', label: 'Unscripted Press Access' },
  { id: 'journalist_safety', label: 'Journalist Safety' },
  { id: 'legal_cases', label: 'Criminal & UAPA Cases' },
  { id: 'media_ownership', label: 'Media Ownership' },
  { id: 'regulatory_censorship', label: 'Regulatory Censorship' },
  { id: 'govt_ads_financial', label: 'Government Ads & Spending' },
  { id: 'digital_blockades', label: 'Internet Shutdowns' },
  { id: 'disinformation_corrections', label: 'Fact-Check Corrections' },
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

  // Expanded leader records inspection
  const [expandedLeaderId, setExpandedLeaderId] = useState<string | null>(null);

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
          HERO SECTION — EDITORIAL WARM IVORY & FOREST GREEN
          ======================================================== */}
      <section className="relative overflow-hidden bg-[#F4F1EA] border-b border-[#E5E0D8] text-[#181A19] py-12 sm:py-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1A3D2F]/10 border border-[#1A3D2F]/20 px-3.5 py-1 text-xs font-medium text-[#1A3D2F] uppercase tracking-wider">
              <span>Public Accountability & Fourth Estate · Freedom of Expression</span>
            </div>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#181A19]">
              Media & Press Freedom
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-medium text-[#1A3D2F] leading-relaxed">
              Can the public access information, question those in power, and hold institutions accountable?
            </p>
            <p className="mt-2 text-sm text-[#5C645E] leading-relaxed">
              An evidence-backed public record tracking journalist safety, criminal prosecutions, corporate ownership concentration, regulatory emergency orders, internet blockades, and direct unscripted press access across governing periods.
            </p>
          </div>

          {/* Quick Pillar Jump Navigation */}
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-[#E5E0D8] text-xs font-medium">
            <a href="#overview" className="rounded-lg border border-[#E5E0D8] bg-white text-[#181A19] hover:bg-[#FAF8F5] px-3.5 py-1.5 transition">
              1. Overview & Trends
            </a>
            <a href="#leader-interviews" className="rounded-lg bg-[#1A3D2F] text-white hover:bg-[#143025] px-3.5 py-1.5 transition font-medium">
              Leader Interview Tracker
            </a>
            <a href="#browse-topics" className="rounded-lg border border-[#E5E0D8] bg-white text-[#181A19] hover:bg-[#FAF8F5] px-3.5 py-1.5 transition">
              2. Browse by Topic
            </a>
            <a href="#case-records" className="rounded-lg border border-[#E5E0D8] bg-white text-[#181A19] hover:bg-[#FAF8F5] px-3.5 py-1.5 transition">
              3. Case Records ({MEDIA_INCIDENTS.length})
            </a>
            <a href="#compare-periods" className="rounded-lg border border-[#E5E0D8] bg-white text-[#181A19] hover:bg-[#FAF8F5] px-3.5 py-1.5 transition">
              4. Compare Administrations
            </a>
            <a href="#methodology" className="rounded-lg border border-[#E5E0D8] bg-white text-[#181A19] hover:bg-[#FAF8F5] px-3.5 py-1.5 transition">
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
          <div className="border-b border-[#E5E0D8] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C645E]">Section 1</span>
            <h2 className="text-2xl font-serif font-bold text-[#181A19] mt-0.5">Overview & National Trends</h2>
            <p className="text-xs text-[#5C645E] mt-0.5">
              Macro indicators tracking press safety, legal actions, censorship orders, and global benchmarks.
            </p>
          </div>

          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C645E]">Tracked Incidents</p>
              <p className="text-2xl font-serif font-bold text-[#181A19] mt-1">{MEDIA_INCIDENTS.length}</p>
              <p className="text-[11px] text-[#5C645E] mt-0.5">Judicially Documented</p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C645E]">World Press Rank</p>
              <p className="text-2xl font-serif font-bold text-[#181A19] mt-1">159 / 180</p>
              <p className="text-[11px] text-[#5C645E] mt-0.5">Down from 140 in 2014</p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C645E]">PM Press Meets</p>
              <p className="text-2xl font-serif font-bold text-[#181A19] mt-1">0</p>
              <p className="text-[11px] text-[#5C645E] mt-0.5">Solo Open Conferences (12 yrs)</p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C645E]">Net Shutdowns</p>
              <p className="text-2xl font-serif font-bold text-[#B45309] mt-1">#1 Global</p>
              <p className="text-[11px] text-[#5C645E] mt-0.5">5 Consecutive Years</p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C645E]">Central Ad Spend</p>
              <p className="text-2xl font-serif font-bold text-[#181A19] mt-1">₹6,490+ Cr</p>
              <p className="text-[11px] text-[#5C645E] mt-0.5">CBC Central 10-Yr Total</p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C645E]">Judicial Stays</p>
              <p className="text-2xl font-serif font-bold text-[#1A3D2F] mt-1">4 Major</p>
              <p className="text-[11px] text-[#5C645E] mt-0.5">Sec 66A, FCU, MediaOne, Purkayastha</p>
            </div>
          </div>

          {/* Scope, Sources & Critical Data Gaps Overview Box */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-xs">
              <h3 className="text-sm font-serif font-bold text-[#181A19]">
                Period & Geographic Coverage
              </h3>
              <p className="mt-2 text-xs text-[#5C645E] leading-relaxed">
                Covers national and state-level records from <strong>2014 to October 2026</strong>, benchmarked against a 2004–2014 historical baseline. Geographic scope includes the National Capital (Union Government jurisdiction) and major states across India (West Bengal, Punjab, Karnataka, Uttar Pradesh, Maharashtra, Kerala, Jammu & Kashmir).
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-xs">
              <h3 className="text-sm font-serif font-bold text-[#181A19]">
                Primary Verification Sources
              </h3>
              <p className="mt-2 text-xs text-[#5C645E] leading-relaxed">
                Aggregates certified Supreme Court and High Court judgments, parliamentary answers in Lok Sabha/Rajya Sabha, CAG performance audits, SEBI filings, Ministry of I&B notifications, Press Council of India (PCI) directives, and NBDSA self-regulatory rulings.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-5 shadow-xs">
              <h3 className="text-sm font-serif font-bold text-[#181A19]">
                Recognized Gaps in Public Data
              </h3>
              <p className="mt-2 text-xs text-[#5C645E] leading-relaxed">
                State police frequently register FIRs under generic penal provisions rather than journalist-specific records; private cross-media shareholding structures and algorithmic shadow-bans on digital platforms remain opaque due to lack of mandatory statutory disclosure laws.
              </p>
            </div>
          </div>

          {/* Trend Chart: Documented Internet Shutdowns */}
          <AccessibleChart
            title="Documented Internet Shutdown Orders in India: 2014 to 2026"
            unit="Orders Tracked"
            referencePeriod="Calendar Years 2014 – 2026 (Oct)"
            takeaway="Suspension of mobile and fixed-line data under Section 5(2) of the Indian Telegraph Act and 2017 Temporary Suspension Rules escalated from 6 localized orders in 2014 to over 100 annual orders. While initially concentrated in border conflict zones, state home departments across political parties increasingly invoke internet blackouts as preemptive crowd control during examinations and political protests."
            sourceName="Software Freedom Law Center (SFLC.in tracker) & Supreme Court Anuradha Bhasin Compliance Records"
            sourceUrl="https://sflc.in/"
            limitations="India lacks a centralized statutory public registry of telecom suspension orders. Data relies on state gazettes, RTI queries, and telecommunications operator disclosures collated by civil society."
            data={SHUTDOWN_TREND_DATA}
          />
        </section>

        {/* ========================================================
            SPECIAL FEATURE: INDEPENDENT INTERVIEWS & PRESS CONFERENCES
            ======================================================== */}
        <section id="leader-interviews" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E0D8] pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C645E]">
                Executive Accountability
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#181A19] mt-0.5">
                Independent Interviews & Press Conferences Given by Leaders
              </h2>
              <p className="text-xs text-[#5C645E] mt-0.5">
                Verified tally of unscripted one-on-one interviews with critical/adversarial press vs open press conferences where spontaneous floor questions were permitted.
              </p>
            </div>

            {/* Filter by Party */}
            <div className="flex items-center gap-1.5 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-1 text-xs font-medium">
              <span className="px-2 text-[#5C645E] uppercase text-[10px] font-bold">Party:</span>
              {['all', 'party-bjp', 'party-inc', 'party-aap', 'party-tmc'].map((pId) => (
                <button
                  key={pId}
                  onClick={() => setLeaderPartyFilter(pId)}
                  className={`rounded-lg px-2.5 py-1 text-xs transition ${
                    leaderPartyFilter === pId
                      ? 'bg-[#1A3D2F] text-white shadow-xs'
                      : 'text-[#181A19] hover:bg-white'
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

          {/* Editorial Context Banner */}
          <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 text-xs text-[#5C645E] leading-relaxed">
            <strong className="text-[#181A19]">Methodological Context:</strong> Documented interview and conference counts reflect verified transcripts from parliamentary press galleries, Press Club of India registers, and certified broadcast feeds (2014–2026). While spontaneous press availability provides vital insight into executive openness, it is evaluated alongside journalist safety, legal filings, and administrative actions rather than as a single definitive measure of freedom.
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredLeaders.map((l) => {
              const isExpanded = expandedLeaderId === l.leaderId;

              return (
                <div
                  key={l.leaderId}
                  className="flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-xs transition hover:border-[#D5CFBF]"
                >
                  <div>
                    {/* Leader Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-serif font-bold text-base bg-[#F5F2EB] text-[#181A19] border border-[#E5E0D8]">
                          {l.leaderName.charAt(0)}
                        </span>
                        <div>
                          <h3 className="font-serif font-bold text-[#181A19] text-base">{l.leaderName}</h3>
                          <p className="text-xs text-[#5C645E] mt-0.5">{l.partyName}</p>
                        </div>
                      </div>

                      <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-0.5 text-[10px] font-medium text-[#181A19] shrink-0">
                        {l.accessRating}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-[#5C645E] mt-2">{l.role}</p>

                    {/* Core Metrics Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                      <div className="rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] p-2.5">
                        <p className="text-xl font-serif font-bold text-[#181A19]">
                          {l.independentUnscriptedInterviews}
                        </p>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-[#5C645E] mt-0.5">
                          Unscripted 1-on-1s
                        </p>
                        <p className="text-[9px] text-[#5C645E]">Adversarial / unvetted Q&A</p>
                      </div>
                      <div className="rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] p-2.5">
                        <p className="text-xl font-serif font-bold text-[#1A3D2F]">
                          {l.openPressConferences}
                        </p>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-[#5C645E] mt-0.5">
                          Open Press Meets
                        </p>
                        <p className="text-[9px] text-[#5C645E]">Spontaneous floor questions</p>
                      </div>
                    </div>

                    {/* Scripted vs Unscripted Ratio Bar */}
                    <div className="mt-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-2 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-[#5C645E]">
                        <span>Scripted / Friendly: <strong className="text-[#181A19]">{l.scriptedFriendlyInterviews}</strong></span>
                        <span className="font-semibold text-[#181A19]">{l.ratioDescription}</span>
                      </div>
                    </div>

                    {/* Brief Summary */}
                    <div className="mt-3 space-y-1.5 text-xs text-[#5C645E] leading-relaxed">
                      <p className="line-clamp-2">
                        <strong className="text-[#181A19]">Recorded Policy:</strong> {l.recordedPressPolicy}
                      </p>
                    </div>

                    {/* Expanded Record Inspection */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-[#E5E0D8] space-y-2.5 text-xs text-[#5C645E] leading-relaxed">
                        <div>
                          <strong className="text-[#181A19] block mb-0.5">Full Media Policy:</strong>
                          <p>{l.recordedPressPolicy}</p>
                        </div>
                        <div>
                          <strong className="text-[#181A19] block mb-0.5">Notable Encounters & Context:</strong>
                          <p>{l.keyNotableEncounters}</p>
                        </div>
                        <div>
                          <strong className="text-[#181A19] block mb-0.5">Last Open Press Conference:</strong>
                          <p>{l.lastOpenPressConferenceDate}</p>
                        </div>
                        <div className="rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-[11px]">
                          <strong className="text-[#181A19] block mb-0.5">Primary Verification Source:</strong>
                          <p className="text-[#5C645E]">{l.evidenceReference}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer with Expand & Dossier Links */}
                  <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-[11px]">
                    <button
                      onClick={() => setExpandedLeaderId(isExpanded ? null : l.leaderId)}
                      className="font-medium text-[#1A3D2F] hover:underline flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Hide Records' : 'Inspect Records'}</span>
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>

                    <button
                      onClick={() => navigate(`/leaders/${l.leaderId}`)}
                      className="font-medium text-[#5C645E] hover:text-[#181A19] hover:underline"
                    >
                      View Dossier &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 2: BROWSE BY TOPIC (8 CATEGORIES & FILTERS)
            ======================================================== */}
        <section id="browse-topics" className="scroll-mt-24 space-y-6">
          <div className="border-b border-[#E5E0D8] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C645E]">Section 2</span>
            <h2 className="text-2xl font-serif font-bold text-[#181A19] mt-0.5">Browse by Topic</h2>
            <p className="text-xs text-[#5C645E] mt-0.5">
              Explore documented records across the eight constitutional pillars of media freedom.
            </p>
          </div>

          {/* 8 Category Pills (Text-first) */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_TABS.map((tab) => {
              const active = selectedCategory === tab.id;
              const count =
                tab.id === 'all'
                  ? MEDIA_INCIDENTS.length
                  : MEDIA_INCIDENTS.filter((i) => i.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition ${
                    active
                      ? 'bg-[#1A3D2F] text-white shadow-xs'
                      : 'border border-[#E5E0D8] bg-white text-[#181A19] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      active ? 'bg-white/20 text-white' : 'bg-[#F5F2EB] text-[#5C645E]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Multi-Filter Bar: Year, State, Evidence Status, Search */}
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {/* Search Query */}
              <div className="relative lg:col-span-2">
                <Search size={14} className="absolute left-3.5 top-3 text-[#5C645E]" />
                <input
                  type="text"
                  placeholder="Search journalist, case, law, agency..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] pl-9 pr-3 py-2 text-xs text-[#181A19] placeholder-[#5C645E] focus:bg-white focus:outline-hidden focus:border-[#1A3D2F]"
                />
              </div>

              {/* Year Filter */}
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] px-3 py-2 text-xs text-[#181A19] focus:bg-white focus:outline-hidden focus:border-[#1A3D2F]"
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
                className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] px-3 py-2 text-xs text-[#181A19] focus:bg-white focus:outline-hidden focus:border-[#1A3D2F]"
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
                className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] px-3 py-2 text-xs text-[#181A19] focus:bg-white focus:outline-hidden focus:border-[#1A3D2F]"
              >
                <option value="all">All Evidence Types</option>
                <option value="Documented Judicial Record">Documented Judicial Record</option>
                <option value="Official Gazette / Order">Official Gazette / Order</option>
                <option value="Verified Media Investigation">Verified Investigation</option>
              </select>
            </div>

            {hasActiveFilters && (
              <div className="mt-3 pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#5C645E]">
                <span>
                  Showing {filteredIncidents.length} of {MEDIA_INCIDENTS.length} case records
                </span>
                <button
                  onClick={resetFilters}
                  className="font-medium text-[#1A3D2F] hover:underline"
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
          <div className="border-b border-[#E5E0D8] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C645E]">Section 3</span>
            <h2 className="text-2xl font-serif font-bold text-[#181A19] mt-0.5">
              Verified Case Records & Forensic Disclosures
            </h2>
            <p className="text-xs text-[#5C645E] mt-0.5">
              Each record separates proven facts and certified court findings from contested political claims, response from the state, and current legal status.
            </p>
          </div>

          {filteredIncidents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E5E0D8] p-12 text-center text-xs text-[#5C645E]">
              No press freedom records match your active filter criteria.
            </div>
          ) : (
            <div className="space-y-6">
              {filteredIncidents.map((inc) => (
                <article
                  key={inc.id}
                  className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-xs transition hover:border-[#D5CFBF]"
                >
                  {/* Header meta badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-[#E5E0D8] bg-[#F5F2EB] text-[#181A19] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                        {inc.categoryLabel}
                      </span>
                      <span className="rounded-md border border-[#E5E0D8] bg-white text-[#5C645E] px-2.5 py-0.5 text-[11px] font-medium">
                        {inc.state}
                      </span>
                      <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] text-[#1A3D2F] px-2.5 py-0.5 text-[10px] font-medium">
                        {inc.governingLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-[#D5CFBF] bg-[#F5F2EB] text-[#181A19] px-2.5 py-0.5 text-[10px] font-medium">
                        {inc.evidenceStatus}
                      </span>
                      <span className="text-xs text-[#5C645E] font-medium">{inc.year}</span>
                    </div>
                  </div>

                  {/* Incident Title */}
                  <h3 className="mt-3 text-lg sm:text-xl font-serif font-bold text-[#181A19]">
                    {inc.title}
                  </h3>

                  {/* What Happened (Core summary) */}
                  <p className="mt-2 text-sm leading-relaxed text-[#181A19]">
                    {inc.whatHappened}
                  </p>

                  {/* Who Was Involved */}
                  <div className="mt-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-3 text-xs">
                    <strong className="text-[#181A19]">Parties Involved:</strong>{' '}
                    <span className="text-[#5C645E]">{inc.whoWasInvolved}</span>
                  </div>

                  {/* Deep Dive Grid: Established vs Disputed */}
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-[#E5E0D8] bg-white p-4 text-xs">
                      <div className="font-semibold text-[#1A3D2F] text-[11px] uppercase tracking-wider mb-1.5">
                        What Is Established
                      </div>
                      <p className="text-[#181A19] leading-relaxed">{inc.whatIsEstablished}</p>
                    </div>

                    <div className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-4 text-xs">
                      <div className="font-semibold text-[#B45309] text-[11px] uppercase tracking-wider mb-1.5">
                        What Is Disputed
                      </div>
                      <p className="text-[#5C645E] leading-relaxed">{inc.whatIsDisputed}</p>
                    </div>
                  </div>

                  {/* Response from Government or Outlet */}
                  <div className="mt-3.5 rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-3.5 text-xs">
                    <p className="font-semibold text-[#181A19] text-[11px] uppercase tracking-wider mb-1">
                      Response from Government or Media Outlet:
                    </p>
                    <p className="text-[#5C645E] leading-relaxed">{inc.responseFromGovtOrOutlet}</p>
                  </div>

                  {/* Current Status and Evidence Source Footer */}
                  <div className="mt-4 pt-3.5 border-t border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#181A19]">Current Status:</span>
                      <span className="text-[#5C645E]">{inc.currentStatus}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[#5C645E] text-[11px]">Source: {inc.sourceName}</span>
                      {inc.sourceUrl && (
                        <a
                          href={inc.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-[#1A3D2F] hover:underline text-xs"
                        >
                          <span>Inspect Source</span>
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================
            SECTION 4: COMPARE PERIODS AND ADMINISTRATIONS
            ======================================================== */}
        <section id="compare-periods" className="scroll-mt-24 space-y-6">
          <div className="border-b border-[#E5E0D8] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C645E]">Section 4</span>
            <h2 className="text-2xl font-serif font-bold text-[#181A19] mt-0.5">
              Compare Periods & Administrations
            </h2>
            <p className="text-xs text-[#5C645E] mt-0.5">
              Comparative baseline data distinguishing Union Government responsibilities from State Government police jurisdictions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PERIOD_COMPARISONS.map((period, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-medium text-[#181A19] uppercase">
                      {period.level} Governance
                    </span>
                    <span className="text-xs font-medium text-[#5C645E]">{period.timeline}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-serif font-bold text-[#181A19]">{period.periodName}</h3>
                  <p className="text-xs font-medium text-[#1A3D2F] mt-0.5">{period.governingBody}</p>

                  {/* Quantitative Baseline Metrics */}
                  <div className="mt-5 space-y-2.5 border-y border-[#E5E0D8] py-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C645E]">Avg Journalist Arrests/Yr:</span>
                      <strong className="text-[#181A19]">{period.metrics.avgJournalistArrestsPerYear}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C645E]">Avg Internet Shutdowns/Yr:</span>
                      <strong className="text-[#181A19]">{period.metrics.avgInternetShutdownsPerYear}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C645E]">World Press Freedom Rank:</span>
                      <strong className="text-[#181A19]">{period.metrics.worldPressFreedomRankRange}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C645E]">Unscripted PM/CM Press Meets:</span>
                      <strong className="text-[#181A19]">{period.metrics.unscriptedPressConferencesByHead}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5C645E]">UAPA/Sedition Cases on Media:</span>
                      <strong className="text-[#181A19]">{period.metrics.seditionOrUAPAMediaCasesTotal}</strong>
                    </div>
                  </div>

                  {/* Key Policy Milestones */}
                  <div className="mt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C645E] mb-2">
                      Key Structural Developments
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#5C645E]">
                      {period.keyPolicyMilestones.map((milestone, mIdx) => (
                        <li key={mIdx} className="flex items-start gap-1.5">
                          <span className="text-[#1A3D2F] font-bold">•</span>
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Attribution Methodology Analysis */}
                <div className="mt-5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-3 text-[11px] text-[#5C645E] leading-relaxed">
                  <strong className="text-[#181A19]">Attribution Analysis:</strong>{' '}
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
          <div className="border-b border-[#E5E0D8] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C645E]">Section 5</span>
            <h2 className="text-2xl font-serif font-bold text-[#181A19] mt-0.5">
              Methodology & Source Library
            </h2>
            <p className="text-xs text-[#5C645E] mt-0.5">
              Auditable evidentiary standards, correction procedures, and direct access to primary legal records.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Evidentiary Selection Criteria */}
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-[#181A19] text-base">Evidentiary Qualification Criteria</h3>
              <ul className="space-y-2.5 text-xs text-[#5C645E] leading-relaxed">
                {METHODOLOGY_SOURCE_LIBRARY.selectionCriteria.map((crit, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <span className="text-[#1A3D2F] font-bold mt-0.5 shrink-0">•</span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-lg bg-[#FAF8F5] p-4 border border-[#E5E0D8]">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C645E] mb-1">
                  Correction & Review Protocol
                </p>
                <p className="text-xs text-[#5C645E] leading-relaxed">
                  {METHODOLOGY_SOURCE_LIBRARY.correctionProtocol}
                </p>
              </div>
            </div>

            {/* Direct Source Library Inspector */}
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-[#181A19] text-base">Constitutional Document Library</h3>
                <span className="text-xs text-[#5C645E]">Direct Certified Links</span>
              </div>

              <div className="space-y-3">
                {METHODOLOGY_SOURCE_LIBRARY.sourceLibraryDocuments.map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-3 transition hover:bg-[#F5F2EB]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-[#181A19] text-xs leading-snug">{doc.title}</h4>
                      <span className="rounded-md bg-white border border-[#E5E0D8] px-2 py-0.5 text-[10px] font-medium text-[#181A19] shrink-0">
                        {doc.citation}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#5C645E] leading-relaxed">{doc.description}</p>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[#1A3D2F] hover:underline"
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
