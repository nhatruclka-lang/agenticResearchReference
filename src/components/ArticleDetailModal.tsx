import React from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Layers 
} from 'lucide-react';
import { LiteratureRecord, PicoData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ArticleDetailModalProps {
  record: LiteratureRecord | null;
  pico: PicoData;
  onClose: () => void;
  onUpdateDecision: (pmid: string, decision: 'INCLUDE' | 'EXCLUDE' | 'UNCERTAIN', reason?: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  record,
  pico,
  onClose,
  onUpdateDecision,
}) => {
  const { t, language } = useLanguage();
  if (!record) return null;

  const isIncluded = record.decision === 'INCLUDE';
  const isExcluded = record.decision === 'EXCLUDE';
  const isUncertain = record.decision === 'UNCERTAIN';

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#c3c6d7] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#c3c6d7]/40 flex items-start justify-between gap-4 bg-[#faf8ff]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${record.pmid}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-100 text-[#004ac6] font-mono text-xs font-bold hover:bg-blue-200 transition-colors"
              >
                PMID: {record.pmid}
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-xs font-semibold text-[#131b2e]">{record.journal}</span>
              <span className="text-[#c3c6d7]">•</span>
              <span className="text-xs text-[#505f76]">{record.pub_date}</span>
            </div>
            <h2 className="text-base font-bold text-[#131b2e] leading-snug">
              {record.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737686] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#131b2e]">
          {/* Authors */}
          <div>
            <div className="text-[11px] font-bold text-[#505f76] uppercase tracking-wider mb-1">
              {t.articleDetail.authors}
            </div>
            <div className="text-[#434655] font-medium leading-relaxed bg-[#f2f3ff]/60 p-2.5 rounded-xl border border-slate-200">
              {record.authors || (language === 'vi' ? 'Chưa chỉ định danh sách tác giả' : 'Authors not indexed')}
            </div>
          </div>

          {/* Abstract */}
          <div>
            <div className="text-[11px] font-bold text-[#505f76] uppercase tracking-wider mb-1">
              {t.articleDetail.fullAbstract}
            </div>
            <div className="text-xs leading-relaxed text-[#131b2e] p-4 bg-[#faf8ff] rounded-xl border border-[#c3c6d7]/60 whitespace-pre-line text-justify">
              {record.abstract || (language === 'vi' ? 'Không có nội dung tóm tắt cho bài báo PubMed này.' : 'No abstract text available for this PubMed record.')}
            </div>
          </div>

          {/* AI Decision & Reasoning */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-[#004ac6] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {t.articleDetail.aiEvaluation}
            </div>
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-[#131b2e] space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">
                  {t.articleDetail.statusLabel}:{' '}
                  <span className={`font-bold ${isIncluded ? 'text-[#006242]' : isExcluded ? 'text-[#ba1a1a]' : 'text-amber-800'}`}>
                    {record.decision || 'PENDING'}
                  </span>
                </div>
                {record.confidence && (
                  <span className="text-[11px] font-mono text-[#505f76]">
                    {t.articleDetail.confidenceLabel}: {(record.confidence * 100).toFixed(0)}%
                  </span>
                )}
              </div>
              <p className="text-[#434655] leading-relaxed">
                {record.reason || (language === 'vi' ? 'Bài báo chưa được thẩm định qua động cơ Gemini AI.' : 'Record has not been screened through the Gemini AI engine yet.')}
              </p>
            </div>
          </div>

          {/* Quick PICO Match Overview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-[11px] font-bold text-[#505f76] uppercase">
              {t.articleDetail.picoTarget}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="font-bold text-[#004ac6]">Pop: </span>
                <span className="text-[#505f76]">{pico.population || '—'}</span>
              </div>
              <div>
                <span className="font-bold text-[#004ac6]">Int: </span>
                <span className="text-[#505f76]">{pico.intervention || '—'}</span>
              </div>
              <div>
                <span className="font-bold text-[#004ac6]">Comp: </span>
                <span className="text-[#505f76]">{pico.comparison || '—'}</span>
              </div>
              <div>
                <span className="font-bold text-[#004ac6]">Out: </span>
                <span className="text-[#505f76]">{pico.outcome || '—'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-[#c3c6d7]/40 bg-[#faf8ff] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#505f76] font-medium">
            {t.articleDetail.overrideDecision}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onUpdateDecision(record.pmid, 'INCLUDE', language === 'vi' ? 'Nhà nghiên cứu duyệt thủ công (Include)' : 'Manual researcher override (Include)');
                onClose();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isIncluded
                  ? 'bg-[#006242] text-white shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#006242] border border-emerald-300'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t.articleDetail.includeBtn}
            </button>

            <button
              onClick={() => {
                onUpdateDecision(record.pmid, 'EXCLUDE', language === 'vi' ? 'Nhà nghiên cứu loại bỏ thủ công (Exclude)' : 'Manual researcher override (Exclude)');
                onClose();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isExcluded
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-red-50 hover:bg-red-100 text-[#ba1a1a] border border-red-300'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              {t.articleDetail.excludeBtn}
            </button>

            <button
              onClick={() => {
                onUpdateDecision(record.pmid, 'UNCERTAIN', language === 'vi' ? 'Đánh dấu phân vân cần hội chẩn (Uncertain)' : 'Marked as uncertain for secondary investigator review');
                onClose();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isUncertain
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {t.articleDetail.uncertainBtn}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white border border-[#c3c6d7] text-xs font-semibold text-[#131b2e] rounded-xl hover:bg-[#f2f3ff] transition-colors cursor-pointer"
            >
              {t.articleDetail.closeBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
