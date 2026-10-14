"use client";

import React, { useEffect, useRef, useState } from "react";

interface ShootingMeteor {
  id: number;
  startX: number;
  startY: number;
  length: number;
  angle: number;
  speed: number;
  progress: number; // 0 to 1
  opacity: number;
  size: number;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMeteors, setActiveMeteors] = useState<ShootingMeteor[]>([]);

  // 1. Moving Starfield Canvas (60fps continuous cosmic drift)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate 160 drifting stars
    const starCount = 160;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25 - 0.1, // gentle leftward drift
      vy: (Math.random() - 0.5) * 0.2 + 0.15, // gentle downward cosmic drift
      alpha: Math.random() * 0.8 + 0.2,
      dAlpha: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      isGold: Math.random() > 0.4,
    }));

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw and update moving stars
      for (const s of stars) {
        s.x += s.vx * 60 * delta;
        s.y += s.vy * 60 * delta;

        // Wrap around borders
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Twinkle
        s.alpha += s.dAlpha;
        if (s.alpha > 0.95 || s.alpha < 0.2) {
          s.dAlpha *= -1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.isGold
          ? `rgba(246, 226, 122, ${Math.max(0, s.alpha)})`
          : `rgba(255, 253, 245, ${Math.max(0, s.alpha)})`;
        ctx.shadowBlur = s.size > 1.5 ? 6 : 0;
        ctx.shadowColor = "#F6E27A";
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Dynamic Shooting Stars ("Tutate Tare") Spawner (Comes dynamically over time)
  useEffect(() => {
    let meteorIdCounter = 0;

    const spawnMeteor = () => {
      const startX = Math.random() * (window.innerWidth * 0.7) + window.innerWidth * 0.2;
      const startY = Math.random() * (window.innerHeight * 0.4);
      const angle = 35 + Math.random() * 15; // 35 - 50 degrees downwards
      const length = 180 + Math.random() * 120;
      const speed = 700 + Math.random() * 400; // px/sec

      const newMeteor: ShootingMeteor = {
        id: ++meteorIdCounter,
        startX,
        startY,
        length,
        angle,
        speed,
        progress: 0,
        opacity: 1,
        size: Math.random() * 1.5 + 1.5,
      };

      setActiveMeteors((prev) => [...prev, newMeteor]);
    };

    // Spawn meteor every 3.5 to 6 seconds
    let timeoutId: NodeJS.Timeout;
    const scheduleNext = () => {
      const nextDelay = 3000 + Math.random() * 3500;
      timeoutId = setTimeout(() => {
        spawnMeteor();
        scheduleNext();
      }, nextDelay);
    };

    // First spawn quickly after mount
    const initialDelay = setTimeout(() => {
      spawnMeteor();
      scheduleNext();
    }, 1200);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeoutId);
    };
  }, []);

  // Animate and garbage collect active meteors
  useEffect(() => {
    if (activeMeteors.length === 0) return;

    let animFrame: number;
    let prev = performance.now();

    const tickMeteors = (now: number) => {
      const dt = (now - prev) / 1000;
      prev = now;

      setActiveMeteors((list) =>
        list
          .map((m) => {
            const nextProgress = m.progress + (m.speed * dt) / 900;
            const nextOpacity = nextProgress > 0.7 ? 1 - (nextProgress - 0.7) / 0.3 : 1;
            return {
              ...m,
              progress: nextProgress,
              opacity: Math.max(0, nextOpacity),
            };
          })
          .filter((m) => m.progress < 1)
      );

      animFrame = requestAnimationFrame(tickMeteors);
    };

    animFrame = requestAnimationFrame(tickMeteors);
    return () => cancelAnimationFrame(animFrame);
  }, [activeMeteors.length]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* 1. Moving Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 2. Golden Ambient Cosmic Nebulas */}
      <div
        className="absolute -top-[15%] right-[10%] w-[700px] h-[700px] rounded-full blur-[150px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(246, 226, 122, 0.45) 0%, rgba(212, 175, 55, 0.18) 50%, transparent 75%)",
        }}
      />
      <div
        className="absolute top-[35%] -left-[10%] w-[550px] h-[550px] rounded-full blur-[140px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, rgba(127, 97, 20, 0.12) 60%, transparent 80%)",
        }}
      />
      <div
        className="absolute -bottom-[10%] left-[25%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(246, 226, 122, 0.3) 0%, rgba(212, 175, 55, 0.1) 50%, transparent 75%)",
        }}
      />

      {/* 3. Dynamic Shooting Stars ("Tutate Tare") */}
      {activeMeteors.map((m) => {
        const rad = (m.angle * Math.PI) / 180;
        const currentDist = m.progress * 800;
        const currentX = m.startX - Math.cos(rad) * currentDist;
        const currentY = m.startY + Math.sin(rad) * currentDist;

        return (
          <div
            key={m.id}
            className="absolute pointer-events-none"
            style={{
              left: `${currentX}px`,
              top: `${currentY}px`,
              opacity: m.opacity,
              transform: `rotate(-${m.angle}deg)`,
              transformOrigin: "left center",
            }}
          >
            {/* Blazing Meteor Head & Fading Stardust Tail */}
            <div
              className="relative"
              style={{
                width: `${m.length}px`,
                height: `${m.size}px`,
                background:
                  "linear-gradient(90deg, #FFFFFF 0%, rgba(255,253,245,1) 15%, rgba(246,226,122,0.85) 45%, rgba(212,175,55,0.2) 80%, transparent 100%)",
                boxShadow: "0 0 12px 2px rgba(246, 226, 122, 0.95)",
                borderRadius: "999px",
              }}
            >
              {/* Ultra Bright Meteor Core */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_15px_4px_#FFFDF5]"
                style={{ width: `${m.size * 2}px`, height: `${m.size * 2}px` }}
              />
            </div>
          </div>
        );
      })}

      {/* 4. Floating Sleeper Astronaut in Zero-G with Cosmic Tether */}
      <div className="absolute top-[24%] left-[10%] opacity-45 animate-float-slow hidden md:block">
        <div className="relative">
          {/* Subtle golden tether cord waving into the void */}
          <svg
            width="120"
            height="140"
            viewBox="0 0 120 140"
            fill="none"
            className="absolute -top-16 -left-16 pointer-events-none opacity-30"
          >
            <path
              d="M10 10 Q 50 60, 95 110"
              stroke="#F6E27A"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
          </svg>

          {/* Sleeper Astronaut Figure */}
          <svg
            width="42"
            height="50"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_0_12px_rgba(246,226,122,0.5)] transform -rotate-12"
          >
            {/* Helmet Visor with Gold Reflection */}
            <circle cx="12" cy="7" r="5" stroke="#F6E27A" strokeWidth="1.2" fill="#0c1220" />
            <ellipse cx="12" cy="7" rx="3.5" ry="2.2" fill="#F6E27A" opacity="0.85" />
            {/* Torso & Suit */}
            <path
              d="M8 12 C8 12 7 19 8 20 L16 20 C17 19 16 12 16 12 Z"
              stroke="#F6E27A"
              strokeWidth="1.2"
              fill="#080c16"
            />
            {/* Oxygen Backpack with Sleep Beacon */}
            <rect x="5.5" y="12" width="2.5" height="7" rx="1" fill="#D4AF37" opacity="0.8" />
            <circle cx="6.5" cy="13.5" r="0.8" fill="#F6E27A" className="animate-ping" />
            {/* Relaxed Sleeper Limbs */}
            <path d="M8 13 L4 17" stroke="#F6E27A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M16 13 L20 16" stroke="#F6E27A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M10 20 L9 26" stroke="#F6E27A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M14 20 L15 26" stroke="#F6E27A" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
