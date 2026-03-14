"use client";

import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  accentTop?: boolean;
  large?: boolean;
  className?: string;
}

export default function StatCard({
  value,
  label,
  accentTop = false,
  large = false,
  className = "",
}: StatCardProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        borderTop: accentTop ? "3px solid var(--color-gold)" : undefined,
        padding: large ? "14px 18px" : "10px 14px",
      }}
    >
      <div
        className="font-bold leading-tight"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: large ? "30px" : "22px",
          color: "#ffffff",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: "3px",
          fontFamily: "var(--font-sans)",
          fontSize: "8px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          color: "var(--color-gold)",
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </div>
  );
}
