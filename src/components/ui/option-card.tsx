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
  blue: "bg-[#eff6ff] text-[#0071e3] border-[#bfdbfe]",
  green: "bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]",
  amber: "bg-[#fffbeb] text-[#d97706] border-[#fde68a]",
  purple: "bg-[#f5f3ff] text-[#7c3aed] border-[#ddd6fe]",
  gray: "bg-[#f5f5f7] text-[#6e6e73] border-black/10",
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
        "group relative flex flex-col justify-between p-4 sm:p-5 rounded-[16px] transition-all duration-200 select-none text-left",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        selected
          ? "bg-gradient-to-br from-white via-[#f7faff] to-[#eff6ff] border-2 border-[#0071e3] shadow-[var(--shadow-mac-sm)] shadow-[#0071e3]/10"
          : "bg-white border border-black/[0.08] hover:border-black/20 hover:bg-[#fafafc] hover:shadow-[var(--shadow-mac-xs)] hover:-translate-y-0.5",
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
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border transition-transform duration-200 group-hover:scale-105",
                  selected
                    ? "bg-[#0071e3] text-white border-[#0071e3] shadow-xs shadow-[#0071e3]/20"
                    : "bg-[#f5f5f7] text-[#1d1d1f] border-black/5"
                )}
              >
                {icon}
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <span
                  className={cn(
                    "text-sm font-bold tracking-tight transition-colors",
                    selected ? "text-[#0071e3]" : "text-[#1d1d1f] group-hover:text-[#0071e3]"
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

          {/* Indicator (macOS Radio or Check) */}
          {indicator !== "none" && (
            <div
              className={cn(
                "h-5 w-5 shrink-0 rounded-full border transition-all duration-200 flex items-center justify-center mt-0.5",
                selected
                  ? "border-[#0071e3] bg-[#0071e3] text-white shadow-2xs scale-105"
                  : "border-black/20 bg-white group-hover:border-black/35"
              )}
            >
              {selected ? (
                indicator === "check" ? (
                  <Check className="h-3 w-3 stroke-[3]" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
                )
              ) : null}
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p
            className={cn(
              "text-xs leading-relaxed transition-colors",
              selected ? "text-[#333336]" : "text-[#6e6e73]"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Meta or extra footer info */}
      {meta && (
        <div className="mt-3.5 pt-3 border-t border-black/[0.05] text-[11px]">
          {meta}
        </div>
      )}
    </div>
  );
}
