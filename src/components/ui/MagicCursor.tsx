"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

export function MagicCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable on touch devices or small screens
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768);

    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    const dot = cursorDotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const particles: Particle[] = [];
    let mouseX = -100;
    let mouseY = -100;
    let targetX = -100;
    let targetY = -100;
    let animationFrameId: number;

    const goldColors = [
      "rgba(255, 253, 245, ",
      "rgba(246, 226, 122, ",
      "rgba(212, 175, 55, ",
      "rgba(237, 206, 66, ",
    ];

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Spawn 1-2 subtle particles on movement
      if (Math.random() < 0.6) {
        const colorPrefix =
          goldColors[Math.floor(Math.random() * goldColors.length)];
        particles.push({
          x: targetX + (Math.random() - 0.5) * 8,
          y: targetY + (Math.random() - 0.5) * 8,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.8,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.6 - 0.2,
          color: colorPrefix,
        });
      }
    };

    const onClick = (e: MouseEvent) => {
      // Burst of golden sparks on click
      for (let i = 0; i < 14; i++) {
        const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 2.5 + 1.2;
        const colorPrefix =
          goldColors[Math.floor(Math.random() * goldColors.length)];
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 2.8 + 1.2,
          alpha: 1,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colorPrefix,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    const render = () => {
      // Smooth interpolation for the cursor dot
      mouseX += (targetX - mouseX) * 0.25;
      mouseY += (targetY - mouseY) * 0.25;

      if (dot) {
        dot.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.024;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Particle trail canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 hidden md:block"
      />
      {/* Tiny golden pointer glow dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-50 bg-[#F6E27A] shadow-[0_0_12px_3px_rgba(212,175,55,0.7)] hidden md:block"
        style={{
          willChange: "transform",
        }}
      />
    </>
  );
}
