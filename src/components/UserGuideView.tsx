import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  Database, 
  CheckSquare, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Download, 
  Sparkles, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  ShieldCheck, 
  ChevronRight, 
  Lightbulb, 
  ListChecks, 
  FileCheck2,
  ExternalLink,
  ChevronDown,
  Info,
  GraduationCap,
  Atom,
  Binary,
  Coins,
  Cpu as Microchip
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface UserGuideViewProps {
  onNavigateToTab: (tab: string) => void;
}

export const UserGuideView: React.FC<UserGuideViewProps> = ({ onNavigateToTab }) => {
  const { language } = useLanguage();
  const isVi = language === 'vi';

  const [activeSection, setActiveSection] = useState<'overview' | 'steps' | 'artifacts' | 'tips' | 'faq'>('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#004ac6] to-[#1e40af] rounded-3xl p-6 md:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <BookOpen className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            {isVi ? 'Cẩm nang Hướng dẫn Toàn diện cho Mọi Lĩnh vực Nghiên cứu' : 'Comprehensive Multidisciplinary Systematic Review Guide'}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            {isVi 
              ? 'Hướng Dẫn Sử Dụng Hệ Thống Tổng Quan Nghiên Cứu Khoa Học' 
              : 'ScholarSync: Universal Systematic Literature Review Guide'}
          </h1>
          <p className="text-sm md:text-base text-blue-100 leading-relaxed font-light">
            {isVi
              ? 'Tài liệu chi tiết về kiến trúc đường ống xử lý 4 giai đoạn tuần tự áp dụng cho toàn bộ các ngành khoa học: Khoa học máy tính & AI, Kỹ thuật công nghệ, Kinh tế & Quản trị, Khoa học xã hội & Giáo dục, Môi trường và Y sinh.'
              : 'Detailed guide on the 4-stage sequential data pipeline covering all scientific disciplines: AI & Computer Science, Engineering & Energy, Economics & Business, Social Sciences, Education, Environmental Science, and Biomedicine.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onNavigateToTab('new-review')}
              className="bg-white hover:bg-blue-50 text-[#004ac6] font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{isVi ? 'Bắt đầu bài tổng quan ngay' : 'Start a New Review Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSection('steps')}
              className="bg-white/15 hover:bg-white/25 text-white font-semibold text-xs px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
            >
              {isVi ? 'Xem quy trình từng bước' : 'View Step-by-Step Workflow'}
            </button>
          </div>
        </div>
      </div>

      {/* Multidisciplinary Badges Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {[
          { label: isVi ? 'AI & Khoa học Máy tính' : 'AI & Computer Science', icon: Binary },
          { label: isVi ? 'Kỹ thuật & Năng lượng' : 'Engineering & Energy', icon: Atom },
          { label: isVi ? 'Kinh tế & Quản trị' : 'Economics & Business', icon: Coins },
          { label: isVi ? 'Giáo dục & Tâm lý' : 'Education & Psychology', icon: GraduationCap },
          { label: isVi ? 'Môi trường & Địa lý' : 'Environmental Science', icon: Sparkles },
          { label: isVi ? 'Y sinh & Sức khỏe' : 'Biomedicine & Health', icon: ShieldCheck },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#131b2e] shadow-2xs">
              <Icon className="w-4 h-4 text-[#004ac6] shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2 border-b border-[#c3c6d7]/50 pb-3">
        {[
          { id: 'overview', label: isVi ? '1. Kiến trúc Hệ thống' : '1. System Architecture', icon: Layers },
          { id: 'steps', label: isVi ? '2. Hướng dẫn từng Bước' : '2. Step-by-Step Walkthrough', icon: ListChecks },
          { id: 'artifacts', label: isVi ? '3. Các Checkpoint Dữ liệu' : '3. Data Checkpoints', icon: FileSpreadsheet },
          { id: 'tips', label: isVi ? '4. Mẹo & Chuẩn Học thuật' : '4. Best Practices & Tips', icon: Lightbulb },
          { id: 'faq', label: isVi ? '5. Câu hỏi thường gặp' : '5. FAQ & Troubleshooting', icon: HelpCircle },
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#004ac6] text-white shadow-sm'
                  : 'bg-white text-[#505f76] border border-[#c3c6d7]/60 hover:bg-[#f2f3ff] hover:text-[#131b2e]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: ARCHITECTURE OVERVIEW */}
      {activeSection === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 md:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#004ac6] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#131b2e]">
                  {isVi ? 'Kiến Trúc Đường Ống Xử Lý Dữ Liệu Tuần Tự (Pipeline Pattern)' : 'Sequential Data Pipeline Architecture'}
                </h2>
                <p className="text-xs text-[#505f76]">
                  {isVi ? 'Mô hình thiết kế 4 module độc lập nối tiếp nhau thông qua các checkpoint dữ liệu chuẩn cho mọi ngành khoa học' : '4-module decoupled pipeline design connected via standard data checkpoints for all research disciplines'}
                </p>
              </div>
            </div>

            {/* Visual Pipeline Flow Diagram */}
            <div className="bg-[#faf8ff] p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-xs font-bold text-[#004ac6] uppercase tracking-wider">
                {isVi ? 'SƠ ĐỒ LUỒNG DỮ LIỆU ĐA NGÀNH (END-TO-END RESEARCH DATA FLOW)' : 'PRIMARY RESEARCH DATA FLOW DIAGRAM'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Stage 1 */}
                <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-2xs space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#004ac6]">MODULE 1</span>
                    <span className="text-xs font-mono font-bold text-slate-400">01</span>
                  </div>
                  <h3 className="text-xs font-bold text-[#131b2e]">
                    {isVi ? 'Methodology Framework & Query' : 'Methodology Framework & Query'}
                  </h3>
                  <p className="text-[11px] text-[#505f76] leading-relaxed">
                    {isVi ? 'Phân tích phương pháp luận (PICO/PEO/CIMO), xác định tiêu chuẩn chọn/loại và tạo chuỗi truy vấn Boolean học thuật.' : 'Extracts research framework (PICO/PEO/CIMO), criteria, and generates academic Boolean search syntax.'}
                  </p>
                  <div className="pt-1 text-[10px] font-mono text-[#004ac6] font-semibold bg-blue-50/70 p-1.5 rounded border border-blue-100">
                    ➡️ Boolean Search String
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#006242]">MODULE 2</span>
                    <span className="text-xs font-mono font-bold text-slate-400">02</span>
                  </div>
                  <h3 className="text-xs font-bold text-[#131b2e]">
                    {isVi ? 'Literature Ingestion' : 'Literature Ingestion'}
                  </h3>
                  <p className="text-[11px] text-[#505f76] leading-relaxed">
                    {isVi ? 'Thu thập bài báo từ các cơ sở dữ liệu học thuật và trích xuất cấu trúc thư mục hoàn chỉnh.' : 'Harvests bibliographic records from academic databases and parses metadata.'}
                  </p>
                  <div className="pt-1 text-[10px] font-mono text-[#006242] font-semibold bg-emerald-50/70 p-1.5 rounded border border-emerald-100">
                    💾 records_raw.csv
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">MODULE 3</span>
                    <span className="text-xs font-mono font-bold text-slate-400">03</span>
                  </div>
                  <h3 className="text-xs font-bold text-[#131b2e]">
                    {isVi ? 'AI Screening Engine' : 'AI Screening Engine'}
                  </h3>
                  <p className="text-[11px] text-[#505f76] leading-relaxed">
                    {isVi ? 'Động cơ Gemini AI phân tích tóm tắt bài báo đối chiếu câu hỏi nghiên cứu, gán nhãn INCLUDE/EXCLUDE kèm lập luận.' : 'Gemini AI evaluates abstracts against criteria, assigning decision (INCLUDE/EXCLUDE/UNCERTAIN) & reasoning.'}
                  </p>
                  <div className="pt-1 text-[10px] font-mono text-amber-900 font-semibold bg-amber-50/70 p-1.5 rounded border border-amber-100">
                    💾 checkpoint1_screening.csv
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="p-4 rounded-xl bg-white border border-purple-200 shadow-2xs space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">MODULE 4</span>
                    <span className="text-xs font-mono font-bold text-slate-400">04</span>
                  </div>
                  <h3 className="text-xs font-bold text-[#131b2e]">
                    {isVi ? 'Synthesis & Docx Report' : 'Synthesis & Docx Report'}
                  </h3>
                  <p className="text-[11px] text-[#505f76] leading-relaxed">
                    {isVi ? 'Tổng hợp bằng chứng theo chủ đề, phân tích chất lượng phương pháp, hạn chế và xuất file Word hoàn chỉnh.' : 'Synthesizes thematic findings, methodological quality, limitations, and exports formatted Word doc.'}
                  </p>
                  <div className="pt-1 text-[10px] font-mono text-purple-900 font-semibold bg-purple-50/70 p-1.5 rounded border border-purple-100">
                    📄 Tong_quan_tai_lieu.docx
                  </div>
                </div>
              </div>
            </div>

            {/* Core Architectural Principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#faf8ff] border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-[#004ac6]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isVi ? 'Tính Tái lập Khoa học (Reproducibility)' : 'Scientific Reproducibility'}</span>
                </div>
                <p className="text-[11px] text-[#505f76] leading-relaxed">
                  {isVi 
                    ? 'Mỗi giai đoạn tạo ra một checkpoint cụ thể (file CSV / Docx), cho phép nhà nghiên cứu kiểm định độc lập và kiểm chứng lại bất kỳ lúc nào.' 
                    : 'Each stage produces a persistent checkpoint artifact allowing researchers to audit and reproduce each step independently.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-[#006242]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isVi ? 'Bảo mật Phía Máy chủ (Zero Key Leakage)' : 'Server-Side Security'}</span>
                </div>
                <p className="text-[11px] text-[#505f76] leading-relaxed">
                  {isVi 
                    ? 'Mọi yêu cầu gửi tới Gemini AI hoặc cơ sở dữ liệu học thuật đều được ủy quyền qua máy chủ Express backend, không làm lộ API keys.' 
                    : 'All inference and bibliographic harvesting requests are proxied via Express backend, preventing client-side key leakage.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8ff] border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-purple-700">
                  <BookOpen className="w-4 h-4" />
                  <span>{isVi ? 'Chuẩn Học thuật PRISMA Quốc tế' : 'PRISMA 2020 Standard'}</span>
                </div>
                <p className="text-[11px] text-[#505f76] leading-relaxed">
                  {isVi 
                    ? 'Tuân thủ định dạng Times New Roman 12pt, giãn dòng 1.15, bảng phương pháp luận chi tiết, sơ đồ luồng PRISMA và danh mục trích dẫn chuẩn.' 
                    : 'Follows international PRISMA standards with Times New Roman 12pt, 1.15 spacing, methodology tables, and structured academic citations.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: STEP-BY-STEP PRACTICAL WALKTHROUGH */}
      {activeSection === 'steps' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-blue-200 p-6 md:p-8 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-blue-100 text-[#004ac6] font-mono font-bold flex items-center justify-center text-sm">
                  1
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#131b2e]">
                    {isVi ? 'Bước 1: Xác định Khung Phương pháp luận & Chuỗi Tìm kiếm' : 'Step 1: Define Methodology Framework & Search Query'}
                  </h3>
                  <p className="text-xs text-[#505f76]">Module 1: Framework & Query Generator</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateToTab('new-review')}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#004ac6] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{isVi ? 'Tới Module 1' : 'Go to Module 1'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#434655] leading-relaxed pl-12">
              <p>
                {isVi ? (
                  <>
                    Nhập bất kỳ chủ đề nghiên cứu khoa học nào (bằng <strong>Tiếng Việt</strong> hoặc <strong>Tiếng Anh</strong>) vào ô nhập liệu hoặc chọn một mẫu giao thức đa ngành có sẵn (AI/CNTT, Năng lượng, Kinh tế, Giáo dục...). Nhấn nút <span className="font-semibold text-[#004ac6]">"Trích xuất Khung Nghiên cứu với AI"</span>.
                  </>
                ) : (
                  <>
                    Enter any academic research topic (in <strong>English</strong> or <strong>Vietnamese</strong>) or select a multidisciplinary protocol preset (AI, CleanTech, Economics, Pedagogy). Click <span className="font-semibold text-[#004ac6]">"Auto-Extract Framework with AI"</span>.
                  </>
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200">
                  <div className="font-bold text-[#004ac6] text-[11px]">P - Population / Scope / Context</div>
                  <div className="text-[10px] text-[#505f76] mt-0.5">{isVi ? 'Tập dữ liệu, đối tượng nghiên cứu, doanh nghiệp, quần thể' : 'Target dataset, cohorts, firms, or empirical context'}</div>
                </div>
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200">
                  <div className="font-bold text-[#004ac6] text-[11px]">I - Intervention / Method / Variable</div>
                  <div className="text-[10px] text-[#505f76] mt-0.5">{isVi ? 'Thuật toán mới, chính sách, phương pháp can thiệp' : 'New model, policy, technique, or variable of interest'}</div>
                </div>
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200">
                  <div className="font-bold text-[#004ac6] text-[11px]">C - Comparison / Baseline</div>
                  <div className="text-[10px] text-[#505f76] mt-0.5">{isVi ? 'Mô hình cơ sở (baseline), đối chứng, phác đồ chuẩn' : 'Baseline architectures, control groups, or standard approach'}</div>
                </div>
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200">
                  <div className="font-bold text-[#004ac6] text-[11px]">O - Outcome / Metrics / Impact</div>
                  <div className="text-[10px] text-[#505f76] mt-0.5">{isVi ? 'Chỉ số đo lường (F1/BLEU, hiệu suất PCE, tỷ lệ hoàn thành)' : 'Performance metrics, accuracy, efficiency, or statistical impact'}</div>
                </div>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-[11px] text-[#003ea8]">
                💡 <strong>{isVi ? 'Ghi chú quan trọng' : 'Key Note'}:</strong> {isVi ? 'Chuỗi tìm kiếm Boolean tự động kết hợp từ khóa tiêu đề, tóm tắt và thuật ngữ phân loại với logic AND/OR/NOT để tương thích với các cơ sở dữ liệu học thuật lớn.' : 'The Boolean search string combines field tags, synonyms, and nested logic for high precision across academic databases.'}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 md:p-8 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-emerald-100 text-[#006242] font-mono font-bold flex items-center justify-center text-sm">
                  2
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#131b2e]">
                    {isVi ? 'Bước 2: Thu Thập Dữ Liệu Bài Báo Tự Động' : 'Step 2: Automated Bibliographic Ingestion'}
                  </h3>
                  <p className="text-xs text-[#505f76]">Module 2: Literature Ingestion</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateToTab('screening')}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#006242] rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{isVi ? 'Tới Bàn sàng lọc' : 'Go to Screening'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#434655] leading-relaxed pl-12">
              <p>
                {isVi ? (
                  <>
                    Nhấn nút <span className="font-semibold text-[#004ac6]">"Thực thi Thu thập Học thuật & Sàng lọc AI"</span>. Hệ thống gửi chuỗi truy vấn đến cơ sở dữ liệu, tự động trích xuất các trường: mã định danh bài báo (PMID/ID/DOI), Tiêu đề, Tóm tắt toàn văn (Abstract), Danh sách tác giả, Tên tạp chí/kỷ yếu và Năm công bố.
                  </>
                ) : (
                  <>
                    Click <span className="font-semibold text-[#004ac6]">"Execute Literature Ingestion & AI Screening"</span>. The backend communicates with bibliographic databases, harvesting IDs, article titles, full abstracts, author lists, journals/conferences, and publication years.
                  </>
                )}
              </p>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-[11px] text-[#006242]">
                💾 <strong>Checkpoint 1 ({isVi ? 'Dữ liệu thô' : 'Raw Data'}):</strong> {isVi ? 'Toàn bộ bài báo thu thập được lưu thành file records_raw.csv. Bạn có thể nhấn nút "records_raw.csv" trên thanh công cụ để tải về kiểm tra bất kỳ lúc nào.' : 'All fetched records are immediately preserved as records_raw.csv, downloadable anytime from the toolbar.'}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-amber-200 p-6 md:p-8 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-mono font-bold flex items-center justify-center text-sm">
                  3
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#131b2e]">
                    {isVi ? 'Bước 3: Bàn Làm Việc Sàng Lọc Bài Báo AI & Ghi Đè Quyết Định' : 'Step 3: AI Screening Workbench & Manual Override'}
                  </h3>
                  <p className="text-xs text-[#505f76]">Module 3: AI Screening Engine</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateToTab('screening')}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{isVi ? 'Xem Workbench' : 'Open Workbench'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#434655] leading-relaxed pl-12">
              <p>
                {isVi ? (
                  <>
                    Động cơ <strong>Gemini AI</strong> tuần tự phân tích từng bài báo đối chiếu với các thành tố phương pháp luận và bộ Tiêu chuẩn chọn / loại trừ. Mỗi bài báo được gắn một trong ba trạng thái:
                  </>
                ) : (
                  <>
                    The <strong>Gemini AI engine</strong> analyzes each abstract against the methodology framework and assigns one of three statuses:
                  </>
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[#006242]">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    INCLUDE ({isVi ? 'Được chọn' : 'Included'})
                  </div>
                  <div className="text-[10px] mt-1 text-emerald-800 leading-normal">
                    {isVi ? 'Đạt toàn bộ tiêu chuẩn nghiên cứu và không phạm tiêu chuẩn loại trừ.' : 'Meets all research parameters and inclusion criteria.'}
                  </div>
                </div>
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-[#ba1a1a]">
                  <div className="font-bold flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    EXCLUDE ({isVi ? 'Bị loại' : 'Excluded'})
                  </div>
                  <div className="text-[10px] mt-1 text-red-800 leading-normal">
                    {isVi ? 'Không đúng đối tượng, phương pháp sai hoặc phạm tiêu chuẩn loại.' : 'Fails criteria (e.g. non-empirical, wrong baseline, out-of-scope).'}
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800">
                  <div className="font-bold flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    UNCERTAIN ({isVi ? 'Phân vân' : 'Uncertain'})
                  </div>
                  <div className="text-[10px] mt-1 text-amber-900 leading-normal">
                    {isVi ? 'Tóm tắt không đủ dữ kiện, cần nghiên cứu viên mở xem toàn văn để duyệt thủ công.' : 'Abstract lacks key details; flagged for manual researcher review.'}
                  </div>
                </div>
              </div>
              <p>
                {isVi ? (
                  <>
                    <strong>Quyền Ghi đè của Nghiên cứu viên (Manual Override):</strong> Bạn có thể nhấp vào bất kỳ bài báo nào để mở cửa sổ <em>Article Detail Modal</em>, đọc toàn văn tóm tắt, xem lập luận của AI và bấm chọn <span className="text-[#006242] font-semibold">Chọn bài</span>, <span className="text-[#ba1a1a] font-semibold">Loại bỏ</span> hoặc <span className="text-amber-800 font-semibold">Phân vân</span> để ghi đè kết quả.
                  </>
                ) : (
                  <>
                    <strong>Researcher Manual Override:</strong> Click any article card to inspect full abstract, review AI justification, and override decisions to Include, Exclude, or Uncertain with 1-click.
                  </>
                )}
              </p>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                💾 <strong>Checkpoint 2 ({isVi ? 'Kết quả Sàng lọc' : 'Screening Results'}):</strong> {isVi ? 'Xuất ra file checkpoint1_screening.csv chứa toàn bộ bài báo kèm cột quyết định và lý do chi tiết.' : 'Exported as checkpoint1_screening.csv containing all records, final decisions, and justifications.'}
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl border border-purple-200 p-6 md:p-8 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 font-mono font-bold flex items-center justify-center text-sm">
                  4
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#131b2e]">
                    {isVi ? 'Bước 4: Tổng Hợp Báo Cáo Học Thuật & Xuất File Word (.docx)' : 'Step 4: Academic Synthesis & Word (.docx) Export'}
                  </h3>
                  <p className="text-xs text-[#505f76]">Module 4: Synthesis & Docx Report</p>
                </div>
              </div>
              <button
                onClick={() => onNavigateToTab('synthesis')}
                className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{isVi ? 'Tới Báo cáo' : 'View Report'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#434655] leading-relaxed pl-12">
              <p>
                {isVi ? (
                  <>
                    Khi hoàn tất sàng lọc, nhấn nút <span className="font-semibold text-[#004ac6]">"Chuyển sang Tổng quan Bằng chứng"</span>. Động cơ Gemini sẽ tự động tổng hợp toàn bộ các nghiên cứu đã <strong>INCLUDED</strong> thành báo cáo học thuật đầy đủ 5 phần:
                  </>
                ) : (
                  <>
                    Click <span className="font-semibold text-[#004ac6]">"Proceed to Synthesis"</span>. Gemini aggregates all <strong>INCLUDED</strong> articles into a complete 5-section academic document:
                  </>
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-[#004ac6]">1. Đặt vấn đề & Khung Phương pháp luận</div>
                  <p className="text-[10px] text-[#505f76]">Bảng tóm tắt phương pháp luận, câu hỏi nghiên cứu và chuỗi tìm kiếm Boolean.</p>
                </div>
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-[#004ac6]">2. Kết quả Sàng lọc Tài liệu & PRISMA</div>
                  <p className="text-[10px] text-[#505f76]">Bảng số lượng, tỷ lệ % theo chuẩn sơ đồ luồng PRISMA 2020.</p>
                </div>
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-[#004ac6]">3. Phân tích Chuyên sâu theo Chủ đề</div>
                  <p className="text-[10px] text-[#505f76]">Tổng hợp so sánh phát hiện, đánh giá chất lượng phương pháp, nguy cơ sai lệch và hạn chế.</p>
                </div>
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-[#004ac6]">4. Kết luận & Tài liệu Tham khảo</div>
                  <p className="text-[10px] text-[#505f76]">Đề xuất hướng nghiên cứu tiếp theo và danh mục trích dẫn chuẩn học thuật đánh số [1], [2]...</p>
                </div>
              </div>
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 text-[11px] text-purple-900">
                📄 <strong>{isVi ? 'Xuất File Word' : 'Microsoft Word Export'}:</strong> {isVi ? 'Nhấn nút "Tải file Tong_quan_tai_lieu.docx" để tải ngay tài liệu Word định dạng chuẩn font Times New Roman 12pt, giãn dòng 1.15.' : 'Click "Download Tong_quan_tai_lieu.docx" to download formatted Word document.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DATA ARTIFACTS & CHECKPOINTS */}
      {activeSection === 'artifacts' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 md:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#131b2e]">
                {isVi ? 'Quy Cách Đóng Gói Dữ Liệu & 3 Checkpoint Chính' : 'Data Artifacts & Checkpoint Specifications'}
              </h2>
              <p className="text-xs text-[#505f76]">
                {isVi ? 'Toàn bộ dữ liệu được quản lý minh bạch, có thể trích xuất ra file CSV và DOCX ở bất kỳ công đoạn nào.' : 'All pipeline outputs are transparent and downloadable as standard CSV and DOCX formats.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Checkpoint 1 */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-[#faf8ff] space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#004ac6]">CHECKPOINT 01</div>
                  <h3 className="text-sm font-bold text-[#131b2e]">records_raw.csv</h3>
                </div>
                <div className="text-xs text-[#505f76] space-y-1.5 leading-relaxed">
                  <p><strong>{isVi ? 'Thời điểm tạo:' : 'Creation point:'}</strong> {isVi ? 'Ngay sau khi Module 2 hoàn thành thu thập dữ liệu học thuật.' : 'Immediately after Module 2 literature query ingestion.'}</p>
                  <p><strong>{isVi ? 'Các trường dữ liệu:' : 'Fields included:'}</strong></p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] font-mono">
                    <li>pmid / id (Mã định danh bài báo)</li>
                    <li>title (Tiêu đề công trình)</li>
                    <li>abstract (Toàn văn tóm tắt)</li>
                    <li>authors (Danh sách tác giả)</li>
                    <li>journal / venue (Tạp chí / Kỷ yếu)</li>
                    <li>pub_date (Năm/ngày xuất bản)</li>
                  </ul>
                </div>
              </div>

              {/* Checkpoint 2 */}
              <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-200 text-[#006242] flex items-center justify-center font-bold">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#006242]">CHECKPOINT 02</div>
                  <h3 className="text-sm font-bold text-[#131b2e]">checkpoint1_screening.csv</h3>
                </div>
                <div className="text-xs text-[#505f76] space-y-1.5 leading-relaxed">
                  <p><strong>{isVi ? 'Thời điểm tạo:' : 'Creation point:'}</strong> {isVi ? 'Sau khi Module 3 sàng lọc AI hoặc nhà nghiên cứu duyệt xong.' : 'Generated after Module 3 AI screening and manual review.'}</p>
                  <p><strong>{isVi ? 'Các trường dữ liệu bổ sung:' : 'Additional fields:'}</strong></p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] font-mono text-[#006242]">
                    <li>decision (INCLUDE/EXCLUDE/UNCERTAIN)</li>
                    <li>reason (Lập luận chi tiết của AI)</li>
                    <li>confidence (Độ tin cậy 0.0 - 1.0)</li>
                    <li>manualOverride (Ghi đè thủ công)</li>
                  </ul>
                </div>
              </div>

              {/* Checkpoint 3 */}
              <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-200 text-[#004ac6] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#004ac6]">CHECKPOINT 03</div>
                  <h3 className="text-sm font-bold text-[#131b2e]">Tong_quan_tai_lieu.docx</h3>
                </div>
                <div className="text-xs text-[#505f76] space-y-1.5 leading-relaxed">
                  <p><strong>{isVi ? 'Thời điểm tạo:' : 'Creation point:'}</strong> {isVi ? 'Khi kết thúc Module 4 tổng hợp báo cáo bằng chứng.' : 'Generated after Module 4 synthesis engine execution.'}</p>
                  <p><strong>{isVi ? 'Quy chuẩn hình thức:' : 'Format specs:'}</strong></p>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                    <li>Font chữ: Times New Roman 12pt</li>
                    <li>Giãn dòng (Line Spacing): 1.15</li>
                    <li>Bảng tổng hợp phương pháp luận & Thống kê PRISMA</li>
                    <li>Danh mục trích dẫn chuẩn học thuật quốc tế</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: BEST PRACTICES & TIPS */}
      {activeSection === 'tips' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#004ac6] font-bold text-sm">
                <Lightbulb className="w-5 h-5" />
                <span>{isVi ? 'Tối Ưu Hóa Khung Phương Pháp Luận' : 'Optimizing Framework Formulation'}</span>
              </div>
              <p className="text-xs text-[#434655] leading-relaxed">
                {isVi
                  ? 'Nêu rõ bối cảnh/tập dữ liệu (ví dụ: tập dữ liệu NLP ít tài nguyên, doanh nghiệp công nghiệp OECD, sinh viên đại học STEM). Càng chi tiết ở bước này, Gemini AI sẽ tạo chuỗi tìm kiếm Boolean càng chuẩn xác, giảm thiểu số lượng bài báo rác.'
                  : 'Be specific with target datasets, empirical cohorts, and exact baseline techniques. Specificity in Module 1 ensures maximum precision in the generated Boolean query.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#006242] font-bold text-sm">
                <Filter className="w-5 h-5" />
                <span>{isVi ? 'Xử Lý Bài Báo Phân Vân (Uncertain)' : 'Handling Uncertain Records'}</span>
              </div>
              <p className="text-xs text-[#434655] leading-relaxed">
                {isVi
                  ? 'Khi bài báo được gắn nhãn UNCERTAIN, hãy sử dụng bộ lọc "Cần xem xét" trên Bàn làm việc, nhấp vào thẻ bài báo và bấm nút "Xem bài báo gốc" để mở trực tiếp trang bài báo nhằm đọc toàn văn (Full Text).'
                  : 'Filter by "Uncertain" on the Screening Workbench. Click the article badge to open the publication landing page and resolve any ambiguity before proceeding.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                <FileCheck2 className="w-5 h-5" />
                <span>{isVi ? 'Lưu & Tái Sử Dụng Template Đa Ngành' : 'Save & Reuse Custom Protocols'}</span>
              </div>
              <p className="text-xs text-[#434655] leading-relaxed">
                {isVi
                  ? 'Nếu bạn thường xuyên thực hiện các bài tổng quan trong cùng chuyên ngành (ví dụ: Deep Learning, Năng lượng tái tạo, Kinh tế lượng), hãy dùng tính năng "+ Tạo Mẫu Giao thức Tùy chỉnh" để lưu lại khung nghiên cứu dùng lại nhiều lần.'
                  : 'If you conduct recurring reviews in specific fields (AI, CleanTech, Econometrics), use "+ Build Custom Template" to save reusable methodology protocols.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#c3c6d7]/60 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <Sparkles className="w-5 h-5" />
                <span>{isVi ? 'Chuyển Đổi Song Ngữ Cho Báo Cáo' : 'Bilingual Language Toggle'}</span>
              </div>
              <p className="text-xs text-[#434655] leading-relaxed">
                {isVi
                  ? 'Bạn có thể chuyển đổi giữa Tiếng Việt và English bất kỳ lúc nào qua nút cờ ở thanh tiêu đề. Khi chuyển sang English và bấm tạo tổng quan, Gemini sẽ tự động viết báo cáo học thuật hoàn toàn bằng Tiếng Anh để nộp cho các hội thảo, tạp chí quốc tế (IEEE, ACM, Elsevier, Springer, Nature).'
                  : 'Toggle between Vietnamese and English anytime. Switching language also adapts the Gemini prompt, generating international English systematic review manuscripts ready for IEEE, ACM, Elsevier, or Springer submissions.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: FAQ & TROUBLESHOOTING */}
      {activeSection === 'faq' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {[
            {
              q: isVi ? '1. Cơ sở dữ liệu trả về 0 kết quả thì phải xử lý như thế nào?' : '1. What should I do if the database query returns 0 records?',
              a: isVi 
                ? 'Nguyên nhân thường do chuỗi tìm kiếm Boolean quá hẹp hoặc chứa quá nhiều điều kiện AND. Hãy vào Module 1, chỉnh sửa lại chuỗi tìm kiếm (loại bớt các từ khóa phụ hoặc mở rộng phạm vi đối tượng) rồi bấm "Chạy Sàng lọc Tự động" lại.'
                : 'This occurs if the search string is overly restrictive with too many AND operators. Broaden the query in Module 1 by relaxing constraints and re-running.',
            },
            {
              q: isVi ? '2. Dữ liệu nghiên cứu và khóa API của tôi có an toàn không?' : '2. Is my research data and API key secure?',
              a: isVi 
                ? 'Hoàn toàn an toàn. Mọi giao tiếp với Gemini AI và cơ sở dữ liệu đều chạy qua máy chủ Express backend độc lập. Không có khóa API nào bị lưu trữ trên trình duyệt của người dùng.'
                : '100% secure. All requests to Gemini and academic APIs are executed via the server-side Express backend. Zero credentials are exposed to the client.',
            },
            {
              q: isVi ? '3. Tôi có thể chỉnh sửa nội dung sau khi tải file Word về không?' : '3. Can I edit the downloaded Word document?',
              a: isVi 
                ? 'Có. File Tong_quan_tai_lieu.docx được xuất dưới định dạng chuẩn Microsoft Word (.docx), bạn có thể mở trong Microsoft Word, Google Docs hoặc LibreOffice để chỉnh sửa, thêm số liệu biểu đồ hoặc định dạng lại tùy ý.'
                : 'Yes. Tong_quan_tai_lieu.docx is a standard Microsoft Word file editable in Microsoft Word, Google Docs, or LibreOffice.',
            },
            {
              q: isVi ? '4. Tiêu chuẩn trích dẫn tài liệu tham khảo được định dạng thế nào?' : '4. How are references formatted?',
              a: isVi 
                ? 'Danh mục tài liệu tham khảo tuân thủ chuẩn trích dẫn học thuật quốc tế: Tác giả. Tên bài báo. Tên tạp chí/Kỷ yếu. Năm xuất bản; Tập(Số):Trang. Mỗi trích dẫn có nút copy nhanh và liên kết mở trực tiếp bài báo gốc.'
                : 'References strictly follow academic citation format: Authors. Title. Journal/Conference. Year; Volume(Issue):Pages. Each reference includes a 1-click copy button and source link.',
            },
            {
              q: isVi ? '5. Các bài báo bị loại (EXCLUDED) có bị xóa mất không?' : '5. Are EXCLUDED articles permanently lost?',
              a: isVi 
                ? 'Không. Toàn bộ các bài báo (bao gồm cả Included, Excluded và Uncertain) đều được lưu trữ đầy đủ trong file checkpoint1_screening.csv kèm lý do loại trừ chi tiết để phục vụ báo cáo giải trình minh bạch.'
                : 'No. All articles (Included, Excluded, Uncertain) are preserved with full reasons in checkpoint1_screening.csv for auditing transparency.',
            }
          ].map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-[#c3c6d7]/60 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs md:text-sm text-[#131b2e] hover:bg-[#faf8ff] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#004ac6] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#737686] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#004ac6]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#434655] leading-relaxed border-t border-slate-100 bg-[#faf8ff]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
