import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSync } from '@/context/SyncContext';

const HealthOrb = () => {
  const [bpm, setBpm] = useState(72);
  const [isHovered, setIsHovered] = useState(false);
  const { isSynced, isSyncing } = useSync();

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm(prev => Math.max(60, Math.min(90, prev + Math.floor(Math.random() * 5) - 2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const breatheDuration = isHovered ? 1.5 : isSyncing ? 0.8 : 4;

  // Color based on sync state
  const primaryColor = isSynced ? '#eab308' : '#14b8a6';
  const secondaryColor = isSynced ? '#fbbf24' : '#06b6d4';
  const glowColor = isSynced ? 'rgba(234, 179, 8, 0.5)' : 'rgba(6, 182, 212, 0.5)';
  const glowColorSecondary = isSynced ? 'rgba(251, 191, 36, 0.3)' : 'rgba(20, 184, 166, 0.3)';

  return (
    <div 
      className="glass p-8 flex flex-col items-center justify-center aspect-square relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: isSynced 
            ? 'linear-gradient(to bottom right, rgba(234, 179, 8, 0.1), transparent, rgba(251, 191, 36, 0.1))'
            : 'linear-gradient(to bottom right, rgba(20, 184, 166, 0.1), transparent, rgba(6, 182, 212, 0.1))'
        }}
        transition={{ duration: 1 }}
      />
      
      {/* Orbiting particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 md:w-64 md:h-64 relative">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ borderColor: isSynced ? 'rgba(234, 179, 8, 0.2)' : 'rgba(6, 182, 212, 0.2)', borderWidth: 1 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: isSyncing ? 2 : 8 + i * 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div 
                className="absolute w-2 h-2 rounded-full shadow-lg"
                style={{ 
                  top: '50%', 
                  left: 0, 
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: isSynced ? '#eab308' : '#06b6d4',
                  boxShadow: isSynced ? '0 0 10px rgba(234, 179, 8, 0.5)' : '0 0 10px rgba(6, 182, 212, 0.5)'
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main breathing orb */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glow layer */}
        <motion.div
          className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
          transition={{
            duration: breatheDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: `0 0 80px ${glowColor}, 0 0 120px ${glowColorSecondary}`,
          }}
        />

        {/* Breathing orb */}
        <motion.div
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center cursor-pointer"
          animate={{
            scale: isSyncing ? [1, 1.15, 1] : [1, 1.08, 1],
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
          transition={{
            scale: {
              duration: breatheDuration,
              repeat: Infinity,
              ease: "easeInOut",
            },
            background: { duration: 1 }
          }}
          whileHover={{ scale: 1.1 }}
          style={{
            boxShadow: `0 0 60px ${glowColor}, 0 0 100px ${glowColorSecondary}, inset 0 0 40px rgba(255, 255, 255, 0.1)`,
          }}
        >
          {/* Inner gradient layer for color shifting */}
          <motion.div
            className="absolute inset-2 rounded-full"
            animate={{
              background: [
                `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                `linear-gradient(225deg, ${secondaryColor}, ${primaryColor})`,
                `linear-gradient(315deg, ${primaryColor}, ${secondaryColor})`,
                `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              ],
            }}
            transition={{
              duration: isSyncing ? 2 : 8,
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
              {isSyncing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-3 border-slate-950/30 border-t-slate-950 rounded-full"
                />
              ) : (
                <>
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
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-6 text-center"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <h2 className={`text-xl md:text-2xl font-semibold ${isSynced ? 'text-yellow-400' : 'text-gradient'}`}>
            {isSynced ? 'Verified!' : 'Health Pulse'}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {isSyncing ? 'Syncing wearable...' : isSynced ? 'Reward claimed' : 'Vitals synchronized'}
          </p>
        </motion.div>
      </div>

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${180 + i * 40}px`,
              height: `${180 + i * 40}px`,
              borderWidth: 1,
              borderColor: isSynced ? 'rgba(234, 179, 8, 0.3)' : 'rgba(6, 182, 212, 0.3)',
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
