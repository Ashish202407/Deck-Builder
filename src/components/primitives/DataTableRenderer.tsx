"use client";

import React from "react";

interface DataTableRendererProps {
  columns: string[];
  rows: (string | number)[][];
  highlightColumns?: number[];
  summaryRow?: (string | number)[];
  className?: string;
  compact?: boolean;
}

export default function DataTableRenderer({
  columns,
  rows,
  highlightColumns = [],
  summaryRow,
  className = "",
  compact = false,
}: DataTableRendererProps) {
  const cellPadding = compact ? "px-2.5 py-1" : "px-3 py-2";
  const fontSize = compact ? "9px" : "10px";

  return (
    <div className={`overflow-hidden rounded-sm ${className}`}>
      <table className="w-full border-collapse" style={{ fontSize }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`${cellPadding} text-left font-semibold`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: compact ? "8px" : "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  background: "var(--color-gold)",
                  color: "var(--color-navy-deep)",
                  borderBottom: "none",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                background:
                  rowIdx % 2 === 0
                    ? "var(--color-navy)"
                    : "rgba(21, 48, 61, 0.7)",
              }}
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={cellPadding}
                  style={{
                    color: highlightColumns.includes(cellIdx)
                      ? "var(--color-gold)"
                      : cellIdx === 0
                        ? "#ffffff"
                        : "var(--color-cream)",
                    fontWeight: highlightColumns.includes(cellIdx) || cellIdx === 0 ? 500 : 400,
                    fontFamily: "var(--font-sans)",
                    borderBottom: "1px solid rgba(197, 165, 90, 0.06)",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* Summary row — gold background like benchmark */}
        {summaryRow && (
          <tfoot>
            <tr
              style={{
                background: "var(--color-gold)",
                color: "var(--color-navy-deep)",
              }}
            >
              {summaryRow.map((cell, i) => (
                <td
                  key={i}
                  className={`${cellPadding} font-bold`}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: compact ? "9px" : "10px",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
