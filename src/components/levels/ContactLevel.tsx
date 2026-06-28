"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LevelShell } from "@/components/cyber/LevelShell";
import { useState, useEffect, useRef } from "react";
import { SOCIALS } from "@/lib/player-data";

type Status = "idle" | "connecting" | "transmitting" | "success" | "error";

export default function ContactLevel() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [radarAngle, setRadarAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRadarAngle((a) => (a + 3) % 360), 16);
    return () => clearInterval(id);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }
    setStatus("connecting");
    setTimeout(() => setStatus("transmitting"), 1200);
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 2800);
  };

  return (
    <LevelShell id="09" title="CONTACT HQ" codename="TRANSMISSION CHANNEL" color="cyan">
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">
        {/* ============ LEFT: Communication visual ============ */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Satellite radar */}
          <div className="glass-panel-purple clip-corner p-5">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-3">
              ▸ SATELLITE UPLINK
            </div>
            <div className="relative w-full aspect-square max-w-[260px] mx-auto">
              <RadarSweep angle={radarAngle} />
            </div>
            <div className="text-center mt-3 text-[10px] font-mono text-cyan-300/60 tracking-widest">
              SIGNAL STRENGTH: <span className="neon-text-green">STRONG</span>
            </div>
          </div>

          {/* Direct channels */}
          <div className="glass-panel clip-corner p-5">
            <div className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-3">
              ▸ DIRECT CHANNELS
            </div>
            <div className="space-y-2">
              <ChannelLink
                label="EMAIL"
                value={SOCIALS.email}
                href={`mailto:${SOCIALS.email}`}
                color="#00f0ff"
                icon="✉"
              />
              <ChannelLink
                label="GITHUB"
                value="github.com/Anmol954"
                href={SOCIALS.github}
                color="#b026ff"
                icon="▣"
              />
              <ChannelLink
                label="LINKEDIN"
                value="linkedin.com/in/anmol-madhav"
                href={SOCIALS.linkedin}
                color="#00ff9c"
                icon="in"
              />
              <ChannelLink
                label="INSTAGRAM"
                value="instagram.com/anmol_madhav"
                href={SOCIALS.instagram}
                color="#ff2ec4"
                icon="◉"
              />
            </div>
          </div>

          {/* ── RESUME DOWNLOAD ── */}
          <motion.a
            href="/resume/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Anmol_Madhav_Resume.pdf"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative magnetic block"
          >
            <div
              className="glass-panel clip-corner p-4 md:p-5 relative overflow-hidden"
              style={{
                borderColor: "rgba(255,106,0,0.5)",
                boxShadow: "0 0 20px rgba(255,106,0,0.15), inset 0 0 20px rgba(255,106,0,0.05)",
              }}
            >
              {/* Animated shimmer */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-y-0 w-1/3 skew-x-12 animate-shimmer"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,106,0,0.15), transparent)" }}
                />
              </div>
              {/* Glow blob */}
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl pointer-events-none"
                style={{ background: "rgba(255,106,0,0.2)" }} />

              <div className="flex items-center gap-4 relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 flex-shrink-0 flex items-center justify-center clip-corner-sm text-xl font-bold"
                  style={{
                    background: "rgba(255,106,0,0.15)",
                    border: "1px solid rgba(255,106,0,0.5)",
                    color: "#ff6a00",
                    boxShadow: "0 0 12px rgba(255,106,0,0.3)",
                  }}
                >
                  ↓
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono tracking-[0.3em] mb-0.5"
                    style={{ color: "rgba(255,106,0,0.7)" }}>
                    ▸ CLASSIFIED DOCUMENT
                  </div>
                  <div
                    className="text-base md:text-lg font-black tracking-wider"
                    style={{
                      fontFamily: "var(--font-orbitron), monospace",
                      color: "#ff6a00",
                      textShadow: "0 0 10px rgba(255,106,0,0.6)",
                    }}
                  >
                    DOWNLOAD RESUME
                  </div>
                  <div className="text-[10px] font-mono mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Anmol_Madhav_Resume.pdf · CLEARANCE LEVEL: PUBLIC
                  </div>
                </div>
                {/* Arrow */}
                <motion.div
                  className="text-lg font-bold flex-shrink-0"
                  style={{ color: "#ff6a00" }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ▶
                </motion.div>
              </div>
            </div>
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-1 clip-corner pointer-events-none border"
              style={{ borderColor: "rgba(255,106,0,0.2)" }}
              animate={{ borderColor: ["rgba(255,106,0,0.2)", "rgba(255,106,0,0.5)", "rgba(255,106,0,0.2)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.a>

          {/* Status */}
          <div className="glass-panel-purple clip-corner p-4 flex items-center gap-3">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-green-500"
              />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 relative" style={{ boxShadow: "0 0 10px #00ff9c" }} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-mono tracking-widest text-cyan-300/50">
                AVAILABILITY
              </div>
              <div className="text-sm font-mono neon-text-green font-bold">
                OPEN FOR NEW MISSIONS
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ RIGHT: Contact form ============ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-panel clip-corner p-5 md:p-7 relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-cyan-300/60">
                  ▸ NEW TRANSMISSION
                </div>
                <div className="text-lg md:text-2xl font-bold neon-text-cyan" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
                  SEND TRANSMISSION
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={status}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[10px] font-mono px-2 py-1 clip-corner-sm"
                  style={{
                    background:
                      status === "success"
                        ? "rgba(0,255,156,0.2)"
                        : status === "error"
                        ? "rgba(255,46,196,0.2)"
                        : status === "idle"
                        ? "rgba(0,240,255,0.1)"
                        : "rgba(255,106,0,0.2)",
                    color:
                      status === "success"
                        ? "#00ff9c"
                        : status === "error"
                        ? "#ff2ec4"
                        : status === "idle"
                        ? "#00f0ff"
                        : "#ff6a00",
                  }}
                >
                  ● {status.toUpperCase()}
                </motion.div>
              </AnimatePresence>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Name */}
              <Field
                label="CALLSIGN (NAME)"
                placeholder="Enter your name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                color="#00f0ff"
              />
              {/* Email */}
              <Field
                label="COMMS CHANNEL (EMAIL)"
                placeholder="your.email@domain.com"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                color="#b026ff"
              />
              {/* Message */}
              <div>
                <label className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-1.5 block">
                  ▸ MISSION DETAILS (MESSAGE)
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe the mission, opportunity, or just say hi..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full glass-panel-purple clip-corner-sm p-3 text-sm font-mono text-cyan-100 placeholder:text-cyan-300/30 outline-none focus:border-cyan-400/80 transition-all resize-none magnetic"
                  style={{ borderColor: "rgba(0, 240, 255, 0.3)" }}
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "connecting" || status === "transmitting"}
                className="relative w-full magnetic group"
              >
                <div
                  className="glass-panel clip-corner p-4 text-center relative overflow-hidden transition-all"
                  style={{
                    borderColor: "rgba(255, 46, 196, 0.5)",
                    background:
                      status === "connecting" || status === "transmitting"
                        ? "rgba(255, 106, 0, 0.15)"
                        : "rgba(255, 46, 196, 0.1)",
                  }}
                >
                  {/* Shimmer */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent skew-x-12 group-hover:translate-x-[400%] transition-transform duration-1000" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={status}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative"
                    >
                      {status === "idle" && (
                        <div className="text-base md:text-lg font-black neon-text-pink tracking-widest" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
                          📡 SEND TRANSMISSION
                        </div>
                      )}
                      {status === "connecting" && (
                        <div className="text-base md:text-lg font-black neon-text-orange tracking-widest" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
                          ⚡ ESTABLISHING UPLINK...
                        </div>
                      )}
                      {status === "transmitting" && (
                        <div className="text-base md:text-lg font-black neon-text-orange tracking-widest" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
                          📡 TRANSMITTING DATA...
                        </div>
                      )}
                      {status === "success" && (
                        <div className="text-base md:text-lg font-black neon-text-green tracking-widest" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
                          ✓ TRANSMISSION RECEIVED
                        </div>
                      )}
                      {status === "error" && (
                        <div className="text-base md:text-lg font-black neon-text-pink tracking-widest" style={{ fontFamily: "var(--font-orbitron), monospace" }}>
                          ⚠ ALL FIELDS REQUIRED
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.button>
            </form>

            {/* Footer hint */}
            <div className="mt-4 text-center text-[10px] font-mono text-cyan-300/40 tracking-widest">
              RECRUITERS RECEIVE PRIORITY RESPONSE WITHIN 24 HOURS
            </div>
          </div>
        </motion.div>
      </div>
    </LevelShell>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  color,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  color: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-mono tracking-widest text-cyan-300/60 mb-1.5 block">
        ▸ {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full glass-panel-purple clip-corner-sm p-3 text-sm font-mono text-cyan-100 placeholder:text-cyan-300/30 outline-none focus:border-cyan-400/80 transition-all magnetic"
        style={{ borderColor: `${color}33` }}
      />
    </div>
  );
}

function ChannelLink({ label, value, href, color, icon }: { label: string; value: string; href: string; color: string; icon: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-2.5 clip-corner-sm transition-all hover:bg-white/5 group magnetic"
    >
      <div
        className="w-9 h-9 flex items-center justify-center clip-corner-sm font-mono font-bold flex-shrink-0"
        style={{ background: `${color}22`, border: `1px solid ${color}55`, color, boxShadow: `0 0 8px ${color}33` }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[9px] font-mono text-cyan-300/50 tracking-widest">
          {label}
        </div>
        <div className="text-xs font-mono truncate group-hover:underline" style={{ color }}>
          {value}
        </div>
      </div>
      <div className="text-xs" style={{ color }}>
        ▶
      </div>
    </a>
  );
}

function RadarSweep({ angle }: { angle: number }) {
  return (
    <svg viewBox="0 0 220 220" className="w-full h-full">
      <defs>
        <radialGradient id="contactRadarGlow">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="contactSweepGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="110" cy="110" r="100" fill="url(#contactRadarGlow)" />

      {/* Rings */}
      {[25, 50, 75, 100].map((r, i) => (
        <circle
          key={i}
          cx="110"
          cy="110"
          r={r}
          fill="none"
          stroke="rgba(0,240,255,0.2)"
          strokeWidth="1"
        />
      ))}

      {/* Crosshair */}
      <line x1="10" y1="110" x2="210" y2="110" stroke="rgba(0,240,255,0.15)" strokeWidth="1" />
      <line x1="110" y1="10" x2="110" y2="210" stroke="rgba(0,240,255,0.15)" strokeWidth="1" />

      {/* Sweep */}
      <g style={{ transformOrigin: "110px 110px", transform: `rotate(${angle}deg)` }}>
        <path
          d={`M 110 110 L 110 10 A 100 100 0 0 1 ${110 + 100 * Math.sin((45 * Math.PI) / 180)} ${
            110 - 100 * Math.cos((45 * Math.PI) / 180)
          } Z`}
          fill="url(#contactSweepGrad)"
        />
        <line x1="110" y1="110" x2="110" y2="10" stroke="#00f0ff" strokeWidth="2" style={{ filter: "drop-shadow(0 0 4px #00f0ff)" }} />
      </g>

      {/* Target blips */}
      {[
        { x: 60, y: 80, color: "#00ff9c" },
        { x: 160, y: 130, color: "#b026ff" },
        { x: 130, y: 70, color: "#ff6a00" },
        { x: 80, y: 150, color: "#ff2ec4" },
      ].map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r="3" fill={b.color} style={{ filter: `drop-shadow(0 0 4px ${b.color})` }} />
          <motion.circle
            cx={b.x}
            cy={b.y}
            r="3"
            fill="none"
            stroke={b.color}
            strokeWidth="1"
            animate={{ r: [3, 12], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        </g>
      ))}

      <circle cx="110" cy="110" r="3" fill="#00f0ff" style={{ filter: "drop-shadow(0 0 4px #00f0ff)" }} />
    </svg>
  );
}
