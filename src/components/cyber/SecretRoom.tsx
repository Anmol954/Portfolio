"use client";

import { motion } from "framer-motion";

export default function SecretRoom({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, rotateX: 90 }}
        animate={{ scale: 1, rotateX: 0 }}
        exit={{ scale: 0.5, rotateX: -90 }}
        transition={{ type: "spring", damping: 12 }}
        className="glass-panel-purple clip-corner p-6 md:p-10 max-w-2xl w-full relative overflow-hidden"
        style={{ borderColor: "rgba(255, 46, 196, 0.6)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-purple-500/30 blur-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-mono neon-text-pink tracking-widest animate-pulse">
              ⚠ SECRET ROOM ACCESSED
            </div>
            <button
              onClick={onClose}
              className="text-pink-400 hover:text-pink-200 text-xl magnetic transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-black neon-text-pink mb-2 tracking-wide"
            style={{ fontFamily: "var(--font-orbitron), monospace" }}
          >
            CHEAT CODE ACTIVATED
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm font-mono text-pink-200/80 mb-6"
          >
            You found the secret room. +9999 XP. You're officially a curious recruiter. I like you.
          </motion.p>

          {/* Hidden content */}
          <div className="space-y-4">
            <SecretBlock
              icon="🎮"
              title="DEVELOPER NOTE #1"
              text="If you're reading this, you're either a recruiter who pays attention to detail, or you read the source code. Either way — you're my kind of people."
              color="#00f0ff"
            />
            <SecretBlock
              icon="🤖"
              title="HIDDEN PROJECT"
              text="I'm currently building an autonomous AI agent system that can plan, code, and deploy mini-projects on its own. It's wild. Ask me about it in the interview."
              color="#b026ff"
            />
            <SecretBlock
              icon="😂"
              title="FUNNY MEMO"
              text="Yes, I did build this entire portfolio like a video game. Yes, I know it's extra. No, I don't regret it. We're having fun here."
              color="#ff6a00"
            />
            <SecretBlock
              icon="🚀"
              title="REAL TALK"
              text="If you got this far, you should just hire me. Seriously. Press the Contact HQ button. Send the transmission. Let's build something ridiculous together."
              color="#00ff9c"
            />
          </div>

          <div className="mt-6 pt-4 border-t border-pink-500/30 text-center">
            <button
              onClick={() => {
                onClose();
                // Navigate to contact
                import("@/lib/game-store").then(({ openLevelWithTransition }) => {
                  setTimeout(() => openLevelWithTransition("contact" as never), 200);
                });
              }}
              className="px-6 py-2.5 glass-panel clip-corner-sm text-sm font-mono neon-text-green tracking-widest magnetic hover:scale-105 transition-transform"
              style={{ borderColor: "rgba(0, 255, 156, 0.5)" }}
            >
              ▶ ACCEPT MISSION: CONTACT
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SecretBlock({
  icon,
  title,
  text,
  color,
}: {
  icon: string;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="flex gap-3 p-3 glass-panel clip-corner-sm"
      style={{ borderColor: `${color}44` }}
    >
      <div className="text-2xl flex-shrink-0">{icon}</div>
      <div>
        <div className="text-[10px] font-mono tracking-widest mb-1" style={{ color }}>
          {title}
        </div>
        <div className="text-xs font-mono text-cyan-100/85 leading-relaxed">{text}</div>
      </div>
    </motion.div>
  );
}
