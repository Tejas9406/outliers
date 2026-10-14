"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { ArrowUp, Sparkles, Heart } from "lucide-react";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-amber-400/15 py-12 relative z-10 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-amber-400/30 bg-amber-950/40 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.2)]">
              <Sparkles className="w-4 h-4 text-[#F6E27A]" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-white">
                OUTLIERS COLLECTIVE
              </p>
              <p className="text-xs text-slate-400 font-mono">
                SIH Champions • High Velocity Execution
              </p>
            </div>
          </div>

          {/* Copyright & Tagline */}
          <div className="text-center md:text-right text-xs text-slate-500 font-mono">
            <p className="flex items-center justify-center md:justify-end gap-1.5">
              <span>Engineered for Hackathons</span>
              <Heart className="w-3 h-3 text-[#F6E27A] fill-[#F6E27A]" />
              <span>with Zero Hallucinations</span>
            </p>
            <p className="mt-1">
              © {siteConfig.footer.copyrightYear} OUTLIERS. All rights reserved.
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-3 rounded-full glass-panel hover:bg-white/10 hover:border-amber-400/50 text-slate-400 hover:text-[#F6E27A] transition-all group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
