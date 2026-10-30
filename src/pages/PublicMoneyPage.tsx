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
  CheckCircle2,
  HelpCircle,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Info,
  FileText,
} from 'lucide-react';
import {
  FINANCIAL_SECTIONS,
  CITIZEN_RUPEE_DATASETS,
  SAMPLE_FINANCE_RECORDS,
} from '@/data/publicFinanceData';
import type {
  FinancialSectionId,
  FigureType,
} from '@/types/finance';
import { useNavigate } from '@/lib/router';
import { AccessibleChart, type DataPoint } from '@/components/AccessibleChart';

// 1. Direct Central Capital Outlay (Infrastructure & Asset Creation)
// Verified against Union Budget Expenditure Statements and CGA Audited Finance Accounts
const DIRECT_CAPEX_TREND_DATA: DataPoint[] = [
  { label: '2014-15', value: 1.96, formattedValue: '₹1.96 Lakh Cr', note: 'Audited Actual · 11.8% of Total Outlay', color: '#1A3D2F' },
  { label: '2016-17', value: 2.84, formattedValue: '₹2.84 Lakh Cr', note: 'Audited Actual · 14.4% of Total Outlay', color: '#1A3D2F' },
  { label: '2018-19', value: 3.03, formattedValue: '₹3.03 Lakh Cr', note: 'Audited Actual · 13.1% of Total Outlay', color: '#1A3D2F' },
  { label: '2020-21', value: 4.26, formattedValue: '₹4.26 Lakh Cr', note: 'Audited Actual · 12.1% of Total Outlay', color: '#1A3D2F' },
  { label: '2022-23', value: 7.39, formattedValue: '₹7.39 Lakh Cr', note: 'Audited Actual · 17.6% of Total Outlay', color: '#1A3D2F' },
  { label: '2023-24', value: 9.49, formattedValue: '₹9.49 Lakh Cr', note: 'CGA Audited Actual · 21.1% of Total Outlay', color: '#1A3D2F' },
  { label: '2024-25', value: 10.18, secondaryValue: 11.11, secondaryLabel: 'Budget Estimate (BE)', formattedValue: '₹10.18 Lakh Cr (RE)', note: 'Revised Estimate · BE was ₹11.11L Cr', color: '#1A3D2F' },
  { label: '2025-26', value: 11.21, formattedValue: '₹11.21 Lakh Cr (BE)', note: 'Budget Estimate · 22.1% of Total Outlay', color: '#1A3D2F' },
];

// 2. Direct Capex vs Effective Capital Expenditure (Including Grants-in-Aid for Capital Asset Creation)
const EFFECTIVE_CAPEX_TREND_DATA: DataPoint[] = [
  { label: '2014-15', value: 1.96, secondaryValue: 2.65, secondaryLabel: 'Effective Capex', formattedValue: '₹1.96L Cr (Direct)', note: 'Effective: ₹2.65L Cr', color: '#1A3D2F' },
  { label: '2016-17', value: 2.84, secondaryValue: 3.75, secondaryLabel: 'Effective Capex', formattedValue: '₹2.84L Cr (Direct)', note: 'Effective: ₹3.75L Cr', color: '#1A3D2F' },
  { label: '2018-19', value: 3.03, secondaryValue: 4.28, secondaryLabel: 'Effective Capex', formattedValue: '₹3.03L Cr (Direct)', note: 'Effective: ₹4.28L Cr', color: '#1A3D2F' },
  { label: '2020-21', value: 4.26, secondaryValue: 6.36, secondaryLabel: 'Effective Capex', formattedValue: '₹4.26L Cr (Direct)', note: 'Effective: ₹6.36L Cr', color: '#1A3D2F' },
  { label: '2022-23', value: 7.39, secondaryValue: 10.53, secondaryLabel: 'Effective Capex', formattedValue: '₹7.39L Cr (Direct)', note: 'Effective: ₹10.53L Cr', color: '#1A3D2F' },
  { label: '2023-24', value: 9.49, secondaryValue: 12.71, secondaryLabel: 'Effective Capex', formattedValue: '₹9.49L Cr (Direct)', note: 'Effective: ₹12.71L Cr', color: '#1A3D2F' },
  { label: '2024-25', value: 10.18, secondaryValue: 15.02, secondaryLabel: 'Effective Capex (BE)', formattedValue: '₹10.18L Cr (RE)', note: 'Effective BE: ₹15.02L Cr', color: '#1A3D2F' },
  { label: '2025-26', value: 11.21, secondaryValue: 15.48, secondaryLabel: 'Effective Capex (BE)', formattedValue: '₹11.21L Cr (BE)', note: 'Effective BE: ₹15.48L Cr', color: '#1A3D2F' },
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
  const [selectedRupeeYear, setSelectedRupeeYear] = useState<string>('2024-25');
  const [capexView, setCapexView] = useState<'direct' | 'effective'>('direct');
  const [showGlossary, setShowGlossary] = useState(false);
  const [expandedRecordIds, setExpandedRecordIds] = useState<Record<string, boolean>>({});

  const currentRupeeData = useMemo(() => {
    return (
      CITIZEN_RUPEE_DATASETS.find((d) => d.yearId === selectedRupeeYear) ||
      CITIZEN_RUPEE_DATASETS[0]
    );
  }, [selectedRupeeYear]);

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

      {/* 2. Official Data Verification Notice */}
      <div className="border-b border-[#D5CFBF] bg-[#F4F1EA]">
        <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-3 sm:px-6">
          <ShieldCheck size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#1A3D2F]" />
          <div className="text-xs leading-relaxed text-[#2C332E] sm:text-sm">
            <span className="font-bold uppercase tracking-wide text-[#1A3D2F]">
              Verified Public Record Notice:
            </span>{' '}
            Figures presented in this tracker are ingested directly from official Union Budget 2024-25 documents,
            Controller General of Accounts (CGA) audited annual finance accounts, state budgets, and Comptroller & Auditor General (CAG)
            audit reports tabled in Parliament. An authorized Budget Estimate (BE) represents a legislative spending ceiling,
            not cash spent. For primary verification, refer to the document title, table citation, and official source link
            provided in each record’s Methodology drawer.
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
                <span>Macro Overview · {currentRupeeData.financialYear}</span>
              </div>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                The Citizen’s Rupee: Where 100 Paise Come From & Go
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Scaled visualization of Union Budget Receipts & Outlays. Basis: {currentRupeeData.budgetBasis}
              </p>
            </div>

            {/* Selectors: Financial Year & Flow Direction */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Financial Year Selector */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs">
                <button
                  onClick={() => setSelectedRupeeYear('2024-25')}
                  className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                    selectedRupeeYear === '2024-25'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  FY 2024–25 (BE & RE)
                </button>
                <button
                  onClick={() => setSelectedRupeeYear('2025-26')}
                  className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                    selectedRupeeYear === '2025-26'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  FY 2025–26 (BE)
                </button>
              </div>

              {/* Inflow vs Outflow Toggle */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs">
                <button
                  onClick={() => setRupeeTab('comes')}
                  className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                    rupeeTab === 'comes'
                      ? 'bg-[#1A3D2F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Where 1 Rupee Comes From
                </button>
                <button
                  onClick={() => setRupeeTab('goes')}
                  className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                    rupeeTab === 'goes'
                      ? 'bg-[#1A3D2F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Where 1 Rupee Goes
                </button>
              </div>
            </div>
          </div>

          {/* Macro Key Metrics: Clear separation of Budget Estimates (BE) and Revised Estimates (RE) */}
          <div className="mt-6 grid grid-cols-1 gap-3 border-y border-slate-100 py-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">Total Union Outlay</p>
                <span className="rounded-md bg-slate-200/70 px-1.5 py-0.2 text-[10px] font-bold text-slate-700">
                  Total Expenditure
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#1A3D2F] uppercase block">Budget Estimate (BE)</span>
                  <p className="text-base font-extrabold text-slate-900 sm:text-lg">
                    {formatInLakhCrore(currentRupeeData.macroTotals.totalBudgetOutlayCr)}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">
                    ₹{currentRupeeData.macroTotals.totalBudgetOutlayCr.toLocaleString('en-IN')} Cr
                  </span>
                </div>
                {currentRupeeData.macroTotals.totalBudgetOutlayReCr && currentRupeeData.macroTotals.totalBudgetOutlayReCr !== currentRupeeData.macroTotals.totalBudgetOutlayCr && (
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">Revised Outlay (RE)</span>
                    <p className="text-base font-extrabold text-amber-900 sm:text-lg">
                      {formatInLakhCrore(currentRupeeData.macroTotals.totalBudgetOutlayReCr)}
                    </p>
                    <span className="text-[10px] font-mono text-amber-700">
                      -₹{Math.abs(currentRupeeData.macroTotals.totalBudgetOutlayCr - currentRupeeData.macroTotals.totalBudgetOutlayReCr).toLocaleString('en-IN')} Cr
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">Revenue Receipts</p>
                <span className="rounded-md bg-slate-200/70 px-1.5 py-0.2 text-[10px] font-bold text-slate-700">
                  Tax + Non-Tax
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#1A3D2F] uppercase block">Budget Estimate (BE)</span>
                  <p className="text-base font-extrabold text-slate-900 sm:text-lg">
                    {formatInLakhCrore(currentRupeeData.macroTotals.totalRevenueReceiptsCr)}
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">
                    ₹{currentRupeeData.macroTotals.totalRevenueReceiptsCr.toLocaleString('en-IN')} Cr
                  </span>
                </div>
                {currentRupeeData.macroTotals.totalRevenueReceiptsReCr && currentRupeeData.macroTotals.totalRevenueReceiptsReCr !== currentRupeeData.macroTotals.totalRevenueReceiptsCr && (
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">Revised Receipts (RE)</span>
                    <p className="text-base font-extrabold text-amber-900 sm:text-lg">
                      {formatInLakhCrore(currentRupeeData.macroTotals.totalRevenueReceiptsReCr)}
                    </p>
                    <span className="text-[10px] font-mono text-amber-700">
                      -₹{Math.abs(currentRupeeData.macroTotals.totalRevenueReceiptsCr - currentRupeeData.macroTotals.totalRevenueReceiptsReCr).toLocaleString('en-IN')} Cr
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-emerald-900">Capital Expenditure (Capex)</p>
                <span className="rounded-md bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-800">
                  Direct Asset Creation
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#1A3D2F] uppercase block">Budget Estimate (BE)</span>
                  <p className="text-base font-extrabold text-emerald-900 sm:text-lg">
                    {formatInLakhCrore(currentRupeeData.macroTotals.capitalExpenditureCr)}
                  </p>
                  <span className="text-[10px] font-medium text-emerald-700">
                    3.4% of GDP
                  </span>
                </div>
                {currentRupeeData.macroTotals.capitalExpenditureReCr && currentRupeeData.macroTotals.capitalExpenditureReCr !== currentRupeeData.macroTotals.capitalExpenditureCr && (
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">Revised Capex (RE)</span>
                    <p className="text-base font-extrabold text-amber-900 sm:text-lg">
                      {formatInLakhCrore(currentRupeeData.macroTotals.capitalExpenditureReCr)}
                    </p>
                    <span className="text-[10px] font-medium text-amber-700">
                      3.1% of GDP
                    </span>
                  </div>
                )}
              </div>
              {currentRupeeData.macroTotals.effectiveCapexCr && (
                <div className="mt-2 border-t border-emerald-100 pt-1.5 text-[10px] text-emerald-800">
                  <span>Eff-Capex (incl. grants): <strong>{formatInLakhCrore(currentRupeeData.macroTotals.effectiveCapexCr)}</strong></span>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">Fiscal Deficit</p>
                <span className="rounded-md bg-[#1A3D2F]/10 px-1.5 py-0.2 text-[10px] font-bold text-[#1A3D2F]">
                  FRBM Glide Path
                </span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#1A3D2F] uppercase block">Budget Target (BE)</span>
                  <p className="text-base font-extrabold text-[#1A3D2F] sm:text-lg">
                    {currentRupeeData.macroTotals.fiscalDeficitTargetPct}% of GDP
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">
                    ₹{currentRupeeData.macroTotals.fiscalDeficitCr.toLocaleString('en-IN')} Cr
                  </span>
                </div>
                {currentRupeeData.macroTotals.fiscalDeficitRePct && currentRupeeData.macroTotals.fiscalDeficitRePct !== currentRupeeData.macroTotals.fiscalDeficitTargetPct && (
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Revised Target (RE)</span>
                    <p className="text-base font-extrabold text-emerald-700 sm:text-lg">
                      {currentRupeeData.macroTotals.fiscalDeficitRePct}% of GDP
                    </p>
                    <span className="text-[10px] font-mono text-emerald-700">
                      -10 bps consolidation
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Civic Budget Accounting Balancing Principle */}
          <div className="mt-4 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-3 text-xs text-[#5C645E]">
            <div className="flex items-start gap-2">
              <Info size={16} strokeWidth={1.5} className="mt-0.5 text-[#1A3D2F] shrink-0" />
              <div>
                <span className="font-bold text-[#181A19]">Constitutional Accounting Identity: </span>
                <span className="leading-relaxed">
                  Total Union Outlay (Expenditure) always equals Total Financing. Total Receipts = Revenue Receipts ({formatInLakhCrore(currentRupeeData.macroTotals.totalRevenueReceiptsCr)} BE) + Non-Debt Capital Receipts (~₹78,000 Cr) + Debt Borrowings & Liabilities ({formatInLakhCrore(currentRupeeData.macroTotals.fiscalDeficitCr)} BE). <strong>Borrowings and liabilities represent repayable debt to finance the fiscal gap, not tax revenue.</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Stacked Visual Bar */}
          <div className="mt-6">
            <div className="flex h-6 w-full overflow-hidden rounded-lg bg-slate-100 shadow-inner">
              {(rupeeTab === 'comes'
                ? currentRupeeData.where1RupeeComesFrom
                : currentRupeeData.where1RupeeGoes
              ).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${item.paise}%`,
                    backgroundColor: item.color,
                  }}
                  title={`${'source' in item && item.source ? item.source : item.destination}: ${item.paise} paise (${item.paise}%)`}
                  className="transition-all hover:opacity-85"
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>0 paise (0%)</span>
              <span>Total 100 paise (100% of Union Budget)</span>
            </div>
          </div>

          {/* Visual Legend / Breakdown Cards with Category Tagging */}
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {(rupeeTab === 'comes'
              ? currentRupeeData.where1RupeeComesFrom
              : currentRupeeData.where1RupeeGoes
            ).map((item, idx) => {
              const label = 'source' in item && item.source ? item.source : item.destination;
              const isBorrowing = item.categoryType === 'borrowing_liability';
              return (
                <div
                  key={idx}
                  className={`flex flex-col justify-between rounded-xl border p-3 text-xs transition ${
                    isBorrowing
                      ? 'border-amber-300 bg-amber-50/60'
                      : 'border-slate-100 bg-slate-50/70 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden pr-1">
                      <span
                        className="h-3 w-3 shrink-0 rounded-xs"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-bold text-slate-900" title={label}>
                        {label}
                      </span>
                    </div>
                    <span className="shrink-0 font-black text-slate-900">
                      {item.paise}p{' '}
                      <span className="font-normal text-[11px] text-slate-500">
                        ({item.paise}%)
                      </span>
                    </span>
                  </div>

                  {item.categoryLabel && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <span
                        className={`rounded-md px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                          isBorrowing
                            ? 'bg-amber-200 text-amber-900'
                            : 'bg-[#1A3D2F]/10 text-[#1A3D2F]'
                        }`}
                      >
                        {item.categoryLabel}
                      </span>
                    </div>
                  )}

                  {item.description && (
                    <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  )}

                  {item.officialSourceUrl && (
                    <div className="mt-2 pt-1 border-t border-slate-100 flex justify-end">
                      <a
                        href={item.officialSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[#1A3D2F] font-semibold hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Official Source Citation</span>
                        <ExternalLink size={9} strokeWidth={1.5} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Civic Primer on Receipts Categories */}
          <div className="mt-6 border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Citizen Guide: Understanding Budget Receipts Classification
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <span className="font-bold text-[#1A3D2F] block">Direct Taxes</span>
                <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                  Compulsory statutory taxes levied on the earnings of citizens and corporate entities (Income Tax, Corporation Tax). The liability cannot be shifted to consumers.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <span className="font-bold text-[#1A3D2F] block">Indirect Taxes</span>
                <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                  Taxes charged on consumption, manufacturing, and trade of goods and services (GST, Customs, Union Excise). Shifted onto the final consumer in retail prices.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <span className="font-bold text-[#1A3D2F] block">Non-Tax Revenue</span>
                <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                  Earnings realized from services provided by the Union: RBI surplus transfers (₹2.11L Cr), CPSE dividends, spectrum usage charges, and administrative user fees.
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
                <span className="font-bold text-amber-900 block">Borrowings (Financing)</span>
                <p className="mt-1 text-[11px] text-amber-800 leading-relaxed">
                  Market debt borrowed via government bonds and treasury bills to finance the fiscal deficit gap. This creates future interest repayment obligations; it is not tax revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Storytelling: Capital Spending Trend Chart */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Historical Public Investment Trajectory
            </span>
            <p className="text-xs text-slate-600">
              Distinguishing direct central capital outlays from grants-in-aid for state asset creation.
            </p>
          </div>

          {/* Toggle View: Direct Capex vs Effective Capex */}
          <div className="inline-flex rounded-lg border border-[#E5E0D8] bg-[#F5F2EB] p-1 text-xs font-semibold">
            <button
              onClick={() => setCapexView('direct')}
              className={`rounded-md px-3 py-1.5 transition cursor-pointer ${
                capexView === 'direct'
                  ? 'bg-white text-[#181A19] shadow-xs font-bold'
                  : 'text-[#5C645E] hover:text-[#181A19]'
              }`}
            >
              Direct Capital Expenditure
            </button>
            <button
              onClick={() => setCapexView('effective')}
              className={`rounded-md px-3 py-1.5 transition cursor-pointer ${
                capexView === 'effective'
                  ? 'bg-white text-[#181A19] shadow-xs font-bold'
                  : 'text-[#5C645E] hover:text-[#181A19]'
              }`}
            >
              Direct vs Effective Capex (incl. Grants-in-Aid)
            </button>
          </div>
        </div>

        {capexView === 'direct' ? (
          <AccessibleChart
            title="Union Capital Outlay (Direct Physical Asset Creation) Trend: FY 2014-15 to FY 2025-26"
            unit="₹ Lakh Crore"
            referencePeriod="FY 2014-15 to FY 2025-26 (BE)"
            takeaway="Central Capital Expenditure (expressways, freight corridors, railway modernization, defense hardware, port infrastructure) grew nearly 6-fold from ₹1.96 Lakh Crore (11.8% of total budget) in FY 2014-15 to ₹10.18 Lakh Crore (RE) in FY 2024-25 and ₹11.21 Lakh Crore (BE) in FY 2025-26. Note: FY 2024-25 was originally budgeted at ₹11.11 Lakh Crore (BE) and revised mid-year to ₹10.18 Lakh Crore (RE); FY 2025-26 BE stands at ₹11.21 Lakh Crore."
            sourceName="Union Budget Trends in Expenditure (Statement 4) & CGA Audited Finance Accounts"
            sourceUrl="https://www.indiabudget.gov.in/"
            limitations="Figures from FY 2014-15 to FY 2023-24 represent audited actuals confirmed by Controller General of Accounts (CGA). FY 2024-25 figures represent Revised Estimates (RE) alongside original BE (₹11.11L Cr). FY 2025-26 represents parliamentary Budget Estimates (BE). Effective Capex including grants to states is presented separately."
            data={DIRECT_CAPEX_TREND_DATA}
          />
        ) : (
          <AccessibleChart
            title="Direct Capital Outlay vs Effective Capital Expenditure (Including Grants-in-Aid to States)"
            unit="₹ Lakh Crore"
            referencePeriod="FY 2014-15 to FY 2025-26"
            takeaway="Effective Capital Expenditure includes direct central capital spending plus Grants-in-Aid provided to State Governments specifically earmarked for creating durable physical assets (such as PMGSY rural roads and irrigation). In FY 2024-25, Effective Capex BE reached ₹15.02 Lakh Crore (4.6% of GDP) vs direct Capex of ₹11.11 Lakh Crore. In FY 2025-26, Effective Capex BE is ₹15.48 Lakh Crore (4.3% of GDP) vs direct Capex of ₹11.21 Lakh Crore."
            sourceName="Union Budget at a Glance (Statement 1) & Budget Highlights, Ministry of Finance"
            sourceUrl="https://www.indiabudget.gov.in/"
            limitations="Under constitutional accounting standards, Grants-in-Aid transferred to states are accounted under the Revenue Account because asset ownership vests with the state, not the Union. The Ministry of Finance reports 'Effective Capital Expenditure' as an analytical consolidation of total national public investment."
            data={EFFECTIVE_CAPEX_TREND_DATA}
          />
        )}
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
            A transparent walkthrough of public finance: from tax collection to parliamentary approval, mid-year recalibration, cash accounting, and independent constitutional audit.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#181A19] text-xs font-bold text-white mb-2">1</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Revenue Inflow</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Taxes (direct and indirect), non-tax earnings (like RBI surplus dividends and CPSE profits), and capital receipts flow into the Consolidated Fund of India (Article 266).
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white mb-2">2</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Budget Estimates (BE)</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Original government budget projections approved by Parliament in the annual Appropriation Act. An approved BE is a statutory spending authorization ceiling, not money actually spent.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#181A19] text-xs font-bold text-white mb-2">3</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Revised Estimates (RE)</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Updated projections reflecting mid-year adjustments, ground execution pace, and supplementary grants. RE is a revised operational projection presented to Parliament, not an audited result.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white mb-2">4</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Actual Accounts</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Recorded cash receipts and disbursements documented by ministries through the Controller General of Accounts (CGA) and the Public Financial Management System (PFMS).
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B45309] text-xs font-bold text-white mb-2">5</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">CAG Constitutional Audit</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Independent constitutional audit under Article 151 examining legal regularity, financial propriety, and project delays. An audit evaluates compliance and identifies systemic flaws; it does not automatically certify that every scheme fulfilled its intended social outcome.
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
                <p className="text-[11px] font-medium text-slate-500">Documented Records</p>
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
            <div className="relative md:col-span-3">
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

            {/* Financial Year Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedFY}
                onChange={(e) => setSelectedFY(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700 focus:border-slate-400 focus:bg-white focus:outline-hidden"
              >
                <option value="all">All Financial Years</option>
                <option value="2024-25">FY 2024-25</option>
                <option value="2023-24">FY 2023-24</option>
                <option value="2025-26">FY 2025-26</option>
                <option value="2022-23">FY 2022-23</option>
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
            <div className="md:col-span-2">
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
                        {/* Record Verification Badge */}
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

                    {/* Specific Details & Compact BE vs RE vs Actual Variance Table */}
                    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
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
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} strokeWidth={1.5} /> Constitutional Accountability & Public Audit
              </span>
              <h3 className="mt-3 text-xl font-extrabold sm:text-2xl font-serif">
                How Can You Audit Public Expenditure in Your Area?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                Every citizen has the legal right to inspect expenditure records of gram panchayats,
                municipal bodies, and public schemes under the Right to Information (RTI) Act 2005.
                Public finance tracking requires understanding where data is documented, what audits examine,
                and how to verify whether approved budgets reached actual physical implementation.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2.5 sm:flex-row">
              <a
                href="https://egramswaraj.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
              >
                <span>e-GramSwaraj Portal</span>
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
              <a
                href="https://pfms.nic.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-white/20"
              >
                <span>PFMS Disbursements</span>
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
              <a
                href="https://cag.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-950/40 px-3.5 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900/60"
              >
                <span>CAG Audit Reports</span>
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Structured Civic Audit Framework Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <FileText size={15} strokeWidth={1.5} />
                <span>1. How Spending Is Documented</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                All Union ministries and Centrally Sponsored Schemes route disbursements through the <strong>Public Financial Management System (PFMS)</strong> and Single Nodal Agency (SNA) accounts. Every rupee is assigned a multi-digit budget classification head (Major, Minor, and Object Head) under the Controller General of Accounts (CGA).
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Search size={15} strokeWidth={1.5} />
                <span>2. Where Spending Data Lives</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                • <strong>Gram Panchayats:</strong> e-GramSwaraj shows approved Gram Panchayat Development Plans (GPDP), vendor payments, and geotagged works.<br />
                • <strong>Direct Benefit Transfers:</strong> PFMS portal tracks individual DBT payments.<br />
                • <strong>National Accounts:</strong> Monthly receipts and expenditure summaries are published by CGA at <em>cga.nic.in</em>.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={15} strokeWidth={1.5} />
                <span>3. What CAG Audits Reveal</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                The CAG performs constitutional audits under Article 151 covering compliance, financial accuracy, and scheme performance. Audits reveal cost overruns, idle assets, diversions, or procedural lapses. <em>A CAG audit tests systemic compliance; it does not verify every single transaction across India.</em>
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <PieChart size={15} strokeWidth={1.5} />
                <span>4. Comparing Allocations vs Actuals</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Citizens can cross-reference the <strong>Demands for Grants</strong> (approved BE limit) with <strong>Appropriation Accounts</strong> (actual audited spending tabled two years later). This comparison reveals whether a department under-utilized funds or surrendered budgeted allocations at fiscal year-end.
              </p>
            </div>

            <div className="rounded-xl border border-amber-400/20 bg-amber-950/20 p-4 sm:col-span-2">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Info size={15} strokeWidth={1.5} />
                <span>5. Transparency Boundaries: What Is Not Publicly Available</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-amber-100/90">
                While governance transparency in India is statutory, not every financial transaction is directly searchable in real time by the general public. Under <strong>Section 8 of the RTI Act 2005</strong>, information affecting national sovereignty, military operations, strategic defense procurements, intelligence budgets, and confidential personal banking details are legally exempt from public disclosure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
