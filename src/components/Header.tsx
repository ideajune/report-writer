"use client";

import React, { useRef } from "react";

interface HeaderProps {
  viewMode: "split" | "editor" | "preview";
  setViewMode: (mode: "split" | "editor" | "preview") => void;
  onPrint: () => void;
  onNewReport: () => void;
  onLoadQuantum: () => void;
  onLoadAiSample: () => void;
  onOpenArchive: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lastSaved: string;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onPrint,
  onNewReport,
  onLoadQuantum,
  onLoadAiSample,
  onOpenArchive,
  onExportJson,
  onImportJson,
  lastSaved,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="brand-badge">REPORT WRITER</span>
        <h1>전시회 참관 결과 보고서</h1>
        {lastSaved && (
          <div className="save-pill" title="브라우저에 자동 저장됨">
            <span className="save-dot"></span>
            <span>{lastSaved} 자동저장</span>
          </div>
        )}
      </div>

      <div className="header-actions">
        {/* View Mode Toggle */}
        <div className="view-mode-toggle" role="group" aria-label="화면 뷰 모드">
          <button
            type="button"
            className={`mode-btn ${viewMode === "split" ? "active" : ""}`}
            onClick={() => setViewMode("split")}
            title="에디터와 미리보기를 나란히 확인"
          >
            분할 뷰
          </button>
          <button
            type="button"
            className={`mode-btn ${viewMode === "editor" ? "active" : ""}`}
            onClick={() => setViewMode("editor")}
            title="입력 에디터만 전체화면"
          >
            에디터만
          </button>
          <button
            type="button"
            className={`mode-btn ${viewMode === "preview" ? "active" : ""}`}
            onClick={() => setViewMode("preview")}
            title="보고서 미리보기만 전체화면"
          >
            미리보기만
          </button>
        </div>

        {/* Action Buttons */}
        <button
          type="button"
          className="btn-header"
          onClick={onOpenArchive}
          title="작성했던 여러 전시회 보고서 목록 보기"
        >
          📂 보관함
        </button>

        <button
          type="button"
          className="btn-header"
          onClick={onNewReport}
          title="새 전시회 작성을 위한 빈 양식으로 시작"
        >
          ✨ 새 보고서
        </button>

        <button
          type="button"
          className="btn-header"
          onClick={onLoadQuantum}
          title="국제양자산업대전 (QX KOREA 2026) 10페이지 보고서 불러오기"
        >
          ⚛️ 퀀텀엑스포 2026
        </button>

        <button
          type="button"
          className="btn-header"
          onClick={onLoadAiSample}
          title="AI Summit Seoul 2026 14페이지 모범 샘플 불러오기"
        >
          🤖 AI Summit 2026
        </button>

        <button
          type="button"
          className="btn-header"
          onClick={onExportJson}
          title="보고서 데이터를 JSON 파일로 PC에 백업"
        >
          💾 JSON 저장
        </button>

        <button
          type="button"
          className="btn-header"
          onClick={handleImportClick}
          title="저장해둔 JSON 보고서 파일 불러오기"
        >
          📂 JSON 열기
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".json,application/json"
          onChange={onImportJson}
        />

        {/* Primary Print / Save as PDF Button */}
        <button
          type="button"
          className="btn-header primary"
          onClick={onPrint}
          title="PDF 파일로 저장하거나 바로 인쇄"
        >
          🖨️ PDF 저장 / 인쇄
        </button>
      </div>
    </header>
  );
};
