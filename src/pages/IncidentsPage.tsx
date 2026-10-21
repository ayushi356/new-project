import { useEffect, useState, useMemo } from 'react';
import { supabase, type Incident, type Party } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import {
  Loader,
  Flame,
  Search,
  ExternalLink,
  Calendar,
  MapPin,
  ShieldAlert,
  AlertTriangle,
  Users,
  Layers,
  LayoutGrid,
  Megaphone,
  Shield,
  Target,
  Sparkles,
  Clock,
} from 'lucide-react';
import { InteractiveTimeline } from '@/components/InteractiveTimeline';
import { LegalExplainerCards } from '@/components/LegalExplainerCards';

const SEVERITY_META: Record<Incident['severity'], { label: string; icon: typeof ShieldAlert; tint: string }> = {
  extreme: { label: 'Extreme Severity', icon: ShieldAlert, tint: 'bg-red-50 text-red-700 border-red-200' },
  mild: { label: 'Mild / Systemic', icon: AlertTriangle, tint: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export function IncidentsPage() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [partyFilter, setPartyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'protest' | 'violence' | 'crisis'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'grouped' | 'list'>('timeline');

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
        !q ||
        inc.title.toLowerCase().includes(q) ||
        inc.description.toLowerCase().includes(q) ||
        (inc.location ?? '').toLowerCase().includes(q) ||
        (inc.demands ?? '').toLowerCase().includes(q) ||
        (inc.state_response ?? '').toLowerCase().includes(q) ||
        (inc.party_id && partyMap[inc.party_id]?.name.toLowerCase().includes(q)) ||
        (inc.party_id && partyMap[inc.party_id]?.abbreviation.toLowerCase().includes(q));

      const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;
      const matchesParty = partyFilter === 'all' || inc.party_id === partyFilter;
      const matchesCategory =
        categoryFilter === 'all' ||
        (categoryFilter === 'protest' && inc.category === 'protest') ||
        (categoryFilter === 'violence' && (inc.category === 'violence' || inc.category === 'terror')) ||
        (categoryFilter === 'crisis' && (inc.category === 'crisis' || inc.category === 'scandal' || inc.category === 'disaster'));

      return matchesQuery && matchesSeverity && matchesParty && matchesCategory;
    });
  }, [incidents, query, severityFilter, partyFilter, categoryFilter, partyMap]);

  const totalDeaths = useMemo(
    () => incidents.reduce((sum, i) => sum + (i.deaths_reported ?? 0), 0),
    [incidents]
  );

  const totalProtests = useMemo(
    () => incidents.filter((i) => i.category === 'protest').length,
    [incidents]
  );

  // Group filtered incidents party-wise
  const partyGroupedIncidents = useMemo(() => {
    const groups: { party: Party | null; items: Incident[] }[] = [];
    const partyIdSet = new Set(parties.map((p) => p.id));

    parties.forEach((p) => {
      const partyItems = filtered.filter((inc) => inc.party_id === p.id);
      if (partyItems.length > 0) {
        groups.push({ party: p, items: partyItems });
      }
    });

    const unassigned = filtered.filter((inc) => !inc.party_id || !partyIdSet.has(inc.party_id));
    if (unassigned.length > 0) {
      groups.push({ party: null, items: unassigned });
    }

    return groups;
  }, [filtered, parties]);

  const countsByParty = useMemo(() => {
    const map: Record<string, number> = {};
    incidents.forEach((inc) => {
      if (inc.party_id) {
        map[inc.party_id] = (map[inc.party_id] || 0) + 1;
      }
    });
    return map;
  }, [incidents]);

  if (loading)
    return (
      <div className="flex justify-center py-24 text-slate-400">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-[#E5E0D8] pb-5">
        <div className="inline-flex items-center gap-2 text-rose-700 font-bold text-xs tracking-wider uppercase">
          <Flame size={16} />
          <span>National Record of Crises & Public Accountability</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#181A19]">
          Major Incidents, Protests & Cases (Party-Wise)
        </h1>
        <p className="mt-1 max-w-3xl text-sm sm:text-base text-[#4A524D] leading-relaxed">
          Chronological reporting of latest mass protests, civil agitations, violent crises, and institutional responses across India through 2026.
          Each record details verified citizen demands, state/police action, casualty reporting, and judicial status, organized by governing party.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-2xl font-black text-slate-900">{incidents.length}</p>
          <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wide">Total Documented Records</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-black text-amber-700">{totalProtests}</p>
            <Megaphone size={18} className="text-amber-600" />
          </div>
          <p className="mt-1 text-xs font-semibold text-amber-800 uppercase tracking-wide">Latest Mass Protests</p>
        </div>
        <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-5 shadow-sm">
          <p className="text-2xl font-black text-rose-700">~{totalDeaths.toLocaleString('en-IN')}</p>
          <p className="mt-1 text-xs font-medium text-rose-600 uppercase tracking-wide">Reported Casualties</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-2xl font-black text-indigo-600">{parties.length}</p>
          <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wide">Governing Parties Tracked</p>
        </div>
      </div>

      {/* Category Tabs: All vs Protests vs Violence vs Crises */}
      <div className="mt-8 border-b border-slate-200 pb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`rounded-lg px-3.5 py-2 transition ${
              categoryFilter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Records ({incidents.length})
          </button>
          <button
            onClick={() => setCategoryFilter('protest')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
              categoryFilter === 'protest'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Megaphone size={13} />
            <span>Latest Protests & Agitations ({totalProtests})</span>
          </button>
          <button
            onClick={() => setCategoryFilter('violence')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
              categoryFilter === 'violence'
                ? 'bg-red-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Flame size={13} />
            <span>Riots, Terror & Violence</span>
          </button>
          <button
            onClick={() => setCategoryFilter('crisis')}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 transition ${
              categoryFilter === 'crisis'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles size={13} />
            <span>Governance Scandals & Crises</span>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-medium">
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition ${
              viewMode === 'timeline'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock size={13} />
            <span>Interactive Timeline</span>
          </button>
          <button
            onClick={() => setViewMode('grouped')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition ${
              viewMode === 'grouped'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers size={13} />
            <span>Group by Party</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid size={13} />
            <span>Unified Stream</span>
          </button>
        </div>
      </div>

      {/* Interactive Party Filter Chips */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPartyFilter('all')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition border ${
              partyFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Parties
          </button>
          {parties.map((p) => {
            const count = countsByParty[p.id] || 0;
            const isSelected = partyFilter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPartyFilter(isSelected ? 'all' : p.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A3D2F] text-white border-[#1A3D2F] shadow-xs'
                    : 'bg-white text-[#181A19] border-[#E5E0D8] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{p.abbreviation}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F5F2EB] text-[#5C6460]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Severity Filter Bar */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords, demands (e.g. MSP, paper leak, statehood, Article 361), location or party..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-100"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-slate-500 focus:outline-none"
            >
              <option value="all">All Severity Levels</option>
              <option value="extreme">Extreme Severity</option>
              <option value="mild">Mild / Systemic</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing {filtered.length} of {incidents.length} documented records</span>
        {(partyFilter !== 'all' || categoryFilter !== 'all' || query) && (
          <button
            onClick={() => {
              setPartyFilter('all');
              setCategoryFilter('all');
              setQuery('');
              setSeverityFilter('all');
            }}
            className="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-slate-50/50">
          <Megaphone size={32} className="mx-auto text-slate-300" />
          <h3 className="mt-3 text-sm font-semibold text-slate-700">No records match your filter criteria</h3>
          <p className="mt-1 text-xs text-slate-500">Try broadening your search term or switching the category/party filter.</p>
          <button
            onClick={() => {
              setQuery('');
              setSeverityFilter('all');
              setPartyFilter('all');
              setCategoryFilter('all');
            }}
            className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'timeline' ? (
        /* Interactive Timeline View */
        <div className="mt-8">
          <InteractiveTimeline incidents={filtered} partyMap={partyMap} />
        </div>
      ) : viewMode === 'grouped' ? (
        /* Party-wise Grouped View */
        <div className="mt-8 space-y-12">
          {partyGroupedIncidents.map(({ party, items }) => {
            const partyDeaths = items.reduce((sum, i) => sum + (i.deaths_reported ?? 0), 0);
            const partyProtests = items.filter((i) => i.category === 'protest').length;
            return (
              <section
                key={party?.id ?? 'unassigned'}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm"
              >
                {/* Party Section Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-900">
                          {party ? party.name : 'Other / Non-Partisan Records'}
                        </h2>
                        {party && (
                          <span className="rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-xs font-bold text-[#181A19]">
                            {party.abbreviation}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {party?.ideology || 'Documented public agitations and crises under this party tenure'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 shadow-xs">
                      <strong>{items.length}</strong> Total Records
                    </span>
                    {partyProtests > 0 && (
                      <span className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-800 shadow-xs flex items-center gap-1">
                        <Megaphone size={12} /> {partyProtests} Protests
                      </span>
                    )}
                    {partyDeaths > 0 && (
                      <span className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 shadow-xs">
                        ~{partyDeaths.toLocaleString('en-IN')} Casualties
                      </span>
                    )}
                    {party && (
                      <button
                        onClick={() => navigate(`/parties/${party.id}`)}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 underline"
                      >
                        View Party Dossier &rarr;
                      </button>
                    )}
                  </div>
                </div>

                {/* Cards for this party */}
                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {items.map((inc) => (
                    <IncidentCard key={inc.id} inc={inc} party={party} onNavigate={navigate} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* Unified Stream View */
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtered.map((inc) => {
            const party = inc.party_id ? partyMap[inc.party_id] : null;
            return <IncidentCard key={inc.id} inc={inc} party={party} onNavigate={navigate} />;
          })}
        </div>
      )}

      {/* Explainer Cards for Legal & Judicial Concepts */}
      <div className="mt-14 pt-8 border-t border-slate-200">
        <LegalExplainerCards />
      </div>
    </div>
  );
}

function IncidentCard({
  inc,
  party,
  onNavigate,
}: {
  inc: Incident;
  party: Party | null | undefined;
  onNavigate: (path: string) => void;
}) {
  const meta = SEVERITY_META[inc.severity];
  const Icon = meta.icon;
  const isProtest = inc.category === 'protest';

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {party && (
              <button
                onClick={() => onNavigate(`/parties/${party.id}`)}
                className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-xs font-bold text-[#181A19] hover:bg-[#E8F0EC] transition"
              >
                <span>{party.abbreviation}</span>
              </button>
            )}

            {isProtest ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                <Megaphone size={11} /> Mass Agitation & Protest
              </span>
            ) : inc.category === 'terror' ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 border border-red-300 px-2.5 py-0.5 text-xs font-bold text-red-900">
                <Flame size={11} /> Terror Attack
              </span>
            ) : inc.category === 'scandal' ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-xs font-bold text-purple-800">
                Constitutional Controversy
              </span>
            ) : null}

            {inc.deaths_reported != null && inc.deaths_reported > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-bold text-rose-700">
                <Users size={11} /> ~{inc.deaths_reported.toLocaleString('en-IN')} casualties
              </span>
            )}
          </div>

          <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.tint}`}>
            <Icon size={12} /> {meta.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">
          {inc.title}
        </h3>

        {/* Date & Location */}
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {inc.date_year && (
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Calendar size={12} /> {inc.date_year}
            </span>
          )}
          {inc.location && (
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin size={12} /> {inc.location}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {inc.description}
        </p>

        {/* Specific Box for Protesters' Demands */}
        {inc.demands && (
          <div className="mt-3.5 rounded-lg border border-indigo-100 bg-indigo-50/70 p-3.5">
            <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-[11px] uppercase tracking-wider">
              <Target size={13} className="text-indigo-600" />
              <span>Protesters' Core Demands</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">
              {inc.demands}
            </p>
          </div>
        )}

        {/* Specific Box for State & Police Action */}
        {inc.state_response && (
          <div className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50/60 p-3.5">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px] uppercase tracking-wider">
              <Shield size={13} className="text-amber-700" />
              <span>State & Law Enforcement Response</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">
              {inc.state_response}
            </p>
          </div>
        )}

        {/* Citizen Impact Callout Box */}
        {inc.citizen_impact && (
          <div className="mt-3 rounded-lg border border-red-100 bg-red-50/70 p-3.5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-red-800">
              Direct Impact on Citizens & Ground Reality
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-700 font-normal">
              {inc.citizen_impact}
            </p>
          </div>
        )}
      </div>

      {/* Citation / Source Footer */}
      {(inc.source_url || inc.source_name) && (
        <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-400 text-[11px] uppercase tracking-wider">Source Citation:</span>
          {inc.source_url ? (
            <a
              href={inc.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>{inc.source_name ?? 'Official Record / Court Order'}</span>
              <ExternalLink size={12} />
            </a>
          ) : (
            <span className="font-medium text-slate-600">{inc.source_name}</span>
          )}
        </div>
      )}
    </div>
  );
}
