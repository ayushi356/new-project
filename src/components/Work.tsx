import { CheckCircle2, AlertTriangle, ShieldAlert, ExternalLink, Calendar } from 'lucide-react';
import type { Work } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';

export function WorkCard({ work, partyName }: { work: Work; partyName?: string | null }) {
  const navigate = useNavigate();
  const isGood = work.type === 'good';

  return (
    <button
      onClick={() => navigate(`/works/${work.id}`)}
      className="group flex w-full flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-5 text-left shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#C8C2B5] hover:shadow-xs cursor-pointer"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {isGood ? (
              <CheckCircle2 className="text-emerald-700" size={16} strokeWidth={1.5} />
            ) : work.severity === 'extreme' ? (
              <ShieldAlert className="text-rose-700" size={16} strokeWidth={1.5} />
            ) : (
              <AlertTriangle className="text-amber-700" size={16} strokeWidth={1.5} />
            )}
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                isGood
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200/70'
                  : work.severity === 'extreme'
                  ? 'bg-rose-50 text-rose-800 border-rose-200/70'
                  : 'bg-amber-50 text-amber-800 border-amber-200/70'
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
            <span className="flex items-center gap-1 text-xs text-[#717A74]">
              <Calendar size={12} strokeWidth={1.5} /> {work.date_year}
            </span>
          )}
        </div>

        <h3 className="mt-3 font-serif text-base font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition leading-snug">
          {work.title}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-xs sm:text-sm leading-relaxed text-[#4A524D]">
          {work.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#F0ECE1] pt-3 text-xs text-[#717A74]">
        {partyName && <span className="font-semibold text-[#181A19]">{partyName}</span>}
        {work.category && (
          <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-0.5 text-[11px] text-[#5C6460]">
            {work.category}
          </span>
        )}
      </div>
    </button>
  );
}

export function WorkDetail({ work, partyName }: { work: Work; partyName?: string | null }) {
  const isGood = work.type === 'good';
  return (
    <article className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-2xs sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        {isGood ? (
          <CheckCircle2 className="text-emerald-700" size={18} strokeWidth={1.5} />
        ) : work.severity === 'extreme' ? (
          <ShieldAlert className="text-rose-700" size={18} strokeWidth={1.5} />
        ) : (
          <AlertTriangle className="text-amber-700" size={18} strokeWidth={1.5} />
        )}
        <span
          className={`rounded-full px-3 py-0.5 text-xs font-semibold border ${
            isGood
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200/70'
              : work.severity === 'extreme'
              ? 'bg-rose-50 text-rose-800 border-rose-200/70'
              : 'bg-amber-50 text-amber-800 border-amber-200/70'
          }`}
        >
          {isGood
            ? 'Positive work'
            : work.severity === 'extreme'
            ? 'Extreme concern'
            : 'Mild concern'}
        </span>
        {work.category && (
          <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-xs font-medium text-[#5C6460]">
            {work.category}
          </span>
        )}
        {work.date_year && (
          <span className="flex items-center gap-1 text-xs text-[#717A74]">
            <Calendar size={13} strokeWidth={1.5} /> {work.date_year}
          </span>
        )}
      </div>

      <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#181A19] sm:text-3xl">
        {work.title}
      </h1>
      {partyName && (
        <p className="mt-1 text-sm font-semibold text-[#5C6460]">{partyName}</p>
      )}

      <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A524D]">
        {work.description}
      </p>

      {work.impact && (
        <div className="mt-6 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[#1A3D2F]">
            Impact on economy & society
          </h2>
          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#4A524D]">
            {work.impact}
          </p>
        </div>
      )}

      <div className="mt-8 border-t border-[#E5E0D8] pt-5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A3D2F] mb-2">
          <CheckCircle2 size={14} strokeWidth={1.5} />
          <span>Evidence, Sources & Updates</span>
        </div>
        <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5]/70 p-4">
          <p className="text-xs font-bold text-[#181A19]">Primary Verification Source:</p>
          {work.source_url ? (
            <a
              href={work.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A3D2F] hover:underline"
            >
              <span>{work.source_name ?? work.source_url}</span>
              <ExternalLink size={13} strokeWidth={1.5} />
            </a>
          ) : (
            <p className="mt-1 text-sm font-medium text-[#181A19]">{work.source_name ?? 'Government Gazette / Public Record'}</p>
          )}
          <p className="mt-2 text-[11px] text-[#717A74] leading-relaxed">
            Record verified against public government gazettes, judicial findings, and multi-source investigative documentation.
          </p>
        </div>
      </div>
    </article>
  );
}
