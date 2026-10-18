import { useEffect, useState, useMemo } from 'react';
import { supabase, type Work, type Party } from '@/lib/supabase';
import { WorkCard } from '@/components/Work';
import { Loader, Scale, Search, Filter } from 'lucide-react';

export function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'good' | 'bad'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'mild' | 'extreme'>('all');
  const [partyFilter, setPartyFilter] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      supabase.from('works').select('*').order('date_year', { ascending: false, nullsFirst: false }),
      supabase.from('parties').select('*').order('name'),
    ]).then(([wRes, pRes]) => {
      setWorks(wRes.data ?? []);
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
    return works.filter((w) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        (w.category ?? '').toLowerCase().includes(q);
      const matchesType = typeFilter === 'all' || w.type === typeFilter;
      const matchesSeverity =
        severityFilter === 'all' || w.severity === severityFilter;
      const matchesParty = partyFilter === 'all' || w.party_id === partyFilter;
      return matchesQuery && matchesType && matchesSeverity && matchesParty;
    });
  }, [works, query, typeFilter, severityFilter, partyFilter]);

  const counts = useMemo(
    () => ({
      good: works.filter((w) => w.type === 'good').length,
      bad: works.filter((w) => w.type === 'bad').length,
    }),
    [works]
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
        <Scale size={18} />
        <span className="text-sm font-medium">Works & records</span>
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        The works — good and bad
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Every major action, scheme, reform, scam and misstep, with the impact
        on the economy and a link to the source. Filter to compare.
      </p>

      <div className="mt-4 flex gap-4 text-sm">
        <span><strong className="text-emerald-700">{counts.good}</strong> positive</span>
        <span><strong className="text-red-700">{counts.bad}</strong> concerns</span>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, category or description..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FilterPills
              label="Type"
              value={typeFilter}
              onChange={(v) => setTypeFilter(v as typeof typeFilter)}
              options={[
                { value: 'all', label: 'All' },
                { value: 'good', label: 'Positive' },
                { value: 'bad', label: 'Concerns' },
              ]}
            />
            <FilterPills
              label="Severity"
              value={severityFilter}
              onChange={(v) => setSeverityFilter(v as typeof severityFilter)}
              options={[
                { value: 'all', label: 'Any' },
                { value: 'mild', label: 'Mild' },
                { value: 'extreme', label: 'Extreme' },
              ]}
            />
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

      {/* Results */}
      <p className="mt-5 text-sm text-slate-500">
        Showing {filtered.length} of {works.length} records
      </p>
      {filtered.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No records match your filters.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w) => (
            <WorkCard
              key={w.id}
              work={w}
              partyName={w.party_id ? partyMap[w.party_id]?.name : null}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPills({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
        <Filter size={12} /> {label}
      </span>
      <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
              value === o.value
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

