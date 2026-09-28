import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { StockQuote } from '../types/market';

interface USStocksSectionProps {
  stocks: StockQuote[];
  onSelectStock: (stock: StockQuote) => void;
  priceTickMap?: Record<string, 'up' | 'down'>;
}

export const USStocksSection: React.FC<USStocksSectionProps> = ({
  stocks,
  onSelectStock,
  priceTickMap = {}
}) => {
  const [activeTab, setActiveTab] = useState<'Most Active' | 'Top Gainers' | 'Large Cap'>('Most Active');

  const filteredStocks = stocks.filter((stock) => stock.category === activeTab);

  return (
    <section id="us-stocks" data-purpose="us-stocks-movers" className="scroll-mt-32">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => filteredStocks[0] && onSelectStock(filteredStocks[0])}
          className="inline-flex items-center gap-1.5 text-2xl font-bold text-[#131722] hover:text-[#2962FF] transition group cursor-pointer"
        >
          <span>US stocks</span>
          <ChevronRight className="w-6 h-6 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex gap-1 bg-[#F8F9FD] p-1 rounded-lg border border-[#E0E3EB]">
          {(['Most Active', 'Top Gainers', 'Large Cap'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded transition cursor-pointer ${
                  isActive
                    ? 'bg-white shadow-xs text-[#131722]'
                    : 'text-[#787B86] hover:text-[#131722]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {filteredStocks.map((stock) => {
          const isPositive = stock.changePercent >= 0;
          const tick = priceTickMap[stock.symbol];

          return (
            <div
              key={`${stock.category}-${stock.symbol}`}
              onClick={() => onSelectStock(stock)}
              className="p-4 rounded-xl bg-[#F8F9FD] border border-[#E0E3EB] hover:border-gray-300 hover:shadow-sm transition cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Flash tick highlight overlay */}
              {tick && (
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    tick === 'up' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                  }`}
                />
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-8 h-8 rounded-lg font-black text-xs flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: stock.badgeBg,
                      color: stock.badgeTextColor
                    }}
                  >
                    {stock.badge}
                  </span>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded tabular-nums ${
                      isPositive
                        ? 'text-[#089981] bg-[rgba(8,153,129,0.1)]'
                        : 'text-[#F23645] bg-[rgba(242,54,69,0.1)]'
                    }`}
                  >
                    {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                  </span>
                </div>

                <div className="font-bold text-base text-[#131722] group-hover:text-[#2962FF] transition-colors">
                  {stock.symbol}
                </div>
                <div className="text-xs text-[#787B86] truncate" title={stock.name}>
                  {stock.name}
                </div>
              </div>

              <div className="mt-3">
                <div className="font-extrabold text-lg text-[#131722] tabular-nums">
                  ${stock.price.toFixed(2)}
                </div>
                <div className="text-[11px] text-[#787B86]">Cap: {stock.marketCap}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
