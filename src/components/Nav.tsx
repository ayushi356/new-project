import { Landmark, Scale, Info, Home, Menu, X, FileText, BadgeCheck, Flame, Coins, Newspaper } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useRoute } from '@/lib/router';

const links = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/parties', label: 'Parties', icon: Landmark },
  { path: '/works', label: 'Works & Records', icon: Scale },
  { path: '/public-money', label: 'Tax & Public Money', icon: Coins },
  { path: '/press-freedom', label: 'Press Freedom', icon: Newspaper },
  { path: '/yojnas', label: 'Yojnas', icon: FileText },
  { path: '/promises', label: 'Promises', icon: BadgeCheck },
  { path: '/incidents', label: 'Incidents & Protests', icon: Flame },
  { path: '/about', label: 'About', icon: Info },
] as const;

export function Navbar() {
  const route = useRoute();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return route.name === 'home';
    const seg = `/${path.replace(/^\//, '')}`;
    return window.location.hash.startsWith(`#${seg}`);
  };

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-2 text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
            <Scale size={18} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-slate-900">
              Bharat Governance Tracker
            </span>
            <span className="text-[11px] text-slate-500">
              Parties, Leaders & Works
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-0.5 md:flex xl:gap-1">
          {links.map((l) => {
            const Icon = l.icon;
            const active = isActive(l.path);
            return (
              <button
                key={l.path}
                onClick={() => handleNav(l.path)}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs xl:px-2.5 xl:py-2 xl:text-sm font-medium transition-colors ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={15} />
                {l.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {links.map((l) => {
              const Icon = l.icon;
              const active = isActive(l.path);
              return (
                <button
                  key={l.path}
                  onClick={() => handleNav(l.path)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={16} />
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-500 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="max-w-md">
            <p className="font-semibold text-slate-700">
              Bharat Governance Tracker
            </p>
            <p className="mt-1 leading-relaxed">
              An independent, source-linked record of the works of India's
              political parties and leaders — good and bad. Built for the
              general public to stay informed.
            </p>
          </div>
          <button
            onClick={() => navigate('/about')}
            className="text-slate-600 underline-offset-2 hover:underline"
          >
            About this project
          </button>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          Information compiled from public sources. Verify through the linked
          sources before forming conclusions.
        </p>
      </div>
    </footer>
  );
}
