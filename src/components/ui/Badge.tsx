import React from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "emerald" | "subtle" | "outline";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant = "gold",
  size = "md",
  icon,
  className,
}: BadgeProps) {
  const variantStyles = {
    gold: "bg-[rgba(212,175,55,0.12)] text-[#F6E27A] border border-[rgba(212,175,55,0.35)] shadow-[0_0_12px_rgba(212,175,55,0.15)]",
    emerald: "bg-[rgba(16,185,129,0.12)] text-[#34D399] border border-[rgba(16,185,129,0.35)] shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    subtle: "bg-[rgba(255,255,255,0.06)] text-[#E2E8F0] border border-[rgba(255,255,255,0.1)]",
    outline: "bg-transparent text-[#94A3B8] border border-[rgba(255,255,255,0.15)]",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-xs font-medium px-3.5 py-1.5 gap-2",
  };

  return (
    <span
      className={twMerge(
        "inline-flex items-center rounded-full tracking-wide transition-all duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
