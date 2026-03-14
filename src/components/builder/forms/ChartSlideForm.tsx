"use client";

import React, { useState } from "react";
import { useBuilderStore } from "@/lib/store";
import { ChartSlideContent, ChartType } from "@/lib/types";
import FormSection from "../shared/FormSection";
import KpiPairInput from "../shared/KpiPairInput";
import ExcelUploader from "../shared/ExcelUploader";
import { parseChartExcel, downloadChartTemplate } from "@/lib/excel";

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

const CHART_TYPES: { value: ChartType; label: string }[] = [
  { value: "bar", label: "Bar Chart" },
  { value: "line", label: "Line Chart" },
  { value: "pie", label: "Pie / Donut Chart" },
  { value: "stacked-bar", label: "Stacked Bar Chart" },
];

export default function ChartSlideForm() {
  const { slides, currentSlideIndex, updateSlideContent } = useBuilderStore();
  const content = slides[currentSlideIndex] as ChartSlideContent;
  const [excelError, setExcelError] = useState<string | null>(null);

  const update = (partial: Partial<ChartSlideContent>) => {
    updateSlideContent(currentSlideIndex, { ...content, ...partial });
  };

  const handleExcelUpload = async (file: File) => {
    try {
      setExcelError(null);
      const parsed = await parseChartExcel(file);
      const data = parsed.labels.map((label, i) => ({
        label,
        value: parsed.values[i],
        category: parsed.categories?.[i] || undefined,
      }));
      update({ data });
    } catch (err) {
      setExcelError(err instanceof Error ? err.message : "Parse error");
    }
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

      <FormSection label="Chart Type">
        <div className="flex gap-2">
          {CHART_TYPES.map((ct) => (
            <button
              key={ct.value}
              onClick={() => update({ chartType: ct.value })}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{
                background:
                  content.chartType === ct.value
                    ? "rgba(197, 165, 90, 0.15)"
                    : "var(--color-navy-card)",
                color:
                  content.chartType === ct.value
                    ? "var(--color-gold)"
                    : "var(--color-cream-dim)",
                border:
                  content.chartType === ct.value
                    ? "1px solid var(--color-gold)"
                    : "1px solid rgba(197, 165, 90, 0.1)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {ct.label}
            </button>
          ))}
        </div>
      </FormSection>

      <FormSection label="Chart Title" description="Title shown above the chart">
        <input
          type="text"
          value={content.chartTitle || ""}
          onChange={(e) => update({ chartTitle: e.target.value })}
          placeholder="e.g. Annual Revenue"
          style={inputStyle}
        />
      </FormSection>

      <FormSection
        label="Chart Data"
        description="Upload an Excel file with Label, Value, and optional Category columns."
      >
        <ExcelUploader
          onParsed={handleExcelUpload}
          onDownloadTemplate={downloadChartTemplate}
          templateName="Chart Data"
          error={excelError}
        />

        {content.data.length > 0 && (
          <div
            className="mt-3 p-3 rounded"
            style={{
              background: "var(--color-navy-card)",
              border: "1px solid rgba(197, 165, 90, 0.1)",
            }}
          >
            <div
              className="text-xs font-medium mb-2"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-sans)" }}
            >
              {content.data.length} data points loaded
            </div>
            <div className="flex flex-wrap gap-2">
              {content.data.slice(0, 8).map((d, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: "var(--color-navy)",
                    color: "var(--color-cream-dim)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {d.label}: {d.value}
                </span>
              ))}
              {content.data.length > 8 && (
                <span
                  className="text-xs px-2 py-1"
                  style={{ color: "var(--color-cream-dim)" }}
                >
                  +{content.data.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}
      </FormSection>

      <FormSection label="Supporting Text" description="Text shown beside the chart">
        <textarea
          value={content.supportingText || ""}
          onChange={(e) => update({ supportingText: e.target.value })}
          placeholder="Describe what the chart shows..."
          style={{ ...inputStyle, minHeight: "80px", resize: "vertical" as const }}
        />
      </FormSection>

      <FormSection label="Stat Callouts" description="Key metrics shown beside the chart">
        <KpiPairInput
          kpis={content.statCallouts || []}
          onChange={(kpis) => update({ statCallouts: kpis })}
          maxPairs={4}
        />
      </FormSection>
    </div>
  );
}
