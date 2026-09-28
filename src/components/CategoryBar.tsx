import React from 'react';
import { MarketCategory } from '../types/market';

interface CategoryBarProps {
  categories: MarketCategory[];
  activeCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E3EB]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div
          className="flex items-center space-x-2 py-3 overflow-x-auto no-scrollbar"
          role="tablist"
          aria-label="Market Categories"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#131722] text-white font-semibold shadow-sm'
                    : 'text-[#131722] hover:bg-[#F8F9FD]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
