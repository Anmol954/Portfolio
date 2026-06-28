"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "@/lib/game-store";
import { Sound } from "@/lib/sound-engine";
import LoadingScreen from "@/components/cyber/LoadingScreen";
import LandingScreen from "@/components/cyber/LandingScreen";
import MainMenu from "@/components/cyber/MainMenu";
import CyberBackground from "@/components/cyber/CyberBackground";
import { CustomCursor, MouseGlow, useKonamiCode } from "@/lib/cyber-ui";
import { useEffect, useState, useRef } from "react";
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

// Smooth cinematic page transition variants
// NOTE: No filter/blur — it breaks fixed-position children in Chrome
const pageVariants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.988,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 1.008,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Home() {
  const stage = useGame((s) => s.stage);
  const currentLevel = useGame((s) => s.currentLevel);
  const isTransitioning = useGame((s) => s.isTransitioning);
  const unlockKonami = useGame((s) => s.unlockKonami);
  const konamiUnlocked = useGame((s) => s.konamiUnlocked);
  const soundEnabled = useGame((s) => s.soundEnabled);

  const [showSecret, setShowSecret] = useState(false);
  const prevStage = useRef(stage);
  const prevLevel = useRef(currentLevel);

  // Play transition sound when navigating
  useEffect(() => {
    const stageChanged = prevStage.current !== stage;
    const levelChanged = prevLevel.current !== currentLevel;

    if (stageChanged || levelChanged) {
      if (stage === "level" && levelChanged) {
        Sound.play("level_enter");
      } else if (stage === "menu" && prevStage.current === "level") {
        Sound.play("level_exit");
      } else if (stageChanged) {
        Sound.play("transition_whoosh");
      }
      prevStage.current = stage;
      prevLevel.current = currentLevel;
    }
  }, [stage, currentLevel]);

  // Keep sound engine in sync with store toggle
  useEffect(() => {
    Sound.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useKonamiCode(() => {
    unlockKonami();
    setShowSecret(true);
    Sound.play("konami_fanfare");
  });

  // Close secret room with escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSecret(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Resume audio context on first interaction (browser autoplay policy)
  useEffect(() => {
    const resume = () => Sound.resume();
    window.addEventListener("click", resume, { once: true });
    window.addEventListener("keydown", resume, { once: true });
    return () => {
      window.removeEventListener("click", resume);
      window.removeEventListener("keydown", resume);
    };
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

      {/* Main stage with smooth cinematic transitions */}
      <div className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${stage}-${currentLevel}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {renderStage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer (only on menu & level stages) */}
      {stage !== "loading" && stage !== "landing" && (
        <GameFooter />
      )}

      {/* Cinematic Letterbox Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="transition-overlay"
            className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Top letterbox bar */}
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{
                height: "12vh",
                background:
                  "linear-gradient(180deg, #03020a 0%, rgba(0,10,20,0.95) 100%)",
                boxShadow: "0 4px 40px rgba(0,240,255,0.15)",
              }}
              initial={{ translateY: "-100%" }}
              animate={{ translateY: "0%" }}
              exit={{ translateY: "-100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Neon line at bottom of top bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #00f0ff 20%, #b026ff 50%, #ff2ec4 80%, transparent)",
                  boxShadow: "0 0 12px rgba(0,240,255,0.6)",
                }}
              />
            </motion.div>

            {/* Bottom letterbox bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: "12vh",
                background:
                  "linear-gradient(0deg, #03020a 0%, rgba(0,10,20,0.95) 100%)",
                boxShadow: "0 -4px 40px rgba(176,38,255,0.15)",
              }}
              initial={{ translateY: "100%" }}
              animate={{ translateY: "0%" }}
              exit={{ translateY: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Neon line at top of bottom bar */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #b026ff 20%, #00f0ff 50%, #ff2ec4 80%, transparent)",
                  boxShadow: "0 0 12px rgba(176,38,255,0.6)",
                }}
              />
            </motion.div>

            {/* Center loading text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <div className="text-center">
                {/* Smooth rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="w-14 h-14 mx-auto mb-4 relative"
                >
                  <div
                    className="absolute inset-0 rounded-full border-2 border-transparent"
                    style={{
                      borderTopColor: "#00f0ff",
                      borderRightColor: "#b026ff",
                      filter: "drop-shadow(0 0 8px #00f0ff)",
                    }}
                  />
                  <div
                    className="absolute inset-2 rounded-full border border-transparent"
                    style={{
                      borderBottomColor: "#ff2ec4",
                      borderLeftColor: "#00f0ff",
                      filter: "drop-shadow(0 0 4px #ff2ec4)",
                    }}
                  />
                </motion.div>
                <motion.div
                  className="text-[10px] font-mono tracking-[0.4em] neon-text-cyan"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  LOADING...
                </motion.div>
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
