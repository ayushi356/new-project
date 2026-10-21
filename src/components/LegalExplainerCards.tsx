import React, { useState } from 'react';
import {
  Gavel,
  ShieldAlert,
  FileCheck2,
  Scale,
  Building,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { EditorialIconContainer } from '@/components/EditorialIcon';

export interface ConceptItem {
  term: string;
  shortTag: string;
  icon: any;
  plainLanguageSummary: string;
  whatItMeansForCitizens: string;
  constitutionalContext: string;
  commonMisconception: string;
}

export const LEGAL_CONCEPTS: ConceptItem[] = [
  {
    term: 'UAPA (Unlawful Activities Prevention Act)',
    shortTag: 'Anti-Terror Statute',
    icon: ShieldAlert,
    plainLanguageSummary:
      'India’s primary anti-terrorism law. Unlike ordinary criminal law where bail is a rule, under Section 43D(5) of UAPA, bail is nearly impossible if the court finds prima facie evidence, leading to years of pre-trial detention.',
    whatItMeansForCitizens:
      'When journalists or activists are booked under UAPA (e.g. Siddique Kappan, Prabir Purkayastha), they can spend years in jail before trial even begins, even if charges are later dismissed.',
    constitutionalContext:
      'Amended in 2019 to allow the central government to designate individuals as terrorists. The Supreme Court in 2024 ruled that arrests without serving written grounds violate Article 22(1).',
    commonMisconception:
      'Misconception: Being charged under UAPA means guilt is proven. Reality: Conviction rate in UAPA cases is under 3% nationally.',
  },
  {
    term: 'Section 144 CrPC / BNSS Prohibitory Orders',
    shortTag: 'Public Assembly Ban',
    icon: Gavel,
    plainLanguageSummary:
      'An executive order issued by an Executive Magistrate or Police Commissioner prohibiting gatherings of four or more people, holding protests, or carrying weapons in a designated public area.',
    whatItMeansForCitizens:
      'Authorities frequently impose Section 144 across entire cities during farmer protests, university strikes, or civil rallies, making peaceful assembly legally punishable.',
    constitutionalContext:
      'Must satisfy the test of "imminent danger" or public tranquility. In the Anuradha Bhasin case, the Supreme Court ruled Section 144 cannot be used as an arbitrary tool to prevent democratic dissent.',
    commonMisconception:
      'Misconception: Imposing Section 144 automatically permits indefinite mobile internet bans. Reality: Telecom shutdowns require separate orders under Telecom Suspension Rules.',
  },
  {
    term: 'Article 361: Constitutional Immunity for Governors',
    shortTag: 'Executive Immunity',
    icon: Scale,
    plainLanguageSummary:
      'Under Article 361 of the Constitution, no criminal proceedings can be instituted or continued against the President of India or a State Governor during their term of office, nor can any court issue an arrest warrant.',
    whatItMeansForCitizens:
      'If serious allegations (such as sexual harassment or corruption) arise involving a sitting Governor, police cannot investigate or file a chargesheet until the tenure concludes or the President removes them.',
    constitutionalContext:
      'Designed to protect the dignity of the head of state from frivolous partisan litigation. Challenged before the Supreme Court in 2024 regarding female staff complaints in Raj Bhavan.',
    commonMisconception:
      'Misconception: Article 361 provides permanent lifelong immunity. Reality: Immunity only lasts while holding the office; once the term ends, criminal proceedings can resume.',
  },
  {
    term: 'CAG Performance Audit vs Financial Audit',
    shortTag: 'Constitutional Scrutiny',
    icon: FileCheck2,
    plainLanguageSummary:
      'A Financial Audit checks if money was spent in accordance with accounting rules. A Performance Audit evaluates whether a public project achieved its intended objective with Economy, Efficiency, and Effectiveness (the 3 Es).',
    whatItMeansForCitizens:
      'CAG performance audits (like the Bharatmala highway or Ayushman Bharat audits) reveal whether citizens received value for their tax money or if costs were inflated.',
    constitutionalContext:
      'The CAG is an independent constitutional authority under Article 148, reporting to Parliament and State Legislatures via the Public Accounts Committee (PAC).',
    commonMisconception:
      'Misconception: A CAG audit finding of procedural irregularity automatically proves criminal corruption. Reality: It identifies systemic wastage and non-compliance, which requires follow-up investigation.',
  },
  {
    term: 'SIT (Special Investigation Team) vs CBI Investigation',
    shortTag: 'Investigative Mandate',
    icon: Building,
    plainLanguageSummary:
      'A Special Investigation Team (SIT) is constituted by a State Government or High Court with state police officers to investigate a specific localized crime. The Central Bureau of Investigation (CBI) is a premier federal agency under the Central Government (DoPT).',
    whatItMeansForCitizens:
      'In high-profile crimes (such as RG Kar, Sandeshkhali, or Gauri Lankesh), families often demand a CBI or court-monitored SIT probe when they distrust the local state police.',
    constitutionalContext:
      'Under the DSPE Act, the CBI requires state government consent to investigate state cases, unless directly ordered by the High Court or Supreme Court under Article 32 or 226.',
    commonMisconception:
      'Misconception: Transferring a case to the CBI guarantees instant resolution. Reality: CBI chargesheets can take years, and the agency faces criticism over selective federal priorities.',
  },
];

export function LegalExplainerCards() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex items-center gap-2 pb-3 border-b border-[#E5E0D8]">
        <EditorialIconContainer icon={HelpCircle} size="sm" variant="ivory" />
        <div>
          <h4 className="text-base font-serif font-bold text-[#181A19]">
            Plain-Language Legal & Civic Concepts Explained
          </h4>
          <p className="text-xs text-[#5C6460]">
            Demystifying legal terms frequently seen in protest, police, and governance reports
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LEGAL_CONCEPTS.map((concept, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5]/60 p-4 transition hover:bg-white hover:border-[#C8C2B5] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <EditorialIconContainer icon={concept.icon} size="sm" variant="ivory" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6460]">
                      {concept.shortTag}
                    </span>
                  </div>
                </div>

                <h5 className="font-serif font-bold text-[#181A19] text-sm mt-2.5">{concept.term}</h5>
                <p className="mt-1 text-xs text-[#4A524D] leading-relaxed">
                  {concept.plainLanguageSummary}
                </p>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-[#E5E0D8] space-y-2 text-xs animate-in fade-in duration-150">
                    <div className="rounded-lg bg-white p-2.5 border border-[#E5E0D8]">
                      <strong className="text-[#1A3D2F] block font-bold text-[11px]">
                        What it Means for Citizens:
                      </strong>
                      <span className="text-[#4A524D] text-[11px] leading-tight block mt-0.5">
                        {concept.whatItMeansForCitizens}
                      </span>
                    </div>

                    <div className="rounded-lg bg-[#FAF8F5] p-2.5 border border-[#E5E0D8]">
                      <strong className="text-[#B45309] block font-bold text-[11px]">
                        Common Misconception:
                      </strong>
                      <span className="text-[#4A524D] text-[11px] leading-tight block mt-0.5">
                        {concept.commonMisconception}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="mt-3 pt-2 border-t border-[#E5E0D8]/60 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A3D2F] hover:text-[#143025] cursor-pointer"
              >
                <span>{isExpanded ? 'Less' : 'Citizen Context & Constitutional Basis'}</span>
                {isExpanded ? (
                  <ChevronUp size={12} strokeWidth={1.5} />
                ) : (
                  <ChevronDown size={12} strokeWidth={1.5} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
