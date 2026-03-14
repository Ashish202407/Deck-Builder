"use client";

import React from "react";

interface NumberedPointProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export default function NumberedPoint({
  number,
  title,
  description,
  className = "",
}: NumberedPointProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <div
        className="flex-shrink-0"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--color-gold)",
          lineHeight: 1.2,
          minWidth: "24px",
        }}
      >
        {number}.
      </div>
      <div className="flex-1 pt-0.5">
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 600,
            color: "#ffffff",
            marginBottom: "3px",
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 400,
            color: "var(--color-cream-dim)",
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
