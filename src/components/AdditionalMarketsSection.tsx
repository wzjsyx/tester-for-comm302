import React from 'react';
import { AssetClassItem } from '../types/market';

interface AdditionalMarketsSectionProps {
  title: string;
  subtitle: string;
  items: AssetClassItem[];
  onSelectItem: (item: AssetClassItem, category: string) => void;
  priceTickMap?: Record<string, 'up' | 'down'>;
}

export const AdditionalMarketsSection: React.FC<AdditionalMarketsSectionProps> = ({
  title,
  subtitle,
  items,
  onSelectItem,
  priceTickMap = {}
}) => {
  return (
    <section className="border border-[#E0E3EB] rounded-2xl overflow-hidden bg-white shadow-xs">
      <div className="px-6 py-4 bg-[#F8F9FD] border-b border-[#E0E3EB] flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#131722]">{title}</h2>
          <p className="text-xs text-[#787B86]">{subtitle}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-[#787B86] bg-[#FAFBFD] border-b border-[#E0E3EB]">
            <tr>
              <th className="py-3 px-6 font-semibold" scope="col">Symbol & Name</th>
              <th className="py-3 px-4 font-semibold text-right" scope="col">Price / Yield</th>
              <th className="py-3 px-4 font-semibold text-right" scope="col">Chg %</th>
              <th className="py-3 px-6 font-semibold text-right hidden sm:table-cell" scope="col">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E3EB]">
            {items.map((item) => {
              const tick = priceTickMap[item.symbol];
              const isPositive = item.changePercent >= 0;

              return (
                <tr
                  key={item.symbol}
                  onClick={() => onSelectItem(item, title)}
                  className="hover:bg-[#F8F9FD]/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-6 font-medium text-[#131722]">
                    <span className="font-bold group-hover:text-[#2962FF] transition-colors">
                      {item.symbol}
                    </span>
                    <span className="block text-xs text-[#787B86]">{item.name}</span>
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
                      {item.price}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-bold tabular-nums ${
                        isPositive
                          ? 'text-[#089981] bg-[rgba(8,153,129,0.1)]'
                          : 'text-[#F23645] bg-[rgba(242,54,69,0.1)]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </span>
                  </td>

                  <td className="py-3.5 px-6 text-right text-xs text-[#787B86] hidden sm:table-cell">
                    {item.details || '—'}
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
