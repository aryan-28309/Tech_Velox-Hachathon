import React from 'react';
import { Scholarship, DocumentItem, StudentProfile, SupportedLanguage, ThemeMode } from '../types';
import { getScholarshipTimeline } from '../utils/dateUtils';
import { PragatiLogo } from './PragatiLogo';
import { X, Printer, CheckSquare, Square, ShieldCheck, AlertCircle, Calendar, Clock } from 'lucide-react';

interface DocumentChecklistPrinterProps {
  isOpen: boolean;
  onClose: () => void;
  scholarships: Scholarship[];
  studentProfile: StudentProfile;
  checkedDocs: Set<string>;
  onToggleDoc: (id: string) => void;
  isHighContrast?: boolean;
  themeMode?: ThemeMode;
}

export const DocumentChecklistPrinter: React.FC<DocumentChecklistPrinterProps> = ({
  isOpen,
  onClose,
  scholarships,
  studentProfile,
  checkedDocs,
  onToggleDoc,
  isHighContrast = false,
  themeMode = 'dark',
}) => {
  if (!isOpen) return null;

  const isLight = !isHighContrast && themeMode === 'light';

  // Aggregate all unique documents required across eligible scholarships
  const allDocsMap = new Map<string, { doc: DocumentItem; count: number }>();
  scholarships.forEach((s) => {
    s.documents.forEach((d) => {
      if (!allDocsMap.has(d.id)) {
        allDocsMap.set(d.id, { doc: d, count: 1 });
      } else {
        allDocsMap.get(d.id)!.count += 1;
      }
    });
  });

  const uniqueDocs = Array.from(allDocsMap.values());

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto print:bg-white print:text-black print:max-h-none print:shadow-none print:border-none ${
        isHighContrast 
          ? 'bg-black text-white border-2 border-white' 
          : isLight
            ? 'bg-white text-slate-800 border-slate-200 shadow-2xl'
            : 'bg-[#0e172a] text-slate-100 border-amber-500/30'
      }`}>
        {/* Header */}
        <div className={`p-4 sm:p-6 border-b flex items-center justify-between gap-4 print:bg-white print:border-stone-300 ${
          isHighContrast ? 'bg-black border-white' : isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#131f37] border-amber-500/25'
        }`}>
          <div>
            <div className="mb-2 print:hidden">
              <PragatiLogo variant="header" size="md" isHighContrast={isHighContrast} themeMode={themeMode} />
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md inline-block mb-1 border print:hidden ${
              isHighContrast 
                ? 'bg-white text-black border-white font-black' 
                : isLight
                  ? 'text-slate-800 bg-slate-100 border-slate-200'
                  : 'text-amber-300 bg-amber-500/20 border-amber-500/30'
            }`}>
              CSC / Cyber Cafe Checklist
            </span>
            <h2 className={`text-xl sm:text-2xl font-black print:text-black ${
              isHighContrast ? 'text-white' : isLight ? 'text-slate-900 font-serif' : 'text-white font-serif'
            }`}>
              Scholarship Document Preparation Checklist
            </h2>
            <p className={`text-xs mt-0.5 print:text-stone-600 ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Take this checklist to your school or Common Service Centre (CSC / Jan Seva Kendra)
            </p>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl cursor-pointer print:hidden transition-colors ${
              isHighContrast ? 'text-white hover:bg-neutral-800' : isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Close Checklist"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Printable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm print:overflow-visible">
          {/* Student Profile Summary Box */}
          <div className={`p-3.5 rounded-xl border grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs print:bg-stone-100 print:border-stone-300 print:text-black ${
            isHighContrast 
              ? 'bg-black border border-white text-white' 
              : isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-[#131e35] border-amber-500/20'
          }`}>
            <div>
              <span className={`block ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'} print:text-stone-500`}>Education:</span>
              <span className={`font-bold ${isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-amber-300'} print:text-stone-900`}>{studentProfile.educationLevel}</span>
            </div>
            <div>
              <span className={`block ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'} print:text-stone-500`}>State:</span>
              <span className="font-bold print:text-stone-900">{studentProfile.state}</span>
            </div>
            <div>
              <span className={`block ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'} print:text-stone-500`}>Category:</span>
              <span className="font-bold print:text-stone-900">{studentProfile.category}</span>
            </div>
            <div>
              <span className={`block ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'} print:text-stone-500`}>Family Income:</span>
              <span className={`font-bold ${isHighContrast ? 'text-white' : isLight ? 'text-slate-900' : 'text-amber-300'} print:text-stone-900`}>₹{(studentProfile.familyIncome / 100000).toFixed(2)} Lakhs/yr</span>
            </div>
          </div>

          {/* Target Scholarships & Timeline Deadlines */}
          <div className="space-y-2">
            <h3 className={`font-extrabold text-sm uppercase tracking-wider border-b pb-1 flex items-center justify-between print:text-stone-800 print:border-stone-300 ${
              isHighContrast ? 'text-white border-white' : isLight ? 'text-slate-900 border-slate-200' : 'text-amber-400 border-amber-500/20'
            }`}>
              <span className="flex items-center gap-1.5">
                <Calendar className={`w-4 h-4 ${isHighContrast ? 'text-white' : isLight ? 'text-slate-700' : 'text-amber-400'} print:text-amber-600`} />
                <span>Target Scholarships & Form Deadlines ({scholarships.length} Eligible)</span>
              </span>
              <span className={`text-[11px] font-semibold lowercase ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'} print:text-stone-500`}>
                check deadlines before applying
              </span>
            </h3>

            <div className={`divide-y rounded-xl border overflow-hidden print:border-stone-300 print:divide-stone-200 ${
              isHighContrast ? 'divide-white border-white' : isLight ? 'divide-slate-200 border-slate-200' : 'divide-amber-500/15 border-amber-500/20'
            }`}>
              {scholarships.slice(0, 6).map((s) => {
                const tl = getScholarshipTimeline(s.endDate || s.deadline, s.startDate);
                return (
                  <div key={s.id} className={`p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs print:bg-white ${
                    isHighContrast ? 'bg-black text-white' : isLight ? 'bg-white text-slate-800' : 'bg-[#0e172a]'
                  }`}>
                    <div className="flex-1">
                      <span className="font-bold print:text-stone-900 block">{s.name}</span>
                      <span className={`text-[11px] ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'} print:text-stone-500`}>
                        {s.providerType} • Award: <strong className={isHighContrast ? 'text-white underline' : isLight ? 'text-slate-900 font-bold' : 'text-amber-400 print:text-amber-700'}>{s.awardAmount}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-[11px]">
                      <div>
                        <span className={`block text-[9px] uppercase font-bold ${isHighContrast ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-500'} print:text-stone-400`}>Start Date</span>
                        <span className="font-semibold print:text-stone-700">{s.startDate || '01 Aug 2026'}</span>
                      </div>

                      <div>
                        <span className={`block text-[9px] uppercase font-bold ${isHighContrast ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-500'} print:text-stone-400`}>Ending Date</span>
                        <span className="font-bold print:text-stone-900">{s.endDate || s.deadline}</span>
                      </div>

                      <div className={`px-2 py-1 rounded-md font-bold flex items-center gap-1 border ${
                        isHighContrast 
                          ? 'bg-white text-black border-white'
                          : tl.isUrgent 
                            ? isLight
                              ? 'bg-rose-50 text-rose-700 border-rose-200 print:bg-rose-100 print:text-rose-800'
                              : 'bg-rose-950/80 text-rose-300 border-rose-500/40 print:bg-rose-100 print:text-rose-800' 
                            : isLight
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 print:bg-emerald-50 print:text-emerald-800'
                              : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 print:bg-emerald-50 print:text-emerald-800'
                      }`}>
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{tl.daysLeft}d left</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            <h3 className={`font-extrabold text-sm uppercase tracking-wider border-b pb-1 print:text-stone-800 print:border-stone-300 ${
              isHighContrast ? 'text-white border-white' : isLight ? 'text-slate-900 border-slate-200' : 'text-amber-400 border-amber-500/20'
            }`}>
              Required Documents ({uniqueDocs.length} Total Needed)
            </h3>

            {uniqueDocs.map(({ doc, count }) => {
              const isChecked = checkedDocs.has(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => onToggleDoc(doc.id)}
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                    isHighContrast
                      ? isChecked
                        ? 'bg-neutral-900 border-2 border-white text-white'
                        : 'bg-black border border-neutral-700 text-white hover:border-white'
                      : isChecked
                        ? isLight
                          ? 'bg-emerald-50/70 border-emerald-300 print:bg-emerald-50 print:border-emerald-300 text-slate-800'
                          : 'bg-emerald-950/40 border-emerald-500/40 print:bg-emerald-50 print:border-emerald-300'
                        : isLight
                          ? 'bg-white border-slate-200 hover:bg-slate-50 print:bg-white print:border-stone-200 text-slate-800'
                          : 'bg-[#131e35] border-amber-500/20 hover:border-amber-400/40 print:bg-white print:border-stone-200'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className={`w-5 h-5 ${isHighContrast ? 'text-white' : isLight ? 'text-emerald-600' : 'text-emerald-400'} print:text-emerald-600`} />
                    ) : (
                      <Square className={`w-5 h-5 ${isHighContrast ? 'text-neutral-500' : isLight ? 'text-slate-400' : 'text-slate-500'} print:text-stone-300`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold print:text-stone-900 text-sm">{doc.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border ${
                        isHighContrast
                          ? 'bg-white text-black border-white font-black'
                          : isLight
                            ? 'text-slate-700 bg-slate-100 border-slate-200 print:bg-amber-100 print:text-amber-800'
                            : 'text-amber-300 bg-amber-500/20 border-amber-500/30 print:bg-amber-100 print:text-amber-800'
                      }`}>
                        Required by {count} scheme{count > 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-400'} print:text-stone-600`}>{doc.description}</p>
                    {doc.tip && (
                      <p className={`text-[11px] font-semibold mt-1 ${isHighContrast ? 'text-white' : isLight ? 'text-amber-800' : 'text-amber-400 print:text-amber-700'}`}>
                        👉 {doc.tip}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guidelines for Cyber Cafe / CSC Operator */}
          <div className={`p-3.5 rounded-xl border text-xs space-y-1 print:bg-amber-50 print:border-amber-200 print:text-amber-900 ${
            isHighContrast
              ? 'bg-black border-2 border-white text-white'
              : isLight
                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                : 'bg-[#1f1624] border-amber-500/30 text-amber-200'
          }`}>
            <strong className={`block font-bold ${isHighContrast ? 'text-white' : isLight ? 'text-amber-900' : 'text-amber-300'} print:text-amber-900`}>Important Instructions for Scanning:</strong>
            <ul className={`list-disc pl-4 space-y-0.5 text-[11px] ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-700' : 'text-slate-300'} print:text-stone-700`}>
              <li>Scan each document in PDF or JPEG format under 200 KB.</li>
              <li>Bank passbook must clearly show IFSC code, account number, and student's full name.</li>
              <li>Income certificate must be verified by revenue officer (Tehsildar/SDM) for the current financial year.</li>
              <li>Ensure bank account is Aadhaar seeded on NPCI DBT portal.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 sm:p-6 border-t print:hidden flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 ${
          isHighContrast ? 'bg-black border-white' : isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#131f37] border-amber-500/25'
        }`}>
          <button
            onClick={onClose}
            className={`py-3 sm:py-2.5 px-4 min-h-[44px] rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
              isHighContrast 
                ? 'border border-white text-white hover:bg-neutral-800' 
                : isLight
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-200'
                  : 'border-amber-500/30 text-slate-300 hover:bg-white/10'
            }`}
          >
            Close
          </button>

          <button
            onClick={handlePrint}
            className={`py-3 sm:py-2.5 px-6 min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              isHighContrast
                ? 'bg-white text-black border-2 border-white font-black hover:bg-neutral-200'
                : isLight
                  ? 'bg-slate-900 hover:bg-black text-white'
                  : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-stone-950 shadow-amber-950/40'
            }`}
          >
            <Printer className="w-4.5 h-4.5 sm:w-4 sm:h-4" />
            <span>Print Checklist (Ctrl + P)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
