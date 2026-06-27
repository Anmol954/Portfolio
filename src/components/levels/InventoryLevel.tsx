"use client";

import { motion } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { SKILLS, type Skill } from "@/lib/player-data";
import { COLOR_HEX, StarRating, type NeonColor } from "@/lib/cyber-ui";
import { useState } from "react";

const CATEGORIES = ["ALL", "LANGUAGE", "AI/ML", "DATA", "FRONTEND", "BACKEND", "TOOL"] as const;

export default function InventoryLevel() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("ALL");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = filter === "ALL" ? SKILLS : SKILLS.filter((s) => s.category === filter);

  return (
    <LevelShell id="02" title="INVENTORY" codename="SKILLS ARSENAL" color="purple">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-3 py-1.5 text-[10px] md:text-xs font-mono tracking-widest clip-corner-sm transition-all magnetic"
            style={{
              background: filter === cat ? "rgba(176, 38, 255, 0.2)" : "rgba(8, 6, 30, 0.5)",
              border: `1px solid ${filter === cat ? "#b026ff" : "rgba(176, 38, 255, 0.3)"}`,
              color: filter === cat ? "#fff" : "rgba(232, 240, 255, 0.5)",
              boxShadow: filter === cat ? "0 0 12px rgba(176, 38, 255, 0.4)" : "none",
            }}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto text-[10px] font-mono text-purple-300/60 self-center tracking-widest">
          {filtered.length} ITEMS
        </div>
      </div>

      {/* Inventory grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {filtered.map((skill, i) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={i}
            isHovered={hovered === skill.name}
            onHover={() => setHovered(skill.name)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>

      {/* Bottom: equipped summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-panel-purple clip-corner p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-mono tracking-widest text-purple-300/70">
            ▸ EQUIPPED LOADOUT
          </div>
          <div className="text-[10px] font-mono text-purple-300/40 tracking-widest">
            MAX 5 SLOTS
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {SKILLS.slice(0, 5).map((s, i) => {
            const c = COLOR_HEX[s.color];
            return (
              <div
                key={s.name}
                className="relative glass-panel clip-corner-sm p-3 text-center"
                style={{ borderColor: `${c}66`, boxShadow: `0 0 12px ${c}33` }}
              >
                <div className="absolute top-1 right-1 text-[8px] font-mono" style={{ color: c }}>
                  {i + 1}
                </div>
                <div className="text-base md:text-lg font-bold font-mono" style={{ color: c, textShadow: `0 0 8px ${c}` }}>
                  {s.name}
                </div>
                <div className="text-[9px] font-mono text-white/60 mt-1">
                  LV.{s.level} · {s.stars}/10
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </LevelShell>
  );
}

function SkillCard({
  skill,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  skill: Skill;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const c = COLOR_HEX[skill.color];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.05 * index, type: "spring", damping: 12 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative magnetic cursor-pointer"
    >
      <div
        className="glass-panel clip-corner p-4 h-full transition-all duration-300 relative overflow-hidden"
        style={{
          borderColor: isHovered ? c : "rgba(176, 38, 255, 0.25)",
          boxShadow: isHovered
            ? `0 0 20px ${c}77, inset 0 0 20px ${c}22`
            : "none",
        }}
      >
        {/* Hover glow blob */}
        <div
          className="absolute -inset-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${c}, transparent 70%)`,
          }}
        />

        {/* Top: category tag */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[8px] font-mono tracking-widest clip-tag px-1.5 py-0.5"
            style={{ background: `${c}22`, color: c, borderLeft: `2px solid ${c}` }}
          >
            {skill.category}
          </span>
          <span
            className="text-[9px] font-mono font-bold"
            style={{ color: c }}
          >
            LV.{skill.level}
          </span>
        </div>

        {/* Skill name */}
        <div
          className="text-base md:text-lg font-bold font-mono mb-3 truncate transition-colors"
          style={{
            color: isHovered ? c : "#e8f0ff",
            textShadow: isHovered ? `0 0 10px ${c}` : "none",
          }}
        >
          {skill.name}
        </div>

        {/* Star rating */}
        <div className="mb-2">
          <StarRating count={skill.stars} color={skill.color} />
        </div>

        {/* Level bar */}
        <div className="h-1 bg-black/60 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.8 }}
            className="h-full"
            style={{ background: c, boxShadow: `0 0 6px ${c}` }}
          />
        </div>

        {/* Hover details */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <div className="text-[9px] font-mono text-cyan-300/60 mt-2 pt-2 border-t border-white/5">
            MASTERY: {skill.level >= 90 ? "EXPERT" : skill.level >= 80 ? "ADVANCED" : "PROFICIENT"}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
