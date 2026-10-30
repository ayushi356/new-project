import { useState, useMemo, useEffect } from 'react';
import {
  Coins,
  Receipt,
  PieChart,
  Search,
  ExternalLink,
  Building2,
  ShieldCheck,
  TrendingUp,
  Landmark,
  ArrowRight,
  BookOpen,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import {
  CITIZEN_RUPEE_DATASETS,
} from '@/data/publicFinanceData';
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
    title: 'Union Capital Expenditure Trajectory · ₹ Lakh Crore',
    shortLabel: 'Capital Expenditure',
    subtitle: 'Total capital disbursements under Article 112, combining central infrastructure creation with 50-year interest-free capital loans to states.',
    denominatorNote: 'Capital Expenditure (₹11.11 Lakh Cr BE in FY 2024–25; revised to ₹10.18 Lakh Cr RE) includes direct central capital outlay PLUS ₹1.92 Lakh Cr in 50-year interest-free capital loans disbursed to state governments under the SASCI scheme.',
    maxY: 15,
    data: [
      { year: '2020–21', actual: 4.26, actualStatus: 'audited', be: 4.12, re: 4.39, note: 'Audited Finance Accounts (CGA/CAG)' },
      { year: '2021–22', actual: 5.93, actualStatus: 'audited', be: 5.54, re: 6.03, note: 'Audited Finance Accounts (CGA/CAG)' },
      { year: '2022–23', actual: 7.36, actualStatus: 'audited', be: 7.50, re: 7.28, note: 'Audited Finance Accounts (CGA/CAG)' },
      { year: '2023–24', actual: 9.49, actualStatus: 'audited', be: 10.01, re: 9.50, note: 'Audited Finance Accounts (CGA/CAG)' },
      { year: '2024–25', actual: null, actualStatus: 'provisional_cga', be: 11.11, re: 10.18, note: 'Actuals pending CAG audit. Provisional CGA monthly accounts record ~₹9.85 Lakh Crore.' },
      { year: '2025–26', actual: null, actualStatus: 'pending', be: 11.21, re: 11.21, note: 'Budget Estimate approved by Parliament.' },
    ],
  },
  outlay: {
    title: 'Union Capital Outlay Trajectory · ₹ Lakh Crore',
    shortLabel: 'Capital Outlay',
    subtitle: 'Direct physical assets created by the Centre: national highways, railway track doubling, defense equipment, and ports.',
    denominatorNote: 'Capital Outlay measures strictly direct physical asset creation by Union Ministries (₹9.19 Lakh Cr BE in FY 2024–25; revised to ₹8.37 Lakh Cr RE). It excludes loans to states, differentiating it from the ₹11.11 Lakh Cr total Capex figure.',
    maxY: 12,
    data: [
      { year: '2020–21', actual: 3.16, actualStatus: 'audited', be: 3.33, re: 3.17, note: 'Audited direct asset creation.' },
      { year: '2021–22', actual: 4.60, actualStatus: 'audited', be: 4.35, re: 4.70, note: 'Audited direct asset creation.' },
      { year: '2022–23', actual: 6.09, actualStatus: 'audited', be: 6.10, re: 5.86, note: 'Audited direct asset creation.' },
      { year: '2023–24', actual: 8.35, actualStatus: 'audited', be: 8.40, re: 8.30, note: 'Audited direct asset creation.' },
      { year: '2024–25', actual: null, actualStatus: 'provisional_cga', be: 9.19, re: 8.37, note: 'Actuals pending CAG audit. Provisional CGA accounts record ~₹8.20 Lakh Crore direct outlay.' },
      { year: '2025–26', actual: null, actualStatus: 'pending', be: 9.38, re: 9.38, note: 'Budget Estimate: ₹9.38 Lakh Crore for direct physical asset creation.' },
    ],
  },
  effective: {
    title: 'Effective Capital Expenditure Trajectory · ₹ Lakh Crore',
    shortLabel: 'Effective Capex',
    subtitle: 'Consolidated national investment footprint, adding capital grants-in-aid given to states for rural roads, housing, and irrigation.',
    denominatorNote: 'Under constitutional accounting standards, grants given to states for asset creation are accounted under Revenue Account because assets belong to states. Effective Capex consolidates this to show total public investment (₹15.02 Lakh Cr BE in FY 2024–25).',
    maxY: 18,
    data: [
      { year: '2020–21', actual: 6.38, actualStatus: 'audited', be: 6.15, re: 6.45, note: 'Includes ₹2.12L Cr grants-in-aid to states for asset creation.' },
      { year: '2021–22', actual: 8.35, actualStatus: 'audited', be: 7.74, re: 8.41, note: 'Includes ₹2.42L Cr grants-in-aid to states.' },
      { year: '2022–23', actual: 10.51, actualStatus: 'audited', be: 10.68, re: 10.42, note: 'Includes ₹3.15L Cr grants-in-aid to states.' },
      { year: '2023–24', actual: 12.72, actualStatus: 'audited', be: 13.71, re: 12.71, note: 'Includes ₹3.23L Cr grants-in-aid to states.' },
      { year: '2024–25', actual: null, actualStatus: 'provisional_cga', be: 15.02, re: 13.90, note: 'BE of ₹15.02L Cr (~₹15,01,648 Cr, 4.6% of GDP) includes ₹3.91L Cr capital grants to states.' },
      { year: '2025–26', actual: null, actualStatus: 'pending', be: 15.48, re: 15.48, note: 'BE of ₹15.48L Cr (4.3% of GDP) includes ₹4.27L Cr capital grants to states.' },
    ],
  },
};

function formatInLakhCrore(amountCr: number): string {
  if (Math.abs(amountCr) >= 100000) {
    const lakhCr = (amountCr / 100000).toFixed(2);
    return `₹${Number(lakhCr).toLocaleString('en-IN')} Lakh Cr`;
  }
  return `₹${amountCr.toLocaleString('en-IN')} Cr`;
}

interface PublicMoneyPageProps {
  initialSection?: string;
}

export function PublicMoneyPage({ initialSection }: PublicMoneyPageProps) {
  const navigate = useNavigate();

  // If initial section is 'explorer' or specific subpath, navigate appropriately
  useEffect(() => {
    if (initialSection === 'explorer') {
      navigate('/public-money/explorer');
    } else if (initialSection === 'explained' || initialSection === 'budget-explained') {
      navigate('/public-money/explained');
    } else if (initialSection === 'toolkit' || initialSection === 'citizen-toolkit') {
      navigate('/public-money/toolkit');
    }
  }, [initialSection, navigate]);

  // State for Section 1: Financial Year
  const [selectedMacroYear, setSelectedMacroYear] = useState<string>('2024-25');
  const [activeTooltipCard, setActiveTooltipCard] = useState<string | null>(null);

  // State for Section 2: Citizen's Rupee
  const [rupeeTab, setRupeeTab] = useState<'comes' | 'goes'>('comes');
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [hoveredSliceIndex, setHoveredSliceIndex] = useState<number | null>(null);

  // State for Section 3: Capex Trend
  const [capexMetric, setCapexMetric] = useState<'expenditure' | 'outlay' | 'effective'>('expenditure');
  const [capexTimeHorizon, setCapexTimeHorizon] = useState<'5years' | 'all'>('5years');
  const [hoveredBar, setHoveredBar] = useState<{
    year: string;
    series: 'actual' | 'be' | 're';
    value: number | null;
    note: string;
  } | null>(null);

  const currentRupeeData = useMemo(() => {
    return (
      CITIZEN_RUPEE_DATASETS.find((d) => d.yearId === selectedMacroYear) ||
      CITIZEN_RUPEE_DATASETS[0]
    );
  }, [selectedMacroYear]);

  const activeCategoryList = useMemo(() => {
    return rupeeTab === 'comes'
      ? currentRupeeData.where1RupeeComesFrom
      : currentRupeeData.where1RupeeGoes;
  }, [rupeeTab, currentRupeeData]);

  // Ensure active category index is in bounds
  const activeCategory = activeCategoryList[selectedCategoryIndex] || activeCategoryList[0];
  const activeCategoryLabel =
    ('source' in activeCategory && activeCategory.source
      ? activeCategory.source
      : activeCategory.destination) || '';

  const currentCapexConfig = CAPEX_SERIES_MAP[capexMetric];
  const capexDisplayData = useMemo(() => {
    if (capexTimeHorizon === '5years') {
      return currentCapexConfig.data.slice(0, 5); // 2020-21 through 2024-25
    }
    return currentCapexConfig.data;
  }, [capexTimeHorizon, currentCapexConfig]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A19] pb-24">
      {/* ========================================================= */}
      {/* SECTION 1 — INTRODUCTION & HEADER                         */}
      {/* ========================================================= */}
      <section className="bg-[#FAF8F5] border-b border-[#E5E0D8] pt-8 pb-7 sm:pt-10 sm:pb-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3 py-1 text-xs font-semibold text-[#1A3D2F]">
              <Coins size={13} strokeWidth={1.5} className="text-[#1A3D2F]" />
              <span>Public Treasury & Citizen Accountability · Article 112–151</span>
            </div>

            {/* Title */}
            <h1 className="mt-3 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#181A19]">
              Tax & Public Money
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#4A524D] max-w-2xl">
              Public money belongs to the people of India. Explore how national revenues are collected,
              allocated to ministries, spent on infrastructure, and reviewed by independent auditors (CAG),
              and devolved to states — with clear distinctions between budget estimates, actual spending
              and audit findings.
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => navigate('/public-money/explained')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A3D2F] px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-[#143025] transition cursor-pointer"
              >
                <BookOpen size={13} strokeWidth={1.5} />
                <span>Citizen Budget Primer</span>
              </button>
              <a
                href="https://www.indiabudget.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5CFBF] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#181A19] shadow-2xs hover:bg-[#F4F1EA] transition"
              >
                <span>Union Budget Official Portal</span>
                <ArrowUpRight size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
              </a>
              <a
                href="https://cag.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5CFBF] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#181A19] shadow-2xs hover:bg-[#F4F1EA] transition"
              >
                <span>CAG Official Reports</span>
                <ArrowUpRight size={12} strokeWidth={1.5} className="text-[#1A3D2F]" />
              </a>
            </div>

            {/* Verified Public Record Notice */}
            <div className="mt-5 rounded-xl border border-[#D5CFBF] bg-[#F4F1EA] p-3 flex items-start gap-2.5">
              <ShieldCheck size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#1A3D2F]" />
              <p className="text-xs text-[#2C332E] leading-relaxed">
                <span className="font-bold text-[#1A3D2F]">Verified public record notice:</span> All figures
                are sourced from official Union Budget documents, CGA accounts and CAG reports. Figures
                shown below are for FY 2024–25 and may be revised as final audited accounts are published.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections Container */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 space-y-8">
        {/* ========================================================= */}
        {/* SECTION 2 — UNION GOVERNMENT FINANCES AT A GLANCE         */}
        {/* Clean Editorial Heading (No Numbered Circle)              */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          {/* Header */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Union Government Finances at a Glance
              </h2>
              <p className="mt-0.5 text-xs text-[#5C645E]">
                Key figures from the Union Budget ({selectedMacroYear === '2024-25' ? 'FY 2024–25' : 'FY 2025–26'})
              </p>
            </div>

            {/* FY Selector Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={selectedMacroYear}
                onChange={(e) => setSelectedMacroYear(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
              >
                <option value="2024-25">FY 2024–25 (Budget Estimates)</option>
                <option value="2025-26">FY 2025–26 (Budget Estimates)</option>
              </select>
            </div>
          </div>

          {/* 4 Clean Metric Cards with Subtle Tooltips */}
          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Total Expenditure */}
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 flex flex-col justify-between relative transition hover:border-slate-300">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1A3D2F]/10 text-[#1A3D2F]">
                      <Landmark size={14} />
                    </span>
                    <span>Total Expenditure</span>
                  </div>
                  <button
                    onClick={() => setActiveTooltipCard(activeTooltipCard === 'expenditure' ? null : 'expenditure')}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                    title="View measure definition and source"
                  >
                    <Info size={13} />
                  </button>
                </div>
                <p className="mt-3 text-2xl font-extrabold font-serif text-slate-900">
                  {formatInLakhCrore(currentRupeeData.macroTotals.totalBudgetOutlayCr)}
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  ₹{currentRupeeData.macroTotals.totalBudgetOutlayCr.toLocaleString('en-IN')} Cr
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Budget Estimate (BE)</span>
                <span>RE: {formatInLakhCrore(currentRupeeData.macroTotals.totalBudgetOutlayReCr || 4716487)}</span>
              </div>

              {/* Subtle Tooltip Box */}
              {activeTooltipCard === 'expenditure' && (
                <div className="absolute left-2 right-2 top-full mt-1.5 z-20 rounded-lg border border-slate-200 bg-white p-3 shadow-md text-xs text-slate-700 space-y-1">
                  <p><strong>Measure:</strong> Total legal spending ceiling authorized by Parliament under Article 112.</p>
                  <p><strong>Status:</strong> Budget Estimate (BE 2024–25); revised mid-year to ₹47.16 Lakh Cr (RE).</p>
                  <p className="text-[11px] text-[#1A3D2F]"><strong>Source:</strong> Union Budget at a Glance, Statement 1.</p>
                </div>
              )}
            </div>

            {/* Card 2: Revenue Receipts */}
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 flex flex-col justify-between relative transition hover:border-slate-300">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1A3D2F]/10 text-[#1A3D2F]">
                      <Receipt size={14} />
                    </span>
                    <span>Revenue Receipts</span>
                  </div>
                  <button
                    onClick={() => setActiveTooltipCard(activeTooltipCard === 'revenue' ? null : 'revenue')}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                    title="View measure definition and source"
                  >
                    <Info size={13} />
                  </button>
                </div>
                <p className="mt-3 text-2xl font-extrabold font-serif text-slate-900">
                  {formatInLakhCrore(currentRupeeData.macroTotals.totalRevenueReceiptsCr)}
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  ₹{currentRupeeData.macroTotals.totalRevenueReceiptsCr.toLocaleString('en-IN')} Cr
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Budget Estimate (BE)</span>
                <span>RE: {formatInLakhCrore(currentRupeeData.macroTotals.totalRevenueReceiptsReCr || 3087960)}</span>
              </div>

              {/* Subtle Tooltip Box */}
              {activeTooltipCard === 'revenue' && (
                <div className="absolute left-2 right-2 top-full mt-1.5 z-20 rounded-lg border border-slate-200 bg-white p-3 shadow-md text-xs text-slate-700 space-y-1">
                  <p><strong>Measure:</strong> Net tax revenues to Centre (₹25.83L Cr) + Non-tax revenue (₹5.46L Cr).</p>
                  <p><strong>Status:</strong> Budget Estimate (BE 2024–25); revised mid-year to ₹30.88 Lakh Cr (RE).</p>
                  <p className="text-[11px] text-[#1A3D2F]"><strong>Source:</strong> Receipt Budget, Statement 1: Summary of Receipts.</p>
                </div>
              )}
            </div>

            {/* Card 3: Capital Expenditure */}
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 flex flex-col justify-between relative transition hover:border-slate-300">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1A3D2F]/10 text-[#1A3D2F]">
                      <TrendingUp size={14} />
                    </span>
                    <span>Capital Expenditure</span>
                  </div>
                  <button
                    onClick={() => setActiveTooltipCard(activeTooltipCard === 'capex' ? null : 'capex')}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                    title="View measure definition and source"
                  >
                    <Info size={13} />
                  </button>
                </div>
                <p className="mt-3 text-2xl font-extrabold font-serif text-slate-900">
                  {formatInLakhCrore(currentRupeeData.macroTotals.capitalExpenditureCr)}
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  ₹{currentRupeeData.macroTotals.capitalExpenditureCr.toLocaleString('en-IN')} Cr (3.4% of GDP)
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Budget Estimate (BE)</span>
                <span>RE: {formatInLakhCrore(currentRupeeData.macroTotals.capitalExpenditureReCr || 1018048)}</span>
              </div>

              {/* Subtle Tooltip Box */}
              {activeTooltipCard === 'capex' && (
                <div className="absolute left-2 right-2 top-full mt-1.5 z-20 rounded-lg border border-slate-200 bg-white p-3 shadow-md text-xs text-slate-700 space-y-1">
                  <p><strong>Measure:</strong> Direct central assets (₹9.19L Cr) + SASCI 50-year loans to states (₹1.92L Cr).</p>
                  <p><strong>Status:</strong> Budget Estimate (BE 2024–25); revised to ₹10.18L Cr (RE). Outlay is ₹9.19L Cr.</p>
                  <p className="text-[11px] text-[#1A3D2F]"><strong>Source:</strong> Expenditure Budget Statement 4 & Budget Highlights.</p>
                </div>
              )}
            </div>

            {/* Card 4: Fiscal Deficit */}
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 flex flex-col justify-between relative transition hover:border-slate-300">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1A3D2F]/10 text-[#1A3D2F]">
                      <PieChart size={14} />
                    </span>
                    <span>Fiscal Deficit</span>
                  </div>
                  <button
                    onClick={() => setActiveTooltipCard(activeTooltipCard === 'deficit' ? null : 'deficit')}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                    title="View measure definition and source"
                  >
                    <Info size={13} />
                  </button>
                </div>
                <p className="mt-3 text-2xl font-extrabold font-serif text-slate-900">
                  {currentRupeeData.macroTotals.fiscalDeficitTargetPct}% of GDP
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  ₹{currentRupeeData.macroTotals.fiscalDeficitCr.toLocaleString('en-IN')} Cr
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Budget Target (BE)</span>
                <span>RE: {currentRupeeData.macroTotals.fiscalDeficitRePct || 4.8}% of GDP</span>
              </div>

              {/* Subtle Tooltip Box */}
              {activeTooltipCard === 'deficit' && (
                <div className="absolute left-2 right-2 top-full mt-1.5 z-20 rounded-lg border border-slate-200 bg-white p-3 shadow-md text-xs text-slate-700 space-y-1">
                  <p><strong>Measure:</strong> Total net market borrowing needed to bridge the gap between outlay and non-debt receipts.</p>
                  <p><strong>Status:</strong> Target BE 4.9% of GDP (₹16.13L Cr); revised to 4.8% RE (-10 bps consolidation).</p>
                  <p className="text-[11px] text-[#1A3D2F]"><strong>Source:</strong> FRBM Macroeconomic Framework Statement 2024-25.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3 — CITIZEN'S RUPEE FINANCING                     */}
        {/* Clean Editorial Heading (No Numbered Circle)              */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          {/* Header & Inflow/Outflow Toggles */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                {rupeeTab === 'comes'
                  ? 'How Does the Union Government Finance Its Budget?'
                  : 'How Does the Union Government Spend Its Outlay?'}
              </h2>
              <p className="mt-0.5 text-xs text-[#5C645E]">
                Share of total receipts and financing · {currentRupeeData.financialYear}
              </p>
            </div>

            {/* Toggle: Where Money Comes From vs Goes */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 text-xs">
              <button
                onClick={() => {
                  setRupeeTab('comes');
                  setSelectedCategoryIndex(0);
                }}
                className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                  rupeeTab === 'comes'
                    ? 'bg-[#1A3D2F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Where the Money Comes From
              </button>
              <button
                onClick={() => {
                  setRupeeTab('goes');
                  setSelectedCategoryIndex(0);
                }}
                className={`rounded-md px-3 py-1.5 font-bold transition cursor-pointer ${
                  rupeeTab === 'goes'
                    ? 'bg-[#1A3D2F] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Where the Money Goes
              </button>
            </div>
          </div>

          {/* 3-Part Component Anatomy matching Reference: Donut | Compact Legend | Selected Detail Panel */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left: Donut Chart with Total 100% in Center */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/70 bg-slate-50/40 p-4 lg:col-span-4 min-h-[380px]">
              <div className="relative flex items-center justify-center">
                <svg
                  viewBox="0 0 280 280"
                  className="h-60 w-60 sm:h-68 sm:w-68 select-none"
                  role="img"
                  aria-label={`${rupeeTab === 'comes' ? 'Receipts' : 'Expenditure'} Donut Chart: 100% total allocation`}
                >
                  {/* Interactive Slices */}
                  {(() => {
                    const circumference = 2 * Math.PI * 88; // 552.92
                    let cumulativePct = 0;

                    return activeCategoryList.map((item, idx) => {
                      const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((cumulativePct / 100) * circumference);
                      cumulativePct += item.percentage;
                      const isSelected = selectedCategoryIndex === idx;
                      const isHovered = hoveredSliceIndex === idx;

                      return (
                        <circle
                          key={idx}
                          cx="140"
                          cy="140"
                          r="88"
                          fill="none"
                          stroke={item.color}
                          strokeWidth={isSelected ? 42 : isHovered ? 38 : 30}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 140 140)"
                          className="transition-all duration-200 cursor-pointer"
                          onMouseEnter={() => setHoveredSliceIndex(idx)}
                          onMouseLeave={() => setHoveredSliceIndex(null)}
                          onClick={() => setSelectedCategoryIndex(idx)}
                          style={{
                            opacity:
                              (hoveredSliceIndex !== null || selectedCategoryIndex !== null) &&
                              !isSelected &&
                              !isHovered
                                ? 0.55
                                : 1,
                            filter: isSelected ? 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' : isHovered ? 'drop-shadow(0 2px 5px rgba(0,0,0,0.2))' : 'none',
                          }}
                        />
                      );
                    });
                  })()}

                  {/* Center Text: Total 100% */}
                  <g className="transition-all duration-150 select-none">
                    <text
                      x="140"
                      y="130"
                      textAnchor="middle"
                      fill="#64748B"
                      style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em' }}
                    >
                      Total
                    </text>
                    <text
                      x="140"
                      y="158"
                      textAnchor="middle"
                      fill="#0F172A"
                      style={{ fontSize: '28px', fontWeight: 900 }}
                    >
                      100%
                    </text>
                  </g>
                </svg>
              </div>

              <span className="mt-2 text-[10px] text-slate-400 font-mono">
                Click any donut segment or legend item to inspect
              </span>
            </div>

            {/* Middle: Compact Legend List (Reference B) */}
            <div className="space-y-1.5 lg:col-span-4 min-h-[380px] flex flex-col justify-between">
              {activeCategoryList.map((item, idx) => {
                const label = ('source' in item && item.source ? item.source : item.destination) || '';
                const isSelected = selectedCategoryIndex === idx;
                const isHovered = hoveredSliceIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategoryIndex(idx)}
                    onMouseEnter={() => setHoveredSliceIndex(idx)}
                    onMouseLeave={() => setHoveredSliceIndex(null)}
                    className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs transition cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#1A3D2F]/10 border border-[#1A3D2F]/40 font-bold text-slate-900 shadow-2xs ring-1 ring-[#1A3D2F]/20'
                        : isHovered
                        ? 'bg-slate-100 text-slate-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform"
                        style={{
                          backgroundColor: item.color,
                          transform: isSelected ? 'scale(1.3)' : 'scale(1)',
                        }}
                      />
                      <span className="truncate">{label}</span>
                    </div>
                    <span className="shrink-0 font-mono font-bold text-slate-900">
                      {item.percentage}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Category Detail Panel (Reference C) */}
            {/* Stable fixed height (h-[380px]) prevents layout shifting when selection changes */}
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-5 lg:col-span-4 flex flex-col justify-between min-h-[380px] lg:h-[380px] overflow-y-auto">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-3.5 w-3.5 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: activeCategory.color }}
                  />
                  <h3 className="font-bold text-slate-900 text-sm">
                    {activeCategoryLabel}
                  </h3>
                </div>

                {/* Big Percentage */}
                <p className="mt-3 text-4xl font-extrabold text-slate-900 font-serif">
                  {activeCategory.percentage}%
                </p>

                {/* Calculated Rupee Amount */}
                <p className="mt-1 text-xs font-mono font-bold text-[#1A3D2F]">
                  {formatInLakhCrore(activeCategory.exactAmountCr)}{' '}
                  <span className="text-[10px] text-slate-500 font-sans font-normal">
                    (₹{activeCategory.exactAmountCr.toLocaleString('en-IN')} Cr · BE {selectedMacroYear})
                  </span>
                </p>

                {/* Plain-Language Description */}
                <p className="mt-3 text-xs leading-relaxed text-[#2C332E]">
                  {activeCategory.description}
                </p>

                {/* Official Source Link */}
                {activeCategory.officialSourceUrl && (
                  <div className="mt-3 text-[11px]">
                    <a
                      href={activeCategory.officialSourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[#1A3D2F] hover:underline"
                    >
                      <span>Official Source: Union Budget {selectedMacroYear}</span>
                      <ExternalLink size={10} strokeWidth={1.5} />
                    </a>
                  </div>
                )}
              </div>

              {/* Note callout for borrowings / financing */}
              {activeCategory.categoryType === 'borrowing_liability' ? (
                <div className="mt-4 rounded-lg bg-amber-100/70 border border-amber-300 p-2.5 text-[11px] text-amber-900">
                  <strong>Note:</strong> Borrowings are financing, not revenue. Market borrowings create future debt repayment obligations.
                </div>
              ) : (
                <div className="mt-4 rounded-lg bg-slate-100/70 border border-slate-200 p-2 text-[10px] text-slate-500">
                  Denominator: ₹{currentRupeeData.macroTotals.totalBudgetOutlayCr.toLocaleString('en-IN')} Cr Total Outlay
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4 — CAPITAL EXPENDITURE TREND                     */}
        {/* Clean Editorial Heading & Expanded Height (340px SVG)     */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          {/* Header & Controls */}
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                How Has Government Investment Changed?
              </h2>
              <p className="mt-0.5 text-xs text-[#5C645E]">
                {currentCapexConfig.title}
              </p>
            </div>

            {/* Selectors: Metric & Horizon */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={capexMetric}
                onChange={(e) => setCapexMetric(e.target.value as 'expenditure' | 'outlay' | 'effective')}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
              >
                <option value="expenditure">Capital Expenditure (Total)</option>
                <option value="outlay">Capital Outlay (Direct Assets)</option>
                <option value="effective">Effective Capex (incl. Grants)</option>
              </select>

              <select
                value={capexTimeHorizon}
                onChange={(e) => setCapexTimeHorizon(e.target.value as '5years' | 'all')}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
              >
                <option value="5years">Last 5 years</option>
                <option value="all">All available years</option>
              </select>
            </div>
          </div>

          {/* Grouped Vertical Bar Chart (Reference D) — Increased Height to 340px */}
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[620px]">
              <svg
                viewBox="0 0 760 340"
                className="w-full h-80 sm:h-96 select-none"
                role="img"
                aria-label="Capital Expenditure Grouped Bar Chart"
              >
                {/* Y-axis grid lines (0, 5, 10, 15) */}
                {[0, 5, 10, 15].map((val) => {
                  const y = 270 - (val / 15) * 230;
                  return (
                    <g key={val}>
                      <line
                        x1="55"
                        y1={y}
                        x2="735"
                        y2={y}
                        stroke="#E2E8F0"
                        strokeDasharray={val === 0 ? 'none' : '3 3'}
                        strokeWidth={val === 0 ? 1.5 : 1}
                      />
                      <text
                        x="46"
                        y={y + 4}
                        textAnchor="end"
                        fill="#4A524D"
                        style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 600 }}
                      >
                        ₹{val}L
                      </text>
                    </g>
                  );
                })}

                {/* Year Clusters */}
                {capexDisplayData.map((item, yearIdx) => {
                  const totalSlots = capexDisplayData.length;
                  const slotWidth = (735 - 55) / totalSlots;
                  const slotX = 55 + yearIdx * slotWidth;
                  const barWidth = 24;
                  const barGap = 4;
                  const clusterWidth = 3 * barWidth + 2 * barGap; // 80px
                  const startX = slotX + (slotWidth - clusterWidth) / 2;

                  // Actual Bar
                  const actualHeight = item.actual !== null ? (item.actual / 15) * 230 : 0;
                  const actualY = 270 - actualHeight;

                  // BE Bar
                  const beHeight = (item.be / 15) * 230;
                  const beY = 270 - beHeight;

                  // RE Bar
                  const reHeight = (item.re / 15) * 230;
                  const reY = 270 - reHeight;

                  return (
                    <g key={item.year}>
                      {/* Actual Column: #1A3D2F */}
                      {item.actual !== null ? (
                        <g
                          className="cursor-pointer transition-opacity hover:opacity-85"
                          onMouseEnter={() =>
                            setHoveredBar({
                              year: item.year,
                              series: 'actual',
                              value: item.actual,
                              note: 'Audited cash disbursements recorded through CGA Finance Accounts.',
                            })
                          }
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          <rect
                            x={startX}
                            y={actualY}
                            width={barWidth}
                            height={actualHeight}
                            fill="#1A3D2F"
                            rx="3"
                          />
                          <text
                            x={startX + barWidth / 2}
                            y={actualY - 6}
                            textAnchor="middle"
                            fill="#1A3D2F"
                            style={{ fontSize: '10px', fontWeight: 800, fontFamily: 'monospace' }}
                          >
                            {item.actual.toFixed(1)}
                          </text>
                        </g>
                      ) : (
                        /* Clearly Distinguish Unavailable / Pending Data from Zero */
                        <g
                          className="cursor-pointer"
                          onMouseEnter={() =>
                            setHoveredBar({
                              year: item.year,
                              series: 'actual',
                              value: null,
                              note: item.note,
                            })
                          }
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Dashed placeholder container distinguishing pending audit from zero */}
                          <rect
                            x={startX}
                            y={270 - 150}
                            width={barWidth}
                            height={150}
                            fill="#F1EFEA"
                            stroke="#D5CFBF"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                            rx="3"
                          />
                          <text
                            x={startX + barWidth / 2}
                            y={270 - 156}
                            textAnchor="middle"
                            fill="#B45309"
                            style={{ fontSize: '9px', fontWeight: 700 }}
                          >
                            Prov.*
                          </text>
                        </g>
                      )}

                      {/* BE Column: #527863 (Sage Green) */}
                      <g
                        className="cursor-pointer transition-opacity hover:opacity-85"
                        onMouseEnter={() =>
                          setHoveredBar({
                            year: item.year,
                            series: 'be',
                            value: item.be,
                            note: 'Budget Estimate ceiling approved by Parliament in annual Appropriation Act.',
                          })
                        }
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <rect
                          x={startX + barWidth + barGap}
                          y={beY}
                          width={barWidth}
                          height={beHeight}
                          fill="#527863"
                          rx="3"
                        />
                        <text
                          x={startX + barWidth + barGap + barWidth / 2}
                          y={beY - 6}
                          textAnchor="middle"
                          fill="#527863"
                          style={{ fontSize: '10px', fontWeight: 800, fontFamily: 'monospace' }}
                        >
                          {item.be.toFixed(1)}
                        </text>
                      </g>

                      {/* RE Column: #B45309 (Ochre) */}
                      <g
                        className="cursor-pointer transition-opacity hover:opacity-85"
                        onMouseEnter={() =>
                          setHoveredBar({
                            year: item.year,
                            series: 're',
                            value: item.re,
                            note: 'Revised Estimate presented mid-year reflecting ground execution pace.',
                          })
                        }
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <rect
                          x={startX + 2 * (barWidth + barGap)}
                          y={reY}
                          width={barWidth}
                          height={reHeight}
                          fill="#B45309"
                          rx="3"
                        />
                        <text
                          x={startX + 2 * (barWidth + barGap) + barWidth / 2}
                          y={reY - 6}
                          textAnchor="middle"
                          fill="#B45309"
                          style={{ fontSize: '10px', fontWeight: 800, fontFamily: 'monospace' }}
                        >
                          {item.re.toFixed(1)}
                        </text>
                      </g>

                      {/* X-axis Year Label (Larger font for readability) */}
                      <text
                        x={slotX + slotWidth / 2}
                        y={296}
                        textAnchor="middle"
                        fill="#181A19"
                        style={{ fontSize: '12px', fontWeight: 700 }}
                      >
                        {item.year}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Legend Directly Below Chart (Reference D) */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-xs bg-[#1A3D2F]" />
                <span className="font-semibold text-slate-800">Actual Outflow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-xs bg-[#527863]" />
                <span className="font-semibold text-slate-800">Budget Estimate (BE)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-xs bg-[#B45309]" />
                <span className="font-semibold text-slate-800">Revised Estimate (RE)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-xs border border-dashed border-[#B45309] bg-[#F1EFEA]" />
                <span className="font-semibold text-slate-600">Pending CAG Audit (Prov. CGA)</span>
              </div>
            </div>

            {/* Informative Hover Details Display */}
            {hoveredBar && (
              <div className="text-[11px] text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <strong className="text-slate-900">{hoveredBar.year}</strong> ·{' '}
                <span className="capitalize font-semibold">{hoveredBar.series === 'be' ? 'Budget Estimate' : hoveredBar.series === 're' ? 'Revised Estimate' : 'Actual'}</span>:{' '}
                {hoveredBar.value !== null ? (
                  <strong className="text-[#1A3D2F] font-mono font-bold">₹{hoveredBar.value} Lakh Cr</strong>
                ) : (
                  <span className="text-[#B45309] font-bold">Pending CAG Audit</span>
                )}{' '}
                <span className="text-slate-500 font-sans">({hoveredBar.note})</span>
              </div>
            )}
          </div>

          {/* Footer Subtext and View Full Historical Data Link */}
          <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center text-xs text-[#5C645E]">
            <p>
              {currentCapexConfig.denominatorNote}
            </p>
            <button
              onClick={() => navigate('/public-money/explorer')}
              className="inline-flex items-center gap-1 font-bold text-[#1A3D2F] hover:underline cursor-pointer shrink-0"
            >
              <span>View Full Historical Data</span>
              <ArrowRight size={13} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 5 — BUDGET-TO-AUDIT PROCESS                       */}
        {/* Keeps Numbering ONLY in the 5 Process Steps (1-5)         */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                From Budget to Audit: How Public Money Moves
              </h2>
              <p className="mt-0.5 text-xs text-[#5C645E]">
                The five-stage constitutional lifecycle of Indian public finance under Articles 112 to 151
              </p>
            </div>
            <button
              onClick={() => navigate('/public-money/explained')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1A3D2F] hover:underline cursor-pointer self-start sm:self-auto"
            >
              <span>Learn more about the budget process</span>
              <ArrowRight size={13} strokeWidth={2} />
            </button>
          </div>

          {/* 5 Connected Steps with Step Numbering (1 to 5) */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-5 items-start">
            {/* Step 1 */}
            <div className="rounded-xl border border-slate-200/80 bg-[#FAF8F5] p-3.5 relative">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#181A19] text-xs font-bold text-white mb-2">
                1
              </span>
              <h3 className="font-bold text-xs text-slate-900">Revenue Inflow</h3>
              <p className="mt-1 text-[11px] text-[#2C332E] leading-relaxed">
                Taxes and non-tax receipts are collected by the government into the Consolidated Fund.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-slate-200/80 bg-[#FAF8F5] p-3.5 relative">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white mb-2">
                2
              </span>
              <h3 className="font-bold text-xs text-slate-900">Budget Estimate (BE)</h3>
              <p className="mt-1 text-[11px] text-[#2C332E] leading-relaxed">
                Government presents its proposed revenues and expenditure ceiling for parliamentary approval.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-slate-200/80 bg-[#FAF8F5] p-3.5 relative">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#181A19] text-xs font-bold text-white mb-2">
                3
              </span>
              <h3 className="font-bold text-xs text-slate-900">Revised Estimate (RE)</h3>
              <p className="mt-1 text-[11px] text-[#2C332E] leading-relaxed">
                Figures are recalibrated mid-year based on monsoon pace, ground execution, and tax trends.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-slate-200/80 bg-[#FAF8F5] p-3.5 relative">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A3D2F] text-xs font-bold text-white mb-2">
                4
              </span>
              <h3 className="font-bold text-xs text-slate-900">Actual Accounts</h3>
              <p className="mt-1 text-[11px] text-[#2C332E] leading-relaxed">
                Final cash accounting recorded by ministries through the Controller General of Accounts (CGA).
              </p>
            </div>

            {/* Step 5 */}
            <div className="rounded-xl border border-slate-200/80 bg-[#FAF8F5] p-3.5 relative">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#B45309] text-xs font-bold text-white mb-2">
                5
              </span>
              <h3 className="font-bold text-xs text-slate-900">CAG Audit</h3>
              <p className="mt-1 text-[11px] text-[#2C332E] leading-relaxed">
                Independent constitutional audit under Article 151 examines accounting compliance and legal regularity.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 6 — KEY REVENUE SOURCES PREVIEW                   */}
        {/* Clean Editorial Heading & Prominent Financial Amounts     */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Key Revenue Sources (FY 2024–25 BE)
              </h2>
              <p className="mt-0.5 text-xs text-[#5C645E]">
                Major tax and non-tax receipts · Denominator: ₹48.21 Lakh Cr Total Budget Outlay
              </p>
            </div>

            <button
              onClick={() => navigate('/public-money/explorer')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1A3D2F] hover:underline cursor-pointer"
            >
              <span>Explore all financial records</span>
              <ArrowRight size={13} strokeWidth={2} />
            </button>
          </div>

          {/* 4 Clickable Revenue Cards with Prominent Financial Amounts */}
          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: GST */}
            <div
              onClick={() => navigate('/public-money/explorer')}
              className="group rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 flex flex-col justify-between hover:border-[#1A3D2F] hover:shadow-xs transition cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-slate-200 text-[#1A3D2F] font-bold text-xs">
                    %
                  </span>
                  <span className="rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-[11px] font-bold text-[#1A3D2F]">
                    19% of Outlay
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 mt-2.5">Goods and Services Tax (GST)</h3>
                <p className="text-2xl font-black font-serif text-slate-900 mt-1">₹10.68 Lakh Cr</p>
                <p className="text-[11px] font-mono text-slate-500">₹10,67,650 Cr (Central GST + Cess)</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>Receipt Budget Statement 1</span>
                <ArrowRight size={13} className="text-[#1A3D2F] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Corporation Tax */}
            <div
              onClick={() => navigate('/public-money/explorer')}
              className="group rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 flex flex-col justify-between hover:border-[#1A3D2F] hover:shadow-xs transition cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-slate-200 text-[#1A3D2F]">
                    <Building2 size={15} />
                  </span>
                  <span className="rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-[11px] font-bold text-[#1A3D2F]">
                    17% of Outlay
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 mt-2.5">Corporation Tax</h3>
                <p className="text-2xl font-black font-serif text-slate-900 mt-1">₹10.43 Lakh Cr</p>
                <p className="text-[11px] font-mono text-slate-500">₹10,42,830 Cr (Corporate Profits Tax)</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>Direct Taxes Annexure 1</span>
                <ArrowRight size={13} className="text-[#1A3D2F] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Non-Tax Revenue */}
            <div
              onClick={() => navigate('/public-money/explorer')}
              className="group rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 flex flex-col justify-between hover:border-[#1A3D2F] hover:shadow-xs transition cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-slate-200 text-[#1A3D2F]">
                    <Receipt size={15} />
                  </span>
                  <span className="rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-[11px] font-bold text-[#1A3D2F]">
                    9% of Outlay
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 mt-2.5">Non-Tax Revenue</h3>
                <p className="text-2xl font-black font-serif text-slate-900 mt-1">₹5.46 Lakh Cr</p>
                <p className="text-[11px] font-mono text-slate-500">₹5,45,701 Cr (incl. RBI ₹2.11L Cr)</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>Dividends & Profits Statement 2</span>
                <ArrowRight size={13} className="text-[#1A3D2F] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Customs & Excise */}
            <div
              onClick={() => navigate('/public-money/explorer')}
              className="group rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 flex flex-col justify-between hover:border-[#1A3D2F] hover:shadow-xs transition cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-slate-200 text-[#1A3D2F]">
                    <Coins size={15} />
                  </span>
                  <span className="rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-[11px] font-bold text-[#1A3D2F]">
                    9% of Outlay
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-900 mt-2.5">Customs & Excise Duties</h3>
                <p className="text-2xl font-black font-serif text-slate-900 mt-1">₹4.34 Lakh Cr</p>
                <p className="text-[11px] font-mono text-slate-500">Customs ₹1.93L Cr + Excise ₹2.41L Cr</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>Combined Indirect Duties</span>
                <ArrowRight size={13} className="text-[#1A3D2F] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 7 — EXPLORE MORE NAVIGATION CARDS                 */}
        {/* Clean Editorial Heading & Fully Clickable Destination Hub */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
          <div>
            <h2 className="font-serif text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Explore More
            </h2>
            <p className="mt-0.5 text-xs text-[#5C645E]">
              Deep-dive resources for citizen researchers, RTI activists, and public finance analysts
            </p>
          </div>

          {/* 3 Prominent Fully Clickable Cards */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Card 1: Financial Data Explorer */}
            <div
              onClick={() => navigate('/public-money/explorer')}
              className="group rounded-xl border border-slate-200 bg-[#FAF8F5] p-5 hover:border-[#1A3D2F] hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#1A3D2F] group-hover:bg-[#1A3D2F] group-hover:text-white transition">
                  <Search size={18} />
                </span>
                <h3 className="mt-3 font-serif font-bold text-base text-slate-900">
                  Financial Data Explorer
                </h3>
                <p className="mt-1 text-xs text-[#4A524D] leading-relaxed">
                  Search and filter all primary public finance records across 10 accountability pillars: inspect Ministry Demands for Grants, compare BE vs RE vs audited CGA actuals, and review verified citations.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#1A3D2F]">
                <span>Open Financial Explorer</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Budget & Expenditure Explained */}
            <div
              onClick={() => navigate('/public-money/explained')}
              className="group rounded-xl border border-slate-200 bg-[#FAF8F5] p-5 hover:border-[#1A3D2F] hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#1A3D2F] group-hover:bg-[#1A3D2F] group-hover:text-white transition">
                  <BookOpen size={18} />
                </span>
                <h3 className="mt-3 font-serif font-bold text-base text-slate-900">
                  Budget & Expenditure Explained
                </h3>
                <p className="mt-1 text-xs text-[#4A524D] leading-relaxed">
                  Plain-language guides to public finance: understand how legislative BE ceilings differ from cash outflows, why Capital Outlay is distinct from Capex, and what CAG audits verify.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#1A3D2F]">
                <span>Read Educational Primer</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Citizen Accountability Toolkit */}
            <div
              onClick={() => navigate('/public-money/toolkit')}
              className="group rounded-xl border border-slate-200 bg-[#FAF8F5] p-5 hover:border-[#1A3D2F] hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-[#1A3D2F] group-hover:bg-[#1A3D2F] group-hover:text-white transition">
                  <ShieldCheck size={18} />
                </span>
                <h3 className="mt-3 font-serif font-bold text-base text-slate-900">
                  Citizen Accountability Toolkit
                </h3>
                <p className="mt-1 text-xs text-[#4A524D] leading-relaxed">
                  Practical tools to audit public money: learn how to inspect panchayat works on e-GramSwaraj, track central DBT transfers on PFMS, access CAG reports, and file RTI requests.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#1A3D2F]">
                <span>View Accountability Toolkit</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
