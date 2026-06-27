"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGame, openLevelWithTransition } from "@/lib/game-store";
import { MENU_ITEMS, PLAYER } from "@/lib/player-data";
import { COLOR_HEX } from "@/lib/cyber-ui";
import { useState, useEffect } from "react";

export default function MainMenu() {
  const konami = useGame((s) => s.konamiUnlocked);
  const [selected, setSelected] = useState<string | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-US", { hour12: false }) +
          " :: " +
          d.toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short" })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen z-10 px-4 py-6 md:py-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.6 }}
    >
      {/* Top status bar */}
      <div className="flex items-center justify-between mb-6 md:mb-10 text-[10px] md:text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="glass-panel clip-corner-sm px-3 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
            <span className="neon-text-green tracking-widest">CONNECTED</span>
          </div>
          <div className="hidden md:block text-cyan-300/50 tracking-widest">
            SESSION_ID::0x{Math.random().toString(16).slice(2, 10).toUpperCase()}
          </div>
        </div>
        <div className="text-cyan-300/60 tracking-widest">{time}</div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 md:gap-10 max-w-6xl mx-auto">
        {/* ============ LEFT: PLAYER CARD ============ */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="glass-panel clip-corner p-5 md:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-300/60">
                ▶ PLAYER PROFILE
              </span>
              <span className="text-[10px] font-mono text-purple-300/50 tracking-widest ml-auto">
                @{PLAYER.handle}
              </span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-black neon-text-cyan tracking-tight"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              ANMOL
              <br />
              MADHAV
            </h1>
            <div className="text-xs font-mono text-purple-300/80 mt-2 tracking-[0.25em]">
              {PLAYER.class}
            </div>

            {/* Level + XP bar */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="neon-text-orange">LEVEL {PLAYER.level}</span>
                <span className="text-cyan-300/60">{PLAYER.xp.toLocaleString()} XP</span>
              </div>
              <div className="h-2 bg-black/60 border border-cyan-500/30 overflow-hidden clip-corner-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="h-full relative"
                  style={{
                    background:
                      "linear-gradient(90deg, #ff6a00, #ff2ec4, #b026ff)",
                    boxShadow: "0 0 10px #ff6a00",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-y-0 w-1/3 bg-white/30 animate-scroll-bar" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* GitHub stats row */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="glass-panel-purple clip-corner-sm py-1.5 px-2">
                <div className="text-[9px] font-mono text-cyan-300/50 tracking-widest">REPOS</div>
                <div className="text-sm font-mono font-bold neon-text-green">{PLAYER.githubStats.repos}</div>
              </div>
              <div className="glass-panel-purple clip-corner-sm py-1.5 px-2">
                <div className="text-[9px] font-mono text-cyan-300/50 tracking-widest">CONTRIB</div>
                <div className="text-sm font-mono font-bold neon-text-orange">{PLAYER.githubStats.contributions}</div>
              </div>
              <div className="glass-panel-purple clip-corner-sm py-1.5 px-2">
                <div className="text-[9px] font-mono text-cyan-300/50 tracking-widest">BADGES</div>
                <div className="text-sm font-mono font-bold neon-text-purple">{PLAYER.githubStats.achievements.length}</div>
              </div>
            </div>

            {/* Mission text */}
            <div className="mt-4 pt-4 border-t border-cyan-500/20">
              <div className="text-[10px] font-mono text-cyan-300/50 tracking-widest mb-1">
                ACTIVE MISSION
              </div>
              <div className="text-sm font-mono text-cyan-200/90">
                {PLAYER.mission}
              </div>
            </div>

            {/* Vitals */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <VitalBar label="HP" value={PLAYER.hp} color="#00ff9c" />
              <VitalBar label="ENERGY" value={PLAYER.energy} color="#00f0ff" />
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-4 gap-2">
            <QuickLink label="GITHUB" href="https://github.com/Anmol954" color="cyan" />
            <QuickLink label="LINKEDIN" href="https://www.linkedin.com/in/anmol-madhav/" color="purple" />
            <QuickLink label="INSTA" href="https://www.instagram.com/anmol_madhav/" color="pink" />
            <QuickLink label="EMAIL" href="mailto:anmolmadhav2004@gmail.com" color="orange" />
          </div>

          {konami && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel-purple clip-corner p-3 border-pink-500/40"
            >
              <div className="text-[10px] font-mono neon-text-pink tracking-widest">
                ⚠ KONAMI MODE: UNLOCKED
              </div>
              <div className="text-xs font-mono text-pink-200/70 mt-1">
                Secret room accessed. Look around the achievements page...
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* ============ RIGHT: MENU GRID ============ */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-300/60">
              ▶ MAIN MENU
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
            {MENU_ITEMS.map((item, i) => {
              const color = COLOR_HEX[item.color];
              const isSel = selected === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  onMouseEnter={() => setSelected(item.id)}
                  onMouseLeave={() => setSelected(null)}
                  onClick={() => openLevelWithTransition(item.id as never)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative magnetic text-left"
                >
                  <div
                    className="glass-panel clip-corner p-4 md:p-5 relative overflow-hidden transition-all duration-300"
                    style={{
                      borderColor: isSel ? color : "rgba(0, 240, 255, 0.25)",
                      boxShadow: isSel
                        ? `0 0 20px ${color}55, inset 0 0 20px ${color}15`
                        : "0 0 0 transparent",
                    }}
                  >
                    {/* Glow blob */}
                    <div
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                      style={{ background: color }}
                    />
                    {/* Number badge */}
                    <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-300/40 tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        className="text-2xl md:text-3xl font-mono transition-all duration-300 group-hover:scale-110"
                        style={{
                          color,
                          textShadow: `0 0 12px ${color}`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-base md:text-lg font-bold tracking-wider transition-colors"
                          style={{
                            color: isSel ? color : "#e8f0ff",
                            fontFamily: "var(--font-orbitron), monospace",
                          }}
                        >
                          {item.label}
                        </div>
                        <div className="text-[11px] font-mono text-cyan-300/50 mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    {/* Hover arrow */}
                    <div
                      className="absolute bottom-3 right-3 text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                      style={{ color }}
                    >
                      ▶▶
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Exit hint */}
          <div className="mt-6 text-center text-[10px] font-mono text-cyan-300/40 tracking-widest">
            EXIT? THERE IS NO EXIT. ONLY HIGHER LEVELS.
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function VitalBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[9px] font-mono mb-1">
        <span className="text-cyan-300/60 tracking-widest">{label}</span>
        <span style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 bg-black/60 border border-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  );
}

function QuickLink({ label, href, color }: { label: string; href: string; color: "cyan" | "purple" | "orange" | "pink" }) {
  const colorMap = { cyan: "#00f0ff", purple: "#b026ff", orange: "#ff6a00", pink: "#ff2ec4" };
  const c = colorMap[color];
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="glass-panel clip-corner-sm p-3 text-center font-mono text-[10px] tracking-widest transition-all hover:scale-105 magnetic"
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
      {label}
    </a>
  );
}
