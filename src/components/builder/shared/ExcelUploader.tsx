"use client";

import React, { useCallback, useRef, useState } from "react";

interface ExcelUploaderProps {
  onParsed: (file: File) => void;
  onDownloadTemplate: () => void;
  templateName: string;
  error?: string | null;
}

export default function ExcelUploader({
  onParsed,
  onDownloadTemplate,
  templateName,
  error,
}: ExcelUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setFileName(file.name);
      onParsed(file);
    },
    [onParsed]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="space-y-3">
      {/* Download template button */}
      <button
        onClick={onDownloadTemplate}
        className="text-xs font-medium px-3 py-1.5 rounded transition-colors"
        style={{
          color: "var(--color-gold)",
          background: "rgba(197, 165, 90, 0.08)",
          border: "1px solid rgba(197, 165, 90, 0.2)",
          fontFamily: "var(--font-sans)",
        }}
      >
        Download {templateName} Template
      </button>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-lg p-6 text-center transition-all duration-200"
        style={{
          background: dragOver
            ? "rgba(197, 165, 90, 0.08)"
            : "var(--color-navy-card)",
          border: dragOver
            ? "2px dashed var(--color-gold)"
            : "2px dashed rgba(197, 165, 90, 0.15)",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {fileName ? (
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--color-gold)",
                fontWeight: 500,
              }}
            >
              {fileName}
            </div>
            <div
              className="mt-1"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                color: "var(--color-cream-dim)",
              }}
            >
              Click or drag to replace
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--color-cream)",
              }}
            >
              Drop your Excel file here or click to upload
            </div>
            <div
              className="mt-1"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                color: "var(--color-cream-dim)",
              }}
            >
              Supports .xlsx, .xls, .csv
            </div>
          </div>
        )}
      </div>

      {error && (
        <div
          className="text-xs px-3 py-2 rounded"
          style={{
            background: "rgba(220, 50, 50, 0.1)",
            color: "#ef4444",
            fontFamily: "var(--font-sans)",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
