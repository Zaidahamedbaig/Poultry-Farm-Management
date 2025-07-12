// ==============================|| CUSTOM FUNCTION - COLORS ||============================== //

interface ColorPalette {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
  [key: string]: any; // For additional palette properties
}

interface ThemePalette {
  primary: ColorPalette;
  secondary: ColorPalette;
  error: ColorPalette;
  warning: ColorPalette;
  info: ColorPalette;
  success: ColorPalette;
  [key: string]: any; // For additional palette colors
}

interface ThemeWithPalette {
  palette: ThemePalette;
  [key: string]: any; // For other theme properties
}

// Default fallback colors if theme is incomplete
const defaultColors: ThemePalette = {
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#fff",
  },
  secondary: {
    main: "RGB: rgb(156, 158, 158)",
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#fff",
  },
  error: {
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
    contrastText: "#fff",
  },
  warning: {
    main: "#ed6c02",
    light: "#ff9800",
    dark: "#e65100",
    contrastText: "#fff",
  },
  info: {
    main: "#0288d1",
    light: "#03a9f4",
    dark: "#01579b",
    contrastText: "#fff",
  },
  success: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#fff",
  },
};

export default function getColors(
  theme: ThemeWithPalette,
  color: keyof ThemePalette
): ColorPalette {
  // Merge theme palette with defaults (theme values take precedence)
  const palette = { ...defaultColors, ...theme.palette };

  // Return the requested color or primary as fallback
  return palette[color] || palette.primary;
}
