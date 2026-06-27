"use client";

import { motion } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { TIMELINE, type TimelineEvent } from "@/lib/player-data";
import { COLOR_HEX } from "@/lib/cyber-ui";

export default function TimelineLevel() {
  return (
    <LevelShell id="06" title="XP TIMELINE" codename="CAREER JOURNEY" color="cyan">
      <div className="glass-panel-purple clip-corner p-5 md:p-8 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-1">
              ▸ XP JOURNEY
            </div>
            <div className="text-2xl md:text-3xl font-black neon-text-cyan" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
              2022 → 2026
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-cyan-300/60 tracking-widest">
              TOTAL XP GAINED
            </div>
            <div className="text-xl font-black neon-text-orange" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
              +15,000 XP
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Central line */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2"
          style={{
            background: "linear-gradient(180deg, #00ff9c, #00f0ff, #b026ff, #ff6a00, #ff2ec4)",
            boxShadow: "0 0 12px rgba(0, 240, 255, 0.5)",
          }}
        />

        <div className="space-y-8 md:space-y-12">
          {TIMELINE.map((event, i) => {
            const c = COLOR_HEX[event.color];
            const isOdd = i % 2 === 1;
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: isOdd ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, type: "spring", damping: 15 }}
                className={`relative flex items-center gap-4 md:gap-8 ${
                  isOdd ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Node marker */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", damping: 8 }}
                    className="w-5 h-5 rounded-full relative"
                    style={{
                      background: c,
                      boxShadow: `0 0 15px ${c}, 0 0 30px ${c}88`,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: c }}
                    />
                  </motion.div>
                </div>

                {/* Spacer for desktop alternating */}
                <div className="hidden md:block flex-1" />

                {/* Content card */}
                <div className="ml-12 md:ml-0 flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-panel clip-corner p-5 relative overflow-hidden"
                    style={{
                      borderColor: `${c}55`,
                      boxShadow: `0 0 20px ${c}22`,
                    }}
                  >
                    {/* Glow blob */}
                    <div
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30"
                      style={{ background: c }}
                    />

                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div
                          className="text-3xl md:text-4xl font-black tracking-tight"
                          style={{
                            color: c,
                            textShadow: `0 0 15px ${c}88`,
                            fontFamily: "var(--font-orbitron), monospace",
                          }}
                        >
                          {event.year}
                        </div>
                        <div
                          className="text-base md:text-lg font-bold font-mono mt-1"
                          style={{ color: c }}
                        >
                          {event.title}
                        </div>
                      </div>
                      <div
                        className="text-[10px] md:text-xs font-mono px-2 py-1 clip-tag font-bold whitespace-nowrap"
                        style={{ background: `${c}22`, color: c, borderLeft: `2px solid ${c}` }}
                      >
                        {event.xp}
                      </div>
                    </div>

                    <p className="text-sm font-mono text-cyan-100/85 leading-relaxed mt-2">
                      {event.desc}
                    </p>

                    {/* Year progress */}
                    <div className="mt-3 pt-3 border-t border-cyan-500/10">
                      <div className="flex items-center gap-2 text-[9px] font-mono text-cyan-300/40 tracking-widest">
                        <span>PROGRESS</span>
                        <div className="flex-1 h-1 bg-black/40 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${((i + 1) / TIMELINE.length) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-full"
                            style={{ background: c, boxShadow: `0 0 6px ${c}` }}
                          />
                        </div>
                        <span>{Math.round(((i + 1) / TIMELINE.length) * 100)}%</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative ml-6 md:ml-0 mt-8 flex justify-center"
        >
          <div className="text-center">
            <div className="inline-block px-4 py-2 glass-panel-purple clip-corner">
              <div className="text-[10px] font-mono neon-text-pink tracking-widest mb-1">
                ▶ CURRENT MISSION
              </div>
              <div className="text-sm md:text-base font-mono neon-text-cyan">
                LOOKING FOR NEW MISSIONS
              </div>
              <div className="text-[10px] font-mono text-cyan-300/60 mt-1">
                HIRE THE PLAYER TO CONTINUE
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </LevelShell>
  );
}
