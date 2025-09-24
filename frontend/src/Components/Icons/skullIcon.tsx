// SkullIcon.tsx
import { SvgIcon, SvgIconProps } from "@mui/material";

export default function SkullIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      {/* Skull outline */}
      <path
        d="M12 2c-4.8 0-8.5 3.7-8.5 8.5 0 2 .6 3.7 1.7 5v2c0 1.1.9 2 2 2h1v1.5c0 1.1.9 2 2 2h3.6c1.1 0 2-.9 2-2V19h1c1.1 0 2-.9 2-2v-2c1.1-1.3 1.7-3 1.7-5 0-4.8-3.7-8.5-8.5-8.5z"
        fill="currentColor"
      />
      {/* Eyes */}
      <circle cx="9" cy="10" r="2" fill="#fff" />
      <circle cx="15" cy="10" r="2" fill="#fff" />
      {/* Nose cavity */}
      <path d="M11 13 L12 15 L13 13 Z" fill="#fff" />
      {/* Teeth (3 lower rectangles) */}
      <rect x="10" y="17" width="1" height="2" fill="#fff" />
      <rect x="11.5" y="17" width="1" height="2" fill="#fff" />
      <rect x="13" y="17" width="1" height="2" fill="#fff" />
    </SvgIcon>
  );
}
