"use client";

import * as React from "react";
import { UploadCloud, Link as LinkIcon, AlertCircle, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateFile } from "@/lib/pdf/file-validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string[];
  multiple?: boolean;
  maxFiles?: number;
  maxSizeMB?: number;
  label?: string;
  title?: string;
  helperText?: string;
  description?: string;
}

export function FileDropzone({
  onFilesSelected,
  accept = ['.pdf'],
  multiple,
  maxFiles,
  maxSizeMB = 200,
  label,
  title,
  helperText,
  description,
}: FileDropzoneProps) {
  const isMultiple = multiple ?? (maxFiles !== undefined ? maxFiles > 1 : false);
  const resolvedLabel = label ?? title ?? "Drag & drop files here, or click to browse";
  const resolvedHelperText = helperText ?? description ?? `Supports files up to ${maxSizeMB}MB. Processed 100% locally in your browser.`;
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [isLoadingUrl, setIsLoadingUrl] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const processFiles = React.useCallback(
    (fileList: FileList | File[]) => {
      setErrorMessage(null);
      const filesArray = Array.from(fileList);
      const validFiles: File[] = [];

      for (const file of filesArray) {
        const validation = validateFile(file, accept, maxSizeMB);
        if (!validation.valid) {
          setErrorMessage(validation.error || 'Invalid file.');
          return;
        }
        validFiles.push(file);
      }

      if (validFiles.length > 0) {
        onFilesSelected(isMultiple ? validFiles : [validFiles[0]]);
      }
    },
    [accept, maxSizeMB, isMultiple, onFilesSelected]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  React.useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        processFiles(e.clipboardData.files);
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [processFiles]);

  const handleUrlFetch = async () => {
    if (!url.trim()) return;
    setIsLoadingUrl(true);
    setErrorMessage(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const filename = url.split("/").pop()?.split("?")[0] || "downloaded-file.pdf";
      const file = new File([blob], filename, { type: blob.type || "application/pdf" });
      processFiles([file]);
      setShowUrlInput(false);
      setUrl("");
    } catch (err: unknown) {
      setErrorMessage(`Failed to fetch file from URL (${(err as Error).message || err}).`);
    } finally {
      setIsLoadingUrl(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-[18px] border-2 border-dashed p-10 sm:p-12 text-center transition-all duration-200 cursor-pointer select-none",
          isDragActive
            ? "border-[#0071e3] bg-[#0071e3]/5 ring-4 ring-[#0071e3]/10 scale-[1.005]"
            : "border-black/15 bg-white hover:border-[#0071e3]/60 hover:bg-[#f0f6ff]/30 shadow-[var(--shadow-mac-xs)] hover:shadow-[var(--shadow-mac-sm)]",
          errorMessage && "border-rose-400 bg-rose-50/50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept.join(",")}
          multiple={isMultiple}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[#eff6ff] border border-[#bfdbfe] text-[#0071e3] mb-4 shadow-2xs group-hover:scale-105 transition-transform">
          <UploadCloud className="h-7 w-7 stroke-[1.8]" />
        </div>

        <h3 className="text-base font-bold text-[#1d1d1f] mb-1">
          {resolvedLabel}
        </h3>
        <p className="text-xs text-[#6e6e73] max-w-md leading-relaxed mb-4">
          {resolvedHelperText}
        </p>

        {/* Accepted Formats Chips */}
        <div className="flex items-center space-x-1.5 mb-4">
          {accept.slice(0, 4).map((ext) => (
            <span
              key={ext}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-[#f0f0f4] border border-black/5 text-[#6e6e73] uppercase"
            >
              {ext.replace(".", "")}
            </span>
          ))}
        </div>

        {/* Shortcut Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#86868b]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] px-3 py-1 border border-black/10 text-[11px] font-medium text-[#6e6e73] shadow-2xs">
            <FileText className="h-3 w-3 text-[#0071e3]" />
            Paste from Clipboard (⌘V / Ctrl+V)
          </span>
          <span>or</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowUrlInput(!showUrlInput);
            }}
            className="h-7 text-xs rounded-full px-3 text-[#0071e3] hover:text-[#005bb5] hover:bg-[#eff6ff]"
          >
            <LinkIcon className="h-3 w-3 mr-1" />
            Add from URL
          </Button>
        </div>
      </div>

      {/* URL Input Dropdown */}
      {showUrlInput && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center space-x-2 rounded-[14px] border border-black/10 bg-white p-3 shadow-lg"
        >
          <Input
            type="url"
            placeholder="Paste public file URL (e.g. https://example.com/document.pdf)..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 text-xs h-8 bg-[#f5f5f7] border-black/10"
          />
          <Button
            variant="primary"
            size="sm"
            onClick={handleUrlFetch}
            disabled={isLoadingUrl || !url.trim()}
            className="h-8 text-xs rounded-full"
          >
            {isLoadingUrl ? "Fetching..." : "Fetch File"}
          </Button>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="flex items-center space-x-2 rounded-[10px] border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
