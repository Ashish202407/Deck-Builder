"use client";

import React from "react";

interface GoldTopBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function GoldTopBox({
  children,
  className = "",
}: GoldTopBoxProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        borderTop: "3px solid var(--color-gold)",
        background: "rgba(21, 48, 61, 0.8)",
        padding: "10px 14px",
        borderRadius: "0 0 2px 2px",
      }}
    >
      {children}
    </div>
  );
}
