"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { Mail, Check, Copy, Send, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" aria-label="Ready for Collaboration" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel p-8 sm:p-14 text-center max-w-3xl mx-auto relative overflow-hidden border border-amber-400/30 hover:border-amber-400/60 shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all">
          {/* Subtle Champagne Gold Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[90px] bg-amber-500/15 pointer-events-none"
          />

          {/* Section Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_12px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#F6E27A]" />
            <span>02 • COLLABORATION</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-3">
            Ready to Build Together?
          </h2>

          {/* Signature Quote with Liquid Gold Gradient */}
          <p className="text-lg sm:text-xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] max-w-xl mx-auto italic mb-4">
            “Different people. Different strengths. One team. One goal.”
          </p>

          <p className="text-sm text-slate-400 max-w-lg mx-auto font-light leading-relaxed mb-8">
            Give us a high-impact problem statement. We bring curiosity, mathematical precision, and rapid execution.
          </p>

          {/* Direct Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="px-5 py-3 rounded-full glass-panel hover:bg-white/10 border border-white/15 hover:border-amber-400/50 text-xs sm:text-sm font-mono text-white transition-all flex items-center gap-2 group shadow-lg"
            >
              <Mail className="w-4 h-4 text-[#F6E27A]" />
              <span>{siteConfig.contact.email}</span>
              {copied ? (
                <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 transition-colors" />
              )}
            </button>

            {/* GitHub Organization CTA */}
            <a
              href={siteConfig.contact.githubOrg}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] text-black font-bold text-xs sm:text-sm hover:shadow-[0_0_25px_rgba(246,226,122,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4 text-black" />
              <span>GitHub Organization</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
