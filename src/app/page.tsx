"use client";

import React, { useState, useEffect } from "react";
import { ExhibitionReportDoc } from "@/types/report";
import { defaultReport, emptyReport } from "@/data/sampleReport";
import { Header } from "@/components/Header";
import { Editor } from "@/components/Editor";
import { ReportPreview } from "@/components/ReportPreview";
import { ArchiveModal } from "@/components/ArchiveModal";

const STORAGE_KEY = "exhi_current_report_draft_v2";

export default function Home() {
  const [report, setReport] = useState<ExhibitionReportDoc>(defaultReport);
  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">("split");
  const [lastSaved, setLastSaved] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);

  // Initialize from LocalStorage or default AI Summit Seoul sample
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReport(parsed);
        setLastSaved("방금");
      } catch (e) {
        console.error("Failed to load saved report draft", e);
      }
    }
  }, []);

  // Autosave
  const handleReportChange = (updated: ExhibitionReportDoc) => {
    setReport(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      const now = new Date();
      setLastSaved(
        `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewReport = () => {
    if (confirm("새 보고서를 작성하시겠습니까? (현재 작성 내용은 보관함에 저장해 두시길 권장합니다)")) {
      const freshDoc: ExhibitionReportDoc = {
        ...emptyReport,
        id: `report-${Date.now()}`,
        updatedAt: new Date().toISOString().split("T")[0],
      };
      handleReportChange(freshDoc);
    }
  };

  const handleLoadSample = () => {
    if (confirm("AI Summit Seoul 2026 14페이지 모범 레퍼런스 샘플을 다시 불러오시겠습니까?")) {
      handleReportChange(defaultReport);
    }
  };

  const handleExportJson = () => {
    const filename = `${(report.cover.title || "전시회_참관_결과_보고서").replace(
      /[^a-zA-Z0-9가-힣_-]/g,
      "_"
    )}.json`;
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          handleReportChange(parsed);
          alert("보고서 파일을 성공적으로 불러왔습니다!");
        } catch (err) {
          alert("올바른 보고서 JSON 파일 형식이 아닙니다.");
        }
      };
      reader.readAsText(file);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="app-container">
      {/* Top Header Controls */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onPrint={handlePrint}
        onNewReport={handleNewReport}
        onLoadSample={handleLoadSample}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        lastSaved={lastSaved}
      />

      {/* Main Workspace Area */}
      <div className={`main-workspace view-${viewMode}`}>
        <Editor report={report} onChange={handleReportChange} />
        <ReportPreview report={report} />
      </div>

      {/* Multi-report Archive Management Modal */}
      <ArchiveModal
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        currentReport={report}
        onSelectReport={handleReportChange}
        onNewBlank={handleNewReport}
      />
    </div>
  );
}
