export const getMonthShortName = (date: Date) => {
  return date.toLocaleString("en-US", { month: "short" }).toUpperCase(); // e.g., "JUL"
};
