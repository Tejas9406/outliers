"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "gold" | "interactive" | "cosmic";
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function GlassCard({
  variant = "cosmic",
  children,
  className,
  as: Component = "div",
  ...props
}: GlassCardProps) {
  const variantStyles = {
    cosmic:
      "cosmic-node rounded-2xl hover:-translate-y-1 transition-all duration-300",
    default:
      "cosmic-node rounded-2xl hover:border-[rgba(246,226,122,0.3)] transition-all duration-300",
    elevated:
      "liquid-glass-elevated rounded-2xl hover:shadow-[0_16px_40px_rgba(212,175,55,0.2)] transition-all duration-300",
    gold:
      "liquid-glass-gold rounded-2xl hover:border-[rgba(246,226,122,0.5)] transition-all duration-300",
    interactive:
      "cosmic-node rounded-2xl hover:bg-[rgba(22,30,52,0.35)] hover:border-[rgba(246,226,122,0.45)] hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(212,175,55,0.15)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6E27A]",
  };

  return (
    <Component
      className={twMerge(
        "p-6 relative group select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {/* Delicate Ethereal Corner Coordinate Brackets */}
      <span aria-hidden="true" className="cosmic-crosshair cosmic-crosshair-tl" />
      <span aria-hidden="true" className="cosmic-crosshair cosmic-crosshair-br" />

      {/* Subtle Ethereal Stardust Light Sweep */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[rgba(246,226,122,0.04)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
      />
      {children}
    </Component>
  );
}
