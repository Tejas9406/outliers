"use client";

import React, { useEffect, useState, useRef } from "react";

interface GasParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export function CursorSpaceship() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shipRef = useRef<HTMLDivElement | null>(null);
  const reticleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
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

    let mouseX = -100;
    let mouseY = -100;
    let shipX = -100;
    let shipY = -100;
    let angle = 0;
    let currentAngle = 0;
    let animId: number;
    let hasMoved = false;

    const gasParticles: GasParticle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        shipX = mouseX;
        shipY = mouseY;
        setIsVisible(true);
        document.body.classList.add("spaceship-cursor-active");
      }

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!(
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer")
        );
        setIsHovering(isClickable);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
      document.body.classList.remove("spaceship-cursor-active");
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        setIsVisible(true);
        document.body.classList.add("spaceship-cursor-active");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Warm Golden and Cosmic Amber Gas Colors
    const gasColors = [
      "rgba(255, 253, 245, ", // starlight champagne
      "rgba(246, 226, 122, ", // liquid radiant gold
      "rgba(234, 179, 8, ",   // warm golden amber
      "rgba(245, 158, 11, ",  // solar flare orange
      "rgba(212, 175, 55, ",  // metallic signature gold
    ];

    // Smooth animation & gas simulation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (hasMoved && shipRef.current) {
        const dx = mouseX - shipX;
        const dy = mouseY - shipY;
        const dist = Math.hypot(dx, dy);

        // Smooth follow physics
        shipX += dx * 0.22;
        shipY += dy * 0.22;

        // Calculate flight angle facing direction of movement
        if (dist > 1.2) {
          angle = Math.atan2(dy, dx) + Math.PI / 2;
        }

        // Angle lerp for smooth banking
        let diff = angle - currentAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        currentAngle += diff * 0.22;

        // Position the miniature spaceship
        shipRef.current.style.transform = `translate3d(${shipX}px, ${shipY}px, 0) rotate(${currentAngle}rad)`;

        // Pinpoint reticle on exact mouse coordinates
        if (reticleRef.current) {
          reticleRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

        // Emit colored gas & smoke fog puffs behind the engine while moving
        if (dist > 0.8) {
          // Thruster nozzle position in world coordinates (behind the ship)
          const exhaustDistance = 14;
          const nozzleX = shipX - Math.sin(currentAngle) * exhaustDistance;
          const nozzleY = shipY + Math.cos(currentAngle) * exhaustDistance;

          const puffsToSpawn = dist > 6 ? 2 : 1;
          for (let i = 0; i < puffsToSpawn; i++) {
            const spreadAngle = currentAngle + Math.PI / 2 + (Math.random() - 0.5) * 0.7;
            const puffSpeed = Math.random() * 1.5 + 0.5;
            gasParticles.push({
              x: nozzleX + (Math.random() - 0.5) * 4,
              y: nozzleY + (Math.random() - 0.5) * 4,
              vx: Math.cos(spreadAngle) * puffSpeed,
              vy: Math.sin(spreadAngle) * puffSpeed,
              size: Math.random() * 4 + 3,
              alpha: Math.min(0.85, 0.4 + dist * 0.04),
              color: gasColors[Math.floor(Math.random() * gasColors.length)],
            });
          }
        }
      }

      // Update and draw billowing colored gas fog
      for (let i = gasParticles.length - 1; i >= 0; i--) {
        const p = gasParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.38; // Gas expands as it disperses
        p.alpha -= 0.024; // Soft dissipation

        if (p.alpha <= 0) {
          gasParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = "#F6E27A";
        ctx.shadowBlur = p.size * 1.5;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.body.classList.remove("spaceship-cursor-active");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Canvas for Colored Thruster Fog & Billowing Smoke */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      />

      {/* 1. Pinpoint Starlight Reticle right at cursor (X, Y) */}
      <div
        ref={reticleRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            isHovering
              ? "bg-[#F6E27A] shadow-[0_0_14px_#F6E27A] scale-150"
              : isClicking
              ? "bg-[#D4AF37] shadow-[0_0_16px_#D4AF37] scale-125"
              : "bg-[#FFFDF5] shadow-[0_0_8px_#F6E27A]"
          }`}
        />

        {/* Tactical Crosshair / Lock-on Ring when hovering links/buttons */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/80 transition-all duration-300 ${
            isHovering
              ? "w-7 h-7 opacity-100 shadow-[0_0_14px_rgba(246,226,122,0.7)] rotate-45"
              : "w-0 h-0 opacity-0"
          }`}
        />
      </div>

      {/* 2. Compact Miniature Golden Starfighter (24px x 28px) */}
      <div
        ref={shipRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <svg
          width="26"
          height="30"
          viewBox="0 0 26 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-150 filter drop-shadow-[0_0_10px_rgba(246,226,122,0.65)] ${
            isClicking ? "scale-125" : isHovering ? "scale-115" : "scale-100"
          }`}
        >
          <defs>
            {/* Liquid Champagne Gold Hull */}
            <linearGradient id="miniShipHull" x1="13" y1="1" x2="13" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF5" />
              <stop offset="35%" stopColor="#F6E27A" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>

            {/* Glowing Cockpit */}
            <linearGradient id="miniCockpit" x1="13" y1="8" x2="13" y2="17" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF5" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>

          {/* Miniature Main Delta Wing */}
          <path
            d="M13 1 L18 12 L25 21 L20 24 L16 22 L13 25 L10 22 L6 24 L1 21 L8 12 Z"
            fill="url(#miniShipHull)"
            stroke="#F6E27A"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />

          {/* Interior Canopy / Cockpit */}
          <polygon
            points="13,8 15,16 13,18 11,16"
            fill="url(#miniCockpit)"
            stroke="#FFFDF5"
            strokeWidth="0.5"
          />

          {/* Wingtip Golden Starlight Beacons */}
          <circle cx="1" cy="21" r="1.1" fill="#FFFDF5" />
          <circle cx="25" cy="21" r="1.1" fill="#FFFDF5" />
          <circle cx="13" cy="2" r="1.1" fill="#FFFDF5" />
        </svg>
      </div>
    </div>
  );
}
