import { useEffect, useState, useMemo } from 'react';
import { supabase, type Yojna, type Party } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import { Loader, FileText, Search, ExternalLink, Calendar, CheckCircle2, AlertTriangle, XCircle, Ghost } from 'lucide-react';

const STATUS_META: Record<Yojna['implementation_status'], { label: string; icon: typeof CheckCircle2; tint: string }> = {
  implemented: { label: 'Largely implemented', icon: CheckCircle2, tint: 'bg-emerald-50 text-emerald-700' },
  partial: { label: 'Partial / mixed', icon: AlertTriangle, tint: 'bg-amber-50 text-amber-700' },
  failed: { label: 'Failed to deliver', icon: XCircle, tint: 'bg-red-50 text-red-700' },
  fluke: { label: 'Mostly a fluke', icon: Ghost, tint: 'bg-slate-200 text-slate-700' },
};

export function YojnasPage() {
  const navigate = useNavigate();
  const [yojnas, setYojnas] = useState<Yojna[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [partyFilter, setPartyFilter] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      supabase.from('yojnas').select('*').order('launched_year', { ascending: false, nullsFirst: false }),
      supabase.from('parties').select('*').order('name'),
    ]).then(([yRes, pRes]) => {
      setYojnas(yRes.data ?? []);
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
    return yojnas.filter((y) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q || y.title.toLowerCase().includes(q) || y.description.toLowerCase().includes(q) || (y.category ?? '').toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || y.implementation_status === statusFilter;
      const matchesParty = partyFilter === 'all' || y.party_id === partyFilter;
      return matchesQuery && matchesStatus && matchesParty;
    });
  }, [yojnas, query, statusFilter, partyFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { implemented: 0, partial: 0, failed: 0, fluke: 0 };
    yojnas.forEach((y) => (c[y.implementation_status] += 1));
    return c;
  }, [yojnas]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-slate-400">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-2 text-slate-500">
        <FileText size={18} />
        <span className="text-sm font-medium">Yojna Tracker</span>
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        Government schemes — claimed vs reality
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Every government launches schemes (yojnas) with big targets. Here we
        track what was claimed, what actually happened on the ground, and
        whether it was real, partial, failed, or mostly a fluke.
      </p>

      {/* Status summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(Object.keys(STATUS_META) as Yojna['implementation_status'][]).map((s) => {
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
              placeholder="Search schemes..."
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
              <option value="implemented">Largely implemented</option>
              <option value="partial">Partial / mixed</option>
              <option value="failed">Failed to deliver</option>
              <option value="fluke">Mostly a fluke</option>
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

      <p className="mt-5 text-sm text-slate-500">Showing {filtered.length} of {yojnas.length} schemes</p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No schemes match your filters.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((y) => {
            const meta = STATUS_META[y.implementation_status];
            const Icon = meta.icon;
            const party = y.party_id ? partyMap[y.party_id] : null;
            return (
              <div key={y.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-slate-900">{y.title}</h3>
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
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{y.description}</p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Claimed target</p>
                    <p className="mt-1 text-sm text-slate-700">{y.claimed_target ?? '—'}</p>
                  </div>
                  <div className="rounded-lg bg-slate-100 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">On-ground reality</p>
                    <p className="mt-1 text-sm text-slate-700">{y.actual_implementation ?? '—'}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
                  {y.launched_year && <span className="flex items-center gap-1"><Calendar size={12} /> {y.launched_year}</span>}
                  {y.category && <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium">{y.category}</span>}
                  {y.budget_announced && <span>Budget: {y.budget_announced}</span>}
                  {(y.source_url || y.source_name) && (
                    y.source_url ? (
                      <a href={y.source_url} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700">
                        {y.source_name ?? 'Source'} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="ml-auto">{y.source_name}</span>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
