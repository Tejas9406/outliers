"use client";

import React, { useState } from "react";
import { workflowSteps } from "@/data/workflow";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Workflow, CheckCircle, Clock, FileCode, Wrench, ShieldAlert } from "lucide-react";

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStepData =
    workflowSteps.find((s) => s.stepNumber === activeStep) || workflowSteps[0];

  return (
    <section id="workflow" aria-label="How We Solve Problems" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Workflow className="w-4 h-4 text-[#F6E27A]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#F6E27A]">
              Execution Methodology
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFDF5] tracking-tight">
            How We Solve Problems
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
            Hackathons aren&apos;t won with chaotic last-minute hacks. We execute an 8-phase precision engineering pipeline from discovery to live deployment.
          </p>
        </div>

        {/* Step Progression Stepper Bar */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[700px] border-b border-[rgba(255,255,255,0.08)] pb-4">
            {workflowSteps.map((step) => {
              const isActive = step.stepNumber === activeStep;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`flex flex-col items-center gap-2 px-3 py-1 group transition-all duration-200 relative ${
                    isActive ? "scale-105" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#F6E27A] text-[#07090E] shadow-[0_0_15px_rgba(246,226,122,0.6)]"
                        : "bg-[#161E30] text-[#94A3B8] border border-[rgba(255,255,255,0.1)] group-hover:border-[#F6E27A]"
                    }`}
                  >
                    0{step.stepNumber}
                  </div>
                  <span
                    className={`text-[11px] font-medium text-center truncate max-w-[85px] ${
                      isActive ? "text-[#F6E27A] font-semibold" : "text-[#94A3B8]"
                    }`}
                  >
                    {step.title.split(" ")[0]}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#F6E27A] rounded-full shadow-[0_0_8px_#F6E27A]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Deep Dive Card */}
        <GlassCard variant="gold" className="p-6 sm:p-10 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="gold" size="sm">
                  {currentStepData.phase}
                </Badge>
                <span className="flex items-center gap-1 text-xs font-mono text-[#94A3B8]">
                  <Clock className="w-3.5 h-3.5 text-[#F6E27A]" />
                  {currentStepData.duration}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FFFDF5] tracking-tight">
                {currentStepData.title}
              </h3>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#E2E8F0] leading-relaxed mb-8">
            {currentStepData.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Artifacts Produced */}
            <div className="p-4 rounded-xl liquid-glass border border-[rgba(255,255,255,0.06)]">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-2 mb-3 font-bold">
                <FileCode className="w-4 h-4" />
                <span>Deliverables Produced</span>
              </h4>
              <ul className="space-y-2">
                {currentStepData.artifactsProduced.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[#94A3B8]"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#F6E27A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Used */}
            <div className="p-4 rounded-xl liquid-glass border border-[rgba(255,255,255,0.06)]">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-2 mb-3 font-bold">
                <Wrench className="w-4 h-4" />
                <span>Tooling & Environment</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {currentStepData.toolsUsed.map((tool, idx) => (
                  <Badge key={idx} variant="subtle" size="sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sprint Mechanism */}
            <div className="p-4 rounded-xl liquid-glass border border-[rgba(255,255,255,0.06)]">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#F6E27A] flex items-center gap-2 mb-3 font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Team Guardrail</span>
              </h4>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                {currentStepData.sprintMechanism}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
