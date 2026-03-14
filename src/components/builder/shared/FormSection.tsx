"use client";

import React from "react";

interface FormSectionProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({
  label,
  description,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={`mb-5 ${className}`}>
      <label
        className="block mb-1 font-medium"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          color: "#ffffff",
        }}
      >
        {label}
      </label>
      {description && (
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            color: "var(--color-cream-dim)",
          }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
