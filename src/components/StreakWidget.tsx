import { Flame } from 'lucide-react';

const StreakWidget = () => {
  const streakDays = 12;

  return (
    <div className="glass p-5 h-full flex flex-col items-center justify-center glass-hover group cursor-pointer relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-streak/10 via-transparent to-transparent" />
      
      {/* Flame icon with glow */}
      <div className="relative mb-3">
        <div className="absolute inset-0 blur-xl bg-streak/40 rounded-full scale-150" />
        <Flame 
          className="w-10 h-10 md:w-12 md:h-12 text-streak relative z-10 drop-shadow-lg" 
          fill="hsl(var(--streak))"
          strokeWidth={1.5}
        />
      </div>

      {/* Streak count */}
      <div className="text-center relative z-10">
        <span className="text-3xl md:text-4xl font-bold">{streakDays}</span>
        <span className="text-muted-foreground text-sm block mt-1">Day Streak</span>
      </div>

      {/* Sparkle effects */}
      <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-streak rounded-full animate-pulse" />
      <div className="absolute bottom-6 left-4 w-1 h-1 bg-streak/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};

export default StreakWidget;
