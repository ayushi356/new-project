import { useEffect, useState } from 'react';
import { supabase, type Party } from '@/lib/supabase';

export function useParties() {
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('parties')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else setParties(data ?? []);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { parties, loading, error };
}

export function useParty(id: string | null) {
  const [party, setParty] = useState<Party | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setParty(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    let cancelled = false;
    supabase
      .from('parties')
      .select('*')
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) setError(error.message);
        else setParty(data);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { party, loading, error };
}
