import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  Plus, 
  X, 
  FileText, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  AlertCircle,
  HelpCircle,
  Code2
} from 'lucide-react';
import { PicoData, PicoTemplate } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PicoDefinitionViewProps {
  pico: PicoData;
  setPico: React.Dispatch<React.SetStateAction<PicoData>>;
  onExtractWithAI: (topic: string) => Promise<void>;
  onRunScreening: () => void;
  isLoading: boolean;
  onSelectTemplate: (template: PicoTemplate) => void;
}

export const PicoDefinitionView: React.FC<PicoDefinitionViewProps> = ({
  pico,
  setPico,
  onExtractWithAI,
  onRunScreening,
  isLoading,
}) => {
  const { t, language } = useLanguage();
  const [topicInput, setTopicInput] = useState('');
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');
  const [copiedQuery, setCopiedQuery] = useState(false);

  const handleAddInclusion = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (!newInclusion.trim()) return;
    setPico((prev) => ({
      ...prev,
      inclusionCriteria: [...(prev.inclusionCriteria || []), newInclusion.trim()],
    }));
    setNewInclusion('');
  };

  const handleRemoveInclusion = (index: number) => {
    setPico((prev) => ({
      ...prev,
      inclusionCriteria: prev.inclusionCriteria.filter((_, i) => i !== index),
    }));
  };

  const handleAddExclusion = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    if (!newExclusion.trim()) return;
    setPico((prev) => ({
      ...prev,
      exclusionCriteria: [...(prev.exclusionCriteria || []), newExclusion.trim()],
    }));
    setNewExclusion('');
  };

  const handleRemoveExclusion = (index: number) => {
    setPico((prev) => ({
      ...prev,
      exclusionCriteria: prev.exclusionCriteria.filter((_, i) => i !== index),
    }));
  };

  const handleCopyQuery = () => {
    if (!pico.searchQuery) return;
    navigator.clipboard.writeText(pico.searchQuery);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  const handleQuickPrompt = async (sampleText: string) => {
    setTopicInput(sampleText);
    await onExtractWithAI(sampleText);
  };

  const hasPicoData = Boolean(
    pico.population || pico.intervention || pico.researchQuestion || pico.searchQuery
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight mb-1">
            {t.pico.title}
          </h1>
          <p className="text-sm text-[#434655]">
            {t.pico.subtitle}
          </p>
        </div>

        {/* Action Button */}
        <button
          id="btn-run-screening-top"
          onClick={onRunScreening}
          disabled={isLoading || !pico.searchQuery}
          className="bg-[#004ac6] hover:bg-[#003ea8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t.pico.processing}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>{t.pico.runScreeningTop}</span>
            </>
          )}
        </button>
      </div>

      {/* AI Smart Extraction Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-[#eaedff]/70 to-blue-50 rounded-2xl p-4 md:p-5 border border-blue-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#004ac6] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#004ac6] uppercase tracking-wider block">
                {t.pico.module1Badge}
              </span>
              <span className="text-[11px] text-[#505f76]">
                {t.pico.module1Desc}
              </span>
            </div>
          </div>

          <div className="flex-1 flex gap-2">
            <input
              id="ai-topic-input"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onExtractWithAI(topicInput)}
              placeholder={t.pico.topicInputPlaceholder}
              className="flex-1 px-3.5 py-2 bg-white border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none shadow-2xs"
            />
            <button
              id="btn-generate-pico-ai"
              onClick={() => onExtractWithAI(topicInput)}
              disabled={isLoading || !topicInput.trim()}
              className="bg-[#004ac6] hover:bg-[#003ea8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
            >
              {isLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              )}
              <span>{t.pico.autoExtractBtn}</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestions Chips */}
        <div className="mt-3 pt-2.5 border-t border-blue-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-semibold text-[#505f76]">{t.pico.quickTopics}</span>
          <button
            onClick={() => handleQuickPrompt(language === 'vi' ? 'Hiệu quả của Semaglutide và đồng vận GLP-1 trên bệnh nhân Đái tháo đường típ 2' : 'Semaglutide and GLP-1 agonists in Type 2 Diabetes')}
            className="px-2.5 py-1 bg-white hover:bg-blue-100/70 border border-blue-200 rounded-lg text-[11px] text-[#004ac6] transition-colors cursor-pointer"
          >
            {language === 'vi' ? 'GLP-1 RA & Đái tháo đường T2' : 'GLP-1 RA in Diabetes'}
          </button>
          <button
            onClick={() => handleQuickPrompt(language === 'vi' ? 'Liệu pháp nhận thức hành vi CBT trong điều trị rối loạn lo âu ở trẻ em' : 'Cognitive Behavioral Therapy for pediatric anxiety disorders')}
            className="px-2.5 py-1 bg-white hover:bg-blue-100/70 border border-blue-200 rounded-lg text-[11px] text-[#004ac6] transition-colors cursor-pointer"
          >
            {language === 'vi' ? 'CBT & Rối loạn Lo âu' : 'CBT in Child Anxiety'}
          </button>
          <button
            onClick={() => handleQuickPrompt(language === 'vi' ? 'Ứng dụng Deep Learning và AI trong phát hiện nốt phổi trên CT ngực' : 'Deep learning in thoracic CT for lung nodule detection')}
            className="px-2.5 py-1 bg-white hover:bg-blue-100/70 border border-blue-200 rounded-lg text-[11px] text-[#004ac6] transition-colors cursor-pointer"
          >
            {language === 'vi' ? 'AI & CT Lồng ngực' : 'Deep Learning CT Imaging'}
          </button>
        </div>
      </div>

      {/* Main Grid: 7 Cols Left (Forms), 5 Cols Right (Preview) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Forms */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* PICO Framework Bento Card */}
          <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-5 md:p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#131b2e] mb-4 flex items-center justify-between border-b border-[#c3c6d7]/30 pb-3">
              <div className="flex items-center gap-2 text-[#004ac6]">
                <Layers className="w-4 h-4" />
                <span className="text-[#131b2e]">{t.pico.picoFramework}</span>
              </div>
              <span className="text-[11px] text-[#505f76] font-mono font-medium">
                P-I-C-O
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Population */}
              <div>
                <label className="block text-[11px] font-bold text-[#434655] uppercase tracking-wider mb-1.5">
                  {t.pico.population}
                </label>
                <textarea
                  id="pico-population"
                  value={pico.population}
                  onChange={(e) => setPico({ ...pico, population: e.target.value })}
                  placeholder={t.pico.populationPlaceholder}
                  className="w-full h-24 p-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] placeholder-[#737686] focus:bg-white focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none transition-all resize-none shadow-2xs"
                />
              </div>

              {/* Intervention */}
              <div>
                <label className="block text-[11px] font-bold text-[#434655] uppercase tracking-wider mb-1.5">
                  {t.pico.intervention}
                </label>
                <textarea
                  id="pico-intervention"
                  value={pico.intervention}
                  onChange={(e) => setPico({ ...pico, intervention: e.target.value })}
                  placeholder={t.pico.interventionPlaceholder}
                  className="w-full h-24 p-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] placeholder-[#737686] focus:bg-white focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none transition-all resize-none shadow-2xs"
                />
              </div>

              {/* Comparison */}
              <div>
                <label className="block text-[11px] font-bold text-[#434655] uppercase tracking-wider mb-1.5">
                  {t.pico.comparison}
                </label>
                <textarea
                  id="pico-comparison"
                  value={pico.comparison}
                  onChange={(e) => setPico({ ...pico, comparison: e.target.value })}
                  placeholder={t.pico.comparisonPlaceholder}
                  className="w-full h-24 p-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] placeholder-[#737686] focus:bg-white focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none transition-all resize-none shadow-2xs"
                />
              </div>

              {/* Outcome */}
              <div>
                <label className="block text-[11px] font-bold text-[#434655] uppercase tracking-wider mb-1.5">
                  {t.pico.outcome}
                </label>
                <textarea
                  id="pico-outcome"
                  value={pico.outcome}
                  onChange={(e) => setPico({ ...pico, outcome: e.target.value })}
                  placeholder={t.pico.outcomePlaceholder}
                  className="w-full h-24 p-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] placeholder-[#737686] focus:bg-white focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none transition-all resize-none shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Research Question & Criteria Card */}
          <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-5 md:p-6 shadow-xs">
            <h2 className="text-base font-bold text-[#131b2e] mb-4 flex items-center justify-between border-b border-[#c3c6d7]/30 pb-3">
              <div className="flex items-center gap-2 text-[#004ac6]">
                <FileText className="w-4 h-4" />
                <span className="text-[#131b2e]">{t.pico.coreParameters}</span>
              </div>
            </h2>

            {/* Primary Research Question */}
            <div className="mb-5">
              <label className="block text-[11px] font-bold text-[#434655] uppercase tracking-wider mb-1.5">
                {t.pico.researchQuestion}
              </label>
              <textarea
                id="pico-research-question"
                value={pico.researchQuestion}
                onChange={(e) => setPico({ ...pico, researchQuestion: e.target.value })}
                placeholder={t.pico.researchQuestionPlaceholder}
                className="w-full h-20 p-3 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] placeholder-[#737686] focus:bg-white focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none transition-all resize-y shadow-2xs"
              />
            </div>

            {/* Inclusion & Exclusion Criteria Chips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Inclusion Criteria */}
              <div>
                <label className="block text-[11px] font-bold text-[#007d55] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.pico.inclusionCriteria}
                </label>
                <div className="border border-[#c3c6d7] rounded-xl p-2.5 bg-[#faf8ff] min-h-[110px] flex flex-col justify-between shadow-2xs">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {pico.inclusionCriteria?.map((crit, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-[#006242] text-[11px] font-medium border border-emerald-200"
                      >
                        {crit}
                        <button
                          type="button"
                          onClick={() => handleRemoveInclusion(idx)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 border-t border-slate-200 pt-1.5">
                    <input
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      onKeyDown={handleAddInclusion}
                      placeholder={t.pico.typeAndEnter}
                      className="w-full bg-transparent border-none outline-none text-xs text-[#131b2e] placeholder-[#737686] p-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddInclusion}
                      className="text-[#007d55] hover:bg-emerald-100 p-1 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Exclusion Criteria */}
              <div>
                <label className="block text-[11px] font-bold text-[#ba1a1a] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {t.pico.exclusionCriteria}
                </label>
                <div className="border border-[#c3c6d7] rounded-xl p-2.5 bg-[#faf8ff] min-h-[110px] flex flex-col justify-between shadow-2xs">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {pico.exclusionCriteria?.map((crit, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 text-[#ba1a1a] text-[11px] font-medium border border-red-200"
                      >
                        {crit}
                        <button
                          type="button"
                          onClick={() => handleRemoveExclusion(idx)}
                          className="hover:text-red-800 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 border-t border-slate-200 pt-1.5">
                    <input
                      value={newExclusion}
                      onChange={(e) => setNewExclusion(e.target.value)}
                      onKeyDown={handleAddExclusion}
                      placeholder={t.pico.typeAndEnter}
                      className="w-full bg-transparent border-none outline-none text-xs text-[#131b2e] placeholder-[#737686] p-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddExclusion}
                      className="text-[#ba1a1a] hover:bg-red-100 p-1 rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PubMed Boolean Query String Editor */}
          <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-5 md:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold text-[#004ac6] uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4" />
                {t.pico.pubmedSearchString}
              </label>
              <button
                type="button"
                onClick={handleCopyQuery}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#004ac6] hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedQuery ? t.pico.copied : t.pico.copyQuery}
              </button>
            </div>
            <textarea
              id="pico-search-query"
              value={pico.searchQuery}
              onChange={(e) => setPico({ ...pico, searchQuery: e.target.value })}
              placeholder="e.g., (('Diabetes Mellitus, Type 2'[Mesh] OR 'type 2 diabetes'[tiab]) AND ('Glucagon-Like Peptide-1 Receptor Agonists'[Mesh] OR 'GLP-1'[tiab]))"
              className="w-full h-24 p-3 bg-[#f2f3ff] border border-blue-200 rounded-xl font-mono text-xs text-[#003ea8] focus:bg-white focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none transition-all resize-y shadow-2xs"
            />
            <p className="text-[11px] text-[#505f76] mt-2">
              {t.pico.queryHelp}
            </p>
          </div>
        </div>

        {/* Right Column: Preview & Status */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          {!hasPicoData ? (
            /* Empty State matching Image 3 */
            <div className="bg-[#f2f3ff] rounded-2xl border border-dashed border-[#c3c6d7] h-full min-h-[460px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-xs">
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#004ac6 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              ></div>

              <div className="w-32 h-32 mb-6 rounded-2xl bg-white/80 border border-blue-100 flex items-center justify-center shadow-md shadow-blue-500/5">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                  <FileText className="w-8 h-8" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#131b2e] mb-2 relative z-10">
                {t.pico.awaitingParamsTitle}
              </h3>
              <p className="text-xs text-[#434655] max-w-xs leading-relaxed relative z-10">
                {t.pico.awaitingParamsDesc}
              </p>

              {/* Animated Pipeline Nodes */}
              <div className="mt-8 flex items-center gap-3 text-[#737686] relative z-10">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  <FileText className="w-4 h-4 text-[#004ac6]" />
                </div>
                <span className="text-xs">→</span>
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#007d55]" />
                </div>
                <span className="text-xs">→</span>
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#004ac6]" />
                </div>
              </div>
            </div>
          ) : (
            /* Active Summary Card */
            <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#c3c6d7]/30 pb-3">
                <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#007d55]" />
                  {t.pico.protocolSummary}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#004ac6] border border-blue-200">
                  {t.pico.readyToRun}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-[#505f76] uppercase">{t.pico.researchObjective}</div>
                  <div className="font-medium text-[#131b2e] mt-1">
                    {pico.researchQuestion || '—'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-blue-100">
                    <div className="text-[10px] font-bold text-[#004ac6]">POPULATION</div>
                    <div className="text-[#131b2e] truncate mt-0.5">{pico.population || '—'}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-blue-100">
                    <div className="text-[10px] font-bold text-[#004ac6]">INTERVENTION</div>
                    <div className="text-[#131b2e] truncate mt-0.5">{pico.intervention || '—'}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-blue-100">
                    <div className="text-[10px] font-bold text-[#004ac6]">COMPARISON</div>
                    <div className="text-[#131b2e] truncate mt-0.5">{pico.comparison || '—'}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f2f3ff] border border-blue-100">
                    <div className="text-[10px] font-bold text-[#004ac6]">OUTCOME</div>
                    <div className="text-[#131b2e] truncate mt-0.5">{pico.outcome || '—'}</div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-[#006242]">
                  <div className="text-[10px] font-bold uppercase mb-1">
                    {t.pico.inclusionCriteria} ({pico.inclusionCriteria?.length || 0})
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {pico.inclusionCriteria?.slice(0, 3).map((c, i) => (
                      <li key={i} className="truncate">{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-red-50/60 rounded-xl border border-red-200 text-[#ba1a1a]">
                  <div className="text-[10px] font-bold uppercase mb-1">
                    {t.pico.exclusionCriteria} ({pico.exclusionCriteria?.length || 0})
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {pico.exclusionCriteria?.slice(0, 3).map((c, i) => (
                      <li key={i} className="truncate">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  id="btn-run-screening-right"
                  onClick={onRunScreening}
                  disabled={isLoading || !pico.searchQuery}
                  className="w-full bg-[#004ac6] hover:bg-[#003ea8] disabled:bg-slate-300 text-white font-semibold text-xs py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.pico.executePipeline}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
