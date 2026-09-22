import React, { useState } from 'react';
import { Scholarship, SupportedLanguage, DocumentItem, ThemeMode } from '../types';
import { TRANSLATIONS } from '../translations';
import { getScholarshipTimeline } from '../utils/dateUtils';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  FileText, 
  CreditCard, 
  Landmark, 
  UserCheck, 
  Home, 
  BookOpen, 
  Award, 
  PhoneCall, 
  ShieldCheck, 
  Printer, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  Timer
} from 'lucide-react';

interface EligibilityModalProps {
  scholarship: Scholarship | null;
  onClose: () => void;
  currentLang: SupportedLanguage;
  isHighContrast: boolean;
  themeMode?: ThemeMode;
  onPrintChecklist?: () => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  scholarship,
  onClose,
  currentLang,
  isHighContrast,
  themeMode = 'dark',
  onPrintChecklist
}) => {
  if (!scholarship) return null;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const isLight = !isHighContrast && themeMode === 'light';
  const [copied, setCopied] = useState(false);

  const timeline = getScholarshipTimeline(scholarship.endDate || scholarship.deadline, scholarship.startDate);

  const handleCopyLink = () => {
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
      case 'credit-card': return <CreditCard className="w-4.5 h-4.5 sm:w-4 sm:h-4" />;
      case 'landmark': return <Landmark className="w-4.5 h-4.5 sm:w-4 sm:h-4" />;
      case 'award': return <Award className="w-4.5 h-4.5 sm:w-4 sm:h-4" />;
      case 'user-check': return <UserCheck className="w-4.5 h-4.5 sm:w-4 sm:h-4" />;
      case 'home': return <Home className="w-4.5 h-4.5 sm:w-4 sm:h-4" />;
      case 'book-open': return <BookOpen className="w-4.5 h-4.5 sm:w-4 sm:h-4" />;
      default: return <FileText className="w-4.5 h-4.5 sm:w-4 sm:h-4" />;
    }
  };

  return (
    <div 
      id="eligibility-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-scholarship-title"
    >
      <div 
        id="eligibility-modal-content"
        className={`w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto transition-all ${
          isHighContrast 
            ? 'bg-black border-2 border-white text-white' 
            : isLight
              ? 'bg-white border-slate-200 text-slate-800 shadow-2xl'
              : 'bg-[#0e172a] border-amber-500/30 text-slate-100'
        }`}
      >
        {/* Header */}
        <div className={`p-4 sm:p-6 border-b flex items-start justify-between gap-4 ${
          isHighContrast 
            ? 'bg-black border-white' 
            : isLight
              ? 'bg-amber-50/80 border-slate-200'
              : 'bg-[#131f37] border-amber-500/25'
        }`}>
          <div>
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-1 border ${
              isHighContrast 
                ? 'bg-white text-black border-2 border-white font-black' 
                : isLight
                  ? 'text-amber-900 bg-amber-100 border-amber-300'
                  : 'text-amber-300 bg-amber-500/20 border-amber-500/30'
            }`}>
              {scholarship.providerType}
            </span>
            <h2 id="modal-scholarship-title" className={`text-xl sm:text-2xl font-black leading-tight ${
              isHighContrast ? 'text-white' : isLight ? 'text-slate-900 font-serif' : 'text-white font-serif'
            }`}>
              {scholarship.name}
            </h2>
            <p className={`text-xs sm:text-sm font-semibold mt-0.5 ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Authority: <span className={isHighContrast ? 'text-white underline' : isLight ? 'text-amber-800 font-bold' : 'text-amber-300'}>{scholarship.provider}</span>
            </p>
          </div>

          <button
            id="btn-close-modal"
            onClick={onClose}
            className={`p-2.5 min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center cursor-pointer shrink-0 transition-colors ${
              isHighContrast 
                ? 'text-white hover:bg-neutral-800' 
                : isLight
                  ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Key Award & Income Eligibility Strip */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border ${
            isHighContrast 
              ? 'bg-black border-2 border-white text-white' 
              : isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-[#15223c] border-amber-500/30'
          }`}>
            <div>
              <span className={`text-xs font-extrabold uppercase tracking-wider block ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-amber-800' : 'text-amber-400'
              }`}>
                Scholarship Award Amount
              </span>
              <span className={`text-lg font-black ${
                isHighContrast ? 'text-white underline' : isLight ? 'text-amber-700' : 'text-amber-300'
              }`}>
                {scholarship.awardAmount}
              </span>
              <span className={`text-[11px] block mt-0.5 ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Paid directly via Aadhaar-linked DBT account
              </span>
            </div>

            <div>
              <span className={`text-xs font-extrabold uppercase tracking-wider block ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-amber-800' : 'text-amber-400'
              }`}>
                Max Annual Family Income
              </span>
              <span className={`text-lg font-black ${
                isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-slate-100'
              }`}>
                {scholarship.maxAnnualIncome 
                  ? `₹${scholarship.maxAnnualIncome.toLocaleString('en-IN')} / year`
                  : 'No Income Limit (Merit Based)'}
              </span>
              <span className={`text-[11px] block mt-0.5 ${
                isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Valid Tehsildar / SDM revenue certificate required
              </span>
            </div>
          </div>

          {/* Official Database Registry & Portal Information */}
          <div className={`p-4 rounded-xl border ${
            isHighContrast 
              ? 'bg-black border-2 border-white text-white' 
              : 'bg-[#0b1220] border-cyan-500/30 text-slate-200'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                isHighContrast ? 'text-white' : 'text-cyan-400'
              }`}>
                <ShieldCheck className={`w-4 h-4 ${isHighContrast ? 'text-white' : 'text-cyan-400'}`} />
                Official Database Registry Record
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isHighContrast 
                  ? 'bg-white text-black border-2 border-white font-black' 
                  : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
              }`}>
                ✓ Verified DBT Scheme
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-lg border ${
                isHighContrast ? 'bg-black border border-white' : 'bg-[#101b30] border-slate-700/50'
              }`}>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Scheme Code</span>
                <span className={`font-mono font-black text-xs ${isHighContrast ? 'text-white' : 'text-amber-300'}`}>
                  {scholarship.schemeCode || `${scholarship.id.toUpperCase()}-GOV`}
                </span>
              </div>

              <div className={`p-2.5 rounded-lg border ${
                isHighContrast ? 'bg-black border border-white' : 'bg-[#101b30] border-slate-700/50'
              }`}>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Nodal Ministry / Body</span>
                <span className="font-bold text-slate-100 text-xs">
                  {scholarship.ministryOrDepartment || scholarship.provider}
                </span>
              </div>

              <div className={`p-2.5 rounded-lg border ${
                isHighContrast ? 'bg-black border border-white' : 'bg-[#101b30] border-slate-700/50'
              }`}>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Disbursement Mode</span>
                <span className={`font-bold text-xs flex items-center gap-1 mt-0.5 ${isHighContrast ? 'text-white' : 'text-emerald-400'}`}>
                  ⚡ Aadhaar DBT / PFMS Direct Payment Bridge
                </span>
              </div>

              <div className={`p-2.5 rounded-lg border ${
                isHighContrast ? 'bg-black border border-white' : 'bg-[#101b30] border-slate-700/50'
              }`}>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Verification Authority</span>
                <span className="font-semibold text-slate-200 text-xs">
                  {scholarship.nodalVerificationAgency || 'Institute Nodal Officer & State Welfare Officer'}
                </span>
              </div>
            </div>

            {scholarship.guidelinesUrl && (
              <div className="mt-2.5 pt-2 border-t border-slate-700/40 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Official Government Gazette & Detailed Guidelines:</span>
                <a 
                  href={scholarship.guidelinesUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${isHighContrast ? 'text-white underline' : 'text-cyan-400'} hover:underline font-bold flex items-center gap-1`}
                >
                  View Official Guidelines PDF <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Application Schedule & Days Left Box */}
          <div className={`p-4 rounded-xl border ${
            isHighContrast
              ? 'bg-black border-2 border-white text-white'
              : timeline.isUrgent 
                ? 'bg-[#2a1320] border-rose-500/40 text-rose-200' 
                : 'bg-[#131e35] border-amber-500/25 text-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                isHighContrast ? 'text-white' : 'text-amber-400'
              }`}>
                <Calendar className={`w-4 h-4 ${isHighContrast ? 'text-white' : 'text-amber-400'}`} />
                <span>Application Form Schedule & Deadline</span>
              </span>

              <span className={`text-xs font-black px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 self-start sm:self-auto border ${
                isHighContrast
                  ? 'bg-white text-black border-2 border-white'
                  : timeline.isUrgent
                    ? 'bg-rose-950/90 text-rose-300 border-rose-500/50'
                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
              }`}>
                <Clock className="w-4 h-4 shrink-0" />
                <span>{timeline.statusText}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Form Start Date */}
              <div className={`p-3 rounded-lg border ${
                isHighContrast ? 'bg-black border border-white' : 'bg-[#0a0f1d] border-amber-500/20'
              }`}>
                <span className={`text-[10px] uppercase font-bold block ${
                  isHighContrast ? 'text-neutral-300' : 'text-slate-400'
                }`}>
                  Application Opening Date
                </span>
                <span className={`text-sm font-black block mt-0.5 ${
                  isHighContrast ? 'text-white' : 'text-slate-100'
                }`}>
                  {scholarship.startDate || '01 August 2026'}
                </span>
                <span className="text-[10px] text-slate-500">Portal registration starts</span>
              </div>

              {/* Form End Date */}
              <div className={`p-3 rounded-lg border ${
                isHighContrast ? 'bg-black border border-white' : 'bg-[#0a0f1d] border-amber-500/20'
              }`}>
                <span className={`text-[10px] uppercase font-bold block ${
                  isHighContrast ? 'text-neutral-300' : 'text-slate-400'
                }`}>
                  Application Closing Date
                </span>
                <span className={`text-sm font-black block mt-0.5 ${
                  timeline.isUrgent && !isHighContrast
                    ? 'text-rose-400' 
                    : isHighContrast ? 'text-white font-black underline' : 'text-slate-100'
                }`}>
                  {scholarship.endDate || scholarship.deadline}
                </span>
                <span className="text-[10px] text-slate-500">Last date to submit form</span>
              </div>

              {/* Days Left to Fill Form */}
              <div className={`p-3 rounded-lg border flex flex-col justify-center ${
                isHighContrast
                  ? 'bg-white text-black border-2 border-white font-black'
                  : timeline.isUrgent
                    ? 'bg-rose-950 text-rose-200 border-rose-500/40'
                    : 'bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 border-amber-400 shadow-md font-black'
              }`}>
                <span className="text-[10px] uppercase font-black tracking-tight">
                  Days Left to Fill Form
                </span>
                <span className="text-lg font-black flex items-center gap-1 leading-tight mt-0.5">
                  <Timer className="w-4 h-4 shrink-0" />
                  <span>{timeline.daysLeft} Days Remaining</span>
                </span>
                <span className="text-[10px] opacity-80 mt-0.5">
                  Complete before portal closes
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className={`mt-3 pt-2.5 border-t ${
              isHighContrast ? 'border-white' : 'border-amber-500/20'
            }`}>
              <div className={`flex justify-between text-[11px] font-semibold mb-1 ${
                isHighContrast ? 'text-white' : 'text-slate-400'
              }`}>
                <span>Start: {scholarship.startDate || '01 Aug'}</span>
                <span>Deadline: {scholarship.endDate || scholarship.deadline}</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${
                isHighContrast ? 'bg-black border border-white' : 'bg-[#0a0f1d]'
              }`}>
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    isHighContrast ? 'bg-white' : timeline.isUrgent ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'
                  }`}
                  style={{ width: `${timeline.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Scheme Overview */}
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-1.5 ${
              isHighContrast ? 'text-white font-black' : 'text-amber-400'
            }`}>
              Scheme Overview
            </h3>
            <p className={`leading-relaxed ${
              isHighContrast ? 'text-neutral-200' : 'text-slate-300'
            }`}>
              {scholarship.overview}
            </p>
          </div>

          {/* Who is Eligible? (Clear Bullet Checklist) */}
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-2 ${
              isHighContrast ? 'text-white font-black' : 'text-amber-400'
            }`}>
              Eligibility Criteria
            </h3>
            <ul className="space-y-2">
              <li className={`flex items-start gap-2 ${
                isHighContrast ? 'text-white' : 'text-slate-200'
              }`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isHighContrast ? 'text-white' : 'text-emerald-400'}`} />
                <span>
                  <strong>Gender Eligibility: </strong>
                  {scholarship.genderEligibility === 'female' 
                    ? 'Exclusively for Female / Girl Students 👩'
                    : scholarship.genderEligibility === 'transgender'
                    ? 'Exclusively for Transgender / Third Gender Students ⚧️'
                    : scholarship.genderEligibility === 'male'
                    ? 'Male Students 👨'
                    : 'Open to All Genders (Male, Female, Transgender & Other) 👥'}
                </span>
              </li>
              {scholarship.eligibilitySummary.map((item, idx) => (
                <li key={idx} className={`flex items-start gap-2 ${
                  isHighContrast ? 'text-white' : 'text-slate-200'
                }`}>
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isHighContrast ? 'text-white' : 'text-emerald-400'}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits List */}
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-2 ${
              isHighContrast ? 'text-white font-black' : 'text-amber-400'
            }`}>
              Financial Benefits & Allowances
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scholarship.benefits.map((b, idx) => (
                <div key={idx} className={`p-3 rounded-lg border text-xs font-semibold ${
                  isHighContrast 
                    ? 'bg-black border border-white text-white' 
                    : 'bg-[#131e35] border-amber-500/20 text-slate-200'
                }`}>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className={`text-sm font-extrabold uppercase tracking-wider ${
                isHighContrast ? 'text-white font-black' : 'text-amber-400'
              }`}>
                Mandatory Documents Checklist
              </h3>
              {onPrintChecklist && (
                <button
                  onClick={onPrintChecklist}
                  className={`text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                    isHighContrast ? 'text-white underline hover:text-neutral-300' : 'text-amber-300 hover:text-amber-200'
                  }`}
                >
                  <Printer className="w-4 h-4 shrink-0" /> Print Checklist
                </button>
              )}
            </div>
            <div className="space-y-2">
              {scholarship.documents.map((doc: DocumentItem) => (
                <div key={doc.id} className={`p-3 rounded-xl border flex items-start gap-3 ${
                  isHighContrast 
                    ? 'bg-black border border-white' 
                    : 'bg-[#131e35] border-amber-500/20'
                }`}>
                  <div className={`p-2 rounded-lg shrink-0 ${
                    isHighContrast 
                      ? 'bg-white text-black font-black' 
                      : 'bg-[#0e1627] text-amber-400 border border-amber-500/20'
                  }`}>
                    {renderDocIcon(doc.iconName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-sm ${
                        isHighContrast ? 'text-white' : 'text-white'
                      }`}>{doc.name}</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        doc.isMandatory 
                          ? isHighContrast ? 'bg-white text-black border-white' : 'bg-rose-950 text-rose-300 border-rose-500/40' 
                          : isHighContrast ? 'bg-black text-white border-white' : 'bg-[#0e1627] text-slate-300 border-amber-500/20'
                      }`}>
                        {doc.isMandatory ? t.mandatory : t.optional}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${
                      isHighContrast ? 'text-neutral-300' : 'text-slate-400'
                    }`}>{doc.description}</p>
                    {doc.tip && (
                      <p className={`text-[11px] font-semibold mt-1 ${isHighContrast ? 'text-white' : 'text-amber-400'}`}>
                        💡 Tip: {doc.tip}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Application Roadmap */}
          <div>
            <h3 className={`text-sm font-extrabold uppercase tracking-wider mb-2 ${
              isHighContrast ? 'text-white font-black' : 'text-amber-400'
            }`}>
              Step-by-Step How to Apply
            </h3>
            <ol className="space-y-2">
              {scholarship.applicationSteps.map((step, idx) => (
                <li key={idx} className={`p-3 rounded-lg border text-xs font-medium flex items-start gap-2.5 ${
                  isHighContrast 
                    ? 'bg-black border border-white text-white' 
                    : 'bg-[#131e35] border-amber-500/20 text-slate-200'
                }`}>
                  <span className={`w-5 h-5 rounded-full font-black flex items-center justify-center shrink-0 text-[11px] shadow-xs ${
                    isHighContrast ? 'bg-white text-black border border-black' : 'bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Zero Fraud & Agent Warning Box */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isHighContrast 
              ? 'bg-black border-2 border-white text-white' 
              : 'bg-[#2a1320] border-rose-500/40 text-rose-200'
          }`}>
            <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${isHighContrast ? 'text-white' : 'text-rose-400'}`} />
            <div className="text-xs leading-relaxed">
              <strong className="block font-bold mb-0.5">Zero-Fee Application Warning:</strong>
              Scholarship applications on official portals (NSP, State portals, AICTE) are 100% free of cost. Never pay money to any tout, cyber cafe agent, or middleman claiming guaranteed selection.
            </div>
          </div>

          {/* Official Helpline */}
          <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
            isHighContrast 
              ? 'bg-black border-2 border-white text-white' 
              : isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-[#131e35] border-amber-500/20 text-slate-300'
          }`}>
            <span className="flex items-center gap-1.5">
              <PhoneCall className={`w-4 h-4 ${isHighContrast ? 'text-white' : isLight ? 'text-amber-600' : 'text-amber-400'}`} />
              Official Support Helpline:
            </span>
            <span className={`font-bold ${isHighContrast ? 'text-white underline' : isLight ? 'text-amber-700' : 'text-amber-300'}`}>{scholarship.helplineNumber}</span>
          </div>
        </div>

        {/* Footer with Apply Link */}
        <div className={`p-4 sm:p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isHighContrast 
            ? 'bg-black border-white' 
            : isLight
              ? 'bg-slate-50 border-slate-200'
              : 'bg-[#131f37] border-amber-500/25'
        }`}>
          <div className="text-xs font-medium space-y-1">
            <div className={isHighContrast ? 'text-white' : isLight ? 'text-slate-800' : 'text-slate-300'}>
              Application Mode: <span className={`font-bold ${isHighContrast ? 'text-white underline' : isLight ? 'text-amber-800' : 'text-amber-300'}`}>{scholarship.applicationMode}</span>
            </div>
            <div className={`text-[11px] mt-0.5 font-mono truncate max-w-xs sm:max-w-sm ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Official Portal: <span className={`${isHighContrast ? 'text-white underline' : isLight ? 'text-emerald-700' : 'text-emerald-400'} font-semibold`}>{scholarship.officialLink}</span>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className={`py-3 sm:py-2.5 px-3.5 min-h-[44px] rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                copied
                  ? isHighContrast ? 'bg-white text-black border-white' : isLight ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-emerald-950 border-emerald-400 text-emerald-300'
                  : isHighContrast 
                    ? 'border-2 border-white text-white hover:bg-neutral-900' 
                    : isLight
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-100 bg-white'
                      : 'border-amber-500/30 text-amber-300 hover:bg-[#1f3054] bg-[#18233a]'
              }`}
              title="Copy official portal URL"
            >
              {copied ? (
                <>
                  <Check className={`w-4.5 h-4.5 sm:w-4 sm:h-4 shrink-0 ${isHighContrast ? 'text-black' : isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className={`w-4.5 h-4.5 sm:w-4 sm:h-4 shrink-0 ${isHighContrast ? 'text-white' : isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className={`py-3 sm:py-2.5 px-4 min-h-[44px] rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                isHighContrast 
                  ? 'border-2 border-white text-white hover:bg-neutral-900' 
                  : isLight
                    ? 'border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'border-amber-500/30 text-slate-300 hover:bg-white/10'
              }`}
            >
              Close
            </button>

            <a
              id={`modal-apply-btn-${scholarship.id}`}
              href={scholarship.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`py-3 sm:py-2.5 px-5 min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-md flex-1 sm:flex-initial ${
                isHighContrast
                  ? 'bg-white text-black border-2 border-white font-black hover:bg-neutral-200'
                  : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-stone-950 hover:brightness-110 shadow-amber-950/50'
              }`}
              title={`Open official portal: ${scholarship.officialLink} (100% Free Application)`}
            >
              <span>{t.applyNow}</span>
              <ExternalLink className="w-4.5 h-4.5 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
