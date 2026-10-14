"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Shield, Command, Edit3, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <header className="sticky top-0 z-40 w-full border-b border-black/[0.08] bg-white/80 backdrop-blur-xl transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & macOS Window Dots */}
          <div className="flex items-center space-x-3">
            {/* macOS Window Traffic Light Dots */}
            <div className="hidden sm:flex items-center space-x-1.5 mr-1" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40 shadow-2xs" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e] border border-[#d89e24]/40 shadow-2xs" />
              <span className="h-3 w-3 rounded-full bg-[#28c840] border border-[#1aab29]/40 shadow-2xs" />
            </div>

            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-[#0071e3] to-[#0055b3] text-white font-black text-xs group-hover:opacity-90 transition-all shadow-xs">
                D
              </div>
              <span className="text-base font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors font-sans">
                DocEditPro
              </span>
            </Link>
            <div className="hidden lg:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-semibold">
              <Shield className="h-3 w-3" />
              <span>100% Client-Side</span>
            </div>
          </div>

          {/* Search Bar Pill & Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsCommandOpen(true)}
              aria-label="Open command palette to search tools (Ctrl+K or Cmd+K)"
              aria-haspopup="dialog"
              className="flex h-8 w-36 sm:w-52 md:w-64 items-center justify-between rounded-full border border-black/10 bg-black/[0.03] px-3 text-xs text-[#6e6e73] hover:border-[#0071e3]/50 hover:bg-white hover:shadow-xs transition-all cursor-pointer"
            >
              <span className="flex items-center space-x-2 truncate">
                <Search className="h-3.5 w-3.5 text-[#0071e3]" />
                <span className="truncate">Search 44 tools...</span>
              </span>
              <kbd className="hidden sm:inline-flex items-center space-x-0.5 rounded border border-black/10 bg-white px-1.5 py-0.5 font-mono text-[9px] text-[#86868b] shadow-2xs">
                <Command className="h-2.5 w-2.5" />
                <span>K</span>
              </kbd>
            </button>

            <nav className="flex items-center space-x-1 sm:space-x-1.5">
              <Link href="/pdf-editor">
                <Button
                  variant="primary"
                  size="sm"
                  className="h-8 text-xs flex items-center space-x-1.5 font-semibold rounded-full shadow-xs"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>PDF Editor</span>
                </Button>
              </Link>
              <button
                onClick={() => setIsRecentOpen(true)}
                title="Recent Files & History"
                aria-label="Open recent files history panel"
                aria-haspopup="dialog"
                className="hidden sm:flex items-center space-x-1 px-2.5 py-1 text-xs text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.05] rounded-full transition-colors cursor-pointer"
              >
                <Clock className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Recents</span>
              </button>
              <Link href="/guides" className="hidden md:inline-block">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-[#6e6e73] hover:text-[#1d1d1f] rounded-full">
                  Guides
                </Button>
              </Link>
              <Link href="/#all-tools" className="hidden md:inline-block">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-[#6e6e73] hover:text-[#1d1d1f] rounded-full">
                  All Tools
                </Button>
              </Link>
            </nav>
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
