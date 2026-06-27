"use client";

import { useEffect, useState, useRef } from "react";

export type NeonColor = "cyan" | "purple" | "orange" | "green" | "pink";

export const COLOR_HEX: Record<NeonColor, string> = {
  cyan: "#00f0ff",
  purple: "#b026ff",
  orange: "#ff6a00",
  green: "#00ff9c",
  pink: "#ff2ec4",
};

export const COLOR_RGB: Record<NeonColor, string> = {
  cyan: "0, 240, 255",
  purple: "176, 38, 255",
  orange: "255, 106, 0",
  green: "0, 255, 156",
  pink: "255, 46, 196",
};

// ============= CUSTOM CURSOR =============
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  // Initialize hidden state based on whether the device supports hover.
  // SSR-safe: defaults to false (cursor shown); becomes true on touch devices after hydration.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      // Use a microtask to avoid synchronous setState in effect
      const id = requestAnimationFrame(() => setHidden(true));
      return () => cancelAnimationFrame(id);
    }

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, .magnetic, .cursor-target"
      );
      setHovering(!!interactive);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{ width: 8, height: 8 }}
      >
        <div
          className="w-full h-full rounded-full transition-all duration-200"
          style={{
            background: hovering ? "#ff2ec4" : "#00f0ff",
            boxShadow: `0 0 ${hovering ? 20 : 10}px ${
              hovering ? "#ff2ec4" : "#00f0ff"
            }`,
            transform: hovering ? "scale(1.5)" : "scale(1)",
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{ width: 32, height: 32 }}
      >
        <div
          className="w-full h-full rounded-full border-2 transition-all duration-200"
          style={{
            borderColor: hovering ? "#ff2ec4" : "#00f0ff",
            boxShadow: `0 0 ${hovering ? 15 : 8}px rgba(${
              hovering ? "255, 46, 196" : "0, 240, 255"
            }, 0.6)`,
            transform: hovering ? "scale(1.4)" : "scale(1)",
          }}
        />
      </div>
    </>
  );
}

// ============= MOUSE GLOW =============
export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = window.innerWidth / 2,
      mouseY = window.innerHeight / 2;
    let curX = mouseX,
      curY = mouseY;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.08;
      curY += (mouseY - curY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${curX}px ${curY}px, rgba(0, 240, 255, 0.08), rgba(176, 38, 255, 0.04) 40%, transparent 70%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ============= KONAMI CODE =============
export function useKonamiCode(onUnlock: () => void) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let position = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === sequence[position]) {
        position++;
        if (position === sequence.length) {
          onUnlock();
          position = 0;
        }
      } else {
        position = key === sequence[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}

// ============= STAR RATING =============
export function StarRating({ count, color = "cyan" }: { count: number; color?: NeonColor }) {
  const hex = COLOR_HEX[color];
  return (
    <div className="flex gap-0.5" aria-label={`Skill level ${count}/10`}>
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="text-xs leading-none"
          style={{
            color: i < count ? hex : "rgba(255,255,255,0.15)",
            textShadow: i < count ? `0 0 6px ${hex}` : "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ============= TYPING EFFECT =============
export function useTypingEffect(text: string, speed = 50, start = true) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    setDisplay("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
        return;
      }
      setDisplay(text.slice(0, i + 1));
      i++;
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);

  return { display, done };
}
