"use client";

import React from "react";
import Slide from "../deck/Slide";
import { ClosingContent } from "@/lib/types";

interface SlideClosingProps {
  content: ClosingContent;
  pageNumber?: number;
  brandName?: string;
}

export default function SlideClosing({
  content,
  pageNumber,
  brandName,
}: SlideClosingProps) {
  return (
    <Slide pageNumber={pageNumber} brandName={brandName}>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Logo */}
        {content.logoDataUrl ? (
          <img
            src={content.logoDataUrl}
            alt="Logo"
            className="h-16 w-auto object-contain mb-8"
          />
        ) : content.companyName ? (
          <div className="mb-8">
            {/* Decorative diamond frame */}
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <div
                className="absolute inset-0 rotate-45"
                style={{
                  border: "1px solid rgba(197, 165, 90, 0.3)",
                }}
              />
              <span
                className="relative z-10 font-bold"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "20px",
                  color: "var(--color-cream)",
                  letterSpacing: "2px",
                }}
              >
                {content.companyName
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .substring(0, 3)}
              </span>
            </div>
          </div>
        ) : null}

        {/* Title */}
        <h2
          className="heading-md mb-6"
          style={{ color: "var(--color-gold)", fontSize: "22px" }}
        >
          {content.title}
        </h2>

        {/* Contact details */}
        <div className="space-y-1.5">
          {content.address?.map((line, i) => (
            <div key={i} className="body-text" style={{ fontSize: "13px" }}>
              {line}
            </div>
          ))}
        </div>

        {/* Decorative star */}
        <div className="my-6" style={{ color: "var(--color-gold-dim)" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
          </svg>
        </div>

        {/* Links */}
        <div className="space-y-1">
          {content.website && (
            <div className="body-text" style={{ color: "var(--color-gold)" }}>
              {content.website}
            </div>
          )}
          {content.email && (
            <div className="body-text" style={{ color: "var(--color-cream)" }}>
              {content.email}
            </div>
          )}
          {content.phone && (
            <div className="body-text" style={{ color: "var(--color-cream)" }}>
              {content.phone}
            </div>
          )}
          {content.socialHandle && (
            <div
              className="body-text"
              style={{ color: "var(--color-cream-dim)" }}
            >
              {content.socialHandle}
            </div>
          )}
        </div>
      </div>
    </Slide>
  );
}
