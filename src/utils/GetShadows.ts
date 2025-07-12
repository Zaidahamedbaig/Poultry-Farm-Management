// ==============================|| CUSTOM FUNCTION - COLOR SHADOWS ||============================== //

interface CustomShadows {
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  primaryButton: string;
  secondaryButton: string;
  errorButton: string;
  warningButton: string;
  infoButton: string;
  successButton: string;
  [key: string]: string; // For additional custom shadows
}

// Default shadows if none are provided in theme
const defaultShadows: CustomShadows = {
  primary: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  secondary: "0px 2px 10px rgb(213, 213, 213)",
  error: "0px 2px 10px rgba(255, 0, 0, 0.1)",
  warning: "0px 2px 10px rgba(255, 165, 0, 0.1)",
  info: "0px 2px 10px rgba(0, 191, 255, 0.1)",
  success: "0px 2px 10px rgba(0, 128, 0, 0.1)",
  primaryButton: "0px 4px 12px rgba(0, 0, 0, 0.15)",
  secondaryButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  errorButton: "0px 4px 12px rgba(255, 0, 0, 0.15)",
  warningButton: "0px 4px 12px rgba(255, 165, 0, 0.15)",
  infoButton: "0px 4px 12px rgba(0, 191, 255, 0.15)",
  successButton: "0px 4px 12px rgba(0, 128, 0, 0.15)",
};

export default function getShadow(
  theme: { customShadows?: Partial<CustomShadows> },
  shadow: keyof CustomShadows
): string {
  // Merge theme shadows with defaults (theme shadows take precedence)
  const shadows = { ...defaultShadows, ...theme.customShadows };

  // Return the requested shadow or primary as fallback
  return shadows[shadow] || shadows.primary;
}
