"use client";

import React, { useState } from "react";
import { TeamMember } from "@/types";
import { RotateCw, ArrowRight, Sparkles, User, Wand2 } from "lucide-react";

interface TeamCard3DProps {
  member: TeamMember;
  index: number;
  onOpenModal: (member: TeamMember) => void;
  forceFlipped?: boolean;
}

export function TeamCard3D({ member, index, onOpenModal, forceFlipped }: TeamCard3DProps) {
  const [manualFlipped, setManualFlipped] = useState<boolean | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const isFlipped = manualFlipped !== null ? manualFlipped : Boolean(forceFlipped);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setManualFlipped(!isFlipped);
  };

  return (
    <div
      className="perspective-1000 w-full max-w-sm mx-auto h-[480px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out cursor-pointer group"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
        }}
        onClick={() => setManualFlipped(!isFlipped)}
      >
        {/* ================= FRONT OF CARD: PROFESSIONAL PROFILE ================= */}
        <div
          className="absolute inset-0 rounded-3xl p-6 border border-amber-400/30 group-hover:border-amber-400/80 group-hover:shadow-[0_0_35px_rgba(246,226,122,0.25)] transition-all duration-300 flex flex-col justify-between bg-[#080d1a]/95 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            zIndex: isFlipped ? 1 : 2,
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-950/60 text-amber-300 text-[11px] font-mono shadow-[0_0_10px_rgba(212,175,55,0.15)]">
              ✦ SQUAD #{String(index + 1).padStart(2, "0")}
            </span>
            <button
              onClick={toggleFlip}
              aria-label="Flip to Ghibli persona"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-950/40 hover:bg-amber-400/20 text-[10px] font-mono text-amber-300 transition-colors"
            >
              <Wand2 className="w-3 h-3 text-[#F6E27A]" />
              <span>Ghibli ↺</span>
            </button>
          </div>

          {/* Professional Photo Slot */}
          <div className="relative my-2 flex flex-col items-center">
            <div className="relative w-36 h-36 rounded-2xl p-1.5 bg-gradient-to-br from-[#1e1909] via-[#0d1222] to-[#040713] border-2 border-amber-400/40 group-hover:border-amber-300 shadow-[0_0_25px_rgba(246,226,122,0.2)] flex items-center justify-center transition-all overflow-hidden">
              {/* Outer Dashed Arc */}
              <div className="absolute inset-0 rounded-2xl dashed-arc-gold group-hover:rotate-180 transition-all duration-1000 opacity-60" />

              {/* Photo / Silhouette Placeholder */}
              <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#182033] to-[#0b0f1d] flex flex-col items-center justify-center text-center p-2 overflow-hidden border border-amber-400/20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-900/60 to-amber-700/30 border border-amber-400/40 flex items-center justify-center mb-1">
                  <span className="text-2xl font-display font-black text-[#F6E27A]">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300/80 bg-black/60 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Professional Photo
                </span>
              </div>
            </div>
          </div>

          {/* Member Name & Role */}
          <div className="text-center">
            <h3 className="text-xl font-display font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
              {member.name}
            </h3>
            <p className="text-xs font-mono text-amber-300/90 mt-1">
              {member.role}
            </p>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-2 font-light">
              {member.tagline}
            </p>
          </div>

          {/* "Know Me" Primary CTA Button */}
          <div className="space-y-2 pt-2 border-t border-amber-400/15">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(member);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(246,226,122,0.5)] hover:scale-[1.02] active:scale-95 text-[#07090e] font-bold text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Know Me</span>
              <ArrowRight className="w-4 h-4 text-[#07090e]" />
            </button>

            {/* Bottom Flip Prompt */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-amber-300 transition-colors">
              <Sparkles className="w-3 h-3 text-[#F6E27A]" />
              <span>Tap card to view Ghibli persona</span>
              <RotateCw className="w-3 h-3 text-amber-400 ml-0.5" />
            </div>
          </div>
        </div>

        {/* ================= BACK OF CARD: GHIBLI ANIME ALTER-EGO ================= */}
        <div
          className="absolute inset-0 rounded-3xl p-6 border border-amber-300/60 shadow-[0_0_35px_rgba(246,226,122,0.3)] flex flex-col justify-between bg-gradient-to-b from-[#141009] via-[#0d1222] to-[#080d1a] shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            zIndex: isFlipped ? 2 : 1,
          }}
        >
          {/* Back Top Bar */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-950/70 text-amber-200 text-[11px] font-mono shadow-[0_0_12px_rgba(246,226,122,0.2)]">
              <Sparkles className="w-3 h-3 text-[#F6E27A]" />
              <span>GHIBLI ALTER-EGO</span>
            </span>
            <button
              onClick={toggleFlip}
              aria-label="Flip back to professional card"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-950/40 hover:bg-amber-400/20 text-[10px] font-mono text-amber-300 transition-colors"
            >
              <span>Photo ↺</span>
            </button>
          </div>

          {/* Ghibli Anime Photo Slot */}
          <div className="relative my-2 flex flex-col items-center">
            <div className="relative w-36 h-36 rounded-2xl p-1.5 bg-gradient-to-br from-[#2a220d] via-[#1a1429] to-[#0a0f1d] border-2 border-amber-300/70 shadow-[0_0_25px_rgba(246,226,122,0.3)] flex items-center justify-center transition-all overflow-hidden">
              {/* Outer Dashed Arc with Stardust Glow */}
              <div className="absolute inset-0 rounded-2xl dashed-arc-gold group-hover:rotate-180 transition-all duration-1000 opacity-80" />

              {/* Anime Persona Slot */}
              <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#251d12] to-[#0f1422] flex flex-col items-center justify-center text-center p-2 overflow-hidden border border-amber-300/40">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/30 to-amber-300/20 border border-amber-300/60 flex items-center justify-center mb-1 shadow-[0_0_15px_rgba(246,226,122,0.3)]">
                  <Wand2 className="w-8 h-8 text-[#F6E27A] animate-pulse" />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#F6E27A] bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-400/50">
                  Ghibli Picture
                </span>
              </div>
            </div>
          </div>

          {/* Ghibli Name & Role */}
          <div className="text-center">
            <h3 className="text-lg font-display font-bold text-[#FFFDF5] tracking-tight">
              {member.name}
            </h3>
            <p className="text-xs font-serif italic text-[#F6E27A] mt-1 font-semibold">
              ✦ {member.ghibliRole || "Spirit Navigator"}
            </p>
            <p className="text-xs text-amber-200/80 italic line-clamp-2 leading-relaxed mt-2 font-light">
              “{member.ghibliTagline || member.tagline}”
            </p>
          </div>

          {/* "Know Me" Primary CTA Button */}
          <div className="space-y-2 pt-2 border-t border-amber-400/15">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(member);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(246,226,122,0.5)] hover:scale-[1.02] active:scale-95 text-[#07090e] font-bold text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Know Me</span>
              <ArrowRight className="w-4 h-4 text-[#07090e]" />
            </button>

            {/* Bottom Flip Prompt */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-amber-300 transition-colors">
              <User className="w-3 h-3 text-[#F6E27A]" />
              <span>Tap to return to photo card</span>
              <RotateCw className="w-3 h-3 text-amber-400 ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
