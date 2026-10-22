"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "blue" | "green" | "amber" | "purple" | "gray";
  meta?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  indicator?: "radio" | "check" | "none";
}

const BADGE_STYLES: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  gray: "bg-white/[0.04] text-[var(--muted-foreground)] border-[var(--border)]",
};

export function OptionCard({
  selected,
  onClick,
  title,
  description,
  icon,
  badge,
  badgeVariant = "blue",
  meta,
  disabled = false,
  className,
  indicator = "radio",
}: OptionCardProps) {
  const badgeClass = BADGE_STYLES[badgeVariant] || BADGE_STYLES.blue;

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={disabled ? -1 : 0}
      onClick={() => {
        if (!disabled) onClick();
      }}
      onKeyDown={(e) => {
        if (!disabled && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "group relative flex flex-col justify-between p-4 sm:p-5 rounded-[var(--radius-lg)] transition-all duration-200 select-none text-left",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        selected
          ? "bg-white/[0.06] border-2 border-white shadow-xs"
          : "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] hover:-translate-y-0.5",
        className
      )}
    >
      <div>
        {/* Header row: Icon + Badges + Indicator */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            {icon && (
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border transition-transform duration-200 group-hover:scale-105",
                  selected
                    ? "bg-white text-black border-white"
                    : "bg-white/[0.04] text-[var(--foreground)] border-[var(--border)]"
                )}
              >
                {icon}
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className={cn(
                    "text-sm font-semibold tracking-tight transition-colors text-[var(--foreground)]",
                    selected && "text-white"
                  )}
                >
                  {title}
                </span>
                {badge && (
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border font-mono shadow-2xs",
                      badgeClass
                    )}
                  >
                    {badge}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Indicator */}
          {indicator !== "none" && (
            <div
              className={cn(
                "h-5 w-5 shrink-0 rounded-full border transition-all duration-200 flex items-center justify-center mt-0.5",
                selected
                  ? "border-white bg-white text-black shadow-2xs scale-105"
                  : "border-[var(--border-strong)] bg-transparent group-hover:border-white/50"
              )}
            >
              {selected ? (
                indicator === "check" ? (
                  <Check className="h-3 w-3 stroke-[3]" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-black shadow-xs" />
                )
              ) : null}
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">
            {description}
          </p>
        )}
      </div>

      {/* Meta or extra footer info */}
      {meta && (
        <div className="mt-3.5 pt-3 border-t border-[var(--border)] text-[11px] text-[var(--muted-foreground)]">
          {meta}
        </div>
      )}
    </div>
  );
}
