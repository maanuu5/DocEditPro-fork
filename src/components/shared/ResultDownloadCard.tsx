"use client";

import * as React from "react";
import { Download, RefreshCw, CheckCircle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";

interface ResultDownloadCardProps {
  filename: string;
  blob: Blob | Uint8Array;
  originalSize?: number;
  resultSize?: number;
  onReset: () => void;
  actionTitle?: string;
}

export function ResultDownloadCard({
  filename,
  blob,
  originalSize,
  resultSize,
  onReset,
  actionTitle = "Your document is ready!",
}: ResultDownloadCardProps) {
  const actualResultSize =
    resultSize ||
    (blob instanceof Blob ? blob.size : blob.length);

  const handleDownload = () => {
    let dataBlob: Blob;
    if (blob instanceof Blob) {
      dataBlob = blob;
    } else {
      const arrayBuffer = blob.buffer.slice(blob.byteOffset, blob.byteOffset + blob.byteLength) as ArrayBuffer;
      dataBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
    }

    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const savingsPercent = originalSize && actualResultSize && originalSize > actualResultSize
    ? Math.round(((originalSize - actualResultSize) / originalSize) * 100)
    : null;

  return (
    <Card className="w-full border border-emerald-200/90 bg-emerald-50/50 p-6 space-y-6 rounded-[18px] shadow-[var(--shadow-mac-sm)]">
      <div className="flex items-start justify-between border-b border-emerald-200/60 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-2xs">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#1d1d1f]">
              {actionTitle}
            </h3>
            <p className="text-xs text-[#6e6e73]">
              Processed 100% locally in your browser
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset} className="rounded-full text-[#6e6e73] hover:text-[#1d1d1f]">
          <RefreshCw className="h-3.5 w-3.5 mr-1 text-[#0071e3]" />
          Start Over
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[14px] border border-black/10 bg-white p-4 shadow-xs">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff6ff] text-[#0071e3] shrink-0 border border-[#bfdbfe]">
            <FileCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0 truncate">
            <p className="font-mono text-sm font-semibold text-[#1d1d1f] truncate">
              {filename}
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#6e6e73] mt-0.5">
              <span>{formatBytes(actualResultSize)}</span>
              {savingsPercent !== null && (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                  {savingsPercent}% smaller
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Button variant="primary" size="lg" onClick={handleDownload} className="w-full sm:w-auto rounded-full font-semibold shadow-xs">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </Card>
  );
}
