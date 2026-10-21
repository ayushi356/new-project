import {
  Scale,
  Search,
  ExternalLink,
  ShieldCheck,
  Users,
  Landmark,
  FileText,
  BadgeCheck,
  Flame,
  Coins,
  Trees,
  Radio,
  FileCheck2,
  Mail,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useNavigate } from '@/lib/router';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 text-[#181A19]">
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3.5 py-1 text-xs font-semibold text-[#1A3D2F]">
        <Scale size={14} />
        <span>Civic Transparency · Project Background</span>
      </div>

      <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[#181A19]">
        About Bharat Governance Tracker
      </h1>

      {/* Starting point draft as specified */}
      <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#4A524D]">
        <p>
          <strong className="text-[#181A19]">Bharat Governance Tracker</strong> is an independent civic-accountability project created to make India's public record easier to explore and understand.
        </p>
        <p>
          The aim is to document what governments and political actors do, how public money is used, what changes during their tenure, and what the available evidence establishes.
        </p>
        <p>
          The platform brings together public records, official documents, credible reporting and relevant data so citizens can examine the evidence and reach their own conclusions.
        </p>
        <p className="text-sm sm:text-base text-[#525A55] border-l-2 border-[#1A3D2F] pl-4 italic">
          This is an evolving project. Records may be incomplete, sources may change, and new evidence may alter the picture. Corrections, relevant documents and well-supported feedback are welcome.
        </p>
      </div>

      {/* Creator Note */}
      <div className="mt-10 rounded-2xl border border-[#E5E0D8] bg-[#F5F2EB] p-6 sm:p-7 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
          <UserCheck size={16} />
          <span>Creator Note</span>
        </div>
        <h2 className="mt-2 font-serif text-xl font-bold text-[#181A19]">
          An Individual Civic Initiative
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#4A524D]">
          <p>
            Bharat Governance Tracker is created, designed, and maintained as an independent personal project rather than by a team, newsroom, think tank, political party, or funded organization.
          </p>
          <p>
            I built this platform because finding and comparing verified public records across different administrations in India is often needlessly fragmented. The purpose is not to publish personal political commentary or promote any ideology, but to curate verifiable public documentation in a structured format that any citizen can inspect.
          </p>
          <p>
            The project does not operate as a registered institution or commercial company. Records are compiled from publicly accessible gazettes, parliamentary proceedings, audit reports, court dockets, and credible reporting.
          </p>
        </div>
      </div>

      {/* Platform Pillars */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold text-[#181A19]">
          What the Platform Covers
        </h2>
        <p className="mt-1 text-sm text-[#525A55]">
          A structured taxonomy for exploring different facets of Indian democratic governance:
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SectionCard
            icon={Landmark}
            tint="bg-orange-50 text-orange-700 border-orange-200"
            title="Parties & Ideological Tenures"
            body="Major national and regional political parties, their founding platforms, representation footprints, and legislative tenures."
          />
          <SectionCard
            icon={Users}
            tint="bg-blue-50 text-blue-700 border-blue-200"
            title="Ministers & Executive Accountability"
            body="Cabinet responsibilities, ministerial portfolios, tenure timelines, key policy decisions, and unscripted press availability."
          />
          <SectionCard
            icon={Coins}
            tint="bg-emerald-50 text-emerald-800 border-emerald-200"
            title="Tax & Public Money"
            body="The Citizen’s Rupee breakdown, Union and state budgetary allocations, capital expenditure trends, and Comptroller & Auditor General (CAG) performance audits."
          />
          <SectionCard
            icon={Scale}
            tint="bg-slate-100 text-slate-800 border-slate-200"
            title="Works, Reforms & Scrutiny"
            body="Major policy initiatives, infrastructure rollouts, and documented controversies evaluated alongside their economic and societal impact."
          />
          <SectionCard
            icon={FileText}
            tint="bg-sky-50 text-sky-700 border-sky-200"
            title="Welfare Schemes (Yojnas)"
            body="Government schemes tracked separately: officially announced launch targets compared against verified ground implementation data."
          />
          <SectionCard
            icon={BadgeCheck}
            tint="bg-purple-50 text-purple-700 border-purple-200"
            title="Election Manifesto Pledges"
            body="Campaign commitments tracked across election cycles to determine whether each pledge was kept, partially delivered, or abandoned."
          />
          <SectionCard
            icon={Trees}
            tint="bg-teal-50 text-teal-800 border-teal-200"
            title="Environment, Forests & Land"
            body="Statutory clearances, Gram Sabha consents, biodiversity impacts, and Supreme Court environmental directives through October 2026."
          />
          <SectionCard
            icon={Flame}
            tint="bg-rose-50 text-rose-700 border-rose-200"
            title="Major Incidents & Inquiries"
            body="Source-linked documentation of civil crises, mass student and farmer agitations, and state responses, with civilian impact made explicit."
          />
          <SectionCard
            icon={Radio}
            tint="bg-indigo-50 text-indigo-700 border-indigo-200"
            title="Media & Press Freedom"
            body="Eight core pillars examining journalist safety, corporate ownership concentration, regulatory emergency orders, and direct press access."
          />
          <SectionCard
            icon={ExternalLink}
            tint="bg-amber-50 text-amber-800 border-amber-200"
            title="Primary Sources & Citations"
            body="Whenever possible, each record links directly to primary sources — government gazettes, CAG audit portals, court judgments, or established news archives."
          />
        </div>
      </div>

      {/* Non-Partisan Commitment & Standards */}
      <div className="mt-12 rounded-2xl border border-[#E5E0D8] bg-white p-6 sm:p-7 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
          <ShieldCheck size={16} />
          <span>Editorial Standards</span>
        </div>
        <h2 className="mt-2 font-serif text-xl font-bold text-[#181A19]">
          Non-Partisan Commitment
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#4A524D]">
          <p>
            This project is strictly non-partisan and does not endorse any political party, candidate, or coalition.
          </p>
          <p>
            Records are drawn from public documentation and presented directly with attached primary sources. Readers are encouraged to inspect the linked sources and reach their own conclusions.
          </p>
          <p>
            A clear distinction is maintained between tenure and causation: an event occurring during an administration does not automatically imply that the administration caused it. Records focus on what occurred, what official actions followed, and what the available documentation establishes.
          </p>
        </div>
      </div>

      {/* Corrections & Contact */}
      <div className="mt-8 rounded-2xl border border-[#E5E0D8] bg-white p-6 sm:p-7 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
          <FileCheck2 size={16} />
          <span>Auditable Accuracy</span>
        </div>
        <h2 className="mt-2 font-serif text-xl font-bold text-[#181A19]">
          Corrections & Feedback
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#4A524D]">
          Corrections, source updates, and verifiable documentation are actively welcome. If any record contains an error, outdated legal status, or missing context, please share the primary court order, gazette notification, or official report so the entry can be reviewed and updated.
        </p>
      </div>

      {/* Exploration Links */}
      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => navigate('/parties')}
          className="inline-flex items-center gap-2 rounded-xl bg-[#1A3D2F] px-5 py-3 text-sm font-bold text-white shadow-2xs transition hover:bg-[#143025] cursor-pointer"
        >
          <Landmark size={16} /> Browse Parties
        </button>
        <button
          onClick={() => navigate('/public-money')}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
        >
          <Coins size={16} className="text-[#1A3D2F]" /> Tax & Public Money
        </button>
        <button
          onClick={() => navigate('/environment')}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
        >
          <Trees size={16} className="text-emerald-700" /> Environment & Land
        </button>
        <button
          onClick={() => navigate('/works')}
          className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
        >
          <Scale size={16} /> Browse All Works
        </button>
      </div>
    </div>
  );
}

function SectionCard({
  icon: Icon,
  tint,
  title,
  body,
}: {
  icon: typeof Scale;
  tint: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-2xs flex gap-3.5">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${tint}`}>
        <Icon size={18} />
      </div>
      <div>
        <h3 className="font-serif text-sm font-bold text-[#181A19]">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-[#525A55]">{body}</p>
      </div>
    </div>
  );
}
