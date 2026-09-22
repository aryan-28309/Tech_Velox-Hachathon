import React, { useState } from 'react';
import { Scholarship, SupportedLanguage, StudentProfile, DocumentItem, ThemeMode } from '../types';
import { TRANSLATIONS } from '../translations';
import { getScholarshipTimeline } from '../utils/dateUtils';
import { 
  CreditCard, 
  FileText, 
  Award, 
  Landmark, 
  UserCheck, 
  Home, 
  BookOpen, 
  CheckCircle, 
  ExternalLink, 
  AlertCircle, 
  Calendar, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Clock, 
  Timer,
  ShieldCheck
} from 'lucide-react';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  studentProfile: StudentProfile;
  currentLang: SupportedLanguage;
  isHighContrast: boolean;
  themeMode?: ThemeMode;
  onOpenDetails: (scholarship: Scholarship) => void;
  onApplyNow?: (scholarship: Scholarship) => void;
  checkedDocs: Set<string>;
  onToggleDoc: (docId: string) => void;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  studentProfile,
  currentLang,
  isHighContrast,
  themeMode = 'dark',
  onOpenDetails,
  onApplyNow,
  checkedDocs,
  onToggleDoc,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const isLight = !isHighContrast && themeMode === 'light';
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(scholarship.officialLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderDocIcon = (iconName: string) => {
    switch (iconName) {
      case 'credit-card':
        return <CreditCard className="w-4 h-4 shrink-0" />;
      case 'landmark':
        return <Landmark className="w-4 h-4 shrink-0" />;
      case 'award':
        return <Award className="w-4 h-4 shrink-0" />;
      case 'user-check':
        return <UserCheck className="w-4 h-4 shrink-0" />;
      case 'home':
        return <Home className="w-4 h-4 shrink-0" />;
      case 'book-open':
        return <BookOpen className="w-4 h-4 shrink-0" />;
      default:
        return <FileText className="w-4 h-4 shrink-0" />;
    }
  };

  // Determine provider badge color with earthy, natural tones
  const getProviderBadgeColor = () => {
    if (isHighContrast) {
      return 'bg-black text-white border-2 border-white font-mono font-bold';
    }
    if (isLight) {
      switch (scholarship.providerType) {
        case 'Government (Central)':
          return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a] font-semibold';
        case 'Government (State)':
          return 'bg-[#f0f9ff] text-[#0369a1] border-[#bae6fd] font-semibold';
        case 'Corporate CSR':
          return 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0] font-semibold';
        default:
          return 'bg-[#faf5ff] text-[#6b21a8] border-[#e9d5ff] font-semibold';
      }
    }
    switch (scholarship.providerType) {
      case 'Government (Central)':
        return 'bg-[#2b1f0e] text-[#fcd34d] border-[#78350f]';
      case 'Government (State)':
        return 'bg-[#0c2a38] text-[#7dd3fc] border-[#075985]';
      case 'Corporate CSR':
        return 'bg-[#0e2a1b] text-[#86efac] border-[#166534]';
      default:
        return 'bg-[#271638] text-[#d8b4fe] border-[#6b21a8]';
    }
  };

  // Calculate document readiness for this scholarship
  const docsForThisScholarship = scholarship.documents;
  const readyCount = docsForThisScholarship.filter((d: DocumentItem) => checkedDocs.has(d.id)).length;
  const totalCount = docsForThisScholarship.length;

  const isIncomeEligible = scholarship.maxAnnualIncome 
    ? studentProfile.familyIncome <= scholarship.maxAnnualIncome
    : true;

  // Compute live timeline and days remaining to fill form
  const timeline = getScholarshipTimeline(scholarship.endDate || scholarship.deadline, scholarship.startDate);

  return (
    <article
      id={`scholarship-card-${scholarship.id}`}
      className={`rounded-xl border p-5 md:p-6 transition-all flex flex-col justify-between ${
        isHighContrast
          ? 'bg-black border-2 border-white text-white shadow-none'
          : isLight
            ? 'paper-card-light text-[#1c1917]'
            : 'paper-card-dark text-[#f4f4f5]'
      }`}
    >
      <div>
        {/* Top Badges: Provider Type, Days Left to Fill, and Eligibility */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[11px] px-2.5 py-0.5 rounded-md border ${getProviderBadgeColor()}`}>
              {scholarship.providerType}
            </span>

            {/* Live Days Left Pill */}
            <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 ${
              isHighContrast 
                ? 'bg-black text-white border-2 border-white' 
                : isLight
                  ? timeline.isUrgent
                    ? 'bg-[#fff1f2] text-[#be123c] border-[#fecdd3]'
                    : 'bg-[#f4f1ea] text-[#57534e] border-[#e5e1d8]'
                  : timeline.isUrgent
                    ? 'bg-[#2b1016] text-[#fda4af] border-[#881337]'
                    : 'bg-[#1e2229] text-[#a1a1aa] border-[#2e3440]'
            }`}>
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{timeline.badgeLabel}</span>
            </span>

            {/* Gender Scheme Badge */}
            {scholarship.genderEligibility === 'female' && (
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                isHighContrast
                  ? 'bg-black text-white border-2 border-white'
                  : isLight
                    ? 'bg-[#fdf2f8] text-[#9d174d] border-[#fbcfe8]'
                    : 'bg-[#2b1021] text-[#f472b6] border-[#831843]'
              }`}>
                Girls Only
              </span>
            )}
            {scholarship.genderEligibility === 'transgender' && (
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                isHighContrast
                  ? 'bg-black text-white border-2 border-white'
                  : isLight
                    ? 'bg-[#f5f3ff] text-[#6d28d9] border-[#ddd6fe]'
                    : 'bg-[#1e1338] text-[#c084fc] border-[#581c87]'
              }`}>
                Transgender Scheme
              </span>
            )}
          </div>

          <div className={`flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
            isHighContrast 
              ? 'bg-white text-black border-2 border-white font-black' 
              : isLight
                ? 'text-[#166534] bg-[#f0fdf4] border-[#bbf7d0]'
                : 'text-[#86efac] bg-[#0c2617] border-[#166534]'
          }`}>
            <CheckCircle className="w-3.5 h-3.5 shrink-0" /> Eligible
          </div>
        </div>

        {/* Scholarship Name & Provider */}
        <h3 className={`font-display text-lg md:text-xl font-bold tracking-tight mb-1 leading-snug ${
          isHighContrast ? 'text-white' : isLight ? 'text-[#1c1917]' : 'text-[#f5f5f4]'
        }`}>
          {scholarship.name}
        </h3>
        <p className={`text-xs mb-3 ${
          isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
        }`}>
          Administered by: <span className={isHighContrast ? 'text-white font-bold underline' : isLight ? 'text-[#292524] font-medium' : 'text-[#e4e4e7] font-medium'}>{scholarship.provider}</span>
        </p>

        {/* Real Database Registry Identifiers */}
        {(scholarship.schemeCode || scholarship.dbtDirectTransfer) && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
            {scholarship.schemeCode && (
              <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${
                isHighContrast 
                  ? 'bg-black text-white border border-white' 
                  : isLight
                    ? 'bg-[#f5f2eb] text-[#57534e] border-[#e7e3da]'
                    : 'bg-[#181c22] text-[#cbd5e1] border-[#2a303c]'
              }`}>
                Ref: {scholarship.schemeCode}
              </span>
            )}
            {scholarship.dbtDirectTransfer && (
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                isHighContrast 
                  ? 'bg-black text-white border border-white' 
                  : isLight
                    ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                    : 'bg-[#0f281a] text-[#86efac] border-[#166534]'
              }`}>
                Direct DBT
              </span>
            )}
            {scholarship.digilockerVerified && (
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                isHighContrast 
                  ? 'bg-black text-white border border-white' 
                  : isLight
                    ? 'bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]'
                    : 'bg-[#0d1e38] text-[#93c5fd] border-[#1d4ed8]'
              }`}>
                DigiLocker Linked
              </span>
            )}
          </div>
        )}

        {/* Tactile Ledger Stat Strip: Award Amount & Max Income Limit */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-lg mb-3.5 border ${
          isHighContrast ? 'bg-black border-2 border-white' : isLight ? 'bg-[#fbf9f5] border-[#e7e3da]' : 'bg-[#14171c] border-[#272b33]'
        }`}>
          {/* Award Amount */}
          <div>
            <span className={`text-[10px] uppercase tracking-wider font-semibold block ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
            }`}>
              Financial Grant
            </span>
            <span className={`text-base md:text-lg font-bold font-display ${
              isHighContrast ? 'text-white underline' : isLight ? 'text-[#9a3412]' : 'text-[#f59e0b]'
            }`}>
              {scholarship.awardAmount}
            </span>
          </div>

          {/* Maximum Annual Income Allowed */}
          <div>
            <span className={`text-[10px] uppercase tracking-wider font-semibold block ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
            }`}>
              {t.maxIncomeAllowed}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-sm md:text-base font-semibold ${
                isHighContrast ? 'text-white' : isLight ? 'text-[#1c1917]' : 'text-[#fafafa]'
              }`}>
                {scholarship.maxAnnualIncome 
                  ? `₹${scholarship.maxAnnualIncome.toLocaleString('en-IN')} / yr` 
                  : t.noIncomeBar}
              </span>
              {scholarship.maxAnnualIncome && (
                <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-sm border ${
                  isIncomeEligible 
                    ? isHighContrast
                      ? 'bg-white text-black font-black border-white'
                      : isLight
                        ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                        : 'bg-[#0e2719] text-[#86efac] border-[#166534]' 
                    : isHighContrast
                      ? 'bg-black text-white border-2 border-white'
                      : isLight
                        ? 'bg-[#fff1f2] text-[#be123c] border-[#fecdd3]'
                        : 'bg-[#2d1117] text-[#fda4af] border-[#9f1239]'
                }`}>
                  {isIncomeEligible ? 'Eligible' : 'Exceeded'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Application Dates & Days Left Countdown Box */}
        <div className={`p-3 rounded-lg mb-4 border transition-colors ${
          isHighContrast
            ? 'bg-black border-2 border-white text-white'
            : isLight
              ? timeline.isUrgent
                ? 'bg-[#fff5f5] border-[#fecdd3]'
                : 'bg-[#fdfcf9] border-[#e8e4db]'
              : timeline.isUrgent
                ? 'bg-[#2b1016] border-[#881337]'
                : 'bg-[#15181e] border-[#292d35]'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
            <span className={`text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
              isHighContrast ? 'text-white' : isLight ? 'text-[#57534e]' : 'text-[#d4d4d8]'
            }`}>
              <Calendar className={`w-3.5 h-3.5 shrink-0 ${isHighContrast ? 'text-white' : isLight ? 'text-[#78716c]' : 'text-[#d97706]'}`} />
              <span>Application Window</span>
            </span>

            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md inline-flex items-center gap-1 self-start sm:self-auto ${
              isHighContrast
                ? 'bg-white text-black border-2 border-white'
                : isLight
                  ? timeline.isUrgent
                    ? 'bg-[#fff1f2] text-[#be123c] border border-[#fecdd3]'
                    : 'bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]'
                  : timeline.isUrgent 
                    ? 'bg-[#2b1016] text-[#fda4af] border border-[#881337]'
                    : 'bg-[#0f281a] text-[#86efac] border border-[#166534]'
            }`}>
              <Timer className="w-3.5 h-3.5 shrink-0" />
              {timeline.statusText}
            </span>
          </div>

          {/* Form Start Date, End Date, and Days Left Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {/* Starting Date */}
            <div className={`p-2 rounded-md border ${
              isHighContrast ? 'bg-black border-2 border-white text-white' : isLight ? 'bg-[#ffffff] border-[#e7e3da]' : 'bg-[#1a1d24] border-[#2c313d]'
            }`}>
              <span className={`text-[10px] uppercase font-medium block mb-0.5 ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
              }`}>
                Opens On
              </span>
              <span className={`font-semibold text-xs sm:text-sm ${isHighContrast ? 'text-white' : isLight ? 'text-[#1c1917]' : 'text-[#f4f4f5]'}`}>
                {scholarship.startDate || '01 August 2026'}
              </span>
            </div>

            {/* Ending Date */}
            <div className={`p-2 rounded-md border ${
              isHighContrast ? 'bg-black border-2 border-white text-white' : isLight ? 'bg-[#ffffff] border-[#e7e3da]' : 'bg-[#1a1d24] border-[#2c313d]'
            }`}>
              <span className={`text-[10px] uppercase font-medium block mb-0.5 ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
              }`}>
                Deadline
              </span>
              <span className={`font-semibold text-xs sm:text-sm ${
                timeline.isUrgent 
                  ? isHighContrast ? 'text-white font-black underline' : 'text-[#be123c] font-bold' 
                  : isHighContrast ? 'text-white' : isLight ? 'text-[#1c1917]' : 'text-[#f4f4f5]'
              }`}>
                {scholarship.endDate || scholarship.deadline}
              </span>
            </div>

            {/* Days Left to Fill Form Counter */}
            <div className={`col-span-2 sm:col-span-1 p-2 rounded-md border flex flex-col justify-center ${
              isHighContrast
                ? 'bg-white text-black border-2 border-white font-black'
                : isLight
                  ? timeline.isUrgent
                    ? 'bg-[#fff1f2] border-[#fecdd3] text-[#be123c]'
                    : 'bg-[#ffffff] border-[#e7e3da] text-[#1c1917]'
                  : timeline.isUrgent
                    ? 'bg-[#2b1016] border-[#881337] text-[#fda4af]'
                    : 'bg-[#1a1d24] border-[#2c313d] text-[#f4f4f5]'
            }`}>
              <span className={`text-[10px] uppercase font-medium block mb-0.5 ${
                isHighContrast ? 'text-black' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
              }`}>
                Time Remaining
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold text-xs sm:text-sm">
                  {timeline.daysLeft !== null 
                    ? timeline.daysLeft <= 0 
                      ? 'Closing Today' 
                      : `${timeline.daysLeft} Days Left`
                    : 'Open Now'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Documents Readiness Indicator */}
        <div className={`p-3 rounded-lg border mb-3 ${
          isHighContrast ? 'border-white bg-black' : isLight ? 'border-[#e7e3da] bg-[#fbf9f5]' : 'border-[#272b33] bg-[#14171c]'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`text-[11px] font-semibold uppercase tracking-wider ${
              isHighContrast ? 'text-white' : isLight ? 'text-[#57534e]' : 'text-[#d4d4d8]'
            }`}>
              Required Documents ({readyCount}/{totalCount} Ready)
            </span>
            <span className={`text-xs font-semibold ${
              readyCount === totalCount
                ? isHighContrast ? 'text-white' : isLight ? 'text-[#166534]' : 'text-[#86efac]'
                : isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
            }`}>
              {Math.round((readyCount / (totalCount || 1)) * 100)}% Prepared
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {scholarship.documents.map((doc) => {
              const isChecked = checkedDocs.has(doc.id);
              return (
                <button
                  key={doc.id}
                  onClick={() => onToggleDoc(doc.id)}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isChecked
                      ? isHighContrast
                        ? 'bg-white text-black border-white font-bold'
                        : isLight
                          ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                          : 'bg-[#0f281a] text-[#86efac] border-[#166534]'
                      : isHighContrast
                        ? 'bg-black text-white border-white'
                        : isLight
                          ? 'bg-[#ffffff] text-[#78716c] border-[#e7e3da] hover:border-[#d6d1c4]'
                          : 'bg-[#1a1d24] text-[#a1a1aa] border-[#2c313d] hover:border-[#3e4554]'
                  }`}
                  title={`${doc.name}: ${doc.description || 'Mandatory document for portal verification'}`}
                >
                  {renderDocIcon(doc.icon)}
                  <span className="truncate max-w-[130px]">{doc.name}</span>
                  {isChecked && <Check className="w-3 h-3 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Guidance Notes */}
        <div className="mb-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full py-1.5 px-2 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              isHighContrast
                ? 'text-white hover:bg-neutral-900'
                : isLight
                  ? 'text-[#57534e] hover:text-[#1c1917] hover:bg-[#f4f1ea]'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-[#1a1d24]'
            }`}
          >
            <span>{isExpanded ? 'Hide Scheme Summary' : 'View Scheme Summary & Verification'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className={`mt-2 p-3 rounded-lg border text-xs space-y-3 ${
              isHighContrast ? 'border-white bg-black' : isLight ? 'border-[#e7e3da] bg-[#ffffff]' : 'border-[#272b33] bg-[#14171c]'
            }`}>
              <div>
                <span className={`font-semibold uppercase text-[10px] tracking-wider block mb-1 ${
                  isHighContrast ? 'text-white' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
                }`}>
                  Overview
                </span>
                <p className="leading-relaxed opacity-90">{scholarship.overview}</p>
              </div>

              {/* Application Steps */}
              <div>
                <span className={`font-semibold uppercase text-[10px] tracking-wider block mb-1 ${
                  isHighContrast ? 'text-white' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
                }`}>
                  How to Apply
                </span>
                <ol className="list-decimal list-inside space-y-1">
                  {scholarship.applicationSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed opacity-90">{step}</li>
                  ))}
                </ol>
              </div>

              {/* Official Portal & Helpline */}
              <div className={`pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] ${
                isHighContrast ? 'border-white' : isLight ? 'border-[#e7e3da]' : 'border-[#272b33]'
              }`}>
                <span>
                  <strong className={isHighContrast ? 'text-white underline' : isLight ? 'text-[#1c1917]' : 'text-[#f4f4f5]'}>Portal:</strong> {scholarship.officialPortalName}
                </span>
                {scholarship.helplineNumber && (
                  <span className={`flex items-center gap-1 font-semibold ${isHighContrast ? 'text-white font-mono' : isLight ? 'text-[#166534]' : 'text-[#86efac]'}`}>
                    <Phone className="w-3 h-3 shrink-0" /> Helpline: {scholarship.helplineNumber}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: "Deep Dive Modal" & "Apply Now" */}
      <div className={`pt-4 border-t flex flex-col sm:flex-row items-center gap-2 ${
        isHighContrast ? 'border-white' : isLight ? 'border-[#e8e4db]' : 'border-[#272b33]'
      }`}>
        <button
          id={`btn-details-${scholarship.id}`}
          onClick={() => onOpenDetails(scholarship)}
          className={`w-full sm:flex-1 py-2.5 px-3 min-h-[40px] rounded-md text-xs sm:text-sm font-semibold border transition-all cursor-pointer text-center flex items-center justify-center ${
            isHighContrast
              ? 'border-2 border-white text-white hover:bg-neutral-900 font-bold'
              : isLight
                ? 'border-[#dcd7cb] hover:border-[#a8a29e] text-[#44403c] bg-[#ffffff] hover:bg-[#f5f2eb] shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                : 'border-[#2e3440] hover:border-[#424b5c] text-[#d4d4d8] bg-[#1a1d24] hover:bg-[#222731]'
          }`}
        >
          {t.checkEligibility}
        </button>

        <div className="w-full sm:flex-1 flex items-center gap-1.5">
          <a
            id={`btn-apply-${scholarship.id}`}
            href={scholarship.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onApplyNow?.(scholarship)}
            className={`flex-1 py-2.5 px-3.5 min-h-[40px] rounded-md text-xs sm:text-sm font-semibold transition-all active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5 text-center ${
              isHighContrast
                ? 'bg-white text-black hover:bg-neutral-200 font-black border-2 border-white'
                : isLight
                  ? 'bg-[#1c1917] hover:bg-[#000000] text-[#fafaf9] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                  : 'bg-[#fafaf9] hover:bg-[#ffffff] text-[#18181b] font-bold shadow-sm'
            }`}
            title={`Open official portal: ${scholarship.officialLink} (100% Free Application)`}
          >
            <span>{t.applyNow}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>

          <button
            id={`btn-copy-${scholarship.id}`}
            onClick={handleCopyLink}
            className={`p-2.5 min-h-[40px] min-w-[40px] rounded-md border transition-colors cursor-pointer flex items-center justify-center shrink-0 ${
              copied
                ? isHighContrast ? 'bg-white text-black border-2 border-white' : isLight ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]' : 'bg-[#0f281a] border-[#166534] text-[#86efac]'
                : isHighContrast
                ? 'border-2 border-white text-white hover:bg-neutral-900'
                : isLight
                ? 'border-[#dcd7cb] hover:border-[#a8a29e] text-[#57534e] bg-[#ffffff] hover:bg-[#f5f2eb]'
                : 'border-[#2e3440] hover:border-[#424b5c] text-[#a1a1aa] bg-[#1a1d24] hover:bg-[#222731]'
            }`}
            title={copied ? "Link Copied!" : "Copy Official Portal URL"}
            aria-label="Copy Official Application Link"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
