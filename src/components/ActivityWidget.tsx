import { Footprints } from 'lucide-react';

const ActivityWidget = () => {
  const steps = 8432;
  const goal = 10000;
  const progress = (steps / goal) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass p-5 h-full flex flex-col glass-hover group cursor-pointer">
      <div className="flex items-center gap-2 mb-4">
        <Footprints className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Daily Activity</span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Progress ring */}
          <svg className="w-24 h-24 md:w-28 md:h-28 -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            {/* Progress ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(180 70% 50%)" />
                <stop offset="100%" stopColor="hsl(280 70% 60%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl md:text-2xl font-bold">{steps.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">/ {(goal / 1000).toFixed(0)}k</span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-center">
        <span className="text-xs text-muted-foreground">
          {Math.round(progress)}% of daily goal
        </span>
      </div>
    </div>
  );
};

export default ActivityWidget;
