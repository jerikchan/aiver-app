import { cn } from "@/lib/utils"

export function AiverLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      {/* A */}
      <path
        d="M15.5 2L23 22H19L17.5 17H8.5L7 22H3L10.5 2H15.5ZM13 6L10 14H16L13 6Z"
        className="fill-primary"
      />
      {/* I */}
      <path
        d="M27 2H31V22H27V2Z"
        className="fill-primary"
      />
      {/* V */}
      <path
        d="M35 2H39L44 16L49 2H53L46 22H42L35 2Z"
        className="fill-primary"
      />
      {/* E */}
      <path
        d="M57 2H73V6H61V10H71V14H61V18H73V22H57V2Z"
        className="fill-primary"
      />
      {/* R */}
      <path
        d="M77 2H88C90 2 91.5 3.5 91.5 6V10C91.5 12.5 90 14 88 14L92 22H87L83.5 14H81V22H77V2ZM81 6V10H87C87.5 10 87.5 9.5 87.5 8V7C87.5 6.5 87.5 6 87 6H81Z"
        className="fill-primary"
      />
    </svg>
  )
} 