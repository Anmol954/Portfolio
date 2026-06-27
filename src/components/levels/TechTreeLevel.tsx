"use client";

import { motion } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { TECH_TREE, type TreeNode } from "@/lib/player-data";
import { useState } from "react";

export default function TechTreeLevel() {
  const [selected, setSelected] = useState<TreeNode>(TECH_TREE[0]);

  return (
    <LevelShell id="05" title="TECH TREE" codename="SKILL EVOLUTION" color="pink">
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        {/* ============ Tree visualization ============ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel-purple clip-corner p-5 md:p-8 relative overflow-hidden"
        >
          <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-6">
            ▸ EVOLUTION PATH
          </div>

          {/* Vertical tree */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-0.5"
              style={{
                background: "linear-gradient(180deg, #00ff9c, #00f0ff, #b026ff, #ff2ec4, #ff6a00, #ff2ec4)",
                boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
              }}
            />

            <div className="space-y-6 relative">
              {TECH_TREE.map((node, i) => {
                const c = ["#00ff9c", "#00f0ff", "#b026ff", "#ff2ec4", "#ff6a00", "#ff2ec4"][i];
                const isSel = selected.id === node.id;
                const isOdd = i % 2 === 1;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring", damping: 10 }}
                    className={`flex items-center gap-4 ${isOdd ? "flex-row-reverse" : ""}`}
                  >
                    {/* Node */}
                    <button
                      onClick={() => setSelected(node)}
                      className="flex-shrink-0 relative group"
                    >
                      <motion.div
                        animate={isSel ? { scale: 1.15 } : { scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        {/* Outer ring */}
                        <div
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-mono font-black text-lg md:text-xl magnetic transition-all"
                          style={{
                            background: isSel ? `${c}33` : "rgba(8, 6, 30, 0.7)",
                            border: `2px solid ${c}`,
                            color: c,
                            boxShadow: isSel ? `0 0 25px ${c}, inset 0 0 15px ${c}44` : `0 0 10px ${c}55`,
                            textShadow: `0 0 8px ${c}`,
                          }}
                        >
                          {i + 1}
                        </div>
                        {/* Level badge */}
                        <div
                          className="absolute -top-2 -right-2 text-[8px] font-mono px-1.5 py-0.5 clip-tag"
                          style={{ background: c, color: "#03020a", fontWeight: "bold" }}
                        >
                          LV.{node.level}
                        </div>
                        {/* Pulse */}
                        {isSel && (
                          <motion.div
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border-2"
                            style={{ borderColor: c }}
                          />
                        )}
                      </motion.div>
                    </button>

                    {/* Label */}
                    <div className={`flex-1 ${isOdd ? "text-right" : "text-left"}`}>
                      <div
                        className="text-base md:text-xl font-bold font-mono"
                        style={{
                          color: c,
                          textShadow: `0 0 8px ${c}66`,
                          fontFamily: "var(--font-orbitron), monospace",
                        }}
                      >
                        {node.name}
                      </div>
                      <div className="text-[10px] font-mono text-cyan-300/50 tracking-widest mt-0.5">
                        {node.unlocked ? "✓ UNLOCKED" : "🔒 LOCKED"}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ============ Details panel ============ */}
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="glass-panel clip-corner p-5">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-1">
              ▸ NODE DETAILS
            </div>
            <div
              className="text-3xl font-black neon-text-cyan tracking-wide mb-3"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              {selected.name}
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between border-b border-cyan-500/10 pb-1.5">
                <span className="text-cyan-300/50 text-[10px] tracking-widest">LEVEL</span>
                <span className="neon-text-orange">{selected.level}</span>
              </div>
              <div className="flex justify-between border-b border-cyan-500/10 pb-1.5">
                <span className="text-cyan-300/50 text-[10px] tracking-widest">STATUS</span>
                <span className="neon-text-green">
                  {selected.unlocked ? "UNLOCKED" : "LOCKED"}
                </span>
              </div>
              <div className="flex justify-between border-b border-cyan-500/10 pb-1.5">
                <span className="text-cyan-300/50 text-[10px] tracking-widest">NODE ID</span>
                <span className="text-pink-400">#{selected.id.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel-purple clip-corner p-5">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-2">
              ▸ DESCRIPTION
            </div>
            <p className="text-sm font-mono text-cyan-100/85 leading-relaxed">
              {selected.desc}
            </p>
          </div>

          {/* XP reward */}
          <div className="glass-panel clip-corner p-5">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-2">
              ▸ EVOLUTION CHAIN
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {TECH_TREE.map((n, i) => (
                <div key={n.id} className="flex items-center">
                  <div
                    className="px-2.5 py-1 text-[10px] font-mono clip-corner-sm"
                    style={{
                      background: selected.id === n.id ? "rgba(255, 46, 196, 0.2)" : "rgba(0,240,255,0.08)",
                      border: `1px solid ${selected.id === n.id ? "#ff2ec4" : "rgba(0,240,255,0.3)"}`,
                      color: selected.id === n.id ? "#ff2ec4" : "#00f0ff",
                    }}
                  >
                    {n.name}
                  </div>
                  {i < TECH_TREE.length - 1 && (
                    <span className="mx-1 text-cyan-300/40 text-xs">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hint */}
          <div className="text-center text-[10px] font-mono text-cyan-300/40 tracking-widest">
            ▶ CLICK ANY NODE TO INSPECT
          </div>
        </motion.div>
      </div>
    </LevelShell>
  );
}
