"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { Trophy, ArrowDown, Sparkles, Code2, Users, Cpu } from "lucide-react";

import { InteractiveOutliersTitle } from "@/components/ui/InteractiveOutliersTitle";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[92vh] pt-36 pb-20 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-center flex flex-col items-center">
        {/* Floating Dossier Kicker Badge from Claude Portfolio - Golden Theme */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#F6E27A]" />
          <span>Official Hackathon Candidacy Dossier</span>
        </div>

        {/* Top Side Floating Pills from Claude Portfolio */}
        <div className="w-full flex items-center justify-between max-w-4xl px-2 mb-4 hidden md:flex">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/20 bg-[#0d1222]/60 text-amber-300/90 text-[11px] font-mono">
            <Cpu className="w-3 h-3 text-[#F6E27A]" />
            <span>SMART INDIA HACKATHON 2024</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-950/40 text-amber-300 text-[11px] font-mono shadow-[0_0_12px_rgba(212,175,55,0.2)]">
            <Users className="w-3 h-3 text-[#F6E27A]" />
            <span>4 MINDS • 1 SQUAD</span>
          </div>
        </div>

        {/* Giant Interactive Display Title - Click each character */}
        <div className="relative mb-2">
          <InteractiveOutliersTitle />
          <p className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-widest text-[#94A3B8]/25 uppercase mt-1 mb-3">
            COLLECTIVE
          </p>
        </div>

        {/* Signature Quote with Liquid Gold Accent from Claude Portfolio */}
        <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] max-w-3xl leading-snug">
          “We Don&apos;t Fit the Box. We Build Outside It.”
        </p>

        {/* Pill Sub-Tag from Claude Portfolio */}
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs sm:text-sm font-mono mt-3 mb-6">
          Different people. Different strengths. One team. One goal.
        </div>

        {/* Brief Narrative */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-9 font-light">
          A high-velocity multidisciplinary engineering collective championing distributed systems, zero-knowledge proofs, and edge AI built to excel in national hackathon arenas.
        </p>

        {/* Dual Pill Action Buttons from Claude Portfolio - Golden Edition */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#team"
            className="px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#05070c] bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] hover:shadow-[0_0_35px_rgba(246,226,122,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 tracking-wide"
          >
            <span>Meet the Team</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#projects"
            className="px-7 py-3.5 rounded-full font-medium text-xs sm:text-sm text-white glass-panel hover:bg-white/10 hover:border-amber-400/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 tracking-wide border border-white/15"
          >
            <Code2 className="w-4 h-4 text-[#F6E27A]" />
            <span>Universal Projects</span>
          </a>
        </div>

        {/* Clean Metric Counters Row - Golden Theme */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center max-w-3xl w-full">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-amber-400/40 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.05)]">
            <p className="text-3xl font-display font-black text-[#FFFDF5]">4</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-amber-300/90 mt-1">Specialists</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-amber-400/40 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.05)]">
            <p className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37]">#1</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-amber-300/90 mt-1">SIH Winner</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-amber-400/40 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.05)]">
            <p className="text-3xl font-display font-black text-[#F6E27A]">100%</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-amber-300/90 mt-1">Execution</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-amber-400/40 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.05)]">
            <p className="text-3xl font-display font-black text-amber-200">0</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-amber-300/90 mt-1">Hallucination</p>
          </div>
        </div>
      </div>
    </section>
  );
}
