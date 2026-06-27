"use client";

import { motion } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { PLAYER, ACHIEVEMENTS, CERTIFICATIONS } from "@/lib/player-data";
import { COLOR_HEX } from "@/lib/cyber-ui";
import { useState, useEffect } from "react";

export default function CharacterLevel() {
  const [hovered, setHovered] = useState(false);
  const [radarAngle, setRadarAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRadarAngle((a) => (a + 2) % 360), 16);
    return () => clearInterval(id);
  }, []);

  return (
    <LevelShell id="01" title="CHARACTER" codename="PLAYER DOSSIER" color="cyan">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
        {/* ============ CHARACTER CARD ============ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel clip-corner p-6 md:p-8 relative overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* BG scan effect */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          {hovered && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-32 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(0,240,255,0.15), transparent)",
              }}
            />
          )}

          {/* Character avatar / silhouette */}
          <div className="flex flex-col items-center text-center mb-6 relative z-10">
            <motion.div
              animate={{ y: hovered ? -8 : 0 }}
              transition={{ type: "spring", damping: 8 }}
              className="relative"
            >
              {/* Hexagon frame */}
              <svg width="160" height="180" viewBox="0 0 160 180" className="mx-auto">
                <polygon
                  points="80,5 155,45 155,135 80,175 5,135 5,45"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  style={{ filter: "drop-shadow(0 0 8px #00f0ff)" }}
                />
                <polygon
                  points="80,15 145,50 145,130 80,165 15,130 15,50"
                  fill="rgba(0,240,255,0.05)"
                  stroke="rgba(0,240,255,0.3)"
                  strokeWidth="1"
                />
                {/* Avatar silhouette */}
                <g transform="translate(80, 90)">
                  <circle cx="0" cy="-25" r="18" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
                  <path
                    d="M -28 30 Q -28 5 0 5 Q 28 5 28 30"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="1.5"
                  />
                  {/* Internal grid lines */}
                  <line x1="-30" y1="-30" x2="30" y2="-30" stroke="rgba(0,240,255,0.3)" strokeWidth="0.5" />
                  <line x1="-30" y1="0" x2="30" y2="0" stroke="rgba(0,240,255,0.3)" strokeWidth="0.5" />
                  <line x1="-30" y1="30" x2="30" y2="30" stroke="rgba(0,240,255,0.3)" strokeWidth="0.5" />
                </g>
                {/* Corner accents */}
                <text x="80" y="195" textAnchor="middle" fill="#00f0ff" fontSize="9" fontFamily="monospace" letterSpacing="2">
                  ID::0xAM001
                </text>
              </svg>
              {/* Scanning line */}
              {hovered && (
                <motion.div
                  initial={{ top: "10%" }}
                  animate={{ top: "85%" }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute left-1/2 -translate-x-1/2 w-[140px] h-0.5 bg-cyan-400"
                  style={{ boxShadow: "0 0 8px #00f0ff" }}
                />
              )}
            </motion.div>

            <div
              className="text-2xl md:text-4xl font-black neon-text-cyan mt-4 tracking-wider"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              {PLAYER.name}
            </div>
            <div className="text-xs font-mono text-purple-300/80 tracking-[0.3em] mt-1">
              {PLAYER.class}
            </div>
          </div>

          {/* Stat rows */}
          <div className="space-y-2.5 relative z-10">
            <StatRow label="NAME" value={PLAYER.name} color="#00f0ff" delay={0.4} />
            <StatRow label="LEVEL" value={String(PLAYER.level)} color="#ff6a00" delay={0.5} />
            <StatRow label="CLASS" value={PLAYER.class} color="#b026ff" delay={0.6} />
            <StatRow label="XP" value={`${PLAYER.xp.toLocaleString()}+`} color="#00ff9c" delay={0.7} />
            <StatRow label="LOCATION" value={PLAYER.location} color="#ff2ec4" delay={0.8} />
            <StatRow label="STATUS" value={PLAYER.status} color="#00ff9c" delay={0.9} />
            <div
              className="pt-3 mt-3 border-t border-cyan-500/20"
            >
              <div className="text-[10px] font-mono text-cyan-300/50 tracking-widest mb-1">
                MISSION
              </div>
              <div className="text-sm font-mono text-cyan-200/90">
                {PLAYER.mission}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ RIGHT: RADAR + BADGES ============ */}
        <div className="space-y-6">
          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel-purple clip-corner p-5"
          >
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-3">
              ▸ PLAYER RADAR
            </div>
            <div className="relative w-full aspect-square max-w-[260px] mx-auto">
              <Radar angle={radarAngle} />
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel clip-corner p-5"
          >
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-3">
              ▸ UNLOCKED BADGES
            </div>
            <div className="grid grid-cols-3 gap-2">
              {ACHIEVEMENTS.slice(0, 6).map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="aspect-square glass-panel clip-corner-sm flex flex-col items-center justify-center p-2 cursor-pointer magnetic"
                  style={{ borderColor: "rgba(0,240,255,0.4)" }}
                  title={a.name}
                >
                  <div className="text-2xl mb-0.5">{a.icon}</div>
                  <div className="text-[7px] font-mono text-cyan-300/70 text-center leading-tight">
                    {a.name.split(" ")[0].toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vital Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-panel-purple clip-corner p-5"
          >
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-3">
              ▸ VITAL STATS
            </div>
            <div className="space-y-2.5">
              <VitalBar label="HEALTH" value={PLAYER.hp} max={100} color="#00ff9c" />
              <VitalBar label="ENERGY" value={PLAYER.energy} max={100} color="#00f0ff" />
              <VitalBar label="FOCUS" value={92} max={100} color="#b026ff" />
              <VitalBar label="CREATIVITY" value={95} max={100} color="#ff2ec4" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ CERTIFICATIONS SECTION (full width) ============ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 glass-panel clip-corner p-5 md:p-7 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60">
              ▸ CERTIFICATIONS // LINKEDIN VERIFIED
            </div>
            <div
              className="text-xl md:text-2xl font-bold neon-text-orange tracking-wide"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              ACHIEVEMENT LOG
            </div>
          </div>
          <div className="text-[10px] font-mono text-orange-300/60 tracking-widest">
            {CERTIFICATIONS.length} CERTIFICATIONS EARNED
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CERTIFICATIONS.map((cert, i) => {
            const c = COLOR_HEX[cert.color];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="group relative glass-panel-purple clip-corner-sm p-4 cursor-pointer magnetic overflow-hidden"
                style={{ borderColor: `${c}55` }}
              >
                {/* Hover glow */}
                <div
                  className="absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }}
                />
                <div className="flex items-start gap-3 relative">
                  <div
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center clip-corner-sm text-lg font-bold"
                    style={{
                      background: `${c}22`,
                      border: `1px solid ${c}55`,
                      color: c,
                      boxShadow: `0 0 8px ${c}33`,
                    }}
                  >
                    ✓
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[9px] font-mono px-1.5 py-0.5 clip-tag inline-block mb-1"
                      style={{ background: `${c}22`, color: c, borderLeft: `2px solid ${c}` }}
                    >
                      {cert.category} · {cert.date}
                    </div>
                    <div
                      className="text-sm font-mono font-bold leading-tight"
                      style={{ color: "#e8f0ff" }}
                    >
                      {cert.name}
                    </div>
                    <div className="text-[10px] font-mono text-cyan-300/50 mt-1 truncate">
                      {cert.issuer}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </LevelShell>
  );
}

function StatRow({ label, value, color, delay }: { label: string; value: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between border-b border-cyan-500/10 pb-1.5"
    >
      <span className="text-[10px] font-mono text-cyan-300/50 tracking-widest">
        {label}
      </span>
      <span
        className="text-sm font-mono font-bold tracking-wide"
        style={{ color, textShadow: `0 0 8px ${color}66` }}
      >
        {value}
      </span>
    </motion.div>
  );
}

function VitalBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[10px] font-mono mb-1">
        <span className="text-cyan-300/60 tracking-widest">{label}</span>
        <span style={{ color }}>{value}/{max}</span>
      </div>
      <div className="h-2 bg-black/60 border border-white/10 overflow-hidden clip-corner-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-full relative"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 w-1/3 bg-white/30 animate-scroll-bar" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Radar({ angle }: { angle: number }) {
  // Radar stats (multi-axis)
  const axes = [
    { label: "AI", value: 0.95, angle: 0 },
    { label: "ML", value: 0.9, angle: 60 },
    { label: "WEB", value: 0.85, angle: 120 },
    { label: "DATA", value: 0.92, angle: 180 },
    { label: "DEV", value: 0.88, angle: 240 },
    { label: "PROB", value: 0.98, angle: 300 },
  ];
  const radius = 100;
  const center = 110;

  // Polygon points
  const points = axes
    .map((a) => {
      const rad = ((a.angle - 90) * Math.PI) / 180;
      const r = radius * a.value;
      return `${center + r * Math.cos(rad)},${center + r * Math.sin(rad)}`;
    })
    .join(" ");

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox="0 0 220 220" className="w-full h-full">
      <defs>
        <radialGradient id="radarGlow">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sweepGrad">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <circle cx={center} cy={center} r={radius} fill="url(#radarGlow)" />

      {/* Grid rings */}
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={radius * r}
          fill="none"
          stroke="rgba(0,240,255,0.2)"
          strokeWidth="1"
        />
      ))}

      {/* Axes lines */}
      {axes.map((a, i) => {
        const rad = ((a.angle - 90) * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        return (
          <g key={i}>
            <line
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(0,240,255,0.15)"
              strokeWidth="1"
            />
            <text
              x={center + (radius + 12) * Math.cos(rad)}
              y={center + (radius + 12) * Math.sin(rad) + 3}
              textAnchor="middle"
              fill="#00f0ff"
              fontSize="9"
              fontFamily="monospace"
              opacity="0.7"
            >
              {a.label}
            </text>
          </g>
        );
      })}

      {/* Data polygon */}
      <polygon
        points={points}
        fill="rgba(0,240,255,0.15)"
        stroke="#00f0ff"
        strokeWidth="2"
        style={{ filter: "drop-shadow(0 0 6px #00f0ff)" }}
      />

      {/* Data points */}
      {axes.map((a, i) => {
        const rad = ((a.angle - 90) * Math.PI) / 180;
        const r = radius * a.value;
        return (
          <circle
            key={i}
            cx={center + r * Math.cos(rad)}
            cy={center + r * Math.sin(rad)}
            r="3"
            fill="#ff2ec4"
            style={{ filter: "drop-shadow(0 0 4px #ff2ec4)" }}
          />
        );
      })}

      {/* Sweeping line */}
      <g style={{ transformOrigin: `${center}px ${center}px`, transform: `rotate(${angle}deg)` }}>
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - radius}
          stroke="#00f0ff"
          strokeWidth="1.5"
        />
        <path
          d={`M ${center} ${center} L ${center} ${center - radius} A ${radius} ${radius} 0 0 1 ${
            center + radius * Math.sin((60 * Math.PI) / 180)
          } ${center - radius * Math.cos((60 * Math.PI) / 180)} Z`}
          fill="url(#sweepGrad)"
        />
      </g>

      {/* Center dot */}
      <circle cx={center} cy={center} r="3" fill="#00f0ff" style={{ filter: "drop-shadow(0 0 4px #00f0ff)" }} />
    </svg>
  );
}
