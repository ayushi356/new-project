import { useEffect, useState, useCallback } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'parties' }
  | { name: 'party'; id: string }
  | { name: 'leaders' }
  | { name: 'leader'; id: string }
  | { name: 'works' }
  | { name: 'work'; id: string }
  | { name: 'yojnas' }
  | { name: 'promises' }
  | { name: 'incidents' }
  | { name: 'public-money'; section?: string }
  | { name: 'public-money-explorer'; section?: string; recordId?: string }
  | { name: 'budget-explained' }
  | { name: 'citizen-toolkit' }
  | { name: 'press-freedom' }
  | { name: 'environment' }
  | { name: 'society' }
  | { name: 'ministers'; ministerId?: string };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return { name: 'home' };
  if (parts[0] === 'about') return { name: 'about' };
  if (parts[0] === 'ministers' || parts[0] === 'council-of-ministers')
    return { name: 'ministers', ministerId: parts[1] };
  if (parts[0] === 'parties' && parts.length === 1) return { name: 'parties' };
  if (parts[0] === 'parties' && parts[1])
    return { name: 'party', id: parts[1] };
  if (parts[0] === 'leaders' && parts.length === 1) return { name: 'leaders' };
  if (parts[0] === 'leaders' && parts[1])
    return { name: 'leader', id: parts[1] };
  if (parts[0] === 'works' && parts.length === 1) return { name: 'works' };
  if (parts[0] === 'works' && parts[1]) return { name: 'work', id: parts[1] };
  if (parts[0] === 'yojnas') return { name: 'yojnas' };
  if (parts[0] === 'promises') return { name: 'promises' };
  if (parts[0] === 'incidents') return { name: 'incidents' };
  if (parts[0] === 'public-money') {
    if (parts[1] === 'explorer') return { name: 'public-money-explorer', section: parts[2], recordId: parts[3] };
    if (parts[1] === 'explained' || parts[1] === 'budget-explained') return { name: 'budget-explained' };
    if (parts[1] === 'toolkit' || parts[1] === 'citizen-toolkit') return { name: 'citizen-toolkit' };
    return { name: 'public-money', section: parts[1] };
  }
  if (parts[0] === 'public-money-explorer' || parts[0] === 'financial-explorer')
    return { name: 'public-money-explorer', section: parts[1], recordId: parts[2] };
  if (parts[0] === 'budget-explained' || parts[0] === 'budget-process')
    return { name: 'budget-explained' };
  if (parts[0] === 'citizen-toolkit' || parts[0] === 'accountability-toolkit')
    return { name: 'citizen-toolkit' };
  if (parts[0] === 'press-freedom') return { name: 'press-freedom' };
  if (parts[0] === 'environment') return { name: 'environment' };
  if (parts[0] === 'society' || parts[0] === 'rights-society' || parts[0] === 'women') return { name: 'society' };
  return { name: 'home' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function useNavigate() {
  return useCallback((path: string) => navigate(path), []);
}
