import React, { useState } from 'react';
import { GlobalBenchmark, TechnicalRating } from '../types/market';

interface GlobalBenchmarksTableProps {
  benchmarks: GlobalBenchmark[];
  onSelectBenchmark: (benchmark: GlobalBenchmark) => void;
  priceTickMap?: Record<string, 'up' | 'down'>;
}

export const GlobalBenchmarksTable: React.FC<GlobalBenchmarksTableProps> = ({
  benchmarks,
  onSelectBenchmark,
  priceTickMap = {}
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Americas' | 'Europe' | 'Asia'>('All');

  const filteredBenchmarks = selectedRegion === 'All'
    ? benchmarks
    : benchmarks.filter((b) => b.region === selectedRegion);

  const getRatingBadge = (rating: TechnicalRating) => {
    switch (rating) {
      case 'Strong Buy':
        return <span className="text-xs font-bold text-[#089981]">Strong Buy</span>;
      case 'Buy':
        return <span className="text-xs font-bold text-[#2962FF]">Buy</span>;
      case 'Neutral':
        return <span className="text-xs font-bold text-[#787B86]">Neutral</span>;
      case 'Sell':
        return <span className="text-xs font-bold text-[#F23645]">Sell</span>;
      case 'Strong Sell':
        return <span className="text-xs font-bold text-[#D32F2F]">Strong Sell</span>;
      default:
        return <span className="text-xs font-bold text-[#787B86]">Neutral</span>;
    }
  };

  return (
    <section
      id="world-stocks"
      data-purpose="world-indices-table"
      className="border border-[#E0E3EB] rounded-2xl overflow-hidden bg-white shadow-xs scroll-mt-32"
    >
      <div className="px-6 py-4 bg-[#F8F9FD] border-b border-[#E0E3EB] flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#131722]">Global Benchmarks</h2>
          <p className="text-xs text-[#787B86]">
            Major worldwide stock performance across Europe, Asia-Pacific &amp; Americas
          </p>
        </div>

        <div className="flex gap-2">
          {(['All', 'Americas', 'Europe', 'Asia'] as const).map((region) => {
            const isSelected = selectedRegion === region;
            const label = region === 'All' ? 'All Continents' : region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? 'bg-white border border-[#E0E3EB] text-[#131722] shadow-xs'
                    : 'text-[#787B86] hover:text-[#131722] hover:bg-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-[#787B86] bg-[#FAFBFD] border-b border-[#E0E3EB]">
            <tr>
              <th className="py-3 px-6 font-semibold" scope="col">
                Index
              </th>
              <th className="py-3 px-4 font-semibold text-right" scope="col">
                Last
              </th>
              <th className="py-3 px-4 font-semibold text-right" scope="col">
                Chg
              </th>
              <th className="py-3 px-4 font-semibold text-right" scope="col">
                Chg %
              </th>
              <th className="py-3 px-4 font-semibold text-center hidden md:table-cell" scope="col">
                Trend (1D)
              </th>
              <th className="py-3 px-6 font-semibold text-right hidden sm:table-cell" scope="col">
                Technical Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E3EB]">
            {filteredBenchmarks.map((item) => {
              const isPositive = item.chgPercent >= 0;
              const tick = priceTickMap[item.symbol];

              return (
                <tr
                  key={item.symbol}
                  onClick={() => onSelectBenchmark(item)}
                  className="hover:bg-[#F8F9FD]/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-6 font-medium text-[#131722] flex items-center gap-3">
                    <span
                      className="w-6 h-4 rounded-xs shadow-xs border border-gray-200 flex items-center justify-center font-bold text-[9px] shrink-0"
                      style={{ backgroundColor: item.flagBg, color: item.flagTextColor }}
                    >
                      {item.countryCode}
                    </span>
                    <div>
                      <span className="font-bold group-hover:text-[#2962FF] transition-colors">
                        {item.symbol}
                      </span>
                      <span className="block text-xs text-[#787B86]">{item.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right font-semibold tabular-nums">
                    <span
                      className={`transition-colors ${
                        tick === 'up'
                          ? 'text-[#089981]'
                          : tick === 'down'
                          ? 'text-[#F23645]'
                          : 'text-[#131722]'
                      }`}
                    >
                      {item.last.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </td>

                  <td
                    className={`py-3.5 px-4 text-right font-medium tabular-nums ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? `+${item.chg.toFixed(2)}` : item.chg.toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-bold tabular-nums ${
                        isPositive
                          ? 'text-[#089981] bg-[rgba(8,153,129,0.1)]'
                          : 'text-[#F23645] bg-[rgba(242,54,69,0.1)]'
                      }`}
                    >
                      {isPositive ? `+${item.chgPercent.toFixed(2)}%` : `${item.chgPercent.toFixed(2)}%`}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center hidden md:table-cell">
                    <svg className="w-24 h-6 inline-block" viewBox="0 0 100 24">
                      <path
                        d={item.trendPath}
                        fill="none"
                        stroke={isPositive ? '#089981' : '#F23645'}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </td>

                  <td className="py-3.5 px-6 text-right hidden sm:table-cell">
                    {getRatingBadge(item.technicalRating)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
