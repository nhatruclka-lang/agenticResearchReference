import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  RefreshCw, 
  FileSpreadsheet, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  ExternalLink, 
  Printer, 
  Share2, 
  Check, 
  Copy,
  AlertCircle,
  Clock
} from 'lucide-react';
import { SynthesisReport, PicoData, LiteratureRecord, ScreeningStats } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SynthesisReportViewProps {
  report: SynthesisReport | null | undefined;
  pico: PicoData;
  includedRecords: LiteratureRecord[];
  screeningStats: ScreeningStats;
  isSynthesizing: boolean;
  onGenerateSynthesis: () => Promise<void>;
  onDownloadDocx: () => void;
  onDownloadRawCsv: () => void;
  onDownloadScreeningCsv: () => void;
}

export const SynthesisReportView: React.FC<SynthesisReportViewProps> = ({
  report,
  pico,
  includedRecords,
  screeningStats,
  isSynthesizing,
  onGenerateSynthesis,
  onDownloadDocx,
  onDownloadRawCsv,
  onDownloadScreeningCsv,
}) => {
  const { t, language } = useLanguage();
  const [copiedCitation, setCopiedCitation] = useState<number | null>(null);

  const handleCopyCitation = (citation: string, index: number) => {
    navigator.clipboard.writeText(citation);
    setCopiedCitation(index);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-[#004ac6]">
              {t.synthesis.badge}
            </span>
            <span className="text-xs font-medium text-[#505f76]">
              {t.synthesis.subHeader}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
            {t.synthesis.title}
          </h1>
        </div>

        {/* Export and Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {report && (
            <>
              <button
                id="btn-download-docx"
                onClick={onDownloadDocx}
                className="px-4 py-2 bg-[#004ac6] hover:bg-[#003ea8] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-blue-200" />
                <span>{t.synthesis.downloadDocx}</span>
              </button>

              <button
                onClick={onDownloadScreeningCsv}
                className="px-3 py-2 bg-white border border-[#c3c6d7] hover:bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                title="Download checkpoint1_screening.csv"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#006242]" />
                <span>checkpoint1.csv</span>
              </button>

              <button
                onClick={handlePrint}
                className="p-2 bg-white border border-[#c3c6d7] hover:bg-[#f2f3ff] text-[#505f76] rounded-xl transition-all shadow-2xs cursor-pointer"
                title={t.synthesis.printOrPdf}
              >
                <Printer className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            id="btn-re-synthesize"
            onClick={onGenerateSynthesis}
            disabled={isSynthesizing || includedRecords.length === 0}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#004ac6] border border-blue-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSynthesizing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{report ? t.synthesis.reGenerateBtn : t.synthesis.generateBtn}</span>
          </button>
        </div>
      </div>

      {/* Synthesis State Notice */}
      {!report && !isSynthesizing && (
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-8 md:p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#004ac6] flex items-center justify-center mx-auto shadow-sm">
            <FileText className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-[#131b2e] mb-2">
              {t.synthesis.readyNoticeTitle} {includedRecords.length} {t.synthesis.articlesSelected}
            </h2>
            <p className="text-xs text-[#505f76] leading-relaxed">
              {t.synthesis.readyNoticeDesc}
            </p>
          </div>

          <div className="pt-2">
            <button
              id="btn-start-synthesis-initial"
              onClick={onGenerateSynthesis}
              disabled={includedRecords.length === 0}
              className="bg-[#004ac6] hover:bg-[#003ea8] disabled:bg-slate-300 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-sm inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>{t.synthesis.generateSynthesisBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Loading Skeleton during Synthesis */}
      {isSynthesizing && (
        <div className="bg-white rounded-2xl border border-blue-200 p-8 text-center space-y-4 shadow-sm">
          <RefreshCw className="w-10 h-10 text-[#004ac6] animate-spin mx-auto" />
          <div>
            <h3 className="text-base font-bold text-[#131b2e]">
              {t.synthesis.loadingTitle}
            </h3>
            <p className="text-xs text-[#505f76] mt-1">
              {t.synthesis.loadingDesc}
            </p>
          </div>
        </div>
      )}

      {/* Rendered Academic Document Report (Times New Roman layout) */}
      {report && (
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 shadow-md overflow-hidden">
          {/* Document Header Ribbon */}
          <div className="bg-[#f2f3ff] border-b border-[#dae2fd] p-4 px-6 md:px-12 flex items-center justify-between text-xs text-[#505f76]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#004ac6]" />
              <span className="font-semibold text-[#131b2e]">{t.synthesis.previewRibbon}</span>
            </div>
            <div className="font-mono text-[11px]">
              {t.synthesis.wordSpec}
            </div>
          </div>

          {/* Academic Paper Body */}
          <div className="p-6 md:p-12 space-y-8 font-serif text-[#131b2e] leading-relaxed max-w-5xl mx-auto">
            {/* Title & Metadata */}
            <div className="text-center border-b border-slate-200 pb-8 space-y-3">
              <div className="text-xs font-sans uppercase font-bold tracking-widest text-[#004ac6]">
                {language === 'vi' ? 'BÁO CÁO TỔNG QUAN HỆ THỐNG Y VĂN' : 'SYSTEMATIC LITERATURE REVIEW REPORT'}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#131b2e] tracking-tight leading-snug">
                {report.title}
              </h1>
              <div className="text-xs font-sans text-[#505f76] pt-2 space-y-1">
                <div>{t.synthesis.systemLabel}: ScholarSync v1.0</div>
                <div>{t.synthesis.dateLabel}: {new Date().toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')} • {t.synthesis.dbLabel}: PubMed / MEDLINE (Entrez API)</div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-[#faf8ff] rounded-xl p-6 border border-slate-200 space-y-2">
              <h2 className="text-sm font-sans font-bold text-[#004ac6] uppercase tracking-wider">
                {t.synthesis.secExecutiveSummary}
              </h2>
              <p className="text-sm font-serif text-[#131b2e] leading-relaxed text-justify">
                {report.executiveSummary}
              </p>
            </div>

            {/* Section 1: Đặt vấn đề & Phương pháp */}
            <div className="space-y-4">
              <h2 className="text-lg font-sans font-bold text-[#004ac6] border-b border-blue-100 pb-1">
                {t.synthesis.sec1Title}
              </h2>
              
              <div className="text-sm font-serif">
                <p className="font-bold font-sans text-xs text-[#505f76] uppercase mb-1">
                  {t.synthesis.sec11Title}
                </p>
                <p className="italic text-[#131b2e] mb-4">
                  "{pico.researchQuestion || report.title}"
                </p>
              </div>

              {/* PICO Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-300 text-xs font-sans">
                  <thead>
                    <tr className="bg-[#f2f3ff] border-b border-slate-300 text-[#131b2e] font-bold">
                      <th className="p-3 border-r border-slate-300 w-1/3">{t.synthesis.picoElement}</th>
                      <th className="p-3">{t.synthesis.definitionDetail}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-semibold border-r border-slate-300 bg-slate-50">
                        Population (P) - {language === 'vi' ? 'Dân số' : 'Target Group'}
                      </td>
                      <td className="p-3 text-[#434655]">
                        {pico.population || report.picoSummary?.population}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border-r border-slate-300 bg-slate-50">
                        Intervention (I) - {language === 'vi' ? 'Can thiệp' : 'Treatment'}
                      </td>
                      <td className="p-3 text-[#434655]">
                        {pico.intervention || report.picoSummary?.intervention}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border-r border-slate-300 bg-slate-50">
                        Comparison (C) - {language === 'vi' ? 'So sánh' : 'Control'}
                      </td>
                      <td className="p-3 text-[#434655]">
                        {pico.comparison || report.picoSummary?.comparison}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border-r border-slate-300 bg-slate-50">
                        Outcome (O) - {language === 'vi' ? 'Kết quả' : 'Endpoints'}
                      </td>
                      <td className="p-3 text-[#434655]">
                        {pico.outcome || report.picoSummary?.outcome}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <p className="font-bold font-sans text-xs text-[#505f76] uppercase mb-1">
                  {t.synthesis.sec12Title}
                </p>
                <div className="p-3 bg-[#f2f3ff] rounded-lg border border-blue-200 font-mono text-xs text-[#003ea8] break-all">
                  {pico.searchQuery || report.searchStrategy}
                </div>
              </div>
            </div>

            {/* Section 2: Kết quả Sàng lọc */}
            <div className="space-y-4">
              <h2 className="text-lg font-sans font-bold text-[#004ac6] border-b border-blue-100 pb-1">
                {t.synthesis.sec2Title}
              </h2>

              <p className="text-sm font-serif text-[#131b2e] leading-relaxed text-justify">
                {report.screeningResults?.summary}
              </p>

              {/* Stats Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-300 text-xs font-sans">
                  <thead>
                    <tr className="bg-[#f2f3ff] border-b border-slate-300 text-[#131b2e] font-bold">
                      <th className="p-3 border-r border-slate-300">{t.synthesis.colScreeningMetric}</th>
                      <th className="p-3 border-r border-slate-300">{t.synthesis.colCount}</th>
                      <th className="p-3">{t.synthesis.colPercent}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 border-r border-slate-300 font-medium">
                        {t.synthesis.metricTotalPubMed}
                      </td>
                      <td className="p-3 border-r border-slate-300 font-mono font-bold">
                        {report.screeningResults?.totalRecords || screeningStats?.total}
                      </td>
                      <td className="p-3 font-mono">100%</td>
                    </tr>
                    <tr className="bg-emerald-50/40">
                      <td className="p-3 border-r border-slate-300 font-bold text-[#006242]">
                        {t.synthesis.metricIncluded}
                      </td>
                      <td className="p-3 border-r border-slate-300 font-mono font-bold text-[#006242]">
                        {report.screeningResults?.includedCount || screeningStats?.included}
                      </td>
                      <td className="p-3 font-mono font-bold text-[#006242]">
                        {(((report.screeningResults?.includedCount || 1) / Math.max(1, report.screeningResults?.totalRecords || 1)) * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr className="bg-red-50/40">
                      <td className="p-3 border-r border-slate-300 font-medium text-[#ba1a1a]">
                        {t.synthesis.metricExcluded}
                      </td>
                      <td className="p-3 border-r border-slate-300 font-mono text-[#ba1a1a]">
                        {report.screeningResults?.excludedCount || screeningStats?.excluded}
                      </td>
                      <td className="p-3 font-mono text-[#ba1a1a]">
                        {(((report.screeningResults?.excludedCount || 0) / Math.max(1, report.screeningResults?.totalRecords || 1)) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Tổng quan Y văn & Phân tích chuyên sâu theo chủ đề */}
            <div className="space-y-6">
              <h2 className="text-lg font-sans font-bold text-[#004ac6] border-b border-blue-100 pb-1">
                {t.synthesis.sec3Title}
              </h2>

              {report.themes?.map((theme, idx) => (
                <div key={idx} className="space-y-2 bg-[#faf8ff] p-5 rounded-xl border border-slate-200">
                  <h3 className="text-sm font-sans font-bold text-[#003ea8]">
                    {theme.themeName}
                  </h3>
                  <p className="text-sm font-serif text-[#131b2e] leading-relaxed text-justify">
                    {theme.findings}
                  </p>
                </div>
              ))}

              {/* Critical Analysis */}
              {report.criticalAnalysis && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-sm font-sans font-bold text-[#003ea8]">
                    {t.synthesis.sec34Title}
                  </h3>
                  <p className="text-sm font-serif text-[#131b2e] leading-relaxed text-justify">
                    {report.criticalAnalysis}
                  </p>
                </div>
              )}

              {/* Limitations */}
              {report.limitations && (
                <div className="space-y-2">
                  <h3 className="text-sm font-sans font-bold text-[#003ea8]">
                    {t.synthesis.sec35Title}
                  </h3>
                  <p className="text-sm font-serif text-[#131b2e] leading-relaxed text-justify">
                    {report.limitations}
                  </p>
                </div>
              )}
            </div>

            {/* Section 4: Kết luận & Khuyến nghị */}
            {report.conclusion && (
              <div className="space-y-3">
                <h2 className="text-lg font-sans font-bold text-[#004ac6] border-b border-blue-100 pb-1">
                  {t.synthesis.sec4Title}
                </h2>
                <p className="text-sm font-serif text-[#131b2e] leading-relaxed text-justify">
                  {report.conclusion}
                </p>
              </div>
            )}

            {/* Section 5: Danh mục Tài liệu tham khảo */}
            <div className="space-y-4 pt-4 border-t border-slate-300">
              <h2 className="text-lg font-sans font-bold text-[#004ac6]">
                {t.synthesis.sec5Title}
              </h2>

              <div className="space-y-2 text-xs font-sans">
                {report.references?.map((ref, idx) => (
                  <div
                    key={ref.pmid || idx}
                    className="p-2.5 rounded-lg bg-[#f2f3ff]/60 border border-slate-200 flex items-start justify-between gap-3 group"
                  >
                    <div>
                      <span className="font-bold text-[#004ac6] font-mono mr-2">[{idx + 1}]</span>
                      <span className="text-[#131b2e]">{ref.citation}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                      <button
                        onClick={() => handleCopyCitation(ref.citation, idx)}
                        className="p-1 text-[#505f76] hover:text-[#004ac6] rounded"
                        title={t.synthesis.copyCitation}
                      >
                        {copiedCitation === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-[#505f76] hover:text-[#004ac6] rounded"
                        title={t.synthesis.openOnPubMed}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
