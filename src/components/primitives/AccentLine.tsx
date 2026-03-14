"use client";

import React from "react";

interface AccentLineProps {
  direction?: "horizontal" | "vertical";
  length?: string;
  className?: string;
}

export default function AccentLine({
  direction = "horizontal",
  length = "100%",
  className = "",
}: AccentLineProps) {
  return (
    <div
      className={className}
      style={{
        background: "var(--color-gold)",
        ...(direction === "horizontal"
          ? { width: length, height: "3px" }
          : { width: "3px", height: length }),
      }}
    />
  );
}
