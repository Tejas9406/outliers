"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "2xl",
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07090E]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidthClasses[maxWidth]} bg-[#0F1420]/95 border border-[rgba(212,175,55,0.3)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(212,175,55,0.15)] rounded-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Highlight Accent Bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F6E27A] to-transparent"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-[#94A3B8] hover:text-[#FFFDF5] hover:bg-[rgba(255,255,255,0.08)] border border-transparent hover:border-[rgba(255,255,255,0.15)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6E27A]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-6 pr-8">
            {title && (
              <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-[#94A3B8]">{subtitle}</p>
            )}
          </div>
        )}

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}
