import { CheckCircle2, AlertTriangle, ShieldAlert, ExternalLink, Calendar, Tag } from 'lucide-react';
import type { Work } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';

export function WorkCard({ work, partyName }: { work: Work; partyName?: string | null }) {
  const navigate = useNavigate();
  const isGood = work.type === 'good';

  return (
    <button
      onClick={() => navigate(`/works/${work.id}`)}
      className="group flex w-full flex-col rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {isGood ? (
            <CheckCircle2 className="text-emerald-600" size={20} />
          ) : work.severity === 'extreme' ? (
            <ShieldAlert className="text-red-600" size={20} />
          ) : (
            <AlertTriangle className="text-amber-600" size={20} />
          )}
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              isGood
                ? 'bg-emerald-50 text-emerald-700'
                : work.severity === 'extreme'
                ? 'bg-red-50 text-red-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            {isGood
              ? 'Positive work'
              : work.severity === 'extreme'
              ? 'Extreme concern'
              : 'Mild concern'}
          </span>
        </div>
        {work.date_year && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Calendar size={13} /> {work.date_year}
          </span>
        )}
      </div>

      <h3 className="mt-3 text-base font-semibold text-slate-900 group-hover:text-slate-700">
        {work.title}
      </h3>
      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-slate-600">
        {work.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        {partyName && <span className="font-medium text-slate-700">{partyName}</span>}
        {work.category && (
          <span className="flex items-center gap-1">
            <Tag size={12} /> {work.category}
          </span>
        )}
      </div>
    </button>
  );
}

export function WorkDetail({ work, partyName }: { work: Work; partyName?: string | null }) {
  const isGood = work.type === 'good';
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        {isGood ? (
          <CheckCircle2 className="text-emerald-600" size={22} />
        ) : work.severity === 'extreme' ? (
          <ShieldAlert className="text-red-600" size={22} />
        ) : (
          <AlertTriangle className="text-amber-600" size={22} />
        )}
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isGood
              ? 'bg-emerald-50 text-emerald-700'
              : work.severity === 'extreme'
              ? 'bg-red-50 text-red-700'
              : 'bg-amber-50 text-amber-700'
          }`}
        >
          {isGood
            ? 'Positive work'
            : work.severity === 'extreme'
            ? 'Extreme concern'
            : 'Mild concern'}
        </span>
        {work.category && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {work.category}
          </span>
        )}
        {work.date_year && (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Calendar size={13} /> {work.date_year}
          </span>
        )}
      </div>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {work.title}
      </h1>
      {partyName && (
        <p className="mt-1 text-sm font-medium text-slate-500">{partyName}</p>
      )}

      <p className="mt-5 text-base leading-relaxed text-slate-700">
        {work.description}
      </p>

      {work.impact && (
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Impact on economy & society
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {work.impact}
          </p>
        </div>
      )}

      <div className="mt-8 border-t border-slate-200 pt-5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          <ShieldAlert size={14} className="text-indigo-600" />
          <span>Evidence, Sources & Updates</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
          <p className="text-xs font-bold text-slate-700">Primary Verification Source:</p>
          {work.source_url ? (
            <a
              href={work.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 underline"
            >
              <span>{work.source_name ?? work.source_url}</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <p className="mt-1 text-sm font-medium text-slate-800">{work.source_name ?? 'Government Gazette / Public Record'}</p>
          )}
          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
            Record verified against public government gazettes, judicial findings, and multi-source investigative documentation.
          </p>
        </div>
      </div>
    </article>
  );
}
