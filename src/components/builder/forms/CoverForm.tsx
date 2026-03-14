"use client";

import React from "react";
import { useBuilderStore } from "@/lib/store";
import { CoverContent } from "@/lib/types";
import FormSection from "../shared/FormSection";

const inputStyle: React.CSSProperties = {
  background: "var(--color-navy-card)",
  border: "1px solid rgba(197, 165, 90, 0.15)",
  borderRadius: "6px",
  padding: "8px 12px",
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  color: "#ffffff",
  width: "100%",
};

export default function CoverForm() {
  const { slides, currentSlideIndex, updateSlideContent } = useBuilderStore();
  const content = slides[currentSlideIndex] as CoverContent;

  const update = (partial: Partial<CoverContent>) => {
    updateSlideContent(currentSlideIndex, { ...content, ...partial });
  };

  return (
    <div>
      <FormSection label="Title" description="The main heading of your deck">
        <input
          type="text"
          value={content.title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="e.g. Investment Memo"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Subtitle">
        <input
          type="text"
          value={content.subtitle}
          onChange={(e) => update({ subtitle: e.target.value })}
          placeholder="e.g. Strategic Acquisition Analysis"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Company Name">
        <input
          type="text"
          value={content.companyName}
          onChange={(e) => update({ companyName: e.target.value })}
          placeholder="Your Company Name"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Date" description="Optional — shown at the bottom of the cover">
        <input
          type="text"
          value={content.date || ""}
          onChange={(e) => update({ date: e.target.value })}
          placeholder="e.g. March 2026"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Background Image" description="Optional — upload an image for the cover background">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
              update({ backgroundImageDataUrl: ev.target?.result as string });
            };
            reader.readAsDataURL(file);
          }}
          className="text-sm"
          style={{ color: "var(--color-cream-dim)", fontFamily: "var(--font-sans)" }}
        />
        {content.backgroundImageDataUrl && (
          <div className="mt-2 flex items-center gap-2">
            <img
              src={content.backgroundImageDataUrl}
              alt="Background preview"
              className="h-16 rounded object-cover"
            />
            <button
              onClick={() => update({ backgroundImageDataUrl: undefined })}
              className="text-xs"
              style={{ color: "var(--color-cream-dim)" }}
            >
              Remove
            </button>
          </div>
        )}
      </FormSection>
    </div>
  );
}
