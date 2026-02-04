"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200",
        secondary:
          "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200",
        success:
          "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200",
        warning:
          "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border border-orange-200",
        danger:
          "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200",
        outline:
          "border-2 border-slate-300 text-slate-600 bg-white",
        magic:
          "bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 text-purple-800 border border-purple-200",
        gold:
          "bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-900 border border-amber-300 shadow-sm",
        level:
          "bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
