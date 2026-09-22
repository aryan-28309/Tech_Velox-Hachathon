export type SupportedLanguage = 
  | 'en' // English
  | 'hi' // Hindi (हिंदी)
  | 'mr' // Marathi (मराठी)
  | 'gu' // Gujarati (ગુજરાતી)
  | 'ta' // Tamil (தமிழ்)
  | 'te' // Telugu (తెలుగు)
  | 'bn' // Bengali (বাংলা)
  | 'kn' // Kannada (ಕನ್ನಡ)
  | 'pa' // Punjabi (ਪੰਜਾਬੀ)
  | 'ml' // Malayalam (മലയാളം)
  | 'or'; // Odia (ଓଡ଼ିଆ)

export type TextStyle = 'sans' | 'serif' | 'accessible' | 'mono';

export type ThemeMode = 'dark' | 'light';

export interface TextStyleOption {
  id: TextStyle;
  name: string;
  fontClass: string;
  description: string;
  sample: string;
}

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag?: string;
}

export type EducationLevel =
  | 'btech_engineering' // B.Tech / B.E. / Engineering & Technology
  | 'medical_health' // Medical / MBBS / BDS / Nursing / Pharmacy
  | 'diploma_iti' // Diploma / Polytechnic / ITI
  | 'undergraduate' // Degree / B.Sc / B.Com / B.A / BCA / BBA / Law
  | 'higher_secondary_11_12' // Class 11th - 12th / +2 / Intermediate
  | 'school_9_10' // Class 9th - 10th / Secondary
  | 'postgraduate' // M.Tech / MBA / M.Sc / MCA / MA
  | 'phd_research'; // PhD / Research

export type SocialCategory =
  | 'general'
  | 'obc'
  | 'sc'
  | 'st'
  | 'ews'
  | 'minority';

export type Gender = 'all' | 'female' | 'male' | 'transgender' | 'other';

export type GradingSystem = 'percentage' | 'cgpa' | 'sgpa';

export type InstitutionType = 
  | 'iit_nit_iisc_central' // IITs, NITs, IISc, Central Universities
  | 'state_govt_univ' // State Govt University
  | 'govt_aided_college' // Govt / Aided College
  | 'private_deemed' // Private / Deemed University
  | 'school_board' // CBSE / ICSE / State School
  | 'other';

export type PhdFellowshipExam = 
  | 'ugc_net_jrf' // UGC NET-JRF Qualified
  | 'csir_net_jrf' // CSIR NET-JRF Qualified
  | 'gate' // GATE Qualified (Score 650+)
  | 'icmr_dbt_jrf' // ICMR / DBT / ICSSR Fellowship
  | 'institutional_exam' // Direct Institute PhD Entrance
  | 'none';

export interface StudentProfile {
  educationLevel: EducationLevel | null;
  state: string;
  category: SocialCategory | null;
  gender: Gender;
  isSpeciallyAbled: boolean;
  familyIncome: number; // e.g. 200000
  percentageMarks: number; // e.g. 75 (normalized equivalent percentage)
  
  // Dynamic grading system for College & Higher Studies
  gradingSystem?: GradingSystem;
  cgpa?: number; // e.g. 8.4 on 10.0 scale
  sgpa?: number; // e.g. 8.6
  
  // College / University / School details
  institutionName?: string;
  institutionType?: InstitutionType;
  isNirfOrNaacRecognized?: boolean;
  schoolBoard?: 'cbse' | 'icse' | 'state_board' | 'other';
  
  // Ph.D. & Research specific details
  phdExam?: PhdFellowshipExam;
  gateScore?: number;
  mastersPercentage?: number;
  isFullTimePhd?: boolean;
}

export interface DocumentItem {
  id: string;
  name: string;
  iconName: 'file-text' | 'credit-card' | 'award' | 'landmark' | 'user-check' | 'home' | 'book-open';
  description: string;
  isMandatory: boolean;
  tip?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  schemeCode?: string; // Official Government / DBT / Portal Scheme Code
  ministryOrDepartment?: string; // e.g. Ministry of Education, MoSJE, AICTE, UGC
  provider: string;
  providerType: 'Government (Central)' | 'Government (State)' | 'Corporate CSR' | 'Philanthropic Trust';
  dbtDirectTransfer?: boolean; // Direct Benefit Transfer via Aadhaar/PFMS
  nodalVerificationAgency?: string; // e.g. Institute Nodal Officer (INO) & State Nodal Officer (SNO)
  digilockerVerified?: boolean; // Digilocker document pulling enabled
  awardAmount: string;
  awardAmountNumeric: number;
  maxAnnualIncome: number | null; // null means no upper income ceiling
  minPercentage: number; // e.g. 50%
  minCgpa?: number; // e.g. 8.0 on 10.0 scale (for premier/PMRF schemes)
  requiredPhdExams?: PhdFellowshipExam[];
  allowedInstitutionTypes?: InstitutionType[];
  educationLevels: EducationLevel[];
  categories: SocialCategory[];
  states: string[]; // ['ALL'] or specific states like ['Maharashtra']
  genderEligibility: 'all' | 'female' | 'transgender' | 'male';
  speciallyAbledOnly?: boolean;
  startDate: string; // Application Opening Date
  endDate: string; // Application Closing Date / Deadline
  deadline: string; // Same as endDate for compatibility
  applicationMode: 'National Scholarship Portal (NSP)' | 'State Scholarship Portal' | 'Direct CSR / Foundation Portal' | string;
  officialPortalName?: string;
  officialLink: string;
  guidelinesUrl?: string;
  documents: DocumentItem[];
  overview: string;
  benefits: string[];
  eligibilitySummary: string[];
  applicationSteps: string[];
  helplineNumber: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'gemini' | 'knowledge-base' | 'knowledge-base-fallback';
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  applicationId: string; // e.g. "PRAGATI-2026-89421"
  aadhaarLastFour?: string;
  role: 'student' | 'applicant';
  avatar?: string;
  savedScholarshipIds: string[];
  appliedScholarshipIds: string[];
  profile: Partial<StudentProfile>;
  createdAt: string;
}
