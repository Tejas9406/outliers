"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";

interface SiteHeaderProps {
  onOpenCommandPalette?: () => void;
}

export function SiteHeader({ onOpenCommandPalette }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#030712]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Pill from Claude Portfolio - Golden Theme */}
          <a
            href="#"
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-[#0d1222]/80 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.15)] group transition-all duration-300 hover:border-amber-400"
            aria-label={`${siteConfig.teamName} Home`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#F6E27A] shadow-[0_0_8px_#F6E27A] animate-pulse" />
            <span className="font-display font-bold text-sm tracking-wide text-white group-hover:text-amber-300 transition-colors uppercase">
              OUTLIERS
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/90 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-400/30">
              SIH 2024
            </span>
          </a>

          {/* Desktop Navigation Links Pill from Claude Portfolio */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel rounded-full px-5 py-1.5 border border-white/10 shadow-lg">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 text-xs font-mono tracking-wide text-slate-300 hover:text-[#FFFDF5] hover:bg-white/10 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Tools: Command Palette + CTA Button - Golden Edition */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Command Palette Button */}
            <button
              onClick={onOpenCommandPalette}
              aria-label="Open Command Palette (Cmd+K)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs text-slate-300 hover:text-white hover:border-amber-400/50 transition-all duration-200"
            >
              <Terminal className="w-3.5 h-3.5 text-[#F6E27A]" />
              <span className="font-mono text-[11px] opacity-75">⌘K</span>
            </button>

            {/* Radiant Gold CTA Button */}
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(246,226,122,0.5)] hover:scale-105 text-[#05070c] font-bold text-xs tracking-wide transition-all duration-300 flex items-center gap-1.5"
            >
              <span>Select Us</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCommandPalette}
              aria-label="Open Command Palette"
              className="p-2 rounded-full glass-panel text-[#F6E27A]"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-full glass-panel text-slate-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 px-6 py-5 mt-3 space-y-3">
          <nav className="flex flex-col space-y-2">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-mono text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] text-black font-bold text-center text-xs tracking-wide shadow-[0_0_15px_rgba(246,226,122,0.4)]"
            >
              Select Us ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
