import { useEffect, useState } from 'react';
import { supabase, type Leader, type Work, type Party, type Yojna, type Promise_ as PromiseType, type Incident } from '@/lib/supabase';
import { useParty } from '@/lib/hooks/parties';
import { useNavigate } from '@/lib/router';
import { WorkCard } from '@/components/Work';
import { ArrowLeft, Loader, Landmark, Users as UsersIcon, Flag, Calendar, FileText, BadgeCheck, Flame } from 'lucide-react';

export function PartyDetailPage({ id }: { id: string }) {
  const { party, loading } = useParty(id);
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [yojnas, setYojnas] = useState<Yojna[]>([]);
  const [promises, setPromises] = useState<PromiseType[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    if (!id) return;
    supabase.from('leaders').select('*').eq('party_id', id).order('name').then(({ data }) => setLeaders(data ?? []));
    supabase.from('works').select('*').eq('party_id', id).order('date_year', { ascending: false, nullsFirst: false }).then(({ data }) => setWorks(data ?? []));
    supabase.from('yojnas').select('*').eq('party_id', id).order('launched_year', { ascending: false, nullsFirst: false }).then(({ data }) => setYojnas(data ?? []));
    supabase.from('promises').select('*').eq('party_id', id).order('election_year', { ascending: false, nullsFirst: false }).then(({ data }) => setPromises(data ?? []));
    supabase.from('incidents').select('*').eq('party_id', id).order('date_year', { ascending: false, nullsFirst: false }).then(({ data }) => setIncidents(data ?? []));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-slate-400">
        <Loader className="animate-spin" />
      </div>
    );

  if (!party)
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-slate-600">This party could not be found.</p>
        <button onClick={() => navigate('/parties')} className="mt-4 text-sm font-medium text-blue-600">
          Back to parties
        </button>
      </div>
    );

  const good = works.filter((w) => w.type === 'good');
  const bad = works.filter((w) => w.type === 'bad');

  return (
    <div>
      {/* Header */}
      <div
        className="text-white"
        style={{ backgroundColor: party.color_hex ?? '#1f2937' }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <button
            onClick={() => navigate('/parties')}
            className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft size={15} /> All parties
          </button>
          <div className="mt-6 flex items-start gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold backdrop-blur">
              {party.abbreviation.slice(0, 3)}
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{party.name}</h1>
              <p className="mt-1 text-white/85">{party.abbreviation}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">About this party</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{party.description}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <dl className="space-y-4 text-sm">
              <Info icon={Calendar} label="Founded" value={party.founded_year?.toString() ?? '—'} />
              <Info icon={Flag} label="Ideology" value={party.ideology ?? '—'} />
              <Info icon={UsersIcon} label="Represents" value={party.represents ?? '—'} />
            </dl>
          </div>
        </div>

        {/* Leaders */}
        {leaders.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-2">
              <UsersIcon size={18} className="text-slate-500" />
              <h2 className="text-lg font-bold text-slate-900">Key leaders</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {leaders.map((l) => (
                <button
                  key={l.id}
                  onClick={() => navigate(`/leaders/${l.id}`)}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                    {l.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 group-hover:text-slate-700">{l.name}</p>
                    <p className="truncate text-xs text-slate-500">{l.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Works */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <Landmark size={18} className="text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">Works & record</h2>
          </div>
          <div className="mt-2 flex gap-4 text-sm text-slate-500">
            <span><strong className="text-emerald-700">{good.length}</strong> positive</span>
            <span><strong className="text-red-700">{bad.length}</strong> concerns</span>
          </div>

          {works.length === 0 ? (
            <p className="mt-5 text-sm text-slate-500">No works recorded yet for this party.</p>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((w) => (
                <WorkCard key={w.id} work={w} partyName={party.name} />
              ))}
            </div>
          )}
        </section>

        {/* Yojnas */}
        {yojnas.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-slate-500" />
              <h2 className="text-lg font-bold text-slate-900">Yojnas (schemes)</h2>
              <button onClick={() => navigate('/yojnas')} className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {yojnas.map((y) => (
                <div key={y.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{y.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{y.description}</p>
                  <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    y.implementation_status === 'implemented' ? 'bg-emerald-50 text-emerald-700' :
                    y.implementation_status === 'partial' ? 'bg-amber-50 text-amber-700' :
                    y.implementation_status === 'failed' ? 'bg-red-50 text-red-700' :
                    'bg-slate-200 text-slate-700'
                  }`}>${
                    y.implementation_status === 'implemented' ? 'Largely implemented' :
                    y.implementation_status === 'partial' ? 'Partial / mixed' :
                    y.implementation_status === 'failed' ? 'Failed' : 'Mostly a fluke'
                  }</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Promises */}
        {promises.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-slate-500" />
              <h2 className="text-lg font-bold text-slate-900">Election promises</h2>
              <button onClick={() => navigate('/promises')} className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {promises.map((pr) => (
                <div key={pr.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{pr.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{pr.description}</p>
                  <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    pr.status === 'fulfilled' ? 'bg-emerald-50 text-emerald-700' :
                    pr.status === 'partially_fulfilled' ? 'bg-amber-50 text-amber-700' :
                    pr.status === 'broken' ? 'bg-red-50 text-red-700' :
                    'bg-slate-200 text-slate-700'
                  }`}>${
                    pr.status === 'fulfilled' ? 'Fulfilled' :
                    pr.status === 'partially_fulfilled' ? 'Partially fulfilled' :
                    pr.status === 'broken' ? 'Broken' : 'Abandoned'
                  }</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Incidents */}
        {incidents.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-slate-500" />
              <h2 className="text-lg font-bold text-slate-900">Incidents & cases</h2>
              <button onClick={() => navigate('/incidents')} className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {incidents.map((inc) => (
                <div key={inc.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{inc.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{inc.description}</p>
                  <span className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    inc.severity === 'extreme' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                  }`}>{inc.severity === 'extreme' ? 'Extreme' : 'Mild'}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Flag; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-slate-400" />
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</dt>
        <dd className="mt-0.5 font-medium text-slate-800">{value}</dd>
      </div>
    </div>
  );
}
