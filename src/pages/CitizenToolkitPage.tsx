import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Search,
  FileText,
  Building2,
  Info,
  Scale,
} from 'lucide-react';
import { useNavigate } from '@/lib/router';

export function CitizenToolkitPage() {
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
                <ShieldCheck size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
                <span>Civic Action & Public Audit Tools</span>
              </div>
              <h1 className="mt-3 font-serif text-2xl font-extrabold sm:text-4xl text-[#181A19]">
                Citizen Accountability Toolkit
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#4A524D] leading-relaxed">
                Practical tools, official digital portals, and legal frameworks to track public spending,
                audit panchayat works, inspect central welfare transfers, and verify government claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Toolkit Container */}
      <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 space-y-8">
        {/* Tool 1: PFMS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              <FileText size={16} strokeWidth={1.5} />
              <span>Tool 1 · Central Disbursements</span>
            </div>
            <a
              href="https://pfms.nic.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1A3D2F] hover:underline"
            >
              <span>pfms.nic.in</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <h2 className="mt-2 text-xl font-bold font-serif text-slate-900 sm:text-2xl">
            Public Financial Management System (PFMS)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            The Public Financial Management System (PFMS), managed by the Controller General of Accounts,
            is the central nervous system for all public cash flows in India. Over ₹15 Lakh Crore in
            annual welfare schemes and direct benefit transfers (DBT) flow through PFMS.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5">
              <span className="font-bold text-slate-900 block">Single Nodal Agency (SNA) Tracking</span>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                For Centrally Sponsored Schemes (CSS), states can no longer park unused central funds in
                state treasuries. Funds are released Just-in-Time to designated SNA bank accounts only
                after actual ground utilization is verified.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5">
              <span className="font-bold text-slate-900 block">Know Your Payments (DBT)</span>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Any citizen can track payment status for PM-KISAN, scholarships, or pensions on PFMS by
                entering their bank account number or beneficiary ID.
              </p>
            </div>
          </div>
        </div>

        {/* Tool 2: e-GramSwaraj */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              <Building2 size={16} strokeWidth={1.5} />
              <span>Tool 2 · Panchayat & Local Government</span>
            </div>
            <a
              href="https://egramswaraj.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1A3D2F] hover:underline"
            >
              <span>egramswaraj.gov.in</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <h2 className="mt-2 text-xl font-bold font-serif text-slate-900 sm:text-2xl">
            e-GramSwaraj: Auditing Local Panchayat Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Gram Panchayats receive direct untied and tied grants under the 15th Finance Commission.
            Under the Ministry of Panchayati Raj, e-GramSwaraj provides complete visibility into village budgets.
          </p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 text-xs text-slate-700 leading-relaxed space-y-2">
            <p className="font-bold text-slate-900">What you can inspect on e-GramSwaraj for your village:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Gram Panchayat Development Plan (GPDP):</strong> Approved list of roads, drains, and solar lights for the current financial year.</li>
              <li><strong>Progress Reporting & Geotagged Photos:</strong> Physical progress photographs uploaded before, during, and after construction.</li>
              <li><strong>Vendor Payment Vouchers:</strong> Specific voucher entries showing which contractor or supplier was paid from the panchayat treasury.</li>
            </ul>
          </div>
        </div>

        {/* Tool 3: How to Read CAG Audit Reports */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              <Search size={16} strokeWidth={1.5} />
              <span>Tool 3 · Constitutional Audits</span>
            </div>
            <a
              href="https://cag.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1A3D2F] hover:underline"
            >
              <span>cag.gov.in</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <h2 className="mt-2 text-xl font-bold font-serif text-slate-900 sm:text-2xl">
            How to Access & Read CAG Reports
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            The Comptroller and Auditor General publishes dozens of audit reports every year covering
            defense procurement, railways, highway construction, and central welfare schemes.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5">
              <span className="font-bold text-slate-900 block">1. Union Reports</span>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Filter by "Union Government" to find national audits on Bharatmala highways, Ayushman
                Bharat, or Ministry of Defence capital outlays.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5">
              <span className="font-bold text-slate-900 block">2. State Reports</span>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Search by specific state name to find performance audits of state departments, irrigation
                projects, and public health infrastructure.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#FAF8F5] p-3.5">
              <span className="font-bold text-slate-900 block">3. Action Taken Notes</span>
              <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                Check whether the concerned ministry responded to the audit observation or whether
                remedial recoveries were ordered by Parliament's PAC.
              </p>
            </div>
          </div>
        </div>

        {/* Tool 4: Right to Information (RTI) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <Scale size={16} strokeWidth={1.5} />
            <span>Tool 4 · Legal Framework</span>
          </div>
          <h2 className="mt-2 text-xl font-bold font-serif text-slate-900 sm:text-2xl">
            Filing RTI Requests on Public Expenditure
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Under the Right to Information Act 2005, every Indian citizen has the statutory right to
            request public finance documents from Public Information Officers (PIOs) across Union and state bodies.
          </p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-[#FAF8F5] p-4 text-xs text-slate-700 leading-relaxed space-y-2">
            <p className="font-bold text-slate-900">Documents you can legally inspect:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Tender & Contract Award Documents:</strong> Bid comparison statements, tender evaluation committee minutes, and technical sanction orders.</li>
              <li><strong>Measurement Books (MB):</strong> Certified engineering measurements recording the actual length, depth, and quality of asphalt laid.</li>
              <li><strong>Utilization Certificates (UC):</strong> Statutory affidavits submitted by district collectors confirming that central grants were spent on the sanctioned work.</li>
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-amber-900">
            <div className="flex items-start gap-2">
              <Info size={16} strokeWidth={1.5} className="shrink-0 mt-0.5 text-amber-800" />
              <p className="leading-relaxed">
                <strong>Statutory Limits:</strong> Under Section 8 of the RTI Act, disclosures that compromise
                national sovereignty, strategic defense systems, cabinet discussions before decisions, or
                private commercial trade secrets are legally exempt from public disclosure.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="rounded-2xl border border-[#143025] bg-[#1A3D2F] p-6 text-white sm:p-8 shadow-md">
          <h3 className="text-xl font-extrabold font-serif">Quick Checklist: How to Verify a Government Expenditure Claim</h3>
          <p className="mt-1 text-xs text-slate-300">
            Follow these 4 checks before accepting a public claim or social media headline.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-xl bg-white/10 p-3.5">
              <span className="font-bold text-emerald-300 block">1. Check BE vs Actuals</span>
              <p className="mt-1 text-slate-300 text-[11px] leading-relaxed">
                Is the announced figure an approved legislative ceiling (Budget Estimate) or money actually disbursed through the treasury?
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-3.5">
              <span className="font-bold text-emerald-300 block">2. Verify Physical Completion</span>
              <p className="mt-1 text-slate-300 text-[11px] leading-relaxed">
                Has a Completion Certificate and final Utilization Certificate been tabled, or is the money still unspent in an escrow account?
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-3.5">
              <span className="font-bold text-emerald-300 block">3. Separate Capex from Revenue</span>
              <p className="mt-1 text-slate-300 text-[11px] leading-relaxed">
                Did the expenditure create physical productive assets (roads, railways) or was it spent on recurrent salaries and fuel?
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-3.5">
              <span className="font-bold text-emerald-300 block">4. Inspect CAG Observations</span>
              <p className="mt-1 text-slate-300 text-[11px] leading-relaxed">
                Did the CAG audit note cost overruns, idle assets, or deviations from the sanctioned Detailed Project Report (DPR)?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
