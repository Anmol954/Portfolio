import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const techMono = Share_Tech_Mono({
  variable: "--font-tech-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ANMOL MADHAV // AI Engineer · Data Scientist · Full-Stack Dev",
  description: "LEVEL UP — A cyberpunk game-style portfolio. You are the recruiter. Hire the Player. Explore missions, skills, achievements, and the boss fight against Imposter Syndrome.",
  keywords: ["Anmol Madhav", "AI Engineer", "Data Scientist", "Full Stack Developer", "Portfolio", "Cyberpunk", "Machine Learning", "Deep Learning", "Python", "React", "Next.js"],
  authors: [{ name: "Anmol Madhav" }],
  openGraph: {
    title: "ANMOL MADHAV // LEVEL UP",
    description: "A futuristic cyberpunk RPG-style portfolio. Press ENTER to start.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANMOL MADHAV // LEVEL UP",
    description: "A futuristic cyberpunk RPG-style portfolio. Press ENTER to start.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${techMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
