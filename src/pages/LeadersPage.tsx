import { useEffect, useState, useMemo } from 'react';
import { supabase, type Leader, type Party } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import { Loader, Users, Search } from 'lucide-react';

export function LeadersPage() {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [partyFilter, setPartyFilter] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      supabase.from('leaders').select('*').order('name'),
      supabase.from('parties').select('*').order('name'),
    ]).then(([lRes, pRes]) => {
      setLeaders(lRes.data ?? []);
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
    return leaders.filter((l) => {
      const matchesQuery =
        !query ||
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        (l.role ?? '').toLowerCase().includes(query.toLowerCase());
      const matchesParty = partyFilter === 'all' || l.party_id === partyFilter;
      return matchesQuery && matchesParty;
    });
  }, [leaders, query, partyFilter]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-slate-400">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-2 text-slate-500">
        <Users size={18} />
        <span className="text-sm font-medium">Leaders</span>
      </div>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        Main figures of Indian politics
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        The people who shape party policy and public life — their roles, the
        groups they represent, and their personal political stances.
      </p>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leaders or roles..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <select
          value={partyFilter}
          onChange={(e) => setPartyFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-slate-400 focus:outline-none"
        >
          <option value="all">All parties</option>
          {parties.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">No leaders match your search.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => {
            const party = l.party_id ? partyMap[l.party_id] : null;
            return (
              <button
                key={l.id}
                onClick={() => navigate(`/leaders/${l.id}`)}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                    {l.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate font-bold text-slate-900 group-hover:text-slate-700">{l.name}</h2>
                    <p className="truncate text-xs text-slate-500">{l.role}</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{l.bio}</p>
                {party && (
                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: party.color_hex ?? '#1f2937' }}
                    />
                    <span className="text-xs font-medium text-slate-600">{party.name}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
