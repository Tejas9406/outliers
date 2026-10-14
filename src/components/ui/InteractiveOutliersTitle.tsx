"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Zap } from "lucide-react";

interface LetterSpec {
  char: string;
  codename: string;
  tagline: string;
  freq: number;
}

const OUTLIER_LETTERS: LetterSpec[] = [
  { char: "O", codename: "Orbit", tagline: "Defying conventional boundaries", freq: 261.63 },
  { char: "U", codename: "Unbound", tagline: "Unconstrained first-principles thinking", freq: 293.66 },
  { char: "T", codename: "Titans", tagline: "SIH 2024 National Grand Champions", freq: 329.63 },
  { char: "L", codename: "Luminous", tagline: "Zero hallucination, verified architecture", freq: 392.00 },
  { char: "I", codename: "Infinite", tagline: "Relentless 36-hour sprint stamina", freq: 440.00 },
  { char: "E", codename: "Elite", tagline: "Low-latency distributed systems & edge AI", freq: 493.88 },
  { char: "R", codename: "Resilient", tagline: "Fault-tolerant, production-ready code", freq: 523.25 },
  { char: "S", codename: "Squad", tagline: "4 minds, 1 unstoppable trajectory", freq: 659.25 },
];

export function InteractiveOutliersTitle() {
  const [activeLetter, setActiveLetter] = useState<LetterSpec | null>(null);
  const [clickedSet, setClickedSet] = useState<Set<string>>(new Set());
  const [comboUnlocked, setComboUnlocked] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play audio chime safely via Web Audio API
  const playCosmicChime = (freq: number) => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Golden cosmic harmonic tone
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Audio context policy safe fallback
    }
  };

  const handleLetterClick = (item: LetterSpec) => {
    playCosmicChime(item.freq);
    setActiveLetter(item);

    setClickedSet((prev) => {
      const next = new Set(prev);
      next.add(item.char);
      if (next.size === OUTLIER_LETTERS.length) {
        setComboUnlocked(true);
      }
      return next;
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Interactive Letter Row */}
      <h1
        className="flex items-center justify-center gap-1 sm:gap-2 text-6xl sm:text-7xl md:text-9xl font-display font-black tracking-tight uppercase leading-none select-none cursor-pointer"
        aria-label="OUTLIERS interactive team name"
      >
        {OUTLIER_LETTERS.map((item, idx) => {
          const isClicked = clickedSet.has(item.char);
          const isActive = activeLetter?.char === item.char;

          return (
            <button
              key={idx}
              onClick={() => handleLetterClick(item)}
              aria-label={`Letter ${item.char} - ${item.codename}`}
              className={`relative group inline-block transition-all duration-200 transform hover:-translate-y-2.5 hover:scale-110 active:scale-95 focus:outline-none ${
                isActive
                  ? "text-[#FFFDF5] scale-110 -translate-y-2 drop-shadow-[0_0_35px_rgba(246,226,122,0.95)]"
                  : isClicked
                  ? "text-[#F6E27A] drop-shadow-[0_0_25px_rgba(246,226,122,0.6)]"
                  : "text-[#FFFDF5] hover:text-[#F6E27A] drop-shadow-[0_0_20px_rgba(246,226,122,0.3)]"
              }`}
            >
              <span>{item.char}</span>

              {/* Glowing Dot Beneath Active / Clicked Letter */}
              <span
                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#FFFDF5] scale-150 shadow-[0_0_8px_#FFFDF5]"
                    : isClicked
                    ? "bg-[#F6E27A] opacity-80"
                    : "opacity-0 group-hover:opacity-60 bg-amber-400"
                }`}
              />
            </button>
          );
        })}
      </h1>

      {/* Interactive Easter Egg / Power Word Popover */}
      {activeLetter ? (
        <div className="mt-4 px-4 py-2 rounded-full glass-panel border border-amber-400/40 shadow-[0_0_25px_rgba(246,226,122,0.3)] animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2 text-xs sm:text-sm font-mono text-[#F6E27A]">
          <Zap className="w-3.5 h-3.5 text-[#F6E27A] animate-pulse" />
          <span className="font-bold text-[#FFFDF5] tracking-wide uppercase">
            {activeLetter.char} — {activeLetter.codename}:
          </span>
          <span className="text-amber-200/90 font-light hidden sm:inline">
            {activeLetter.tagline}
          </span>
        </div>
      ) : (
        <p className="mt-3 text-[11px] font-mono text-amber-300/60 uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#F6E27A] animate-spin" />
          <span>Click each letter to play cosmic chimes & unlock squad codenames</span>
        </p>
      )}

      {/* Supernova Celebration Banner when all 8 are clicked */}
      {comboUnlocked && (
        <div className="mt-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-950 via-[#1e1706] to-amber-950 border border-amber-300/60 text-[11px] font-mono text-[#FFFDF5] shadow-[0_0_25px_rgba(246,226,122,0.4)] animate-pulse flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F6E27A]" />
          <span>✦ ALL 8 OUTLIER CODES ACTIVATED • FULL CONSTELLATION HARMONIZED ✦</span>
        </div>
      )}
    </div>
  );
}
