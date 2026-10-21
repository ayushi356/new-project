import { useParties } from '@/lib/hooks/parties';
import { useNavigate } from '@/lib/router';
import {
  Loader,
  Landmark,
  Calendar,
  Users as UsersIcon,
  AlertTriangle,
  FileText,
  BadgeCheck,
  ArrowRight,
  Compass,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Search,
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
      <div className="flex justify-center py-24 text-[#717A74]">
        <Loader className="h-8 w-8 animate-spin text-[#1A3D2F]" />
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-5 gap-4">
        <div>
          <div className="text-[#1A3D2F] font-bold text-xs tracking-wider uppercase">
            Political Dossiers & Leadership Profiles
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#181A19]">
            Browse by Political Parties
          </h1>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-[#4A524D] leading-relaxed">
            Explore major national and regional political parties, their tracked governance tenures, policy records, and prominent leadership figures through 2026.
          </p>
        </div>

        {/* View Switcher: Parties vs Leaders under Parties */}
        <div className="flex items-center gap-1 rounded-xl bg-[#F4F1EA] p-1 self-start sm:self-auto shrink-0 border border-[#E5E0D8]">
          <button
            onClick={() => setViewMode('parties')}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
              viewMode === 'parties'
                ? 'bg-[#1A3D2F] text-white shadow-2xs'
                : 'text-[#4A524D] hover:text-[#181A19]'
            }`}
          >
            Party Dossiers ({parties.length})
          </button>
          <button
            onClick={() => setViewMode('leaders')}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
              viewMode === 'leaders'
                ? 'bg-[#1A3D2F] text-white shadow-2xs'
                : 'text-[#4A524D] hover:text-[#181A19]'
            }`}
          >
            Leaders by Party ({leaders.length})
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
                className="flex flex-col justify-between rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-2xs transition hover:shadow-md hover:border-[#C8C2B5]"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5E0D8] bg-[#F5F2EB] text-sm font-bold text-[#181A19]">
                        {p.abbreviation.slice(0, 4)}
                      </span>
                      <div>
                        <h2
                          className="font-serif text-xl font-bold text-[#181A19] hover:text-[#1A3D2F] transition cursor-pointer"
                          onClick={() => navigate(`/parties/${p.id}`)}
                        >
                          {p.name}
                        </h2>
                        <span className="inline-block mt-0.5 text-xs font-semibold text-[#717A74]">
                          Founded {p.founded_year ?? '—'} • {p.abbreviation}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/parties/${p.id}`)}
                      className="inline-flex items-center gap-1 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] px-3 py-1.5 text-xs font-bold text-[#1A3D2F] hover:bg-[#E8F0EC] transition shrink-0 cursor-pointer"
                    >
                      <span>View Dossier</span>
                      <ArrowRight size={13} strokeWidth={1.5} />
                    </button>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#4A524D] line-clamp-3">
                    {p.description}
                  </p>

                  {p.ideology && (
                    <div className="mt-3">
                      <span className="inline-block rounded-md bg-[#FAF8F5] border border-[#E5E0D8] px-2.5 py-1 text-xs font-semibold text-[#4A524D]">
                        {p.ideology}
                      </span>
                    </div>
                  )}

                  {/* Prominent Leaders Visible under this Party */}
                  <div className="mt-5 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-3.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#717A74] uppercase tracking-wider mb-2">
                      <span>Key Leaders & Representatives</span>
                      <button
                        onClick={() => navigate(`/parties/${p.id}#leaders`)}
                        className="text-[#1A3D2F] hover:underline lowercase font-semibold cursor-pointer"
                      >
                        view all ({partyLeadersList.length}) &rarr;
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {partyLeadersList.map((l) => (
                        <button
                          key={l.id}
                          onClick={() => navigate(`/leaders/${l.id}`)}
                          className="group/btn inline-flex items-center gap-1.5 rounded-lg border border-[#E5E0D8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#181A19] hover:border-[#1A3D2F] hover:text-[#1A3D2F] transition shadow-2xs cursor-pointer"
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#E5E0D8] bg-[#F5F2EB] text-[10px] font-bold text-[#181A19]">
                            {l.name.charAt(0)}
                          </span>
                          <span>{l.name}</span>
                          <span className="text-[10px] text-[#717A74] group-hover/btn:text-[#1A3D2F]">
                            ({(l.role ?? 'Leader').split('(')[0].trim().slice(0, 22)}...)
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Multi-pillar Stats Bar */}
                <div className="mt-6 border-t border-[#F0ECE1] pt-4">
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center">
                    <div
                      onClick={() => navigate(`/parties/${p.id}#leaders`)}
                      className="rounded-lg bg-[#FAF8F5] p-2 hover:bg-[#E8F0EC] transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#181A19]">{c?.leader_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-[#717A74] flex items-center justify-center gap-1 mt-0.5">
                        <UsersIcon size={10} strokeWidth={1.5} /> Leaders
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/parties/${p.id}#works`)}
                      className="rounded-lg bg-[#FAF8F5] p-2 hover:bg-[#E8F0EC] transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#181A19]">{c?.work_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-[#717A74] flex items-center justify-center gap-1 mt-0.5">
                        Works
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/parties/${p.id}#incidents`)}
                      className="rounded-lg bg-rose-50/60 border border-rose-100 p-2 hover:bg-rose-100/60 transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-rose-700">{c?.incident_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-rose-600 flex items-center justify-center gap-1 mt-0.5">
                        <AlertTriangle size={10} strokeWidth={1.5} /> Incidents
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/parties/${p.id}#promises-schemes`)}
                      className="rounded-lg bg-[#FAF8F5] p-2 hover:bg-[#E8F0EC] transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#181A19]">{c?.yojna_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-[#717A74] flex items-center justify-center gap-1 mt-0.5">
                        <FileText size={10} strokeWidth={1.5} /> Yojnas
                      </p>
                    </div>
                    <div
                      onClick={() => navigate(`/parties/${p.id}#promises-schemes`)}
                      className="rounded-lg bg-[#FAF8F5] p-2 hover:bg-[#E8F0EC] transition cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#181A19]">{c?.promise_count ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wide text-[#717A74] flex items-center justify-center gap-1 mt-0.5">
                        <BadgeCheck size={10} strokeWidth={1.5} /> Promises
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#E5E0D8] bg-white p-4 shadow-2xs">
            <p className="text-xs text-[#4A524D]">
              Showing key party leaders organized under each respective political party. Click any leader to view their complete dossier, verified works, and parliamentary records.
            </p>
            <div className="relative">
              <Search size={14} strokeWidth={1.5} className="absolute left-3 top-3 text-[#717A74]" />
              <input
                type="text"
                placeholder="Search leader by name, constituency, role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] pl-8 pr-3.5 py-2 text-xs text-[#181A19] placeholder-[#717A74] focus:bg-white focus:outline-hidden min-w-[280px]"
              />
            </div>
          </div>

          {parties.map((p) => {
            const partyLeaders = filteredLeaders.filter((l) => l.party_id === p.id);
            if (partyLeaders.length === 0 && searchQuery) return null;

            return (
              <div
                key={p.id}
                className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-2xs space-y-5"
              >
                {/* Party Section Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F0ECE1] pb-4 gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5E0D8] bg-[#F5F2EB] text-sm font-bold text-[#181A19]">
                      {p.abbreviation.slice(0, 4)}
                    </span>
                    <div>
                      <h2 className="font-serif text-xl font-bold text-[#181A19]">{p.name}</h2>
                      <p className="text-xs text-[#717A74]">
                        {partyLeaders.length} leader{partyLeaders.length !== 1 ? 's' : ''} tracked under this party
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/parties/${p.id}`)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] px-3.5 py-2 text-xs font-bold text-[#1A3D2F] hover:bg-[#E8F0EC] transition self-start sm:self-auto cursor-pointer"
                  >
                    <span>View Full Party Dossier</span>
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Leaders Grid under this party */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {partyLeaders.map((l) => (
                    <div
                      key={l.id}
                      onClick={() => navigate(`/leaders/${l.id}`)}
                      className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 transition hover:bg-white hover:border-[#1A3D2F] hover:shadow-xs cursor-pointer"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-base font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition">
                            {l.name}
                          </h3>
                          <span className="rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-[10px] font-bold text-[#181A19] shrink-0">
                            {p.abbreviation}
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-semibold text-[#1A3D2F]">
                          {l.role}
                        </p>

                        {l.represents && (
                          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#717A74]">
                            <MapPin size={11} strokeWidth={1.5} className="shrink-0 text-[#1A3D2F]" />
                            <span className="truncate">{l.represents}</span>
                          </div>
                        )}

                        {l.bio && (
                          <p className="mt-2 text-xs text-[#4A524D] line-clamp-2 leading-relaxed">
                            {l.bio}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-[#E5E0D8] flex items-center justify-between text-xs font-bold text-[#1A3D2F]">
                        <span>View complete dossier</span>
                        <ArrowRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
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
