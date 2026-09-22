import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe, 
  ShieldCheck, 
  Building2, 
  Search,
  CheckCircle2
} from 'lucide-react';

interface PortalItem {
  id: string;
  name: string;
  category: 'central' | 'state' | 'csr';
  stateOrEntity: string;
  url: string;
  description: string;
  schemes: string[];
}

const OFFICIAL_PORTALS_LIST: PortalItem[] = [
  // Central Government
  {
    id: 'nsp',
    name: 'National Scholarship Portal (NSP)',
    category: 'central',
    stateOrEntity: 'Government of India (National)',
    url: 'https://scholarships.gov.in',
    description: 'The single unified national portal for all central government ministries including Ministry of Education, Social Justice, Tribal Affairs, and Minority Affairs.',
    schemes: ['Central Sector Scheme (CSSS)', 'Post-Matric SC/ST', 'PM YASASVI', 'NMMSS', 'AICTE Pragati', 'Ishan Uday NER']
  },
  {
    id: 'aicte',
    name: 'AICTE Student Development Schemes Portal',
    category: 'central',
    stateOrEntity: 'All India Council for Technical Education',
    url: 'https://www.aicte-india.org',
    description: 'Technical education scholarships for girl students, differently-abled scholars, and orphans admitted to AICTE approved engineering and diploma colleges.',
    schemes: ['Pragati Scholarship for Girls', 'Saksham Scholarship for PwD', 'Swanath Scholarship']
  },
  {
    id: 'inspire',
    name: 'DST INSPIRE Portal',
    category: 'central',
    stateOrEntity: 'Department of Science & Technology (DST)',
    url: 'https://online-inspire.gov.in',
    description: 'Innovation in Science Pursuit for Inspired Research (INSPIRE) for students pursuing B.Sc, BS, and Integrated M.Sc natural and basic sciences.',
    schemes: ['INSPIRE SHE Scholarship (₹80,000/yr)', 'INSPIRE Fellowship for PhD']
  },
  {
    id: 'pmrf',
    name: 'Prime Minister’s Research Fellowship (PMRF)',
    category: 'central',
    stateOrEntity: 'Ministry of Education (IIT / IISc Network)',
    url: 'https://pmrf.in',
    description: 'India’s most prestigious doctoral fellowship (up to ₹80,000/month + ₹2 Lakh annual contingency grant) for research in science and technology.',
    schemes: ['Direct Entry PhD Fellowship', 'Lateral Entry PhD Fellowship']
  },
  {
    id: 'csir',
    name: 'CSIR HRDG Portal',
    category: 'central',
    stateOrEntity: 'Council of Scientific & Industrial Research',
    url: 'https://csirhrdg.res.in',
    description: 'Official portal for CSIR NET Junior Research Fellowship (JRF) and Senior Research Fellowship (SRF) awards.',
    schemes: ['CSIR JRF NET Fellowship', 'Shyama Prasad Mukherjee Fellowship']
  },
  {
    id: 'drdo',
    name: 'DRDO RAC Recruitment & Scholarship Portal',
    category: 'central',
    stateOrEntity: 'Ministry of Defence (DRDO)',
    url: 'https://rac.gov.in',
    description: 'Direct scholarship scheme for meritorious girl students admitted to 1st year B.Tech and M.Tech in aerospace, aeronautical, computer, and electronics streams.',
    schemes: ['DRDO Scholarship for Girls (₹1.2L to ₹1.86L/yr)']
  },
  {
    id: 'transgender-portal',
    name: 'National Portal for Transgender Persons',
    category: 'central',
    stateOrEntity: 'Ministry of Social Justice & Empowerment',
    url: 'https://transgender.dosje.gov.in',
    description: 'Direct portal to apply for national transgender identity certificates, scholarship assistance, and welfare schemes.',
    schemes: ['National Transgender Education Scholarship']
  },
  {
    id: 'ksb-pmss',
    name: 'Kendriya Sainik Board (KSB & WARB)',
    category: 'central',
    stateOrEntity: 'Ministry of Defence & Ministry of Home Affairs',
    url: 'https://ksb.gov.in',
    description: 'Prime Minister’s Scholarship Scheme (PMSS) for dependent wards of Ex-Servicemen and Central Armed Police Forces (CAPF/AR).',
    schemes: ['Prime Minister’s Scholarship Scheme (PMSS)']
  },
  {
    id: 'nosmsje',
    name: 'National Overseas Scholarship (NOS) Portal',
    category: 'central',
    stateOrEntity: 'Ministry of Social Justice & Empowerment',
    url: 'https://nosmsje.gov.in',
    description: 'Central portal for 100% funded overseas Masters and Ph.D. scholarships in top 500 QS-ranked world universities.',
    schemes: ['National Overseas Scholarship for SC/DNT Scholars']
  },

  // State Government Portals
  {
    id: 'mahadbt',
    name: 'MahaDBT Portal (Maharashtra)',
    category: 'state',
    stateOrEntity: 'Maharashtra State Government',
    url: 'https://mahadbt.maharashtra.gov.in',
    description: 'Direct portal for post-matric fee reimbursement, Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh, and social justice department schemes.',
    schemes: ['EBC Fee Reimbursement', 'Post-Matric SC/ST/OBC/VJNT/SBC', 'Dr. Panjabrao Deshmukh Hostel Allowance']
  },
  {
    id: 'up-scholarship',
    name: 'UP Scholarship & Fee Reimbursement (Saksham)',
    category: 'state',
    stateOrEntity: 'Uttar Pradesh State Government',
    url: 'https://scholarship.up.gov.in',
    description: 'Official Uttar Pradesh state government portal for Pre-Matric and Post-Matric scholarship fee reimbursement across all colleges and universities.',
    schemes: ['UP Post-Matric Dashmottar General/OBC/SC/ST/Minority', 'UP Pre-Matric Scheme']
  },
  {
    id: 'karnataka-ssp',
    name: 'State Scholarship Portal - SSP (Karnataka)',
    category: 'state',
    stateOrEntity: 'Karnataka State Government',
    url: 'https://ssp.postmatric.karnataka.gov.in',
    description: 'Integrated direct benefit transfer portal for all Karnataka undergraduate, engineering, medical, and postgraduate students.',
    schemes: ['Social Welfare Post-Matric', 'Backward Classes Welfare (BCWD)', 'Minority Welfare Post-Matric']
  },
  {
    id: 'gujarat-mysy',
    name: 'MYSY Portal (Gujarat)',
    category: 'state',
    stateOrEntity: 'Education Department, Government of Gujarat',
    url: 'https://mysy.guj.nic.in',
    description: 'Mukhyamantri Yuva Swavalamban Yojana providing up to 50% tuition fee reimbursement and hostel food assistance for Gujarat students.',
    schemes: ['MYSY Higher Education Fee Assistance', 'Book & Equipment Grant']
  },
  {
    id: 'digital-gujarat',
    name: 'Digital Gujarat Scholarship Portal',
    category: 'state',
    stateOrEntity: 'Government of Gujarat',
    url: 'https://www.digitalgujarat.gov.in',
    description: 'Official portal for Gujarat SC, ST, SEBC, and EWS post-matric scholarships and food bill financial aid.',
    schemes: ['Post-Matric SC/ST/SEBC Scheme', 'Swami Vivekanand Stipend']
  },
  {
    id: 'wb-svmcm',
    name: 'Swami Vivekananda Merit-cum-Means - SVMCM (West Bengal)',
    category: 'state',
    stateOrEntity: 'Higher Education Department, Govt. of West Bengal',
    url: 'https://svmcm.wbhed.gov.in',
    description: 'Flagship West Bengal scheme providing ₹12,000 to ₹60,000 per year for meritorious students from low-income families.',
    schemes: ['SVMCM Higher Secondary to PG', 'Kanyashree K3 Scheme for Girls']
  },
  {
    id: 'bihar-pms',
    name: 'Bihar Post-Matric Scholarship Portal (PMS Online)',
    category: 'state',
    stateOrEntity: 'Education Department, Govt. of Bihar',
    url: 'https://pmsonline.bih.nic.in',
    description: 'State-dedicated portal for BC, EBC, SC, and ST post-matric tuition fee reimbursement in Bihar.',
    schemes: ['Bihar Post-Matric BC/EBC Scheme', 'Bihar Post-Matric SC/ST Scheme']
  },
  {
    id: 'rajasthan-sjms',
    name: 'SJMS Scholarship Portal (Rajasthan)',
    category: 'state',
    stateOrEntity: 'Social Justice & Empowerment Dept, Govt. of Rajasthan',
    url: 'https://sjmsnew.rajasthan.gov.in',
    description: 'Uttar Matric (Post-Matric) scholarship scheme for SC, ST, SBC, and EBC students in Rajasthan.',
    schemes: ['Rajasthan Uttar Matric Scholarship', 'Chief Minister Higher Education Scheme']
  },
  {
    id: 'ap-jnanabhumi',
    name: 'Jnanabhumi Portal (Andhra Pradesh)',
    category: 'state',
    stateOrEntity: 'Government of Andhra Pradesh',
    url: 'https://jnanabhumi.ap.gov.in',
    description: 'Complete fee reimbursement (Jagananna Vidya Deevena) and mess/hostel maintenance grant (Vasathi Deevena).',
    schemes: ['Jagananna Vidya Deevena (100% Fee)', 'Jagananna Vasathi Deevena (₹20,000/yr)']
  },
  {
    id: 'telangana-epass',
    name: 'ePass Portal (Telangana)',
    category: 'state',
    stateOrEntity: 'Government of Telangana',
    url: 'https://telanganaepass.cgg.gov.in',
    description: 'Electronic Payment and Application System of Scholarships for Telangana post-matric fee reimbursement (RTF) and maintenance (MTF).',
    schemes: ['Telangana Post-Matric RTF & MTF', 'Overseas Scholarship Scheme']
  },
  {
    id: 'mp-medhavi',
    name: 'MP Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
    category: 'state',
    stateOrEntity: 'Madhya Pradesh State Government',
    url: 'http://scholarshipportal.mp.nic.in/MedhaviChhatra/',
    description: 'Full course fee payment for students who scored 70%+ in MP Board or 85%+ in CBSE and took admission in engineering, medical, or law colleges.',
    schemes: ['MMVY Full Fee Reimbursement Scheme']
  },
  {
    id: 'kerala-sjd',
    name: 'Kerala Social Justice Portal (Vidyakiranam)',
    category: 'state',
    stateOrEntity: 'Social Justice Department, Govt. of Kerala',
    url: 'http://sjd.kerala.gov.in',
    description: 'Educational assistance for children of differently-abled parents and vulnerable categories in Kerala.',
    schemes: ['Vidyakiranam Scheme']
  },
  {
    id: 'delhi-edistrict',
    name: 'Delhi e-District Portal',
    category: 'state',
    stateOrEntity: 'Govt. of NCT of Delhi',
    url: 'https://edistrict.delhigovt.nic.in',
    description: 'Higher education merit-cum-means fee reimbursement (up to 100% tuition waiver) for students in Delhi state universities.',
    schemes: ['Delhi Higher Education Merit-cum-Means Scheme', 'SC/ST/OBC Post-Matric Fee Support']
  },
  {
    id: 'odisha-ossp',
    name: 'Odisha State Scholarship Portal (OSSP)',
    category: 'state',
    stateOrEntity: 'Government of Odisha',
    url: 'https://scholarship.odisha.gov.in',
    description: 'Single window scholarship portal for general degree, postgraduate, and technical/professional e-Medhabruti schemes.',
    schemes: ['e-Medhabruti Higher Education', 'Nirman Shramik Scholarship', 'Post-Matric SC/ST']
  },
  {
    id: 'tamil-nadu-escholarship',
    name: 'Tamil Nadu e-Scholarship Portal',
    category: 'state',
    stateOrEntity: 'Government of Tamil Nadu',
    url: 'https://escholarship.tn.gov.in',
    description: 'Full tuition fee reimbursement and maintenance allowances for BC, MBC, DNC, SC, and ST students admitted via single-window system.',
    schemes: ['Post-Matric Scholarship', 'First Graduate Free Education Scheme']
  },
  {
    id: 'haryana-harchhatravratti',
    name: 'Haryana Har-Chhatravratti Portal',
    category: 'state',
    stateOrEntity: 'Department of Higher Education, Govt. of Haryana',
    url: 'https://harchhatravratti.highereduhry.ac.in',
    description: 'Consolidated state scholarship portal integrated with Parivar Pehchan Patra (Family ID) for automated eligibility.',
    schemes: ['Post-Matric Scholarship for SC/BC', 'Merit Scholarship for College Students']
  },
  {
    id: 'punjab-scholarships',
    name: 'Punjab State Scholarship Portal',
    category: 'state',
    stateOrEntity: 'Government of Punjab',
    url: 'https://scholarships.punjab.gov.in',
    description: 'Dr. B.R. Ambedkar Post-Matric Scholarship providing Freeship cards and zero-fee admission guarantee.',
    schemes: ['Dr. B.R. Ambedkar Post-Matric SC/BC Scheme', 'Chief Minister Scholarship']
  },
  {
    id: 'kerala-egrantz',
    name: 'Kerala E-Grantz 3.0 Portal',
    category: 'state',
    stateOrEntity: 'Government of Kerala',
    url: 'https://egrantz.kerala.gov.in',
    description: '100% course fee reimbursement and monthly living stipend for SC, ST, OEC, and OBC students in Kerala.',
    schemes: ['E-Grantz 3.0 Post-Matric Assistance', 'Prof. Joseph Mundassery Scholarship']
  },

  // Corporate & CSR Foundations
  {
    id: 'reliance-csr',
    name: 'Reliance Foundation Scholarships',
    category: 'csr',
    stateOrEntity: 'Reliance Foundation',
    url: 'https://www.reliancefoundation.org/our-work/education/scholarships',
    description: 'Up to ₹2 Lakhs (Undergraduate) and ₹6 Lakhs (Postgraduate) direct grants for meritorious students across India.',
    schemes: ['Undergraduate Merit-cum-Means Grant', 'Postgraduate Tech Scholars']
  },
  {
    id: 'infosys-foundation',
    name: 'Infosys Foundation STEM Stars',
    category: 'csr',
    stateOrEntity: 'Infosys Foundation',
    url: 'https://www.infosys.com/infosys-foundation/initiatives/education/stem-stars.html',
    description: 'Up to ₹1,00,000 per year covering full tuition, living expenses, and study materials for female STEM students.',
    schemes: ['STEM Stars Scholarship for Girls (B.Tech & Science)']
  },
  {
    id: 'santoorscholarship',
    name: 'Santoor Women’s Scholarship',
    category: 'csr',
    stateOrEntity: 'Wipro Consumer Care & Wipro Cares',
    url: 'https://www.santoorscholarship.com',
    description: '₹24,000 per year for young women from AP, Karnataka, Telangana, and Chhattisgarh pursuing higher education degrees.',
    schemes: ['Santoor Higher Education Scholarship for Girls']
  },
  {
    id: 'sitaram-jindal',
    name: 'Sitaram Jindal Foundation',
    category: 'csr',
    stateOrEntity: 'Sitaram Jindal Foundation',
    url: 'https://www.sitaramjindalfoundation.org',
    description: 'Philanthropic educational grants (up to ₹38,400/yr) for Class 11, 12, ITI, Diploma, Graduation, and Medical/Engineering.',
    schemes: ['SJF Merit Scholarship Scheme (Categories A to D)']
  },
  {
    id: 'aditya-birla-csr',
    name: 'Aditya Birla Capital Foundation',
    category: 'csr',
    stateOrEntity: 'Aditya Birla Capital',
    url: 'https://adityabirlacapital.com',
    description: 'Up to ₹60,000 per year financial aid for school students (9-12) and professional undergraduate courses.',
    schemes: ['Aditya Birla Capital Scholarship Programme']
  },
  {
    id: 'google-buildyourfuture',
    name: 'Google Build Your Future Scholarships',
    category: 'csr',
    stateOrEntity: 'Google LLC',
    url: 'https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac',
    description: '$2,500 USD (approx. ₹2.08 Lakhs) grant + Google mentorship for female students in Computer Science.',
    schemes: ['Generation Google Scholarship (APAC)']
  },
  {
    id: 'tata-trusts-csr',
    name: 'Tata Trusts Education Grants',
    category: 'csr',
    stateOrEntity: 'Sir Ratan Tata & Sir Dorabji Tata Trusts',
    url: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants',
    description: 'Philanthropic tuition fee assistance for college and university students across India.',
    schemes: ['Higher Education College Fee Grants', 'Medical & Healthcare Grants']
  },
  {
    id: 'hdfc-csr',
    name: 'HDFC Bank Parivartan’s ECSS Programme',
    category: 'csr',
    stateOrEntity: 'HDFC Bank CSR',
    url: 'https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility/educational-crisis-scholarship',
    description: 'Up to ₹75,000 financial support for school, diploma, undergraduate, and postgraduate students facing socio-economic distress.',
    schemes: ['ECSS Crisis Support', 'Merit-cum-Need Scholarship']
  },
  {
    id: 'kotak-csr',
    name: 'Kotak Kanya Scholarship',
    category: 'csr',
    stateOrEntity: 'Kotak Education Foundation',
    url: 'https://kotakeducation.org/kotak-kanya-scholarship/',
    description: '₹1.5 Lakh per year for meritorious female students pursuing professional degrees (Engineering, MBBS, Law, Architecture).',
    schemes: ['Kotak Kanya Degree Grant (4-5 Years)']
  },
  {
    id: 'ffe-csr',
    name: 'Foundation For Excellence (FFE)',
    category: 'csr',
    stateOrEntity: 'FFE India Trust',
    url: 'https://ffe.org/scholarships/',
    description: '₹50,000 per year + free laptop + tech mentorship for 1st-year engineering and MBBS students from low-income families.',
    schemes: ['FFE Engineering Scholarship', 'FFE Medical Scholarship']
  },
  {
    id: 'ongc-csr',
    name: 'ONGC Scholar Portal',
    category: 'csr',
    stateOrEntity: 'Oil and Natural Gas Corporation (ONGC)',
    url: 'https://ongcscholar.org',
    description: '₹48,000 per year for SC, ST, OBC, and EWS students pursuing Engineering, MBBS, MBA, or Master’s in Geophysics/Geology.',
    schemes: ['ONGC SC/ST Scholarship', 'ONGC OBC & EWS Scholarship']
  },
  {
    id: 'siemens-csr',
    name: 'Siemens Scholarship Program',
    category: 'csr',
    stateOrEntity: 'Siemens India CSR',
    url: 'https://www.siemens.com/in/en/company/sustainability/corporate-citizenship/siemens-scholarship-program.html',
    description: '100% college tuition fees + book allowance + internship + industry training for 1st-year government engineering college students.',
    schemes: ['Siemens Engineering Scholars']
  },
  {
    id: 'sbi-csr',
    name: 'SBI Foundation Asha Scholarship',
    category: 'csr',
    stateOrEntity: 'State Bank of India Foundation',
    url: 'https://www.sbifoundation.in/asha-scholarship',
    description: 'Up to ₹75,000 per year for undergraduate, IIT/NIT, and medical students across India.',
    schemes: ['SBI Asha College Scholarship', 'SBI Asha Elite Premier Institute Grant']
  },
  {
    id: 'colgate-csr',
    name: 'Colgate Keep India Smiling Foundation',
    category: 'csr',
    stateOrEntity: 'Colgate-Palmolive India CSR',
    url: 'https://www.colgate.com/en-in/keep-india-smiling',
    description: '₹30,000 per year financial aid for 4-year engineering students to help them complete their degree.',
    schemes: ['Keep India Smiling Engineering Grant']
  },
  {
    id: 'loreal-csr',
    name: 'L’Oréal India For Young Women in Science',
    category: 'csr',
    stateOrEntity: 'L’Oréal India',
    url: 'https://www.loreal.com/en/india/articles/commitments/for-young-women-in-science/',
    description: '₹2.5 Lakhs grant for female students pursuing graduation in science streams across India.',
    schemes: ['Young Women in Science Scholarship']
  }
];

interface OfficialPortalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHighContrast: boolean;
  themeMode?: ThemeMode;
}

export const OfficialPortalsModal: React.FC<OfficialPortalsModalProps> = ({
  isOpen,
  onClose,
  isHighContrast,
  themeMode = 'light'
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'central' | 'state' | 'csr'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const isLight = !isHighContrast && themeMode === 'light';

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const filteredPortals = OFFICIAL_PORTALS_LIST.filter(portal => {
    const matchesCategory = filterCategory === 'all' || portal.category === filterCategory;
    const matchesQuery = 
      portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.stateOrEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.schemes.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portals-modal-title"
    >
      <div 
        className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
          isHighContrast
            ? 'bg-black border-2 border-white text-white'
            : isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0b1329] border-slate-700 text-slate-100'
        }`}
      >
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-start justify-between gap-3 ${
          isHighContrast 
            ? 'border-white bg-black' 
            : isLight 
              ? 'border-slate-200 bg-emerald-50/50' 
              : 'border-slate-800 bg-[#070e20]'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl shrink-0 ${
              isHighContrast 
                ? 'bg-white text-black' 
                : isLight 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-emerald-500 text-slate-950 font-bold'
            }`}>
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="portals-modal-title" className="text-lg sm:text-xl font-bold tracking-tight">
                  Official Scholarship Portals Directory (Real Links)
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                  isHighContrast
                    ? 'border-white text-white'
                    : isLight
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-emerald-950 text-emerald-300 border-emerald-600/50'
                }`}>
                  <ShieldCheck className="w-3 h-3" />
                  100% Real & Verified Portals
                </span>
              </div>
              <p className={`text-xs mt-1 ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Direct, genuine application website addresses for Central Government, State Welfare Departments, and CSR Foundations.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
              isHighContrast
                ? 'border-white text-white hover:bg-neutral-900'
                : isLight
                  ? 'border-slate-200 hover:bg-slate-100 text-slate-600'
                  : 'border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
            aria-label="Close portal directory"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Strip */}
        <div className={`p-4 border-b flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
          isHighContrast ? 'border-white bg-black' : isLight ? 'border-slate-200 bg-slate-50/70' : 'border-slate-800 bg-[#091124]'
        }`}>
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              isHighContrast ? 'text-white' : isLight ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portal name, state, scheme, or domain (e.g. NSP, MahaDBT, UP, scholarships.gov.in)..."
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border transition-colors ${
                isHighContrast
                  ? 'bg-black border-2 border-white text-white placeholder:text-neutral-400'
                  : isLight
                    ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500'
                    : 'bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-emerald-500'
              }`}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? isHighContrast
                    ? 'bg-white text-black border-white'
                    : 'bg-emerald-600 text-white border-emerald-600'
                  : isHighContrast
                    ? 'border-white text-white'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              All ({OFFICIAL_PORTALS_LIST.length})
            </button>
            <button
              onClick={() => setFilterCategory('central')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                filterCategory === 'central'
                  ? isHighContrast
                    ? 'bg-white text-black border-white'
                    : 'bg-emerald-600 text-white border-emerald-600'
                  : isHighContrast
                    ? 'border-white text-white'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              Central Portals
            </button>
            <button
              onClick={() => setFilterCategory('state')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                filterCategory === 'state'
                  ? isHighContrast
                    ? 'bg-white text-black border-white'
                    : 'bg-emerald-600 text-white border-emerald-600'
                  : isHighContrast
                    ? 'border-white text-white'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              State Portals
            </button>
            <button
              onClick={() => setFilterCategory('csr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                filterCategory === 'csr'
                  ? isHighContrast
                    ? 'bg-white text-black border-white'
                    : 'bg-emerald-600 text-white border-emerald-600'
                  : isHighContrast
                    ? 'border-white text-white'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              CSR & Trusts
            </button>
          </div>
        </div>

        {/* Portals List Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredPortals.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold">No portals match your search query.</p>
              <button
                onClick={() => { setSearchQuery(''); setFilterCategory('all'); }}
                className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredPortals.map((portal) => (
              <div
                key={portal.id}
                className={`p-4 rounded-xl border transition-all ${
                  isHighContrast
                    ? 'bg-black border-2 border-white'
                    : isLight
                      ? 'bg-white border-slate-200/90 hover:border-emerald-300 hover:shadow-xs'
                      : 'bg-[#0f182e] border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold tracking-tight">
                        {portal.name}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm border ${
                        portal.category === 'central'
                          ? isHighContrast ? 'border-white text-white' : isLight ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-blue-950/70 text-blue-300 border-blue-700/40'
                          : portal.category === 'state'
                            ? isHighContrast ? 'border-white text-white' : isLight ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-amber-950/70 text-amber-300 border-amber-700/40'
                            : isHighContrast ? 'border-white text-white' : isLight ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-purple-950/70 text-purple-300 border-purple-700/40'
                      }`}>
                        {portal.category === 'central' ? 'Central Govt' : portal.category === 'state' ? 'State Welfare' : 'Corporate CSR'}
                      </span>
                      <span className={`text-[11px] font-medium ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        • {portal.stateOrEntity}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed ${isHighContrast ? 'text-neutral-300' : isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {portal.description}
                    </p>

                    {/* Associated Key Schemes */}
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isHighContrast ? 'text-neutral-400' : isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Key Schemes:
                      </span>
                      {portal.schemes.map((scheme, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                            isHighContrast
                              ? 'border-neutral-600 text-neutral-200'
                              : isLight
                                ? 'bg-slate-100 text-slate-700 border-slate-200'
                                : 'bg-slate-800/80 text-slate-300 border-slate-700'
                          }`}
                        >
                          {scheme}
                        </span>
                      ))}
                    </div>

                    {/* Real URL Display */}
                    <div className="pt-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${
                          isHighContrast ? 'text-white' : isLight ? 'text-emerald-800' : 'text-emerald-400'
                        }`}>
                          Real Portal Link:
                        </span>
                        <a
                          href={portal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-mono text-xs font-bold hover:underline truncate max-w-sm sm:max-w-md ${
                            isHighContrast ? 'text-white underline' : isLight ? 'text-blue-700 hover:text-blue-900' : 'text-sky-300 hover:text-white'
                          }`}
                        >
                          {portal.url}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Copy & Open */}
                  <div className="flex sm:flex-col items-center sm:items-stretch gap-2 shrink-0 self-end sm:self-start pt-2 sm:pt-0">
                    <button
                      onClick={() => handleCopy(portal.id, portal.url)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        copiedId === portal.id
                          ? isHighContrast
                            ? 'bg-white text-black border-white'
                            : isLight
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-emerald-900 text-emerald-200 border-emerald-500'
                          : isHighContrast
                            ? 'border-white text-white hover:bg-neutral-900'
                            : isLight
                              ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                      }`}
                      title="Copy Real Link"
                    >
                      {copiedId === portal.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        isHighContrast
                          ? 'bg-white text-black border-white hover:bg-neutral-200'
                          : isLight
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-2xs'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black border-emerald-400'
                      }`}
                      title={`Open official portal: ${portal.url}`}
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isHighContrast ? 'border-white bg-black' : isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-[#070e20]'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className={`w-4 h-4 ${isHighContrast ? 'text-white' : 'text-emerald-500'}`} />
            <span className={isHighContrast ? 'text-white font-medium' : isLight ? 'text-slate-600' : 'text-slate-400'}>
              All portal applications are <strong>100% Free</strong>. Never pay registration fees to middlemen.
            </span>
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
              isHighContrast
                ? 'border-white text-white hover:bg-neutral-900'
                : isLight
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-200 bg-white'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-slate-900'
            }`}
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
