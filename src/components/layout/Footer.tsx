"use client";

import * as React from "react";
import Link from "next/link";
import { CATEGORIES, TOOLS } from "@/lib/tools-data";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] pt-16 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8 space-y-12">
        {/* Category Tool Directory */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category) => {
            const categoryTools = TOOLS.filter((t) => t.category === category.id);
            return (
              <div key={category.id} className="space-y-3">
                <h4 className="text-[12px] font-mono font-medium text-[var(--foreground)] uppercase tracking-wider">
                  {category.name}
                </h4>
                <ul className="space-y-2 text-[13px]">
                  {categoryTools.map((tool) => (
                    <li key={tool.id}>
                      <Link
                        href={`/${tool.slug}`}
                        className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors line-clamp-1"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border)] text-[13px] font-mono">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[var(--foreground)] font-sans text-sm">
              DocEditPro
            </span>
            <span className="text-[var(--subtle-foreground)]">
              © {new Date().getFullYear()} · 100% Client-Side WebAssembly
            </span>
          </div>

          <div className="flex items-center gap-4 text-[var(--subtle-foreground)] text-xs">
            <span className="flex items-center gap-1.5 text-[var(--foreground)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              <span>All Systems Operational</span>
            </span>
            <span>·</span>
            <span>Zero Network Uploads</span>
            <span>·</span>
            <a href="#main-content" className="hover:text-[var(--foreground)] transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
