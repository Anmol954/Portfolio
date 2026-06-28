"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sound } from "@/lib/sound-engine";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<"black" | "wipe" | "title" | "flare" | "done">("black");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Phase 1: Black screen hold
    const t1 = setTimeout(() => setPhase("wipe"), 400);
    // Phase 2: Scanline wipe + boot sound
    const t2 = setTimeout(() => {
      setPhase("title");
      Sound.play("boot_sequence");
    }, 1000);
    // Phase 3: Title visible → lens flare
    const t3 = setTimeout(() => setPhase("flare"), 2200);
    // Phase 4: Fade out
    const t4 = setTimeout(() => {
      setPhase("done");
      setVisible(false);
    }, 3200);
    // Phase 5: Complete
    const t5 = setTimeout(() => onComplete(), 3700);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-intro"
          className="fixed inset-0 z-[9999] bg-[#03020a] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated grid lines on black */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Scan-wipe curtain */}
          <AnimatePresence>
            {(phase === "black" || phase === "wipe") && (
              <motion.div
                key="curtain"
                className="absolute inset-0 bg-[#03020a] z-10"
                initial={{ scaleY: 1 }}
                exit={{ scaleY: 0, originY: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              />
            )}
          </AnimatePresence>

          {/* Horizontal scan line that sweeps down during wipe */}
          {phase === "wipe" && (
            <motion.div
              className="absolute left-0 right-0 h-px z-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00f0ff, #b026ff, transparent)",
                boxShadow: "0 0 20px #00f0ff, 0 0 40px rgba(0,240,255,0.5)",
              }}
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.7, ease: "linear" }}
            />
          )}

          {/* Main content — title & tagline */}
          <AnimatePresence>
            {(phase === "title" || phase === "flare") && (
              <motion.div
                key="content"
                className="relative z-20 text-center select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
              >
                {/* Tagline */}
                <motion.div
                  className="text-xs md:text-sm font-mono tracking-[0.5em] text-cyan-300/60 mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  ▶ INITIALIZING PLAYER PROFILE
                </motion.div>

                {/* Hero title — "ANMOL MADHAV" with scan-sweep container */}
                <div className="scan-sweep-container mb-2">
                  <motion.div
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black neon-text-cyan animate-neon-breath"
                    style={{
                      fontFamily: "var(--font-orbitron), monospace",
                      lineHeight: 1,
                      letterSpacing: "0.08em",
                    }}
                    initial={{ opacity: 0, y: -40, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.15,
                    }}
                  >
                    ANMOL
                  </motion.div>
                  <motion.div
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black"
                    style={{
                      fontFamily: "var(--font-orbitron), monospace",
                      lineHeight: 1,
                      letterSpacing: "0.08em",
                      color: "#b026ff",
                      textShadow:
                        "0 0 8px rgba(176,38,255,0.9), 0 0 20px rgba(176,38,255,0.6), 0 0 50px rgba(176,38,255,0.3)",
                    }}
                    initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.3,
                    }}
                  >
                    MADHAV
                  </motion.div>
                </div>

                {/* Divider line */}
                <motion.div
                  className="h-px mx-auto my-4"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #00f0ff, #b026ff, #ff2ec4, transparent)",
                    boxShadow: "0 0 10px rgba(0,240,255,0.5)",
                  }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "80%", opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                />

                {/* Subtitle */}
                <motion.div
                  className="text-xs md:text-sm font-mono tracking-[0.35em] text-pink-300/70 mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                >
                  FULL STACK DEVELOPER // AI ENGINEER
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lens flare burst */}
          <AnimatePresence>
            {phase === "flare" && (
              <motion.div
                key="flare"
                className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, times: [0, 0.2, 1] }}
              >
                {/* Core burst */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 300,
                    height: 300,
                    background:
                      "radial-gradient(circle, rgba(0,240,255,0.5) 0%, rgba(176,38,255,0.2) 40%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                {/* Horizontal flare streak */}
                <div
                  className="absolute"
                  style={{
                    width: "100vw",
                    height: 2,
                    background:
                      "linear-gradient(90deg, transparent, rgba(0,240,255,0.6) 30%, rgba(176,38,255,0.8) 50%, rgba(0,240,255,0.6) 70%, transparent)",
                    filter: "blur(2px)",
                    boxShadow: "0 0 30px rgba(0,240,255,0.4)",
                  }}
                />
                {/* Vertical flare streak */}
                <div
                  className="absolute"
                  style={{
                    height: "100vh",
                    width: 2,
                    background:
                      "linear-gradient(180deg, transparent, rgba(0,240,255,0.4) 30%, rgba(176,38,255,0.6) 50%, rgba(0,240,255,0.4) 70%, transparent)",
                    filter: "blur(2px)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-5"
            style={{
              background:
                "linear-gradient(to top, rgba(3,2,10,0.9), transparent)",
            }}
          />

          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-40 opacity-30"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,240,255,0.03) 2px, rgba(0,240,255,0.03) 3px)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
