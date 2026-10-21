"use client";

import * as React from "react";
import Link from "next/link";
import {
  Combine,
  Minimize2,
  Scissors,
  FileImage,
  FileText,
  FileCode,
  Images,
  PenTool,
  LayoutGrid,
  RotateCw,
  Crop,
  Stamp,
  Hash,
  PanelTop,
  FileSpreadsheet,
  ScanText,
  Lock,
  Unlock,
  EyeOff,
  Layers,
  ShieldCheck,
  FilePlus,
  FileCode2,
  Code,
  Table,
  FileDigit,
  Presentation,
  Tv2,
  Sheet,
  Globe,
  BookOpen,
  BookMarked,
  Volume2,
  Mic,
  FolderArchive,
  Moon,
  Camera,
  Share2,
  Users,
  Receipt,
  Printer,
  Fingerprint,
  GitCompare,
  Wrench,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Tool } from "@/lib/tools-data";

const ICON_MAP: Record<string, React.ElementType> = {
  Combine,
  Minimize2,
  Scissors,
  FileImage,
  FileText,
  FileCode,
  Images,
  PenTool,
  LayoutGrid,
  RotateCw,
  Crop,
  Stamp,
  Hash,
  PanelTop,
  FileSpreadsheet,
  ScanText,
  Lock,
  Unlock,
  EyeOff,
  Layers,
  ShieldCheck,
  FilePlus,
  FileCode2,
  Code,
  Table,
  FileDigit,
  Presentation,
  Tv2,
  Sheet,
  Globe,
  BookOpen,
  BookMarked,
  Volume2,
  Mic,
  FolderArchive,
  Moon,
  Camera,
  Share2,
  Users,
  Receipt,
  Printer,
  Fingerprint,
  GitCompare,
  Wrench,
};

export function ToolCard({ tool }: { tool: Tool }) {
  const IconComponent = ICON_MAP[tool.icon] || HelpCircle;

  return (
    <Link href={`/${tool.slug}`} className="block group h-full">
      <div className="vercel-card h-full flex flex-col justify-between p-5">
        <div>
          {/* Top row: 40x40 icon chip + popular badge if applicable */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-white/[0.06] text-white transition-colors group-hover:bg-white/[0.12] border border-white/[0.08]">
              <IconComponent size={20} strokeWidth={1.75} />
            </div>

            {tool.popular && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-[11px] font-mono font-medium text-white bg-white/[0.08] border border-white/20">
                Popular
              </span>
            )}
          </div>

          {/* Tool Name */}
          <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--foreground)] group-hover:text-white transition-colors flex items-center justify-between mb-1.5">
            <span className="truncate">{tool.name}</span>
            <ArrowRight className="h-3.5 w-3.5 text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 group-hover:text-white transition-all shrink-0 ml-1" />
          </h3>

          {/* Description */}
          <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>

        {/* Footer category metadata */}
        <div className="pt-3 mt-4 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--subtle-foreground)]">
          <span className="capitalize">{tool.category.replace("-", " ")}</span>
          <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Open →
          </span>
        </div>
      </div>
    </Link>
  );
}
