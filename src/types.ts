export interface PicoData {
  population: string;
  intervention: string;
  comparison: string;
  outcome: string;
  researchQuestion: string;
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  searchQuery: string;
}

export interface LiteratureRecord {
  pmid: string;
  title: string;
  abstract: string;
  journal: string;
  pub_date: string;
  authors: string;
  doi?: string;
  decision?: 'INCLUDE' | 'EXCLUDE' | 'UNCERTAIN';
  reason?: string;
  confidence?: number;
  tags?: string[];
  manualOverride?: boolean;
}

export interface ScreeningStats {
  total: number;
  included: number;
  excluded: number;
  uncertain: number;
  progressPercent?: number;
}

export interface SynthesisSection {
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface SynthesisReport {
  title: string;
  executiveSummary: string;
  picoSummary: {
    population: string;
    intervention: string;
    comparison: string;
    outcome: string;
  };
  searchStrategy: string;
  screeningResults: {
    totalRecords: number;
    includedCount: number;
    excludedCount: number;
    uncertainCount: number;
    summary: string;
  };
  themes: {
    themeName: string;
    description: string;
    supportingArticles: string[]; // PMIDs
    findings: string;
  }[];
  criticalAnalysis: string;
  limitations: string;
  conclusion: string;
  references: {
    pmid: string;
    citation: string;
    authors: string;
    title: string;
    journal: string;
    year: string;
  }[];
}

export interface ReviewProject {
  id: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  pico: PicoData;
  rawRecords: LiteratureRecord[];
  screenedRecords: LiteratureRecord[];
  synthesisReport?: SynthesisReport | null;
  synthesis?: SynthesisReport | null;
  status: 'draft' | 'query_ready' | 'records_fetched' | 'screening_in_progress' | 'screened' | 'synthesizing' | 'completed';
}

export interface PicoTemplate {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  defaultPico: Partial<PicoData>;
}
