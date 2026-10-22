"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  PenTool,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES, TOOLS } from "@/lib/tools-data";
import { ToolCard } from "@/components/home/ToolCard";
import RibbonGlow from "@/components/ui/ribbon-glow";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

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
            3. ALL 44 TOOLS CATALOG & SEARCH
            ========================================================================= */}
        <section id="all-tools" className="mx-auto max-w-[1200px] px-6 lg:px-8 space-y-6 pt-4">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                Tools Directory
              </h2>
              <p className="text-[13px] text-[var(--muted-foreground)] mt-1">
                44 client-side document utilities. Search or filter by category.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] focus-within:border-white/50 transition-colors">
                <Search className="h-4 w-4 text-[var(--subtle-foreground)] shrink-0" />
                <input
                  type="text"
                  placeholder="Filter 44 tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-[var(--foreground)] placeholder-[var(--subtle-foreground)] outline-none font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-[var(--subtle-foreground)] hover:text-[var(--foreground)] px-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`h-8 px-3.5 rounded-[6px] text-xs font-mono transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === "all"
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)]"
              }`}
            >
              <span>All</span>
              <span className="text-[11px] opacity-70">({TOOLS.length})</span>
            </button>

            {CATEGORIES.map((cat) => {
              const count = TOOLS.filter((t) => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`h-8 px-3.5 rounded-[6px] text-xs font-mono transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-xs"
                      : "bg-[var(--surface)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          {/* 44 Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* Empty Search State */}
          {filteredTools.length === 0 && (
            <div className="text-center py-16 space-y-3 rounded-[8px] bg-[var(--surface)] border border-[var(--border)] p-8">
              <Search className="h-6 w-6 text-[var(--subtle-foreground)] mx-auto" />
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                No tools matching &quot;{searchQuery}&quot;
              </h3>
              <p className="text-xs text-[var(--muted-foreground)]">
                Try searching for keywords like &quot;merge&quot;, &quot;compress&quot;, &quot;ocr&quot;, or &quot;encrypt&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-4 py-1.5 rounded-[6px] bg-white text-black text-xs font-semibold cursor-pointer hover:bg-[#ededed] transition-colors"
              >
                Reset Filters
              </button>
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
