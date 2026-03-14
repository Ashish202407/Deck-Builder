"use client";

import React from "react";
import { useBuilderStore } from "@/lib/store";
import { TocContent } from "@/lib/types";
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

export default function TocForm() {
  const { slides, currentSlideIndex, updateSlideContent } = useBuilderStore();
  const content = slides[currentSlideIndex] as TocContent;

  const update = (partial: Partial<TocContent>) => {
    updateSlideContent(currentSlideIndex, { ...content, ...partial });
  };

  return (
    <div>
      <FormSection
        label="Title"
        description="This slide is auto-generated from your selected slides. You can customize the title."
      >
        <input
          type="text"
          value={content.title || "Table of Contents"}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="Table of Contents"
          style={inputStyle}
        />
      </FormSection>

      <p
        className="mt-4"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "12px",
          color: "var(--color-cream-dim)",
        }}
      >
        The entries in this slide are automatically generated based on the slide
        types you selected. The page numbers and titles will update as you add
        or reorder slides.
      </p>
    </div>
  );
}
