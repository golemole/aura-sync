import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HealthOrb = () => {
  const [bpm, setBpm] = useState(72);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => Math.max(60, Math.min(90, prev + Math.floor(Math.random() * 5) - 2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const breatheDuration = isHovered ? 1.5 : 4;

  return (
    <div 
      className="glass p-8 flex flex-col items-center justify-center aspect-square relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10" />
      
      {/* Orbiting particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 md:w-64 md:h-64 relative">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-cyan-400/20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8 + i * 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div 
                className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main breathing orb */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glow layer */}
        <motion.div
          className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: breatheDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: '0 0 80px rgba(6, 182, 212, 0.5), 0 0 120px rgba(20, 184, 166, 0.3)',
          }}
        />

        {/* Breathing orb */}
        <motion.div
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center cursor-pointer"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: breatheDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
          style={{
            background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
            boxShadow: '0 0 60px rgba(6, 182, 212, 0.5), 0 0 100px rgba(20, 184, 166, 0.3), inset 0 0 40px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Inner gradient layer for color shifting */}
          <motion.div
            className="absolute inset-2 rounded-full"
            animate={{
              background: [
                'linear-gradient(135deg, #14b8a6, #06b6d4)',
                'linear-gradient(225deg, #06b6d4, #14b8a6)',
                'linear-gradient(315deg, #14b8a6, #06b6d4)',
                'linear-gradient(135deg, #14b8a6, #06b6d4)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.2)',
            }}
          />

          {/* Inner orb with content */}
          <motion.div 
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full backdrop-blur-sm flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)',
            }}
            animate={{
              scale: [1, 0.95, 1],
            }}
            transition={{
              duration: breatheDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="text-center">
              <motion.span 
                className="text-3xl md:text-4xl font-bold text-slate-950"
                key={bpm}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {bpm}
              </motion.span>
              <span className="text-xs text-slate-950/70 block font-medium">BPM</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gradient">Health Pulse</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {isHovered ? 'Active sync...' : 'Vitals synchronized'}
          </p>
        </motion.div>
      </div>

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan-400/30"
            style={{
              width: `${180 + i * 40}px`,
              height: `${180 + i * 40}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: breatheDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthOrb;
