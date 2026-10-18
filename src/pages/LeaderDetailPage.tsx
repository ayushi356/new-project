import { useEffect, useState } from 'react';
import { supabase, type Leader, type Party, type Work } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import { WorkCard } from '@/components/Work';
import { ArrowLeft, Loader, Flag, Users as UsersIcon, Compass } from 'lucide-react';

export function LeaderDetailPage({ id }: { id: string }) {
  const navigate = useNavigate();
  const [leader, setLeader] = useState<Leader | null>(null);
  const [party, setParty] = useState<Party | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      const { data: l } = await supabase.from('leaders').select('*').eq('id', id).maybeSingle();
      if (cancelled) return;
      setLeader(l);
      if (l?.party_id) {
        const { data: p } = await supabase.from('parties').select('*').eq('id', l.party_id).maybeSingle();
        if (!cancelled) setParty(p);
      }
      const { data: w } = await supabase
        .from('works')
        .select('*')
        .eq('leader_id', id)
        .order('date_year', { ascending: false, nullsFirst: false });
      if (!cancelled) setWorks(w ?? []);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-slate-400">
        <Loader className="animate-spin" />
      </div>
    );

  if (!leader)
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-slate-600">This leader could not be found.</p>
        <button onClick={() => navigate('/leaders')} className="mt-4 text-sm font-medium text-blue-600">
          Back to leaders
        </button>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <button
        onClick={() => navigate(party ? `/parties/${party.id}` : '/parties')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft size={14} /> Back to {party ? `${party.name} Profile` : 'Parties Directory'}
      </button>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-600">
                {leader.name.charAt(0)}
              </span>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{leader.name}</h1>
                <p className="text-sm text-slate-500">{leader.role}</p>
              </div>
            </div>

            {party && (
              <button
                onClick={() => navigate(`/parties/${party.id}`)}
                className="mt-5 flex w-full items-center gap-2 rounded-lg border border-slate-200 p-3 text-left transition hover:bg-slate-50"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: party.color_hex ?? '#1f2937' }}
                >
                  {party.abbreviation.slice(0, 3)}
                </span>
                <span className="text-sm font-medium text-slate-800">{party.name}</span>
              </button>
            )}

            <dl className="mt-5 space-y-4 text-sm">
              <Info icon={Compass} label="Ideology" value={leader.ideology} />
              <Info icon={UsersIcon} label="Represents" value={leader.represents} />
              <Info icon={Flag} label="Role" value={leader.role} />
            </dl>
          </div>
        </aside>

        {/* Main */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900">Biography</h2>
          <p className="mt-3 leading-relaxed text-slate-700">{leader.bio}</p>

          <h2 className="mt-10 text-lg font-bold text-slate-900">Works attributed to this leader</h2>
          {works.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              No works are individually attributed to this leader yet. See the
              party page for broader party-level works.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {works.map((w) => (
                <WorkCard key={w.id} work={w} partyName={party?.name} />
              ))}
            </div>
          )}

          {/* Evidence, Sources & Updates */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Evidence, Sources & Updates
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Biographical credentials, parliamentary tenure, and constitutional declarations are verified against official Election Commission of India (ECI) candidate affidavits, Lok Sabha / Rajya Sabha parliamentary records, and gazette notifications.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://sansad.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              >
                <span>Sansad / Parliament Record</span>
              </a>
              <a
                href="https://affidavit.eci.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              >
                <span>ECI Affidavit Portal</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Flag; label: string; value: string | null }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-slate-400" />
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
        <dd className="mt-0.5 font-medium text-slate-800">{value ?? '—'}</dd>
      </div>
    </div>
  );
}
