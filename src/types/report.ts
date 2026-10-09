export interface RevisionInfo {
  versionNumber: number; // 예: 1, 2, 3
  versionLabel: string;  // 예: "1차", "2차 개정본", "최종본"
  memoKeyword?: string;  // 간단 키워드 메모 (예: "산업동향 심층 보강본")
  showOnCover?: boolean; // 표지에 차수 및 키워드 메모 출력/미출력 선택 옵션
}

export interface ReportRevisionMeta {
  revisionId: string;    // 예: "rev-1728198000000"
  exhibitionId: string;  // 예: "report-ai-festa-2026"
  versionNumber: number;
  versionLabel: string;
  memoKeyword: string;
  savedAt: string;       // 예: "2026-10-06 15:30"
  showOnCover: boolean;  // 표지 출력 여부
}

export interface ReportRevisionSnapshot extends ReportRevisionMeta {
  doc: ExhibitionReportDoc;
}

export interface ReportCover {
  title: string;
  subtitle: string;
  dateRange: string;
  location: string;
  department: string;
  author: string;
  publisher: string;
  issueDate: string;
  contactEmail: string;
  website: string;
  revisionInfo?: RevisionInfo;
}

export interface MetricItem {
  label: string;
  value: string;
  growthBadge?: string;
  subText?: string;
}

export interface PhotoSketch {
  id: string;
  photoUrl: string;
  caption: string;
}

export interface Ch01Overview {
  eventName: string;
  dates: string;
  location: string;
  edition: string;
  host: string;
  organizer: string;
  supporters: string;
  metrics: MetricItem[];
  sourceNote: string;
  noteCallout: {
    title: string;
    content: string;
  };
  sketches: PhotoSketch[];
}

export interface HighlightDay {
  id: string;
  dayLabel: string;
  theme: string;
  sessions: string[];
}

export interface Ch02Highlights {
  zoneSummary: string;
  days: HighlightDay[];
  b2bSummary: string;
  sketches: PhotoSketch[];
}

export interface LandscapeField {
  id: string;
  category: string;
  companies: string;
}

export interface Ch03Landscape {
  intro: string;
  fields: LandscapeField[];
  source: string;
}

export interface PickCompany {
  id: string;
  name: string;
  profile: string;
  whyPick: string;
  source: string;
  photoUrl?: string;
}

export interface Ch04Picks {
  intro: string;
  companies: PickCompany[];
}

export interface FactCheckItem {
  title: string;
  content: string;
}

export interface TrendItem {
  id: string;
  number: string;
  title: string;
  content: string;
  factCheck?: FactCheckItem;
  source: string;
}

export interface Ch05Trends {
  intro: string;
  trends: TrendItem[];
  conclusion: string;
}

export interface Ch06Guide {
  intro: string;
  sketches: PhotoSketch[];
  serviceTitle: string;
  serviceDesc: string;
  slogan: string;
  contactEmail: string;
  website: string;
  companyName: string;
}

export interface ExhibitionReportDoc {
  id: string;
  cover: ReportCover;
  ch01: Ch01Overview;
  ch02: Ch02Highlights;
  ch03: Ch03Landscape;
  ch04: Ch04Picks;
  ch05: Ch05Trends;
  ch06: Ch06Guide;
  updatedAt: string;
}
