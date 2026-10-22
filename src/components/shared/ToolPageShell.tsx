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
      <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-white selection:text-black font-sans">
        <Header />

        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <nav className="flex items-center space-x-1.5">
              <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-[var(--subtle-foreground)]" />
              <Link href={`/#${tool.category}`} className="hover:text-[var(--foreground)] transition-colors capitalize">
                {categoryInfo?.name || tool.category.replace("-", " ")}
              </Link>
              <ChevronRight className="h-3 w-3 text-[var(--subtle-foreground)]" />
              <span className="text-[var(--foreground)] font-medium">{tool.name}</span>
            </nav>

            <Link
              href="/#all-tools"
              className="inline-flex items-center space-x-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--border-hover)] px-3 py-1 rounded-[var(--radius-md)]"
            >
              <ArrowLeft className="h-3 w-3 mr-0.5 text-[var(--foreground)]" />
              <span>All 44 Tools</span>
            </Link>
          </div>

          {/* Tool Header Card */}
          <div className="p-6 sm:p-7 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-mono text-[var(--muted-foreground)] bg-white/[0.04] border border-[var(--border)]">
                  <span className="capitalize">{tool.category.replace("-", " ")}</span>
                </span>
                <span className="text-[11px] font-mono text-[var(--subtle-foreground)] hidden sm:inline">
                  /{tool.slug}
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 rounded-[var(--radius-sm)] border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-mono text-emerald-400">
                <Shield className="h-3 w-3" />
                <span>100% Client-Side Sandbox</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                {tool.name}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-2xl leading-relaxed">
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
