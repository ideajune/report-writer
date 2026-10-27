import { ExhibitionReportDoc, ReportRevisionMeta, ReportRevisionSnapshot, RevisionInfo } from "@/types/report";

const REV_INDEX_PREFIX = "exhi_rev_index_";
const REV_SNAP_PREFIX = "exhi_rev_snap_";
const ACTIVE_REV_PREFIX = "exhi_active_rev_";

/**
 * 전시회 ID별 차수 메타데이터 목록 조회
 */
export function getRevisions(exhibitionId: string, fallbackDoc?: ExhibitionReportDoc): ReportRevisionMeta[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${REV_INDEX_PREFIX}${exhibitionId}`);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch (e) {
    console.error("Failed to load revisions for", exhibitionId, e);
  }

  // 아직 저장된 차수가 없는 경우, 초기 1차 자동 생성
  if (fallbackDoc) {
    return initFirstRevision(exhibitionId, fallbackDoc);
  }
  return [];
}

/**
 * 초기 1차 버전 시드 생성
 */
export function initFirstRevision(exhibitionId: string, doc: ExhibitionReportDoc): ReportRevisionMeta[] {
  if (typeof window === "undefined") return [];
  
  const initialRev: ReportRevisionMeta = {
    revisionId: `rev-${exhibitionId}-v1`,
    exhibitionId,
    versionNumber: 1,
    versionLabel: "1차",
    memoKeyword: doc.cover.revisionInfo?.memoKeyword || "현장 수집 및 보고서 기본 초안",
    savedAt: doc.updatedAt ? `${doc.updatedAt} 10:00` : new Date().toISOString().replace("T", " ").substring(0, 16),
    showOnCover: doc.cover.revisionInfo?.showOnCover ?? false,
  };

  const docWithRev: ExhibitionReportDoc = {
    ...doc,
    cover: {
      ...doc.cover,
      revisionInfo: {
        versionNumber: initialRev.versionNumber,
        versionLabel: initialRev.versionLabel,
        memoKeyword: initialRev.memoKeyword,
        showOnCover: initialRev.showOnCover,
      },
    },
  };

  try {
    localStorage.setItem(`${REV_INDEX_PREFIX}${exhibitionId}`, JSON.stringify([initialRev]));
    localStorage.setItem(`${REV_SNAP_PREFIX}${exhibitionId}_${initialRev.revisionId}`, JSON.stringify(docWithRev));
    localStorage.setItem(`${ACTIVE_REV_PREFIX}${exhibitionId}`, initialRev.revisionId);
  } catch (e) {
    console.error("Failed to init first revision", e);
  }

  return [initialRev];
}

/**
 * 새 차수로 저장 (스냅샷 생성)
 */
export function saveNewRevision(
  exhibitionId: string,
  doc: ExhibitionReportDoc,
  memoKeyword: string,
  customLabel?: string,
  showOnCover: boolean = false
): { updatedDoc: ExhibitionReportDoc; revision: ReportRevisionMeta } {
  const currentList = getRevisions(exhibitionId, doc);
  
  // 가장 높은 versionNumber 탐색
  const maxVersion = currentList.reduce((max, item) => Math.max(max, item.versionNumber || 0), 0);
  const nextVersion = maxVersion + 1;
  const label = customLabel?.trim() ? customLabel.trim() : `${nextVersion}차`;
  const keyword = memoKeyword?.trim() ? memoKeyword.trim() : "수정 보완본";

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const newRevision: ReportRevisionMeta = {
    revisionId: `rev-${exhibitionId}-v${nextVersion}-${Date.now()}`,
    exhibitionId,
    versionNumber: nextVersion,
    versionLabel: label,
    memoKeyword: keyword,
    savedAt: dateStr,
    showOnCover,
  };

  const updatedDoc: ExhibitionReportDoc = {
    ...doc,
    updatedAt: dateStr.split(" ")[0],
    cover: {
      ...doc.cover,
      revisionInfo: {
        versionNumber: nextVersion,
        versionLabel: label,
        memoKeyword: keyword,
        showOnCover,
      },
    },
  };

  try {
    const updatedList = [newRevision, ...currentList];
    localStorage.setItem(`${REV_INDEX_PREFIX}${exhibitionId}`, JSON.stringify(updatedList));
    localStorage.setItem(`${REV_SNAP_PREFIX}${exhibitionId}_${newRevision.revisionId}`, JSON.stringify(updatedDoc));
    localStorage.setItem(`${ACTIVE_REV_PREFIX}${exhibitionId}`, newRevision.revisionId);
  } catch (e) {
    console.error("Failed to save new revision", e);
  }

  return { updatedDoc, revision: newRevision };
}

/**
 * 현재 활성 차수 업데이트 저장 (현재 페이지/에디터 수정사항 덮어쓰기 저장)
 */
export function saveCurrentRevision(
  exhibitionId: string,
  doc: ExhibitionReportDoc
): { updatedDoc: ExhibitionReportDoc; revision: ReportRevisionMeta } {
  if (typeof window === "undefined") {
    return {
      updatedDoc: doc,
      revision: {
        revisionId: `rev-${exhibitionId}-v1`,
        exhibitionId,
        versionNumber: doc.cover.revisionInfo?.versionNumber || 1,
        versionLabel: doc.cover.revisionInfo?.versionLabel || "1차",
        memoKeyword: doc.cover.revisionInfo?.memoKeyword || "현장 수집 및 보고서 기본 초안",
        savedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
        showOnCover: doc.cover.revisionInfo?.showOnCover ?? false,
      },
    };
  }

  const currentList = getRevisions(exhibitionId, doc);
  const activeId = getActiveRevisionId(exhibitionId);

  // 대상 차수 매칭: 1) activeId와 일치 2) doc.cover.revisionInfo.versionNumber와 일치 3) 첫 번째 항목
  let targetIndex = -1;
  if (activeId) {
    targetIndex = currentList.findIndex((item) => item.revisionId === activeId);
  }
  if (targetIndex === -1 && doc.cover.revisionInfo?.versionNumber) {
    targetIndex = currentList.findIndex(
      (item) => item.versionNumber === doc.cover.revisionInfo?.versionNumber
    );
  }
  if (targetIndex === -1 && currentList.length > 0) {
    targetIndex = 0;
  }

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  let targetRev: ReportRevisionMeta;
  if (targetIndex !== -1) {
    targetRev = {
      ...currentList[targetIndex],
      savedAt: dateStr,
      memoKeyword: doc.cover.revisionInfo?.memoKeyword || currentList[targetIndex].memoKeyword || "수정 업데이트",
      versionLabel: doc.cover.revisionInfo?.versionLabel || currentList[targetIndex].versionLabel || `${currentList[targetIndex].versionNumber}차`,
      showOnCover: doc.cover.revisionInfo?.showOnCover ?? currentList[targetIndex].showOnCover ?? false,
    };
    currentList[targetIndex] = targetRev;
  } else {
    // 저장된 차수 목록이 없던 경우 초기 1차 생성 후 진행
    const initList = initFirstRevision(exhibitionId, doc);
    targetRev = {
      ...initList[0],
      savedAt: dateStr,
    };
    currentList.push(targetRev);
  }

  const updatedDoc: ExhibitionReportDoc = {
    ...doc,
    updatedAt: dateStr.split(" ")[0],
    cover: {
      ...doc.cover,
      revisionInfo: {
        versionNumber: targetRev.versionNumber,
        versionLabel: targetRev.versionLabel,
        memoKeyword: targetRev.memoKeyword,
        showOnCover: targetRev.showOnCover,
      },
    },
  };

  try {
    localStorage.setItem(`${REV_INDEX_PREFIX}${exhibitionId}`, JSON.stringify(currentList));
    localStorage.setItem(`${REV_SNAP_PREFIX}${exhibitionId}_${targetRev.revisionId}`, JSON.stringify(updatedDoc));
    localStorage.setItem(`${ACTIVE_REV_PREFIX}${exhibitionId}`, targetRev.revisionId);
    localStorage.setItem(`exhi_doc_${exhibitionId}`, JSON.stringify(updatedDoc));
    localStorage.setItem("exhi_current_report_draft_v9", JSON.stringify(updatedDoc));
  } catch (e) {
    console.error("Failed to save current revision", e);
  }

  return { updatedDoc, revision: targetRev };
}

/**
 * 특정 차수의 스냅샷 문서 원본 로드
 */
export function getRevisionSnapshot(exhibitionId: string, revisionId: string): ExhibitionReportDoc | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${REV_SNAP_PREFIX}${exhibitionId}_${revisionId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to load revision snapshot", revisionId, e);
  }
  return null;
}

/**
 * 활성 차수 ID 가져오기
 */
export function getActiveRevisionId(exhibitionId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`${ACTIVE_REV_PREFIX}${exhibitionId}`);
}

/**
 * 활성 차수 ID 설정하기
 */
export function setActiveRevisionId(exhibitionId: string, revisionId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${ACTIVE_REV_PREFIX}${exhibitionId}`, revisionId);
}

/**
 * 차수 삭제
 */
export function deleteRevision(exhibitionId: string, revisionId: string): ReportRevisionMeta[] {
  if (typeof window === "undefined") return [];
  try {
    const currentList = getRevisions(exhibitionId);
    if (currentList.length <= 1) {
      alert("최소 1개의 차수는 유지되어야 합니다.");
      return currentList;
    }
    const filtered = currentList.filter((item) => item.revisionId !== revisionId);
    localStorage.setItem(`${REV_INDEX_PREFIX}${exhibitionId}`, JSON.stringify(filtered));
    localStorage.removeItem(`${REV_SNAP_PREFIX}${exhibitionId}_${revisionId}`);

    // 삭제된 차수가 현재 활성 차수였다면 첫 번째 차수로 자동 변경
    const activeId = getActiveRevisionId(exhibitionId);
    if (activeId === revisionId && filtered.length > 0) {
      setActiveRevisionId(exhibitionId, filtered[0].revisionId);
    }
    return filtered;
  } catch (e) {
    console.error("Failed to delete revision", e);
    return [];
  }
}
