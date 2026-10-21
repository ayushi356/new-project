import React, { useState } from 'react';
import {
  MapPin,
  Landmark,
  AlertTriangle,
  FileText,
  Users,
  Search,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Coins,
  Newspaper,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from '@/lib/router';

export interface StateGovernanceData {
  id: string;
  name: string;
  type: 'State' | 'Union Territory';
  capital: string;
  governingParty: string;
  governingPartyId: string;
  governingPartyColor: string;
  chiefMinister: string;
  regionalFootprint: 'North' | 'East' | 'West' | 'South' | 'North-East' | 'Central';
  keyIncidentsCount: number;
  majorDocumentedIncidents: {
    title: string;
    year: number;
    severity: 'extreme' | 'mild';
    category: string;
  }[];
  flagshipSchemes: {
    name: string;
    target: string;
    status: 'implemented' | 'partial';
  }[];
  pressFreedomNote: string;
  citizenFocusNote: string;
}

export const STATES_DATA: StateGovernanceData[] = [
  {
    id: 'state-dl',
    name: 'Delhi (NCT)',
    type: 'Union Territory',
    capital: 'New Delhi',
    governingParty: 'BJP (Feb 2025–Present) / AAP (2015–2024)',
    governingPartyId: 'party-bjp',
    governingPartyColor: '#ea580c',
    chiefMinister: 'Rekha Gupta (Current CM) · Arvind Kejriwal & Atishi (Former CMs)',
    regionalFootprint: 'North',
    keyIncidentsCount: 4,
    majorDocumentedIncidents: [
      { title: 'Delhi University Student Protests After Rape Case', year: 2026, severity: 'extreme', category: 'protest' },
      { title: 'Severe Drinking Water Shortage & Tanker Crisis', year: 2024, severity: 'mild', category: 'crisis' },
      { title: 'Anganwadi Workers ESMA & 38-Day Strike', year: 2022, severity: 'mild', category: 'protest' },
      { title: 'Excise Policy Investigation & CM Incarceration', year: 2024, severity: 'extreme', category: 'scandal' },
    ],
    flagshipSchemes: [
      { name: 'Delhi Government Schools Model (Chunauti & Happiness)', target: '1,000+ government schools upgraded', status: 'implemented' },
      { name: 'Mohalla Clinics Primary Health Network', target: '500+ neighborhood OPD clinics', status: 'partial' },
      { name: 'Municipal Solid Waste Remediation (Ghazipur / Bhalswa)', target: 'Clearing 140 lakh MT landfill waste', status: 'partial' },
    ],
    pressFreedomNote: 'Weekly open-door CM press briefings restored in 2025–2026; high local digital media scrutiny.',
    citizenFocusNote: 'Dual governance model between elected Chief Minister and Union-appointed Lieutenant Governor.',
  },
  {
    id: 'state-wb',
    name: 'West Bengal',
    type: 'State',
    capital: 'Kolkata',
    governingParty: 'All India Trinamool Congress (TMC)',
    governingPartyId: 'party-tmc',
    governingPartyColor: '#16a34a',
    chiefMinister: 'Mamata Banerjee (2011–Present)',
    regionalFootprint: 'East',
    keyIncidentsCount: 3,
    majorDocumentedIncidents: [
      { title: 'RG Kar Hospital Trainee Doctor Rape-Murder & Reclaim the Night', year: 2024, severity: 'extreme', category: 'protest' },
      { title: 'Sandeshkhali Systemic Sexual Exploitation & Land Grabbing', year: 2024, severity: 'extreme', category: 'violence' },
      { title: 'Post-Poll Violence & CBI Investigation', year: 2021, severity: 'extreme', category: 'violence' },
    ],
    flagshipSchemes: [
      { name: 'Lakshmir Bhandar Monthly Cash Transfer', target: '₹1,000–₹1,200/mo to 2.1 Cr women', status: 'implemented' },
      { name: 'Duare Sarkar (Government at Your Doorstep)', target: '30+ public schemes in village camps', status: 'implemented' },
      { name: 'Kanyashree Prakalpa (Girls Education Grant)', target: 'Preventing child marriage in 80L+ students', status: 'implemented' },
    ],
    pressFreedomNote: 'Frequent open secretariat briefings, alongside documented police FIRs and ad boycotts against critical regional press.',
    citizenFocusNote: 'Direct cash benefit safety nets contrasted with severe local syndicate and post-poll violence concerns.',
  },
  {
    id: 'state-mn',
    name: 'Manipur',
    type: 'State',
    capital: 'Imphal',
    governingParty: 'Bharatiya Janata Party (NDA)',
    governingPartyId: 'party-bjp',
    governingPartyColor: '#ea580c',
    chiefMinister: 'N. Biren Singh',
    regionalFootprint: 'North-East',
    keyIncidentsCount: 2,
    majorDocumentedIncidents: [
      { title: 'Ethnic Conflict, Mass Displacements & Paraded Women Trial', year: 2023, severity: 'extreme', category: 'violence' },
      { title: 'Statewide 200+ Day Internet Ban (Longest in State History)', year: 2023, severity: 'extreme', category: 'crisis' },
    ],
    flagshipSchemes: [
      { name: 'CMgi Hakshelgi Tengbang (CMHT Healthcare)', target: '₹5 Lakh hospitalization cover', status: 'partial' },
      { name: 'Go to Hills / Go to Village Program', target: 'Bridging valley-hill development gap', status: 'partial' },
    ],
    pressFreedomNote: 'Prolonged internet shutdowns severely obstructed independent reporting; FIRs against Fact-Finding teams.',
    citizenFocusNote: 'Severe breakdown of inter-community trust, 60,000+ displaced persons living in relief shelters.',
  },
  {
    id: 'state-pb',
    name: 'Punjab',
    type: 'State',
    capital: 'Chandigarh',
    governingParty: 'Aam Aadmi Party (AAP)',
    governingPartyId: 'party-aap',
    governingPartyColor: '#0284c7',
    chiefMinister: 'Bhagwant Mann (2022–Present)',
    regionalFootprint: 'North',
    keyIncidentsCount: 3,
    majorDocumentedIncidents: [
      { title: 'LPU Student Safety & Mental Health Campus Strikes', year: 2025, severity: 'extreme', category: 'protest' },
      { title: 'Dilli Chalo Farmers Agitation 2.0 (Shambhu Border)', year: 2024, severity: 'extreme', category: 'protest' },
      { title: 'Sangrur Spurious Toxic Liquor Deaths', year: 2024, severity: 'extreme', category: 'crisis' },
    ],
    flagshipSchemes: [
      { name: '300 Units Free Electricity Scheme', target: '90%+ of domestic consumers zero bill', status: 'implemented' },
      { name: 'Aam Aadmi Clinics Network', target: '800+ operational primary clinics', status: 'implemented' },
      { name: 'Schools of Eminence Infrastructure Upgrade', target: '117 specialized senior secondary schools', status: 'partial' },
    ],
    pressFreedomNote: 'Punjab Police cyber wing actions against national and local journalists covering state issues.',
    citizenFocusNote: 'Agrarian distress and industrial debt contrasted with high public utility subsidies.',
  },
  {
    id: 'state-ka',
    name: 'Karnataka',
    type: 'State',
    capital: 'Bengaluru',
    governingParty: 'Indian National Congress (INC)',
    governingPartyId: 'party-inc',
    governingPartyColor: '#2563eb',
    chiefMinister: 'Siddaramaiah (2023–Present / 2013–2018)',
    regionalFootprint: 'South',
    keyIncidentsCount: 2,
    majorDocumentedIncidents: [
      { title: 'Assassination of Senior Editor Gauri Lankesh (SIT Trial)', year: 2017, severity: 'extreme', category: 'violence' },
      { title: 'State Cyber Police Action on Communal Hate Speech', year: 2024, severity: 'mild', category: 'scandal' },
    ],
    flagshipSchemes: [
      { name: 'Gruha Lakshmi (₹2,000/mo to Female Head of Household)', target: '1.2 Cr women beneficiaries', status: 'implemented' },
      { name: 'Shakti Free Public Bus Travel for Women', target: 'Statewide state transport buses', status: 'implemented' },
      { name: 'Yuva Nidhi (Unemployment Allowance for Graduates)', target: '₹3,000/mo for 2 years', status: 'partial' },
    ],
    pressFreedomNote: 'Karnataka SIT cracked Gauri Lankesh conspiracy with comprehensive 9,200-page chargesheet.',
    citizenFocusNote: 'Flagship 5 Guarantee welfare model spending ₹52,000+ Cr annually.',
  },
  {
    id: 'state-up',
    name: 'Uttar Pradesh',
    type: 'State',
    capital: 'Lucknow',
    governingParty: 'Bharatiya Janata Party (BJP)',
    governingPartyId: 'party-bjp',
    governingPartyColor: '#ea580c',
    chiefMinister: 'Yogi Adityanath (2017–Present)',
    regionalFootprint: 'North',
    keyIncidentsCount: 3,
    majorDocumentedIncidents: [
      { title: 'Siddique Kappan Hathras UAPA Incarceration (846 Days)', year: 2020, severity: 'extreme', category: 'scandal' },
      { title: 'Hathras Gang-Rape & Midnight Police Cremation', year: 2020, severity: 'extreme', category: 'violence' },
      { title: 'Bulldozer Demolitions (Supreme Court Guidelines 2024)', year: 2024, severity: 'extreme', category: 'crisis' },
    ],
    flagshipSchemes: [
      { name: 'Expressway Corridors Network (Purvanchal & Bundelkhand)', target: 'Connecting eastern and western UP', status: 'implemented' },
      { name: 'Mission Shakti Women Empowerment & Safety Cells', target: 'Special help desks in all 1,500+ police stations', status: 'implemented' },
      { name: 'One District One Product (ODOP) Export Promotion', target: 'Traditional handicrafts in 75 districts', status: 'partial' },
    ],
    pressFreedomNote: 'Supreme Court granted bail to Siddique Kappan, observing every citizen has free speech rights.',
    citizenFocusNote: 'Massive infrastructure investments paired with strict law-and-order governance and civil liberties debates.',
  },
  {
    id: 'state-jk',
    name: 'Jammu & Kashmir',
    type: 'Union Territory',
    capital: 'Srinagar / Jammu',
    governingParty: 'National Conference / Congress Coalition (Elected 2024) / Union (2019–2024)',
    governingPartyId: 'party-inc',
    governingPartyColor: '#2563eb',
    chiefMinister: 'Omar Abdullah (2024–Present)',
    regionalFootprint: 'North',
    keyIncidentsCount: 3,
    majorDocumentedIncidents: [
      { title: 'Pahalgam Terror Attack on Civilian Pilgrims', year: 2024, severity: 'extreme', category: 'violence' },
      { title: 'Article 370 Abrogation & 552-Day Mobile Internet Ban', year: 2019, severity: 'extreme', category: 'crisis' },
      { title: 'Supreme Court Anuradha Bhasin Proportionality Ruling', year: 2020, severity: 'extreme', category: 'scandal' },
    ],
    flagshipSchemes: [
      { name: 'Prime Minister Development Package (PMDP Infrastructure)', target: 'Hydroelectric & highway connectivity', status: 'partial' },
      { name: 'Ayushman Bharat Golden Cards Universal Coverage', target: '100% UT residents covered for health', status: 'implemented' },
    ],
    pressFreedomNote: 'Highest number of recorded internet shutdowns in India; strict accreditation policy under MHA.',
    citizenFocusNote: 'Transition from Union Governor rule to elected legislative assembly with ongoing statehood demands.',
  },
  {
    id: 'state-mh',
    name: 'Maharashtra',
    type: 'State',
    capital: 'Mumbai',
    governingParty: 'Mahayuti (BJP / Shiv Sena / NCP)',
    governingPartyId: 'party-bjp',
    governingPartyColor: '#ea580c',
    chiefMinister: 'Eknath Shinde / Devendra Fadnavis',
    regionalFootprint: 'West',
    keyIncidentsCount: 2,
    majorDocumentedIncidents: [
      { title: 'Maratha Reservation & Manoj Jarange Patil Hunger Strikes', year: 2024, severity: 'extreme', category: 'protest' },
      { title: 'Badlapur School Children Abuse Mass Railway Protests', year: 2024, severity: 'extreme', category: 'protest' },
    ],
    flagshipSchemes: [
      { name: 'Mukhyamantri Majhi Ladki Bahin Yojana', target: '₹1,500/mo to eligible women', status: 'implemented' },
      { name: 'Mumbai Metro & Coastal Road Network', target: 'Urban decongestion and trans-harbour link', status: 'implemented' },
      { name: 'Jalyukt Shivar Abhiyan Water Conservation', target: 'Drought-proofing 25,000 villages', status: 'partial' },
    ],
    pressFreedomNote: 'Bombay High Court landmark ruling in 2024 striking down Union Government Fact Check Unit rules.',
    citizenFocusNote: 'Industrial financial capital balancing agrarian farm loan distress with rapid coastal infrastructure.',
  },
];

export function IndiaStateExplorer() {
  const navigate = useNavigate();
  const [selectedStateId, setSelectedStateId] = useState<string>('state-dl');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const filteredStates = STATES_DATA.filter((st) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      st.name.toLowerCase().includes(q) ||
      st.chiefMinister.toLowerCase().includes(q) ||
      st.governingParty.toLowerCase().includes(q);
    const matchesRegion = regionFilter === 'all' || st.regionalFootprint === regionFilter;
    return matchesQuery && matchesRegion;
  });

  const activeState = STATES_DATA.find((s) => s.id === selectedStateId) ?? STATES_DATA[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
            <MapPin size={14} />
            <span>Sub-National Federal Explorer</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl mt-0.5">
            Explore Governance by State & Region
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            India is a federal union of diverse states. Select any state to examine its governing administration, major citizen protests, flagship welfare schemes, and press freedom status.
          </p>
        </div>
      </div>

      {/* Filter and State Selector Pills */}
      <div className="mt-5 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by state (e.g. Bengal, Delhi, Manipur, Punjab, Karnataka)..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto text-xs font-semibold">
            {['all', 'North', 'East', 'South', 'West', 'North-East'].map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`rounded-lg px-2.5 py-1.5 whitespace-nowrap transition ${
                  regionFilter === r
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {r === 'all' ? 'All Regions' : r}
              </button>
            ))}
          </div>
        </div>

        {/* State Selection Grid / Pills */}
        <div className="flex flex-wrap gap-1.5">
          {filteredStates.map((st) => {
            const isSelected = selectedStateId === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setSelectedStateId(st.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A3D2F] text-white border-[#1A3D2F] shadow-xs'
                    : 'bg-white text-[#181A19] border-[#E5E0D8] hover:bg-[#FAF8F5]'
                }`}
              >
                <span>{st.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F5F2EB] text-[#5C6460]'
                  }`}
                >
                  {st.keyIncidentsCount} records
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected State Detailed Overview Card */}
      {activeState && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 transition">
          {/* State Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  {activeState.type} · {activeState.regionalFootprint} India
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Capital: {activeState.capital}
                </span>
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#181A19] mt-1">
                {activeState.name}
              </h4>
              <p className="mt-1 text-xs text-[#5C6460] font-medium flex items-center gap-1.5">
                <Landmark size={13} strokeWidth={1.5} className="text-[#717A74]" />
                <span>Governing Body: <strong className="text-[#181A19]">{activeState.governingParty}</strong></span>
              </p>
              <p className="text-xs text-[#717A74] flex items-center gap-1.5 mt-0.5">
                <Users size={13} strokeWidth={1.5} className="text-[#717A74]" />
                <span>Executive Leadership: {activeState.chiefMinister}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => navigate('/incidents')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1A3D2F] hover:bg-[#143025] px-3.5 py-2 text-xs font-bold text-white transition shadow-2xs cursor-pointer"
              >
                <span>Explore {activeState.name} Incidents</span>
                <ArrowRight size={12} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* 3-Column Content Breakdown */}
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 text-xs">
            {/* Column 1: Documented Incidents & Protests */}
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8] mb-2.5">
                <span className="font-bold text-[#181A19] uppercase tracking-wide text-[11px]">
                  Documented Incidents ({activeState.majorDocumentedIncidents.length})
                </span>
              </div>
              <div className="space-y-2.5">
                {activeState.majorDocumentedIncidents.map((inc, i) => (
                  <div key={i} className="rounded-lg bg-[#FAF8F5] p-2.5 border border-[#E5E0D8]">
                    <div className="flex items-center justify-between text-[10px] text-[#5C6460] mb-0.5">
                      <span className="font-semibold text-[#181A19] uppercase">{inc.category}</span>
                      <span>{inc.year}</span>
                    </div>
                    <p className="font-serif font-bold text-[#181A19] leading-snug">{inc.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Flagship State Welfare Schemes */}
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8] mb-2.5">
                <span className="font-bold text-[#181A19] uppercase tracking-wide text-[11px]">
                  Flagship Schemes ({activeState.flagshipSchemes.length})
                </span>
              </div>
              <div className="space-y-2.5">
                {activeState.flagshipSchemes.map((sch, i) => (
                  <div key={i} className="rounded-lg bg-[#FAF8F5] p-2.5 border border-[#E5E0D8]">
                    <div className="flex items-center justify-between text-[10px] text-[#5C6460] mb-0.5">
                      <span className="font-semibold text-[#1A3D2F]">{sch.name}</span>
                      <span className="rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800 px-1.5 py-0.2 text-[9px] font-bold uppercase">
                        {sch.status}
                      </span>
                    </div>
                    <p className="text-[#4A524D] leading-snug">{sch.target}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Press Freedom & Citizen Context */}
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#181A19] flex items-center gap-1.5 uppercase tracking-wide text-[11px] pb-2 border-b border-[#E5E0D8] mb-2.5">
                  <Newspaper size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
                  <span>Press & Civil Space</span>
                </span>
                <p className="text-[#4A524D] leading-relaxed mb-3">
                  {activeState.pressFreedomNote}
                </p>
                <div className="rounded-lg bg-[#FAF8F5] p-2.5 border border-[#E5E0D8] text-[11px] text-[#4A524D] leading-relaxed">
                  <strong className="block text-[#181A19] font-bold mb-0.5">Citizen Reality Note:</strong>
                  {activeState.citizenFocusNote}
                </div>
              </div>

              <button
                onClick={() => navigate(activeState.governingPartyId ? `/parties/${activeState.governingPartyId}` : '/parties')}
                className="mt-3 pt-2 border-t border-[#E5E0D8] inline-flex items-center gap-1 text-[11px] font-bold text-[#1A3D2F] hover:text-[#143025] cursor-pointer"
              >
                <span>View {activeState.governingParty.split('(')[0].trim()} Governance Dossier</span>
                <ArrowRight size={12} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
