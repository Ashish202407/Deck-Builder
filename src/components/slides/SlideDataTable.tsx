"use client";

import React from "react";
import Slide from "../deck/Slide";
import SectionLabel from "../primitives/SectionLabel";
import DataTableRenderer from "../primitives/DataTableRenderer";
import StatCard from "../primitives/StatCard";
import { DataTableContent } from "@/lib/types";

interface SlideDataTableProps {
  content: DataTableContent;
  pageNumber?: number;
  brandName?: string;
}

export default function SlideDataTable({
  content,
  pageNumber,
  brandName,
}: SlideDataTableProps) {
  const hasSidebar =
    (content.sidebarStats && content.sidebarStats.length > 0) ||
    (content.sidebarBullets && content.sidebarBullets.length > 0);

  return (
    <Slide pageNumber={pageNumber} brandName={brandName}>
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h2 className="heading-lg mb-1">{content.title}</h2>
        {content.sectionLabel && (
          <SectionLabel className="mb-4">{content.sectionLabel}</SectionLabel>
        )}

        {/* Content */}
        <div className="flex-1 flex gap-8">
          {/* Table */}
          <div className={hasSidebar ? "flex-1" : "w-full"}>
            <DataTableRenderer
              columns={content.columns}
              rows={content.rows}
              highlightColumns={content.highlightColumns}
              compact={content.rows.length > 8}
            />
          </div>

          {/* Sidebar */}
          {hasSidebar && (
            <div className="w-64 flex-shrink-0 flex flex-col gap-4">
              {content.sidebarTitle && (
                <div className="heading-sm" style={{ color: "var(--color-gold)" }}>
                  {content.sidebarTitle}
                </div>
              )}

              {content.sidebarStats?.map((stat, i) => (
                <StatCard
                  key={i}
                  value={stat.value}
                  label={stat.label}
                  accentTop
                />
              ))}

              {content.sidebarBullets && content.sidebarBullets.length > 0 && (
                <ul className="space-y-2">
                  {content.sidebarBullets.map((bullet, i) => (
                    <li key={i} className="body-text-sm flex gap-2">
                      <span style={{ color: "var(--color-gold)" }}>&#8226;</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {content.footnote && (
          <div
            className="mt-3"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "8px",
              color: "var(--color-cream-dim)",
            }}
          >
            {content.footnote}
          </div>
        )}
      </div>
    </Slide>
  );
}
