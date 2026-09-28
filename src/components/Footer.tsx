import React from 'react';
import { MarketCategory } from '../types/market';

interface FooterProps {
  onSelectCategory: (category: MarketCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer
      className="mt-16 bg-[#FAFAFC] border-t border-[#E0E3EB] pt-12 pb-8 text-sm text-[#787B86]"
      data-purpose="tradingview-footer"
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        {/* Top Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10 border-b border-[#E0E3EB]">
          {/* Products */}
          <div>
            <h4 className="font-bold text-[#131722] mb-3">Products</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#supercharts">
                  Supercharts
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#pine-script">
                  Pine Script™
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#stock-screener">
                  Stock Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#etf-screener">
                  ETF Screener
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#crypto-screener">
                  Crypto Coins Screener
                </a>
              </li>
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h4 className="font-bold text-[#131722] mb-3">Markets</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Indices')}
                  className="hover:text-[#2962FF] transition cursor-pointer text-left"
                >
                  Indices
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('US stocks')}
                  className="hover:text-[#2962FF] transition cursor-pointer text-left"
                >
                  US Stocks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Crypto')}
                  className="hover:text-[#2962FF] transition cursor-pointer text-left"
                >
                  Crypto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Forex')}
                  className="hover:text-[#2962FF] transition cursor-pointer text-left"
                >
                  Forex
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectCategory('Futures')}
                  className="hover:text-[#2962FF] transition cursor-pointer text-left"
                >
                  Commodities
                </button>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold text-[#131722] mb-3">Community</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#ideas">
                  Ideas
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#scripts">
                  Scripts
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#streams">
                  Streams
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#house-rules">
                  House Rules
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#moderators">
                  Moderators
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-[#131722] mb-3">Company</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#about">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#pricing">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#careers">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-[#2962FF] transition cursor-pointer" href="#blog">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile & Apps */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="font-bold text-[#131722] mb-3">Trading Everywhere</h4>
            <p className="text-xs text-[#787B86] mb-3">
              Experience high-speed financial analysis across all devices.
            </p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#131722] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
              >
                <span>App Store</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#131722] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
              >
                <span>Google Play</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#787B86] gap-4">
          <div className="flex items-center gap-2">
            {/* Small Brand Mark */}
            <svg className="w-5 h-4 fill-[#131722]" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 11h-6v17h6V11z"></path>
            </svg>
            <span>© 2024 TradingView, Inc. All rights reserved.</span>
          </div>
          <p className="max-w-xl text-center md:text-right">
            Quotes and market data are provided for informational purposes only. Trading involves
            significant risk of loss.
          </p>
        </div>
      </div>
    </footer>
  );
};
