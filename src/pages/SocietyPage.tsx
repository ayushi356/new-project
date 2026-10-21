import { useState } from 'react';
import { useNavigate } from '@/lib/router';
import {
  ExternalLink,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Scale,
} from 'lucide-react';
import { WomenGovernanceSection } from '@/components/WomenGovernanceSection';

export function SocietyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'women' | 'disclosures'>('women');

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24 text-[#181A19]">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-[#E5E0D8] bg-[#F4F1EA] py-12 sm:py-16 text-[#181A19]">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1A3D2F]/20 bg-[#1A3D2F]/5 px-3.5 py-1 text-xs font-semibold text-[#1A3D2F] uppercase tracking-wider">
              <Scale size={14} strokeWidth={1.5} />
              <span>Civic Rights, Society & Institutional Accountability</span>
            </div>
            <h1 className="mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-5xl text-[#181A19]">
              Rights, Society & Institutions
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4A524D]">
              Independent, evidence-backed public dossiers tracking women’s safety governance, Nirbhaya Fund utilization, statutory disclosures, constitutional court verdicts, and institutional oversight through 2026.
            </p>

            {/* Quick Links to Sister Tracks */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-[#E5E0D8] text-xs font-semibold">
              <span className="text-[#717A74]">Related Tracks:</span>
              <button
                onClick={() => navigate('/environment')}
                className="rounded-lg border border-[#E5E0D8] bg-white px-3 py-1.5 text-[#181A19] hover:bg-[#FAF8F5] transition"
              >
                Environment & Forests &rarr;
              </button>
              <button
                onClick={() => navigate('/press-freedom')}
                className="rounded-lg border border-[#E5E0D8] bg-white px-3 py-1.5 text-[#181A19] hover:bg-[#FAF8F5] transition"
              >
                Press Freedom & Leaders &rarr;
              </button>
              <button
                onClick={() => navigate('/incidents')}
                className="rounded-lg border border-[#E5E0D8] bg-white px-3 py-1.5 text-[#181A19] hover:bg-[#FAF8F5] transition"
              >
                Public Agitations & Inquiries &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 space-y-12">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E5E0D8] pb-1 gap-4 text-sm font-serif">
          <button
            onClick={() => setActiveTab('women')}
            className={`pb-3 font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'women'
                ? 'border-[#1A3D2F] text-[#1A3D2F]'
                : 'border-transparent text-[#717A74] hover:text-[#181A19]'
            }`}
          >
            1. Women, Safety & Governance
          </button>
          <button
            onClick={() => setActiveTab('disclosures')}
            className={`pb-3 font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'disclosures'
                ? 'border-[#1A3D2F] text-[#1A3D2F]'
                : 'border-transparent text-[#717A74] hover:text-[#181A19]'
            }`}
          >
            2. High-Profile Disclosures & Court Records
          </button>
        </div>

        {activeTab === 'women' ? (
          <div>
            <WomenGovernanceSection />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="border-b border-[#E5E0D8] pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#181A19]">
                High-Profile Public Disclosures & Court Records
              </h2>
              <p className="mt-1 text-sm text-[#4A524D] max-w-3xl">
                Certified constitutional benchmarks: multi-party electoral bond disclosures, corporate airport concessions under Supreme Court review, and unsealed US District Court public records.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* 1. Multi-Party Electoral Bonds Verdict */}
              <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-bold text-[#181A19]">
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
              <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-bold text-[#181A19]">
                      Infrastructure & Markets
                    </span>
                    <span className="text-[11px] text-[#717A74]">2019–2026</span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-bold text-[#181A19]">
                    Airport Concessions & Market Scrutiny
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
              <div className="rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md border border-[#E5E0D8] bg-[#FAF8F5] px-2.5 py-0.5 text-[10px] font-bold text-[#181A19]">
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

                  <div className="mt-3 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] p-3 text-[11px] leading-relaxed text-[#4A524D]">
                    <strong className="text-[#181A19]">Legal Evidentiary Note:</strong> Court docket mentions in personal address directories (e.g. corporate office coordinates) or scientific conferences contain zero allegations of wrongdoing or illicit activity. An address book entry does not constitute legal evidence of misconduct.
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
                    <ExternalLink size={10} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
