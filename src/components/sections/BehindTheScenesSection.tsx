"use client";

import React, { useState } from "react";
import { behindTheScenesData, terminalEasterEggs } from "@/data/behindTheScenes";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import confetti from "canvas-confetti";
import { Terminal, Flame, Bug, Lightbulb, History, Send, Sparkles } from "lucide-react";

export function BehindTheScenesSection() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<
    { command: string; response: string }[]
  >([
    {
      command: "welcome",
      response:
        "⚡ AuraCraft Developer Console initialized. Type 'help' to inspect hidden team logs or 'mascot --pet' to trigger golden sparks.",
    },
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setTerminalLogs([]);
      setTerminalInput("");
      return;
    }

    if (cmd === "mascot --pet") {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#F6E27A", "#D4AF37", "#FFFDF5"],
        });
      } catch {}
    }

    const matched = terminalEasterEggs.find((item) => item.command === cmd);
    const response = matched
      ? matched.response
      : `Command not recognized: '${cmd}'. Type 'help' for available commands.`;

    setTerminalLogs((prev) => [...prev, { command: terminalInput, response }]);
    setTerminalInput("");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "story":
        return <Flame className="w-4 h-4 text-[#F6E27A]" />;
      case "debugging":
        return <Bug className="w-4 h-4 text-[#F87171]" />;
      case "iteration":
        return <Lightbulb className="w-4 h-4 text-[#38BDF8]" />;
      default:
        return <History className="w-4 h-4 text-[#A78BFA]" />;
    }
  };

  return (
    <section id="bts" aria-label="Behind the Scenes" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4 text-[#F6E27A]" />
            <span className="text-xs uppercase font-mono tracking-widest text-[#F6E27A]">
              The Real Sprint Culture
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFDF5] tracking-tight">
            Behind the Scenes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
            Beyond glossy presentations: late-night debugging marathons, unexpected breakthroughs, and the stories that forged our team chemistry.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {behindTheScenesData.map((item) => (
            <GlassCard key={item.id} variant="default" className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg liquid-glass flex items-center justify-center">
                      {getTypeIcon(item.type)}
                    </div>
                    <Badge variant="subtle" size="sm">
                      {item.tag}
                    </Badge>
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#FFFDF5] mb-2 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                  {item.content}
                </p>
              </div>

              {item.quote && (
                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  <p className="text-xs italic text-[#FEF9E7]/90 font-serif">
                    {item.quote}
                  </p>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Interactive Hacker Terminal Easter Egg Console */}
        <div className="max-w-3xl mx-auto rounded-2xl liquid-glass-elevated border border-[rgba(212,175,55,0.4)] overflow-hidden shadow-[0_16px_45px_rgba(0,0,0,0.8)]">
          {/* Terminal Window Header */}
          <div className="bg-[#0A0E17] px-4 py-3 border-b border-[rgba(255,255,255,0.08)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
              <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
              <span className="ml-2 font-mono text-xs text-[#94A3B8]">
                auracraft@engine: ~
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#F6E27A]">
              <Sparkles className="w-3 h-3" />
              <span>Interactive Console</span>
            </div>
          </div>

          {/* Terminal Log Area */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-3 max-h-60 overflow-y-auto bg-[#07090E]/90 text-[#CBD5E1]">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                {log.command !== "welcome" && (
                  <div className="flex items-center gap-2 text-[#F6E27A]">
                    <span className="opacity-70">&gt;</span>
                    <span className="font-bold">{log.command}</span>
                  </div>
                )}
                <div className="text-[#94A3B8] pl-3 leading-relaxed">
                  {log.response}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Command Input Form */}
          <form
            onSubmit={handleCommandSubmit}
            className="flex items-center gap-2 px-4 py-3 bg-[#0A0E17] border-t border-[rgba(255,255,255,0.08)]"
          >
            <span className="font-mono text-xs text-[#F6E27A]">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type 'help', 'team --list', 'sih --status'..."
              className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-[#FFFDF5] placeholder-[#64748B] focus:outline-none"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg liquid-glass text-[#F6E27A] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              aria-label="Submit command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
