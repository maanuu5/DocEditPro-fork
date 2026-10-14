"use client";

import * as React from "react";
import { Loader2, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ProcessingOverlayProps {
  isOpen: boolean;
  progress: number; // 0 to 100
  title?: string;
  statusText?: string;
  onCancel?: () => void;
}

export function ProcessingOverlay({
  isOpen,
  progress,
  title = "Processing Document...",
  statusText = "Performing client-side transformations in Web Worker...",
  onCancel,
}: ProcessingOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-in fade-in-0">
      <div className="relative w-full max-w-md rounded-[18px] border border-black/10 bg-white p-6 shadow-2xl space-y-4">
        {onCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="absolute right-3 top-3 h-8 w-8 text-[#86868b] hover:text-[#1d1d1f] rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cancel</span>
          </Button>
        )}

        <div className="flex items-center space-x-3 pr-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff6ff] border border-[#bfdbfe] text-[#0071e3] shrink-0 shadow-2xs">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              {title}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] line-clamp-1">
              {statusText}
            </p>
          </div>
        </div>

        <Progress value={progress} showLabel />
      </div>
    </div>
  );
}
