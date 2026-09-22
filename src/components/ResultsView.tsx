import React, { useState, useMemo } from 'react';
import { Scholarship, StudentProfile, SupportedLanguage, ThemeMode } from '../types';
import { TRANSLATIONS } from '../translations';
import { getScholarshipTimeline } from '../utils/dateUtils';
import { ScholarshipCard } from './ScholarshipCard';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Info,
  GraduationCap
} from 'lucide-react';

interface ResultsViewProps {
  scholarships: Scholarship[];
  studentProfile: StudentProfile;
  currentLang: SupportedLanguage;
  isHighContrast: boolean;
  themeMode?: ThemeMode;
  onEditProfile: () => void;
  onOpenDetails: (scholarship: Scholarship) => void;
  onApplyNow: (scholarship: Scholarship) => void;
  onPrintChecklist: () => void;
  checkedDocs: Set<string>;
  onToggleDoc: (docId: string) => void;
  allScholarships?: Scholarship[];
  onShowAllCourseScholarships?: () => void;
  onProfileChange?: (profile: StudentProfile) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  scholarships,
  studentProfile,
  currentLang,
  isHighContrast,
  themeMode = 'dark',
  onEditProfile,
  onOpenDetails,
  onApplyNow,
  onPrintChecklist,
  checkedDocs,
  onToggleDoc,
  allScholarships = [],
  onShowAllCourseScholarships,
  onProfileChange,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const isLight = !isHighContrast && themeMode === 'light';

  // Filter refinement states
  const [providerTypeFilter, setProviderTypeFilter] = useState<string>('all');
  const [genderSchemeFilter, setGenderSchemeFilter] = useState<'all' | 'female' | 'transgender'>('all');
  const [sortBy, setSortBy] = useState<'amount' | 'deadline' | 'income'>('amount');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtering matching logic
  const filteredList = useMemo(() => {
    return scholarships
      .filter((s) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches = 
            s.name.toLowerCase().includes(q) ||
            s.provider.toLowerCase().includes(q) ||
            s.overview.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Provider type filter
        if (providerTypeFilter !== 'all' && s.providerType !== providerTypeFilter) {
          return false;
        }

        // Gender scheme refinement filter
        if (genderSchemeFilter === 'female' && s.genderEligibility !== 'female') {
          return false;
        }
        if (genderSchemeFilter === 'transgender' && s.genderEligibility !== 'transgender') {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'amount') {
          return b.awardAmountNumeric - a.awardAmountNumeric;
        }
        if (sortBy === 'income') {
          return (a.maxAnnualIncome || 9999999) - (b.maxAnnualIncome || 9999999);
        }
        // Sort by deadline / days left (closest deadline first)
        const daysA = getScholarshipTimeline(a.endDate || a.deadline, a.startDate).daysLeft;
        const daysB = getScholarshipTimeline(b.endDate || b.deadline, b.startDate).daysLeft;
        return daysA - daysB;
      });
  }, [scholarships, providerTypeFilter, genderSchemeFilter, sortBy, searchQuery]);

  return (
    <div id="scholarships-results-view" className="space-y-5">
      {/* Top Banner: "Found X scholarships you are eligible for!" */}
      <div className={`p-5 md:p-6 rounded-2xl border transition-all ${
        isHighContrast
          ? 'bg-black border-2 border-white text-white shadow-none'
          : isLight
            ? 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
            : 'bg-slate-900 border-slate-800 text-white shadow-md'
      }`}>
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
              isHighContrast 
                ? 'bg-white text-black font-extrabold border-2 border-white' 
                : isLight
                  ? 'bg-slate-100 text-slate-800 border border-slate-200'
                  : 'bg-slate-800 text-amber-300 border border-slate-700'
            }`}>
              <Sparkles className={`w-4 h-4 shrink-0 ${isHighContrast ? 'text-black' : isLight ? 'text-slate-700' : 'text-amber-400'}`} /> Matched Schemes
            </span>
            <span className={`text-xs font-medium ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Verified with National Scholarship Portal database
            </span>
          </div>

          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2 ${
            isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
          }`}>
            {t.resultsFound.replace('{count}', String(filteredList.length))}
          </h2>

          {/* Student Profile Recap Strip */}
          <div className={`flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t text-xs font-medium ${
            isHighContrast ? 'border-white' : isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <span className={`px-2.5 py-1 rounded-md border ${
              isHighContrast 
                ? 'bg-black text-white border border-white' 
                : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}>
              🎓 {studentProfile.educationLevel?.replace('_', ' ').toUpperCase()}
            </span>
            <span className={`px-2.5 py-1 rounded-md border ${
              isHighContrast 
                ? 'bg-black text-white border border-white' 
                : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}>
              📍 {studentProfile.state}
            </span>
            <span className={`px-2.5 py-1 rounded-md border ${
              isHighContrast 
                ? 'bg-black text-white border border-white' 
                : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}>
              👥 {studentProfile.category?.toUpperCase()}
            </span>
            <span className={`px-2.5 py-1 rounded-md border ${
              isHighContrast 
                ? 'bg-black text-white border border-white' 
                : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}>
              💰 ₹{(studentProfile.familyIncome / 100000).toFixed(2)}L/yr
            </span>
            <span className={`px-2.5 py-1 rounded-md border ${
              isHighContrast 
                ? 'bg-black text-white border border-white' 
                : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}>
              {studentProfile.educationLevel === 'phd_research'
                ? `🔬 Ph.D: ${studentProfile.phdExam ? studentProfile.phdExam.replace(/_/g, ' ').toUpperCase() : 'Scholar'} (${studentProfile.percentageMarks}%)`
                : studentProfile.gradingSystem === 'cgpa' || studentProfile.cgpa
                  ? `🎯 CGPA: ${studentProfile.cgpa} (${studentProfile.percentageMarks}%)`
                  : `🎯 Marks: ${studentProfile.percentageMarks}%`}
            </span>
            {studentProfile.institutionName && (
              <span className={`px-2.5 py-1 rounded-md border max-w-[200px] truncate ${
                isHighContrast 
                  ? 'bg-black text-white border border-white' 
                : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`} title={studentProfile.institutionName}>
                🏛️ {studentProfile.institutionName}
              </span>
            )}
            <span className={`px-2.5 py-1 rounded-md border flex items-center gap-1 ${
              isHighContrast 
                ? 'bg-black text-white border border-white' 
                : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}>
              <span>
                {studentProfile.gender === 'female' ? '👩' :
                 studentProfile.gender === 'male' ? '👨' :
                 studentProfile.gender === 'transgender' ? '⚧️' :
                 studentProfile.gender === 'other' ? '🌈' : '👥'}
              </span>
              <span>
                {studentProfile.gender === 'female' ? 'Female' :
                 studentProfile.gender === 'male' ? 'Male' :
                 studentProfile.gender === 'transgender' ? 'Transgender' :
                 studentProfile.gender === 'other' ? 'Other' : 'All'}
              </span>
            </span>

            <button
              onClick={onEditProfile}
              className={`ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 rounded-lg font-bold text-xs cursor-pointer transition-all ${
                isHighContrast
                  ? 'bg-white text-black border-2 border-white hover:bg-neutral-200 font-black'
                  : isLight
                    ? 'bg-slate-900 hover:bg-black text-white shadow-2xs'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold shadow-sm'
              }`}
            >
              <RotateCcw className={`w-4.5 h-4.5 sm:w-4 sm:h-4 shrink-0 ${isHighContrast ? 'text-black' : isLight ? 'text-white' : 'text-stone-950'}`} />
              <span>Edit Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Course / Stream Switcher Bar */}
      {onProfileChange && (
        <div className={`p-3.5 rounded-xl border flex flex-col gap-2 ${
          isHighContrast 
            ? 'bg-black border-2 border-white text-white' 
            : isLight
              ? 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
              : 'bg-slate-900 border-slate-800 text-slate-100 shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isHighContrast ? 'text-white' : isLight ? 'text-slate-800' : 'text-amber-400'
            }`}>
              <GraduationCap className={`w-5 h-5 sm:w-4.5 sm:h-4.5 shrink-0 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-700' : 'text-amber-400'}`} />
              <span>Filter By Course / Class:</span>
            </span>
            <span className={`text-[11px] font-medium ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Active: {studentProfile.educationLevel ? studentProfile.educationLevel.replace('_', ' ').toUpperCase() : 'ALL'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'btech_engineering', label: 'B.Tech / Engg ⚙️' },
              { id: 'medical_health', label: 'MBBS / Pharma 🩺' },
              { id: 'diploma_iti', label: 'Diploma / ITI 🔧' },
              { id: 'undergraduate', label: 'Degree (B.Sc/B.Com) 🎓' },
              { id: 'higher_secondary_11_12', label: 'Class 11 - 12 📚' },
              { id: 'school_9_10', label: 'Class 9 - 10 🏫' },
              { id: 'postgraduate', label: 'PG (M.Tech/MBA) 🔬' },
            ].map((course) => {
              const isSelected = studentProfile.educationLevel === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => onProfileChange({ ...studentProfile, educationLevel: course.id as any })}
                  className={`px-3 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? isHighContrast
                        ? 'bg-white text-black font-black border-2 border-white shadow-sm'
                        : isLight
                          ? 'bg-slate-900 text-white font-bold shadow-xs'
                          : 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : isHighContrast
                      ? 'bg-black text-white border border-white hover:bg-neutral-900'
                      : isLight
                        ? 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {course.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No Results Warning / Course Suggestions */}
      {filteredList.length === 0 ? (
        <div className="space-y-6">
          <div className={`p-8 rounded-2xl border text-center space-y-4 ${
            isHighContrast
              ? 'bg-black border-2 border-white text-white'
              : isLight
                ? 'bg-white border-slate-200/90 text-slate-800 shadow-xs'
                : 'bg-slate-900 border-slate-800 text-slate-200 shadow-md'
          }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto shadow-xs ${
              isHighContrast
                ? 'bg-white text-black border-2 border-white'
                : isLight
                  ? 'bg-slate-100 text-slate-800 border border-slate-200'
                  : 'bg-slate-800 text-amber-400 border border-slate-700'
            }`}>
              <Info className="w-6 h-6" />
            </div>
            <div className="max-w-xl mx-auto space-y-1.5">
              <h3 className={`text-lg font-bold ${
                isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {t.resultsNone}
              </h3>
              <p className={`text-xs sm:text-sm ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                No scholarships matched your exact combination of State ({studentProfile.state}), 
                Income (₹{(studentProfile.familyIncome / 100000).toFixed(1)}L/yr), and Marks ({studentProfile.percentageMarks}%).
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {onShowAllCourseScholarships && (
                <button
                  onClick={onShowAllCourseScholarships}
                  className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all shadow-xs ${
                    isHighContrast
                      ? 'bg-white text-black border-2 border-white font-black'
                      : isLight
                        ? 'bg-slate-900 hover:bg-black text-white'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold'
                  }`}
                >
                  View All Schemes for {studentProfile.educationLevel?.replace('_', ' ').toUpperCase()}
                </button>
              )}
              <button
                onClick={onEditProfile}
                className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer border ${
                  isHighContrast
                    ? 'border-2 border-white text-white hover:bg-neutral-900'
                    : isLight
                      ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <RotateCcw className={`w-3.5 h-3.5 inline-block mr-1.5 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-600' : 'text-amber-400'}`} />
                Adjust Step Filters
              </button>
            </div>
          </div>

          {/* Show Open & Alternative Scholarships that match Education Level regardless of strict income */}
          {allScholarships.length > 0 && (
            <div className={`space-y-4 pt-4 border-t ${
              isHighContrast ? 'border-white' : isLight ? 'border-slate-200' : 'border-amber-500/20'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`text-lg font-black ${
                    isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    All Scholarships Available for {studentProfile.educationLevel?.replace('_', ' ').toUpperCase()}
                  </h4>
                  <p className={`text-xs ${
                    isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Check these state and central scholarships with relaxed or higher income limits
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {allScholarships
                  .filter(s => 
                    s.educationLevels.includes(studentProfile.educationLevel as any) ||
                    (studentProfile.educationLevel === 'btech_engineering' && s.educationLevels.includes('undergraduate')) ||
                    (studentProfile.educationLevel === 'medical_health' && s.educationLevels.includes('undergraduate'))
                  )
                  .map((scholarship) => (
                    <ScholarshipCard
                      key={scholarship.id}
                      scholarship={scholarship}
                      studentProfile={studentProfile}
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
            </div>
          )}
        </div>
      ) : (
        /* Scholarship Cards List */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredList.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              studentProfile={studentProfile}
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
      )}
    </div>
  );
};
