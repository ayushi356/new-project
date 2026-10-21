import React, { useState, useMemo, useEffect } from 'react';
import {
  Coins,
  Receipt,
  PieChart,
  TrendingDown,
  FolderKanban,
  Tag,
  FileCheck2,
  FileSignature,
  Landmark,
  GitFork,
  BarChart3,
  Search,
  Filter,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import {
  FINANCIAL_SECTIONS,
  CITIZEN_RUPEE_BREAKDOWN,
  SAMPLE_FINANCE_RECORDS,
  type SectionMeta,
} from '@/data/publicFinanceData';
import type {
  PublicFinanceRecord,
  FinancialSectionId,
  FigureType,
  GovLevel,
} from '@/types/finance';
import { useNavigate } from '@/lib/router';
import { AccessibleChart } from '@/components/AccessibleChart';

const CAPEX_TREND_DATA = [
  { label: '2014-15', value: 1.96, note: '₹1.96L Cr (11.8% of Total Budget)', color: '#1A3D2F' },
  { label: '2016-17', value: 2.84, note: '₹2.84L Cr (14.4% of Total Budget)', color: '#1A3D2F' },
  { label: '2018-19', value: 3.03, note: '₹3.03L Cr (13.1% of Total Budget)', color: '#1A3D2F' },
  { label: '2020-21', value: 4.12, note: '₹4.12L Cr (11.7% - Pandemic Relief)', color: '#1A3D2F' },
  { label: '2022-23', value: 7.36, note: '₹7.36L Cr (17.6% of Total Budget)', color: '#1A3D2F' },
  { label: '2024-25', value: 11.11, note: '₹11.11L Cr RE (23.0% of Total Budget)', color: '#1A3D2F' },
  { label: '2025-26', value: 11.90, note: '₹11.90L Cr BE (23.3% of Total Budget)', color: '#1A3D2F' },
];

// Icon resolver for sections
function getSectionIcon(iconName: string) {
  switch (iconName) {
    case 'Receipt':
      return Receipt;
    case 'PieChart':
      return PieChart;
    case 'TrendingDown':
      return TrendingDown;
    case 'FolderKanban':
      return FolderKanban;
    case 'Tag':
      return Tag;
    case 'FileCheck2':
      return FileCheck2;
    case 'FileSignature':
      return FileSignature;
    case 'Landmark':
      return Landmark;
    case 'GitFork':
      return GitFork;
    case 'BarChart3':
      return BarChart3;
    default:
      return Coins;
  }
}

// Format numbers in Indian numbering system (Lakh, Crore)
function formatInLakhCrore(amountCr: number): string {
  if (Math.abs(amountCr) >= 100000) {
    const lakhCr = (amountCr / 100000).toFixed(2);
    return `₹${Number(lakhCr).toLocaleString('en-IN')} Lakh Cr`;
  }
  return `₹${amountCr.toLocaleString('en-IN')} Cr`;
}

// Figure type badge styler
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

interface PublicMoneyPageProps {
  initialSection?: string;
}

export function PublicMoneyPage({ initialSection }: PublicMoneyPageProps) {
  const navigate = useNavigate();

  // Validate initial section from route or default to 'revenue'
  const validSectionId: FinancialSectionId = useMemo(() => {
    if (
      initialSection &&
      FINANCIAL_SECTIONS.some((s) => s.id === initialSection)
    ) {
      return initialSection as FinancialSectionId;
    }
    return 'revenue';
  }, [initialSection]);

  const [activeSection, setActiveSection] = useState<FinancialSectionId>(validSectionId);
  const [rupeeTab, setRupeeTab] = useState<'comes' | 'goes'>('comes');
  const [showGlossary, setShowGlossary] = useState(false);
  const [expandedRecordIds, setExpandedRecordIds] = useState<Record<string, boolean>>({});

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFY, setSelectedFY] = useState<string>('all');
  const [selectedGovLevel, setSelectedGovLevel] = useState<string>('all');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('all');
  const [selectedFigureType, setSelectedFigureType] = useState<string>('all');

  // Keep route synced when tab changes
  useEffect(() => {
    if (initialSection !== activeSection) {
      navigate(`/public-money/${activeSection}`);
    }
  }, [activeSection, initialSection, navigate]);

  // List of distinct ministries for filter dropdown
  const allMinistries = useMemo(() => {
    const set = new Set<string>();
    SAMPLE_FINANCE_RECORDS.forEach((r) => set.add(r.departmentOrMinistry));
    return Array.from(set).sort();
  }, []);

  // Filter records
  const filteredRecords = useMemo(() => {
    return SAMPLE_FINANCE_RECORDS.filter((rec) => {
      // Must match section
      if (rec.section !== activeSection) return false;

      // Text search
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

      // Gov level
      if (selectedGovLevel !== 'all' && rec.govLevel !== selectedGovLevel) {
        return false;
      }

      // Ministry
      if (selectedMinistry !== 'all' && rec.departmentOrMinistry !== selectedMinistry) {
        return false;
      }

      // Figure type
      if (selectedFigureType !== 'all' && rec.figureType !== selectedFigureType) {
        return false;
      }

      // Financial year
      if (selectedFY !== 'all' && !rec.financialYear.includes(selectedFY)) {
        return false;
      }

      return true;
    });
  }, [
    activeSection,
    searchQuery,
    selectedGovLevel,
    selectedMinistry,
    selectedFigureType,
    selectedFY,
  ]);

  const activeSectionMeta = useMemo(() => {
    return (
      FINANCIAL_SECTIONS.find((s) => s.id === activeSection) ||
      FINANCIAL_SECTIONS[0]
    );
  }, [activeSection]);

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
    setSelectedFY('all');
    setSelectedGovLevel('all');
    setSelectedMinistry('all');
    setSelectedFigureType('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedFY !== 'all' ||
    selectedGovLevel !== 'all' ||
    selectedMinistry !== 'all' ||
    selectedFigureType !== 'all';

  // Section summary statistics
  const sectionSummary = useMemo(() => {
    const records = SAMPLE_FINANCE_RECORDS.filter((r) => r.section === activeSection);
    const totalAmount = records.reduce((sum, r) => sum + r.amountCr, 0);
    const auditedCount = records.filter(
      (r) => r.figureType === 'actual' || r.figureType === 'reported_finding'
    ).length;
    return {
      totalRecords: records.length,
      totalAmount,
      auditedCount,
    };
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A19] pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#F4F1EA] border-b border-[#E5E0D8] text-[#181A19] py-12 sm:py-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3.5 py-1 text-xs font-semibold text-[#1A3D2F]">
              <Coins size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
              <span>Public Treasury & Citizen Accountability · Article 112 & 151</span>
            </div>

            <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#181A19]">
              Tax & Public Money
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#4A524D] sm:text-lg">
              Public money belongs to the people of India. Explore how national revenues are
              collected, allocated to ministries, spent on infrastructure, reviewed by independent
              auditors (CAG), and devolved to states — with clear distinctions between budget
              ceilings and actual disbursements.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowGlossary((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1A3D2F] px-4 py-2 text-xs font-bold text-white shadow-2xs transition hover:bg-[#143025] cursor-pointer"
              >
                <HelpCircle size={15} strokeWidth={1.5} />
                <span>{showGlossary ? 'Hide Budget Guide' : 'Citizen Budget Primer'}</span>
              </button>
              <a
                href="https://www.indiabudget.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5CFBF] bg-white px-3.5 py-2 text-xs font-semibold text-[#181A19] shadow-2xs hover:bg-[#FAF8F5] transition"
              >
                <span>Union Budget Official Portal</span>
                <ExternalLink size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
              </a>
              <a
                href="https://cag.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5CFBF] bg-white px-3.5 py-2 text-xs font-semibold text-[#181A19] shadow-2xs hover:bg-[#FAF8F5] transition"
              >
                <span>CAG Official Reports</span>
                <ExternalLink size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sample Data Disclaimer Banner */}
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-3 sm:px-6">
          <AlertCircle size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-amber-700" />
          <div className="text-xs leading-relaxed text-amber-900 sm:text-sm">
            <span className="font-bold uppercase tracking-wide text-amber-800">
              Demonstration & Verification Notice:
            </span>{' '}
            All initial figures presented in this tracker are structured demonstration records
            illustrating official Union Budget and CAG publication schemas. An authorized Budget
            Estimate (BE) is a legislative spending ceiling, not cash spent. Always refer to the
            verifiable document title, table reference, and direct link in each record’s
            Methodology drawer.
          </div>
        </div>
      </div>

      {/* 3. Citizen Budget Primer / Glossary (Collapsible) */}
      {showGlossary && (
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle size={18} strokeWidth={1.5} className="text-[#1A3D2F]" />
                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Citizen Primer: Key Public Finance Concepts
                </h2>
              </div>
              <button
                onClick={() => setShowGlossary(false)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Close Primer &times;
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
                <span className="inline-block rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-[11px] font-bold text-[#1A3D2F]">
                  BE · Budget Estimate
                </span>
                <h3 className="mt-2 text-sm font-bold text-slate-900">
                  Spending Ceiling, Not Cash Outflow
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Passed by Parliament at the start of the financial year. It gives legal authority
                  to spend up to that limit. It does <strong>not</strong> mean the money has left
                  the treasury.
                </p>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                <span className="inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                  RE · Revised Estimate
                </span>
                <h3 className="mt-2 text-sm font-bold text-slate-900">
                  Mid-Year Realistic Projection
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Mid-way through the year, ministries adjust their budget targets based on actual
                  monsoon trends, tax collections, and execution delays before Parliament.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                  Actuals · Audited Realization
                </span>
                <h3 className="mt-2 text-sm font-bold text-slate-900">
                  Real Money Disbursed
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  The actual audited amount released through the Controller General of Accounts
                  (CGA), verified two years later by the Comptroller and Auditor General (CAG).
                </p>
              </div>

              <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
                <span className="inline-block rounded-md bg-purple-100 px-2 py-0.5 text-[11px] font-bold text-purple-800">
                  Revenue Foregone
                </span>
                <h3 className="mt-2 text-sm font-bold text-slate-900">
                  Statutory Policy Concessions
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Taxes intentionally waived or reduced through legal exemptions to encourage
                  manufacturing, exports, or citizen savings. It is <strong>not</strong> lost or
                  misappropriated money.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. The Citizen's Rupee: 100-Paise Interactive Visualizer */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                <PieChart size={15} strokeWidth={1.5} />
                <span>Macro Overview · {CITIZEN_RUPEE_BREAKDOWN.financialYear}</span>
              </div>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                The Citizen’s Rupee: Where 100 Paise Come From & Go
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                If the entire Government of India budget were scaled down to a single 1 Rupee (100
                paise) coin:
              </p>
            </div>

            {/* Toggle Tab */}
            <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-1">
              <button
                onClick={() => setRupeeTab('comes')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                  rupeeTab === 'comes'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Where 1 Rupee Comes From
              </button>
              <button
                onClick={() => setRupeeTab('goes')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition ${
                  rupeeTab === 'goes'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Where 1 Rupee Goes
              </button>
            </div>
          </div>

          {/* Macro Key Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-y border-slate-100 py-4 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Union Outlay</p>
              <p className="mt-0.5 text-lg font-extrabold text-slate-900 sm:text-xl">
                {formatInLakhCrore(CITIZEN_RUPEE_BREAKDOWN.macroTotals.totalBudgetOutlayCr)}
              </p>
              <span className="text-[11px] text-slate-400">Total expenditure BE</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Revenue Receipts</p>
              <p className="mt-0.5 text-lg font-extrabold text-slate-900 sm:text-xl">
                {formatInLakhCrore(CITIZEN_RUPEE_BREAKDOWN.macroTotals.totalRevenueReceiptsCr)}
              </p>
              <span className="text-[11px] text-slate-400">Net tax + non-tax receipts</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Capital Capex (Asset Building)</p>
              <p className="mt-0.5 text-lg font-extrabold text-emerald-600 sm:text-xl">
                {formatInLakhCrore(CITIZEN_RUPEE_BREAKDOWN.macroTotals.capitalExpenditureCr)}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold">3.4% of GDP</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Fiscal Deficit Target</p>
              <p className="mt-0.5 text-lg font-extrabold text-[#1A3D2F] sm:text-xl">
                {CITIZEN_RUPEE_BREAKDOWN.macroTotals.fiscalDeficitTargetPct}% of GDP
              </p>
              <span className="text-[11px] text-slate-400">FRBM statutory glide path</span>
            </div>
          </div>

          {/* Stacked Visual Bar */}
          <div className="mt-6">
            <div className="flex h-6 w-full overflow-hidden rounded-lg bg-slate-100 shadow-inner">
              {(rupeeTab === 'comes'
                ? CITIZEN_RUPEE_BREAKDOWN.where1RupeeComesFrom
                : CITIZEN_RUPEE_BREAKDOWN.where1RupeeGoes
              ).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${item.paise}%`,
                    backgroundColor: item.color,
                  }}
                  title={`${'source' in item ? item.source : item.destination}: ${item.paise} paise`}
                  className="transition-all hover:opacity-85"
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>0 paise (0%)</span>
              <span>Total 100 paise (100% of Union Budget)</span>
            </div>
          </div>

          {/* Visual Legend / Breakdown Cards */}
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {(rupeeTab === 'comes'
              ? CITIZEN_RUPEE_BREAKDOWN.where1RupeeComesFrom
              : CITIZEN_RUPEE_BREAKDOWN.where1RupeeGoes
            ).map((item, idx) => {
              const label = 'source' in item ? item.source : item.destination;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-xs"
                >
                  <div className="flex items-center gap-2 overflow-hidden pr-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate font-medium text-slate-700" title={label}>
                      {label}
                    </span>
                  </div>
                  <span className="shrink-0 font-extrabold text-slate-900">
                    {item.paise}p{' '}
                    <span className="font-normal text-[11px] text-slate-500">
                      ({item.paise}%)
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Storytelling: Capital Spending Trend Chart */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <AccessibleChart
          title="Union Capital Outlay (Infrastructure & Asset Creation) Trend: 2014 to 2026"
          unit="₹ Lakh Crore"
          referencePeriod="FY 2014-15 to FY 2025-26 (BE)"
          takeaway="Central Capital Expenditure (railways, highways, defence equipment, port infrastructure) grew more than 6-fold from ₹1.96 Lakh Crore (11.8% of total budget) in 2014-15 to ₹11.90 Lakh Crore (23.3% of total budget) in 2025-26, reflecting a structural shift from routine administrative consumption toward productive national physical assets."
          sourceName="Union Budget Receipts and Disbursements Statements & Controller General of Accounts (CGA) Audited Actuals"
          sourceUrl="https://www.indiabudget.gov.in/"
          limitations="FY 2024-25 figures represent Revised Estimates (RE) and FY 2025-26 represent Budget Estimates (BE) approved by Parliament; final audited actuals are confirmed by CGA 18-24 months after financial year conclusion."
          data={CAPEX_TREND_DATA}
        />
      </section>

      {/* Visual Storytelling: How Public Money Moves Through Government */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <Coins size={14} strokeWidth={1.5} />
            <span>Civic Literacy: The 5-Stage Life of Public Money</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-slate-900">How Tax Money Moves Through Indian Government</h2>
          <p className="mt-1 text-xs text-slate-600">
            Understand how citizen taxes move from revenue collection to parliamentary authorization, actual ground release, and final constitutional audit.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#181A19] text-xs font-bold text-white mb-2">1</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Revenue Inflow</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Taxes (GST, Income Tax, Corporate Tax) and non-tax receipts enter the Consolidated Fund of India (Article 266).
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white mb-2">2</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Budget Ceiling (BE)</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Parliament passes the Appropriation Bill in March. This authorizes maximum permissible spending, not cash spent.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#181A19] text-xs font-bold text-white mb-2">3</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Mid-Year Review (RE)</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Ministries adjust targets in December based on ground pace, monsoon variations, and supplementary demand grants.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white mb-2">4</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Actual Outflow</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Ministries release funds to contractors, states, and DBT bank accounts via CGA and PFMS accounting systems.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B45309] text-xs font-bold text-white mb-2">5</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">CAG Constitutional Audit</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                The Comptroller & Auditor General examines accounts for waste, delays, or unauthorized diversions, tabled before PAC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The 10 Section Navigation Pills */}
      <section className="mx-auto max-w-7xl px-4 pt-2 sm:px-6">
        <div className="flex items-center justify-between pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Browse By Accountability Pillar (10 Pillars)
          </span>
          <span className="text-xs text-slate-400">Select any pillar to examine detailed records</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          {FINANCIAL_SECTIONS.map((sec) => {
            const Icon = getSectionIcon(sec.iconName);
            const active = sec.id === activeSection;
            const count = SAMPLE_FINANCE_RECORDS.filter((r) => r.section === sec.id).length;

            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition ${
                  active
                    ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} strokeWidth={1.5} className={active ? 'text-emerald-400' : 'text-slate-500'} />
                <span>{sec.shortLabel}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-extrabold ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. Active Pillar Header & Metadata */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Layers size={14} strokeWidth={1.5} />
                <span>Pillar Details</span>
              </div>
              <h2 className="mt-1 text-2xl font-black text-slate-900">
                {activeSectionMeta.label}
              </h2>
              <p className="mt-1 text-sm font-semibold text-[#1A3D2F]">
                {activeSectionMeta.plainQuestion}
              </p>
              <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                {activeSectionMeta.citizenDescription}
              </p>
            </div>

            {/* Quick KPI stats for this section */}
            <div className="flex shrink-0 items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-[11px] font-medium text-slate-500">Sample Records</p>
                <p className="text-lg font-bold text-slate-900">
                  {sectionSummary.totalRecords}
                </p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Tracked Value</p>
                <p className="text-lg font-bold text-slate-900">
                  {formatInLakhCrore(sectionSummary.totalAmount)}
                </p>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Audited/Actuals</p>
                <p className="text-lg font-bold text-emerald-600">
                  {sectionSummary.auditedCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Search & Filter Bar */}
      <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            {/* Search */}
            <div className="relative md:col-span-4">
              <Search
                size={16}
                strokeWidth={1.5}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search pillar records, ministries, schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 transition focus:border-slate-400 focus:bg-white focus:outline-hidden"
              />
            </div>

            {/* Gov Level */}
            <div className="md:col-span-2">
              <select
                value={selectedGovLevel}
                onChange={(e) => setSelectedGovLevel(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700 focus:border-slate-400 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Gov Levels</option>
                <option value="union">Union Government</option>
                <option value="state">State Government</option>
                <option value="local">Local / Municipal</option>
              </select>
            </div>

            {/* Ministry */}
            <div className="md:col-span-3">
              <select
                value={selectedMinistry}
                onChange={(e) => setSelectedMinistry(e.target.value)}
                className="w-full truncate rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700 focus:border-slate-400 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Ministries & Departments</option>
                {allMinistries.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Figure Type */}
            <div className="md:col-span-3">
              <select
                value={selectedFigureType}
                onChange={(e) => setSelectedFigureType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700 focus:border-slate-400 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Figure Types</option>
                <option value="budget_estimate">Budget Estimate (BE)</option>
                <option value="revised_estimate">Revised Estimate (RE)</option>
                <option value="actual">Audited Actual Spend</option>
                <option value="reported_finding">CAG / PAC Audit Observation</option>
                <option value="calculated_metric">Calculated Fiscal Metric</option>
              </select>
            </div>
          </div>

          {/* Active filter tags & drawer toggles */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                Showing {filteredRecords.length} of {sectionSummary.totalRecords} records
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-200"
                >
                  <RotateCcw size={12} strokeWidth={1.5} />
                  Reset Filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-medium"
              >
                Expand All Details
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={collapseAll}
                className="rounded-md px-2.5 py-1 text-slate-600 hover:bg-slate-100 font-medium"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Record List / Cards */}
      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
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
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
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
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:border-slate-300 hover:shadow-md"
                >
                  {/* Record Header */}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Sample record banner */}
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                          Sample Record
                        </span>

                        {/* Gov Level */}
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-700">
                          {record.govLevel} Government
                        </span>

                        {/* Figure Type Badge */}
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${badge.className}`}
                          title={badge.hint}
                        >
                          {badge.label}
                        </span>

                        {/* Sector Tag */}
                        {record.sectorTag && (
                          <span className="rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600">
                            {record.sectorTag}
                          </span>
                        )}
                      </div>

                      {/* Financial Year */}
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <Calendar size={13} strokeWidth={1.5} />
                        {record.financialYear}
                      </span>
                    </div>

                    {/* Title & Ministry */}
                    <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div className="max-w-3xl">
                        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                          {record.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                          <Building2 size={13} strokeWidth={1.5} />
                          <span>{record.departmentOrMinistry}</span>
                        </div>
                      </div>

                      {/* Primary Amount Card */}
                      <div className="shrink-0 rounded-xl bg-slate-50 border border-slate-200 p-3 text-right">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          {badge.short} Reported Amount
                        </p>
                        <p className="text-xl font-black text-slate-900 sm:text-2xl">
                          {formatInLakhCrore(record.amountCr)}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          Exact: ₹{record.amountCr.toLocaleString('en-IN')} Cr
                        </p>
                      </div>
                    </div>

                    {/* Plain Language Citizen Explanation */}
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

                    {/* Specific Details depending on section */}
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {record.budgetEstimateCr != null && (
                        <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5">
                          <p className="text-[10px] font-medium text-slate-500">Budget Estimate (BE)</p>
                          <p className="mt-0.5 text-xs font-bold text-[#1A3D2F]">
                            {formatInLakhCrore(record.budgetEstimateCr)}
                          </p>
                        </div>
                      )}
                      {record.revisedEstimateCr != null && (
                        <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5">
                          <p className="text-[10px] font-medium text-slate-500">Revised Estimate (RE)</p>
                          <p className="mt-0.5 text-xs font-bold text-amber-700">
                            {formatInLakhCrore(record.revisedEstimateCr)}
                          </p>
                        </div>
                      )}
                      {record.actualAmountCr != null && (
                        <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5">
                          <p className="text-[10px] font-medium text-slate-500">Audited Actual</p>
                          <p className="mt-0.5 text-xs font-bold text-emerald-700">
                            {formatInLakhCrore(record.actualAmountCr)}
                          </p>
                        </div>
                      )}
                      {record.previousYearAmountCr != null && (
                        <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-2.5">
                          <p className="text-[10px] font-medium text-slate-500">Prior Financial Year</p>
                          <p className="mt-0.5 text-xs font-bold text-slate-700">
                            {formatInLakhCrore(record.previousYearAmountCr)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Progress / Utilization rates where available */}
                    {record.details?.utilizationRatePct != null && (
                      <div className="mt-3">
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

                    {/* Scheme physical progress badge */}
                    {record.details?.physicalProgress && (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs text-emerald-900">
                        <CheckCircle2 size={14} strokeWidth={1.5} className="shrink-0 text-emerald-600" />
                        <span>
                          <strong>Physical Ground Delivery:</strong> {record.details.physicalProgress}
                        </span>
                      </div>
                    )}

                    {/* Audit observation specific notice */}
                    {record.details?.cagReportNumber && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg bg-rose-50 border border-rose-100 px-3 py-2 text-xs text-rose-900">
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

                    {/* Procurement specific award method */}
                    {record.details?.awardMethod && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
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

                    {/* Multi-Year Trend Visualizer for YoY section */}
                    {record.details?.multiYearTrend && (
                      <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                        <p className="text-xs font-bold text-slate-700">
                          {record.details.trendMetricName || 'Multi-Year Trajectory'}
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                          {record.details.multiYearTrend.map((pt, idx) => (
                            <div key={idx} className="rounded-lg bg-white border border-slate-200 p-2.5 text-center">
                              <p className="text-[11px] font-semibold text-slate-500">{pt.year}</p>
                              <p className="mt-1 text-xs font-black text-slate-900">
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
                  </div>

                  {/* Toggle Drawer Button */}
                  <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-2.5 sm:px-6">
                    <button
                      onClick={() => toggleExpand(record.id)}
                      className="flex w-full items-center justify-between text-xs font-bold text-slate-700 hover:text-slate-900"
                    >
                      <span className="flex items-center gap-1.5">
                        <FileCheck2 size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
                        <span>Source & Audit Methodology Dossier</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <span>{isExpanded ? 'Hide Citation & Math' : 'Verify Sources & Calculations'}</span>
                        {isExpanded ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
                      </span>
                    </button>
                  </div>

                  {/* 9. Expandable Methodology & Sources Dossier Drawer */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6">
                      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                            Verification Dossier & Citations
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Last checked: {record.source.lastUpdated}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                        <div className="mt-4 border-t border-slate-100 pt-3">
                          <p className="text-[11px] font-bold text-slate-500">
                            Calculation Methodology & Arithmetic
                          </p>
                          <p className="mt-0.5 text-xs text-slate-700 leading-relaxed font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            {record.source.calculationMethod}
                          </p>
                        </div>

                        {record.source.coverageNotes && (
                          <div className="mt-3 border-t border-slate-100 pt-3">
                            <p className="text-[11px] font-bold text-slate-500">
                              Accounting Coverage & Scope Disclosures
                            </p>
                            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                              {record.source.coverageNotes}
                            </p>
                          </div>
                        )}

                        {record.source.sourceUrl && (
                          <div className="mt-4 flex items-center justify-end pt-2">
                            <a
                              href={record.source.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-1.5 text-xs font-bold text-[#1A3D2F] transition hover:bg-[#F5F2EB]"
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

      {/* 10. Citizen Rights & Transparency Callout */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="rounded-2xl border border-[#143025] bg-[#1A3D2F] p-6 text-white sm:p-8 shadow-md">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} strokeWidth={1.5} /> Constitutional Accountability
              </span>
              <h3 className="mt-3 text-xl font-extrabold sm:text-2xl">
                How Can You Audit Public Expenditure in Your Area?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Every citizen has the legal right to inspect expenditure records of gram panchayats,
                municipal wards, and central schemes under the Right to Information (RTI) Act 2005.
                You can review real-time panchayat budgets on the e-GramSwaraj portal and central
                disbursements on the Public Financial Management System (PFMS).
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
              <a
                href="https://egramswaraj.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
              >
                <span>e-GramSwaraj Portal</span>
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
              <a
                href="https://pfms.nic.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
              >
                <span>PFMS Disbursements</span>
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
