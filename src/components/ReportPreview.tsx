"use client";

import React, { useState } from "react";
import { ExhibitionReportDoc } from "@/types/report";

interface ReportPreviewProps {
  report: ExhibitionReportDoc;
  includePhotos?: boolean;
  onToggleIncludePhotos?: (val: boolean) => void;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({
  report,
  includePhotos = true,
  onToggleIncludePhotos,
}) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const { cover, ch01, ch02, ch03, ch04, ch05, ch06 } = report;

  // Paginate Ch04: 5 companies per page
  const CH04_PER_PAGE = 5;
  const ch04Pages: (typeof ch04.companies)[] = [];
  if (ch04.companies && ch04.companies.length > 0) {
    for (let i = 0; i < ch04.companies.length; i += CH04_PER_PAGE) {
      ch04Pages.push(ch04.companies.slice(i, i + CH04_PER_PAGE));
    }
  } else {
    ch04Pages.push([]);
  }

  // Paginate Ch05:
  // If >= 7 trends, distribute across 4 pages: [0,1], [2,3], [4,5], [6..end + conclusion]
  // If 3..6 trends, distribute across 2 pages
  const ch05Pages: (typeof ch05.trends)[] = [];
  if (ch05.trends.length >= 7) {
    ch05Pages.push(ch05.trends.slice(0, 2));
    ch05Pages.push(ch05.trends.slice(2, 4));
    ch05Pages.push(ch05.trends.slice(4, 6));
    ch05Pages.push(ch05.trends.slice(6));
  } else if (ch05.trends.length > 2) {
    const half = Math.ceil(ch05.trends.length / 2);
    ch05Pages.push(ch05.trends.slice(0, half));
    ch05Pages.push(ch05.trends.slice(half));
  } else {
    ch05Pages.push(ch05.trends);
  }

  // Dynamic Page Calculations: If includePhotos is false, Ch02 Sketches (Page 5) is omitted!
  const ch03PageNum = includePhotos ? 6 : 5;
  const ch04StartPage = ch03PageNum + 1;
  const ch05StartPage = ch04StartPage + ch04Pages.length;
  const ch06PageNum = ch05StartPage + ch05Pages.length;
  const totalPages = ch06PageNum;

  // Build page jump list
  const pageNavList = [
    { page: 1, label: "표지", id: "print-cover" },
    { page: 2, label: "목차", id: "print-toc" },
    { page: 3, label: "01 개요", id: "print-ch01" },
    { page: 4, label: "02 일정", id: "print-ch02" },
    ...(includePhotos
      ? [{ page: 5, label: "02 스케치", id: "print-ch02-sketches" }]
      : []),
    { page: ch03PageNum, label: "03 지형도", id: "print-ch03" },
    ...ch04Pages.map((_, idx) => ({
      page: ch04StartPage + idx,
      label: `04 Pick (${idx + 1}P)`,
      id: `print-ch04-p${idx + 1}`,
    })),
    ...ch05Pages.map((_, idx) => ({
      page: ch05StartPage + idx,
      label: `05 동향 (${idx + 1}P)`,
      id: `print-ch05-p${idx + 1}`,
    })),
    { page: ch06PageNum, label: "06 자료안내", id: "print-ch06" },
  ];

  const handleScrollToPage = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="preview-pane">
      {/* Sticky Page Navigation Toolbar (화면 상단 고정 네비게이션) */}
      <div className={`preview-nav-bar ${isNavCollapsed ? "is-collapsed" : ""}`}>
        <div className="preview-nav-summary">
          <div className="preview-nav-title-group">
            <span className="preview-total-badge">📄 총 {totalPages}페이지 구성</span>
            <span className={`preview-mode-badge ${!includePhotos ? "is-text-only" : ""}`}>
              {includePhotos ? "📸 사진 포함" : "📝 텍스트 전용 (사진 제외)"}
            </span>
            <span className="preview-report-title">{cover.title || "보고서 미리보기"}</span>
          </div>
          <div className="preview-nav-controls">
            {onToggleIncludePhotos && (
              <button
                type="button"
                className={`nav-photo-toggle-btn ${!includePhotos ? "active-no-photo" : ""}`}
                onClick={() => onToggleIncludePhotos(!includePhotos)}
                title={includePhotos ? "사진 및 사진 소제목 제외 모드로 전환" : "사진 포함 모드로 전환"}
              >
                {includePhotos ? "📸 사진 제외하기" : "📷 사진 포함하기"}
              </button>
            )}
            {!isNavCollapsed && (
              <span className="preview-nav-tip">💡 버튼을 클릭하면 해당 페이지로 즉시 스크롤 이동합니다</span>
            )}
            <button
              type="button"
              className={`nav-collapse-btn ${isNavCollapsed ? "is-collapsed" : ""}`}
              onClick={() => setIsNavCollapsed((prev) => !prev)}
              aria-label={isNavCollapsed ? "목차 네비게이션 펼치기" : "목차 네비게이션 접기"}
              title={isNavCollapsed ? "목차 네비게이션 펼치기" : "목차 네비게이션 접기"}
            >
              <svg
                className={`collapse-icon ${isNavCollapsed ? "collapsed" : ""}`}
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              <span>{isNavCollapsed ? "목차 펼치기" : "목차 접기"}</span>
            </button>
          </div>
        </div>
        <div className="preview-nav-pills">
          {pageNavList.map((item) => (
            <button
              key={item.id}
              type="button"
              className="nav-pill-btn"
              onClick={() => handleScrollToPage(item.id)}
              title={`${item.page}페이지 (${item.label})로 바로 이동`}
            >
              <span className="pill-num">{item.page}P</span>
              <span className="pill-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* ========================================================
          SHEET 1: COVER PAGE (CatalogEXpress 샘플 PDF 규격 표지)
          4대 동적 항목: 제목, 일정, 장소, 날짜
          ======================================================== */}
      <article className="a4-sheet cover-sheet" id="print-cover">
        {/* Top Logo: CatalogEXpress */}
        <div className="sample-cover-logo-wrap">
          <img
            src="/catalogexpress_logo.png"
            alt="CatalogEXpress"
            className="catalog-express-logo-img"
          />
        </div>

        {/* Center Main: 1.제목 / 참관 정리 리포트 / 2.일정 · 3.장소 */}
        <div className="sample-cover-center-body">
          <h1 className="sample-cover-title">
            {(cover.title || "전시회").replace(/참관\s*(결과|정리)\s*(보고서|리포트)/g, "").trim()}
          </h1>
          <div className="sample-cover-subtitle">참관 정리 리포트</div>

          {/* 선택적 차수 및 키워드 메모 표시 영역 (기본 미출력) */}
          {cover.revisionInfo && cover.revisionInfo.showOnCover === true && (
            <div className="sample-cover-revision-pill">
              <span className="rev-badge-tag">
                {cover.revisionInfo.versionLabel || `제${cover.revisionInfo.versionNumber}차`}
              </span>
              {cover.revisionInfo.memoKeyword && (
                <span className="rev-badge-memo">
                  {cover.revisionInfo.memoKeyword}
                </span>
              )}
            </div>
          )}

          <div className="sample-cover-info-box">
            <p className="sample-cover-meta-line sample-cover-meta-date">
              {cover.dateRange || "2026.08.19(수) – 08.21(금)"}
            </p>
            <p className="sample-cover-meta-line sample-cover-meta-location">
              {cover.location || "서울 코엑스(COEX) Hall B"}
            </p>
            <p className="sample-cover-desc-line">
              현장에서 직접 수집한 전 부스 카탈로그와 현장 참관 기록을 바탕으로 정리했습니다.
            </p>
          </div>
        </div>

        {/* Bottom Section: 스캔본 안내 / 4.날짜 뱃지 / 문의처 */}
        <div className="sample-cover-footer-area">
          <p className="sample-cover-note">
            이 리포트 뒤로 현장에서 수집한 참가기업별 카탈로그 원본 스캔본이 이어집니다.
          </p>
          <div className="sample-cover-meta-row">
            <span className="sample-cover-badge">발행 {cover.issueDate || "2026.09"}</span>
            <span className="sample-cover-links">
              catalogexpress.kr · contact@catalogexpress.kr
            </span>
          </div>
        </div>

        <footer className="sheet-page-footer">
          <span>- 1 -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET 2: TABLE OF CONTENTS (목차 단독 페이지)
          ======================================================== */}
      <article className="a4-sheet toc-sheet" id="print-toc">
        <div className="toc-full-container">
          <header className="toc-main-heading">
            <span>목 차</span>
            <span className="en-sub">TABLE OF CONTENTS</span>
          </header>

          <div className="toc-card-row">
            <span className="toc-card-num">01</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">박람회 개요</h3>
              <p className="toc-card-desc">
                {`행사 기본 정보 · 전년 대비 규모 정량 지표 · 유사 행사 구분 유의점${
                  includePhotos ? " · 현장 스케치 사진" : ""
                }`}
              </p>
            </div>
          </div>

          <div className="toc-card-row">
            <span className="toc-card-num">02</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">현장 하이라이트</h3>
              <p className="toc-card-desc">
                전시장 4대 테마 구역 구분 · Day 1 ~ Day 3 일자별 주요 세션 및 부스 워크스루 · B2B 상담 실적
              </p>
            </div>
          </div>

          <div className="toc-card-row">
            <span className="toc-card-num">03</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">참가기업 지형도</h3>
              <p className="toc-card-desc">
                {ch03.fields?.length ? `${ch03.fields.length}대` : "8대"} 핵심 기술/산업 분야별 참가기업 분류 및 시장 랜드스케이프 매핑 테이블
              </p>
            </div>
          </div>

          <div className="toc-card-row">
            <span className="toc-card-num">04</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">주목할 부스 기업 Pick</h3>
              <p className="toc-card-desc">
                혁신성 및 비즈니스 연계 가치가 높은 {ch04.companies?.length ? `${ch04.companies.length}개` : "10개"} 핵심 참가기업 심층 분석 (왜 주목할까)
              </p>
            </div>
          </div>

          <div className="toc-card-row">
            <span className="toc-card-num">05</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">산업 동향 리포트</h3>
              <p className="toc-card-desc">
                현재 시장을 관통하는 {ch05.trends?.length ? `${ch05.trends.length}대` : "핵심"} 핵심 메가트렌드 심층 분석 · 현장 팩트체크 · 종합 시사점 총평
              </p>
            </div>
          </div>

          <div className="toc-card-row">
            <span className="toc-card-num">06</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">이 자료 안내</h3>
              <p className="toc-card-desc">
                {`현장 카탈로그 디지털 아카이빙 및 부록 안내${
                  includePhotos ? " · 마무리 현장 스케치 사진" : ""
                } · 운영사 및 문의처`}
              </p>
            </div>
          </div>
        </div>

        <footer className="sheet-page-footer">
          <span>- 2 -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET 3: 01 OVERVIEW (01 박람회 개요)
          ======================================================== */}
      <article className={`a4-sheet ch01-sheet ${!includePhotos ? "no-photos" : ""}`} id="print-ch01">
        {/* 01 CHAPTER HEADER */}
        <header className="chapter-header">
          <span className="chapter-number">01</span>
          <h2 className="chapter-title">박람회 개요</h2>
        </header>

        {/* BASIC INFO TABLE */}
        <table className="landscape-table ch01-table">
          <tbody>
            <tr>
              <th style={{ width: "22%" }}>행사명</th>
              <td style={{ width: "28%" }}><strong>{ch01.eventName}</strong></td>
              <th style={{ width: "22%" }}>일정</th>
              <td style={{ width: "28%" }}>{ch01.dates}</td>
            </tr>
            <tr>
              <th>장소</th>
              <td>{ch01.location}</td>
              <th>회차</th>
              <td>{ch01.edition}</td>
            </tr>
            <tr>
              <th>기획 · 주관</th>
              <td>{ch01.host}</td>
              <th>장소 협력</th>
              <td>{ch01.organizer}</td>
            </tr>
            <tr>
              <th>협력 및 후원</th>
              <td colSpan={3}>{ch01.supporters}</td>
            </tr>
          </tbody>
        </table>

        {/* METRICS GRID */}
        {ch01.metrics.length > 0 && (
          <div className="metrics-grid ch01-metrics-grid">
            {ch01.metrics.map((m, idx) => (
              <div key={idx} className="metric-card">
                <div className="metric-card-label">{m.label}</div>
                <div className="metric-card-value">{m.value}</div>
                {m.growthBadge && <span className="metric-badge">{m.growthBadge}</span>}
                {m.subText && <div className="metric-sub">{m.subText}</div>}
              </div>
            ))}
          </div>
        )}

        {/* NOTE CALLOUT */}
        {ch01.noteCallout?.content && (
          <div className="callout-box warning ch01-callout">
            <div className="callout-box-title">
              <span>💡 {ch01.noteCallout.title || "참고사항"}</span>
            </div>
            <div>{ch01.noteCallout.content}</div>
          </div>
        )}

        {/* SKETCHES (4-Grid) - Only rendered in photo mode */}
        {includePhotos && ch01.sketches.length > 0 && (
          <div className="ch01-sketches-wrap">
            <h3 className="ch01-sketches-title">
              📸 현장 스케치
            </h3>
            <div className="sketch-grid-4 ch01-sketch-grid">
              {ch01.sketches.map((sk) => (
                <div key={sk.id} className="sketch-card ch01-sketch-card">
                  {sk.photoUrl ? (
                    <img src={sk.photoUrl} alt={sk.caption} className="sketch-img ch01-sketch-img" />
                  ) : (
                    <div className="sketch-img ch01-sketch-img" style={{ background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: "0.75rem" }}>
                      사진 미등록
                    </div>
                  )}
                  <div className="sketch-caption ch01-sketch-caption">{sk.caption}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="sheet-page-footer">
          <span>- 3 -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET 4: 02 HIGHLIGHTS (일자별 세션 & B2B 성과)
          ======================================================== */}
      <article className="a4-sheet" id="print-ch02">
        <header className="chapter-header">
          <span className="chapter-number">02</span>
          <h2 className="chapter-title">현장 하이라이트</h2>
        </header>

        {ch02.zoneSummary && (
          <p className="section-intro-text" style={{ marginBottom: "10px", lineHeight: "1.5" }}>
            {ch02.zoneSummary}
          </p>
        )}

        {/* DAY CARDS */}
        {ch02.days.map((day) => (
          <div key={day.id} className="day-card" style={{ marginBottom: "8px" }}>
            <div className="day-card-header" style={{ padding: "6px 12px" }}>
              <span className="day-card-title">{day.dayLabel}</span>
              <span className="day-card-theme">{day.theme}</span>
            </div>
            <ul className="day-card-list" style={{ padding: "6px 14px 6px 26px", lineHeight: "1.45", fontSize: "0.78rem" }}>
              {day.sessions.map((sess, sIdx) => (
                <li key={sIdx} style={{ marginBottom: "2px" }}>{sess}</li>
              ))}
            </ul>
          </div>
        ))}

        {ch02.b2bSummary && (
          <div className="callout-box" style={{ margin: "10px 0 6px 0", padding: "10px 14px" }}>
            <strong style={{ display: "block", marginBottom: "3px" }}>🤝 B2B 상담 및 부대 프로그램 성과</strong>
            <span style={{ fontSize: "0.79rem", lineHeight: "1.45" }}>{ch02.b2bSummary}</span>
          </div>
        )}

        <footer className="sheet-page-footer">
          <span>- 4 -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET 5: 02 HIGHLIGHTS - SKETCHES (현장 스케치 사진 단독 페이지)
          Only rendered when includePhotos is true!
          ======================================================== */}
      {includePhotos && (
        <article className="a4-sheet" id="print-ch02-sketches">
          <header className="chapter-header">
            <span className="chapter-number">02</span>
            <h2 className="chapter-title">현장 하이라이트 — 현장 스케치</h2>
          </header>

          <p className="section-intro-text">
            주요 세션 키노트, 전시관 전경 및 기술 데모·체험존 현장 스케치 사진입니다.
          </p>

          {ch02.sketches.length > 0 && (
            <div style={{ marginTop: "14px" }}>
              <div className="sketch-grid-4" style={{ gap: "16px" }}>
                {ch02.sketches.map((sk) => (
                  <div key={sk.id} className="sketch-card" style={{ display: "flex", flexDirection: "column" }}>
                    {sk.photoUrl ? (
                      <img
                        src={sk.photoUrl}
                        alt={sk.caption}
                        className="sketch-img"
                        style={{ height: "195px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="sketch-img"
                        style={{
                          height: "195px",
                          background: "#E2E8F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#94A3B8",
                        }}
                      >
                        사진 미등록
                      </div>
                    )}
                    <div className="sketch-caption" style={{ padding: "8px 12px", fontSize: "0.78rem" }}>
                      {sk.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <footer className="sheet-page-footer">
            <span>- 5 -</span>
          </footer>
        </article>
      )}

      {/* ========================================================
          SHEET 4: 03 LANDSCAPE (참가기업 지형도)
          ======================================================== */}
      <article className="a4-sheet" id="print-ch03">
        <header className="chapter-header">
          <span className="chapter-number">03</span>
          <h2 className="chapter-title">참가기업 지형도</h2>
        </header>

        <p className="section-intro-text">{ch03.intro}</p>

        <table className="landscape-table">
          <thead>
            <tr>
              <th style={{ width: "32%" }}>기술 및 산업 분야</th>
              <th style={{ width: "68%" }}>주요 참가기업 예시</th>
            </tr>
          </thead>
          <tbody>
            {ch03.fields.map((field) => (
              <tr key={field.id}>
                <td><strong>{field.category}</strong></td>
                <td>{field.companies}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {ch03.source && (
          <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "10px", textAlign: "right" }}>
            {ch03.source}
          </p>
        )}

        <footer className="sheet-page-footer">
          <span>- {ch03PageNum} -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET: 04 PICKS (주목할 부스 기업 Pick) - 5개사씩 A4 1페이지 분할
          ======================================================== */}
      {ch04Pages.map((pageCompanies, pageIdx) => {
        const pageNum = ch04StartPage + pageIdx;
        return (
          <article key={`ch04-p${pageIdx + 1}`} className="a4-sheet" id={`print-ch04-p${pageIdx + 1}`}>
            <header className="chapter-header">
              <span className="chapter-number">04</span>
              <h2 className="chapter-title">
                {pageIdx === 0 ? "주목할 부스 기업 Pick" : "주목할 부스 기업 Pick (계속)"}
              </h2>
            </header>

            {pageIdx === 0 && <p className="section-intro-text">{ch04.intro}</p>}

            <div className="picks-container">
              {pageCompanies.map((comp, itemIdx) => {
                const actualIdx = pageIdx * CH04_PER_PAGE + itemIdx;
                return (
                  <div key={comp.id} className="pick-card">
                    <div className="pick-card-header">
                      <span className="pick-card-title">
                        #{actualIdx + 1} {comp.name}
                      </span>
                    </div>
                    <p className="pick-card-profile">{comp.profile}</p>
                    {comp.whyPick && (
                      <div className="pick-why-box">
                        <strong>💡 왜 주목할까: </strong>
                        <span>{comp.whyPick}</span>
                      </div>
                    )}
                    {comp.source && <div className="pick-source">출처: {comp.source}</div>}
                  </div>
                );
              })}
            </div>

            <footer className="sheet-page-footer">
              <span>- {pageNum} -</span>
            </footer>
          </article>
        );
      })}

      {/* ========================================================
          SHEET: 05 TRENDS (산업 동향 리포트) - 4페이지 분할 심층 분석
          ======================================================== */}
      {ch05Pages.map((pageTrends, pageIdx) => {
        const isFirst = pageIdx === 0;
        const isLast = pageIdx === ch05Pages.length - 1;
        const pageNum = ch05StartPage + pageIdx;

        return (
          <article key={`ch05-p${pageIdx + 1}`} className="a4-sheet" id={`print-ch05-p${pageIdx + 1}`}>
            <header className="chapter-header">
              <span className="chapter-number">05</span>
              <h2 className="chapter-title">
                {isFirst ? "산업 동향 리포트" : "산업 동향 리포트 (계속)"}
              </h2>
            </header>

            {isFirst && <p className="section-intro-text">{ch05.intro}</p>}

            <div className="trends-container">
              {pageTrends.map((tr) => (
                <div key={tr.id} className="trend-block">
                  <div className="trend-title-line">
                    <span className="trend-badge">{tr.number}</span>
                    <span className="trend-title-text">{tr.title}</span>
                  </div>
                  <p className="trend-body">{tr.content}</p>

                  {tr.factCheck?.content && (
                    <div className="factcheck-box">
                      <div className="factcheck-title">
                        <span>🔍 {tr.factCheck.title || "현장 팩트체크"}</span>
                      </div>
                      <div>{tr.factCheck.content}</div>
                    </div>
                  )}

                  {tr.source && (
                    <div style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", textAlign: "right" }}>
                      출처: {tr.source}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isLast && ch05.conclusion && (
              <div className="conclusion-box">
                <div className="conclusion-title">📌 [종합] 현장에서 확인한 것 & 핵심 시사점</div>
                <p>{ch05.conclusion}</p>
              </div>
            )}

            <footer className="sheet-page-footer">
              <span>- {pageNum} -</span>
            </footer>
          </article>
        );
      })}

      {/* ========================================================
          SHEET: 06 GUIDE & ARCHIVE (이 자료 안내)
          ======================================================== */}
      <article className={`a4-sheet sample-ch06-sheet ${!includePhotos ? "no-photos" : ""}`} id="print-ch06">
        <header className="chapter-header sample-ch06-header">
          <span className="chapter-number">06</span>
          <h2 className="chapter-title">이 자료 안내</h2>
        </header>

        <p className="sample-ch06-intro">
          이 리포트 다음 페이지부터는 {(cover.title || "전시회").replace(/참관\s*(결과|정리)\s*(보고서|리포트)/g, "").replace(/\n/g, " ").trim()} 현장에서 저희가 직접 수집한 참가기업별 카탈로그 원본을 고해상도로 스캔한 자료가 이어집니다. 부스에서 받으셨던 그 자료들을 다시 넘겨보시듯 확인하실 수 있고, 텍스트 검색도 가능합니다.
        </p>

        {/* SKETCHES - Only rendered in photo mode */}
        {includePhotos && ch06.sketches.length > 0 && (
          <div className="sample-ch06-sketches-area">
            <div className="sample-ch06-sketch-title">
              📷 현장 스케치
            </div>
            <div className="sample-ch06-sketch-grid">
              {ch06.sketches.slice(0, 4).map((sk) => (
                <div key={sk.id} className="sample-ch06-sketch-card">
                  {sk.photoUrl ? (
                    <img src={sk.photoUrl} alt={sk.caption} className="sample-ch06-sketch-img" />
                  ) : (
                    <div className="sample-ch06-sketch-img sample-ch06-empty-photo">
                      사진 미등록
                    </div>
                  )}
                  <div className="sample-ch06-sketch-caption">{sk.caption}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="sample-ch06-content-wrap">
          <h3 className="sample-ch06-service-title">카탈로그익스프레스 소개</h3>
          <p className="sample-ch06-service-desc">
            카탈로그익스프레스는 전시회 카탈로그를 대신 수집하고, 고해상도 스캔과 OCR로 디지털화해 검색 가능한 PDF 한 권으로 정리해 드리는 서비스입니다. 참가기업을 선별하지 않고 전체를 일괄 수집하며, 전시회에 직접 참석하셨든 안 하셨든 이용하실 수 있습니다.
          </p>

          <div className="sample-ch06-slogan">
            “전시회는 다녀오세요, 정리는 저희가 할게요”
          </div>

          <div className="sample-ch06-contact-block">
            <h4 className="sample-ch06-contact-heading">문의</h4>
            <div className="sample-ch06-contact-row">
              <span className="contact-label">이메일</span>
              <span className="contact-val">contact@catalogexpress.kr</span>
            </div>
            <div className="sample-ch06-contact-row">
              <span className="contact-label">홈페이지</span>
              <span className="contact-val">catalogexpress.kr</span>
            </div>
            <div className="sample-ch06-contact-row">
              <span className="contact-label">운영사</span>
              <span className="contact-val">영팩토리얼 주식회사</span>
            </div>
          </div>
        </div>

        <footer className="sheet-page-footer">
          <span>- {ch06PageNum} -</span>
        </footer>
      </article>
    </main>
  );
};
