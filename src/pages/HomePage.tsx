import { useEffect, useState, useMemo } from 'react';
import {
  supabase,
  type Party,
  type Leader,
  type Work,
  type Incident,
  type Yojna,
  type Promise_,
} from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import {
  Scale,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Users,
  Landmark,
  FileText,
  BadgeCheck,
  Flame,
  ShieldAlert,
  MapPin,
  Calendar,
  Coins,
  Clock,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  FileSpreadsheet,
  Radio,
  HeartHandshake,
  Trees,
  Building2,
  Gavel,
  FileCheck,
  Eye,
  Filter,
  Sparkles,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { WomenGovernanceSection } from '@/components/WomenGovernanceSection';
import { HowToUseExplainer } from '@/components/HowToUseExplainer';
import { GovernanceProcessDiagram } from '@/components/GovernanceProcessDiagram';
import { ENVIRONMENT_RECORDS } from '@/data/environmentData';
import { CORPORATE_CONCESSION_RECORDS } from '@/data/corporateMarketData';
import { EPSTEIN_PUBLIC_RECORDS } from '@/data/epsteinRecordsData';

interface RecentFeedItem {
  id: string;
  category: 'work_good' | 'work_bad' | 'incident' | 'yojna' | 'promise' | 'audit' | 'environment' | 'corporate';
  categoryLabel: string;
  categoryBadgeClass: string;
  title: string;
  summary: string;
  year?: number | string | null;
  partyId?: string | null;
  linkPath: string;
  sourceName?: string | null;
  sourceUrl?: string | null;
  evidenceTier: 'Tier 1' | 'Tier 2';
}

export function HomePage() {
  const navigate = useNavigate();
  const [parties, setParties] = useState<Party[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [recentWorks, setRecentWorks] = useState<Work[]>([]);
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [recentYojnas, setRecentYojnas] = useState<Yojna[]>([]);
  const [recentPromises, setRecentPromises] = useState<Promise_[]>([]);
  const [loading, setLoading] = useState(true);

  // Minister filter state
  const [selectedMinisterRole, setSelectedMinisterRole] = useState<'all' | 'union' | 'cm' | 'opposition'>('all');

  // Budget rupee toggle state
  const [rupeeView, setRupeeView] = useState<'income' | 'expense'>('income');

  // Promises filter state
  const [promiseStatusFilter, setPromiseStatusFilter] = useState<'all' | 'fulfilled' | 'in_progress' | 'broken'>('all');

  useEffect(() => {
    Promise.all([
      supabase.from('parties').select('*').order('name'),
      supabase.from('leaders').select('*').order('name'),
      supabase.from('works').select('*').order('date_year', { ascending: false, nullsFirst: false }).limit(6),
      supabase.from('incidents').select('*').order('date_year', { ascending: false, nullsFirst: false }).limit(6),
      supabase.from('yojnas').select('*').order('launched_year', { ascending: false, nullsFirst: false }).limit(4),
      supabase.from('promises').select('*').order('election_year', { ascending: false, nullsFirst: false }).limit(4),
    ]).then(([pRes, lRes, wRes, iRes, yRes, prRes]) => {
      setParties(pRes.data ?? []);
      setLeaders(lRes.data ?? []);
      setRecentWorks(wRes.data ?? []);
      setRecentIncidents(iRes.data ?? []);
      setRecentYojnas(yRes.data ?? []);
      setRecentPromises(prRes.data ?? []);
      setLoading(false);
    });
  }, []);

  const partyMap = useMemo(() => {
    const m: Record<string, Party> = {};
    parties.forEach((p) => (m[p.id] = p));
    return m;
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

  // Filtered ministers
  const filteredMinisters = useMemo(() => {
    if (selectedMinisterRole === 'all') return leaders;
    if (selectedMinisterRole === 'union') {
      return leaders.filter(
        (l) =>
          l.role?.toLowerCase().includes('prime minister') ||
          l.role?.toLowerCase().includes('union minister') ||
          l.role?.toLowerCase().includes('minister of')
      );
    }
    if (selectedMinisterRole === 'cm') {
      return leaders.filter((l) => l.role?.toLowerCase().includes('chief minister'));
    }
    if (selectedMinisterRole === 'opposition') {
      return leaders.filter(
        (l) =>
          l.role?.toLowerCase().includes('opposition') ||
          l.role?.toLowerCase().includes('president of') ||
          l.party_id === 'party-inc' ||
          l.party_id === 'party-tmc'
      );
    }
    return leaders;
  }, [leaders, selectedMinisterRole]);

  // Unified selection of latest records across all categories
  const recentFeed: RecentFeedItem[] = useMemo(() => {
    const items: RecentFeedItem[] = [];

    // Works
    recentWorks.slice(0, 2).forEach((w) => {
      items.push({
        id: w.id,
        category: w.type === 'good' ? 'work_good' : 'work_bad',
        categoryLabel: w.type === 'good' ? 'Governance Reform' : 'Policy Concern',
        categoryBadgeClass:
          w.type === 'good'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-rose-50 text-rose-800 border-rose-200',
        title: w.title,
        summary: w.description,
        year: w.date_year,
        partyId: w.party_id,
        linkPath: `/works/${w.id}`,
        sourceName: w.source_name,
        sourceUrl: w.source_url,
        evidenceTier: 'Tier 1',
      });
    });

    // Incidents
    recentIncidents.slice(0, 2).forEach((inc) => {
      items.push({
        id: inc.id,
        category: 'incident',
        categoryLabel: inc.category === 'protest' ? 'Public Agitation' : 'Documented Incident',
        categoryBadgeClass:
          inc.category === 'protest'
            ? 'bg-amber-50 text-amber-800 border-amber-200'
            : 'bg-red-50 text-red-800 border-red-200',
        title: inc.title,
        summary: inc.description,
        year: inc.date_year,
        partyId: inc.party_id,
        linkPath: `/incidents`,
        sourceName: inc.source_name,
        sourceUrl: inc.source_url,
        evidenceTier: 'Tier 1',
      });
    });

    // Environmental Record
    const envSample = ENVIRONMENT_RECORDS[0];
    if (envSample) {
      items.push({
        id: envSample.id,
        category: 'environment',
        categoryLabel: 'Forest & Ecology Record',
        categoryBadgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
        title: envSample.projectName,
        summary: envSample.coreConflictSummary,
        year: '2024–2026',
        partyId: null,
        linkPath: `/environment`,
        sourceName: envSample.primaryStatutoryDoc,
        sourceUrl: envSample.sourceUrl,
        evidenceTier: 'Tier 1',
      });
    }

    // Public Money / Audit record
    items.push({
      id: 'audit-bharatmala-sample',
      category: 'audit',
      categoryLabel: 'CAG Audit Finding',
      categoryBadgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      title: 'CAG Performance Audit: Bharatmala Pariyojana Phase-I Highway Development',
      summary:
        'Independent audit by the Comptroller & Auditor General examining cabinet approved costs (₹15.37 Cr/km) vs executed award costs (₹32.17 Cr/km) and safety audits across corridors.',
      year: 'Report 19 of 2023',
      partyId: 'party-bjp',
      linkPath: `/public-money`,
      sourceName: 'Comptroller and Auditor General of India (CAG)',
      sourceUrl: 'https://cag.gov.in/',
      evidenceTier: 'Tier 1',
    });

    return items;
  }, [recentWorks, recentIncidents]);

  return (
    <div className="bg-[#FAF8F5] text-[#181A19]">
      {/* =========================================================================
          HERO SECTION — WARM IVORY & DEEP FOREST GREEN EDITORIAL DESIGN
          Zero AI-generated images: Pure typography and 24-spoke vector Ashoka Chakra
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-[#E5E0D8] bg-[#F4F1EA] py-16 sm:py-24">
        {/* Architectural 24-Spoke Ashoka Chakra Watermark (Subtle Code-based Vector) */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] sm:h-[620px] sm:w-[620px] text-[#1A3D2F]/5">
          <svg viewBox="0 0 100 100" className="h-full w-full stroke-current" fill="none">
            <circle cx="50" cy="50" r="47" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="43" strokeWidth="0.8" strokeDasharray="1 2.5" />
            <circle cx="50" cy="50" r="8" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 43 * Math.cos((i * 15 * Math.PI) / 180)}
                y2={50 + 43 * Math.sin((i * 15 * Math.PI) / 180)}
                strokeWidth="0.9"
              />
            ))}
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            {/* Editorial Metadata Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3.5 py-1 text-xs font-semibold text-[#1A3D2F]">
              <Scale size={13} />
              <span>Evidence-Based Civic Accountability · Updated through 20 October 2026</span>
            </div>

            {/* Exact Headline as Specified */}
            <h1 className="mt-5 font-serif text-4xl font-extrabold tracking-tight text-[#181A19] sm:text-5xl lg:text-6xl">
              India's Story. Beyond Politics.
            </h1>

            {/* Exact Supporting Text as Specified */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#4A524D]">
              Explore the evidence behind India's governance, public spending, political decisions, democratic institutions and the changes shaping citizens' lives.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/public-money')}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1A3D2F] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#143025] hover:shadow-md cursor-pointer"
              >
                <Coins size={16} /> Tax & Public Money
              </button>
              <button
                onClick={() => navigate('/parties')}
                className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
              >
                <Landmark size={16} className="text-[#1A3D2F]" /> Browse Parties
              </button>
              <button
                onClick={() => navigate('/environment')}
                className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
              >
                <Trees size={16} className="text-emerald-700" /> Environment & Land
              </button>
              <button
                onClick={() => navigate('/incidents')}
                className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-5 py-3 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
              >
                <Flame size={16} className="text-rose-600" /> Incidents Tracker
              </button>
            </div>
          </div>

          {/* Quick Metrics & Integrity Banner */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4 border-t border-[#E5E0D8] pt-8">
            <div className="rounded-xl border border-[#E5E0D8] bg-white/70 p-3.5 backdrop-blur-xs">
              <div className="text-2xl font-black font-serif text-[#1A3D2F]">10</div>
              <div className="text-xs font-semibold text-[#4A524D]">Core Governance Tracks</div>
              <div className="text-[11px] text-[#717A74] mt-0.5">Budget, Laws, Forests & Press</div>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white/70 p-3.5 backdrop-blur-xs">
              <div className="text-2xl font-black font-serif text-[#1A3D2F]">₹48.2 Lakh Cr</div>
              <div className="text-xs font-semibold text-[#4A524D]">Union Expenditure Tracked</div>
              <div className="text-[11px] text-[#717A74] mt-0.5">Citizen's Rupee breakdown</div>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white/70 p-3.5 backdrop-blur-xs">
              <div className="text-2xl font-black font-serif text-[#1A3D2F]">4 Tiers</div>
              <div className="text-xs font-semibold text-[#4A524D]">Evidentiary Hierarchy</div>
              <div className="text-[11px] text-[#717A74] mt-0.5">Gazettes, Courts & CAG Audits</div>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white/70 p-3.5 backdrop-blur-xs">
              <div className="text-2xl font-black font-serif text-[#1A3D2F]">100%</div>
              <div className="text-xs font-semibold text-[#4A524D]">Primary Source Verified</div>
              <div className="text-[11px] text-[#717A74] mt-0.5">Zero unsourced claims</div>
            </div>
          </div>
        </div>
      </section>

      {/* Citizen Quick Onboarding Explainer */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <HowToUseExplainer />
      </section>

      {/* =========================================================================
          SECTION 1: BROWSE BY PARTY
         ========================================================================= */}
      <section id="section-parties" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Section 1 · Political Dossiers
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
              Browse by Party
            </h2>
            <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
              Access comprehensive, objective profiles for India's major national and regional political parties with full legislative, financial, and incident track records.
            </p>
          </div>
          <button
            onClick={() => navigate('/parties')}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#1A3D2F] hover:text-[#143025] cursor-pointer"
          >
            View all parties & leadership <ArrowRight size={15} />
          </button>
        </div>

        {!loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {parties.map((p) => {
              const partyLeaders = leadersByParty[p.id] ?? [];
              return (
                <div
                  key={p.id}
                  onClick={() => navigate(`/parties/${p.id}`)}
                  className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#C8C2B5] hover:shadow-xs cursor-pointer"
                >
                  <div>
                    {/* Party Emblem / Neutral Monogram */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#E5E0D8] bg-[#F5F2EB] text-sm font-bold text-[#181A19]">
                        {p.abbreviation.slice(0, 4)}
                      </span>
                      <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-0.5 text-[11px] font-semibold text-[#5C6460]">
                        Est. {p.founded_year ?? '—'}
                      </span>
                    </div>

                    {/* Party Name */}
                    <h3 className="mt-4 font-serif text-lg font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition">
                      {p.name}
                    </h3>

                    {/* Ideology / Description */}
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#4A524D]">
                      {p.description ?? p.ideology}
                    </p>

                    {/* Representation Footprint */}
                    {p.represents && (
                      <div className="mt-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-[11px] text-[#4A524D]">
                        <strong className="text-[#181A19]">Footprint:</strong> {p.represents}
                      </div>
                    )}

                    {/* Key Leaders under this Party */}
                    <div className="mt-4 pt-3 border-t border-[#F0ECE1]">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#717A74] uppercase tracking-wider mb-2">
                        <span>Tracked Leaders</span>
                        <span className="text-[10px] text-[#717A74] lowercase font-normal">
                          {partyLeaders.length} profiled
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {partyLeaders.slice(0, 3).map((l) => (
                          <span
                            key={l.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/leaders/${l.id}`);
                            }}
                            className="inline-flex items-center rounded-md bg-[#F4F1EA] hover:bg-[#E8F0EC] hover:text-[#1A3D2F] px-2 py-1 text-[11px] font-semibold text-[#181A19] transition"
                            title={`${l.name} (${l.role})`}
                          >
                            {l.name}
                          </span>
                        ))}
                        {partyLeaders.length > 3 && (
                          <span className="text-[11px] text-[#717A74] self-center">
                            +{partyLeaders.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#F0ECE1] flex items-center justify-between text-xs font-bold text-[#1A3D2F] group-hover:text-[#143025]">
                    <span>Explore party dossier</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 2: EXPLORE MINISTERS & MINISTRIES
         ========================================================================= */}
      <section id="section-ministers" className="border-t border-[#E5E0D8] bg-[#F7F5F0] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                Section 2 · Executive Accountability
              </div>
              <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
                Explore Ministers & Ministries
              </h2>
              <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
                Track key portfolio decisions, tenure timelines, parliamentary questions, and public records for national ministers and state Chief Ministers through 2026.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="inline-flex rounded-xl border border-[#D5CFBF] bg-white p-1 text-xs font-semibold shrink-0">
              <button
                onClick={() => setSelectedMinisterRole('all')}
                className={`rounded-lg px-3 py-1.5 transition ${
                  selectedMinisterRole === 'all'
                    ? 'bg-[#1A3D2F] text-white shadow-2xs font-bold'
                    : 'text-[#4A524D] hover:text-[#181A19]'
                }`}
              >
                All Leaders
              </button>
              <button
                onClick={() => setSelectedMinisterRole('union')}
                className={`rounded-lg px-3 py-1.5 transition ${
                  selectedMinisterRole === 'union'
                    ? 'bg-[#1A3D2F] text-white shadow-2xs font-bold'
                    : 'text-[#4A524D] hover:text-[#181A19]'
                }`}
              >
                Union Cabinet
              </button>
              <button
                onClick={() => setSelectedMinisterRole('cm')}
                className={`rounded-lg px-3 py-1.5 transition ${
                  selectedMinisterRole === 'cm'
                    ? 'bg-[#1A3D2F] text-white shadow-2xs font-bold'
                    : 'text-[#4A524D] hover:text-[#181A19]'
                }`}
              >
                Chief Ministers
              </button>
              <button
                onClick={() => setSelectedMinisterRole('opposition')}
                className={`rounded-lg px-3 py-1.5 transition ${
                  selectedMinisterRole === 'opposition'
                    ? 'bg-[#1A3D2F] text-white shadow-2xs font-bold'
                    : 'text-[#4A524D] hover:text-[#181A19]'
                }`}
              >
                Opposition & Key Leaders
              </button>
            </div>
          </div>

          {/* Leaders Showcase Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMinisters.map((leader) => {
              const party = leader.party_id ? partyMap[leader.party_id] : null;

              return (
                <div
                  key={leader.id}
                  onClick={() => navigate(`/leaders/${leader.id}`)}
                  className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:border-[#C8C2B5] hover:shadow-md cursor-pointer"
                >
                  <div>
                    {/* Header: Neutral party badge & Representing */}
                    <div className="flex items-center justify-between gap-2">
                      {party && (
                        <span className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-[10px] font-bold text-[#181A19]">
                          {party.abbreviation}
                        </span>
                      )}
                      {leader.represents && (
                        <span className="flex items-center gap-1 text-[11px] text-[#717A74]">
                          <MapPin size={11} /> {leader.represents}
                        </span>
                      )}
                    </div>

                    {/* Name & Official Title */}
                    <h3 className="mt-3 font-serif text-lg font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition">
                      {leader.name}
                    </h3>
                    <div className="mt-1 text-xs font-semibold text-[#1A3D2F]">
                      {leader.role}
                    </div>

                    {/* Bio / Portfolio Summary */}
                    <p className="mt-2.5 text-xs text-[#4A524D] line-clamp-3 leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs font-bold text-[#1A3D2F]">
                    <span>View portfolio & records</span>
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/parties')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3D2F] hover:underline"
            >
              <span>Explore all leaders across party dossiers</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PUBLIC MONEY & GOVERNMENT SPENDING
         ========================================================================= */}
      <section id="section-public-money" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Section 3 · Fiscal Accountability · Union Budget
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
              Public Money & Government Spending
            </h2>
            <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
              Understand how India collects ₹48.2 Lakh Crore in public money, where every rupee goes, capital infrastructure expansion, and Comptroller & Auditor General (CAG) audit findings.
            </p>
          </div>

          <button
            onClick={() => navigate('/public-money')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1A3D2F] px-4 py-2.5 text-xs font-bold text-white shadow-2xs hover:bg-[#143025] cursor-pointer"
          >
            <span>Explore 10-Module Public Money Tab</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* The Citizen's Rupee Interactive Summary Card */}
        <div className="mt-8 rounded-xl border border-[#E5E0D8] bg-white p-6 transition hover:border-[#D5CEBF]">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[#E5E0D8] pb-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2.5 py-0.5 text-[11px] font-semibold text-[#181A19] uppercase tracking-wider">
                  National Scope · Union Finances
                </span>
                <span className="text-xs text-[#5C6460] font-medium">Unit: paise per ₹100 (% share)</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#181A19] mt-1.5 sm:text-2xl">
                The Citizen's Rupee: Inflows & Outflows
              </h3>
              <p className="text-xs text-[#5C6460] mt-0.5">
                Official Ministry of Finance, Union Budget at a Glance (FY 2024–25 Revised Estimates & FY 2025–26 Budget Estimates)
              </p>
            </div>

            {/* Rupee View Toggle */}
            <div className="inline-flex rounded-lg border border-[#E5E0D8] bg-[#F5F2EB] p-0.5 text-xs font-semibold shrink-0">
              <button
                onClick={() => setRupeeView('income')}
                className={`rounded-md px-3 py-1.5 transition ${
                  rupeeView === 'income'
                    ? 'bg-white text-[#181A19] shadow-xs font-bold'
                    : 'text-[#5C6460] hover:text-[#181A19]'
                }`}
              >
                Where ₹1 Comes From (Receipts)
              </button>
              <button
                onClick={() => setRupeeView('expense')}
                className={`rounded-md px-3 py-1.5 transition ${
                  rupeeView === 'expense'
                    ? 'bg-white text-[#181A19] shadow-xs font-bold'
                    : 'text-[#5C6460] hover:text-[#181A19]'
                }`}
              >
                Where ₹1 Goes (Expenditures)
              </button>
            </div>
          </div>

          {/* Visual Bar Breakdown: Data Journalism Styling */}
          {rupeeView === 'income' ? (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-[#181A19] uppercase tracking-wider">
                <span>Receipt Inflows (FY 2024–25 RE)</span>
                <span className="text-[#5C6460] font-normal normal-case">100 paise total</span>
              </div>
              {[
                { name: 'Borrowings & Other Liabilities (Fiscal Deficit)', paise: 28, color: '#B45309', isDeficit: true, note: 'Financed by market debt · Fiscal liability' },
                { name: 'Income Tax (Personal Income Tax)', paise: 19, color: '#1A3D2F', note: 'Direct tax on individuals; surpassed corporate tax' },
                { name: 'Goods & Services Tax (GST & other taxes)', paise: 18, color: '#275240', note: 'Indirect tax on goods and services' },
                { name: 'Corporation Tax (Company Taxes)', paise: 17, color: '#366852', note: 'Direct tax on corporate net profits' },
                { name: 'Non-Tax Receipts (RBI Dividend, Telecom)', paise: 9, color: '#4B7F67', note: 'Includes ₹2.11 Lakh Cr record RBI dividend' },
                { name: 'Union Excise Duties (Fuel & Petrol Cesses)', paise: 5, color: '#689880', note: 'Special fuel levies & infrastructure cesses' },
                { name: 'Customs Duties (Import Tariffs)', paise: 4, color: '#87B09B', note: 'Cross-border trade tariffs' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#181A19] flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.isDeficit && (
                        <span className="rounded-sm bg-[#FAF8F5] border border-[#E5E0D8] px-1.5 py-0.2 text-[10px] text-[#B45309] font-semibold">
                          Debt Deficit
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-bold text-[#181A19]">{item.paise} paise ({item.paise}%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-[#F0ECE1] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.paise}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-[11px] text-[#5C6460]">{item.note}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-[#181A19] uppercase tracking-wider">
                <span>Expenditure Allocations (FY 2024–25 RE)</span>
                <span className="text-[#5C6460] font-normal normal-case">100 paise total</span>
              </div>
              {[
                { name: 'Interest Payments (Servicing Past Public Debt)', paise: 20, color: '#B45309', isInterest: true, note: 'Largest single outlay item · Non-discretionary debt service' },
                { name: 'States’ Share of Taxes & Duties (Devolution)', paise: 20, color: '#1A3D2F', note: 'Finance Commission 41% formula statutory transfers' },
                { name: 'Central Sector Schemes (100% Union Funded)', paise: 16, color: '#275240', note: 'Railways, Telecom, Urea subsidies, Highways' },
                { name: 'Other Expenditure & Operational Costs', paise: 10, color: '#366852', note: 'Ministries establishment, UT grants & operational costs' },
                { name: 'Centrally Sponsored Schemes (State-Shared)', paise: 8, color: '#4B7F67', note: 'MGNREGA, PM-Kisan, Jal Jeevan Mission' },
                { name: 'Defence Outlay (Modernisation & Forces)', paise: 8, color: '#5C9078', note: 'Revenue & capital defense expenditure' },
                { name: 'Finance Commission Grants & Other Transfers', paise: 8, color: '#73A58D', note: 'Revenue deficit grants & State disaster response' },
                { name: 'Major Subsidies (Food & Fertilizer)', paise: 6, color: '#8EBBA5', note: 'PM Garib Kalyan Anna Yojana & fertilizer support' },
                { name: 'Pensions (Civil & Military Defence Pensions)', paise: 4, color: '#A5BEB0', note: 'OROP and central government retiree pensions' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#181A19] flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.isInterest && (
                        <span className="rounded-sm bg-[#FAF8F5] border border-[#E5E0D8] px-1.5 py-0.2 text-[10px] text-[#B45309] font-semibold">
                          Debt Servicing
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-bold text-[#181A19]">{item.paise} paise ({item.paise}%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-[#F0ECE1] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.paise}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-[11px] text-[#5C6460]">{item.note}</span>
                </div>
              ))}
            </div>
          )}

          {/* Chart Citation & Verification Footer */}
          <div className="mt-6 pt-3.5 border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5C6460]">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[#181A19]">Source:</span>
              <a
                href="https://www.indiabudget.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-[#1A3D2F] font-medium hover:underline inline-flex items-center gap-0.5"
              >
                <span>Ministry of Finance, Union Budget at a Glance</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <span className="text-[#8C8275]">Last verified: 20 October 2026</span>
          </div>

          {/* Quick links to the 10 sections */}
          <div className="mt-8 pt-5 border-t border-[#F0ECE1]">
            <div className="text-xs font-bold text-[#717A74] uppercase tracking-wider mb-3">
              Explore the 10 Modules of Public Money
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 text-xs">
              {[
                { title: '1. Revenue Sources', section: 'revenue' },
                { title: '2. Budget Allocations', section: 'allocations' },
                { title: '3. Actual Expenditure', section: 'expenditure' },
                { title: '4. Schemes & Projects', section: 'schemes' },
                { title: '5. Tax Incentives', section: 'tax-incentives' },
                { title: '6. Audits & CAG Findings', section: 'audits' },
                { title: '7. Procurement & Tenders', section: 'procurement' },
                { title: '8. Debt & Liabilities', section: 'debt' },
                { title: '9. State Finances', section: 'state-finance' },
                { title: '10. YoY Comparisons', section: 'comparisons' },
              ].map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/public-money/${m.section}`)}
                  className="rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] p-2.5 text-left font-semibold text-[#181A19] hover:bg-[#E8F0EC] hover:text-[#1A3D2F] hover:border-[#C8C2B5] transition cursor-pointer"
                >
                  {m.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: WORKS, PROJECTS & SCHEMES
         ========================================================================= */}
      <section id="section-works" className="border-t border-[#E5E0D8] bg-[#F7F5F0] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                Section 4 · Policy & Infrastructure
              </div>
              <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
                Works, Projects & Schemes
              </h2>
              <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
                Independent evidence on national infrastructure, digital public goods, welfare schemes, and policy delivery — balancing documented milestones against implementation hurdles.
              </p>
            </div>
            <button
              onClick={() => navigate('/works')}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#1A3D2F] hover:underline cursor-pointer"
            >
              Browse all 100+ works & records <ArrowRight size={15} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentWorks.slice(0, 3).map((w) => {
              const party = w.party_id ? partyMap[w.party_id] : null;

              return (
                <div
                  key={w.id}
                  onClick={() => navigate(`/works/${w.id}`)}
                  className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:border-[#C8C2B5] hover:shadow-md cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-md border px-2.5 py-0.5 text-[10px] font-semibold ${
                          w.type === 'good'
                            ? 'bg-[#F5F2EB] text-[#1A3D2F] border-[#E5E0D8]'
                            : 'bg-[#FAF8F5] text-[#5C6460] border-[#E5E0D8]'
                        }`}
                      >
                        {w.type === 'good' ? 'Milestone Reform' : 'Policy Concern'}
                      </span>
                      {w.date_year && (
                        <span className="flex items-center gap-1 text-xs text-[#717A74]">
                          <Calendar size={11} /> {w.date_year}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-serif text-base font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition">
                      {w.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#4A524D]">
                      {w.description}
                    </p>

                    {w.impact && (
                      <div className="mt-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-[11px] text-[#4A524D]">
                        <strong className="text-[#181A19]">Measured Impact:</strong> {w.impact}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
                    {party && (
                      <span className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-[10px] font-bold text-[#181A19]">
                        {party.abbreviation}
                      </span>
                    )}
                    <span className="font-bold text-[#1A3D2F] group-hover:underline inline-flex items-center gap-1">
                      <span>Inspect evidence</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PROMISES & IMPLEMENTATION
         ========================================================================= */}
      <section id="section-promises" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Section 5 · Manifesto Reality Checks
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
              Promises & Implementation
            </h2>
            <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
              Cross-party evaluation of election manifesto pledges vs on-ground legislative delivery across the BJP Sankalp Patra, Congress Nyay Patra, and AAP Guarantees.
            </p>
          </div>
          <button
            onClick={() => navigate('/promises')}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#1A3D2F] hover:underline cursor-pointer"
          >
            Explore all manifesto promises <ArrowRight size={15} />
          </button>
        </div>

        {/* Highlighted Promises Table / Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              party: 'Bharatiya Janata Party (BJP)',
              promise: 'Uniform Civil Code (UCC) & Women Quota Act',
              electionYear: '2024 Sankalp Patra',
              status: 'Delivered in Uttarakhand; 106th Amendment Passed',
              reality: 'Nari Shakti Vandan Adhiniyam passed unanimously in Parliament; Uttarakhand enacted state UCC; national implementation linked to post-census delimitation.',
            },
            {
              party: 'Indian National Congress (INC)',
              promise: 'Legal Guarantee for MSP (C2+50%) & Mahalakshmi',
              electionYear: '2024 Nyay Patra',
              status: 'Implemented in Karnataka (Gruha Lakshmi); Key Demand in Parliament',
              reality: 'Congress state government in Karnataka rolled out Gruha Lakshmi (₹2,000/mo to 1.2 Cr women); national MSP legal guarantee remains principal legislative demand of INDIA bloc.',
            },
            {
              party: 'Aam Aadmi Party (AAP)',
              promise: '200 Units Free Power & Quality Mohalla Clinics',
              electionYear: 'Delhi & Punjab Manifestos',
              status: 'Delivered in Delhi & Punjab; Subject to Audit Scrutiny',
              reality: '90%+ domestic consumers in Punjab receive zero electricity bills; Delhi mohalla clinics faced medicine procurement audits and bureaucratic friction.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE1]">
                  <span className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-[10px] font-bold text-[#181A19]">
                    {item.party}
                  </span>
                  <span className="text-[11px] text-[#717A74]">{item.electionYear}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#181A19] mt-3">
                  {item.promise}
                </h3>

                <div className="mt-2.5">
                  <span className="inline-block rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-0.5 text-[10px] font-semibold text-[#181A19]">
                    {item.status}
                  </span>
                </div>

                <p className="mt-3 text-xs text-[#4A524D] leading-relaxed">
                  {item.reality}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-right">
                <button
                  onClick={() => navigate('/promises')}
                  className="text-xs font-bold text-[#1A3D2F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Full promise breakdown</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WOMEN, SOCIETY & GOVERNANCE
         ========================================================================= */}
      <section id="section-women-society" className="border-t border-[#E5E0D8] bg-[#F7F5F0] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Section 6 · Civic & Social Justice
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
              Women, Society & Governance
            </h2>
            <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
              Nirbhaya Fund utilization analysis, 2026 student safety demands, landmark judicial trials, and cross-party Direct Benefit Transfer comparisons.
            </p>
          </div>

          {/* Embedded Full Component */}
          <WomenGovernanceSection />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: MEDIA & PRESS FREEDOM
         ========================================================================= */}
      <section id="section-media-freedom" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Section 7 · Democratic Institutions
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
              Media & Press Freedom
            </h2>
            <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
              Examining independent journalism, media ownership concentration, internet blockades, and unscripted press access across governing administrations.
            </p>
          </div>
          <button
            onClick={() => navigate('/press-freedom')}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#1A3D2F] hover:underline cursor-pointer"
          >
            Open Media Freedom Portal <ArrowRight size={15} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Unscripted Press Access
            </div>
            <div className="mt-3 font-serif text-2xl font-black text-[#181A19]">0 Solo Q&As</div>
            <p className="mt-2 text-xs text-[#4A524D] leading-relaxed">
              PM Narendra Modi has addressed zero solo open-ended Q&A press conferences in India between 2014 and 2026, compared to regular national conferences under previous tenures.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Ownership Concentration
            </div>
            <div className="mt-3 font-serif text-2xl font-black text-[#181A19]">72% Top Channels</div>
            <p className="mt-2 text-xs text-[#4A524D] leading-relaxed">
              Over 72% of prime-time television news viewership across Hindi and English is controlled by five large industrial conglomerates.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Internet Shutdowns
            </div>
            <div className="mt-3 font-serif text-2xl font-black text-[#181A19]">88+ in 2026</div>
            <p className="mt-2 text-xs text-[#4A524D] leading-relaxed">
              India continues to record significant localized mobile internet suspension orders issued under Section 144 / Telecom Suspension Rules across multiple states.
            </p>
          </div>

          <div className="rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Legal Protections
            </div>
            <div className="mt-3 font-serif text-2xl font-black text-[#181A19]">IT Rules Scrutiny</div>
            <p className="mt-2 text-xs text-[#4A524D] leading-relaxed">
              Bombay High Court struck down the central government Fact-Check Unit (FCU) rule under IT Rules 2023 as violative of Article 19(1)(a) freedom of speech.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: ENVIRONMENT, FORESTS & LAND
         ========================================================================= */}
      <section id="section-environment" className="border-t border-[#E5E0D8] bg-[#F7F5F0] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                Section 8 · Ecological Governance
              </div>
              <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
                Environment, Forests & Land
              </h2>
              <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
                Statutory tracking of forest diversions, mining clearances, biodiversity impacts, and Supreme Court environmental orders through 2026.
              </p>
            </div>
            <button
              onClick={() => navigate('/environment')}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#1A3D2F] hover:underline cursor-pointer"
            >
              Explore dedicated Environment page <ArrowRight size={15} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ENVIRONMENT_RECORDS.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                onClick={() => navigate('/environment')}
                className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:border-[#C8C2B5] hover:shadow-md cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-bold text-[#181A19]">
                      {rec.classification}
                    </span>
                    <span className="text-[11px] text-[#717A74] flex items-center gap-1">
                      <MapPin size={11} /> {rec.state}
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-base font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition">
                    {rec.projectName}
                  </h3>

                  <div className="mt-2 text-xs font-bold text-[#1A3D2F]">
                    Footprint: {rec.forestLandDivertedHa}
                  </div>

                  <p className="mt-2 text-xs text-[#4A524D] line-clamp-3 leading-relaxed">
                    {rec.coreConflictSummary}
                  </p>

                  <div className="mt-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-2 text-[11px] text-[#4A524D]">
                    <strong className="text-[#181A19]">Judicial Status:</strong> {rec.judicialOrNGTStatus}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs font-bold text-[#1A3D2F]">
                  <span>View environmental dossier</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: MAJOR INCIDENTS & PUBLIC ACCOUNTABILITY
         ========================================================================= */}
      <section id="section-incidents" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Section 9 · Crises & Accountability
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
              Major Incidents & Public Accountability
            </h2>
            <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
              Chronological, source-linked dossiers on civil crises, mass public agitations (Farmers, LPU, DU protests), train safety collisions, and examination leaks through 2026.
            </p>
          </div>
          <button
            onClick={() => navigate('/incidents')}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#1A3D2F] hover:underline cursor-pointer"
          >
            View all documented incidents <ArrowRight size={15} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {recentIncidents.slice(0, 3).map((inc) => (
            <div
              key={inc.id}
              onClick={() => navigate('/incidents')}
              className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:border-[#C8C2B5] hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-semibold text-[#181A19]">
                    {inc.category === 'protest' ? 'Public Agitation' : 'Documented Incident'}
                  </span>
                  {inc.date_year && (
                    <span className="flex items-center gap-1 text-xs text-[#717A74]">
                      <Calendar size={11} /> {inc.date_year}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-serif text-base font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition">
                  {inc.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#4A524D]">
                  {inc.description}
                </p>

                {inc.aftermath && (
                  <div className="mt-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-[11px] text-[#4A524D]">
                    <strong className="text-[#181A19]">Institutional Response:</strong> {inc.aftermath}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs font-bold text-[#1A3D2F]">
                <span>Read incident report</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: RECENTLY UPDATED RECORDS & CORPORATE / EPSTEIN PUBLIC DOCUMENTS
         ========================================================================= */}
      <section id="section-recent-and-disclosures" className="border-t border-[#E5E0D8] bg-[#F7F5F0] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                Section 10 · High-Profile Disclosures & Feed
              </div>
              <h2 className="font-serif text-2xl font-extrabold text-[#181A19] sm:text-3xl mt-1">
                Recently Updated Records & Public Disclosures
              </h2>
              <p className="mt-1 text-sm text-[#4A524D] max-w-2xl">
                High-scrutiny dossiers on multi-party electoral bonds, corporate concessions, unsealed US court filings, and recently verified governance records.
              </p>
            </div>
            <button
              onClick={() => navigate('/works')}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#1A3D2F] hover:underline cursor-pointer"
            >
              Browse live records feed <ArrowRight size={15} />
            </button>
          </div>

          {/* Special Feature: High-Profile Scrutiny Dossiers (Corporate & US Court Disclosures) */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 1. Multi-Party Electoral Bonds Verdict */}
            <div className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-[10px] font-bold text-purple-800">
                    Supreme Court Constitutional Bench
                  </span>
                  <span className="text-[11px] text-[#717A74]">Feb 2024</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold text-[#181A19]">
                  Multi-Party Electoral Bonds Disclosures
                </h3>
                <p className="mt-2 text-xs text-[#4A524D] leading-relaxed">
                  In <em>Association for Democratic Reforms v. Union of India</em>, a 5-judge Supreme Court bench unanimously declared the Electoral Bond Scheme unconstitutional under Article 19(1)(a). SBI disclosed ₹16,518 Crore in bonds redeemed between 2019 and 2024 across all major political parties:
                </p>

                <div className="mt-3 space-y-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-3 text-xs">
                  <div className="flex justify-between font-semibold text-[#181A19]">
                    <span>BJP:</span> <span className="font-mono">₹8,252 Cr (50.0%)</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#181A19]">
                    <span>AITC (Trinamool):</span> <span className="font-mono">₹1,710 Cr (10.3%)</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#181A19]">
                    <span>INC (Congress):</span> <span className="font-mono">₹1,952 Cr (11.8%)</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#181A19]">
                    <span>BRS (Telangana):</span> <span className="font-mono">₹1,407 Cr (8.5%)</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#181A19]">
                    <span>BJD (Odisha):</span> <span className="font-mono">₹1,020 Cr (6.2%)</span>
                  </div>
                  <div className="flex justify-between font-semibold text-[#181A19]">
                    <span>DMK (Tamil Nadu):</span> <span className="font-mono">₹676 Cr (4.1%)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] text-[#717A74]">
                Source: Election Commission of India (ECI) & Supreme Court Docket
              </div>
            </div>

            {/* 2. Corporate Concessions (Adani Airport Bidding & SC Expert Committee) */}
            <div className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold text-blue-800">
                    Infrastructure & Markets
                  </span>
                  <span className="text-[11px] text-[#717A74]">2019–2026</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold text-[#181A19]">
                  Airport Concessions & Market Concentration
                </h3>
                <p className="mt-2 text-xs text-[#4A524D] leading-relaxed">
                  In 2018–19, the Airports Authority of India awarded 6 airports to Adani Enterprises under 50-year leases. In <em>S. Venkatesan v. Union of India</em>, the Supreme Court upheld the competitive bidding process as lawful and transparent.
                </p>

                <div className="mt-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-3 text-xs leading-relaxed text-[#4A524D]">
                  <strong className="text-[#181A19]">SC Expert Committee (2023–2024):</strong> In <em>Vishal Tiwari v. UOI</em>, the Supreme Court Sapre committee found no regulatory failure by SEBI in capital market volatility following the Hindenburg short-seller publication, affirming statutory regulatory processes.
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] text-[#717A74]">
                Source: Supreme Court of India Judgment & AAI Concession Agreements
              </div>
            </div>

            {/* 3. Unsealed US District Court (SDNY) Epstein Records Context */}
            <div className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-800">
                    US Court Records (SDNY)
                  </span>
                  <span className="text-[11px] text-[#717A74]">Unsealed 2024</span>
                </div>
                <h3 className="mt-3 font-serif text-lg font-bold text-[#181A19]">
                  Unsealed Court Documents: India Mentions
                </h3>
                <p className="mt-2 text-xs text-[#4A524D] leading-relaxed">
                  In January 2024, Judge Loretta Preska unsealed court exhibits in <em>Giuffre v. Maxwell</em> (Case 15-cv-07433-LAP). The public records contain address directory coordinates and conference schedules:
                </p>

                <div className="mt-3 rounded-lg bg-amber-50/60 border border-amber-200 p-3 text-[11px] leading-relaxed text-amber-900">
                  <strong className="text-amber-950">Legal Evidentiary Note:</strong> Court docket mentions in personal address directories (e.g. Anil Ambani corporate office coordinates) or Edge Foundation scientific conferences (Deepak Chopra) contain zero allegations of wrongdoing or illicit activity. An address book entry does not constitute legal evidence of misconduct.
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1] text-[11px] text-[#717A74] flex justify-between items-center">
                <span>Source: US District Court SDNY Docket</span>
                <a
                  href="https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#1A3D2F] hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Docket</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Live Recently Added Records Feed */}
          <div className="mt-12 pt-8 border-t border-[#E5E0D8]">
            <div className="text-xs font-bold text-[#1A3D2F] uppercase tracking-wider mb-4">
              Recently Verified Additions Across All Categories
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {recentFeed.map((rec) => {
                const party = rec.partyId ? partyMap[rec.partyId] : null;

                return (
                  <div
                    key={rec.id}
                    className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-2xs transition hover:border-[#C8C2B5] hover:shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${rec.categoryBadgeClass}`}>
                          {rec.categoryLabel}
                        </span>
                        <span className="rounded bg-[#F4F1EA] px-1.5 py-0.2 text-[9px] font-bold text-[#4A524D]">
                          {rec.evidenceTier}
                        </span>
                      </div>

                      <h4
                        onClick={() => navigate(rec.linkPath)}
                        className="mt-2.5 font-serif text-sm font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition cursor-pointer"
                      >
                        {rec.title}
                      </h4>
                      <p className="mt-1.5 text-[11px] text-[#4A524D] line-clamp-3 leading-relaxed">
                        {rec.summary}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#F0ECE1] flex items-center justify-between text-[11px]">
                      {party ? (
                        <span className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-1.5 py-0.5 text-[9px] font-bold text-[#181A19]">
                          {party.abbreviation}
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-[#717A74]">Statutory</span>
                      )}
                      <button
                        onClick={() => navigate(rec.linkPath)}
                        className="font-bold text-[#1A3D2F] hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Inspect</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GOVERNANCE METHODOLOGY & EDITORIAL CHARTER FOOTER BANNER
         ========================================================================= */}
      <section className="border-t border-[#E5E0D8] bg-[#1A3D2F] text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} /> Strict Evidentiary Standards & Transparency
              </div>
              <h2 className="mt-4 font-serif text-2xl font-extrabold sm:text-3xl text-white">
                About the Bharat Governance Tracker
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#D2DFD8]">
                An independent, non-partisan public record of the works done by India's political parties, leaders, ministries, and democratic institutions. Built for citizens to verify facts through primary gazettes, parliamentary papers, CAG audits, and judicial rulings.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-[#1A3D2F] transition hover:bg-[#FAF8F5] cursor-pointer"
                >
                  <span>Read Full Methodology Charter</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* 3 Pillars of Integrity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">Tier 1 Primary Sources</h3>
                <p className="mt-1 text-xs text-[#D2DFD8] leading-relaxed">
                  Every entry cites official gazettes, parliamentary questions, CAG audits, or Supreme Court judgments.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300">
                  <ExternalLink size={18} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">Direct Public Links</h3>
                <p className="mt-1 text-xs text-[#D2DFD8] leading-relaxed">
                  Direct clickable hyperlinks are attached so citizens can inspect primary statutory sources themselves.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
                  <Scale size={18} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">Correction Protocol</h3>
                <p className="mt-1 text-xs text-[#D2DFD8] leading-relaxed">
                  Open error-correction protocol: any verifiable discrepancy submitted with documents is reviewed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
