import React, { useState } from 'react';
import { X, Plus, Check, FileCheck2, ArrowRight, Sparkles } from 'lucide-react';
import { PICO_TEMPLATES } from '../data/sampleReviews';
import { PicoTemplate, PicoData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: PicoTemplate) => void;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [customTagline, setCustomTagline] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [customPopulation, setCustomPopulation] = useState('');
  const [customIntervention, setCustomIntervention] = useState('');
  const [customComparison, setCustomComparison] = useState('');
  const [customOutcome, setCustomOutcome] = useState('');
  const [customQuery, setCustomQuery] = useState('');

  if (!isOpen) return null;

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newTemplate: PicoTemplate = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      category: customCategory.trim() || (language === 'vi' ? 'Quy trình Lâm sàng Tùy chỉnh' : 'Custom Clinical Protocol'),
      tagline: customTagline.trim() || 'Pop, Int, Comp, Out',
      description: customQuestion.trim() || (language === 'vi' ? 'Quy trình tổng quan y văn tùy chỉnh của người dùng.' : 'Custom user systematic review protocol.'),
      defaultPico: {
        researchQuestion: customQuestion.trim(),
        population: customPopulation.trim(),
        intervention: customIntervention.trim(),
        comparison: customComparison.trim(),
        outcome: customOutcome.trim(),
        inclusionCriteria: language === 'vi' ? ['Nghiên cứu lâm sàng trên người', 'Khớp với các thành tố PICO đã xác định'] : ['Human clinical studies', 'Matches defined PICO parameters'],
        exclusionCriteria: language === 'vi' ? ['Nghiên cứu in vitro / động vật', 'Bài xã luận quan điểm không có số liệu gốc'] : ['In vitro / animal studies', 'Narrative editorials without primary data'],
        searchQuery: customQuery.trim() || `("${customPopulation}"[Mesh] OR "${customPopulation}"[tiab]) AND ("${customIntervention}"[Mesh] OR "${customIntervention}"[tiab])`,
      },
    };

    onSelectTemplate(newTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#c3c6d7] max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#c3c6d7]/40 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#004ac6] flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#131b2e]">{t.templateModal.title}</h2>
              <p className="text-[11px] text-[#505f76]">{t.templateModal.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737686] hover:bg-[#f2f3ff] hover:text-[#131b2e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#c3c6d7]/40 px-5 pt-2 bg-[#faf8ff] gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('preset')}
            className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'preset'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#505f76] hover:text-[#131b2e]'
            }`}
          >
            {t.templateModal.tabPresets}
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'custom'
                ? 'border-[#004ac6] text-[#004ac6]'
                : 'border-transparent text-[#505f76] hover:text-[#131b2e]'
            }`}
          >
            {t.templateModal.tabCustom}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'preset' ? (
            <div className="grid grid-cols-1 gap-3">
              {PICO_TEMPLATES.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => {
                    onSelectTemplate(tpl);
                    onClose();
                  }}
                  className="p-4 rounded-xl border border-[#c3c6d7]/60 hover:border-[#004ac6] hover:bg-[#f2f3ff] transition-all cursor-pointer group shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#131b2e] group-hover:text-[#004ac6]">
                          {tpl.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100/70 text-[#004ac6]">
                          {tpl.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#505f76] mt-1 leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#737686] group-hover:text-[#004ac6] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSaveCustom} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#434655] uppercase mb-1">
                  {t.templateModal.customNameLabel}
                </label>
                <input
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={language === 'vi' ? 'VD: Thuốc ức chế SGLT2 trên bệnh nhân Bệnh thận mạn' : 'e.g., SGLT2 Inhibitors in Chronic Kidney Disease'}
                  className="w-full p-2.5 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] focus:border-[#004ac6] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#434655] uppercase mb-1">
                    {t.templateModal.categoryLabel}
                  </label>
                  <input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder={language === 'vi' ? 'VD: Thận học' : 'e.g., Nephrology'}
                    className="w-full p-2.5 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] focus:border-[#004ac6] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#434655] uppercase mb-1">
                    {t.templateModal.taglineLabel}
                  </label>
                  <input
                    value={customTagline}
                    onChange={(e) => setCustomTagline(e.target.value)}
                    placeholder="e.g., Pop, Int, Comp, Out"
                    className="w-full p-2.5 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] focus:border-[#004ac6] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#434655] uppercase mb-1">
                  {t.templateModal.questionLabel}
                </label>
                <textarea
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder={language === 'vi' ? 'VD: Tác động của SGLT2i đối với chức năng thận và biến cố tim mạch ở bệnh nhân CKD?' : 'e.g., What are the renal and cardiovascular effects of SGLT2i in CKD patients?'}
                  className="w-full h-16 p-2.5 bg-[#faf8ff] border border-[#c3c6d7] rounded-xl text-xs text-[#131b2e] focus:border-[#004ac6] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#434655] uppercase mb-1">
                    {t.pico.population}
                  </label>
                  <input
                    value={customPopulation}
                    onChange={(e) => setCustomPopulation(e.target.value)}
                    placeholder={language === 'vi' ? 'VD: Người lớn mắc CKD giai đoạn 3-4' : 'e.g., Adults with CKD stage 3-4'}
                    className="w-full p-2 bg-[#faf8ff] border border-[#c3c6d7] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#434655] uppercase mb-1">
                    {t.pico.intervention}
                  </label>
                  <input
                    value={customIntervention}
                    onChange={(e) => setCustomIntervention(e.target.value)}
                    placeholder={language === 'vi' ? 'VD: SGLT2i (Dapagliflozin, Empagliflozin)' : 'e.g., SGLT2 Inhibitors (Dapagliflozin, Empagliflozin)'}
                    className="w-full p-2 bg-[#faf8ff] border border-[#c3c6d7] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#434655] uppercase mb-1">
                    {t.pico.comparison}
                  </label>
                  <input
                    value={customComparison}
                    onChange={(e) => setCustomComparison(e.target.value)}
                    placeholder={language === 'vi' ? 'VD: Giả dược hoặc phác đồ ACEi/ARB tiêu chuẩn' : 'e.g., Placebo or standard ACEi/ARB therapy'}
                    className="w-full p-2 bg-[#faf8ff] border border-[#c3c6d7] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#434655] uppercase mb-1">
                    {t.pico.outcome}
                  </label>
                  <input
                    value={customOutcome}
                    onChange={(e) => setCustomOutcome(e.target.value)}
                    placeholder={language === 'vi' ? 'VD: Độ dốc suy giảm eGFR, tiến triển ESKD, tử vong' : 'e.g., eGFR decline slope, ESKD progression, mortality'}
                    className="w-full p-2 bg-[#faf8ff] border border-[#c3c6d7] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#131b2e] rounded-xl text-xs font-semibold transition-colors"
                >
                  {t.templateModal.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#004ac6] hover:bg-[#003ea8] text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                >
                  {t.templateModal.createAndApplyBtn}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
