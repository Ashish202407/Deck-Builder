"use client";

import React from "react";
import { KpiPair } from "@/lib/types";

interface KpiPairInputProps {
  kpis: KpiPair[];
  onChange: (kpis: KpiPair[]) => void;
  maxPairs?: number;
}

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

export default function KpiPairInput({
  kpis,
  onChange,
  maxPairs = 8,
}: KpiPairInputProps) {
  const updateKpi = (index: number, field: keyof KpiPair, value: string) => {
    const updated = [...kpis];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addKpi = () => {
    if (kpis.length < maxPairs) {
      onChange([...kpis, { value: "", label: "" }]);
    }
  };

  const removeKpi = (index: number) => {
    onChange(kpis.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {kpis.map((kpi, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Value (e.g. $689M)"
            value={kpi.value}
            onChange={(e) => updateKpi(i, "value", e.target.value)}
            style={{ ...inputStyle, width: "40%" }}
          />
          <input
            type="text"
            placeholder="Label (e.g. Purchase Price)"
            value={kpi.label}
            onChange={(e) => updateKpi(i, "label", e.target.value)}
            style={{ ...inputStyle, width: "55%" }}
          />
          <button
            onClick={() => removeKpi(i)}
            className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center transition-colors"
            style={{
              color: "var(--color-cream-dim)",
              background: "rgba(255,255,255,0.05)",
            }}
            title="Remove"
          >
            &times;
          </button>
        </div>
      ))}

      {kpis.length < maxPairs && (
        <button
          onClick={addKpi}
          className="text-xs font-medium px-3 py-1.5 rounded transition-colors"
          style={{
            color: "var(--color-gold)",
            background: "rgba(197, 165, 90, 0.08)",
            border: "1px dashed rgba(197, 165, 90, 0.3)",
            fontFamily: "var(--font-sans)",
          }}
        >
          + Add Metric
        </button>
      )}
    </div>
  );
}
