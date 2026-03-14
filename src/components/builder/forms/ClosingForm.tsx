"use client";

import React from "react";
import { useBuilderStore } from "@/lib/store";
import { ClosingContent } from "@/lib/types";
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

export default function ClosingForm() {
  const { slides, currentSlideIndex, updateSlideContent } = useBuilderStore();
  const content = slides[currentSlideIndex] as ClosingContent;

  const update = (partial: Partial<ClosingContent>) => {
    updateSlideContent(currentSlideIndex, { ...content, ...partial });
  };

  return (
    <div>
      <FormSection label="Title">
        <input
          type="text"
          value={content.title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="e.g. For More Information"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Company Name">
        <input
          type="text"
          value={content.companyName || ""}
          onChange={(e) => update({ companyName: e.target.value })}
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Address" description="One line per row">
        <textarea
          value={(content.address || []).join("\n")}
          onChange={(e) =>
            update({ address: e.target.value.split("\n") })
          }
          placeholder={"123 Business Street\nCity, State 00000"}
          style={{ ...inputStyle, minHeight: "60px", resize: "vertical" as const }}
        />
      </FormSection>

      <FormSection label="Website">
        <input
          type="text"
          value={content.website || ""}
          onChange={(e) => update({ website: e.target.value })}
          placeholder="www.example.com"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Email">
        <input
          type="email"
          value={content.email || ""}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="contact@example.com"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Phone">
        <input
          type="tel"
          value={content.phone || ""}
          onChange={(e) => update({ phone: e.target.value })}
          placeholder="+1 (555) 000-0000"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Social Handle">
        <input
          type="text"
          value={content.socialHandle || ""}
          onChange={(e) => update({ socialHandle: e.target.value })}
          placeholder="@YourCompany"
          style={inputStyle}
        />
      </FormSection>
    </div>
  );
}
