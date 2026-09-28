/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { MajorIndicesCards } from './components/MajorIndicesCards';
import { GlobalBenchmarksTable } from './components/GlobalBenchmarksTable';
import { USStocksSection } from './components/USStocksSection';
import { AssetClassesDashboard } from './components/AssetClassesDashboard';
import { AdditionalMarketsSection } from './components/AdditionalMarketsSection';
import { SearchModal } from './components/SearchModal';
import { SymbolDetailModal } from './components/SymbolDetailModal';
import { GetStartedModal } from './components/GetStartedModal';
import { Footer } from './components/Footer';

import {
  MAJOR_INDICES,
  GLOBAL_BENCHMARKS,
  US_STOCKS,
  CRYPTO_ITEMS,
  FUTURES_ITEMS,
  FOREX_ITEMS,
  BONDS_ITEMS,
  ETFS_ITEMS,
  ECONOMY_ITEMS
} from './data/marketData';

import { MarketCategory, MajorIndex, GlobalBenchmark, StockQuote, AssetClassItem } from './types/market';

const CATEGORIES: MarketCategory[] = [
  'Indices',
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Bonds',
  'ETFs',
  'Economy'
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('Indices');
  const [activeNav, setActiveNav] = useState('Markets');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isHeadlineMenuOpen, setIsHeadlineMenuOpen] = useState(false);
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);

  // Dynamic live prices state
  const [indices, setIndices] = useState<MajorIndex[]>(MAJOR_INDICES);
  const [benchmarks, setBenchmarks] = useState<GlobalBenchmark[]>(GLOBAL_BENCHMARKS);
  const [stocks, setStocks] = useState<StockQuote[]>(US_STOCKS);
  const [crypto, setCrypto] = useState<AssetClassItem[]>(CRYPTO_ITEMS);
  const [futures, setFutures] = useState<AssetClassItem[]>(FUTURES_ITEMS);
  const [forex, setForex] = useState<AssetClassItem[]>(FOREX_ITEMS);
  const [bonds, setBonds] = useState<AssetClassItem[]>(BONDS_ITEMS);
  const [etfs, setEtfs] = useState<AssetClassItem[]>(ETFS_ITEMS);
  const [economy, setEconomy] = useState<AssetClassItem[]>(ECONOMY_ITEMS);

  // Map of symbol -> 'up' | 'down' for subtle real-time tick flashes
  const [priceTickMap, setPriceTickMap] = useState<Record<string, 'up' | 'down'>>({});

  // Selected item for interactive detail chart modal
  const [selectedDetail, setSelectedDetail] = useState<{ item: any; type: string } | null>(null);

  // Keyboard shortcut for Search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time tick simulation to simulate live TradingView websocket feeds
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      // Pick randomly what category to tick
      const randomCategory = Math.random();

      if (randomCategory < 0.3) {
        // Tick an Index
        const indexIdx = Math.floor(Math.random() * indices.length);
        const target = indices[indexIdx];
        const isUp = Math.random() > 0.45;
        const tickDelta = (isUp ? 1 : -1) * (target.price * 0.0004);
        const newPrice = Math.round((target.price + tickDelta) * 100) / 100;
        const newChange = Math.round((target.change + tickDelta) * 100) / 100;
        const newPct = Math.round((target.changePercent + (tickDelta / target.price) * 100) * 100) / 100;

        setIndices((prev) =>
          prev.map((item, idx) =>
            idx === indexIdx
              ? {
                  ...item,
                  price: newPrice,
                  change: newChange,
                  changePercent: newPct,
                  high: Math.max(item.high, newPrice),
                  low: Math.min(item.low, newPrice)
                }
              : item
          )
        );

        setPriceTickMap((prev) => ({ ...prev, [target.symbol]: isUp ? 'up' : 'down' }));
        setTimeout(() => {
          setPriceTickMap((prev) => {
            const next = { ...prev };
            delete next[target.symbol];
            return next;
          });
        }, 750);
      } else if (randomCategory < 0.65) {
        // Tick a US Stock
        const stockIdx = Math.floor(Math.random() * stocks.length);
        const target = stocks[stockIdx];
        const isUp = Math.random() > 0.46;
        const tickDelta = (isUp ? 1 : -1) * (target.price * 0.0006);
        const newPrice = Math.round((target.price + tickDelta) * 100) / 100;
        const newPct = Math.round((target.changePercent + (tickDelta / target.price) * 100) * 100) / 100;

        setStocks((prev) =>
          prev.map((item, idx) =>
            idx === stockIdx
              ? {
                  ...item,
                  price: newPrice,
                  changePercent: newPct,
                  high: Math.max(item.high, newPrice),
                  low: Math.min(item.low, newPrice)
                }
              : item
          )
        );

        setPriceTickMap((prev) => ({ ...prev, [target.symbol]: isUp ? 'up' : 'down' }));
        setTimeout(() => {
          setPriceTickMap((prev) => {
            const next = { ...prev };
            delete next[target.symbol];
            return next;
          });
        }, 750);
      } else {
        // Tick a Crypto or Forex
        const cryptoIdx = Math.floor(Math.random() * crypto.length);
        const target = crypto[cryptoIdx];
        const isUp = Math.random() > 0.48;
        const numVal = parseFloat(String(target.price).replace(/[$,]/g, ''));
        if (!isNaN(numVal)) {
          const tickDelta = (isUp ? 1 : -1) * (numVal * 0.0005);
          const newPrice = Math.round((numVal + tickDelta) * 100) / 100;
          const formatted = `$${newPrice.toLocaleString(undefined, {
            minimumFractionDigits: newPrice < 10 ? 2 : 2
          })}`;

          setCrypto((prev) =>
            prev.map((item, idx) =>
              idx === cryptoIdx
                ? {
                    ...item,
                    price: formatted,
                    changePercent: Math.round((item.changePercent + (tickDelta / numVal) * 100) * 100) / 100
                  }
                : item
            )
          );

          setPriceTickMap((prev) => ({ ...prev, [target.symbol]: isUp ? 'up' : 'down' }));
          setTimeout(() => {
            setPriceTickMap((prev) => {
              const next = { ...prev };
              delete next[target.symbol];
              return next;
            });
          }, 750);
        }
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isLiveSimulating, indices, stocks, crypto]);

  // Handle Category Click
  const handleCategorySelect = (category: MarketCategory) => {
    setActiveCategory(category);
    // Smooth scroll to corresponding section if available
    const sectionMap: Record<MarketCategory, string> = {
      Indices: 'indices-overview',
      'US stocks': 'us-stocks',
      'World stocks': 'world-stocks',
      Crypto: 'crypto-panel',
      Futures: 'futures-panel',
      Forex: 'forex-panel',
      Bonds: 'additional-markets',
      ETFs: 'additional-markets',
      Economy: 'additional-markets'
    };

    const targetId = sectionMap[category];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleOpenDetail = useCallback((item: any, type: string) => {
    setSelectedDetail({ item, type });
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-blue-100 bg-white">
      {/* Global SVG Gradients for Charts */}
      <svg aria-hidden="true" className="absolute block" height="0" width="0">
        <defs>
          <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#089981" stopOpacity="0.25"></stop>
            <stop offset="100%" stopColor="#089981" stopOpacity="0.0"></stop>
          </linearGradient>
          <linearGradient id="redGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F23645" stopOpacity="0.25"></stop>
            <stop offset="100%" stopColor="#F23645" stopOpacity="0.0"></stop>
          </linearGradient>
        </defs>
      </svg>

      {/* Main Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isLiveSimulating={isLiveSimulating}
        setIsLiveSimulating={setIsLiveSimulating}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* Hero Headline */}
      <section className="pt-10 pb-6 text-center" data-purpose="hero-title">
        <div className="max-w-[1440px] mx-auto px-4 relative">
          <div
            onClick={() => setIsHeadlineMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center gap-3 cursor-pointer group select-none"
            role="button"
            aria-expanded={isHeadlineMenuOpen}
            tabIndex={0}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#131722]">
              Markets, everywhere
            </h1>
            <ChevronDown className="w-8 h-8 md:w-9 md:h-9 text-[#131722] group-hover:translate-y-0.5 transition-transform" />
          </div>

          {/* Dropdown Menu for headline */}
          {isHeadlineMenuOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-[#E0E3EB] py-2 z-30 text-left animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#787B86] border-b border-gray-100">
                Jump to Market
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    handleCategorySelect(cat);
                    setIsHeadlineMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-[#131722] hover:bg-[#F8F9FD] flex items-center justify-between transition cursor-pointer"
                >
                  <span>{cat}</span>
                  {activeCategory === cat && <Check className="w-4 h-4 text-[#2962FF]" />}
                </button>
              ))}
            </div>
          )}

          <p className="mt-3 text-[#787B86] text-base md:text-lg max-w-2xl mx-auto font-normal">
            Track global stocks, currencies, indices, futures, and crypto with real-time financial tools.
          </p>
        </div>
      </section>

      {/* Market Category Pill Bar */}
      <CategoryBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8 space-y-12 flex-1 w-full">
        {/* Major Indices Cards */}
        <MajorIndicesCards
          indices={indices}
          onSelectIndex={(index) => handleOpenDetail(index, 'Index')}
          priceTickMap={priceTickMap}
        />

        {/* Global Benchmarks Table */}
        <GlobalBenchmarksTable
          benchmarks={benchmarks}
          onSelectBenchmark={(bench) => handleOpenDetail(bench, 'Benchmark')}
          priceTickMap={priceTickMap}
        />

        {/* US Stocks Market Movers */}
        <USStocksSection
          stocks={stocks}
          onSelectStock={(stock) => handleOpenDetail(stock, 'Stock')}
          priceTickMap={priceTickMap}
        />

        {/* Asset Classes Dashboard (Crypto, Futures, Forex) */}
        <AssetClassesDashboard
          cryptoItems={crypto}
          futuresItems={futures}
          forexItems={forex}
          onSelectItem={(item, cat) => handleOpenDetail(item, cat)}
          priceTickMap={priceTickMap}
        />

        {/* Specialized Market View when selecting Bonds, ETFs, or Economy */}
        <div id="additional-markets" className="scroll-mt-32">
          {activeCategory === 'Bonds' && (
            <AdditionalMarketsSection
              title="Government & Benchmark Bonds"
              subtitle="Yield curves, sovereign treasuries & fixed income instruments"
              items={bonds}
              onSelectItem={(item, cat) => handleOpenDetail(item, cat)}
              priceTickMap={priceTickMap}
            />
          )}

          {activeCategory === 'ETFs' && (
            <AdditionalMarketsSection
              title="Exchange-Traded Funds (ETFs)"
              subtitle="Major index trackers, sector funds, and fixed-income ETFs"
              items={etfs}
              onSelectItem={(item, cat) => handleOpenDetail(item, cat)}
              priceTickMap={priceTickMap}
            />
          )}

          {activeCategory === 'Economy' && (
            <AdditionalMarketsSection
              title="Global Economic Indicators"
              subtitle="Central bank rates, inflation, labor statistics & GDP metrics"
              items={economy}
              onSelectItem={(item, cat) => handleOpenDetail(item, cat)}
              priceTickMap={priceTickMap}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleCategorySelect} />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={handleOpenDetail}
        allIndices={indices}
        allBenchmarks={benchmarks}
        allStocks={stocks}
        cryptoItems={crypto}
        futuresItems={futures}
        forexItems={forex}
      />

      <SymbolDetailModal
        item={selectedDetail?.item}
        type={selectedDetail?.type || 'Stock'}
        isOpen={!!selectedDetail}
        onClose={() => setSelectedDetail(null)}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
