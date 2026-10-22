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

export const ICON_MAP: Record<string, React.ElementType> = {
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

export function ToolCard({
  tool,
  variant = "default",
}: {
  tool: Tool;
  variant?: "default" | "grid" | "compact" | "quick";
}) {
  const IconComponent = ICON_MAP[tool.icon] || HelpCircle;

  if (variant === "compact") {
    return (
      <Link href={`/${tool.slug}`} className="block group h-full">
        <div className="flex items-center justify-between p-3 rounded-[8px] border border-white/[0.09] bg-[#141416] hover:bg-[#1c1c20] hover:border-white/[0.22] hover:-translate-y-0.5 transition-all h-full shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-white/[0.07] text-white shrink-0 group-hover:bg-white/[0.14] transition-colors border border-white/[0.1]">
              <IconComponent size={16} strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-[13px] font-medium text-white group-hover:text-white transition-colors truncate">
                {tool.name}
              </div>
              <div className="text-[11px] text-zinc-400 group-hover:text-zinc-300 truncate hidden sm:block">
                {tool.description}
              </div>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-zinc-500 opacity-40 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </div>
      </Link>
    );
  }

  if (variant === "quick") {
    return (
      <Link href={`/${tool.slug}`} className="block group h-full">
        <div className="flex flex-col justify-between p-3.5 rounded-[10px] border border-white/[0.09] bg-[#141416] hover:bg-[#1c1c20] hover:border-white/[0.22] hover:-translate-y-0.5 transition-all h-full shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[7px] bg-white/[0.08] text-white group-hover:bg-white/[0.16] transition-colors border border-white/[0.12]">
              <IconComponent size={18} strokeWidth={1.75} />
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-500 opacity-40 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
          <div>
            <div className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-white transition-colors truncate">
              {tool.name}
            </div>
            <div className="text-[11px] text-zinc-400 group-hover:text-zinc-300 truncate mt-0.5">
              {tool.description}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/${tool.slug}`} className="block group h-full">
      <div className="h-full flex flex-col justify-between p-5 rounded-[12px] border border-white/[0.09] bg-[#141416] hover:bg-[#1c1c20] hover:border-white/[0.22] hover:-translate-y-0.5 transition-all shadow-xs">
        <div>
          {/* Top row: 40x40 icon chip + popular badge if applicable */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-white/[0.08] text-white transition-colors group-hover:bg-white/[0.16] border border-white/[0.1]">
              <IconComponent size={20} strokeWidth={1.75} />
            </div>

            {tool.popular && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-[11px] font-mono font-medium text-white bg-white/[0.08] border border-white/20">
                Popular
              </span>
            )}
          </div>

          {/* Tool Name */}
          <h3 className="text-sm sm:text-[15px] font-semibold text-white group-hover:text-white transition-colors flex items-center justify-between mb-1.5">
            <span className="truncate">{tool.name}</span>
            <ArrowRight className="h-3.5 w-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </h3>

          {/* Description */}
          <p className="text-[13px] text-zinc-400 group-hover:text-zinc-300 leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>

        {/* Footer category metadata */}
        <div className="pt-3 mt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span className="capitalize">{tool.category.replace("-", " ")}</span>
          <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Open →
          </span>
        </div>
      </div>
    </Link>
  );
}
