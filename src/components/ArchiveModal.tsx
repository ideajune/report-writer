"use client";

import React, { useState, useEffect } from "react";
import { ExhibitionReportDoc } from "@/types/report";
import { defaultReport } from "@/data/sampleReport";
import { quantumExpoReport } from "@/data/quantumReport";
import { aiFestaReport } from "@/data/aiFestaReport";
import { hansangReport } from "@/data/hansangReport";
import { slwReport } from "@/data/slwReport";
import { kesReport } from "@/data/kesReport";
import { kecoReport } from "@/data/kecoReport";
import { sedexReport } from "@/data/sedexReport";
import {
  getRevisions,
  deleteRevision,
  getRevisionSnapshot,
  setActiveRevisionId,
  getActiveRevisionId,
} from "@/utils/revisionStorage";
import { ReportRevisionMeta } from "@/types/report";

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReport: ExhibitionReportDoc;
  onSelectReport: (report: ExhibitionReportDoc) => void;
  onNewBlank: () => void;
}

export interface ArchiveItemMeta {
  id: string;
  title: string;
  eventName: string;
  dates: string;
  savedAt: string;
}

const ARCHIVE_INDEX_KEY = "exhi_reports_archive_index_v1";

export const ArchiveModal: React.FC<ArchiveModalProps> = ({
  isOpen,
  onClose,
  currentReport,
  onSelectReport,
  onNewBlank,
}) => {
  const [archiveList, setArchiveList] = useState<ArchiveItemMeta[]>([]);
  const [expandedDocIds, setExpandedDocIds] = useState<Record<string, boolean>>({});
  const [, setRevTrigger] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadArchiveList();
    }
  }, [isOpen]);

  const loadArchiveList = () => {
    try {
      // Always sync preset reports with latest data definitions
      localStorage.setItem(`exhi_doc_${sedexReport.id}`, JSON.stringify(sedexReport));
      localStorage.setItem(`exhi_doc_${kecoReport.id}`, JSON.stringify(kecoReport));
      localStorage.setItem(`exhi_doc_${kesReport.id}`, JSON.stringify(kesReport));
      localStorage.setItem(`exhi_doc_${slwReport.id}`, JSON.stringify(slwReport));
      localStorage.setItem(`exhi_doc_${hansangReport.id}`, JSON.stringify(hansangReport));
      localStorage.setItem(`exhi_doc_${aiFestaReport.id}`, JSON.stringify(aiFestaReport));
      localStorage.setItem(`exhi_doc_${quantumExpoReport.id}`, JSON.stringify(quantumExpoReport));
      localStorage.setItem(`exhi_doc_${defaultReport.id}`, JSON.stringify(defaultReport));

      const savedIndex = localStorage.getItem(ARCHIVE_INDEX_KEY);
      let list: ArchiveItemMeta[] = savedIndex ? JSON.parse(savedIndex) : [];

      // Ensure SEDEX 2026 Report is registered at top
      if (!list.some((item) => item.id === sedexReport.id)) {
        list.unshift({
          id: sedexReport.id,
          title: sedexReport.cover.title,
          eventName: sedexReport.ch01.eventName,
          dates: sedexReport.cover.dateRange,
          savedAt: sedexReport.updatedAt || "2026-10-19",
        });
      }

      // Ensure KES 2026 Report is registered
      if (!list.some((item) => item.id === kesReport.id)) {
        list.unshift({
          id: kesReport.id,
          title: kesReport.cover.title,
          eventName: kesReport.ch01.eventName,
          dates: kesReport.cover.dateRange,
          savedAt: kesReport.updatedAt || "2026-10-17",
        });
      }

      // Ensure KECO 2026 Report is registered
      if (!list.some((item) => item.id === kecoReport.id)) {
        list.push({
          id: kecoReport.id,
          title: kecoReport.cover.title,
          eventName: kecoReport.ch01.eventName,
          dates: kecoReport.cover.dateRange,
          savedAt: kecoReport.updatedAt || "2026-10-21",
        });
      }

      // Ensure SLW Report is registered
      if (!list.some((item) => item.id === slwReport.id)) {
        list.push({
          id: slwReport.id,
          title: slwReport.cover.title,
          eventName: slwReport.ch01.eventName,
          dates: slwReport.cover.dateRange,
          savedAt: slwReport.updatedAt || "2026-10-07",
        });
      }

      // Ensure Hansang Report is registered
      if (!list.some((item) => item.id === hansangReport.id)) {
        list.push({
          id: hansangReport.id,
          title: hansangReport.cover.title,
          eventName: hansangReport.ch01.eventName,
          dates: hansangReport.cover.dateRange,
          savedAt: hansangReport.updatedAt || "2026-10-01",
        });
      }

      // Ensure AI Festa is registered
      if (!list.some((item) => item.id === aiFestaReport.id)) {
        list.push({
          id: aiFestaReport.id,
          title: aiFestaReport.cover.title,
          eventName: aiFestaReport.ch01.eventName,
          dates: aiFestaReport.cover.dateRange,
          savedAt: aiFestaReport.updatedAt || "2026-09-27",
        });
      }

      // Ensure Quantum Expo is registered
      if (!list.some((item) => item.id === quantumExpoReport.id)) {
        list.push({
          id: quantumExpoReport.id,
          title: quantumExpoReport.cover.title,
          eventName: quantumExpoReport.ch01.eventName,
          dates: quantumExpoReport.cover.dateRange,
          savedAt: quantumExpoReport.updatedAt || "2026-09-25",
        });
      }

      // Ensure AI Summit is registered
      if (!list.some((item) => item.id === defaultReport.id)) {
        list.push({
          id: defaultReport.id,
          title: defaultReport.cover.title,
          eventName: defaultReport.ch01.eventName,
          dates: defaultReport.cover.dateRange,
          savedAt: defaultReport.updatedAt || "2026-09",
        });
      }

      localStorage.setItem(ARCHIVE_INDEX_KEY, JSON.stringify(list));
      setArchiveList(list);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveCurrentToArchive = () => {
    try {
      const docKey = `exhi_doc_${currentReport.id}`;
      localStorage.setItem(docKey, JSON.stringify(currentReport));

      const existing = archiveList.filter((item) => item.id !== currentReport.id);
      const updatedList: ArchiveItemMeta[] = [
        {
          id: currentReport.id,
          title: currentReport.cover.title || "무제 전시회 보고서",
          eventName: currentReport.ch01.eventName || "행사명 미입력",
          dates: currentReport.cover.dateRange || "기간 미입력",
          savedAt: new Date().toISOString().split("T")[0],
        },
        ...existing,
      ];

      localStorage.setItem(ARCHIVE_INDEX_KEY, JSON.stringify(updatedList));
      setArchiveList(updatedList);
      alert("현재 작성 중인 보고서가 보관함에 안전하게 저장되었습니다!");
    } catch (e) {
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleLoadDoc = (id: string) => {
    try {
      const docStr = localStorage.getItem(`exhi_doc_${id}`);
      if (docStr) {
        const parsed = JSON.parse(docStr);
        onSelectReport(parsed);
        onClose();
      } else {
        alert("해당 보고서 데이터를 찾을 수 없습니다.");
      }
    } catch (e) {
      alert("보고서를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleToggleRevExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDocIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLoadSpecificRevision = (
    exhibitionId: string,
    rev: ReportRevisionMeta,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    try {
      const snapDoc = getRevisionSnapshot(exhibitionId, rev.revisionId);
      if (snapDoc) {
        setActiveRevisionId(exhibitionId, rev.revisionId);
        onSelectReport(snapDoc);
        onClose();
      } else {
        handleLoadDoc(exhibitionId);
      }
    } catch (err) {
      console.error("Failed to load revision snapshot", err);
      alert("해당 차수를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteSpecificRevision = (
    exhibitionId: string,
    rev: ReportRevisionMeta,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const currentList = getRevisions(exhibitionId);
    if (currentList.length <= 1) {
      alert("최소 1개의 차수는 유지되어야 합니다. 보고서 전체를 삭제하려면 상단의 [전체 삭제] 버튼을 이용해 주세요.");
      return;
    }

    const confirmMsg = `[${rev.versionLabel}${rev.memoKeyword ? ` · ${rev.memoKeyword}` : ""}] 차수를 정말 삭제하시겠습니까?\n\n※ 해당 차수의 데이터만 삭제되며, 다른 차수나 보고서는 유지됩니다.`;
    if (!window.confirm(confirmMsg)) {
      return;
    }

    try {
      const updatedList = deleteRevision(exhibitionId, rev.revisionId);
      setRevTrigger((prev) => prev + 1);

      // If the deleted revision is currently active in the workspace
      const activeId = getActiveRevisionId(exhibitionId);
      if (currentReport.id === exhibitionId) {
        const nextRev = updatedList.find((r) => r.revisionId === activeId) || updatedList[0];
        if (nextRev) {
          const snap = getRevisionSnapshot(exhibitionId, nextRev.revisionId);
          if (snap) {
            onSelectReport(snap);
          }
        }
      }
    } catch (err) {
      console.error("Failed to delete revision", err);
      alert("차수 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteDoc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("이 전시회 보고서 전체(모든 차수 포함)를 보관함에서 삭제하시겠습니까?")) {
      const updated = archiveList.filter((item) => item.id !== id);
      localStorage.removeItem(`exhi_doc_${id}`);
      localStorage.setItem(ARCHIVE_INDEX_KEY, JSON.stringify(updated));
      const revs = getRevisions(id);
      revs.forEach((r) => {
        localStorage.removeItem(`exhi_rev_snap_${id}_${r.revisionId}`);
      });
      localStorage.removeItem(`exhi_rev_index_${id}`);
      localStorage.removeItem(`exhi_active_rev_${id}`);
      setArchiveList(updated);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} role="dialog">
        <div className="modal-header">
          <h3>📂 전시회 보고서 보관함 (Archive)</h3>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <button
              type="button"
              className="btn-header primary"
              style={{ padding: "8px 14px", fontSize: "0.82rem" }}
              onClick={handleSaveCurrentToArchive}
            >
              📥 현재 보고서 보관함에 저장
            </button>
            <button
              type="button"
              className="btn-header"
              style={{ padding: "8px 14px", fontSize: "0.82rem", color: "var(--color-primary)", borderColor: "var(--color-border-dark)" }}
              onClick={() => {
                onNewBlank();
                onClose();
              }}
            >
              ✨ 새 보고서 생성
            </button>
          </div>

          <p style={{ fontSize: "0.82rem", color: "var(--color-text-sub)", marginBottom: "12px" }}>
            과거에 작성했던 전시회 보고서 목록입니다. 각 카드를 클릭하면 해당 보고서로 전환되며, [차수 관리]를 통해 개별 차수를 열람하거나 불필요한 차수를 삭제할 수 있습니다.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {archiveList.map((item) => {
              const revList = getRevisions(item.id);
              const isCurrentReport = item.id === currentReport.id;
              // Default to expanded if currently opened report has multiple revisions, unless user toggled
              const isExpanded = expandedDocIds[item.id] ?? (isCurrentReport && revList.length > 1);

              return (
                <div
                  key={item.id}
                  className="card-item"
                  style={{
                    cursor: "pointer",
                    margin: "0",
                    transition: "all 0.2s",
                    border: isCurrentReport ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                    backgroundColor: isCurrentReport ? "rgba(56, 189, 248, 0.03)" : undefined,
                  }}
                  onClick={() => handleLoadDoc(item.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 0, paddingRight: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <h4 style={{ fontSize: "0.95rem", color: "var(--color-primary)", margin: 0 }}>
                          {item.title}
                        </h4>
                        {isCurrentReport && (
                          <span style={{ fontSize: "0.7rem", color: "#0284c7", background: "#e0f2fe", border: "1px solid #bae6fd", padding: "1px 6px", borderRadius: "4px", fontWeight: 700 }}>
                            현재 열람중
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: "0.78rem", color: "var(--color-text-sub)", margin: "2px 0 4px" }}>
                        {item.eventName} · {item.dates}
                      </p>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                        저장일자: {item.savedAt}
                      </span>

                      {/* 차수 정보 요약 및 차수별 관리 토글 버튼 */}
                      {revList.length > 0 && (
                        <div style={{ marginTop: "8px", display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.72rem", background: "#f0fdf4", color: "#166534", padding: "2px 7px", borderRadius: "4px", fontWeight: 700, border: "1px solid #bbf7d0" }}>
                            🔖 최신: {revList[0].versionLabel}
                          </span>
                          {revList[0].memoKeyword && (
                            <span style={{ fontSize: "0.72rem", color: "#334155", fontWeight: 500 }}>
                              {revList[0].memoKeyword}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => handleToggleRevExpand(item.id, e)}
                            style={{
                              marginLeft: "4px",
                              fontSize: "0.72rem",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              border: isExpanded ? "1px solid #94a3b8" : "1px solid #cbd5e1",
                              background: isExpanded ? "#e2e8f0" : "#ffffff",
                              color: isExpanded ? "#0f172a" : "#475569",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontWeight: 600,
                              transition: "all 0.15s ease",
                            }}
                            title="각 차수별 열람 및 개별 차수 삭제"
                          >
                            <span>🏷️ 총 {revList.length}개 차수 관리</span>
                            <span style={{ fontSize: "0.65rem" }}>{isExpanded ? "▲ 접기" : "▼ 펼치기"}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                      <button
                        type="button"
                        className="btn-danger-sm"
                        style={{ whiteSpace: "nowrap" }}
                        onClick={(e) => handleDeleteDoc(item.id, e)}
                        title="전시회 보고서 전체(모든 차수 포함) 삭제"
                      >
                        전체 삭제
                      </button>
                    </div>
                  </div>

                  {/* 차수별 상세 목록 (개별 차수 열람 및 삭제) */}
                  {revList.length > 0 && isExpanded && (
                    <div
                      style={{
                        marginTop: "12px",
                        padding: "10px 12px",
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#1e293b" }}>
                          📋 차수별 히스토리 ({revList.length}개)
                        </span>
                        <span style={{ fontSize: "0.68rem", color: "#64748b" }}>
                          불필요한 차수는 [차수 삭제]를 눌러 정리할 수 있습니다.
                        </span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {revList.map((rev) => {
                          const isRevActive =
                            isCurrentReport &&
                            ((currentReport.cover.revisionInfo?.versionNumber === rev.versionNumber) ||
                              (getActiveRevisionId(item.id) === rev.revisionId));

                          return (
                            <div
                              key={rev.revisionId}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "6px 10px",
                                background: isRevActive ? "#f0fdf4" : "#ffffff",
                                border: isRevActive ? "1px solid #86efac" : "1px solid #e2e8f0",
                                borderRadius: "5px",
                                transition: "all 0.15s",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 700,
                                    background: isRevActive ? "#15803d" : "#0284c7",
                                    color: "#ffffff",
                                    padding: "2px 7px",
                                    borderRadius: "3px",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {rev.versionLabel}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#334155",
                                    fontWeight: 600,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {rev.memoKeyword || "(메모 없음)"}
                                </span>
                                <span style={{ fontSize: "0.68rem", color: "#94a3b8", whiteSpace: "nowrap" }}>
                                  {rev.savedAt}
                                </span>
                                {isRevActive && (
                                  <span
                                    style={{
                                      fontSize: "0.68rem",
                                      color: "#16a34a",
                                      fontWeight: 700,
                                      background: "#dcfce7",
                                      padding: "1px 6px",
                                      borderRadius: "3px",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    현재 활성
                                  </span>
                                )}
                              </div>

                              <div style={{ display: "flex", gap: "6px", alignItems: "center", marginLeft: "10px", flexShrink: 0 }}>
                                <button
                                  type="button"
                                  onClick={(e) => handleLoadSpecificRevision(item.id, rev, e)}
                                  style={{
                                    fontSize: "0.72rem",
                                    padding: "3px 8px",
                                    borderRadius: "4px",
                                    border: "1px solid #38bdf8",
                                    background: "#f0f9ff",
                                    color: "#0369a1",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                  }}
                                  title="이 차수 스냅샷을 에디터로 열람"
                                >
                                  열기
                                </button>

                                <button
                                  type="button"
                                  disabled={revList.length <= 1}
                                  onClick={(e) => handleDeleteSpecificRevision(item.id, rev, e)}
                                  style={{
                                    fontSize: "0.72rem",
                                    padding: "3px 8px",
                                    borderRadius: "4px",
                                    border: revList.length <= 1 ? "1px solid #e2e8f0" : "1px solid #fca5a5",
                                    background: revList.length <= 1 ? "#f1f5f9" : "#fff1f2",
                                    color: revList.length <= 1 ? "#94a3b8" : "#e11d48",
                                    fontWeight: 600,
                                    cursor: revList.length <= 1 ? "not-allowed" : "pointer",
                                  }}
                                  title={revList.length <= 1 ? "최소 1개의 차수는 유지되어야 합니다" : "이 차수만 영구 삭제"}
                                >
                                  차수 삭제
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
