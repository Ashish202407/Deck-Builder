"use client";

import React from "react";
import { useBuilderStore } from "@/lib/store";
import { SLIDE_TYPE_LABELS } from "@/lib/types";
import CoverForm from "./forms/CoverForm";
import TocForm from "./forms/TocForm";
import ExecSummaryForm from "./forms/ExecSummaryForm";
import DataTableForm from "./forms/DataTableForm";
import ChartSlideForm from "./forms/ChartSlideForm";
import ThesisForm from "./forms/ThesisForm";
import CompanyProfileForm from "./forms/CompanyProfileForm";
import ClosingForm from "./forms/ClosingForm";

export default function SlideWizard() {
  const {
    slides,
    currentSlideIndex,
    setCurrentSlideIndex,
    setStep,
    companyName,
    setCompanyName,
    footerText,
    setFooterText,
  } = useBuilderStore();

  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setStep("select");
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePreview = () => {
    setStep("preview");
  };

  const renderForm = () => {
    if (!currentSlide) return null;
    switch (currentSlide.type) {
      case "cover":
        return <CoverForm />;
      case "toc":
        return <TocForm />;
      case "exec-summary":
        return <ExecSummaryForm />;
      case "data-table":
        return <DataTableForm />;
      case "chart":
        return <ChartSlideForm />;
      case "thesis":
        return <ThesisForm />;
      case "company-profile":
        return <CompanyProfileForm />;
      case "closing":
        return <ClosingForm />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Global settings (shown only on first slide) */}
      {currentSlideIndex === 0 && (
        <div
          className="mb-8 p-4 rounded-lg"
          style={{
            background: "var(--color-navy-card)",
            border: "1px solid rgba(197, 165, 90, 0.1)",
          }}
        >
          <div
            className="label-gold mb-3"
            style={{ fontSize: "10px" }}
          >
            Global Settings
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block mb-1 text-xs font-medium"
                style={{ color: "var(--color-cream)" }}
              >
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your Company Name"
                className="w-full px-3 py-2 rounded text-sm"
                style={{
                  background: "var(--color-navy)",
                  border: "1px solid rgba(197, 165, 90, 0.15)",
                  color: "#ffffff",
                  fontFamily: "var(--font-sans)",
                }}
              />
            </div>
            <div>
              <label
                className="block mb-1 text-xs font-medium"
                style={{ color: "var(--color-cream)" }}
              >
                Footer Text
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="Analysis Deck"
                className="w-full px-3 py-2 rounded text-sm"
                style={{
                  background: "var(--color-navy)",
                  border: "1px solid rgba(197, 165, 90, 0.15)",
                  color: "#ffffff",
                  fontFamily: "var(--font-sans)",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlideIndex(i)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              background:
                i === currentSlideIndex
                  ? "rgba(197, 165, 90, 0.15)"
                  : "transparent",
              color:
                i === currentSlideIndex
                  ? "var(--color-gold)"
                  : "var(--color-cream-dim)",
              border:
                i === currentSlideIndex
                  ? "1px solid rgba(197, 165, 90, 0.3)"
                  : "1px solid transparent",
              fontFamily: "var(--font-sans)",
            }}
          >
            <span>{i + 1}</span>
            <span className="hidden sm:inline">
              {SLIDE_TYPE_LABELS[slide.type]}
            </span>
          </button>
        ))}
      </div>

      {/* Current slide form */}
      <div
        className="p-6 rounded-lg mb-6"
        style={{
          background: "var(--color-navy)",
          border: "1px solid rgba(197, 165, 90, 0.1)",
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <span
            className="label-gold"
            style={{ fontSize: "10px" }}
          >
            Slide {currentSlideIndex + 1} of {totalSlides}
          </span>
          <span
            className="font-semibold"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "20px",
              color: "#ffffff",
            }}
          >
            {currentSlide ? SLIDE_TYPE_LABELS[currentSlide.type] : ""}
          </span>
        </div>
        {renderForm()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            color: "var(--color-cream)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {currentSlideIndex === 0 ? "Back to Selection" : "Previous"}
        </button>

        <div className="flex gap-3">
          {currentSlideIndex < totalSlides - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: "var(--color-gold)",
                color: "var(--color-navy-deep)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Next Slide
            </button>
          ) : null}
          <button
            onClick={handlePreview}
            className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              background:
                currentSlideIndex === totalSlides - 1
                  ? "var(--color-gold)"
                  : "rgba(197, 165, 90, 0.15)",
              color:
                currentSlideIndex === totalSlides - 1
                  ? "var(--color-navy-deep)"
                  : "var(--color-gold)",
              border: "1px solid rgba(197, 165, 90, 0.3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Preview Deck
          </button>
        </div>
      </div>
    </div>
  );
}
