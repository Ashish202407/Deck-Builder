"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartDataPoint } from "@/lib/types";
import { chartColors, theme } from "@/lib/theme";

interface ThemedPieChartProps {
  data: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

const PIE_COLORS = [
  "#c5a55a",
  "#e8dcc8",
  "#a08a4a",
  "#b8afa0",
  "#d4b96a",
  "#8a9baa",
  "#5c7a8f",
  "#3d5a6f",
];

export default function ThemedPieChart({ data }: ThemedPieChartProps) {
  const chartData = data.map((d) => ({
    name: d.label,
    value: d.value,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          outerRadius={130}
          innerRadius={55}
          dataKey="value"
          stroke="none"
          paddingAngle={1}
          label={(props) =>
            `${props.name ?? ""} ${((props.percent ?? 0) * 100).toFixed(0)}%`
          }
          labelLine={{ stroke: chartColors.axis, strokeWidth: 1 }}
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
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
      </PieChart>
    </ResponsiveContainer>
  );
}
