"use client";

import React from "react";
import { useBuilderStore } from "@/lib/store";
import SlideSelector from "@/components/builder/SlideSelector";
import SlideWizard from "@/components/builder/SlideWizard";
import PreviewMode from "@/components/builder/PreviewMode";

export default function BuilderPage() {
  const { currentStep, resetDeck } = useBuilderStore();

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-navy-deep)" }}
    >
      {/* Top bar */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-3"
        style={{
          background: "rgba(20, 46, 60, 0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(197, 165, 90, 0.1)",
        }}
      >
        <a
          href="./"
          className="font-semibold"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "16px",
            color: "var(--color-gold)",
            textDecoration: "none",
          }}
        >
          Analysis Deck Builder
        </a>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {(["select", "edit", "preview"] as const).map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 && (
                  <div
                    className="w-6 h-px"
                    style={{ background: "rgba(197, 165, 90, 0.2)" }}
                  />
                )}
                <span
                  className="text-xs font-medium px-2 py-1 rounded"
                  style={{
                    color:
                      currentStep === step
                        ? "var(--color-gold)"
                        : "var(--color-cream-dim)",
                    background:
                      currentStep === step
                        ? "rgba(197, 165, 90, 0.1)"
                        : "transparent",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {i + 1}. {step === "select" ? "Select" : step === "edit" ? "Edit" : "Preview"}
                </span>
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={resetDeck}
            className="text-xs px-3 py-1.5 rounded transition-colors"
            style={{
              color: "var(--color-cream-dim)",
              background: "rgba(255,255,255,0.05)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Reset
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="py-10 px-6">
        {currentStep === "select" && <SlideSelector />}
        {currentStep === "edit" && <SlideWizard />}
        {currentStep === "preview" && <PreviewMode />}
      </main>
    </div>
  );
}
