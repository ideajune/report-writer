"use client";

import React, { useState } from "react";
import {
  ExhibitionReportDoc,
  PhotoSketch,
  PickCompany,
  TrendItem,
  LandscapeField,
  HighlightDay,
  RevisionInfo,
} from "@/types/report";

interface EditorProps {
  report: ExhibitionReportDoc;
  onChange: (updated: ExhibitionReportDoc) => void;
  includePhotos?: boolean;
}

export const Editor: React.FC<EditorProps> = ({ report, onChange, includePhotos = true }) => {
  const [activeTab, setActiveTab] = useState<
    "cover" | "ch01" | "ch02" | "ch03" | "ch04" | "ch05" | "ch06"
  >("cover");

  // Cover Change Handler
  const handleCoverChange = (field: keyof typeof report.cover, value: string) => {
    onChange({
      ...report,
      cover: { ...report.cover, [field]: value },
    });
  };

  // Revision Info Handler
  const handleRevisionChange = (field: keyof RevisionInfo, value: any) => {
    const currentRev = report.cover.revisionInfo || {
      versionNumber: 1,
      versionLabel: "1차",
      memoKeyword: "",
      showOnCover: false,
    };
    onChange({
      ...report,
      cover: {
        ...report.cover,
        revisionInfo: {
          ...currentRev,
          [field]: value,
        },
      },
    });
  };

  // Image Upload Helper
  const handleImageUpload = (
    callback: (base64Url: string) => void,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          callback(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="editor-pane">
      {/* Chapter Tabs Navigation */}
      <nav className="editor-tabs-nav" aria-label="챕터 편집기 탭">
        <button
          type="button"
          className={`editor-tab-item ${activeTab === "cover" ? "active" : ""}`}
          onClick={() => setActiveTab("cover")}
        >
          표지
        </button>
        <button
          type="button"
          className={`editor-tab-item ${activeTab === "ch01" ? "active" : ""}`}
          onClick={() => setActiveTab("ch01")}
        >
          01 개요
        </button>
        <button
          type="button"
          className={`editor-tab-item ${activeTab === "ch02" ? "active" : ""}`}
          onClick={() => setActiveTab("ch02")}
        >
          02 하이라이트
        </button>
        <button
          type="button"
          className={`editor-tab-item ${activeTab === "ch03" ? "active" : ""}`}
          onClick={() => setActiveTab("ch03")}
        >
          03 지형도
        </button>
        <button
          type="button"
          className={`editor-tab-item ${activeTab === "ch04" ? "active" : ""}`}
          onClick={() => setActiveTab("ch04")}
        >
          04 기업 Pick
        </button>
        <button
          type="button"
          className={`editor-tab-item ${activeTab === "ch05" ? "active" : ""}`}
          onClick={() => setActiveTab("ch05")}
        >
          05 동향 리포트
        </button>
        <button
          type="button"
          className={`editor-tab-item ${activeTab === "ch06" ? "active" : ""}`}
          onClick={() => setActiveTab("ch06")}
        >
          06 자료 안내
        </button>
      </nav>

      {/* Scrollable Form Content */}
      <div className="editor-scroll-area">
        {/* ========================================================
            TAB: COVER
            ======================================================== */}
        {activeTab === "cover" && (
          <div>
            <div className="form-section-title">리포트 표지 (Cover) 정보</div>

            <div className="callout-box" style={{ marginBottom: "16px", backgroundColor: "#F0F9FF", borderColor: "#BAE6FD" }}>
              <strong style={{ color: "var(--color-accent)" }}>💡 샘플 PDF 규격 표지 안내</strong>
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-sub)", marginTop: "4px" }}>
                첫 페이지(표지)는 공식 샘플 PDF 규격에 맞춰 <strong>[1.제목 / 2.일정 / 3.장소 / 4.날짜]</strong> 4가지 항목이 자동으로 반영됩니다.
              </p>
            </div>

            <div className="form-group">
              <label>1. 전시회 제목 (메인 타이틀) *</label>
              <input
                type="text"
                className="form-input"
                value={report.cover.title}
                onChange={(e) => handleCoverChange("title", e.target.value)}
                placeholder="예: 국제양자산업대전 (QX KOREA 2026)"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>2. 행사 일정 (참관 기간) *</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.cover.dateRange}
                  onChange={(e) => handleCoverChange("dateRange", e.target.value)}
                  placeholder="예: 2026.09.09(수) – 09.11(금)"
                />
              </div>
              <div className="form-group">
                <label>3. 개최 장소 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.cover.location}
                  onChange={(e) => handleCoverChange("location", e.target.value)}
                  placeholder="예: 서울 코엑스 (COEX) Hall B"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>4. 발행 일자 (연월) *</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.cover.issueDate}
                  onChange={(e) => handleCoverChange("issueDate", e.target.value)}
                  placeholder="예: 2026.09"
                />
              </div>
              <div className="form-group">
                <label>작성자 성명 (참고용)</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.cover.author}
                  onChange={(e) => handleCoverChange("author", e.target.value)}
                  placeholder="예: 박상준 책임연구원"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>보고 부서 (참고용)</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.cover.department}
                  onChange={(e) => handleCoverChange("department", e.target.value)}
                  placeholder="예: 전략기획팀 / 미래기술연구소"
                />
              </div>
              <div className="form-group">
                <label>문의처</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.cover.contactEmail}
                  onChange={(e) => handleCoverChange("contactEmail", e.target.value)}
                  placeholder="contact@catalogexpress.kr"
                />
              </div>
            </div>

            {/* 차수 관리 및 표지 출력 옵션 */}
            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px dashed var(--color-border)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-main)" }}>
                  📌 보고서 차수 관리 및 표지 출력 설정
                </span>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, color: "#0284c7" }}>
                  <input
                    type="checkbox"
                    checked={report.cover.revisionInfo?.showOnCover === true}
                    onChange={(e) => handleRevisionChange("showOnCover", e.target.checked)}
                    style={{ cursor: "pointer", width: "16px", height: "16px" }}
                  />
                  표지에 차수 및 메모 출력
                </label>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>차수 명칭 (라벨)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={report.cover.revisionInfo?.versionLabel || "1차"}
                    onChange={(e) => handleRevisionChange("versionLabel", e.target.value)}
                    placeholder="예: 1차, 2차 개정본, 최종본"
                  />
                </div>
                <div className="form-group">
                  <label>차수 번호 (숫자)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={report.cover.revisionInfo?.versionNumber || 1}
                    onChange={(e) => handleRevisionChange("versionNumber", parseInt(e.target.value, 10) || 1)}
                    min={1}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>간단 키워드 메모 (표지 및 히스토리에 표시)</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.cover.revisionInfo?.memoKeyword || ""}
                  onChange={(e) => handleRevisionChange("memoKeyword", e.target.value)}
                  placeholder="예: 20개사 기업 Pick & 산업동향 심층 보강본"
                />
                <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "4px", display: "block" }}>
                  * 상단 [표지에 차수 및 메모 출력] 체크를 해제하면 인쇄 및 웹 미리보기 표지에서 숨겨집니다.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: 01 OVERVIEW
            ======================================================== */}
        {activeTab === "ch01" && (
          <div>
            <div className="form-section-title">01. 박람회 개요</div>

            <div className="form-group">
              <label>공식 행사명 (국/영문)</label>
              <input
                type="text"
                className="form-input"
                value={report.ch01.eventName}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch01: { ...report.ch01, eventName: e.target.value },
                  })
                }
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>일정</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.ch01.dates}
                  onChange={(e) =>
                    onChange({
                      ...report,
                      ch01: { ...report.ch01, dates: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>장소</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.ch01.location}
                  onChange={(e) =>
                    onChange({
                      ...report,
                      ch01: { ...report.ch01, location: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>기획 · 주관</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.ch01.host}
                  onChange={(e) =>
                    onChange({
                      ...report,
                      ch01: { ...report.ch01, host: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>장소 협력 / 후원</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.ch01.organizer}
                  onChange={(e) =>
                    onChange({
                      ...report,
                      ch01: { ...report.ch01, organizer: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>협력기관 및 후원사</label>
              <input
                type="text"
                className="form-input"
                value={report.ch01.supporters}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch01: { ...report.ch01, supporters: e.target.value },
                  })
                }
              />
            </div>

            {/* Metrics */}
            <div style={{ marginTop: "16px", marginBottom: "8px", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-primary)" }}>
              📊 이번 회차 규모 정량 지표 (4개 카드)
            </div>
            {report.ch01.metrics.map((m, mIdx) => (
              <div key={mIdx} className="card-item" style={{ padding: "10px" }}>
                <div className="form-row-2">
                  <div className="form-group" style={{ marginBottom: "6px" }}>
                    <label>지표명</label>
                    <input
                      type="text"
                      className="form-input"
                      value={m.label}
                      onChange={(e) => {
                        const updated = [...report.ch01.metrics];
                        updated[mIdx] = { ...updated[mIdx], label: e.target.value };
                        onChange({ ...report, ch01: { ...report.ch01, metrics: updated } });
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "6px" }}>
                    <label>수치 (값)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={m.value}
                      onChange={(e) => {
                        const updated = [...report.ch01.metrics];
                        updated[mIdx] = { ...updated[mIdx], value: e.target.value };
                        onChange({ ...report, ch01: { ...report.ch01, metrics: updated } });
                      }}
                    />
                  </div>
                </div>
                <div className="form-row-2">
                  <div className="form-group" style={{ marginBottom: "0" }}>
                    <label>증가율 뱃지 (선택)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={m.growthBadge || ""}
                      placeholder="+66.2%↑"
                      onChange={(e) => {
                        const updated = [...report.ch01.metrics];
                        updated[mIdx] = { ...updated[mIdx], growthBadge: e.target.value };
                        onChange({ ...report, ch01: { ...report.ch01, metrics: updated } });
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "0" }}>
                    <label>부가 설명 (전년 대비 등)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={m.subText || ""}
                      onChange={(e) => {
                        const updated = [...report.ch01.metrics];
                        updated[mIdx] = { ...updated[mIdx], subText: e.target.value };
                        onChange({ ...report, ch01: { ...report.ch01, metrics: updated } });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Note Callout */}
            <div className="form-group" style={{ marginTop: "14px" }}>
              <label>💡 헷갈리기 쉬운 점 / 참고 안내 콜아웃</label>
              <input
                type="text"
                className="form-input"
                style={{ marginBottom: "6px" }}
                value={report.ch01.noteCallout.title}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch01: {
                      ...report.ch01,
                      noteCallout: { ...report.ch01.noteCallout, title: e.target.value },
                    },
                  })
                }
              />
              <textarea
                className="form-textarea"
                value={report.ch01.noteCallout.content}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch01: {
                      ...report.ch01,
                      noteCallout: { ...report.ch01.noteCallout, content: e.target.value },
                    },
                  })
                }
              />
            </div>

            {/* Sketches */}
            <div style={{ marginTop: "16px", marginBottom: "8px", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-primary)" }}>
              📸 현장 스케치 사진 (최대 4컷)
            </div>
            {report.ch01.sketches.map((sk, skIdx) => (
              <div key={sk.id} className="card-item" style={{ padding: "10px" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
                  {sk.photoUrl && (
                    <img
                      src={sk.photoUrl}
                      alt="미리보기"
                      style={{ width: "60px", height: "45px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ fontSize: "0.75rem" }}
                      onChange={(e) =>
                        handleImageUpload((base64) => {
                          const updated = [...report.ch01.sketches];
                          updated[skIdx] = { ...updated[skIdx], photoUrl: base64 };
                          onChange({ ...report, ch01: { ...report.ch01, sketches: updated } });
                        }, e)
                      }
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="form-input"
                  value={sk.caption}
                  placeholder="사진 캡션 입력"
                  onChange={(e) => {
                    const updated = [...report.ch01.sketches];
                    updated[skIdx] = { ...updated[skIdx], caption: e.target.value };
                    onChange({ ...report, ch01: { ...report.ch01, sketches: updated } });
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            TAB: 02 HIGHLIGHTS
            ======================================================== */}
        {activeTab === "ch02" && (
          <div>
            <div className="form-section-title">02. 현장 하이라이트</div>

            <div className="form-group">
              <label>전시장 구역(Zone) 구성 안내</label>
              <textarea
                className="form-textarea"
                value={report.ch02.zoneSummary}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch02: { ...report.ch02, zoneSummary: e.target.value },
                  })
                }
              />
            </div>

            {/* Days Schedule */}
            <div style={{ margin: "14px 0 8px", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-primary)" }}>
              📅 일자별 주요 활동 및 세션 (Day 1 ~ Day 3)
            </div>
            {report.ch02.days.map((day, dIdx) => (
              <div key={day.id} className="card-item">
                <div className="card-item-header">
                  <strong>{day.dayLabel}</strong>
                  <button
                    type="button"
                    className="btn-danger-sm"
                    onClick={() => {
                      const updated = report.ch02.days.filter((d) => d.id !== day.id);
                      onChange({ ...report, ch02: { ...report.ch02, days: updated } });
                    }}
                  >
                    삭제
                  </button>
                </div>
                <div className="form-group">
                  <label>일자 및 테마 타이틀</label>
                  <input
                    type="text"
                    className="form-input"
                    value={day.theme}
                    onChange={(e) => {
                      const updated = [...report.ch02.days];
                      updated[dIdx] = { ...updated[dIdx], theme: e.target.value };
                      onChange({ ...report, ch02: { ...report.ch02, days: updated } });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>세부 세션 목록 (줄바꿈으로 구분)</label>
                  <textarea
                    className="form-textarea"
                    value={day.sessions.join("\n")}
                    onChange={(e) => {
                      const updated = [...report.ch02.days];
                      updated[dIdx] = {
                        ...updated[dIdx],
                        sessions: e.target.value.split("\n"),
                      };
                      onChange({ ...report, ch02: { ...report.ch02, days: updated } });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-item"
              onClick={() => {
                const newDay: HighlightDay = {
                  id: `day-${Date.now()}`,
                  dayLabel: `Day ${report.ch02.days.length + 1}`,
                  theme: "",
                  sessions: [""],
                };
                onChange({
                  ...report,
                  ch02: { ...report.ch02, days: [...report.ch02.days, newDay] },
                });
              }}
            >
              + 일자 추가하기
            </button>

            <div className="form-group" style={{ marginTop: "16px" }}>
              <label>B2B 상담 및 부대 프로그램 성과 요약</label>
              <textarea
                className="form-textarea"
                value={report.ch02.b2bSummary}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch02: { ...report.ch02, b2bSummary: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: 03 LANDSCAPE
            ======================================================== */}
        {activeTab === "ch03" && (
          <div>
            <div className="form-section-title">03. 참가기업 지형도</div>

            <div className="form-group">
              <label>도입 안내 문구</label>
              <input
                type="text"
                className="form-input"
                value={report.ch03.intro}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch03: { ...report.ch03, intro: e.target.value },
                  })
                }
              />
            </div>

            {report.ch03.fields.map((f, fIdx) => (
              <div key={f.id} className="card-item">
                <div className="card-item-header">
                  <strong>분야 #{fIdx + 1}</strong>
                  <button
                    type="button"
                    className="btn-danger-sm"
                    onClick={() => {
                      const updated = report.ch03.fields.filter((item) => item.id !== f.id);
                      onChange({ ...report, ch03: { ...report.ch03, fields: updated } });
                    }}
                  >
                    삭제
                  </button>
                </div>
                <div className="form-group">
                  <label>기술/산업 분야명</label>
                  <input
                    type="text"
                    className="form-input"
                    value={f.category}
                    onChange={(e) => {
                      const updated = [...report.ch03.fields];
                      updated[fIdx] = { ...updated[fIdx], category: e.target.value };
                      onChange({ ...report, ch03: { ...report.ch03, fields: updated } });
                    }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "0" }}>
                  <label>참가기업 리스트 (쉼표로 구분)</label>
                  <textarea
                    className="form-textarea"
                    style={{ minHeight: "60px" }}
                    value={f.companies}
                    onChange={(e) => {
                      const updated = [...report.ch03.fields];
                      updated[fIdx] = { ...updated[fIdx], companies: e.target.value };
                      onChange({ ...report, ch03: { ...report.ch03, fields: updated } });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-item"
              onClick={() => {
                const newField: LandscapeField = {
                  id: `f-${Date.now()}`,
                  category: "",
                  companies: "",
                };
                onChange({
                  ...report,
                  ch03: { ...report.ch03, fields: [...report.ch03.fields, newField] },
                });
              }}
            >
              + 분야 카테고리 추가
            </button>
          </div>
        )}

        {/* ========================================================
            TAB: 04 PICKS
            ======================================================== */}
        {activeTab === "ch04" && (
          <div>
            <div className="form-section-title">
              <span>04. 주목할 부스 기업 Pick</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}>
                총 {report.ch04.companies.length}개사
              </span>
            </div>

            <div className="form-group">
              <label>도입 안내 문구</label>
              <input
                type="text"
                className="form-input"
                value={report.ch04.intro}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch04: { ...report.ch04, intro: e.target.value },
                  })
                }
              />
            </div>

            {report.ch04.companies.map((comp, cIdx) => (
              <div key={comp.id} className="card-item">
                <div className="card-item-header">
                  <strong>#{cIdx + 1} {comp.name || "기업명 미입력"}</strong>
                  <button
                    type="button"
                    className="btn-danger-sm"
                    onClick={() => {
                      const updated = report.ch04.companies.filter((c) => c.id !== comp.id);
                      onChange({ ...report, ch04: { ...report.ch04, companies: updated } });
                    }}
                  >
                    삭제
                  </button>
                </div>

                <div className="form-group">
                  <label>기업명 (국/영문)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={comp.name}
                    onChange={(e) => {
                      const updated = [...report.ch04.companies];
                      updated[cIdx] = { ...updated[cIdx], name: e.target.value };
                      onChange({ ...report, ch04: { ...report.ch04, companies: updated } });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label>기업 개요 및 주요 제품</label>
                  <textarea
                    className="form-textarea"
                    value={comp.profile}
                    onChange={(e) => {
                      const updated = [...report.ch04.companies];
                      updated[cIdx] = { ...updated[cIdx], profile: e.target.value };
                      onChange({ ...report, ch04: { ...report.ch04, companies: updated } });
                    }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ color: "#15803D" }}>★ 왜 주목할까 (핵심 가치 & 기업 시사점)</label>
                  <textarea
                    className="form-textarea"
                    value={comp.whyPick}
                    onChange={(e) => {
                      const updated = [...report.ch04.companies];
                      updated[cIdx] = { ...updated[cIdx], whyPick: e.target.value };
                      onChange({ ...report, ch04: { ...report.ch04, companies: updated } });
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "0" }}>
                  <label>신뢰성 검증 출처</label>
                  <input
                    type="text"
                    className="form-input"
                    value={comp.source}
                    onChange={(e) => {
                      const updated = [...report.ch04.companies];
                      updated[cIdx] = { ...updated[cIdx], source: e.target.value };
                      onChange({ ...report, ch04: { ...report.ch04, companies: updated } });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-item"
              onClick={() => {
                const newComp: PickCompany = {
                  id: `pick-${Date.now()}`,
                  name: "",
                  profile: "",
                  whyPick: "",
                  source: "",
                };
                onChange({
                  ...report,
                  ch04: {
                    ...report.ch04,
                    companies: [...report.ch04.companies, newComp],
                  },
                });
              }}
            >
              + 주목할 기업 추가하기
            </button>
          </div>
        )}

        {/* ========================================================
            TAB: 05 TRENDS
            ======================================================== */}
        {activeTab === "ch05" && (
          <div>
            <div className="form-section-title">
              <span>05. 산업 동향 리포트</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}>
                총 {report.ch05.trends.length}개 트렌드
              </span>
            </div>

            <div className="form-group">
              <label>도입 안내 문구</label>
              <input
                type="text"
                className="form-input"
                value={report.ch05.intro}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch05: { ...report.ch05, intro: e.target.value },
                  })
                }
              />
            </div>

            {report.ch05.trends.map((tr, tIdx) => (
              <div key={tr.id} className="card-item">
                <div className="card-item-header">
                  <strong>[트렌드 {tr.number}] {tr.title || "타이틀 미입력"}</strong>
                  <button
                    type="button"
                    className="btn-danger-sm"
                    onClick={() => {
                      const updated = report.ch05.trends.filter((item) => item.id !== tr.id);
                      onChange({ ...report, ch05: { ...report.ch05, trends: updated } });
                    }}
                  >
                    삭제
                  </button>
                </div>

                <div className="form-row-2">
                  <div className="form-group" style={{ width: "80px" }}>
                    <label>번호</label>
                    <input
                      type="text"
                      className="form-input"
                      value={tr.number}
                      onChange={(e) => {
                        const updated = [...report.ch05.trends];
                        updated[tIdx] = { ...updated[tIdx], number: e.target.value };
                        onChange({ ...report, ch05: { ...report.ch05, trends: updated } });
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>트렌드 핵심 타이틀</label>
                    <input
                      type="text"
                      className="form-input"
                      value={tr.title}
                      onChange={(e) => {
                        const updated = [...report.ch05.trends];
                        updated[tIdx] = { ...updated[tIdx], title: e.target.value };
                        onChange({ ...report, ch05: { ...report.ch05, trends: updated } });
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>상세 분석 내용 (시장 전망 수치 등)</label>
                  <textarea
                    className="form-textarea"
                    value={tr.content}
                    onChange={(e) => {
                      const updated = [...report.ch05.trends];
                      updated[tIdx] = { ...updated[tIdx], content: e.target.value };
                      onChange({ ...report, ch05: { ...report.ch05, trends: updated } });
                    }}
                  />
                </div>

                {/* Optional Fact Check */}
                <div className="form-group" style={{ background: "#FEF3C7", padding: "10px", borderRadius: "6px" }}>
                  <label style={{ color: "#92400E" }}>💡 현장 팩트체크 박스 (선택 사항)</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ marginBottom: "6px" }}
                    value={tr.factCheck?.title || ""}
                    placeholder="팩트체크 제목"
                    onChange={(e) => {
                      const updated = [...report.ch05.trends];
                      updated[tIdx] = {
                        ...updated[tIdx],
                        factCheck: {
                          title: e.target.value,
                          content: updated[tIdx].factCheck?.content || "",
                        },
                      };
                      onChange({ ...report, ch05: { ...report.ch05, trends: updated } });
                    }}
                  />
                  <textarea
                    className="form-textarea"
                    value={tr.factCheck?.content || ""}
                    placeholder="현장 담당자의 주장과 실제 공식 스펙 교차 검증 내용"
                    onChange={(e) => {
                      const updated = [...report.ch05.trends];
                      updated[tIdx] = {
                        ...updated[tIdx],
                        factCheck: {
                          title: updated[tIdx].factCheck?.title || "현장 팩트체크",
                          content: e.target.value,
                        },
                      };
                      onChange({ ...report, ch05: { ...report.ch05, trends: updated } });
                    }}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "0" }}>
                  <label>인용 출처</label>
                  <input
                    type="text"
                    className="form-input"
                    value={tr.source}
                    onChange={(e) => {
                      const updated = [...report.ch05.trends];
                      updated[tIdx] = { ...updated[tIdx], source: e.target.value };
                      onChange({ ...report, ch05: { ...report.ch05, trends: updated } });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-item"
              onClick={() => {
                const newTrend: TrendItem = {
                  id: `t-${Date.now()}`,
                  number: `0${report.ch05.trends.length + 1}`,
                  title: "",
                  content: "",
                  source: "",
                };
                onChange({
                  ...report,
                  ch05: { ...report.ch05, trends: [...report.ch05.trends, newTrend] },
                });
              }}
            >
              + 트렌드 항목 추가하기
            </button>

            {/* Conclusion */}
            <div className="form-group" style={{ marginTop: "20px" }}>
              <label style={{ fontWeight: 700, color: "var(--color-primary)" }}>
                📌 [종합 총평] 현장에서 확인한 시장 흐름 총평 결론
              </label>
              <textarea
                className="form-textarea"
                style={{ minHeight: "100px" }}
                value={report.ch05.conclusion}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch05: { ...report.ch05, conclusion: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}

        {/* ========================================================
            TAB: 06 GUIDE
            ======================================================== */}
        {activeTab === "ch06" && (
          <div>
            <div className="form-section-title">06. 이 자료 안내 및 마무리</div>

            <div className="form-group">
              <label>카탈로그/자료 수집 안내 소개문</label>
              <textarea
                className="form-textarea"
                value={report.ch06.intro}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch06: { ...report.ch06, intro: e.target.value },
                  })
                }
              />
            </div>

            {/* 4-Photo Sketches Attachment */}
            <div style={{ marginTop: "18px", marginBottom: "8px", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-primary)" }}>
              📸 현장 스케치 사진 첨부 (4컷)
            </div>
            <p style={{ fontSize: "0.74rem", color: "var(--color-text-sub)", marginBottom: "10px" }}>
              현장 데모 및 카탈로그 수집 사진을 직접 첨부하거나 캡션을 수정하실 수 있습니다.
            </p>

            {report.ch06.sketches.map((sk, skIdx) => (
              <div key={sk.id} className="card-item" style={{ padding: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-accent)" }}>
                    스케치 사진 #{skIdx + 1}
                  </span>
                  <button
                    type="button"
                    className="btn-danger-sm"
                    onClick={() => {
                      const updated = report.ch06.sketches.filter((item) => item.id !== sk.id);
                      onChange({ ...report, ch06: { ...report.ch06, sketches: updated } });
                    }}
                  >
                    삭제
                  </button>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
                  {sk.photoUrl ? (
                    <img
                      src={sk.photoUrl}
                      alt="미리보기"
                      style={{ width: "70px", height: "50px", objectFit: "cover", borderRadius: "4px", border: "1px solid var(--color-border)" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "70px",
                        height: "50px",
                        background: "#F1F5F9",
                        border: "1px dashed var(--color-border-dark)",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.65rem",
                        color: "#94A3B8",
                      }}
                    >
                      사진 없음
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: "0.72rem", color: "var(--color-text-sub)", display: "block", marginBottom: "4px" }}>
                      내 PC / 스마트폰에서 사진 첨부:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ fontSize: "0.75rem" }}
                      onChange={(e) =>
                        handleImageUpload((base64) => {
                          const updated = [...report.ch06.sketches];
                          updated[skIdx] = { ...updated[skIdx], photoUrl: base64 };
                          onChange({ ...report, ch06: { ...report.ch06, sketches: updated } });
                        }, e)
                      }
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "0" }}>
                  <label>사진 캡션 (설명)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={sk.caption}
                    placeholder="예: 솔트룩스 부스 — 실시간 AI 통번역 데모 화면"
                    onChange={(e) => {
                      const updated = [...report.ch06.sketches];
                      updated[skIdx] = { ...updated[skIdx], caption: e.target.value };
                      onChange({ ...report, ch06: { ...report.ch06, sketches: updated } });
                    }}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-item"
              onClick={() => {
                const newSketch: PhotoSketch = {
                  id: `s6-${Date.now()}`,
                  photoUrl: "",
                  caption: "",
                };
                onChange({
                  ...report,
                  ch06: { ...report.ch06, sketches: [...report.ch06.sketches, newSketch] },
                });
              }}
            >
              + 현장 스케치 사진 추가
            </button>

            {/* Service & Contact info */}
            <div style={{ marginTop: "20px", marginBottom: "8px", fontWeight: 700, fontSize: "0.85rem", color: "var(--color-primary)" }}>
              🏢 서비스 소개 및 문의 정보
            </div>

            <div className="form-group">
              <label>서비스 / 부록 제목</label>
              <input
                type="text"
                className="form-input"
                value={report.ch06.serviceTitle}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch06: { ...report.ch06, serviceTitle: e.target.value },
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>서비스 상세 안내 설명</label>
              <textarea
                className="form-textarea"
                style={{ minHeight: "80px" }}
                value={report.ch06.serviceDesc}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch06: { ...report.ch06, serviceDesc: e.target.value },
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>슬로건 / 캐치프레이즈</label>
              <input
                type="text"
                className="form-input"
                value={report.ch06.slogan}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch06: { ...report.ch06, slogan: e.target.value },
                  })
                }
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>운영사 / 부서명</label>
                <input
                  type="text"
                  className="form-input"
                  value={report.ch06.companyName}
                  onChange={(e) =>
                    onChange({
                      ...report,
                      ch06: { ...report.ch06, companyName: e.target.value },
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>문의처 이메일</label>
                <input
                  type="email"
                  className="form-input"
                  value={report.ch06.contactEmail}
                  onChange={(e) =>
                    onChange({
                      ...report,
                      ch06: { ...report.ch06, contactEmail: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>홈페이지</label>
              <input
                type="text"
                className="form-input"
                value={report.ch06.website}
                onChange={(e) =>
                  onChange({
                    ...report,
                    ch06: { ...report.ch06, website: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
