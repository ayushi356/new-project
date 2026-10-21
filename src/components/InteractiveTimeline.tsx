import React, { useState, useMemo } from 'react';
import {
  Calendar,
  MapPin,
  ExternalLink,
  AlertTriangle,
  Megaphone,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Filter,
  Users,
  Building,
} from 'lucide-react';
import type { Incident, Party } from '@/lib/supabase';

interface InteractiveTimelineProps {
  incidents: Incident[];
  partyMap: Record<string, Party>;
  initialCategory?: 'all' | 'protest' | 'violence' | 'crisis';
}

export function InteractiveTimeline({
  incidents,
  partyMap,
  initialCategory = 'all',
}: InteractiveTimelineProps) {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Available years sorted descending
  const years = useMemo(() => {
    const set = new Set<number>();
    incidents.forEach((i) => {
      if (i.date_year) set.add(i.date_year);
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [incidents]);

  // Filtered and chronologically ordered incidents
  const timelineItems = useMemo(() => {
    return incidents
      .filter((inc) => {
        if (selectedYear !== 'all' && String(inc.date_year) !== selectedYear) return false;
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'protest' && inc.category !== 'protest') return false;
          if (
            selectedCategory === 'violence' &&
            inc.category !== 'violence' &&
            inc.category !== 'terror'
          )
            return false;
          if (
            selectedCategory === 'crisis' &&
            inc.category !== 'crisis' &&
            inc.category !== 'scandal' &&
            inc.category !== 'disaster'
          )
            return false;
        }
        return true;
      })
      .sort((a, b) => (b.date_year ?? 0) - (a.date_year ?? 0));
  }, [incidents, selectedYear, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Timeline Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#E5E0D8] bg-white p-3.5 shadow-2xs">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg px-3 py-1.5 transition cursor-pointer border ${
              selectedCategory === 'all'
                ? 'bg-[#1A3D2F] border-[#1A3D2F] text-white shadow-2xs font-bold'
                : 'bg-[#FAF8F5] border-[#E5E0D8] text-[#181A19] hover:bg-[#F5F2EB]'
            }`}
          >
            All Events ({incidents.length})
          </button>
          <button
            onClick={() => setSelectedCategory('protest')}
            className={`rounded-lg px-3 py-1.5 transition cursor-pointer border ${
              selectedCategory === 'protest'
                ? 'bg-[#1A3D2F] border-[#1A3D2F] text-white shadow-2xs font-bold'
                : 'bg-[#FAF8F5] border-[#E5E0D8] text-[#181A19] hover:bg-[#F5F2EB]'
            }`}
          >
            Mass Protests
          </button>
          <button
            onClick={() => setSelectedCategory('violence')}
            className={`rounded-lg px-3 py-1.5 transition cursor-pointer border ${
              selectedCategory === 'violence'
                ? 'bg-[#1A3D2F] border-[#1A3D2F] text-white shadow-2xs font-bold'
                : 'bg-[#FAF8F5] border-[#E5E0D8] text-[#181A19] hover:bg-[#F5F2EB]'
            }`}
          >
            Violent Incidents
          </button>
          <button
            onClick={() => setSelectedCategory('crisis')}
            className={`rounded-lg px-3 py-1.5 transition cursor-pointer border ${
              selectedCategory === 'crisis'
                ? 'bg-[#1A3D2F] border-[#1A3D2F] text-white shadow-2xs font-bold'
                : 'bg-[#FAF8F5] border-[#E5E0D8] text-[#181A19] hover:bg-[#F5F2EB]'
            }`}
          >
            Governance Crises
          </button>
        </div>

        {/* Year Filter Chips */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium">
          <span className="text-[#717A74] text-[11px] font-bold uppercase mr-1">Year:</span>
          <button
            onClick={() => setSelectedYear('all')}
            className={`rounded-md px-2.5 py-1 transition cursor-pointer ${
              selectedYear === 'all'
                ? 'bg-[#1A3D2F] text-white font-bold'
                : 'bg-[#FAF8F5] text-[#5C6460] hover:bg-[#F5F2EB]'
            }`}
          >
            All
          </button>
          {years.map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(String(yr))}
              className={`rounded-md px-2 py-1 transition cursor-pointer ${
                selectedYear === String(yr)
                  ? 'bg-[#1A3D2F] text-white font-bold'
                  : 'bg-[#FAF8F5] text-[#5C6460] hover:bg-[#F5F2EB]'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline Track */}
      <div className="relative border-l-2 border-[#E5E0D8] pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-8 my-6">
        {timelineItems.map((item) => {
          const party = item.party_id ? partyMap[item.party_id] : null;
          const isExpanded = expandedId === item.id;
          const isExtreme = item.severity === 'extreme';

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node Bullet */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 border-white text-white shadow-2xs transition group-hover:scale-110 ${
                  isExtreme ? 'bg-[#991B1B]' : 'bg-[#1A3D2F]'
                }`}
              >
                {item.category === 'protest' ? (
                  <Megaphone size={12} strokeWidth={1.5} />
                ) : isExtreme ? (
                  <ShieldAlert size={12} strokeWidth={1.5} />
                ) : (
                  <AlertTriangle size={12} strokeWidth={1.5} />
                )}
              </div>

              {/* Event Card */}
              <div className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-2xs transition hover:border-[#C8C2B5] hover:shadow-xs">
                {/* Meta row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-[#1A3D2F] px-2.5 py-0.5 text-[11px] font-bold text-white">
                      <Calendar size={11} strokeWidth={1.5} /> {item.date_year ?? 'Undated'}
                    </span>

                    {item.location && (
                      <span className="flex items-center gap-1 text-xs text-[#5C6460] font-medium">
                        <MapPin size={12} strokeWidth={1.5} /> {item.location}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {party && (
                      <span className="inline-flex items-center rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2 py-0.5 text-[11px] font-medium text-[#181A19]">
                        {party.abbreviation} &bull; {party.name}
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isExtreme
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.severity} severity
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="mt-3 text-base sm:text-lg font-bold text-slate-900">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Expandable Forensic Breakdown */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs animate-in fade-in duration-150">
                    {item.demands && (
                      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5">
                        <strong className="text-blue-900 block font-bold mb-1">
                          Protesters' Core Demands:
                        </strong>
                        <p className="text-blue-800 leading-relaxed">{item.demands}</p>
                      </div>
                    )}

                    {item.state_response && (
                      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3.5">
                        <strong className="text-amber-900 block font-bold mb-1">
                          State & Law-Enforcement Response:
                        </strong>
                        <p className="text-amber-800 leading-relaxed">{item.state_response}</p>
                      </div>
                    )}

                    {item.citizen_impact && (
                      <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3.5">
                        <strong className="text-rose-900 block font-bold mb-1">
                          Direct Impact on Ordinary Citizens:
                        </strong>
                        <p className="text-rose-800 leading-relaxed">{item.citizen_impact}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <span>{isExpanded ? 'Hide full details' : 'View demands & state response'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {item.source_name && (
                    <div className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                      Source:{' '}
                      {item.source_url ? (
                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-600 hover:text-slate-900 underline inline-flex items-center gap-0.5"
                        >
                          <span className="truncate">{item.source_name}</span>
                          <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="text-slate-600">{item.source_name}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
