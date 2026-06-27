"use client";

import { motion } from "framer-motion";
import { openLevelWithTransition } from "@/lib/game-store";

export default function GameFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative z-10 mt-12 px-4 pb-6 pt-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel-purple clip-corner p-6 md:p-10 relative overflow-hidden text-center">
          {/* BG grid */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          {/* Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-pink-500/20 blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-6xl font-black neon-text-pink tracking-wider mb-2"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              GAME OVER?
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-3xl font-black neon-text-cyan tracking-wide mb-6"
              style={{ fontFamily: "var(--font-orbitron), monospace" }}
            >
              NO.
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-sm md:text-xl font-mono neon-text-purple mb-6"
            >
              NEXT LEVEL STARTS AFTER YOU HIRE ME.
            </motion.p>

            <motion.button
              onClick={() => openLevelWithTransition("contact" as never)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="magnetic group"
            >
              <div className="glass-panel clip-corner px-6 py-3 md:px-10 md:py-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent skew-x-12 group-hover:translate-x-[300%] transition-transform duration-700" />
                </div>
                <div className="text-base md:text-xl font-black neon-text-cyan tracking-widest relative" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
                  ▶ INITIATE HIRE SEQUENCE
                </div>
              </div>
            </motion.button>

            {/* Bottom bar */}
            <div className="mt-8 pt-6 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-cyan-300/40 tracking-widest">
              <div>© 2026 ANMOL MADHAV // ALL LEVELS RESERVED</div>
              <div className="flex gap-3">
                <span>v2.0.26</span>
                <span>·</span>
                <span>BUILT WITH NEXT.JS + THREE.JS</span>
                <span>·</span>
                <span className="neon-text-green">● SYSTEMS NOMINAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
