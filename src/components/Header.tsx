"use client";

import React, { useRef, useState, useEffect } from "react";
import { ExhibitionReportDoc } from "@/types/report";
import { defaultReport } from "@/data/sampleReport";
import { quantumExpoReport } from "@/data/quantumReport";
import { aiFestaReport } from "@/data/aiFestaReport";
import { ArchiveItemMeta } from "./ArchiveModal";

interface HeaderProps {
  viewMode: "split" | "editor" | "preview";
  setViewMode: (mode: "split" | "editor" | "preview") => void;
  onPrint: () => void;
  onNewReport: () => void;
  onSelectReport: (report: ExhibitionReportDoc) => void;
  currentReportId?: string;
  onOpenArchive: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lastSaved: string;
  includePhotos?: boolean;
  onToggleIncludePhotos?: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onPrint,
  onNewReport,
  onSelectReport,
  currentReportId,
  onOpenArchive,
  onExportJson,
  onImportJson,
  lastSaved,
  includePhotos = true,
  onToggleIncludePhotos,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [exhibitions, setExhibitions] = useState<ArchiveItemMeta[]>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const loadExhibitions = () => {
    try {
      const savedIndex = localStorage.getItem("exhi_reports_archive_index_v1");
      let list: ArchiveItemMeta[] = savedIndex ? JSON.parse(savedIndex) : [];

      if (!list.some((item) => item.id === aiFestaReport.id)) {
        list.unshift({
          id: aiFestaReport.id,
          title: "인공지능 페스타 2026",
          eventName: aiFestaReport.ch01.eventName,
          dates: aiFestaReport.cover.dateRange,
          savedAt: aiFestaReport.updatedAt || "2026-09",
        });
      }
      if (!list.some((item) => item.id === quantumExpoReport.id)) {
        list.push({
          id: quantumExpoReport.id,
          title: "국제양자산업대전 (15P)",
          eventName: quantumExpoReport.ch01.eventName,
          dates: quantumExpoReport.cover.dateRange,
          savedAt: quantumExpoReport.updatedAt || "2026-09",
        });
      }
      if (!list.some((item) => item.id === defaultReport.id)) {
        list.push({
          id: defaultReport.id,
          title: "AI Summit 2026",
          eventName: defaultReport.ch01.eventName,
          dates: defaultReport.cover.dateRange,
          savedAt: defaultReport.updatedAt || "2026-09",
        });
      }
      setExhibitions(list);
    } catch {
      setExhibitions([
        {
          id: aiFestaReport.id,
          title: "인공지능 페스타 2026",
          eventName: aiFestaReport.ch01.eventName,
          dates: aiFestaReport.cover.dateRange,
          savedAt: "2026-09",
        },
        {
          id: quantumExpoReport.id,
          title: "퀀텀엑스포 2026",
          eventName: quantumExpoReport.ch01.eventName,
          dates: quantumExpoReport.cover.dateRange,
          savedAt: "2026-09",
        },
        {
          id: defaultReport.id,
          title: "AI Summit 2026",
          eventName: defaultReport.ch01.eventName,
          dates: defaultReport.cover.dateRange,
          savedAt: "2026-09",
        },
      ]);
    }
  };

  const handleToggleDropdown = () => {
    if (!isDropdownOpen) {
      loadExhibitions();
    }
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelect = (item: ArchiveItemMeta) => {
    setIsDropdownOpen(false);
    if (item.id === aiFestaReport.id) {
      onSelectReport(aiFestaReport);
      return;
    }
    if (item.id === quantumExpoReport.id) {
      onSelectReport(quantumExpoReport);
      return;
    }
    if (item.id === defaultReport.id) {
      onSelectReport(defaultReport);
      return;
    }
    const docStr = localStorage.getItem(`exhi_doc_${item.id}`);
    if (docStr) {
      try {
        const parsed = JSON.parse(docStr);
        onSelectReport(parsed);
        return;
      } catch (e) {
        console.error("보고서 파싱 실패", e);
      }
    }
    alert("해당 보고서 데이터를 찾을 수 없습니다.");
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const currentTitle =
    currentReportId === quantumExpoReport.id
      ? "국제양자산업대전 (15P)"
      : currentReportId === aiFestaReport.id
      ? "AI FESTA"
      : currentReportId === defaultReport.id
      ? "AI Summit"
      : "전시회 선택";

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

      {/* Quick Exhibition Switcher Tabs */}
      <div className="quick-exhibition-tabs">
        <button
          type="button"
          className={`quick-tab-btn ${currentReportId === quantumExpoReport.id ? "active" : ""}`}
          onClick={() => onSelectReport(quantumExpoReport)}
          title="국제양자산업대전 2026 (20개사 & 4페이지 트렌드, 총 15페이지)"
        >
          ⚛️ 국제양자산업대전 (15P)
        </button>
        <button
          type="button"
          className={`quick-tab-btn ${currentReportId === aiFestaReport.id ? "active" : ""}`}
          onClick={() => onSelectReport(aiFestaReport)}
          title="인공지능 페스타 2026"
        >
          🎪 AI FESTA
        </button>
        <button
          type="button"
          className={`quick-tab-btn ${currentReportId === defaultReport.id ? "active" : ""}`}
          onClick={() => onSelectReport(defaultReport)}
          title="AI Summit Seoul 2026"
        >
          🤖 AI Summit
        </button>
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

        {/* Photo Display Mode Toggle (방안 1: 사진 포함 / 사진 제외 텍스트 전용) */}
        {onToggleIncludePhotos && (
          <div className="photo-mode-toggle" role="group" aria-label="사진 표시 모드">
            <button
              type="button"
              className={`photo-mode-btn ${includePhotos ? "active" : ""}`}
              onClick={() => onToggleIncludePhotos(true)}
              title="현장 스케치 사진 및 관련 소제목이 모두 포함된 일반 버전"
            >
              📸 사진 포함
            </button>
            <button
              type="button"
              className={`photo-mode-btn ${!includePhotos ? "active" : ""}`}
              onClick={() => onToggleIncludePhotos(false)}
              title="사진과 사진 바로 위 소제목을 제외한 텍스트 전용 버전 (A4 페이지 절약 / 텍스트 중심 인쇄)"
            >
              📝 사진 제외 (텍스트판)
            </button>
          </div>
        )}

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

        {/* 누적 전시회 선택 드롭다운 버튼 */}
        <div className="exhibition-dropdown-container" ref={dropdownRef}>
          <button
            type="button"
            className={`btn-header exhibition-dropdown-btn ${isDropdownOpen ? "open" : ""}`}
            onClick={handleToggleDropdown}
            title="누적된 전시회 목록에서 열람 및 편집할 보고서를 선택합니다"
          >
            <span>🏛️ {currentTitle}</span>
            <span style={{ fontSize: "0.68rem", opacity: 0.85, marginLeft: "2px" }}>
              {isDropdownOpen ? "▲" : "▼"}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="exhibition-dropdown-menu" role="menu">
              <div className="dropdown-header-title">
                <span>누적 전시회 목록 ({exhibitions.length})</span>
                <span style={{ fontSize: "0.7rem", color: "#38BDF8" }}>클릭 시 즉시 전환</span>
              </div>
              <div className="dropdown-list">
                {exhibitions.map((item) => {
                  const isActive = item.id === currentReportId;
                  const isFesta = item.id === aiFestaReport.id;
                  const isQuantum = item.id === quantumExpoReport.id;
                  const isAi = item.id === defaultReport.id;
                  const icon = isFesta ? "🎪" : isQuantum ? "⚛️" : isAi ? "🤖" : "📋";

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`dropdown-item ${isActive ? "active" : ""}`}
                      onClick={() => handleSelect(item)}
                    >
                      <div className="dropdown-item-info">
                        <div className="dropdown-item-title">
                          <span style={{ marginRight: "6px" }}>{icon}</span>
                          <span>{item.title}</span>
                          {isActive && (
                            <span className="dropdown-active-badge">현재</span>
                          )}
                        </div>
                        <div className="dropdown-item-sub">
                          {item.eventName ? `${item.eventName} · ` : ""}{item.dates}
                        </div>
                      </div>
                      {isActive && <span style={{ color: "#38BDF8", fontWeight: 700 }}>✓</span>}
                    </button>
                  );
                })}
              </div>

              <div className="dropdown-divider"></div>

              <button
                type="button"
                className="dropdown-footer-btn"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNewReport();
                }}
              >
                <span>✨ 새 전시회 보고서 작성</span>
              </button>
              <button
                type="button"
                className="dropdown-footer-btn"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onOpenArchive();
                }}
              >
                <span>📂 보관함 전체 관리...</span>
              </button>
            </div>
          )}
        </div>

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
          title={
            includePhotos
              ? "사진이 포함된 보고서로 인쇄/PDF 저장"
              : "사진 및 사진 소제목이 제외된 텍스트 전용 보고서로 인쇄/PDF 저장"
          }
        >
          <span>🖨️ PDF 저장 / 인쇄</span>
          {!includePhotos && <span className="btn-mini-tag">텍스트판</span>}
        </button>
      </div>
    </header>
  );
};
