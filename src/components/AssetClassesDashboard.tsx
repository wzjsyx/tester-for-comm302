import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AssetClassItem } from '../types/market';

interface AssetClassesDashboardProps {
  cryptoItems: AssetClassItem[];
  futuresItems: AssetClassItem[];
  forexItems: AssetClassItem[];
  onSelectItem: (item: AssetClassItem, category: string) => void;
  priceTickMap?: Record<string, 'up' | 'down'>;
}

export const AssetClassesDashboard: React.FC<AssetClassesDashboardProps> = ({
  cryptoItems,
  futuresItems,
  forexItems,
  onSelectItem,
  priceTickMap = {}
}) => {
  return (
    <section
      id="asset-classes"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-32"
      data-purpose="asset-classes-matrix"
    >
      {/* Crypto Panel */}
      <div id="crypto-panel" className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => cryptoItems[0] && onSelectItem(cryptoItems[0], 'Crypto')}
              className="font-bold text-lg text-[#131722] hover:text-[#2962FF] flex items-center gap-1 group cursor-pointer"
            >
              <span>Crypto</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs font-medium text-[#787B86]">Market Cap: $3.4T</span>
          </div>

          <ul className="space-y-3.5">
            {cryptoItems.map((item) => {
              const tick = priceTickMap[item.symbol];
              return (
                <li
                  key={item.symbol}
                  onClick={() => onSelectItem(item, 'Crypto')}
                  className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-[#F8F9FD] cursor-pointer transition-colors group relative"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon ? (
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0"
                        style={{
                          backgroundColor: item.iconBg || '#23292F',
                          color: item.iconColor || '#FFFFFF'
                        }}
                      >
                        {item.icon}
                      </span>
                    ) : (
                      <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-700">
                        {item.symbol.slice(0, 2)}
                      </span>
                    )}
                    <div>
                      <span className="font-bold text-sm block group-hover:text-[#2962FF] transition-colors">
                        {item.symbol}
                      </span>
                      <span className="text-[11px] text-[#787B86]">{item.name}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-bold text-sm tabular-nums transition-colors ${
                        tick === 'up'
                          ? 'text-[#089981]'
                          : tick === 'down'
                          ? 'text-[#F23645]'
                          : 'text-[#131722]'
                      }`}
                    >
                      {item.price}
                    </div>
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        item.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {item.changePercent >= 0
                        ? `+${item.changePercent.toFixed(2)}%`
                        : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Futures & Commodities Panel */}
      <div id="futures-panel" className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => futuresItems[0] && onSelectItem(futuresItems[0], 'Futures')}
              className="font-bold text-lg text-[#131722] hover:text-[#2962FF] flex items-center gap-1 group cursor-pointer"
            >
              <span>Futures</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs font-medium text-[#787B86]">Commodities</span>
          </div>

          <ul className="space-y-3.5">
            {futuresItems.map((item) => {
              const tick = priceTickMap[item.symbol];
              return (
                <li
                  key={item.symbol}
                  onClick={() => onSelectItem(item, 'Futures')}
                  className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-[#F8F9FD] cursor-pointer transition-colors group"
                >
                  <div>
                    <span className="font-bold text-sm block group-hover:text-[#2962FF] transition-colors">
                      {item.symbol}
                    </span>
                    <span className="text-[11px] text-[#787B86]">{item.name}</span>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-bold text-sm tabular-nums transition-colors ${
                        tick === 'up'
                          ? 'text-[#089981]'
                          : tick === 'down'
                          ? 'text-[#F23645]'
                          : 'text-[#131722]'
                      }`}
                    >
                      {item.price}
                    </div>
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        item.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {item.changePercent >= 0
                        ? `+${item.changePercent.toFixed(2)}%`
                        : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Forex / Currencies Panel */}
      <div id="forex-panel" className="border border-[#E0E3EB] rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => forexItems[0] && onSelectItem(forexItems[0], 'Forex')}
              className="font-bold text-lg text-[#131722] hover:text-[#2962FF] flex items-center gap-1 group cursor-pointer"
            >
              <span>Forex</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs font-medium text-[#787B86]">FX Spot Rates</span>
          </div>

          <ul className="space-y-3.5">
            {forexItems.map((item) => {
              const tick = priceTickMap[item.symbol];
              return (
                <li
                  key={item.symbol}
                  onClick={() => onSelectItem(item, 'Forex')}
                  className="flex items-center justify-between p-1.5 -mx-1.5 rounded-lg hover:bg-[#F8F9FD] cursor-pointer transition-colors group"
                >
                  <div>
                    <span className="font-bold text-sm block group-hover:text-[#2962FF] transition-colors">
                      {item.symbol}
                    </span>
                    <span className="text-[11px] text-[#787B86]">{item.name}</span>
                  </div>

                  <div className="text-right">
                    <div
                      className={`font-bold text-sm tabular-nums transition-colors ${
                        tick === 'up'
                          ? 'text-[#089981]'
                          : tick === 'down'
                          ? 'text-[#F23645]'
                          : 'text-[#131722]'
                      }`}
                    >
                      {item.price}
                    </div>
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        item.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {item.changePercent >= 0
                        ? `+${item.changePercent.toFixed(2)}%`
                        : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
