"use client";

import React from "react";
import { Project } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Globe, BookOpen, Cpu, CheckCircle, Users, Sparkles, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.name}
      subtitle={project.tagline}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Status & Category Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl liquid-glass border border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2">
            <Badge
              variant={project.status === "Hackathon Winner" ? "gold" : "subtle"}
              size="sm"
            >
              {project.status}
            </Badge>
            <span className="text-xs font-mono text-[#94A3B8]">
              {project.category}
            </span>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg liquid-glass text-xs font-medium text-[#FFFDF5] hover:border-[rgba(212,175,55,0.5)] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] text-xs font-semibold text-[#07090E] hover:shadow-[0_0_15px_rgba(246,226,122,0.4)] transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg liquid-glass text-xs font-medium text-[#94A3B8] hover:text-[#FFFDF5] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Docs</span>
              </a>
            )}
          </div>
        </div>

        {/* Problem vs Solution Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Problem Statement */}
          <div className="p-4 rounded-xl liquid-glass border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.03)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F87171] mb-2 font-bold flex items-center gap-1.5">
              <span>The Problem</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Proposed Solution */}
          <div className="p-4 rounded-xl liquid-glass-gold border border-[rgba(212,175,55,0.3)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F6E27A] mb-2 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Solution</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#FFFDF5] leading-relaxed">
              {project.proposedSolution}
            </p>
          </div>
        </div>

        {/* Benchmark Metrics (if available) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl liquid-glass text-center border border-[rgba(255,255,255,0.06)]"
              >
                <p className="text-base sm:text-xl font-bold text-gradient-gold">
                  {m.value}
                </p>
                <p className="text-[11px] text-[#94A3B8] font-medium mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Technical Algorithms & Architecture Highlights */}
        <div>
          <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4" />
            <span>Key Algorithms & Engineering Decisions</span>
          </h4>
          <ul className="space-y-2">
            {project.keyAlgorithms.map((algo, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#94A3B8] p-2.5 rounded-lg liquid-glass border border-[rgba(255,255,255,0.04)]"
              >
                <CheckCircle className="w-4 h-4 text-[#F6E27A] shrink-0 mt-0.5" />
                <span>{algo}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div>
          <h4 className="text-xs uppercase font-mono tracking-wider text-[#94A3B8] mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#F6E27A]" />
            <span>Technology Stack</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="subtle" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Team Contributions */}
        <div>
          <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-2 mb-3">
            <Users className="w-4 h-4" />
            <span>Who Built What</span>
          </h4>
          <div className="space-y-2">
            {project.teamMembers.map((tm) => (
              <div
                key={tm.memberId}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-lg liquid-glass text-xs"
              >
                <span className="font-semibold text-[#FFFDF5] font-mono">
                  {tm.memberName}
                </span>
                <span className="text-[#94A3B8]">{tm.contribution}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
