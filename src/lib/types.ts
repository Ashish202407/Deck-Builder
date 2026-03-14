// ═══ SLIDE TYPES ═══

export type SlideType =
  | "cover"
  | "toc"
  | "exec-summary"
  | "data-table"
  | "chart"
  | "thesis"
  | "company-profile"
  | "closing";

export const SLIDE_TYPE_LABELS: Record<SlideType, string> = {
  cover: "Cover",
  toc: "Table of Contents",
  "exec-summary": "Executive Summary",
  "data-table": "Data Table",
  chart: "Chart Slide",
  thesis: "Thesis / Argument",
  "company-profile": "Company / Team Profile",
  closing: "Closing / Contact",
};

export const SLIDE_TYPE_DESCRIPTIONS: Record<SlideType, string> = {
  cover: "Full-bleed title slide with company name, tagline, and optional background image",
  toc: "Auto-generated grid of section numbers and titles",
  "exec-summary": "Narrative text on the left with key metrics and KPIs on the right",
  "data-table": "Styled data table with optional sidebar highlights",
  chart: "Bar, line, pie, or stacked bar chart with supporting text",
  thesis: "Numbered argument points with supporting statistics",
  "company-profile": "Company description with icon-stat grid and team info",
  closing: "Centered logo with contact information",
};

// ═══ SHARED TYPES ═══

export interface KpiPair {
  value: string;
  label: string;
}

// ═══ SLIDE CONTENT TYPES ═══

export interface CoverContent {
  type: "cover";
  title: string;
  subtitle: string;
  companyName: string;
  date?: string;
  logoDataUrl?: string;
  backgroundImageDataUrl?: string;
}

export interface TocContent {
  type: "toc";
  title?: string;
}

export interface ExecSummaryContent {
  type: "exec-summary";
  title: string;
  sectionLabel?: string;
  narrativeTitle?: string;
  narrative: string;
  bulletPoints?: string[];
  kpis: KpiPair[];
  footnote?: string;
  callouts?: {
    title: string;
    text: string;
  }[];
}

export interface DataTableContent {
  type: "data-table";
  title: string;
  sectionLabel?: string;
  columns: string[];
  rows: (string | number)[][];
  highlightColumns?: number[];
  sidebarTitle?: string;
  sidebarStats?: KpiPair[];
  sidebarBullets?: string[];
  footnote?: string;
}

export type ChartType = "bar" | "line" | "pie" | "stacked-bar";

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
}

export interface ChartSlideContent {
  type: "chart";
  title: string;
  sectionLabel?: string;
  chartType: ChartType;
  chartTitle?: string;
  data: ChartDataPoint[];
  supportingText?: string;
  statCallouts?: KpiPair[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  footnote?: string;
}

export interface NumberedArgument {
  number: number;
  title: string;
  description: string;
}

export interface ThesisContent {
  type: "thesis";
  title: string;
  sectionLabel?: string;
  narrative?: string;
  arguments: NumberedArgument[];
  statCallouts?: KpiPair[];
  bottomStats?: KpiPair[];
}

export interface TeamMember {
  name: string;
  role?: string;
  bio: string;
}

export interface CompanyProfileContent {
  type: "company-profile";
  title: string;
  sectionLabel?: string;
  description: string;
  statGrid: KpiPair[];
  bottomStats?: KpiPair[];
  footnote?: string;
}

export interface ClosingContent {
  type: "closing";
  title: string;
  companyName?: string;
  logoDataUrl?: string;
  address?: string[];
  website?: string;
  email?: string;
  phone?: string;
  socialHandle?: string;
}

export type SlideContent =
  | CoverContent
  | TocContent
  | ExecSummaryContent
  | DataTableContent
  | ChartSlideContent
  | ThesisContent
  | CompanyProfileContent
  | ClosingContent;

// ═══ DECK CONFIGURATION ═══

export interface DeckConfig {
  slides: SlideContent[];
  globalSettings: {
    companyName: string;
    logoDataUrl?: string;
    footerText?: string;
    footerBrand?: string;
  };
}
