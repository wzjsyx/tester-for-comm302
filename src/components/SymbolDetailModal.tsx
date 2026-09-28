import React, { useState, useMemo } from 'react';
import { X, Star, Bell, TrendingUp, BarChart2, Check, ExternalLink } from 'lucide-react';
import { generateChartPoints } from '../data/marketData';

interface SymbolDetailModalProps {
  item: any | null;
  type: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SymbolDetailModal: React.FC<SymbolDetailModalProps> = ({
  item,
  type,
  isOpen,
  onClose
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y' | 'ALL'>('1D');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [activeHoverPoint, setActiveHoverPoint] = useState<{ time: string; price: number } | null>(null);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [tradeActionMessage, setTradeActionMessage] = useState<string | null>(null);

  // Derive numeric base price
  const basePrice = useMemo(() => {
    if (!item) return 100;
    if (typeof item.price === 'number') return item.price;
    if (typeof item.last === 'number') return item.last;
    if (typeof item.price === 'string') {
      const cleaned = item.price.replace(/[$,]/g, '').trim();
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 100 : parsed;
    }
    return 100;
  }, [item]);

  // Generate chart data based on timeframe
  const chartPoints = useMemo(() => {
    const count = selectedTimeframe === '1D' ? 40 : selectedTimeframe === '5D' ? 50 : 60;
    const vol = selectedTimeframe === '1D' ? 0.008 : selectedTimeframe === '5D' ? 0.02 : 0.05;
    return generateChartPoints(basePrice, count, vol);
  }, [basePrice, selectedTimeframe]);

  if (!isOpen || !item) return null;

  const symbol = item.symbol || 'SPX';
  const name = item.name || symbol;
  const changePercent = item.changePercent !== undefined ? item.changePercent : item.chgPercent || 0;
  const isPositive = changePercent >= 0;

  // Compute SVG bounds for chart
  const minPrice = Math.min(...chartPoints.map((p) => p.low));
  const maxPrice = Math.max(...chartPoints.map((p) => p.high));
  const range = maxPrice - minPrice || 1;

  const svgWidth = 800;
  const svgHeight = 240;
  const paddingY = 20;

  const getCoordinates = (price: number, index: number) => {
    const x = (index / (chartPoints.length - 1)) * svgWidth;
    const normalizedY = (price - minPrice) / range;
    const y = svgHeight - paddingY - normalizedY * (svgHeight - paddingY * 2);
    return { x, y };
  };

  // Build SVG path for line and area
  const pathD = chartPoints.reduce((acc, point, idx) => {
    const { x, y } = getCoordinates(point.price, idx);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const areaD = `${pathD} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`;

  const handleSetAlert = () => {
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 3000);
  };

  const handleSimulateTrade = (side: 'Buy' | 'Sell') => {
    setTradeActionMessage(`Simulated order: ${side} 10 shares of ${symbol} at $${basePrice.toFixed(2)} executed!`);
    setTimeout(() => setTradeActionMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#E0E3EB] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E0E3EB] flex flex-wrap items-center justify-between gap-4 bg-[#F8F9FD]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#E0E3EB] text-[#131722] font-black text-sm flex items-center justify-center shadow-xs">
              {symbol.slice(0, 4)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#131722]">{symbol}</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-200 text-[#131722]">
                  {type}
                </span>
                <button
                  type="button"
                  onClick={() => setIsWatchlisted((w) => !w)}
                  className={`p-1 rounded-full transition cursor-pointer ${
                    isWatchlisted ? 'text-amber-500 hover:text-amber-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Star className={`w-5 h-5 ${isWatchlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
              <p className="text-sm text-[#787B86]">{name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#131722] tabular-nums">
                {activeHoverPoint ? `$${activeHoverPoint.price.toFixed(2)}` : typeof item.price === 'string' ? item.price : `$${basePrice.toFixed(2)}`}
              </div>
              <div
                className={`text-xs sm:text-sm font-bold tabular-nums ${
                  isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                {isPositive ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`} Today
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200 text-[#787B86] transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Action feedback banners */}
        {alertSuccess && (
          <div className="bg-emerald-50 text-[#089981] px-6 py-2.5 text-xs font-semibold flex items-center justify-between border-b border-emerald-200">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Price alert active for {symbol} at ${basePrice.toFixed(2)}!
            </span>
          </div>
        )}
        {tradeActionMessage && (
          <div className="bg-blue-50 text-[#2962FF] px-6 py-2.5 text-xs font-semibold flex items-center justify-between border-b border-blue-200">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" /> {tradeActionMessage}
            </span>
          </div>
        )}

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Chart Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-[#F0F3FA] p-1 rounded-lg">
              {(['1D', '5D', '1M', '6M', '1Y', 'ALL'] as const).map((tf) => {
                const isSelected = selectedTimeframe === tf;
                return (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#131722] shadow-xs'
                        : 'text-[#787B86] hover:text-[#131722]'
                    }`}
                  >
                    {tf}
                  </button>
                );
              })}
            </div>

            {/* Chart type toggle & alert action */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#F0F3FA] p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setChartType('area')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition cursor-pointer ${
                    chartType === 'area' ? 'bg-white shadow-xs text-[#131722]' : 'text-[#787B86]'
                  }`}
                >
                  Area
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('candles')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition cursor-pointer ${
                    chartType === 'candles' ? 'bg-white shadow-xs text-[#131722]' : 'text-[#787B86]'
                  }`}
                >
                  Candles
                </button>
              </div>

              <button
                type="button"
                onClick={handleSetAlert}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#F0F3FA] hover:bg-[#E0E3EB] text-[#131722] text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5 text-[#787B86]" />
                <span>Alert</span>
              </button>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div
            className="relative w-full h-64 bg-white border border-[#E0E3EB] rounded-2xl p-3 overflow-hidden select-none"
            onMouseLeave={() => setActiveHoverPoint(null)}
          >
            {/* Top info badge inside chart */}
            <div className="absolute top-3 left-4 z-10 text-xs font-mono text-[#787B86]">
              {activeHoverPoint ? (
                <div className="flex items-center gap-3 bg-white/90 px-2 py-1 rounded border border-[#E0E3EB] shadow-xs">
                  <span>Time: {activeHoverPoint.time}</span>
                  <span className="font-bold text-[#131722]">${activeHoverPoint.price.toFixed(2)}</span>
                </div>
              ) : (
                <span>Range: ${minPrice.toFixed(2)} — ${maxPrice.toFixed(2)}</span>
              )}
            </div>

            {/* SVG Chart Graphic */}
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              {/* Horizontal grid lines */}
              {[0.2, 0.5, 0.8].map((ratio) => {
                const y = svgHeight * ratio;
                return (
                  <line
                    key={ratio}
                    x1="0"
                    y1={y}
                    x2={svgWidth}
                    y2={y}
                    stroke="#F0F3FA"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {chartType === 'area' ? (
                <>
                  <path
                    d={areaD}
                    fill={isPositive ? 'url(#greenGradient)' : 'url(#redGradient)'}
                  />
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isPositive ? '#089981' : '#F23645'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                /* Candlesticks view */
                chartPoints.map((point, idx) => {
                  const isCandleGreen = point.close >= point.open;
                  const candleColor = isCandleGreen ? '#089981' : '#F23645';
                  const x = (idx / (chartPoints.length - 1)) * svgWidth;
                  const candleWidth = Math.max(svgWidth / chartPoints.length - 3, 4);

                  const normHigh = (point.high - minPrice) / range;
                  const normLow = (point.low - minPrice) / range;
                  const normOpen = (point.open - minPrice) / range;
                  const normClose = (point.close - minPrice) / range;

                  const yHigh = svgHeight - paddingY - normHigh * (svgHeight - paddingY * 2);
                  const yLow = svgHeight - paddingY - normLow * (svgHeight - paddingY * 2);
                  const yOpen = svgHeight - paddingY - normOpen * (svgHeight - paddingY * 2);
                  const yClose = svgHeight - paddingY - normClose * (svgHeight - paddingY * 2);

                  const candleTop = Math.min(yOpen, yClose);
                  const candleHeight = Math.max(Math.abs(yClose - yOpen), 2);

                  return (
                    <g key={idx}>
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={candleColor}
                        strokeWidth="1.5"
                      />
                      {/* Body */}
                      <rect
                        x={x - candleWidth / 2}
                        y={candleTop}
                        width={candleWidth}
                        height={candleHeight}
                        fill={candleColor}
                        rx="1"
                      />
                    </g>
                  );
                })
              )}

              {/* Hover interaction overlay points */}
              {chartPoints.map((point, idx) => {
                const { x, y } = getCoordinates(point.price, idx);
                return (
                  <rect
                    key={idx}
                    x={x - svgWidth / chartPoints.length / 2}
                    y="0"
                    width={svgWidth / chartPoints.length}
                    height={svgHeight}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() =>
                      setActiveHoverPoint({ time: point.time, price: point.price })
                    }
                  />
                );
              })}
            </svg>
          </div>

          {/* Key Statistics Grid */}
          <div>
            <h3 className="text-sm font-bold text-[#131722] mb-3">Key Financial Statistics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#F8F9FD] border border-[#E0E3EB]">
                <div className="text-xs text-[#787B86]">Open</div>
                <div className="text-sm font-bold text-[#131722] tabular-nums">
                  ${(basePrice * 0.995).toFixed(2)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FD] border border-[#E0E3EB]">
                <div className="text-xs text-[#787B86]">High / Low</div>
                <div className="text-sm font-bold text-[#131722] tabular-nums">
                  ${maxPrice.toFixed(2)} / ${minPrice.toFixed(2)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FD] border border-[#E0E3EB]">
                <div className="text-xs text-[#787B86]">Volume</div>
                <div className="text-sm font-bold text-[#131722] tabular-nums">
                  {item.volume || '42.8M'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FD] border border-[#E0E3EB]">
                <div className="text-xs text-[#787B86]">Market Cap</div>
                <div className="text-sm font-bold text-[#131722] tabular-nums">
                  {item.marketCap || 'Large Cap'}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Summary Gauge */}
          <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E0E3EB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-[#131722]">Technical Analysis Summary</h4>
              <p className="text-xs text-[#787B86]">
                Aggregate indicator of 26 technical indicators (Moving Averages, RSI, MACD)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#089981]/15 text-[#089981] border border-[#089981]/30">
                STRONG BUY
              </span>
              <span className="text-xs text-[#787B86] tabular-nums">16 Buy · 8 Neutral · 2 Sell</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E0E3EB] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSimulateTrade('Buy')}
              className="px-5 py-2 bg-[#089981] hover:bg-[#077f6b] text-white text-xs font-bold rounded-xl transition cursor-pointer active:scale-95 shadow-xs"
            >
              Buy {symbol}
            </button>
            <button
              type="button"
              onClick={() => handleSimulateTrade('Sell')}
              className="px-5 py-2 bg-[#F23645] hover:bg-[#d62534] text-white text-xs font-bold rounded-xl transition cursor-pointer active:scale-95 shadow-xs"
            >
              Sell {symbol}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert(`Launching Supercharts full terminal for ${symbol}...`)}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#E0E3EB] rounded-xl text-xs font-semibold text-[#131722] hover:bg-[#F8F9FD] transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#2962FF]" />
              <span>Full Screen Superchart</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#131722] hover:bg-black text-white text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
