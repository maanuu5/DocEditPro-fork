import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--ring)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0071e3] text-white hover:bg-[#0077ed] border border-[#0071e3]/20 shadow-xs hover:shadow-[0_2px_10px_rgba(0,113,227,0.25)] active:scale-[0.98]",
        secondary:
          "bg-white text-[var(--foreground)] border border-[var(--border)] hover:bg-[#f0f0f4] hover:border-black/15 shadow-xs active:scale-[0.98]",
        ghost:
          "bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-black/[0.05] active:scale-[0.98]",
        destructive:
          "bg-[#ff3b30] text-white hover:bg-[#e0352b] border border-transparent shadow-xs active:scale-[0.98]",
        outline:
          "bg-white text-[var(--foreground)] border border-[var(--border)] hover:bg-[#f0f0f4] hover:border-black/15 shadow-xs",
        notionPill:
          "bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-5 py-2 text-xs font-semibold shadow-xs shadow-[#0071e3]/25 active:scale-[0.98]",
        macPill:
          "bg-[#0071e3] text-white hover:bg-[#0077ed] rounded-full px-5 py-2 text-xs font-semibold shadow-xs shadow-[#0071e3]/25 active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-9 px-4 text-xs sm:text-sm gap-2",
        lg: "h-11 px-6 text-sm sm:text-base font-semibold gap-2.5",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
