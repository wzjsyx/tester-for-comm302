import { MajorIndex, GlobalBenchmark, StockQuote, AssetCategory } from '../types/market';

export const MAJOR_INDICES: MajorIndex[] = [
  {
    symbol: 'SPX',
    name: 'S&P 500',
    exchange: 'INDEX',
    price: 5983.25,
    change: 25.10,
    changePercent: 0.42,
    high: 5992.10,
    low: 5960.30,
    badge: '500',
    badgeBg: '#E53935',
    sparklinePath: 'M0,28 Q15,25 25,29 T50,18 T75,12 T100,5',
    fillPath: 'M0,28 Q15,25 25,29 T50,18 T75,12 T100,5 L100,35 L0,35 Z',
    trend: 'up',
    description: 'Standard and Poor\'s 500 is a stock market index tracking the stock performance of 500 leading companies listed on stock exchanges in the United States.'
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100',
    exchange: 'INDEX',
    price: 21120.40,
    change: 142.80,
    changePercent: 0.68,
    high: 21180.00,
    low: 20985.20,
    badge: '100',
    badgeBg: '#00A3E0',
    sparklinePath: 'M0,26 Q20,30 35,16 T70,14 T100,4',
    fillPath: 'M0,26 Q20,30 35,16 T70,14 T100,4 L100,35 L0,35 Z',
    trend: 'up',
    description: 'The Nasdaq-100 is a stock market index made up of 101 equity securities issued by 100 of the largest non-financial companies listed on the Nasdaq.'
  },
  {
    symbol: 'DJI',
    name: 'Dow 30',
    exchange: 'INDEX',
    price: 43870.10,
    change: -65.80,
    changePercent: -0.15,
    high: 44010.50,
    low: 43780.00,
    badge: '30',
    badgeBg: '#0072CE',
    sparklinePath: 'M0,10 Q25,8 45,20 T80,24 T100,30',
    fillPath: 'M0,10 Q25,8 45,20 T80,24 T100,30 L100,35 L0,35 Z',
    trend: 'down',
    description: 'The Dow Jones Industrial Average is a price-weighted measurement stock market index of 30 prominent companies listed on stock exchanges in the United States.'
  },
  {
    symbol: 'RUT',
    name: 'Russell 2000',
    exchange: 'INDEX',
    price: 2328.60,
    change: 19.40,
    changePercent: 0.84,
    high: 2335.10,
    low: 2302.40,
    badge: '2K',
    badgeBg: '#4CAF50',
    sparklinePath: 'M0,25 Q30,12 55,20 T85,8 T100,4',
    fillPath: 'M0,25 Q30,12 55,20 T85,8 T100,4 L100,35 L0,35 Z',
    trend: 'up',
    description: 'The Russell 2000 Index measures the performance of approximately 2,000 smallest-cap American companies in the Russell 3000 Index.'
  }
];

export const GLOBAL_BENCHMARKS: GlobalBenchmark[] = [
  {
    symbol: 'NI225',
    name: 'Nikkei 225',
    region: 'Asia',
    countryCode: 'JP',
    flagBg: '#FEE2E2',
    flagTextColor: '#DC2626',
    last: 38782.40,
    chg: 185.30,
    chgPercent: 0.48,
    trendPath: 'M0,18 Q30,12 50,15 T100,5',
    trend: 'up',
    technicalRating: 'Buy'
  },
  {
    symbol: 'UKX',
    name: 'FTSE 100 Index',
    region: 'Europe',
    countryCode: 'GB',
    flagBg: '#DBEAFE',
    flagTextColor: '#1D4ED8',
    last: 8415.80,
    chg: -22.10,
    chgPercent: -0.26,
    trendPath: 'M0,6 Q35,8 60,16 T100,20',
    trend: 'down',
    technicalRating: 'Neutral'
  },
  {
    symbol: 'DAX',
    name: 'DAX 40 Performance Index',
    region: 'Europe',
    countryCode: 'DE',
    flagBg: '#FEF9C3',
    flagTextColor: '#854D0E',
    last: 19254.90,
    chg: 120.40,
    chgPercent: 0.63,
    trendPath: 'M0,20 Q40,15 70,8 T100,4',
    trend: 'up',
    technicalRating: 'Strong Buy'
  },
  {
    symbol: 'HSI',
    name: 'Hang Seng Index',
    region: 'Asia',
    countryCode: 'HK',
    flagBg: '#FEE2E2',
    flagTextColor: '#B91C1C',
    last: 19655.00,
    chg: -89.70,
    chgPercent: -0.45,
    trendPath: 'M0,8 Q30,12 60,18 T100,22',
    trend: 'down',
    technicalRating: 'Sell'
  },
  {
    symbol: 'CAC40',
    name: 'CAC 40 Index',
    region: 'Europe',
    countryCode: 'FR',
    flagBg: '#EFF6FF',
    flagTextColor: '#1E40AF',
    last: 7543.20,
    chg: 38.60,
    chgPercent: 0.51,
    trendPath: 'M0,16 Q40,10 70,12 T100,6',
    trend: 'up',
    technicalRating: 'Buy'
  },
  {
    symbol: 'TSX',
    name: 'S&P/TSX Composite',
    region: 'Americas',
    countryCode: 'CA',
    flagBg: '#FEE2E2',
    flagTextColor: '#DC2626',
    last: 24980.50,
    chg: 74.20,
    chgPercent: 0.30,
    trendPath: 'M0,17 Q30,13 65,11 T100,7',
    trend: 'up',
    technicalRating: 'Buy'
  },
  {
    symbol: 'IBOV',
    name: 'Ibovespa Brasil Index',
    region: 'Americas',
    countryCode: 'BR',
    flagBg: '#DCFCE7',
    flagTextColor: '#166534',
    last: 129450.00,
    chg: -410.00,
    chgPercent: -0.32,
    trendPath: 'M0,9 Q35,11 65,18 T100,21',
    trend: 'down',
    technicalRating: 'Neutral'
  },
  {
    symbol: 'SHCOMP',
    name: 'Shanghai Composite',
    region: 'Asia',
    countryCode: 'CN',
    flagBg: '#FEE2E2',
    flagTextColor: '#991B1B',
    last: 3375.40,
    chg: 22.80,
    chgPercent: 0.68,
    trendPath: 'M0,22 Q30,16 60,12 T100,5',
    trend: 'up',
    technicalRating: 'Strong Buy'
  }
];

export const US_STOCKS: StockQuote[] = [
  // Large Cap
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 146.90,
    changePercent: 3.82,
    change: 5.41,
    marketCap: '$3.60T',
    category: 'Large Cap',
    badge: 'NV',
    badgeBg: 'rgba(118, 185, 0, 0.15)',
    badgeTextColor: '#76B900',
    open: 142.10,
    high: 147.25,
    low: 141.80,
    volume: '54.2M',
    peRatio: 52.4,
    week52High: 149.77,
    week52Low: 45.01
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 231.40,
    changePercent: 1.14,
    change: 2.61,
    marketCap: '$3.51T',
    category: 'Large Cap',
    badge: 'AP',
    badgeBg: '#E5E7EB',
    badgeTextColor: '#131722',
    open: 229.10,
    high: 232.00,
    low: 228.65,
    volume: '42.8M',
    peRatio: 34.8,
    week52High: 237.23,
    week52Low: 164.08
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 424.12,
    changePercent: -0.41,
    change: -1.75,
    marketCap: '$3.15T',
    category: 'Large Cap',
    badge: 'MS',
    badgeBg: '#DBEAFE',
    badgeTextColor: '#2563EB',
    open: 426.00,
    high: 427.50,
    low: 423.20,
    volume: '21.3M',
    peRatio: 33.1,
    week52High: 468.35,
    week52Low: 309.45
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 210.88,
    changePercent: 1.85,
    change: 3.83,
    marketCap: '$2.21T',
    category: 'Large Cap',
    badge: 'AZ',
    badgeBg: '#FEF3C7',
    badgeTextColor: '#B45309',
    open: 207.50,
    high: 211.50,
    low: 206.90,
    volume: '33.1M',
    peRatio: 42.6,
    week52High: 215.90,
    week52Low: 118.35
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 179.35,
    changePercent: 0.92,
    change: 1.63,
    marketCap: '$2.20T',
    category: 'Large Cap',
    badge: 'GO',
    badgeBg: '#FEE2E2',
    badgeTextColor: '#DC2626',
    open: 178.00,
    high: 180.20,
    low: 177.40,
    volume: '24.7M',
    peRatio: 23.5,
    week52High: 191.75,
    week52Low: 120.21
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 342.90,
    changePercent: 5.60,
    change: 18.18,
    marketCap: '$1.10T',
    category: 'Large Cap',
    badge: 'TS',
    badgeBg: '#FFE4E6',
    badgeTextColor: '#E11D48',
    open: 326.50,
    high: 345.80,
    low: 324.90,
    volume: '98.5M',
    peRatio: 88.2,
    week52High: 358.64,
    week52Low: 138.80
  },
  // Most Active
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 342.90,
    changePercent: 5.60,
    change: 18.18,
    marketCap: '$1.10T',
    category: 'Most Active',
    badge: 'TS',
    badgeBg: '#FFE4E6',
    badgeTextColor: '#E11D48',
    open: 326.50,
    high: 345.80,
    low: 324.90,
    volume: '98.5M',
    peRatio: 88.2,
    week52High: 358.64,
    week52Low: 138.80
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 146.90,
    changePercent: 3.82,
    change: 5.41,
    marketCap: '$3.60T',
    category: 'Most Active',
    badge: 'NV',
    badgeBg: 'rgba(118, 185, 0, 0.15)',
    badgeTextColor: '#76B900',
    open: 142.10,
    high: 147.25,
    low: 141.80,
    volume: '54.2M',
    peRatio: 52.4,
    week52High: 149.77,
    week52Low: 45.01
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    price: 64.50,
    changePercent: 4.88,
    change: 3.00,
    marketCap: '$144.2B',
    category: 'Most Active',
    badge: 'PL',
    badgeBg: '#F3E8FF',
    badgeTextColor: '#7E22CE',
    open: 61.80,
    high: 65.10,
    low: 61.40,
    volume: '68.9M',
    peRatio: 112.5,
    week52High: 66.06,
    week52Low: 15.66
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    price: 138.45,
    changePercent: 2.15,
    change: 2.92,
    marketCap: '$224.1B',
    category: 'Most Active',
    badge: 'AM',
    badgeBg: '#DCFCE7',
    badgeTextColor: '#15803D',
    open: 136.00,
    high: 139.80,
    low: 135.20,
    volume: '48.1M',
    peRatio: 45.2,
    week52High: 227.30,
    week52Low: 94.04
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 231.40,
    changePercent: 1.14,
    change: 2.61,
    marketCap: '$3.51T',
    category: 'Most Active',
    badge: 'AP',
    badgeBg: '#E5E7EB',
    badgeTextColor: '#131722',
    open: 229.10,
    high: 232.00,
    low: 228.65,
    volume: '42.8M',
    peRatio: 34.8,
    week52High: 237.23,
    week52Low: 164.08
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 210.88,
    changePercent: 1.85,
    change: 3.83,
    marketCap: '$2.21T',
    category: 'Most Active',
    badge: 'AZ',
    badgeBg: '#FEF3C7',
    badgeTextColor: '#B45309',
    open: 207.50,
    high: 211.50,
    low: 206.90,
    volume: '33.1M',
    peRatio: 42.6,
    week52High: 215.90,
    week52Low: 118.35
  },
  // Top Gainers
  {
    symbol: 'SMCI',
    name: 'Super Micro Computer',
    price: 36.25,
    changePercent: 15.92,
    change: 4.98,
    marketCap: '$21.2B',
    category: 'Top Gainers',
    badge: 'SM',
    badgeBg: '#E0E7FF',
    badgeTextColor: '#4338CA',
    open: 31.50,
    high: 37.10,
    low: 31.20,
    volume: '85.4M',
    peRatio: 16.8,
    week52High: 122.90,
    week52Low: 17.25
  },
  {
    symbol: 'APP',
    name: 'AppLovin Corporation',
    price: 320.10,
    changePercent: 9.45,
    change: 27.65,
    marketCap: '$106.8B',
    category: 'Top Gainers',
    badge: 'AP',
    badgeBg: '#CCFBF1',
    badgeTextColor: '#0F766E',
    open: 295.00,
    high: 324.50,
    low: 292.80,
    volume: '12.8M',
    peRatio: 74.3,
    week52High: 350.00,
    week52Low: 36.50
  },
  {
    symbol: 'COIN',
    name: 'Coinbase Global, Inc.',
    price: 312.40,
    changePercent: 7.85,
    change: 22.74,
    marketCap: '$77.3B',
    category: 'Top Gainers',
    badge: 'CO',
    badgeBg: '#DBEAFE',
    badgeTextColor: '#1D4ED8',
    open: 294.00,
    high: 316.00,
    low: 291.50,
    volume: '22.4M',
    peRatio: 48.9,
    week52High: 340.00,
    week52Low: 114.43
  },
  {
    symbol: 'MSTR',
    name: 'MicroStrategy Inc.',
    price: 388.90,
    changePercent: 6.72,
    change: 24.50,
    marketCap: '$88.5B',
    category: 'Top Gainers',
    badge: 'MS',
    badgeBg: '#FEE2E2',
    badgeTextColor: '#DC2626',
    open: 368.00,
    high: 395.00,
    low: 364.20,
    volume: '18.9M',
    peRatio: 0,
    week52High: 543.00,
    week52Low: 43.80
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 342.90,
    changePercent: 5.60,
    change: 18.18,
    marketCap: '$1.10T',
    category: 'Top Gainers',
    badge: 'TS',
    badgeBg: '#FFE4E6',
    badgeTextColor: '#E11D48',
    open: 326.50,
    high: 345.80,
    low: 324.90,
    volume: '98.5M',
    peRatio: 88.2,
    week52High: 358.64,
    week52Low: 138.80
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    price: 64.50,
    changePercent: 4.88,
    change: 3.00,
    marketCap: '$144.2B',
    category: 'Top Gainers',
    badge: 'PL',
    badgeBg: '#F3E8FF',
    badgeTextColor: '#7E22CE',
    open: 61.80,
    high: 65.10,
    low: 61.40,
    volume: '68.9M',
    peRatio: 112.5,
    week52High: 66.06,
    week52Low: 15.66
  }
];

export const CRYPTO_ITEMS = [
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin',
    price: '$96,410.00',
    changePercent: 2.45,
    isPositive: true,
    icon: '₿',
    iconBg: '#F7931A',
    iconColor: '#FFFFFF',
    details: 'Market Cap: $1.90T'
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum',
    price: '$3,324.50',
    changePercent: 1.18,
    isPositive: true,
    icon: 'Ξ',
    iconBg: '#627EEA',
    iconColor: '#FFFFFF',
    details: 'Market Cap: $400.2B'
  },
  {
    symbol: 'SOLUSD',
    name: 'Solana',
    price: '$224.80',
    changePercent: -0.82,
    isPositive: false,
    icon: '◎',
    iconBg: '#000000',
    iconColor: '#FFFFFF',
    details: 'Market Cap: $106.1B'
  },
  {
    symbol: 'XRPUSD',
    name: 'Ripple',
    price: '$1.46',
    changePercent: 4.12,
    isPositive: true,
    icon: '✕',
    iconBg: '#23292F',
    iconColor: '#FFFFFF',
    details: 'Market Cap: $83.4B'
  }
];

export const FUTURES_ITEMS = [
  {
    symbol: 'GOLD',
    name: 'Gold Comex',
    price: '2,741.80',
    changePercent: 0.76,
    isPositive: true,
    details: 'Front month active contract'
  },
  {
    symbol: 'SILVER',
    name: 'Silver Comex',
    price: '31.42',
    changePercent: 1.34,
    isPositive: true,
    details: 'Troy oz'
  },
  {
    symbol: 'CRUDE_OIL',
    name: 'WTI Light Sweet',
    price: '71.24',
    changePercent: -1.15,
    isPositive: false,
    details: 'Barrel (USD)'
  },
  {
    symbol: 'NATURAL_GAS',
    name: 'Henry Hub Physical',
    price: '3.19',
    changePercent: 2.24,
    isPositive: true,
    details: 'MMBtu'
  }
];

export const FOREX_ITEMS = [
  {
    symbol: 'EUR / USD',
    name: 'Euro / US Dollar',
    price: '1.0482',
    changePercent: -0.18,
    isPositive: false,
    details: 'FX Major'
  },
  {
    symbol: 'USD / JPY',
    name: 'US Dollar / Japanese Yen',
    price: '154.68',
    changePercent: 0.32,
    isPositive: true,
    details: 'FX Major'
  },
  {
    symbol: 'GBP / USD',
    name: 'British Pound / US Dollar',
    price: '1.2615',
    changePercent: -0.05,
    isPositive: false,
    details: 'FX Major'
  },
  {
    symbol: 'USD / CAD',
    name: 'US Dollar / Canadian Dollar',
    price: '1.4010',
    changePercent: 0.14,
    isPositive: true,
    details: 'FX Major'
  }
];

export const BONDS_ITEMS = [
  {
    symbol: 'US10Y',
    name: 'US 10-Year Benchmark Yield',
    price: '4.428%',
    changePercent: 0.82,
    isPositive: true,
    details: 'Government Bond'
  },
  {
    symbol: 'US02Y',
    name: 'US 2-Year Benchmark Yield',
    price: '4.215%',
    changePercent: -0.35,
    isPositive: false,
    details: 'Government Bond'
  },
  {
    symbol: 'US30Y',
    name: 'US 30-Year Bond Yield',
    price: '4.612%',
    changePercent: 0.45,
    isPositive: true,
    details: 'Government Bond'
  },
  {
    symbol: 'DE10Y',
    name: 'Germany 10-Year Bund',
    price: '2.348%',
    changePercent: -0.92,
    isPositive: false,
    details: 'Eurozone Benchmark'
  }
];

export const ETFS_ITEMS = [
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    price: '$597.40',
    changePercent: 0.44,
    isPositive: true,
    details: 'AUM: $580B'
  },
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust (Nasdaq 100)',
    price: '$512.60',
    changePercent: 0.72,
    isPositive: true,
    details: 'AUM: $290B'
  },
  {
    symbol: 'IWM',
    name: 'iShares Russell 2000 ETF',
    price: '$231.85',
    changePercent: 0.88,
    isPositive: true,
    details: 'AUM: $72B'
  },
  {
    symbol: 'TLT',
    name: 'iShares 20+ Year Treasury Bond ETF',
    price: '$89.20',
    changePercent: -0.42,
    isPositive: false,
    details: 'AUM: $54B'
  }
];

export const ECONOMY_ITEMS = [
  {
    symbol: 'FEDFUNDS',
    name: 'Federal Funds Effective Rate',
    price: '4.50% - 4.75%',
    changePercent: 0.00,
    isPositive: true,
    details: 'Federal Reserve Policy Target'
  },
  {
    symbol: 'US_CPI',
    name: 'US CPI Inflation Rate (YoY)',
    price: '2.6%',
    changePercent: -0.20,
    isPositive: false,
    details: 'Bureau of Labor Statistics'
  },
  {
    symbol: 'US_UNEMP',
    name: 'US Unemployment Rate',
    price: '4.1%',
    changePercent: 0.00,
    isPositive: true,
    details: 'Non-farm Payroll Release'
  },
  {
    symbol: 'US_GDP',
    name: 'US Real GDP Annualized QoQ',
    price: '2.8%',
    changePercent: 0.30,
    isPositive: true,
    details: 'Bureau of Economic Analysis'
  }
];

// Helper to generate realistic chart points for the interactive detail view
export function generateChartPoints(basePrice: number, pointsCount = 48, volatility = 0.015) {
  const points: { time: string; price: number; high: number; low: number; open: number; close: number }[] = [];
  let curr = basePrice * 0.985;
  const now = new Date();
  
  for (let i = 0; i < pointsCount; i++) {
    const timeDelta = (pointsCount - i) * 10; // minutes ago
    const pointTime = new Date(now.getTime() - timeDelta * 60000);
    const timeStr = pointTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const delta = (Math.random() - 0.48) * curr * volatility;
    const open = curr;
    const close = Math.round((open + delta) * 100) / 100;
    const high = Math.round((Math.max(open, close) + Math.random() * curr * 0.004) * 100) / 100;
    const low = Math.round((Math.min(open, close) - Math.random() * curr * 0.004) * 100) / 100;
    curr = close;

    points.push({
      time: timeStr,
      price: close,
      open,
      high,
      low,
      close
    });
  }

  // Anchor the final point to match basePrice closely
  if (points.length > 0) {
    const last = points[points.length - 1];
    last.close = basePrice;
    last.price = basePrice;
    if (basePrice > last.high) last.high = basePrice;
    if (basePrice < last.low) last.low = basePrice;
  }

  return points;
}
