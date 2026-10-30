import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  Building2,
  Calendar,
  Layers,
  ShieldCheck,
  FileCheck2,
  SlidersHorizontal,
  ArrowLeft,
  Coins,
} from 'lucide-react';
import {
  FINANCIAL_SECTIONS,
  SAMPLE_FINANCE_RECORDS,
} from '@/data/publicFinanceData';
import type {
  FinancialSectionId,
  FigureType,
} from '@/types/finance';
import { useNavigate } from '@/lib/router';

// Civic Category groupings for streamlined navigation
const CIVIC_FILTER_GROUPS: {
  id: string;
  label: string;
  shortLabel: string;
  sections: FinancialSectionId[];
}[] = [
  { id: 'all', label: 'All Public Finance Records', shortLabel: 'All Records', sections: [] },
  { id: 'revenue', label: 'Tax & Non-Tax Revenues', shortLabel: 'Revenue & Taxes', sections: ['revenue'] },
  { id: 'spending', label: 'Ministry Allocations & Capital Spending', shortLabel: 'Spending & Capex', sections: ['allocation', 'expenditure'] },
  { id: 'schemes_relief', label: 'Welfare Schemes & Tax Relief', shortLabel: 'Schemes & Welfare', sections: ['schemes', 'tax_incentives'] },
  { id: 'oversight', label: 'Audits & Public Procurement', shortLabel: 'Audits & Contracts', sections: ['audits', 'procurement'] },
  { id: 'debt_transfers', label: 'Public Debt & Federal Devolution', shortLabel: 'Debt & Transfers', sections: ['debt', 'state_finance', 'comparison'] },
];

function formatInLakhCrore(amountCr: number): string {
  if (Math.abs(amountCr) >= 100000) {
    const lakhCr = (amountCr / 100000).toFixed(2);
    return `₹${Number(lakhCr).toLocaleString('en-IN')} Lakh Cr`;
  }
  return `₹${amountCr.toLocaleString('en-IN')} Cr`;
}

function getFigureTypeBadge(type: FigureType) {
  switch (type) {
    case 'budget_estimate':
      return {
        label: 'Budget Estimate (BE)',
        short: 'BE',
        className: 'bg-[#FAF8F5] text-[#181A19] border-[#E5E0D8]',
        hint: 'Legislative ceiling authorized by Parliament',
      };
    case 'revised_estimate':
      return {
        label: 'Revised Estimate (RE)',
        short: 'RE',
        className: 'bg-[#FAF8F5] text-[#181A19] border-[#E5E0D8]',
        hint: 'Mid-year recalibration based on actual inflows',
      };
    case 'actual':
      return {
        label: 'Audited Actual Spend',
        short: 'Actual',
        className: 'bg-[#F5F2EB] text-[#1A3D2F] border-[#D5CFBF] font-semibold',
        hint: 'Audited cash disbursements recorded through CGA',
      };
    case 'reported_finding':
      return {
        label: 'CAG / PAC Audit Observation',
        short: 'CAG Finding',
        className: 'bg-[#FAF8F5] text-[#B45309] border-[#D5CFBF] font-semibold',
        hint: 'Documented observation table-laid in Parliament',
      };
    case 'calculated_metric':
      return {
        label: 'Calculated Fiscal Metric',
        short: 'Derived Ratio',
        className: 'bg-[#FAF8F5] text-[#5C645E] border-[#E5E0D8]',
        hint: 'Derived metric (e.g. % of GDP or growth rate)',
      };
  }
}

interface FinancialDataExplorerPageProps {
  initialSection?: string;
  initialRecordId?: string;
}

export function FinancialDataExplorerPage({
  initialSection,
  initialRecordId,
}: FinancialDataExplorerPageProps) {
  const navigate = useNavigate();

  const [activeCivicGroup, setActiveCivicGroup] = useState<string>('all');
  const [selectedPillar, setSelectedPillar] = useState<string>(
    initialSection && FINANCIAL_SECTIONS.some((s) => s.id === initialSection)
      ? initialSection
      : 'all'
  );
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [expandedRecordIds, setExpandedRecordIds] = useState<Record<string, boolean>>(() => {
    if (initialRecordId) {
      return { [initialRecordId]: true };
    }
    return {};
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFY, setSelectedFY] = useState<string>('all');
  const [selectedGovLevel, setSelectedGovLevel] = useState<string>('all');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('all');
  const [selectedFigureType, setSelectedFigureType] = useState<string>('all');

  // If initial section changes via routing
  useEffect(() => {
    if (initialSection && FINANCIAL_SECTIONS.some((s) => s.id === initialSection)) {
      setSelectedPillar(initialSection);
    }
  }, [initialSection]);

  // List of distinct ministries
  const allMinistries = useMemo(() => {
    const set = new Set<string>();
    SAMPLE_FINANCE_RECORDS.forEach((r) => set.add(r.departmentOrMinistry));
    return Array.from(set).sort();
  }, []);

  // Filter records
  const filteredRecords = useMemo(() => {
    const currentGroup = CIVIC_FILTER_GROUPS.find((g) => g.id === activeCivicGroup);

    return SAMPLE_FINANCE_RECORDS.filter((rec) => {
      if (activeCivicGroup !== 'all' && currentGroup && currentGroup.sections.length > 0) {
        if (!currentGroup.sections.includes(rec.section)) return false;
      }

      if (selectedPillar !== 'all' && rec.section !== selectedPillar) {
        return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = rec.title.toLowerCase().includes(query);
        const matchesSummary = rec.plainSummary.toLowerCase().includes(query);
        const matchesMinistry = rec.departmentOrMinistry.toLowerCase().includes(query);
        const matchesTag = rec.sectorTag?.toLowerCase().includes(query);
        const matchesDoc = rec.source.documentTitle.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary && !matchesMinistry && !matchesTag && !matchesDoc) {
          return false;
        }
      }

      if (selectedGovLevel !== 'all' && rec.govLevel !== selectedGovLevel) {
        return false;
      }

      if (selectedMinistry !== 'all' && rec.departmentOrMinistry !== selectedMinistry) {
        return false;
      }

      if (selectedFigureType !== 'all' && rec.figureType !== selectedFigureType) {
        return false;
      }

      if (selectedFY !== 'all' && !rec.financialYear.includes(selectedFY)) {
        return false;
      }

      return true;
    });
  }, [
    activeCivicGroup,
    selectedPillar,
    searchQuery,
    selectedGovLevel,
    selectedMinistry,
    selectedFigureType,
    selectedFY,
  ]);

  const activeSectionMeta = useMemo(() => {
    return FINANCIAL_SECTIONS.find((s) => s.id === selectedPillar);
  }, [selectedPillar]);

  const toggleExpand = (id: string) => {
    setExpandedRecordIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    filteredRecords.forEach((r) => (next[r.id] = true));
    setExpandedRecordIds(next);
  };

  const collapseAll = () => {
    setExpandedRecordIds({});
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCivicGroup('all');
    setSelectedPillar('all');
    setSelectedFY('all');
    setSelectedGovLevel('all');
    setSelectedMinistry('all');
    setSelectedFigureType('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    activeCivicGroup !== 'all' ||
    selectedPillar !== 'all' ||
    selectedFY !== 'all' ||
    selectedGovLevel !== 'all' ||
    selectedMinistry !== 'all' ||
    selectedFigureType !== 'all';

  // Summary statistics excluding subcomponents
  const sectionSummary = useMemo(() => {
    const currentGroup = CIVIC_FILTER_GROUPS.find((g) => g.id === activeCivicGroup);
    const pool = SAMPLE_FINANCE_RECORDS.filter((rec) => {
      if (activeCivicGroup !== 'all' && currentGroup && currentGroup.sections.length > 0) {
        if (!currentGroup.sections.includes(rec.section)) return false;
      }
      if (selectedPillar !== 'all' && rec.section !== selectedPillar) return false;
      return true;
    });

    const totalAmount = pool
      .filter((r) => !r.isSubComponent)
      .reduce((sum, r) => sum + r.amountCr, 0);

    const auditedCount = pool.filter(
      (r) => r.figureType === 'actual' || r.figureType === 'reported_finding'
    ).length;

    return {
      totalRecords: pool.length,
      totalAmount,
      auditedCount,
    };
  }, [activeCivicGroup, selectedPillar]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A19] pb-24">
      {/* 1. Header Section */}
      <section className="bg-[#F4F1EA] border-b border-[#E5E0D8] py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/public-money')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3D2F] hover:underline cursor-pointer self-start"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              <span>Back to Tax & Public Money Overview</span>
            </button>

            <div className="mt-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3.5 py-1 text-xs font-semibold text-[#1A3D2F]">
                <Coins size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
                <span>Primary Document Verification · Demands for Grants & Finance Accounts</span>
              </div>
              <h1 className="mt-3 font-serif text-2xl font-extrabold sm:text-4xl text-[#181A19]">
                Financial Data Explorer
              </h1>
              <p className="mt-2 max-w-3xl text-xs sm:text-sm text-[#4A524D] leading-relaxed">
                Filter and inspect the underlying public finance records of the Union Government.
                Search across all 10 accountability pillars, compare Budget Estimates (BE) with
                audited cash accounts (CGA), and verify primary citations and CAG audit references.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Verification Notice Banner */}
      <div className="border-b border-[#D5CFBF] bg-[#F4F1EA]/70">
        <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-3 sm:px-6">
          <ShieldCheck size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#1A3D2F]" />
          <div className="text-xs text-[#2C332E] leading-relaxed">
            <span className="font-bold text-[#1A3D2F]">Verification Standards:</span> All records link to
            specific Union Budget Statements, Demand for Grant tables, or CAG report paragraphs. Sub-components
            (such as the RBI surplus dividend) are itemized and excluded from aggregate sum totals to prevent
            double-counting.
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          {/* Top Row: Search Input + Advanced Filter Toggle */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search
                size={16}
                strokeWidth={1.5}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search public finance records, ministries, schemes, citations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#1A3D2F] focus:bg-white focus:outline-hidden"
              />
            </div>

            <button
              onClick={() => setShowAdvancedFilters((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition cursor-pointer shrink-0 ${
                showAdvancedFilters || hasActiveFilters
                  ? 'border-[#1A3D2F] bg-[#1A3D2F]/5 text-[#1A3D2F]'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              <span>Advanced Parameters</span>
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1A3D2F] text-[10px] text-white">
                  ✓
                </span>
              )}
            </button>
          </div>

          {/* 6 Civic Category Groups */}
          <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            {CIVIC_FILTER_GROUPS.map((group) => {
              const isActive = activeCivicGroup === group.id;
              const count = SAMPLE_FINANCE_RECORDS.filter((r) => {
                if (group.id === 'all') return true;
                return group.sections.includes(r.section);
              }).length;

              return (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveCivicGroup(group.id);
                    setSelectedPillar('all');
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'border-[#1A3D2F] bg-[#1A3D2F] text-white shadow-xs'
                      : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span>{group.shortLabel}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Advanced Filters Drawer */}
          {showAdvancedFilters && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Detailed Public Finance Parameter Filters
                </span>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 hover:underline cursor-pointer"
                >
                  <RotateCcw size={12} strokeWidth={1.5} />
                  <span>Reset All Filters</span>
                </button>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* 10 Accountability Pillars Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Specific Accountability Pillar:
                  </label>
                  <select
                    value={selectedPillar}
                    onChange={(e) => setSelectedPillar(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 focus:outline-hidden"
                  >
                    <option value="all">All 10 Pillars</option>
                    {FINANCIAL_SECTIONS.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Financial Year */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Financial Year:
                  </label>
                  <select
                    value={selectedFY}
                    onChange={(e) => setSelectedFY(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 focus:outline-hidden"
                  >
                    <option value="all">All Financial Years</option>
                    <option value="2024-25">FY 2024-25</option>
                    <option value="2023-24">FY 2023-24</option>
                    <option value="2025-26">FY 2025-26</option>
                    <option value="2022-23">FY 2022-23</option>
                  </select>
                </div>

                {/* Gov Level */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Government Level:
                  </label>
                  <select
                    value={selectedGovLevel}
                    onChange={(e) => setSelectedGovLevel(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 focus:outline-hidden"
                  >
                    <option value="all">All Gov Levels</option>
                    <option value="union">Union Government</option>
                    <option value="state">State Government</option>
                    <option value="local">Local / Municipal</option>
                  </select>
                </div>

                {/* Figure Type */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Figure Type:
                  </label>
                  <select
                    value={selectedFigureType}
                    onChange={(e) => setSelectedFigureType(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 focus:outline-hidden"
                  >
                    <option value="all">All Figure Types</option>
                    <option value="budget_estimate">Budget Estimate (BE)</option>
                    <option value="revised_estimate">Revised Estimate (RE)</option>
                    <option value="actual">Audited Actual Spend</option>
                    <option value="reported_finding">CAG / PAC Audit Observation</option>
                    <option value="calculated_metric">Calculated Fiscal Metric</option>
                  </select>
                </div>

                {/* Ministry */}
                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Ministry or Department:
                  </label>
                  <select
                    value={selectedMinistry}
                    onChange={(e) => setSelectedMinistry(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 focus:outline-hidden"
                  >
                    <option value="all">All Ministries & Departments</option>
                    {allMinistries.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active filter count & controls */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                Showing {filteredRecords.length} records
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">
                Tracked Value:{' '}
                <strong className="text-slate-900 font-mono">
                  {formatInLakhCrore(sectionSummary.totalAmount)}
                </strong>
                <span className="text-[10px] text-slate-400 font-sans ml-1">(Excl. sub-components)</span>
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  <RotateCcw size={12} strokeWidth={1.5} />
                  Reset
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-medium cursor-pointer"
              >
                Expand All Details
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={collapseAll}
                className="rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-medium cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pillar Context Banner if selected */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        {selectedPillar !== 'all' && activeSectionMeta && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              <Layers size={14} strokeWidth={1.5} />
              <span>Accountability Pillar: {activeSectionMeta.label}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-900">{activeSectionMeta.plainQuestion}</p>
            <p className="mt-1 text-xs text-slate-600">{activeSectionMeta.citizenDescription}</p>
          </div>
        )}
      </section>

      {/* 5. Detailed Records List */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        {filteredRecords.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Filter size={32} strokeWidth={1.5} className="mx-auto text-slate-400" />
            <h3 className="mt-3 text-base font-bold text-slate-900">
              No public finance records match your filters
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Try adjusting your search query, ministry, or figure type selector.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
            >
              <RotateCcw size={14} strokeWidth={1.5} /> Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => {
              const isExpanded = !!expandedRecordIds[record.id];
              const badge = getFigureTypeBadge(record.figureType);

              return (
                <div
                  key={record.id}
                  id={record.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:border-slate-300 hover:shadow-md"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                            record.status === 'official_verified'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : record.status === 'provisional'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {record.status === 'official_verified' ? 'Verified Record' : record.status === 'provisional' ? 'Provisional' : 'Documented Record'}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-700">
                          {record.govLevel} Government
                        </span>

                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${badge.className}`}
                          title={badge.hint}
                        >
                          {badge.label}
                        </span>

                        {record.isSubComponent && (
                          <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold text-blue-800">
                            Constituent Sub-Component (Excluded from Aggregate Total)
                          </span>
                        )}

                        {record.sectorTag && (
                          <span className="rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600">
                            {record.sectorTag}
                          </span>
                        )}
                      </div>

                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <Calendar size={13} strokeWidth={1.5} />
                        {record.financialYear}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div className="max-w-3xl">
                        <h3 className="text-lg font-bold text-slate-900 sm:text-xl font-serif">
                          {record.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <Building2 size={13} strokeWidth={1.5} />
                          <span>{record.departmentOrMinistry}</span>
                        </div>
                      </div>

                      <div className="shrink-0 rounded-xl bg-slate-50 border border-slate-200 p-3 text-right">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          {badge.short} Reported Amount
                        </p>
                        <p className="text-xl font-black text-slate-900 sm:text-2xl font-mono">
                          {formatInLakhCrore(record.amountCr)}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          Exact: ₹{record.amountCr.toLocaleString('en-IN')} Cr
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-3.5">
                      <div className="flex items-start gap-2">
                        <span className="rounded-md bg-[#1A3D2F] px-1.5 py-0.5 text-[10px] font-bold text-white shrink-0">
                          Citizen Explanation
                        </span>
                        <p className="text-xs leading-relaxed text-[#181A19] font-medium sm:text-sm">
                          {record.plainSummary}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-2.5 sm:px-6">
                    <button
                      onClick={() => toggleExpand(record.id)}
                      className="flex w-full items-center justify-between text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCheck2 size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
                        <span>
                          {isExpanded
                            ? 'Hide Fiscal Breakdown & Verification Citations'
                            : 'View Full Fiscal Breakdown, Calculations & Citations'}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        {isExpanded ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
                      </span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-white p-5 sm:p-6 space-y-4">
                      {/* BE vs RE vs Actual Dynamic Variance Table */}
                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-100 bg-slate-50/70 px-3 py-2 flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                            Fiscal Accounting Breakdown & Dynamic Variance: {record.financialYear}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">Figures in ₹ Crore</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-[#FAF8F5] text-slate-600 border-b border-slate-100 font-semibold text-[11px]">
                              <tr>
                                <th className="px-3.5 py-2">Measure</th>
                                <th className="px-3.5 py-2 text-right">Value (₹ Cr)</th>
                                <th className="px-3.5 py-2 text-right">In Lakh Crore</th>
                                <th className="px-3.5 py-2 text-right">Variance vs BE</th>
                                <th className="px-3.5 py-2">Classification Nature</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-mono">
                              {record.budgetEstimateCr != null && (
                                <tr className="hover:bg-slate-50/50">
                                  <td className="px-3.5 py-2 font-sans font-semibold text-[#1A3D2F]">
                                    Budget Estimate (BE)
                                  </td>
                                  <td className="px-3.5 py-2 text-right font-bold text-slate-900">
                                    ₹{record.budgetEstimateCr.toLocaleString('en-IN')} Cr
                                  </td>
                                  <td className="px-3.5 py-2 text-right text-slate-700">
                                    {formatInLakhCrore(record.budgetEstimateCr)}
                                  </td>
                                  <td className="px-3.5 py-2 text-right text-slate-400 font-sans">
                                    Baseline target
                                  </td>
                                  <td className="px-3.5 py-2 font-sans text-[11px] text-slate-500">
                                    Initial approved authorization ceiling
                                  </td>
                                </tr>
                              )}
                              {record.revisedEstimateCr != null && (
                                <tr className="hover:bg-slate-50/50">
                                  <td className="px-3.5 py-2 font-sans font-semibold text-amber-800">
                                    Revised Estimate (RE)
                                  </td>
                                  <td className="px-3.5 py-2 text-right font-bold text-amber-900">
                                    ₹{record.revisedEstimateCr.toLocaleString('en-IN')} Cr
                                  </td>
                                  <td className="px-3.5 py-2 text-right text-amber-800">
                                    {formatInLakhCrore(record.revisedEstimateCr)}
                                  </td>
                                  <td className="px-3.5 py-2 text-right font-bold font-sans">
                                    {record.budgetEstimateCr != null ? (
                                      (() => {
                                        const diff = record.revisedEstimateCr - record.budgetEstimateCr;
                                        const diffPct = ((diff / record.budgetEstimateCr) * 100).toFixed(1);
                                        if (diff === 0) return <span className="text-slate-500">0.0% (Matched)</span>;
                                        return diff > 0 ? (
                                          <span className="text-emerald-700">+{diffPct}% (+{formatInLakhCrore(diff)})</span>
                                        ) : (
                                          <span className="text-rose-700">{diffPct}% (-{formatInLakhCrore(Math.abs(diff))})</span>
                                        );
                                      })()
                                    ) : (
                                      '—'
                                    )}
                                  </td>
                                  <td className="px-3.5 py-2 font-sans text-[11px] text-slate-500">
                                    Mid-year calibrated projection
                                  </td>
                                </tr>
                              )}
                              {record.actualAmountCr != null && (
                                <tr className="hover:bg-slate-50/50 bg-emerald-50/20">
                                  <td className="px-3.5 py-2 font-sans font-bold text-emerald-900">
                                    Audited / Confirmed Actual
                                  </td>
                                  <td className="px-3.5 py-2 text-right font-black text-emerald-900">
                                    ₹{record.actualAmountCr.toLocaleString('en-IN')} Cr
                                  </td>
                                  <td className="px-3.5 py-2 text-right font-bold text-emerald-800">
                                    {formatInLakhCrore(record.actualAmountCr)}
                                  </td>
                                  <td className="px-3.5 py-2 text-right font-bold font-sans">
                                    {record.budgetEstimateCr != null ? (
                                      (() => {
                                        const diff = record.actualAmountCr - record.budgetEstimateCr;
                                        const diffPct = ((diff / record.budgetEstimateCr) * 100).toFixed(1);
                                        if (diff === 0) return <span className="text-slate-500">0.0% (Exact)</span>;
                                        return diff > 0 ? (
                                          <span className="text-emerald-700">+{diffPct}% (+{formatInLakhCrore(diff)})</span>
                                        ) : (
                                          <span className="text-rose-700">{diffPct}% (-{formatInLakhCrore(Math.abs(diff))})</span>
                                        );
                                      })()
                                    ) : (
                                      '—'
                                    )}
                                  </td>
                                  <td className="px-3.5 py-2 font-sans text-[11px] text-slate-600">
                                    Recorded cash accounts (CGA / Treasury)
                                  </td>
                                </tr>
                              )}
                              {record.previousYearAmountCr != null && (
                                <tr className="hover:bg-slate-50/50 text-slate-600">
                                  <td className="px-3.5 py-2 font-sans font-medium text-slate-600">
                                    Prior Financial Year Actual
                                  </td>
                                  <td className="px-3.5 py-2 text-right text-slate-700">
                                    ₹{record.previousYearAmountCr.toLocaleString('en-IN')} Cr
                                  </td>
                                  <td className="px-3.5 py-2 text-right text-slate-600">
                                    {formatInLakhCrore(record.previousYearAmountCr)}
                                  </td>
                                  <td className="px-3.5 py-2 text-right font-sans">
                                    {record.actualAmountCr != null ? (
                                      (() => {
                                        const yoy = record.actualAmountCr - record.previousYearAmountCr;
                                        const yoyPct = ((yoy / record.previousYearAmountCr) * 100).toFixed(1);
                                        return yoy >= 0 ? (
                                          <span className="text-emerald-700 font-semibold">+{yoyPct}% YoY</span>
                                        ) : (
                                          <span className="text-rose-700 font-semibold">{yoyPct}% YoY</span>
                                        );
                                      })()
                                    ) : (
                                      '—'
                                    )}
                                  </td>
                                  <td className="px-3.5 py-2 font-sans text-[11px] text-slate-500">
                                    Historical audited baseline
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {record.details?.utilizationRatePct != null && (
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-600">Fund Utilization Rate:</span>
                            <span className="font-bold text-slate-900">
                              {record.details.utilizationRatePct}%
                            </span>
                          </div>
                          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${
                                record.details.utilizationRatePct > 95
                                  ? 'bg-emerald-500'
                                  : record.details.utilizationRatePct > 80
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${Math.min(100, record.details.utilizationRatePct)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {record.details?.physicalProgress && (
                        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs text-emerald-900">
                          <CheckCircle2 size={14} strokeWidth={1.5} className="shrink-0 text-emerald-600" />
                          <span>
                            <strong>Physical Ground Delivery:</strong> {record.details.physicalProgress}
                          </span>
                        </div>
                      )}

                      {record.details?.cagReportNumber && (
                        <div className="flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-100 px-3 py-2 text-xs text-rose-900">
                          <ShieldCheck size={14} strokeWidth={1.5} className="shrink-0 text-rose-600 mt-0.5" />
                          <div>
                            <span className="font-bold">CAG Report ID:</span> {record.details.cagReportNumber}
                            {record.details.ministryResponseStatus && (
                              <span className="ml-2 rounded-md bg-white border border-rose-200 px-1.5 py-0.2 text-[10px] font-bold text-rose-800">
                                Status: {record.details.ministryResponseStatus.replace('_', ' ').toUpperCase()}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {record.details?.awardMethod && (
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-800">
                            Portal: {record.details.procurementPortal}
                          </span>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-800">
                            Method: {record.details.awardMethod.replace('_', ' ')}
                          </span>
                          {record.details.vendorName && (
                            <span className="text-slate-500">
                              Vendor: <strong>{record.details.vendorName}</strong>
                            </span>
                          )}
                        </div>
                      )}

                      {record.details?.multiYearTrend && (
                        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                          <p className="text-xs font-bold text-slate-700">
                            {record.details.trendMetricName || 'Multi-Year Trajectory'}
                          </p>
                          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                            {record.details.multiYearTrend.map((pt, idx) => (
                              <div key={idx} className="rounded-lg bg-white border border-slate-200 p-2.5 text-center">
                                <p className="text-[11px] font-semibold text-slate-500">{pt.year}</p>
                                <p className="mt-1 text-xs font-black text-slate-900 font-mono">
                                  {formatInLakhCrore(pt.amountCr)}
                                </p>
                                {pt.gdpPct && (
                                  <p className="text-[10px] font-semibold text-[#1A3D2F]">
                                    {pt.gdpPct}% of GDP
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Official Source Dossier */}
                      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-2xs">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                            Primary Source Dossier & Verification
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Verified on: {record.source.lastUpdated}
                          </span>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-bold text-slate-500">Official Document Title</p>
                            <p className="text-xs font-semibold text-slate-900 mt-0.5">
                              {record.source.documentTitle}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-bold text-slate-500">Publishing Authority</p>
                            <p className="text-xs font-semibold text-slate-900 mt-0.5">
                              {record.source.publishingAuthority}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-bold text-slate-500">Publication Date</p>
                            <p className="text-xs text-slate-700 mt-0.5">
                              {record.source.publicationDate}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] font-bold text-slate-500">Table / Paragraph Reference</p>
                            <p className="text-xs font-mono text-slate-800 mt-0.5">
                              {record.source.tableOrPageReference}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 border-t border-slate-200 pt-2.5">
                          <p className="text-[11px] font-bold text-slate-500">
                            Calculation Methodology & Arithmetic
                          </p>
                          <p className="mt-0.5 text-xs text-slate-700 leading-relaxed font-mono bg-white p-2.5 rounded-lg border border-slate-200">
                            {record.source.calculationMethod}
                          </p>
                        </div>

                        {record.source.coverageNotes && (
                          <div className="mt-2.5 border-t border-slate-200 pt-2.5">
                            <p className="text-[11px] font-bold text-slate-500">
                              Accounting Coverage & Scope Disclosures
                            </p>
                            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                              {record.source.coverageNotes}
                            </p>
                          </div>
                        )}

                        {record.source.sourceUrl && (
                          <div className="mt-3 flex items-center justify-end pt-1">
                            <a
                              href={record.source.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#D5CFBF] px-3 py-1.5 text-xs font-bold text-[#1A3D2F] transition hover:bg-[#FAF8F5]"
                            >
                              <span>Open Official Government Portal</span>
                              <ExternalLink size={13} strokeWidth={1.5} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

