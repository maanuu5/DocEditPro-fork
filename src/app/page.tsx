"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  PenTool,
  Sparkles,
  Edit3,
  Shield,
  ArrowLeftRight,
  Camera,
  Briefcase,
  LayoutGrid,
  List,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES, TOOLS } from "@/lib/tools-data";
import { ToolCard } from "@/components/home/ToolCard";
import RibbonGlow from "@/components/ui/ribbon-glow";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  essentials: Sparkles,
  "edit-organize": Edit3,
  "security-privacy": Shield,
  "convert-export": ArrowLeftRight,
  "scan-share": Camera,
  business: Briefcase,
};

const QUICK_TOOL_IDS = [
  "merge-pdf",
  "compress-pdf",
  "split-pdf",
  "edit-pdf-text",
  "word-to-pdf",
  "pdf-to-word",
  "ocr-pdf",
];

const QUICK_SEARCH_CHIPS = ["Merge", "Compress", "Word", "OCR", "Encrypt", "Sign"];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [viewMode, setViewMode] = React.useState<"grid" | "compact">("compact");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const quickTools = React.useMemo(() => {
    return QUICK_TOOL_IDS.map((id) => TOOLS.find((t) => t.id === id)).filter(
      Boolean
    ) as typeof TOOLS;
  }, []);

  const filteredTools = React.useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] font-sans antialiased selection:bg-white selection:text-black">
      <Header />

      <main className="flex-1 space-y-16 pb-24">
        {/* =========================================================================
            1. HERO — RibbonGlow WebGL2 background
            ========================================================================= */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: "640px" }}>
          {/* RibbonGlow fills the hero — trackPointer runs at window level so
              content overlaid above it still receives cursor events correctly */}
          <div className="absolute inset-0 opacity-75">
            <RibbonGlow
              background="#000000"
              color1="#e8864a"
              color2="#c0405a"
              speed={42}
              size={108}
              angle={-180}
              hover={110}
              reach={280}
              style={{ minWidth: 0, minHeight: 0, position: "absolute", inset: 0 }}
            />
            {/* Subtle center-radial dimming vignette to ensure text readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.1) 70%, transparent 100%)",
              }}
            />
            {/* Bottom gradient — ribbon fades into site background */}
            <div
              className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
            />
            {/* Top gradient — blends behind header */}
            <div
              className="absolute inset-x-0 top-0 h-28 pointer-events-none"
              style={{ background: "linear-gradient(to top, transparent, #000000)" }}
            />
          </div>

          {/* Hero content */}
          <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8 pt-24 pb-36 sm:pt-28 text-center">
            <div className="max-w-[760px] mx-auto space-y-6">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span>Runs entirely in browser</span>
                <span className="text-white/25">·</span>
                <span className="text-white font-medium">Zero server uploads</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
                Every PDF tool you need. <br />
                <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-normal">
                  Private, fast and entirely in your browser.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-[15px] sm:text-base text-zinc-300/80 leading-relaxed max-w-[65ch] mx-auto font-normal">
                DocEditPro provides 44 document utilities running locally via WebAssembly. Edit, merge, compress, convert and sign with zero file transfers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/pdf-editor"
                  className="h-11 px-6 rounded-[8px] bg-white hover:bg-zinc-200 text-black text-sm font-semibold inline-flex items-center gap-2 transition-colors shadow-sm"
                >
                  <PenTool className="h-4 w-4 text-black" />
                  <span>Launch PDF Editor</span>
                  <ArrowRight className="h-4 w-4 text-black" />
                </Link>
                <a
                  href="#all-tools"
                  className="h-11 px-5 rounded-[8px] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white text-sm font-medium inline-flex items-center gap-2 transition-all backdrop-blur-md"
                >
                  <span>Browse 44 Tools</span>
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================================
            3. ALL 44 TOOLS CATALOG & SEARCH (ORGANIZED UX)
            ========================================================================= */}
        <section id="all-tools" className="mx-auto max-w-[1200px] px-6 lg:px-8 space-y-10 pt-4">
          
          {/* A. QUICK-ACCESS ESSENTIALS (Hidden when searching to avoid distraction) */}
          {!searchQuery && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-white/70" />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
                    Daily Essentials · Top Workflows
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">
                  Fast client-side access
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {quickTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} variant="quick" />
                ))}
              </div>
            </div>
          )}

          {/* B. COMMAND & FILTER BAR */}
          <div className="space-y-4 pt-2 border-t border-[var(--border)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  All Document Utilities
                </h2>
                <p className="text-[13px] text-[var(--muted-foreground)] mt-0.5">
                  Explore 44 browser-native tools by workflow category or search instantly.
                </p>
              </div>

              {/* Search & View Mode Switcher */}
              <div className="flex items-center gap-2.5">
                {/* Search Input */}
                <div className="relative w-full md:w-72">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] focus-within:border-white/50 transition-colors">
                    <Search className="h-4 w-4 text-[var(--subtle-foreground)] shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search tools... (Press /)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-[var(--foreground)] placeholder-[var(--subtle-foreground)] outline-none font-mono"
                    />
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-xs text-[var(--subtle-foreground)] hover:text-[var(--foreground)] px-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    ) : (
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 bg-white/[0.04] border border-white/10 rounded">
                        /
                      </kbd>
                    )}
                  </div>
                </div>

                {/* View Mode Toggle (Grid vs Compact) */}
                <div className="flex items-center p-1 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                    className={`p-1.5 rounded-[6px] transition-colors cursor-pointer ${
                      viewMode === "grid"
                        ? "bg-white text-black shadow-xs"
                        : "text-[var(--muted-foreground)] hover:text-white"
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("compact")}
                    title="Compact List View"
                    className={`p-1.5 rounded-[6px] transition-colors cursor-pointer ${
                      viewMode === "compact"
                        ? "bg-white text-black shadow-xs"
                        : "text-[var(--muted-foreground)] hover:text-white"
                    }`}
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick search chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <span className="text-zinc-500 mr-1 text-[11px]">Quick search:</span>
              {QUICK_SEARCH_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setSearchQuery(chip)}
                  className={`px-2 py-0.5 rounded-full text-[11px] border transition-colors cursor-pointer ${
                    searchQuery.toLowerCase() === chip.toLowerCase()
                      ? "bg-white text-black border-white font-medium"
                      : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300"
                  }`}
                >
                  {chip}
                </button>
              ))}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[11px] text-zinc-400 hover:text-white underline ml-2 cursor-pointer"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Segmented Filter Control */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`h-8 px-2.5 sm:px-3 rounded-[6px] text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === "all"
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "bg-[#141416] text-zinc-300 hover:text-white hover:bg-[#1c1c20] border border-white/10 hover:border-white/20"
                }`}
              >
                <span>All</span>
                <span className="text-[11px] font-mono opacity-65">({TOOLS.length})</span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = TOOLS.filter((t) => t.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;
                const CatIcon = CATEGORY_ICONS[cat.id] || Sparkles;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-8 px-2.5 sm:px-3 rounded-[6px] text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-white text-black font-semibold shadow-xs"
                        : "bg-[#141416] text-zinc-300 hover:text-white hover:bg-[#1c1c20] border border-white/10 hover:border-white/20"
                    }`}
                  >
                    <CatIcon className="h-3.5 w-3.5 shrink-0" />
                    <span>{cat.name}</span>
                    <span className="text-[11px] font-mono opacity-65">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* C. SEARCH RESULTS (Active when searching) */}
          {searchQuery && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pb-2 border-b border-[var(--border)]">
                <span>
                  Found <strong className="text-white">{filteredTools.length}</strong> {filteredTools.length === 1 ? "tool" : "tools"} matching &ldquo;{searchQuery}&rdquo;
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-white underline cursor-pointer"
                >
                  Reset search
                </button>
              </div>

              {filteredTools.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                      : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5"
                  }
                >
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} variant={viewMode} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3 rounded-[10px] bg-[var(--surface)] border border-[var(--border)] p-8">
                  <Search className="h-6 w-6 text-[var(--subtle-foreground)] mx-auto" />
                  <h3 className="text-base font-semibold text-[var(--foreground)]">
                    No tools matching &ldquo;{searchQuery}&rdquo;
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Try keywords like &ldquo;merge&rdquo;, &ldquo;compress&rdquo;, &ldquo;ocr&rdquo;, or &ldquo;sign&rdquo;.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="px-4 py-1.5 rounded-[6px] bg-white text-black text-xs font-semibold cursor-pointer hover:bg-zinc-200 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* D. SINGLE CATEGORY VIEW (Active when a specific category is chosen, no search) */}
          {!searchQuery && selectedCategory !== "all" && (
            <div className="space-y-6">
              {(() => {
                const currentCat = CATEGORIES.find((c) => c.id === selectedCategory);
                if (!currentCat) return null;
                const CatIcon = CATEGORY_ICONS[currentCat.id] || Sparkles;
                const catTools = TOOLS.filter((t) => t.category === currentCat.id);

                return (
                  <>
                    <div className="p-4 sm:p-5 rounded-[10px] bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-[8px] bg-white/[0.08] flex items-center justify-center text-white border border-white/10 shrink-0">
                          <CatIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white flex items-center gap-2">
                            <span>{currentCat.name}</span>
                            <span className="text-xs font-mono text-zinc-400 bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/5">
                              {catTools.length} tools
                            </span>
                          </h3>
                          <p className="text-xs text-zinc-400 mt-0.5">{currentCat.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="text-xs font-mono text-zinc-300 hover:text-white px-3.5 py-1.5 rounded-[6px] bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-colors self-start sm:self-auto cursor-pointer"
                      >
                        ← View All Categories
                      </button>
                    </div>

                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                          : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5"
                      }
                    >
                      {catTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} variant={viewMode} />
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* E. STRUCTURED CATEGORIZED DIRECTORY (When in "all" view, no search) */}
          {!searchQuery && selectedCategory === "all" && (
            <div className="space-y-12">
              {CATEGORIES.map((cat) => {
                const catTools = TOOLS.filter((t) => t.category === cat.id);
                const CatIcon = CATEGORY_ICONS[cat.id] || Sparkles;

                return (
                  <section key={cat.id} className="space-y-4">
                    {/* Category Section Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-white/[0.06] text-white border border-white/10 shrink-0">
                          <CatIcon className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight flex items-center gap-2">
                            <span>{cat.name}</span>
                            <span className="text-[11px] font-mono font-normal text-zinc-400 bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/5">
                              {catTools.length}
                            </span>
                          </h3>
                        </div>
                        <span className="text-xs text-zinc-400 hidden md:inline-block ml-2 border-l border-white/10 pl-3">
                          {cat.description}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>Focus</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Tools in Category */}
                    <div
                      className={
                        viewMode === "grid"
                          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                          : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5"
                      }
                    >
                      {catTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} variant={viewMode} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

        </section>


        {/* =========================================================================
            5. DOCUMENTATION / GUIDES CALLOUT
            ========================================================================= */}
        <section className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[11px] font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
                Documentation
              </span>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Master Local Document Workflows
              </h3>
              <p className="text-[13px] text-[var(--muted-foreground)] max-w-xl">
                Read step-by-step guides on Bates numbering, offline OCR extraction, P2P encrypted file sharing, and direct PDF editing.
              </p>
            </div>

            <Link
              href="/guides"
              className="h-10 px-5 rounded-[8px] bg-white/[0.05] hover:bg-white/[0.1] border border-[var(--border)] hover:border-[var(--border-hover)] text-white text-xs font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <span>View All Guides</span>
              <ArrowRight className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
