"use client";

import React from "react";
import StatCard from "./StatCard";
import { KpiPair } from "@/lib/types";

interface MetricsGridProps {
  kpis: KpiPair[];
  columns?: 2 | 3;
  large?: boolean;
  className?: string;
}

export default function MetricsGrid({
  kpis,
  columns = 2,
  large = true,
  className = "",
}: MetricsGridProps) {
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1px",
        background: "rgba(197, 165, 90, 0.12)",
        border: "1px solid rgba(197, 165, 90, 0.12)",
      }}
    >
      {kpis.map((kpi, i) => (
        <div key={i} style={{ background: "var(--color-navy)" }}>
          <StatCard value={kpi.value} label={kpi.label} large={large} />
        </div>
      ))}
    </div>
  );
}
