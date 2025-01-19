import { cn } from "@/lib/utils"

export function AiverFavicon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M16 6L22 26H18L16.5 21H7.5L6 26H2L9.5 6H16ZM13.5 10L10.5 18H16.5L13.5 10Z"
        fill="white"
      />
    </svg>
  )
} 