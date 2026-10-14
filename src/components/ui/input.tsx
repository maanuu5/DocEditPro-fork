import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-[var(--radius-md)] border border-black/15 bg-white px-3 py-1.5 text-sm text-[var(--foreground)] placeholder:text-[#86868b] shadow-xs transition-all focus-visible:outline-none focus-visible:border-[#0071e3] focus-visible:ring-2 focus-visible:ring-[#0071e3]/25 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
