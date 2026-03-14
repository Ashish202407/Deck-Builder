"use client";

import React from "react";
import Slide from "../deck/Slide";
import { TocContent, SlideContent, SLIDE_TYPE_LABELS } from "@/lib/types";

interface SlideTocProps {
  content: TocContent;
  allSlides: SlideContent[];
  pageNumber?: number;
  brandName?: string;
}

export default function SlideToc({
  content,
  allSlides,
  pageNumber,
  brandName,
}: SlideTocProps) {
  // Build ToC entries from all slides (skip cover, toc, and closing)
  const tocEntries = allSlides
    .map((slide, index) => ({
      pageNum: index + 1,
      title: "title" in slide ? (slide.title as string) : SLIDE_TYPE_LABELS[slide.type],
      type: slide.type,
    }))
    .filter(
      (entry) =>
        entry.type !== "cover" &&
        entry.type !== "toc" &&
        entry.type !== "closing"
    );

  return (
    <Slide pageNumber={pageNumber} brandName={brandName}>
      <div className="flex-1 flex items-center gap-16">
        {/* Left: Title */}
        <div className="flex-shrink-0 w-56">
          <h2
            className="heading-xl"
            style={{ fontSize: "44px", lineHeight: 1.1 }}
          >
            {content.title || "Table of Contents"}
          </h2>
        </div>

        {/* Right: Grid of entries */}
        <div
          className="flex-1 grid gap-px"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            background: "rgba(197, 165, 90, 0.12)",
          }}
        >
          {tocEntries.map((entry, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4"
              style={{ background: "var(--color-navy)" }}
            >
              <span
                className="flex-shrink-0 font-bold"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "28px",
                  color: "var(--color-gold)",
                  minWidth: "36px",
                }}
              >
                {String(entry.pageNum).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "var(--color-cream)",
                  lineHeight: 1.3,
                }}
              >
                {entry.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
