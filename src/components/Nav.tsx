import { useState, useRef, useEffect } from 'react';
import { Scale, ChevronDown, Menu, X } from 'lucide-react';
import { useNavigate, useRoute } from '@/lib/router';

interface NavDropdownItem {
  path: string;
  label: string;
  description?: string;
}

export function Navbar() {
  const route = useRoute();
  const navigate = useNavigate();

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop dropdown state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNav = (path: string) => {
    navigate(path);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const handleMouseEnter = (name: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Route matchers
  const isHomeActive = route.name === 'home';
  const isPartiesActive = route.name === 'parties' || route.name === 'party';
  const isGovernanceActive = ['works', 'work', 'yojnas', 'promises', 'leaders', 'leader'].includes(route.name);
  const isPublicMoneyActive = route.name === 'public-money';
  const isSocietyActive = ['environment', 'press-freedom', 'incidents'].includes(route.name);
  const isAboutActive = route.name === 'about';

  const governanceItems: NavDropdownItem[] = [
    { path: '/works', label: 'Works & Records', description: 'Policy reforms, major milestones and documented scrutiny' },
    { path: '/yojnas', label: 'Welfare Schemes (Yojnas)', description: 'Claimed launch targets vs ground delivery data' },
    { path: '/promises', label: 'Manifesto Promises', description: 'Tracking campaign pledges: delivered, partial, or stalled' },
    { path: '/parties', label: 'Ministers & Portfolios', description: 'Executive accountability, cabinet tenures and decisions' },
  ];

  const publicMoneyItems: NavDropdownItem[] = [
    { path: '/public-money', label: 'Treasury & Spending Overview', description: 'Where ₹1 comes from & goes: ₹48.2 Lakh Cr Union Budget' },
    { path: '/public-money/revenue', label: '1. Revenue Sources', description: 'Direct and indirect taxes, GST, and non-tax receipts' },
    { path: '/public-money/allocations', label: '2. Budget Allocations', description: 'Ministry-wise ceilings authorized by Parliament' },
    { path: '/public-money/expenditure', label: '3. Actual Expenditure', description: 'Actual disbursements compared against estimates' },
    { path: '/public-money/audits', label: '6. Audits & CAG Findings', description: 'Constitutional audit findings on cost overruns & lapses' },
    { path: '/public-money/debt', label: '8. Debt & Financial Liabilities', description: 'Public debt, market borrowings and interest servicing' },
  ];

  const societyItems: NavDropdownItem[] = [
    { path: '/environment', label: 'Environment, Forests & Land', description: 'Statutory clearances, forest diversion & Supreme Court stays' },
    { path: '/press-freedom', label: 'Media & Press Freedom', description: 'Journalist safety, ownership concentration & press conferences' },
    { path: '/incidents', label: 'Crises, Protests & Inquiries', description: 'Documented national incidents, student agitations & riots' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E0D8] bg-[#FAF8F5]/95 backdrop-blur-md transition-colors">
      <nav ref={navContainerRef} className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity on left */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1A3D2F] text-white shadow-2xs group-hover:bg-[#143025] transition">
            <Scale size={18} />
          </span>
          <span className="flex flex-col">
            <span className="font-serif text-base font-bold tracking-tight text-[#181A19]">
              Bharat Governance Tracker
            </span>
            <span className="text-[11px] font-medium text-[#525A55] hidden sm:inline">
              India's Public Record · Non-Partisan
            </span>
          </span>
        </button>

        {/* Desktop Navigation: Exactly 6 Text-First Items with Dropdowns */}
        <div className="hidden lg:flex items-center gap-1.5">
          {/* 1. Home */}
          <button
            onClick={() => handleNav('/')}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition cursor-pointer ${
              isHomeActive
                ? 'bg-[#1A3D2F] text-white'
                : 'text-[#4A524D] hover:bg-[#EAE4DC]/60 hover:text-[#181A19]'
            }`}
          >
            Home
          </button>

          {/* 2. Parties */}
          <button
            onClick={() => handleNav('/parties')}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition cursor-pointer ${
              isPartiesActive
                ? 'bg-[#1A3D2F] text-white'
                : 'text-[#4A524D] hover:bg-[#EAE4DC]/60 hover:text-[#181A19]'
            }`}
          >
            Parties
          </button>

          {/* 3. Governance Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('governance')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === 'governance' ? null : 'governance')}
              aria-expanded={openDropdown === 'governance'}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                isGovernanceActive || openDropdown === 'governance'
                  ? 'bg-[#1A3D2F] text-white'
                  : 'text-[#4A524D] hover:bg-[#EAE4DC]/60 hover:text-[#181A19]'
              }`}
            >
              <span>Governance</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  openDropdown === 'governance' ? 'rotate-180 text-white' : 'text-[#717A74]'
                }`}
              />
            </button>

            {openDropdown === 'governance' && (
              <div className="absolute left-0 top-full mt-1.5 w-72 rounded-xl border border-[#E5E0D8] bg-white p-2 shadow-lg animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                {governanceItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="w-full rounded-lg p-2.5 text-left transition hover:bg-[#FAF8F5] cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-[#181A19] group-hover:text-[#1A3D2F]">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-[11px] text-[#525A55] leading-snug mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Public Money Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('public-money')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === 'public-money' ? null : 'public-money')}
              aria-expanded={openDropdown === 'public-money'}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                isPublicMoneyActive || openDropdown === 'public-money'
                  ? 'bg-[#1A3D2F] text-white'
                  : 'text-[#4A524D] hover:bg-[#EAE4DC]/60 hover:text-[#181A19]'
              }`}
            >
              <span>Public Money</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  openDropdown === 'public-money' ? 'rotate-180 text-white' : 'text-[#717A74]'
                }`}
              />
            </button>

            {openDropdown === 'public-money' && (
              <div className="absolute left-0 top-full mt-1.5 w-80 rounded-xl border border-[#E5E0D8] bg-white p-2 shadow-lg animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                {publicMoneyItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="w-full rounded-lg p-2.5 text-left transition hover:bg-[#FAF8F5] cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-[#181A19] group-hover:text-[#1A3D2F]">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-[11px] text-[#525A55] leading-snug mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Society & Environment Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('society')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setOpenDropdown(openDropdown === 'society' ? null : 'society')}
              aria-expanded={openDropdown === 'society'}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                isSocietyActive || openDropdown === 'society'
                  ? 'bg-[#1A3D2F] text-white'
                  : 'text-[#4A524D] hover:bg-[#EAE4DC]/60 hover:text-[#181A19]'
              }`}
            >
              <span>Society & Environment</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  openDropdown === 'society' ? 'rotate-180 text-white' : 'text-[#717A74]'
                }`}
              />
            </button>

            {openDropdown === 'society' && (
              <div className="absolute right-0 top-full mt-1.5 w-80 rounded-xl border border-[#E5E0D8] bg-white p-2 shadow-lg animate-in fade-in-50 zoom-in-95 duration-100 z-50">
                {societyItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="w-full rounded-lg p-2.5 text-left transition hover:bg-[#FAF8F5] cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-[#181A19] group-hover:text-[#1A3D2F]">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="text-[11px] text-[#525A55] leading-snug mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. Methodology */}
          <button
            onClick={() => handleNav('/about')}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition cursor-pointer ${
              isAboutActive
                ? 'bg-[#1A3D2F] text-white'
                : 'text-[#4A524D] hover:bg-[#EAE4DC]/60 hover:text-[#181A19]'
            }`}
          >
            Methodology
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-[#181A19] hover:bg-[#EAE4DC] lg:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="border-t border-[#E5E0D8] bg-[#FAF8F5] lg:hidden shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 space-y-4">
            {/* Primary Direct Links */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNav('/')}
                className={`rounded-lg px-3 py-2 text-left text-xs font-bold transition ${
                  isHomeActive ? 'bg-[#1A3D2F] text-white' : 'bg-white border border-[#E5E0D8] text-[#181A19]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNav('/parties')}
                className={`rounded-lg px-3 py-2 text-left text-xs font-bold transition ${
                  isPartiesActive ? 'bg-[#1A3D2F] text-white' : 'bg-white border border-[#E5E0D8] text-[#181A19]'
                }`}
              >
                Parties
              </button>
            </div>

            {/* Governance Group */}
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-3 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#717A74]">
                Governance Tracks
              </div>
              <div className="flex flex-col space-y-1">
                {governanceItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="rounded-md px-2 py-1.5 text-left text-xs font-semibold text-[#181A19] hover:bg-[#FAF8F5]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Public Money Group */}
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#717A74]">
                  Public Money
                </span>
                <button
                  onClick={() => handleNav('/public-money')}
                  className="text-[11px] font-bold text-[#1A3D2F] hover:underline"
                >
                  View All &rarr;
                </button>
              </div>
              <div className="flex flex-col space-y-1">
                {publicMoneyItems.slice(0, 4).map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="rounded-md px-2 py-1.5 text-left text-xs font-semibold text-[#181A19] hover:bg-[#FAF8F5]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Society & Environment Group */}
            <div className="rounded-xl border border-[#E5E0D8] bg-white p-3 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#717A74]">
                Society & Environment
              </div>
              <div className="flex flex-col space-y-1">
                {societyItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path)}
                    className="rounded-md px-2 py-1.5 text-left text-xs font-semibold text-[#181A19] hover:bg-[#FAF8F5]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Methodology Direct Link */}
            <button
              onClick={() => handleNav('/about')}
              className={`rounded-lg px-3 py-2 text-center text-xs font-bold transition ${
                isAboutActive ? 'bg-[#1A3D2F] text-white' : 'bg-white border border-[#E5E0D8] text-[#181A19]'
              }`}
            >
              Methodology & About Platform
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-[#E5E0D8] bg-[#F5F2EB] text-[#4A524D]">
      <div className="mx-auto max-w-7xl px-4 py-12 text-sm sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1A3D2F] text-white">
                <Scale size={15} />
              </span>
              <span className="font-serif text-lg font-bold text-[#181A19]">
                Bharat Governance Tracker
              </span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-[#525A55]">
              An independent, evidence-backed civic accountability platform documenting India’s democratic institutions, political decisions, public spending, and ground outcomes using verified judicial rulings, parliamentary gazettes, and constitutional audits.
            </p>
            <p className="text-[11px] text-[#717A74]">
              Data current through <strong>20 October 2026</strong>. 4-tier evidentiary classification applied to all records without partisan preference.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#181A19] mb-3">
              Core Civic Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/parties')} className="hover:text-[#1A3D2F] hover:underline cursor-pointer">
                  Political Parties & Leaders
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/public-money')} className="hover:text-[#1A3D2F] hover:underline cursor-pointer">
                  Public Treasury & Tax Tracker
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/environment')} className="hover:text-[#1A3D2F] hover:underline cursor-pointer">
                  Forests, Ecology & Land Rights
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/press-freedom')} className="hover:text-[#1A3D2F] hover:underline cursor-pointer">
                  Media Freedom & Press Conferences
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/incidents')} className="hover:text-[#1A3D2F] hover:underline cursor-pointer">
                  Major Protests & Inquiries
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#181A19] mb-3">
              Integrity & Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#1A3D2F] hover:underline cursor-pointer">
                  Methodology & Evidentiary Tiers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#1A3D2F] hover:underline cursor-pointer">
                  Creator Note & Non-Partisanship
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#1A3D2F] hover:underline cursor-pointer">
                  Submit Document Corrections
                </button>
              </li>
              <li>
                <a
                  href="https://main.sci.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1A3D2F] hover:underline inline-flex items-center gap-1"
                >
                  Supreme Court of India
                </a>
              </li>
              <li>
                <a
                  href="https://cag.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1A3D2F] hover:underline inline-flex items-center gap-1"
                >
                  Comptroller & Auditor General
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E5E0D8] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#717A74] gap-2">
          <span>Bharat Governance Tracker · Independent Civic Knowledge Project</span>
          <span>Verified against primary statutory gazettes, parliamentary papers & court records.</span>
        </div>
      </div>
    </footer>
  );
}
