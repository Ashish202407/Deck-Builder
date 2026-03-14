"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";

interface DeckShellProps {
  children: React.ReactNode;
  totalSlides: number;
  className?: string;
}

export default function DeckShell({
  children,
  totalSlides,
  className = "",
}: DeckShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToSlide = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSlides - 1));
      const container = containerRef.current;
      if (!container) return;
      const slides = container.querySelectorAll(".slide");
      slides[clamped]?.scrollIntoView({ behavior: "smooth" });
    },
    [totalSlides]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          scrollToSlide(currentSlide + 1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          scrollToSlide(currentSlide - 1);
          break;
        case "Home":
          e.preventDefault();
          scrollToSlide(0);
          break;
        case "End":
          e.preventDefault();
          scrollToSlide(totalSlides - 1);
          break;
      }
    },
    [currentSlide, totalSlides, scrollToSlide]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Track current slide via intersection observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slides = Array.from(container.querySelectorAll(".slide"));
            const index = slides.indexOf(entry.target as HTMLElement);
            if (index !== -1) setCurrentSlide(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    const slides = container.querySelectorAll(".slide");
    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [totalSlides]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`deck-shell ${className}`}
      >
        {children}
      </div>

      {/* Progress bar */}
      <div className="no-print fixed bottom-0 left-0 right-0 h-1 z-50 bg-navy-darker">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${((currentSlide + 1) / totalSlides) * 100}%`,
            background: "var(--color-gold)",
          }}
        />
      </div>

      {/* Slide counter */}
      <div
        className="no-print fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded text-xs font-medium"
        style={{
          background: "var(--color-navy-darker)",
          color: "var(--color-cream-dim)",
          border: "1px solid rgba(197, 165, 90, 0.2)",
        }}
      >
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
}
