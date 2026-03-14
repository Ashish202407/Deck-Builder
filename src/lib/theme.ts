export const theme = {
  colors: {
    navy: "#1e3a4f",
    navyDeep: "#142e3c",
    navyCard: "#15303d",
    navyDarker: "#0f2530",
    gold: "#c5a55a",
    goldDim: "#a08a4a",
    goldBright: "#d4b96a",
    cream: "#e8dcc8",
    creamDim: "#b8afa0",
    white: "#ffffff",
  },
  fonts: {
    serif: "'Playfair Display', Georgia, serif",
    sans: "'DM Sans', system-ui, sans-serif",
  },
  slide: {
    width: 1280,
    height: 720,
    paddingX: 72,
    paddingTop: 56,
    paddingBottom: 48,
    footerHeight: 34,
  },
} as const;

// Recharts color palette for charts
export const chartColors = {
  primary: theme.colors.gold,
  secondary: theme.colors.cream,
  tertiary: theme.colors.goldDim,
  quaternary: theme.colors.creamDim,
  background: theme.colors.navyCard,
  grid: "rgba(200, 200, 200, 0.1)",
  axis: theme.colors.creamDim,
  tooltip: {
    bg: theme.colors.navyDarker,
    border: theme.colors.gold,
    text: theme.colors.cream,
  },
} as const;
