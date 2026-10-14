"use client";

import { useState, useEffect } from "react";

export interface ScrollState {
  progress: number; // 0 to 1
  activeSection: string;
  activeSectionLabel: string;
}

const SECTIONS = [
  { id: "hero", label: "Origin (Hero)" },
  { id: "team", label: "Who We Are" },
  { id: "projects", label: "Universal Projects" },
  { id: "contact", label: "Collaboration" },
];

export function useScrollProgress() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    activeSection: "hero",
    activeSectionLabel: "Origin (Hero)",
  });

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const normalized =
          scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;

        // Determine active section
        const scrollMiddle = scrollTop + window.innerHeight * 0.35;
        let currentSection = SECTIONS[0].id;
        let currentLabel = SECTIONS[0].label;

        for (const sec of SECTIONS) {
          const el = document.getElementById(sec.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollMiddle >= top && scrollMiddle < top + height) {
              currentSection = sec.id;
              currentLabel = sec.label;
              break;
            }
          }
        }

        setScrollState({
          progress: normalized,
          activeSection: currentSection,
          activeSectionLabel: currentLabel,
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return scrollState;
}
