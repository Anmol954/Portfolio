"use client";

import { motion } from "framer-motion";
import { openLevelWithTransition, useGame } from "@/lib/game-store";
import { COLOR_HEX, type NeonColor } from "@/lib/cyber-ui";
import type { ReactNode } from "react";

export function LevelShell({
  id,
  title,
  codename,
  color = "cyan",
  children,
}: {
  id: string;
  title: string;
  codename?: string;
  color?: NeonColor;
  children: ReactNode;
}) {
  const c = COLOR_HEX[color];

  return (
    <motion.div
      className="relative z-10 min-h-screen px-4 py-6 md:py-10"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.04, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <motion.button
            onClick={() => openLevelWithTransition(null as never)}
            whileHover={{ x: -4 }}
            className="glass-panel clip-corner-sm px-3 py-2 font-mono text-[10px] md:text-xs tracking-widest magnetic flex items-center gap-2 transition-all"
            style={{ borderColor: `${c}55` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 15px ${c}66`;
              e.currentTarget.style.color = c;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.color = "#e8f0ff";
            }}
          >
            ◀ BACK TO MENU
          </motion.button>

          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-cyan-300/40 tracking-widest">LEVEL</span>
            <span className="neon-text-cyan font-bold tracking-widest">
              {id}
            </span>
          </div>
        </div>

        {/* Title block */}
        <div className="mt-5 md:mt-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[10px] md:text-xs font-mono tracking-[0.4em] text-cyan-300/60 mb-2"
          >
            ▶ {codename || "MISSION BRIEFING"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black tracking-tight"
            style={{
              color: c,
              textShadow: `0 0 20px ${c}88, 0 0 40px ${c}44`,
              fontFamily: "var(--font-orbitron), monospace",
            }}
          >
            {title}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-px mt-3 origin-left"
            style={{
              background: `linear-gradient(90deg, ${c}, transparent)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.div>
  );
}

// Section heading for inside a level
export function LevelSection({
  title,
  color = "cyan",
  children,
}: {
  title: string;
  color?: NeonColor;
  children: ReactNode;
}) {
  const c = COLOR_HEX[color];
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-[10px] font-mono tracking-widest" style={{ color: c }}>
          ▸ {title}
        </div>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(90deg, ${c}66, transparent)`,
          }}
        />
      </div>
      {children}
    </div>
  );
}
