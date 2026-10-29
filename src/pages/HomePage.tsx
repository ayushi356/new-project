import { useState } from 'react';
import { useNavigate } from '@/lib/router';
import {
  ArrowRight,
  ChevronRight,
  Coins,
  Landmark,
  Users,
  FileCheck2,
  BadgeCheck,
  ShieldAlert,
  ExternalLink,
  Scale,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { CITIZEN_RUPEE_BREAKDOWN } from '@/data/publicFinanceData';
import { EditorialIconContainer } from '@/components/EditorialIcon';

export function HomePage() {
  const navigate = useNavigate();
  const [rupeeView, setRupeeView] = useState<'comes' | 'goes'>('comes');

  // Browse Destinations (6 Core Pillars)
  const browseDestinations = [
    {
      id: 'parties',
      category: 'Electoral Governance',
      title: 'Political Parties',
      description:
        'Objective dossiers on India’s national and regional political parties, legislative track records, organizational history, and party funding disclosures.',
      path: '/parties',
      cta: 'Explore Parties & Dossiers',
      icon: Landmark,
    },
    {
      id: 'ministers',
      category: 'Executive Accountability',
      title: 'Ministers & Council',
      description:
        'Executive accountability records, portfolio allocations, parliamentary attendances, cabinet tenures, and verified unscripted press availability.',
      path: '/leaders',
      cta: 'Explore Ministers & Portfolios',
      icon: Users,
    },
    {
      id: 'public-money',
      category: 'Fiscal Accountability',
      title: 'Tax & Public Money',
      description:
        'Interactive breakdown of the ₹48.2 Lakh Crore Union Budget, revenue sources, capex asset creation, state transfers, and CAG constitutional audits.',
      path: '/public-money',
      cta: 'Explore Treasury & Spending',
      icon: Coins,
    },
    {
      id: 'works',
      category: 'Infrastructure & Delivery',
      title: 'Works & Projects',
      description:
        'Audited records of major infrastructure projects, national highways, policy reforms, legislative acts, and verified implementation challenges.',
      path: '/works',
      cta: 'Explore Works & Records',
      icon: FileCheck2,
    },
    {
      id: 'promises',
      category: 'Manifesto Tracking',
      title: 'Promises & Manifestos',
      description:
        'Evidence-backed reality checks tracking election manifesto commitments across governing administrations: fulfilled, in progress, or stalled.',
      path: '/promises',
      cta: 'Explore Manifesto Trackers',
      icon: BadgeCheck,
    },
    {
      id: 'society',
      category: 'Civil Rights & Oversight',
      title: 'Rights, Society & Institutions',
      description:
        'Documented public dossiers on women’s safety governance, ecological and forest clearances, press freedom benchmarks, and major civic inquiries.',
      path: '/society',
      cta: 'Explore Society & Rights',
      icon: Scale,
    },
  ];

  // Recently Updated Records (4 Curated Entries)
  const recentRecords = [
    {
      id: 'capex-asset-creation',
      category: 'Public Finance',
      period: 'FY 2025–26 (BE)',
      title: 'Union Capital Outlay Growth & Asset Creation',
      summary:
        'Central capital expenditure expanded from ₹1.96 Lakh Crore in 2014 to ₹11.90 Lakh Crore in 2025–26, shifting public funds from routine consumption toward physical assets.',
      source: 'Union Budget Statements & CGA Audited Actuals',
      path: '/public-money',
    },
    {
      id: 'great-nicobar-diversion',
      category: 'Environment & Land',
      period: '2024–2026',
      title: 'Great Nicobar Island Transshipment & Forest Clearance',
      summary:
        'Statutory tracking of 130.75 sq km primary rainforest diversion, indigenous rights under FRA 2006, and National Green Tribunal compliance monitoring.',
      source: 'MoEFCC Forest Clearance Gazette & NGT Docket',
      path: '/environment',
    },
    {
      id: 'electoral-bonds-verdict',
      category: 'Constitutional Law',
      period: 'Feb 2024–2026',
      title: 'Supreme Court Electoral Bonds Disclosure Verdict',
      summary:
        'A unanimous 5-judge Supreme Court Constitution Bench declared the Electoral Bond Scheme unconstitutional under Article 19(1)(a), leading to SBI disclosing ₹16,518 Cr.',
      source: 'Supreme Court of India (5-Judge Bench Judgment)',
      path: '/society',
    },
    {
      id: 'internet-suspensions-tracker',
      category: 'Press Freedom',
      period: '2014–2026',
      title: 'State-Level Internet Shutdown Orders & Judicial Scrutiny',
      summary:
        'Tracking 88+ state-level mobile and fixed-line data suspension orders in 2026 under Telegraph Act rules benchmarked against Anuradha Bhasin compliance standards.',
      source: 'Software Freedom Law Center & Supreme Court Records',
      path: '/press-freedom',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#181A19]">
      {/* =========================================================================
          1. HERO SECTION
          Headline: "India's Story. Beyond Politics."
          Mission statement and two clear actions.
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-[#E5E0D8] bg-[#F4F1EA] py-16 sm:py-24">
        {/* Subtle Architectural 24-Spoke Ashoka Chakra Watermark */}
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
            {/* Metadata Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3.5 py-1 text-xs font-semibold text-[#1A3D2F]">
              <Scale size={13} strokeWidth={1.5} />
              <span>Independent Civic Accountability · Updated through October 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-serif text-4xl font-extrabold tracking-tight text-[#181A19] sm:text-5xl lg:text-6xl leading-[1.15]">
              India's Story. Beyond Politics.
            </h1>

            {/* Concise Mission Statement */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#4A524D]">
              An independent civic-accountability research platform tracking public expenditure, legislative decisions, welfare delivery, and democratic institutions — verified through primary gazettes, parliamentary records, and constitutional audits.
            </p>

            {/* Two Clear Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('browse-tracker');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1A3D2F] px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition hover:bg-[#143025] hover:shadow-sm cursor-pointer"
              >
                <span>Explore the Evidence</span>
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center gap-2 rounded-xl border border-[#D5CFBF] bg-white px-6 py-3.5 text-sm font-semibold text-[#181A19] shadow-2xs transition hover:bg-[#FAF8F5] cursor-pointer"
              >
                <FileText size={15} strokeWidth={1.5} className="text-[#1A3D2F]" />
                <span>How We Verify Claims</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. COMPACT EVIDENCE SNAPSHOT
          No more than four meaningful statistics with defined counting rules.
         ========================================================================= */}
      <section className="border-b border-[#E5E0D8] bg-white py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stat 1 */}
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-5">
              <div className="font-serif text-3xl font-extrabold text-[#1A3D2F]">₹48.2 Lakh Cr</div>
              <div className="mt-1 text-sm font-bold text-[#181A19]">Union Outlay Tracked</div>
              <div className="mt-2 text-xs leading-relaxed text-[#5C645E]">
                Authorized central expenditure across revenue and capital accounts for FY 2024–25 under Article 112.
              </div>
            </div>

            {/* Stat 2 */}
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-5">
              <div className="font-serif text-3xl font-extrabold text-[#1A3D2F]">4 Tiers</div>
              <div className="mt-1 text-sm font-bold text-[#181A19]">Evidentiary Hierarchy</div>
              <div className="mt-2 text-xs leading-relaxed text-[#5C645E]">
                Classification standard prioritizing certified court orders, CAG audits, and official gazettes over claims.
              </div>
            </div>

            {/* Stat 3 */}
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-5">
              <div className="font-serif text-3xl font-extrabold text-[#1A3D2F]">6 Domains</div>
              <div className="mt-1 text-sm font-bold text-[#181A19]">Civic Research Tracks</div>
              <div className="mt-2 text-xs leading-relaxed text-[#5C645E]">
                Comprehensive coverage spanning Parties, Ministers, Public Treasury, Works, Manifestos, and Civil Rights.
              </div>
            </div>

            {/* Stat 4 */}
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-5">
              <div className="font-serif text-3xl font-extrabold text-[#1A3D2F]">100% Sourced</div>
              <div className="mt-1 text-sm font-bold text-[#181A19]">Primary Sourced Dossiers</div>
              <div className="mt-2 text-xs leading-relaxed text-[#5C645E]">
                Every published record cites a verifiable document title, parliamentary docket ID, or gazette link.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BROWSE THE TRACKER SECTION
          Approximately six destinations.
         ========================================================================= */}
      <section id="browse-tracker" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="border-b border-[#E5E0D8] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            Research Tracks
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-[#181A19] sm:text-3xl">
            Browse the Tracker
          </h2>
          <p className="mt-2 text-sm text-[#4A524D] max-w-2xl leading-relaxed">
            Explore structured civic dossiers across the six core pillars of India’s democratic and institutional governance.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {browseDestinations.map((dest) => {
            const Icon = dest.icon;
            return (
              <div
                key={dest.id}
                onClick={() => navigate(dest.path)}
                className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-2xs transition hover:-translate-y-0.5 hover:border-[#C8C2B5] hover:shadow-xs cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <EditorialIconContainer icon={Icon} size="md" variant="ivory" />
                    <span className="text-[11px] font-semibold text-[#717A74]">
                      {dest.category}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-lg font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition">
                    {dest.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#4A524D] leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-xs font-semibold text-[#1A3D2F] group-hover:text-[#143025]">
                  <span>{dest.cta}</span>
                  <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. FEATURED PUBLIC MONEY VISUALIZATION
          One featured Public Money chart with labels, units, period, source.
         ========================================================================= */}
      <section className="border-t border-[#E5E0D8] bg-[#F7F5F0] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
                Featured Fiscal Visualization
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-[#181A19] sm:text-3xl">
                The Citizen's Rupee: Where Public Money Comes From & Goes
              </h2>
              <p className="mt-2 text-sm text-[#4A524D] max-w-3xl leading-relaxed">
                If the entire Government of India budget (₹48.2 Lakh Crore) were scaled down to a single 100-paise coin, this is how every rupee is collected and allocated across accounts.
              </p>
            </div>

            {/* Toggle Tab */}
            <div className="flex rounded-lg border border-[#E5E0D8] bg-white p-1 shrink-0">
              <button
                onClick={() => setRupeeView('comes')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  rupeeView === 'comes'
                    ? 'bg-[#1A3D2F] text-white shadow-xs'
                    : 'text-[#4A524D] hover:text-[#181A19]'
                }`}
              >
                Where 1 Rupee Comes From
              </button>
              <button
                onClick={() => setRupeeView('goes')}
                className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  rupeeView === 'goes'
                    ? 'bg-[#1A3D2F] text-white shadow-xs'
                    : 'text-[#4A524D] hover:text-[#181A19]'
                }`}
              >
                Where 1 Rupee Goes
              </button>
            </div>
          </div>

          {/* Scope and Units Meta Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-[#717A74] gap-2">
            <div>
              <strong>Reporting Period:</strong> {CITIZEN_RUPEE_BREAKDOWN.financialYear} &bull;{' '}
              <strong>Scope:</strong> Union Government Consolidated Fund of India (Article 266)
            </div>
            <div>
              <strong>Units:</strong> Paise per ₹100 (% share)
            </div>
          </div>

          {/* Stacked Proportional Bar */}
          <div className="mt-4">
            <div className="flex h-7 w-full overflow-hidden rounded-lg bg-white border border-[#E5E0D8] shadow-inner">
              {(rupeeView === 'comes'
                ? CITIZEN_RUPEE_BREAKDOWN.where1RupeeComesFrom
                : CITIZEN_RUPEE_BREAKDOWN.where1RupeeGoes
              ).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${item.paise}%`,
                    backgroundColor: item.color,
                  }}
                  title={`${'source' in item ? item.source : item.destination}: ${item.paise} paise (${item.paise}%)`}
                  className="transition-all hover:opacity-85"
                />
              ))}
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#717A74]">
              <span>0 paise (0%)</span>
              <span>100 paise (100% of Union Outlay)</span>
            </div>
          </div>

          {/* Legend and Itemized Breakdown Grid */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {(rupeeView === 'comes'
              ? CITIZEN_RUPEE_BREAKDOWN.where1RupeeComesFrom
              : CITIZEN_RUPEE_BREAKDOWN.where1RupeeGoes
            ).map((item, idx) => {
              const label = 'source' in item ? item.source : item.destination;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-[#E5E0D8] bg-white p-3 text-xs"
                >
                  <div className="flex items-center gap-2 overflow-hidden pr-2">
                    <span
                      className="h-3 w-3 shrink-0 rounded-xs"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate font-medium text-[#181A19]" title={label}>
                      {label}
                    </span>
                  </div>
                  <span className="shrink-0 font-bold font-mono text-[#181A19]">
                    {item.paise}p{' '}
                    <span className="font-normal text-[11px] text-[#717A74]">
                      ({item.paise}%)
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Source Attribution & Navigation Footer */}
          <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#717A74]">
            <div className="flex items-center gap-2">
              <span>Source: Union Budget Receipts & Expenditure Statements, Ministry of Finance</span>
              <a
                href="https://www.indiabudget.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#1A3D2F] hover:underline inline-flex items-center gap-0.5"
              >
                <span>Official Portal</span>
                <ExternalLink size={11} />
              </a>
              <span>&bull; Last verified: 20 October 2026</span>
            </div>

            <button
              onClick={() => navigate('/public-money')}
              className="font-bold text-[#1A3D2F] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>Explore All 10 Public Finance Pillars</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. RECENTLY UPDATED RECORDS
          Three or four genuinely recent, relevant entries.
         ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E5E0D8] pb-4 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
              Verified Dossiers
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-[#181A19] sm:text-3xl">
              Recently Updated Records
            </h2>
            <p className="mt-2 text-sm text-[#4A524D] max-w-2xl leading-relaxed">
              Recent additions and verified dossiers tracking fiscal allocations, environmental clearances, and constitutional court rulings.
            </p>
          </div>

          <button
            onClick={() => navigate('/works')}
            className="inline-flex items-center gap-1 text-sm font-bold text-[#1A3D2F] hover:underline cursor-pointer"
          >
            <span>Browse complete archives in Works</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {recentRecords.map((rec) => (
            <div
              key={rec.id}
              onClick={() => navigate(rec.path)}
              className="group flex flex-col justify-between rounded-xl border border-[#E5E0D8] bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:border-[#C8C2B5] hover:shadow-xs cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-1 text-[11px]">
                  <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2 py-0.5 font-semibold text-[#181A19]">
                    {rec.category}
                  </span>
                  <span className="text-[#717A74] font-medium">{rec.period}</span>
                </div>

                <h3 className="mt-3 font-serif text-base font-bold text-[#181A19] group-hover:text-[#1A3D2F] transition leading-snug">
                  {rec.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#4A524D] line-clamp-3">
                  {rec.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0ECE1]">
                <div className="text-[10px] text-[#717A74] truncate" title={rec.source}>
                  Source: {rec.source}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs font-semibold text-[#1A3D2F]">
                  <span>Inspect dossier</span>
                  <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. SHORT METHODOLOGY AND EVIDENCE SECTION
          Linking to sourcing standards, uncertainty labels, and corrections.
         ========================================================================= */}
      <section className="border-t border-[#E5E0D8] bg-[#1A3D2F] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={13} /> Sourcing Integrity & Public Audit
              </span>
              <h2 className="mt-4 font-serif text-2xl font-bold sm:text-3xl text-white">
                Methodology & Evidentiary Standards
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#D2DFD8]">
                Bharat Governance Tracker is an independent, non-partisan civic research project. Records are catalogued to provide citizens with direct access to primary documents, distinguishing authorized estimates from audited actuals.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-[#1A3D2F] transition hover:bg-[#FAF8F5] cursor-pointer"
                >
                  <span>Read Evidentiary Charter</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* 3 Pillars of Evidence */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <h3 className="font-serif text-sm font-bold text-white">1. Primary Documents</h3>
                <p className="mt-1.5 text-xs text-[#D2DFD8] leading-relaxed">
                  Certified court judgments, CAG performance audits, and parliamentary answers form our baseline.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <h3 className="font-serif text-sm font-bold text-white">2. Uncertainty Labels</h3>
                <p className="mt-1.5 text-xs text-[#D2DFD8] leading-relaxed">
                  Budget Estimates (BE), Revised Estimates (RE), and disputed records are explicitly distinguished.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
                <h3 className="font-serif text-sm font-bold text-white">3. Open Corrections</h3>
                <p className="mt-1.5 text-xs text-[#D2DFD8] leading-relaxed">
                  Transparent review protocol for factual discrepancies submitted with primary public evidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
