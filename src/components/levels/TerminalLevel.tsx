"use client";

import { motion } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { useState, useEffect, useRef } from "react";
import { PLAYER, SKILLS, MISSIONS, CERTIFICATIONS, TERMINAL_COMMANDS, SOCIALS } from "@/lib/player-data";

type Line = { type: "input" | "output" | "system" | "error" | "success"; text: string };

const HELP_TEXT = `
AVAILABLE COMMANDS:
${TERMINAL_COMMANDS.map((c) => `  ${c.cmd.padEnd(18)} ${c.desc}`).join("\n")}

TIP: Use ↑/↓ for history. Type 'clear' to wipe.
`;

export default function TerminalLevel() {
  const [lines, setLines] = useState<Line[]>([
    { type: "system", text: "CYBER_DECK TERMINAL v2.0.26 :: SECURE CHANNEL ESTABLISHED" },
    { type: "system", text: "Type 'help' to list available commands." },
    { type: "system", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const addLines = (newLines: Line[]) => setLines((prev) => [...prev, ...newLines]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addLines([{ type: "input", text: `visitor@cyber-deck:~$ ${cmd}` }]);

    if (!trimmed) return;

    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    switch (trimmed) {
      case "help":
        addLines([{ type: "output", text: HELP_TEXT }]);
        break;
      case "about":
        addLines([
          { type: "output", text: `>>> PLAYER DOSSIER <<<` },
          { type: "output", text: `Name:        ${PLAYER.name}  (@${PLAYER.handle})` },
          { type: "output", text: `Level:       ${PLAYER.level}` },
          { type: "output", text: `Class:       ${PLAYER.class}` },
          { type: "output", text: `XP:          ${PLAYER.xp.toLocaleString()}+` },
          { type: "output", text: `Location:    ${PLAYER.location}` },
          { type: "output", text: `Mission:     ${PLAYER.mission}` },
          { type: "output", text: `` },
          { type: "output", text: `Roles:       ${PLAYER.roles.join(" · ")}` },
          { type: "output", text: `GitHub:      ${PLAYER.githubStats.repos} repos · ${PLAYER.githubStats.contributions} contributions/yr` },
          { type: "output", text: `Badges:      ${PLAYER.githubStats.achievements.join(", ")}` },
          { type: "output", text: `` },
          { type: "output", text: `> "${PLAYER.bio}"` },
        ]);
        break;
      case "skills":
        addLines([
          { type: "output", text: `>>> INVENTORY (${SKILLS.length} ITEMS) <<<` },
          ...SKILLS.map(
            (s) =>
              ({
                type: "output",
                text: `  [${s.level.toString().padStart(3)}] ${"★".repeat(s.stars)}${"☆".repeat(10 - s.stars)}  ${s.name.padEnd(22)} [${s.category}]`,
              } as Line)
          ),
        ]);
        break;
      case "projects":
      case "missions":
        addLines([
          { type: "output", text: `>>> MISSION ARCHIVE (${MISSIONS.length} MISSIONS) <<<` },
          ...MISSIONS.map(
            (m) =>
              ({
                type: "output",
                text: `  [${m.id}] ${m.title.padEnd(28)} ★${m.difficulty}/5  ${m.status}  → ${m.github || "[no link]"}`,
              } as Line)
          ),
        ]);
        break;
      case "certs":
      case "certifications":
        addLines([
          { type: "output", text: `>>> CERTIFICATIONS // LINKEDIN VERIFIED (${CERTIFICATIONS.length}) <<<` },
          ...CERTIFICATIONS.map(
            (c) =>
              ({
                type: "output",
                text: `  [${c.date}] ${c.name.padEnd(50)} — ${c.issuer}`,
              } as Line)
          ),
        ]);
        break;
      case "github":
        addLines([
          { type: "success", text: `Opening GitHub profile...` },
          { type: "output", text: `URL: ${SOCIALS.github}` },
        ]);
        if (typeof window !== "undefined") {
          window.open(SOCIALS.github, "_blank");
        }
        break;
      case "linkedin":
        addLines([
          { type: "success", text: `Opening LinkedIn profile...` },
          { type: "output", text: `URL: ${SOCIALS.linkedin}` },
        ]);
        if (typeof window !== "undefined") {
          window.open(SOCIALS.linkedin, "_blank");
        }
        break;
      case "instagram":
      case "insta":
        addLines([
          { type: "success", text: `Opening Instagram profile...` },
          { type: "output", text: `URL: ${SOCIALS.instagram}` },
        ]);
        if (typeof window !== "undefined") {
          window.open(SOCIALS.instagram, "_blank");
        }
        break;
      case "contact":
        addLines([
          { type: "output", text: `>>> TRANSMISSION CHANNELS <<<` },
          { type: "output", text: `  Email:     ${SOCIALS.email}` },
          { type: "output", text: `  GitHub:    ${SOCIALS.github}` },
          { type: "output", text: `  LinkedIn:  ${SOCIALS.linkedin}` },
          { type: "output", text: `  Instagram: ${SOCIALS.instagram}` },
          { type: "output", text: `` },
          { type: "output", text: `Or visit the Contact HQ level to send a transmission.` },
        ]);
        break;
      case "resume":
        addLines([
          { type: "success", text: `Generating ATS-friendly resume...` },
          { type: "output", text: `[OK] Compiling player profile...` },
          { type: "output", text: `[OK] Formatting skills section...` },
          { type: "output", text: `[OK] Adding project details...` },
          { type: "output", text: `[OK] Optimizing for ATS systems...` },
          { type: "success", text: `Resume ready! Check the Contact HQ level for download.` },
        ]);
        break;
      case "sudo hire":
        addLines([
          { type: "error", text: `[ERR] Permission denied: you don't have permission to hire.` },
          { type: "error", text: `[ERR] Just kidding — please use the Contact HQ level.` },
          { type: "output", text: `But hey, you found the secret command. +50 XP.` },
        ]);
        break;
      case "clear":
        setLines([]);
        return;
      case "whoami":
        addLines([{ type: "output", text: "recruiter" }]);
        break;
      case "ls":
        addLines([
          { type: "output", text: "about/  skills/  projects/  achievements/  resume.txt  contact/  secret_room/" },
        ]);
        break;
      case "cat secret_room":
        addLines([
          { type: "output", text: "psst... try the Konami code: ↑↑↓↓←→←→BA" },
        ]);
        break;
      case "sudo":
        addLines([{ type: "error", text: "usage: sudo <command>   (try 'sudo hire')" }]);
        break;
      default:
        addLines([
          { type: "error", text: `command not found: ${trimmed}` },
          { type: "error", text: `type 'help' for available commands` },
        ]);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const newIdx = histIdx + 1;
      if (newIdx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete
      const matches = TERMINAL_COMMANDS.filter((c) => c.cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0].cmd);
    }
  };

  return (
    <LevelShell id="07" title="TERMINAL" codename="HACKER COMMAND LINE" color="green">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel clip-corner p-0 overflow-hidden"
          style={{ borderColor: "rgba(0, 255, 156, 0.4)" }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b"
            style={{ borderColor: "rgba(0, 255, 156, 0.2)", background: "rgba(0, 255, 156, 0.05)" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-[10px] font-mono text-green-300/60 tracking-widest ml-2">
                visitor@cyber-deck — bash
              </span>
            </div>
            <div className="text-[10px] font-mono text-green-300/40 tracking-widest">
              ● REC
            </div>
          </div>

          {/* Terminal output */}
          <div
            className="p-4 h-[420px] md:h-[520px] overflow-y-auto font-mono text-xs md:text-sm"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              textShadow: "0 0 4px rgba(0, 255, 156, 0.5)",
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Scanline overlay */}
            <div
              className="pointer-events-none fixed inset-0"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,255,156,0.04) 2px, rgba(0,255,156,0.04) 3px)",
              }}
            />
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className={`whitespace-pre-wrap break-words ${
                  line.type === "input"
                    ? "text-cyan-300"
                    : line.type === "error"
                    ? "text-red-400"
                    : line.type === "success"
                    ? "text-green-400"
                    : line.type === "system"
                    ? "text-purple-300/80"
                    : "text-green-200/90"
                }`}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}

            {/* Input line */}
            <div className="flex items-center mt-1">
              <span className="text-cyan-300 mr-2 whitespace-nowrap">
                visitor@cyber-deck:~$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent border-none outline-none text-green-300 font-mono"
                style={{ caretColor: "transparent" }}
              />
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="text-green-400"
              >
                ▋
              </motion.span>
            </div>
            <div ref={endRef} />
          </div>
        </motion.div>

        {/* Command reference */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="glass-panel-purple clip-corner p-5">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-3">
              ▸ COMMAND REFERENCE
            </div>
            <div className="space-y-1.5">
              {TERMINAL_COMMANDS.map((c) => (
                <button
                  key={c.cmd}
                  onClick={() => {
                    runCommand(c.cmd);
                    inputRef.current?.focus();
                  }}
                  className="block w-full text-left p-2 clip-corner-sm transition-all hover:bg-green-500/10 group magnetic"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs font-bold neon-text-green">
                      ${c.cmd}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300/40 group-hover:text-cyan-300/70 transition-colors">
                      {c.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel clip-corner p-5">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-2">
              ▸ HINT
            </div>
            <p className="text-xs font-mono text-cyan-100/70 leading-relaxed">
              Use <span className="neon-text-green">↑/↓</span> to navigate command history.{" "}
              <span className="neon-text-green">Tab</span> for autocomplete. Try{" "}
              <span className="neon-text-pink">sudo hire</span> for a surprise.
            </p>
          </div>
        </motion.div>
      </div>
    </LevelShell>
  );
}
