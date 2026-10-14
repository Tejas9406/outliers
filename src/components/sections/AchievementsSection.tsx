"use client";

import React, { useState } from "react";
import { achievementsData } from "@/data/achievements";
import { AchievementCategory } from "@/types";
import { Trophy, ExternalLink, Calendar, Award } from "lucide-react";

export function AchievementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>("All");

  const categories: AchievementCategory[] = ["All", "Hackathon", "Open Source", "Engineering"];

  const filteredAchievements = achievementsData.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  return (
    <section
      id="achievements"
      aria-label="Verified Achievements"
      className="py-28 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Section Header from Claude Portfolio */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,245,255,0.1)]">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>03 • PROVEN PODIUMS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight mb-3">
            Verified Achievements
          </h2>
          <p className="text-lg sm:text-xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300 mb-2 italic">
            “Proven performance under pressure, backed by verifiable records.”
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Podium victories and verified hackathon track records across national stages.
          </p>
        </div>

        {/* Filter Pills from Claude Portfolio */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap items-center gap-1.5 glass-panel p-1.5 rounded-full border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-[#00f5ff] text-black font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Podium Cards Grid from Claude Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-2xl glass-panel p-6 border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(0,245,255,0.15)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-cyan-300/80">
                    ✦ PODIUM 0{idx + 1}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      item.status === "Winner"
                        ? "border border-amber-400/40 bg-amber-950/40 text-amber-300"
                        : "border border-emerald-400/40 bg-emerald-950/40 text-emerald-300"
                    }`}
                  >
                    <Award className="w-3 h-3" />
                    <span>{item.status}</span>
                  </span>
                </div>

                {/* Event Name & Org */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                  <span>{item.event}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
                  {item.description}
                </p>
              </div>

              {/* Verified Proof Action */}
              {item.evidenceUrl && (
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">Verified Proof</span>
                  <a
                    href={item.evidenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>{item.evidenceLabel || "View Record"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
