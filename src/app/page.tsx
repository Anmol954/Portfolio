"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/lib/game-store";
import LoadingScreen from "@/components/cyber/LoadingScreen";
import LandingScreen from "@/components/cyber/LandingScreen";
import MainMenu from "@/components/cyber/MainMenu";
import CyberBackground from "@/components/cyber/CyberBackground";
import { CustomCursor, MouseGlow, useKonamiCode } from "@/lib/cyber-ui";
import { useEffect, useState } from "react";
import CharacterLevel from "@/components/levels/CharacterLevel";
import InventoryLevel from "@/components/levels/InventoryLevel";
import MissionsLevel from "@/components/levels/MissionsLevel";
import AchievementsLevel from "@/components/levels/AchievementsLevel";
import TechTreeLevel from "@/components/levels/TechTreeLevel";
import TimelineLevel from "@/components/levels/TimelineLevel";
import TerminalLevel from "@/components/levels/TerminalLevel";
import LeaderboardLevel from "@/components/levels/LeaderboardLevel";
import BossLevel from "@/components/levels/BossLevel";
import ContactLevel from "@/components/levels/ContactLevel";
import SecretRoom from "@/components/cyber/SecretRoom";
import GameFooter from "@/components/cyber/GameFooter";

export default function Home() {
  const stage = useGame((s) => s.stage);
  const currentLevel = useGame((s) => s.currentLevel);
  const isTransitioning = useGame((s) => s.isTransitioning);
  const unlockKonami = useGame((s) => s.unlockKonami);
  const konamiUnlocked = useGame((s) => s.konamiUnlocked);

  const [showSecret, setShowSecret] = useState(false);

  useKonamiCode(() => {
    unlockKonami();
    setShowSecret(true);
  });

  // Close secret room with escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSecret(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const renderStage = () => {
    switch (stage) {
      case "loading":
        return <LoadingScreen />;
      case "landing":
        return <LandingScreen />;
      case "menu":
        return <MainMenu />;
      case "level":
        return renderLevel(currentLevel);
      default:
        return <LoadingScreen />;
    }
  };

  const renderLevel = (id: string | null) => {
    switch (id) {
      case "character":
        return <CharacterLevel />;
      case "inventory":
        return <InventoryLevel />;
      case "missions":
        return <MissionsLevel />;
      case "achievements":
        return <AchievementsLevel />;
      case "techtree":
        return <TechTreeLevel />;
      case "timeline":
        return <TimelineLevel />;
      case "terminal":
        return <TerminalLevel />;
      case "leaderboard":
        return <LeaderboardLevel />;
      case "boss":
        return <BossLevel />;
      case "contact":
        return <ContactLevel />;
      default:
        return <MainMenu />;
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col">
      <CustomCursor />
      <MouseGlow />
      <CyberBackground />

      {/* Main stage with transitions */}
      <div className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {renderStage()}
        </AnimatePresence>
      </div>

      {/* Footer (only on menu & level stages) */}
      {stage !== "loading" && stage !== "landing" && (
        <GameFooter />
      )}

      {/* Transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] pointer-events-none"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 origin-top"
              style={{
                background: "linear-gradient(180deg, #03020a 0%, #0a0520 50%, #03020a 100%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-3"
                  style={{ filter: "drop-shadow(0 0 8px #00f0ff)" }}
                />
                <div className="text-xs font-mono neon-text-cyan tracking-widest animate-pulse">
                  LOADING LEVEL...
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret room overlay */}
      <AnimatePresence>
        {showSecret && konamiUnlocked && (
          <SecretRoom onClose={() => setShowSecret(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
