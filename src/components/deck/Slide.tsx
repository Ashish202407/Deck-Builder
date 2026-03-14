"use client";

import React from "react";

interface SlideProps {
  children: React.ReactNode;
  pageNumber?: number;
  brandName?: string;
  footerText?: string;
  hideFooter?: boolean;
  className?: string;
}

// Decorative compass/star icon (matches Collateral benchmark top-right ornament)
function CompassIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0L16.5 11.5L28 14L16.5 16.5L14 28L11.5 16.5L0 14L11.5 11.5L14 0Z" fill="currentColor" />
      <path d="M14 5L15.5 12.5L23 14L15.5 15.5L14 23L12.5 15.5L5 14L12.5 12.5L14 5Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

// Footer bar icon (small grid icon matching benchmark)
function FooterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" opacity="0.6">
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
  );
}

export default function Slide({
  children,
  pageNumber,
  brandName,
  footerText = "Analysis Deck",
  hideFooter = false,
  className = "",
}: SlideProps) {
  const showCompass = !className.includes("slide-cover");

  return (
    <section className={`slide ${className}`}>
      <div className="slide-body">
        {children}
        {/* Decorative compass icon - top right of content slides */}
        {showCompass && (
          <div
            className="absolute z-10"
            style={{
              top: "48px",
              right: "56px",
              color: "var(--color-gold)",
              opacity: 0.7,
            }}
          >
            <CompassIcon />
          </div>
        )}
      </div>
      {!hideFooter && (
        <div className="slide-footer">
          {brandName && <span className="brand-name">{brandName}</span>}
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--color-gold-dim)" }}>
              <FooterIcon />
            </span>
            <span>{footerText}</span>
          </div>
          {pageNumber !== undefined && (
            <span className="page-number">{pageNumber}</span>
          )}
        </div>
      )}
    </section>
  );
}
