import { useParties } from '@/lib/hooks/parties';
import { useNavigate } from '@/lib/router';
import { Loader, Landmark, Calendar, Users as UsersIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type PartyCounts = { id: string; leader_count: number; work_count: number };

export function PartiesPage() {
  const { parties, loading } = useParties();
  const navigate = useNavigate();
  const [counts, setCounts] = useState<Record<string, PartyCounts>>({});

  useEffect(() => {
    if (parties.length === 0) return;
    const ids = parties.map((p) => p.id);
    Promise.all([
      supabase.from('leaders').select('party_id'),
      supabase.from('works').select('party_id'),
    ]).then(([lRes, wRes]) => {
      const c: Record<string, PartyCounts> = {};
      ids.forEach((id) => (c[id] = { id, leader_count: 0, work_count: 0 }));
      (lRes.data ?? []).forEach((r: { party_id: string | null }) => {
        if (r.party_id && c[r.party_id]) c[r.party_id].leader_count += 1;
      });
      (wRes.data ?? []).forEach((r: { party_id: string | null }) => {
        if (r.party_id && c[r.party_id]) c[r.party_id].work_count += 1;
      });
      setCounts(c);
    });
  }, [parties]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-slate-400">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-2 text-slate-500">
        <Landmark size={18} />
        <span className="text-sm font-medium">Political parties</span>
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        India's major political parties
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Explore each party's ideology, who they represent, and their record of
        works — both positive contributions and serious concerns.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {parties.map((p) => {
          const c = counts[p.id];
          return (
            <button
              key={p.id}
              onClick={() => navigate(`/parties/${p.id}`)}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white"
                  style={{ backgroundColor: p.color_hex ?? '#1f2937' }}
                >
                  {p.abbreviation.slice(0, 3)}
                </span>
                <div>
                  <h2 className="font-bold text-slate-900 group-hover:text-slate-700">
                    {p.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-500">{p.abbreviation}</p>
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {p.ideology && (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
                    {p.ideology}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> Est. {p.founded_year ?? '—'}
                </span>
                <span className="flex items-center gap-1">
                  <UsersIcon size={13} /> {c?.leader_count ?? 0} leaders
                </span>
                <span className="ml-auto font-medium text-slate-700">
                  {c?.work_count ?? 0} works
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
