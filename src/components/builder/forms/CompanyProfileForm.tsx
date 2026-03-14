"use client";

import React from "react";
import { useBuilderStore } from "@/lib/store";
import { CompanyProfileContent } from "@/lib/types";
import FormSection from "../shared/FormSection";
import KpiPairInput from "../shared/KpiPairInput";

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

export default function CompanyProfileForm() {
  const { slides, currentSlideIndex, updateSlideContent } = useBuilderStore();
  const content = slides[currentSlideIndex] as CompanyProfileContent;

  const update = (partial: Partial<CompanyProfileContent>) => {
    updateSlideContent(currentSlideIndex, { ...content, ...partial });
  };

  return (
    <div>
      <FormSection label="Slide Title">
        <input
          type="text"
          value={content.title}
          onChange={(e) => update({ title: e.target.value })}
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Section Label">
        <input
          type="text"
          value={content.sectionLabel || ""}
          onChange={(e) => update({ sectionLabel: e.target.value })}
          placeholder="e.g. Company Overview"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Company Description">
        <textarea
          value={content.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Describe your company..."
          style={{ ...inputStyle, minHeight: "120px", resize: "vertical" as const }}
        />
      </FormSection>

      <FormSection
        label="Key Stats"
        description="4 headline metrics (e.g. AUM, team size, portfolio count, years)"
      >
        <KpiPairInput
          kpis={content.statGrid}
          onChange={(kpis) => update({ statGrid: kpis })}
          maxPairs={6}
        />
      </FormSection>

      <FormSection label="Bottom Stats" description="Performance metrics row">
        <KpiPairInput
          kpis={content.bottomStats || []}
          onChange={(kpis) => update({ bottomStats: kpis })}
          maxPairs={4}
        />
      </FormSection>

      <FormSection label="Footnote">
        <input
          type="text"
          value={content.footnote || ""}
          onChange={(e) => update({ footnote: e.target.value })}
          placeholder="e.g. * As of June 2024"
          style={inputStyle}
        />
      </FormSection>
    </div>
  );
}
