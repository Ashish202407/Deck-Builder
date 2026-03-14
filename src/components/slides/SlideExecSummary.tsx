"use client";

import React from "react";
import Slide from "../deck/Slide";
import SectionLabel from "../primitives/SectionLabel";
import MetricsGrid from "../primitives/MetricsGrid";
import GoldTopBox from "../primitives/GoldTopBox";
import { ExecSummaryContent } from "@/lib/types";

interface SlideExecSummaryProps {
  content: ExecSummaryContent;
  pageNumber?: number;
  brandName?: string;
}

export default function SlideExecSummary({
  content,
  pageNumber,
  brandName,
}: SlideExecSummaryProps) {
  return (
    <Slide pageNumber={pageNumber} brandName={brandName}>
      <div className="flex-1 flex flex-col">
        {/* Title row */}
        <div className="mb-4">
          {content.sectionLabel && (
            <SectionLabel className="block mb-1">{content.sectionLabel}</SectionLabel>
          )}
          <h2 className="heading-lg">{content.title}</h2>
        </div>

        {/* Two-column layout */}
        <div className="flex-1 flex gap-8">
          {/* Left: Narrative */}
          <div className="flex-1 flex flex-col min-w-0">
            {content.narrativeTitle && (
              <div
                className="font-bold mb-2"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  color: "#ffffff",
                }}
              >
                {content.narrativeTitle}
              </div>
            )}
            <div
              className="mb-3 whitespace-pre-line"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 400,
                lineHeight: 1.55,
                color: "var(--color-cream)",
              }}
            >
              {content.narrative}
            </div>

            {/* Bullet points */}
            {content.bulletPoints && content.bulletPoints.length > 0 && (
              <ul className="space-y-1 mb-3">
                {content.bulletPoints.map((point, i) => (
                  <li key={i} className="flex gap-2" style={{ fontSize: "10px" }}>
                    <span style={{ color: "var(--color-gold)", lineHeight: 1.5 }}>&#8226;</span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: "var(--color-cream-dim)",
                      }}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Callout boxes */}
            {content.callouts && content.callouts.length > 0 && (
              <div className="flex gap-3 mt-auto">
                {content.callouts.map((callout, i) => (
                  <GoldTopBox key={i} className="flex-1">
                    <div
                      className="font-semibold mb-1"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "10px",
                        color: "#ffffff",
                      }}
                    >
                      {callout.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "9px",
                        color: "var(--color-cream-dim)",
                        lineHeight: 1.4,
                      }}
                    >
                      {callout.text}
                    </div>
                  </GoldTopBox>
                ))}
              </div>
            )}
          </div>

          {/* Right: KPI Grid — large serif values */}
          <div className="w-[340px] flex-shrink-0">
            <MetricsGrid kpis={content.kpis} columns={2} large />
            {content.footnote && (
              <div
                className="mt-2 px-1"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "7px",
                  color: "var(--color-cream-dim)",
                  lineHeight: 1.4,
                }}
              >
                {content.footnote}
              </div>
            )}
          </div>
        </div>
      </div>
    </Slide>
  );
}
