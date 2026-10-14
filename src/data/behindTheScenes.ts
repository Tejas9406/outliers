import { BehindTheScenesItem } from "@/types";

export const behindTheScenesData: BehindTheScenesItem[] = [
  {
    id: "bts-1",
    type: "story",
    title: "The 3:00 AM Mesh Breakthrough",
    date: "Smart India Hackathon, Hour 27",
    tag: "Breakthrough",
    content: "At 3:15 AM, the radio packet loss spiked to 78% across the test hallway. Tejas and Ananya traced it to an unbuffered mutex lock in the radio driver. When the fix compiled and 50 packets flowed uninterrupted with zero latency, the entire lab erupted.",
    quote: "“It didn't work for 6 hours, and then in 30 seconds of clean refactoring, it felt like magic.”",
  },
  {
    id: "bts-2",
    type: "debugging",
    title: "The 12-Megabyte Memory Leak Mystery",
    date: "ETHIndia Hackathon, Hour 19",
    tag: "Bug Hunt",
    content: "Our zero-knowledge proof prover was silently chewing 400MB of RAM on mobile Safari and crashing the tab. Rohan spotted that three WebGL texture canvases weren't calling gl.deleteTexture() during re-renders. A 4-line patch dropped memory back to 28MB permanently.",
    quote: "“Profile before you assume. The leak is always where you least expect it.”",
  },
  {
    id: "bts-3",
    type: "iteration",
    title: "Designing the Golden Mascot Universe",
    date: "AuraCraft Identity Sprint",
    tag: "Design Iteration",
    content: "We originally tested 5 different 3D mascots: an aggressive cybernetic mech, a geometric polygon sphere, and a golden companion. The golden companion won instantly because it radiates warmth, technical precision, and playful optimism without looking like generic corporate tech.",
    quote: "“Serious technology deserves a friendly, memorable heart.”",
  },
  {
    id: "bts-4",
    type: "milestone",
    title: "From 4 Strangers to Podiums Across India",
    date: "Team AuraCraft Journey",
    tag: "Milestone",
    content: "We met in a university robotics lab while arguing over whether Rust or Go was superior for edge telemetry. That debate lasted 3 hours, ended over shared chai, and resulted in our first hackathon team registration the following Monday.",
    quote: "“Great teams aren't formed by agreement. They're formed by mutual respect and shared curiosity.”",
  },
];

export const terminalEasterEggs = [
  { command: "team --list", response: "Tejas (Systems) | Ananya (AI/ML) | Rohan (3D/UX) | Priya (Full-Stack & Product)" },
  { command: "sih --status", response: "🏆 SIH Grand Finale 1st Place Champions. 1,200+ teams surpassed." },
  { command: "mascot --pet", response: "✨ AuraBot purrs happily and spins with golden sparkle dust!" },
  { command: "stack --secret", response: "🚀 Next.js 16 + React 19 + Three.js + Tailwind CSS 4 + Pure Passion." },
  { command: "help", response: "Available commands: team --list, sih --status, mascot --pet, stack --secret, clear" },
];
