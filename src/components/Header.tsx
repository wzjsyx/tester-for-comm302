import React from 'react';
import { Search, Globe, User, Radio } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  isLiveSimulating: boolean;
  setIsLiveSimulating: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  activeNav,
  setActiveNav,
  isLiveSimulating,
  setIsLiveSimulating,
  onOpenGetStarted
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E0E3EB]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left side: TV Brand Icon + Search + Nav Items */}
        <div className="flex items-center gap-6">
          {/* Logo Mark */}
          <button 
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center text-[#131722] hover:opacity-80 transition cursor-pointer"
            aria-label="TradingView Home"
          >
            <svg className="w-9 h-7 fill-current" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm8-22h-6v28h6V0zm8 11h-6v17h6V11z" fill="currentColor"></path>
            </svg>
          </button>

          {/* Search Bar (pill shaped) */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-3 w-52 md:w-64 h-9 px-3 rounded-full bg-[#F0F3FA] hover:bg-[#E0E3EB] transition-colors text-sm text-[#787B86] cursor-pointer"
            data-purpose="search-trigger"
            type="button"
            title="Search symbols, markets, and news"
          >
            <Search className="w-4 h-4 text-[#787B86]" />
            <span className="flex-1 text-left font-normal text-xs md:text-sm">Search (Ctrl+K)</span>
          </button>

          {/* Main Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7 text-[15px] font-medium text-[#131722]">
            {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveNav(item)}
                  className={`cursor-pointer transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#2962FF] font-semibold after:content-[""] after:absolute after:bottom-[-19px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2962FF]'
                      : 'hover:text-[#2962FF]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right side: Live Ticker Toggle, Locale, User & CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Live Data Simulation Toggle */}
          <button
            type="button"
            onClick={() => setIsLiveSimulating((prev) => !prev)}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition cursor-pointer ${
              isLiveSimulating
                ? 'bg-emerald-50 border-emerald-200 text-[#089981]'
                : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}
            title="Toggle live price simulation ticks"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveSimulating ? 'bg-[#089981] animate-pulse' : 'bg-gray-400'
              }`}
            />
            <span className="hidden md:inline">{isLiveSimulating ? 'Live Market' : 'Paused'}</span>
          </button>

          {/* Search icon for mobile */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-full hover:bg-[#F8F9FD] text-[#131722] cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Selector */}
          <button
            type="button"
            className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F8F9FD] text-sm font-medium text-[#131722] transition cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#787B86]" />
            <span>EN</span>
          </button>

          {/* User Profile Avatar/Icon */}
          <button
            type="button"
            onClick={onOpenGetStarted}
            aria-label="Sign in"
            className="p-2 rounded-full hover:bg-[#F8F9FD] text-[#131722] transition cursor-pointer"
          >
            <User className="w-5 h-5 text-[#131722]" />
          </button>

          {/* CTA Button */}
          <button
            type="button"
            onClick={onOpenGetStarted}
            className="gradient-cta text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
