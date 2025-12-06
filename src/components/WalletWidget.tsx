import { TrendingUp } from 'lucide-react';

const WalletWidget = () => {
  // Mini trend data points
  const trendData = [20, 25, 22, 35, 30, 45, 42, 55, 50, 62];
  const maxVal = Math.max(...trendData);
  const minVal = Math.min(...trendData);
  const range = maxVal - minVal;

  const pathPoints = trendData
    .map((val, i) => {
      const x = (i / (trendData.length - 1)) * 100;
      const y = 100 - ((val - minVal) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="glass p-5 h-full flex flex-col justify-between glass-hover group cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Wallet Balance</span>
        <div className="flex items-center gap-1 text-success text-xs font-medium">
          <TrendingUp className="w-3 h-3" />
          <span>+12%</span>
        </div>
      </div>

      <div className="flex-1 flex items-center">
        <span className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-muted-foreground text-xl">$</span>124.50
        </span>
      </div>

      {/* Mini trend chart */}
      <div className="h-12 mt-2 relative">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area fill */}
          <polygon
            points={`0,100 ${pathPoints} 100,100`}
            fill="url(#trendGradient)"
          />
          
          {/* Line */}
          <polyline
            points={pathPoints}
            fill="none"
            stroke="hsl(160 84% 39%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-lg"
          />
        </svg>
      </div>
    </div>
  );
};

export default WalletWidget;
