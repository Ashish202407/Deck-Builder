"use client";

import React, { useState } from "react";
import { useBuilderStore } from "@/lib/store";
import { DataTableContent } from "@/lib/types";
import FormSection from "../shared/FormSection";
import KpiPairInput from "../shared/KpiPairInput";
import ExcelUploader from "../shared/ExcelUploader";
import { parseTableExcel, downloadTableTemplate } from "@/lib/excel";

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

export default function DataTableForm() {
  const { slides, currentSlideIndex, updateSlideContent } = useBuilderStore();
  const content = slides[currentSlideIndex] as DataTableContent;
  const [excelError, setExcelError] = useState<string | null>(null);

  const update = (partial: Partial<DataTableContent>) => {
    updateSlideContent(currentSlideIndex, { ...content, ...partial });
  };

  const handleExcelUpload = async (file: File) => {
    try {
      setExcelError(null);
      const parsed = await parseTableExcel(file);
      update({ columns: parsed.columns, rows: parsed.rows });
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

      <FormSection label="Section Label">
        <input
          type="text"
          value={content.sectionLabel || ""}
          onChange={(e) => update({ sectionLabel: e.target.value })}
          placeholder="e.g. Key Data"
          style={inputStyle}
        />
      </FormSection>

      <FormSection
        label="Table Data"
        description="Upload an Excel file with your data. First row becomes column headers."
      >
        <ExcelUploader
          onParsed={handleExcelUpload}
          onDownloadTemplate={downloadTableTemplate}
          templateName="Table Data"
          error={excelError}
        />

        {/* Preview of current data */}
        {content.columns.length > 0 && (
          <div
            className="mt-3 p-3 rounded overflow-x-auto"
            style={{
              background: "var(--color-navy-card)",
              border: "1px solid rgba(197, 165, 90, 0.1)",
            }}
          >
            <div
              className="text-xs font-medium mb-2"
              style={{ color: "var(--color-gold)", fontFamily: "var(--font-sans)" }}
            >
              Preview ({content.rows.length} rows)
            </div>
            <table className="w-full text-xs" style={{ fontFamily: "var(--font-sans)" }}>
              <thead>
                <tr>
                  {content.columns.map((col, i) => (
                    <th
                      key={i}
                      className="text-left px-2 py-1 font-medium"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.rows.slice(0, 5).map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-2 py-1"
                        style={{ color: "var(--color-cream-dim)" }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
                {content.rows.length > 5 && (
                  <tr>
                    <td
                      colSpan={content.columns.length}
                      className="px-2 py-1 text-center"
                      style={{ color: "var(--color-cream-dim)" }}
                    >
                      ... and {content.rows.length - 5} more rows
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </FormSection>

      <FormSection label="Sidebar Title">
        <input
          type="text"
          value={content.sidebarTitle || ""}
          onChange={(e) => update({ sidebarTitle: e.target.value })}
          placeholder="e.g. Highlights"
          style={inputStyle}
        />
      </FormSection>

      <FormSection label="Sidebar Stats" description="Key metrics shown beside the table">
        <KpiPairInput
          kpis={content.sidebarStats || []}
          onChange={(kpis) => update({ sidebarStats: kpis })}
          maxPairs={4}
        />
      </FormSection>
    </div>
  );
}
