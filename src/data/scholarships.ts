import { Scholarship, DocumentItem } from '../types';

export const COMMON_DOCUMENTS: Record<string, DocumentItem> = {
  aadhaar: {
    id: 'doc_aadhaar',
    name: 'Aadhaar Card',
    iconName: 'credit-card',
    description: 'Student’s 12-digit Aadhaar card with updated mobile number linked for OTP.',
    isMandatory: true,
    tip: 'Ensure your name and date of birth match your 10th marksheet exactly.'
  },
  income_certificate: {
    id: 'doc_income',
    name: 'Income Certificate (आय प्रमाण पत्र)',
    iconName: 'landmark',
    description: 'Issued by competent authority (Tehsildar / SDM / Revenue Officer) for current financial year.',
    isMandatory: true,
    tip: 'Must show gross annual family income from all sources. Affidavit alone is generally not accepted.'
  },
  marksheet: {
    id: 'doc_marksheet',
    name: 'Previous Year Marksheet / Passing Certificate',
    iconName: 'award',
    description: 'Marksheet of previous qualifying exam (e.g., 10th, 12th, or last passed semester).',
    isMandatory: true,
    tip: 'Self-attested copy or official digilocker verified marksheet.'
  },
  bank_passbook: {
    id: 'doc_bank',
    name: 'Bank Passbook (Aadhaar & NPCI Seeded)',
    iconName: 'landmark',
    description: 'Active savings bank account in student’s own name with IFSC and branch stamp.',
    isMandatory: true,
    tip: 'CRITICAL: The bank account must be seeded with NPCI / Aadhaar DBT payment bridge.'
  },
  caste_certificate: {
    id: 'doc_caste',
    name: 'Caste / Community Certificate',
    iconName: 'user-check',
    description: 'Valid SC / ST / OBC / EWS certificate issued by Sub-Divisional Officer / Magistrate.',
    isMandatory: true,
    tip: 'OBC candidates usually require non-creamy layer (NCL) certificate for current financial year.'
  },
  bonafide_fee_receipt: {
    id: 'doc_bonafide',
    name: 'Bonafide Student Certificate & Fee Receipt',
    iconName: 'book-open',
    description: 'Certificate signed by College Principal / Headmaster along with official fee receipt.',
    isMandatory: true,
    tip: 'Contains your AISHE/DISE institution code and current admission year.'
  },
  domicile_certificate: {
    id: 'doc_domicile',
    name: 'Domicile / Residential Certificate',
    iconName: 'home',
    description: 'Proof of permanent residency in the applying state (issued by local authority).',
    isMandatory: true,
    tip: 'Required for state-specific scholarships and quota verifications.'
  },
  disability_certificate: {
    id: 'doc_pwd',
    name: 'UDID / Disability Certificate',
    iconName: 'file-text',
    description: 'Unique Disability ID (UDID) or Civil Surgeon certificate (>40% benchmark disability).',
    isMandatory: false,
    tip: 'Only applicable for Divyangjan / PwD students.'
  }
};

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'nsp-central-sector',
    name: 'Central Sector Scheme of Scholarship for College & University Students',
    schemeCode: 'NSP-MHRD-CSSS-01',
    ministryOrDepartment: 'Department of Higher Education, Ministry of Education (Govt. of India)',
    provider: 'Department of Higher Education, Ministry of Education (Govt. of India)',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Institute Nodal Officer (INO) & State Higher Education Nodal Officer (SNO)',
    digilockerVerified: true,
    awardAmount: '₹12,000 to ₹20,000 / year',
    awardAmountNumeric: 20000,
    maxAnnualIncome: 450000, // ₹4.5 Lakhs
    minPercentage: 60, // 80th percentile benchmark in 12th board
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://scholarships.gov.in/public/schemeGuidelines/DoHE_CSSS_Guidelines.pdf',
    overview: 'A flagship national scholarship aimed at meritorious students from lower and middle-income families to cover day-to-day expenses while pursuing graduation (B.Tech, MBBS, B.Sc, B.Com, BA) and post-graduation.',
    benefits: [
      '₹12,000 per annum for Graduation years (1st, 2nd, 3rd year)',
      '₹20,000 per annum for Post-Graduation years (4th and 5th year)',
      'Direct Benefit Transfer (DBT) straight into student’s bank account',
      'Renewable every year up to 5 years upon scoring 50%+ and 75% attendance'
    ],
    eligibilitySummary: [
      'Must have scored above the 80th percentile in relevant stream in Class 12th board examination',
      'Pursuing regular (full-time) degree courses in recognized colleges/universities',
      'Annual parental gross income should not exceed ₹4,50,000 per annum',
      'Not receiving any other Central or State government scholarship for fee reimbursement'
    ],
    applicationSteps: [
      'Step 1: Register with Aadhaar on scholarships.gov.in using OTR (One Time Registration)',
      'Step 2: Fill Personal, Academic (Class 12th roll number), and Bank details',
      'Step 3: Select "Department of Higher Education - Central Sector Scheme"',
      'Step 4: Upload Income Certificate & Bonafide Certificate',
      'Step 5: Submit application and give the printed copy to your college nodal officer for verification'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.bonafide_fee_receipt
    ],
    helplineNumber: '0120-6619540 (NSP Helpdesk)'
  },

  {
    id: 'post-matric-sc-st',
    name: 'Post-Matric Scholarship Scheme for SC / ST Students',
    schemeCode: 'NSP-MSJE-PMS-SC-01',
    ministryOrDepartment: 'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs (Govt. of India)',
    provider: 'Ministry of Social Justice & Empowerment / Tribal Affairs (Govt. of India)',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'District Social Welfare Officer (DSWO) & College Verification Officer',
    digilockerVerified: true,
    awardAmount: 'Full Tuition Fee + ₹13,500/yr Maintenance Allowance',
    awardAmountNumeric: 75000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 35, // Passing marks
    educationLevels: ['btech_engineering', 'medical_health', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'postgraduate', 'phd_research'],
    categories: ['sc', 'st'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '30 November 2026',
    deadline: '30 November 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://socialjustice.gov.in/writereaddata/UploadFile/PMS_SC_Guidelines.pdf',
    overview: 'Complete financial assistance covering mandatory non-refundable college fees and monthly maintenance allowance for Scheduled Caste and Scheduled Tribe students studying at post-matriculation stage.',
    benefits: [
      '100% Non-refundable tuition fees reimbursed directly to college or student account',
      'Maintenance allowance: Hostellers receive up to ₹13,500/year; Day scholars receive up to ₹7,000/year',
      'Special allowances for study tours, book grants, and thesis typing charges',
      'Special disability allowance of ₹4,00,00/year for PwD students'
    ],
    eligibilitySummary: [
      'Belong to Scheduled Caste (SC) or Scheduled Tribe (ST) category',
      'Combined annual family income from all sources must not exceed ₹2,50,000',
      'Enrolled in recognized post-matric course (Class 11, 12, ITI, Diploma, Degree, Masters, PhD)',
      'Only two boys of the same parents can receive this; no restriction for girls'
    ],
    applicationSteps: [
      'Step 1: Obtain digital Caste Certificate and current year Income Certificate from Tehsildar',
      'Step 2: Complete OTR registration on National Scholarship Portal (NSP)',
      'Step 3: Select State & Scheme: Post-Matric SC/ST Scholarship',
      'Step 4: Upload caste certificate, income proof, and previous year marksheet',
      'Step 5: Submit online and verify bank account seeding with NPCI'
    ],
    documents: [
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.domicile_certificate
    ],
    helplineNumber: '1800-180-1905 (Toll Free Social Justice)'
  },

  {
    id: 'pm-yasasvi-obc-ebc',
    name: 'PM YASASVI Post-Matric Scholarship for OBC, EBC & DNT Students',
    schemeCode: 'NSP-MSJE-YASASVI-PM-01',
    ministryOrDepartment: 'Ministry of Social Justice & Empowerment (MoSJE), Govt. of India',
    provider: 'Ministry of Social Justice & Empowerment, Govt. of India',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'State Backward Classes Welfare Directorate & Institute Nodal Officer',
    digilockerVerified: true,
    awardAmount: 'Up to ₹20,000 / year + Academic Allowances',
    awardAmountNumeric: 20000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 45,
    educationLevels: ['btech_engineering', 'medical_health', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'postgraduate'],
    categories: ['obc', 'ews'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '15 July 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://socialjustice.gov.in/writereaddata/UploadFile/PM_YASASVI_Guidelines.pdf',
    overview: 'PM Young Achievers Scholarship Award Scheme for Vibrant India (YASASVI) provides financial assistance to OBC, Economically Backward Classes (EBC), and Nomadic Tribes to complete higher secondary and college education.',
    benefits: [
      'Reimbursement of non-refundable tuition fee according to state norms',
      'Annual maintenance grant up to ₹20,000 for degree and professional courses',
      'Special support for vocational trades and diploma programs',
      'Credited securely via Aadhaar Payment Bridge (DBT)'
    ],
    eligibilitySummary: [
      'Belong to Other Backward Classes (OBC), Economically Backward Class (EBC), or De-notified Nomadic Tribe (DNT)',
      'Total annual family income must not exceed ₹2,50,000',
      'Must have passed the previous qualifying examination with minimum 45% marks',
      'Studying in a recognized government or private educational institution'
    ],
    applicationSteps: [
      'Step 1: Ensure Non-Creamy Layer (NCL) OBC certificate is updated',
      'Step 2: Log in to NSP with student OTR ID',
      'Step 3: Choose PM YASASVI Scheme under Ministry of Social Justice',
      'Step 4: Upload marksheet, fee receipt, and income proof',
      'Step 5: Get college nodal officer verification'
    ],
    documents: [
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt
    ],
    helplineNumber: '011-23382391 (MoSJE Helpline)'
  },

  {
    id: 'aicte-pragati-girls',
    name: 'AICTE Pragati Scholarship Scheme for Girl Students (B.Tech, BE & Diploma)',
    schemeCode: 'AICTE-PRAGATI-DEG-2024',
    ministryOrDepartment: 'All India Council for Technical Education (AICTE), Ministry of Education',
    provider: 'All India Council for Technical Education (AICTE), Ministry of Education',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'AICTE Student Development Cell & AICTE Approved College Nodal Officer',
    digilockerVerified: true,
    awardAmount: '₹50,000 / year (Fixed Lump Sum)',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 800000, // ₹8 Lakhs
    minPercentage: 50,
    educationLevels: ['btech_engineering', 'diploma_iti', 'undergraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'female', // Female only
    startDate: '01 August 2026',
    endDate: '15 November 2026',
    deadline: '15 November 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in / AICTE)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati',
    overview: 'A premier national incentive by AICTE to empower female students to pursue technical education (Engineering, Architecture, Pharmacy, Diploma) without financial barriers. Up to 10,000 girls awarded each year.',
    benefits: [
      '₹50,000 per annum paid directly to the student for every year of study',
      'Amount can be freely used for tuition fees, computer/laptop purchase, books, hostel fees, and equipment',
      'No state quotas; awarded purely across AICTE recognized engineering colleges and polytechnics',
      'Can be renewed each academic year upon passing promotion exams'
    ],
    eligibilitySummary: [
      'Only for female students admitted to 1st year of Degree or Diploma course (or 2nd year lateral entry)',
      'College must be approved by AICTE',
      'Maximum two girl children per family are eligible',
      'Family income should be less than or equal to ₹8,00,000 per annum'
    ],
    applicationSteps: [
      'Step 1: Visit National Scholarship Portal (scholarships.gov.in)',
      'Step 2: Select AICTE Scheme -> Pragati Scholarship Scheme for Girls',
      'Step 3: Enter AICTE College Roll/Enrollment Number and 12th/Diploma marks',
      'Step 4: Upload Parents Income Certificate & Declaration of 2 girl children in family',
      'Step 5: Institute head verifies student admission online via AICTE portal'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-29581333 / pragati@aicte-india.org'
  },

  {
    id: 'nmms-school-scheme',
    name: 'National Means-cum-Merit Scholarship Scheme (NMMSS)',
    schemeCode: 'NSP-DoSEL-NMMSS-01',
    ministryOrDepartment: 'Department of School Education & Literacy, Ministry of Education',
    provider: 'Department of School Education & Literacy, Ministry of Education',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'District Education Officer (DEO) & State Nodal Officer',
    digilockerVerified: true,
    awardAmount: '₹12,000 / year (₹1,000 per month)',
    awardAmountNumeric: 12000,
    maxAnnualIncome: 350000, // ₹3.5 Lakhs
    minPercentage: 55,
    educationLevels: ['school_9_10', 'higher_secondary_11_12'],
    categories: ['general', 'obc', 'sc', 'st', 'ews'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 July 2026',
    endDate: '15 October 2026',
    deadline: '15 October 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://dsel.education.gov.in/sites/default/files/Scheme_Guidelines_NMMSS.pdf',
    overview: 'Specially created to prevent school dropouts after Class 8 in rural and underprivileged families, encouraging bright students to complete their schooling up to Class 12.',
    benefits: [
      '₹12,000 annually credited directly into student’s bank account',
      'Assistance provided continuously from Class 9 through Class 12 (4 continuous years)',
      'Prevents rural students from abandoning education due to financial hardship',
      'Over 1,00,000 scholarships granted nationally every year'
    ],
    eligibilitySummary: [
      'Must have passed Class 8 from a Government, Local Body, or Government-aided school with at least 55% marks (50% for SC/ST)',
      'Parental annual income from all sources should not exceed ₹3,50,000',
      'Qualified the state-level NMMS selection examination conducted in Class 8',
      'Students of Navodaya, Kendriya Vidyalayas, and private residential schools are not eligible'
    ],
    applicationSteps: [
      'Step 1: Appear for state NMMS test in Class 8',
      'Step 2: Once selected, register on NSP under School Education section',
      'Step 3: Enter NMMS roll number and student bank account details',
      'Step 4: School principal verifies student enrollment in Class 9',
      'Step 5: Yearly renewal on NSP after passing 9th, 10th, and 11th'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.bonafide_fee_receipt
    ],
    helplineNumber: '011-23384589 (School Education Ministry)'
  },

  {
    id: 'hdfc-parivartan-ecss',
    name: 'HDFC Bank Parivartan’s ECSS Programme',
    schemeCode: 'HDFC-CSR-ECSS-2024',
    ministryOrDepartment: 'HDFC Bank Corporate Social Responsibility Trust',
    provider: 'HDFC Bank CSR (Corporate Social Responsibility)',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Buddy4Study CSR Verification Board & HDFC Parivartan Council',
    digilockerVerified: false,
    awardAmount: 'Up to ₹75,000 / year (School to PG)',
    awardAmountNumeric: 75000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 55,
    educationLevels: ['btech_engineering', 'medical_health', 'school_9_10', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '15 July 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'HDFC Parivartan Portal (hdfcbank.com)',
    officialLink: 'https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility/educational-crisis-scholarship',
    guidelinesUrl: 'https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility',
    overview: 'One of India’s largest private CSR scholarship initiatives, supporting students facing financial crisis or socio-economic distress to prevent dropout across school, diploma, and college education.',
    benefits: [
      'Class 1 to 12 students: ₹15,000 to ₹18,000 per year',
      'Diploma, Polytechnic & ITI: ₹25,000 per year',
      'General Graduation (B.Com, B.Sc, BA): ₹30,000 per year',
      'Professional Degree (Engineering, Medical, Law): ₹75,000 per year',
      'Can be availed alongside government tuition reimbursement in most cases'
    ],
    eligibilitySummary: [
      'Open to Indian nationals from Class 1 to Post-Graduate level',
      'Students must have scored at least 55% marks in their previous annual exam',
      'Annual family income must be ₹2,50,000 or less',
      'Special preference given to students facing personal crisis (loss of earning parent, critical illness)'
    ],
    applicationSteps: [
      'Step 1: Register on the HDFC Parivartan online scholarship portal',
      'Step 2: Upload previous marksheet, photo, and government ID proof',
      'Step 3: Provide family income proof (Salary slip, Income Certificate, or BPL Ration Card)',
      'Step 4: Provide admission fee receipt / bonafide student ID card',
      'Step 5: Telephonic document verification and direct bank disbursement'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.bonafide_fee_receipt
    ],
    helplineNumber: '011-430-92248 (HDFC Parivartan Helpdesk)'
  },

  {
    id: 'reliance-foundation-scholarship',
    name: 'Reliance Foundation Undergraduate & Postgraduate Scholarships',
    provider: 'Reliance Foundation',
    providerType: 'Corporate CSR',
    awardAmount: 'Up to ₹2,00,000 (UG) to ₹6,00,000 (PG) Total Grant',
    awardAmountNumeric: 200000,
    maxAnnualIncome: 1500000, // ₹15 Lakhs (merit-cum-means, preference < 2.5L)
    minPercentage: 60,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '15 October 2026',
    deadline: '15 October 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Reliance Foundation Scholarships (reliancefoundation.org)',
    officialLink: 'https://www.reliancefoundation.org/our-work/education/scholarships',
    guidelinesUrl: 'https://www.reliancefoundation.org/our-work/education/scholarships',
    overview: 'Prestigious national scholarship supporting 5,000 exceptional first-year undergraduate students and 100 postgraduate scholars across all disciplines in India.',
    benefits: [
      'Undergraduate Grant: Up to ₹2 Lakhs over duration of degree',
      'Postgraduate Scholars: Up to ₹6 Lakhs total grant',
      'Lump-sum direct transfers to cover living costs, books, laptop, and tuition',
      'Access to vibrant alumni network, mentorship, and leadership development workshops'
    ],
    eligibilitySummary: [
      'Full-time first-year undergraduate student in any stream in an Indian institute',
      'Scored at least 60% in Class 12th board examinations',
      'Household income under ₹15,00,000 (preference given to income under ₹2,50,000)',
      'Mandatory completion of online aptitude test (60 minutes, basic math & logic)'
    ],
    applicationSteps: [
      'Step 1: Fill the online application form on scholarships.reliancefoundation.org',
      'Step 2: Upload Class 12 marksheet, family income proof, and bonafide letter',
      'Step 3: Take the 60-minute online proctored aptitude test from mobile or PC',
      'Step 4: Merit list declared based on test score and socio-economic evaluation',
      'Step 5: Direct DBT grant disbursement into recipient bank account'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '+91 7977100100 / contactus@reliancefoundation.org'
  },

  {
    id: 'tata-trusts-education-grant',
    name: 'Tata Trusts Means Grant for Higher Education',
    provider: 'Sir Ratan Tata Trust & Allied Trusts',
    providerType: 'Philanthropic Trust',
    awardAmount: '30% to 80% of College Tuition Fees',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 400000, // ₹4.0 Lakhs
    minPercentage: 60,
    educationLevels: ['btech_engineering', 'medical_health', 'diploma_iti', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 September 2026',
    endDate: '31 January 2027',
    deadline: '31 January 2027',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Tata Trusts Education Grants (tatatrusts.org)',
    officialLink: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants',
    guidelinesUrl: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants',
    overview: 'Centuries-old philanthropic grant helping deserving students from low-income families pay college tuition fees for undergraduate and postgraduate studies in India.',
    benefits: [
      'Covers non-refundable institute tuition fees up to ₹50,000 - ₹1,00,000 directly',
      'Cheque or bank transfer drawn directly towards college fees or student ledger',
      'Can be applied for in any academic year (1st, 2nd, 3rd, or final year)',
      'No repayment required; purely philanthropic aid'
    ],
    eligibilitySummary: [
      'Enrolled in recognized diploma, degree, or masters course in India',
      'Minimum 60% marks in the immediate preceding academic year',
      'Annual family income not exceeding ₹4,00,000',
      'Genuine financial need with family income certificates and electricity bills'
    ],
    applicationSteps: [
      'Step 1: Apply on the Tata Trusts IGCMS portal (igcms.tatatrusts.org)',
      'Step 2: Upload previous semester marksheets and fee breakdown certificate from college',
      'Step 3: Submit Tehsildar income certificate or Form 16 / ITR',
      'Step 4: Interview or document check by Trust social welfare officers',
      'Step 5: Sanction letter sent and fees disbursed'
    ],
    documents: [
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.aadhaar
    ],
    helplineNumber: '022-66658282 / igcms@tatatrusts.org'
  },

  {
    id: 'kotak-kanya-scholarship',
    name: 'Kotak Kanya Scholarship for Girl Students',
    schemeCode: 'KOTAK-KEF-KANYA-2024',
    ministryOrDepartment: 'Kotak Education Foundation & Kotak Mahindra Bank CSR',
    provider: 'Kotak Mahindra Group & Kotak Education Foundation',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Kotak Education Selection Committee',
    digilockerVerified: false,
    awardAmount: '₹1,50,000 / year (Until Graduation Completion)',
    awardAmountNumeric: 150000,
    maxAnnualIncome: 600000, // ₹6.0 Lakhs
    minPercentage: 75,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'female',
    startDate: '01 July 2026',
    endDate: '30 November 2026',
    deadline: '30 November 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Kotak Education Foundation Portal (kotakeducation.org)',
    officialLink: 'https://kotakeducation.org/kotak-kanya-scholarship/',
    guidelinesUrl: 'https://kotakeducation.org/kotak-kanya-scholarship/',
    overview: 'Designed exclusively to support meritorious girl students from underprivileged backgrounds to pursue first-year undergraduate professional graduation (Engineering, MBBS, Architecture, Law, Design).',
    benefits: [
      '₹1.5 Lakh per year for the entire duration of degree course (4 to 5 years)',
      'Can be used for academic fees, hostel fees, books, computer, and living expenses',
      'Personal mentoring and career grooming by corporate professionals',
      'Internship opportunities and soft-skills workshop access'
    ],
    eligibilitySummary: [
      'Only female applicants from across India',
      'Scored 75% or above marks in Class 12th board exams',
      'Admitted to 1st year professional degree in recognized institutes (NAAC/NIRF accredited)',
      'Annual family income must be ₹6,00,000 or less'
    ],
    applicationSteps: [
      'Step 1: Submit online application on Kotak Education Foundation portal',
      'Step 2: Upload Class 10 & 12 marksheets, admission proof, and fee receipt',
      'Step 3: Upload parent income certificate / BPL card / ITR',
      'Step 4: Shortlisted candidates appear for a virtual interview',
      'Step 5: Award letters issued and annual disbursement released'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '022-61660001 (Kotak Education Foundation)'
  },

  {
    id: 'mahadbt-post-matric',
    name: 'MahaDBT Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti',
    schemeCode: 'MH-DTE-EBC-RCSM-01',
    ministryOrDepartment: 'Higher & Technical Education Dept., Government of Maharashtra',
    provider: 'Higher & Technical Education Dept., Government of Maharashtra',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Joint Directorate of Technical Education (JDTE) & College Scrutiny Clerk',
    digilockerVerified: true,
    awardAmount: '50% to 100% Tuition & Exam Fee Reimbursement',
    awardAmountNumeric: 60000,
    maxAnnualIncome: 800000, // ₹8 Lakhs
    minPercentage: 50,
    educationLevels: ['btech_engineering', 'medical_health', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'ews'],
    states: ['Maharashtra'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'State Scholarship Portal',
    officialPortalName: 'Aaple Sarkar MahaDBT Portal (mahadbt.maharashtra.gov.in)',
    officialLink: 'https://mahadbt.maharashtra.gov.in',
    guidelinesUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AA34DE79D',
    overview: 'Maharashtra state scheme providing 50% tuition and exam fee waiver to Open, EBC, and General students admitted through CAP rounds in recognized colleges across Maharashtra.',
    benefits: [
      '50% reimbursement of college tuition fees and examination fees for CAP admitted students',
      'Direct transfer to institute account and student bank account via DBT',
      'Applicable for Engineering, Medical, Pharmacy, MBA, Polytechnic, Agriculture, and General streams',
      'No repayment needed'
    ],
    eligibilitySummary: [
      'Must be a domicile of Maharashtra state',
      'Admitted through Centralized Admission Process (CAP)',
      'Family annual income must not exceed ₹8,00,000 (issued by Tehsildar)',
      'Candidate should not be enrolled in distance or correspondence courses'
    ],
    applicationSteps: [
      'Step 1: Register on mahadbt.maharashtra.gov.in with Aadhaar verification',
      'Step 2: Create profile, add Maharashtra Domicile & Income Certificate number',
      'Step 3: Select Directorate of Higher/Technical Education scheme',
      'Step 4: Add college admission CAP allotment letter and previous marksheet',
      'Step 5: Submit and track verification by college and scrutiny clerk'
    ],
    documents: [
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt
    ],
    helplineNumber: '022-49150800 (MahaDBT Helpline)'
  },

  {
    id: 'up-post-matric-scholarship',
    name: 'Uttar Pradesh Post-Matric Scholarship & Fee Reimbursement Scheme',
    schemeCode: 'UP-SWD-PMS-DASHMOTTAR-01',
    ministryOrDepartment: 'Social Welfare & Backward Class Welfare Dept., Govt. of Uttar Pradesh',
    provider: 'Social Welfare & Backward Class Welfare Dept., Govt. of Uttar Pradesh',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'District Social Welfare Officer (DSWO UP) & College Registrar',
    digilockerVerified: true,
    awardAmount: 'Full Fee Reimbursement + Monthly Maintenance Allowance',
    awardAmountNumeric: 55000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs (₹2L for General/OBC, ₹2.5L for SC/ST)
    minPercentage: 50,
    educationLevels: ['btech_engineering', 'medical_health', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Uttar Pradesh'],
    genderEligibility: 'all',
    startDate: '10 July 2026',
    endDate: '10 November 2026',
    deadline: '10 November 2026',
    applicationMode: 'State Scholarship Portal',
    officialPortalName: 'UP Dashmottar Scholarship Portal (scholarship.up.gov.in)',
    officialLink: 'https://scholarship.up.gov.in',
    guidelinesUrl: 'https://scholarship.up.gov.in/Rules.aspx',
    overview: 'Uttar Pradesh government’s comprehensive financial aid covering college admission fees and living stipends for students studying in UP colleges or recognized national institutes.',
    benefits: [
      '100% reimbursement of non-refundable annual college tuition fee',
      'Monthly scholarship allowance up to ₹1,200 per month for hostellers',
      'Funds deposited through Aadhaar-based DBT payment system directly',
      'Available for intermediate (11th-12th) and post-matric (Graduation/PG/Diploma) courses'
    ],
    eligibilitySummary: [
      'Student must be a permanent resident (Domicile) of Uttar Pradesh',
      'Family income limit: Up to ₹2,50,000 for SC/ST; Up to ₹2,00,000 for OBC/General/Minority',
      'Enrolled in a recognized school, college, polytechnic, or university in UP',
      'College must be registered with UP Scholarship Master Data'
    ],
    applicationSteps: [
      'Step 1: Go to scholarship.up.gov.in and click "Student Registration"',
      'Step 2: Enter High School (Class 10) roll number, passing year, and board name',
      'Step 3: Enter DigiLocker verification and e-KYC via Aadhaar OTP',
      'Step 4: Enter verified Income Certificate & Caste Certificate application and serial numbers',
      'Step 5: Lock application, print final hard copy, and submit to institute within 3 days'
    ],
    documents: [
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.aadhaar
    ],
    helplineNumber: '1800-180-5131 (UP Social Welfare Toll Free)'
  },

  {
    id: 'karnataka-ssp-post-matric',
    name: 'Karnataka State Scholarship Portal (SSP) Post-Matric Scholarship',
    provider: 'Social Welfare & Backward Classes Dept., Govt. of Karnataka',
    providerType: 'Government (State)',
    awardAmount: 'College Fee Concession + Monthly EBL Food & Hostel Stipend',
    awardAmountNumeric: 40000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 45,
    educationLevels: ['btech_engineering', 'medical_health', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'minority'],
    states: ['Karnataka'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'State Scholarship Portal',
    officialLink: 'https://ssp.postmatric.karnataka.gov.in',
    overview: 'Consolidated single-window scholarship portal by the Karnataka Government integrating fee concession, Vidyasiri food & accommodation, and hostel fee reimbursement.',
    benefits: [
      'Complete or partial fee concession reimbursed directly to educational institutions',
      'Vidyasiri scheme: Monthly stipend of ₹1,500/month for food and accommodation for non-hostellers',
      'Automatic Kutumba software integration for automated verification',
      'Transparent tracking through student SSP SATS ID'
    ],
    eligibilitySummary: [
      'Must be a resident of Karnataka state with valid Kutumba / Ration card',
      'Annual family income: SC/ST up to ₹2.5 Lakhs; OBC Cat-1 up to ₹2.5 Lakhs; 2A, 3A, 3B up to ₹1 Lakh',
      'Enrolled in recognized PUC, ITI, Diploma, Graduation, or Post Graduation in Karnataka',
      'Must have student Aadhaar linked to bank account with NPCI mapping'
    ],
    applicationSteps: [
      'Step 1: Create account on ssp.postmatric.karnataka.gov.in using Aadhaar',
      'Step 2: Enter Student RD numbers for Caste & Income certificates (issued by Nadakacheri)',
      'Step 3: Enter College University Registration Number (UUCMS / SATS ID)',
      'Step 4: Confirm hostel / day scholar status for Vidyasiri allowance',
      'Step 5: Submit application; college verifies through e-Attestation'
    ],
    documents: [
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.aadhaar
    ],
    helplineNumber: '080-35254999 (SSP Karnataka Helpdesk)'
  },

  {
    id: 'begum-hazrat-mahal-girls',
    name: 'Begum Hazrat Mahal National Scholarship for Minority Girls',
    provider: 'Maulana Azad Education Foundation, Ministry of Minority Affairs',
    providerType: 'Government (Central)',
    awardAmount: '₹5,000 (Class 9-10) to ₹6,000 (Class 11-12) / year',
    awardAmountNumeric: 6000,
    maxAnnualIncome: 200000, // ₹2.0 Lakhs
    minPercentage: 50,
    educationLevels: ['school_9_10', 'higher_secondary_11_12'],
    categories: ['minority'],
    states: ['ALL'],
    genderEligibility: 'female',
    startDate: '15 July 2026',
    endDate: '30 November 2026',
    deadline: '30 November 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialLink: 'https://scholarships.gov.in',
    overview: 'Special national scholarship to assist girl students belonging to national minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, Parsis) to continue higher school education.',
    benefits: [
      'Class 9 & 10: ₹5,000 per academic year',
      'Class 11 & 12: ₹6,000 per academic year',
      'Credited directly into girl student’s bank account via DBT',
      'No application processing fees at all'
    ],
    eligibilitySummary: [
      'Only female students belonging to notified minority communities',
      'Studying in Class 9, 10, 11, or 12 in recognized schools',
      'Must have secured at least 50% marks in previous aggregate examination',
      'Annual parental family income must not exceed ₹2,00,000'
    ],
    applicationSteps: [
      'Step 1: Go to scholarships.gov.in and register OTR profile',
      'Step 2: Choose "Ministry of Minority Affairs - Begum Hazrat Mahal Scholarship"',
      'Step 3: Upload Minority Self-Declaration & Income Certificate',
      'Step 4: Upload Class 8 or 10 passing marksheet and school bonafide form',
      'Step 5: School verification done online by Headmaster'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.bonafide_fee_receipt
    ],
    helplineNumber: '1800-11-2001 (Minority Affairs Toll Free)'
  },

  {
    id: 'aicte-swanath-scheme',
    name: 'AICTE Swanath Scholarship Scheme for Technical Education (B.Tech & Diploma)',
    provider: 'All India Council for Technical Education (AICTE)',
    providerType: 'Government (Central)',
    awardAmount: '₹50,000 / year (Fixed Lump Sum for Every Year of Study)',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 800000, // ₹8.0 Lakhs
    minPercentage: 45,
    educationLevels: ['btech_engineering', 'diploma_iti'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '30 November 2026',
    deadline: '30 November 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialLink: 'https://scholarships.gov.in',
    overview: 'Special national scholarship scheme by AICTE to provide financial support of ₹50,000 per annum to students admitted to AICTE approved institutions for Degree (B.Tech / B.E.) and Diploma courses.',
    benefits: [
      '₹50,000 per annum lump sum payment towards college fee, books, software, and living costs',
      'No state cap; 2,000 scholarships awarded annually across India',
      'Renewable every academic year until course completion without hassle',
      'Direct Benefit Transfer (DBT) into student bank account'
    ],
    eligibilitySummary: [
      'Currently enrolled in 1st year or lateral entry into Degree (B.Tech/B.E.) or Diploma in an AICTE approved college',
      'Family income from all sources must not exceed ₹8,00,000 per annum',
      'Open to orphan students, wards of armed forces/paramilitary martyrs, or parents deceased during COVID-19',
      'Indian national studying in recognized technical institution'
    ],
    applicationSteps: [
      'Step 1: Go to National Scholarship Portal (scholarships.gov.in) with Aadhaar OTR',
      'Step 2: Under AICTE Schemes, choose "AICTE Swanath Scholarship Scheme"',
      'Step 3: Enter AICTE institute enrollment details and 12th / Diploma marksheet',
      'Step 4: Upload eligibility certificate and Tehsildar income certificate',
      'Step 5: College nodal officer approves application online'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-29581333 (AICTE Swanath Desk)'
  },

  {
    id: 'ffe-engineering-scholarship',
    name: 'Foundation for Excellence (FFE) Engineering (B.Tech) & Medical Scholarship',
    provider: 'Foundation for Excellence (FFE India Trust)',
    providerType: 'Philanthropic Trust',
    awardAmount: 'Up to ₹50,000 / year + Laptop & Skill Training',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 350000, // ₹3.5 Lakhs
    minPercentage: 70, // 70% in 12th board + good rank in JEE / State CET
    educationLevels: ['btech_engineering', 'medical_health'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '15 July 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Foundation For Excellence Portal (ffe.org)',
    officialLink: 'https://ffe.org/scholarships/',
    guidelinesUrl: 'https://ffe.org/scholarships/',
    overview: 'Flagship nationwide engineering and medical scholarship program for academically gifted students from financially constrained backgrounds joining 1st year B.Tech, B.E., or MBBS.',
    benefits: [
      'Annual financial grant of ₹50,000 towards college tuition, hostel, and exam fees',
      'Free high-performance laptop provided to deserving tech students',
      'Corporate mentorship program by tech leaders (Amazon, Cisco, Microsoft, Infosys)',
      'Soft skills, coding bootcamps, and campus placement preparation'
    ],
    eligibilitySummary: [
      'Admitted to 1st year of B.Tech / B.E. or MBBS in recognized government or private college',
      'Admission must be through general counseling rank (JEE Main / State CET rank under cutoff)',
      'Scored at least 70% aggregate in Class 12th Physics, Chemistry, Math / Biology',
      'Combined family income must be under ₹3,50,000 per year'
    ],
    applicationSteps: [
      'Step 1: Fill preliminary application on ffe.org/scholarships',
      'Step 2: Upload Rank Card (JEE Main or State CET) and Class 12 marksheet',
      'Step 3: Upload Tehsildar income certificate and college admission fee receipt',
      'Step 4: Assigned FFE Volunteer conducts a home visit or online verification',
      'Step 5: Scholarship award letter issued and grant disbursed directly'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '080-42042654 / scholarships@ffe.org'
  },

  {
    id: 'ongc-engineering-scholarship',
    name: 'ONGC Foundation Scholarship for Meritorious Engineering (B.Tech) & MBBS Students',
    provider: 'Oil and Natural Gas Corporation (ONGC) Foundation',
    providerType: 'Corporate CSR',
    awardAmount: '₹48,000 / year (₹4,000 per month)',
    awardAmountNumeric: 48000,
    maxAnnualIncome: 450000, // ₹4.5 Lakhs (₹2L for General/OBC, ₹4.5L for SC/ST)
    minPercentage: 60,
    educationLevels: ['btech_engineering', 'medical_health'],
    categories: ['general', 'obc', 'sc', 'st', 'ews'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 September 2026',
    endDate: '20 November 2026',
    deadline: '20 November 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialLink: 'https://ongcscholar.org',
    overview: 'National scholarship by India’s top energy Maharatna PSU supporting 2,000 undergraduate engineering (B.Tech/B.E.) and MBBS students from economically disadvantaged families.',
    benefits: [
      '₹4,000 per month (₹48,000 per annum) directly into student account',
      '50% quota reserved exclusively for female students in engineering and medicine',
      'Zone-wise allocation ensuring equal opportunity for North, South, East, West & Central zones',
      'Renewable every year till completion of graduation degree'
    ],
    eligibilitySummary: [
      'Full-time 1st year student pursuing Engineering (B.Tech/B.E.) or MBBS',
      'College or University must be approved by AICTE / UGC / MCI / NMC',
      'Minimum 60% marks in Class 12th board examinations',
      'Family annual gross income should not exceed ₹4,50,000 per annum'
    ],
    applicationSteps: [
      'Step 1: Register on ongcscholar.org during the open application window',
      'Step 2: Enter academic details, 12th marks, and college admission proof',
      'Step 3: Upload certified copy of Caste Certificate (for SC/ST/OBC) and Income Certificate',
      'Step 4: Download completed form, get it attested by Head of Department / Dean',
      'Step 5: Upload signed form and submit online'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-22406600 (ONGC Scholar Portal Helpdesk)'
  },

  {
    id: 'siemens-engineering-scholarship',
    name: 'Siemens Scholarship Program for 1st Year B.Tech / B.E. Students',
    provider: 'Siemens India CSR',
    providerType: 'Corporate CSR',
    awardAmount: '100% Tuition Fee + ₹50,000 Book/Hostel Allowance + Internship',
    awardAmountNumeric: 100000,
    maxAnnualIncome: 500000, // ₹5 Lakhs
    minPercentage: 60,
    educationLevels: ['btech_engineering'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '15 December 2026',
    deadline: '15 December 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialLink: 'https://www.siemens.com/in/en/company/sustainability/corporate-citizenship.html',
    overview: 'Comprehensive developmental scholarship covering full college tuition, living allowances, holistic technical training, and paid internship opportunity with Siemens engineers.',
    benefits: [
      'Full reimbursement of tuition fees as charged by government engineering colleges',
      'Annual allowance of up to ₹50,000 for textbooks, stationary, hostel, and laptop',
      'German dual-education model technical training & German language certification',
      'Guaranteed internship opportunities at Siemens R&D plants in India'
    ],
    eligibilitySummary: [
      'First-year students of Government Engineering Colleges (IITs, NITs, State Govt Engineering Colleges)',
      'Branches: Mechanical, Electrical, Electronics, Instrumentation, Computer Science / IT',
      'Minimum 60% aggregate in SSC (Class 10) and 50% in HSC (Class 12) Science with 60% PCM',
      'Annual family income not more than ₹5,00,000'
    ],
    applicationSteps: [
      'Step 1: Check eligibility on Siemens India Scholarship portal',
      'Step 2: Submit online application with JEE rank card and admission confirmation',
      'Step 3: Upload 10th and 12th marksheets, family income certificate',
      'Step 4: Attend online aptitude test followed by technical and HR interview',
      'Step 5: Induction into the Siemens Scholars cohort'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '022-39677000 / siemenscholars@siemens.com'
  },

  {
    id: 'sbi-asha-scholarship',
    name: 'SBI Asha Scholarship for Higher & Professional Education (B.Tech, MBBS, Degree)',
    provider: 'SBI Foundation (State Bank of India)',
    providerType: 'Corporate CSR',
    awardAmount: '₹50,000 to ₹75,000 / year',
    awardAmountNumeric: 70000,
    maxAnnualIncome: 300000, // ₹3.0 Lakhs
    minPercentage: 75,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 July 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'SBI Foundation Asha Scholarship (sbifoundation.in)',
    officialLink: 'https://www.sbifoundation.in/asha-scholarship',
    guidelinesUrl: 'https://www.sbifoundation.in/asha-scholarship',
    overview: 'Education initiative by SBI Foundation to provide financial assistance to meritorious students across India who cannot afford higher education in top engineering, medical, and degree colleges.',
    benefits: [
      'Undergraduate Degree students: ₹50,000 per annum',
      'IIT / NIT / B.Tech engineering & MBBS students: Up to ₹75,000 per annum',
      'Transferred directly into student’s savings bank account',
      'Renewable every year for the entire duration of the course'
    ],
    eligibilitySummary: [
      'Enrolled in 1st year of Undergraduate degree, B.Tech, or MBBS in India',
      'Secured minimum 75% marks in previous Class 12 board examination',
      'Annual family income from all sources should be less than or equal to ₹3,00,000',
      'Open to all Indian students across all categories'
    ],
    applicationSteps: [
      'Step 1: Open SBI Foundation Asha scholarship portal on Buddy4Study / SBI website',
      'Step 2: Complete student KYC with Aadhaar and phone number',
      'Step 3: Upload 12th board marksheet, college admission fee slip, and photo',
      'Step 4: Upload official Tehsildar income certificate',
      'Step 5: Telephonic interview and document verification before disbursement'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-43092248 / sbiashascholarship@sbifoundation.co.in'
  },

  {
    id: 'keep-india-smiling-engineering',
    name: 'Keep India Smiling Foundational Scholarship for Engineering (B.Tech / B.E.)',
    provider: 'Colgate-Palmolive (India) Limited CSR',
    providerType: 'Corporate CSR',
    awardAmount: '₹30,000 / year (For 4 Years = ₹1,20,000 Total)',
    awardAmountNumeric: 30000,
    maxAnnualIncome: 500000, // ₹5.0 Lakhs
    minPercentage: 60,
    educationLevels: ['btech_engineering'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '15 August 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Colgate Keep India Smiling Portal (colgate.com)',
    officialLink: 'https://www.colgate.com/en-in/keep-india-smiling',
    guidelinesUrl: 'https://www.colgate.com/en-in/keep-india-smiling',
    overview: 'Corporate scholarship aimed at supporting deserving engineering students across 4 years of their degree to ensure they do not discontinue due to financial constraints.',
    benefits: [
      '₹30,000 per annum for each of the 4 years of B.Tech / B.E. course',
      'Direct credit into student’s bank account',
      'Mentorship and skill-development workshops',
      'Open to students studying in any AICTE/UGC recognized engineering college'
    ],
    eligibilitySummary: [
      'Must have passed Class 12 board examination with minimum 60% marks',
      'Currently enrolled in 1st year of 4-year Engineering (B.Tech / B.E.) course in India',
      'Annual family income from all sources must not exceed ₹5,00,000 per annum',
      'Candidate must have a valid bank account in their own name'
    ],
    applicationSteps: [
      'Step 1: Register on Colgate Keep India Smiling online scholarship portal',
      'Step 2: Enter academic details (10th, 12th marks and current college ID)',
      'Step 3: Upload Aadhaar card, income certificate, and admission fee receipt',
      'Step 4: Write short statement of purpose explaining your career aspirations',
      'Step 5: Verification of documents and selection announcement'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '022-67095000 (Colgate CSR Desk)'
  },

  {
    id: 'drdo-engineering-girls',
    name: 'DRDO Scholarship Scheme for Girls in Technical Education (B.Tech / B.E.)',
    provider: 'Defence Research & Development Organisation (DRDO), Ministry of Defence',
    providerType: 'Government (Central)',
    awardAmount: '₹1,20,000 / year (₹10,000 per month)',
    awardAmountNumeric: 120000,
    maxAnnualIncome: null, // No family income limit, merit-based via JEE Main
    minPercentage: 65,
    educationLevels: ['btech_engineering'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'female',
    startDate: '01 July 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'RAC DRDO Portal (rac.gov.in)',
    officialLink: 'https://rac.gov.in',
    overview: 'Premier national defense scholarship for bright girl engineering students to encourage participation in cutting-edge aerospace, computer science, mechanical, electrical, and electronics engineering.',
    benefits: [
      '₹1,20,000 per year (₹10,000 per month) for up to 4 years of B.Tech study',
      'Opportunity to carry out final year engineering project at DRDO laboratories',
      'Mentorship from senior DRDO defense scientists',
      'No bond requirement or restriction on future employment'
    ],
    eligibilitySummary: [
      'Female Indian students admitted to 1st year of full-time regular B.Tech / B.E. course',
      'Branches: Aerospace, Aeronautical, Space Engineering, Computer Science, IT, Electrical, Mechanical, Electronics',
      'Admission must be based on a valid JEE Main score / rank',
      'No income ceiling; selected purely on JEE Main merit rank'
    ],
    applicationSteps: [
      'Step 1: Visit RAC DRDO portal (rac.gov.in)',
      'Step 2: Register with Aadhaar and email, navigate to "DRDO Scholarship Scheme for Girls"',
      'Step 3: Enter JEE Main roll number and score details for online verification',
      'Step 4: Upload Class 12 marksheet and college admission bonafide certificate',
      'Step 5: Merit list published on RAC portal and funds transferred directly via DBT'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-23889528 (DRDO RAC Helpdesk)'
  },

  {
    id: 'mp-medhavi-vidyarthi-mmvy',
    name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY) for B.Tech, MBBS & Degree',
    provider: 'Department of Technical & Higher Education, Government of Madhya Pradesh',
    providerType: 'Government (State)',
    awardAmount: '100% Full College Tuition Fee Waiver (Up to ₹1,50,000 / year)',
    awardAmountNumeric: 120000,
    maxAnnualIncome: 600000, // ₹6.0 Lakhs
    minPercentage: 70, // 70% in MP Board or 85% in CBSE/ICSE
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Madhya Pradesh'],
    genderEligibility: 'all',
    startDate: '15 August 2026',
    endDate: '15 December 2026',
    deadline: '15 December 2026',
    applicationMode: 'State Scholarship Portal (scholarshipportal.mp.nic.in)',
    officialLink: 'http://scholarshipportal.mp.nic.in/MedhaviChhatra',
    overview: 'State government scheme bearing the complete tuition fee of meritorious students who crack JEE Main (under 1.5 Lakh rank) or NEET, or enroll in top degree courses in India.',
    benefits: [
      'Complete tuition fee directly paid to engineering / medical college by MP Government',
      'Valid for government engineering colleges, IITs, NITs, and private colleges in MP',
      'Full course fee covered for the entire 4 or 5-year duration',
      'Relieves families of taking education loans for high college fees'
    ],
    eligibilitySummary: [
      'Candidate must be a bonafide resident / domicile of Madhya Pradesh',
      'Father/Guardian’s annual income should not exceed ₹6,00,000',
      'Scored 70% or more in MP Board (Class 12) or 85% or more in CBSE/ICSE',
      'Engineering students: Must secure JEE Main rank up to 1,50,000'
    ],
    applicationSteps: [
      'Step 1: Go to scholarshipportal.mp.nic.in/MedhaviChhatra',
      'Step 2: Register with MP Samagra ID and Aadhaar card',
      'Step 3: Enter Class 12th Roll Number and JEE Main / NEET roll number',
      'Step 4: Enter College admission fee details and upload Domicile & Income certificates',
      'Step 5: College nodal officer approves and state government disburses tuition fee'
    ],
    documents: [
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.aadhaar
    ],
    helplineNumber: '0755-2660063 (MP Higher Education Helpdesk)'
  },

  {
    id: 'bihar-post-matric-scholarship',
    name: 'Bihar PMS Online Post-Matric Scholarship for College, B.Tech & Diploma',
    provider: 'SC/ST & BC/EBC Welfare Department, Government of Bihar',
    providerType: 'Government (State)',
    awardAmount: 'Full Tuition Fee + ₹15,000 / year Maintenance Stipend',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 300000, // ₹3.0 Lakhs
    minPercentage: 45,
    educationLevels: ['btech_engineering', 'medical_health', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'postgraduate'],
    categories: ['obc', 'sc', 'st', 'ews'],
    states: ['Bihar'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '30 November 2026',
    deadline: '30 November 2026',
    applicationMode: 'Bihar PMS Portal (pmsonline.bih.nic.in)',
    officialLink: 'https://pmsonline.bih.nic.in',
    overview: 'Comprehensive post-matric education assistance program by the Bihar government providing complete institutional fee reimbursement and monthly allowance for BC, EBC, SC, and ST students.',
    benefits: [
      'Full institutional fee reimbursement up to government approved limits',
      'Monthly maintenance allowance sent via DBT to student bank account',
      'Valid for colleges inside Bihar and recognized national institutions outside Bihar',
      'Fast automated verification through Bihar PMS Online portal'
    ],
    eligibilitySummary: [
      'Permanent resident / domicile of Bihar state',
      'Belong to Backward Class (BC), Extremely Backward Class (EBC), SC, or ST',
      'Family annual gross income must not exceed ₹3,00,000',
      'Enrolled in recognized Post-Matric course (Intermediate, Diploma, B.Tech, MBBS, Degree, PG)'
    ],
    applicationSteps: [
      'Step 1: Visit pmsonline.bih.nic.in and click on "Student Registration"',
      'Step 2: Authenticate Aadhaar with Bihar Domicile certificate and Caste certificate',
      'Step 3: Enter College details, course name (B.Tech / Degree / Diploma), and fee structure',
      'Step 4: Upload bonafide certificate and previous examination marksheet',
      'Step 5: Submit application; track status online till payment generation'
    ],
    documents: [
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.aadhaar
    ],
    helplineNumber: '0612-2215160 (Bihar PMS Helpdesk)'
  },

  {
    id: 'rajasthan-cm-higher-education',
    name: 'Rajasthan Chief Minister Higher Education & Post-Matric Scholarship Scheme',
    provider: 'Social Justice & Empowerment Department, Government of Rajasthan',
    providerType: 'Government (State)',
    awardAmount: '₹5,000 to ₹50,000 / year + Full Fee Reimbursement for SC/ST/EBC',
    awardAmountNumeric: 35000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 60, // 60% in Class 12
    educationLevels: ['btech_engineering', 'medical_health', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Rajasthan'],
    genderEligibility: 'all',
    startDate: '15 July 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'SSO Rajasthan (sjms.rajasthan.gov.in)',
    officialLink: 'https://sjmsnew.rajasthan.gov.in',
    overview: 'Rajasthan government financial aid scheme benefiting meritorious students of Class 12 board exams pursuing regular degree, engineering, polytechnic, or postgraduate courses.',
    benefits: [
      'Chief Minister Higher Education Grant: ₹5,000 per annum for 5 years',
      'Post-Matric Fee Reimbursement: 100% tuition fees for SC, ST, EBC students',
      'Direct deposit into Jan Aadhaar linked bank account',
      'Integrated with RajSSP for fast paperless sanction'
    ],
    eligibilitySummary: [
      'Bonafide resident / domicile of Rajasthan with Jan Aadhaar card',
      'Scored 60% or higher marks in Class 12th Board Examinations',
      'Annual parental income should be under ₹2,50,000 per annum',
      'Studying as a regular student in any recognized college or university in India'
    ],
    applicationSteps: [
      'Step 1: Log in to Rajasthan SSO portal (sso.rajasthan.gov.in)',
      'Step 2: Click on SJMS Scholarship application icon',
      'Step 3: Enter Jan Aadhaar number to fetch family and bank details automatically',
      'Step 4: Enter college admission registration number and upload fee receipt',
      'Step 5: Lock application and submit for college e-verification'
    ],
    documents: [
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.aadhaar
    ],
    helplineNumber: '0141-2226627 (Rajasthan SJMS Toll Free)'
  },
  {
    id: 'smile-transgender-scholarship',
    name: 'National Scholarship Scheme for Transgender Students (SMILE)',
    provider: 'Department of Social Justice & Empowerment, Government of India',
    providerType: 'Government (Central)',
    awardAmount: '₹13,500 to ₹50,000 / year + Monthly Maintenance Allowance',
    awardAmountNumeric: 35000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs ceiling
    minPercentage: 0, // No minimum cutoff, passing criteria
    educationLevels: ['school_9_10', 'higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'btech_engineering', 'medical_health', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'transgender',
    startDate: '01 July 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'National Scholarship Portal (NSP) & Transgender Portal',
    officialPortalName: 'National Transgender Portal (transgender.dosje.gov.in)',
    officialLink: 'https://transgender.dosje.gov.in',
    overview: 'Flagship Central Government initiative under SMILE (Support for Marginalized Individuals for Livelihood and Enterprise) providing comprehensive financial support to transgender students from Class 9 up to Post-Graduation and PhD.',
    benefits: [
      'Scholarship amount of ₹13,500/year for Secondary & Senior Secondary (Classes 9 to 12)',
      'Scholarship amount of ₹25,000 to ₹50,000/year for Degree, Engineering, Medical and PG studies',
      'Additional monthly day-scholar or hosteller allowance credited via DBT',
      '100% tuition and examination fee assistance'
    ],
    eligibilitySummary: [
      'Open to Transgender students holding a Transgender Certificate / Identity Card issued under the Transgender Persons Act',
      'Enrolled in recognized schools, colleges, ITIs, polytechnics, or universities',
      'Annual parental or personal income should not exceed ₹2.5 Lakh per annum',
      'Applicable across all states and union territories in India'
    ],
    applicationSteps: [
      'Step 1: Obtain your Transgender Certificate/Card online from transgender.dosje.gov.in if not already possessed',
      'Step 2: Register on National Scholarship Portal (scholarships.gov.in) with your Aadhaar and certificate',
      'Step 3: Select Ministry of Social Justice & Empowerment -> SMILE Transgender Scholarship Scheme',
      'Step 4: Upload your Bonafide Student Certificate and Marksheet',
      'Step 5: Submit application for institute-level e-verification'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '1800-11-2001 (National Social Justice Helpline)'
  },
  {
    id: 'kerala-samannwaya-transgender-scholarship',
    name: 'Samannwaya Transgender Continuing Education & Skill Scholarship Scheme',
    provider: 'Social Justice Department, Government of Kerala',
    providerType: 'Government (State)',
    awardAmount: '₹18,000 to ₹45,000 / year + Study Kit Allowance',
    awardAmountNumeric: 30000,
    maxAnnualIncome: null, // No strict income ceiling
    minPercentage: 0,
    educationLevels: ['higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'btech_engineering', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Kerala', 'ALL'],
    genderEligibility: 'transgender',
    startDate: '15 June 2026',
    endDate: '15 November 2026',
    deadline: '15 November 2026',
    applicationMode: 'Kerala State Social Justice Department Portal',
    officialPortalName: 'SJD Kerala (sjd.kerala.gov.in)',
    officialLink: 'http://sjd.kerala.gov.in',
    overview: 'A pioneering state scholarship scheme by Govt of Kerala to encourage transgender students to pursue technical, vocational, higher secondary, graduation, and professional degree courses without financial barriers.',
    benefits: [
      'Monthly financial assistance of ₹1,500 to ₹3,500 directly transferred to bank account',
      'One-time annual course kit and textbook allowance',
      'Subsidized hostel accommodation support in government facilities'
    ],
    eligibilitySummary: [
      'Must be a transgender student residing or studying in Kerala / India',
      'Possess a Transgender Identity Card from District Social Justice Office or National Portal',
      'Enrolled in any approved degree, diploma, ITI, plus two, or PG program'
    ],
    applicationSteps: [
      'Step 1: Visit sjd.kerala.gov.in and navigate to Transgender Welfare Schemes',
      'Step 2: Fill online application for Continuing Education / Degree Scholarship',
      'Step 3: Attach Transgender ID card and college bonafide certificate',
      'Step 4: Verification conducted by District Social Justice Officer (DSJO)'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.marksheet
    ],
    helplineNumber: '0471-2306040 (Kerala Social Justice Directorate)'
  },
  {
    id: 'pmrf-doctoral-fellowship',
    name: 'Prime Minister’s Research Fellowship (PMRF Scheme)',
    provider: 'Ministry of Education (Govt. of India) / National Coordinating Institute (IITs/IISc)',
    providerType: 'Government (Central)',
    awardAmount: '₹70,000 - ₹80,000 / month + ₹2 Lakh/yr Research Grant',
    awardAmountNumeric: 960000,
    maxAnnualIncome: null,
    minPercentage: 75,
    minCgpa: 8.0,
    educationLevels: ['phd_research'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    allowedInstitutionTypes: ['iit_nit_iisc_central', 'state_govt_univ'],
    requiredPhdExams: ['ugc_net_jrf', 'csir_net_jrf', 'gate', 'institutional_exam'],
    startDate: '10 July 2026',
    endDate: '30 October 2026',
    deadline: '30 October 2026',
    applicationMode: 'Direct PMRF National Portal (pmrf.in)',
    officialPortalName: 'PMRF National Portal (pmrf.in)',
    officialLink: 'https://pmrf.in',
    overview: 'India’s highest prestigious doctoral fellowship designed to attract the country’s best research minds into frontier Science, Engineering, and Deep Tech Ph.D. programs at premier institutions (IISc, IITs, IISERs, Central Universities).',
    benefits: [
      '₹70,000/month for Year 1 & 2; ₹75,000/month for Year 3; ₹80,000/month for Year 4 & 5',
      'Annual Research Contingency Grant of ₹2,00,000 (total ₹10 Lakhs over 5 years) for international conferences and lab equipment',
      'Direct faculty mentorship and national research visibility'
    ],
    eligibilitySummary: [
      'Enrolled or selected in Ph.D. program at a PMRF-granting institute (IITs, IISc, IISERs, NITs, Central Univs)',
      'Minimum CGPA of 8.0 on a 10-point scale (or 75%+ in B.Tech / M.Sc / M.Tech)',
      'GATE score of 650+ OR qualified UGC/CSIR-NET JRF rank under top 100',
      'Strong research proposal evaluated by the National Apex Committee'
    ],
    applicationSteps: [
      'Step 1: Get nominated by your PMRF Granting Host Institute via Direct Entry or Lateral Entry',
      'Step 2: Log in to pmrf.in using your institute institutional email ID',
      'Step 3: Upload your research proposal, abstract, B.Tech/M.Tech transcript, and GATE/NET scorecard',
      'Step 4: National Discipline Expert Committee review and interview'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt
    ],
    helplineNumber: '044-22578051 (PMRF National Office)'
  },
  {
    id: 'csir-ugc-jrf-fellowship',
    name: 'CSIR-UGC Junior Research Fellowship (JRF) & National Fellowship',
    provider: 'Council of Scientific & Industrial Research (CSIR) & UGC, Ministry of Education',
    providerType: 'Government (Central)',
    awardAmount: '₹37,000 to ₹42,000 / month + 24% HRA + Contingency',
    awardAmountNumeric: 444000,
    maxAnnualIncome: null,
    minPercentage: 55,
    minCgpa: 6.0,
    educationLevels: ['phd_research', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    requiredPhdExams: ['ugc_net_jrf', 'csir_net_jrf'],
    startDate: '1 August 2026',
    endDate: '15 December 2026',
    deadline: '15 December 2026',
    applicationMode: 'National Testing Agency (NTA) & UGC Scholarship Portal',
    officialPortalName: 'UGC Scholarship Portal / CSIR HRDG',
    officialLink: 'https://csirhrdg.res.in',
    overview: 'National flagship research fellowship for Ph.D. scholars pursuing full-time research in Sciences, Engineering, Humanities, and Social Sciences in any UGC/AICTE recognized Indian University.',
    benefits: [
      'Monthly fellowship of ₹37,000/month (JRF for first 2 years) promoted to ₹42,000/month (SRF for subsequent 3 years)',
      'House Rent Allowance (HRA up to 24%) as per central govt norms if campus hostel not allotted',
      'Annual contingency grant of ₹20,000 to ₹25,000 for consumables and books'
    ],
    eligibilitySummary: [
      'Must have qualified UGC-NET JRF or Joint CSIR-UGC NET examination',
      'Master’s degree with at least 55% marks (50% for SC/ST/OBC-NCL/PwD candidates) from a UGC-recognized university',
      'Enrolled as a full-time Ph.D. research scholar in an Indian university/institute within 2 years of qualifying NET',
      'Age limit: 30 years for General (relaxed up to 5 years for SC/ST/PwD/Women/OBC-NCL)'
    ],
    applicationSteps: [
      'Step 1: Qualify the CSIR-UGC NET or UGC NET JRF exam conducted by NTA',
      'Step 2: Secure Ph.D. admission in any recognized Indian University or CSIR/ICMR national laboratory',
      'Step 3: Submit Joining Report (Annexure-II) through your University Registrar to UGC/CSIR HRDG',
      'Step 4: Monthly fellowship disbursed directly to student bank account via DBT Canara Bank portal'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-25841582 (CSIR HRDG)'
  },
  {
    id: 'dst-inspire-she',
    name: 'INSPIRE Scholarship for Higher Education (SHE)',
    schemeCode: 'DST-INSPIRE-SHE-2024',
    ministryOrDepartment: 'Department of Science and Technology (DST), Ministry of Science & Technology',
    provider: 'Department of Science & Technology (Govt. of India)',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'DST Technical Advisory Committee & State Education Boards',
    digilockerVerified: true,
    awardAmount: '₹80,000 / year (₹60,000 cash + ₹20,000 mentorship)',
    awardAmountNumeric: 80000,
    maxAnnualIncome: null, // Purely merit based on 1% board cutoff
    minPercentage: 85,
    minCgpa: 8.5,
    educationLevels: ['undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '15 September 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'DST INSPIRE Portal (online-inspire.gov.in)',
    officialLink: 'https://online-inspire.gov.in',
    guidelinesUrl: 'https://online-inspire.gov.in/Guideline/SHE_guidelines.pdf',
    overview: 'Flagship government research scholarship for students pursuing Natural & Basic Sciences (Physics, Chemistry, Maths, Biology, Statistics, Geology) in B.Sc, B.S., and Integrated M.Sc programs.',
    benefits: [
      '₹60,000 per year (₹5,000/month) transferred directly to student bank account via DBT',
      '₹20,000 summer research project mentorship grant to work at premier national research labs (IISc, TIFR, CSIR, IITs)',
      'Total benefit of ₹4,00,000 across 5-year integrated science education'
    ],
    eligibilitySummary: [
      'Ranked within the top 1% of their respective Class 12th Board examinations (CBSE, CISCE, or State Boards)',
      'Enrolled in full-time regular B.Sc, B.S., or Int. M.Sc courses in Natural and Basic Sciences',
      'Or qualified JEE Advanced / NEET within top 10,000 ranks choosing pure science degrees',
      'Or KVPY / NTSE / National Olympiad medalist'
    ],
    applicationSteps: [
      'Step 1: Register on online-inspire.gov.in with Class 12 board roll number and Aadhaar',
      'Step 2: Upload 10th & 12th marksheets, Advisory note/eligibility note from State/Central Board',
      'Step 3: Upload College Bonafide and Enrollment Certificate with Principal signature',
      'Step 4: Endorsement by University Registrar and DBT verification'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '0120-4676260 / inspire.prog-dst@nic.in'
  },
  {
    id: 'aicte-saksham-pwd',
    name: 'AICTE Saksham Scholarship Scheme for Specially-Abled (PwD) Students',
    schemeCode: 'AICTE-SAKSHAM-TECH-2024',
    ministryOrDepartment: 'All India Council for Technical Education (AICTE), Ministry of Education',
    provider: 'All India Council for Technical Education (AICTE)',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Institute Nodal Officer (INO) & AICTE Student Development Cell',
    digilockerVerified: true,
    awardAmount: '₹50,000 / year (Lump-sum Grant)',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 800000,
    minPercentage: 40,
    educationLevels: ['btech_engineering', 'diploma_iti', 'undergraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    speciallyAbledOnly: true,
    startDate: '01 August 2026',
    endDate: '15 November 2026',
    deadline: '15 November 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://www.aicte-india.org/schemes/students-development-schemes/Saksham',
    overview: 'Special national incentive to support differently-abled students with not less than 40% disability to pursue technical degree (B.Tech/BE) and diploma programs in AICTE-approved institutions.',
    benefits: [
      '₹50,000 per annum paid directly to student bank account every year until graduation',
      'Can be used for tuition fees, purchase of assistive software/devices, books, laptop, and hostel fees',
      'Every eligible specially-abled applicant meeting the criteria receives the scholarship'
    ],
    eligibilitySummary: [
      'Specially-abled student having not less than 40% benchmark disability (UDID card / medical certificate)',
      'Admitted to 1st year Degree/Diploma course (or 2nd year lateral entry) in an AICTE approved college',
      'Family income from all sources must not exceed ₹8,00,000 per annum'
    ],
    applicationSteps: [
      'Step 1: Visit scholarships.gov.in and complete One Time Registration (OTR)',
      'Step 2: Choose AICTE -> Saksham Scholarship Scheme',
      'Step 3: Upload UDID card / Disability certificate, Parents income certificate, and 10th/12th marksheet',
      'Step 4: Institute head verifies admission and disability documentation online'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.disability_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-29581333 / saksham@aicte-india.org'
  },
  {
    id: 'mysy-gujarat-scheme',
    name: 'Mukhyamantri Yuva Swavalamban Yojana (MYSY - Gujarat)',
    schemeCode: 'GUJ-EDN-MYSY-01',
    ministryOrDepartment: 'Education Department, Government of Gujarat',
    provider: 'Knowledge Consortium of Gujarat (KCG) / Education Department (Govt. of Gujarat)',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'KCG Help Centre Nodal Officer & College Principal Verification Desk',
    digilockerVerified: true,
    awardAmount: 'Up to ₹2,00,000 / year (50% Tuition Fee + ₹12,000 Hostel + ₹10,000 Books)',
    awardAmountNumeric: 200000,
    maxAnnualIncome: 600000, // ₹6.0 Lakhs
    minPercentage: 80, // 80 percentile or above in 10th/12th
    minCgpa: 7.5,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'diploma_iti', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Gujarat'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'State Scholarship Portal',
    officialPortalName: 'MYSY Portal Gujarat (mysy.guj.nic.in)',
    officialLink: 'https://mysy.guj.nic.in',
    guidelinesUrl: 'https://mysy.guj.nic.in/Notice/MYSY_Resolution.pdf',
    overview: 'The landmark Gujarat government flagship scheme to assist meritorious students from all communities admitted to Medical, Dental, Engineering, Pharmacy, Diploma, and Higher Education degree programs.',
    benefits: [
      '50% tuition fee reimbursement up to ₹2,00,000/year for MBBS/BDS degrees',
      'Up to ₹50,000/year for B.Tech/B.E., Pharmacy, and Architecture degrees',
      'Up to ₹25,000/year for Government/SFI Diploma courses; ₹10,000/year for BA/B.Sc/B.Com',
      'Monthly lodging and boarding allowance of ₹1,200/month (₹12,000/year) for non-local hostel students',
      'One-time book and equipment grant: ₹10,000 for Medical and ₹5,000 for Engineering',
      '100% direct bank transfer via Aadhaar payment bridge (DBT)'
    ],
    eligibilitySummary: [
      'Must be a permanent resident / domicile of Gujarat State',
      'Secured 80 percentile or above in Class 12th Board (for Degree/Engineering/MBBS) or Class 10th (for Diploma)',
      'Total annual family income from all sources must not exceed ₹6,00,000 (₹6 Lakhs)',
      'Admitted through ACPC / ACPDC / State Centralized Admission Quota in recognized Gujarat institutions'
    ],
    applicationSteps: [
      'Step 1: Visit mysy.guj.nic.in and click "Student Registration / Login"',
      'Step 2: Enter GSEB/CBSE Board 10th/12th Roll Number, Passing Year, and Aadhaar Details',
      'Step 3: Fill college admission details, ACPC admission letter number, and bank account',
      'Step 4: Upload Income Certificate, Bonafide Certificate, and Fee Receipts',
      'Step 5: Verify original documents at designated Help Centre (KCG) across Gujarat'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.domicile_certificate
    ],
    helplineNumber: '079-26566000 / mysy-edn@gujarat.gov.in'
  },
  {
    id: 'digital-gujarat-scholarship',
    name: 'Digital Gujarat Post-Matric Scholarship Scheme (SC/ST/SEBC/EBC)',
    schemeCode: 'GUJ-SJE-PMS-01',
    ministryOrDepartment: 'Social Justice & Empowerment Department, Govt. of Gujarat',
    provider: 'Directorate of Developing Castes Welfare, Govt. of Gujarat',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'District Social Welfare Office & College Scrutiny Officer',
    digilockerVerified: true,
    awardAmount: '100% Tuition Fee Reimbursement + Monthly Maintenance Allowance',
    awardAmountNumeric: 65000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 45,
    educationLevels: ['undergraduate', 'btech_engineering', 'medical_health', 'diploma_iti', 'postgraduate'],
    categories: ['sc', 'st', 'obc', 'ews'],
    states: ['Gujarat'],
    genderEligibility: 'all',
    startDate: '15 September 2026',
    endDate: '15 December 2026',
    deadline: '15 December 2026',
    applicationMode: 'State Scholarship Portal',
    officialPortalName: 'Digital Gujarat Portal (digitalgujarat.gov.in)',
    officialLink: 'https://www.digitalgujarat.gov.in',
    guidelinesUrl: 'https://www.digitalgujarat.gov.in/DownLoad/UserManual/CitizenUserManual_Scholarship.pdf',
    overview: 'Comprehensive state welfare scheme for students belonging to SC, ST, SEBC, and EBC categories in Gujarat covering total academic tuition and hostel allowances.',
    benefits: [
      '100% tuition and laboratory fees reimbursed according to government norms',
      'Monthly student maintenance allowance up to ₹1,200/month',
      'Book bank grant and thesis assistance for higher post-graduate courses'
    ],
    eligibilitySummary: [
      'Domicile of Gujarat belonging to SC, ST, SEBC, or EBC categories',
      'Annual parental income up to ₹2,50,000 for SC/ST and ₹2,50,000 for SEBC/EBC',
      'Studying at post-matriculation level in recognized Gujarat institute'
    ],
    applicationSteps: [
      'Step 1: Register on digitalgujarat.gov.in using Aadhaar and mobile number',
      'Step 2: Choose Post-Matric Scholarship service under Student Corner',
      'Step 3: Upload Caste certificate, Income certificate, Fee receipt, and Bank passbook',
      'Step 4: Submit application online and verify with College Scholarship Coordinator'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '1800-233-5500 (Digital Gujarat Toll-Free)'
  },
  {
    id: 'svmcm-west-bengal',
    name: 'Swami Vivekananda Merit-cum-Means Scholarship (SVMCM - West Bengal)',
    schemeCode: 'WB-HED-SVMCM-01',
    ministryOrDepartment: 'Higher Education Department, Government of West Bengal',
    provider: 'Higher Education, Science & Technology Dept., Govt. of West Bengal',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Directorate of Public Instruction (DPI West Bengal) & Bikash Bhavan Cell',
    digilockerVerified: true,
    awardAmount: '₹12,000 to ₹60,000 / year (Based on course level)',
    awardAmountNumeric: 60000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 60,
    minCgpa: 6.5,
    educationLevels: ['undergraduate', 'btech_engineering', 'medical_health', 'postgraduate', 'diploma_iti', 'higher_secondary_11_12', 'school_9_10'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['West Bengal'],
    genderEligibility: 'all',
    startDate: '10 September 2026',
    endDate: '31 January 2027',
    deadline: '31 January 2027',
    applicationMode: 'State Scholarship Portal',
    officialPortalName: 'SVMCM Bikash Bhavan Portal (svmcm.wbhed.gov.in)',
    officialLink: 'https://svmcm.wbhed.gov.in',
    guidelinesUrl: 'https://svmcm.wbhed.gov.in/page/instructions.php',
    overview: 'West Bengal’s flagship financial scholarship supporting meritorious and economically disadvantaged students pursuing higher secondary, undergraduate, engineering, medical, and postgraduate studies.',
    benefits: [
      'Engineering & Medical students: ₹60,000 per year (₹5,000/month)',
      'Postgraduate general degree students: ₹24,000 to ₹30,000 per year',
      'Undergraduate Arts/Commerce/Science: ₹12,000 to ₹18,000 per year',
      'Direct DBT credit into Aadhaar-seeded savings account'
    ],
    eligibilitySummary: [
      'Domicile of West Bengal studying in WB recognized educational institutions',
      'Minimum 60% marks in Madhyamik/Higher Secondary or 53% in Graduation for PG level',
      'Family annual income must not exceed ₹2,50,000',
      'Not receiving any other state government scholarship for same course'
    ],
    applicationSteps: [
      'Step 1: Register on svmcm.wbhed.gov.in with Madhyamik roll number and passing year',
      'Step 2: Fill course, admission details, and bank account IFSC',
      'Step 3: Upload Marksheet, Income certificate issued by competent authority (BDO/SDO), and Domicile proof',
      'Step 4: Institute nodal head validates application online to forward to Bikash Bhavan'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.domicile_certificate
    ],
    helplineNumber: '1800-102-8014 / helpdesk.svmcm-wb@gov.in'
  },
  {
    id: 'jagananna-vidya-deevena-ap',
    name: 'Jagananna Vidya Deevena & Vasathi Deevena Scheme (Andhra Pradesh)',
    schemeCode: 'AP-GSWS-JVD-01',
    ministryOrDepartment: 'Higher Education & Social Welfare Dept., Govt. of Andhra Pradesh',
    provider: 'Government of Andhra Pradesh (A.P. JnanaBhumi Portal)',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Gram/Ward Sachivalayam (GSWS) & Welfare Education Assistant',
    digilockerVerified: true,
    awardAmount: '100% Full College Tuition Fee + ₹20,000/yr Hostel Vasathi Allowance',
    awardAmountNumeric: 85000,
    maxAnnualIncome: 250000,
    minPercentage: 50,
    educationLevels: ['undergraduate', 'btech_engineering', 'medical_health', 'postgraduate', 'diploma_iti'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Andhra Pradesh'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '30 November 2026',
    deadline: '30 November 2026',
    applicationMode: 'State Scholarship Portal',
    officialPortalName: 'JnanaBhumi Portal (jnanabhumi.ap.gov.in)',
    officialLink: 'https://jnanabhumi.ap.gov.in',
    guidelinesUrl: 'https://jnanabhumi.ap.gov.in/Guidlines.edu',
    overview: 'Comprehensive Andhra Pradesh welfare initiative crediting 100% full fee reimbursement directly into mothers bank accounts alongside yearly accommodation grant.',
    benefits: [
      'Complete tuition fee reimbursement (Vidya Deevena) released in quarterly installments',
      'Vasathi Deevena assistance: ₹20,000/year for Degree/Engineering, ₹15,000 for Polytechnic, ₹10,000 for ITI',
      'Direct DBT credit to mother’s Aadhaar-linked savings account'
    ],
    eligibilitySummary: [
      'Student enrolled in recognized Polytechnic, ITI, Degree, Engineering, or Medicine in Andhra Pradesh',
      'Total family annual income under ₹2,50,000',
      'Total land holding less than 10 acres wetland or 25 acres dry land',
      'Minimum 75% college attendance maintained'
    ],
    applicationSteps: [
      'Step 1: College submits admission details on JnanaBhumi portal',
      'Step 2: Biometric authentication by student and mother at Village/Ward Secretariats (Gram Sachivalayam)',
      'Step 3: Verification of land holding, income, and four-wheeler criteria through GSWS database',
      'Step 4: Electronic sanction order and direct payment disbursement'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '1902 (AP Spandana Citizen Helpline)'
  },
  {
    id: 'telangana-epass-scholarship',
    name: 'Telangana ePASS Post-Matric Tuition Fee Reimbursement (RTF) & MTF',
    schemeCode: 'TS-SCDD-EPASS-01',
    ministryOrDepartment: 'Scheduled Castes, BC & Minority Welfare Dept., Govt. of Telangana',
    provider: 'Government of Telangana (Electronic Payment & Application System)',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'District Welfare Officer & Telangana ePASS Verification Cell',
    digilockerVerified: true,
    awardAmount: 'Up to ₹1,00,000 / year (Full RTF Tuition + ₹14,000 MTF Mess Allowance)',
    awardAmountNumeric: 70000,
    maxAnnualIncome: 200000, // ₹2.0 Lakhs (₹2.5L for SC/ST)
    minPercentage: 50,
    educationLevels: ['undergraduate', 'btech_engineering', 'medical_health', 'postgraduate', 'diploma_iti'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Telangana'],
    genderEligibility: 'all',
    startDate: '01 September 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'State Scholarship Portal',
    officialPortalName: 'Telangana ePASS Portal (telanganaepass.cgg.gov.in)',
    officialLink: 'https://telanganaepass.cgg.gov.in',
    guidelinesUrl: 'https://telanganaepass.cgg.gov.in/FAQ.html',
    overview: 'Flagship financial aid program by Government of Telangana reimbursing full college tuition fees (RTF) and providing Maintenance Charges (MTF) to economically disadvantaged students.',
    benefits: [
      'Full Reimbursement of Tuition Fee (RTF) approved by the State Fee Regulatory Committee',
      'Maintenance Fee (MTF) credited monthly for hostel and day-scholar expenses (₹1,400/month)',
      'Aadhaar-linked DBT transfer directly to institute (for RTF) and student (for MTF)'
    ],
    eligibilitySummary: [
      'Domicile of Telangana State admitted under convener quota (DOST, TS EAMCET, ICET, ECET)',
      'Family annual income under ₹2,00,000 (urban) / ₹1,50,000 (rural) for BC/EBC and ₹2,50,000 for SC/ST',
      'Minimum 75% attendance at the end of each quarter'
    ],
    applicationSteps: [
      'Step 1: Visit telanganaepass.cgg.gov.in and click "Postmatric Scholarships Service"',
      'Step 2: Enter SSC Hall ticket number, year of pass, and Aadhaar number',
      'Step 3: Enter allotment order details, CET rank, and caste/income certificate numbers',
      'Step 4: Submit hard copy with original receipts to college principal within deadline'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '040-23390228 / 040-23120311'
  },
  {
    id: 'loreal-women-in-science',
    name: 'L\'Oréal India For Young Women in Science Scholarship',
    schemeCode: 'LOREAL-CSR-WOMEN-SCI-2024',
    ministryOrDepartment: 'L\'Oréal India Foundation (CSR Education Division)',
    provider: 'L\'Oréal India Private Limited',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'L\'Oréal Foundation Jury & CSR Selection Board',
    digilockerVerified: false,
    awardAmount: '₹2,50,000 (Across Graduation Degree)',
    awardAmountNumeric: 250000,
    maxAnnualIncome: 600000, // ₹6.0 Lakhs
    minPercentage: 85,
    minCgpa: 8.0,
    educationLevels: ['undergraduate', 'btech_engineering', 'medical_health'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'female',
    startDate: '01 September 2026',
    endDate: '15 January 2027',
    deadline: '15 January 2027',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'L\'Oréal India For Young Women in Science (loreal.com)',
    officialLink: 'https://www.loreal.com/en/india/articles/commitments/for-young-women-in-science/',
    guidelinesUrl: 'https://www.loreal.com/en/india/articles/commitments/for-young-women-in-science/',
    overview: 'Special national initiative by L\'Oréal India granting ₹2.5 Lakhs financial assistance to young women with outstanding academic record pursuing undergraduate science degrees (Engineering, Medical, Pure Sciences, Biotechnology).',
    benefits: [
      '₹2,50,000 total grant disbursed in annual installments for tuition fees and academic expenses',
      'Executive mentorship and networking with leading Indian female scientists and corporate leaders',
      'Prestigious national recognition and alumni fellowship'
    ],
    eligibilitySummary: [
      'Female students only, passed Class 12 board examination in Science stream with minimum 85% in PCB/PCM',
      'Admitted in the current academic year to recognized graduation program in Science/Engineering/Medical',
      'Annual family income must not exceed ₹6,00,000',
      'Age not more than 19 years at the time of application'
    ],
    applicationSteps: [
      'Step 1: Register on L\'Oréal India CSR portal and fill personal & academic profile',
      'Step 2: Upload Class 10 & 12 marksheets, admission letter, and parents income certificate',
      'Step 3: Submit 2 essays explaining science career goals and financial necessity',
      'Step 4: Shortlisted candidates attend virtual interview with L\'Oréal scientific jury'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-43092248 / fywis-india@buddy4study.com'
  },
  {
    id: 'ishan-uday-ner-ugc',
    name: 'Ishan Uday Special Scholarship Scheme for North Eastern Region (NER)',
    schemeCode: 'NSP-UGC-ISHAN-UDAY-NER',
    ministryOrDepartment: 'University Grants Commission (UGC), Ministry of Education',
    provider: 'University Grants Commission (UGC)',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'College Nodal Officer & State Higher Education Council',
    digilockerVerified: true,
    awardAmount: '₹5,400 to ₹7,800 / month (₹64,800 to ₹93,600 / year)',
    awardAmountNumeric: 93600,
    maxAnnualIncome: 450000, // ₹4.5 Lakhs
    minPercentage: 60,
    educationLevels: ['undergraduate', 'btech_engineering', 'medical_health', 'diploma_iti'],
    categories: ['general', 'obc', 'sc', 'st', 'ews'],
    states: ['Assam', 'Arunachal Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '30 November 2026',
    deadline: '30 November 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://www.ugc.gov.in/pdfnews/3205779_Ishan-Uday-Guidelines.pdf',
    overview: 'Flagship central scholarship scheme for students having domicile of the 8 North Eastern States (Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura) pursuing general degree, professional degree, or technical education in any recognized Indian college or university.',
    benefits: [
      '₹5,400 per month for general degree courses (B.A., B.Sc., B.Com)',
      '₹7,800 per month for technical, engineering, medical, and paramedical courses',
      'Direct Benefit Transfer (DBT) via PFMS to student’s Aadhaar-seeded bank account',
      'Disbursed for full duration of the undergraduate program'
    ],
    eligibilitySummary: [
      'Must have permanent domicile of any North Eastern State (Assam, AP, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura)',
      'Passed Class 12 or equivalent board examination with minimum 60% marks',
      'Admitted in 1st year of general degree or technical/professional course in a UGC-recognized institution',
      'Gross annual family income from all sources must not exceed ₹4,50,000'
    ],
    applicationSteps: [
      'Step 1: Register on National Scholarship Portal (scholarships.gov.in) using Aadhaar and mobile OTP',
      'Step 2: Choose UGC Schemes -> "Ishan Uday Special Scholarship for NER"',
      'Step 3: Upload domicile certificate, class 12 marksheet, and revenue income certificate',
      'Step 4: College Nodal Officer (INO) and State Nodal Officer (SNO) verify application online on NSP'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '0120-6619540 (NSP Helpdesk) / 011-23604446 (UGC)'
  },
  {
    id: 'pmss-ex-servicemen-capf',
    name: 'Prime Minister’s Scholarship Scheme (PMSS) for Wards of Ex-Servicemen & CAPF/AR',
    schemeCode: 'WARB-MHA-PMSS-2024',
    ministryOrDepartment: 'Welfare and Rehabilitation Board (WARB), Ministry of Home Affairs & Kendriya Sainik Board (MoD)',
    provider: 'Kendriya Sainik Board (KSB) & Ministry of Home Affairs',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Zila Sainik Board (ZSB) / Rajya Sainik Board (RSB) & WARB Nodal Officer',
    digilockerVerified: true,
    awardAmount: '₹30,000 to ₹36,000 / year (₹2,500/mo boys, ₹3,000/mo girls)',
    awardAmountNumeric: 36000,
    maxAnnualIncome: null, // Priority based on category of ex-servicemen/martyrs, no income bar
    minPercentage: 60,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '30 November 2026',
    deadline: '30 November 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'Kendriya Sainik Board (ksb.gov.in) & NSP',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://ksb.gov.in/writereaddata/DownLoad/PMSS_Guidelines.pdf',
    overview: 'Prime Minister’s dedicated national scholarship scheme encouraging technical and professional education (B.Tech, MBBS, BDS, B.Pharm, MBA, MCA) for dependent wards and widows of deceased/ex-service personnel of Armed Forces and Central Armed Police Forces (CRPF, BSF, CISF, ITBP, SSB, Assam Rifles).',
    benefits: [
      '₹3,000 per month (₹36,000 per year) for girl students',
      '₹2,500 per month (₹30,000 per year) for boy students',
      'Paid annually for the complete regular duration of the professional course (4 to 5.5 years)',
      '100% DBT direct transfer into candidate’s bank account via PFMS'
    ],
    eligibilitySummary: [
      'Dependent wards and widows of Ex-Servicemen / Ex-Coast Guard / CAPF / Assam Rifles personnel',
      'Pursuing first professional degree course (B.Tech, MBBS, BDS, B.V.Sc, B.Pharm, B.Sc Nursing, MBA, MCA) recognized by statutory regulatory bodies (AICTE, NMC, DCI, PCI, UGC)',
      'Minimum 60% marks in Class 12 / Diploma / Graduation qualifying exam',
      'Open to all students across all states in India'
    ],
    applicationSteps: [
      'Step 1: Register on National Scholarship Portal (NSP) or KSB portal (ksb.gov.in)',
      'Step 2: Upload Ex-Serviceman Certificate (Annexure-1 signed by Zila Sainik Welfare Officer)',
      'Step 3: Upload Bonafide certificate from college principal, 12th marksheet, and discharge book copy',
      'Step 4: Verification completed by Zila Sainik Board followed by Central WARB team'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      {
        id: 'doc_esm_cert',
        name: 'Ex-Serviceman / CAPF Dependent Certificate (Annexure-1)',
        iconName: 'user-check',
        description: 'Issued by Zila Sainik Board (ZSB) / Rajya Sainik Board or Head of Office for CAPF.',
        isMandatory: true,
        tip: 'Ensure discharge book PPO number matches the certificate details.'
      }
    ],
    helplineNumber: '011-26715250 (WARB MHA) / 011-26192361 (KSB Helpdesk)'
  },
  {
    id: 'top-class-education-sc',
    name: 'Top Class Education Scheme for SC Students',
    schemeCode: 'NSP-MOSJE-TOP-CLASS-SC',
    ministryOrDepartment: 'Ministry of Social Justice and Empowerment (Govt. of India)',
    provider: 'Ministry of Social Justice and Empowerment (MoSJE)',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Institute Nodal Officer of Notified Premier Institution & MoSJE',
    digilockerVerified: true,
    awardAmount: 'Full Tuition Fee + ₹86,000 / year (Living + Computer + Books)',
    awardAmountNumeric: 300000,
    maxAnnualIncome: 800000, // ₹8 Lakhs
    minPercentage: 50,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'postgraduate'],
    categories: ['sc'],
    states: ['ALL'],
    genderEligibility: 'all',
    allowedInstitutionTypes: ['iit_nit_iisc_central', 'state_govt_univ'],
    startDate: '15 July 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://socialjustice.gov.in/writereaddata/UploadFile/Scheme%20Guidelines%20Top%20Class%20SC.pdf',
    overview: 'Prestige Central Sector scholarship covering 100% full non-refundable tuition fees plus living allowances for meritorious Scheduled Caste (SC) students securing admission into premier notified institutions of national repute (all IITs, NITs, IIMs, AIIMS, NLUs, IIITs, and Central Universities).',
    benefits: [
      'Full non-refundable tuition fee and academic fees paid directly to the premier institution (up to ₹2.0 Lakhs in private or full in IIT/NIT/AIIMS)',
      'Living expenses allowance of ₹3,000 per month (₹36,000 per year)',
      'Books and stationery allowance of ₹5,000 per year',
      'One-time computer/laptop grant of ₹45,000 in the first year of study'
    ],
    eligibilitySummary: [
      'Belong to Scheduled Caste (SC) community with valid caste certificate',
      'Secured admission into one of the notified institutions of national repute (IITs, NITs, IIMs, AIIMS, NLUs, Central Universities)',
      'Total annual family income from all sources not exceeding ₹8,00,000 per annum',
      'Scholarship terminates if student fails to clear the academic year'
    ],
    applicationSteps: [
      'Step 1: Open NSP portal (scholarships.gov.in) and register using Aadhaar card',
      'Step 2: Under Ministry of Social Justice & Empowerment, choose "Top Class Education Scheme for SC Students"',
      'Step 3: Select your notified institution (IIT / NIT / AIIMS / Central Univ) from the dropdown',
      'Step 4: Upload SC certificate, parents income certificate, admission fee receipt, and bank passbook',
      'Step 5: Institution INO verifies admission and fee structure directly on portal'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.marksheet
    ],
    helplineNumber: '0120-6619540 (NSP) / helpdesk-nsp@gov.in'
  },
  {
    id: 'moma-post-matric-minority',
    name: 'Post-Matric Scholarship Scheme for Minorities (MoMA)',
    schemeCode: 'NSP-MOMA-POST-MATRIC-MIN',
    ministryOrDepartment: 'Ministry of Minority Affairs (Govt. of India)',
    provider: 'Ministry of Minority Affairs',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Institute Nodal Officer (INO) & State Minority Welfare Officer',
    digilockerVerified: true,
    awardAmount: '₹10,000 to ₹20,000 / year + Admission/Tuition Reimbursement',
    awardAmountNumeric: 20000,
    maxAnnualIncome: 200000, // ₹2.0 Lakhs
    minPercentage: 50,
    educationLevels: ['higher_secondary_11_12', 'undergraduate', 'postgraduate', 'btech_engineering', 'medical_health', 'phd_research', 'diploma_iti'],
    categories: ['minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'National Scholarship Portal (NSP)',
    officialPortalName: 'National Scholarship Portal (scholarships.gov.in)',
    officialLink: 'https://scholarships.gov.in',
    guidelinesUrl: 'https://www.minorityaffairs.gov.in/schemes-performance-reports/scholarship-schemes',
    overview: 'Flagship Central Sector initiative providing financial assistance to meritorious students belonging to notified national minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, and Parsis) for pursuing Class 11, 12, ITI, Polytechnic, Graduation, Post-Graduation, and Ph.D.',
    benefits: [
      'Admission & Tuition fee reimbursement for Class 11, 12, UG, PG, and technical diploma',
      'Maintenance allowance of ₹380 to ₹570 per month for hostellers and day scholars',
      'Direct Benefit Transfer (DBT) directly into student’s Aadhaar-linked savings account',
      '30% of total scholarships earmarked exclusively for female minority students'
    ],
    eligibilitySummary: [
      'Must belong to one of the 6 notified national minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)',
      'Studying in Class 11th, 12th, Graduate, Post Graduate, Diploma, or Research in recognized institution',
      'Minimum 50% marks or equivalent grade in the previous final examination',
      'Annual family income from all sources must not exceed ₹2,00,000'
    ],
    applicationSteps: [
      'Step 1: Register on National Scholarship Portal (scholarships.gov.in)',
      'Step 2: Choose Ministry of Minority Affairs -> "Post-Matric Scholarship Schemes Minorities"',
      'Step 3: Upload self-declaration minority community certificate, income certificate, and marksheet',
      'Step 4: School/College Nodal Officer approves through NSP verification login'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      {
        id: 'doc_minority_cert',
        name: 'Minority Community Self-Declaration Certificate',
        iconName: 'user-check',
        description: 'Self-declaration affidavit confirming student belongs to Muslim, Christian, Sikh, Buddhist, Jain, or Parsi community.',
        isMandatory: true,
        tip: 'Standard format available for direct download on NSP portal.'
      }
    ],
    helplineNumber: '0120-6619540 (NSP) / 1800-11-2001 (MoMA Toll Free)'
  },
  {
    id: 'national-overseas-scholarship-sc',
    name: 'National Overseas Scholarship (NOS) for SC, Nomadic & Landless Labourers',
    schemeCode: 'MOSJE-NOS-OVERSEAS-SCHEME',
    ministryOrDepartment: 'Ministry of Social Justice and Empowerment (Govt. of India)',
    provider: 'Ministry of Social Justice and Empowerment',
    providerType: 'Government (Central)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'NOS Selection Board & Indian Missions / Embassies Abroad',
    digilockerVerified: true,
    awardAmount: 'Full Foreign Tuition + $15,400 USD / £9,900 GBP Annual Living Allowance',
    awardAmountNumeric: 3000000,
    maxAnnualIncome: 800000, // ₹8 Lakhs
    minPercentage: 60,
    educationLevels: ['postgraduate', 'phd_research'],
    categories: ['sc'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '15 February 2026',
    endDate: '30 April 2026',
    deadline: '30 April 2026',
    applicationMode: 'NOS Online Portal (nosmsje.gov.in)',
    officialPortalName: 'NOS MoSJE Portal (nosmsje.gov.in)',
    officialLink: 'https://nosmsje.gov.in',
    guidelinesUrl: 'https://nosmsje.gov.in/guidelines.aspx',
    overview: 'India’s most prestigious overseas scholarship funding 125 meritorious scholars from Scheduled Castes, De-notified Nomadic & Semi-Nomadic Tribes, and Landless Agricultural Labourers families to pursue Master’s degree or Ph.D. in top 500 QS-ranked world universities abroad (USA, UK, Canada, Germany, Australia, etc.).',
    benefits: [
      'Full foreign university tuition fees paid directly to the overseas university',
      'Annual maintenance living allowance of $15,400 USD (USA & other countries) or £9,900 GBP (United Kingdom)',
      'Contingency allowance ($1,500 / £1,100), visa fees, medical insurance, and economy class air travel',
      'Covers up to 3 years for Master’s degrees and 4 years for Ph.D. programs'
    ],
    eligibilitySummary: [
      'Belong to Scheduled Caste (SC), De-notified Nomadic Tribe (DNT), or Traditional Artisans / Landless Labourers',
      'Unconditional admission offer letter from a foreign university ranked in the top 500 QS World University Rankings',
      'Scored at least 60% marks or equivalent GPA in Bachelor’s (for Masters) or Master’s (for Ph.D.)',
      'Total annual family income must not exceed ₹8,00,000 per annum',
      'Age not more than 35 years as of first day of the application year'
    ],
    applicationSteps: [
      'Step 1: Secure unconditional offer letter from top-500 QS ranked university abroad',
      'Step 2: Register on official portal (nosmsje.gov.in) with Aadhaar and academic credentials',
      'Step 3: Upload caste certificate, ITR / income certificate, valid passport, GRE/IELTS/TOEFL scorecards',
      'Step 4: Shortlisted candidates interviewed by National Selection Committee'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      {
        id: 'doc_passport_offer',
        name: 'Valid Indian Passport & Foreign University Offer Letter',
        iconName: 'book-open',
        description: 'Unconditional admission letter from top 500 QS ranked university along with valid passport copy.',
        isMandatory: true,
        tip: 'Offer letter must state course duration, start date, and non-refundable tuition fees.'
      }
    ],
    helplineNumber: '011-23386054 / nos-msje@gov.in'
  },
  {
    id: 'delhi-edistrict-higher-education',
    name: 'Delhi Higher Education Merit-cum-Means Financial Assistance Scheme',
    schemeCode: 'DELHI-DHE-MCM-2024',
    ministryOrDepartment: 'Directorate of Higher Education, Govt. of NCT of Delhi',
    provider: 'Government of NCT of Delhi',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Delhi University / IPU / DTU / NSUT Nodal Officer & SDM e-District',
    digilockerVerified: true,
    awardAmount: '100% or 50% Tuition Fee Reimbursement (up to ₹1,50,000 / year)',
    awardAmountNumeric: 150000,
    maxAnnualIncome: 600000, // ₹6.0 Lakhs
    minPercentage: 60,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'postgraduate', 'diploma_iti'],
    categories: ['general', 'obc', 'sc', 'st', 'ews'],
    states: ['Delhi'],
    genderEligibility: 'all',
    startDate: '01 October 2026',
    endDate: '15 January 2027',
    deadline: '15 January 2027',
    applicationMode: 'Delhi e-District Portal (edistrict.delhigovt.nic.in)',
    officialPortalName: 'Delhi e-District Portal (edistrict.delhigovt.nic.in)',
    officialLink: 'https://edistrict.delhigovt.nic.in',
    guidelinesUrl: 'https://edistrict.delhigovt.nic.in/in/en/Public/Services.html',
    overview: 'Flagship fee reimbursement policy by the Government of NCT of Delhi ensuring no talented student is denied higher education due to financial constraints in Delhi state universities (DTU, NSUT, GGSIPU, DSEU, IIIT-Delhi, Ambedkar University Delhi, IGDTUW).',
    benefits: [
      '100% tuition fee waiver for students from National Food Security (NFSA) ration card holder families',
      '100% tuition fee waiver for students with family income up to ₹2.50 Lakhs per annum',
      '50% tuition fee waiver for students with family income between ₹2.50 Lakhs and ₹6.00 Lakhs per annum',
      'Additional 5% relaxation in marks for SC/ST students'
    ],
    eligibilitySummary: [
      'Must be enrolled in an undergraduate or postgraduate program in any Delhi State University (DTU, NSUT, IPU, DSEU, AUD, IIITD, IGDTUW)',
      'Scored at least 60% marks in Class 12 or previous academic year (55% for SC/ST students)',
      'Gross annual family income must be under ₹6,00,000 (verified via Delhi Revenue SDM certificate or NFSA card)',
      'Candidate must not be availing any other fee reimbursement from Central or State Govt.'
    ],
    applicationSteps: [
      'Step 1: Register on Delhi e-District portal (edistrict.delhigovt.nic.in) using Delhi domicile / Aadhaar',
      'Step 2: Choose Department of Higher Education -> "Merit-cum-Means Financial Assistance Scheme"',
      'Step 3: Enter University Enrollment number, semester marks, and fee payment receipt',
      'Step 4: University Dean/Principal verifies application; fee credited via DBT to bank account'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-23935200 / edistrictvls.delhi@gov.in'
  },
  {
    id: 'odisha-medhabruti-scholarship',
    name: 'Odisha e-Medhabruti / State Higher Education Scholarship Scheme',
    schemeCode: 'ODISHA-HED-MEDHABRUTI-01',
    ministryOrDepartment: 'Higher Education Department, Government of Odisha',
    provider: 'Government of Odisha',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Principal of College & Odisha State Scholarship Portal (OSSP)',
    digilockerVerified: true,
    awardAmount: '₹10,000 to ₹50,000 / year (Technical & Professional Courses)',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 600000, // ₹6.0 Lakhs
    minPercentage: 60,
    educationLevels: ['undergraduate', 'postgraduate', 'btech_engineering', 'medical_health'],
    categories: ['general', 'obc', 'sc', 'st', 'ews'],
    states: ['Odisha'],
    genderEligibility: 'all',
    startDate: '01 September 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'Odisha State Scholarship Portal (scholarship.odisha.gov.in)',
    officialPortalName: 'Odisha State Scholarship Portal (scholarship.odisha.gov.in)',
    officialLink: 'https://scholarship.odisha.gov.in',
    guidelinesUrl: 'https://scholarship.odisha.gov.in/website/scholarship-details',
    overview: 'Merit-based scholarship scheme instituted by the Higher Education Department, Govt. of Odisha, to encourage meritorious students of Odisha pursuing General Degree (+3), Post-Graduation, and Technical / Professional courses (B.Tech, MBBS, BDS, MBA, MCA, Agriculture).',
    benefits: [
      '₹10,000 per annum for +3 Undergraduate general degree courses',
      '₹20,000 per annum for Post-Graduate degree courses',
      'Up to ₹50,000 per annum for professional courses (B.Tech, MBBS, BDS, B.Pharm, Architecture)',
      '100% DBT direct disbursement directly to student bank accounts via Odisha Treasury'
    ],
    eligibilitySummary: [
      'Must be a permanent resident / domicile of Odisha state',
      'Enrolled in regular full-time undergraduate, postgraduate, or professional course in recognized institute',
      'Minimum 60% marks in previous qualifying board or degree examination',
      'Gross annual family income from all sources must not exceed ₹6,00,000 per annum'
    ],
    applicationSteps: [
      'Step 1: Open Odisha State Scholarship Portal (scholarship.odisha.gov.in)',
      'Step 2: Register using Aadhaar number and OTP verification',
      'Step 3: Select Higher Education Department -> "e-Medhabruti Scholarship"',
      'Step 4: Enter college admission details, qualifying marks, and bank account info'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '155335 / 1800-345-6770 (Odisha Sanjog Toll Free)'
  },
  {
    id: 'tamil-nadu-post-matric-scheme',
    name: 'Tamil Nadu Post-Matric Scholarship & Free Education Scheme',
    schemeCode: 'TN-BCMBC-POST-MATRIC-01',
    ministryOrDepartment: 'BC, MBC & Minorities Welfare Department, Govt. of Tamil Nadu',
    provider: 'Government of Tamil Nadu',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'District Backward Classes & Minorities Welfare Officer (DBCMWO)',
    digilockerVerified: true,
    awardAmount: '100% Tuition Fee Waiver + Maintenance Allowance',
    awardAmountNumeric: 75000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 50,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate', 'postgraduate', 'diploma_iti'],
    categories: ['sc', 'st', 'obc', 'minority'],
    states: ['Tamil Nadu'],
    genderEligibility: 'all',
    startDate: '01 July 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'Tamil Nadu e-Scholarship Portal',
    officialPortalName: 'Tamil Nadu e-Scholarship Portal (escholarship.tn.gov.in)',
    officialLink: 'https://escholarship.tn.gov.in',
    guidelinesUrl: 'https://bcmbcmw.tn.gov.in/welfschemes.htm',
    overview: 'Comprehensive tuition fee exemption and maintenance allowance scheme by the Government of Tamil Nadu for BC, MBC, DNC, SC, and ST students enrolled in government and self-financing engineering, medical, arts, science, and polytechnic colleges under government quota (TNEA / Single Window System).',
    benefits: [
      'Full non-refundable tuition fees reimbursed to college under government quota admission',
      'Special Free Education Scheme for 1st-generation graduate students in family (Pattinathar scheme)',
      'Monthly maintenance allowance for hostellers and day-scholars',
      'Direct DBT credit into Aadhaar-seeded bank account'
    ],
    eligibilitySummary: [
      'Permanent domicile of Tamil Nadu belonging to BC, MBC, DNC, SC, or ST community',
      'Admitted under government single-window counseling quota (e.g., TNEA, TN Medical, TN Poly)',
      'Family annual income must not exceed ₹2,50,000 (relaxed for specific 1st generation learners)',
      'Student must maintain minimum 75% attendance in semester classes'
    ],
    applicationSteps: [
      'Step 1: Apply through your college scholarship office / online portal (escholarship.tn.gov.in)',
      'Step 2: Submit Tamil Nadu Community certificate, Income certificate, and TNEA allotment order',
      'Step 3: College nodal officer approves and forwards to District Welfare Officer',
      'Step 4: Funds disbursed via Electronic Clearing Service (ECS) directly to college & student account'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.marksheet
    ],
    helplineNumber: '044-28591580 / 044-28594248 (Tamil Nadu BC/MBC Dept)'
  },
  {
    id: 'haryana-har-chhatravratti',
    name: 'Haryana Har-Chhatravratti Consolidated Post-Matric Scholarship',
    schemeCode: 'HAR-DHE-POSTMATRIC-01',
    ministryOrDepartment: 'Department of Higher Education, Government of Haryana',
    provider: 'Government of Haryana',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Parivar Pehchan Patra (PPP) Verification & College Nodal Officer',
    digilockerVerified: true,
    awardAmount: 'Full College Tuition Reimbursement + Maintenance Allowance',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs (auto-verified via PPP)
    minPercentage: 50,
    educationLevels: ['undergraduate', 'postgraduate', 'btech_engineering', 'diploma_iti'],
    categories: ['sc', 'obc', 'general', 'ews'],
    states: ['Haryana'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'Har-Chhatravratti Portal (harchhatravratti.highereduhry.ac.in)',
    officialPortalName: 'Har-Chhatravratti Portal (harchhatravratti.highereduhry.ac.in)',
    officialLink: 'https://harchhatravratti.highereduhry.ac.in',
    guidelinesUrl: 'https://harchhatravratti.highereduhry.ac.in/Guideline.aspx',
    overview: 'Haryana’s unified centralized scholarship portal seamlessly integrating 14 scholarship schemes under Higher Education, Technical Education, and Skill Development. Automatically verifies domicile, income, and caste using Haryana Parivar Pehchan Patra (PPP) Family ID.',
    benefits: [
      '100% tuition and examination fee reimbursement for government & private college students',
      'Monthly maintenance allowance for hostellers (₹1,200/mo) and day-scholars (₹550/mo)',
      'Consolidated single-window application: one form applies to all eligible state welfare schemes',
      'Fast-track DBT payment directly into Aadhaar-seeded bank account'
    ],
    eligibilitySummary: [
      'Must possess a valid Haryana Parivar Pehchan Patra (Family ID / PPP)',
      'Permanent domicile resident of Haryana state',
      'Family income verified on PPP database must be less than ₹2,50,000 per annum',
      'Enrolled in recognized undergraduate, postgraduate, B.Tech, or polytechnic course'
    ],
    applicationSteps: [
      'Step 1: Visit Har-Chhatravratti Portal and enter your 8-digit Family ID (PPP)',
      'Step 2: System automatically pulls your family income, name, and bank details',
      'Step 3: Select your college / course and upload current semester fee receipt',
      'Step 4: College verification followed by direct DBT release'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bank_passbook,
      {
        id: 'doc_ppp_haryana',
        name: 'Haryana Parivar Pehchan Patra (PPP Family ID)',
        iconName: 'home',
        description: '8-digit Haryana Parivar Pehchan Patra with verified family annual income.',
        isMandatory: true,
        tip: 'Ensure your mobile number is active on PPP for OTP authentication.'
      }
    ],
    helplineNumber: '0172-2565530 / helpdeskscholarshiphry@gmail.com'
  },
  {
    id: 'punjab-ambedkar-post-matric',
    name: 'Dr. B.R. Ambedkar Post-Matric Scholarship Scheme (Punjab)',
    schemeCode: 'PB-SJE-AMBEDKAR-SCHOLARSHIP',
    ministryOrDepartment: 'Department of Social Justice, Empowerment & Minorities, Govt. of Punjab',
    provider: 'Government of Punjab',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Institute Nodal Officer & Tehsil Social Welfare Officer (Punjab)',
    digilockerVerified: true,
    awardAmount: 'Full Tuition & Examination Fee Exemption + Monthly Stipend',
    awardAmountNumeric: 60000,
    maxAnnualIncome: 250000, // ₹2.5 Lakhs
    minPercentage: 50,
    educationLevels: ['undergraduate', 'postgraduate', 'btech_engineering', 'diploma_iti', 'medical_health'],
    categories: ['sc', 'obc'],
    states: ['Punjab'],
    genderEligibility: 'all',
    startDate: '15 July 2026',
    endDate: '15 November 2026',
    deadline: '15 November 2026',
    applicationMode: 'Punjab Scholarship Portal (scholarships.punjab.gov.in)',
    officialPortalName: 'Punjab State Scholarship Portal (scholarships.punjab.gov.in)',
    officialLink: 'https://scholarships.punjab.gov.in',
    guidelinesUrl: 'https://scholarships.punjab.gov.in/public/guidelines.pdf',
    overview: 'State-flagship scholarship scheme offering complete fee relief (zero upfront fee deposit) to Scheduled Caste and Other Backward Class students of Punjab pursuing post-matric studies in higher education, engineering, polytechnic, medical, and paramedical institutions.',
    benefits: [
      'Complete tuition and examination fee exemption — colleges cannot demand advance fees from eligible students',
      'Monthly maintenance allowance credited directly to student bank account',
      'Covers both government and affiliated private institutions in Punjab',
      'Free Space card scheme providing immediate financial guarantee'
    ],
    eligibilitySummary: [
      'Must be a domicile of Punjab state belonging to SC or BC category',
      'Enrolled in post-matric recognized educational course',
      'Annual family income from all sources must not exceed ₹2,50,000',
      'Valid Punjab residence certificate and caste certificate issued by Tehsildar'
    ],
    applicationSteps: [
      'Step 1: Register online on scholarships.punjab.gov.in using Aadhaar number',
      'Step 2: Fill admission details and generate Freeship Card',
      'Step 3: Submit Freeship Card to college at the time of admission for zero-fee entry',
      'Step 4: Institutional scrutiny and direct DBT transfer'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '1800-180-2440 (Punjab Toll Free Helpline)'
  },
  {
    id: 'kerala-egrantz-post-matric',
    name: 'Kerala E-Grantz 3.0 Post-Matric Educational Assistance',
    schemeCode: 'KERALA-BCDD-EGRANTZ-3',
    ministryOrDepartment: 'SC/ST Development & Backward Classes Welfare Dept, Govt. of Kerala',
    provider: 'Government of Kerala',
    providerType: 'Government (State)',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Block / District SC Development Officer & Collegiate Education Dept',
    digilockerVerified: true,
    awardAmount: 'Full Tuition Fee Reimbursement + Monthly Stipend / Pocket Money',
    awardAmountNumeric: 45000,
    maxAnnualIncome: 250000, // Income ceiling exempt for SC/ST, ₹2.5L for OBC/OEC
    minPercentage: 45,
    educationLevels: ['undergraduate', 'postgraduate', 'btech_engineering', 'medical_health', 'diploma_iti'],
    categories: ['sc', 'st', 'obc'],
    states: ['Kerala'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'Kerala E-Grantz Portal (egrantz.kerala.gov.in)',
    officialPortalName: 'Kerala E-Grantz 3.0 Portal (egrantz.kerala.gov.in)',
    officialLink: 'https://egrantz.kerala.gov.in',
    guidelinesUrl: 'https://egrantz.kerala.gov.in/Home/Guidelines',
    overview: 'Kerala Government’s state-of-the-art educational assistance program disbursed through E-Grantz 3.0 web portal. Covers all tuition, examination, and special fees for SC, ST, OEC, and OBC students in arts, science, engineering, polytechnic, and medical streams across Kerala.',
    benefits: [
      '100% full course fee and exam fees reimbursed without deduction',
      'Monthly pocket money / stipend and study tour allowances for hostellers',
      'No income limit whatsoever for Scheduled Caste (SC) and Scheduled Tribe (ST) students',
      'Direct credit via Kerala State Treasury Single Custody to student savings accounts'
    ],
    eligibilitySummary: [
      'Permanent resident / domicile of Kerala state',
      'Belonging to SC, ST, OEC (Other Eligible Communities), or OBC category',
      'No income limit for SC/ST; annual family income up to ₹2,50,000 for OBC / General EWS',
      'Admitted to higher secondary, diploma, degree, PG, or professional course in Kerala'
    ],
    applicationSteps: [
      'Step 1: Open E-Grantz 3.0 portal (egrantz.kerala.gov.in) and register with Aadhaar OTP',
      'Step 2: Enter admission number, institution code, and caste certificate number (e-District Kerala)',
      'Step 3: College nodal officer approves attendance and course fees online',
      'Step 4: Automated sanction and fund transfer directly to student’s bank account'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.caste_certificate,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook,
      COMMON_DOCUMENTS.marksheet
    ],
    helplineNumber: '0471-2737252 / egrantzkerala@gmail.com'
  },
  {
    id: 'infosys-foundation-stem-stars',
    name: 'Infosys Foundation STEM Stars Scholarship for Female Students',
    schemeCode: 'INFOSYS-CSR-STEM-STARS-2024',
    ministryOrDepartment: 'Infosys Foundation (Corporate Social Responsibility)',
    provider: 'Infosys Foundation',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Infosys Foundation Selection Jury & Academic Audit Team',
    digilockerVerified: false,
    awardAmount: 'Up to ₹1,00,000 / year (Covers Tuition, Living & Books)',
    awardAmountNumeric: 100000,
    maxAnnualIncome: 800000, // ₹8.0 Lakhs
    minPercentage: 75,
    minCgpa: 7.0,
    educationLevels: ['btech_engineering', 'medical_health', 'undergraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'female',
    startDate: '15 July 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Infosys Foundation STEM Stars Portal',
    officialLink: 'https://www.infosys.com/infosys-foundation/initiatives/education/stem-stars.html',
    guidelinesUrl: 'https://www.infosys.com/infosys-foundation/initiatives/education/stem-stars.html',
    overview: 'High-impact corporate scholarship instituted by Infosys Foundation exclusively for female students enrolled in 1st year of STEM (Science, Technology, Engineering, Mathematics) courses in top NIRF-accredited institutions across India.',
    benefits: [
      'Up to ₹1,00,000 per annum covering tuition fees, hostel expenses, and study materials',
      'Renewable every year for the entire regular course duration (4 years for B.Tech)',
      'Leadership mentorship sessions and career enablement workshops with Infosys tech leaders',
      '100% direct scholarship transfer to student’s bank account with zero fee deductions'
    ],
    eligibilitySummary: [
      'Exclusively for female students who are Indian citizens',
      'Enrolled in the 1st year of graduation in STEM fields (Engineering, Computer Science, IT, Mathematics, Physics, Chemistry)',
      'Must have scored minimum 75% marks in Class 12 board examination or equivalent CGPA',
      'Annual family income from all sources must not exceed ₹8,00,000 per annum'
    ],
    applicationSteps: [
      'Step 1: Visit Infosys Foundation STEM Stars official application portal',
      'Step 2: Enter academic details, 12th marksheet, and NIRF rank / college bonafide certificate',
      'Step 3: Upload parent income documents and a short personal statement on career aspirations',
      'Step 4: Shortlisted candidates undergo online interview with Infosys Foundation education panel'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '080-28520261 / foundation@infosys.com'
  },
  {
    id: 'aditya-birla-capital-scholarship',
    name: 'Aditya Birla Capital Scholarship Programme',
    schemeCode: 'ABC-FOUNDATION-SCHOLARSHIP-2024',
    ministryOrDepartment: 'Aditya Birla Capital Foundation (CSR Education Division)',
    provider: 'Aditya Birla Capital Foundation',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Aditya Birla CSR Advisory Panel & Verification Board',
    digilockerVerified: false,
    awardAmount: '₹30,000 to ₹60,000 / year',
    awardAmountNumeric: 60000,
    maxAnnualIncome: 600000, // ₹6.0 Lakhs
    minPercentage: 60,
    educationLevels: ['school_9_10', 'higher_secondary_11_12', 'undergraduate', 'btech_engineering'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '15 November 2026',
    deadline: '15 November 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Aditya Birla Capital CSR Portal',
    officialLink: 'https://adityabirlacapital.com',
    guidelinesUrl: 'https://adityabirlacapital.com',
    overview: 'Corporate Social Responsibility initiative by Aditya Birla Capital Foundation supporting meritorious students from economically distressed families across India to continue secondary, senior secondary, and professional undergraduate education without financial interruption.',
    benefits: [
      '₹60,000 per year for undergraduate engineering, medical, and professional degree students',
      '₹30,000 per year for general graduation degree students (B.A., B.Sc., B.Com)',
      '₹18,000 per year for Class 9th to 12th school students',
      'Direct disbursement straight to the student or parent bank account'
    ],
    eligibilitySummary: [
      'Open to students studying in Class 9 to 12 or pursuing general / professional undergraduate courses',
      'Scored at least 60% marks in the previous academic year examination',
      'Annual family income from all sources must not exceed ₹6,00,000',
      'Open to all Indian students across all states and social categories'
    ],
    applicationSteps: [
      'Step 1: Register on the Aditya Birla Capital scholarship portal',
      'Step 2: Complete the online application form and upload previous year marksheet',
      'Step 3: Upload government revenue income certificate and bonafide admission letter',
      'Step 4: Telephonic verification and scholarship grant release'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-43092248 / abc.scholarship@buddy4study.com'
  },
  {
    id: 'santoor-womens-scholarship',
    name: 'Santoor Women’s Scholarship (Wipro Consumer Care & Wipro Cares)',
    schemeCode: 'WIPRO-SANTOOR-GIRLS-2024',
    ministryOrDepartment: 'Wipro Consumer Care and Azim Premji Foundation',
    provider: 'Wipro Consumer Care & Wipro Cares',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Wipro Cares Education Panel & Azim Premji Philanthropic Initiatives',
    digilockerVerified: false,
    awardAmount: '₹24,000 / year (for full duration of graduation degree)',
    awardAmountNumeric: 24000,
    maxAnnualIncome: 400000, // ₹4.0 Lakhs
    minPercentage: 60,
    educationLevels: ['undergraduate', 'btech_engineering'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Andhra Pradesh', 'Karnataka', 'Telangana', 'Chhattisgarh'],
    genderEligibility: 'female',
    startDate: '01 August 2026',
    endDate: '31 October 2026',
    deadline: '31 October 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Santoor Scholarship Portal (santoorscholarship.com)',
    officialLink: 'https://www.santoorscholarship.com',
    guidelinesUrl: 'https://www.santoorscholarship.com',
    overview: 'Flagship social responsibility initiative by Wipro Consumer Care and Azim Premji Foundation empowering underprivileged young women from Andhra Pradesh, Karnataka, Telangana, and Chhattisgarh to complete their 3-year or 4-year higher education graduation degrees.',
    benefits: [
      '₹24,000 per annum paid every year until graduation completion',
      'Can be utilized for college fees, hostel accommodation, textbooks, or examination costs',
      'Over 900 young women selected every single academic year',
      'Preference given to girls from rural and backward aspirational districts'
    ],
    eligibilitySummary: [
      'Exclusively for female students from Andhra Pradesh, Karnataka, Telangana, or Chhattisgarh',
      'Passed Class 10 from a local government school and Class 12 from a government school or junior college',
      'Enrolled in a recognized 3-year or 4-year undergraduate degree in the current academic year',
      'Family annual income must be under ₹4,00,000 from all sources'
    ],
    applicationSteps: [
      'Step 1: Download application form or apply online on santoorscholarship.com',
      'Step 2: Submit Class 10 & 12 government school certificates and current college admission fee receipt',
      'Step 3: Attach bank account passbook copy and income certificate',
      'Step 4: Final award list announced and scholarship disbursed directly via NEFT/DBT'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '0120-6844200 / santoor.scholarship@wipro.com'
  },
  {
    id: 'sitaram-jindal-foundation-scholarship',
    name: 'Sitaram Jindal Foundation Scholarship Scheme',
    schemeCode: 'SJF-FOUNDATION-MERIT-GRANT',
    ministryOrDepartment: 'Sitaram Jindal Foundation (Philanthropic Trust)',
    provider: 'Sitaram Jindal Foundation',
    providerType: 'Philanthropic Trust',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Sitaram Jindal Foundation Trust Scrutiny Committee',
    digilockerVerified: false,
    awardAmount: '₹500 to ₹3,200 / month (Up to ₹38,400 / yr for Engg & Medical)',
    awardAmountNumeric: 38400,
    maxAnnualIncome: 400000, // ₹4.0 Lakhs for general, ₹2.5L for employed parents
    minPercentage: 60, // 65% for boys, 60% for girls
    educationLevels: ['higher_secondary_11_12', 'diploma_iti', 'undergraduate', 'btech_engineering', 'medical_health', 'postgraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 July 2026',
    endDate: '31 December 2026',
    deadline: '31 December 2026',
    applicationMode: 'Offline / Online Foundation Portal',
    officialPortalName: 'Sitaram Jindal Foundation (sitaramjindalfoundation.org)',
    officialLink: 'https://www.sitaramjindalfoundation.org',
    guidelinesUrl: 'https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php',
    overview: 'Pioneering philanthropic educational trust scholarship supporting deserving students across India from economically challenged backgrounds pursuing Class 11th, 12th, ITI, Polytechnic Diploma, General Graduation (BA, B.Sc, B.Com), B.Tech, MBBS, and Post-Graduation.',
    benefits: [
      'Category A (Class 11 & 12): ₹500/month for boys, ₹700/month for girls',
      'Category B (ITI / Diploma): ₹1,000/month for boys, ₹1,200/month for girls',
      'Category C (Graduation BA/BSc/BCom): ₹1,400/month for boys, ₹1,600/month for girls',
      'Category D (Engineering & Medical): ₹2,500 to ₹3,200 per month (₹30,000 to ₹38,400/year)'
    ],
    eligibilitySummary: [
      'Regular full-time students enrolled in recognized schools, colleges, or polytechnic institutes in India',
      'Minimum qualifying marks: 65% for boys and 60% for girls in previous exam (70% boys / 65% girls for B.Tech)',
      'Gross family annual income must not exceed ₹4,00,000 per annum (or ₹2,50,000 for salaried parents)',
      'Can be availed alongside government non-fee scholarships'
    ],
    applicationSteps: [
      'Step 1: Download official Annexure application form from sitaramjindalfoundation.org',
      'Step 2: Get form endorsed and signed by College Principal / Head of Institution',
      'Step 3: Attach marksheets, income certificate, and hostel certificate (if applicable)',
      'Step 4: Send by registered post to Sitaram Jindal Foundation Bangalore office or apply online'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '080-23717777 / 080-23717778 / scholarship@sitaramjindalfoundation.org'
  },
  {
    id: 'colgate-keep-india-smiling-dental',
    name: 'Colgate Keep India Smiling Foundational Scholarship for BDS / Dental Studies',
    schemeCode: 'COLGATE-CSR-BDS-SCHOLARSHIP',
    ministryOrDepartment: 'Colgate-Palmolive (India) Limited (CSR Health & Education Initiative)',
    provider: 'Colgate-Palmolive (India) Limited',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Colgate CSR Jury & Dental Council Certified Institute Review Panel',
    digilockerVerified: false,
    awardAmount: '₹75,000 / year (for 4 years BDS Course)',
    awardAmountNumeric: 75000,
    maxAnnualIncome: 500000, // ₹5.0 Lakhs
    minPercentage: 60,
    educationLevels: ['medical_health'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'all',
    startDate: '01 August 2026',
    endDate: '31 January 2027',
    deadline: '31 January 2027',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Colgate Keep India Smiling Portal',
    officialLink: 'https://www.colgate.com/en-in',
    guidelinesUrl: 'https://www.colgate.com/en-in',
    overview: 'Specialized corporate healthcare scholarship by Colgate-Palmolive India aiding students from modest backgrounds who have cracked NEET and enrolled in Bachelor of Dental Surgery (BDS) degree courses in recognized dental colleges.',
    benefits: [
      '₹75,000 per year financial assistance for all 4 academic years of BDS study (Total ₹3,00,000)',
      'Assists with tuition fees, clinical dental kit expenses, and medical books',
      'Direct disbursement to candidate’s verified bank account',
      'No application fees or processing charges at any stage'
    ],
    eligibilitySummary: [
      'Admitted in 1st year of Bachelor of Dental Surgery (BDS) in a Dental Council of India (DCI) recognized college',
      'Scored at least 60% marks in Class 12 board examination (PCB / Physics, Chemistry, Biology)',
      'Qualified NEET examination in the current admission cycle',
      'Total annual family income must be under ₹5,00,000 per annum'
    ],
    applicationSteps: [
      'Step 1: Apply online on Colgate Keep India Smiling Foundation scholarship portal',
      'Step 2: Upload Class 12 marksheet, NEET scorecard, and Dental College admission receipt',
      'Step 3: Attach family income certificate and cancelled cheque / passbook copy',
      'Step 4: Screening and telephonic interview before grant sanction'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-43092248 / keepindiasmiling@buddy4study.com'
  },
  {
    id: 'rolls-royce-unnati-girls',
    name: 'Rolls-Royce "Unnati" Scholarship for Women Engineering Students',
    schemeCode: 'ROLLS-ROYCE-CSR-UNNATI-2024',
    ministryOrDepartment: 'Rolls-Royce India Private Limited (CSR STEM Division)',
    provider: 'Rolls-Royce India',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Rolls-Royce CSR Education Advisory Board & Technical Mentorship Panel',
    digilockerVerified: false,
    awardAmount: '₹35,000 one-time financial grant + Industry Mentorship',
    awardAmountNumeric: 35000,
    maxAnnualIncome: 400000, // ₹4.0 Lakhs
    minPercentage: 60,
    educationLevels: ['btech_engineering'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'female',
    startDate: '01 September 2026',
    endDate: '15 December 2026',
    deadline: '15 December 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'Rolls-Royce Unnati CSR Portal',
    officialLink: 'https://www.rolls-royce.com',
    guidelinesUrl: 'https://www.rolls-royce.com',
    overview: 'Flagship diversity in engineering scholarship by Rolls-Royce India empowering meritorious female engineering students studying Aerospace, Marine, Electronics, Mechanical, and Computer Science engineering programs across India.',
    benefits: [
      '₹35,000 financial support towards college tuition fees and engineering project equipment',
      'One-on-one technical mentorship from senior engineering professionals at Rolls-Royce',
      'Webinars on industrial design, aviation engineering, and aerospace technology trends',
      'Certificate of excellence from Rolls-Royce India'
    ],
    eligibilitySummary: [
      'Open to female students studying in 1st, 2nd, or 3rd year of B.Tech / B.E. in AICTE-approved colleges',
      'Eligible engineering disciplines: Aerospace, Marine, Mechanical, Electrical, Electronics, and Computer Science',
      'Scored minimum 60% marks in Class 10, Class 12, and current engineering semesters',
      'Annual family income from all sources must not exceed ₹4,00,000'
    ],
    applicationSteps: [
      'Step 1: Complete online registration on the Rolls-Royce Unnati application portal',
      'Step 2: Upload Class 10 & 12 marksheets, semester grade cards, and college ID card',
      'Step 3: Upload parent income certificate and student bank details',
      'Step 4: Video / telephonic assessment followed by scholarship sanction'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '011-43092248 / rollsroyce.unnati@buddy4study.com'
  },
  {
    id: 'dlf-raghvendra-scholarship',
    name: 'DLF Raghvendra Scholarship for Professional Higher Education (B.Tech & MBBS)',
    schemeCode: 'DLF-CSR-RAGHVENDRA-2024',
    ministryOrDepartment: 'DLF Foundation (CSR Higher Education Division)',
    provider: 'DLF Foundation',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'DLF Foundation Academic Jury & Verification Cell',
    digilockerVerified: false,
    awardAmount: 'Up to ₹40,000 to ₹50,000 / year (Covers Full Tuition & Books)',
    awardAmountNumeric: 50000,
    maxAnnualIncome: 500000, // ₹5.0 Lakhs
    minPercentage: 70,
    educationLevels: ['btech_engineering', 'medical_health'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Haryana', 'Delhi', 'Uttar Pradesh', 'Rajasthan', 'ALL'],
    genderEligibility: 'all',
    startDate: '15 July 2026',
    endDate: '30 October 2026',
    deadline: '30 October 2026',
    applicationMode: 'Direct CSR / Foundation Portal',
    officialPortalName: 'DLF Foundation Scholarship Portal (dlffoundation.in)',
    officialLink: 'https://dlffoundation.in',
    guidelinesUrl: 'https://dlffoundation.in/education.html',
    overview: 'Prestigious corporate CSR talent initiative by DLF Foundation supporting academically gifted students from low-income families enrolled in 1st year of professional undergraduate courses in Engineering (B.Tech) and Medicine (MBBS).',
    benefits: [
      'Up to ₹50,000 per annum paid directly towards college tuition fees and essential books',
      'Renewable every academic year based on maintaining 65% aggregate score',
      'Dedicated soft skills coaching, executive mentoring, and placement counseling',
      '100% free application with direct bank transfer'
    ],
    eligibilitySummary: [
      'Admitted in 1st year of regular full-time B.Tech/B.E. or MBBS in a government or recognized institution in India',
      'Minimum 70% marks in Class 12 board examination with Physics, Chemistry, and Mathematics/Biology',
      'Total annual family income must not exceed ₹5,00,000 from all sources',
      'Priority given to students from Haryana, Delhi NCR, UP, and Rajasthan'
    ],
    applicationSteps: [
      'Step 1: Register on the DLF Foundation higher education portal (dlffoundation.in)',
      'Step 2: Fill details of JEE / NEET entrance rank and admission seat allotment',
      'Step 3: Upload revenue income certificate, fee receipts, and marksheets',
      'Step 4: DLF Foundation committee interviews shortlisted applicants'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '0124-4767000 / info@dlffoundation.in'
  },
  {
    id: 'google-generation-scholarship-apac',
    name: 'Google Generation Scholarship (APAC) for Women in Computer Science',
    schemeCode: 'GOOGLE-APAC-GEN-SCHOLARS-2024',
    ministryOrDepartment: 'Google LLC (Global Diversity, Equity & Inclusion Division)',
    provider: 'Google',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Google University Programs & International Selection Committee',
    digilockerVerified: false,
    awardAmount: '$2,500 USD (Approx. ₹2,08,000 INR)',
    awardAmountNumeric: 208000,
    maxAnnualIncome: null, // Merit and diversity evaluated; no rigid income cutoff
    minPercentage: 70,
    minCgpa: 7.0,
    educationLevels: ['btech_engineering', 'undergraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['ALL'],
    genderEligibility: 'female',
    startDate: '01 March 2026',
    endDate: '31 May 2026',
    deadline: '31 May 2026',
    applicationMode: 'Google Build Your Future Portal',
    officialPortalName: 'Google Build Your Future Scholarships (buildyourfuture.withgoogle.com)',
    officialLink: 'https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac',
    guidelinesUrl: 'https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac',
    overview: 'Globally celebrated scholarship by Google established to help aspiring female students pursuing computer science and technology degrees excel in technology, become leaders in the field, and break systemic barriers in software engineering.',
    benefits: [
      'Cash scholarship grant of $2,500 USD (approx. ₹2,08,000 INR) for tuition, books, and development devices',
      'Invitation to the Google Virtual Scholars Retreat featuring technical workshops and networking',
      'Direct mentorship opportunities with Google software engineers and engineering managers',
      'Global recognition on Google’s Build Your Future platform'
    ],
    eligibilitySummary: [
      'Currently enrolled as a full-time undergraduate student in 1st or 2nd year at an accredited university in India/APAC',
      'Studying Computer Science, Computer Engineering, or closely related technical field',
      'Demonstrate strong academic record, passion for technology, and community leadership',
      'Identify as female (all female students across all categories eligible)'
    ],
    applicationSteps: [
      'Step 1: Visit Google Build Your Future Portal (buildyourfuture.withgoogle.com)',
      'Step 2: Submit resume/CV highlighting technical projects, GitHub repositories, and leadership experience',
      'Step 3: Submit 2 short essay responses on diversity in computer science and technological problem-solving',
      'Step 4: Complete Google online technical evaluation (coding / problem-solving assessment)'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: 'generationgoogle-apac@google.com'
  },
  {
    id: 'fedbank-hormis-memorial-scholarship',
    name: 'Fedbank Hormis Memorial Foundation Scholarship (Federal Bank CSR)',
    schemeCode: 'FEDBANK-CSR-HORMIS-2024',
    ministryOrDepartment: 'Federal Bank Limited (Corporate Social Responsibility Foundation)',
    provider: 'Federal Bank CSR Foundation',
    providerType: 'Corporate CSR',
    dbtDirectTransfer: true,
    nodalVerificationAgency: 'Fedbank Hormis Memorial Foundation Trust & Branch Manager Audit',
    digilockerVerified: false,
    awardAmount: '100% Tuition Fees reimbursed (up to ₹1,00,000 / year)',
    awardAmountNumeric: 100000,
    maxAnnualIncome: 300000, // ₹3.0 Lakhs
    minPercentage: 60,
    educationLevels: ['medical_health', 'btech_engineering', 'undergraduate'],
    categories: ['general', 'obc', 'sc', 'st', 'ews', 'minority'],
    states: ['Kerala', 'Tamil Nadu', 'Gujarat', 'Maharashtra', 'Punjab'],
    genderEligibility: 'all',
    startDate: '15 September 2026',
    endDate: '15 December 2026',
    deadline: '15 December 2026',
    applicationMode: 'Federal Bank Official Portal',
    officialPortalName: 'Federal Bank CSR (federalbank.co.in)',
    officialLink: 'https://www.federalbank.co.in/corporate-social-responsibility',
    guidelinesUrl: 'https://www.federalbank.co.in/corporate-social-responsibility',
    overview: 'Prestigious banking CSR scholarship instituted in memory of Federal Bank founder Shri K.P. Hormis. Reimburses 100% of college tuition fees for meritorious students from low-income families enrolled in MBBS, B.Tech, B.Sc Agriculture, or Nursing courses.',
    benefits: [
      '100% reimbursement of actual tuition and institutional fees (up to ₹1,00,000 per academic year)',
      'Continued funding for the entire duration of the course (up to 4 years for Engineering, 5 years for MBBS)',
      'Special preference given to children of small farmers and self-employed daily wage earners',
      'Disbursed through direct electronic credit with zero processing fees'
    ],
    eligibilitySummary: [
      'Admitted in the 1st year of regular full-time MBBS, Engineering (B.Tech), B.Sc Agriculture, B.Sc Nursing, or MBA in government/aided colleges',
      'Domicile resident of Kerala, Tamil Nadu, Gujarat, Maharashtra, or Punjab',
      'Minimum 60% marks in the qualifying Class 12 or graduation examination',
      'Annual family income must not exceed ₹3,00,000'
    ],
    applicationSteps: [
      'Step 1: Download application form from Federal Bank CSR website or collect from nearest Federal Bank branch',
      'Step 2: Attach Class 10 & 12 passing certificates, seat allotment memo, and fee receipt',
      'Step 3: Attach revenue income certificate and nativity/residence certificate',
      'Step 4: Submit at nearest Federal Bank branch or upload online for verification'
    ],
    documents: [
      COMMON_DOCUMENTS.aadhaar,
      COMMON_DOCUMENTS.domicile_certificate,
      COMMON_DOCUMENTS.marksheet,
      COMMON_DOCUMENTS.income_certificate,
      COMMON_DOCUMENTS.bonafide_fee_receipt,
      COMMON_DOCUMENTS.bank_passbook
    ],
    helplineNumber: '0484-2201401 / csr@federalbank.co.in'
  }
];

