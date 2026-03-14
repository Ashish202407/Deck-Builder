"use client";

import React from "react";
import Slide from "../deck/Slide";
import SectionLabel from "../primitives/SectionLabel";
import StatCard from "../primitives/StatCard";
import ThemedBarChart from "../charts/BarChart";
import ThemedLineChart from "../charts/LineChart";
import ThemedPieChart from "../charts/PieChart";
import ThemedStackedBarChart from "../charts/StackedBarChart";
import { ChartSlideContent } from "@/lib/types";

interface SlideChartProps {
  content: ChartSlideContent;
  pageNumber?: number;
  brandName?: string;
}

export default function SlideChart({
  content,
  pageNumber,
  brandName,
}: SlideChartProps) {
  const ChartComponent = {
    bar: ThemedBarChart,
    line: ThemedLineChart,
    pie: ThemedPieChart,
    "stacked-bar": ThemedStackedBarChart,
  }[content.chartType];

  const hasRightColumn =
    content.supportingText ||
    (content.statCallouts && content.statCallouts.length > 0);

  return (
    <Slide pageNumber={pageNumber} brandName={brandName}>
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h2 className="heading-lg mb-1">{content.title}</h2>
        {content.sectionLabel && (
          <SectionLabel className="mb-4">{content.sectionLabel}</SectionLabel>
        )}

        {/* Content */}
        <div className="flex-1 flex gap-8">
          {/* Chart */}
          <div className={hasRightColumn ? "flex-1" : "w-full"}>
            {content.chartTitle && (
              <div
                className="heading-sm mb-3"
                style={{ fontSize: "14px", color: "var(--color-cream)" }}
              >
                {content.chartTitle}
              </div>
            )}
            <div className="h-[380px]">
              <ChartComponent
                data={content.data}
                xAxisLabel={content.xAxisLabel}
                yAxisLabel={content.yAxisLabel}
              />
            </div>
          </div>

          {/* Right column: Text + Stats */}
          {hasRightColumn && (
            <div className="w-72 flex-shrink-0 flex flex-col gap-5">
              {content.supportingText && (
                <div className="body-text">{content.supportingText}</div>
              )}

              {content.statCallouts?.map((stat, i) => (
                <StatCard
                  key={i}
                  value={stat.value}
                  label={stat.label}
                  accentTop
                />
              ))}
            </div>
          )}
        </div>

        {content.footnote && (
          <div
            className="mt-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "8px",
              color: "var(--color-cream-dim)",
            }}
          >
            {content.footnote}
          </div>
        )}
      </div>
    </Slide>
  );
}
