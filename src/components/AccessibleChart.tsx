import React, { useState } from 'react';
import {
  BarChart3,
  Table as TableIcon,
  Info,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export interface DataPoint {
  label: string;
  value: number | null; // null represents missing data (distinguished from zero)
  formattedValue?: string;
  secondaryValue?: number | null;
  secondaryLabel?: string;
  color?: string;
  note?: string;
}

export interface AccessibleChartProps {
  title: string;
  subtitle?: string;
  referencePeriod: string;
  unit: string;
  data: DataPoint[];
  type?: 'bar' | 'grouped-bar' | 'trend-line';
  takeaway: string;
  sourceName: string;
  sourceUrl?: string;
  limitations?: string;
  emptyStateText?: string;
}

export function AccessibleChart({
  title,
  subtitle,
  referencePeriod,
  unit,
  data,
  type = 'bar',
  takeaway,
  sourceName,
  sourceUrl,
  limitations,
  emptyStateText = 'Reliable data for this specific period or indicator is unavailable.',
}: AccessibleChartProps) {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // Filter valid data points
  const validData = data.filter((d) => d.value !== null && d.value !== undefined);
  const hasData = validData.length > 0;

  // Max value calculation for scaling
  const maxValue = hasData
    ? Math.max(
        ...data.map((d) => Math.max(d.value ?? 0, d.secondaryValue ?? 0)),
        1
      )
    : 1;

  return (
    <div className="rounded-xl border border-[#E5E0D8] bg-white p-5 sm:p-6 transition hover:border-[#D5CEBF]">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E5E0D8] pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-[#E5E0D8] bg-[#F5F2EB] px-2.5 py-0.5 text-[11px] font-semibold text-[#181A19] uppercase tracking-wider">
              {referencePeriod}
            </span>
            <span className="text-xs text-[#5C6460] font-medium">Unit: {unit}</span>
          </div>
          <h3 className="mt-1 font-serif text-lg font-bold text-[#181A19] sm:text-xl">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-[#5C6460]">{subtitle}</p>}
        </div>

        {/* View Toggle: Visual Chart vs Accessible Table */}
        <div className="inline-flex rounded-lg border border-[#E5E0D8] bg-[#F5F2EB] p-0.5 text-xs font-semibold shrink-0">
          <button
            onClick={() => setViewMode('chart')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer ${
              viewMode === 'chart'
                ? 'bg-white text-[#181A19] shadow-xs font-bold'
                : 'text-[#5C6460] hover:text-[#181A19]'
            }`}
          >
            <BarChart3 size={14} strokeWidth={1.5} />
            <span>Chart</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-[#181A19] shadow-xs font-bold'
                : 'text-[#5C6460] hover:text-[#181A19]'
            }`}
          >
            <TableIcon size={14} strokeWidth={1.5} />
            <span>Data Table</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-5">
        {!hasData ? (
          <div className="rounded-xl border border-dashed border-[#E5E0D8] bg-[#FAF8F5] p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-[#8C8275]" strokeWidth={1.5} />
            <p className="mt-2 text-sm font-semibold text-[#181A19]">No Verified Data Available</p>
            <p className="mt-1 text-xs text-[#5C6460] max-w-md mx-auto">{emptyStateText}</p>
          </div>
        ) : viewMode === 'chart' ? (
          /* SVG / CSS Bar Chart */
          <div className="space-y-3.5">
            {data.map((item, idx) => {
              const isMissing = item.value === null;
              const pct = isMissing ? 0 : Math.min(100, Math.round(((item.value ?? 0) / maxValue) * 100));
              const secondaryPct =
                item.secondaryValue !== null && item.secondaryValue !== undefined
                  ? Math.min(100, Math.round((item.secondaryValue / maxValue) * 100))
                  : null;

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#181A19]">{item.label}</span>
                    <div className="flex items-center gap-2">
                      {isMissing ? (
                        <span className="italic text-[#8C8275] text-[11px]">
                          Data gap / Not published
                        </span>
                      ) : (
                        <span className="font-bold text-[#181A19]">
                          {item.formattedValue ?? `${item.value?.toLocaleString('en-IN')} ${unit}`}
                        </span>
                      )}
                      {item.note && (
                        <span className="rounded-sm bg-[#F5F2EB] border border-[#E5E0D8] px-1.5 py-0.2 text-[10px] text-[#5C6460]">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Primary Bar: Forest Green by default */}
                  <div className="relative h-4 w-full rounded-full bg-[#F0ECE1] overflow-hidden">
                    {isMissing ? (
                      <div className="h-full w-full bg-[repeating-linear-gradient(45deg,#f5f2eb,#f5f2eb_10px,#e5e0d8_10px,#e5e0d8_20px)] opacity-50" />
                    ) : (
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: item.color ?? '#1A3D2F',
                        }}
                      />
                    )}
                  </div>

                  {/* Optional Secondary Bar for comparisons: Muted Saffron by default */}
                  {secondaryPct !== null && (
                    <div className="space-y-0.5 pt-0.5 pl-2">
                      <div className="flex items-center justify-between text-[11px] text-[#5C6460]">
                        <span>{item.secondaryLabel ?? 'Comparison'}:</span>
                        <span className="font-medium text-[#181A19]">
                          {item.secondaryValue?.toLocaleString('en-IN')} {unit}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#F0ECE1] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#B45309] transition-all duration-500 ease-out"
                          style={{ width: `${secondaryPct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Accessible HTML Table */
          <div className="overflow-x-auto rounded-xl border border-[#E5E0D8]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F2EB] text-[#181A19] uppercase tracking-wider font-semibold border-b border-[#E5E0D8]">
                <tr>
                  <th className="px-4 py-2.5">Category / Year</th>
                  <th className="px-4 py-2.5 text-right">Primary Value ({unit})</th>
                  {data.some((d) => d.secondaryValue !== undefined) && (
                    <th className="px-4 py-2.5 text-right">Secondary Comparison ({unit})</th>
                  )}
                  <th className="px-4 py-2.5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D8]">
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]">
                    <td className="px-4 py-2 font-medium text-[#181A19]">{item.label}</td>
                    <td className="px-4 py-2 text-right font-bold text-[#181A19]">
                      {item.value === null ? 'Missing / Not reported' : (item.formattedValue ?? item.value?.toLocaleString('en-IN'))}
                    </td>
                    {data.some((d) => d.secondaryValue !== undefined) && (
                      <td className="px-4 py-2 text-right text-[#5C6460]">
                        {item.secondaryValue !== undefined && item.secondaryValue !== null
                          ? item.secondaryValue.toLocaleString('en-IN')
                          : '—'}
                      </td>
                    )}
                    <td className="px-4 py-2 text-[#5C6460]">{item.note ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Citizen Key Takeaway Callout */}
      <div className="rounded-xl border border-[#E5E0D8] bg-[#FAF8F5] p-3.5 text-xs">
        <div className="flex items-start gap-2">
          <CheckCircle2 size={16} strokeWidth={1.5} className="mt-0.5 text-[#1A3D2F] shrink-0" />
          <div>
            <span className="font-bold text-[#181A19]">Key Takeaway for Citizens: </span>
            <span className="text-[#333835] leading-relaxed">{takeaway}</span>
          </div>
        </div>
      </div>

      {/* Metadata, Source & Limitations Footer */}
      <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex flex-col gap-1.5 text-[11px] text-[#5C6460]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1 truncate">
            <span className="font-semibold text-[#181A19]">Source:</span>
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#1A3D2F] font-medium hover:underline inline-flex items-center gap-0.5"
              >
                <span>{sourceName}</span>
                <ExternalLink size={10} strokeWidth={1.5} />
              </a>
            ) : (
              <span className="text-[#181A19]">{sourceName}</span>
            )}
          </div>
          <span className="text-[#8C8275]">Ref: {referencePeriod}</span>
        </div>

        {limitations && (
          <div className="flex items-start gap-1 text-[#8C8275] italic">
            <Info size={11} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            <span>Limitations: {limitations}</span>
          </div>
        )}
      </div>
    </div>
  );
}
