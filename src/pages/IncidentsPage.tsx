import { useEffect, useState, useMemo } from 'react';
import { supabase, type Incident, type Party } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import { Loader, Flame, Search, ExternalLink, Calendar, MapPin, ShieldAlert, AlertTriangle, Users } from 'lucide-react';

const SEVERITY_META: Record<Incident['severity'], { label: string; icon: typeof ShieldAlert; tint: string }> = {
  extreme: { label: 'Extreme', icon: ShieldAlert, tint: 'bg-red-50 text-red-700' },
  mild: { label: 'Mild', icon: AlertTriangle, tint: 'bg-amber-50 text-amber-700' },
};

export function IncidentsPage() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [partyFilter, setPartyFilter] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      supabase.from('incidents').select('*').order('date_year', { ascending: false, nullsFirst: false }),
      supabase.from('parties').select('*').order('name'),
    ]).then(([iRes, pRes]) => {
      setIncidents(iRes.data ?? []);
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
    return incidents.filter((inc) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q || inc.title.toLowerCase().includes(q) || inc.description.toLowerCase().includes(q) || (inc.location ?? '').toLowerCase().includes(q);
      const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;
      const matchesParty = partyFilter === 'all' || inc.party_id === partyFilter;
      return matchesQuery && matchesSeverity && matchesParty;
    });
  }, [incidents, query, severityFilter, partyFilter]);

  const totalDeaths = useMemo(
    () => incidents.reduce((sum, i) => sum + (i.deaths_reported ?? 0), 0),
    [incidents]
  );

  if (loading)
    return (
      <div className="flex justify-center py-20 text-slate-400">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-2 text-slate-500">
        <Flame size={18} />
        <span className="text-sm font-medium">Incidents & Cases</span>
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        Incidents, violence & crises
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Major events that impacted the citizens of India — riots, violence,
        state action, and human tragedies — separate from policy works. Each
        entry explains how ordinary people were affected.
      </p>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-slate-900">{incidents.length}</p>
          <p className="mt-1 text-sm text-slate-500">Documented incidents</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-red-700">{totalDeaths.toLocaleString('en-IN')}</p>
          <p className="mt-1 text-sm text-slate-500">Deaths reported (est.)</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-2xl font-bold text-red-700">
            {incidents.filter((i) => i.severity === 'extreme').length}
          </p>
          <p className="mt-1 text-sm text-slate-500">Extreme severity</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search incidents or locations..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none"
            >
              <option value="all">All severity</option>
              <option value="extreme">Extreme</option>
              <option value="mild">Mild</option>
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

      <p className="mt-5 text-sm text-slate-500">Showing {filtered.length} of {incidents.length} incidents</p>

      {filtered.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No incidents match your filters.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.map((inc) => {
            const meta = SEVERITY_META[inc.severity];
            const Icon = meta.icon;
            const party = inc.party_id ? partyMap[inc.party_id] : null;
            return (
              <div key={inc.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-slate-900">{inc.title}</h3>
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

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  {inc.date_year && <span className="flex items-center gap-1"><Calendar size={12} /> {inc.date_year}</span>}
                  {inc.location && <span className="flex items-center gap-1"><MapPin size={12} /> {inc.location}</span>}
                  {inc.deaths_reported != null && inc.deaths_reported > 0 && (
                    <span className="flex items-center gap-1 font-medium text-red-700">
                      <Users size={12} /> ~{inc.deaths_reported.toLocaleString('en-IN')} deaths
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">{inc.description}</p>

                {inc.citizen_impact && (
                  <div className="mt-3 rounded-lg bg-red-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Impact on citizens</p>
                    <p className="mt-1 text-sm text-slate-700">{inc.citizen_impact}</p>
                  </div>
                )}

                {(inc.source_url || inc.source_name) && (
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    {inc.source_url ? (
                      <a href={inc.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                        {inc.source_name ?? 'Source'} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-600">{inc.source_name}</span>
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
