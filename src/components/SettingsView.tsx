import React from 'react';
import { 
  Settings, 
  Cpu, 
  Database, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Code2, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  FileSpreadsheet
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SettingsView: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-[#004ac6]">
            {t.settings.badge}
          </span>
          <span className="text-xs font-medium text-[#505f76]">
            {t.settings.subHeader}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
          {t.settings.title}
        </h1>
      </div>

      {/* System Specifications Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Gemini AI Engine Configuration */}
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#004ac6]">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131b2e]">{t.settings.geminiEngineTitle}</h3>
              <p className="text-[11px] text-[#505f76]">{t.settings.geminiEngineDesc}</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-[#131b2e]">
            <div className="p-3 bg-[#f2f3ff] rounded-xl border border-blue-100 space-y-1">
              <div className="flex justify-between font-semibold">
                <span>{t.settings.activeModelLabel}</span>
                <span className="text-[#004ac6] font-mono font-bold">gemini-2.5-flash</span>
              </div>
              <p className="text-[11px] text-[#505f76]">
                {t.settings.fallbackNotice}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#006242] font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-[#007d55]" />
              <span>{t.settings.securityNotice}</span>
            </div>
          </div>
        </div>

        {/* PubMed Ingestion Engine */}
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#004ac6]">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#006242] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131b2e]">{t.settings.pubmedEngineTitle}</h3>
              <p className="text-[11px] text-[#505f76]">{t.settings.pubmedEngineDesc}</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-[#131b2e]">
            <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200 space-y-1">
              <div className="flex justify-between font-semibold">
                <span>{t.settings.ingestionPipelineLabel}</span>
                <span className="text-[#006242] font-mono font-bold">esearch + efetch XML</span>
              </div>
              <p className="text-[11px] text-[#505f76]">
                {t.settings.ingestionDetails}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#004ac6] font-semibold bg-blue-50 p-2.5 rounded-xl border border-blue-200">
              <CheckCircle2 className="w-4 h-4 text-[#004ac6]" />
              <span>{t.settings.meshSupportNotice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pipeline Checkpoints & Output Specifications */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 md:p-8 shadow-xs space-y-5">
        <h3 className="text-base font-bold text-[#131b2e] flex items-center gap-2 border-b border-[#c3c6d7]/30 pb-3">
          <FileText className="w-4 h-4 text-[#004ac6]" />
          {t.settings.outputArtifactsTitle}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Checkpoint 1 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-[#faf8ff] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#131b2e]">
              <FileSpreadsheet className="w-4 h-4 text-slate-600" />
              <span>records_raw.csv</span>
            </div>
            <p className="text-[11px] text-[#505f76] leading-relaxed">
              {t.settings.artifactRawCsvDesc}
            </p>
          </div>

          {/* Checkpoint 2 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#006242]">
              <FileSpreadsheet className="w-4 h-4 text-[#006242]" />
              <span>checkpoint1_screening.csv</span>
            </div>
            <p className="text-[11px] text-[#505f76] leading-relaxed">
              {t.settings.artifactCheckpointCsvDesc}
            </p>
          </div>

          {/* Checkpoint 3 */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#004ac6]">
              <FileText className="w-4 h-4 text-[#004ac6]" />
              <span>Tong_quan_tai_lieu.docx</span>
            </div>
            <p className="text-[11px] text-[#505f76] leading-relaxed">
              {t.settings.artifactDocxDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
