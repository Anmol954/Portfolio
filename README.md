# 🎮 LEVEL UP — Anmol Madhav's Portfolio

A AAA-game-inspired cyberpunk RPG portfolio where the recruiter is the player.
Every section is a level they unlock — cinematic loading → "PRESS ENTER" landing →
10-level game menu → Konami-code secret room → "GAME OVER? NO. NEXT LEVEL STARTS
AFTER YOU HIRE ME." footer.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install
#   OR
bun install

# 2. Run the dev server
npm run dev
#   OR
bun run dev

# 3. Open the portfolio
# Visit http://localhost:3000
```

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **3D**: Three.js + @react-three/fiber + @react-three/drei
- **Animation**: Framer Motion + GSAP
- **State**: Zustand
- **Fonts**: Orbitron + Share Tech Mono + Geist

## 🎯 Features

### Cinematic Experience
- Loading screen with boot sequence ("INITIALIZING PLAYER...")
- Landing screen with letter-by-letter title reveal + "PRESS ENTER TO START"
- Game-style main menu with 10 unlockable levels
- Cinematic transitions between levels
- Custom cursor + mouse glow + scanline overlay
- 3D animated background (particles, cyber grid, floating octahedrons)

### 10 Levels
1. **Character** — Player dossier, animated SVG radar, vital stats, certifications
2. **Inventory** — 28 skills with star ratings, category filters, equipped loadout
3. **Missions** — 6 real GitHub projects with difficulty, tech stacks, GitHub links
4. **Achievements** — Steam-style trophy cards with rarity tiers
5. **Tech Tree** — RPG skill tree (Python → ML → DL → CV → LLMs → Agents)
6. **XP Timeline** — Career journey 2022-2026
7. **Terminal** — Working hacker terminal with 12 commands
8. **Leaderboard** — Top 3 podium + animated stat bars
9. **Boss Fight** — "IMPOSTER SYNDROME" defeated
10. **Contact HQ** — Working contact form with satellite radar

### Secret Features
- **Konami code** (↑↑↓↓←→←→BA) unlocks a hidden secret room
- **`sudo hire`** terminal command for a surprise
- **Custom cursor** with hover state on interactive elements

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main orchestrator with stage routing
│   ├── layout.tsx        # Fonts + metadata
│   └── globals.css       # Cyberpunk theme, utilities, animations
├── lib/
│   ├── player-data.ts    # All player/skill/mission/achievement data
│   ├── game-store.ts     # Zustand game state
│   └── cyber-ui.tsx      # Custom cursor, mouse glow, Konami hook
└── components/
    ├── cyber/            # Background, Loading, Landing, Menu, LevelShell, Footer, SecretRoom
    └── levels/           # 10 individual level components
```

## ✏️ Customization

Edit `src/lib/player-data.ts` to update:
- Player profile (name, level, class, XP, mission)
- Skills (name, level, stars, category)
- Missions/Projects (title, description, tech, GitHub links)
- Certifications (name, issuer, date)
- Achievements (name, rarity, description)
- Tech Tree nodes
- Timeline events
- Social links (GitHub, LinkedIn, Instagram, Email)

## 🌐 Social Links (Already Wired)

- **GitHub**: https://github.com/Anmol954
- **LinkedIn**: https://www.linkedin.com/in/anmol-madhav/
- **Instagram**: https://www.instagram.com/anmol_madhav/
- **Email**: anmolmadhav2004@gmail.com

## 🎨 Color Palette

- Neon Cyan: `#00f0ff`
- Neon Purple: `#b026ff`
- Neon Orange: `#ff6a00`
- Neon Pink: `#ff2ec4`
- Neon Green: `#00ff9c`

## 📝 Notes

- The contact form simulates submission (shows success animation).
  To enable real email delivery, integrate EmailJS:
  1. Create an account at https://emailjs.com
  2. Add your service ID + template ID in `src/components/levels/ContactLevel.tsx`
- LinkedIn blocks scraping, so certification names are inferred from
  Anmol's stated focus areas. Update `CERTIFICATIONS` in player-data.ts
  with exact certificate names/issuers/dates if needed.

## 🚢 Deployment

Deploy to Vercel:
1. Push this project to a GitHub repo
2. Import it on https://vercel.com
3. Vercel auto-detects Next.js — just click Deploy

---

© 2026 ANMOL MADHAV // ALL LEVELS RESERVED
Built with Next.js + Three.js + Framer Motion + way too much caffeine.
