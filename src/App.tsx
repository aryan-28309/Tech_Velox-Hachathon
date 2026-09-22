import React, { useState, useMemo, useEffect } from 'react';
import { 
  SupportedLanguage, 
  StudentProfile, 
  Scholarship, 
  EducationLevel, 
  SocialCategory,
  TextStyle,
  ThemeMode
} from './types';
import { TRANSLATIONS } from './translations';
import { SCHOLARSHIPS_DATA } from './data/scholarships';
import { Header } from './components/Header';
import { StepWizard } from './components/StepWizard';
import { ResultsView } from './components/ResultsView';
import { EligibilityModal } from './components/EligibilityModal';
import { DocumentChecklistPrinter } from './components/DocumentChecklistPrinter';
import { PragatiLogo } from './components/PragatiLogo';
import { OfficialPortalsModal } from './components/OfficialPortalsModal';
import { AiBoatChatBoard } from './components/AiBoatChatBoard';
import { 
  ShieldCheck, 
  CheckCircle,
  X,
  Compass,
  FileCheck2,
  Lock,
  HeartHandshake
} from 'lucide-react';

export default function App() {
  // Multilingual state
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');

  // Modals state
  const [isPortalsModalOpen, setIsPortalsModalOpen] = useState<boolean>(false);
  const [isAiBoatOpen, setIsAiBoatOpen] = useState<boolean>(false);

  // Accessibility & Typography states
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [textStyle, setTextStyle] = useState<TextStyle>(() => {
    try {
      const saved = localStorage.getItem('pragati_text_style');
      if (saved === 'sans' || saved === 'serif' || saved === 'accessible' || saved === 'mono') {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'sans';
  });

  const handleTextStyleChange = (style: TextStyle) => {
    setTextStyle(style);
    try {
      localStorage.setItem('pragati_text_style', style);
    } catch (e) {
      // ignore
    }
  };

  // Theme mode state: 'light' (warm parchment paper default) or 'dark' (mineral charcoal)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('pragati_theme_mode');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'light';
  });

  const toggleThemeMode = () => {
    setThemeMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem('pragati_theme_mode', next);
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('high-contrast');
      if (themeMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isHighContrast, themeMode]);

  const isLight = !isHighContrast && themeMode === 'light';

  const fontStyleClass = 
    textStyle === 'serif' 
      ? 'font-style-serif' 
      : textStyle === 'accessible' 
        ? 'font-style-accessible' 
        : textStyle === 'mono'
          ? 'font-style-mono'
          : 'font-style-sans';

  // Wizard state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [hasCompletedWizard, setHasCompletedWizard] = useState<boolean>(false);

  // Student Profile state
  const [profile, setProfile] = useState<StudentProfile>({
    educationLevel: 'btech_engineering',
    state: 'All India (Central / Any State)',
    category: 'general',
    gender: 'all',
    isSpeciallyAbled: false,
    familyIncome: 450000,
    percentageMarks: 75,
    gradingSystem: 'cgpa',
    cgpa: 7.9,
    sgpa: 8.1,
    institutionName: '',
    institutionType: 'govt_aided_college',
    isNirfOrNaacRecognized: true,
    schoolBoard: 'cbse',
    phdExam: 'ugc_net_jrf',
    mastersPercentage: 68,
    isFullTimePhd: true,
  });

  // Modal states
  const [selectedScholarshipForModal, setSelectedScholarshipForModal] = useState<Scholarship | null>(null);
  const [isChecklistPrinterOpen, setIsChecklistPrinterOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Document readiness state (persisted locally across scholarships)
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set(['doc_aadhaar', 'doc_marksheet']));

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const toggleDoc = (docId: string) => {
    setCheckedDocs((prev) => {
      const next = new Set(prev);
      if (next.has(docId)) {
        next.delete(docId);
      } else {
        next.add(docId);
      }
      return next;
    });
  };

  // Smart Filtering Engine
  const eligibleScholarships = useMemo(() => {
    if (!profile.educationLevel) return SCHOLARSHIPS_DATA;

    return SCHOLARSHIPS_DATA.filter((s) => {
      // 1. Education Level Check
      const matchesEdu = 
        s.educationLevels.includes(profile.educationLevel as EducationLevel) ||
        (profile.educationLevel === 'btech_engineering' && (
          s.educationLevels.includes('undergraduate') || 
          s.educationLevels.includes('btech_engineering')
        )) ||
        (profile.educationLevel === 'medical_health' && (
          s.educationLevels.includes('undergraduate') || 
          s.educationLevels.includes('medical_health')
        )) ||
        (profile.educationLevel === 'diploma_iti' && (
          s.educationLevels.includes('diploma_iti') || 
          s.educationLevels.includes('btech_engineering') ||
          s.educationLevels.includes('higher_secondary_11_12')
        )) ||
        (profile.educationLevel === 'undergraduate' && (
          s.educationLevels.includes('undergraduate') ||
          s.educationLevels.includes('btech_engineering') ||
          s.educationLevels.includes('medical_health')
        )) ||
        (profile.educationLevel === 'higher_secondary_11_12' && (
          s.educationLevels.includes('higher_secondary_11_12')
        )) ||
        (profile.educationLevel === 'school_9_10' && (
          s.educationLevels.includes('school_9_10')
        )) ||
        (profile.educationLevel === 'postgraduate' && (
          s.educationLevels.includes('postgraduate')
        )) ||
        (profile.educationLevel === 'phd_research' && (
          s.educationLevels.includes('phd_research')
        ));

      if (!matchesEdu) return false;

      // 2. State Domicile Check
      if (!s.states.includes('ALL') && profile.state && profile.state !== 'All India (Central / Any State)') {
        if (!s.states.some(st => st.toLowerCase() === profile.state.toLowerCase())) {
          return false;
        }
      }

      // 3. Category Check
      if (s.categories && s.categories.length > 0 && !s.categories.includes('general')) {
        if (profile.category && !s.categories.includes(profile.category as SocialCategory)) {
          return false;
        }
      }

      // 4. Gender Check
      if (s.genderEligibility && s.genderEligibility !== 'all') {
        if (profile.gender && profile.gender !== 'all' && s.genderEligibility !== profile.gender) {
          return false;
        }
      }

      // 5. Specially Abled Check
      if (s.speciallyAbledOnly && !profile.isSpeciallyAbled) {
        return false;
      }

      // 6. Family Income Check
      if (s.maxAnnualIncome !== null && profile.familyIncome) {
        if (profile.familyIncome > s.maxAnnualIncome) {
          return false;
        }
      }

      // 7. Academic Merit Percentage Check
      if (s.minPercentage && profile.percentageMarks) {
        if (profile.percentageMarks < s.minPercentage) {
          return false;
        }
      }

      // 8. Institute Type Check
      if (s.allowedInstitutionTypes && s.allowedInstitutionTypes.length > 0 && profile.institutionType) {
        if (!s.allowedInstitutionTypes.includes(profile.institutionType)) {
          return false;
        }
      }

      return true;
    });
  }, [profile]);

  const handleApplyNow = (scholarship: Scholarship) => {
    setToastMessage(`Opening verified portal for "${scholarship.name}". Applications on official government & CSR portals are 100% FREE!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleRelaxFilters = () => {
    setProfile(prev => ({
      ...prev,
      state: 'All India (Central / Any State)',
      familyIncome: 1200000,
      percentageMarks: 50,
    }));
    setToastMessage(`Showing all scholarships for ${profile.educationLevel?.replace('_', ' ').toUpperCase()} with open criteria!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  return (
    <div className={`min-h-screen flex flex-col ${fontStyleClass} transition-colors ${
      isHighContrast 
        ? 'portal-canvas-bw text-white' 
        : isLight 
          ? 'portal-canvas-light text-[#1c1917]' 
          : 'portal-canvas-dark text-[#f4f4f5]'
    }`}>
      
      {/* Top Accessible Multilingual Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        themeMode={themeMode}
        onToggleThemeMode={toggleThemeMode}
        textStyle={textStyle}
        onTextStyleChange={handleTextStyleChange}
        onOpenPortalsModal={() => setIsPortalsModalOpen(true)}
        onOpenAiBoat={() => setIsAiBoatOpen(true)}
        hasCompletedWizard={hasCompletedWizard}
        onNavigateToWizard={() => setHasCompletedWizard(false)}
        onNavigateToResults={() => setHasCompletedWizard(true)}
        matchCount={eligibleScholarships.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-5 md:py-8 space-y-6">
        {/* Dynamic Display: Wizard Form vs Results View */}
        {!hasCompletedWizard ? (
          <StepWizard
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            profile={profile}
            onProfileChange={setProfile}
            onComplete={() => setHasCompletedWizard(true)}
            currentLang={currentLang}
            isHighContrast={isHighContrast}
            themeMode={themeMode}
            matchCount={eligibleScholarships.length}
            matchedScholarships={eligibleScholarships}
            onOpenDetails={(s) => setSelectedScholarshipForModal(s)}
            onApplyNow={handleApplyNow}
            checkedDocs={checkedDocs}
            onToggleDoc={toggleDoc}
          />
        ) : (
          <ResultsView
            scholarships={eligibleScholarships}
            studentProfile={profile}
            currentLang={currentLang}
            isHighContrast={isHighContrast}
            themeMode={themeMode}
            onEditProfile={() => setHasCompletedWizard(false)}
            onOpenDetails={(s) => setSelectedScholarshipForModal(s)}
            onApplyNow={handleApplyNow}
            onPrintChecklist={() => setIsChecklistPrinterOpen(true)}
            checkedDocs={checkedDocs}
            onToggleDoc={toggleDoc}
            allScholarships={SCHOLARSHIPS_DATA}
            onShowAllCourseScholarships={handleRelaxFilters}
            onProfileChange={setProfile}
          />
        )}
      </main>

      {/* Official Portals Modal */}
      <OfficialPortalsModal
        isOpen={isPortalsModalOpen}
        onClose={() => setIsPortalsModalOpen(false)}
        isHighContrast={isHighContrast}
        themeMode={themeMode}
      />

      {/* Eligibility Deep-Dive Modal */}
      <EligibilityModal
        scholarship={selectedScholarshipForModal}
        onClose={() => setSelectedScholarshipForModal(null)}
        currentLang={currentLang}
        isHighContrast={isHighContrast}
        themeMode={themeMode}
        onPrintChecklist={() => {
          setSelectedScholarshipForModal(null);
          setIsChecklistPrinterOpen(true);
        }}
      />

      {/* Printable Document Checklist Drawer/Modal */}
      <DocumentChecklistPrinter
        isOpen={isChecklistPrinterOpen}
        onClose={() => setIsChecklistPrinterOpen(false)}
        scholarships={eligibleScholarships}
        studentProfile={profile}
        checkedDocs={checkedDocs}
        onToggleDoc={toggleDoc}
        isHighContrast={isHighContrast}
        themeMode={themeMode}
      />

      {/* AI Boat - Interactive Scholarship Chat Board */}
      <AiBoatChatBoard
        isOpen={isAiBoatOpen}
        onClose={() => setIsAiBoatOpen(false)}
        onOpen={() => setIsAiBoatOpen(true)}
        currentLang={currentLang}
        isHighContrast={isHighContrast}
        themeMode={themeMode}
        studentProfile={profile}
      />

      {/* Human Editorial Colophon & Footer */}
      <footer className={`border-t py-10 px-4 mt-16 transition-colors ${
        isHighContrast 
          ? 'bg-black border-2 border-white text-white' 
          : isLight
            ? 'bg-[#f4f1ea] text-[#57534e] border-[#e5e1d8]'
            : 'bg-[#0f1114] text-[#a1a1aa] border-[#22262e]'
      }`}>
        <div className="max-w-6xl mx-auto space-y-6">
          <div className={`border-b pb-6 ${
            isHighContrast ? 'border-white' : isLight ? 'border-[#e4dfd4]' : 'border-[#242832]'
          }`}>
            <div>
              <PragatiLogo variant="header" size="md" isHighContrast={isHighContrast} themeMode={themeMode} />
              <p className={`text-xs mt-2 max-w-md ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#71717a]'
              }`}>
                An independent public-interest directory connecting students directly to verified central, state, and foundation scholarships.
              </p>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#71717a]'
          }`}>
            <p>
              © 2026 Pragati Bharat by Tech Velox. Crafted for educational equity, transparent governance & zero fraud.
            </p>
            <p className={`flex items-center gap-1.5 font-medium ${
              isHighContrast ? 'text-white' : isLight ? 'text-[#166534]' : 'text-[#86efac]'
            }`}>
              <ShieldCheck className="w-4 h-4 shrink-0" />
              100% Free Public Initiative • No Intermediaries Ever
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className={`fixed bottom-6 right-4 sm:right-6 z-50 max-w-md p-4 rounded-xl shadow-xl border flex items-start gap-3 animate-fadeIn ${
            isHighContrast 
              ? 'bg-black text-white border-2 border-white' 
              : 'bg-[#1c1917] text-[#fafaf9] border-[#44403c]'
          }`}
        >
          <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isHighContrast ? 'text-white' : 'text-[#86efac]'}`} />
          <div className="text-xs leading-relaxed flex-1">
            {toastMessage}
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-[#a8a29e] hover:text-white p-1 flex items-center justify-center cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
