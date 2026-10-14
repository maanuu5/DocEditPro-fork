"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Shield,
  Zap,
  Lock,
  Sparkles,
  ArrowRight,
  PenTool,
  Minimize2,
  Combine,
  ScanText,
  Share2,
  BookOpen,
  FileText,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES, TOOLS } from "@/lib/tools-data";
import { ToolCard } from "@/components/home/ToolCard";
import { Button } from "@/components/ui/button";

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
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#0071e3] selection:text-white font-sans">
      <Header />

      <main className="flex-1 space-y-16 pb-20">
        {/* 🍏 macOS Light Hero Section */}
        <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 text-center border-b border-black/[0.06]">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* macOS Callout Pill */}
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#0071e3]/20 bg-[#eff6ff] px-3.5 py-1 text-xs font-semibold text-[#0071e3] shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-[#0071e3] animate-pulse" />
              <span>macOS Light UI · 100% Client-Side Privacy</span>
              <span className="text-black/15">|</span>
              <span className="text-[#0071e3] font-medium">Zero Cloud Uploads</span>
            </div>

            {/* Document Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#1d1d1f] leading-[1.12]">
              Every PDF Tool You Need. <br />
              <span className="text-[#0071e3]">
                Private. Local. Document-Native.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm sm:text-base text-[#6e6e73] leading-relaxed">
              DocEditPro gives you 44 powerful PDF utilities with zero server file transfers. Edit text directly on real PDFs, compress files, convert formats, merge, and sign — entirely in your browser via WebAssembly.
            </p>

            {/* macOS Action Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link href="/pdf-editor">
                <Button variant="primary" size="lg" className="rounded-full px-6 font-semibold flex items-center space-x-2 shadow-xs shadow-[#0071e3]/25">
                  <PenTool className="h-4 w-4" />
                  <span>Launch PDF Editor</span>
                  <ArrowRight className="h-4 w-4 ml-0.5" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button variant="secondary" size="lg" className="rounded-full px-5 text-sm font-semibold">
                  <BookOpen className="h-4 w-4 mr-1.5 text-[#0071e3]" />
                  <span>How-To Guides</span>
                </Button>
              </Link>
            </div>

            {/* macOS Spotlight Search Bar */}
            <div className="mx-auto max-w-2xl pt-2">
              <div className="relative rounded-[16px] bg-white border border-black/10 p-1.5 shadow-[var(--shadow-mac-md)] hover:border-[#0071e3]/50 transition-all">
                <div className="flex items-center px-3">
                  <Search className="h-4.5 w-4.5 text-[#0071e3] shrink-0 mr-3" />
                  <input
                    type="text"
                    placeholder="Search tools (e.g. Edit Text, Compress, Merge, OCR, Word to PDF)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent py-2.5 text-xs sm:text-sm text-[#1d1d1f] placeholder-[#86868b] outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] px-2 py-1 rounded"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3 text-xs">
                <span className="text-[#86868b] text-[11px] mr-1">Quick Jump:</span>
                <Link
                  href="/pdf-editor"
                  className="px-3 py-1 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-[#0071e3] hover:bg-[#dbeafe] transition-colors font-medium text-[11px] shadow-2xs"
                >
                  ✏️ PDF Editor
                </Link>
                <Link
                  href="/compress-pdf"
                  className="px-3 py-1 rounded-full bg-white border border-black/10 text-[#6e6e73] hover:text-[#1d1d1f] hover:border-black/20 transition-colors text-[11px] shadow-2xs"
                >
                  📉 Compress PDF
                </Link>
                <Link
                  href="/merge-pdf"
                  className="px-3 py-1 rounded-full bg-white border border-black/10 text-[#6e6e73] hover:text-[#1d1d1f] hover:border-black/20 transition-colors text-[11px] shadow-2xs"
                >
                  🔀 Merge PDF
                </Link>
                <Link
                  href="/ocr-pdf"
                  className="px-3 py-1 rounded-full bg-white border border-black/10 text-[#6e6e73] hover:text-[#1d1d1f] hover:border-black/20 transition-colors text-[11px] shadow-2xs"
                >
                  🔍 OCR Scan
                </Link>
                <Link
                  href="/word-to-pdf"
                  className="px-3 py-1 rounded-full bg-white border border-black/10 text-[#6e6e73] hover:text-[#1d1d1f] hover:border-black/20 transition-colors text-[11px] shadow-2xs"
                >
                  📄 Word to PDF
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 🍱 macOS Bento Showcase Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#0071e3]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
                macOS Feature Modules
              </h2>
            </div>
            <span className="text-xs text-[#86868b] font-mono">APPLE MAC UI SPECIFICATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Bento Card 1: Interactive PDF Studio (macOS Window View) */}
            <div className="md:col-span-2 lg:col-span-2 p-6 sm:p-8 rounded-[20px] bg-gradient-to-br from-white via-white to-[#f5f8ff] border border-[#bfdbfe] flex flex-col justify-between group shadow-[var(--shadow-mac-md)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-[#0071e3] text-xs font-bold shadow-2xs">
                    <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
                    <span>Interactive Studio</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#0071e3]">
                    Direct Text Editing
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                    Edit Already-Written Text in Any PDF
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6e6e73] mt-1.5 leading-relaxed">
                    Click directly on existing text on any document page to rewrite sentences, fix typos, change font styles, and replace pictures without reformatting.
                  </p>
                </div>

                {/* Simulated Live Studio Document with macOS Traffic Lights */}
                <div className="mac-window border border-black/10 bg-[#f8f9fb] p-4 shadow-md">
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-black/[0.08] text-[11px] text-[#6e6e73]">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1.5" aria-hidden="true">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]/40" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] border border-[#d89e24]/40" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] border border-[#1aab29]/40" />
                      </div>
                      <span className="font-mono text-[#1d1d1f] font-medium ml-1.5">service_agreement_2026.pdf</span>
                    </div>
                    <span className="text-[10px] text-[#0071e3] font-mono font-semibold bg-[#eff6ff] px-2 py-0.5 rounded-full border border-[#bfdbfe]">
                      ✏️ Inline Editing Active
                    </span>
                  </div>

                  {/* Document Page Mockup */}
                  <div className="bg-white rounded-[10px] p-4 text-[#1d1d1f] text-xs space-y-2.5 shadow-sm border border-black/[0.06] font-sans select-none">
                    <div className="flex justify-between items-center text-[9px] text-[#86868b] border-b border-black/[0.06] pb-1 font-mono">
                      <span>DOCEDITPRO SECURE DOCUMENT</span>
                      <span>PAGE 1 OF 1</span>
                    </div>
                    <div className="font-bold text-sm text-[#1d1d1f]">
                      Master Consulting Agreement
                    </div>
                    <div className="text-[11px] text-[#48484a] leading-relaxed">
                      This Agreement is entered into by and between the client and provider.
                    </div>
                    <div className="p-2 rounded-[8px] bg-[#eff6ff] border-2 border-[#0071e3] text-[#0071e3] font-semibold text-xs flex items-center justify-between shadow-2xs">
                      <span>Effective Date: October 7, 2026</span>
                      <span className="text-[9px] bg-[#0071e3] text-white px-2 py-0.5 rounded-full font-mono font-medium">
                        Editable Box
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link href="/pdf-editor" className="inline-block w-full">
                  <Button variant="primary" size="lg" className="w-full font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 rounded-full shadow-xs">
                    <PenTool className="h-4 w-4" />
                    <span>Open PDF Editor Studio</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bento Card 2: 100% Client-Side Privacy Vault */}
            <div className="p-6 rounded-[20px] bg-white border border-black/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-[var(--shadow-mac-xs)] hover:shadow-[var(--shadow-mac-md)]">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-emerald-700 transition-colors">
                    Zero Server Storage
                  </h3>
                  <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed">
                    All document operations run locally in WebAssembly. No files ever leave your machine.
                  </p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#f5f5f7] border border-black/[0.05] space-y-2 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#6e6e73]">Network Traffic:</span>
                    <span className="text-emerald-600 font-mono font-bold">0 KB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6e6e73]">Local Security:</span>
                    <span className="text-[#1d1d1f] font-mono font-medium">Active Sandbox</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <Link href="/privacy-scanner" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center justify-between">
                  <span>Privacy Scanner</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 3: Compression Engine */}
            <div className="p-6 rounded-[20px] bg-white border border-black/[0.08] hover:border-[#0071e3]/40 transition-all flex flex-col justify-between group shadow-[var(--shadow-mac-xs)] hover:shadow-[var(--shadow-mac-md)]">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#eff6ff] text-[#0071e3] border border-[#bfdbfe] shadow-2xs">
                  <Minimize2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                    Smart Compression
                  </h3>
                  <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed">
                    Shrink massive PDF files for email attachments while preserving sharp typography.
                  </p>
                </div>

                <div className="p-3 rounded-[12px] bg-[#f5f5f7] border border-black/[0.05] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#6e6e73] uppercase font-semibold">Reduction</div>
                    <div className="text-2xl font-black text-[#0071e3] font-mono">-78%</div>
                  </div>
                  <div className="text-right text-[11px] font-mono text-[#86868b]">
                    <div>18.4MB ➔ 3.9MB</div>
                    <div className="text-emerald-700 font-medium text-[10px]">Lossless</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <Link href="/compress-pdf" className="text-xs font-semibold text-[#0071e3] hover:text-[#005bb5] flex items-center justify-between">
                  <span>Compress PDF</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 4: Searchable OCR */}
            <div className="p-6 rounded-[20px] bg-white border border-black/[0.08] hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-[var(--shadow-mac-xs)] hover:shadow-[var(--shadow-mac-md)]">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
                  <ScanText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-amber-800 transition-colors">
                    Searchable OCR
                  </h3>
                  <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed">
                    Turn physical paper scans and images into selectable digital text locally.
                  </p>
                </div>

                <div className="p-2.5 rounded-[12px] bg-[#fffbeb] border border-amber-200 text-[10px] font-mono text-amber-800 truncate font-semibold">
                  [EXTRACTED] INVOICE #9482 · $2,450
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <Link href="/ocr-pdf" className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center justify-between">
                  <span>OCR Scanner</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 5: Merge & Split */}
            <div className="p-6 rounded-[20px] bg-white border border-black/[0.08] hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-[var(--shadow-mac-xs)] hover:shadow-[var(--shadow-mac-md)]">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">
                  <Combine className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-purple-800 transition-colors">
                    Merge & Split
                  </h3>
                  <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed">
                    Drag, reorder, combine unlimited files, or burst documents into individual pages.
                  </p>
                </div>

                <div className="p-2.5 rounded-[12px] bg-[#f5f5f7] border border-black/[0.05] text-[11px] font-mono text-[#1d1d1f] font-medium">
                  Unlimited Documents
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <Link href="/merge-pdf" className="text-xs font-semibold text-purple-700 hover:text-purple-800 flex items-center justify-between">
                  <span>Merge Files</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento Card 6: P2P Share */}
            <div className="p-6 rounded-[20px] bg-white border border-black/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-[var(--shadow-mac-xs)] hover:shadow-[var(--shadow-mac-md)]">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-2xs">
                  <Share2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] group-hover:text-cyan-800 transition-colors">
                    P2P Transfer
                  </h3>
                  <p className="text-xs text-[#6e6e73] mt-1 leading-relaxed">
                    Direct browser-to-browser WebRTC encrypted file transfer with zero server relays.
                  </p>
                </div>

                <div className="p-2.5 rounded-[12px] bg-[#ecfeff] border border-cyan-200 text-[11px] font-mono text-cyan-800 font-semibold">
                  Encrypted WebRTC
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.05]">
                <Link href="/p2p-share" className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 flex items-center justify-between">
                  <span>P2P Transfer</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 🛠️ macOS Tool Directory */}
        <section id="all-tools" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#1d1d1f]">
                All 44 PDF Tools
              </h2>
              <p className="text-xs text-[#6e6e73] mt-0.5">
                Every tool runs 100% locally in your browser with zero server uploads.
              </p>
            </div>

            {/* macOS Segmented Control Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto p-1 bg-[#eef0f4] rounded-full border border-black/5 scrollbar-none shadow-2xs">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`h-7 px-3.5 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-white text-[#1d1d1f] shadow-xs"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                All ({TOOLS.length})
              </button>
              {CATEGORIES.map((cat) => {
                const count = TOOLS.filter((t) => t.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`h-7 px-3 text-xs font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-white text-[#1d1d1f] shadow-xs font-semibold"
                        : "text-[#6e6e73] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16 space-y-3 rounded-[20px] bg-white border border-black/10 p-8 shadow-[var(--shadow-mac-xs)]">
              <Search className="h-8 w-8 text-[#86868b] mx-auto" />
              <h3 className="text-lg font-bold text-[#1d1d1f]">No tools found matching &quot;{searchQuery}&quot;</h3>
              <p className="text-xs text-[#6e6e73]">
                Try searching for general keywords like &quot;merge&quot;, &quot;edit&quot;, &quot;convert&quot;, or &quot;security&quot;.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="rounded-full"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </section>

        {/* 📚 macOS Guides Banner */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-[20px] bg-white border border-black/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[var(--shadow-mac-sm)]">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#0071e3] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="h-4 w-4" />
                <span>How-To Guides & Tutorials</span>
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f]">
                Learn How to Edit, Convert, and Protect Documents
              </h3>
              <p className="text-xs text-[#6e6e73] max-w-xl leading-relaxed">
                Read step-by-step guides covering Bates numbering, offline Word conversions, permanent redaction, and direct PDF text replacement.
              </p>
            </div>

            <Link href="/guides">
              <Button variant="secondary" size="sm" className="whitespace-nowrap text-xs font-semibold px-5 h-9 rounded-full shadow-2xs">
                <span>View All How-To Guides</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 text-[#0071e3]" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
