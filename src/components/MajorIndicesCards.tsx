import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MajorIndex } from '../types/market';

interface MajorIndicesCardsProps {
  indices: MajorIndex[];
  onSelectIndex: (index: MajorIndex) => void;
  priceTickMap?: Record<string, 'up' | 'down'>;
}

export const MajorIndicesCards: React.FC<MajorIndicesCardsProps> = ({
  indices,
  onSelectIndex,
  priceTickMap = {}
}) => {
  return (
    <section id="indices-overview" data-purpose="indices-overview" className="scroll-mt-32">
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => onSelectIndex(indices[0])}
          className="inline-flex items-center gap-1.5 text-2xl font-bold text-[#131722] hover:text-[#2962FF] transition group cursor-pointer"
        >
          <span>Indices</span>
          <ChevronRight className="w-6 h-6 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#787B86] bg-[#F8F9FD] border border-[#E0E3EB] px-2.5 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#089981] animate-pulse" />
            Live US Session
          </span>
        </div>
      </div>

      {/* Quick Cards Grid for Major US Indices */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {indices.map((index) => {
          const isPositive = index.changePercent >= 0;
          const tick = priceTickMap[index.symbol];

          return (
            <article
              key={index.symbol}
              onClick={() => onSelectIndex(index)}
              className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E0E3EB] hover:border-gray-300 hover:shadow-sm transition cursor-pointer flex flex-col justify-between group select-none relative overflow-hidden"
            >
              {/* Flash tick highlight overlay */}
              {tick && (
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    tick === 'up' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                  }`}
                />
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0"
                    style={{ backgroundColor: index.badgeBg }}
                  >
                    {index.badge}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#131722] text-base group-hover:text-[#2962FF] transition-colors">
                      {index.name}
                    </h3>
                    <span className="text-xs text-[#787B86] font-medium">
                      {index.symbol} • {index.exchange}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                    isPositive
                      ? 'text-[#089981] bg-[rgba(8,153,129,0.1)]'
                      : 'text-[#F23645] bg-[rgba(242,54,69,0.1)]'
                  }`}
                >
                  {isPositive ? `+${index.changePercent.toFixed(2)}%` : `${index.changePercent.toFixed(2)}%`}
                </span>
              </div>

              {/* Mini Sparkline SVG */}
              <div className="h-14 my-3">
                <svg
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 35"
                >
                  <path
                    className={isPositive ? 'sparkline-green' : 'sparkline-red'}
                    d={index.fillPath}
                  />
                  <path
                    d={index.sparklinePath}
                    fill="none"
                    stroke={isPositive ? '#089981' : '#F23645'}
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="flex items-baseline justify-between pt-1 border-t border-[#E0E3EB]/50 text-sm">
                <span className="font-bold text-lg text-[#131722] tabular-nums">
                  {index.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
                <span className="text-xs text-[#787B86] tabular-nums font-mono">
                  H: {index.high.toLocaleString(undefined, { minimumFractionDigits: 1 })} • L:{' '}
                  {index.low.toLocaleString(undefined, { minimumFractionDigits: 1 })}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
