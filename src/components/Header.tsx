import React from 'react';
import { Search, Bell, HelpCircle, Menu, Cpu, Database, CheckCircle2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTab: string;
  onOpenHelp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  searchQuery,
  setSearchQuery,
  activeTab,
  onOpenHelp
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-[#faf8ff] border-b border-[#c3c6d7]/50 w-full h-16 flex justify-between items-center px-4 md:px-8 sticky top-0 z-10 select-none">
      {/* Mobile Title & Menu */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={onToggleMobileMenu}
          className="p-1.5 rounded-lg text-[#434655] hover:bg-[#eaedff] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-[#004ac6]">ScholarSync</h1>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md relative mr-6">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686]" />
        <input
          id="global-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-[#c3c6d7] rounded-lg text-sm text-[#131b2e] placeholder-[#737686] focus:border-[#004ac6] focus:ring-1 focus:ring-[#004ac6] outline-none transition-all shadow-xs"
          placeholder={t.app.globalSearchPlaceholder}
          type="text"
        />
      </div>

      {/* Status Badges & Controls */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher Button */}
        <div className="flex items-center bg-white border border-[#c3c6d7] rounded-lg p-0.5 shadow-xs">
          <button
            onClick={() => setLanguage('vi')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              language === 'vi'
                ? 'bg-[#004ac6] text-white shadow-xs'
                : 'text-[#505f76] hover:text-[#131b2e] hover:bg-[#f1f3f9]'
            }`}
            title="Chuyển sang Tiếng Việt"
          >
            <span>🇻🇳</span>
            <span>Tiếng Việt</span>
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-[#004ac6] text-white shadow-xs'
                : 'text-[#505f76] hover:text-[#131b2e] hover:bg-[#f1f3f9]'
            }`}
            title="Switch to English"
          >
            <span>🇬🇧</span>
            <span>English</span>
          </button>
        </div>

        {/* System Capabilities Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-white rounded-lg border border-[#c3c6d7]/60 text-xs text-[#505f76] shadow-xs">
          <div className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-[#004ac6]" />
            <span className="font-semibold text-[#131b2e]">{t.app.geminiLive}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-[#006242]" />
            <span className="font-medium text-[#006242] flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> {t.app.pubmedLive}
            </span>
          </div>
        </div>

        <button
          onClick={onOpenHelp}
          className="text-[#434655] hover:bg-[#eaedff] p-2 rounded-lg transition-colors cursor-pointer"
          title={t.app.helpCenter}
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <button
          className="text-[#434655] hover:bg-[#eaedff] p-2 rounded-lg transition-colors relative cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-[#004ac6] absolute top-2 right-2"></span>
        </button>
      </div>
    </header>
  );
};
