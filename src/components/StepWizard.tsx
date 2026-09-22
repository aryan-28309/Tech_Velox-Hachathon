import React from 'react';
import { 
  EducationLevel, 
  SocialCategory, 
  StudentProfile, 
  SupportedLanguage,
  Gender,
  Scholarship,
  ThemeMode
} from '../types';
import { TRANSLATIONS, INDIAN_STATES } from '../translations';
import { ScholarshipCard } from './ScholarshipCard';
import { 
  GraduationCap, 
  BookOpen, 
  Wrench, 
  Award, 
  Microscope, 
  School,
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Percent, 
  IndianRupee,
  MapPin,
  Users,
  HeartHandshake,
  Cpu,
  Stethoscope,
  Building2,
  Landmark,
  Check
} from 'lucide-react';

interface StepWizardProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  profile: StudentProfile;
  onProfileChange: (profile: StudentProfile) => void;
  onComplete: () => void;
  currentLang: SupportedLanguage;
  isHighContrast: boolean;
  themeMode?: ThemeMode;
  matchCount?: number;
  matchedScholarships?: Scholarship[];
  onOpenDetails?: (scholarship: Scholarship) => void;
  onApplyNow?: (scholarship: Scholarship) => void;
  checkedDocs?: Set<string>;
  onToggleDoc?: (docId: string) => void;
}

export const StepWizard: React.FC<StepWizardProps> = ({
  currentStep,
  onStepChange,
  profile,
  onProfileChange,
  onComplete,
  currentLang,
  isHighContrast,
  themeMode = 'dark',
  matchCount,
  matchedScholarships = [],
  onOpenDetails = () => {},
  onApplyNow = () => {},
  checkedDocs = new Set(),
  onToggleDoc = () => {},
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const isLight = !isHighContrast && themeMode === 'light';

  const educationOptions: Array<{
    id: EducationLevel;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
  }> = [
    {
      id: 'btech_engineering',
      title: t.btech_engineering || 'B.Tech / B.E. (Engineering & Technology)',
      description: t.btech_engineering_desc || 'Computer Science, AI, Mechanical, Civil, Electrical, Electronics, IT, Chemical, etc.',
      icon: Cpu,
      badge: 'B.Tech / B.E. / Engineering'
    },
    {
      id: 'medical_health',
      title: t.medical_health || 'Medical / Healthcare (MBBS / BDS / Pharmacy)',
      description: t.medical_health_desc || 'MBBS, BDS, B.Pharm, Nursing, BAMS, BHMS, Allied Health Sciences',
      icon: Stethoscope,
      badge: 'Medical / Healthcare'
    },
    {
      id: 'diploma_iti',
      title: t.diploma_iti || 'Polytechnic / Diploma / ITI',
      description: t.diploma_iti_desc || 'Technical trades, vocational skills, 3-year engineering diplomas',
      icon: Wrench,
      badge: 'Polytechnic / Diploma'
    },
    {
      id: 'undergraduate',
      title: t.undergraduate || 'Degree / Graduation (B.Sc, B.Com, B.A, BCA, BBA)',
      description: t.undergraduate_desc || 'Bachelor’s degree in science, commerce, arts, computer applications, law, B.Ed',
      icon: GraduationCap,
      badge: 'General Degree / UG'
    },
    {
      id: 'higher_secondary_11_12',
      title: t.higher_secondary_11_12 || 'Class 11th & 12th (Higher Secondary / +2 / PUC)',
      description: t.higher_secondary_11_12_desc || 'Arts, Science, Commerce junior college & intermediate',
      icon: BookOpen,
      badge: 'Junior College / +2'
    },
    {
      id: 'school_9_10',
      title: t.school_9_10 || 'Class 9th & 10th (Secondary School)',
      description: t.school_9_10_desc || 'Pre-matric scholarships for board exams and high school expenses',
      icon: School,
      badge: 'Pre-Matric School'
    },
    {
      id: 'postgraduate',
      title: t.postgraduate || 'Postgraduate / Master’s (M.Tech, MBA, M.Sc, MCA, MA)',
      description: t.postgraduate_desc || 'Higher university education & specialized masters courses',
      icon: Award,
      badge: 'Master’s / PG'
    },
    {
      id: 'phd_research',
      title: t.phd_research || 'Ph.D. / Research Fellowship',
      description: t.phd_research_desc || 'Doctoral research, junior research fellowships (JRF/SRF)',
      icon: Microscope,
      badge: 'Doctoral / Ph.D'
    },
  ];

  const categoryOptions: Array<{
    id: SocialCategory;
    name: string;
    subtext: string;
  }> = [
    { id: 'general', name: t.general, subtext: 'Open Merit Schemes' },
    { id: 'obc', name: t.obc, subtext: 'Non-Creamy Layer / Central & State' },
    { id: 'sc', name: t.sc, subtext: 'Post-Matric SC Schemes & Full Waiver' },
    { id: 'st', name: t.st, subtext: 'Tribal Affairs Post-Matric Schemes' },
    { id: 'ews', name: t.ews, subtext: 'Annual Income < ₹8 Lakhs' },
    { id: 'minority', name: t.minority, subtext: 'Ministry of Minority Affairs' }
  ];

  const incomePresets = [
    { label: t.incomePreset1, value: 120000, desc: 'BPL / Antyodaya' },
    { label: t.incomePreset2, value: 200000, desc: 'Eligible for Central Post-Matric' },
    { label: t.incomePreset3, value: 350000, desc: 'Central Sector & NMMS' },
    { label: t.incomePreset4, value: 600000, desc: 'AICTE Pragati & State EBC' },
    { label: t.incomePreset5, value: 900000, desc: 'Merit Scholarships & Open' }
  ];

  const canProceedStep1 = profile.educationLevel !== null;
  const canProceedStep2 = profile.category !== null && profile.state.length > 0;

  const isSchoolStudent = profile.educationLevel === 'school_9_10' || profile.educationLevel === 'higher_secondary_11_12';
  const isPhdScholar = profile.educationLevel === 'phd_research';
  const isCollegeStudent = !isSchoolStudent && !isPhdScholar;

  const currentGrading = profile.gradingSystem || (isCollegeStudent ? 'cgpa' : 'percentage');
  const currentCgpa = profile.cgpa ?? (profile.percentageMarks ? Number((profile.percentageMarks / 9.5).toFixed(2)) : 7.9);
  const currentSgpa = profile.sgpa ?? currentCgpa;

  const handleCgpaChange = (newCgpa: number) => {
    const equivalentPct = Math.min(100, Math.max(35, Number((newCgpa * 9.5).toFixed(1))));
    onProfileChange({
      ...profile,
      gradingSystem: 'cgpa',
      cgpa: newCgpa,
      percentageMarks: equivalentPct
    });
  };

  const handleSgpaChange = (newSgpa: number) => {
    const equivalentPct = Math.min(100, Math.max(35, Number((newSgpa * 9.5).toFixed(1))));
    onProfileChange({
      ...profile,
      gradingSystem: 'sgpa',
      sgpa: newSgpa,
      cgpa: newSgpa,
      percentageMarks: equivalentPct
    });
  };

  const handlePercentageChange = (newPct: number) => {
    const equivalentCgpa = Number((newPct / 9.5).toFixed(2));
    onProfileChange({
      ...profile,
      gradingSystem: 'percentage',
      percentageMarks: newPct,
      cgpa: equivalentCgpa
    });
  };

  const canProceedStep3 = (profile.percentageMarks > 0) || (Boolean(profile.cgpa) && profile.cgpa! > 0);

  const handleNext = () => {
    if (currentStep === 1 && canProceedStep1) onStepChange(2);
    else if (currentStep === 2 && canProceedStep2) onStepChange(3);
    else if (currentStep === 3 && canProceedStep3) onComplete();
  };

  const handleBack = () => {
    if (currentStep > 1) onStepChange(currentStep - 1);
  };

  return (
    <div id="step-wizard-container" className="w-full">
      {/* Progress Bar & Step Tracker */}
      <div className={`p-4 md:p-6 rounded-xl border mb-6 transition-all ${
        isHighContrast 
          ? 'bg-black border-2 border-white text-white' 
          : isLight
            ? 'paper-card-light text-[#1c1917]'
            : 'paper-card-dark text-[#f4f4f5]'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${
              isHighContrast ? 'text-white' : isLight ? 'text-[#78716c]' : 'text-[#fbbf24]'
            }`}>
              {t.stepIndicator.replace('{current}', String(currentStep)).replace('{total}', '3')}
            </span>
            <h2 className={`font-display text-lg md:text-xl font-bold tracking-tight mt-0.5 ${
              isHighContrast ? 'text-white' : isLight ? 'text-[#1c1917]' : 'text-[#f5f5f4]'
            }`}>
              {currentStep === 1 && t.step1Title}
              {currentStep === 2 && t.step2Title}
              {currentStep === 3 && t.step3Title}
            </h2>
          </div>
          <div className={`text-xs font-medium ${
            isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
          }`}>
            {currentStep === 1 && t.step1Subtitle}
            {currentStep === 2 && t.step2Subtitle}
            {currentStep === 3 && t.step3Subtitle}
          </div>
        </div>

        {/* Visual Multi-step Bar */}
        <div className={`relative w-full h-2 rounded-full overflow-hidden border ${
          isHighContrast ? 'bg-black border-2 border-white' : isLight ? 'bg-[#ece9e1] border-[#e0dcd2]' : 'bg-[#15181e] border-[#292d35]'
        }`}>
          <div 
            className={`h-full transition-all duration-300 ease-out ${
              isHighContrast 
                ? 'bg-white' 
                : isLight
                  ? 'bg-[#1c1917]'
                  : 'bg-[#fafaf9]'
            }`}
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        {/* Step Indicator Badges */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <button
            onClick={() => onStepChange(1)}
            className={`py-2 px-1 min-h-[38px] sm:min-h-0 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              currentStep === 1
                ? isHighContrast
                  ? 'bg-white text-black font-black border-2 border-white shadow-none'
                  : isLight
                    ? 'bg-[#1c1917] text-[#fafaf9] border border-[#1c1917] shadow-xs'
                    : 'bg-[#fafaf9] text-[#18181b] font-bold shadow-sm'
                : currentStep > 1
                  ? isHighContrast
                    ? 'bg-black text-white border-2 border-white font-bold'
                    : isLight
                      ? 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]'
                      : 'bg-[#0f281a] text-[#86efac] border border-[#166534]'
                  : isHighContrast
                    ? 'text-neutral-400 bg-black border border-neutral-700'
                    : isLight
                      ? 'text-[#78716c] bg-[#f4f1ea] border border-[#e5e1d8]'
                      : 'text-[#a1a1aa] bg-[#1a1d24] border border-[#2c313d]'
            }`}
          >
            {currentStep > 1 ? (
              <CheckCircle2 className={`w-3.5 h-3.5 ${isHighContrast ? 'text-white' : 'text-[#166534]'}`} />
            ) : (
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                currentStep === 1 
                  ? isHighContrast ? 'bg-black text-white font-bold' : isLight ? 'bg-white text-[#1c1917] font-bold' : 'bg-black text-white font-bold' 
                  : isLight ? 'bg-[#e5e1d8] text-[#57534e]' : 'bg-[#292d36] text-[#a1a1aa]'
              }`}>1</span>
            )}
            <span className="hidden sm:inline">1. Education</span>
            <span className="sm:hidden">1. Edu</span>
          </button>

          <button
            onClick={() => canProceedStep1 && onStepChange(2)}
            disabled={!canProceedStep1}
            className={`py-2 px-1 min-h-[38px] sm:min-h-0 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              currentStep === 2
                ? isHighContrast
                  ? 'bg-white text-black font-black border-2 border-white shadow-none'
                  : isLight
                    ? 'bg-[#1c1917] text-[#fafaf9] border border-[#1c1917] shadow-xs'
                    : 'bg-[#fafaf9] text-[#18181b] font-bold shadow-sm'
                : currentStep > 2
                  ? isHighContrast
                    ? 'bg-black text-white border-2 border-white font-bold cursor-pointer'
                    : isLight
                      ? 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] cursor-pointer'
                      : 'bg-[#0f281a] text-[#86efac] border border-[#166534] cursor-pointer'
                  : canProceedStep1
                    ? isHighContrast
                      ? 'text-white bg-black border border-white cursor-pointer'
                      : isLight
                        ? 'text-[#57534e] bg-[#f4f1ea] hover:bg-[#eeeae0] border border-[#e5e1d8] cursor-pointer'
                        : 'text-[#a1a1aa] bg-[#1a1d24] border border-[#2c313d] hover:border-[#3e4554] cursor-pointer'
                    : 'text-[#a8a29e] bg-[#f4f1ea]/50 opacity-50 cursor-not-allowed border border-transparent'
            }`}
          >
            {currentStep > 2 ? (
              <CheckCircle2 className={`w-3.5 h-3.5 ${isHighContrast ? 'text-white' : 'text-[#166534]'}`} />
            ) : (
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                currentStep === 2 
                  ? isHighContrast ? 'bg-black text-white font-bold' : isLight ? 'bg-white text-[#1c1917] font-bold' : 'bg-black text-white font-bold' 
                  : isLight ? 'bg-[#e5e1d8] text-[#57534e]' : 'bg-[#292d36] text-[#a1a1aa]'
              }`}>2</span>
            )}
            <span className="hidden sm:inline">2. State & Category</span>
            <span className="sm:hidden">2. State</span>
          </button>

          <button
            onClick={() => canProceedStep1 && canProceedStep2 && onStepChange(3)}
            disabled={!canProceedStep1 || !canProceedStep2}
            className={`py-2 px-1 min-h-[38px] sm:min-h-0 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              currentStep === 3
                ? isHighContrast
                  ? 'bg-white text-black font-black border-2 border-white shadow-none'
                  : isLight
                    ? 'bg-[#1c1917] text-[#fafaf9] border border-[#1c1917] shadow-xs'
                    : 'bg-[#fafaf9] text-[#18181b] font-bold shadow-sm'
                : canProceedStep2
                  ? isHighContrast
                    ? 'text-white bg-black border border-white cursor-pointer'
                    : isLight
                      ? 'text-[#57534e] bg-[#f4f1ea] hover:bg-[#eeeae0] border border-[#e5e1d8] cursor-pointer'
                      : 'text-[#a1a1aa] bg-[#1a1d24] border border-[#2c313d] hover:border-[#3e4554] cursor-pointer'
                  : 'text-[#a8a29e] bg-[#f4f1ea]/50 opacity-50 cursor-not-allowed border border-transparent'
            }`}
          >
            <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
              currentStep === 3 
                ? isHighContrast ? 'bg-black text-white font-bold' : isLight ? 'bg-white text-[#1c1917] font-bold' : 'bg-black text-white font-bold' 
                : isLight ? 'bg-[#e5e1d8] text-[#57534e]' : 'bg-[#292d36] text-[#a1a1aa]'
            }`}>3</span>
            <span className="hidden sm:inline">3. Marks & Income</span>
            <span className="sm:hidden">3. Income</span>
          </button>
        </div>

        {/* Live Matching Notification Banner */}
        {typeof matchCount === 'number' && (
          <div className={`mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
            isHighContrast ? 'border-white' : isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div className={`flex items-center gap-2 font-medium ${
              isHighContrast ? 'text-white' : isLight ? 'text-slate-700' : 'text-slate-200'
            }`}>
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isHighContrast ? 'bg-white' : 'bg-emerald-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isHighContrast ? 'bg-white' : 'bg-emerald-500'
                }`}></span>
              </span>
              <span>
                {matchCount > 0 
                  ? `Live Count: ${matchCount} scholarships currently match your selection!`
                  : `0 exact matches with current filters. You can still view all scholarships.`}
              </span>
            </div>

            {matchCount > 0 && (
              <button
                type="button"
                onClick={onComplete}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  isHighContrast
                    ? 'bg-white text-black font-black border-2 border-white'
                    : isLight
                      ? 'bg-slate-900 hover:bg-black text-white shadow-2xs'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
                }`}
              >
                <span>View Results ({matchCount})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* STEP 1: EDUCATION LEVEL SELECTION */}
      {currentStep === 1 && (
        <div id="step-1-content" className="space-y-4">
          <p className={`text-xs font-medium mb-2 ${
            isHighContrast ? 'text-white' : isLight ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Select what you are currently studying:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {educationOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = profile.educationLevel === opt.id;
              return (
                <button
                  key={opt.id}
                  id={`edu-option-${opt.id}`}
                  onClick={() => onProfileChange({ ...profile, educationLevel: opt.id })}
                  className={`p-4 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[130px] cursor-pointer group ${
                    isSelected
                      ? isHighContrast
                        ? 'border-2 border-white bg-white text-black ring-2 ring-white font-black'
                        : isLight
                          ? 'border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900 shadow-xs'
                          : 'border-amber-400 bg-slate-800 text-white ring-1 ring-amber-400 shadow-md'
                      : isHighContrast
                        ? 'border-2 border-white bg-black text-white hover:bg-neutral-900'
                        : isLight
                          ? 'border-slate-200 hover:border-slate-300 bg-white text-slate-800 shadow-2xs hover:bg-slate-50/50'
                          : 'border-slate-800 bg-slate-900 text-slate-100 hover:border-slate-700 hover:bg-slate-800/60 shadow-md'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className={`p-2 rounded-lg transition-colors ${
                        isSelected 
                          ? isHighContrast
                            ? 'bg-black text-white border border-black'
                            : isLight
                              ? 'bg-slate-900 text-white'
                              : 'bg-amber-400 text-slate-950 font-bold'
                          : isHighContrast
                            ? 'bg-neutral-900 text-white border border-white'
                            : isLight
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-slate-800 text-slate-300'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                        isSelected
                          ? isHighContrast
                            ? 'bg-black text-white border border-black font-black'
                            : isLight
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                          : isHighContrast
                            ? 'bg-black text-white border border-white'
                            : isLight
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {opt.badge}
                      </span>
                    </div>
                    <h3 className={`font-bold text-base tracking-tight mb-1 ${
                      isSelected 
                        ? isHighContrast ? 'text-black' : isLight ? 'text-slate-900' : 'text-white' 
                        : isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-slate-100'
                    }`}>
                      {opt.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${
                      isSelected 
                        ? isHighContrast ? 'text-neutral-900 font-semibold' : isLight ? 'text-slate-600' : 'text-slate-300' 
                        : isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {opt.description}
                    </p>
                  </div>

                  {isSelected && (
                    <div className={`mt-2.5 flex items-center gap-1.5 text-xs font-bold ${
                      isHighContrast ? 'text-black font-black' : isLight ? 'text-slate-900' : 'text-amber-300'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: STATE & SOCIAL CATEGORY & SPECIAL GROUPS */}
      {currentStep === 2 && (
        <div id="step-2-content" className="space-y-4">
          {/* State of Domicile Selection */}
          <div className={`p-4 md:p-5 rounded-xl border ${
            isHighContrast 
              ? 'bg-black border-2 border-white text-white' 
              : isLight
                ? 'bg-white border-slate-200/90 shadow-xs text-slate-800'
                : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
          }`}>
            <div className="flex items-center gap-2 mb-2.5">
              <MapPin className={`w-4 h-4 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-600' : 'text-amber-400'}`} />
              <label htmlFor="state-select" className={`text-sm font-bold ${
                isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {t.selectState}
              </label>
            </div>
            <select
              id="state-select"
              value={profile.state}
              onChange={(e) => onProfileChange({ ...profile, state: e.target.value })}
              className={`w-full text-sm font-medium rounded-lg p-2.5 border cursor-pointer transition-all outline-hidden ${
                isHighContrast
                  ? 'bg-black border-2 border-white text-white focus:ring-white'
                  : isLight
                    ? 'bg-white border-slate-200 text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
                    : 'bg-slate-800 border-slate-700 text-slate-100 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
              }`}
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st} className={isHighContrast ? "bg-black text-white" : isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>
                  {st}
                </option>
              ))}
            </select>
            <p className={`text-xs mt-2 ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Select the state where your family holds an official Domicile or Residence Certificate.
            </p>
          </div>

          {/* Social Category Cards */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Users className={`w-4 h-4 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-600' : 'text-amber-400'}`} />
              <h3 className={`text-sm font-bold ${
                isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
              }`}>{t.selectCategory}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {categoryOptions.map((cat) => {
                const isSelected = profile.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`cat-option-${cat.id}`}
                    onClick={() => onProfileChange({ ...profile, category: cat.id })}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? isHighContrast
                          ? 'border-2 border-white bg-white text-black font-black'
                          : isLight
                            ? 'border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900 shadow-xs'
                            : 'border-amber-400 bg-slate-800 text-white ring-1 ring-amber-400 shadow-sm'
                        : isHighContrast
                          ? 'border border-white bg-black text-white hover:bg-neutral-900'
                          : isLight
                            ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
                            : 'border-slate-800 bg-slate-900 text-slate-200 hover:border-slate-700 hover:bg-slate-800/60 shadow-xs'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block">{cat.name}</span>
                      <span className={`text-[11px] block mt-0.5 ${
                        isSelected 
                          ? isHighContrast ? 'text-neutral-900' : isLight ? 'text-slate-600' : 'text-slate-300'
                          : isHighContrast ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        {cat.subtext}
                      </span>
                    </div>
                    {isSelected && <CheckCircle2 className={`w-4 h-4 shrink-0 ${isHighContrast ? 'text-black' : isLight ? 'text-emerald-600' : 'text-amber-400'}`} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gender & Specially Abled Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Gender Selection */}
            <div className={`p-4 rounded-xl border ${
              isHighContrast 
                ? 'bg-black border-2 border-white text-white' 
                : isLight
                  ? 'bg-white border-slate-200/90 shadow-xs text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
            }`}>
              <label className={`text-xs font-bold block mb-2 uppercase tracking-wider ${
                isHighContrast ? 'text-white' : isLight ? 'text-slate-700' : 'text-slate-300'
              }`}>{t.gender}</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'all' as Gender, label: t.genderAll || 'All', icon: '👥' },
                  { id: 'female' as Gender, label: t.genderFemale || 'Female', icon: '👩' },
                  { id: 'male' as Gender, label: t.genderMale || 'Male', icon: '👨' }
                ].map((g) => (
                  <button
                    key={g.id}
                    id={`gender-btn-${g.id}`}
                    type="button"
                    onClick={() => onProfileChange({ ...profile, gender: g.id })}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1 min-h-[48px] ${
                      profile.gender === g.id
                        ? isHighContrast
                          ? 'bg-white text-black border-2 border-white font-black'
                          : isLight
                            ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                            : 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-sm'
                        : isHighContrast
                          ? 'bg-black text-white border border-neutral-600 hover:border-white'
                          : isLight
                            ? 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                    }`}
                  >
                    <span className="text-sm leading-none">{g.icon}</span>
                    <span className="leading-tight text-[11px] line-clamp-1">{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specially Abled (Divyangjan PwD) */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              isHighContrast 
                ? 'bg-black border-2 border-white text-white' 
                : isLight
                  ? 'bg-white border-slate-200/90 shadow-xs text-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
            }`}>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <HeartHandshake className={`w-4 h-4 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                  <label className={`text-xs font-bold uppercase tracking-wider ${
                    isHighContrast ? 'text-white' : isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>{t.speciallyAbled}</label>
                </div>
                <p className={`text-xs mb-3 ${
                  isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  UDID / government disability certificate (40%+)?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="pwd-no-btn"
                  onClick={() => onProfileChange({ ...profile, isSpeciallyAbled: false })}
                  className={`py-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                    !profile.isSpeciallyAbled
                      ? isHighContrast
                        ? 'bg-white text-black border-2 border-white font-black'
                        : isLight
                          ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                          : 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-sm'
                      : isHighContrast
                        ? 'bg-black text-white border border-neutral-600'
                        : isLight
                          ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {t.no}
                </button>
                <button
                  id="pwd-yes-btn"
                  onClick={() => onProfileChange({ ...profile, isSpeciallyAbled: true })}
                  className={`py-2 text-xs font-medium rounded-lg border cursor-pointer transition-colors ${
                    profile.isSpeciallyAbled
                      ? isHighContrast
                        ? 'bg-white text-black border-2 border-white font-black'
                        : isLight
                          ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-xs'
                          : 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-sm'
                      : isHighContrast
                        ? 'bg-black text-white border border-neutral-600'
                        : isLight
                          ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {t.yes} (Divyangjan)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: ACADEMIC SCORING & ANNUAL FAMILY INCOME */}
      {currentStep === 3 && (
        <div id="step-3-content" className="space-y-6">

          {/* 1. SCHOOL STUDENTS (Class 9th to 12th): Board Marks & School Details */}
          {isSchoolStudent && (
            <div className={`p-4 md:p-5 rounded-xl border ${
              isHighContrast 
                ? 'bg-black border-2 border-white text-white' 
                : isLight
                  ? 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
                  : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <School className={`w-4 h-4 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                  <label htmlFor="marks-slider" className={`text-sm font-bold ${isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'}`}>
                    {t.schoolMarksTitle || "School Examination Marks (Class 9th - 12th)"}
                  </label>
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-sm font-bold ${
                  isHighContrast 
                    ? 'bg-white text-black border-2 border-white' 
                    : isLight
                      ? 'bg-slate-100 text-slate-900 border border-slate-200'
                      : 'bg-slate-800 text-amber-300 border border-slate-700'
                }`}>
                  <span>{profile.percentageMarks}%</span>
                </div>
              </div>
              <p className={`text-xs mb-3 ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {t.marksHelper || "Your overall percentage in the latest completed standard or board exam"}
              </p>

              <input
                id="marks-slider"
                type="range"
                min="35"
                max="100"
                step="1"
                value={profile.percentageMarks}
                onChange={(e) => handlePercentageChange(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  isLight ? 'bg-slate-200 accent-slate-900' : 'bg-slate-800 accent-amber-400'
                }`}
              />

              <div className={`flex justify-between text-xs font-medium mt-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>35% (Pass)</span>
                <span>60% (First Division)</span>
                <span>75% (Distinction)</span>
                <span>90%+ (Merit)</span>
              </div>

              {/* Quick Marks Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {[50, 60, 75, 85, 95].map((mk) => (
                  <button
                    key={mk}
                    onClick={() => handlePercentageChange(mk)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                      profile.percentageMarks === mk
                        ? isHighContrast
                          ? 'bg-white text-black border-2 border-white font-black'
                          : isLight
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-sm'
                        : isHighContrast
                          ? 'bg-black text-white border border-neutral-600'
                          : isLight
                            ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {mk}%
                  </button>
                ))}
              </div>

              {/* School Board Affiliation & Name */}
              <div className={`mt-4 pt-3 border-t space-y-2.5 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <label className={`text-xs font-bold uppercase tracking-wider block ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  {t.schoolBoardLabel || "School Board Affiliation"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cbse', label: 'CBSE' },
                    { id: 'icse', label: 'ICSE / ISC' },
                    { id: 'state_board', label: 'State Board' },
                    { id: 'other', label: 'Other / NIOS' }
                  ].map((board) => (
                    <button
                      key={board.id}
                      onClick={() => onProfileChange({ ...profile, schoolBoard: board.id as any })}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                        (profile.schoolBoard || 'cbse') === board.id
                          ? isLight
                            ? 'bg-slate-900 text-white border-slate-900 font-bold'
                            : 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                          : isLight
                            ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {board.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className={`text-xs font-medium block mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {t.institutionNameLabel || "School / Junior College Name (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={profile.institutionName || ''}
                    onChange={(e) => onProfileChange({ ...profile, institutionName: e.target.value })}
                    placeholder="e.g., Kendriya Vidyalaya, Govt Girls Inter College..."
                    className={`w-full px-3 py-2 rounded-lg text-xs md:text-sm border transition-all outline-hidden ${
                      isLight 
                        ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-slate-900' 
                        : 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-amber-400'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. COLLEGE & UNIVERSITY STUDENTS: CGPA / SGPA / % */}
          {isCollegeStudent && (
            <div className="space-y-4">
              {/* Grading System & Score */}
              <div className={`p-4 md:p-5 rounded-xl border ${
                isHighContrast 
                  ? 'bg-black border-2 border-white text-white' 
                  : isLight
                    ? 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
                    : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className={`w-4 h-4 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                    <div>
                      <h3 className={`text-sm font-bold ${isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'}`}>
                        {t.collegeAcademicTitle || "College Academic Performance"}
                      </h3>
                      <p className={`text-xs ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Select CGPA, SGPA, or Percentage from your marksheet
                      </p>
                    </div>
                  </div>

                  {/* Format Toggle */}
                  <div className={`flex items-center p-0.5 rounded-lg border ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
                  }`}>
                    <button
                      onClick={() => handleCgpaChange(currentCgpa)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        currentGrading === 'cgpa'
                          ? isLight ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'bg-amber-400 text-slate-950 font-bold'
                          : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      CGPA
                    </button>
                    <button
                      onClick={() => handleSgpaChange(currentSgpa)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        currentGrading === 'sgpa'
                          ? isLight ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'bg-amber-400 text-slate-950 font-bold'
                          : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      SGPA
                    </button>
                    <button
                      onClick={() => handlePercentageChange(profile.percentageMarks || 75)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        currentGrading === 'percentage'
                          ? isLight ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'bg-amber-400 text-slate-950 font-bold'
                          : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      %
                    </button>
                  </div>
                </div>

                {/* CGPA / SGPA Slider */}
                {(currentGrading === 'cgpa' || currentGrading === 'sgpa') && (
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                        {currentGrading === 'cgpa' ? 'Cumulative GPA (CGPA)' : 'Semester GPA (SGPA)'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          ≈ {profile.percentageMarks}%
                        </span>
                        <div className={`px-2.5 py-0.5 rounded-md text-sm font-bold ${
                          isLight ? 'bg-slate-100 text-slate-900 border border-slate-200' : 'bg-slate-800 text-amber-300 border border-slate-700'
                        }`}>
                          {currentGrading === 'cgpa' ? currentCgpa.toFixed(2) : currentSgpa.toFixed(2)} / 10.0
                        </div>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="4.0"
                      max="10.0"
                      step="0.1"
                      value={currentGrading === 'cgpa' ? currentCgpa : currentSgpa}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (currentGrading === 'cgpa') handleCgpaChange(val);
                        else handleSgpaChange(val);
                      }}
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                        isLight ? 'bg-slate-200 accent-slate-900' : 'bg-slate-800 accent-amber-400'
                      }`}
                    />

                    <div className={`flex justify-between text-xs font-medium mt-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      <span>4.0 (Pass)</span>
                      <span>6.0 (60%)</span>
                      <span>7.5 (AICTE Merit)</span>
                      <span>8.5+ (Distinction)</span>
                      <span>10.0 (Outstanding)</span>
                    </div>

                    {/* Quick CGPA Presets */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {[6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((cg) => (
                        <button
                          key={cg}
                          onClick={() => {
                            if (currentGrading === 'cgpa') handleCgpaChange(cg);
                            else handleSgpaChange(cg);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                            Math.abs((currentGrading === 'cgpa' ? currentCgpa : currentSgpa) - cg) < 0.05
                              ? isLight
                                ? 'bg-slate-900 text-white border-slate-900 font-bold'
                                : 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                              : isLight
                                ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          {cg.toFixed(1)} CGPA
                        </button>
                      ))}
                    </div>

                    {/* AICTE / UGC conversion formula notice */}
                    <div className={`mt-3 p-2.5 rounded-lg border flex items-center gap-2 text-xs ${
                      isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-800/80 border-slate-700 text-slate-300'
                    }`}>
                      <Percent className={`w-4 h-4 shrink-0 ${isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                      <span>
                        <strong>AICTE/CBSE formula:</strong> Percentage = CGPA × 9.5 (Your {currentGrading === 'cgpa' ? currentCgpa.toFixed(1) : currentSgpa.toFixed(1)} CGPA ≈ <strong>{profile.percentageMarks}%</strong>).
                      </span>
                    </div>
                  </div>
                )}

                {/* Percentage Slider (if toggled) */}
                {currentGrading === 'percentage' && (
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>Degree / Semester Marks (%)</span>
                      <div className={`px-2.5 py-0.5 rounded-md text-sm font-bold ${
                        isLight ? 'bg-slate-100 text-slate-900 border border-slate-200' : 'bg-slate-800 text-amber-300 border border-slate-700'
                      }`}>
                        {profile.percentageMarks}%
                      </div>
                    </div>

                    <input
                      type="range"
                      min="35"
                      max="100"
                      step="1"
                      value={profile.percentageMarks}
                      onChange={(e) => handlePercentageChange(Number(e.target.value))}
                      className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                        isLight ? 'bg-slate-200 accent-slate-900' : 'bg-slate-800 accent-amber-400'
                      }`}
                    />

                    <div className={`flex justify-between text-xs font-medium mt-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      <span>35% (Pass)</span>
                      <span>55% (Second Div)</span>
                      <span>60% (First Div)</span>
                      <span>75% (Distinction)</span>
                      <span>90%+ (Topper)</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {[55, 60, 70, 75, 80, 85, 90].map((mk) => (
                        <button
                          key={mk}
                          onClick={() => handlePercentageChange(mk)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                            profile.percentageMarks === mk
                              ? isLight
                                ? 'bg-slate-900 text-white border-slate-900 font-bold'
                                : 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                              : isLight
                                ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          {mk}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. PH.D. & RESEARCH SCHOLARS */}
          {isPhdScholar && (
            <div className="space-y-4">
              <div className={`p-4 md:p-5 rounded-xl border ${
                isHighContrast 
                  ? 'bg-black border-2 border-white text-white' 
                  : isLight
                    ? 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
                    : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Microscope className={`w-4 h-4 ${isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                  <div>
                    <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {t.phdAcademicTitle || "Ph.D. Doctoral Fellowship & Research Eligibility"}
                    </h3>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      National fellowship qualification and doctoral research parameters
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  <label className={`text-xs font-bold uppercase tracking-wider block ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Qualifying Fellowship Exam / Entrance
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'ugc_net_jrf', title: 'UGC-NET JRF Qualified', award: '₹37,000 - ₹42,000 / mo', desc: 'National Fellowship for Humanities & Commerce' },
                      { id: 'csir_net_jrf', title: 'CSIR-NET JRF Qualified', award: '₹37,000 - ₹42,000 / mo', desc: 'Joint CSIR-UGC for Science & Engineering' },
                      { id: 'gate', title: 'GATE Qualified (Score 650+)', award: 'PMRF Eligible', desc: 'MHRD / PMRF Fellowship for Tech & Science' },
                      { id: 'icmr_dbt_jrf', title: 'ICMR / DBT / ICSSR JRF', award: '₹37,000 / mo', desc: 'Biomedical & Social Science Fellowships' },
                      { id: 'institutional_exam', title: 'Institutional Ph.D. Entrance', award: 'Institute Assistantship', desc: 'University / IIT departmental scholarship' },
                      { id: 'none', title: 'Direct Enrolled Scholar', award: 'Open / State Schemes', desc: 'Pursuing or applying for doctoral admission' }
                    ].map((exam) => {
                      const isSelected = (profile.phdExam || 'ugc_net_jrf') === exam.id;
                      return (
                        <button
                          key={exam.id}
                          onClick={() => onProfileChange({ ...profile, phdExam: exam.id as any })}
                          className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                            isSelected
                              ? isLight
                                ? 'bg-slate-50 border-slate-900 text-slate-900 ring-1 ring-slate-900'
                                : 'bg-slate-800 border-amber-400 text-amber-200 ring-1 ring-amber-400'
                              : isLight
                                ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold">{exam.title}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold border ${
                              isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-800 text-emerald-300 border-slate-700'
                            }`}>
                              {exam.award}
                            </span>
                          </div>
                          <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{exam.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  {profile.phdExam === 'gate' && (
                    <div className={`p-3 rounded-lg border mt-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800 border-slate-700'}`}>
                      <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        GATE Score (Out of 1000)
                      </label>
                      <input
                        type="number"
                        min="300"
                        max="1000"
                        value={profile.gateScore || 680}
                        onChange={(e) => onProfileChange({ ...profile, gateScore: Number(e.target.value) })}
                        className={`w-40 px-2.5 py-1.5 rounded-md text-xs border outline-hidden ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-slate-100'
                        }`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Annual Family Income Input */}
          <div className={`p-4 md:p-5 rounded-xl border ${
            isHighContrast 
              ? 'bg-black border-2 border-white text-white' 
              : isLight
                ? 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
                : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <IndianRupee className={`w-4 h-4 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                <label htmlFor="income-input" className={`text-sm font-bold ${isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'}`}>
                  {t.incomeTitle}
                </label>
              </div>
              <div className={`px-2.5 py-0.5 rounded-lg text-sm font-bold ${
                isHighContrast 
                  ? 'bg-white text-black border-2 border-white' 
                  : isLight
                    ? 'bg-slate-100 text-slate-900 border border-slate-200'
                    : 'bg-slate-800 text-emerald-300 border border-slate-700'
              }`}>
                ₹{(profile.familyIncome / 100000).toFixed(2)} Lakhs / yr
              </div>
            </div>
            <p className={`text-xs mb-3 ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>{t.incomeHelper}</p>

            {/* Income Preset Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {incomePresets.map((preset, idx) => {
                const isSelected = profile.familyIncome === preset.value;
                return (
                  <button
                    key={idx}
                    id={`income-preset-${idx}`}
                    onClick={() => onProfileChange({ ...profile, familyIncome: preset.value })}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? isHighContrast
                          ? 'border-2 border-white bg-white text-black font-black'
                          : isLight
                            ? 'border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900 font-bold'
                            : 'border-amber-400 bg-slate-800 text-amber-200 font-bold ring-1 ring-amber-400'
                        : isHighContrast
                          ? 'border border-neutral-600 bg-black text-white hover:border-white'
                          : isLight
                            ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                            : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{preset.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom Income Slider */}
            <div className={`pt-2 border-t ${
              isHighContrast ? 'border-white' : isLight ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>Fine-tune exact income:</span>
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-amber-300'}`}>₹{profile.familyIncome.toLocaleString('en-IN')}</span>
              </div>
              <input
                id="income-slider"
                type="range"
                min="50000"
                max="1200000"
                step="10000"
                value={profile.familyIncome}
                onChange={(e) => onProfileChange({ ...profile, familyIncome: Number(e.target.value) })}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  isLight ? 'bg-slate-200 accent-slate-900' : 'bg-slate-800 accent-amber-400'
                }`}
              />
              <div className={`flex justify-between text-[11px] mt-1 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                <span>₹50,000</span>
                <span>₹2.5L</span>
                <span>₹4.5L</span>
                <span>₹8L</span>
                <span>₹12L</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className={`mt-6 flex items-center justify-between gap-3 pt-4 border-t ${
        isHighContrast ? 'border-white' : isLight ? 'border-slate-200' : 'border-slate-800'
      }`}>
        {currentStep > 1 ? (
          <button
            id="wizard-btn-back"
            onClick={handleBack}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] rounded-md font-semibold text-xs md:text-sm cursor-pointer transition-colors border ${
              isHighContrast
                ? 'border-2 border-white text-white hover:bg-neutral-900'
                : isLight
                  ? 'border-[#dcd7cb] text-[#44403c] bg-[#ffffff] hover:bg-[#f5f2eb] shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                  : 'border-[#2e3440] bg-[#1a1d24] text-[#d4d4d8] hover:bg-[#222731]'
            }`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>{t.btnBack}</span>
          </button>
        ) : (
          <div />
        )}

        <button
          id="wizard-btn-next"
          onClick={handleNext}
          disabled={
            (currentStep === 1 && !canProceedStep1) ||
            (currentStep === 2 && !canProceedStep2) ||
            (currentStep === 3 && !canProceedStep3)
          }
          className={`flex items-center justify-center gap-2 px-6 py-2.5 min-h-[40px] rounded-md font-semibold text-xs md:text-sm cursor-pointer transition-all active:translate-y-0.5 ${
            isHighContrast
              ? 'bg-white text-black border-2 border-white font-black hover:bg-neutral-200'
              : isLight
                ? 'bg-[#1c1917] hover:bg-[#000000] text-[#fafaf9] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                : 'bg-[#fafaf9] hover:bg-[#ffffff] text-[#18181b] font-bold shadow-sm'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {currentStep === 3 ? (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{t.btnFindScholarships}</span>
            </>
          ) : (
            <>
              <span>{t.btnNext}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Live Matching Scholarships Preview */}
      {matchedScholarships.length > 0 && (
        <section aria-label="Live Matching Scholarships" className={`mt-8 pt-6 border-t ${
          isHighContrast ? 'border-white' : isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-4 rounded-xl border ${
            isHighContrast
              ? 'bg-black border-2 border-white text-white'
              : isLight
                ? 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
                : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-ping ${isHighContrast ? 'bg-white' : 'bg-emerald-500'}`} />
                <h3 className={`text-base font-bold ${isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'}`}>
                  Live Matched Schemes ({matchedScholarships.length})
                </h3>
              </div>
              <p className={`text-xs mt-0.5 ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Filtered by your selected course, state, and category
              </p>
            </div>

            <button
              type="button"
              onClick={onComplete}
              className={`px-3.5 py-2 rounded-lg font-bold text-xs cursor-pointer transition-all whitespace-nowrap ${
                isHighContrast
                  ? 'bg-white text-black border-2 border-white font-black'
                  : isLight
                    ? 'bg-slate-900 hover:bg-black text-white shadow-2xs'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
              }`}
            >
              Open Full Results ({matchedScholarships.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {matchedScholarships.slice(0, 4).map((s) => (
              <ScholarshipCard
                key={s.id}
                scholarship={s}
                studentProfile={profile}
                currentLang={currentLang}
                isHighContrast={isHighContrast}
                themeMode={themeMode}
                onOpenDetails={onOpenDetails}
                onApplyNow={onApplyNow}
                checkedDocs={checkedDocs}
                onToggleDoc={onToggleDoc}
              />
            ))}
          </div>

          {matchedScholarships.length > 4 && (
            <div className="text-center mt-5">
              <button
                type="button"
                onClick={onComplete}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all border ${
                  isHighContrast
                    ? 'bg-white text-black border-2 border-white font-black'
                    : isLight
                      ? 'border-slate-200 text-slate-800 bg-white hover:bg-slate-50 shadow-2xs'
                      : 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                }`}
              >
                View All {matchedScholarships.length} Matching Scholarships With Full Filters →
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
