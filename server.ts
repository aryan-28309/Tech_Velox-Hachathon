import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI lazily / safely
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        timeout: 8000,
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Fallback intelligent answers for common queries if API key is not set, times out, or network fails
function getSmartFallbackResponse(
  query: string,
  language: string = "en",
  studentContext?: any,
  history?: any[]
): string {
  const q = query.toLowerCase().trim();

  // 1. Polite Greetings & Chit-chat (Never repeat the welcome list!)
  if (/^(hi|hello|hey|namaste|pranam|good\s*(morning|afternoon|evening)|hola|kese ho|kaise ho)\b/i.test(q)) {
    const courseNote = studentContext?.educationLevel
      ? ` I see you're interested in scholarships for ${studentContext.educationLevel.replace('_', ' ')}.`
      : '';
    return `Namaste! 🙏 I am **AI Boat**, here to help you navigate India's scholarship landscape.${courseNote}

How can I help you right now? You can ask me:
- 🎓 *"What scholarships am I eligible for?"*
- 📄 *"How do I get an Income or Caste Certificate?"*
- 🏦 *"How do I link my bank account for NPCI DBT?"*
- 📅 *"What are the deadlines for NSP and state schemes?"*`;
  }

  // 2. Gratitude / Acknowledgment
  if (/^(thanks|thank\s*you|dhanyawad|shukriya|okay|ok|got\s*it|great|nice|perfect|cool|understood|theek hai|accha)\b/i.test(q)) {
    return `You're very welcome! 😊

Feel free to ask about any other scholarship, document guidelines, eligibility rules, or bank seeding whenever you need. Best of luck with your applications! 🌟`;
  }

  // 3. Identity / "Who are you"
  if (/^(who\s*are\s*you|what\s*are\s*you|tell\s*me\s*about\s*yourself|aap\s*kaun\s*ho)\b/i.test(q)) {
    return `I am **AI Boat** (छात्रवृत्ति सहायक), your virtual scholarship counselor and direct benefit advisor.

I assist Indian students across all states with:
- Finding 100% free government and private CSR scholarships.
- Providing exact step-by-step document preparation rules.
- Helping with Bank Aadhaar NPCI seeding for seamless DBT fund transfers.
- Tracking application portals like NSP, MahaDBT, UP Scholarship, SSP, and Medhavi.`;
  }

  // 4. Engineering / B.Tech / Diploma / Polytechnic
  if (/\b(btech|b\.tech|engineering|engineer|polytechnic|diploma\s*tech)\b/i.test(q) || q.includes("इंजीनियरिंग")) {
    return `⚙️ **Top Scholarships for B.Tech & Engineering Students in India:**

1. **Central Sector Scheme (NSP CSSS):**
   - **Award:** ₹12,000/year (1st to 3rd year) & ₹20,000 in final year.
   - **Eligibility:** 80th percentile in 12th Board, parental income < ₹4.5 Lakhs/year.
2. **AICTE Pragati Scheme (for Girls):**
   - **Award:** ₹50,000 per year towards college fees & books.
   - **Eligibility:** 1st year B.Tech girls admitted via central counseling, family income < ₹8 Lakhs/year.
3. **Siemens Scholarship Program:**
   - **Award:** 100% Tuition Fee waiver + ₹50,000 annual allowance for books & laptop.
   - **Eligibility:** 1st year B.Tech in Govt. Engineering colleges, family income < ₹2 Lakhs/year.
4. **Foundation for Excellence (FFE):**
   - **Award:** Up to ₹50,000/year for professional B.Tech/BE degrees.
   - **Eligibility:** Good rank in JEE Main / State CET, annual income < ₹3 Lakhs/year.
5. **ONGC Foundation Scholarship:**
   - **Award:** ₹48,000/year for meritorious Engineering students (SC/ST/OBC/General EWS).`;
  }

  // 5. Medical / MBBS / BDS / Nursing / Pharmacy
  if (/\b(medical|mbbs|bds|bams|bhms|nursing|pharmacy|b\.pharm)\b/i.test(q) || q.includes("मेडिकल") || q.includes("डॉक्टर")) {
    return `🩺 **Top Scholarships for Medical (MBBS/BDS/Nursing) Students:**

1. **Central Sector Scheme (NSP):** Covers undergraduate medical and allied healthcare courses with ₹12,000 to ₹20,000/year.
2. **State Post-Matric Scholarships (SC/ST/OBC/EBC):** Up to 100% tuition reimbursement + hostel maintenance allowance for government and private medical colleges.
3. **Nationwide Education and Scholarship Test (NEST Junior/Senior):** Cash awards up to ₹50,000 for MBBS/BDS students.
4. **Reliance Foundation Undergraduate Scholarships:** Up to ₹2,00,000 across course duration based on merit-cum-means (NEET/12th scores).
5. **HDFC Bank Parivartan's ECSS:** ₹75,000/year for students in professional healthcare courses facing financial distress.
6. **DLF Raghvendra Scholarship:** ₹40,000 to ₹1,00,000/year for 1st-year MBBS students in recognized colleges.`;
  }

  // 6. Female / Girls / Women
  if (/\b(girl|girls|female|women|woman|pragati|daughter)\b/i.test(q) || q.includes("महिला") || q.includes("बेटी") || q.includes("छात्रा")) {
    return `🌸 **Special Scholarships Exclusively for Female Students:**

1. **AICTE Pragati Scheme:** ₹50,000 per year for female students admitted to 1st year Degree or Diploma in AICTE approved colleges (family income < ₹8 Lakhs).
2. **DRDO Scholarship for Girls:** ₹1,20,000/year (for B.Tech) and ₹1,86,000/year (for M.Tech) in engineering streams.
3. **Begum Hazrat Mahal National Scholarship:** For meritorious minority girls studying in Class 9th to 12th.
4. **Kotak Kanya Scholarship:** Up to ₹1,50,000 per year for girl students pursuing professional graduation (B.Tech, MBBS, LLB, B.Des).
5. **Infosys Foundation STEM Stars:** 100% tuition and living expenses up to ₹1,00,000/year for female STEM students.
6. **Santoor Women's Scholarship:** ₹24,000 per year for girls from AP, Telangana, Karnataka, and Chhattisgarh.
7. **L'Oréal India For Young Women in Science:** Up to ₹2,50,000 for female students pursuing science graduation.`;
  }

  // 7. Research / Ph.D / Master's / Science (PMRF, CSIR UGC JRF, INSPIRE)
  if (/\b(phd|ph\.d|doctorate|research|fellowship|pmrf|jrf|csir|ugc|inspire|m\.tech|m\.sc)\b/i.test(q) || q.includes("रिसर्च") || q.includes("पीएचडी")) {
    return `🔬 **Scholarships & Fellowships for Postgraduate & Doctoral Research:**

1. **Prime Minister's Research Fellowship (PMRF Scheme):**
   - **Stipend:** ₹70,000/month (1st-2nd yr), ₹75,000/month (3rd yr), ₹80,000/month (4th-5th yr) + ₹2,00,000/year research grant.
   - **Eligibility:** B.Tech/M.Sc graduates from IITs, IISc, NITs, IISERs, or central universities with high CGPA/GATE score.
2. **CSIR-UGC Junior Research Fellowship (JRF):**
   - **Stipend:** ₹37,000/month + HRA for first 2 years, rising to ₹42,000/month as SRF.
   - **Eligibility:** Qualified National Eligibility Test (CSIR/UGC NET-JRF).
3. **INSPIRE Scholarship for Higher Education (SHE):**
   - **Stipend:** ₹80,000/year (₹60,000 scholarship + ₹20,000 summer research mentorship) for B.Sc/M.Sc Natural & Basic Sciences.
   - **Eligibility:** Top 1% in Class 12th Board Examination.`;
  }

  // 8. Transgender Students (SMILE / Samannwaya)
  if (/\b(transgender|trans|third gender|smile|samannwaya|lgbt)\b/i.test(q) || q.includes("ट्रांसजेंडर") || q.includes("तृतीय लिंग") || q.includes("किन्नर")) {
    return `⚧️ **Scholarships & Welfare Schemes for Transgender Students:**

1. **National Scholarship Scheme for Transgender Students (SMILE Scheme):**
   - **Award:** ₹13,500/year (Classes 9–12) and ₹25,000–₹50,000/year (Degree, Engineering, PG, Medical) + monthly maintenance allowance via DBT.
   - **Ministry:** Ministry of Social Justice & Empowerment (MoSJE), Govt. of India.
   - **Income Limit:** Family income < ₹2.5 Lakhs per year.
   - **Portal:** Apply via National Transgender Portal (**transgender.dosje.gov.in**) & NSP (**scholarships.gov.in**).
2. **Samannwaya Continuing Education Scheme (Kerala & State Welfare):**
   - Direct monthly study stipend of ₹1,500 to ₹3,500/month + free textbooks and subsidized hostel facilities.
3. **Universal Entitlement:** Transgender students are also 100% entitled to apply for all Central Sector Schemes, State Post-Matric schemes, and corporate CSR programs.`;
  }

  // 9. SC / ST / OBC / EBC / Minority Categories
  if (/\b(sc|st|obc|ebc|minority|minorities|moma|caste)\b/i.test(q) || q.includes("अनुसूचित जाति") || q.includes("जनजाति") || q.includes("पिछड़ा वर्ग") || q.includes("अल्पसंख्यक")) {
    return `🏷️ **Category-Specific Government Scholarship Schemes:**

1. **Post-Matric Scholarship for SC/ST Students:**
   - **Income Cap:** ₹2,50,000/year.
   - **Coverage:** 100% mandatory non-refundable tuition fees + monthly maintenance allowance (up to ₹13,500/year for hostellers).
2. **PM-YASASVI Post-Matric for OBC, EBC & DNT:**
   - **Income Cap:** ₹2,50,000/year.
   - **Coverage:** Tuition assistance + academic allowances for Class 11th, 12th, and college degrees.
   - **Key Requirement:** Valid Non-Creamy Layer (NCL) certificate for current year.
3. **Top Class Education Scheme for SC Students:**
   - Full tuition fee + ₹86,000/yr living allowance + ₹57,000 computer grant at premier institutes (IIT, IIM, AIIMS, NIT, NLU).
4. **Post-Matric Scholarship for Minorities (MoMA):**
   - For Muslim, Christian, Sikh, Buddhist, Jain, and Parsi students with income < ₹2 Lakhs/year.`;
  }

  // 10. Deadlines, Dates & Days Remaining
  if (/\b(date|dates|deadline|start|starting|end|ending|last date|days|days left|when to apply|schedule|timeline)\b/i.test(q) || q.includes("तारीख") || q.includes("अंतिम तिथि") || q.includes("कब तक") || q.includes("लास्ट डेट") || q.includes("कितने दिन")) {
    return `📅 **Current Scholarship Deadlines & Timeline (2026 Academic Session):**

1. **National Scholarship Portal (NSP Central & UGC Schemes):**
   - **Opening Date:** 01 August 2026
   - **Closing Date:** 31 October 2026
   - *Includes:* Central Sector Scheme, AICTE Pragati, Post-Matric SC/ST/OBC, Merit-cum-Means.
2. **Major Corporate & Foundation Deadlines:**
   - **HDFC Bank Parivartan ECSS:** Closes **30 September 2026** (Apply soon!).
   - **Reliance Foundation Scholarships:** Closes **15 October 2026**.
   - **Tata Trusts Higher Education:** Open through **30 November 2026**.
   - **Kotak Kanya Scholarship:** Closes **31 October 2026**.

💡 **Pro Tip:** Complete your One-Time Registration (OTR) and document upload at least **10 days prior to the last date** to avoid server congestion and ensure timely college nodal verification.`;
  }

  // 11. Income Certificate (Authority, Limits, Validity)
  if (/\b(income|tehsildar|sdm|patwari|salary|annual income)\b/i.test(q) || q.includes("आय प्रमाण पत्र") || q.includes("तहसीलदार") || q.includes("आय प्रमाण")) {
    return `📄 **Income Certificate (आय प्रमाण पत्र) Complete Guide:**

1. **Issuing Authority:** Must be issued by a competent Revenue Authority (Tehsildar, Sub-Divisional Magistrate / SDM, or Revenue Officer). A simple notary affidavit alone is **not accepted** for government scholarships.
2. **Gross Family Income:** Must show total combined annual income from all sources (salary, agriculture, business, pensions).
3. **Common Caps:**
   - Central Sector Scheme (NSP): ₹4,50,000/year.
   - Post-Matric SC/ST/OBC/EBC: ₹2,50,000/year.
   - AICTE Pragati (Girls): ₹8,00,000/year.
   - Private CSR (HDFC, FFE, Siemens): Usually ₹2,50,000 to ₹3,00,000/year.
4. **How to Apply:** Apply online on your state's e-District portal (or via nearest CSC / Jan Seva Kendra).`;
  }

  // 12. Bank Account & NPCI Aadhaar DBT Seeding
  if (/\b(bank|dbt|npci|seeding|passbook|account|aadhaar link)\b/i.test(q) || q.includes("खाता") || q.includes("सीडिंग") || q.includes("डीबीटी")) {
    return `🏦 **Bank Account & NPCI Aadhaar DBT Seeding (Critical for Disbursement):**

- **Direct Benefit Transfer (DBT):** Government scholarship funds are credited **ONLY** via Aadhaar Payment Bridge (APB).
- **Linking vs. Seeding:** Linking your Aadhaar is just for KYC identity. **NPCI DBT Seeding** specifically designates that bank account to receive government disbursements.
- **How to Get Seeded:**
  1. Visit your bank branch and submit the *"Aadhaar Seeding / NPCI DBT Mandate Form"*.
  2. Ask the branch officer: *"Please seed my account on the NPCI mapper for Direct Benefit Transfer"*.
  3. Verify status online at **myaadhaar.uidai.gov.in** under *"Bank Seeding Status"*.
- **Passbook Requirement:** Must have your full name matching your 10th marksheet, active status, and IFSC code clearly printed.`;
  }

  // 13. Bonafide Certificate
  if (/\b(bonafide|bonafied)\b/i.test(q) || q.includes("बोनाफाइड")) {
    return `🏛️ **Bonafide Student Certificate Guide:**

1. **What is it:** An official certificate issued by your school or college confirming you are currently an enrolled, active student.
2. **Mandatory Details:**
   - Student Full Name & Roll / Enrollment Number.
   - Exact Course & Year of Study (e.g. B.Tech Computer Engineering, 2nd Year).
   - College **AISHE / DISE Code** (compulsory for NSP and state verification).
   - Principal / Registrar's signature and official seal.
3. **How to Get:** Request it from your college academic or scholarship counter along with your latest admission fee receipt.`;
  }

  // 13b. Essential Documents Checklist
  if (/\b(documents?|doc|docs|papers|certificate|certificates|proof|affidavit|kya lagega)\b/i.test(q) || q.includes("दस्तावेज") || q.includes("कागजात") || q.includes("डॉक्यूमेंट") || q.includes("डॉक्यूमेंट्स")) {
    return `📄 **Essential Documents Checklist for Scholarship Applications (2026):**

1. **Aadhaar Card:** Must have your active mobile number linked for OTP and e-KYC.
2. **Current Year Income Certificate:** Issued by Tehsildar or SDM (reflecting total gross household income).
3. **Bonafide Student Certificate:** Issued by your college with official seal and AISHE code.
4. **Previous Year Marksheet:** Self-attested copy or verified via DigiLocker.
5. **Caste / Category Certificate:** Required for SC/ST/OBC/EWS candidates (with valid NCL for OBC).
6. **Active Bank Passbook:** Bank account must be seeded with Aadhaar on NPCI DBT mapper.
7. **College Admission & Fee Receipt:** To claim tuition fee reimbursement.

💡 *Always keep scanned PDF copies under 200 KB ready before applying on NSP or state portals.*`;
  }

  // 14. Can I apply for two scholarships at once?
  if (/\b(two|multiple|both|2)\b/i.test(q) || q.includes("दो छात्रवृत्ति") || q.includes("दो स्कॉलरशिप")) {
    return `⚖️ **Can I receive more than one scholarship at the same time?**

- **Government + Government (NOT Allowed):** You cannot avail two government scholarships (e.g. Central Sector + State Post-Matric) to reimburse the same tuition fees in the same academic year.
- **Government + Private CSR (Usually Allowed):** You **can** receive a government tuition fee waiver alongside a private CSR grant (like HDFC Parivartan, Siemens, or Tata Trusts) to cover books, hostel, and living expenses, as long as the private scheme's terms permit it.
- **Rule:** If two government schemes get approved by mistake, you must surrender one before disbursement.`;
  }

  // 15. State Portals (UP, Maharashtra, Karnataka, Gujarat, etc.)
  if (/\b(mahadbt|maharashtra|up scholarship|ssp|karnataka|mysy|gujarat|bihar|rajasthan|bengal|svmcm|telangana|epass|ap|jagananna)\b/i.test(q)) {
    return `🏛️ **Official State Scholarship Portals & Verification:**

- **Maharashtra (MahaDBT):** Rajarshi Shahu Maharaj Tuition Fee Reimbursement for EBC/OBC/SC/ST (**mahadbt.maharashtra.gov.in**).
- **Uttar Pradesh (UP Scholarship):** Pre & Post-Matric scholarship and fee reimbursement (**scholarship.up.gov.in**).
- **Karnataka (SSP):** Consolidated State Scholarship Portal (**ssp.postmatric.karnataka.gov.in**).
- **Gujarat (MYSY & Digital Gujarat):** Mukhyamantri Yuva Swavalamban Yojana (**mysy.guj.nic.in**) and Digital Gujarat (**digitalgujarat.gov.in**).
- **West Bengal (SVMCM):** Swami Vivekananda Merit-cum-Means Scholarship (**svmcm.wbhed.gov.in**).
- **Andhra Pradesh (JnanaBhumi):** Jagananna Vidya Deevena & Vasathi Deevena.
- **Telangana (ePASS):** Electronic Payment and Application System of Scholarships (**telanganaepass.cgg.gov.in**).`;
  }

  // 16. Fallback Profile-Aware Recommendation (Never output the generic welcome!)
  const courseStr = studentContext?.educationLevel
    ? studentContext.educationLevel.replace('_', ' ').toUpperCase()
    : 'HIGHER EDUCATION';
  const categoryStr = studentContext?.category ? studentContext.category.toUpperCase() : 'GENERAL/OBC/SC/ST';

  return `🎯 **Tailored Scholarship Guidance for ${courseStr} (${categoryStr}):**

Based on verified Indian scholarship guidelines, here are recommended pathways:

1. **National Scholarship Portal (scholarships.gov.in):**
   - Check the **Central Sector Scheme** if you scored above the 80th percentile in your 12th Board.
   - For SC/ST/OBC/EBC students, apply for the respective **Post-Matric Scholarship** with tuition fee waiver.
2. **Leading Corporate CSR Schemes (No Fee, 100% Legitimate):**
   - **HDFC Bank Parivartan's ECSS:** Up to ₹75,000/year for students in financial need.
   - **Reliance Foundation Scholarships:** Up to ₹2,00,000 for undergraduate degree courses.
   - **Tata Trusts / Foundation for Excellence (FFE):** Merit-cum-means assistance up to ₹50,000/year.
3. **Crucial Next Step:**
   - Ensure your **Income Certificate** is updated by the Tehsildar for the current financial year, and verify that your bank account has **NPCI DBT Seeding** enabled.

*Need specific details on any scheme, eligibility criteria, or document format? Ask me anytime!*`;
}

// AI Chat API with fast fallback, multi-turn history, and timeout protection
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "en", studentContext, history = [] } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAiClient();
    if (!ai) {
      const fallback = getSmartFallbackResponse(message, language, studentContext, history);
      return res.json({ reply: fallback, source: "knowledge-base" });
    }

    // Build context-aware prompt with guidelines
    const systemPrompt = `You are "AI Boat" (एआई बोट), the dedicated interactive scholarship chat board and virtual mentor for Indian students.
Your mission is to guide students on 100% free government (NSP, State portals) and private corporate CSR scholarships.

Student preferred language: ${language}
${studentContext ? `Student Profile: Course=${studentContext.educationLevel || 'General'}, Category=${studentContext.category || 'All'}, State=${studentContext.state || 'All-India'}, Income=₹${studentContext.familyIncome || 'Not specified'}, Marks=${studentContext.marks || 'Not specified'}%` : ''}

Guidelines:
1. Provide a direct, practical, and highly informative answer (in 3-5 concise bullet points).
2. NEVER repeat the generic welcome or introductory text. Respond directly to the student's question or greeting.
3. Highlight exact scholarship names, financial amounts, eligibility rules, and official portals (like NSP scholarships.gov.in, AICTE, state portals).
4. If the user asks in Hindi or regional language, respond in that language or clean Hinglish.
5. Bold key terms for readability. Mention that official applications are 100% FREE.`;

    // Construct multi-turn contents array with history
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      // Keep up to 6 recent turns to maintain context without token bloating
      for (const h of history.slice(-6)) {
        if (h && typeof h.text === 'string' && h.text.trim()) {
          contents.push({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text.trim() }],
          });
        }
      }
    }
    // Add current user turn
    contents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    // Attempt generation with tested available model
    const generatePromise = async () => {
      // Model priority: gemini-3.6-flash -> gemini-flash-latest -> gemini-3.8-flash
      const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.8-flash"];
      let lastErr: any = null;

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: contents,
            config: {
              systemInstruction: systemPrompt,
            },
          });
          if (response?.text && response.text.trim()) {
            return response.text.trim();
          }
        } catch (err: any) {
          lastErr = err;
          console.warn(`Model ${modelName} failed, trying next:`, err?.status || err?.message);
        }
      }
      throw lastErr || new Error("All candidate models failed");
    };

    // 8-second race against timeout
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error("AI response timeout")), 8000);
    });

    try {
      const reply = await Promise.race([generatePromise(), timeoutPromise]);
      if (reply && reply.trim()) {
        return res.json({ reply: reply.trim(), source: "gemini" });
      }
    } catch (aiErr) {
      console.warn("Gemini generation timed out or failed, using smart knowledge base:", aiErr);
    }

    const fallback = getSmartFallbackResponse(message, language, studentContext, history);
    return res.json({ reply: fallback, source: "knowledge-base" });
  } catch (error) {
    console.error("AI chat server error:", error);
    const fallback = getSmartFallbackResponse(
      req.body?.message || "",
      req.body?.language || "en",
      req.body?.studentContext,
      req.body?.history
    );
    res.json({ reply: fallback, source: "knowledge-base-fallback" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
