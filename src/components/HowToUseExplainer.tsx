import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  Scale,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Gavel,
  ExternalLink,
  ChevronRight,
  Info,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface HowToUseExplainerProps {
  defaultOpen?: boolean;
}

export function HowToUseExplainer({ defaultOpen = false }: HowToUseExplainerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeTab, setActiveTab] = useState<'what' | 'explore' | 'evidence' | 'tenure' | 'corrections'>('what');

  const guideSections = [
    {
      id: 'what' as const,
      title: '1. Scope of Investigation',
      shortTitle: 'Scope & Coverage',
      icon: Compass,
      headline: 'A Non-Partisan Public Knowledge Platform',
      description:
        'Bharat Governance Tracker investigates public actions, decisions, and resource use by India’s governing institutions and political parties. The platform documents both landmark achievements and documented crises, backed entirely by traceable public documents.',
      points: [
        { label: 'Public Money & Tax', text: 'How ₹1 collected from taxes is allocated, where actual money was spent, and what the Comptroller & Auditor General (CAG) found in independent audits.' },
        { label: 'Welfare Schemes (Yojnas)', text: 'Comparing official government launch targets against ground delivery data verified through census, parliamentary questions, and independent evaluations.' },
        { label: 'Manifesto Promises', text: 'Tracking election pledges made across general and state elections to classify them as fulfilled, broken, partially delivered, or abandoned.' },
        { label: 'Major Crises & Protests', text: 'Chronological reporting of mass agitations (farmers, youth, doctors, women safety) with citizen demands, police responses, and judicial rulings.' },
        { label: 'Media & Press Freedom', text: 'Executive press accessibility, unscripted interviews, journalist safety cases, regulatory censorship, and internet shutdown records.' },
      ],
    },
    {
      id: 'explore' as const,
      title: '2. How to Explore',
      shortTitle: 'How to Browse',
      icon: Search,
      headline: 'Find Exactly What You Are Looking For',
      description:
        'You do not need prior political knowledge to explore this website. Every section offers multiple intuitive entry points for everyday citizens.',
      points: [
        { label: 'By Political Party', text: 'Visit the Parties tab or click any party card on the home page to view its comprehensive dossier: tenures, works, promises, spending, and legal records.' },
        { label: 'By Minister / Leader', text: 'Examine ministerial responsibilities, tenure timelines, key policy decisions, and verified unscripted press interview counts.' },
        { label: 'By State / Region', text: 'Use the India State Explorer on the homepage to see the governing party, active welfare schemes, and major documented incidents in your home state.' },
        { label: 'By Governance Topic', text: 'Use topic navigation to jump directly to Tax & Public Money, Media & Press Freedom, Government Yojnas, or Incidents & Protests.' },
      ],
    },
    {
      id: 'evidence' as const,
      title: '3. Evidentiary Tiers',
      shortTitle: 'Evidence Tiers',
      icon: Scale,
      headline: 'How to Distinguish Claims from Established Facts',
      description:
        'Not all statements have equal legal or evidentiary weight. Every record is classified into four distinct evidentiary tiers to clearly indicate its level of verification.',
      points: [
        {
          label: 'Tier 1: Established Judicial / Statutory Record',
          text: 'Rulings by the Supreme Court, High Courts, certified FIRs, official gazette notifications, or parliamentary answers. These represent undisputed facts established through legal process.',
        },
        {
          label: 'Tier 2: Constitutional Audit Findings',
          text: 'Reports by the Comptroller & Auditor General (CAG) of India, Election Commission of India (ECI), or statutory regulators. Highly reliable institutional oversight.',
        },
        {
          label: 'Tier 3: Verified Investigative Reporting',
          text: 'On-the-ground investigations by accredited press organizations with corroborating documents, on-record interviews, or satellite/forensic evidence.',
        },
        {
          label: 'Tier 4: Contested Allegation / Sub-Judice Claim',
          text: 'Claims made by a political party, government spokesperson, or complainant that remain pending adjudication in trial court. Marked clearly as "Disputed" or "Under Trial".',
        },
      ],
    },
    {
      id: 'tenure' as const,
      title: '4. Tenure vs. Causation',
      shortTitle: 'Tenure vs Causation',
      icon: AlertTriangle,
      headline: 'A Vital Rule for Fair Citizen Evaluation',
      description:
        'Why an event occurring during a government’s tenure does not automatically mean that the government caused it.',
      points: [
        {
          label: 'Distinguishing Federal Jurisdictions',
          text: 'Under the Indian Constitution, Law and Order and Police are State subjects (List II), while National Highways, Telecommunications, and Central Enforcement Agencies are Union subjects (List I). An incident in a state is the constitutional responsibility of the State Police, not automatically the Union Government, and vice versa.',
        },
        {
          label: 'Systemic / Inherited Issues vs Direct Orders',
          text: 'Some crises (like infrastructure maintenance backlogs or civil unrest) are legacy structural problems spanning decades, whereas executive policies (such as demonetization or new IT rules) are direct decisions by specific administrations.',
        },
        {
          label: 'Tenure Record Principles',
          text: 'Events during a tenure are recorded because governing leaders are accountable for their administration’s response, containment, and transparent communication—not to make sweeping causal accusations.',
        },
      ],
    },
    {
      id: 'corrections' as const,
      title: '5. Sources & Corrections',
      shortTitle: 'Sources & Corrections',
      icon: FileCheck2,
      headline: 'Inspect Original Documents & Submit Corrections',
      description:
        'Every record on this tracker includes public, verifiable citations. The platform maintains an open error-correction protocol.',
      points: [
        { label: 'Clickable Primary Links', text: 'Whenever a report, gazette notification, court order, or parliamentary debate is cited, direct public URLs are attached for independent citizen verification.' },
        { label: 'Open Public Audit', text: 'If any record contains factual errors, outdated case statuses, or missing context, citizens, researchers, and legal counsel can submit primary court orders or official gazettes.' },
        { label: '48-Hour Update SLA', text: 'Verified discrepancies backed by certified documents or final court rulings are reviewed and updated within 48 hours.' },
      ],
    },
  ];

  const currentSection = guideSections.find((s) => s.id === activeTab) ?? guideSections[0];

  return (
    <div className="w-full">
      {/* Inline Onboarding Banner (Visible on Home and Pages) */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white shadow-md sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Compass size={22} />
            </span>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-bold text-indigo-200 uppercase tracking-wider">
                <HelpCircle size={12} /> First Time Visitor Guide
              </div>
              <h2 className="mt-1 text-lg font-bold sm:text-xl text-white">
                How to Use the Bharat Governance Tracker
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Learn what this platform investigates, how to separate official claims from established facts, and why tenure does not equal causation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white transition shadow-sm"
            >
              <span>Open 5-Minute Citizen Guide</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Quick 4-Pill Highlights */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 pt-4 border-t border-white/10 sm:grid-cols-4 text-xs">
          <button
            onClick={() => { setActiveTab('what'); setIsOpen(true); }}
            className="flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 p-2 text-left transition border border-white/5"
          >
            <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
            <span className="font-medium text-slate-200 truncate">1. Scope & Coverage</span>
          </button>
          <button
            onClick={() => { setActiveTab('explore'); setIsOpen(true); }}
            className="flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 p-2 text-left transition border border-white/5"
          >
            <Search size={15} className="text-blue-400 shrink-0" />
            <span className="font-medium text-slate-200 truncate">2. How to Explore</span>
          </button>
          <button
            onClick={() => { setActiveTab('evidence'); setIsOpen(true); }}
            className="flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 p-2 text-left transition border border-white/5"
          >
            <Scale size={15} className="text-amber-400 shrink-0" />
            <span className="font-medium text-slate-200 truncate">3. Evidentiary Tiers</span>
          </button>
          <button
            onClick={() => { setActiveTab('tenure'); setIsOpen(true); }}
            className="flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 p-2 text-left transition border border-white/5"
          >
            <AlertTriangle size={15} className="text-rose-400 shrink-0" />
            <span className="font-medium text-slate-200 truncate">4. Tenure ≠ Causation</span>
          </button>
        </div>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                  <Compass size={18} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Citizen Guide: Navigating Governance & Public Accountability
                  </h3>
                  <p className="text-xs text-slate-300">
                    5 Essential principles for reading and verifying civic records
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-4 py-2 gap-1 text-xs font-semibold">
              {guideSections.map((sec) => {
                const Icon = sec.icon;
                const active = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveTab(sec.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 whitespace-nowrap transition ${
                      active
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{sec.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6 space-y-5 flex-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {currentSection.title}
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {currentSection.headline}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {currentSection.description}
                </p>
              </div>

              <div className="space-y-3">
                {currentSection.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-white hover:border-slate-300"
                  >
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                        {idx + 1}
                      </span>
                      {pt.label}
                    </p>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed pl-7">
                      {pt.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3.5 text-xs">
              <span className="text-slate-500">
                Independent, evidence-based, citizen-focused.
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800 transition"
              >
                Close & Start Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
