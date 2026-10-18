import { useEffect, useState } from 'react';
import { supabase, type Party, type Work } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import { Scale, ArrowRight, TrendingUp, AlertTriangle, Users, Landmark, FileText, BadgeCheck, Flame } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ parties: 0, leaders: 0, good: 0, bad: 0 });
  const [recent, setRecent] = useState<Work[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const partiesP = supabase.from('parties').select('*').order('name');
    const worksP = supabase
      .from('works')
      .select('*')
      .order('date_year', { ascending: false, nullsFirst: false })
      .limit(6);
    const leadersP = supabase.from('leaders').select('id', { count: 'exact', head: true });
    const goodP = supabase.from('works').select('id', { count: 'exact', head: true }).eq('type', 'good');
    const badP = supabase.from('works').select('id', { count: 'exact', head: true }).eq('type', 'bad');

    Promise.all([partiesP, worksP, leadersP, goodP, badP]).then(
      ([pRes, wRes, lRes, gRes, bRes]) => {
        setParties(pRes.data ?? []);
        setRecent(wRes.data ?? []);
        setStats({
          parties: pRes.data?.length ?? 0,
          leaders: lRes.count ?? 0,
          good: gRes.count ?? 0,
          bad: bRes.count ?? 0,
        });
        setLoading(false);
      }
    );
  }, []);

  const statCards = [
    { label: 'Political parties', value: stats.parties, icon: Landmark, tint: 'text-blue-600 bg-blue-50' },
    { label: 'Key leaders', value: stats.leaders, icon: Users, tint: 'text-slate-700 bg-slate-100' },
    { label: 'Positive works', value: stats.good, icon: TrendingUp, tint: 'text-emerald-600 bg-emerald-50' },
    { label: 'Serious concerns', value: stats.bad, icon: AlertTriangle, tint: 'text-red-600 bg-red-50' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)',
            backgroundSize: '48px 48px, 64px 64px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
              <Scale size={14} /> Transparent. Source-linked. For every citizen.
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Track the works of India's political parties — the good and the bad.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              A single place to explore what each party and leader has done for
              the Indian economy and society. Every record is labelled and
              backed by public sources, so you can decide for yourself.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/works')}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Browse works <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                About this project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className={`mb-3 inline-flex rounded-lg p-2 ${s.tint}`}>
                  <Icon size={20} />
                </div>
                <p className="text-3xl font-bold text-slate-900">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Parties preview */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Political parties</h2>
          <button
            onClick={() => navigate('/parties')}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all <ArrowRight size={15} />
          </button>
        </div>
        {!loading && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parties.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate(`/parties/${p.id}`)}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-base font-bold text-white"
                  style={{ backgroundColor: p.color_hex ?? '#1f2937' }}
                >
                  {p.abbreviation.slice(0, 3)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">{p.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {p.abbreviation} · {p.ideology}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Explore sections */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Explore by category</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ExploreCard icon={Scale} tint="bg-slate-900 text-white" title="Works & Records" desc="Schemes, reforms, scams — good and bad." onClick={() => navigate('/works')} />
          <ExploreCard icon={FileText} tint="bg-blue-600 text-white" title="Yojna Tracker" desc="Claimed targets vs on-ground reality." onClick={() => navigate('/yojnas')} />
          <ExploreCard icon={BadgeCheck} tint="bg-emerald-600 text-white" title="Election Promises" desc="Promises kept, broken or abandoned." onClick={() => navigate('/promises')} />
          <ExploreCard icon={Flame} tint="bg-red-600 text-white" title="Incidents & Cases" desc="Riots, violence and human impact." onClick={() => navigate('/incidents')} />
        </div>
      </section>

      {/* Recent works */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Recent works</h2>
          <button
            onClick={() => navigate('/works')}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all <ArrowRight size={15} />
          </button>
        </div>
        {!loading && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((w) => (
              <button
                key={w.id}
                onClick={() => navigate(`/works/${w.id}`)}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    w.type === 'good'
                      ? 'bg-emerald-50 text-emerald-700'
                      : w.severity === 'extreme'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {w.type === 'good' ? 'Positive' : w.severity === 'extreme' ? 'Extreme' : 'Mild'}
                </span>
                <h3 className="mt-2 font-semibold text-slate-900">{w.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{w.description}</p>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ExploreCard({
  icon: Icon,
  tint,
  title,
  desc,
  onClick,
}: {
  icon: typeof Scale;
  tint: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`mb-3 inline-flex w-fit rounded-lg p-2.5 ${tint}`}>
        <Icon size={22} />
      </div>
      <h3 className="font-bold text-slate-900 group-hover:text-slate-700">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{desc}</p>
    </button>
  );
}
