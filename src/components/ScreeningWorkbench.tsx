import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Search, 
  Download, 
  ExternalLink, 
  Filter, 
  ArrowRight, 
  RefreshCw, 
  FileSpreadsheet, 
  Play, 
  Sparkles, 
  Eye, 
  Database,
  Layers
} from 'lucide-react';
import { LiteratureRecord, PicoData, ScreeningStats } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ScreeningWorkbenchProps {
  records: LiteratureRecord[];
  pico: PicoData;
  screeningStats: ScreeningStats;
  isIngesting: boolean;
  isScreening: boolean;
  currentScreeningIndex: number;
  onScreenAllRecords: () => void;
  onScreenSingleRecord: (record: LiteratureRecord) => Promise<void>;
  onUpdateDecision: (pmid: string, decision: 'INCLUDE' | 'EXCLUDE' | 'UNCERTAIN', reason?: string) => void;
  onExportRawCsv: () => void;
  onExportScreeningCsv: () => void;
  onProceedToSynthesis: () => void;
  onViewRecordDetail: (record: LiteratureRecord) => void;
}

export const ScreeningWorkbench: React.FC<ScreeningWorkbenchProps> = ({
  records,
  pico,
  screeningStats,
  isIngesting,
  isScreening,
  currentScreeningIndex,
  onScreenAllRecords,
  onScreenSingleRecord,
  onUpdateDecision,
  onExportRawCsv,
  onExportScreeningCsv,
  onProceedToSynthesis,
  onViewRecordDetail,
}) => {
  const { t } = useLanguage();
  const [filterDecision, setFilterDecision] = useState<'ALL' | 'INCLUDE' | 'EXCLUDE' | 'UNCERTAIN'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = records.filter((r) => {
    const matchesDecision =
      filterDecision === 'ALL' || r.decision === filterDecision;
    const matchesSearch =
      !searchTerm ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.reason && r.reason.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.pmid.includes(searchTerm);
    return matchesDecision && matchesSearch;
  });

  const includedCount = records.filter((r) => r.decision === 'INCLUDE').length;
  const excludedCount = records.filter((r) => r.decision === 'EXCLUDE').length;
  const uncertainCount = records.filter((r) => r.decision === 'UNCERTAIN').length;
  const unreviewedCount = records.filter((r) => !r.decision).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Main Stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-[#004ac6]">
              {t.screening.badge}
            </span>
            <span className="text-xs font-medium text-[#505f76]">
              {t.screening.subHeader}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
            {t.screening.title}
          </h1>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-export-raw-csv"
            onClick={onExportRawCsv}
            disabled={records.length === 0}
            className="px-3 py-2 bg-white border border-[#c3c6d7] hover:bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            title="Download records_raw.csv"
          >
            <Download className="w-3.5 h-3.5 text-[#505f76]" />
            <span>{t.screening.exportRawCsv}</span>
          </button>

          <button
            id="btn-export-checkpoint-csv"
            onClick={onExportScreeningCsv}
            disabled={records.length === 0}
            className="px-3 py-2 bg-white border border-[#c3c6d7] hover:bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            title="Download checkpoint1_screening.csv"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#006242]" />
            <span>{t.screening.exportCheckpointCsv}</span>
          </button>

          <button
            id="btn-proceed-synthesis"
            onClick={onProceedToSynthesis}
            disabled={includedCount === 0}
            className="px-4 py-2 bg-[#004ac6] hover:bg-[#003ea8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <span>{t.screening.proceedToSynthesis} ({includedCount})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Screening Metrics Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/60 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#505f76] uppercase">{t.screening.totalIngested}</div>
            <div className="text-2xl font-bold font-mono text-[#131b2e] mt-0.5">
              {records.length}
            </div>
            <div className="text-[11px] text-[#505f76]">{t.screening.fromPubmed}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#004ac6] flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
        </div>

        {/* Included */}
        <div 
          onClick={() => setFilterDecision('INCLUDE')}
          className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            filterDecision === 'INCLUDE' ? 'border-[#007d55] ring-2 ring-emerald-100 bg-emerald-50/20' : 'border-[#c3c6d7]/60 hover:border-[#007d55]'
          }`}
        >
          <div>
            <div className="text-[11px] font-bold text-[#006242] uppercase">{t.screening.included}</div>
            <div className="text-2xl font-bold font-mono text-[#006242] mt-0.5">
              {includedCount}
            </div>
            <div className="text-[11px] text-[#007d55]">
              {records.length > 0 ? `${Math.round((includedCount / records.length) * 100)}% ${t.screening.ofTotal}` : '0%'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006242] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Excluded */}
        <div 
          onClick={() => setFilterDecision('EXCLUDE')}
          className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            filterDecision === 'EXCLUDE' ? 'border-[#ba1a1a] ring-2 ring-red-100 bg-red-50/20' : 'border-[#c3c6d7]/60 hover:border-[#ba1a1a]'
          }`}
        >
          <div>
            <div className="text-[11px] font-bold text-[#ba1a1a] uppercase">{t.screening.excluded}</div>
            <div className="text-2xl font-bold font-mono text-[#ba1a1a] mt-0.5">
              {excludedCount}
            </div>
            <div className="text-[11px] text-[#ba1a1a]">
              {records.length > 0 ? `${Math.round((excludedCount / records.length) * 100)}% ${t.screening.ofTotal}` : '0%'}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 text-[#ba1a1a] flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Uncertain / Pending */}
        <div 
          onClick={() => setFilterDecision('UNCERTAIN')}
          className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
            filterDecision === 'UNCERTAIN' ? 'border-amber-500 ring-2 ring-amber-100 bg-amber-50/20' : 'border-[#c3c6d7]/60 hover:border-amber-500'
          }`}
        >
          <div>
            <div className="text-[11px] font-bold text-amber-700 uppercase">{t.screening.uncertain}</div>
            <div className="text-2xl font-bold font-mono text-amber-800 mt-0.5">
              {uncertainCount + unreviewedCount}
            </div>
            <div className="text-[11px] text-amber-700">{t.screening.requiresReview}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Ingestion & Batch Screening Progress Bar */}
      {(isIngesting || isScreening) && (
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2 text-[#004ac6]">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>
                {isIngesting ? t.screening.ingestingProgress : `${t.screening.screeningProgress} ${currentScreeningIndex + 1} ${t.screening.ofRecords} ${records.length}...`}
              </span>
            </div>
            <span className="font-mono text-[#131b2e]">
              {Math.round(((currentScreeningIndex + 1) / Math.max(1, records.length)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#004ac6] h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.round(((currentScreeningIndex + 1) / Math.max(1, records.length)) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#c3c6d7]/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Decision Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterDecision('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterDecision === 'ALL'
                ? 'bg-[#004ac6] text-white'
                : 'bg-[#f2f3ff] text-[#505f76] hover:bg-[#eaedff]'
            }`}
          >
            {t.screening.allRecords} ({records.length})
          </button>
          <button
            onClick={() => setFilterDecision('INCLUDE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterDecision === 'INCLUDE'
                ? 'bg-[#006242] text-white'
                : 'bg-emerald-50 text-[#006242] hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            {t.screening.included} ({includedCount})
          </button>
          <button
            onClick={() => setFilterDecision('EXCLUDE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterDecision === 'EXCLUDE'
                ? 'bg-[#ba1a1a] text-white'
                : 'bg-red-50 text-[#ba1a1a] hover:bg-red-100 border border-red-200'
            }`}
          >
            {t.screening.excluded} ({excludedCount})
          </button>
          <button
            onClick={() => setFilterDecision('UNCERTAIN')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterDecision === 'UNCERTAIN'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            {t.screening.uncertain} ({uncertainCount + unreviewedCount})
          </button>
        </div>

        {/* Search & Batch AI Action */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.screening.searchRecordsPlaceholder}
              className="pl-8 pr-3 py-1.5 bg-[#faf8ff] border border-[#c3c6d7] rounded-lg text-xs text-[#131b2e] focus:bg-white focus:border-[#004ac6] outline-none"
            />
          </div>

          <button
            id="btn-screen-all-ai"
            onClick={onScreenAllRecords}
            disabled={isScreening || records.length === 0}
            className="bg-blue-50 hover:bg-blue-100 text-[#004ac6] border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.screening.rescreenAll}</span>
          </button>
        </div>
      </div>

      {/* Literature Records List */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#c3c6d7] p-12 text-center">
            <Database className="w-12 h-12 text-[#737686] mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-[#131b2e] mb-1">{t.screening.noArticlesFound}</h3>
            <p className="text-xs text-[#505f76] max-w-sm mx-auto">
              {t.screening.noArticlesDesc}
            </p>
          </div>
        ) : (
          filteredRecords.map((record, index) => {
            const isIncluded = record.decision === 'INCLUDE';
            const isExcluded = record.decision === 'EXCLUDE';
            const isUncertain = record.decision === 'UNCERTAIN';

            return (
              <div
                key={record.pmid || index}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-2xs hover:shadow-xs ${
                  isIncluded
                    ? 'border-emerald-200 bg-emerald-50/10'
                    : isExcluded
                    ? 'border-red-200 bg-red-50/10'
                    : isUncertain
                    ? 'border-amber-200 bg-amber-50/10'
                    : 'border-[#c3c6d7]/60'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Article Details */}
                  <div className="flex-1 space-y-2">
                    {/* Header meta */}
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${record.pmid}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-[#004ac6] font-mono text-[11px] font-bold border border-blue-200"
                        title="View on PubMed"
                      >
                        PMID: {record.pmid}
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      <span className="text-[11px] font-bold text-[#131b2e]">
                        {record.journal}
                      </span>
                      <span className="text-[#c3c6d7]">•</span>
                      <span className="text-[11px] text-[#505f76]">
                        {record.pub_date}
                      </span>
                      <span className="text-[#c3c6d7]">•</span>
                      <span className="text-[11px] text-[#505f76] truncate max-w-xs">
                        {record.authors}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onViewRecordDetail(record)}
                      className="text-sm md:text-base font-bold text-[#131b2e] hover:text-[#004ac6] transition-colors cursor-pointer leading-snug"
                    >
                      {record.title}
                    </h3>

                    {/* Abstract snippet */}
                    <p className="text-xs text-[#434655] line-clamp-2 leading-relaxed">
                      {record.abstract}
                    </p>

                    {/* AI Decision & Reasoning Card */}
                    {record.reason && (
                      <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-slate-200 text-xs flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#004ac6] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#131b2e]">{t.screening.aiJustification} </span>
                          <span className="text-[#434655]">{record.reason}</span>
                          {record.manualOverride && (
                            <span className="ml-2 inline-block px-1.5 py-0.2 rounded text-[10px] bg-purple-100 text-purple-700 font-semibold">
                              {t.screening.manualOverrideTag}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions & Decision Pills */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0">
                    {/* Current Decision Pill */}
                    <div>
                      {isIncluded && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-100 text-[#006242] text-xs font-bold border border-emerald-300 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          INCLUDE
                        </span>
                      )}
                      {isExcluded && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 text-[#ba1a1a] text-xs font-bold border border-red-300 shadow-2xs">
                          <XCircle className="w-3.5 h-3.5" />
                          EXCLUDE
                        </span>
                      )}
                      {isUncertain && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 shadow-2xs">
                          <HelpCircle className="w-3.5 h-3.5" />
                          UNCERTAIN
                        </span>
                      )}
                      {!record.decision && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-[#505f76] text-xs font-medium border border-slate-300">
                          {t.screening.unreviewed}
                        </span>
                      )}
                    </div>

                    {/* Manual Override Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onUpdateDecision(record.pmid, 'INCLUDE')}
                        className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isIncluded ? 'bg-[#006242] text-white' : 'hover:bg-emerald-50 text-[#006242] border border-emerald-200'
                        }`}
                        title={t.screening.includeBtn}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onUpdateDecision(record.pmid, 'EXCLUDE')}
                        className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isExcluded ? 'bg-[#ba1a1a] text-white' : 'hover:bg-red-50 text-[#ba1a1a] border border-red-200'
                        }`}
                        title={t.screening.excludeBtn}
                      >
                        <XCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onUpdateDecision(record.pmid, 'UNCERTAIN')}
                        className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isUncertain ? 'bg-amber-600 text-white' : 'hover:bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                        title={t.screening.uncertainBtn}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onViewRecordDetail(record)}
                        className="p-1.5 rounded-lg hover:bg-[#eaedff] text-[#004ac6] border border-blue-200 transition-colors cursor-pointer"
                        title={t.screening.viewAbstract}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
