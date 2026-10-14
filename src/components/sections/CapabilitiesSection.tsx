"use client";

import React, { useState } from "react";
import { capabilitiesData } from "@/data/capabilities";
import { teamMembers } from "@/data/team";
import { projectsData } from "@/data/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Network, CheckCircle2, UserCheck, FolderCheck, ArrowRight } from "lucide-react";

export function CapabilitiesSection() {
  const [activeCapId, setActiveCapId] = useState<string>(capabilitiesData[0].id);

  const activeCapability =
    capabilitiesData.find((c) => c.id === activeCapId) || capabilitiesData[0];

  const matchedMembers = teamMembers.filter((m) =>
    activeCapability.associatedMemberIds.includes(m.id)
  );

  const matchedProjects = projectsData.filter((p) =>
    activeCapability.associatedProjectIds.includes(p.id)
  );

  return (
    <section id="capabilities" aria-label="Our Combined Capabilities" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Network className="w-4 h-4 text-[#F6E27A]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#F6E27A]">
              Skill Synergies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFDF5] tracking-tight">
            Our Combined Capabilities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
            An evidence-backed cross-matrix connecting core engineering disciplines, the team members who own them, and the projects proving them.
          </p>
        </div>

        {/* Interactive Capability Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Capability Selector Pills (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-[#94A3B8] mb-1 px-1">
              Select a Core Discipline
            </h3>
            {capabilitiesData.map((cap) => {
              const isSelected = cap.id === activeCapId;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapId(cap.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between ${
                    isSelected
                      ? "liquid-glass-gold border-[#F6E27A] shadow-[0_4px_25px_rgba(212,175,55,0.2)]"
                      : "liquid-glass border-[rgba(255,255,255,0.06)] hover:border-[rgba(246,226,122,0.3)] text-[#94A3B8]"
                  }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-bold tracking-tight ${
                        isSelected ? "text-[#FFFDF5]" : "text-[#CBD5E1]"
                      }`}
                    >
                      {cap.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#F6E27A]/90 mt-0.5">
                      {cap.category}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? "text-[#F6E27A] translate-x-1"
                        : "text-[#64748B] opacity-50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Linked Synthesis Dossier (7 cols) */}
          <div className="lg:col-span-7">
            <GlassCard variant="gold" className="p-6 sm:p-8">
              {/* Active Discipline Header */}
              <div className="border-b border-[rgba(255,255,255,0.08)] pb-5 mb-6">
                <Badge variant="gold" size="sm" className="mb-2">
                  {activeCapability.category}
                </Badge>
                <h3 className="text-2xl font-extrabold text-[#FFFDF5] tracking-tight">
                  {activeCapability.name}
                </h3>
                <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                  {activeCapability.description}
                </p>
              </div>

              {/* Evidence Verification */}
              <div className="mb-6 p-4 rounded-xl bg-[rgba(7,9,14,0.7)] border border-[rgba(212,175,55,0.25)]">
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-1.5 mb-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#F6E27A]" />
                  <span>Verified Concrete Evidence</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                  {activeCapability.evidenceText}
                </p>
              </div>

              {/* Associated Members */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#94A3B8] flex items-center gap-1.5 mb-3">
                  <UserCheck className="w-4 h-4 text-[#F6E27A]" />
                  <span>Team Specialists Driving This Domain</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedMembers.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl liquid-glass border border-[rgba(255,255,255,0.08)] flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#1A2338] border border-[rgba(212,175,55,0.4)] flex items-center justify-center font-bold text-xs text-[#F6E27A]">
                        {m.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#FFFDF5]">
                          {m.name}
                        </span>
                        <span className="text-[10px] text-[#94A3B8] truncate max-w-[170px]">
                          {m.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proving Projects */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-[#94A3B8] flex items-center gap-1.5 mb-3">
                  <FolderCheck className="w-4 h-4 text-[#F6E27A]" />
                  <span>Showcase Projects Demonstrating This</span>
                </h4>
                <div className="space-y-2">
                  {matchedProjects.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl liquid-glass border border-[rgba(255,255,255,0.06)] flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-[#FFFDF5] block">
                          {p.name}
                        </span>
                        <span className="text-[11px] text-[#94A3B8]">
                          {p.tagline}
                        </span>
                      </div>
                      <Badge variant="subtle" size="sm">
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
