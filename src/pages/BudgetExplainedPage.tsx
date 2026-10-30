import {
  ArrowLeft,
  Coins,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  BarChart3,
  TrendingDown,
  Info,
} from 'lucide-react';
import { useNavigate } from '@/lib/router';

export function BudgetExplainedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181A19] pb-24">
      {/* 1. Header */}
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

            <div className="mt-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3.5 py-1 text-xs font-semibold text-[#1A3D2F]">
                <BookOpen size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
                <span>Citizen Education & Public Finance Architecture</span>
              </div>
              <h1 className="mt-3 font-serif text-2xl font-extrabold sm:text-4xl text-[#181A19]">
                Budget & Expenditure Explained
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#4A524D] leading-relaxed">
                A plain-language guide to Indian public finance: understand how the Union Budget
                is authorized under Article 112, how mid-year projections adjust, how cash is
                actually disbursed, and why Capital Outlay is distinct from Capital Expenditure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Educational Content Container */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 space-y-8">
        {/* Module 1: The Three Budget Stages (BE vs RE vs Actuals) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <Coins size={16} strokeWidth={1.5} />
            <span>1. Core Budget Classifications</span>
          </div>
          <h2 className="mt-2 text-xl font-bold font-serif text-slate-900 sm:text-2xl">
            Budget Estimates (BE), Revised Estimates (RE) & Actual Accounts
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Many news headlines confuse budget authorizations with money spent. In Indian constitutional
            practice, there is a fundamental difference between an approved spending ceiling and money
            that has left the public treasury.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
              <span className="inline-block rounded-md bg-[#1A3D2F] px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                1. Budget Estimate (BE)
              </span>
              <h3 className="mt-2 text-sm font-bold text-slate-900">
                Statutory Spending Ceiling
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Presented on February 1 (or after general elections) under Article 112. When Parliament
                passes the annual Appropriation Act, it gives the executive the legal power to spend up
                to that figure. <strong>It is a legislative ceiling, not cash spent.</strong>
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
              <span className="inline-block rounded-md bg-[#B45309] px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                2. Revised Estimate (RE)
              </span>
              <h3 className="mt-2 text-sm font-bold text-slate-900">
                Mid-Year Recalibration
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Presented 12 months later alongside the next budget. Ministries re-examine their pace
                of execution, monsoon variations, and tax collections to present an operational update.
                <strong>RE is an adjusted estimate, not an audited result.</strong>
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <span className="inline-block rounded-md bg-[#1A3D2F] px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                3. Actual Accounts
              </span>
              <h3 className="mt-2 text-sm font-bold text-slate-900">
                Audited Cash Outflows
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                The actual rupees disbursed from the Consolidated Fund of India, recorded by the
                Controller General of Accounts (CGA) and verified two years later in the Union Finance
                Accounts by the CAG. <strong>This is real money spent.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Module 2: Capital Outlay vs Capital Expenditure vs Effective Capex */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <BarChart3 size={16} strokeWidth={1.5} />
            <span>2. Public Investment Architecture</span>
          </div>
          <h2 className="mt-2 text-xl font-bold font-serif text-slate-900 sm:text-2xl">
            Capital Outlay vs Capital Expenditure vs Effective Capex
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Official documents report three distinct figures for government infrastructure investments.
            Mixing them together causes major analytical errors. Here is how they are calculated in FY 2024–25:
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  A. Capital Outlay (Direct Physical Asset Creation)
                </h3>
                <span className="rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-xs font-bold font-mono text-[#1A3D2F]">
                  ₹9,19,401 Cr BE (~₹9.19 Lakh Cr)
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Measures physical, tangible infrastructure assets created directly by Union Ministries
                under Major Heads 4000 to 5475. This includes national highway construction (Ministry of
                Road Transport), railway track expansion and rolling stock (Railways), naval frigates and
                aircraft (Defence), and central port terminals.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  B. Total Capital Expenditure (Article 112 Capital Account)
                </h3>
                <span className="rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-xs font-bold font-mono text-[#1A3D2F]">
                  ₹11,11,111 Cr BE (~₹11.11 Lakh Cr)
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Combines <strong>Capital Outlay (₹9.19L Cr)</strong> PLUS <strong>Loans and Advances
                to State Governments (₹1.92 Lakh Cr)</strong>. This major addition is the Scheme for
                Special Assistance to States for Capital Investment (SASCI)—50-year interest-free loans
                granted to states to fund regional infrastructure.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  C. Effective Capital Expenditure (Consolidated National Footprint)
                </h3>
                <span className="rounded-md bg-[#1A3D2F]/10 px-2 py-0.5 text-xs font-bold font-mono text-[#1A3D2F]">
                  ₹15,01,648 Cr BE (~₹15.02 Lakh Cr · 4.6% of GDP)
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Under constitutional accounting standards, Grants-in-Aid provided to states for creating
                state assets (such as PMGSY rural roads, PMAY rural housing, and Jal Jeevan Mission water
                networks) are classified under the Revenue Account because the asset ownership belongs to
                the state, not the Union. The Ministry of Finance reports "Effective Capital Expenditure"
                as an analytical consolidation to show the total national public investment footprint.
              </p>
            </div>
          </div>
        </div>

        {/* Module 3: CAG Constitutional Audits */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <ShieldCheck size={16} strokeWidth={1.5} />
            <span>3. Independent Accountability</span>
          </div>
          <h2 className="mt-2 text-xl font-bold font-serif text-slate-900 sm:text-2xl">
            Comptroller and Auditor General (CAG) Audits (Article 148–151)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            The Comptroller and Auditor General of India is an independent constitutional authority.
            CAG audit reports are submitted to the President of India, who causes them to be tabled
            before Parliament, where they are examined by the Public Accounts Committee (PAC).
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5">
              <span className="font-bold text-slate-900 block">Financial Audits</span>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Verifies whether the Union Finance Accounts and Appropriation Accounts reflect a true
                and fair view of government transactions and cash balances.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5">
              <span className="font-bold text-slate-900 block">Compliance Audits</span>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Examines whether public funds were disbursed in conformity with parliamentary laws,
                statutory rules, and General Financial Rules (GFR).
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5">
              <span className="font-bold text-slate-900 block">Performance Audits</span>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Evaluates economy, efficiency, and effectiveness of major government schemes, identifying
                cost overruns, idle assets, and procedural bottlenecks.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-amber-900">
            <div className="flex items-start gap-2">
              <Info size={16} strokeWidth={1.5} className="shrink-0 mt-0.5 text-amber-800" />
              <p className="leading-relaxed">
                <strong>Crucial Audit Principle:</strong> A CAG audit report is an independent examination
                of administrative compliance, financial regularity, and project delays. An audit evaluates
                regularity and identifies systemic flaws; it does not automatically certify that every
                welfare scheme fulfilled its intended broad social outcomes across India.
              </p>
            </div>
          </div>
        </div>

        {/* Module 4: Deficits, Debt & Borrowings */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <TrendingDown size={16} strokeWidth={1.5} />
            <span>4. Macroeconomic Deficits</span>
          </div>
          <h2 className="mt-2 text-xl font-bold font-serif text-slate-900 sm:text-2xl">
            Why Borrowings Are Financing, Not Revenue
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            In the Citizen's Rupee chart, <strong>Borrowings and Other Liabilities</strong> account for
            27% of total receipts in FY 2024–25 BE. Citizens often ask: <em>is borrowing government revenue?</em>
          </p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 text-xs text-slate-700 leading-relaxed space-y-2">
            <p>
              Under constitutional accounting standards, borrowings are classified as <strong>Capital Receipts (Debt)</strong>.
              They are market debt instruments—treasury bills, dated government securities (G-Secs), and small
              savings bonds—issued to cover the gap between total government expenditure (₹48.21 Lakh Cr)
              and non-debt revenues (₹32.07 Lakh Cr).
            </p>
            <p>
              This gap is the <strong>Fiscal Deficit</strong> (4.9% of GDP in FY 2024–25 BE, consolidating to 4.8% RE).
              Because borrowing creates an obligation to pay annual interest (₹11.63 Lakh Cr budgeted) and repay
              principal in the future, it must be clearly distinguished from tax revenues.
            </p>
          </div>
        </div>

        {/* Official Resources & Portals */}
        <div className="rounded-2xl border border-[#143025] bg-[#1A3D2F] p-6 text-white sm:p-8 shadow-md">
          <h3 className="text-xl font-extrabold font-serif">Primary Official Portals for Verification</h3>
          <p className="mt-1 text-xs text-slate-300">
            Cross-check any figure against official Ministry of Finance publications and constitutional auditors.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <a
              href="https://www.indiabudget.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl bg-white/10 p-3 hover:bg-white/20 transition"
            >
              <div>
                <p className="font-bold text-white">Union Budget Portal</p>
                <p className="text-[10px] text-slate-300">Budget at a Glance & Statements</p>
              </div>
              <ExternalLink size={14} className="text-emerald-300" />
            </a>

            <a
              href="https://cga.nic.in/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl bg-white/10 p-3 hover:bg-white/20 transition"
            >
              <div>
                <p className="font-bold text-white">CGA Finance Accounts</p>
                <p className="text-[10px] text-slate-300">Monthly accounts & audited actuals</p>
              </div>
              <ExternalLink size={14} className="text-emerald-300" />
            </a>

            <a
              href="https://cag.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl bg-white/10 p-3 hover:bg-white/20 transition"
            >
              <div>
                <p className="font-bold text-white">CAG Official Reports</p>
                <p className="text-[10px] text-slate-300">Union & state compliance audits</p>
              </div>
              <ExternalLink size={14} className="text-emerald-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
