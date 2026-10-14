"use client";

import React, { useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { PhotorealisticMoon } from "@/components/background/PhotorealisticMoon";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { CursorSpaceship } from "@/components/spaceship/CursorSpaceship";
import { CosmicScrollProgress } from "@/components/ui/CosmicScrollProgress";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { CommandPalette } from "@/components/ui/CommandPalette";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { progress, activeSection, activeSectionLabel } = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#F8FAFC] selection:bg-[#F6E27A]/30 selection:text-white font-sans antialiased">
      {/* 
        Feature 1: Persistent 3D Photorealistic Moon
        Rotates on its own local Y-axis. 
        Zero blur when scrolling so the lunar surface remains sharp and pristine.
      */}
      <PhotorealisticMoon progress={progress} />

      {/* Ambient Celestial Glow with Moving Stars, Shooting Stars & Floating Astronaut */}
      <AmbientBackground />

      {/* 
        Interactive Miniature Spaceship Cursor:
        Travels with the cursor with billowing golden thruster gas fog.
      */}
      <CursorSpaceship />

      {/* 
        Feature 2: Cosmic Scroll Progress Indicator
        Slim vertical celestial path with NO future track below the moving star node.
      */}
      <CosmicScrollProgress
        progress={progress}
        activeSection={activeSection}
        activeSectionLabel={activeSectionLabel}
      />

      {/* Top Floating Glass Navigation */}
      <SiteHeader onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Streamlined, High-Impact Landing Page */}
      <main className="relative z-10">
        {/* Section 1: Hero (Interactive clickable OUTLIERS name, verified SIH winner, CTAs) */}
        <HeroSection />

        {/* Section 2: Who We Are (4 Core Builders with Auto-Scroll Sequential Flip & Know Me Dossiers) */}
        <TeamSection />

        {/* Section 3: Universal Team Projects (What We Have Built) */}
        <ProjectsSection />

        {/* Section 4: Collaboration & Contact (One-click email copy & organization link) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* Quick Search & Switcher Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
