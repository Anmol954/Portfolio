"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGame, openLevelWithTransition } from "@/lib/game-store";
import { Sound } from "@/lib/sound-engine";

export default function GameFooter() {
  const soundEnabled = useGame((s) => s.soundEnabled);
  const toggleSound = useGame((s) => s.toggleSound);

  const handleSoundToggle = () => {
    toggleSound();
    // If turning ON, resume context first
    if (!soundEnabled) Sound.resume();
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mt-12 px-4 pb-6 pt-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel-purple clip-corner p-6 md:p-10 relative overflow-hidden text-center">
          {/* BG grid */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          {/* Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-pink-500/20 blur-3xl" />

          {/* Ambient shimmer sweep */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-y-0 w-1/3 skew-x-12 animate-shimmer"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,46,196,0.06), transparent)" }}
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-6xl font-black neon-text-pink tracking-wider mb-2 animate-neon-breath"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              GAME OVER?
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-3xl font-black neon-text-cyan tracking-wide mb-6"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              NO.
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-sm md:text-xl font-mono neon-text-purple mb-6"
            >
              NEXT LEVEL STARTS AFTER YOU HIRE ME.
            </motion.p>

            <motion.button
              onClick={() => openLevelWithTransition("contact" as never)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="magnetic group"
            >
              <div className="glass-panel clip-corner px-6 py-3 md:px-10 md:py-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-y-0 -left-1/4 w-1/3 animate-shimmer"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.2), transparent)", transform: "skewX(-12deg)" }}
                  />
                </div>
                <div className="text-base md:text-xl font-black neon-text-cyan tracking-widest relative" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
                  ▶ INITIATE HIRE SEQUENCE
                </div>
              </div>
            </motion.button>

            {/* Bottom bar */}
            <div className="mt-8 pt-6 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-cyan-300/40 tracking-widest">
              <div>© 2026 ANMOL MADHAV // ALL LEVELS RESERVED</div>
              <div className="flex gap-3 items-center">
                <span>v2.0.26</span>
                <span>·</span>
                <span>BUILT WITH NEXT.JS + THREE.JS</span>
                <span>·</span>
                <span className="neon-text-green">● SYSTEMS NOMINAL</span>
                <span>·</span>

                {/* Sound toggle button */}
                <button
                  onClick={handleSoundToggle}
                  className="magnetic flex items-center gap-1.5 px-2 py-1 glass-panel clip-corner-sm transition-all hover:scale-105"
                  style={{
                    borderColor: soundEnabled ? "rgba(0,240,255,0.4)" : "rgba(255,255,255,0.1)",
                    color: soundEnabled ? "#00f0ff" : "#4a5568",
                  }}
                  title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                >
                  <AnimatePresence mode="wait">
                    {soundEnabled ? (
                      <motion.span
                        key="on"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1"
                      >
                        {/* Pulsing waveform bars */}
                        <span className="flex items-end gap-[2px] h-3">
                          {[0.4, 1, 0.6, 0.9, 0.5].map((h, i) => (
                            <motion.span
                              key={i}
                              className="w-[2px] rounded-full bg-current"
                              style={{ height: `${h * 12}px` }}
                              animate={{ scaleY: [1, h * 0.5 + 0.5, 1] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </span>
                        <span className="text-[9px]">SFX ON</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="off"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-1 text-[9px]"
                      >
                        <span>⊘</span>
                        <span>SFX OFF</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
