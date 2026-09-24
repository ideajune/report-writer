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
