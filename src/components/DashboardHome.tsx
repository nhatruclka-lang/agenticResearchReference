import React from 'react';
import { 
  Rocket, 
  Donut, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles, 
  FileText, 
  Database, 
  Filter, 
  FileCheck2,
  FolderOpen,
  BookOpen
} from 'lucide-react';
import { PICO_TEMPLATES } from '../data/sampleReviews';
import { ReviewProject, PicoTemplate } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DashboardHomeProps {
  onStartNewReview: () => void;
  onSelectTemplate: (template: PicoTemplate) => void;
  onOpenCustomTemplateModal: () => void;
  onOpenProject: (project: ReviewProject) => void;
  onOpenGuide?: () => void;
  recentProjects: ReviewProject[];
  totalArticlesScreened: number;
  totalPicoTagsApplied: number;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onStartNewReview,
  onSelectTemplate,
  onOpenCustomTemplateModal,
  onOpenProject,
  onOpenGuide,
  recentProjects,
  totalArticlesScreened,
  totalPicoTagsApplied,
}) => {
  const { t, language } = useLanguage();
  const isVi = language === 'vi';

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Hero Section: Bento Style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* New Review Hero Card */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl p-7 md:p-8 border border-[#c3c6d7]/50 relative overflow-hidden flex flex-col justify-between shadow-xs">
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#004ac6] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t.home.heroBadge}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight mb-2">
              {t.home.heroTitle}
            </h2>
            <p className="text-[#505f76] text-sm md:text-base leading-relaxed max-w-xl">
              {t.home.heroSubtitle}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
            <button
              id="btn-hero-start-review"
              onClick={onStartNewReview}
              className="bg-[#004ac6] hover:bg-[#003ea8] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Rocket className="w-4 h-4 text-blue-200" />
              {t.home.startNewBtn}
            </button>

            {onOpenGuide && (
              <button
                onClick={onOpenGuide}
                className="bg-white hover:bg-blue-50 text-[#004ac6] border border-blue-200 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isVi ? 'Xem Hướng dẫn' : 'Read Guide'}</span>
              </button>
            )}

            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-[#f2f3ff] rounded-xl border border-[#dae2fd]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004ac6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#004ac6]"></span>
              </span>
              <span className="text-xs font-semibold text-[#434655]">
                {recentProjects.length} {t.app.activeReviews}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Widget */}
        <div className="col-span-1 bg-white rounded-2xl p-6 border border-[#c3c6d7]/50 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-base font-bold text-[#131b2e] mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#004ac6] flex items-center justify-center">
                <Donut className="w-4 h-4" />
              </div>
              {t.home.extractionPipeline}
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-[#505f76]">{t.home.articlesScreened}</span>
                  <span className="text-[#131b2e] font-bold font-mono">
                    {totalArticlesScreened.toLocaleString()} / 2,000
                  </span>
                </div>
                <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#004ac6] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.round((totalArticlesScreened / 2000) * 100))}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-[#505f76]">{t.home.picoTagsApplied}</span>
                  <span className="text-[#131b2e] font-bold font-mono">
                    {totalPicoTagsApplied.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#007d55] h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#c3c6d7]/40 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-[#f2f3ff]">
              <div className="text-[10px] text-[#505f76] uppercase font-bold">{t.home.accuracy}</div>
              <div className="font-bold text-[#006242]">99.2%</div>
            </div>
            <div className="p-2 rounded-lg bg-[#f2f3ff]">
              <div className="text-[10px] text-[#505f76] uppercase font-bold">{t.home.aiSpeed}</div>
              <div className="font-bold text-[#004ac6]">~1.2s / doc</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Pipeline Architecture Overview Card */}
      <div className="bg-gradient-to-r from-[#f2f3ff] via-[#eaedff]/60 to-[#f2f3ff] rounded-2xl p-5 border border-[#dae2fd] shadow-xs">
        <div className="text-xs font-bold uppercase tracking-wider text-[#004ac6] mb-3 flex items-center gap-1.5">
          <Layers className="w-4 h-4" />
          {t.home.pipelineTitle}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-xs flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-100 text-[#004ac6] flex items-center justify-center font-bold text-xs shrink-0">1</div>
            <div>
              <div className="text-xs font-bold text-[#131b2e]">{t.home.stage1Title}</div>
              <div className="text-[11px] text-[#505f76]">{t.home.stage1Desc}</div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-xs flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-100 text-[#004ac6] flex items-center justify-center font-bold text-xs shrink-0">2</div>
            <div>
              <div className="text-xs font-bold text-[#131b2e]">{t.home.stage2Title}</div>
              <div className="text-[11px] text-[#505f76]">{t.home.stage2Desc}</div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-xs flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-100 text-[#004ac6] flex items-center justify-center font-bold text-xs shrink-0">3</div>
            <div>
              <div className="text-xs font-bold text-[#131b2e]">{t.home.stage3Title}</div>
              <div className="text-[11px] text-[#505f76]">{t.home.stage3Desc}</div>
            </div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-xs flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-100 text-[#004ac6] flex items-center justify-center font-bold text-xs shrink-0">4</div>
            <div>
              <div className="text-xs font-bold text-[#131b2e]">{t.home.stage4Title}</div>
              <div className="text-[11px] text-[#505f76]">{t.home.stage4Desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Row: Table and Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Activity Table */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-[#c3c6d7]/50 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-[#c3c6d7]/40 flex justify-between items-center bg-[#faf8ff]">
            <h3 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[#004ac6]" />
              {t.home.recentActivity}
            </h3>
            <span className="text-xs text-[#505f76] font-medium">
              {recentProjects.length} {t.home.reviewsLoaded}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f3ff] border-b border-[#c3c6d7]/40 text-[11px] font-bold text-[#505f76] uppercase tracking-wider">
                  <th className="p-4">{t.home.colTopic}</th>
                  <th className="p-4">{t.home.colPhase}</th>
                  <th className="p-4">{t.home.colProgress}</th>
                  <th className="p-4">{t.home.colStatus}</th>
                </tr>
              </thead>
              <tbody className="text-xs text-[#131b2e] divide-y divide-[#c3c6d7]/30">
                {recentProjects.map((project, idx) => {
                  let progress = 45;
                  let phase = 'PICO Extraction';
                  let statusBadge = (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-[#004ac6] text-xs font-semibold border border-blue-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span> {t.home.statusInProgress}
                    </span>
                  );

                  if (project.status === 'completed' || idx === 1) {
                    progress = 100;
                    phase = 'Abstract Screening';
                    statusBadge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-[#006242] text-xs font-semibold border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#007d55]" /> {t.home.statusCompleted}
                      </span>
                    );
                  } else if (project.status === 'records_fetched' || idx === 2) {
                    progress = 15;
                    phase = 'Data Synthesis';
                    statusBadge = (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-[#505f76] text-xs font-semibold border border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-[#737686]" /> {t.home.statusPending}
                      </span>
                    );
                  }

                  return (
                    <tr
                      key={project.id || idx}
                      onClick={() => onOpenProject(project)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 font-semibold text-[#131b2e] group-hover:text-[#004ac6] transition-colors">
                        {project.topic}
                      </td>
                      <td className="p-4 text-[#505f76] font-medium">{phase}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[#eaedff] h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                progress === 100 ? 'bg-[#007d55]' : 'bg-[#004ac6]'
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-[11px] font-mono text-[#505f76]">{progress}%</span>
                        </div>
                      </td>
                      <td className="p-4">{statusBadge}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* PICO Templates Quick Access */}
        <div className="col-span-1 bg-white rounded-2xl p-6 border border-[#c3c6d7]/50 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="text-base font-bold text-[#131b2e] mb-4 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#004ac6]" />
              {t.home.picoTemplates}
            </h3>
            <div className="space-y-3">
              {PICO_TEMPLATES.slice(0, 3).map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => onSelectTemplate(tpl)}
                  className="w-full text-left p-3.5 rounded-xl border border-[#c3c6d7]/50 hover:border-[#004ac6] hover:bg-[#f2f3ff] transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                >
                  <div className="pr-2">
                    <div className="text-xs font-bold text-[#131b2e] group-hover:text-[#004ac6]">
                      {tpl.name}
                    </div>
                    <div className="text-[11px] text-[#505f76] font-mono mt-0.5">
                      {tpl.tagline}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#737686] group-hover:text-[#004ac6] group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenCustomTemplateModal}
            className="w-full mt-4 text-center py-2.5 text-[#004ac6] font-semibold text-xs hover:bg-blue-50 rounded-xl transition-colors border border-dashed border-blue-300 cursor-pointer"
          >
            {t.home.createCustomTemplate}
          </button>
        </div>
      </div>
    </div>
  );
};
