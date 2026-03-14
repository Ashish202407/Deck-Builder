import {
  SlideContent,
  SlideType,
  CoverContent,
  TocContent,
  ExecSummaryContent,
  DataTableContent,
  ChartSlideContent,
  ThesisContent,
  CompanyProfileContent,
  ClosingContent,
} from "./types";

export function createDefaultSlideContent(type: SlideType): SlideContent {
  switch (type) {
    case "cover":
      return {
        type: "cover",
        title: "Investment Memo",
        subtitle: "Strategic Acquisition Analysis",
        companyName: "Your Company Name",
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      } satisfies CoverContent;

    case "toc":
      return {
        type: "toc",
        title: "Table of Contents",
      } satisfies TocContent;

    case "exec-summary":
      return {
        type: "exec-summary",
        title: "Executive Summary",
        sectionLabel: "Overview",
        narrativeTitle: "Investment Opportunity",
        narrative:
          "Provide a concise overview of the opportunity, including key value drivers and strategic rationale for the investment.",
        bulletPoints: [
          "Key strategic advantage or differentiator",
          "Growth trajectory and market tailwinds",
          "Risk-adjusted return potential",
        ],
        kpis: [
          { value: "$0M", label: "Total Value" },
          { value: "$0M", label: "Revenue" },
          { value: "0%", label: "Growth Rate" },
          { value: "$0M", label: "EBITDA" },
          { value: "0x", label: "Multiple" },
          { value: "0%", label: "IRR Target" },
        ],
      } satisfies ExecSummaryContent;

    case "data-table":
      return {
        type: "data-table",
        title: "Data Overview",
        sectionLabel: "Key Data",
        columns: ["Category", "Value", "Change", "Status"],
        rows: [
          ["Sample Row 1", "100", "+5%", "Active"],
          ["Sample Row 2", "250", "+12%", "Active"],
          ["Sample Row 3", "180", "-3%", "Review"],
        ],
        sidebarTitle: "Highlights",
        sidebarStats: [
          { value: "530", label: "Total" },
          { value: "+4.7%", label: "Avg. Change" },
        ],
      } satisfies DataTableContent;

    case "chart":
      return {
        type: "chart",
        title: "Performance Analysis",
        sectionLabel: "Analytics",
        chartType: "bar",
        chartTitle: "Annual Revenue",
        data: [
          { label: "2020", value: 120 },
          { label: "2021", value: 180 },
          { label: "2022", value: 250 },
          { label: "2023", value: 310 },
          { label: "2024", value: 420 },
        ],
        supportingText:
          "Revenue has grown consistently year-over-year, driven by market expansion and operational improvements.",
        statCallouts: [
          { value: "+250%", label: "Total Growth" },
          { value: "$420M", label: "Current Revenue" },
        ],
      } satisfies ChartSlideContent;

    case "thesis":
      return {
        type: "thesis",
        title: "Investment Thesis",
        sectionLabel: "Strategic Rationale",
        narrative:
          "The investment thesis is built on three core pillars that support long-term value creation.",
        arguments: [
          {
            number: 1,
            title: "Market Tailwinds",
            description:
              "Strong macro trends driving demand growth in the target sector.",
          },
          {
            number: 2,
            title: "Operational Excellence",
            description:
              "Proven management team with track record of margin improvement.",
          },
          {
            number: 3,
            title: "Valuation Opportunity",
            description:
              "Attractive entry point relative to comparable transactions.",
          },
        ],
        statCallouts: [
          { value: "14.9%", label: "Annualized Return" },
          { value: "3x", label: "MOIC Target" },
        ],
        bottomStats: [
          { value: "+25%", label: "Market Growth" },
          { value: "700 bps", label: "Margin Expansion" },
        ],
      } satisfies ThesisContent;

    case "company-profile":
      return {
        type: "company-profile",
        title: "About Us",
        sectionLabel: "Company Overview",
        description:
          "Provide a description of your company, including history, expertise, and key differentiators.",
        statGrid: [
          { value: "$0B", label: "Assets Under Management" },
          { value: "0", label: "Team Members" },
          { value: "0", label: "Portfolio Companies" },
          { value: "0+", label: "Years of Experience" },
        ],
        bottomStats: [
          { value: "0%", label: "Avg. Return" },
          { value: "0%", label: "IRR" },
          { value: "0%", label: "Distributions" },
        ],
      } satisfies CompanyProfileContent;

    case "closing":
      return {
        type: "closing",
        title: "For More Information",
        companyName: "Your Company Name",
        address: ["123 Business Street", "City, State 00000"],
        website: "www.example.com",
        email: "contact@example.com",
      } satisfies ClosingContent;
  }
}
