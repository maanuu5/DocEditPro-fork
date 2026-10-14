"use client";

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
  Sparkles,
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

const MAC_CATEGORY_STYLES: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  essentials: {
    bg: "bg-[#eff6ff]",
    text: "text-[#0071e3]",
    border: "border-[#bfdbfe]",
  },
  "edit-organize": {
    bg: "bg-[#f5f3ff]",
    text: "text-[#7c3aed]",
    border: "border-[#ddd6fe]",
  },
  "security-privacy": {
    bg: "bg-[#ecfdf5]",
    text: "text-[#059669]",
    border: "border-[#a7f3d0]",
  },
  "convert-export": {
    bg: "bg-[#fffbeb]",
    text: "text-[#d97706]",
    border: "border-[#fde68a]",
  },
  "scan-share": {
    bg: "bg-[#ecfeff]",
    text: "text-[#0891b2]",
    border: "border-[#a5f3fc]",
  },
  business: {
    bg: "bg-[#fff1f2]",
    text: "text-[#e11d48]",
    border: "border-[#fecdd3]",
  },
};

export function ToolCard({ tool }: { tool: Tool }) {
  const IconComponent = ICON_MAP[tool.icon] || HelpCircle;
  const style = MAC_CATEGORY_STYLES[tool.category] || MAC_CATEGORY_STYLES.essentials;

  return (
    <Link href={`/${tool.slug}`} className="block group h-full">
      <div className="h-full flex flex-col justify-between p-5 rounded-[16px] bg-white border border-black/[0.08] hover:border-[#0071e3]/50 hover:bg-white transition-all duration-200 shadow-[var(--shadow-mac-xs)] hover:shadow-[var(--shadow-mac-md)] hover:-translate-y-1 relative">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            {/* macOS App Icon Chip */}
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${style.bg} ${style.text} border ${style.border} group-hover:scale-105 transition-transform shadow-2xs`}
            >
              <IconComponent className="h-5 w-5 stroke-[1.8]" />
            </div>

            {/* Badges */}
            <div className="flex items-center space-x-1.5">
              {tool.popular && (
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#eff6ff] text-[#0071e3] border border-[#bfdbfe]">
                  <Sparkles className="h-2.5 w-2.5 text-[#0071e3]" />
                  <span>Popular</span>
                </span>
              )}
              {tool.new && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  New
                </span>
              )}
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors mb-1.5 flex items-center justify-between">
            <span className="truncate">{tool.name}</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#0071e3] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
          </h3>

          <p className="text-xs text-[#6e6e73] leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-black/[0.05] flex items-center justify-between text-[11px] text-[#86868b]">
          <span className="capitalize font-mono text-[10px]">{tool.category.replace("-", " ")}</span>
          <span className="text-[#0071e3] font-semibold text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
            Open tool →
          </span>
        </div>
      </div>
    </Link>
  );
}
