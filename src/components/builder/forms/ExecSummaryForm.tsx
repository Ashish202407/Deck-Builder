"use client";

import React from "react";
import { useBuilderStore } from "@/lib/store";
import { ExecSummaryContent } from "@/lib/types";
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

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: "100px",
  resize: "vertical" as const,
};

export default function ExecSummaryForm() {
  const { slides, currentSlideIndex, updateSlideContent } = useBuilderStore();
  const content = slides[currentSlideIndex] as ExecSummaryContent;

  const update = (partial: Partial<ExecSummaryContent>) => {
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

      <FormSection label="Section Label" description="Small gold label above the title">
        <input
          type="text"
          value={content.sectionLabel || ""}
          onChange={(e) => update({ sectionLabel: e.target.value })}
          placeholder="e.g. Overview"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Narrative Title" description="Bold subheading for the text section">
        <input
          type="text"
          value={content.narrativeTitle || ""}
          onChange={(e) => update({ narrativeTitle: e.target.value })}
          placeholder="e.g. Investment Opportunity"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Narrative Text" description="Main body text for the left column">
        <textarea
          value={content.narrative}
          onChange={(e) => update({ narrative: e.target.value })}
          placeholder="Describe the opportunity..."
          style={textareaStyle}
        />
      </FormSection>

      <FormSection label="Bullet Points" description="Key highlights (one per line)">
        <textarea
          value={(content.bulletPoints || []).join("\n")}
          onChange={(e) =>
            update({
              bulletPoints: e.target.value
                .split("\n")
                .filter((l) => l.trim()),
            })
          }
          placeholder={"Key advantage #1\nKey advantage #2\nKey advantage #3"}
          style={{ ...textareaStyle, minHeight: "70px" }}
        />
      </FormSection>

      <FormSection label="Key Metrics" description="Stat grid shown on the right side">
        <KpiPairInput
          kpis={content.kpis}
          onChange={(kpis) => update({ kpis })}
        />
      </FormSection>

      <FormSection label="Footnote" description="Optional small text below the metrics">
        <input
          type="text"
          value={content.footnote || ""}
          onChange={(e) => update({ footnote: e.target.value })}
          placeholder="e.g. * Based on 2024 estimates"
          style={inputStyle}
        />
      </FormSection>
    </div>
  );
}
