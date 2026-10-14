"use client";

import React, { useState, useEffect, useRef } from "react";
import { teamMembers } from "@/data/team";
import { TeamMember } from "@/types";
import { TeamCard3D } from "@/components/team/TeamCard3D";
import { MemberProfileModal } from "@/components/team/MemberProfileModal";
import { User, Sparkles, Wand2, RotateCw } from "lucide-react";

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flipStates, setFlipStates] = useState<boolean[]>([false, false, false, false]);
  const [allFlippedManually, setAllFlippedManually] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleOpenDossier = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // Scroll-driven sequential 1-by-1 card flip
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) return;

        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

        // Progressively flip cards 1 by 1:
        // Card 0 flips at progress >= 0.15
        // Card 1 flips at progress >= 0.35
        // Card 2 flips at progress >= 0.55
        // Card 3 flips at progress >= 0.75
        const c0 = progress >= 0.15;
        const c1 = progress >= 0.35;
        const c2 = progress >= 0.55;
        const c3 = progress >= 0.75;

        setFlipStates([c0, c1, c2, c3]);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAllCards = () => {
    const nextState = !allFlippedManually;
    setAllFlippedManually(nextState);
    setFlipStates([nextState, nextState, nextState, nextState]);
  };

  const flippedCount = flipStates.filter(Boolean).length;

  return (
    <section
      id="team"
      ref={sectionRef}
      aria-label="Meet the Team"
      className="relative min-h-[200vh] py-12"
    >
      {/* Sticky Viewport Stage: Locks in view while user scrolls to flip all 4 cards 1-by-1 */}
      <div className="sticky top-16 md:top-20 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <User className="w-3.5 h-3.5 text-[#F6E27A]" />
            <span>01 • SQUAD COMPOSITION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-2">
            Who We Are
          </h2>

          <p className="text-base sm:text-lg font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] mb-2 italic">
            “Different people. Different strengths. One team. One goal.”
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Scroll down to watch each member automatically reveal their Ghibli alter-ego one-by-one, or tap any card to explore their verified dossier.
          </p>

          {/* Sequential Scroll Flip Status Pill */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-amber-400/30 text-[11px] font-mono text-amber-300">
              <Wand2 className="w-3.5 h-3.5 text-[#F6E27A]" />
              <span>
                Auto-Flip on Scroll: {flippedCount}/4 Ghibli Personas Revealed
              </span>
            </div>

            <button
              onClick={toggleAllCards}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
            >
              <RotateCw className="w-3 h-3 text-[#F6E27A]" />
              <span>{flippedCount === 4 ? "Reset to Photos" : "Flip All 4"}</span>
            </button>
          </div>
        </div>

        {/* 4 3D Flipping Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, idx) => (
            <TeamCard3D
              key={member.id}
              member={member}
              index={idx}
              forceFlipped={flipStates[idx]}
              onOpenModal={handleOpenDossier}
            />
          ))}
        </div>
      </div>

      {/* Deep Dossier Modal */}
      {selectedMember && (
        <MemberProfileModal
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
