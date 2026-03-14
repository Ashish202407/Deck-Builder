"use client";

import React from "react";
import Slide from "../deck/Slide";
import { CoverContent } from "@/lib/types";

interface SlideCoverProps {
  content: CoverContent;
  brandName?: string;
}

export default function SlideCover({ content, brandName }: SlideCoverProps) {
  return (
    <Slide hideFooter brandName={brandName} className="slide-cover">
      {/* Background: image with gradient, or solid gradient */}
      <div className="absolute inset-0 z-0">
        {content.backgroundImageDataUrl ? (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${content.backgroundImageDataUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Gradient overlay — heavier on the left for text readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, rgba(18, 40, 54, 0.92) 0%, rgba(18, 40, 54, 0.75) 35%, rgba(30, 58, 79, 0.5) 100%)",
              }}
            />
          </>
        ) : (
          /* Default: subtle radial gradient on navy */
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, rgba(30, 58, 79, 1) 0%, rgba(20, 46, 60, 1) 60%, rgba(15, 37, 48, 1) 100%)",
            }}
          />
        )}
      </div>

      {/* Decorative border line — left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10"
        style={{
          width: "4px",
          background: "linear-gradient(180deg, transparent 10%, var(--color-gold) 30%, var(--color-gold) 70%, transparent 90%)",
          opacity: 0.3,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-16 pb-12">
        {/* Top: Logo / Company Name */}
        <div className="flex items-center gap-3">
          {content.logoDataUrl ? (
            <img
              src={content.logoDataUrl}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 300,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  color: "var(--color-cream)",
                  lineHeight: 1,
                }}
              >
                {content.companyName.split(" ").slice(0, -1).join(" ")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  color: "#ffffff",
                  lineHeight: 1.8,
                }}
              >
                {content.companyName.split(" ").slice(-1)[0]}
              </div>
            </div>
          )}
        </div>

        {/* Center-left: Title + Subtitle */}
        <div className="max-w-xl">
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.0,
              color: "#ffffff",
              marginBottom: "14px",
              letterSpacing: "-0.01em",
            }}
          >
            {content.title}
          </h1>
          {content.subtitle && (
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 400,
                color: "var(--color-cream)",
                lineHeight: 1.4,
                letterSpacing: "0.2px",
              }}
            >
              {content.subtitle}
            </div>
          )}
        </div>

        {/* Bottom: Date + Decorative */}
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3">
            {content.date && (
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "var(--color-gold)",
                }}
              >
                {content.date}
              </div>
            )}
          </div>
          {/* Decorative nested diamonds */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div
              className="absolute w-10 h-10 rotate-45"
              style={{ border: "1px solid rgba(197, 165, 90, 0.3)" }}
            />
            <div
              className="absolute w-6 h-6 rotate-45"
              style={{ border: "1px solid rgba(197, 165, 90, 0.2)" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-9 flex items-center justify-center gap-2 z-20"
        style={{ background: "rgba(0, 0, 0, 0.35)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="var(--color-gold-dim)" opacity="0.6">
          <rect x="0" y="0" width="3" height="3" rx="0.5" />
          <rect x="5" y="0" width="3" height="3" rx="0.5" />
          <rect x="10" y="0" width="3" height="3" rx="0.5" />
          <rect x="0" y="5" width="3" height="3" rx="0.5" />
          <rect x="5" y="5" width="3" height="3" rx="0.5" />
          <rect x="10" y="5" width="3" height="3" rx="0.5" />
          <rect x="0" y="10" width="3" height="3" rx="0.5" />
          <rect x="5" y="10" width="3" height="3" rx="0.5" />
          <rect x="10" y="10" width="3" height="3" rx="0.5" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            fontWeight: 500,
            color: "var(--color-cream-dim)",
            letterSpacing: "0.5px",
          }}
        >
          {brandName || "Analysis Deck"}
        </span>
      </div>
    </Slide>
  );
}
