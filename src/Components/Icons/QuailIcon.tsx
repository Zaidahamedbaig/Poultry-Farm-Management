// QuailIcon.tsx
import { SvgIcon, SvgIconProps } from "@mui/material";

export default function QuailIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 64 64"
      stroke="#e4ae24ff"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Body */}
      <path d="M20 48 C15 35, 25 20, 38 20 C50 20, 55 35, 50 48 C50 52, 40 60, 30 58 C25 57,22 52,20 48 Z" />
      {/* Wing */}
      <path d="M30 34 C28 38, 40 40, 38 30 C36 28, 32 30, 30 34 Z" />
      {/* Head */}
      <circle cx="42" cy="18" r="6" />
      {/* Crest/Head stripe */}
      <path d="M44 12 C46 8, 40 6, 42 4" />
      {/* Eye */}
      <circle cx="44" cy="18" r="1.5" fill="#e4ae24ff" />
      {/* Beak */}
      <path d="M48 18 L54 17 L48 20 Z" />
      {/* Tail */}
      <path d="M20 48 L14 54" />
      <path d="M22 50 L16 56" />
      {/* Legs */}
      <path d="M28 480 L26 58" /> <path d="M38 68 L38 58" />
      {/* Body spots */}
      <circle cx="32" cy="32" r="1" />
      <circle cx="36" cy="36" r="1" />
      <circle cx="40" cy="30" r="1" />
      <circle cx="34" cy="40" r="1" />
      <circle cx="38" cy="44" r="1" />
    </SvgIcon>
  );
}
