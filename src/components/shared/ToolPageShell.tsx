"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Shield, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tool, CATEGORIES } from "@/lib/tools-data";
import { ToastProvider } from "@/components/ui/toast";

interface ToolPageShellProps {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolPageShell({ tool, children }: ToolPageShellProps) {
  const categoryInfo = CATEGORIES.find((c) => c.id === tool.category);

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#0071e3] selection:text-white font-sans">
        <Header />

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center justify-between text-xs text-[#6e6e73]">
            <nav className="flex items-center space-x-1.5">
              <Link href="/" className="hover:text-[#1d1d1f] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-[#86868b]" />
              <Link href={`/#${tool.category}`} className="hover:text-[#1d1d1f] transition-colors capitalize">
                {categoryInfo?.name || tool.category.replace("-", " ")}
              </Link>
              <ChevronRight className="h-3 w-3 text-[#86868b]" />
              <span className="text-[#1d1d1f] font-semibold">{tool.name}</span>
            </nav>

            <Link
              href="/#all-tools"
              className="inline-flex items-center space-x-1 text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-all bg-white border border-black/10 hover:border-black/20 px-3 py-1 rounded-full shadow-2xs"
            >
              <ArrowLeft className="h-3 w-3 mr-0.5 text-[#0071e3]" />
              <span>All 44 Tools</span>
            </Link>
          </div>

          {/* macOS Style Tool Window Header Card */}
          <div className="p-6 sm:p-7 rounded-[18px] bg-white border border-black/[0.08] shadow-[var(--shadow-mac-sm)] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/[0.05]">
              <div className="flex items-center space-x-2">
                {/* Traffic light window dots */}
                <div className="flex items-center space-x-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40 shadow-2xs" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]/40 shadow-2xs" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]/40 shadow-2xs" />
                </div>
                <span className="text-[11px] font-mono text-[#86868b] pl-2 hidden sm:inline">
                  {tool.slug}.app
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                <Shield className="h-3 w-3" />
                <span>100% Client-Side Sandbox</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
                {tool.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#6e6e73] max-w-2xl leading-relaxed">
                {tool.description}
              </p>
            </div>
          </div>

          {/* Tool Specific UI Content */}
          <div className="space-y-6">{children}</div>
        </main>

        <Footer />
      </div>
    </ToastProvider>
  );
}
