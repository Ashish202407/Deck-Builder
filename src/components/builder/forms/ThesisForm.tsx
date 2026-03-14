"use client";

import React from "react";
import { useBuilderStore } from "@/lib/store";
import { ThesisContent, NumberedArgument } from "@/lib/types";
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

export default function ThesisForm() {
  const { slides, currentSlideIndex, updateSlideContent } = useBuilderStore();
  const content = slides[currentSlideIndex] as ThesisContent;

  const update = (partial: Partial<ThesisContent>) => {
    updateSlideContent(currentSlideIndex, { ...content, ...partial });
  };

  const updateArgument = (index: number, partial: Partial<NumberedArgument>) => {
    const args = [...content.arguments];
    args[index] = { ...args[index], ...partial };
    update({ arguments: args });
  };

  const addArgument = () => {
    update({
      arguments: [
        ...content.arguments,
        {
          number: content.arguments.length + 1,
          title: "",
          description: "",
        },
      ],
    });
  };

  const removeArgument = (index: number) => {
    const args = content.arguments
      .filter((_, i) => i !== index)
      .map((arg, i) => ({ ...arg, number: i + 1 }));
    update({ arguments: args });
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
          placeholder="e.g. Strategic Rationale"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Introductory Text">
        <textarea
          value={content.narrative || ""}
          onChange={(e) => update({ narrative: e.target.value })}
          placeholder="Brief intro paragraph..."
          style={{ ...inputStyle, minHeight: "70px", resize: "vertical" as const }}
        />
      </FormSection>

      <FormSection label="Arguments" description="Numbered points making your case">
        <div className="space-y-4">
          {content.arguments.map((arg, i) => (
            <div
              key={i}
              className="p-3 rounded-lg"
              style={{
                background: "var(--color-navy-card)",
                border: "1px solid rgba(197, 165, 90, 0.08)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-gold)", fontFamily: "var(--font-sans)" }}
                >
                  Point {arg.number}
                </span>
                <button
                  onClick={() => removeArgument(i)}
                  className="text-xs"
                  style={{ color: "var(--color-cream-dim)" }}
                >
                  Remove
                </button>
              </div>
              <input
                type="text"
                value={arg.title}
                onChange={(e) => updateArgument(i, { title: e.target.value })}
                placeholder="Argument title"
                className="mb-2"
                style={inputStyle}
              />
              <textarea
                value={arg.description}
                onChange={(e) => updateArgument(i, { description: e.target.value })}
                placeholder="Supporting detail..."
                style={{ ...inputStyle, minHeight: "50px", resize: "vertical" as const }}
              />
            </div>
          ))}

          {content.arguments.length < 5 && (
            <button
              onClick={addArgument}
              className="text-xs font-medium px-3 py-1.5 rounded"
              style={{
                color: "var(--color-gold)",
                background: "rgba(197, 165, 90, 0.08)",
                border: "1px dashed rgba(197, 165, 90, 0.3)",
                fontFamily: "var(--font-sans)",
              }}
            >
              + Add Argument
            </button>
          )}
        </div>
      </FormSection>

      <FormSection label="Stat Callouts" description="Key statistics shown on the right">
        <KpiPairInput
          kpis={content.statCallouts || []}
          onChange={(kpis) => update({ statCallouts: kpis })}
          maxPairs={4}
        />
      </FormSection>

      <FormSection label="Bottom Stats" description="Stats shown at the bottom of the slide">
        <KpiPairInput
          kpis={content.bottomStats || []}
          onChange={(kpis) => update({ bottomStats: kpis })}
          maxPairs={4}
        />
      </FormSection>
    </div>
  );
}
