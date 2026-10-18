import { useParties } from '@/lib/hooks/parties';
import { useNavigate } from '@/lib/router';
import {
  Loader,
  Landmark,
  Calendar,
  Users as UsersIcon,
  Flame,
  FileText,
  BadgeCheck,
  ArrowRight,
  Compass,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { supabase, type Leader } from '@/lib/supabase';

type PartyCounts = {
  id: string;
  leader_count: number;
  work_count: number;
  incident_count: number;
  yojna_count: number;
  promise_count: number;
};

export function PartiesPage() {
  const { parties, loading } = useParties();
  const navigate = useNavigate();
  const [counts, setCounts] = useState<Record<string, PartyCounts>>({});
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [viewMode, setViewMode] = useState<'parties' | 'leaders'>('parties');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (parties.length === 0) return;
    const ids = parties.map((p) => p.id);
    Promise.all([
      supabase.from('leaders').select('*').order('name'),
      supabase.from('works').select('party_id'),
      supabase.from('incidents').select('party_id'),
      supabase.from('yojnas').select('party_id'),
      supabase.from('promises').select('party_id'),
    ]).then(([lRes, wRes, iRes, yRes, prRes]) => {
      setLeaders(lRes.data ?? []);
      const c: Record<string, PartyCounts> = {};
      ids.forEach(
        (id) =>
          (c[id] = {
            id,
            leader_count: 0,
            work_count: 0,
            incident_count: 0,
            yojna_count: 0,
            promise_count: 0,
          })
      );
      (lRes.data ?? []).forEach((r: Leader) => {
        if (r.party_id && c[r.party_id]) c[r.party_id].leader_count += 1;
      });
      (wRes.data ?? []).forEach((r: { party_id: string | null }) => {
        if (r.party_id && c[r.party_id]) c[r.party_id].work_count += 1;
      });
      (iRes.data ?? []).forEach((r: { party_id: string | null }) => {
        if (r.party_id && c[r.party_id]) c[r.party_id].incident_count += 1;
      });
      (yRes.data ?? []).forEach((r: { party_id: string | null }) => {
        if (r.party_id && c[r.party_id]) c[r.party_id].yojna_count += 1;
      });
      (prRes.data ?? []).forEach((r: { party_id: string | null }) => {
        if (r.party_id && c[r.party_id]) c[r.party_id].promise_count += 1;
      });
      setCounts(c);
    });
  }, [parties]);

  const leadersByParty = useMemo(() => {
    const map: Record<string, Leader[]> = {};
    leaders.forEach((l) => {
      if (l.party_id) {
        if (!map[l.party_id]) map[l.party_id] = [];
        map[l.party_id].push(l);
      }
    });
    return map;
  }, [leaders]);

  const filteredLeaders = useMemo(() => {
    if (!searchQuery.trim()) return leaders;
    const q = searchQuery.toLowerCase();
    return leaders.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.role && l.role.toLowerCase().includes(q)) ||
        (l.represents && l.represents.toLowerCase().includes(q))
    );
  }, [leaders, searchQuery]);

  if (loading)
    return (
      <div className="flex justify-center py-24 text-slate-400">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs tracking-wider uppercase">
            <Landmark size={16} />
            <span>Political Dossiers & Leadership</span>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Browse by Political Parties
          </h1>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            Explore major national and regional political parties, their tracked governance tenures, policy records, and prominent leadership figures.
          </p>
        </div>

        {/* View Switcher: Parties vs Leaders under Parties */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 self-start sm:self-auto shrink-0 border border-slate-200">
          <button
            onClick={() => setViewMode('parties')}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'parties'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Landmark size={14} />
            <span>Party Dossiers ({parties.length})</span>
          </button>
          <button
            onClick={() => setViewMode('leaders')}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'leaders'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UsersIcon size={14} />
            <span>Leaders by Party ({leaders.length})</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          MODE 1: PARTY OVERVIEW CARDS
          ======================================================== */}
      {viewMode === 'parties' && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {parties.map((p) => {
            const c = counts[p.id];
            const partyLeadersList = leadersByParty[p.id] ?? [];

            return (
              <div
                key={p.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-slate-300"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-white shadow-xs"
                        style={{ backgroundColor: p.color_hex ?? '#1f2937' }}
                      >
                        {p.abbreviation.slice(0, 4)}
                      </span>
                      <div>
                        <h2
                          className="text-lg font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer"
                          onClick={() => navigate(`/parties/${p.id}`)}
                        >
                          {p.name}
                        </h2>
                        <span className="inline-block mt-0.5 text-xs font-semibold text-slate-500">
                          Founded {p.founded_year ?? '—'} • {p.abbreviation}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/parties/${p.id}`)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shrink-0"
                    >
                      <span>View Dossier</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {p.description}
                  </p>

                  {p.ideology && (
                    <div className="mt-3">
                      <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {p.ideology}
                      </span>
                    </div>
                  )}

                  {/* Prominent Leaders Visible under this Party */}
                  <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      <span className="flex items-center gap-1.5">
                        <UsersIcon size={12} className="text-slate-400" />
                        <span>Key Leaders & Representatives</span>
                      </span>
                      <button
                        onClick={() => navigate(`/parties/${p.id}#leaders`)}
                        className="text-blue-600 hover:underline lowercase font-semibold"
                      >
                        view all ({partyLeadersList.length}) &rarr;
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {partyLeadersList.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => navigate(`/leaders/${l.id}`)}
                          className="group/btn inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-600 transition shadow-2xs"
                        >
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{ backgroundColor: p.color_hex ?? '#334155' }}
                          >
                            {l.name.charAt(0)}
                          </span>
                          <span>{l.name}</span>
                          <span className="text-[10px] text-slate-400 group-hover/btn:text-blue-500">
                            ({l.role.split('(')[0].trim().slice(0, 24)}...)
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Multi-pillar Stats Bar */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center">
                    <div
                      onClick={() => navigate(`/parties/${p.id}#leaders`)}
                      className="rounded-lg bg-slate-50 p-2 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-slate-900">{c?.leader_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                        <UsersIcon size={10} /> Leaders
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/parties/${p.id}#works`)}
                      className="rounded-lg bg-slate-50 p-2 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-slate-900">{c?.work_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                        Works
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/parties/${p.id}#incidents`)}
                      className="rounded-lg bg-rose-50/60 border border-rose-100 p-2 hover:bg-rose-100/60 transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-rose-700">{c?.incident_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-rose-600 flex items-center justify-center gap-1 mt-0.5">
                        <Flame size={10} /> Incidents
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/parties/${p.id}#promises-schemes`)}
                      className="rounded-lg bg-slate-50 p-2 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-slate-900">{c?.yojna_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                        <FileText size={10} /> Yojnas
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/parties/${p.id}#promises-schemes`)}
                      className="rounded-lg bg-slate-50 p-2 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-slate-900">{c?.promise_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                        <BadgeCheck size={10} /> Promises
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================
          MODE 2: BROWSE LEADERS BY PARTY
          ======================================================== */}
      {viewMode === 'leaders' && (
        <div className="mt-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            <p className="text-xs text-slate-600">
              Showing key party leaders organized under each respective political party. Click any leader to view their complete dossier, verified works, and parliamentary records.
            </p>
            <input
              type="text"
              placeholder="Search leader by name, constituency, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden min-w-[280px]"
            />
          </div>

          {parties.map((p) => {
            const partyLeaders = filteredLeaders.filter((l) => l.party_id === p.id);
            if (partyLeaders.length === 0 && searchQuery) return null;

            return (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5"
              >
                {/* Party Section Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white shadow-xs"
                      style={{ backgroundColor: p.color_hex ?? '#1f2937' }}
                    >
                      {p.abbreviation.slice(0, 4)}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{p.name}</h2>
                      <p className="text-xs text-slate-500">{p.ideology ?? 'National Party'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/parties/${p.id}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <span>Explore {p.abbreviation} Full Party Profile (7 Pillars)</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* Leaders Grid for this Party */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {partyLeaders.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => navigate(`/leaders/${l.id}`)}
                      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:border-slate-300 hover:shadow-md cursor-pointer"
                    >
                      <div>
                        <div className="flex items-start gap-3">
                          <span
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white shadow-xs"
                            style={{ backgroundColor: p.color_hex ?? '#334155' }}
                          >
                            {l.name.charAt(0)}
                          </span>
                          <div className="min-w-0">
                            <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition truncate">
                              {l.name}
                            </h3>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{l.role}</p>
                            {l.represents && (
                              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 truncate">
                                <MapPin size={10} /> {l.represents}
                              </p>
                            )}
                          </div>
                        </div>

                        {l.bio && (
                          <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
                            {l.bio}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-500 flex items-center gap-1">
                          <ShieldCheck size={12} className="text-indigo-600" />
                          Individual Dossier
                        </span>
                        <span className="font-semibold text-blue-600 group-hover:underline">
                          View Record &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
