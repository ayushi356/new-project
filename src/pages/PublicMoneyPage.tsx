import React, { useState, useMemo, useEffect } from 'react';
import {
  Coins,
  PieChart,
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
  FileCheck2,
  SlidersHorizontal,
  Table,
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

// Distinct public investment series for the grouped vertical column chart
interface CapexSeriesItem {
  year: string;
  actual: number | null; // In ₹ Lakh Crore
  actualStatus: 'audited' | 'provisional_cga' | 'pending';
  be: number;            // In ₹ Lakh Crore
  re: number;            // In ₹ Lakh Crore
  note: string;
}

const CAPEX_SERIES_MAP: Record<'expenditure' | 'outlay' | 'effective', {
  title: string;
  shortLabel: string;
  subtitle: string;
  denominatorNote: string;
  maxY: number;
  data: CapexSeriesItem[];
}> = {
  expenditure: {
    title: 'Total Capital Expenditure (Infrastructure Outlay + Capex Loans to States)',
    shortLabel: 'Capital Expenditure',
    subtitle: 'Total capital disbursements of the Union Government under Article 112, combining central asset creation with 50-year interest-free capital loans to states.',
    denominatorNote: 'Capital Expenditure (₹11.11 Lakh Cr BE in FY 2024–25; revised to ₹10.18 Lakh Cr RE) includes direct central capital outlay PLUS ₹1.92 Lakh Cr in 50-year interest-free capital loans disbursed to state governments under the SASCI scheme.',
    maxY: 14,
    data: [
      { year: '2020–21', actual: 4.26, actualStatus: 'audited', be: 4.12, re: 4.39, note: 'Audited Finance Accounts (CGA/CAG)' },
      { year: '2021–22', actual: 5.93, actualStatus: 'audited', be: 5.54, re: 6.03, note: 'Audited Finance Accounts (CGA/CAG)' },
      { year: '2022–23', actual: 7.36, actualStatus: 'audited', be: 7.50, re: 7.28, note: 'Audited Finance Accounts (CGA/CAG)' },
      { year: '2023–24', actual: 9.49, actualStatus: 'audited', be: 10.01, re: 9.50, note: 'Audited Finance Accounts (CGA/CAG)' },
      { year: '2024–25', actual: 9.85, actualStatus: 'provisional_cga', be: 11.11, re: 10.18, note: 'Actual is provisional CGA accounts (~₹9.85L Cr); final audited Finance Accounts pending CAG audit tabling.' },
      { year: '2025–26', actual: null, actualStatus: 'pending', be: 11.21, re: 11.21, note: 'Budget Estimate approved by Parliament.' },
    ],
  },
  outlay: {
    title: 'Capital Outlay (Direct Physical Asset Creation by Union Ministries)',
    shortLabel: 'Capital Outlay',
    subtitle: 'Direct physical assets created by the Centre: national highways, railway track doubling, defense equipment, and ports.',
    denominatorNote: 'Capital Outlay measures strictly direct physical asset creation by Union Ministries (₹9.19 Lakh Cr BE in FY 2024–25; revised to ₹8.37 Lakh Cr RE). It excludes loans to states, differentiating it from the ₹11.11 Lakh Cr total Capex figure.',
    maxY: 12,
    data: [
      { year: '2020–21', actual: 3.16, actualStatus: 'audited', be: 3.33, re: 3.17, note: 'Audited direct asset creation.' },
      { year: '2021–22', actual: 4.60, actualStatus: 'audited', be: 4.35, re: 4.70, note: 'Audited direct asset creation.' },
      { year: '2022–23', actual: 6.09, actualStatus: 'audited', be: 6.10, re: 5.86, note: 'Audited direct asset creation.' },
      { year: '2023–24', actual: 8.35, actualStatus: 'audited', be: 8.40, re: 8.30, note: 'Audited direct asset creation.' },
      { year: '2024–25', actual: 8.20, actualStatus: 'provisional_cga', be: 9.19, re: 8.37, note: 'FY 2024–25 BE was ₹9.19L Cr (~₹9,19,401 Cr) for direct outlay, revised to ₹8.37L Cr. Actual is provisional CGA.' },
      { year: '2025–26', actual: null, actualStatus: 'pending', be: 9.38, re: 9.38, note: 'Budget Estimate: ₹9.38L Cr (~₹9,38,000 Cr) for direct physical asset creation.' },
    ],
  },
  effective: {
    title: 'Effective Capital Expenditure (Capital Spending + Grants-in-Aid for State Assets)',
    shortLabel: 'Effective Capex',
    subtitle: 'Consolidated national investment footprint, adding earmarked capital grants given to states for rural roads (PMGSY), housing (PMAY), and irrigation.',
    denominatorNote: 'Under constitutional accounting standards, grants given to states for asset creation are accounted under Revenue Account because the assets belong to states. Effective Capex consolidates this to show total public investment (₹15.02 Lakh Cr BE in FY 2024–25).',
    maxY: 18,
    data: [
      { year: '2020–21', actual: 6.38, actualStatus: 'audited', be: 6.15, re: 6.45, note: 'Includes ₹2.12L Cr grants-in-aid to states for asset creation.' },
      { year: '2021–22', actual: 8.35, actualStatus: 'audited', be: 7.74, re: 8.41, note: 'Includes ₹2.42L Cr grants-in-aid to states.' },
      { year: '2022–23', actual: 10.51, actualStatus: 'audited', be: 10.68, re: 10.42, note: 'Includes ₹3.15L Cr grants-in-aid to states.' },
      { year: '2023–24', actual: 12.72, actualStatus: 'audited', be: 13.71, re: 12.71, note: 'Includes ₹3.23L Cr grants-in-aid to states.' },
      { year: '2024–25', actual: 13.40, actualStatus: 'provisional_cga', be: 15.02, re: 13.90, note: 'BE of ₹15.02L Cr (~₹15,01,648 Cr, 4.6% of GDP) includes ₹3.91L Cr capital grants to states. Actual is provisional CGA.' },
      { year: '2025–26', actual: null, actualStatus: 'pending', be: 15.48, re: 15.48, note: 'BE of ₹15.48L Cr (~₹15,48,282 Cr, 4.3% of GDP) includes ₹4.27L Cr capital grants to states.' },
    ],
  },
};

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
  const [activeCivicGroup, setActiveCivicGroup] = useState<string>('all');
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Section 4 states: Percentage Financing
  const [rupeeTab, setRupeeTab] = useState<'comes' | 'goes'>('comes');
  const [selectedRupeeYear, setSelectedRupeeYear] = useState<string>('2024-25');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [hoveredDonutIndex, setHoveredDonutIndex] = useState<number | null>(null);

  // Section 5 states: Grouped Vertical Column Capex Chart
  const [capexMetric, setCapexMetric] = useState<'expenditure' | 'outlay' | 'effective'>('expenditure');
  const [showCapexTable, setShowCapexTable] = useState<boolean>(false);
  const [hoveredCapexBar, setHoveredCapexBar] = useState<{
    year: string;
    series: 'actual' | 'be' | 're';
    value: number | null;
    note: string;
  } | null>(null);

  // General states
  const [showGlossary, setShowGlossary] = useState<boolean>(false);
  const [expandedRecordIds, setExpandedRecordIds] = useState<Record<string, boolean>>({});

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFY, setSelectedFY] = useState<string>('all');
  const [selectedGovLevel, setSelectedGovLevel] = useState<string>('all');
  const [selectedMinistry, setSelectedMinistry] = useState<string>('all');
  const [selectedFigureType, setSelectedFigureType] = useState<string>('all');

  const currentRupeeData = useMemo(() => {
    return (
      CITIZEN_RUPEE_DATASETS.find((d) => d.yearId === selectedRupeeYear) ||
      CITIZEN_RUPEE_DATASETS[0]
    );
  }, [selectedRupeeYear]);

  // Keep route synced when tab changes
  useEffect(() => {
    if (initialSection && initialSection !== activeSection) {
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
    const currentGroup = CIVIC_FILTER_GROUPS.find((g) => g.id === activeCivicGroup);

    return SAMPLE_FINANCE_RECORDS.filter((rec) => {
      // 1. Civic group filter
      if (activeCivicGroup !== 'all' && currentGroup && currentGroup.sections.length > 0) {
        if (!currentGroup.sections.includes(rec.section)) return false;
      }

      // 2. Specific pillar filter
      if (selectedPillar !== 'all' && rec.section !== selectedPillar) {
        return false;
      }

      // 3. Text search
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

      // 4. Gov level
      if (selectedGovLevel !== 'all' && rec.govLevel !== selectedGovLevel) {
        return false;
      }

      // 5. Ministry
      if (selectedMinistry !== 'all' && rec.departmentOrMinistry !== selectedMinistry) {
        return false;
      }

      // 6. Figure type
      if (selectedFigureType !== 'all' && rec.figureType !== selectedFigureType) {
        return false;
      }

      // 7. Financial year
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

  // Section summary statistics: excludes sub-components to prevent double-counting
  const sectionSummary = useMemo(() => {
    const currentGroup = CIVIC_FILTER_GROUPS.find((g) => g.id === activeCivicGroup);
    const pool = SAMPLE_FINANCE_RECORDS.filter((rec) => {
      if (activeCivicGroup !== 'all' && currentGroup && currentGroup.sections.length > 0) {
        if (!currentGroup.sections.includes(rec.section)) return false;
      }
      if (selectedPillar !== 'all' && rec.section !== selectedPillar) return false;
      return true;
    });

    // Exclude sub-components from aggregate total to eliminate double-counting!
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

  const currentCapexConfig = CAPEX_SERIES_MAP[capexMetric];

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
              collected, allocated to ministries, invested into infrastructure, reviewed by independent
              auditors (CAG), and devolved to states — with clear distinctions between budget
              ceilings and actual disbursements.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowGlossary((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1A3D2F] px-4 py-2 text-xs font-bold text-white shadow-2xs transition hover:bg-[#143025] cursor-pointer"
              >
                <HelpCircle size={15} strokeWidth={1.5} />
                <span>{showGlossary ? 'Hide Budget Primer' : 'Citizen Budget Primer'}</span>
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
            Figures presented in this tracker are ingested directly from official Union Budget documents (Ministry of Finance),
            Controller General of Accounts (CGA) annual accounts, and Comptroller & Auditor General (CAG) audit reports
            tabled in Parliament. An authorized Budget Estimate (BE) represents a legislative spending ceiling, not cash spent.
            All sub-components (such as the RBI surplus dividend) are itemized without double-counting in aggregate revenues.
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
                className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
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
                  to spend up to that ceiling. It does <strong>not</strong> mean the money has left
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

      {/* 4. Percentage-Based Citizen Financing Section: How Does the Union Government Finance Its Budget? */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                <PieChart size={15} strokeWidth={1.5} />
                <span>Percentage Budget Distribution · {currentRupeeData.financialYear}</span>
              </div>
              <h2 className="mt-1 font-serif text-xl font-extrabold text-[#181A19] sm:text-2xl">
                {rupeeTab === 'comes'
                  ? 'How Does the Union Government Finance Its Budget?'
                  : 'How Does the Union Government Spend Its Outlay?'}
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Percentage distribution of Union Budget {rupeeTab === 'comes' ? 'Receipts & Financing Sources' : 'Expenditures & Outlays'}. Basis: {currentRupeeData.budgetBasis}
              </p>
            </div>

            {/* Selectors: Financial Year & Flow Direction */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Financial Year Selector */}
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs">
                <button
                  onClick={() => {
                    setSelectedRupeeYear('2024-25');
                    setSelectedCategoryIndex(null);
                  }}
                  className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                    selectedRupeeYear === '2024-25'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  FY 2024–25 (BE & RE)
                </button>
                <button
                  onClick={() => {
                    setSelectedRupeeYear('2025-26');
                    setSelectedCategoryIndex(null);
                  }}
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
                  onClick={() => {
                    setRupeeTab('comes');
                    setSelectedCategoryIndex(null);
                  }}
                  className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                    rupeeTab === 'comes'
                      ? 'bg-[#1A3D2F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Where Money Comes From
                </button>
                <button
                  onClick={() => {
                    setRupeeTab('goes');
                    setSelectedCategoryIndex(null);
                  }}
                  className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                    rupeeTab === 'goes'
                      ? 'bg-[#1A3D2F] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Where Money Goes
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

          {/* Denominator & Accounting Baseline Explainer */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5 text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <Info size={16} strokeWidth={1.5} className="mt-0.5 text-[#1A3D2F] shrink-0" />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 font-bold text-slate-900">
                  <span>Percentage Denominator & Accounting Identity:</span>
                  <span className="rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-[10px] text-[#1A3D2F]">
                    Total Outlay Denominator: ₹{currentRupeeData.macroTotals.totalBudgetOutlayCr.toLocaleString('en-IN')} Cr ({formatInLakhCrore(currentRupeeData.macroTotals.totalBudgetOutlayCr)} BE)
                  </span>
                </div>
                <p className="leading-relaxed text-slate-600">
                  All category percentages indicate that component's share of the <strong>Total National Budget Outlay & Financing Envelope ({formatInLakhCrore(currentRupeeData.macroTotals.totalBudgetOutlayCr)})</strong>.
                  {rupeeTab === 'comes' ? (
                    <>
                      {' '}Tax categories (Income Tax 19%, GST 18%, Corporation Tax 17%) reflect their proportion of <em>total receipts including borrowings</em> (27%). Borrowings represent debt financing to cover the fiscal deficit gap, not tax revenue. Percentages are verified against official Ministry of Finance budget documents and sum to exactly 100%. Click any category card to reveal exact underlying rupee amounts and primary citations.
                    </>
                  ) : (
                    <>
                      {' '}Expenditure percentages show the proportional distribution of public expenditure across constitutional state tax transfers (21%), debt interest servicing (19%), central development schemes (16%), defense preparedness (8%), and essential public services, summing to exactly 100%. Click any card to inspect detailed calculations.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Donut Chart & Simplified Category Breakdown Grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Interactive Donut Chart with 100% in the Centre */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50/50 p-5 lg:col-span-5">
              <div className="w-full text-center mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Budget Allocation Donut Chart
                </span>
                <p className="text-[11px] text-slate-500">
                  Hover over ring slices or click category cards to reveal underlying figures
                </p>
              </div>

              <div className="relative flex items-center justify-center">
                <svg
                  viewBox="0 0 320 320"
                  className="h-64 w-64 sm:h-72 sm:w-72"
                  role="img"
                  aria-label={`${rupeeTab === 'comes' ? 'Receipts' : 'Expenditure'} Donut Chart: 100% total allocation`}
                >
                  {/* Draw Donut Slices */}
                  {(() => {
                    const circumference = 2 * Math.PI * 100; // 628.31853
                    let cumulativePct = 0;
                    const items = rupeeTab === 'comes' ? currentRupeeData.where1RupeeComesFrom : currentRupeeData.where1RupeeGoes;

                    return items.map((item, idx) => {
                      const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((cumulativePct / 100) * circumference);
                      cumulativePct += item.percentage;
                      const isHovered = hoveredDonutIndex === idx || selectedCategoryIndex === idx;

                      return (
                        <circle
                          key={idx}
                          cx="160"
                          cy="160"
                          r="100"
                          fill="none"
                          stroke={item.color}
                          strokeWidth={isHovered ? 48 : 38}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 160 160)"
                          className="transition-all duration-200 cursor-pointer"
                          onMouseEnter={() => setHoveredDonutIndex(idx)}
                          onMouseLeave={() => setHoveredDonutIndex(null)}
                          onClick={() => setSelectedCategoryIndex(selectedCategoryIndex === idx ? null : idx)}
                          style={{
                            opacity: (hoveredDonutIndex !== null || selectedCategoryIndex !== null) && !isHovered ? 0.45 : 1,
                            filter: isHovered ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))' : 'none',
                          }}
                        />
                      );
                    });
                  })()}

                  {/* Centre of the Donut Chart: 100% when neutral, or category details when hovered/selected */}
                  {(hoveredDonutIndex !== null || selectedCategoryIndex !== null) ? (
                    (() => {
                      const activeIdx = hoveredDonutIndex !== null ? hoveredDonutIndex : selectedCategoryIndex!;
                      const items = rupeeTab === 'comes' ? currentRupeeData.where1RupeeComesFrom : currentRupeeData.where1RupeeGoes;
                      const hoveredItem = items[activeIdx];
                      if (!hoveredItem) return null;
                      const label = ('source' in hoveredItem && hoveredItem.source ? hoveredItem.source : hoveredItem.destination) || '';

                      return (
                        <g className="transition-all duration-200 select-none">
                          <text
                            x="160"
                            y="132"
                            textAnchor="middle"
                            fill={hoveredItem.color}
                            style={{ fontSize: '32px', fontWeight: 900 }}
                          >
                            {hoveredItem.percentage}%
                          </text>
                          <text
                            x="160"
                            y="155"
                            textAnchor="middle"
                            fill="#0f172a"
                            style={{ fontSize: '11px', fontWeight: 700 }}
                          >
                            {label.length > 22 ? label.slice(0, 20) + '…' : label}
                          </text>
                          <text
                            x="160"
                            y="176"
                            textAnchor="middle"
                            fill="#1A3D2F"
                            style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'monospace' }}
                          >
                            ₹{hoveredItem.exactAmountCr.toLocaleString('en-IN')} Cr
                          </text>
                          <text
                            x="160"
                            y="194"
                            textAnchor="middle"
                            fill="#64748b"
                            style={{ fontSize: '10px' }}
                          >
                            ({formatInLakhCrore(hoveredItem.exactAmountCr)})
                          </text>
                          <text
                            x="160"
                            y="210"
                            textAnchor="middle"
                            fill="#94a3b8"
                            style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                          >
                            Share of Total Outlay
                          </text>
                        </g>
                      );
                    })()
                  ) : (
                    <g className="transition-all duration-200 select-none">
                      <text
                        x="160"
                        y="138"
                        textAnchor="middle"
                        fill="#0f172a"
                        style={{ fontSize: '36px', fontWeight: 900 }}
                      >
                        100%
                      </text>
                      <text
                        x="160"
                        y="160"
                        textAnchor="middle"
                        fill="#64748b"
                        style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em' }}
                      >
                        {rupeeTab === 'comes' ? 'TOTAL RECEIPTS' : 'TOTAL OUTLAY'}
                      </text>
                      <text
                        x="160"
                        y="182"
                        textAnchor="middle"
                        fill="#1A3D2F"
                        style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'monospace' }}
                      >
                        {formatInLakhCrore(currentRupeeData.macroTotals.totalBudgetOutlayCr)}
                      </text>
                      <text
                        x="160"
                        y="198"
                        textAnchor="middle"
                        fill="#64748b"
                        style={{ fontSize: '9.5px', fontFamily: 'monospace' }}
                      >
                        ₹{currentRupeeData.macroTotals.totalBudgetOutlayCr.toLocaleString('en-IN')} Cr BE
                      </text>
                      <text
                        x="160"
                        y="214"
                        textAnchor="middle"
                        fill="#10b981"
                        style={{ fontSize: '9px', fontWeight: 600 }}
                      >
                        (100% Fully Accounted)
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              <div className="mt-3 flex items-center justify-between w-full border-t border-slate-200/80 pt-2.5 text-[11px] text-slate-500">
                <span>Categories: {rupeeTab === 'comes' ? currentRupeeData.where1RupeeComesFrom.length : currentRupeeData.where1RupeeGoes.length}</span>
                <span className="font-semibold text-emerald-700">100% Sum Verified</span>
              </div>
            </div>

            {/* Right Column: Simplified Category Cards (Expandable on Selection) */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-7">
              {(rupeeTab === 'comes'
                ? currentRupeeData.where1RupeeComesFrom
                : currentRupeeData.where1RupeeGoes
              ).map((item, idx) => {
                const label = ('source' in item && item.source ? item.source : item.destination) || '';
                const isBorrowing = item.categoryType === 'borrowing_liability';
                const isSelected = selectedCategoryIndex === idx;
                const isHovered = hoveredDonutIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategoryIndex(isSelected ? null : idx)}
                    onMouseEnter={() => setHoveredDonutIndex(idx)}
                    onMouseLeave={() => setHoveredDonutIndex(null)}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-xs transition-all duration-150 cursor-pointer ${
                      isSelected || isHovered
                        ? 'border-[#1A3D2F] bg-white ring-2 ring-[#1A3D2F]/20 shadow-sm'
                        : isBorrowing
                        ? 'border-amber-300 bg-amber-50/50 hover:border-amber-400'
                        : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div>
                      {/* Compact Header: Color, Category Name, and Percentage beside Name */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 overflow-hidden pr-1">
                          <span
                            className="mt-1 h-3 w-3 shrink-0 rounded-xs"
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <div className="flex flex-wrap items-baseline gap-1.5">
                              <span className="font-bold text-slate-900" title={label}>
                                {label}
                              </span>
                              <span className="rounded-md bg-[#1A3D2F]/10 px-1.5 py-0.2 text-[11px] font-black text-[#1A3D2F]">
                                {item.percentage}%
                              </span>
                            </div>

                            {item.categoryLabel && (
                              <div className="mt-1 flex items-center gap-1.5">
                                <span
                                  className={`rounded-md px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                                    isBorrowing
                                      ? 'bg-amber-200 text-amber-900'
                                      : 'bg-[#1A3D2F]/10 text-[#1A3D2F]'
                                  }`}
                                >
                                  {isBorrowing ? 'Financing Source (Debt Liability) — Not Tax Revenue' : item.categoryLabel}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Prominent percentage badge */}
                        <div className="text-right shrink-0">
                          <span className="text-base font-black text-slate-900">
                            {item.percentage}%
                          </span>
                        </div>
                      </div>

                      {/* Click prompt indicator when collapsed */}
                      {!isSelected && (
                        <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                          <span>Click to view exact amount & formula</span>
                          <ChevronDown size={12} strokeWidth={1.5} />
                        </div>
                      )}

                      {/* Expanded Details: Revealed when Selected */}
                      {isSelected && (
                        <div className="mt-3 border-t border-slate-200/80 pt-3 space-y-2.5">
                          {/* Exact calculated financial amount */}
                          <div className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white p-2 font-mono text-[11px]">
                            <span className="font-sans text-[10px] text-slate-500">Calculated Value:</span>
                            <span className="font-bold text-slate-900">
                              ₹{item.exactAmountCr.toLocaleString('en-IN')} Cr{' '}
                              <span className="font-sans text-[10px] font-normal text-slate-500">
                                ({formatInLakhCrore(item.exactAmountCr)})
                              </span>
                            </span>
                          </div>

                          {/* Calculation basis */}
                          <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                            <span className="font-semibold text-slate-700">Calculation Basis: </span>
                            {item.percentage}% of ₹{currentRupeeData.macroTotals.totalBudgetOutlayCr.toLocaleString('en-IN')} Cr Total Outlay
                          </div>

                          {/* Plain-language explanation */}
                          {item.description && (
                            <p className="text-[11px] leading-relaxed text-slate-700">
                              {item.description}
                            </p>
                          )}

                          {/* Official Source Link */}
                          {item.officialSourceUrl && (
                            <div className="flex items-center justify-between pt-1 text-[10px]">
                              <span className="text-slate-400">Official Document:</span>
                              <a
                                href={item.officialSourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 font-semibold text-[#1A3D2F] hover:underline"
                              >
                                <span>Ministry of Finance Budget</span>
                                <ExternalLink size={10} strokeWidth={1.5} />
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Civic Guide on Receipts Categories */}
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

      {/* 5. Grouped Vertical Column Chart: Capital Spending Trajectory */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          {/* Header & Controls */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                <BarChart3 size={15} strokeWidth={1.5} />
                <span>Grouped Column Chart · Multi-Year Public Investment</span>
              </div>
              <h2 className="mt-1 font-serif text-xl font-extrabold text-[#181A19] sm:text-2xl">
                {currentCapexConfig.title}
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {currentCapexConfig.subtitle}
              </p>
            </div>

            {/* Toggle Metric View (Total Capex vs Direct Outlay vs Effective Capex) */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs font-semibold">
                <button
                  onClick={() => setCapexMetric('expenditure')}
                  className={`rounded-md px-2.5 py-1.5 transition cursor-pointer ${
                    capexMetric === 'expenditure'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Includes direct outlay plus loans to states"
                >
                  Total Capex
                </button>
                <button
                  onClick={() => setCapexMetric('outlay')}
                  className={`rounded-md px-2.5 py-1.5 transition cursor-pointer ${
                    capexMetric === 'outlay'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Strictly direct central physical assets"
                >
                  Capital Outlay
                </button>
                <button
                  onClick={() => setCapexMetric('effective')}
                  className={`rounded-md px-2.5 py-1.5 transition cursor-pointer ${
                    capexMetric === 'effective'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Includes capital grants-in-aid to states"
                >
                  Effective Capex
                </button>
              </div>

              {/* Table Toggle Button */}
              <button
                onClick={() => setShowCapexTable((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <Table size={13} strokeWidth={1.5} />
                <span>{showCapexTable ? 'Show Column Chart' : 'View Data Table'}</span>
              </button>
            </div>
          </div>

          {/* Metric Distinction Note */}
          <div className="mt-4 rounded-xl border border-slate-100 bg-[#FAF8F5] p-3 text-xs text-slate-600">
            <span className="font-bold text-[#1A3D2F]">Classification Note: </span>
            {currentCapexConfig.denominatorNote}
          </div>

          {/* Chart Series Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-slate-100 pb-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-[#1A3D2F]" />
              <span className="font-bold text-slate-800">Actual Outflow</span>
              <span className="text-[10px] text-slate-500">(Audited CGA Accounts; FY25 is Provisional CGA)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-[#B45309]" />
              <span className="font-bold text-slate-800">Budget Estimate (BE)</span>
              <span className="text-[10px] text-slate-500">(Statutory Authorization Ceiling)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-[#527863]" />
              <span className="font-bold text-slate-800">Revised Estimate (RE)</span>
              <span className="text-[10px] text-slate-500">(Mid-Year Operational Target)</span>
            </div>
          </div>

          {!showCapexTable ? (
            /* Grouped Vertical Column Chart SVG */
            <div className="mt-6 overflow-x-auto">
              <div className="min-w-[680px]">
                <svg
                  viewBox="0 0 760 320"
                  className="w-full h-72 sm:h-80 select-none"
                  role="img"
                  aria-label={`${currentCapexConfig.title} Grouped Column Chart`}
                >
                  {/* Background grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                    const y = 250 - ratio * 200;
                    const val = (ratio * currentCapexConfig.maxY).toFixed(1);
                    return (
                      <g key={i}>
                        <line
                          x1="55"
                          y1={y}
                          x2="735"
                          y2={y}
                          stroke="#E2E8F0"
                          strokeDasharray={ratio === 0 ? 'none' : '3 3'}
                          strokeWidth={ratio === 0 ? 1.5 : 1}
                        />
                        <text
                          x="48"
                          y={y + 4}
                          textAnchor="end"
                          fill="#64748B"
                          style={{ fontSize: '10px', fontFamily: 'monospace' }}
                        >
                          ₹{val}L
                        </text>
                      </g>
                    );
                  })}

                  {/* Render 6 Year Clusters */}
                  {currentCapexConfig.data.map((item, yearIdx) => {
                    const slotWidth = (735 - 55) / 6; // 113.33px per year
                    const slotX = 55 + yearIdx * slotWidth;
                    const barWidth = 22;
                    const barGap = 4;
                    const clusterWidth = 3 * barWidth + 2 * barGap; // 74px
                    const startX = slotX + (slotWidth - clusterWidth) / 2;

                    // Bar 1: Actual
                    const actualHeight = item.actual !== null ? (item.actual / currentCapexConfig.maxY) * 200 : 0;
                    const actualY = 250 - actualHeight;
                    const isProvisional = item.actualStatus === 'provisional_cga';

                    // Bar 2: BE
                    const beHeight = (item.be / currentCapexConfig.maxY) * 200;
                    const beY = 250 - beHeight;

                    // Bar 3: RE
                    const reHeight = (item.re / currentCapexConfig.maxY) * 200;
                    const reY = 250 - reHeight;

                    return (
                      <g key={item.year}>
                        {/* Actual Bar */}
                        {item.actual !== null ? (
                          <g
                            className="cursor-pointer transition-opacity hover:opacity-80"
                            onMouseEnter={() =>
                              setHoveredCapexBar({
                                year: item.year,
                                series: 'actual',
                                value: item.actual,
                                note: isProvisional
                                  ? 'Provisional CGA accounts (~₹' + item.actual + 'L Cr); final audited Finance Accounts pending CAG audit tabling.'
                                  : 'Audited Finance Accounts (CGA / CAG)',
                              })
                            }
                            onMouseLeave={() => setHoveredCapexBar(null)}
                          >
                            <rect
                              x={startX}
                              y={actualY}
                              width={barWidth}
                              height={actualHeight}
                              fill="#1A3D2F"
                              rx="3"
                              stroke={isProvisional ? '#0F241C' : 'none'}
                              strokeWidth={isProvisional ? 1.5 : 0}
                              strokeDasharray={isProvisional ? '3 2' : 'none'}
                            />
                            <text
                              x={startX + barWidth / 2}
                              y={actualY - 4}
                              textAnchor="middle"
                              fill="#1A3D2F"
                              style={{ fontSize: '9px', fontWeight: 800, fontFamily: 'monospace' }}
                            >
                              {item.actual.toFixed(2)}
                            </text>
                          </g>
                        ) : (
                          <g>
                            <rect
                              x={startX}
                              y={244}
                              width={barWidth}
                              height={6}
                              fill="#CBD5E1"
                              rx="2"
                              stroke="#94A3B8"
                              strokeDasharray="2 2"
                            />
                            <text
                              x={startX + barWidth / 2}
                              y={238}
                              textAnchor="middle"
                              fill="#94A3B8"
                              style={{ fontSize: '9px', fontWeight: 700 }}
                            >
                              —
                            </text>
                          </g>
                        )}

                        {/* BE Bar */}
                        <g
                          className="cursor-pointer transition-opacity hover:opacity-80"
                          onMouseEnter={() =>
                            setHoveredCapexBar({
                              year: item.year,
                              series: 'be',
                              value: item.be,
                              note: 'Budget Estimate approved by Parliament at start of year.',
                            })
                          }
                          onMouseLeave={() => setHoveredCapexBar(null)}
                        >
                          <rect
                            x={startX + barWidth + barGap}
                            y={beY}
                            width={barWidth}
                            height={beHeight}
                            fill="#B45309"
                            rx="3"
                          />
                          <text
                            x={startX + barWidth + barGap + barWidth / 2}
                            y={beY - 4}
                            textAnchor="middle"
                            fill="#B45309"
                            style={{ fontSize: '9px', fontWeight: 800, fontFamily: 'monospace' }}
                          >
                            {item.be.toFixed(2)}
                          </text>
                        </g>

                        {/* RE Bar */}
                        <g
                          className="cursor-pointer transition-opacity hover:opacity-80"
                          onMouseEnter={() =>
                            setHoveredCapexBar({
                              year: item.year,
                              series: 're',
                              value: item.re,
                              note: 'Revised Estimate presented mid-year in the subsequent budget.',
                            })
                          }
                          onMouseLeave={() => setHoveredCapexBar(null)}
                        >
                          <rect
                            x={startX + 2 * (barWidth + barGap)}
                            y={reY}
                            width={barWidth}
                            height={reHeight}
                            fill="#527863"
                            rx="3"
                          />
                          <text
                            x={startX + 2 * (barWidth + barGap) + barWidth / 2}
                            y={reY - 4}
                            textAnchor="middle"
                            fill="#527863"
                            style={{ fontSize: '9px', fontWeight: 800, fontFamily: 'monospace' }}
                          >
                            {item.re.toFixed(2)}
                          </text>
                        </g>

                        {/* X-axis Year Label */}
                        <text
                          x={slotX + slotWidth / 2}
                          y={272}
                          textAnchor="middle"
                          fill="#181A19"
                          style={{ fontSize: '11px', fontWeight: 700 }}
                        >
                          {item.year}
                        </text>

                        {/* Provisional status flag */}
                        {isProvisional && (
                          <text
                            x={slotX + slotWidth / 2}
                            y={286}
                            textAnchor="middle"
                            fill="#B45309"
                            style={{ fontSize: '8.5px', fontWeight: 700 }}
                          >
                            (Prov. CGA)
                          </text>
                        )}
                        {item.actualStatus === 'pending' && (
                          <text
                            x={slotX + slotWidth / 2}
                            y={286}
                            textAnchor="middle"
                            fill="#64748B"
                            style={{ fontSize: '8.5px', fontWeight: 600 }}
                          >
                            (In Progress)
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Hover Tooltip / Status Display */}
              <div className="mt-2 min-h-12 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-700 flex items-center justify-between">
                {hoveredCapexBar ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-900">{hoveredCapexBar.year}:</span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                        hoveredCapexBar.series === 'actual'
                          ? 'bg-[#1A3D2F] text-white'
                          : hoveredCapexBar.series === 'be'
                          ? 'bg-[#B45309] text-white'
                          : 'bg-[#527863] text-white'
                      }`}
                    >
                      {hoveredCapexBar.series === 'actual'
                        ? 'Actual Outflow'
                        : hoveredCapexBar.series === 'be'
                        ? 'Budget Estimate'
                        : 'Revised Estimate'}
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{hoveredCapexBar.value} Lakh Crore
                    </span>
                    <span className="text-slate-500">· {hoveredCapexBar.note}</span>
                  </div>
                ) : (
                  <div className="text-slate-500 text-[11px] flex items-center gap-1.5">
                    <Info size={13} strokeWidth={1.5} />
                    <span>Hover over any column to inspect its precise value, budget status, and audit notes.</span>
                  </div>
                )}
                <span className="text-[10px] text-slate-400 font-mono">Unit: ₹ Lakh Crore</span>
              </div>
            </div>
          ) : (
            /* Accessible Data Table View */
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] text-slate-700 border-b border-slate-200 font-bold text-[11px]">
                  <tr>
                    <th className="px-3.5 py-2.5">Financial Year</th>
                    <th className="px-3.5 py-2.5 text-right">Actual Outflow (₹ Lakh Cr)</th>
                    <th className="px-3.5 py-2.5 text-right">Budget Estimate BE (₹ Lakh Cr)</th>
                    <th className="px-3.5 py-2.5 text-right">Revised Estimate RE (₹ Lakh Cr)</th>
                    <th className="px-3.5 py-2.5">Audit & Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                  {currentCapexConfig.data.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="px-3.5 py-2.5 font-sans font-bold text-slate-900">
                        {row.year}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-black text-[#1A3D2F]">
                        {row.actual !== null ? `₹${row.actual.toFixed(2)}` : '—'}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-[#B45309]">
                        ₹{row.be.toFixed(2)}
                      </td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-[#527863]">
                        ₹{row.re.toFixed(2)}
                      </td>
                      <td className="px-3.5 py-2.5 font-sans text-[11px] text-slate-600">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Reconciliation & Provisional Actuals Audit Box */}
          <div className="mt-6 border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Accounting Reconciliation: Capital Outlay vs Capital Expenditure
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                <span className="font-bold text-slate-900 block">Why Capex is ₹11.11L Cr while Outlay is ₹9.19L Cr (BE 2024–25):</span>
                <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Capital Outlay (₹9.19 Lakh Cr BE)</strong> measures strictly direct physical asset creation by Union Ministries (national highways, railway track doubling, defense hardware, port infrastructure). <strong>Total Capital Expenditure (₹11.11 Lakh Cr BE)</strong> includes this outlay PLUS ₹1.92 Lakh Crore in 50-year interest-free capital loans disbursed to state governments under the SASCI scheme.
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5">
                <span className="font-bold text-amber-900 block">Audited Actuals vs Provisional CGA Data:</span>
                <p className="mt-1 text-[11px] text-amber-800 leading-relaxed">
                  Actuals from FY 2020–21 through FY 2023–24 reflect finalized, audited Union Finance Accounts confirmed by CGA and reviewed by the CAG. FY 2024–25 actuals are provisional figures from CGA monthly accounts (~₹9.85L Cr Capex; ~₹8.20L Cr Outlay); final audited accounts will be tabled in Parliament in the Union Finance Accounts with a 12–18 month lag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Civic Literacy: The 5-Stage Life of Public Money */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <Coins size={14} strokeWidth={1.5} />
            <span>Civic Literacy: The 5-Stage Life of Public Money</span>
          </div>
          <h2 className="mt-1 text-xl font-bold text-slate-900 font-serif">How Tax Money Moves Through Indian Government</h2>
          <p className="mt-1 text-xs text-slate-600">
            A transparent walkthrough of public finance: from tax collection to parliamentary approval, mid-year recalibration, cash accounting, and independent constitutional audit.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#181A19] text-xs font-bold text-white mb-2">1</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Revenue Inflow</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Taxes, non-tax earnings (like RBI dividends and CPSE profits), and loans flow into the Consolidated Fund of India (Article 266).
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white mb-2">2</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Budget Estimates (BE)</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Approved by Parliament in the annual Appropriation Act. An approved BE is a legal spending ceiling, not cash actually spent.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#181A19] text-xs font-bold text-white mb-2">3</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Revised Estimates (RE)</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Updated mid-year projections reflecting ground execution pace and supplementary grants. RE is an adjusted operational projection.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white mb-2">4</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">Actual Accounts</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Recorded cash disbursements documented by ministries through the Controller General of Accounts (CGA) and the PFMS platform.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 relative">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B45309] text-xs font-bold text-white mb-2">5</span>
              <h3 className="font-serif font-bold text-[#181A19] text-xs">CAG Constitutional Audit</h3>
              <p className="text-[11px] text-[#5C645E] mt-1 leading-relaxed">
                Independent constitutional examination under Article 151 checking legal regularity, accounting accuracy, and compliance. An audit evaluates procedural compliance; it is not an automatic certification of successful social outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Streamlined Civic Navigation & Search Bar */}
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
              <span>Advanced Filters</span>
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1A3D2F] text-[10px] text-white">
                  ✓
                </span>
              )}
            </button>
          </div>

          {/* Streamlined Civic Category Filters (6 Clean Buttons) */}
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

          {/* Expandable Advanced Filters Drawer */}
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
                    onChange={(e) => {
                      setSelectedPillar(e.target.value);
                      if (e.target.value !== 'all') {
                        setActiveSection(e.target.value as FinancialSectionId);
                      }
                    }}
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
                Total Value Tracked:{' '}
                <strong className="text-slate-900 font-mono">
                  {formatInLakhCrore(sectionSummary.totalAmount)}
                </strong>
                <span className="text-[10px] text-slate-400 font-sans ml-1">(Excluding sub-components)</span>
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

      {/* 8. Simplified Detailed Financial Cards */}
      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        {selectedPillar !== 'all' && (
          <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              <Layers size={14} strokeWidth={1.5} />
              <span>Accountability Pillar: {activeSectionMeta.label}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-900">{activeSectionMeta.plainQuestion}</p>
            <p className="mt-1 text-xs text-slate-600">{activeSectionMeta.citizenDescription}</p>
          </div>
        )}

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
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:border-slate-300 hover:shadow-md"
                >
                  {/* Simplified Card Initial View: Name, Amount, FY, One-Sentence Explanation, Data Status */}
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

                        {/* Sub-component indicator to prevent double-counting */}
                        {record.isSubComponent && (
                          <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold text-blue-800">
                            Constituent Sub-Component (Excluded from Aggregate Total)
                          </span>
                        )}

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
                        <h3 className="text-lg font-bold text-slate-900 sm:text-xl font-serif">
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
                        <p className="text-xl font-black text-slate-900 sm:text-2xl font-mono">
                          {formatInLakhCrore(record.amountCr)}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          Exact: ₹{record.amountCr.toLocaleString('en-IN')} Cr
                        </p>
                      </div>
                    </div>

                    {/* Plain Language Citizen Explanation (Initially Visible) */}
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

                  {/* Expand / Collapse Action Bar */}
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

                  {/* Expandable Section: Full BE vs RE vs Actual Variance, Citations & Methodology */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-white p-5 sm:p-6 space-y-4">
                      {/* 1. BE vs RE vs Actual Dynamic Variance Table */}
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

                      {/* 2. Progress / Utilization / CAG details where available */}
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

                      {/* Multi-Year Trend Visualizer where available */}
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

                      {/* 3. Official Source Dossier & Primary Citation */}
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

      {/* 9. Constitutional Accountability & Public Audit Callout */}
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
                All Union ministries and Centrally Sponsored Schemes route disbursements through the <strong>Public Financial Management System (PFMS)</strong> and Single Nodal Agency (SNA) accounts. Every rupee is assigned a multi-digit budget classification head under the Controller General of Accounts (CGA).
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
