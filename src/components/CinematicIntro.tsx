import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import liveNeonLogo from "@/assets/live-neon-logo.jpg";

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [phase, setPhase] = useState<"logo" | "reveal" | "done">("logo");

  useEffect(() => {
    // Logo display phase
    const logoTimer = setTimeout(() => {
      setPhase("reveal");
    }, 3000);

    // Complete intro
    const completeTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Rain effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  height: `${20 + Math.random() * 80}px`,
                }}
                initial={{ top: "-10%", opacity: 0 }}
                animate={{ 
                  top: "110%", 
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Cinematic bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-16 bg-black z-10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ transformOrigin: "top" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-16 bg-black z-10"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ transformOrigin: "bottom" }}
          />

          {/* Logo container */}
          <motion.div
            className="relative z-20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: phase === "reveal" ? 1.1 : 1, 
              opacity: 1 
            }}
            transition={{ 
              duration: phase === "reveal" ? 1.5 : 1.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {/* Glow effect behind logo */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.4] }}
              transition={{ duration: 2, times: [0, 0.5, 1] }}
              style={{
                background: "radial-gradient(circle, hsl(189 100% 50% / 0.4) 0%, hsl(300 100% 50% / 0.4) 50%, transparent 70%)",
              }}
            />
            
            {/* Main logo */}
            <motion.img
              src={liveNeonLogo}
              alt="LIVE - Eat. Drink. Code. Repeat"
              className="relative max-w-[90vw] md:max-w-[600px] w-full rounded-lg"
              initial={{ filter: "brightness(0)" }}
              animate={{ 
                filter: [
                  "brightness(0)",
                  "brightness(1.5)",
                  "brightness(1)"
                ]
              }}
              transition={{ 
                duration: 2,
                times: [0, 0.4, 1],
                ease: "easeOut"
              }}
            />

            {/* Flicker effect */}
            <motion.div
              className="absolute inset-0 bg-primary/20 mix-blend-overlay rounded-lg"
              animate={{ 
                opacity: [0, 0.3, 0, 0.1, 0]
              }}
              transition={{
                duration: 0.5,
                delay: 1,
                times: [0, 0.1, 0.2, 0.3, 1]
              }}
            />
          </motion.div>

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
