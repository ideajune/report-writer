"use client";

import React, { useState, useEffect } from "react";
import { ExhibitionReportDoc } from "@/types/report";
import { defaultReport, emptyReport } from "@/data/sampleReport";
import { quantumExpoReport } from "@/data/quantumReport";
import { aiFestaReport } from "@/data/aiFestaReport";
import { Header } from "@/components/Header";
import { Editor } from "@/components/Editor";
import { ReportPreview } from "@/components/ReportPreview";
import { ArchiveModal } from "@/components/ArchiveModal";

const STORAGE_KEY = "exhi_current_report_draft_v8";
const ACTIVE_DOC_KEY = "exhi_active_doc_id_v8";

export default function Home() {
  const [report, setReport] = useState<ExhibitionReportDoc>(quantumExpoReport);
  const [viewMode, setViewMode] = useState<"split" | "editor" | "preview">("split");
  const [lastSaved, setLastSaved] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState<boolean>(false);
  const [editorWidth, setEditorWidth] = useState<number>(520);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [includePhotos, setIncludePhotos] = useState<boolean>(true);

  // Initialize from LocalStorage or default to Quantum Expo Korea 2026 (15P) report
  useEffect(() => {
    setMounted(true);
    const activeDocId = localStorage.getItem(ACTIVE_DOC_KEY);
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedWidth = localStorage.getItem("exhi_split_editor_width");
    const savedPhotosPref = localStorage.getItem("exhi_include_photos_pref");

    if (savedPhotosPref !== null) {
      setIncludePhotos(savedPhotosPref === "true");
    }

    if (savedWidth) {
      const parsedWidth = parseInt(savedWidth, 10);
      if (!isNaN(parsedWidth) && parsedWidth >= 320) {
        setEditorWidth(parsedWidth);
      }
    }

    if (activeDocId && saved) {
      try {
        let parsed = JSON.parse(saved);
        if (parsed.id === quantumExpoReport.id) {
          // Always ensure the latest 20 companies and 7 trends (15 pages)
          parsed = quantumExpoReport;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(quantumExpoReport));
          localStorage.setItem(`exhi_doc_${quantumExpoReport.id}`, JSON.stringify(quantumExpoReport));
        }
        setReport(parsed);
        setLastSaved("방금");
        return;
      } catch (e) {
        console.error("Failed to load saved report draft", e);
      }
    }
    // Default to Quantum Expo Korea 2026 (15P) report on initial load
    setReport(quantumExpoReport);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quantumExpoReport));
    localStorage.setItem(ACTIVE_DOC_KEY, quantumExpoReport.id);
    setLastSaved("방금");
  }, []);

  // Split pane drag resizing logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const minWidth = 320;
      const maxWidth = Math.max(minWidth, window.innerWidth - 450);
      const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
      setEditorWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  // Save editor width preference on change
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("exhi_split_editor_width", editorWidth.toString());
    }
  }, [editorWidth, mounted]);

  // Autosave
  const handleReportChange = (updated: ExhibitionReportDoc) => {
    setReport(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(ACTIVE_DOC_KEY, updated.id);
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

  const handleLoadQuantum = () => {
    handleReportChange(quantumExpoReport);
  };

  const handleLoadAiSample = () => {
    handleReportChange(defaultReport);
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

  const handleToggleIncludePhotos = (val: boolean) => {
    setIncludePhotos(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("exhi_include_photos_pref", val.toString());
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
        onSelectReport={handleReportChange}
        currentReportId={report.id}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        lastSaved={lastSaved}
        includePhotos={includePhotos}
        onToggleIncludePhotos={handleToggleIncludePhotos}
      />

      {/* Main Workspace Area with Draggable Resizer */}
      <div className={`main-workspace view-${viewMode} ${isDragging ? "is-resizing" : ""}`}>
        <div
          className="editor-container-wrap"
          style={viewMode === "split" ? { width: `${editorWidth}px` } : undefined}
        >
          <Editor
            report={report}
            onChange={handleReportChange}
            includePhotos={includePhotos}
          />
        </div>

        {viewMode === "split" && (
          <div
            className="workspace-splitter"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDoubleClick={() => setEditorWidth(520)}
            title="마우스로 좌우 드래그하여 분할 비율 조절 (더블클릭 시 520px로 리셋)"
          >
            <div className="splitter-handle-bar" />
          </div>
        )}

        <div className="preview-container-wrap">
          <ReportPreview
            report={report}
            includePhotos={includePhotos}
            onToggleIncludePhotos={handleToggleIncludePhotos}
          />
        </div>
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
