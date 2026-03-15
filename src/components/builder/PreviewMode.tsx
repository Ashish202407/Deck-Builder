"use client";

import React, { useState, useRef, useEffect } from "react";
import { useBuilderStore } from "@/lib/store";
import SlideCover from "@/components/slides/SlideCover";
import SlideToc from "@/components/slides/SlideToc";
import SlideExecSummary from "@/components/slides/SlideExecSummary";
import SlideDataTable from "@/components/slides/SlideDataTable";
import SlideChart from "@/components/slides/SlideChart";
import SlideThesis from "@/components/slides/SlideThesis";
import SlideCompanyProfile from "@/components/slides/SlideCompanyProfile";
import SlideClosing from "@/components/slides/SlideClosing";
import {
  CoverContent,
  TocContent,
  ExecSummaryContent,
  DataTableContent,
  ChartSlideContent,
  ThesisContent,
  CompanyProfileContent,
  ClosingContent,
} from "@/lib/types";
import { generatePdf, downloadBlob } from "@/lib/pdf";

export default function PreviewMode() {
  const { slides, companyName, footerText, setStep } = useBuilderStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.65);

  // Calculate optimal scale based on viewport
  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      // 1280px slide width, leave some padding
      const s = Math.min((vw - 80) / 1280, 0.85);
      setScale(Math.max(0.4, s));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    // Remove scaling during capture so html2canvas gets full-size slides
    const prevScale = scale;
    setScale(1);
    // Wait for React to re-render at scale=1
    await new Promise((r) => setTimeout(r, 300));
    try {
      const blob = await generatePdf((current, total) => {
        setProgress({ current, total });
      });
      const filename = companyName
        ? `${companyName.replace(/\s+/g, "_")}_Analysis_Deck.pdf`
        : "Analysis_Deck.pdf";
      downloadBlob(blob, filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setScale(prevScale);
      setIsGenerating(false);
    }
  };

  const scrollToSlide = (index: number) => {
    setCurrentSlide(index);
    const slides = containerRef.current?.querySelectorAll(".slide");
    slides?.[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const renderSlide = (
    slide: (typeof slides)[number],
    index: number
  ) => {
    const pageNumber = index + 1;
    const brandName = companyName || undefined;

    switch (slide.type) {
      case "cover":
        return (
          <SlideCover
            key={index}
            content={slide as CoverContent}
            brandName={brandName}
          />
        );
      case "toc":
        return (
          <SlideToc
            key={index}
            content={slide as TocContent}
            allSlides={slides}
            pageNumber={pageNumber}
            brandName={brandName}
          />
        );
      case "exec-summary":
        return (
          <SlideExecSummary
            key={index}
            content={slide as ExecSummaryContent}
            pageNumber={pageNumber}
            brandName={brandName}
          />
        );
      case "data-table":
        return (
          <SlideDataTable
            key={index}
            content={slide as DataTableContent}
            pageNumber={pageNumber}
            brandName={brandName}
          />
        );
      case "chart":
        return (
          <SlideChart
            key={index}
            content={slide as ChartSlideContent}
            pageNumber={pageNumber}
            brandName={brandName}
          />
        );
      case "thesis":
        return (
          <SlideThesis
            key={index}
            content={slide as ThesisContent}
            pageNumber={pageNumber}
            brandName={brandName}
          />
        );
      case "company-profile":
        return (
          <SlideCompanyProfile
            key={index}
            content={slide as CompanyProfileContent}
            pageNumber={pageNumber}
            brandName={brandName}
          />
        );
      case "closing":
        return (
          <SlideClosing
            key={index}
            content={slide as ClosingContent}
            pageNumber={pageNumber}
            brandName={brandName}
          />
        );
    }
  };

  return (
    <div>
      {/* Control bar */}
      <div className="no-print max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => setStep("edit")}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            color: "var(--color-cream)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "var(--font-sans)",
          }}
        >
          Back to Editor
        </button>

        {/* Slide thumbnails */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              className="w-7 h-5 rounded-sm text-[9px] font-medium transition-all"
              style={{
                background:
                  i === currentSlide
                    ? "var(--color-gold)"
                    : "rgba(197, 165, 90, 0.12)",
                color:
                  i === currentSlide
                    ? "var(--color-navy-deep)"
                    : "var(--color-cream-dim)",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-60"
          style={{
            background: "var(--color-gold)",
            color: "var(--color-navy-deep)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {isGenerating
            ? `Rendering ${progress.current}/${progress.total}...`
            : "Download PDF"}
        </button>
      </div>

      {/* Slides - stacked vertically with scaling */}
      <div
        ref={containerRef}
        id="pdf-capture-area"
        className="flex flex-col items-center gap-6 pb-20"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`rounded-sm overflow-hidden ${isGenerating ? "" : "shadow-2xl"}`}
            style={
              isGenerating
                ? {} // No transform during PDF generation
                : {
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                    marginBottom: `${-(720 * (1 - scale))}px`,
                  }
            }
          >
            {renderSlide(slide, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
