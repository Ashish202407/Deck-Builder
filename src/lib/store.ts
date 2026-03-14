"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SlideContent, SlideType, DeckConfig } from "./types";
import { createDefaultSlideContent } from "./defaults";

export type BuilderStep = "select" | "edit" | "preview";

interface BuilderState {
  // Navigation
  currentStep: BuilderStep;
  currentSlideIndex: number;

  // Slide selection & content
  selectedSlideTypes: SlideType[];
  slides: SlideContent[];

  // Global settings
  companyName: string;
  logoDataUrl: string | null;
  footerText: string;

  // Actions
  setStep: (step: BuilderStep) => void;
  setSelectedSlideTypes: (types: SlideType[]) => void;
  initializeSlidesFromSelection: () => void;
  setCurrentSlideIndex: (index: number) => void;
  updateSlideContent: (index: number, content: SlideContent) => void;
  setCompanyName: (name: string) => void;
  setLogoDataUrl: (url: string | null) => void;
  setFooterText: (text: string) => void;
  getDeckConfig: () => DeckConfig;
  resetDeck: () => void;
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: "select",
      currentSlideIndex: 0,
      selectedSlideTypes: ["cover", "toc", "exec-summary", "closing"],
      slides: [],
      companyName: "",
      logoDataUrl: null,
      footerText: "Analysis Deck",

      // Actions
      setStep: (step) => set({ currentStep: step }),

      setSelectedSlideTypes: (types) => set({ selectedSlideTypes: types }),

      initializeSlidesFromSelection: () => {
        const { selectedSlideTypes } = get();
        const slides = selectedSlideTypes.map((type) =>
          createDefaultSlideContent(type)
        );
        set({ slides, currentSlideIndex: 0 });
      },

      setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),

      updateSlideContent: (index, content) => {
        const slides = [...get().slides];
        slides[index] = content;
        set({ slides });
      },

      setCompanyName: (name) => set({ companyName: name }),
      setLogoDataUrl: (url) => set({ logoDataUrl: url }),
      setFooterText: (text) => set({ footerText: text }),

      getDeckConfig: () => {
        const state = get();
        return {
          slides: state.slides,
          globalSettings: {
            companyName: state.companyName,
            logoDataUrl: state.logoDataUrl ?? undefined,
            footerText: state.footerText,
          },
        };
      },

      resetDeck: () =>
        set({
          currentStep: "select",
          currentSlideIndex: 0,
          selectedSlideTypes: ["cover", "toc", "exec-summary", "closing"],
          slides: [],
          companyName: "",
          logoDataUrl: null,
          footerText: "Analysis Deck",
        }),
    }),
    {
      name: "deck-builder-state",
      // Don't persist step/index — always start at select on reload
      partialize: (state) => ({
        selectedSlideTypes: state.selectedSlideTypes,
        slides: state.slides,
        companyName: state.companyName,
        logoDataUrl: state.logoDataUrl,
        footerText: state.footerText,
      }),
    }
  )
);
