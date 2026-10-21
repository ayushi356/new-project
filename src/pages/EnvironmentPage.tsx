import React, { useState, useMemo } from 'react';
import {
  Trees,
  Mountain,
  AlertTriangle,
  Scale,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Filter,
  Search,
  BookOpen,
  Info,
  Layers,
} from 'lucide-react';
import { ENVIRONMENT_RECORDS, type EnvironmentRecord } from '@/data/environmentData';
import { useNavigate } from '@/lib/router';

export function EnvironmentPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>('env-hasdeo-arand');

  const filteredRecords = useMemo(() => {
    return ENVIRONMENT_RECORDS.filter((rec) => {
      if (selectedCategory !== 'all' && rec.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          rec.projectName.toLowerCase().includes(q) ||
          rec.location.toLowerCase().includes(q) ||
          rec.state.toLowerCase().includes(q) ||
          rec.promoterOrAuthority.toLowerCase().includes(q) ||
          rec.environmentalImpactSummary.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#FAF8F5] text-[#181A19] pb-24">
      {/* Editorial Hero */}
      <section className="relative overflow-hidden border-b border-[#E5E0D8] bg-[#F5F2EB] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1A3D2F]/10 border border-[#1A3D2F]/20 px-3.5 py-1 text-xs font-bold text-[#1A3D2F] uppercase tracking-wider">
              <Trees size={14} strokeWidth={1.5} />
              <span>Public Commons, Forests & Ecological Governance</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-[#181A19]">
              Environment, Forests & Land Rights
            </h1>

            <p className="font-serif text-lg text-[#2D5A46] italic leading-relaxed">
              Tracking statutory clearances, Gram Sabha consents, biodiversity impacts, and constitutional court rulings.
            </p>

            <p className="text-sm leading-relaxed text-[#525A55]">
              Public resources and natural ecosystems belong to all citizens. Explore verified government clearances on the central PARIVESH portal, community forest rights under the FRA 2006, compensatory afforestation compliance, and Supreme Court environmental directives through October 2026.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#E5E0D8] pt-6">
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6F7771]">National Tracks</p>
              <p className="font-serif text-2xl font-bold text-[#181A19] mt-0.5">{ENVIRONMENT_RECORDS.length}</p>
              <p className="text-[11px] text-[#525A55]">Contested & Flagship Projects</p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#6F7771]">Forest Diversion</p>
              <p className="font-serif text-2xl font-bold text-[#181A19] mt-0.5">40,000+ Ha</p>
              <p className="text-[11px] text-[#525A55]">Rainforest, Sal & Tiger Reserves</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Judicial Scrutiny</p>
              <p className="font-serif text-2xl font-bold text-amber-900 mt-0.5">SC Interim Stay</p>
              <p className="text-[11px] text-amber-700">1996 Godavarman Forest Scope</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Primary Evidence</p>
              <p className="font-serif text-2xl font-bold text-emerald-900 mt-0.5">100% Sourced</p>
              <p className="text-[11px] text-emerald-700">PARIVESH, NGT & Supreme Court</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-8">
        {/* Civic Primer on Forest Laws */}
        <div className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3D2F]">
            <BookOpen size={15} strokeWidth={1.5} />
            <span>Civic Literacy: The Dual Pillars of Indian Forest Governance</span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 text-xs leading-relaxed">
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
              <h3 className="font-serif text-sm font-bold text-[#181A19]">
                1. Forest (Conservation) Act, 1980 / 2023 Amendment
              </h3>
              <p className="mt-1 text-[#525A55]">
                Regulates the diversion of forest land for non-forest purposes (mining, dams, defense roads). Under central rules, Stage-I requires compensatory afforestation (CA) and Net Present Value (NPV) payments into CAMPA funds, while Stage-II gives final legal permission to fell trees.
              </p>
            </div>
            <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
              <h3 className="font-serif text-sm font-bold text-[#181A19]">
                2. Forest Rights Act (FRA), 2006 & Gram Sabha Consent
              </h3>
              <p className="mt-1 text-[#525A55]">
                Recognizes individual and community forest rights of Scheduled Tribes and Other Traditional Forest Dwellers (OTFDs). Statutory MoEFCC guidelines require certified completion of FRA recognition and prior informed Gram Sabha consent before forest diversion is finalized.
              </p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#181A19] flex items-center gap-1.5 mr-1">
              <Filter size={14} strokeWidth={1.5} className="text-[#1A3D2F]" /> Filter By Category:
            </span>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'mining', label: 'Coal & Mineral Mining' },
              { id: 'infrastructure_port', label: 'Ports & Defense Infrastructure' },
              { id: 'statutory_act', label: 'Statutory Legislation (FCA)' },
              { id: 'river_interlink', label: 'River Interlinking' },
              { id: 'forest_conservation', label: 'Eco-Sensitive Zones' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === tab.id
                    ? 'bg-[#1A3D2F] text-white shadow-xs'
                    : 'bg-[#F5F2EB] text-[#4A524D] hover:bg-[#EAE4DC] hover:text-[#181A19]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={15} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#818C85]" />
            <input
              type="text"
              placeholder="Search projects, states, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#E5E0D8] bg-[#FAF8F5] py-2 pl-9 pr-3 text-xs text-[#181A19] placeholder-[#818C85] focus:border-[#1A3D2F] focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Records Dossier Cards */}
        <div className="space-y-6">
          {filteredRecords.map((rec) => {
            const isExpanded = expandedCardId === rec.id;
            return (
              <article
                key={rec.id}
                className="rounded-2xl border border-[#E5E0D8] bg-white shadow-xs overflow-hidden transition hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="rounded-md bg-[#1A3D2F]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#1A3D2F] uppercase tracking-wider">
                          {rec.category.replace('_', ' ')}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#6F7771]">
                          <MapPin size={12} strokeWidth={1.5} /> {rec.location}, <strong>{rec.state}</strong>
                        </span>
                        {rec.landAreaHectares && (
                          <span className="text-xs text-[#6F7771]">
                            · {rec.landAreaHectares.toLocaleString('en-IN')} Hectares
                          </span>
                        )}
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#181A19] leading-snug">
                        {rec.projectName}
                      </h2>

                      <p className="mt-1 text-xs font-semibold text-[#525A55]">
                        Promoter / Proponent: <span className="text-[#181A19]">{rec.promoterOrAuthority}</span>
                      </p>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        rec.status === 'operational'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : rec.status === 'legislated_stayed' || rec.status === 'stayed_by_court'
                          ? 'bg-rose-100 text-rose-900 border border-rose-200'
                          : 'bg-blue-100 text-blue-900 border border-blue-200'
                      }`}
                    >
                      <Scale size={13} strokeWidth={1.5} />
                      {rec.statusLabel}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#3A403C]">
                    {rec.environmentalImpactSummary}
                  </p>

                  {/* Core Facts Summary Grid */}
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-3.5">
                      <strong className="block text-[11px] uppercase tracking-wider text-[#1A3D2F] font-bold">
                        Forest Clearance Status
                      </strong>
                      <p className="mt-1 text-[#4A524D] leading-relaxed">{rec.forestClearanceStatus}</p>
                    </div>

                    <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-3.5">
                      <strong className="block text-[11px] uppercase tracking-wider text-[#96632B] font-bold">
                        Gram Sabha Consent & Tribal Rights (FRA)
                      </strong>
                      <p className="mt-1 text-[#4A524D] leading-relaxed">{rec.gramSabhaStatus}</p>
                    </div>
                  </div>

                  {/* Expandable Deep Dive */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-[#E5E0D8] space-y-4 text-xs">
                      <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-4">
                        <strong className="block text-[#181A19] font-bold mb-1">
                          Tribal & Local Community Context:
                        </strong>
                        <p className="text-[#4A524D] leading-relaxed">{rec.tribalRightsContext}</p>
                      </div>

                      <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4">
                        <strong className="block text-rose-950 font-bold mb-1">
                          Judicial Proceedings & Court Directives:
                        </strong>
                        <p className="text-rose-900 leading-relaxed">{rec.legalChallenges}</p>
                      </div>

                      <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                        <strong className="block text-emerald-950 font-bold mb-1">
                          Official Government & Proponent Response:
                        </strong>
                        <p className="text-emerald-900 leading-relaxed">{rec.officialResponse}</p>
                      </div>
                    </div>
                  )}

                  {/* Footer & Source Link */}
                  <div className="mt-5 pt-4 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#525A55] gap-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} strokeWidth={1.5} className="text-[#1A3D2F]" />
                      <span>{rec.evidenceTier} Judicial / Gazette Record · Verified {rec.lastVerifiedDate}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setExpandedCardId(isExpanded ? null : rec.id)}
                        className="font-semibold text-[#1A3D2F] hover:underline inline-flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Collapse Details' : 'View Full Dossier'}</span>
                        {isExpanded ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
                      </button>

                      <a
                        href={rec.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-[#F5F2EB] border border-[#E5E0D8] px-3 py-1.5 font-semibold text-[#1A3D2F] hover:bg-[#EAE4DC] transition"
                      >
                        <span>{rec.primarySource.split('&')[0]}</span>
                        <ExternalLink size={12} strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
