import React from 'react';
import { 
  Home, 
  PlusCircle, 
  FileText, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  BookOpen,
  Sparkles,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeReviewsCount: number;
  currentProjectTopic?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeReviewsCount,
  currentProjectTopic
}) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'new-review', label: t.nav.newReview, icon: PlusCircle, badge: 'Mod 1' },
    { id: 'screening', label: t.nav.screening, icon: CheckSquare, badge: 'Mod 2-3' },
    { id: 'synthesis', label: t.nav.synthesis, icon: FileText, badge: 'Mod 4' },
    { id: 'analytics', label: t.nav.analytics, icon: BarChart3 },
    { id: 'settings', label: t.nav.settings, icon: Settings },
    { id: 'guide', label: t.nav.guide, icon: BookOpen, badge: 'Guide' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white border-r border-[#c3c6d7]/50 z-20 py-6 px-4 select-none">
      {/* Brand & User Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#004ac6] to-[#2563eb] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#004ac6] tracking-tight flex items-center gap-1.5">
              ScholarSync
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 bg-blue-50 text-[#004ac6] rounded border border-blue-200">v1.0</span>
            </h1>
            <p className="text-[11px] text-[#505f76] font-medium">{t.app.tagline}</p>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60">
          <img
            alt="Truc's Avatar"
            className="w-10 h-10 rounded-full object-cover border border-white shadow-sm ring-1 ring-blue-100"
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#131b2e] truncate">{t.app.userGreeting}</p>
            <p className="text-[11px] text-[#505f76] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {t.app.userRole}
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          id="btn-start-review-sidebar"
          onClick={() => setActiveTab('new-review')}
          className="w-full mt-4 bg-[#004ac6] hover:bg-[#003ea8] text-white py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-blue-200" />
          {t.app.startReview}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#737686] px-3 py-1">
          {t.nav.pipelineHeader}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-[#004ac6] font-bold border border-blue-200/80 shadow-xs'
                  : 'text-[#505f76] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#004ac6]' : 'text-[#737686]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  isActive ? 'bg-blue-200/60 text-[#004ac6]' : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {currentProjectTopic && (
          <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200/60">
            <div className="text-[10px] font-bold text-[#004ac6] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {t.app.activeProject}
            </div>
            <p className="text-xs font-medium text-[#131b2e] line-clamp-2 leading-tight">
              {currentProjectTopic}
            </p>
          </div>
        )}
      </nav>

      {/* Footer Support */}
      <div className="pt-4 border-t border-[#c3c6d7]/40 flex flex-col gap-1">
        <button
          onClick={() => setActiveTab('guide')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#505f76] hover:bg-[#f2f3ff] transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-[#737686]" />
          <span>{t.app.helpCenter}</span>
        </button>
      </div>
    </aside>
  );
};
