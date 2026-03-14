"use client";

import React from "react";
import { SLIDE_TYPE_LABELS, SLIDE_TYPE_DESCRIPTIONS, SlideType } from "@/lib/types";

const FEATURED_SLIDES: SlideType[] = [
  "cover",
  "exec-summary",
  "chart",
  "data-table",
  "thesis",
  "company-profile",
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--color-navy-deep)" }}
    >
      {/* Hero */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative element */}
          <div className="flex justify-center mb-8">
            <div
              className="w-12 h-12 rotate-45"
              style={{
                border: "1.5px solid var(--color-gold-dim)",
                opacity: 0.6,
              }}
            />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "52px",
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Analysis Deck Builder
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--color-cream)",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Generate professional analysis and investment memo decks in minutes.
            Select your slide types, fill in your data, and download a
            beautiful PDF.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="./builder/"
              className="inline-flex items-center px-8 py-3.5 rounded-lg text-base font-semibold transition-all duration-200 hover:brightness-110"
              style={{
                background: "var(--color-gold)",
                color: "var(--color-navy-deep)",
                fontFamily: "var(--font-sans)",
                textDecoration: "none",
              }}
            >
              Start Building
            </a>
          </div>

          <div
            className="mt-6 flex items-center justify-center gap-4"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "var(--color-cream-dim)",
            }}
          >
            <span>Free &amp; Open Source</span>
            <span style={{ color: "var(--color-gold-dim)" }}>&#8226;</span>
            <span>No Signup Required</span>
            <span style={{ color: "var(--color-gold-dim)" }}>&#8226;</span>
            <span>PDF Export</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="label-gold"
              style={{ fontSize: "10px" }}
            >
              Slide Types
            </span>
            <h2
              className="mt-2"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "32px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              8 Professional Slide Types
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "var(--color-cream-dim)",
                maxWidth: "500px",
                margin: "12px auto 0",
              }}
            >
              Each designed to match the quality of investment bank and consulting firm presentations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FEATURED_SLIDES.map((type) => (
              <div
                key={type}
                className="p-5 rounded-lg"
                style={{
                  background: "var(--color-navy)",
                  border: "1px solid rgba(197, 165, 90, 0.08)",
                }}
              >
                <div
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    color: "var(--color-gold)",
                  }}
                >
                  {SLIDE_TYPE_LABELS[type]}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    color: "var(--color-cream-dim)",
                    lineHeight: 1.5,
                  }}
                >
                  {SLIDE_TYPE_DESCRIPTIONS[type]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="py-16 px-6"
        style={{ background: "var(--color-navy-darker)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="label-gold"
              style={{ fontSize: "10px" }}
            >
              How It Works
            </span>
            <h2
              className="mt-2"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "32px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Three Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Select Slides",
                desc: "Choose from 8 professional slide types tailored for analysis and investment decks.",
              },
              {
                num: "02",
                title: "Add Content",
                desc: "Fill in your data through guided forms. Upload Excel files for charts and tables.",
              },
              {
                num: "03",
                title: "Download PDF",
                desc: "Preview your deck in-browser and download a pixel-perfect PDF ready to present.",
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "36px",
                    fontWeight: 700,
                    color: "var(--color-gold)",
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "15px",
                    color: "#ffffff",
                  }}
                >
                  {step.title}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: "var(--color-cream-dim)",
                    lineHeight: 1.5,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: "1px solid rgba(197, 165, 90, 0.08)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            color: "var(--color-cream-dim)",
          }}
        >
          Analysis Deck Builder — Free &amp; Open Source
        </p>
      </footer>
    </div>
  );
}
