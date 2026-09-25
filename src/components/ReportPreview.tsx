"use client";

import React from "react";
import { ExhibitionReportDoc } from "@/types/report";

interface ReportPreviewProps {
  report: ExhibitionReportDoc;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ report }) => {
  const { cover, ch01, ch02, ch03, ch04, ch05, ch06 } = report;

  return (
    <main className="preview-pane">
      {/* ========================================================
          SHEET 1: COVER PAGE (표지)
          ======================================================== */}
      <article className="a4-sheet cover-sheet" id="print-cover">
        <div className="cover-header-brand">
          <span className="cover-badge">EXHIBITION BUSINESS REPORT</span>
          <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
            {cover.publisher || "비즈니스 참관 결과 보고서"}
          </span>
        </div>

        <div className="cover-main-body">
          <h1 className="cover-title">{cover.title || "전시회 참관 결과 보고서"}</h1>
          <p className="cover-subtitle">
            {cover.subtitle || "현장 탐방 및 핵심 기술 분석 결과 보고"}
          </p>

          <table className="cover-meta-table">
            <tbody>
              <tr>
                <th>행사 기간</th>
                <td>{cover.dateRange || "일정 미기재"}</td>
              </tr>
              <tr>
                <th>개최 장소</th>
                <td>{cover.location || "장소 미기재"}</td>
              </tr>
              <tr>
                <th>보고 부서</th>
                <td>{cover.department || "기획부서"}</td>
              </tr>
              <tr>
                <th>작 성 자</th>
                <td>{cover.author || "작성자 성명"}</td>
              </tr>
              <tr>
                <th>발행 일자</th>
                <td>{cover.issueDate || "2026.09"}</td>
              </tr>
            </tbody>
          </table>
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
                행사 기본 정보 · 전년 대비 규모 정량 지표 · 유사 행사 구분 유의점 · 현장 스케치 사진
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
                8대 핵심 기술/산업 분야별 참가기업 분류 및 시장 랜드스케이프 매핑 테이블
              </p>
            </div>
          </div>

          <div className="toc-card-row">
            <span className="toc-card-num">04</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">주목할 부스 기업 Pick</h3>
              <p className="toc-card-desc">
                혁신성 및 당사 비즈니스 연계 가치가 높은 13개 핵심 참가기업 심층 분석 (왜 주목할까)
              </p>
            </div>
          </div>

          <div className="toc-card-row">
            <span className="toc-card-num">05</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">산업 동향 리포트</h3>
              <p className="toc-card-desc">
                현재 시장을 관통하는 7대 핵심 메가트렌드 심층 분석 · 현장 팩트체크 · 종합 시사점 총평
              </p>
            </div>
          </div>

          <div className="toc-card-row">
            <span className="toc-card-num">06</span>
            <div className="toc-card-content">
              <h3 className="toc-card-title">이 자료 안내</h3>
              <p className="toc-card-desc">
                현장 카탈로그 디지털 아카이빙 및 부록 안내 · 마무리 현장 스케치 사진 · 운영사 및 문의처
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
      <article className="a4-sheet" id="print-ch01">
        {/* 01 CHAPTER HEADER */}
        <header className="chapter-header">
          <span className="chapter-number">01</span>
          <h2 className="chapter-title">박람회 개요</h2>
        </header>

        {/* BASIC INFO TABLE */}
        <table className="landscape-table" style={{ margin: "10px 0" }}>
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
          <div className="metrics-grid">
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
          <div className="callout-box warning">
            <div className="callout-box-title">
              <span>💡 {ch01.noteCallout.title || "참고사항"}</span>
            </div>
            <div>{ch01.noteCallout.content}</div>
          </div>
        )}

        {/* SKETCHES (4-Grid) */}
        {ch01.sketches.length > 0 && (
          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, margin: "12px 0 6px", color: "var(--color-primary)" }}>
              📸 현장 스케치 — 도착부터 전시장 초입까지
            </h3>
            <div className="sketch-grid-4">
              {ch01.sketches.map((sk) => (
                <div key={sk.id} className="sketch-card">
                  {sk.photoUrl ? (
                    <img src={sk.photoUrl} alt={sk.caption} className="sketch-img" />
                  ) : (
                    <div className="sketch-img" style={{ background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: "0.75rem" }}>
                      사진 미등록
                    </div>
                  )}
                  <div className="sketch-caption">{sk.caption}</div>
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
          SHEET 3: 02 HIGHLIGHTS
          ======================================================== */}
      <article className="a4-sheet" id="print-ch02">
        <header className="chapter-header">
          <span className="chapter-number">02</span>
          <h2 className="chapter-title">현장 하이라이트</h2>
        </header>

        {ch02.zoneSummary && (
          <p className="section-intro-text">{ch02.zoneSummary}</p>
        )}

        {/* DAY CARDS */}
        {ch02.days.map((day) => (
          <div key={day.id} className="day-card">
            <div className="day-card-header">
              <span className="day-card-title">{day.dayLabel}</span>
              <span className="day-card-theme">{day.theme}</span>
            </div>
            <ul className="day-card-list">
              {day.sessions.map((sess, sIdx) => (
                <li key={sIdx}>{sess}</li>
              ))}
            </ul>
          </div>
        ))}

        {ch02.b2bSummary && (
          <div className="callout-box" style={{ margin: "14px 0" }}>
            <strong style={{ display: "block", marginBottom: "4px" }}>🤝 B2B 상담 및 부대 프로그램 성과</strong>
            <span>{ch02.b2bSummary}</span>
          </div>
        )}

        {ch02.sketches.length > 0 && (
          <div style={{ marginTop: "14px" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, margin: "10px 0 6px", color: "var(--color-primary)" }}>
              📸 현장 스케치 — 로봇 데모존 & 체험존
            </h3>
            <div className="sketch-grid-4">
              {ch02.sketches.map((sk) => (
                <div key={sk.id} className="sketch-card">
                  {sk.photoUrl ? (
                    <img src={sk.photoUrl} alt={sk.caption} className="sketch-img" />
                  ) : (
                    <div className="sketch-img" style={{ background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8" }}>
                      사진 미등록
                    </div>
                  )}
                  <div className="sketch-caption">{sk.caption}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="sheet-page-footer">
          <span>- 4 -</span>
        </footer>
      </article>

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
          <span>- 5 -</span>
        </footer>
      </article>

      {/* ========================================================
      {/* ========================================================
          SHEET 5: 04 PICKS - PAGE 1
          ======================================================== */}
      <article className="a4-sheet" id="print-ch04-p1">
        <header className="chapter-header">
          <span className="chapter-number">04</span>
          <h2 className="chapter-title">주목할 부스 기업 Pick</h2>
        </header>

        <p className="section-intro-text">{ch04.intro}</p>

        <div className="picks-container">
          {ch04.companies.slice(0, Math.ceil(ch04.companies.length / 2)).map((comp, idx) => (
            <div key={comp.id} className="pick-card">
              <div className="pick-card-header">
                <span className="pick-card-title">
                  #{idx + 1} {comp.name}
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
          ))}
        </div>

        <footer className="sheet-page-footer">
          <span>- 6 -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET 6: 04 PICKS - PAGE 2
          ======================================================== */}
      <article className="a4-sheet" id="print-ch04-p2">
        <header className="chapter-header">
          <span className="chapter-number">04</span>
          <h2 className="chapter-title">주목할 부스 기업 Pick (계속)</h2>
        </header>

        <div className="picks-container">
          {ch04.companies.slice(Math.ceil(ch04.companies.length / 2)).map((comp, idx) => {
            const actualIdx = Math.ceil(ch04.companies.length / 2) + idx;
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
          <span>- 7 -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET 7: 05 TRENDS - PAGE 1
          ======================================================== */}
      <article className="a4-sheet" id="print-ch05-p1">
        <header className="chapter-header">
          <span className="chapter-number">05</span>
          <h2 className="chapter-title">산업 동향 리포트</h2>
        </header>

        <p className="section-intro-text">{ch05.intro}</p>

        <div className="trends-container">
          {ch05.trends.slice(0, ch05.trends.length <= 4 ? Math.ceil(ch05.trends.length / 2) : 3).map((tr) => (
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

        <footer className="sheet-page-footer">
          <span>- 8 -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET 8: 05 TRENDS - PAGE 2
          ======================================================== */}
      <article className="a4-sheet" id="print-ch05-p2">
        <header className="chapter-header">
          <span className="chapter-number">05</span>
          <h2 className="chapter-title">산업 동향 리포트 (계속)</h2>
        </header>

        <div className="trends-container">
          {ch05.trends.slice(ch05.trends.length <= 4 ? Math.ceil(ch05.trends.length / 2) : 3).map((tr) => (
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

        {/* CONCLUSION BOX */}
        {ch05.conclusion && (
          <div className="conclusion-box">
            <div className="conclusion-title">📌 [종합] 현장에서 확인한 것 & 핵심 시사점</div>
            <p>{ch05.conclusion}</p>
          </div>
        )}

        <footer className="sheet-page-footer">
          <span>- 9 -</span>
        </footer>
      </article>

      {/* ========================================================
          SHEET 7: 06 GUIDE & ARCHIVE (이 자료 안내)
          ======================================================== */}
      <article className="a4-sheet" id="print-ch06">
        <header className="chapter-header">
          <span className="chapter-number">06</span>
          <h2 className="chapter-title">이 자료 안내</h2>
        </header>

        <p className="section-intro-text">{ch06.intro}</p>

        {ch06.sketches.length > 0 && (
          <div style={{ margin: "16px 0" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, margin: "10px 0 6px", color: "var(--color-primary)" }}>
              📸 현장 스케치 — 언어 기술 데모 & 하루의 마무리
            </h3>
            <div className="sketch-grid-4">
              {ch06.sketches.map((sk) => (
                <div key={sk.id} className="sketch-card">
                  {sk.photoUrl ? (
                    <img src={sk.photoUrl} alt={sk.caption} className="sketch-img" />
                  ) : (
                    <div className="sketch-img" style={{ background: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8" }}>
                      사진 미등록
                    </div>
                  )}
                  <div className="sketch-caption">{sk.caption}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Box & Contact matching Original PDF */}
        <div className="guide-service-box">
          <h3 className="guide-service-title">{ch06.serviceTitle || "카탈로그익스프레스 소개"}</h3>
          <p className="guide-service-desc">{ch06.serviceDesc}</p>

          {ch06.slogan && (
            <div className="guide-slogan-highlight">
              {ch06.slogan}
            </div>
          )}

          <div className="guide-contact-block">
            <h4 className="guide-contact-heading">문의</h4>
            <div className="guide-contact-row">
              <span className="contact-label">이메일</span>
              <span className="contact-val">{ch06.contactEmail || "contact@catalogexpress.kr"}</span>
            </div>
            <div className="guide-contact-row">
              <span className="contact-label">홈페이지</span>
              <span className="contact-val">{ch06.website || "catalogexpress.kr"}</span>
            </div>
            <div className="guide-contact-row">
              <span className="contact-label">운영사</span>
              <span className="contact-val">{ch06.companyName || "영팩토리얼 주식회사"}</span>
            </div>
          </div>
        </div>

        <footer className="sheet-page-footer">
          <span>- 10 -</span>
        </footer>
      </article>
    </main>
  );
};
