"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Shield, ArrowLeftRight, Camera, Briefcase, Edit3, ArrowRight } from "lucide-react";
import { TOOLS, Tool } from "@/lib/tools-data";
import { Dialog } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  essentials: <Sparkles className="h-4 w-4 text-[#0071e3]" />,
  'edit-organize': <Edit3 className="h-4 w-4 text-[#7c3aed]" />,
  'security-privacy': <Shield className="h-4 w-4 text-[#059669]" />,
  'convert-export': <ArrowLeftRight className="h-4 w-4 text-[#d97706]" />,
  'scan-share': <Camera className="h-4 w-4 text-[#0891b2]" />,
  business: <Briefcase className="h-4 w-4 text-[#e11d48]" />,
};

const CATEGORY_CHIP_BG: Record<string, string> = {
  essentials: "bg-[#eff6ff] border-[#bfdbfe]",
  'edit-organize': "bg-[#f5f3ff] border-[#ddd6fe]",
  'security-privacy': "bg-[#ecfdf5] border-[#a7f3d0]",
  'convert-export': "bg-[#fffbeb] border-[#fde68a]",
  'scan-share': "bg-[#ecfeff] border-[#a5f3fc]",
  business: "bg-[#fff1f2] border-[#fecdd3]",
};

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();

  const filteredTools = React.useMemo(() => {
    if (!query.trim()) return TOOLS;
    const q = query.toLowerCase();
    return TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = React.useCallback(
    (tool: Tool) => {
      onClose();
      router.push(`/${tool.slug}`);
    },
    [onClose, router]
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredTools.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredTools.length - 1
        );
      } else if (e.key === "Enter" && filteredTools[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredTools[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredTools, selectedIndex, handleSelect]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="space-y-4">
        {/* macOS Spotlight Search Bar */}
        <div className="relative flex items-center border-b border-black/10 pb-3">
          <Search className="h-5 w-5 text-[#0071e3] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Spotlight Search: 44 PDF tools (e.g. edit, compress, OCR, encrypt)..."
            className="w-full bg-transparent text-base text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center rounded-md border border-black/10 bg-[#f5f5f7] px-2 py-0.5 font-mono text-[10px] text-[#6e6e73] shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-[380px] overflow-y-auto space-y-1.5 pr-1">
          {filteredTools.length === 0 ? (
            <div className="p-8 text-center text-[#6e6e73]">
              No matching PDF tools found for &quot;{query}&quot;
            </div>
          ) : (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              const chipBg = CATEGORY_CHIP_BG[tool.category] || "bg-[#f5f5f7] border-black/10";
              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelect(tool)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between rounded-[12px] p-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#0071e3]/10 border border-[#0071e3]/30 shadow-2xs"
                      : "border border-transparent hover:bg-black/[0.03]"
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-[10px] border ${chipBg} shrink-0 shadow-2xs`}>
                      {CATEGORY_ICONS[tool.category]}
                    </div>
                    <div className="min-w-0 truncate">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                          {tool.name}
                        </span>
                        {tool.popular && (
                          <Badge variant="accent">Popular</Badge>
                        )}
                        {tool.new && (
                          <Badge variant="success">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-[#6e6e73] truncate mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#86868b] group-hover:text-[#0071e3] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="flex items-center justify-between border-t border-black/10 pt-3 text-xs text-[#86868b]">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="rounded border border-black/10 bg-[#f5f5f7] px-1.5 py-0.5 font-mono text-[10px] shadow-2xs">
                ↑
              </kbd>{" "}
              <kbd className="rounded border border-black/10 bg-[#f5f5f7] px-1.5 py-0.5 font-mono text-[10px] shadow-2xs">
                ↓
              </kbd>{" "}
              Navigate
            </span>
            <span>
              <kbd className="rounded border border-black/10 bg-[#f5f5f7] px-1.5 py-0.5 font-mono text-[10px] shadow-2xs">
                ↵
              </kbd>{" "}
              Open
            </span>
          </div>
          <span>{filteredTools.length} tools available</span>
        </div>
      </div>
    </Dialog>
  );
}
