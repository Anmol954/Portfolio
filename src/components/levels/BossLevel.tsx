"use client";

import { motion } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { BOSS } from "@/lib/player-data";

export default function BossLevel() {
  return (
    <LevelShell id="BOSS" title="BOSS FIGHT" codename="DEFEATED FOES" color="orange">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* Boss portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel-purple clip-corner p-6 relative overflow-hidden"
          style={{ borderColor: "rgba(255, 106, 0, 0.5)" }}
        >
          <div className="absolute inset-0 bg-grid opacity-20" />

          {/* Boss figure */}
          <div className="relative flex flex-col items-center mb-6">
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <svg width="180" height="200" viewBox="0 0 180 200">
                <defs>
                  <radialGradient id="bossGlow">
                    <stop offset="0%" stopColor="#ff6a00" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="90" cy="100" r="90" fill="url(#bossGlow)" />

                {/* Skull-like shape */}
                <polygon
                  points="90,15 130,40 140,80 130,120 110,150 90,160 70,150 50,120 40,80 50,40"
                  fill="rgba(255, 106, 0, 0.1)"
                  stroke="#ff6a00"
                  strokeWidth="2"
                  style={{ filter: "drop-shadow(0 0 8px #ff6a00)" }}
                />
                {/* Eyes */}
                <ellipse cx="70" cy="80" rx="10" ry="14" fill="#ff2ec4" style={{ filter: "drop-shadow(0 0 6px #ff2ec4)" }} />
                <ellipse cx="110" cy="80" rx="10" ry="14" fill="#ff2ec4" style={{ filter: "drop-shadow(0 0 6px #ff2ec4)" }} />
                {/* Mouth */}
                <path
                  d="M 60 120 Q 90 140 120 120"
                  fill="none"
                  stroke="#ff6a00"
                  strokeWidth="2"
                />
                <line x1="70" y1="120" x2="70" y2="135" stroke="#ff6a00" strokeWidth="1.5" />
                <line x1="85" y1="125" x2="85" y2="140" stroke="#ff6a00" strokeWidth="1.5" />
                <line x1="95" y1="125" x2="95" y2="140" stroke="#ff6a00" strokeWidth="1.5" />
                <line x1="110" y1="120" x2="110" y2="135" stroke="#ff6a00" strokeWidth="1.5" />

                <text x="90" y="190" textAnchor="middle" fill="#ff6a00" fontSize="10" fontFamily="monospace" letterSpacing="3">
                  BOSS-01
                </text>
              </svg>
            </motion.div>

            <div
              className="text-2xl md:text-4xl font-black neon-text-orange mt-2 tracking-wider text-center"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              {BOSS.name}
            </div>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 clip-corner-sm" style={{ background: "rgba(0,255,156,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono neon-text-green tracking-widest">
                {BOSS.status}
              </span>
            </div>
          </div>

          {/* HP bar (empty) */}
          <div>
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-orange-300/70 tracking-widest">BOSS HP</span>
              <span className="neon-text-green">0 / 100</span>
            </div>
            <div className="h-3 bg-black/60 border border-orange-500/40 overflow-hidden clip-corner-sm">
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="h-full"
                style={{
                  background: "linear-gradient(90deg, #ff6a00, #ff2ec4)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Boss details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="glass-panel clip-corner p-5">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-2">
              ▸ BOSS DOSSIER
            </div>
            <p className="text-sm font-mono text-cyan-100/85 leading-relaxed">
              {BOSS.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <DetailCard label="WEAPON USED" value={BOSS.weapon} color="#00f0ff" icon="⚔" delay={0.4} />
            <DetailCard label="POWER" value={BOSS.power} color="#b026ff" icon="⚡" delay={0.5} />
            <DetailCard label="SPECIAL ABILITY" value={BOSS.special} color="#ff2ec4" icon="✦" delay={0.6} />
            <DetailCard label="WEAKNESS" value={BOSS.weakness} color="#ff6a00" icon="◈" delay={0.7} />
          </div>

          {/* Drops */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-panel-purple clip-corner p-5"
            style={{ borderColor: "rgba(255, 46, 196, 0.4)" }}
          >
            <div className="text-[10px] font-mono tracking-widest text-pink-300/70 mb-3">
              ▸ LEGENDARY DROPS
            </div>
            <div className="flex flex-wrap gap-2">
              {["SELF-BELIEF", "GROWTH MINDSET", "RESILIENCE +5", "WISDOM +3"].map((drop, i) => (
                <motion.span
                  key={drop}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="text-[11px] font-mono px-3 py-1.5 clip-corner-sm"
                  style={{
                    background: "rgba(255, 46, 196, 0.15)",
                    border: "1px solid #ff2ec466",
                    color: "#ff2ec4",
                    textShadow: "0 0 8px #ff2ec4",
                  }}
                >
                  ◆ {drop}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-6 glass-panel clip-corner p-5 text-center"
      >
        <div className="text-[10px] font-mono tracking-widest text-cyan-300/50 mb-2">
          ▸ VICTORY QUOTE
        </div>
        <div className="text-base md:text-xl font-mono neon-text-cyan italic">
          "You don't defeat doubt by being talented. You defeat it by showing up — every single day."
        </div>
        <div className="text-[10px] font-mono text-purple-300/60 mt-2 tracking-widest">
          — ANMOL MADHAV, AFTER DEFEATING IMPOSTER SYNDROME
        </div>
      </motion.div>
    </LevelShell>
  );
}

function DetailCard({
  label,
  value,
  color,
  icon,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="glass-panel clip-corner p-4"
      style={{ borderColor: `${color}55` }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg" style={{ color }}>
          {icon}
        </span>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: `${color}99` }}>
          {label}
        </span>
      </div>
      <div className="text-sm font-mono font-bold" style={{ color, textShadow: `0 0 8px ${color}55` }}>
        {value}
      </div>
    </motion.div>
  );
}
