import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Consistent date formatting to prevent hydration mismatches
export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString)
  // Use a consistent format that doesn't depend on locale
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
