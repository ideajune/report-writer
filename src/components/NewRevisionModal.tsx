"use client";

import React, { useState, useEffect } from "react";
import { ExhibitionReportDoc } from "@/types/report";
import { getRevisions, saveNewRevision } from "@/utils/revisionStorage";

interface NewRevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ExhibitionReportDoc;
  onSaved: (updatedDoc: ExhibitionReportDoc) => void;
}

export const NewRevisionModal: React.FC<NewRevisionModalProps> = ({
  isOpen,
  onClose,
  report,
  onSaved,
}) => {
  const [versionLabel, setVersionLabel] = useState("");
  const [memoKeyword, setMemoKeyword] = useState("");
  const [showOnCover, setShowOnCover] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const list = getRevisions(report.id, report);
      const maxVer = list.reduce((max, item) => Math.max(max, item.versionNumber || 0), 0);
      const nextVer = maxVer + 1;
      setVersionLabel(`${nextVer}차`);
      setMemoKeyword("");
      setShowOnCover(report.cover.revisionInfo?.showOnCover ?? false);
    }
  }, [isOpen, report]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = saveNewRevision(
      report.id,
      report,
      memoKeyword.trim() || "개정 보완본",
      versionLabel.trim() || "개정본",
      showOnCover
    );
    onSaved(result.updatedDoc);
    onClose();
  };

  return (
    <div className="archive-modal-backdrop" onClick={onClose} style={{ zIndex: 1050 }}>
      <div
        className="archive-modal-container"
        style={{ maxWidth: "480px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="archive-modal-header">
          <div>
            <div className="archive-modal-badge">REVISION SNAPSHOT</div>
            <h2 className="archive-modal-title">새 차수(버전)로 저장</h2>
          </div>
          <button type="button" className="archive-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "20px 24px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              대상 전시회
            </span>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-main)", marginTop: "2px" }}>
              {report.cover.title || "전시회 보고서"}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
              차수 명칭 (라벨) *
            </label>
            <input
              type="text"
              className="form-input"
              value={versionLabel}
              onChange={(e) => setVersionLabel(e.target.value)}
              placeholder="예: 2차, 3차 개정본, 최종본"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
              간단 키워드 메모 (필수 요약) *
            </label>
            <input
              type="text"
              className="form-input"
              value={memoKeyword}
              onChange={(e) => setMemoKeyword(e.target.value)}
              placeholder="예: 20개사 기업 Pick & 산업동향 심층 보강본"
              required
            />
            <span style={{ fontSize: "0.76rem", color: "var(--color-text-muted)", marginTop: "4px", display: "block" }}>
              * 차수 관리 히스토리와 표지(선택 시)에 명시되는 핵심 변경사항입니다.
            </span>
          </div>

          <div style={{ marginBottom: "20px", padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, color: "#0369a1" }}>
              <input
                type="checkbox"
                checked={showOnCover}
                onChange={(e) => setShowOnCover(e.target.checked)}
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              📄 보고서 표지에 차수 번호 및 키워드 메모 인쇄/출력
            </label>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: "4px 0 0 24px" }}>
              체크 해제 시 인쇄물 및 웹 표지에서 차수 배지가 숨겨집니다.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button
              type="button"
              className="btn-header"
              onClick={onClose}
              style={{ padding: "8px 16px" }}
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-header primary"
              style={{ padding: "8px 18px", fontWeight: 700 }}
            >
              💾 새 차수 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
