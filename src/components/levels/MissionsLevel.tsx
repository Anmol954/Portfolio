"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { MISSIONS, type Mission } from "@/lib/player-data";
import { COLOR_HEX, type NeonColor } from "@/lib/cyber-ui";
import { useState } from "react";

export default function MissionsLevel() {
  const [expanded, setExpanded] = useState<string | null>("01");

  return (
    <LevelShell id="03" title="MISSIONS" codename="OPERATION ARCHIVE" color="orange">
      <div className="space-y-4">
        {MISSIONS.map((mission, i) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            index={i}
            isExpanded={expanded === mission.id}
            onToggle={() =>
              setExpanded(expanded === mission.id ? null : mission.id)
            }
          />
        ))}
      </div>
    </LevelShell>
  );
}

function MissionCard({
  mission,
  index,
  isExpanded,
  onToggle,
}: {
  mission: Mission;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const c = COLOR_HEX[mission.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="relative magnetic"
    >
      <div
        className="glass-panel clip-corner overflow-hidden transition-all duration-300"
        style={{
          borderColor: isExpanded ? c : "rgba(255, 106, 0, 0.25)",
          boxShadow: isExpanded ? `0 0 30px ${c}44` : "none",
        }}
      >
        {/* Header strip */}
        <button
          onClick={onToggle}
          className="w-full text-left p-4 md:p-6 relative"
        >
          {/* Mission ID stripe */}
          <div
            className="absolute top-0 left-0 bottom-0 w-1.5"
            style={{ background: c, boxShadow: `0 0 12px ${c}` }}
          />

          <div className="flex items-start justify-between gap-3 pl-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className="text-[10px] font-mono tracking-widest clip-tag px-2 py-0.5"
                  style={{ background: `${c}22`, color: c, borderLeft: `2px solid ${c}` }}
                >
                  MISSION {mission.id}
                </span>
                <span
                  className="text-[10px] font-mono tracking-widest"
                  style={{ color: c }}
                >
                  {mission.codename}
                </span>
                <span
                  className="text-[9px] font-mono px-2 py-0.5 clip-tag-r"
                  style={{
                    background:
                      mission.status === "COMPLETED" ? "rgba(0,255,156,0.15)" : "rgba(255,46,196,0.15)",
                    color: mission.status === "COMPLETED" ? "#00ff9c" : "#ff2ec4",
                  }}
                >
                  ● {mission.status}
                </span>
              </div>

              <h3
                className="text-xl md:text-3xl font-black tracking-wide transition-colors"
                style={{
                  color: isExpanded ? c : "#e8f0ff",
                  textShadow: isExpanded ? `0 0 12px ${c}66` : "none",
                  fontFamily: "var(--font-orbitron), monospace",
                }}
              >
                {mission.title}
              </h3>

              <div className="text-[11px] font-mono text-orange-300/60 mt-1 tracking-widest">
                TYPE: {mission.type}
              </div>
            </div>

            {/* Right side: difficulty + expand */}
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <div className="text-[9px] font-mono text-cyan-300/50 tracking-widest">
                  DIFFICULTY
                </div>
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="text-sm"
                      style={{
                        color: i < mission.difficulty ? c : "rgba(255,255,255,0.15)",
                        textShadow: i < mission.difficulty ? `0 0 6px ${c}` : "none",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                className="text-lg"
                style={{ color: c }}
              >
                ▶
              </motion.div>
            </div>
          </div>

          {/* Tech tags row */}
          <div className="flex flex-wrap gap-1.5 pl-2 mt-3">
            {mission.tech.slice(0, 6).map((t) => (
              <span
                key={t}
                className="text-[9px] md:text-[10px] font-mono px-2 py-0.5 clip-corner-sm"
                style={{
                  background: "rgba(0, 240, 255, 0.08)",
                  border: "1px solid rgba(0, 240, 255, 0.25)",
                  color: "#a0d8ff",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="p-4 md:p-6 pt-0 pl-6 md:pl-8 border-t"
                style={{ borderColor: `${c}33` }}
              >
                <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 mt-4">
                  {/* Description */}
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-2">
                      ▸ BRIEFING
                    </div>
                    <p className="text-sm font-mono text-cyan-100/85 leading-relaxed">
                      {mission.description}
                    </p>

                    {mission.accuracy && (
                      <div className="mt-4 inline-flex items-center gap-2 glass-panel-purple clip-corner-sm px-3 py-2">
                        <span className="text-[10px] font-mono text-purple-300/60 tracking-widest">
                          ACCURACY
                        </span>
                        <span
                          className="text-xl font-black neon-text-pink"
                          style={{ fontFamily: "var(--font-orbitron), monospace" }}
                        >
                          {mission.accuracy}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rewards + actions */}
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-2">
                      ▸ REWARDS
                    </div>
                    <div className="space-y-1.5 mb-4">
                      {mission.reward.map((r) => (
                        <motion.div
                          key={r}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-xs font-mono"
                        >
                          <span style={{ color: c }}>◆</span>
                          <span className="text-cyan-100/80">{r}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Tech stack */}
                    <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-2">
                      ▸ TECH STACK
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {mission.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-1 clip-corner-sm"
                          style={{
                            background: `${c}11`,
                            border: `1px solid ${c}44`,
                            color: c,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                      {mission.github && (
                        <a
                          href={mission.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[120px] text-center px-3 py-2 text-[11px] font-mono tracking-widest clip-corner-sm transition-all magnetic"
                          style={{
                            background: `${c}15`,
                            border: `1px solid ${c}66`,
                            color: c,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 15px ${c}66`;
                            e.currentTarget.style.background = `${c}25`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.background = `${c}15`;
                          }}
                        >
                          ▣ GITHUB
                        </a>
                      )}
                      {mission.demo && (
                        <a
                          href={mission.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[120px] text-center px-3 py-2 text-[11px] font-mono tracking-widest clip-corner-sm transition-all magnetic"
                          style={{
                            background: "rgba(0, 255, 156, 0.1)",
                            border: "1px solid #00ff9c66",
                            color: "#00ff9c",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = "0 0 15px #00ff9c66";
                            e.currentTarget.style.background = "rgba(0, 255, 156, 0.2)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                            e.currentTarget.style.background = "rgba(0, 255, 156, 0.1)";
                          }}
                        >
                          ▶ DEMO
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
