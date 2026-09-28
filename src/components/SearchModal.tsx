import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { StockQuote, MajorIndex, GlobalBenchmark, AssetClassItem } from '../types/market';

interface SearchItem {
  symbol: string;
  name: string;
  type: 'Index' | 'Stock' | 'Crypto' | 'Futures' | 'Forex' | 'Benchmark';
  price: string;
  changePercent: number;
  badge?: string;
  sourceItem: StockQuote | MajorIndex | GlobalBenchmark | AssetClassItem;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: any, type: string) => void;
  allIndices: MajorIndex[];
  allBenchmarks: GlobalBenchmark[];
  allStocks: StockQuote[];
  cryptoItems: AssetClassItem[];
  futuresItems: AssetClassItem[];
  forexItems: AssetClassItem[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  allIndices,
  allBenchmarks,
  allStocks,
  cryptoItems,
  futuresItems,
  forexItems
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Stocks' | 'Indices' | 'Crypto' | 'Forex' | 'Futures'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine items for unified search
  const searchableItems: SearchItem[] = [
    ...allIndices.map((i) => ({
      symbol: i.symbol,
      name: i.name,
      type: 'Index' as const,
      price: i.price.toFixed(2),
      changePercent: i.changePercent,
      badge: i.badge,
      sourceItem: i
    })),
    ...allBenchmarks.map((b) => ({
      symbol: b.symbol,
      name: b.name,
      type: 'Benchmark' as const,
      price: b.last.toFixed(2),
      changePercent: b.chgPercent,
      sourceItem: b
    })),
    ...allStocks.map((s) => ({
      symbol: s.symbol,
      name: s.name,
      type: 'Stock' as const,
      price: `$${s.price.toFixed(2)}`,
      changePercent: s.changePercent,
      badge: s.badge,
      sourceItem: s
    })),
    ...cryptoItems.map((c) => ({
      symbol: c.symbol,
      name: c.name,
      type: 'Crypto' as const,
      price: String(c.price),
      changePercent: c.changePercent,
      sourceItem: c
    })),
    ...futuresItems.map((f) => ({
      symbol: f.symbol,
      name: f.name,
      type: 'Futures' as const,
      price: String(f.price),
      changePercent: f.changePercent,
      sourceItem: f
    })),
    ...forexItems.map((fx) => ({
      symbol: fx.symbol,
      name: fx.name,
      type: 'Forex' as const,
      price: String(fx.price),
      changePercent: fx.changePercent,
      sourceItem: fx
    }))
  ];

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = searchableItems.filter((item) => {
    // Type filter
    if (activeTab === 'Stocks' && item.type !== 'Stock') return false;
    if (activeTab === 'Indices' && item.type !== 'Index' && item.type !== 'Benchmark') return false;
    if (activeTab === 'Crypto' && item.type !== 'Crypto') return false;
    if (activeTab === 'Forex' && item.type !== 'Forex') return false;
    if (activeTab === 'Futures' && item.type !== 'Futures') return false;

    // Query filter
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.symbol.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E0E3EB] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787B86] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, or market (e.g., NVDA, SPX, BTC)..."
            className="flex-1 text-base outline-none placeholder:text-[#787B86] text-[#131722]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-[#787B86] bg-gray-100 border border-gray-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-[#F8F9FD] border-b border-[#E0E3EB] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-medium">
          {(['All', 'Stocks', 'Indices', 'Crypto', 'Forex', 'Futures'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] text-white font-semibold'
                    : 'text-[#787B86] hover:bg-gray-200 hover:text-[#131722]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-gray-100 max-h-[460px]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#787B86]">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-1">Try searching by ticker (e.g. AAPL, SPX, GOLD, ETH)</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isPositive = item.changePercent >= 0;
              return (
                <div
                  key={`${item.type}-${item.symbol}`}
                  onClick={() => {
                    onSelectItem(item.sourceItem, item.type);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8F9FD] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 text-[#131722] font-bold text-xs flex items-center justify-center shrink-0 border border-gray-200">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#131722] group-hover:text-[#2962FF] transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-gray-100 text-[#787B86]">
                          {item.type}
                        </span>
                      </div>
                      <div className="text-xs text-[#787B86]">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-sm text-[#131722] tabular-nums">
                      {item.price}
                    </div>
                    <div
                      className={`text-xs font-semibold tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F8F9FD] border-t border-[#E0E3EB] flex items-center justify-between text-xs text-[#787B86]">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#089981]" />
            Real-time market search powered by TradingView
          </span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-[#131722] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
