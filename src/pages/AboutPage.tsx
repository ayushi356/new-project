import { useState } from 'react';
import {
  Scale,
  Search,
  ShieldCheck,
  Users,
  Landmark,
  FileText,
  BadgeCheck,
  AlertTriangle,
  Coins,
  Trees,
  Newspaper,
  FileCheck2,
  UserCheck,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  Send,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from '@/lib/router';
import { EditorialIconContainer } from '@/components/EditorialIcon';

interface CorrectionSubmission {
  id: string;
  pageOrRecord: string;
  errorDescription: string;
  sourceUrl?: string;
  submittedAt: string;
}

export function AboutPage() {
  const navigate = useNavigate();

  // Corrections form state
  const [pageOrRecord, setPageOrRecord] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [formErrors, setFormErrors] = useState<{ pageOrRecord?: string; errorDescription?: string; sourceUrl?: string }>({});
  const [submittedRecord, setSubmittedRecord] = useState<CorrectionSubmission | null>(null);

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { pageOrRecord?: string; errorDescription?: string; sourceUrl?: string } = {};

    if (!pageOrRecord.trim()) {
      errors.pageOrRecord = 'Please specify the affected page, minister, scheme, or record title.';
    }

    if (!errorDescription.trim()) {
      errors.errorDescription = 'Please describe the suspected error, outdated status, or missing context.';
    } else if (errorDescription.trim().length < 10) {
      errors.errorDescription = 'Please provide a more detailed description (at least 10 characters).';
    }

    if (sourceUrl.trim()) {
      try {
        const parsed = new URL(sourceUrl.trim());
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          errors.sourceUrl = 'Please enter a valid web URL starting with http:// or https://';
        }
      } catch {
        errors.sourceUrl = 'Please enter a valid web URL (e.g., https://example.gov.in/order.pdf)';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const newSubmission: CorrectionSubmission = {
      id: `corr-${Date.now().toString(36)}`,
      pageOrRecord: pageOrRecord.trim(),
      errorDescription: errorDescription.trim(),
      sourceUrl: sourceUrl.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    // Store in localStorage for persistent auditable record
    try {
      const existing: CorrectionSubmission[] = JSON.parse(localStorage.getItem('bgt_corrections') || '[]');
      existing.push(newSubmission);
      localStorage.setItem('bgt_corrections', JSON.stringify(existing));
    } catch {
      // Ignore localStorage availability issues
    }

    setSubmittedRecord(newSubmission);
    setPageOrRecord('');
    setErrorDescription('');
    setSourceUrl('');
  };

  const handleCardClick = (target: string) => {
    if (target.startsWith('#')) {
      const el = document.getElementById(target.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(target);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 text-[#181A19]">
      {/* Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3.5 py-1 text-xs font-semibold text-[#1A3D2F]">
        <Scale size={14} strokeWidth={1.5} />
        <span>Civic Accountability & Methodology</span>
      </div>

      <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#181A19]">
        About Bharat Governance Tracker
      </h1>

      {/* =========================================================================
          1. ABOUT THE PROJECT
         ========================================================================= */}
      <section className="mt-8 space-y-4 text-base sm:text-lg leading-relaxed text-[#4A524D]">
        <p>
          <strong className="text-[#181A19]">Bharat Governance Tracker</strong> is an independent civic-accountability research project created to make India's public record transparent, structured, and easy to explore.
        </p>
        <p>
          The platform documents executive government decisions, public expenditure, parliamentary records, welfare commitments, and documented societal outcomes using publicly accessible official documentation, court dockets, constitutional audits, and credible reporting.
        </p>

        {/* Creator Note Component */}
        <div className="mt-6 rounded-2xl border border-[#E5E0D8] bg-[#F5F2EB] p-6 sm:p-7 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <UserCheck size={16} strokeWidth={1.5} />
            <span>Creator Note · An Individual Civic Initiative</span>
          </div>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#4A524D]">
            <p>
              Bharat Governance Tracker is created, designed, and maintained as an independent personal initiative rather than by a newsroom, think tank, political party, or funded organization.
            </p>
            <p>
              The platform does not operate as a commercial enterprise or political lobbying entity. Its aim is to provide an accessible, structured public archive so citizens, researchers, and journalists can inspect the evidence and reach their own informed conclusions.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WHY IT EXISTS
         ========================================================================= */}
      <section className="mt-14 border-t border-[#E5E0D8] pt-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
          <HelpCircle size={16} strokeWidth={1.5} />
          <span>Purpose & Motivation</span>
        </div>
        <h2 className="mt-2 font-serif text-2xl font-bold text-[#181A19] sm:text-3xl">
          Why It Exists
        </h2>
        <div className="mt-4 space-y-3 text-sm sm:text-base leading-relaxed text-[#4A524D]">
          <p>
            Public records in India are extensive but fragmented. Official gazettes, parliamentary question-hour replies, Comptroller & Auditor General (CAG) audit findings, budget actuals from the Controller General of Accounts, and judicial rulings are published across dozens of disconnected departmental websites and legal registries.
          </p>
          <p>
            This fragmentation makes it difficult for ordinary citizens to follow policy lifecycles, verify campaign pledges against actual delivery, or evaluate how public money is utilized.
          </p>
          <p>
            Bharat Governance Tracker organizes these disparate public records into structured, cross-referenced dossiers. By presenting documented facts alongside primary source citations, the project enables readers to examine what occurred during an administration without relying on political rhetoric or partisan commentary.
          </p>
        </div>
      </section>

      {/* =========================================================================
          3. WHAT THE PLATFORM COVERS
         ========================================================================= */}
      <section className="mt-14 border-t border-[#E5E0D8] pt-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
          <FileCheck2 size={16} strokeWidth={1.5} />
          <span>Research Taxonomy</span>
        </div>
        <h2 className="mt-2 font-serif text-2xl font-bold text-[#181A19] sm:text-3xl">
          What the Platform Covers
        </h2>
        <p className="mt-2 text-sm text-[#525A55]">
          A structured taxonomy covering ten core facets of Indian democratic governance:
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SectionCard
            icon={Landmark}
            title="Political Parties and Ideological Tenures"
            body="Major national and regional political parties, their founding platforms, representation footprints, and legislative tenures."
            onClick={() => handleCardClick('/parties')}
          />
          <SectionCard
            icon={Users}
            title="Ministers and Executive Accountability"
            body="Union Council of Ministers directory, ministerial portfolios, tenure timelines, and key executive decisions."
            onClick={() => handleCardClick('/ministers')}
          />
          <SectionCard
            icon={Coins}
            title="Tax and Public Money"
            body="The Citizen’s Rupee breakdown, Union and state budgetary allocations, capital expenditure trends, and CAG constitutional audits."
            onClick={() => handleCardClick('/public-money')}
          />
          <SectionCard
            icon={FileCheck2}
            title="Works, Reforms, and Scrutiny"
            body="Major policy initiatives, infrastructure rollouts, and documented controversies evaluated alongside delivery data."
            onClick={() => handleCardClick('/works')}
          />
          <SectionCard
            icon={FileText}
            title="Welfare Schemes (Yojnas)"
            body="Government schemes tracked separately: officially announced launch targets compared against verified ground delivery data."
            onClick={() => handleCardClick('/yojnas')}
          />
          <SectionCard
            icon={BadgeCheck}
            title="Election Manifesto Pledges"
            body="Campaign commitments tracked across election cycles to determine whether each pledge was kept, partially delivered, or stalled."
            onClick={() => handleCardClick('/promises')}
          />
          <SectionCard
            icon={Trees}
            title="Environment, Forests, and Land"
            body="Statutory clearances, Gram Sabha consents, biodiversity impacts, and Supreme Court environmental directives."
            onClick={() => handleCardClick('/environment')}
          />
          <SectionCard
            icon={AlertTriangle}
            title="Major Incidents and Inquiries"
            body="Source-linked documentation of civil crises, mass student and farmer agitations, and state responses, with civilian impact made explicit."
            onClick={() => handleCardClick('/incidents')}
          />
          <SectionCard
            icon={Newspaper}
            title="Media and Press Freedom"
            body="Eight core benchmarks examining journalist safety, corporate ownership concentration, emergency regulatory orders, and direct press access."
            onClick={() => handleCardClick('/press-freedom')}
          />
          <SectionCard
            icon={Search}
            title="Primary Sources and Citations"
            body="Direct links to government gazettes, CAG audit portals, court dockets, and verified public records across every dossier."
            onClick={() => handleCardClick('#sources-and-verification')}
          />
        </div>
      </section>

      {/* =========================================================================
          4. EDITORIAL STANDARDS
         ========================================================================= */}
      <section className="mt-14 border-t border-[#E5E0D8] pt-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
          <ShieldCheck size={16} strokeWidth={1.5} />
          <span>Core Principles</span>
        </div>
        <h2 className="mt-2 font-serif text-2xl font-bold text-[#181A19] sm:text-3xl">
          Editorial Standards
        </h2>

        <div className="mt-6 rounded-2xl border border-[#E5E0D8] bg-white p-6 sm:p-7 shadow-2xs space-y-4 text-sm leading-relaxed text-[#4A524D]">
          <div>
            <h3 className="font-serif text-base font-bold text-[#181A19]">Non-Partisanship</h3>
            <p className="mt-1">
              Bharat Governance Tracker does not endorse, support, or oppose any political party, candidate, or coalition. The project applies uniform criteria and scrutiny across governing and opposition parties alike.
            </p>
          </div>

          <div className="border-t border-[#F0EBE1] pt-3">
            <h3 className="font-serif text-base font-bold text-[#181A19]">Evidence-Based Reporting</h3>
            <p className="mt-1">
              Dossiers are compiled from verifiable public records rather than opinion columns or political speeches. Claims are presented alongside their primary documentation so readers can evaluate the evidence directly.
            </p>
          </div>

          <div className="border-t border-[#F0EBE1] pt-3">
            <h3 className="font-serif text-base font-bold text-[#181A19]">Distinction Between Allegations and Established Findings</h3>
            <p className="mt-1">
              An allegation, police First Information Report (FIR), or political press release is never presented as an established judicial finding. The platform explicitly distinguishes ongoing inquiries and allegations from conclusive court rulings and constitutional audit findings.
            </p>
          </div>

          <div className="border-t border-[#F0EBE1] pt-3">
            <h3 className="font-serif text-base font-bold text-[#181A19]">Context and Causation</h3>
            <p className="mt-1">
              A clear distinction is maintained between tenure and causation: an event occurring during an administration does not by itself prove that the administration caused it. Records focus on what occurred, the official statutory responses that followed, and what the available documentation establishes.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SOURCES AND VERIFICATION
         ========================================================================= */}
      <section id="sources-and-verification" className="scroll-mt-20 mt-14 border-t border-[#E5E0D8] pt-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
          <Search size={16} strokeWidth={1.5} />
          <span>Documentation Methodology</span>
        </div>
        <h2 className="mt-2 font-serif text-2xl font-bold text-[#181A19] sm:text-3xl">
          Sources and Verification
        </h2>
        <p className="mt-2 text-sm text-[#525A55]">
          How information is sourced, categorized, and evaluated across the platform:
        </p>

        <div className="mt-6 rounded-2xl border border-[#E5E0D8] bg-white p-6 sm:p-7 shadow-2xs space-y-4 text-sm leading-relaxed text-[#4A524D]">
          <div>
            <h3 className="font-serif text-base font-bold text-[#181A19]">1. Preference for Primary Sources</h3>
            <p className="mt-1">
              Whenever accessible, records prioritize certified court orders, official gazette notifications, Controller General of Accounts (CGA) audited actuals, parliamentary replies, and Comptroller & Auditor General (CAG) performance audits. Credible news reporting is referenced when primary institutional reports are unavailable.
            </p>
          </div>

          <div className="border-t border-[#F0EBE1] pt-3">
            <h3 className="font-serif text-base font-bold text-[#181A19]">2. Linking Claims to Supporting Documents</h3>
            <p className="mt-1">
              Every profile, financial figure, and milestone cites a specific document title, official gazette reference, or source URL to allow direct reader verification.
            </p>
          </div>

          <div className="border-t border-[#F0EBE1] pt-3">
            <h3 className="font-serif text-base font-bold text-[#181A19]">3. Distinguishing Official Statements from Established Outcomes</h3>
            <p className="mt-1">
              Announcements, targets, and launch press releases are classified as official claims until independent implementation data, audit findings, or judicial determinations substantiate ground delivery.
            </p>
          </div>

          <div className="border-t border-[#F0EBE1] pt-3">
            <h3 className="font-serif text-base font-bold text-[#181A19]">4. Explicit Dates and Time-Sensitive Context</h3>
            <p className="mt-1">
              Administrative tenures, portfolio reallocations, and policy milestones include explicit effective dates to reflect changing realities (e.g., distinguishing currently serving ministers from former portfolio holders).
            </p>
          </div>

          <div className="border-t border-[#F0EBE1] pt-3">
            <h3 className="font-serif text-base font-bold text-[#181A19]">5. Identifying Uncertainty and Conflicting Records</h3>
            <p className="mt-1">
              When government departments publish divergent figures or evidence remains inconclusive, the conflict is documented rather than resolved through arbitrary assumptions.
            </p>
          </div>

          <div className="border-t border-[#F0EBE1] pt-3">
            <h3 className="font-serif text-base font-bold text-[#181A19]">6. Transparency Disclaimer</h3>
            <p className="mt-1 text-xs text-[#737A74] italic">
              Bharat Governance Tracker does not claim that every record has been independently verified through field investigation, or that every institutional source is infallible. The project presents what is verifiable on the public record, clearly noting limitations where documentation is incomplete.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CORRECTIONS AND FEEDBACK
         ========================================================================= */}
      <section className="mt-14 border-t border-[#E5E0D8] pt-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
          <FileCheck2 size={16} strokeWidth={1.5} />
          <span>Public Review Protocol</span>
        </div>
        <h2 className="mt-2 font-serif text-2xl font-bold text-[#181A19] sm:text-3xl">
          Corrections and Feedback
        </h2>
        <p className="mt-2 text-sm text-[#525A55]">
          Auditable accuracy is essential. If you notice an error, outdated legal status, broken source, or missing context in any record, please submit a correction below.
        </p>

        {submittedRecord ? (
          <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50/80 p-6 shadow-2xs text-emerald-950">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={24} className="text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif text-lg font-bold text-emerald-900">
                  Correction Submitted Successfully
                </h3>
                <p className="mt-1 text-sm text-emerald-800">
                  Your correction regarding <strong>"{submittedRecord.pageOrRecord}"</strong> has been logged locally with reference ID{' '}
                  <code className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-mono font-bold text-emerald-900">
                    {submittedRecord.id}
                  </code>
                  .
                </p>
                <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-3.5 text-xs text-[#4A524D]">
                  <p><strong>Reported Issue:</strong> {submittedRecord.errorDescription}</p>
                  {submittedRecord.sourceUrl && (
                    <p className="mt-1 truncate">
                      <strong>Supporting URL:</strong>{' '}
                      <a href={submittedRecord.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#1A3D2F] underline">
                        {submittedRecord.sourceUrl}
                      </a>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSubmittedRecord(null)}
                  className="mt-4 rounded-xl bg-[#1A3D2F] px-4 py-2 text-xs font-semibold text-white hover:bg-[#143025] transition cursor-pointer"
                >
                  Submit Another Correction
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCorrectionSubmit} className="mt-6 rounded-2xl border border-[#E5E0D8] bg-white p-6 sm:p-7 shadow-2xs space-y-4">
            <div>
              <label htmlFor="pageOrRecord" className="block text-xs font-bold uppercase tracking-wider text-[#181A19]">
                Affected Page or Record <span className="text-rose-600">*</span>
              </label>
              <input
                id="pageOrRecord"
                type="text"
                value={pageOrRecord}
                onChange={(e) => setPageOrRecord(e.target.value)}
                placeholder="e.g. Ministry of Education, PM-JAY Yojna, Union Budget Capex, or Page URL"
                className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#181A19] placeholder-[#737A74] focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]/20 transition ${
                  formErrors.pageOrRecord ? 'border-rose-400 bg-rose-50/20' : 'border-[#D5CFCE] bg-[#FAF8F5] focus:border-[#1A3D2F] focus:bg-white'
                }`}
              />
              {formErrors.pageOrRecord && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.pageOrRecord}</p>
              )}
            </div>

            <div>
              <label htmlFor="errorDescription" className="block text-xs font-bold uppercase tracking-wider text-[#181A19]">
                Description of Suspected Error or Missing Context <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="errorDescription"
                rows={4}
                value={errorDescription}
                onChange={(e) => setErrorDescription(e.target.value)}
                placeholder="Please explain what is incorrect, outdated, or incomplete, and what the verified factual position is."
                className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#181A19] placeholder-[#737A74] focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]/20 transition ${
                  formErrors.errorDescription ? 'border-rose-400 bg-rose-50/20' : 'border-[#D5CFCE] bg-[#FAF8F5] focus:border-[#1A3D2F] focus:bg-white'
                }`}
              />
              {formErrors.errorDescription && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.errorDescription}</p>
              )}
            </div>

            <div>
              <label htmlFor="sourceUrl" className="block text-xs font-bold uppercase tracking-wider text-[#181A19]">
                Supporting Source URL <span className="text-xs font-normal text-[#737A74] normal-case">(Official Gazette, Court Order, or Audit Report)</span>
              </label>
              <input
                id="sourceUrl"
                type="text"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://example.gov.in/gazette-notification.pdf"
                className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#181A19] placeholder-[#737A74] focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]/20 transition ${
                  formErrors.sourceUrl ? 'border-rose-400 bg-rose-50/20' : 'border-[#D5CFCE] bg-[#FAF8F5] focus:border-[#1A3D2F] focus:bg-white'
                }`}
              />
              {formErrors.sourceUrl && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{formErrors.sourceUrl}</p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-[#737A74]">
                Submissions are reviewed against official gazettes and constitutional audit repositories before updates are published.
              </p>
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1A3D2F] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#143025] transition cursor-pointer"
              >
                <Send size={14} />
                <span>Submit Correction</span>
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Exploration Links */}
      <div className="mt-12 flex flex-wrap gap-3 border-t border-[#E5E0D8] pt-8">
        <button
          onClick={() => navigate('/parties')}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1A3D2F] px-5 py-3 text-sm font-bold text-white shadow-2xs transition hover:bg-[#143025] cursor-pointer"
        >
          <Landmark size={16} strokeWidth={1.5} /> Browse Parties
        </button>
        <button
          onClick={() => navigate('/ministers')}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
        >
          <Users size={16} strokeWidth={1.5} className="text-[#1A3D2F]" /> Council of Ministers
        </button>
        <button
          onClick={() => navigate('/public-money')}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
        >
          <Coins size={16} strokeWidth={1.5} className="text-[#1A3D2F]" /> Tax & Public Money
        </button>
        <button
          onClick={() => navigate('/environment')}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
        >
          <Trees size={16} strokeWidth={1.5} className="text-[#1A3D2F]" /> Environment & Land
        </button>
        <button
          onClick={() => navigate('/works')}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
        >
          <FileCheck2 size={16} strokeWidth={1.5} className="text-[#1A3D2F]" /> Browse All Works
        </button>
      </div>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  body,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-2xs flex gap-3.5 items-start transition ${
        onClick ? 'cursor-pointer hover:border-[#C8C2B5] hover:-translate-y-0.5 hover:shadow-xs' : ''
      }`}
    >
      <EditorialIconContainer icon={Icon} variant="ivory" size="md" iconSize={18} />
      <div>
        <h3 className="font-serif text-sm font-bold text-[#181A19]">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-[#525A55]">{body}</p>
      </div>
    </div>
  );
}
