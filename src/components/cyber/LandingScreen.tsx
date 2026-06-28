"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/lib/game-store";
import { PLAYER } from "@/lib/player-data";
import { Sound } from "@/lib/sound-engine";

export default function LandingScreen() {
  const goToMenu = useGame((s) => s.goToMenu);
  const [titleInView, setTitleInView] = useState(false);
  const [showPress, setShowPress] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTitleInView(true), 100);
    const t2 = setTimeout(() => setShowPress(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Press Enter to start
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        Sound.play("menu_confirm");
        goToMenu();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToMenu]);

  // Auto-advance after some time as fallback
  useEffect(() => {
    const t = setTimeout(() => {
      // Don't auto-advance — let user press enter for the experience
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  const titleLetters = PLAYER.name.split("");

  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      {/* Top HUD bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] md:text-xs font-mono tracking-widest"
      >
        <div className="flex items-center gap-3">
          <span className="neon-text-cyan">● REC</span>
          <span className="text-cyan-300/50">CYBER_DECK::v2.026</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-300/50">LAT 28.6°N</span>
          <span className="text-cyan-300/50">LON 77.2°E</span>
          <span className="neon-text-green animate-pulse-glow">● ONLINE</span>
        </div>
      </motion.div>

      {/* Corner brackets */}
      <CornerBrackets />

      {/* Main title */}
      <div className="text-center mb-12 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm font-mono tracking-[0.5em] text-cyan-300/70 mb-4"
        >
          ▶ PLAYER PROFILE DETECTED
        </motion.div>

        {/* Title letters */}
        <div
          className="flex justify-center flex-wrap gap-x-1 gap-y-0 mb-2"
          style={{ fontFamily: "var(--font-orbitron), monospace" }}
        >
          {titleLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80, rotateX: -90 }}
              animate={titleInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                delay: 0.5 + i * 0.08,
                type: "spring",
                damping: 12,
                stiffness: 100,
              }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black neon-text-cyan tracking-tight inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto w-3/4 md:w-full"
        />

        {/* Role rotator */}
        <div className="h-10 mt-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={Math.floor(Date.now() / 2000) % 3}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm md:text-xl font-mono tracking-[0.3em] neon-text-purple"
            >
              {PLAYER.roles[Math.floor(Date.now() / 2000) % 3]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 text-[10px] md:text-xs font-mono"
      >
        {[
          { label: "LEVEL", value: "22", color: "cyan" as const },
          { label: "XP", value: "15,000+", color: "purple" as const },
          { label: "CLASS", value: "DATA // AI", color: "orange" as const },
          { label: "REPOS", value: "19", color: "green" as const },
          { label: "CONTRIB", value: "137 / YR", color: "pink" as const },
        ].map((stat, i) => (
          <div
            key={i}
            className="glass-panel clip-corner-sm px-3 py-2 md:px-5 md:py-3"
          >
            <div className="text-cyan-300/50 tracking-widest text-[9px] md:text-[10px]">
              {stat.label}
            </div>
            <div
              className={`neon-text-${stat.color} font-bold text-sm md:text-base mt-0.5`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Press Enter to Start */}
      <AnimatePresence>
        {showPress && (
          <motion.button
            onClick={() => { Sound.play("menu_confirm"); goToMenu(); }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative magnetic"
          >
            <div className="glass-panel-purple clip-corner px-8 py-4 md:px-14 md:py-6 relative overflow-hidden">
              {/* Animated ambient shimmer — smooth, no glitch */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent skew-x-12 animate-shimmer" />
              </div>
              <div
                className="text-2xl md:text-4xl font-black tracking-[0.2em] neon-text-pink animate-pulse-glow"
                style={{ fontFamily: "var(--font-orbitron), monospace" }}
              >
                PRESS ENTER TO START
              </div>
              <div className="text-[10px] md:text-xs text-pink-300/60 mt-1 tracking-[0.3em] font-mono">
                ▶ CLICK OR HIT [ENTER]
              </div>
            </div>
            {/* Outer animated glow ring */}
            <motion.div
              className="absolute -inset-2 border border-pink-500/30 clip-corner pointer-events-none"
              animate={{ borderColor: ["rgba(255,46,196,0.3)", "rgba(255,46,196,0.7)", "rgba(255,46,196,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-mono text-cyan-300/40 tracking-widest text-center"
      >
        <div>MISSION: HIRE THE PLAYER</div>
        <div className="mt-1 text-pink-300/40">
          HINT: TRY THE KONAMI CODE LATER ↑↑↓↓←→←→BA
        </div>
      </motion.div>
    </motion.div>
  );
}

function CornerBrackets() {
  const corners = [
    "top-4 left-4 border-t-2 border-l-2",
    "top-4 right-4 border-t-2 border-r-2",
    "bottom-4 left-4 border-b-2 border-l-2",
    "bottom-4 right-4 border-b-2 border-r-2",
  ];
  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className={`fixed w-8 h-8 md:w-12 md:h-12 border-cyan-400/60 ${c} z-30 pointer-events-none`}
        />
      ))}
    </>
  );
}
