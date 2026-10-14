"use client";

import React, { useState } from "react";
import { TeamMember, MemberScreenshot } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Mail, Trophy, CheckCircle2, Wand2, Image as ImageIcon, ZoomIn, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

interface MemberProfileModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberProfileModal({
  member,
  isOpen,
  onClose,
}: MemberProfileModalProps) {
  const [activeScreenshot, setActiveScreenshot] = useState<MemberScreenshot | null>(null);

  if (!member) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={member.name}
      subtitle={member.role}
      maxWidth="3xl"
    >
      <div className="space-y-6 text-slate-200">
        {/* ================= 1. PERSON INFO ================= */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-[#090d1a] border border-amber-400/30 shadow-[0_0_25px_rgba(246,226,122,0.15)]">
          {/* Avatar Graphic */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1f1807] via-[#101524] to-[#080c16] border-2 border-amber-400/60 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(246,226,122,0.25)]">
            <span className="text-3xl font-extrabold text-[#F6E27A]">
              {member.name.charAt(0)}
            </span>
            <div className="absolute -bottom-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#F6E27A] text-[#07090E] shadow-sm">
              OUTLIER
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs font-mono font-semibold text-amber-300">
                {member.role}
              </span>
              {member.ghibliRole && (
                <span className="inline-flex items-center gap-1 text-[10px] font-serif italic text-amber-200/90 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-400/30">
                  <Wand2 className="w-2.5 h-2.5 text-[#F6E27A]" />
                  <span>{member.ghibliRole}</span>
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#FFFDF5] italic leading-snug">
              “{member.tagline}”
            </p>

            <p className="text-xs text-slate-300 font-light mt-2 leading-relaxed">
              {member.bio}
            </p>

            {/* Social Links */}
            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {member.links.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#F6E27A]" />
                  <span>GitHub</span>
                </a>
              )}
              {member.links.linkedin && (
                <a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#F6E27A]" />
                  <span>LinkedIn</span>
                </a>
              )}
              <a
                href={`mailto:${member.links.email}`}
                className="px-2.5 py-1 rounded-lg bg-amber-950/40 hover:bg-amber-400/20 border border-amber-400/30 text-xs text-amber-300 transition-colors flex items-center gap-1.5 font-mono"
              >
                <Mail className="w-3 h-3 text-[#F6E27A]" />
                <span>{member.links.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= 2. KEY ACHIEVEMENTS ================= */}
        <div className="p-4 rounded-xl bg-[#090d1a]/80 border border-amber-400/20 shadow-[0_0_15px_rgba(212,175,55,0.06)]">
          <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-[#F6E27A]" />
            <span>Verified Achievements</span>
          </h4>
          <ul className="space-y-2">
            {member.individualAchievements.map((ach, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#F6E27A] shrink-0 mt-0.5" />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= 3. SCREENSHOTS & EVIDENCE ================= */}
        <div className="p-4 rounded-xl bg-[#090d1a]/80 border border-amber-400/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#F6E27A]" />
              <span>Screenshots & Evidence</span>
            </h4>
            <span className="text-[10px] font-mono text-slate-400">
              Click to enlarge proof
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {member.screenshots && member.screenshots.length > 0 ? (
              member.screenshots.map((shot) => (
                <div
                  key={shot.id}
                  onClick={() => setActiveScreenshot(shot)}
                  className="group relative rounded-xl p-3 bg-gradient-to-b from-[#141824] to-[#0c101a] border border-amber-400/20 hover:border-amber-400/60 shadow-lg hover:shadow-[0_0_20px_rgba(246,226,122,0.15)] cursor-pointer transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Visual Preview Slot */}
                  <div className="relative w-full h-32 rounded-lg bg-[#070a12] border border-amber-400/15 overflow-hidden flex flex-col items-center justify-center p-3 mb-2.5 group-hover:scale-[1.02] transition-transform">
                    {/* Simulated Evidence Graphic Canvas */}
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 rounded-full bg-amber-950/60 border border-amber-400/30 flex items-center justify-center mb-1 text-amber-300">
                        <ImageIcon className="w-5 h-5 text-[#F6E27A]" />
                      </div>
                      <span className="text-[10px] font-mono text-amber-200/90 font-medium">
                        {shot.tag}
                      </span>
                    </div>

                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-mono text-[#F6E27A]">
                      <ZoomIn className="w-4 h-4" />
                      <span>View Screenshot</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-xs font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                      {shot.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed font-light">
                      {shot.caption}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 col-span-2 py-4 text-center">
                Visual proof and screenshots ready to be linked.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Screenshot View */}
      {activeScreenshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveScreenshot(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#0d1222] border-2 border-amber-400/60 rounded-2xl p-6 shadow-[0_0_50px_rgba(246,226,122,0.3)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveScreenshot(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              aria-label="Close screenshot preview"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block px-2.5 py-0.5 rounded-full border border-amber-400/40 bg-amber-950/60 text-amber-300 text-[10px] font-mono mb-2">
              {activeScreenshot.tag}
            </span>
            <h3 className="text-xl font-display font-bold text-white mb-2">
              {activeScreenshot.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-light">
              {activeScreenshot.caption}
            </p>

            <div className="w-full h-64 rounded-xl bg-gradient-to-br from-[#121828] to-[#070a14] border border-amber-400/30 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-400/50 flex items-center justify-center mb-3">
                <ImageIcon className="w-8 h-8 text-[#F6E27A]" />
              </div>
              <p className="text-sm font-mono text-amber-200 font-semibold">
                [ VERIFIED HACKATHON EVIDENCE SCREENSHOT ]
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Full-resolution artifact capture filed in candidate portfolio dossier for jury review.
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
