"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Command, Clock, ArrowRight } from "lucide-react";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { RecentFilesModal } from "@/components/shared/RecentFilesModal";

export function Header() {
  const [isCommandOpen, setIsCommandOpen] = React.useState(false);
  const [isRecentOpen, setIsRecentOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 border-b border-[var(--border)] bg-black/80 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-8">
          {/* Typographic Wordmark & Privacy Badge */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="font-semibold text-[17px] tracking-tight text-[var(--foreground)] group-hover:text-white transition-colors">
                DocEditPro
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[6px] text-[11px] font-mono text-[var(--muted-foreground)] bg-white/[0.04] border border-[var(--border)]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span>100% Client-Side</span>
            </span>
          </div>

          {/* Navigation Links & Search */}
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden md:flex items-center gap-6 text-[14px]">
              <a
                href="/#all-tools"
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Tools
              </a>
              <Link
                href="/pdf-editor"
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                PDF Editor
              </Link>
              <Link
                href="/privacy-scanner"
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Security
              </Link>
              <Link
                href="/guides"
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                Guides
              </Link>
            </nav>

            <span className="hidden md:block h-4 w-px bg-[var(--border)]" />

            {/* Recents Button */}
            <button
              onClick={() => setIsRecentOpen(true)}
              title="Recent files history"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-colors cursor-pointer"
            >
              <Clock className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              <span className="hidden sm:inline">Recents</span>
            </button>

            {/* ⌘K Search Pill */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="flex h-9 items-center gap-3 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 text-xs text-[var(--muted-foreground)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-[var(--subtle-foreground)]" />
                <span className="hidden sm:inline">Search tools...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-[4px] border border-[var(--border)] bg-black px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted-foreground)]">
                <Command className="h-2.5 w-2.5" />
                <span>K</span>
              </kbd>
            </button>
          </div>
        </div>
      </header>

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      <RecentFilesModal
        isOpen={isRecentOpen}
        onClose={() => setIsRecentOpen(false)}
      />
    </>
  );
}
