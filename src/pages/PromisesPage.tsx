import { useEffect, useState, useMemo } from 'react';
import { supabase, type Promise_ as PromiseType, type Party } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import { Loader, BadgeCheck, Search, ExternalLink, Calendar, XCircle, AlertTriangle, CheckCircle2, Ban } from 'lucide-react';

const STATUS_META: Record<PromiseType['status'], { label: string; icon: typeof CheckCircle2; tint: string }> = {
  fulfilled: { label: 'Fulfilled', icon: CheckCircle2, tint: 'bg-emerald-50 text-emerald-700' },
  partially_fulfilled: { label: 'Partially fulfilled', icon: AlertTriangle, tint: 'bg-amber-50 text-amber-700' },
  broken: { label: 'Broken', icon: XCircle, tint: 'bg-red-50 text-red-700' },
  abandoned: { label: 'Abandoned', icon: Ban, tint: 'bg-slate-200 text-slate-700' },
};

export function PromisesPage() {
  const navigate = useNavigate();
  const [promises, setPromises] = useState<PromiseType[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [partyFilter, setPartyFilter] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      supabase.from('promises').select('*').order('election_year', { ascending: false, nullsFirst: false }),
      supabase.from('parties').select('*').order('name'),
    ]).then(([prRes, pRes]) => {
      setPromises(prRes.data ?? []);
      setParties(pRes.data ?? []);
      setLoading(false);
    });
  }, []);

  const partyMap = useMemo(() => {
    const m: Record<string, Party> = {};
    parties.forEach((p) => (m[p.id] = p));
    return m;
  }, [parties]);

  const filtered = useMemo(() => {
    return promises.filter((pr) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q || pr.title.toLowerCase().includes(q) || pr.description.toLowerCase().includes(q) || (pr.election_context ?? '').toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || pr.status === statusFilter;
      const matchesParty = partyFilter === 'all' || pr.party_id === partyFilter;
      return matchesQuery && matchesStatus && matchesParty;
    });
  }, [promises, query, statusFilter, partyFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { fulfilled: 0, partially_fulfilled: 0, broken: 0, abandoned: 0 };
    promises.forEach((pr) => (c[pr.status] += 1));
    return c;
  }, [promises]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-slate-400">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-2 text-slate-500">
        <BadgeCheck size={18} />
        <span className="text-sm font-medium">Election Promises</span>
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        Promises made — and what happened
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Politicians make big promises during elections. Here we track whether
        each promise was kept, broken, partially fulfilled, or quietly
        abandoned once in power.
      </p>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(STATUS_META) as PromiseType['status'][]).map((s) => {
          const meta = STATUS_META[s];
          const Icon = meta.icon;
          return (
            <div key={s} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`mb-2 inline-flex rounded-lg px-2 py-1 text-xs font-semibold ${meta.tint}`}>
                <Icon size={14} className="mr-1" /> {meta.label}
              </div>
              <p className="text-2xl font-bold text-slate-900">{counts[s]}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search promises..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none"
            >
              <option value="all">All statuses</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="partially_fulfilled">Partially fulfilled</option>
              <option value="broken">Broken</option>
              <option value="abandoned">Abandoned</option>
            </select>
            <select
              value={partyFilter}
              onChange={(e) => setPartyFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none"
            >
              <option value="all">All parties</option>
              {parties.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-500">Showing {filtered.length} of {promises.length} promises</p>

      {filtered.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No promises match your filters.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((pr) => {
            const meta = STATUS_META[pr.status];
            const Icon = meta.icon;
            const party = pr.party_id ? partyMap[pr.party_id] : null;
            return (
              <div key={pr.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-slate-900">{pr.title}</h3>
                  <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.tint}`}>
                    <Icon size={13} /> {meta.label}
                  </span>
                </div>
                {party && (
                  <button onClick={() => navigate(`/parties/${party.id}`)} className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: party.color_hex ?? '#1f2937' }} />
                    {party.name}
                  </button>
                )}
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{pr.description}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  {pr.election_year && <span className="flex items-center gap-1"><Calendar size={12} /> {pr.election_year}</span>}
                  {pr.election_context && <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium">{pr.election_context}</span>}
                </div>

                {pr.reality_check && (
                  <div className="mt-3 rounded-lg bg-slate-100 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Reality check</p>
                    <p className="mt-1 text-sm text-slate-700">{pr.reality_check}</p>
                  </div>
                )}

                {(pr.source_url || pr.source_name) && (
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    {pr.source_url ? (
                      <a href={pr.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                        {pr.source_name ?? 'Source'} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-600">{pr.source_name}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
