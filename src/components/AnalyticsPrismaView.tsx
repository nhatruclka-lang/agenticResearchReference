import React from 'react';
import { 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Database, 
  ArrowDown, 
  Download,
  PieChart
} from 'lucide-react';
import { LiteratureRecord, ScreeningStats, PicoData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AnalyticsPrismaViewProps {
  records: LiteratureRecord[];
  stats: ScreeningStats;
  pico: PicoData;
}

export const AnalyticsPrismaView: React.FC<AnalyticsPrismaViewProps> = ({
  records,
  stats,
  pico,
}) => {
  const { t, language } = useLanguage();
  const includedRecords = records.filter((r) => r.decision === 'INCLUDE');
  const excludedRecords = records.filter((r) => r.decision === 'EXCLUDE');
  const uncertainRecords = records.filter((r) => r.decision === 'UNCERTAIN');

  // Compute common exclusion reasons
  const exclusionReasonsMap: { [key: string]: number } = {};
  excludedRecords.forEach((r) => {
    const reason = r.reason || 'Did not meet PICO criteria';
    // Group roughly
    let key = language === 'vi' ? 'Không đúng Dân số / Quần thể mục tiêu' : 'Population / Target mismatch';
    if (reason.toLowerCase().includes('animal') || reason.toLowerCase().includes('in vitro') || reason.toLowerCase().includes('động vật')) {
      key = language === 'vi' ? 'Nghiên cứu động vật / In vitro' : 'Animal / Non-human study';
    } else if (reason.toLowerCase().includes('pediatric') || reason.toLowerCase().includes('adult') || reason.toLowerCase().includes('tuổi')) {
      key = language === 'vi' ? 'Tiêu chuẩn độ tuổi / Nhóm dân số' : 'Age / Cohort criteria';
    } else if (reason.toLowerCase().includes('case report') || reason.toLowerCase().includes('review') || reason.toLowerCase().includes('letter') || reason.toLowerCase().includes('tổng quan')) {
      key = language === 'vi' ? 'Loại hình bài báo / Thiết kế nghiên cứu' : 'Study design / Publication type';
    } else if (reason.toLowerCase().includes('intervention') || reason.toLowerCase().includes('comparator') || reason.toLowerCase().includes('can thiệp') || reason.toLowerCase().includes('so sánh')) {
      key = language === 'vi' ? 'Không đúng Can thiệp / Phác đồ đối chứng' : 'Intervention / Comparator mismatch';
    } else if (reason.toLowerCase().includes('outcome') || reason.toLowerCase().includes('endpoint') || reason.toLowerCase().includes('kết cục')) {
      key = language === 'vi' ? 'Thiếu kết cục lâm sàng chính' : 'Lacking primary outcome data';
    }
    exclusionReasonsMap[key] = (exclusionReasonsMap[key] || 0) + 1;
  });

  // Pub year distribution
  const yearDistribution: { [key: string]: number } = {};
  records.forEach((r) => {
    const match = r.pub_date.match(/\b(19\d\d|20\d\d)\b/);
    const yr = match ? match[1] : (language === 'vi' ? 'Gần đây' : 'Recent');
    yearDistribution[yr] = (yearDistribution[yr] || 0) + 1;
  });

  const totalCount = records.length || stats.total || 0;
  const incCount = includedRecords.length || stats.included || 0;
  const excCount = excludedRecords.length || stats.excluded || 0;
  const uncCount = uncertainRecords.length || stats.uncertain || 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-[#004ac6]">
            {t.analytics.badge}
          </span>
          <span className="text-xs font-medium text-[#505f76]">
            {t.analytics.subHeader}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
          {t.analytics.title}
        </h1>
      </div>

      {/* PRISMA 2020 Interactive Diagram Bento Card */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#c3c6d7]/30 pb-4">
          <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#004ac6]" />
            {t.analytics.prismaTitle}
          </h2>
          <span className="text-xs font-semibold text-[#004ac6] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            {t.analytics.standardSynthesis}
          </span>
        </div>

        {/* PRISMA Flow Boxes */}
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Phase 1: Identification */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#004ac6] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#004ac6] flex items-center justify-center text-[10px]">1</span>
              {t.analytics.phase1Title}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-[#f2f3ff] rounded-xl border border-blue-200 shadow-2xs">
                <div className="text-xs font-bold text-[#131b2e]">{t.analytics.recordsIdentified}</div>
                <div className="text-2xl font-bold font-mono text-[#004ac6] mt-1">
                  (n = {totalCount})
                </div>
                <div className="text-[11px] text-[#505f76] truncate mt-0.5">
                  {pico.searchQuery ? (language === 'vi' ? 'Tìm kiếm Boolean đã thực thi' : 'Boolean search executed') : (language === 'vi' ? 'Chưa cấu hình' : 'Not configured')}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs font-bold text-[#505f76]">{t.analytics.duplicateRecords}</div>
                <div className="text-2xl font-bold font-mono text-slate-700 mt-1">
                  (n = 0)
                </div>
                <div className="text-[11px] text-[#505f76] mt-0.5">
                  {t.analytics.deduplicationNotice}
                </div>
              </div>
            </div>
          </div>

          {/* Connector Arrow */}
          <div className="flex justify-center text-[#004ac6]">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Phase 2: Screening */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#004ac6] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#004ac6] flex items-center justify-center text-[10px]">2</span>
              {t.analytics.phase2Title}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-[#faf8ff] rounded-xl border border-[#c3c6d7] shadow-2xs">
                <div className="text-xs font-bold text-[#131b2e]">{t.analytics.recordsScreened}</div>
                <div className="text-2xl font-bold font-mono text-[#131b2e] mt-1">
                  (n = {totalCount})
                </div>
                <div className="text-[11px] text-[#505f76] mt-0.5">
                  {t.analytics.evaluatedAgainstPico}
                </div>
              </div>

              <div className="p-4 bg-red-50/70 rounded-xl border border-red-200 shadow-2xs">
                <div className="text-xs font-bold text-[#ba1a1a]">{t.analytics.recordsExcluded}</div>
                <div className="text-2xl font-bold font-mono text-[#ba1a1a] mt-1">
                  (n = {excCount})
                </div>
                <div className="text-[11px] text-[#ba1a1a] mt-0.5">
                  {t.analytics.failedCriteriaNotice}
                </div>
              </div>
            </div>
          </div>

          {/* Connector Arrow */}
          <div className="flex justify-center text-[#004ac6]">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Phase 3: Included */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#007d55] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#007d55] flex items-center justify-center text-[10px]">3</span>
              {t.analytics.phase3Title}
            </div>

            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-300 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#006242] uppercase">
                  {t.analytics.finalIncludedTitle}
                </div>
                <div className="text-3xl font-bold font-mono text-[#006242] mt-1">
                  (n = {incCount})
                </div>
                <div className="text-xs text-[#007d55] mt-0.5">
                  {language === 'vi' ? 'Đã xuất sang' : 'Exported to'} <code>Tong_quan_tai_lieu.docx</code> & <code>checkpoint1_screening.csv</code>
                </div>
              </div>

              <div className="w-12 h-12 rounded-xl bg-emerald-200/80 text-[#006242] flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exclusion Reasons Breakdown */}
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
            <XCircle className="w-4 h-4 text-[#ba1a1a]" />
            {t.analytics.exclusionReasonsTitle}
          </h3>

          {Object.keys(exclusionReasonsMap).length === 0 ? (
            <p className="text-xs text-[#505f76] py-6 text-center">
              {t.analytics.noExcludedRecords}
            </p>
          ) : (
            <div className="space-y-3">
              {Object.entries(exclusionReasonsMap).map(([reason, count]) => {
                const pct = Math.round((count / Math.max(1, excCount)) * 100);
                return (
                  <div key={reason} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#131b2e]">{reason}</span>
                      <span className="font-mono text-[#505f76]">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-[#f2f3ff] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#ba1a1a] h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Publication Years Distribution */}
        <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#004ac6]" />
            {t.analytics.publicationYearsTitle}
          </h3>

          {Object.keys(yearDistribution).length === 0 ? (
            <p className="text-xs text-[#505f76] py-6 text-center">
              {t.analytics.noPubRecords}
            </p>
          ) : (
            <div className="space-y-2">
              {Object.entries(yearDistribution).map(([year, count]) => {
                const pct = Math.round((count / Math.max(1, totalCount)) * 100);
                return (
                  <div key={year} className="flex items-center gap-3 text-xs">
                    <span className="w-14 font-mono font-bold text-[#131b2e]">{year}</span>
                    <div className="flex-1 bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#004ac6] h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                    <span className="w-16 text-right font-mono text-[#505f76]">{count} {language === 'vi' ? 'bài' : 'articles'}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
