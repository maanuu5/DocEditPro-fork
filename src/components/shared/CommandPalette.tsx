"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, HelpCircle } from "lucide-react";
import { CATEGORIES, TOOLS, Tool } from "@/lib/tools-data";
import { Dialog } from "@/components/ui/dialog";
import { ICON_MAP } from "@/components/home/ToolCard";

const SHORT_CATEGORY_NAMES: Record<string, string> = {
  essentials: "Essentials",
  "edit-organize": "Edit",
  "security-privacy": "Security",
  "convert-export": "Convert",
  "scan-share": "Scan",
  business: "Business",
};

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Filter tools by search query and category
  const filteredTools = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const handleSelect = React.useCallback(
    (tool: Tool) => {
      onClose();
      router.push(`/${tool.slug}`);
    },
    [onClose, router]
  );

  // Reset selectedIndex whenever results change
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Keep active item scrolled into view
  React.useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // Reset inputs when opened
  React.useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedCategory("all");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
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
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      hideCloseButton={true}
      className="p-0 overflow-hidden bg-[#121214] border border-white/[0.12] rounded-[14px] shadow-2xl shadow-black/80 max-w-2xl"
    >
      <div className="flex flex-col">
        {/* Search Bar Header */}
        <div className="relative flex items-center justify-between px-4 py-3.5 border-b border-white/[0.08] bg-[#141416]">
          <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
            <Search className="h-4 w-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 44 tools (e.g. merge, compress, edit, ocr, word)..."
              style={{ outline: "none", boxShadow: "none", border: "none" }}
              className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 font-sans tracking-tight focus:outline-none focus:ring-0 focus-visible:outline-none"
              autoFocus
            />
          </div>

          {/* Right Header Actions (Symmetrical, Non-overlapping) */}
          <div className="flex items-center gap-2 shrink-0">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                title="Clear search"
                className="h-6 w-6 rounded flex items-center justify-center text-xs text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center rounded-[4px] border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
              ESC
            </kbd>
            <button
              type="button"
              onClick={onClose}
              title="Close search (Esc)"
              className="h-7 w-7 rounded-[6px] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        {/* Quick Category Filter Bar */}
        <div className="flex items-center gap-1 px-3 py-1.5 border-b border-white/[0.06] bg-[#0e0e10] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-2 py-0.5 rounded-[5px] text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === "all"
                ? "bg-white text-black font-semibold shadow-xs"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <span>All</span>
            <span className="text-[10px] font-mono opacity-70">({TOOLS.length})</span>
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            const shortName = SHORT_CATEGORY_NAMES[cat.id] || cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-0.5 rounded-[5px] text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <span>{shortName}</span>
                <span className="text-[10px] font-mono opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="h-7 w-7 text-zinc-600 mx-auto" />
              <p className="text-sm font-medium text-white">
                No matching tools found for &quot;{query}&quot;
              </p>
              <p className="text-xs text-zinc-500">
                Try searching for &quot;merge&quot;, &quot;compress&quot;, &quot;split&quot;, or &quot;ocr&quot;
              </p>
            </div>
          ) : (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              const ToolIcon = ICON_MAP[tool.icon] || HelpCircle;
              const catObj = CATEGORIES.find((c) => c.id === tool.category);
              const catName = catObj?.name || tool.category;

              return (
                <div
                  key={tool.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onClick={() => handleSelect(tool)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between rounded-[8px] px-3 py-2.5 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white/[0.08] border border-white/20 shadow-xs"
                      : "border border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 mr-3">
                    {/* Tool Icon in clean elevated squircle */}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-[6px] border shrink-0 transition-colors ${
                        isSelected
                          ? "bg-white text-black border-white"
                          : "bg-white/[0.05] border-white/[0.08] text-white group-hover:bg-white/[0.1] group-hover:border-white/20"
                      }`}
                    >
                      <ToolIcon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium text-sm transition-colors ${
                            isSelected ? "text-white" : "text-zinc-200 group-hover:text-white"
                          }`}
                        >
                          {tool.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.2 rounded bg-white/[0.04] border border-white/[0.08]">
                          {catName}
                        </span>
                        {tool.popular && (
                          <span className="text-[10px] font-mono text-zinc-300 px-1.5 py-0.2 rounded bg-white/[0.08] border border-white/10">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5 max-w-[420px] sm:max-w-md">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Action Hint */}
                  <div className="shrink-0">
                    {isSelected ? (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-zinc-200 bg-white/[0.08] border border-white/15 px-2 py-0.5 rounded-[5px]">
                        <span>Open</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard Hints Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2.5 bg-[#0e0e10] text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded-[4px] border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                ↑
              </kbd>
              <kbd className="rounded-[4px] border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                ↓
              </kbd>
              <span className="text-[11px] text-zinc-400">Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded-[4px] border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                ↵
              </kbd>
              <span className="text-[11px] text-zinc-400">Open</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className="rounded-[4px] border border-white/10 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                ESC
              </kbd>
              <span className="text-[11px] text-zinc-400">Close</span>
            </span>
          </div>

          <span className="font-mono text-[11px] text-zinc-400">
            {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
          </span>
        </div>
      </div>
    </Dialog>
  );
}
