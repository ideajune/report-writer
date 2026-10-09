"use client";

import React, { useState, useEffect } from "react";
import { ExhibitionReportDoc } from "@/types/report";
import { defaultReport } from "@/data/sampleReport";
import { quantumExpoReport } from "@/data/quantumReport";
import { aiFestaReport } from "@/data/aiFestaReport";
import { hansangReport } from "@/data/hansangReport";
import { slwReport } from "@/data/slwReport";
import { getRevisions } from "@/utils/revisionStorage";

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

  useEffect(() => {
    if (isOpen) {
      loadArchiveList();
    }
  }, [isOpen]);

  const loadArchiveList = () => {
    try {
      // Always sync preset reports with latest data definitions
      localStorage.setItem(`exhi_doc_${slwReport.id}`, JSON.stringify(slwReport));
      localStorage.setItem(`exhi_doc_${hansangReport.id}`, JSON.stringify(hansangReport));
      localStorage.setItem(`exhi_doc_${aiFestaReport.id}`, JSON.stringify(aiFestaReport));
      localStorage.setItem(`exhi_doc_${quantumExpoReport.id}`, JSON.stringify(quantumExpoReport));
      localStorage.setItem(`exhi_doc_${defaultReport.id}`, JSON.stringify(defaultReport));

      const savedIndex = localStorage.getItem(ARCHIVE_INDEX_KEY);
      let list: ArchiveItemMeta[] = savedIndex ? JSON.parse(savedIndex) : [];

      // Ensure SLW Report is registered at top
      if (!list.some((item) => item.id === slwReport.id)) {
        list.unshift({
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

  const handleDeleteDoc = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("이 보고서를 보관함에서 삭제하시겠습니까?")) {
      const updated = archiveList.filter((item) => item.id !== id);
      localStorage.removeItem(`exhi_doc_${id}`);
      localStorage.setItem(ARCHIVE_INDEX_KEY, JSON.stringify(updated));
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
            과거에 작성했던 전시회 보고서 목록입니다. 클릭하시면 해당 보고서를 즉시 열람 및 수정하실 수 있습니다.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {archiveList.map((item) => (
              <div
                key={item.id}
                className="card-item"
                style={{
                  cursor: "pointer",
                  margin: "0",
                  transition: "all 0.2s",
                  border: item.id === currentReport.id ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                }}
                onClick={() => handleLoadDoc(item.id)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", color: "var(--color-primary)", marginBottom: "4px" }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--color-text-sub)" }}>
                      {item.eventName} · {item.dates}
                    </p>
                    <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                      저장일자: {item.savedAt}
                    </span>
                    {(() => {
                      const revList = getRevisions(item.id);
                      if (revList.length === 0) return null;
                      return (
                        <div style={{ marginTop: "6px", display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.72rem", background: "#f0fdf4", color: "#166534", padding: "1px 6px", borderRadius: "4px", fontWeight: 700, border: "1px solid #bbf7d0" }}>
                            🔖 {revList[0].versionLabel}
                          </span>
                          {revList[0].memoKeyword && (
                            <span style={{ fontSize: "0.72rem", color: "#334155", fontWeight: 500 }}>
                              {revList[0].memoKeyword}
                            </span>
                          )}
                          {revList.length > 1 && (
                            <span style={{ fontSize: "0.7rem", color: "#64748b" }}>
                              (총 {revList.length}개 차수)
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {item.id === currentReport.id && (
                      <span style={{ fontSize: "0.72rem", color: "var(--color-accent)", fontWeight: 700 }}>
                        (현재 열림)
                      </span>
                    )}
                    <button
                      type="button"
                      className="btn-danger-sm"
                      onClick={(e) => handleDeleteDoc(item.id, e)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
