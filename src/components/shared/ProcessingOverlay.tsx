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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in-0">
      <div className="relative w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-2xl space-y-4 text-[var(--foreground)]">
        {onCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="absolute right-3 top-3 h-8 w-8 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/[0.08] rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cancel</span>
          </Button>
        )}

        <div className="flex items-center space-x-3 pr-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white/[0.06] border border-white/[0.08] text-white shrink-0">
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
