import { useEffect, useState } from 'react';

const HealthOrb = () => {
  const [bpm, setBpm] = useState(72);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass p-8 flex flex-col items-center justify-center aspect-square relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
      
      {/* Orbiting particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 md:w-64 md:h-64 relative">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-primary/20"
              style={{
                animation: `orbit ${8 + i * 4}s linear infinite`,
                animationDelay: `${i * -2}s`,
              }}
            >
              <div 
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main orb */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary via-cyan-400 to-purple-500 animate-pulse-slow animate-glow flex items-center justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/80 to-purple-500/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl md:text-4xl font-bold text-background">{bpm}</span>
              <span className="text-xs text-background/80 block">BPM</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center animate-float">
          <h2 className="text-xl md:text-2xl font-semibold text-gradient">Health Pulse</h2>
          <p className="text-muted-foreground text-sm mt-1">Vitals synchronized</p>
        </div>
      </div>

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/30"
            style={{
              width: `${180 + i * 40}px`,
              height: `${180 + i * 40}px`,
              animation: 'pulse-slow 4s ease-in-out infinite',
              animationDelay: `${i * 0.5}s`,
              opacity: 1 - i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthOrb;
