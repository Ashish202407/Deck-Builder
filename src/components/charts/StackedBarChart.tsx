"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartDataPoint } from "@/lib/types";
import { chartColors, theme } from "@/lib/theme";

interface ThemedStackedBarChartProps {
  data: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const STACK_COLORS = [
  "#c5a55a",
  "#e8dcc8",
  "#a08a4a",
  "#b8afa0",
  "#d4b96a",
];

export default function ThemedStackedBarChart({
  data,
  xAxisLabel,
  yAxisLabel,
}: ThemedStackedBarChartProps) {
  // Group data by label, with categories as separate keys
  const categories = [...new Set(data.map((d) => d.category).filter(Boolean))] as string[];

  if (categories.length === 0) {
    // Fall back to regular bar chart behavior if no categories
    const chartData = data.map((d) => ({ name: d.label, value: d.value }));
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: theme.fonts.sans }}
            axisLine={{ stroke: chartColors.grid }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: theme.fonts.sans }}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="value" fill={chartColors.primary} radius={[2, 2, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Build grouped data
  const labels = [...new Set(data.map((d) => d.label))];
  const chartData = labels.map((label) => {
    const entry: Record<string, string | number> = { name: label };
    categories.forEach((cat) => {
      const point = data.find((d) => d.label === label && d.category === cat);
      entry[cat] = point?.value ?? 0;
    });
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 10, bottom: xAxisLabel ? 30 : 10 }}
      >
        <XAxis
          dataKey="name"
          tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: theme.fonts.sans }}
          axisLine={{ stroke: chartColors.grid }}
          tickLine={false}
          label={
            xAxisLabel
              ? {
                  value: xAxisLabel,
                  position: "bottom",
                  fill: chartColors.axis,
                  fontSize: 9,
                  fontFamily: theme.fonts.sans,
                }
              : undefined
          }
        />
        <YAxis
          tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: theme.fonts.sans }}
          axisLine={false}
          tickLine={false}
          label={
            yAxisLabel
              ? {
                  value: yAxisLabel,
                  angle: -90,
                  position: "insideLeft",
                  fill: chartColors.axis,
                  fontSize: 9,
                  fontFamily: theme.fonts.sans,
                }
              : undefined
          }
        />
        <Tooltip
          contentStyle={{
            background: chartColors.tooltip.bg,
            border: `1px solid ${chartColors.tooltip.border}`,
            borderRadius: "4px",
            color: chartColors.tooltip.text,
            fontSize: "11px",
            fontFamily: theme.fonts.sans,
          }}
        />
        <Legend
          wrapperStyle={{
            fontSize: "10px",
            fontFamily: theme.fonts.sans,
            color: chartColors.axis,
          }}
        />
        {categories.map((cat, i) => (
          <Bar
            key={cat}
            dataKey={cat}
            stackId="stack"
            fill={STACK_COLORS[i % STACK_COLORS.length]}
            radius={i === categories.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0]}
            maxBarSize={48}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
