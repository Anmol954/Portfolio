"use client";

import { create } from "zustand";

export type GameStage = "loading" | "landing" | "menu" | "level";
export type LevelId =
  | "character"
  | "inventory"
  | "missions"
  | "achievements"
  | "techtree"
  | "timeline"
  | "terminal"
  | "leaderboard"
  | "boss"
  | "contact"
  | null;

type GameState = {
  stage: GameStage;
  currentLevel: LevelId;
  isTransitioning: boolean;
  konamiUnlocked: boolean;
  soundEnabled: boolean;
  startLoading: () => void;
  goToLanding: () => void;
  goToMenu: () => void;
  openLevel: (id: LevelId) => void;
  closeLevel: () => void;
  toggleSound: () => void;
  unlockKonami: () => void;
  setTransitioning: (v: boolean) => void;
};

export const useGame = create<GameState>((set) => ({
  stage: "loading",
  currentLevel: null,
  isTransitioning: false,
  konamiUnlocked: false,
  soundEnabled: true,

  startLoading: () => set({ stage: "loading" }),
  goToLanding: () => set({ stage: "landing", isTransitioning: false }),
  goToMenu: () => set({ stage: "menu", currentLevel: null, isTransitioning: false }),
  openLevel: (id) =>
    set({ isTransitioning: true }),
  closeLevel: () => set({ stage: "menu", currentLevel: null, isTransitioning: false }),
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  unlockKonami: () => set({ konamiUnlocked: true }),
  setTransitioning: (v) => set({ isTransitioning: v }),
}));

// Override openLevel to set level after transition
export function openLevelWithTransition(id: LevelId) {
  const s = useGame.getState();
  s.setTransitioning(true);
  setTimeout(() => {
    useGame.setState({ stage: "level", currentLevel: id, isTransitioning: false });
  }, 600);
}
