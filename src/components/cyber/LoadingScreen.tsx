"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/lib/game-store";
import { Sound } from "@/lib/sound-engine";

const SEQUENCE = [
  "INITIALIZING PLAYER...",
  "LOADING SKILLS...",
  "LOADING PROJECTS...",
  "LOADING EXPERIENCE...",
  "CALIBRATING NEURAL NET...",
  "WELCOME RECRUITER.",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const goToLanding = useGame((s) => s.goToLanding);

  useEffect(() => {
    let p = 0;
    let lastStep = -1;
    const id = setInterval(() => {
      p += Math.random() * 8 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 600);
        setTimeout(() => goToLanding(), 1800);
      }
      setProgress(p);
      // Advance step
      const newStep = Math.min(
        SEQUENCE.length - 1,
        Math.floor((p / 100) * SEQUENCE.length)
      );
      if (newStep !== lastStep) {
        Sound.play("boot_beep");
        lastStep = newStep;
      }
      setStep(newStep);
    }, 180);
    return () => clearInterval(id);
  }, [goToLanding]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#03020a] overflow-hidden"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-grid opacity-30" />

          {/* Radial pulse */}
          <div className="absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #00f0ff 0%, transparent 70%)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
          </div>

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,240,255,0.05) 2px, rgba(0,240,255,0.05) 3px)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 w-full max-w-2xl px-6">
            {/* Logo / Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="text-xs neon-text-cyan font-mono tracking-[0.4em] mb-3 animate-flicker">
                SYSTEM BOOT // v2.0.26
              </div>
              <div
                className="text-5xl md:text-7xl font-black tracking-[0.15em] neon-text-cyan"
                style={{ fontFamily: "var(--font-orbitron), monospace" }}
              >
                LEVEL UP
              </div>
              <div className="text-[10px] md:text-xs text-cyan-300/60 mt-2 tracking-[0.3em] font-mono">
                ANMOL MADHAV // PLAYER PROFILE
              </div>
            </motion.div>

            {/* Boot sequence log */}
            <div className="glass-panel clip-corner p-5 mb-6 font-mono text-xs md:text-sm min-h-[160px]">
              {SEQUENCE.slice(0, step + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 mb-1.5 ${
                    i === step ? "neon-text-cyan" : "text-cyan-300/40"
                  }`}
                >
                  <span className="text-pink-400">{i === step ? "▶" : "✓"}</span>
                  <span>{line}</span>
                  {i === step && (
                    <span className="animate-blink ml-1 neon-text-cyan">_</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] md:text-xs font-mono tracking-wider">
                <span className="text-cyan-300/70">LOADING ASSETS</span>
                <span className="neon-text-cyan font-bold">
                  {Math.floor(progress)}%
                </span>
              </div>
              <div className="h-2 bg-black/60 border border-cyan-500/30 overflow-hidden clip-corner-sm">
                <motion.div
                  className="h-full relative"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, #00f0ff 0%, #b026ff 50%, #ff2ec4 100%)",
                    boxShadow: "0 0 12px #00f0ff",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-y-0 w-1/3 bg-white/30 animate-scroll-bar" />
                  </div>
                </motion.div>
              </div>
              <div className="flex justify-between text-[9px] md:text-[10px] font-mono text-cyan-300/40 tracking-widest">
                <span>NEURAL_LINK::OK</span>
                <span>MEM::98%</span>
                <span>GPU::READY</span>
                <span>NET::ONLINE</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
