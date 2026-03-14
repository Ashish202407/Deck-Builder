"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartDataPoint } from "@/lib/types";
import { chartColors, theme } from "@/lib/theme";

interface ThemedBarChartProps {
  data: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export default function ThemedBarChart({
  data,
  xAxisLabel,
  yAxisLabel,
}: ThemedBarChartProps) {
  const chartData = data.map((d) => ({
    name: d.label,
    value: d.value,
  }));

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
          cursor={{ fill: "rgba(197, 165, 90, 0.08)" }}
        />
        <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={48}>
          {chartData.map((_, index) => (
            <Cell key={index} fill={chartColors.primary} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
