"use client";

import React, { useRef, useState, useEffect } from "react";
import { ExhibitionReportDoc, ReportRevisionMeta } from "@/types/report";
import { defaultReport } from "@/data/sampleReport";
import { quantumExpoReport } from "@/data/quantumReport";
import { aiFestaReport } from "@/data/aiFestaReport";
import { hansangReport } from "@/data/hansangReport";
import { slwReport } from "@/data/slwReport";
import { ArchiveItemMeta } from "./ArchiveModal";
import { NewRevisionModal } from "./NewRevisionModal";
import {
  getRevisions,
  getRevisionSnapshot,
  deleteRevision,
  setActiveRevisionId,
  getActiveRevisionId,
} from "@/utils/revisionStorage";

interface HeaderProps {
  report: ExhibitionReportDoc;
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
  report,
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
  const revDropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRevDropdownOpen, setIsRevDropdownOpen] = useState(false);
  const [isNewRevModalOpen, setIsNewRevModalOpen] = useState(false);
  const [exhibitions, setExhibitions] = useState<ArchiveItemMeta[]>([]);
  const [revisions, setRevisions] = useState<ReportRevisionMeta[]>([]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (revDropdownRef.current && !revDropdownRef.current.contains(e.target as Node)) {
        setIsRevDropdownOpen(false);
      }
    };
    if (isDropdownOpen || isRevDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isRevDropdownOpen]);

  // Load revisions when report changes
  useEffect(() => {
    if (report && report.id) {
      const list = getRevisions(report.id, report);
      setRevisions(list);
    }
  }, [report, report?.id]);
  // Revision Handlers
  const handleSelectRevision = (rev: ReportRevisionMeta) => {
    setIsRevDropdownOpen(false);
    const snapDoc = getRevisionSnapshot(report.id, rev.revisionId);
    if (snapDoc) {
      setActiveRevisionId(report.id, rev.revisionId);
      onSelectReport(snapDoc);
    } else {
      alert("해당 차수의 스냅샷 데이터를 찾을 수 없습니다.");
    }
  };

  const handleDeleteRevision = (e: React.MouseEvent, rev: ReportRevisionMeta) => {
    e.stopPropagation();
    if (window.confirm(`[${rev.versionLabel}] 차수를 삭제하시겠습니까?`)) {
      const updatedList = deleteRevision(report.id, rev.revisionId);
      setRevisions(updatedList);
    }
  };

  const handleToggleCoverOption = (show: boolean) => {
    const currentRev = report.cover.revisionInfo || {
      versionNumber: 1,
      versionLabel: "1차",
      memoKeyword: "",
      showOnCover: false,
    };
    const updatedDoc: ExhibitionReportDoc = {
      ...report,
      cover: {
        ...report.cover,
        revisionInfo: {
          ...currentRev,
          showOnCover: show,
        },
      },
    };
    onSelectReport(updatedDoc);
  };

  const loadExhibitions = () => {
    try {
      const savedIndex = localStorage.getItem("exhi_reports_archive_index_v1");
      let list: ArchiveItemMeta[] = savedIndex ? JSON.parse(savedIndex) : [];

      if (!list.some((item) => item.id === slwReport.id)) {
        list.unshift({
          id: slwReport.id,
          title: "스마트라이프위크 2026",
          eventName: slwReport.ch01.eventName,
          dates: slwReport.cover.dateRange,
          savedAt: slwReport.updatedAt || "2026-10",
        });
      }
      if (!list.some((item) => item.id === hansangReport.id)) {
        list.push({
          id: hansangReport.id,
          title: "제24차 세계한상대회",
          eventName: hansangReport.ch01.eventName,
          dates: hansangReport.cover.dateRange,
          savedAt: hansangReport.updatedAt || "2026-10",
        });
      }
      if (!list.some((item) => item.id === aiFestaReport.id)) {
        list.push({
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
          id: slwReport.id,
          title: "스마트라이프위크 2026",
          eventName: slwReport.ch01.eventName,
          dates: slwReport.cover.dateRange,
          savedAt: "2026-10",
        },
        {
          id: hansangReport.id,
          title: "제24차 세계한상대회",
          eventName: hansangReport.ch01.eventName,
          dates: hansangReport.cover.dateRange,
          savedAt: "2026-10",
        },
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
    if (item.id === slwReport.id) {
      onSelectReport(slwReport);
      return;
    }
    if (item.id === hansangReport.id) {
      onSelectReport(hansangReport);
      return;
    }
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
    currentReportId === slwReport.id
      ? "스마트라이프위크 2026"
      : currentReportId === hansangReport.id
      ? "제24차 세계한상대회"
      : currentReportId === quantumExpoReport.id
      ? "국제양자산업대전 (15P)"
      : currentReportId === aiFestaReport.id
      ? "AI FESTA"
      : currentReportId === defaultReport.id
      ? "AI Summit"
      : "전시회 선택";

  const currentIcon =
    currentReportId === slwReport.id
      ? "🏙️"
      : currentReportId === hansangReport.id
      ? "🌐"
      : currentReportId === quantumExpoReport.id
      ? "⚛️"
      : currentReportId === aiFestaReport.id
      ? "🎪"
      : currentReportId === defaultReport.id
      ? "🤖"
      : "🏛️";

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

      {/* 통합 전시회 선택 드롭다운 (탭 + 우측 드롭다운 2개 버튼 통합) */}
      <div className="unified-exhibition-container" ref={dropdownRef}>
        <button
          type="button"
          className={`unified-exhibition-btn ${isDropdownOpen ? "open" : ""}`}
          onClick={handleToggleDropdown}
          title="클릭하여 다른 전시회 보고서로 전환하거나 새 보고서를 작성합니다"
        >
          <span className="unified-ex-icon">{currentIcon}</span>
          <span className="unified-ex-title">{currentTitle}</span>
          <span className="unified-ex-arrow">{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {isDropdownOpen && (
          <div className="exhibition-dropdown-menu" role="menu">
            <div className="dropdown-header-title">
              <span>전시회 보고서 목록 ({exhibitions.length})</span>
              <span style={{ fontSize: "0.7rem", color: "#38BDF8" }}>클릭 시 즉시 전환</span>
            </div>
            <div className="dropdown-list">
              {exhibitions.map((item) => {
                const isActive = item.id === currentReportId;
                const isHansang = item.id === hansangReport.id;
                const isFesta = item.id === aiFestaReport.id;
                const isQuantum = item.id === quantumExpoReport.id;
                const isAi = item.id === defaultReport.id;
                const icon = isHansang ? "🌐" : isFesta ? "🎪" : isQuantum ? "⚛️" : isAi ? "🤖" : "📋";

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
                          <span className="dropdown-active-badge">현재 열람중</span>
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

      {/* Revision Management Controls */}
      <div className="header-revision-group" ref={revDropdownRef}>
        <button
          type="button"
          className={`btn-header revision-btn ${isRevDropdownOpen ? "open" : ""}`}
          onClick={() => setIsRevDropdownOpen((prev) => !prev)}
          title="현재 전시회의 차수(버전) 목록 및 관리"
        >
          <span className="rev-icon">🔖</span>
          <span className="rev-label-text">
            {report.cover.revisionInfo?.versionLabel || "1차"}
            {report.cover.revisionInfo?.memoKeyword ? ` · ${report.cover.revisionInfo.memoKeyword}` : ""}
          </span>
          <span style={{ fontSize: "0.68rem", opacity: 0.85, marginLeft: "4px" }}>
            {isRevDropdownOpen ? "▲" : "▼"}
          </span>
        </button>

        <button
          type="button"
          className="btn-header rev-new-btn"
          onClick={() => setIsNewRevModalOpen(true)}
          title="현재 편집 상태를 새로운 차수(스냅샷)로 저장합니다"
        >
          <span>💾 새 차수 저장</span>
        </button>

        {isRevDropdownOpen && (
          <div className="revision-dropdown-menu" role="menu">
            <div className="dropdown-header-title">
              <span>보고서 차수 히스토리 ({revisions.length})</span>
              <button
                type="button"
                className="rev-inline-add-btn"
                onClick={() => {
                  setIsRevDropdownOpen(false);
                  setIsNewRevModalOpen(true);
                }}
              >
                + 새 차수 저장
              </button>
            </div>

            {/* 표지 출력 선택 토글 */}
            <div className="rev-cover-toggle-box">
              <label className="rev-toggle-label">
                <input
                  type="checkbox"
                  checked={report.cover.revisionInfo?.showOnCover === true}
                  onChange={(e) => handleToggleCoverOption(e.target.checked)}
                />
                <span>📄 표지에 차수/메모 인쇄 표시</span>
              </label>
            </div>

            <div className="revision-list">
              {revisions.map((rev) => {
                const isActive =
                  (report.cover.revisionInfo?.versionNumber === rev.versionNumber) ||
                  (getActiveRevisionId(report.id) === rev.revisionId);

                return (
                  <div
                    key={rev.revisionId}
                    className={`revision-item ${isActive ? "active" : ""}`}
                    onClick={() => handleSelectRevision(rev)}
                  >
                    <div className="rev-item-content">
                      <div className="rev-item-header">
                        <span className="rev-item-version">{rev.versionLabel}</span>
                        <span className="rev-item-date">{rev.savedAt}</span>
                        {isActive && <span className="rev-active-badge">현재 활성</span>}
                      </div>
                      <div className="rev-item-memo">
                        {rev.memoKeyword || "(메모 없음)"}
                      </div>
                    </div>
                    {revisions.length > 1 && (
                      <button
                        type="button"
                        className="rev-item-del-btn"
                        onClick={(e) => handleDeleteRevision(e, rev)}
                        title="이 차수 삭제"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
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

      {/* New Revision Save Modal */}
      <NewRevisionModal
        isOpen={isNewRevModalOpen}
        onClose={() => setIsNewRevModalOpen(false)}
        report={report}
        onSaved={onSelectReport}
      />
    </header>
  );
};
