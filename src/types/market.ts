export type MarketCategory =
  | 'Indices'
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Bonds'
  | 'ETFs'
  | 'Economy';

export type TechnicalRating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export interface MajorIndex {
  symbol: string;
  name: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  badge: string;
  badgeBg: string;
  sparklinePath: string;
  fillPath: string;
  trend: 'up' | 'down';
  description?: string;
  history?: { time: string; price: number; high: number; low: number; open: number; close: number }[];
}

export interface GlobalBenchmark {
  symbol: string;
  name: string;
  region: 'Americas' | 'Europe' | 'Asia';
  countryCode: string;
  flagBg: string;
  flagTextColor: string;
  last: number;
  chg: number;
  chgPercent: number;
  trendPath: string;
  trend: 'up' | 'down';
  technicalRating: TechnicalRating;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  change: number;
  marketCap: string;
  category: 'Most Active' | 'Top Gainers' | 'Large Cap';
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  open: number;
  high: number;
  low: number;
  volume: string;
  peRatio?: number;
  week52High: number;
  week52Low: number;
  history?: { time: string; price: number }[];
}

export interface AssetClassItem {
  symbol: string;
  name: string;
  price: number | string;
  changePercent: number;
  isPositive: boolean;
  icon?: string;
  iconBg?: string;
  iconColor?: string;
  details?: string;
}

export interface AssetCategory {
  id: string;
  title: string;
  subtitle: string;
  items: AssetClassItem[];
}
