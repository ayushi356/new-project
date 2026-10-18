import { Scale, Search, ExternalLink, ShieldCheck, Users, Landmark, FileText, BadgeCheck, Flame } from 'lucide-react';
import { useNavigate } from '@/lib/router';

export function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
        <Scale size={14} /> About this project
      </div>

      <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        What is the Bharat Governance Tracker?
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-slate-700">
        Bharat Governance Tracker is a public, independent record of the work
        done by India's political parties and their main leaders — both the
        good and the bad. Our goal is simple: help everyday citizens understand
        who did what, how it affected the country, and where the information
        comes from.
      </p>

      <div className="mt-10 space-y-6">
        <Section
          icon={Landmark}
          tint="bg-blue-50 text-blue-600"
          title="Parties & their ideologies"
          body="Browse every major political party — what they stand for, who they represent, and the vision they offer the country."
        />
        <Section
          icon={Users}
          tint="bg-slate-100 text-slate-700"
          title="Leaders & main figures"
          body="Explore the people behind the parties: their roles, the groups they represent, and the political ideas they are known for."
        />
        <Section
          icon={Scale}
          tint="bg-emerald-50 text-emerald-600"
          title="Works — good and bad"
          body="Each party and leader has a record of actions: schemes, reforms, scams and missteps. Every entry explains the impact on the economy and society."
        />
        <Section
          icon={ShieldCheck}
          tint="bg-amber-50 text-amber-600"
          title="Severity labels"
          body="Concerns are labelled as 'mild' or 'extreme' so you can quickly gauge how serious a problem is, while still reading the full context."
        />
        <Section
          icon={FileText}
          tint="bg-blue-50 text-blue-600"
          title="Yojna tracker"
          body="Government schemes (yojnas) are tracked separately — what was claimed vs what actually happened on the ground. Each scheme is labelled as largely implemented, partial, failed, or mostly a fluke."
        />
        <Section
          icon={BadgeCheck}
          tint="bg-emerald-50 text-emerald-600"
          title="Election promises"
          body="Promises made during election campaigns are tracked separately from works. Each is marked fulfilled, partially fulfilled, broken, or quietly abandoned — with a reality check on what actually happened."
        />
        <Section
          icon={Flame}
          tint="bg-red-50 text-red-600"
          title="Incidents & cases"
          body="Riots, violence, state action and human tragedies — from Godhra to Manipur — are documented in their own section, separate from policy works, with the impact on ordinary citizens made explicit."
        />
        <Section
          icon={ExternalLink}
          tint="bg-red-50 text-red-600"
          title="Sources for everything"
          body="Wherever possible, each record links back to a public source — government portals, official reports, or credible news outlets — so you can verify and read further."
        />
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-base font-semibold text-slate-900">Our promise</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          This project is non-partisan. We do not endorse any party or leader.
          Records are drawn from public information and are presented as-is,
          with sources attached. We encourage you to read the linked sources
          and form your own conclusions.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => navigate('/parties')}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Search size={16} /> Start exploring
        </button>
        <button
          onClick={() => navigate('/works')}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Browse all works
        </button>
      </div>
    </div>
  );
}

function Section({
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
    <div className="flex gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tint}`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
      </div>
    </div>
  );
}
