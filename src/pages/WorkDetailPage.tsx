import { useEffect, useState } from 'react';
import { supabase, type Work, type Party } from '@/lib/supabase';
import { useNavigate } from '@/lib/router';
import { WorkDetail } from '@/components/Work';
import { ArrowLeft, Loader } from 'lucide-react';

export function WorkDetailPage({ id }: { id: string }) {
  const navigate = useNavigate();
  const [work, setWork] = useState<Work | null>(null);
  const [party, setParty] = useState<Party | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      const { data: w } = await supabase.from('works').select('*').eq('id', id).maybeSingle();
      if (cancelled) return;
      setWork(w);
      if (w?.party_id) {
        const { data: p } = await supabase.from('parties').select('*').eq('id', w.party_id).maybeSingle();
        if (!cancelled) setParty(p);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-slate-400">
        <Loader className="animate-spin" />
      </div>
    );

  if (!work)
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-slate-600">This record could not be found.</p>
        <button onClick={() => navigate('/works')} className="mt-4 text-sm font-medium text-blue-600">
          Back to works
        </button>
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <button
        onClick={() => navigate('/works')}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft size={15} strokeWidth={1.5} /> All works
      </button>
      <div className="mt-5">
        <WorkDetail work={work} partyName={party?.name} />
      </div>
      {party && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(`/parties/${party.id}`)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            See more from {party.name}
          </button>
        </div>
      )}
    </div>
  );
}
