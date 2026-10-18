import { useEffect, useState, useMemo } from 'react';
import { supabase, type Party, type Leader, type Work, type Incident, type Yojna, type Promise_ } from '@/lib/supabase';
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
} from 'lucide-react';

interface RecentFeedItem {
  id: string;
  category: 'work_good' | 'work_bad' | 'incident' | 'yojna' | 'promise' | 'audit';
  categoryLabel: string;
  categoryBadgeClass: string;
  title: string;
  summary: string;
  year?: number | string | null;
  partyId?: string | null;
  linkPath: string;
  sourceName?: string | null;
  sourceUrl?: string | null;
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

  useEffect(() => {
    Promise.all([
      supabase.from('parties').select('*').order('name'),
      supabase.from('leaders').select('*').order('name'),
      supabase.from('works').select('*').order('date_year', { ascending: false, nullsFirst: false }).limit(4),
      supabase.from('incidents').select('*').order('date_year', { ascending: false, nullsFirst: false }).limit(3),
      supabase.from('yojnas').select('*').order('launched_year', { ascending: false, nullsFirst: false }).limit(2),
      supabase.from('promises').select('*').order('election_year', { ascending: false, nullsFirst: false }).limit(2),
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
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-rose-50 text-rose-700 border-rose-200',
        title: w.title,
        summary: w.description,
        year: w.date_year,
        partyId: w.party_id,
        linkPath: `/works/${w.id}`,
        sourceName: w.source_name,
        sourceUrl: w.source_url,
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
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : 'bg-red-50 text-red-700 border-red-200',
        title: inc.title,
        summary: inc.description,
        year: inc.date_year,
        partyId: inc.party_id,
        linkPath: `/incidents`,
        sourceName: inc.source_name,
        sourceUrl: inc.source_url,
      });
    });

    // Yojnas
    recentYojnas.slice(0, 1).forEach((y) => {
      items.push({
        id: y.id,
        category: 'yojna',
        categoryLabel: 'Public Scheme Delivery',
        categoryBadgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
        title: y.title,
        summary: y.description,
        year: y.launched_year,
        partyId: y.party_id,
        linkPath: `/yojnas`,
        sourceName: y.source_name,
        sourceUrl: y.source_url,
      });
    });

    // Public Money / Audit record
    items.push({
      id: 'audit-bharatmala-sample',
      category: 'audit',
      categoryLabel: 'CAG Audit Finding',
      categoryBadgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'CAG Performance Audit: Bharatmala Pariyojana Phase-I Highway Development',
      summary:
        'Independent audit by the Comptroller & Auditor General examining cabinet approved costs (₹15.37 Cr/km) vs executed award costs (₹32.17 Cr/km) and safety audits across corridors.',
      year: 'Report 19 of 2023',
      partyId: 'party-bjp',
      linkPath: `/public-money/audits`,
      sourceName: 'Comptroller and Auditor General of India (CAG)',
      sourceUrl: 'https://cag.gov.in/',
    });

    return items;
  }, [recentWorks, recentIncidents, recentYojnas]);

  return (
    <div>
      {/* 1. HERO SECTION (Kept 100% exactly as it is visually) */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)',
            backgroundSize: '48px 48px, 64px 64px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
              <Scale size={14} /> Transparent · Source-Linked · Organized Party-Wise
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Track the record of India's political parties — the good, the bad, and major crises.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              A comprehensive citizen portal tracking major political parties, key national leaders, governance achievements,
              unfulfilled promises, and major violent incidents (such as Pahalgam, Manipur, and state crises) with verified sources.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/public-money')}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 shadow-md"
              >
                <Coins size={16} /> Tax & Public Money
              </button>
              <button
                onClick={() => navigate('/incidents')}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-700 shadow-md"
              >
                <Flame size={16} /> Major Incidents Tracker
              </button>
              <button
                onClick={() => navigate('/parties')}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 shadow-md"
              >
                Browse Parties <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/works')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Works & Schemes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1 BELOW HERO: BROWSE BY PARTY */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Landmark size={14} />
              <span>Political Dossiers</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl mt-1">
              Browse by Party
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Access comprehensive, objective profiles for India's major national and regional political parties.
            </p>
          </div>
          <button
            onClick={() => navigate('/parties')}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View all parties <ArrowRight size={15} />
          </button>
        </div>

        {!loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {parties.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/parties/${p.id}`)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md cursor-pointer"
              >
                <div>
                  {/* Party Symbol / Logo Emblem */}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex h-13 w-13 items-center justify-center rounded-xl text-base font-black text-white shadow-xs"
                      style={{ backgroundColor: p.color_hex ?? '#1f2937' }}
                    >
                      {p.abbreviation.slice(0, 4)}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                      Est. {p.founded_year ?? '—'}
                    </span>
                  </div>

                  {/* Party Name */}
                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {p.name}
                  </h3>

                  {/* Neutral Description */}
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">
                    {p.description ?? p.ideology}
                  </p>

                  {/* Representation Footprint */}
                  {p.represents && (
                    <div className="mt-3 rounded-lg bg-slate-50 border border-slate-100 p-2.5 text-[11px] text-slate-600">
                      <strong className="text-slate-700">Footprint:</strong> {p.represents}
                    </div>
                  )}

                  {/* Key Leaders under this Party */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      <span className="flex items-center gap-1">
                        <Users size={12} className="text-slate-400" />
                        <span>Key Leaders</span>
                      </span>
                      <span className="text-[10px] text-slate-400 lowercase font-normal">
                        {(leadersByParty[p.id] ?? []).length} tracked
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(leadersByParty[p.id] ?? []).map((l) => (
                        <span
                          key={l.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/leaders/${l.id}`);
                          }}
                          className="inline-flex items-center gap-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 px-2 py-1 text-[11px] font-semibold text-slate-700 transition"
                          title={`${l.name} (${l.role})`}
                        >
                          {l.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Explore full party dossier</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. SECTION 2 BELOW HERO: RECENTLY ADDED RECORDS */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <Clock size={14} />
                <span>Verified Updates</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl mt-1">
                Recently Added Records
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-2xl">
                A selection of recently verified entries across governance reforms, welfare delivery, manifesto promises, and independent audits.
              </p>
            </div>
            <button
              onClick={() => navigate('/works')}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Browse all records <ArrowRight size={15} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {recentFeed.map((rec) => {
              const party = rec.partyId ? partyMap[rec.partyId] : null;

              return (
                <div
                  key={rec.id}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-md"
                >
                  <div>
                    {/* Header meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${rec.categoryBadgeClass}`}>
                        {rec.categoryLabel}
                      </span>

                      {rec.year && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar size={12} /> {rec.year}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => navigate(rec.linkPath)}
                      className="mt-3 text-base font-bold text-slate-900 group-hover:text-blue-600 transition cursor-pointer"
                    >
                      {rec.title}
                    </h3>

                    {/* Summary */}
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">
                      {rec.summary}
                    </p>
                  </div>

                  {/* Footer Source and Link */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      {party ? (
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs"
                          style={{ backgroundColor: party.color_hex ?? '#334155' }}
                        >
                          {party.abbreviation}
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          Union Record
                        </span>
                      )}

                      <button
                        onClick={() => navigate(rec.linkPath)}
                        className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-1 text-xs"
                      >
                        <span>View details</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    {rec.sourceName && (
                      <div className="text-[11px] text-slate-400 truncate">
                        Source:{' '}
                        {rec.sourceUrl ? (
                          <a
                            href={rec.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-slate-500 hover:text-slate-800 underline inline-flex items-center gap-0.5"
                          >
                            <span className="truncate">{rec.sourceName}</span>
                            <ExternalLink size={10} className="shrink-0" />
                          </a>
                        ) : (
                          <span className="font-medium text-slate-500">{rec.sourceName}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION 3 BELOW HERO: EXPLORE BY TOPIC */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Layers size={14} />
            <span>Structured Governance Database</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl mt-1">
            Explore by Topic
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Navigate specific governance tracks, examine primary government allocations, and evaluate manifesto delivery.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ExploreCard
            icon={Coins}
            tint="bg-emerald-600 text-white"
            title="Tax & Public Money"
            desc="Where ₹1 comes from & goes, capex outlays, and CAG audit findings."
            onClick={() => navigate('/public-money')}
          />
          <ExploreCard
            icon={Radio}
            tint="bg-indigo-600 text-white"
            title="Media & Press Freedom"
            desc="Journalist safety, ownership disclosures, censorship, and leader interviews."
            onClick={() => navigate('/press-freedom')}
          />
          <ExploreCard
            icon={FileText}
            tint="bg-blue-600 text-white"
            title="Government Yojnas"
            desc="Claimed targets vs verified ground implementation of welfare schemes."
            onClick={() => navigate('/yojnas')}
          />
          <ExploreCard
            icon={BadgeCheck}
            tint="bg-purple-600 text-white"
            title="Election Promises"
            desc="Manifesto promises reality checks: fulfilled, broken, or abandoned."
            onClick={() => navigate('/promises')}
          />
          <ExploreCard
            icon={Scale}
            tint="bg-slate-900 text-white"
            title="Works & Records"
            desc="Major policy reforms, digital public goods, scams, and track records."
            onClick={() => navigate('/works')}
          />
          <ExploreCard
            icon={Flame}
            tint="bg-rose-600 text-white"
            title="Incidents & Protests"
            desc="Documented violent crises, mass agitations, riots, and state actions."
            onClick={() => navigate('/incidents')}
          />
        </div>
      </section>

      {/* 5. SECTION 4 BELOW HERO: ABOUT THE TRACKER */}
      <section className="bg-slate-900 text-white py-14 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} /> Evidence Standards & Transparency
              </div>
              <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                About the Bharat Governance Tracker
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                An independent, public record of the works done by India's political parties and leaders — both achievements and documented concerns. Built for citizens to stay informed through verified primary sources.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
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
                <h3 className="mt-3 text-sm font-bold text-white">Primary Sources</h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Every claim is backed by official gazettes, Parliament questions, CAG audits, or judicial records.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                  <ExternalLink size={18} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">Direct Public Links</h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  We attach clickable links to primary sources so citizens can inspect and verify the facts themselves.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
                  <Scale size={18} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">Correction Process</h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Open error-correction protocol: any verifiable discrepancy submitted with documents is promptly addressed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ExploreCard({
  icon: Icon,
  tint,
  title,
  desc,
  onClick,
}: {
  icon: typeof Scale;
  tint: string;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-xs transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md cursor-pointer"
    >
      <div>
        <div className={`mb-3 inline-flex w-fit rounded-lg p-2.5 ${tint}`}>
          <Icon size={20} />
        </div>
        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition">{title}</h3>
        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
      <div className="mt-4 pt-2 flex items-center gap-1 text-[11px] font-semibold text-blue-600 group-hover:underline">
        <span>Explore directory</span>
        <ArrowRight size={12} />
      </div>
    </button>
  );
}
