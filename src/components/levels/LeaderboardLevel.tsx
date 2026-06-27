"use client";

import { motion } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { LEADERBOARD, type LeaderStat } from "@/lib/player-data";
import { COLOR_HEX } from "@/lib/cyber-ui";

export default function LeaderboardLevel() {
  const max = 100;

  return (
    <LevelShell id="08" title="LEADERBOARD" codename="PLAYER STATS RANK" color="purple">
      {/* Top 3 podium */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 md:gap-6 mb-8 items-end"
      >
        {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((stat, i) => {
          const podiumRank = i === 1 ? 1 : i === 0 ? 2 : 3;
          const c = COLOR_HEX[stat.color];
          const heights = ["h-24 md:h-32", "h-36 md:h-48", "h-20 md:h-24"];
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", damping: 12 }}
              className="text-center"
            >
              {/* Trophy */}
              <div className="text-3xl md:text-5xl mb-2" style={{ filter: `drop-shadow(0 0 8px ${c})` }}>
                {podiumRank === 1 ? "🏆" : podiumRank === 2 ? "🥈" : "🥉"}
              </div>
              {/* Podium */}
              <div
                className={`${heights[i]} glass-panel clip-corner-t relative overflow-hidden flex flex-col items-center justify-end pb-3 pt-2`}
                style={{
                  borderColor: `${c}66`,
                  boxShadow: `0 0 25px ${c}44`,
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: c, boxShadow: `0 0 10px ${c}` }}
                />
                <div
                  className="text-3xl md:text-5xl font-black mb-1"
                  style={{
                    color: c,
                    textShadow: `0 0 15px ${c}`,
                    fontFamily: "var(--font-orbitron), monospace",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[9px] md:text-xs font-mono text-cyan-300/70 tracking-widest px-1">
                  {stat.name.toUpperCase()}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detailed stat bars */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-panel-purple clip-corner p-5 md:p-7"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-mono tracking-widest text-cyan-300/60">
            ▸ DETAILED STATISTICS
          </div>
          <div className="text-[10px] font-mono text-cyan-300/40 tracking-widest">
            AVG SCORE: {Math.round(LEADERBOARD.reduce((a, b) => a + b.value, 0) / LEADERBOARD.length)}
          </div>
        </div>

        <div className="space-y-4">
          {LEADERBOARD.map((stat, i) => {
            const c = COLOR_HEX[stat.color];
            return (
              <StatBarRow key={stat.name} stat={stat} index={i} color={c} max={max} />
            );
          })}
        </div>

        {/* Overall score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-6 pt-6 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3"
        >
          <div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/50">
              OVERALL PLAYER RATING
            </div>
            <div className="text-3xl md:text-4xl font-black neon-text-cyan" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
              S+ TIER
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/50">
              GLOBAL RANK
            </div>
            <div className="text-3xl md:text-4xl font-black neon-text-pink" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
              #1
            </div>
          </div>
        </motion.div>
      </motion.div>
    </LevelShell>
  );
}

function StatBarRow({
  stat,
  index,
  color,
  max,
}: {
  stat: LeaderStat;
  index: number;
  color: string;
  max: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-cyan-300/50 w-5">#{stat.rank}</span>
          <span className="text-sm font-mono font-bold" style={{ color }}>
            {stat.name}
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className="text-xl font-black"
            style={{ color, textShadow: `0 0 8px ${color}66`, fontFamily: "var(--font-orbitron), monospace" }}
          >
            {stat.value}
          </span>
          <span className="text-[10px] font-mono text-cyan-300/40">/{max}</span>
        </div>
      </div>
      <div className="h-2.5 bg-black/60 border border-white/10 overflow-hidden clip-corner-sm relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(stat.value / max) * 100}%` }}
          transition={{ delay: 0.8 + index * 0.15, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 10px ${color}`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 w-1/3 bg-white/30 animate-scroll-bar" />
          </div>
        </motion.div>
        {/* Tick marks */}
        <div className="absolute inset-0 flex pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r border-black/40 last:border-r-0"
              style={{ width: "10%" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
