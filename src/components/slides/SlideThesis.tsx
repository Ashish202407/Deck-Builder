"use client";

import React from "react";
import Slide from "../deck/Slide";
import SectionLabel from "../primitives/SectionLabel";
import NumberedPoint from "../primitives/NumberedPoint";
import StatCard from "../primitives/StatCard";
import GoldTopBox from "../primitives/GoldTopBox";
import { ThesisContent } from "@/lib/types";

interface SlideThesisProps {
  content: ThesisContent;
  pageNumber?: number;
  brandName?: string;
}

export default function SlideThesis({
  content,
  pageNumber,
  brandName,
}: SlideThesisProps) {
  return (
    <Slide pageNumber={pageNumber} brandName={brandName}>
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <div className="mb-4">
          {content.sectionLabel && (
            <SectionLabel className="block mb-1">{content.sectionLabel}</SectionLabel>
          )}
          <h2 className="heading-lg">{content.title}</h2>
        </div>

        {/* Two-column layout */}
        <div className="flex-1 flex gap-10">
          {/* Left: Narrative + Arguments */}
          <div className="flex-1 flex flex-col">
            {content.narrative && (
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  lineHeight: 1.55,
                  color: "var(--color-cream)",
                }}
              >
                {content.narrative}
              </div>
            )}

            <div className="space-y-4">
              {content.arguments.map((arg) => (
                <NumberedPoint
                  key={arg.number}
                  number={arg.number}
                  title={arg.title}
                  description={arg.description}
                />
              ))}
            </div>

            {/* Bottom stats row */}
            {content.bottomStats && content.bottomStats.length > 0 && (
              <div className="mt-auto pt-3">
                <GoldTopBox>
                  <div className="flex gap-6">
                    {content.bottomStats.map((stat, i) => (
                      <div key={i} className="flex-1">
                        <div
                          className="font-bold"
                          style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "22px",
                            color: "#ffffff",
                            lineHeight: 1.1,
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
                            marginTop: "2px",
                            lineHeight: 1.3,
                          }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </GoldTopBox>
              </div>
            )}
          </div>

          {/* Right: Stat callouts */}
          {content.statCallouts && content.statCallouts.length > 0 && (
            <div className="w-64 flex-shrink-0 flex flex-col gap-4">
              {content.statCallouts.map((stat, i) => (
                <GoldTopBox key={i}>
                  <div
                    className="font-bold"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "28px",
                      color: "#ffffff",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "var(--color-gold)",
                    }}
                  >
                    {stat.label}
                  </div>
                </GoldTopBox>
              ))}
            </div>
          )}
        </div>
      </div>
    </Slide>
  );
}
