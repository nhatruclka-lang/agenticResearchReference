import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardHome } from './components/DashboardHome';
import { PicoDefinitionView } from './components/PicoDefinitionView';
import { ScreeningWorkbench } from './components/ScreeningWorkbench';
import { SynthesisReportView } from './components/SynthesisReportView';
import { AnalyticsPrismaView } from './components/AnalyticsPrismaView';
import { SettingsView } from './components/SettingsView';
import { UserGuideView } from './components/UserGuideView';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { TemplateModal } from './components/TemplateModal';
import { PICO_TEMPLATES, INITIAL_RECENT_REVIEWS } from './data/sampleReviews';
import { PicoData, LiteratureRecord, SynthesisReport, ScreeningStats, ReviewProject, PicoTemplate } from './types';
import { useLanguage } from './context/LanguageContext';

export function App() {
  const { t, language } = useLanguage();

  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Core Pipeline State
  const [pico, setPico] = useState<PicoData>(PICO_TEMPLATES[0].defaultPico);
  const [records, setRecords] = useState<LiteratureRecord[]>([]);
  const [synthesisReport, setSynthesisReport] = useState<SynthesisReport | null>(null);
  const [recentProjects, setRecentProjects] = useState<ReviewProject[]>(INITIAL_RECENT_REVIEWS);

  // Status & Progress Loaders
  const [isExtractingPico, setIsExtractingPico] = useState<boolean>(false);
  const [isIngesting, setIsIngesting] = useState<boolean>(false);
  const [isScreening, setIsScreening] = useState<boolean>(false);
  const [currentScreeningIndex, setCurrentScreeningIndex] = useState<number>(0);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  // Modals
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState<LiteratureRecord | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);

  // Computed Screening Statistics
  const includedRecords = records.filter((r) => r.decision === 'INCLUDE');
  const excludedRecords = records.filter((r) => r.decision === 'EXCLUDE');
  const uncertainRecords = records.filter((r) => r.decision === 'UNCERTAIN');

  const screeningStats: ScreeningStats = {
    total: records.length,
    included: includedRecords.length,
    excluded: excludedRecords.length,
    uncertain: uncertainRecords.length,
  };

  // 1. Module 1: AI Auto-Extract PICO & Query
  const handleExtractPicoWithAI = async (topic: string) => {
    if (!topic.trim()) return;
    setIsExtractingPico(true);
    try {
      const response = await fetch('/api/pico/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to extract PICO parameters');
      }

      const data = await response.json();
      setPico({
        researchQuestion: data.researchQuestion || topic,
        population: data.population || '',
        intervention: data.intervention || '',
        comparison: data.comparison || '',
        outcome: data.outcome || '',
        inclusionCriteria: data.inclusionCriteria || [],
        exclusionCriteria: data.exclusionCriteria || [],
        searchQuery: data.searchQuery || '',
      });
    } catch (err) {
      console.error('PICO extraction error:', err);
    } finally {
      setIsExtractingPico(false);
    }
  };

  // 2. Module 2 & 3: Run Ingestion and AI Screening Pipeline
  const handleRunScreeningPipeline = async () => {
    if (!pico.searchQuery) return;
    setIsIngesting(true);
    setActiveTab('screening');

    try {
      // Step A: Ingest records from PubMed API
      const searchRes = await fetch('/api/pubmed/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: pico.searchQuery, limit: 25 }),
      });

      if (!searchRes.ok) {
        throw new Error('PubMed query execution failed');
      }

      const searchData = await searchRes.json();
      const rawRecords: LiteratureRecord[] = searchData.records || [];
      setRecords(rawRecords);
      setIsIngesting(false);

      if (rawRecords.length === 0) {
        return;
      }

      // Step B: Sequentially screen records with Gemini
      setIsScreening(true);
      const updatedList = [...rawRecords];

      for (let i = 0; i < updatedList.length; i++) {
        setCurrentScreeningIndex(i);
        const item = updatedList[i];
        try {
          const screenRes = await fetch('/api/screening/screen-record', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ record: item, pico, language }),
          });

          if (screenRes.ok) {
            const screenData = await screenRes.json();
            updatedList[i] = {
              ...item,
              decision: screenData.decision,
              reason: screenData.reason,
              confidence: screenData.confidence,
            };
            setRecords([...updatedList]);
          }
        } catch (screenErr) {
          console.error(`Error screening record ${item.pmid}:`, screenErr);
        }
      }
    } catch (err) {
      console.error('Pipeline error:', err);
    } finally {
      setIsIngesting(false);
      setIsScreening(false);
    }
  };

  // Batch re-screen all records
  const handleScreenAllRecords = async () => {
    if (records.length === 0) return;
    setIsScreening(true);
    const updatedList = [...records];

    for (let i = 0; i < updatedList.length; i++) {
      setCurrentScreeningIndex(i);
      const item = updatedList[i];
      try {
        const screenRes = await fetch('/api/screening/screen-record', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ record: item, pico, language }),
        });

        if (screenRes.ok) {
          const screenData = await screenRes.json();
          updatedList[i] = {
            ...item,
            decision: screenData.decision,
            reason: screenData.reason,
            confidence: screenData.confidence,
          };
          setRecords([...updatedList]);
        }
      } catch (screenErr) {
        console.error(`Error screening record ${item.pmid}:`, screenErr);
      }
    }
    setIsScreening(false);
  };

  // Screen single record
  const handleScreenSingleRecord = async (record: LiteratureRecord) => {
    try {
      const screenRes = await fetch('/api/screening/screen-record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ record, pico, language }),
      });

      if (screenRes.ok) {
        const screenData = await screenRes.json();
        setRecords((prev) =>
          prev.map((r) =>
            r.pmid === record.pmid
              ? {
                  ...r,
                  decision: screenData.decision,
                  reason: screenData.reason,
                  confidence: screenData.confidence,
                }
              : r
          )
        );
      }
    } catch (err) {
      console.error('Error screening single record:', err);
    }
  };

  // Manual Decision Override
  const handleUpdateDecision = (
    pmid: string,
    decision: 'INCLUDE' | 'EXCLUDE' | 'UNCERTAIN',
    reason?: string
  ) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.pmid === pmid
          ? {
              ...r,
              decision,
              reason: reason || r.reason || `Manual override to ${decision}`,
              manualOverride: true,
            }
          : r
      )
    );
  };

  // 3. Module 4: Synthesis Generation
  const handleGenerateSynthesis = async () => {
    const included = records.filter((r) => r.decision === 'INCLUDE');
    if (included.length === 0) return;

    setIsSynthesizing(true);
    try {
      const response = await fetch('/api/synthesis/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pico, records: included, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate synthesis');
      }

      const data = await response.json();
      setSynthesisReport(data.report);
      setActiveTab('synthesis');
    } catch (err) {
      console.error('Synthesis generation error:', err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Export .docx Download
  const handleDownloadDocx = async () => {
    if (!synthesisReport) return;
    try {
      const response = await fetch('/api/report/docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report: synthesisReport,
          pico,
          screeningStats,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create docx report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Tong_quan_tai_lieu.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Docx download error:', err);
    }
  };

  // Export CSV Helper
  const downloadCsv = async (filename: string, dataset: any[]) => {
    try {
      const res = await fetch('/api/export/csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: dataset, filename }),
      });

      if (!res.ok) throw new Error('CSV generation failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err);
    }
  };

  // Template and Project Selectors
  const handleSelectTemplate = (template: PicoTemplate) => {
    setPico(template.defaultPico as PicoData);
    setActiveTab('new-review');
  };

  const handleOpenProject = (project: ReviewProject) => {
    if (project.pico) setPico(project.pico);
    if (project.rawRecords && project.rawRecords.length > 0) {
      setRecords(project.rawRecords);
    }
    if (project.synthesis) {
      setSynthesisReport(project.synthesis);
      setActiveTab('synthesis');
    } else {
      setActiveTab('new-review');
    }
  };

  // Compute total screened across demo & active
  const totalArticlesScreened = 1420 + records.length;
  const totalPicoTagsApplied = 4892 + (records.length * 4);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeReviewsCount={recentProjects.length}
        currentProjectTopic={pico.researchQuestion || pico.population}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header
          searchQuery={globalSearch}
          setSearchQuery={setGlobalSearch}
          activeTab={activeTab}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenHelp={() => setActiveTab('guide')}
        />

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#c3c6d7] p-4 space-y-2 z-30 shadow-md">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded-lg text-xs font-semibold text-[#131b2e] hover:bg-blue-50"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => { setActiveTab('new-review'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded-lg text-xs font-semibold text-[#004ac6] hover:bg-blue-50"
            >
              {t.nav.module1}
            </button>
            <button
              onClick={() => { setActiveTab('screening'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded-lg text-xs font-semibold text-[#131b2e] hover:bg-blue-50"
            >
              {t.nav.module2}
            </button>
            <button
              onClick={() => { setActiveTab('synthesis'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded-lg text-xs font-semibold text-[#131b2e] hover:bg-blue-50"
            >
              {t.nav.module3}
            </button>
            <button
              onClick={() => { setActiveTab('analytics'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded-lg text-xs font-semibold text-[#131b2e] hover:bg-blue-50"
            >
              {t.nav.analytics}
            </button>
            <button
              onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded-lg text-xs font-semibold text-[#131b2e] hover:bg-blue-50"
            >
              {t.nav.settings}
            </button>
            <button
              onClick={() => { setActiveTab('guide'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2 rounded-lg text-xs font-semibold text-[#004ac6] hover:bg-blue-50"
            >
              {t.nav.guide}
            </button>
          </div>
        )}

        {/* Dynamic View Switcher */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === 'home' && (
            <DashboardHome
              onStartNewReview={() => setActiveTab('new-review')}
              onSelectTemplate={handleSelectTemplate}
              onOpenCustomTemplateModal={() => setIsTemplateModalOpen(true)}
              onOpenProject={handleOpenProject}
              onOpenGuide={() => setActiveTab('guide')}
              recentProjects={recentProjects}
              totalArticlesScreened={totalArticlesScreened}
              totalPicoTagsApplied={totalPicoTagsApplied}
            />
          )}

          {activeTab === 'new-review' && (
            <PicoDefinitionView
              pico={pico}
              setPico={setPico}
              onExtractWithAI={handleExtractPicoWithAI}
              onRunScreening={handleRunScreeningPipeline}
              isLoading={isExtractingPico || isIngesting || isScreening}
              onSelectTemplate={handleSelectTemplate}
            />
          )}

          {activeTab === 'screening' && (
            <ScreeningWorkbench
              records={records}
              pico={pico}
              screeningStats={screeningStats}
              isIngesting={isIngesting}
              isScreening={isScreening}
              currentScreeningIndex={currentScreeningIndex}
              onScreenAllRecords={handleScreenAllRecords}
              onScreenSingleRecord={handleScreenSingleRecord}
              onUpdateDecision={handleUpdateDecision}
              onExportRawCsv={() => downloadCsv('records_raw.csv', records)}
              onExportScreeningCsv={() => downloadCsv('checkpoint1_screening.csv', records)}
              onProceedToSynthesis={handleGenerateSynthesis}
              onViewRecordDetail={(rec) => setSelectedRecordForDetail(rec)}
            />
          )}

          {activeTab === 'synthesis' && (
            <SynthesisReportView
              report={synthesisReport}
              pico={pico}
              includedRecords={includedRecords}
              screeningStats={screeningStats}
              isSynthesizing={isSynthesizing}
              onGenerateSynthesis={handleGenerateSynthesis}
              onDownloadDocx={handleDownloadDocx}
              onDownloadRawCsv={() => downloadCsv('records_raw.csv', records)}
              onDownloadScreeningCsv={() => downloadCsv('checkpoint1_screening.csv', records)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPrismaView
              records={records}
              stats={screeningStats}
              pico={pico}
            />
          )}

          {activeTab === 'settings' && <SettingsView />}

          {activeTab === 'guide' && (
            <UserGuideView onNavigateToTab={(tab) => setActiveTab(tab)} />
          )}
        </main>
      </div>

      {/* Detail Modal */}
      {selectedRecordForDetail && (
        <ArticleDetailModal
          record={selectedRecordForDetail}
          pico={pico}
          onClose={() => setSelectedRecordForDetail(null)}
          onUpdateDecision={handleUpdateDecision}
        />
      )}

      {/* Template Modal */}
      {isTemplateModalOpen && (
        <TemplateModal
          isOpen={isTemplateModalOpen}
          onClose={() => setIsTemplateModalOpen(false)}
          onSelectTemplate={handleSelectTemplate}
        />
      )}
    </div>
  );
}
export default App;
