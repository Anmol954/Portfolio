"use client";

import { motion } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { ACHIEVEMENTS, type Achievement } from "@/lib/player-data";
import { useState } from "react";

const RARITY_COLOR: Record<Achievement["rarity"], string> = {
  COMMON: "#00ff9c",
  RARE: "#00f0ff",
  EPIC: "#b026ff",
  LEGENDARY: "#ff6a00",
};

export default function AchievementsLevel() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <LevelShell id="04" title="ACHIEVEMENTS" codename="UNLOCKED TROPHIES" color="green">
      {/* Header stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-purple clip-corner p-4 mb-6 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono text-cyan-300/60 tracking-widest">
              UNLOCKED
            </div>
            <div className="text-2xl font-black neon-text-green" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
              {ACHIEVEMENTS.length}/{ACHIEVEMENTS.length}
            </div>
          </div>
          <div className="h-10 w-px bg-cyan-500/30" />
          <div>
            <div className="text-[10px] font-mono text-cyan-300/60 tracking-widest">
              COMPLETION
            </div>
            <div className="text-2xl font-black neon-text-cyan" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
              100%
            </div>
          </div>
          <div className="h-10 w-px bg-cyan-500/30" />
          <div>
            <div className="text-[10px] font-mono text-cyan-300/60 tracking-widest">
              RAREST
            </div>
            <div className="text-sm font-mono neon-text-orange">LEGENDARY</div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-cyan-300/40 tracking-widest">
          STEAM-STYLE UNLOCKS
        </div>
      </motion.div>

      {/* Achievement grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACHIEVEMENTS.map((a, i) => {
          const c = RARITY_COLOR[a.rarity];
          const isHovered = hovered === a.id;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.7, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.1 * i, type: "spring", damping: 12 }}
              whileHover={{ scale: 1.04, y: -5 }}
              onMouseEnter={() => setHovered(a.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative magnetic cursor-pointer group"
              style={{ perspective: 1000 }}
            >
              <div
                className="glass-panel clip-corner p-5 relative overflow-hidden h-full transition-all duration-300"
                style={{
                  borderColor: isHovered ? c : "rgba(0, 255, 156, 0.25)",
                  boxShadow: isHovered ? `0 0 25px ${c}77, inset 0 0 25px ${c}22` : "none",
                }}
              >
                {/* Rarity stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: c, boxShadow: `0 0 10px ${c}` }}
                />

                {/* Hover glow */}
                <div
                  className="absolute -inset-10 opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${c}, transparent 70%)`,
                  }}
                />

                <div className="flex items-start gap-3">
                  {/* Trophy icon */}
                  <motion.div
                    animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl flex-shrink-0"
                    style={{ filter: `drop-shadow(0 0 10px ${c})` }}
                  >
                    {a.icon}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="text-[9px] font-mono px-1.5 py-0.5 clip-tag"
                        style={{
                          background: `${c}22`,
                          color: c,
                          borderLeft: `2px solid ${c}`,
                        }}
                      >
                        {a.rarity}
                      </span>
                      <span className="text-[9px] font-mono text-cyan-300/40">
                        {a.date}
                      </span>
                    </div>
                    <div
                      className="text-sm md:text-base font-bold font-mono mb-1 truncate"
                      style={{
                        color: isHovered ? c : "#e8f0ff",
                        textShadow: isHovered ? `0 0 8px ${c}` : "none",
                      }}
                    >
                      {a.name}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-100/70 leading-snug">
                      {a.description}
                    </div>
                  </div>
                </div>

                {/* Bottom status bar */}
                <div className="mt-3 pt-3 border-t border-cyan-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: c, boxShadow: `0 0 6px ${c}` }}
                    />
                    <span className="text-[9px] font-mono tracking-widest" style={{ color: c }}>
                      UNLOCKED
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-cyan-300/40 tracking-widest">
                    {a.id.toUpperCase()}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Locked placeholder slot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 glass-panel clip-corner p-5 text-center border-dashed"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <div className="text-3xl mb-1 opacity-30">🔒</div>
        <div className="text-xs font-mono text-cyan-300/40 tracking-widest">
          ??? — ACHIEVEMENT LOCKED
        </div>
        <div className="text-[10px] font-mono text-cyan-300/30 mt-1">
          COMPLETE THE NEXT MISSION TO UNLOCK
        </div>
      </motion.div>
    </LevelShell>
  );
}
