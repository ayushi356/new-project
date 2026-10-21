import React, { useState } from 'react';
import {
  Users,
  ShieldAlert,
  HeartHandshake,
  Coins,
  Scale,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Info,
} from 'lucide-react';
import { useNavigate } from '@/lib/router';
import { AccessibleChart } from '@/components/AccessibleChart';

export function WomenGovernanceSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'schemes' | 'justice' | 'nirbhaya_fund'>('schemes');

  const nirbhayaChartData = [
    { label: 'Total Nirbhaya Fund Allocated (Union 2013–2026)', value: 9200, formattedValue: '₹9,200 Cr', color: '#1A3D2F', note: 'Central Budgetary Outlay' },
    { label: 'Funds Released to States / UTs', value: 6850, formattedValue: '₹6,850 Cr', color: '#275240', note: 'Ministry of WCD Transfers' },
    { label: 'Verified Utilization Certificates (UCs) Submitted', value: 4620, formattedValue: '₹4,620 Cr', color: '#3E6E57', note: '~67% of Released Funds' },
    { label: 'Unutilized Balance Lying in State Treasuries', value: 2230, formattedValue: '₹2,230 Cr', color: '#B45309', note: 'Delayed Project Execution' },
  ];

  const safetyRecords = [
    {
      title: 'Delhi University Student Protests & Campus Safety Demands',
      year: 2026,
      state: 'Delhi (NCT)',
      governingLevel: 'Union & State',
      whatHappened:
        'Mass student-led demonstrations outside Delhi University North Campus following sexual assault incidents; students demanded mandatory 24/7 internal complaint committee (ICC) monitoring, campus CCTV audits, and street lighting along student transit corridors.',
      judicialOutcome:
        'Delhi High Court took suo motu notice, directing Delhi Police and university administration to implement mandatory night patrols and safe shuttle services.',
      status: 'High Court Compliance Monitoring (2026)',
    },
    {
      title: 'Kolkata RG Kar Medical College Trainee Doctor Rape-Murder & "Reclaim the Night"',
      year: 2024,
      state: 'West Bengal',
      governingLevel: 'State Government',
      whatHappened:
        'Brutal rape-murder of an on-duty resident doctor in hospital seminar hall triggered unprecedented nationwide doctor cease-work and spontaneous midnight mass marches by millions of women across Bengal.',
      judicialOutcome:
        'Supreme Court transferred investigation to CBI, established a National Task Force (NTF) for healthcare worker safety, and rebuked state police for delayed FIR registration.',
      status: 'Supreme Court Monitored CBI Trial (2024–2026)',
    },
    {
      title: 'Bilkis Bano Gang-Rape & Murder Convicts Premature Remission Quashed',
      year: 2024,
      state: 'Gujarat / Union',
      governingLevel: 'State & Judicial',
      whatHappened:
        'Premature remission granted to 11 life convicts in the 2002 Bilkis Bano gang-rape case by Gujarat Government on Independence Day 2022 was challenged before the Supreme Court.',
      judicialOutcome:
        'In January 2024, a Supreme Court bench quashed the remission orders, holding that the Gujarat government lacked jurisdiction and was guilty of "usurpation of power", ordering convicts back to prison.',
      status: 'Supreme Court Judgment Enforced; Convicts Returned to Jail',
    },
    {
      title: 'Sandeshkhali Systemic Sexual Exploitation & Intimidation',
      year: 2024,
      state: 'West Bengal',
      governingLevel: 'State Government',
      whatHappened:
        'Widespread protests by rural and tribal women in Sandeshkhali alleging systemic coercion and sexual harassment by local party syndicate leaders alongside land seizures.',
      judicialOutcome:
        'Calcutta High Court ordered an independent CBI probe, holding that the state administrative machinery failed to register complaints lodged by vulnerable women.',
      status: 'CBI Chargesheeted; Prime Accused in Judicial Custody',
    },
    {
      title: 'Manipur Ethnic Conflict Sexual Assaults & Paraded Women Case',
      year: 2023,
      state: 'Manipur',
      governingLevel: 'State & Union',
      whatHappened:
        'During ethnic violence in May 2023, women were subjected to horrific assault and paraded naked; viral video in July 2023 provoked national outrage and parliamentary deadlock.',
      judicialOutcome:
        'Supreme Court appointed a committee of three former female High Court judges to oversee humanitarian relief and transferred investigation to CBI.',
      status: 'Trial Transferred to Assam for Impartial Proceedings',
    },
    {
      title: 'Hathras Gang-Rape, Death & Midnight Police Cremation',
      year: 2020,
      state: 'Uttar Pradesh',
      governingLevel: 'State Government',
      whatHappened:
        'A 19-year-old Dalit woman was assaulted and died of injuries. UP Police conducted a 2:30 AM cremation without family consent, cordoning off the village and restricting press access.',
      judicialOutcome:
        'Allahabad High Court strongly reprimanded state authorities for violating fundamental rights in death; trial court convicted prime accused while acquitting others.',
      status: 'Appeals Pending in Allahabad High Court',
    },
  ];

  const welfareSchemes = [
    {
      party: 'All India Trinamool Congress (TMC)',
      partyColor: '#16a34a',
      schemeName: 'Lakshmir Bhandar & Kanyashree Prakalpa',
      coverage: '2.1 Crore women receiving ₹1,000–₹1,200/month; 80 Lakh+ girls in Kanyashree',
      impactEstablished: 'Direct cash safety net reducing child marriage rates and providing financial autonomy to female family heads.',
      scrutinyDisputed: 'High fiscal cost (~₹15,000 Cr/year) constraining capital infrastructure investment; reports of local middleman extortion.',
    },
    {
      party: 'Indian National Congress (INC)',
      partyColor: '#2563eb',
      schemeName: 'Gruha Lakshmi & Shakti Free Public Transport',
      coverage: '1.2 Crore female heads of household in Karnataka receiving ₹2,000/month; 300 Cr+ free bus rides',
      impactEstablished: 'Substantial increase in female workforce mobility and domestic purchasing power across rural Karnataka.',
      scrutinyDisputed: 'Significant budgetary strain on state road transport corporations (KSRTC/BMTC) requiring state subsidies.',
    },
    {
      party: 'Bharatiya Janata Party (BJP)',
      partyColor: '#ea580c',
      schemeName: 'PM Ujjwala Yojana & Ladli Behna (MP/MH)',
      coverage: '10.3 Crore LPG connections nationally; 1.29 Crore women receiving ₹1,250/month in MP',
      impactEstablished: 'Substantial reduction in indoor smoke pollution during initial rollout; high electoral mobilization for the ruling party.',
      scrutinyDisputed: 'High refill cylinder prices led to substantial drop in commercial cylinder refills among low-income households (CAG Report 14 of 2019).',
    },
    {
      party: 'Aam Aadmi Party (AAP)',
      partyColor: '#0284c7',
      schemeName: 'Delhi Free Pink Bus Tickets & Mahila Samman Rashi',
      coverage: '100+ Crore free female commuter trips in DTC buses; ₹1,000/month proposed cash support',
      impactEstablished: 'Lowered transport costs for female daily wage workers, domestic helpers, and students in Delhi NCR.',
      scrutinyDisputed: 'Delays in implementing cash transfer scheme due to bureaucratic friction with Delhi Lieutenant Governor.',
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-2xs sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5E0D8] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <HeartHandshake size={14} strokeWidth={1.5} />
            <span>Special Governance Track</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#181A19] sm:text-2xl mt-0.5">
            Women, Society & Governance
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#4A524D] max-w-2xl leading-relaxed">
            Examining women’s safety, welfare cash transfers, judicial accountability, and public resource utilization across different governing parties and eras.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-lg border border-[#E5E0D8] bg-[#F5F2EB] p-0.5 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('schemes')}
            className={`rounded-md px-3 py-1.5 transition cursor-pointer ${
              activeTab === 'schemes'
                ? 'bg-[#1A3D2F] text-white shadow-2xs font-bold'
                : 'text-[#4A524D] hover:text-[#181A19]'
            }`}
          >
            Welfare Models
          </button>
          <button
            onClick={() => setActiveTab('justice')}
            className={`rounded-md px-3 py-1.5 transition cursor-pointer ${
              activeTab === 'justice'
                ? 'bg-[#1A3D2F] text-white shadow-2xs font-bold'
                : 'text-[#4A524D] hover:text-[#181A19]'
            }`}
          >
            Crises & Judicial Actions
          </button>
          <button
            onClick={() => setActiveTab('nirbhaya_fund')}
            className={`rounded-md px-3 py-1.5 transition cursor-pointer ${
              activeTab === 'nirbhaya_fund'
                ? 'bg-[#1A3D2F] text-white shadow-2xs font-bold'
                : 'text-[#4A524D] hover:text-[#181A19]'
            }`}
          >
            Nirbhaya Fund Audit
          </button>
        </div>
      </div>

      {/* Tab 1: Cross-Party Welfare Models */}
      {activeTab === 'schemes' && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] p-4 text-xs text-[#4A524D]">
            <strong className="text-[#181A19]">The Rise of Direct Cash Safety Nets:</strong> Across both national and regional parties, direct benefit transfers (DBT) deposited directly into women's bank accounts have become the primary instrument of welfare delivery. Below is an evidence-based comparison of flagship programs across governing parties.
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {welfareSchemes.map((w, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
                    <span className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-[10px] font-bold text-[#181A19]">
                      {w.party}
                    </span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#181A19] mt-2.5">{w.schemeName}</h4>
                  <p className="mt-1 text-xs font-semibold text-[#5C6460]">Reach: {w.coverage}</p>

                  <div className="mt-3.5 space-y-2 text-xs">
                    <div className="rounded-lg bg-emerald-50/60 border border-emerald-200/70 p-2.5">
                      <strong className="text-emerald-950 block font-bold mb-0.5">Established Positive Ground Impact:</strong>
                      <span className="text-emerald-900 leading-relaxed">{w.impactEstablished}</span>
                    </div>

                    <div className="rounded-lg bg-amber-50/60 border border-amber-200/70 p-2.5">
                      <strong className="text-amber-950 block font-bold mb-0.5">Documented Scrutiny & Gaps:</strong>
                      <span className="text-amber-900 leading-relaxed">{w.scrutinyDisputed}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Documented Crises & Judicial Actions */}
      {activeTab === 'justice' && (
        <div className="mt-6 space-y-3.5">
          <div className="rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] p-4 text-xs text-[#4A524D]">
            <strong className="text-[#181A19]">Judicial Accountability & State Action:</strong> Records below track high-profile sexual violence crises, citizen agitations, and judicial interventions, highlighting the response of state law-enforcement vs constitutional court rulings.
          </div>

          <div className="space-y-3">
            {safetyRecords.map((r, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-2xs transition hover:border-[#C8C2B5]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-0.5 text-[10px] font-bold text-[#181A19]">
                      {r.state}
                    </span>
                    <span className="text-xs text-[#717A74]">· {r.year}</span>
                  </div>
                  <span className="rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-[10px] font-medium text-[#5C6460]">
                    {r.status}
                  </span>
                </div>

                <h4 className="font-serif text-sm sm:text-base font-bold text-[#181A19] mt-2.5">{r.title}</h4>
                <p className="mt-1 text-xs text-[#4A524D] leading-relaxed">{r.whatHappened}</p>

                <div className="mt-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-2.5 text-xs text-[#4A524D]">
                  <strong className="text-[#181A19]">Judicial / Investigative Action: </strong>
                  <span>{r.judicialOutcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Nirbhaya Fund Utilization Audit */}
      {activeTab === 'nirbhaya_fund' && (
        <div className="mt-6 space-y-4">
          <AccessibleChart
            title="Nirbhaya Fund: Central Allocations vs Ground State Utilization"
            subtitle="Financial tracking of India's non-lapsable corpus for women safety infrastructure (Fast-track courts, one-stop crisis centres, emergency response systems)"
            referencePeriod="2013–2026 (Cumulative)"
            unit="₹ Crore"
            data={nirbhayaChartData}
            takeaway="While ₹9,200+ Crore has been allocated by the Union Parliament since 2013, over ₹2,230 Crore remains unspent in state treasuries due to administrative delays in setting up Fast-Track Special Courts and forensic labs."
            sourceName="Ministry of Women & Child Development (WCD) Lok Sabha Unstarred Q No. 1421 & CAG Audit Reports"
            sourceUrl="https://sansad.in/"
            limitations="State-level expenditure figures rely on Utilization Certificates (UCs) submitted by state finance departments, which frequently experience 12–18 month reporting lags."
          />
        </div>
      )}

      {/* Footer Nav Link */}
      <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex items-center justify-between text-xs">
        <span className="text-[#717A74]">
          Source: Sansad records, Supreme Court & High Court judgments, and CAG audits.
        </span>
        <button
          onClick={() => navigate('/incidents')}
          className="font-bold text-[#1A3D2F] hover:text-[#143025] inline-flex items-center gap-1 cursor-pointer"
        >
          <span>Explore all incident records</span>
          <ArrowRight size={13} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
