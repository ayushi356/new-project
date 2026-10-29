import { useEffect, useState, useMemo } from 'react';
import { supabase, type Leader, type Party, type Work } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import { WorkCard } from '@/components/Work';
import {
  ArrowLeft,
  Loader,
  Building2,
  Users as UsersIcon,
  Compass,
  Calendar,
  Newspaper,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Building,
  Award,
  FileCheck2,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { LEADER_INTERVIEW_RECORDS } from '@/data/mediaFreedomData';

// Milestone tenure definitions for key political leaders
const LEADER_TENURE_MILESTONES: Record<
  string,
  { period: string; roleTitle: string; institution: string; keyDecisions: string }[]
> = {
  'leader-modi': [
    {
      period: '2024 – Present',
      roleTitle: 'Prime Minister of India (3rd Term / NDA Coalition)',
      institution: 'Prime Minister’s Office (Union of India)',
      keyDecisions: 'Unified Pension Scheme (UPS), digital public goods expansion, third-term cabinet allocations.',
    },
    {
      period: '2019 – 2024',
      roleTitle: 'Prime Minister of India (2nd Term / Single-Party Majority)',
      institution: 'Prime Minister’s Office (Union of India)',
      keyDecisions: 'Abrogation of Article 370, Ram Mandir consecration, PM-KISAN rollout, Production Linked Incentive (PLI) schemes.',
    },
    {
      period: '2014 – 2019',
      roleTitle: 'Prime Minister of India (1st Term)',
      institution: 'Prime Minister’s Office (Union of India)',
      keyDecisions: '2016 Overnight Demonetization, GST introduction, Pradhan Mantri Jan Dhan Yojana (500M+ accounts), Swachh Bharat Abhiyan.',
    },
    {
      period: '2001 – 2014',
      roleTitle: 'Chief Minister of Gujarat (4 Consecutive Terms)',
      institution: 'Government of Gujarat',
      keyDecisions: 'Vibrant Gujarat investor summits, Jyotigram Yojana (24x7 rural power), reconstruction post-2001 earthquake.',
    },
  ],
  'leader-rahul': [
    {
      period: 'June 2024 – Present',
      roleTitle: 'Leader of the Opposition (Lok Sabha)',
      institution: 'Parliament of India (18th Lok Sabha)',
      keyDecisions: 'Principal opposition leader; leading parliamentary debates on caste census, paper leak scandals, and state violence.',
    },
    {
      period: '2022 – 2024',
      roleTitle: 'Convener, Bharat Jodo Yatra & Bharat Jodo Nyay Yatra',
      institution: 'All India Congress Committee (AICC)',
      keyDecisions: '4,000+ km civil march from Kanyakumari to Kashmir; mobilization on economic inequality, federalism, and social justice.',
    },
    {
      period: '2017 – 2019',
      roleTitle: 'President, Indian National Congress',
      institution: 'Indian National Congress',
      keyDecisions: 'Led 2019 general election campaign focusing on NYAY minimum income guarantee and Rafale inquiry.',
    },
    {
      period: '2004 – 2019',
      roleTitle: 'Member of Parliament (Amethi / Wayanad / Rae Bareli)',
      institution: 'Lok Sabha',
      keyDecisions: 'Advocated for rights-based legislation under UPA (MGNREGA, Land Acquisition Act 2013).',
    },
  ],
  'leader-gadkari': [
    {
      period: '2014 – Present',
      roleTitle: 'Union Minister of Road Transport & Highways',
      institution: 'Ministry of Road Transport and Highways (MoRTH)',
      keyDecisions: 'Expanded national highway pace from 12 km/day to over 30 km/day; Bharatmala expressway network; FASTag electronic toll collection.',
    },
    {
      period: '2009 – 2013',
      roleTitle: 'National President, Bharatiya Janata Party',
      institution: 'BJP National Headquarters',
      keyDecisions: 'Modernized party infrastructure, emphasized economic pragmatism and infrastructure vision.',
    },
    {
      period: '1995 – 1999',
      roleTitle: 'Minister of Public Works (PWD), Maharashtra',
      institution: 'Government of Maharashtra',
      keyDecisions: 'Built the Mumbai-Pune Expressway (India’s first access-controlled expressway) and 55 flyovers in Mumbai.',
    },
  ],
  'leader-kejriwal': [
    {
      period: '2015 – 2024',
      roleTitle: 'Chief Minister of Delhi (3 Consecutive Terms)',
      institution: 'Government of NCT of Delhi',
      keyDecisions: '200 units free electricity, free lifeline water, transformation of government schools, Mohalla Clinics, doorstep public delivery.',
    },
    {
      period: '2013 – 2014',
      roleTitle: 'Chief Minister of Delhi (49-Day Minority Administration)',
      institution: 'Government of NCT of Delhi',
      keyDecisions: 'Drafted Delhi Jan Lokpal Bill; resigned following deadlock in assembly.',
    },
    {
      period: '2011 – 2012',
      roleTitle: 'Key Strategist, India Against Corruption (IAC)',
      institution: 'Civil Society Movement',
      keyDecisions: 'Nationwide anti-graft agitation demanding statutory Lokpal ombudsman.',
    },
  ],
  'leader-rekha-gupta': [
    {
      period: 'Feb 2025 – Present',
      roleTitle: 'Chief Minister of Delhi',
      institution: 'Government of NCT of Delhi',
      keyDecisions: 'Accelerated municipal legacy waste bioremediation at Ghazipur and Bhalswa; Yamuna rejuvenation cleanup mission; restored weekly open-door press briefings.',
    },
    {
      period: '2007 – 2022',
      roleTitle: 'Municipal Councillor & Leader of House (North MCD)',
      institution: 'Municipal Corporation of Delhi (MCD)',
      keyDecisions: 'Spearheaded civic sanitation overhauls, digital trade licenses, and municipal school infrastructure.',
    },
    {
      period: '1996 – 1997',
      roleTitle: 'President, Delhi University Students Union (DUSU)',
      institution: 'Delhi University',
      keyDecisions: 'Campus student safety initiatives and collegiate welfare programs.',
    },
  ],
  'leader-atishi': [
    {
      period: '2024 – 2025',
      roleTitle: 'Chief Minister of Delhi',
      institution: 'Government of NCT of Delhi',
      keyDecisions: 'Maintained continuity of utility subsidies (power and water); directed city flood prevention and winter air pollution measures.',
    },
    {
      period: '2023 – 2024',
      roleTitle: 'Cabinet Minister (Education, PWD, Power, Finance)',
      institution: 'Government of NCT of Delhi',
      keyDecisions: 'Managed multiple high-stakes portfolios during administrative crisis; presented the 2024 Delhi State Budget.',
    },
    {
      period: '2015 – 2018',
      roleTitle: 'Advisor to Deputy Chief Minister (Education)',
      institution: 'Delhi Directorate of Education',
      keyDecisions: 'Architect of "Mission Buniyaad", Happiness Curriculum, and school management committee empowerment.',
    },
  ],
  'leader-shah': [
    {
      period: '2019 – Present',
      roleTitle: 'Union Minister of Home Affairs & Minister of Co-operation',
      institution: 'Ministry of Home Affairs (Union of India)',
      keyDecisions: 'Piloted Jammu & Kashmir Reorganisation Act 2019, Citizenship Amendment Act (CAA), Bharatiya Nyaya Sanhita (criminal code reforms).',
    },
    {
      period: '2014 – 2020',
      roleTitle: 'National President, Bharatiya Janata Party',
      institution: 'BJP Central Leadership',
      keyDecisions: 'Architect of the BJP’s nationwide expansion strategy, delivering decisive Lok Sabha majorities in 2014 and 2019.',
    },
    {
      period: '2003 – 2010',
      roleTitle: 'Minister of State for Home, Gujarat',
      institution: 'Government of Gujarat',
      keyDecisions: 'Led state internal security and police modernization in Gujarat.',
    },
  ],
  'leader-mamata': [
    {
      period: '2011 – Present',
      roleTitle: 'Chief Minister of West Bengal (3 Consecutive Terms)',
      institution: 'Government of West Bengal',
      keyDecisions: 'Ended 34-year Left rule; instituted Lakshmir Bhandar, Kanyashree, Duare Sarkar, and Sabooj Sathi mass cash/asset schemes.',
    },
    {
      period: '2009 – 2011 & 1999 – 2001',
      roleTitle: 'Union Minister of Railways',
      institution: 'Ministry of Railways (Government of India)',
      keyDecisions: 'Introduced Duronto express trains and prioritized non-subsidized passenger connectivity for regional commuters.',
    },
  ],
  'leader-kharge': [
    {
      period: '2022 – Present',
      roleTitle: 'President, Indian National Congress & LoP (Rajya Sabha)',
      institution: 'Indian National Congress / Parliament of India',
      keyDecisions: 'First non-Gandhi Congress president in 24 years; anchored INDIA opposition coalition coordination.',
    },
    {
      period: '2014 – 2019',
      roleTitle: 'Leader of Congress in 16th Lok Sabha',
      institution: 'Lok Sabha',
      keyDecisions: 'Spearheaded parliamentary opposition debates on demonetization, agrarian bills, and institutional autonomy.',
    },
    {
      period: '2009 – 2014',
      roleTitle: 'Union Cabinet Minister (Labour & Employment / Railways)',
      institution: 'Government of India (UPA-II)',
      keyDecisions: 'Modernized Employees State Insurance (ESIC) hospitals; expanded national rail safety funds.',
    },
  ],
  'leader-sitharaman': [
    {
      period: '2019 – Present',
      roleTitle: 'Union Minister of Finance & Corporate Affairs',
      institution: 'Ministry of Finance (Union of India)',
      keyDecisions: 'Presented 7 consecutive Union Budgets; expanded Capital Expenditure from ₹3.1L Cr to ₹11.11L Cr; navigated post-COVID fiscal trajectory and corporate tax cuts (2019).',
    },
    {
      period: '2017 – 2019',
      roleTitle: 'Union Minister of Defence',
      institution: 'Ministry of Defence (Union of India)',
      keyDecisions: 'First full-time female Defence Minister; supervised Balakot airstrikes coordination and emergency procurement fast-tracking.',
    },
    {
      period: '2014 – 2017',
      roleTitle: 'Minister of State (Independent Charge) for Commerce & Industry',
      institution: 'Ministry of Commerce & Industry',
      keyDecisions: 'Steered Make in India launch, Ease of Doing Business state rankings, and FDI ceiling liberalisation.',
    },
  ],
  'leader-vaishnaw': [
    {
      period: '2021 – Present',
      roleTitle: 'Union Minister for Railways, I&B, Electronics & IT',
      institution: 'Ministries of Railways, I&B, and MeitY (Union of India)',
      keyDecisions: 'Spearheaded ₹76,000 Cr India Semiconductor Mission (Micron/Tata fab approvals); Vande Bharat train expansion; Digital Personal Data Protection Act 2023; Kavach automation deployment.',
    },
    {
      period: '2019 – 2021',
      roleTitle: 'Member of Parliament (Rajya Sabha, Odisha)',
      institution: 'Parliament of India',
      keyDecisions: 'Parliamentary Standing Committee on Finance and public infrastructure modernisation contributions.',
    },
    {
      period: '1994 – 2006',
      roleTitle: 'IAS Officer (Odisha Cadre) & Deputy Secretary in PMO',
      institution: 'Indian Administrative Service (IAS) & PMO',
      keyDecisions: 'Handled 1999 Odisha Super Cyclone relief logistics as Collector of Balasore; Deputy Secretary in Prime Minister Atal Bihari Vajpayee’s PMO.',
    },
  ],
  'leader-pradhan': [
    {
      period: '2021 – July 2026',
      roleTitle: 'Union Minister of Education and Skill Development',
      institution: 'Ministry of Education (Union of India)',
      keyDecisions: 'Implementation of National Education Policy (NEP 2020); oversaw Radhakrishnan High-Level Committee on NTA reform following NEET-UG controversies; APAAR student ID rollout; stepped down in July 2026 taking moral responsibility amid student agitations.',
    },
    {
      period: '2014 – 2021',
      roleTitle: 'Union Minister of Petroleum & Natural Gas',
      institution: 'Ministry of Petroleum & Natural Gas',
      keyDecisions: 'Rollout of Pradhan Mantri Ujjwala Yojana (PMUY, 8+ Crore LPG connections); PAHAL direct benefit transfer for LPG; Open Acreage Licensing Policy (OALP).',
    },
  ],
  'leader-omar': [
    {
      period: 'October 2024 – Present',
      roleTitle: 'Chief Minister of Jammu & Kashmir (Union Territory)',
      institution: 'Government of Jammu & Kashmir',
      keyDecisions: 'First elected Chief Minister of J&K post-Article 370 abrogation; passed assembly resolution demanding restoration of special status and statehood.',
    },
    {
      period: '2009 – 2015',
      roleTitle: 'Chief Minister of Jammu & Kashmir (State)',
      institution: 'Government of Jammu and Kashmir (NC-Congress Coalition)',
      keyDecisions: 'Enacted J&K Public Services Guarantee Act 2011; Right to Information (RTI) state framework; handled 2010 Valley unrest and 2014 catastrophic Kashmir floods.',
    },
    {
      period: '2001 – 2002',
      roleTitle: 'Union Minister of State for External Affairs',
      institution: 'Ministry of External Affairs (Vajpayee NDA Government)',
      keyDecisions: 'Represented India’s bilateral foreign diplomacy at multilateral United Nations conferences.',
    },
  ],
  'leader-omar-abdullah': [
    {
      period: 'October 2024 – Present',
      roleTitle: 'Chief Minister of Jammu & Kashmir (Union Territory)',
      institution: 'Government of Jammu & Kashmir',
      keyDecisions: 'First elected Chief Minister of J&K post-Article 370 abrogation; passed assembly resolution demanding restoration of special status and statehood.',
    },
    {
      period: '2009 – 2015',
      roleTitle: 'Chief Minister of Jammu & Kashmir (State)',
      institution: 'Government of Jammu and Kashmir (NC-Congress Coalition)',
      keyDecisions: 'Enacted J&K Public Services Guarantee Act 2011; Right to Information (RTI) state framework; handled 2010 Valley unrest and 2014 catastrophic Kashmir floods.',
    },
    {
      period: '2001 – 2002',
      roleTitle: 'Union Minister of State for External Affairs',
      institution: 'Ministry of External Affairs (Vajpayee NDA Government)',
      keyDecisions: 'Represented India’s bilateral foreign diplomacy at multilateral United Nations conferences.',
    },
  ],
  'leader-abhishek': [
    {
      period: '2021 – Present',
      roleTitle: 'National General Secretary, All India Trinamool Congress (AITC)',
      institution: 'AITC Central Committee',
      keyDecisions: 'Spearheaded national party organization beyond Bengal; coordinated opposition floor strategy in 18th Lok Sabha.',
    },
    {
      period: '2014 – Present',
      roleTitle: 'Member of Parliament (Diamond Harbour, 3 Consecutive Terms)',
      institution: 'Lok Sabha (Parliament of India)',
      keyDecisions: 'Diamond Harbour Model healthcare initiatives, grassroots welfare camps, and vocal opposition debates on federal central funds.',
    },
  ],
};

export function LeaderDetailPage({ id }: { id: string }) {
  const navigate = useNavigate();
  const [leader, setLeader] = useState<Leader | null>(null);
  const [party, setParty] = useState<Party | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      const { data: l } = await supabase.from('leaders').select('*').eq('id', id).maybeSingle();
      if (cancelled) return;
      setLeader(l);
      if (l?.party_id) {
        const { data: p } = await supabase.from('parties').select('*').eq('id', l.party_id).maybeSingle();
        if (!cancelled) setParty(p);
      }
      const { data: w } = await supabase
        .from('works')
        .select('*')
        .eq('leader_id', id)
        .order('date_year', { ascending: false, nullsFirst: false });
      if (!cancelled) setWorks(w ?? []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Match interview accountability record from media freedom dataset
  const interviewRecord = useMemo(() => {
    if (!id) return null;
    return LEADER_INTERVIEW_RECORDS.find((rec) => rec.leaderId === id) ?? null;
  }, [id]);

  // Tenure milestones
  const milestones = useMemo(() => {
    if (!id) return [];
    return LEADER_TENURE_MILESTONES[id] ?? [];
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center py-24 text-slate-400">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );

  if (!leader)
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-slate-600">This leader profile could not be found.</p>
        <button
          onClick={() => navigate('/parties')}
          className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
        >
          &larr; Return to Parties & Leaders Directory
        </button>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Top Breadcrumb */}
      <button
        onClick={() => navigate(party ? `/parties/${party.id}` : '/parties')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft size={14} strokeWidth={1.5} /> Back to {party ? `${party.name} Profile` : 'Parties Directory'}
      </button>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Constitutional Credentials & Party Dossier */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#E5E0D8] bg-[#F5F2EB] text-2xl font-bold text-[#181A19] shadow-xs">
                {leader.name.charAt(0)}
              </span>
              <div>
                <h1 className="text-xl font-extrabold text-slate-900">{leader.name}</h1>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug">{leader.role}</p>
              </div>
            </div>

            {party && (
              <button
                onClick={() => navigate(`/parties/${party.id}`)}
                className="mt-5 flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50 hover:border-slate-300"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E0D8] bg-[#F5F2EB] text-xs font-bold text-[#181A19]">
                    {party.abbreviation.slice(0, 3)}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{party.name}</span>
                    <span className="text-[10px] text-slate-400">View Party Dossier & Tenures</span>
                  </div>
                </div>
                <ArrowLeft size={12} strokeWidth={1.5} className="rotate-180 text-slate-400" />
              </button>
            )}

            <dl className="mt-5 space-y-3.5 text-xs border-t border-slate-100 pt-4">
              <Info icon={Building2} label="Executive Mandate" value={leader.role} />
              <Info icon={UsersIcon} label="Electoral Footprint" value={leader.represents} />
              <Info icon={Compass} label="Ideological Orientation" value={leader.ideology} />
            </dl>
          </div>

          {/* Verified Press Freedom & Public Accountability Card */}
          {interviewRecord && (
            <div className="rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                <span className="font-bold text-[#181A19] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <Newspaper size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
                  <span>Press Access & Interviews</span>
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    interviewRecord.accessRating === 'High Open Access'
                      ? 'bg-emerald-100 text-emerald-800'
                      : interviewRecord.accessRating === 'Moderate / Selective'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {interviewRecord.accessRating}
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-white p-3 border border-[#E5E0D8] shadow-2xs">
                  <p className="text-xl font-black text-[#1A3D2F]">
                    {interviewRecord.independentUnscriptedInterviews}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase text-slate-500">
                    Unscripted 1-on-1s
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 border border-[#E5E0D8] shadow-2xs">
                  <p className="text-xl font-black text-slate-900">
                    {interviewRecord.openPressConferences}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase text-slate-500">
                    Open Press Meets
                  </p>
                </div>
              </div>

              <div className="mt-3.5 space-y-2 text-xs text-slate-700">
                <div className="rounded-lg bg-white/70 p-2.5 border border-[#E5E0D8]">
                  <strong className="block text-[11px] text-slate-800 font-bold mb-0.5">
                    Recorded Media Policy:
                  </strong>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {interviewRecord.recordedPressPolicy}
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span>Last Open Press Meet:</span>
                  <span className="font-semibold text-slate-700">
                    {interviewRecord.lastOpenPressConferenceDate}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/press-freedom')}
                className="mt-3.5 pt-2 border-t border-[#E5E0D8] w-full text-center inline-flex items-center justify-center gap-1 text-[11px] font-bold text-[#1A3D2F] hover:text-[#143025]"
              >
                <span>View Full National Press Freedom Tally</span>
                <ExternalLink size={11} strokeWidth={1.5} />
              </button>
            </div>
          )}

          {/* Verification & ECI Portal Links */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
            <h3 className="font-bold uppercase tracking-wider text-slate-500 text-[10px] mb-1.5 flex items-center gap-1.5">
              <ShieldCheck size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
              <span>Official Public Declarations</span>
            </h3>
            <p className="text-[11px] leading-relaxed">
              Biographical credentials, assets, and court disclosures are verified against official candidate affidavits and parliamentary records.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="https://affidavit.eci.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              >
                <span>ECI Affidavit Portal</span>
                <ExternalLink size={10} strokeWidth={1.5} />
              </a>
              <a
                href="https://sansad.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
              >
                <span>Parliament Debates (Sansad)</span>
                <ExternalLink size={10} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </aside>

        {/* Right Column: Bio, Tenure Timeline, Attributed Works */}
        <div className="lg:col-span-2 space-y-8">
          {/* Executive Biography */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Executive Biography & Background
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{leader.bio}</p>
          </section>

          {/* Interactive Tenure & Portfolio Timeline */}
          {milestones.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar size={18} strokeWidth={1.5} className="text-[#1A3D2F]" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Tenure Milestones & Ministerial Responsibilities
                  </h2>
                </div>
              </div>

              <div className="mt-5 relative border-l-2 border-[#E5E0D8] pl-6 ml-2 space-y-6">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#1A3D2F] shadow-xs" />
                    <div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                        {m.period}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">{m.roleTitle}</h3>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                        <Building size={12} strokeWidth={1.5} /> {m.institution}
                      </p>
                      <div className="mt-2 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">Key Policies & Decisions: </strong>
                        {m.keyDecisions}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Attributed Works */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 size={18} strokeWidth={1.5} className="text-[#1A3D2F]" />
                <h2 className="text-lg font-bold text-slate-900">
                  Documented Works & Policy Actions ({works.length})
                </h2>
              </div>
            </div>

            {works.length === 0 ? (
              <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-xs text-slate-500">
                No individual works are directly attributed to this leader in this view. Broad policy reforms and cabinet schemes are cataloged under the party profile.
              </div>
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {works.map((w) => (
                  <WorkCard key={w.id} work={w} partyName={party?.name} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#1A3D2F]" />
      <div>
        <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</dt>
        <dd className="mt-0.5 font-semibold text-slate-800 leading-snug">{value ?? '—'}</dd>
      </div>
    </div>
  );
}
