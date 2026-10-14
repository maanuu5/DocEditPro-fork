import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        accent: "bg-[#eff6ff] text-[#0071e3] border border-[#bfdbfe]",
        secondary: "bg-[#f0f0f4] text-[#6e6e73] border border-black/5",
        outline: "bg-white text-[var(--foreground)] border border-[var(--border)]",
        success: "bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]",
        danger: "bg-[#fff1f2] text-[#e11d48] border border-[#fecdd3]",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
