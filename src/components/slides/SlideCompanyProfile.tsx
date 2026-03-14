"use client";

import React from "react";
import Slide from "../deck/Slide";
import SectionLabel from "../primitives/SectionLabel";
import GoldTopBox from "../primitives/GoldTopBox";
import StatCard from "../primitives/StatCard";
import { CompanyProfileContent } from "@/lib/types";

interface SlideCompanyProfileProps {
  content: CompanyProfileContent;
  pageNumber?: number;
  brandName?: string;
}

export default function SlideCompanyProfile({
  content,
  pageNumber,
  brandName,
}: SlideCompanyProfileProps) {
  return (
    <Slide pageNumber={pageNumber} brandName={brandName}>
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h2 className="heading-lg mb-1">{content.title}</h2>
        {content.sectionLabel && (
          <SectionLabel className="mb-5">{content.sectionLabel}</SectionLabel>
        )}

        {/* Two-column layout */}
        <div className="flex-1 flex gap-10">
          {/* Left: Description */}
          <div className="flex-1 flex flex-col">
            <div className="body-text whitespace-pre-line">
              {content.description}
            </div>

            {content.footnote && (
              <div
                className="mt-auto pt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "8px",
                  color: "var(--color-cream-dim)",
                  fontStyle: "italic",
                }}
              >
                {content.footnote}
              </div>
            )}
          </div>

          {/* Right: Stat grid */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              {content.statGrid.map((stat, i) => (
                <GoldTopBox key={i}>
                  <div className="flex items-center gap-2 mb-2">
                    {/* Icon placeholder - circle with symbol */}
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: "rgba(197, 165, 90, 0.15)",
                        color: "var(--color-gold)",
                        fontSize: "12px",
                      }}
                    >
                      {["$", "#", "~", "+"][i % 4]}
                    </div>
                  </div>
                  <div
                    className="font-bold"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "22px",
                      color: "#ffffff",
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="mt-0.5"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "9px",
                      fontWeight: 500,
                      color: "var(--color-cream-dim)",
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </div>
                </GoldTopBox>
              ))}
            </div>

            {/* Bottom stats */}
            {content.bottomStats && content.bottomStats.length > 0 && (
              <GoldTopBox>
                <div className="flex gap-4">
                  {content.bottomStats.map((stat, i) => (
                    <div key={i} className="flex-1 text-center">
                      <div
                        className="font-bold"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "18px",
                          color: "#ffffff",
                        }}
                      >
                        {stat.value}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "8px",
                          fontWeight: 500,
                          color: "var(--color-cream-dim)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </GoldTopBox>
            )}
          </div>
        </div>
      </div>
    </Slide>
  );
}
