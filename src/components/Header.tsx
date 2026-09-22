import React from 'react';
import { SupportedLanguage, LanguageOption, TextStyle, ThemeMode } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../translations';
import { TextStyleSelector } from './TextStyleSelector';
import { PragatiLogo } from './PragatiLogo';
import { 
  Languages, 
  Eye,
  Sun,
  Moon,
  ShieldCheck,
  Globe,
  Sparkles,
  Bot
} from 'lucide-react';

interface HeaderProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  textStyle: TextStyle;
  onTextStyleChange: (style: TextStyle) => void;
  themeMode?: ThemeMode;
  onToggleThemeMode?: () => void;
  onOpenPortalsModal?: () => void;
  onOpenAiBoat?: () => void;
  hasCompletedWizard?: boolean;
  onNavigateToWizard?: () => void;
  onNavigateToResults?: () => void;
  matchCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  isHighContrast,
  onToggleHighContrast,
  textStyle,
  onTextStyleChange,
  themeMode = 'light',
  onToggleThemeMode,
  onOpenPortalsModal,
  onOpenAiBoat,
  hasCompletedWizard = false,
  onNavigateToWizard,
  onNavigateToResults,
  matchCount,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const isLight = !isHighContrast && themeMode === 'light';

  return (
    <header 
      id="portal-header"
      className={`border-b sticky top-0 z-40 transition-colors ${
        isHighContrast 
          ? 'bg-black border-b-2 border-white text-white' 
          : isLight
            ? 'bg-[#faf8f5]/95 backdrop-blur-md border-[#e5e1d8] text-[#1c1917] shadow-[0_1px_3px_rgba(28,25,23,0.03)]'
            : 'bg-[#121417]/95 backdrop-blur-md border-[#262a32] text-[#f4f4f5] shadow-lg shadow-black/50'
      }`}
    >
      {/* Top Subtle Tri-color Accent Bar */}
      {!isHighContrast && (
        <div className="h-1 w-full bg-gradient-to-r from-[#d97706] via-[#faf8f5] to-[#15803d] opacity-90"></div>
      )}

      {/* Editorial Utility & Accessibility Bar */}
      <div className={`px-4 py-1.5 text-xs border-b transition-colors ${
        isHighContrast 
          ? 'bg-black border-b border-neutral-700 text-white' 
          : isLight
            ? 'bg-[#f4f1ea] border-[#e7e3da] text-[#57534e]'
            : 'bg-[#0e1013] border-[#22262e] text-[#a1a1aa]'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Government / Zero Fee Guarantee */}
          <div className="flex items-center gap-2.5 font-medium">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
              isHighContrast
                ? 'border border-white bg-black text-white'
                : isLight
                  ? 'text-[#166534] bg-[#ecfdf5] border border-[#bbf7d0]'
                  : 'text-[#86efac] bg-[#052e16]/80 border border-[#166534]/50'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#166534] dark:text-[#86efac] shrink-0" />
              <span>Public Service Initiative • 100% Free Public Resource</span>
            </span>
          </div>

          {/* Accessibility & Comfort Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Light / Dark Mode Toggle */}
            {!isHighContrast && onToggleThemeMode && (
              <button
                id="btn-theme-toggle"
                onClick={onToggleThemeMode}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors border ${
                  isLight
                    ? 'bg-[#ffffff] hover:bg-[#f5f2eb] text-[#44403c] border-[#ddd8cd] shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                    : 'bg-[#1a1d23] hover:bg-[#232730] text-[#e4e4e7] border-[#2f3540]'
                }`}
                title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                aria-label="Toggle Light or Dark Theme"
              >
                {isLight ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#78716c] shrink-0" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" />
                    <span>Light</span>
                  </>
                )}
              </button>
            )}

            {/* Text Style Selector */}
            <TextStyleSelector
              currentStyle={textStyle}
              onStyleChange={onTextStyleChange}
              isHighContrast={isHighContrast}
            />

            {/* High Contrast Mode */}
            <button
              id="btn-high-contrast"
              onClick={onToggleHighContrast}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-all border ${
                isHighContrast
                  ? 'bg-white text-black font-black border-2 border-white'
                  : isLight
                    ? 'bg-[#292524] hover:bg-[#1c1917] text-[#fafaf9] border-[#292524]'
                    : 'bg-[#27272a] hover:bg-[#3f3f46] text-[#fafafa] border-[#3f3f46]'
              }`}
              title="Toggle high-contrast Black and White mode"
              aria-label="Toggle Black and White Vision mode"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>Vision B&W</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand with Pragati Bharat Emblem */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div 
            className="rounded-xl text-left"
            aria-label="Pragati Bharat Portal Home"
          >
            <PragatiLogo 
              variant="header" 
              size="md" 
              isHighContrast={isHighContrast} 
              themeMode={themeMode}
            />
          </div>
        </div>

        {/* View Switcher: Guided Matcher vs Browse All */}
        {onNavigateToWizard && onNavigateToResults && (
          <nav aria-label="Portal Navigation" className={`inline-flex items-center p-0.5 rounded-lg border text-xs font-semibold ${
            isHighContrast
              ? 'border-white bg-black text-white'
              : isLight
                ? 'bg-[#f4f1ea] border-[#e7e4dc] text-[#57534e]'
                : 'bg-[#181d24] border-[#2c313d] text-[#a1a1aa]'
          }`}>
            <button
              id="nav-btn-matcher"
              type="button"
              onClick={onNavigateToWizard}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                !hasCompletedWizard
                  ? isHighContrast
                    ? 'bg-white text-black font-black border-2 border-white'
                    : isLight
                      ? 'bg-white text-[#1c1917] font-bold shadow-xs'
                      : 'bg-[#fafaf9] text-[#18181b] font-bold shadow-xs'
                  : isHighContrast
                    ? 'text-white hover:bg-neutral-800'
                    : isLight
                      ? 'text-[#78716c] hover:text-[#1c1917]'
                      : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Guided Matcher
            </button>
            <button
              id="nav-btn-browse-all"
              type="button"
              onClick={onNavigateToResults}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                hasCompletedWizard
                  ? isHighContrast
                    ? 'bg-white text-black font-black border-2 border-white'
                    : isLight
                      ? 'bg-white text-[#1c1917] font-bold shadow-xs'
                      : 'bg-[#fafaf9] text-[#18181b] font-bold shadow-xs'
                  : isHighContrast
                    ? 'text-white hover:bg-neutral-800'
                    : isLight
                      ? 'text-[#78716c] hover:text-[#1c1917]'
                      : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Browse All {typeof matchCount === 'number' && `(${matchCount})`}
            </button>
          </nav>
        )}

        {/* Real Portals Directory & Language Switcher */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
          
          {/* AI Boat Chat Board Button */}
          {onOpenAiBoat && (
            <button
              id="btn-open-ai-boat-header"
              type="button"
              onClick={onOpenAiBoat}
              className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                isHighContrast
                  ? 'border-white text-white hover:bg-neutral-900'
                  : isLight
                    ? 'bg-[#ffffff] hover:bg-[#f4f2ea] text-[#c2410c] border-[#fed7aa] shadow-[0_1px_2px_rgba(194,65,12,0.06)]'
                    : 'bg-[#21160e] hover:bg-[#2e1d13] text-[#fdba74] border-[#c2410c]/60'
              }`}
              title="Open AI Boat Scholarship Chat Board"
            >
              <Bot className="w-3.5 h-3.5 text-[#c2410c] dark:text-[#fdba74] shrink-0" />
              <span>AI Boat</span>
            </button>
          )}

          {/* Real Portals Directory Button */}
          {onOpenPortalsModal && (
            <button
              id="btn-open-real-portals"
              type="button"
              onClick={onOpenPortalsModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                isHighContrast
                  ? 'border-white text-white hover:bg-neutral-900'
                  : isLight
                    ? 'bg-[#ffffff] hover:bg-[#f4f2ea] text-[#166534] border-[#bbf7d0] shadow-[0_1px_2px_rgba(22,101,52,0.06)]'
                    : 'bg-[#15241b] hover:bg-[#1c3225] text-[#86efac] border-[#166534]/60'
              }`}
              title="Official portal URLs for NSP, MahaDBT, UP, and CSR foundations"
            >
              <Globe className="w-3.5 h-3.5 text-[#166534] dark:text-[#86efac] shrink-0" />
              <span className="hidden sm:inline">Official Portals Directory</span>
              <span className="sm:hidden">Portals</span>
            </button>
          )}

          {/* Language Selector */}
          <div className="flex items-center gap-1.5">
            <label 
              htmlFor="language-dropdown-select" 
              className="sr-only"
            >
              Select Language
            </label>
            <div className="relative flex items-center">
              <Languages className={`w-3.5 h-3.5 absolute left-2.5 pointer-events-none ${isHighContrast ? 'text-white' : 'text-[#78716c]'}`} />
              <select
                id="language-dropdown-select"
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                aria-label="Select Indian Language"
                className={`text-xs font-medium rounded-md pl-8 pr-3 py-1.5 min-h-[36px] border cursor-pointer transition-all outline-hidden focus:ring-1 ${
                  isHighContrast
                    ? 'bg-black border-2 border-white text-white focus:ring-white'
                    : isLight
                      ? 'bg-[#ffffff] border-[#dcd8ce] text-[#292524] hover:border-[#a8a29e] focus:border-[#78716c] focus:ring-[#78716c] shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                      : 'bg-[#1a1d23] border-[#2e3440] text-[#f4f4f5] hover:border-[#475163] focus:ring-[#d97706]'
                }`}
              >
                {SUPPORTED_LANGUAGES.map((lang: LanguageOption) => (
                  <option 
                    key={lang.code} 
                    value={lang.code} 
                    className={isHighContrast ? 'bg-black text-white py-1' : isLight ? 'bg-white text-[#1c1917] py-1' : 'bg-[#181a20] text-[#f4f4f5] py-1'}
                  >
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
