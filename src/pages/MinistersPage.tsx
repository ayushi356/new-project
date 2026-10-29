import { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Building2,
  UserCheck,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Calendar,
  MapPin,
  Award,
  X,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
  History,
  Shield,
  Filter,
} from 'lucide-react';
import {
  COUNCIL_OF_MINISTERS,
  MINISTRIES_DIRECTORY,
  PORTFOLIO_CHANGE_LOGS,
  type Minister,
  type Ministry,
  type MinisterDesignation,
} from '@/data/ministersData';
import { useNavigate } from '@/lib/router';

export function MinistersPage() {
  const navigate = useNavigate();

  // Tab mode: 'directory' (Ministers) | 'ministries' (All Ministries) | 'changelog' (Verification & Changes)
  const [activeTab, setActiveTab] = useState<'directory' | 'ministries' | 'changelog'>('directory');

  // Directory filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [designationFilter, setDesignationFilter] = useState<string>('all');
  const [selectedMinistryId, setSelectedMinistryId] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedParty, setSelectedParty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'protocol' | 'name' | 'portfolios'>('protocol');

  // Selected minister for Detail Modal / Slide-over
  const [selectedMinister, setSelectedMinister] = useState<Minister | null>(null);

  // Quick ministerial drawer jump
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('?minister=')) {
      const ministerId = hash.split('?minister=')[1]?.split('&')[0];
      const found = COUNCIL_OF_MINISTERS.find((m) => m.id === ministerId);
      if (found) setSelectedMinister(found);
    }
  }, []);

  // Summary counts
  const stats = useMemo(() => {
    const active = COUNCIL_OF_MINISTERS.filter((m) => m.status === 'active');
    const cabinet = active.filter((m) => m.designation === 'Cabinet Minister');
    const mosIc = active.filter((m) => m.designation === 'Minister of State (Independent Charge)');
    const mos = active.filter((m) => m.designation === 'Minister of State');
    const pm = active.filter((m) => m.designation === 'Prime Minister');
    return {
      total: active.length,
      pm: pm.length,
      cabinet: cabinet.length,
      mosIc: mosIc.length,
      mos: mos.length,
      ministriesCount: MINISTRIES_DIRECTORY.length,
      verifiedDate: '15 October 2026',
    };
  }, []);

  // Unique states for filter dropdown
  const uniqueStates = useMemo(() => {
    const states = new Set<string>();
    COUNCIL_OF_MINISTERS.forEach((m) => {
      if (m.state && m.state !== 'Not available') states.add(m.state);
    });
    return Array.from(states).sort();
  }, []);

  // Unique parties for filter dropdown
  const uniqueParties = useMemo(() => {
    const parties = new Set<string>();
    COUNCIL_OF_MINISTERS.forEach((m) => {
      if (m.party) parties.add(m.party);
    });
    return Array.from(parties).sort();
  }, []);

  // Filtered and sorted ministers
  const filteredMinisters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = COUNCIL_OF_MINISTERS.filter((m) => {
      // Status filter: unless user explicitly clicks "former", show active ministers
      if (designationFilter === 'former') {
        if (m.status !== 'former') return false;
      } else {
        if (m.status === 'former' && designationFilter !== 'all_inclusive') {
          // If searching, allow former ministers to appear so users searching "Dharmendra Pradhan" find the record
          if (!q) return false;
        }
      }

      // Rank filter
      if (designationFilter !== 'all' && designationFilter !== 'former' && designationFilter !== 'all_inclusive') {
        if (m.designation !== designationFilter) return false;
      }

      // Ministry filter
      if (selectedMinistryId !== 'all') {
        if (!m.ministry_ids.includes(selectedMinistryId)) return false;
      }

      // State filter
      if (selectedState !== 'all') {
        if (m.state !== selectedState) return false;
      }

      // Party filter
      if (selectedParty !== 'all') {
        if (m.party !== selectedParty) return false;
      }

      // Text search: matches full_name, designation, portfolios, constituency, state, ministries
      if (q) {
        const nameMatch = m.full_name.toLowerCase().includes(q);
        const desigMatch = m.designation.toLowerCase().includes(q);
        const portfolioMatch = m.portfolios.some((p) => p.toLowerCase().includes(q));
        const constMatch = (m.constituency || '').toLowerCase().includes(q);
        const stateMatch = (m.state || '').toLowerCase().includes(q);

        // Also check if any held ministry name matches
        const ministryMatch = m.ministry_ids.some((mid: string) => {
          const ministry = MINISTRIES_DIRECTORY.find((min) => min.id === mid);
          return ministry?.official_name.toLowerCase().includes(q);
        });

        if (!nameMatch && !desigMatch && !portfolioMatch && !constMatch && !stateMatch && !ministryMatch) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'protocol') {
        const orderA = a.protocol_order ?? COUNCIL_OF_MINISTERS.indexOf(a) + 1;
        const orderB = b.protocol_order ?? COUNCIL_OF_MINISTERS.indexOf(b) + 1;
        return orderA - orderB;
      }
      if (sortBy === 'name') {
        // Strip titles like 'Shri ', 'Smt. ', 'Dr. ' for clean sorting
        const cleanA = a.full_name.replace(/^(Shri|Smt\.|Dr\.)\s+/, '');
        const cleanB = b.full_name.replace(/^(Shri|Smt\.|Dr\.)\s+/, '');
        return cleanA.localeCompare(cleanB);
      }
      if (sortBy === 'portfolios') {
        return b.portfolios.length - a.portfolios.length;
      }
      return 0;
    });
  }, [searchQuery, designationFilter, selectedMinistryId, selectedState, selectedParty, sortBy]);

  // Filtered ministries for Ministry Browse view
  const filteredMinistries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MINISTRIES_DIRECTORY.filter((min) => {
      if (!q) return true;
      const nameMatch = min.official_name.toLowerCase().includes(q);
      const descMatch = min.description.toLowerCase().includes(q);
      const catMatch = min.category.toLowerCase().includes(q);

      // Also check minister assigned
      const cabMinister = COUNCIL_OF_MINISTERS.find((m) => m.id === min.cabinet_minister_id);
      const cabMatch = cabMinister?.full_name.toLowerCase().includes(q);

      const mosMatch = min.ministers_of_state_ids.some((id: string) => {
        const mos = COUNCIL_OF_MINISTERS.find((m) => m.id === id);
        return mos?.full_name.toLowerCase().includes(q);
      });

      return nameMatch || descMatch || catMatch || cabMatch || mosMatch;
    });
  }, [searchQuery]);

  // Helper for designation badge styling
  const getBadgeStyle = (desig: MinisterDesignation, status: string) => {
    if (status === 'former') {
      return 'bg-amber-100 text-amber-900 border-amber-300';
    }
    switch (desig) {
      case 'Prime Minister':
        return 'bg-[#1A3D2F] text-white border-[#1A3D2F]';
      case 'Cabinet Minister':
        return 'bg-[#EBF3ED] text-[#1A3D2F] border-[#C3DCC9] font-medium';
      case 'Minister of State (Independent Charge)':
        return 'bg-[#FEF6EE] text-[#9A4C18] border-[#FAD8B8] font-medium';
      case 'Minister of State':
        return 'bg-[#F2F4F7] text-[#344054] border-[#D0D5DD]';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#181A19]">
      {/* Editorial Header */}
      <div className="border-b border-[#E5E0D8] bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          {/* Eyebrow & Live Verification Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5CFCE] bg-white px-3 py-1 text-xs font-semibold text-[#1A3D2F]">
              <Shield size={14} className="text-[#1A3D2F]" />
              <span>Official Executive Directory • Government of India</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-medium text-emerald-900">
              <CheckCircle2 size={14} className="text-emerald-700" />
              <span>
                Verified against Cabinet Secretariat & PM India: <strong>15 October 2026</strong>
              </span>
            </div>
          </div>

          <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight text-[#181A19] sm:text-5xl">
            Union Council of Ministers
          </h1>
          <p className="mt-3 max-w-3xl text-base text-[#4A524D] sm:text-lg leading-relaxed">
            The complete official directory of all 71 active members of India’s Union Council of Ministers and 51
            governing ministries. Every portfolio, parliamentary constituency, official gazette allocation, and verified
            ministerial tenure documented in one single source of truth.
          </p>

          {/* Quick High-Profile Notification Box for Education portfolio update */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="shrink-0 text-amber-700 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">
                  Official Gazette Update — Ministry of Education Portfolio Allocation (25 July 2026)
                </p>
                <p className="mt-1 text-amber-800 leading-normal">
                  As directed by the President of India on the advice of the Prime Minister, <strong>Shri Pralhad Joshi</strong> is the Union Minister of Education (holding concurrent charge with Consumer Affairs, Food & Public Distribution and New & Renewable Energy), following the resignation of Shri Dharmendra Pradhan. Dharmendra Pradhan is preserved in historical records as Former Minister (2021–July 2026).
                </p>
              </div>
            </div>
          </div>

          {/* KPI Snapshot Cards */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-3.5 shadow-2xs">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#737A74]">Total Ministers</span>
              <span className="mt-1 block font-serif text-2xl font-bold text-[#181A19]">{stats.total}</span>
              <span className="mt-0.5 block text-[11px] text-[#737A74]">1 PM + 70 Ministers</span>
            </div>

            <div className="rounded-xl border border-[#C3DCC9] bg-[#EBF3ED]/40 p-3.5 shadow-2xs">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#1A3D2F]">Cabinet Ministers</span>
              <span className="mt-1 block font-serif text-2xl font-bold text-[#1A3D2F]">{stats.cabinet}</span>
              <span className="mt-0.5 block text-[11px] text-[#4A524D]">Core policy leadership</span>
            </div>

            <div className="rounded-xl border border-[#FAD8B8] bg-[#FEF6EE]/50 p-3.5 shadow-2xs">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#9A4C18]">MoS (Ind. Charge)</span>
              <span className="mt-1 block font-serif text-2xl font-bold text-[#9A4C18]">{stats.mosIc}</span>
              <span className="mt-0.5 block text-[11px] text-[#4A524D]">Independent portfolios</span>
            </div>

            <div className="rounded-xl border border-[#D0D5DD] bg-[#F2F4F7]/60 p-3.5 shadow-2xs">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#344054]">Ministers of State</span>
              <span className="mt-1 block font-serif text-2xl font-bold text-[#344054]">{stats.mos}</span>
              <span className="mt-0.5 block text-[11px] text-[#4A524D]">Assisting Union Ministries</span>
            </div>

            <div className="rounded-xl border border-[#E5E0D8] bg-white p-3.5 shadow-2xs">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#737A74]">Ministries Covered</span>
              <span className="mt-1 block font-serif text-2xl font-bold text-[#181A19]">{stats.ministriesCount}</span>
              <span className="mt-0.5 block text-[11px] text-[#737A74]">All official departments</span>
            </div>

            <div className="rounded-xl border border-[#E5E0D8] bg-white p-3.5 shadow-2xs">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#737A74]">Primary Gazette</span>
              <span className="mt-1 block font-serif text-base font-bold text-[#181A19] truncate">CabSec & PMO</span>
              <span className="mt-0.5 block text-[11px] text-emerald-700 font-medium">100% Verified</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-[#E5E0D8]">
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeTab === 'directory'
                  ? 'border-[#1A3D2F] text-[#1A3D2F]'
                  : 'border-transparent text-[#737A74] hover:text-[#181A19]'
              }`}
            >
              <UserCheck size={16} />
              <span>Ministers Directory ({filteredMinisters.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ministries')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeTab === 'ministries'
                  ? 'border-[#1A3D2F] text-[#1A3D2F]'
                  : 'border-transparent text-[#737A74] hover:text-[#181A19]'
              }`}
            >
              <Building2 size={16} />
              <span>Browse by Ministry ({MINISTRIES_DIRECTORY.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('changelog')}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
                activeTab === 'changelog'
                  ? 'border-[#1A3D2F] text-[#1A3D2F]'
                  : 'border-transparent text-[#737A74] hover:text-[#181A19]'
              }`}
            >
              <History size={16} />
              <span>Portfolio Change Log & Verification Workflow</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* TAB 1: MINISTERS DIRECTORY                                                */}
        {/* ========================================================================= */}
        {activeTab === 'directory' && (
          <div>
            {/* Search and Filter Bar */}
            <div className="rounded-2xl border border-[#E5E0D8] bg-white p-4 sm:p-5 shadow-2xs">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                {/* Search query input */}
                <div className="relative lg:col-span-5">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737A74]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by minister name, portfolio (e.g. Education, Finance), or constituency..."
                    className="w-full rounded-xl border border-[#D5CFCE] bg-[#FAF8F5] py-2.5 pl-10 pr-9 text-sm text-[#181A19] placeholder-[#737A74] focus:border-[#1A3D2F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]/20 transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737A74] hover:text-[#181A19]"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Ministry Dropdown */}
                <div className="lg:col-span-3">
                  <select
                    value={selectedMinistryId}
                    onChange={(e) => setSelectedMinistryId(e.target.value)}
                    className="w-full rounded-xl border border-[#D5CFCE] bg-[#FAF8F5] px-3 py-2.5 text-sm text-[#181A19] focus:border-[#1A3D2F] focus:bg-white focus:outline-none"
                  >
                    <option value="all">All 51 Ministries</option>
                    {MINISTRIES_DIRECTORY.map((min) => (
                      <option key={min.id} value={min.id}>
                        {min.official_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Dropdown */}
                <div className="lg:col-span-2">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full rounded-xl border border-[#D5CFCE] bg-[#FAF8F5] px-3 py-2.5 text-sm text-[#181A19] focus:border-[#1A3D2F] focus:bg-white focus:outline-none"
                  >
                    <option value="all">All States</option>
                    {uniqueStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By Dropdown */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-1.5 rounded-xl border border-[#D5CFCE] bg-[#FAF8F5] px-2.5 py-1.5">
                    <ArrowUpDown size={14} className="text-[#737A74] shrink-0" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full border-none bg-transparent text-sm text-[#181A19] focus:outline-none"
                    >
                      <option value="protocol">Protocol Order</option>
                      <option value="name">Alphabetical (A–Z)</option>
                      <option value="portfolios">Portfolios Held</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quick Filter Designation Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#E5E0D8] pt-3 text-xs">
                <span className="font-semibold text-[#737A74] mr-1 flex items-center gap-1">
                  <Filter size={12} /> Rank:
                </span>
                {[
                  { id: 'all', label: `All Active (${stats.total})` },
                  { id: 'Cabinet Minister', label: `Cabinet Ministers (${stats.cabinet})` },
                  { id: 'Minister of State (Independent Charge)', label: `MoS Independent Charge (${stats.mosIc})` },
                  { id: 'Minister of State', label: `Ministers of State (${stats.mos})` },
                  { id: 'former', label: 'Former Ministers (1)' },
                  { id: 'all_inclusive', label: 'All (Inc. Historical)' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setDesignationFilter(pill.id)}
                    className={`rounded-full px-3 py-1 font-medium transition cursor-pointer ${
                      designationFilter === pill.id
                        ? 'bg-[#1A3D2F] text-white'
                        : 'bg-[#F4F1EA] text-[#4A524D] hover:bg-[#EAE4D9]'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}

                {(searchQuery || selectedMinistryId !== 'all' || selectedState !== 'all' || designationFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedMinistryId('all');
                      setSelectedState('all');
                      setDesignationFilter('all');
                    }}
                    className="ml-auto text-xs font-semibold text-rose-700 hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Results Counter and Search Keyword Indicators */}
            <div className="mt-4 flex items-center justify-between text-xs text-[#737A74]">
              <span>
                Showing <strong>{filteredMinisters.length}</strong> minister records
                {searchQuery && (
                  <span>
                    {' '}
                    matching <em>"{searchQuery}"</em>
                  </span>
                )}
              </span>
              <span>Updated from 18th Lok Sabha & October 2026 Council Allocations</span>
            </div>

            {/* Ministers Grid */}
            {filteredMinisters.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-dashed border-[#D5CFCE] bg-white p-12 text-center">
                <AlertTriangle size={36} className="mx-auto text-amber-600 mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#181A19]">No minister matches found</h3>
                <p className="mt-1 text-sm text-[#737A74] max-w-md mx-auto">
                  Try adjusting your search keyword or clearing the rank and ministry filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMinistryId('all');
                    setSelectedState('all');
                    setDesignationFilter('all');
                  }}
                  className="mt-4 rounded-lg bg-[#1A3D2F] px-4 py-2 text-xs font-semibold text-white hover:bg-[#143025]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredMinisters.map((minister) => {
                  const isFormer = minister.status === 'former';
                  return (
                    <div
                      key={minister.id}
                      onClick={() => setSelectedMinister(minister)}
                      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer ${
                        isFormer
                          ? 'border-amber-300 bg-amber-50/20'
                          : minister.designation === 'Prime Minister'
                          ? 'border-[#1A3D2F]/40 ring-1 ring-[#1A3D2F]/20'
                          : 'border-[#E5E0D8]'
                      }`}
                    >
                      <div>
                        {/* Top Meta: Designation & Party */}
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getBadgeStyle(
                              minister.designation,
                              minister.status
                            )}`}
                          >
                            {isFormer ? 'Former Minister' : minister.designation}
                          </span>

                          <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-0.5 text-[11px] font-semibold text-[#4A524D]">
                            {minister.party}
                          </span>
                        </div>

                        {/* Minister Identity Header */}
                        <div className="mt-4 flex items-center gap-3.5">
                          {minister.photo_url ? (
                            <img
                              src={minister.photo_url}
                              alt={minister.full_name}
                              className="h-12 w-12 rounded-full object-cover border border-[#E5E0D8]"
                            />
                          ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A3D2F] text-sm font-bold text-white shadow-inner">
                              {minister.full_name
                                .replace(/^(Shri|Smt\.|Dr\.)\s+/, '')
                                .split(' ')
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join('')}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <h2 className="font-serif text-lg font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition truncate">
                              {minister.full_name}
                            </h2>
                            <div className="flex items-center gap-1.5 text-xs text-[#737A74]">
                              <MapPin size={12} className="shrink-0" />
                              <span className="truncate">
                                {minister.constituency}
                                {minister.state ? ` (${minister.state})` : ''}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Portfolios Section */}
                        <div className="mt-4 border-t border-[#F0EBE1] pt-3">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737A74]">
                            {isFormer ? 'Former Portfolios' : 'Current Portfolios'}
                          </span>
                          <ul className="mt-1.5 space-y-1.5">
                            {minister.portfolios.map((port, idx) => {
                              const isEducation = port.toLowerCase().includes('education');
                              return (
                                <li
                                  key={idx}
                                  className={`flex items-start gap-1.5 text-xs leading-snug ${
                                    isEducation
                                      ? 'font-semibold text-emerald-900 bg-emerald-50/70 p-1 rounded-md'
                                      : 'text-[#2D3330]'
                                  }`}
                                >
                                  <ChevronRight size={13} className="shrink-0 text-[#1A3D2F] mt-0.5" />
                                  <span>{port}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-5 border-t border-[#F0EBE1] pt-3 flex items-center justify-between text-[11px] text-[#737A74]">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>Appointed: {minister.appointment_date}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 font-semibold text-[#1A3D2F] group-hover:translate-x-0.5 transition">
                          View Dossier <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BROWSE BY MINISTRY                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'ministries' && (
          <div>
            <div className="rounded-2xl border border-[#E5E0D8] bg-white p-4 sm:p-5 shadow-2xs mb-6">
              <div className="relative max-w-xl">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737A74]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter 51 ministries by name, department, or responsible minister..."
                  className="w-full rounded-xl border border-[#D5CFCE] bg-[#FAF8F5] py-2.5 pl-10 pr-9 text-sm text-[#181A19] placeholder-[#737A74] focus:border-[#1A3D2F] focus:bg-white focus:outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737A74] hover:text-[#181A19]"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredMinistries.map((ministry) => {
                const cabinetMinister = COUNCIL_OF_MINISTERS.find((m) => m.id === ministry.cabinet_minister_id);
                const mosList = ministry.ministers_of_state_ids
                  .map((id: string) => COUNCIL_OF_MINISTERS.find((m) => m.id === id))
                  .filter(Boolean) as Minister[];

                const isEducation = ministry.id === 'min-education';

                return (
                  <div
                    key={ministry.id}
                    className={`flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-2xs transition hover:shadow-md ${
                      isEducation ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-[#E5E0D8]'
                    }`}
                  >
                    <div>
                      {/* Category & Official Link */}
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full border border-[#D5CFCE] bg-[#FAF8F5] px-2.5 py-0.5 text-[11px] font-semibold text-[#4A524D]">
                          {ministry.category}
                        </span>

                        <a
                          href={ministry.official_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A3D2F] hover:underline"
                        >
                          <span>Official Portal</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>

                      {/* Ministry Title */}
                      <h3 className="mt-3 font-serif text-lg font-bold text-[#181A19]">{ministry.official_name}</h3>
                      <p className="mt-1 text-xs text-[#4A524D] leading-relaxed">{ministry.description}</p>

                      {/* Cabinet Minister in Charge */}
                      <div className="mt-4 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#737A74]">
                          Cabinet Minister in Charge
                        </span>
                        {cabinetMinister ? (
                          <div
                            onClick={() => setSelectedMinister(cabinetMinister)}
                            className="mt-1 flex items-center justify-between cursor-pointer group"
                          >
                            <div>
                              <p className="text-sm font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition">
                                {cabinetMinister.full_name}
                              </p>
                              <p className="text-[11px] text-[#737A74]">
                                {cabinetMinister.party} • {cabinetMinister.constituency}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-[#1A3D2F] group-hover:translate-x-0.5 transition flex items-center">
                              Dossier <ChevronRight size={13} />
                            </span>
                          </div>
                        ) : (
                          <p className="mt-1 text-xs text-[#737A74]">Prime Minister / In-charge</p>
                        )}
                      </div>

                      {/* Assigned Ministers of State */}
                      {mosList.length > 0 && (
                        <div className="mt-3 border-t border-[#F0EBE1] pt-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#737A74]">
                            Assigned Ministers of State ({mosList.length})
                          </span>
                          <div className="mt-1.5 space-y-1.5">
                            {mosList.map((mos) => (
                              <div
                                key={mos.id}
                                onClick={() => setSelectedMinister(mos)}
                                className="flex items-center justify-between text-xs text-[#2D3330] hover:text-[#1A3D2F] cursor-pointer"
                              >
                                <span>
                                  <strong>{mos.full_name}</strong> ({mos.party}, {mos.state})
                                </span>
                                <ChevronRight size={12} className="text-[#737A74]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 border-t border-[#F0EBE1] pt-3 text-[11px] text-[#737A74] flex items-center justify-between">
                      <span>Source: Cabinet Secretariat of India</span>
                      <span>ID: {ministry.id}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PORTFOLIO CHANGE LOG & VERIFICATION WORKFLOW                       */}
        {/* ========================================================================= */}
        {activeTab === 'changelog' && (
          <div className="space-y-8">
            {/* Verification Architecture Banner */}
            <div className="rounded-2xl border border-[#C3DCC9] bg-[#EBF3ED]/40 p-6 shadow-2xs">
              <div className="flex items-start gap-4">
                <Shield size={28} className="text-[#1A3D2F] shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#1A3D2F]">
                    Council of Ministers Verification Standards & Single Source of Truth
                  </h2>
                  <p className="mt-1 text-sm text-[#4A524D] leading-relaxed">
                    To maintain strict non-partisan fidelity and avoid conflicting ministerial data across components,
                    Bharat Governance Tracker adheres to a centralized data architecture in{' '}
                    <code className="rounded bg-white px-1.5 py-0.5 text-xs text-[#1A3D2F] font-mono">
                      src/data/ministersData.ts
                    </code>{' '}
                    and integrates with the database layer in{' '}
                    <code className="rounded bg-white px-1.5 py-0.5 text-xs text-[#1A3D2F] font-mono">
                      src/lib/supabase.ts
                    </code>
                    .
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white bg-white/80 p-4 shadow-2xs">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1A3D2F]">Primary Source</h4>
                  <p className="mt-1 text-sm font-bold text-[#181A19]">Cabinet Secretariat of India</p>
                  <a
                    href="https://cabsec.nic.in/about-us/council-of-ministers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[#1A3D2F] hover:underline"
                  >
                    cabsec.nic.in <ExternalLink size={11} />
                  </a>
                </div>

                <div className="rounded-xl border border-white bg-white/80 p-4 shadow-2xs">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1A3D2F]">Secondary Source</h4>
                  <p className="mt-1 text-sm font-bold text-[#181A19]">PM India & Rashtrapati Bhavan</p>
                  <a
                    href="https://www.pmindia.gov.in/en/news_updates/portfolios-of-the-union-council-of-ministers-2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[#1A3D2F] hover:underline"
                  >
                    pmindia.gov.in <ExternalLink size={11} />
                  </a>
                </div>

                <div className="rounded-xl border border-white bg-white/80 p-4 shadow-2xs">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1A3D2F]">Cross-Check Registry</h4>
                  <p className="mt-1 text-sm font-bold text-[#181A19]">National Portal of India</p>
                  <a
                    href="https://www.india.gov.in/directory/whos-who/council-of-ministers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[#1A3D2F] hover:underline"
                  >
                    india.gov.in <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Official Change Logs List */}
            <div className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-2xs">
              <h3 className="font-serif text-lg font-bold text-[#181A19] flex items-center gap-2">
                <History size={20} className="text-[#1A3D2F]" />
                Official Gazette Ministerial Handover Logs
              </h3>
              <p className="mt-1 text-xs text-[#737A74]">
                Whenever ministerial portfolios change, handovers are logged here with official notification numbers,
                tenure dates, and source citations rather than silently overwriting historical records.
              </p>

              <div className="mt-6 space-y-5">
                {PORTFOLIO_CHANGE_LOGS.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 transition hover:shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-900">
                        <Calendar size={12} /> {log.date}
                      </span>
                      <span className="text-xs font-mono text-[#737A74]">Ref: {log.gazette_notification_ref}</span>
                    </div>

                    <h4 className="mt-3 text-base font-bold text-[#181A19]">
                      Portfolio Allocation: {log.ministry_name}
                    </h4>

                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 text-xs">
                        <span className="font-semibold text-red-900 block uppercase tracking-wider text-[10px]">
                          Outgoing / Resigned Minister
                        </span>
                        <p className="mt-1 text-sm font-bold text-[#181A19]">{log.outgoing_minister.name}</p>
                        <p className="text-[#737A74]">Tenure: {log.outgoing_minister.previous_tenure}</p>
                        <p className="mt-1 text-red-800 italic">Status: Preserved as Former Minister</p>
                      </div>

                      <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs">
                        <span className="font-semibold text-emerald-900 block uppercase tracking-wider text-[10px]">
                          Incoming / Reallocated Minister
                        </span>
                        <p className="mt-1 text-sm font-bold text-[#181A19]">{log.incoming_minister.name}</p>
                        <p className="text-[#737A74]">Charge: {log.incoming_minister.concurrent_charges}</p>
                        <p className="mt-1 text-emerald-800 font-medium">Status: Currently Serving</p>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-[#4A524D] leading-relaxed border-t border-amber-200/60 pt-3">
                      <strong>Official Note:</strong> {log.summary}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-[#737A74]">
                      <span>Source: Rashtrapati Bhavan & Cabinet Secretariat</span>
                      <a
                        href={log.official_source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#1A3D2F] hover:underline"
                      >
                        Verify Notification <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification & Administrative Workflow Guide */}
            <div className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-2xs">
              <h3 className="font-serif text-lg font-bold text-[#181A19] flex items-center gap-2">
                <Award size={20} className="text-[#1A3D2F]" />
                Institutional Rules for Updating Ministerial Records
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs text-[#4A524D]">
                <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
                  <h4 className="font-bold text-sm text-[#181A19] mb-1">1. Dual-Source Gazette Cross-Check</h4>
                  <p className="leading-relaxed">
                    Never modify a portfolio or appointment without cross-checking the official Cabinet Secretariat
                    press release against the PM India communique or Rashtrapati Bhavan gazette notification.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
                  <h4 className="font-bold text-sm text-[#181A19] mb-1">2. Preserve Historical Tenures</h4>
                  <p className="leading-relaxed">
                    When a minister steps down or is reshuffled, do not overwrite their past decisions or remove them
                    from the archive. Set their status to <code className="font-mono">former</code>, record the exact
                    tenure end date, and create a change log entry.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
                  <h4 className="font-bold text-sm text-[#181A19] mb-1">3. Single Centralized Data Model</h4>
                  <p className="leading-relaxed">
                    Always use the standardized IDs (e.g.{' '}
                    <code className="font-mono">min-pralhad-joshi</code>,{' '}
                    <code className="font-mono">min-education</code>) rather than hardcoded string matching in page
                    templates to prevent stale representations.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
                  <h4 className="font-bold text-sm text-[#181A19] mb-1">4. Explicit Verification Timestamps</h4>
                  <p className="leading-relaxed">
                    Every minister card must display the <code className="font-mono">last_verified_at</code> field
                    providing citizens with transparent provenance for auditability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MINISTER DETAIL MODAL / DRAWER                                            */}
      {/* ========================================================================= */}
      {selectedMinister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-[#E5E0D8] bg-[#FAF8F5] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E5E0D8] bg-white px-6 py-5">
              <div className="flex items-center gap-4">
                {selectedMinister.photo_url ? (
                  <img
                    src={selectedMinister.photo_url}
                    alt={selectedMinister.full_name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-[#1A3D2F]"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A3D2F] text-xl font-bold text-white shadow-inner">
                    {selectedMinister.full_name
                      .replace(/^(Shri|Smt\.|Dr\.)\s+/, '')
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getBadgeStyle(
                        selectedMinister.designation,
                        selectedMinister.status
                      )}`}
                    >
                      {selectedMinister.status === 'former' ? 'Former Minister' : selectedMinister.designation}
                    </span>
                    <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-0.5 text-xs font-semibold text-[#4A524D]">
                      {selectedMinister.party}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-[#181A19]">{selectedMinister.full_name}</h3>
                  <p className="text-xs text-[#737A74]">
                    {selectedMinister.house} • {selectedMinister.constituency}
                    {selectedMinister.state ? `, ${selectedMinister.state}` : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMinister(null)}
                className="rounded-full p-2 text-[#737A74] hover:bg-[#FAF8F5] hover:text-[#181A19] transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Portfolios Section */}
              <div className="rounded-xl border border-[#E5E0D8] bg-white p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F] flex items-center gap-1.5">
                  <Briefcase size={14} />
                  {selectedMinister.status === 'former' ? 'Documented Portfolios' : 'All Currently Held Portfolios'}
                </h4>
                <ul className="mt-2.5 space-y-2">
                  {selectedMinister.portfolios.map((portfolio, idx) => {
                    const isEducation = portfolio.toLowerCase().includes('education');
                    return (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 text-sm leading-relaxed ${
                          isEducation ? 'font-bold text-emerald-950 bg-emerald-50 p-2 rounded-lg' : 'text-[#181A19]'
                        }`}
                      >
                        <CheckCircle2 size={16} className="text-[#1A3D2F] shrink-0 mt-0.5" />
                        <span>{portfolio}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Historical Roles & Predecessor Information */}
              {selectedMinister.historical_roles && selectedMinister.historical_roles.length > 0 && (
                <div className="rounded-xl border border-[#E5E0D8] bg-white p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#737A74] flex items-center gap-1.5">
                    <History size={14} /> Previous Portfolios & Legislative Roles
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {selectedMinister.historical_roles.map((role, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#4A524D]">
                        <ChevronRight size={13} className="text-[#737A74] shrink-0 mt-0.5" />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Profile Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-[#E5E0D8] bg-white p-3.5">
                  <span className="font-semibold text-[#737A74] block">Appointment / Allocation Date</span>
                  <span className="mt-1 font-bold text-[#181A19] block">{selectedMinister.appointment_date}</span>
                </div>

                <div className="rounded-xl border border-[#E5E0D8] bg-white p-3.5">
                  <span className="font-semibold text-[#737A74] block">Protocol Order</span>
                  <span className="mt-1 font-bold text-[#181A19] block">
                    #{selectedMinister.protocol_order ?? COUNCIL_OF_MINISTERS.indexOf(selectedMinister) + 1}
                  </span>
                </div>

                <div className="rounded-xl border border-[#E5E0D8] bg-white p-3.5">
                  <span className="font-semibold text-[#737A74] block">Parliamentary Constituency</span>
                  <span className="mt-1 font-bold text-[#181A19] block">{selectedMinister.constituency}</span>
                </div>

                <div className="rounded-xl border border-[#E5E0D8] bg-white p-3.5">
                  <span className="font-semibold text-[#737A74] block">State Represented</span>
                  <span className="mt-1 font-bold text-[#181A19] block">{selectedMinister.state}</span>
                </div>
              </div>

              {/* Official Source & Verification Footnote */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-950">
                <div className="flex items-start gap-2.5">
                  <FileText size={16} className="text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Official Government Record</p>
                    <p className="mt-0.5 text-[#4A524D]">
                      Verified by Bharat Governance Tracker on{' '}
                      <strong>{selectedMinister.last_verified_at}</strong> against Cabinet Secretariat and PM India
                      official gazettes.
                    </p>
                    <a
                      href={selectedMinister.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 font-semibold text-[#1A3D2F] hover:underline"
                    >
                      <span>Open Official Source Notice</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-[#E5E0D8] bg-white px-6 py-4">
              <a
                href={selectedMinister.official_profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3D2F] hover:underline"
              >
                <span>Visit Official Ministry Profile</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => setSelectedMinister(null)}
                className="rounded-xl bg-[#1A3D2F] px-4 py-2 text-xs font-semibold text-white hover:bg-[#143025] transition"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
