"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";
import { teamMembers } from "@/data/team";
import { projectsData } from "@/data/projects";
import { Modal } from "@/components/ui/Modal";
import { Search, Hash, User, FolderGit2, ArrowRight } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled externally or we can toggle
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const normalized = query.toLowerCase().trim();

  const filteredNav = siteConfig.navLinks.filter((l) =>
    l.label.toLowerCase().includes(normalized)
  );

  const filteredMembers = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(normalized) ||
      m.role.toLowerCase().includes(normalized)
  );

  const filteredProjects = projectsData.filter(
    (p) =>
      p.name.toLowerCase().includes(normalized) ||
      p.tagline.toLowerCase().includes(normalized)
  );

  const handleSelectLink = (href: string) => {
    onClose();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl liquid-glass border border-[rgba(212,175,55,0.4)]">
          <Search className="w-4 h-4 text-[#F6E27A] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, members, projects..."
            className="w-full bg-transparent text-sm text-[#FFFDF5] placeholder-[#64748B] focus:outline-none font-medium"
            autoFocus
          />
        </div>

        {/* Search Results / Quick Links */}
        <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
          {/* Navigation Links */}
          {filteredNav.length > 0 && (
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8] mb-1.5 px-2">
                Navigation
              </p>
              <div className="space-y-1">
                {filteredNav.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleSelectLink(link.href)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-xs text-[#CBD5E1] hover:text-[#FFFDF5] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5 text-[#F6E27A]" />
                      <span>{link.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Team Members */}
          {filteredMembers.length > 0 && (
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8] mb-1.5 px-2">
                Team Members
              </p>
              <div className="space-y-1">
                {filteredMembers.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelectLink("#team")}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-xs text-[#CBD5E1] hover:text-[#FFFDF5] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#F6E27A]" />
                      <span>{m.name}</span>
                      <span className="text-[#64748B] text-[11px]">({m.role})</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8] mb-1.5 px-2">
                Projects
              </p>
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectLink("#projects")}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-xs text-[#CBD5E1] hover:text-[#FFFDF5] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-3.5 h-3.5 text-[#F6E27A]" />
                      <span>{p.name}</span>
                      <span className="text-[#64748B] text-[11px] truncate max-w-[150px]">
                        {p.category}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
