import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        accent: "bg-white/[0.08] text-white border border-white/20",
        secondary: "bg-white/[0.04] text-[var(--muted-foreground)] border border-[var(--border)]",
        outline: "bg-transparent text-[var(--foreground)] border border-[var(--border)]",
        success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        danger: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
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
