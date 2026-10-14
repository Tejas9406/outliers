"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { Project, ProjectCategory } from "@/types";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { Code2, ArrowUpRight, Globe, Star, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: ProjectCategory[] = [
    "All",
    "AI & ML",
    "Full-Stack",
    "Distributed Systems",
    "Web3 & Security",
  ];

  const filteredProjects = projectsData.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" aria-label="Universal Team Projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Golden Theme */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Code2 className="w-3.5 h-3.5 text-[#F6E27A]" />
            <span>02 • UNIVERSAL TEAM PROJECTS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight mb-3">
            What We Have Built
          </h2>
          <p className="text-lg sm:text-xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] mb-2 italic">
            “High-impact solutions engineered from first principles.”
          </p>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Real-world architectures and hackathon flagship deliverables created by the Outliers team.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap items-center gap-1.5 glass-panel p-1.5 rounded-full border border-amber-400/20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] text-[#07090E] font-bold shadow-[0_0_15px_rgba(246,226,122,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="rounded-3xl glass-panel p-8 border border-white/10 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(246,226,122,0.15)] transition-all duration-500 cursor-pointer group flex flex-col justify-between bg-[#080d1a]/90"
              onClick={() => handleOpenProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOpenProject(project);
                }
              }}
            >
              <div>
                {/* Top Badge Bar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-amber-300/80">
                      ✦ MISSION 0{idx + 1}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-amber-400/40 bg-amber-950/60 text-amber-200 text-[10px] font-mono font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>FLAGSHIP</span>
                      </span>
                    )}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-slate-400">
                    {project.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-display font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between gap-2 mb-2">
                  <span>{project.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light mb-6">
                  {project.tagline}
                </p>

                {/* Structured Solution Box */}
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] mb-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#F6E27A] font-bold">
                      Solution Architecture
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {project.proposedSolution}
                  </p>
                </div>

                {/* Metrics 3-Col Strip */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5 mb-6">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center"
                      >
                        <p className="text-base font-display font-bold text-[#FFFDF5]">
                          {metric.value}
                        </p>
                        <p className="text-[10px] font-mono text-amber-300/80 uppercase tracking-wider mt-0.5">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg glass-pill hover:bg-amber-400/20 text-slate-400 hover:text-[#F6E27A] transition-colors"
                      aria-label="Open Live Demo"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg glass-pill hover:bg-amber-400/20 text-slate-400 hover:text-[#F6E27A] transition-colors"
                      aria-label="Open GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <span className="text-xs font-mono text-amber-300/90 group-hover:text-amber-200 flex items-center gap-1 transition-colors">
                  Inspect Mission Specs ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Architecture Deep Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
