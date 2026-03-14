"use client";

import React from "react";
import { SlideType, SLIDE_TYPE_LABELS, SLIDE_TYPE_DESCRIPTIONS } from "@/lib/types";
import { useBuilderStore } from "@/lib/store";

const ALL_SLIDE_TYPES: SlideType[] = [
  "cover",
  "toc",
  "exec-summary",
  "data-table",
  "chart",
  "thesis",
  "company-profile",
  "closing",
];

export default function SlideSelector() {
  const { selectedSlideTypes, setSelectedSlideTypes, initializeSlidesFromSelection, setStep } =
    useBuilderStore();

  const toggleType = (type: SlideType) => {
    if (selectedSlideTypes.includes(type)) {
      setSelectedSlideTypes(selectedSlideTypes.filter((t) => t !== type));
    } else {
      setSelectedSlideTypes([...selectedSlideTypes, type]);
    }
  };

  const handleNext = () => {
    if (selectedSlideTypes.length === 0) return;
    initializeSlidesFromSelection();
    setStep("edit");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2
        className="mb-2"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "28px",
          fontWeight: 700,
          color: "#ffffff",
        }}
      >
        Select Your Slides
      </h2>
      <p
        className="mb-8"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          color: "var(--color-cream-dim)",
        }}
      >
        Choose which slide types to include in your deck. You can add multiple
        instances of the same type later.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {ALL_SLIDE_TYPES.map((type) => {
          const isSelected = selectedSlideTypes.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className="text-left p-4 rounded-lg transition-all duration-200"
              style={{
                background: isSelected
                  ? "rgba(197, 165, 90, 0.12)"
                  : "var(--color-navy-card)",
                border: isSelected
                  ? "1.5px solid var(--color-gold)"
                  : "1.5px solid rgba(197, 165, 90, 0.1)",
              }}
            >
              <div className="flex items-start justify-between mb-1">
                <span
                  className="font-semibold"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    color: isSelected ? "var(--color-gold)" : "#ffffff",
                  }}
                >
                  {SLIDE_TYPE_LABELS[type]}
                </span>
                <div
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: isSelected
                      ? "var(--color-gold)"
                      : "transparent",
                    border: isSelected
                      ? "none"
                      : "1.5px solid var(--color-cream-dim)",
                  }}
                >
                  {isSelected && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6L5 9L10 3"
                        stroke="var(--color-navy-deep)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "12px",
                  color: "var(--color-cream-dim)",
                  lineHeight: 1.4,
                }}
              >
                {SLIDE_TYPE_DESCRIPTIONS[type]}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            color: "var(--color-cream-dim)",
          }}
        >
          {selectedSlideTypes.length} slide{selectedSlideTypes.length !== 1 ? "s" : ""}{" "}
          selected
        </span>
        <button
          onClick={handleNext}
          disabled={selectedSlideTypes.length === 0}
          className="px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "var(--color-gold)",
            color: "var(--color-navy-deep)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Next: Add Content
        </button>
      </div>
    </div>
  );
}
