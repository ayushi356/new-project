import React, { useState } from 'react';
import {
  FileText,
  Building,
  Coins,
  Send,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  Info,
  ExternalLink,
  HelpCircle,
  BadgeCheck,
} from 'lucide-react';
import { useNavigate } from '@/lib/router';
import { EditorialIconContainer } from '@/components/EditorialIcon';

export function GovernanceProcessDiagram() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      stepNumber: 1,
      title: 'Election Manifesto / Promise',
      shortTitle: '1. Promise',
      icon: BadgeCheck,
      whatHappens:
        'A political party announces a pledge during general or state elections (e.g. 2 crore jobs/year, farm loan waivers, ₹2,000 monthly cash transfers, free electricity). At this stage, it has NO legal or financial backing.',
      citizenCheck:
        'Was this promise written into the official election manifesto, or was it informal campaign rhetoric (e.g., "Chunavi Jumla")?',
      whereToTrack: 'Manifesto Reality Check Directory',
      navPath: '/promises',
      redFlag: 'Promises announced without cost estimation or source of revenue.',
    },
    {
      stepNumber: 2,
      title: 'Cabinet Sanction / Legislative Bill',
      shortTitle: '2. Law & Policy',
      icon: Building,
      whatHappens:
        'Upon forming government, the cabinet drafts a bill or executive order. For welfare schemes (e.g. PM-KISAN, MGNREGA, Kanyashree), guidelines and eligibility rules are notified in the official Gazette of India or State Gazette.',
      citizenCheck:
        'Was the bill debated in Parliament/Assembly, or passed via ordinance without parliamentary scrutiny?',
      whereToTrack: 'Works & Legislative Records',
      navPath: '/works',
      redFlag: 'Executive rules that dilute original legislative intent.',
    },
    {
      stepNumber: 3,
      title: 'Budget Allocation (BE)',
      shortTitle: '3. Allocation (BE)',
      icon: Coins,
      whatHappens:
        'The Finance Minister presents the annual budget. Parliament votes on Demands for Grants, establishing the Budget Estimate (BE)—the legal ceiling of what the ministry can spend in that financial year.',
      citizenCheck:
        'Is the allocation realistic for the declared target population, or is it tokenistic?',
      whereToTrack: 'Tax & Public Money / Budget Allocations',
      navPath: '/public-money',
      redFlag: 'Massive scheme target claimed with disproportionately small financial allocation.',
    },
    {
      stepNumber: 4,
      title: 'Public Expenditure & Procurement',
      shortTitle: '4. Cash Spend',
      icon: Send,
      whatHappens:
        'Treasury releases funds to central and state implementing agencies. Contracts and tenders are awarded via GeM (Government e-Marketplace), or direct cash transfers (DBT) are initiated to bank accounts.',
      citizenCheck:
        'What was the Revised Estimate (RE) vs Actual Spend? Did the ministry surrender unspent funds before March 31?',
      whereToTrack: 'Actual Expenditure & Contract Records',
      navPath: '/public-money',
      redFlag: 'Surrender of funds earmarked for women safety, nutrition, or healthcare.',
    },
    {
      stepNumber: 5,
      title: 'Ground Delivery & Beneficiary Impact',
      shortTitle: '5. Ground Reality',
      icon: CheckCircle2,
      whatHappens:
        'Citizens receive the service (e.g. tap water connection, gas cylinder, hospital treatment, school upgrade). Ground outcomes are evaluated through independent surveys (NFHS, NSSO, PLFS).',
      citizenCheck:
        'Did the claimed benefits reach the intended vulnerable groups, or were people excluded due to biometric or documentation barriers?',
      whereToTrack: 'Government Yojnas Implementation Tracker',
      navPath: '/yojnas',
      redFlag: '100% paper saturation claimed while independent surveys show wide ground gaps.',
    },
    {
      stepNumber: 6,
      title: 'Audit & Independent Scrutiny',
      shortTitle: '6. CAG Audit',
      icon: ShieldAlert,
      whatHappens:
        'The Comptroller & Auditor General (CAG) conducts independent performance audits, examining whether public money was spent economically, efficiently, and effectively. Investigative press and courts review violations.',
      citizenCheck:
        'What were the CAG audit findings tabled in Parliament? Did parliamentary committees follow up with Action Taken Reports?',
      whereToTrack: 'CAG Audits & Findings / Media Scrutiny',
      navPath: '/public-money',
      redFlag: 'Audit reports delayed or tabled without parliamentary debate.',
    },
  ];

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-2xs sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5E0D8] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <Info size={14} strokeWidth={1.5} />
            <span>Civic Literacy Diagram</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-[#181A19] sm:text-2xl mt-0.5">
            How a Policy Moves from Campaign to Reality
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#4A524D] max-w-2xl leading-relaxed">
            Follow the 6 stages of public governance. Click any step to see what happens, what citizens should inspect, and where to track it across this platform.
          </p>
        </div>
      </div>

      {/* Interactive Process Stepper (Horizontal on desktop, scrollable on mobile) */}
      <div className="mt-6 flex items-center justify-between gap-1 overflow-x-auto pb-2">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <React.Fragment key={st.stepNumber}>
              <button
                onClick={() => setActiveStep(idx)}
                className={`group flex flex-col items-center gap-1.5 rounded-xl px-2.5 py-2 transition min-w-[95px] text-center shrink-0 cursor-pointer border ${
                  isActive
                    ? 'border-[#1A3D2F] bg-[#1A3D2F] text-white shadow-2xs'
                    : isPassed
                    ? 'border-[#E5E0D8] bg-[#F5F2EB] text-[#181A19] hover:bg-[#FAF8F5]'
                    : 'border-transparent text-[#717A74] hover:bg-[#FAF8F5]'
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'border border-[#E5E0D8] bg-[#FAF8F5] text-[#1A3D2F] group-hover:bg-[#F5F2EB]'
                  }`}
                >
                  <Icon size={15} strokeWidth={1.5} />
                </span>
                <span className="text-[11px] font-bold leading-tight line-clamp-1">
                  {st.shortTitle}
                </span>
              </button>

              {idx < steps.length - 1 && (
                <ArrowRight size={13} strokeWidth={1.5} className="text-[#C8C2B5] shrink-0 hidden sm:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="mt-6 rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5]/70 p-5 sm:p-6 transition">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <EditorialIconContainer
              icon={CurrentIcon}
              size="lg"
              variant="active"
              className="mt-0.5"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C6460]">
                  Stage {current.stepNumber} of 6
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#181A19] sm:text-xl mt-0.5">
                {current.title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#4A524D] leading-relaxed">
                {current.whatHappens}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(current.navPath)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1A3D2F] hover:bg-[#143025] px-4 py-2 text-xs font-bold text-white transition shrink-0 shadow-2xs self-start cursor-pointer"
          >
            <span>Track in {current.whereToTrack}</span>
            <ArrowRight size={13} strokeWidth={1.5} />
          </button>
        </div>

        {/* 2-Column Citizen Checklist & Red Flag */}
        <div className="mt-5 grid grid-cols-1 gap-3.5 pt-4 border-t border-[#E5E0D8] sm:grid-cols-2 text-xs">
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-3.5">
            <p className="font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 size={15} strokeWidth={1.5} className="text-emerald-700 shrink-0" />
              <span>What Citizens Should Check:</span>
            </p>
            <p className="mt-1 text-emerald-900 leading-relaxed pl-5">
              {current.citizenCheck}
            </p>
          </div>

          <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-3.5">
            <p className="font-bold text-amber-950 flex items-center gap-1.5">
              <ShieldAlert size={15} strokeWidth={1.5} className="text-amber-700 shrink-0" />
              <span>Red Flag to Watch For:</span>
            </p>
            <p className="mt-1 text-amber-900 leading-relaxed pl-5">
              {current.redFlag}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
