import React, { useState, useEffect, useRef } from 'react';
import { SupportedLanguage, ChatMessage, StudentProfile, ThemeMode } from '../types';
import { TRANSLATIONS } from '../translations';
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  Sparkles, 
  Loader2, 
  RotateCcw,
  Maximize2,
  Minimize2,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface AiBoatChatBoardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  currentLang: SupportedLanguage;
  isHighContrast: boolean;
  themeMode?: ThemeMode;
  studentProfile: StudentProfile;
}

export const AiBoatChatBoard: React.FC<AiBoatChatBoardProps> = ({
  isOpen,
  onClose,
  onOpen,
  currentLang,
  isHighContrast,
  themeMode = 'light',
  studentProfile,
}) => {
  const isLight = !isHighContrast && themeMode === 'light';

  // Initial welcome message
  const initialWelcomeMessage: ChatMessage = {
    id: 'welcome-ai-boat',
    sender: 'assistant',
    text: `Namaste! 🙏 I am **AI Boat**, your dedicated scholarship guidance chat board.

Ask me any questions in your preferred language or tap a quick topic below:
- 🎓 *What scholarships can I get for my course and percentage?*
- 📄 *Who issues a valid Income Certificate, and what is the limit?*
- 🏦 *How do I link my bank account with Aadhaar for NPCI DBT?*
- 📅 *Which scholarships are currently open with upcoming deadlines?*`,
    timestamp: 'Just now',
    source: 'knowledge-base',
  };

  const STORAGE_KEY = 'ai_boat_chat_history_v2';

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read saved chat history:', e);
    }
    return [initialWelcomeMessage];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Sync messages with sessionStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (e) {
      console.warn('Could not save chat history:', e);
    }
  }, [messages]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Voice recognition setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      const langCodes: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        mr: 'mr-IN',
        gu: 'gu-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN',
        kn: 'kn-IN',
        pa: 'pa-IN',
        ml: 'ml-IN',
        or: 'or-IN',
      };
      recognition.lang = langCodes[currentLang] || 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLang]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setMessages((prev) => [
        ...prev,
        {
          id: `voice-note-${Date.now()}`,
          sender: 'assistant',
          text: 'Voice speech input is not supported by your current browser. You can type your query in the box below!',
          timestamp: 'Just now',
        },
      ]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    }
  };

  // Text to Speech playback
  const handleSpeakText = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`•]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.includes('hi') || v.lang.includes('IN')
    );
    if (matchingVoice) utterance.voice = matchingVoice;

    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearConversation = () => {
    window.speechSynthesis?.cancel();
    setSpeakingMsgId(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setMessages([initialWelcomeMessage]);
  };

  // Clean parsing of markdown bullet items and bold text
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
          const isNumbered = /^\d+\.\s/.test(trimmed);

          // Parse **bold text**
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const formattedParts = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold underline-offset-2">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          if (isBullet || isNumbered) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
                <span className={`font-black shrink-0 text-xs mt-0.5 ${
                  isHighContrast ? 'text-white' : isLight ? 'text-[#c2410c]' : 'text-amber-400'
                }`}>
                  •
                </span>
                <span className="flex-1 leading-relaxed">{formattedParts}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="leading-relaxed">
              {formattedParts}
            </p>
          );
        })}
      </div>
    );
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    // Prepare previous messages history for conversational memory
    const historyPayload = messages
      .filter((m) => m.id !== 'welcome-ai-boat')
      .slice(-6)
      .map((m) => ({ sender: m.sender, text: m.text }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: textToSend,
          language: currentLang,
          history: historyPayload,
          studentContext: {
            educationLevel: studentProfile.educationLevel,
            category: studentProfile.category,
            state: studentProfile.state,
            familyIncome: studentProfile.familyIncome,
            marks: studentProfile.percentageMarks,
            gender: studentProfile.gender,
          },
        }),
      });

      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('Chat API returned error');

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender: 'assistant',
        text: data.reply || 'I could not generate an answer at this moment. Please try again or check the official directory.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn('AI Boat server request failed, showing verified offline guidance:', err);

      let fallbackText = `📄 **Verified Guidance from AI Boat:**
- **Income Certificate:** Must be issued by Tehsildar or SDM for the current financial year. Total gross household income must be reflected.
- **Bank NPCI Seeding:** Ensure your active bank account is linked to your Aadhaar on the NPCI DBT portal.
- **Official Portals:** Always apply directly on **scholarships.gov.in** (NSP) or official state portals at zero fee.`;

      const lower = textToSend.toLowerCase();
      if (/^(hi|hello|hey|namaste)\b/i.test(lower)) {
        fallbackText = `Namaste! 🙏 How can I assist you with your scholarship search today? You can ask about B.Tech, Medical, Girls schemes, required documents, or deadlines!`;
      } else if (lower.includes('btech') || lower.includes('engineering') || lower.includes('engineer')) {
        fallbackText = `⚙️ **Scholarships for B.Tech & Engineering Students:**
- **Central Sector Scheme (NSP):** ₹12,000/yr (1st-3rd yr) & ₹20,000/yr in final year.
- **AICTE Pragati Scheme:** ₹50,000/yr towards tuition & equipment for female students.
- **Siemens & Foundation for Excellence (FFE):** Merit-cum-means awards up to ₹50,000/yr for B.Tech students.`;
      } else if (lower.includes('girl') || lower.includes('female') || lower.includes('woman') || lower.includes('महिला')) {
        fallbackText = `🌸 **Scholarships Exclusively for Female Students:**
- **AICTE Pragati Scheme:** ₹50,000 per year for degree/diploma courses.
- **DRDO Scholarship for Girls:** ₹1,20,000/yr (B.Tech) & ₹1,86,000/yr (M.Tech) in engineering streams.
- **Begum Hazrat Mahal National Scholarship:** Merit assistance for minority female students.`;
      } else if (lower.includes('date') || lower.includes('deadline') || lower.includes('अंतिम तिथि') || lower.includes('तारीख')) {
        fallbackText = `📅 **Application Timeline & Deadlines (2026 Academic Year):**
- **NSP Central Schemes:** Active till 31 October 2026.
- **HDFC Parivartan ECSS:** Closes 30 September 2026 (Apply Soon!).
- **Tata Trusts:** Open through 30 November 2026.
*Tip: Always complete college verification at least 10 days before the closing date.*`;
      }

      const fallbackMsg: ChatMessage = {
        id: `fallback-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'knowledge-base-fallback',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const QUICK_TOPICS = [
    { label: '🎓 B.Tech & Engineering', query: 'What are the best scholarships for B.Tech and Engineering students?' },
    { label: '🩺 Medical & MBBS', query: 'What scholarships are available for MBBS and healthcare students?' },
    { label: '🌸 Girls (AICTE Pragati)', query: 'Tell me about AICTE Pragati and scholarships for female students.' },
    { label: '📄 Income Certificate', query: 'How to get a valid Income Certificate from Tehsildar and what is the limit?' },
    { label: '🏦 Bank NPCI DBT Seeding', query: 'How to link and seed bank account with Aadhaar for DBT scholarships?' },
    { label: '📅 Deadlines & Dates', query: 'What are the current scholarship application deadlines and days left?' },
    { label: '⚖️ Two Scholarships At Once?', query: 'Can I apply for and receive two scholarships at the same time?' },
    { label: '🏷️ SC/ST/OBC Post-Matric', query: 'What are the eligibility and benefits for SC, ST, and OBC Post-Matric schemes?' },
  ];

  return (
    <>
      {/* Floating Launcher Button (visible when board is closed) */}
      {!isOpen && (
        <button
          id="btn-open-ai-boat"
          type="button"
          onClick={onOpen}
          className={`fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 cursor-pointer border ${
            isHighContrast
              ? 'bg-black text-white border-2 border-white'
              : isLight
                ? 'bg-[#1c1917] text-white border-[#292524] hover:bg-[#292524]'
                : 'bg-[#fafaf9] text-[#18181b] border-white font-bold hover:bg-white'
          }`}
          aria-label="Open AI Boat Chat Board"
        >
          <div className="relative">
            <Bot className="w-5 h-5 shrink-0" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-tight">AI Boat</span>
            <span className={`block text-[10px] leading-none opacity-80 ${isHighContrast ? 'text-white' : ''}`}>
              Chat Board
            </span>
          </div>
        </button>
      )}

      {/* AI Boat Chat Board Overlay / Drawer */}
      {isOpen && (
        <div
          id="ai-boat-chat-board"
          role="dialog"
          aria-label="AI Boat Scholarship Chat Board"
          className={`fixed bottom-0 sm:bottom-4 right-0 sm:right-4 z-50 flex flex-col rounded-t-2xl sm:rounded-2xl shadow-2xl border transition-all duration-200 overflow-hidden ${
            isExpanded
              ? 'w-full sm:w-[680px] h-[92vh] sm:h-[82vh]'
              : 'w-full sm:w-[440px] md:w-[460px] h-[90vh] sm:h-[620px]'
          } ${
            isHighContrast
              ? 'bg-black border-2 border-white text-white'
              : isLight
                ? 'bg-[#ffffff] border-[#dcd8ce] text-[#1c1917]'
                : 'bg-[#13161c] border-[#292e3a] text-[#f4f4f5]'
          }`}
        >
          {/* Header Bar */}
          <div className={`px-4 py-3 border-b flex items-center justify-between gap-3 shrink-0 ${
            isHighContrast
              ? 'bg-black border-white text-white'
              : isLight
                ? 'bg-[#f7f5ef] border-[#e5e1d6]'
                : 'bg-[#181c24] border-[#292e3a]'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                isHighContrast
                  ? 'bg-white text-black border-white'
                  : isLight
                    ? 'bg-[#1c1917] text-white border-[#1c1917]'
                    : 'bg-[#fafaf9] text-[#18181b] border-white'
              }`}>
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight leading-none">
                    AI Boat
                  </h3>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    isHighContrast
                      ? 'border-white text-white'
                      : isLight
                        ? 'bg-[#ecfdf5] text-[#166534] border-[#bbf7d0]'
                        : 'bg-[#052e16] text-[#86efac] border-[#166534]'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Chat Board
                  </span>
                </div>
                <p className={`text-[11px] mt-0.5 ${
                  isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
                }`}>
                  Interactive Scholarship Guidance • Free DBT Advisor
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                id="btn-clear-ai-boat"
                type="button"
                onClick={handleClearConversation}
                className={`p-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                  isHighContrast
                    ? 'text-white hover:bg-neutral-800'
                    : isLight
                      ? 'text-[#78716c] hover:text-[#1c1917] hover:bg-[#eae6dc]'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#232834]'
                }`}
                title="Restart Chat"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                id="btn-expand-ai-boat"
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`hidden sm:flex p-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                  isHighContrast
                    ? 'text-white hover:bg-neutral-800'
                    : isLight
                      ? 'text-[#78716c] hover:text-[#1c1917] hover:bg-[#eae6dc]'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#232834]'
                }`}
                title={isExpanded ? 'Compact Board' : 'Expand Board'}
                aria-label={isExpanded ? 'Compact Board' : 'Expand Board'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                id="btn-close-ai-boat"
                type="button"
                onClick={onClose}
                className={`p-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                  isHighContrast
                    ? 'text-white hover:bg-neutral-800'
                    : isLight
                      ? 'text-[#78716c] hover:text-[#1c1917] hover:bg-[#eae6dc]'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#232834]'
                }`}
                title="Close AI Boat Chat Board"
                aria-label="Close AI Boat Chat Board"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Topics Board Strip */}
          <div className={`px-3 py-2 border-b shrink-0 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs ${
            isHighContrast
              ? 'bg-neutral-900 border-white'
              : isLight
                ? 'bg-[#fcfbf9] border-[#edeae1]'
                : 'bg-[#151821] border-[#242936]'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 ${
              isHighContrast ? 'text-white' : isLight ? 'text-[#78716c]' : 'text-[#a1a1aa]'
            }`}>
              <Sparkles className="w-3 h-3 text-amber-500" /> Topics:
            </span>
            {QUICK_TOPICS.map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(topic.query)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all border shrink-0 ${
                  isHighContrast
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : isLight
                      ? 'bg-white hover:bg-[#f3f0e6] text-[#44403c] border-[#ddd7ca] shadow-2xs'
                      : 'bg-[#1c202a] hover:bg-[#262c3b] text-[#d4d4d8] border-[#303746]'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className={`flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 ${
            isHighContrast
              ? 'bg-black text-white'
              : isLight
                ? 'bg-[#fcfbf9] text-[#1c1917]'
                : 'bg-[#0f1115] text-[#f4f4f5]'
          }`}>
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSpeaking = speakingMsgId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                      isHighContrast
                        ? 'bg-white text-black border-white'
                        : isLight
                          ? 'bg-[#1c1917] text-white border-[#1c1917]'
                          : 'bg-[#fafaf9] text-[#18181b] border-white'
                    }`}>
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] rounded-xl p-3 sm:p-3.5 leading-relaxed border ${
                      isUser
                        ? isHighContrast
                          ? 'bg-white text-black border-white font-bold'
                          : isLight
                            ? 'bg-[#1c1917] text-[#fafaf9] border-[#1c1917] shadow-xs'
                            : 'bg-[#fafaf9] text-[#18181b] border-white font-semibold shadow-xs'
                        : isHighContrast
                          ? 'bg-neutral-900 text-white border-white/60'
                          : isLight
                            ? 'bg-white text-[#292524] border-[#e3dfd5] shadow-xs'
                            : 'bg-[#181c24] text-[#f4f4f5] border-[#2c3240] shadow-xs'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap text-xs sm:text-sm">{msg.text}</p>
                    ) : (
                      renderFormattedText(msg.text)
                    )}

                    {/* Metadata & Audio Readout */}
                    <div className={`mt-2.5 pt-1.5 flex items-center justify-between text-[10px] border-t ${
                      isHighContrast
                        ? 'border-neutral-700 text-neutral-300'
                        : isLight
                          ? 'border-[#edeae2] text-[#78716c]'
                          : 'border-[#262c38] text-[#a1a1aa]'
                    }`}>
                      <span className="font-mono">{msg.timestamp}</span>

                      {!isUser && (
                        <button
                          type="button"
                          onClick={() => handleSpeakText(msg.id, msg.text)}
                          className={`inline-flex items-center gap-1 font-semibold cursor-pointer transition-colors ${
                            isSpeaking
                              ? 'text-rose-500 font-bold'
                              : isHighContrast
                                ? 'text-white hover:underline'
                                : isLight
                                  ? 'text-[#c2410c] hover:underline'
                                  : 'text-amber-400 hover:underline'
                          }`}
                          title={isSpeaking ? 'Stop listening' : 'Listen aloud'}
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                              <span>Stop Audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#78716c] dark:text-[#a1a1aa] pl-9 py-1">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                <span>AI Boat is preparing your verified response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Listening Bar Indicator */}
          {isListening && (
            <div className="px-4 py-2 bg-amber-500 text-black text-xs font-bold flex items-center justify-between animate-pulse shrink-0">
              <span className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-black" />
                <span>Listening... Speak your question now in any language!</span>
              </span>
              <button
                type="button"
                onClick={toggleListening}
                className="underline text-[11px] font-extrabold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Input & Form Controls */}
          <div className={`p-3 border-t shrink-0 ${
            isHighContrast
              ? 'bg-black border-white'
              : isLight
                ? 'bg-[#ffffff] border-[#e2ddd3]'
                : 'bg-[#151921] border-[#292f3d]'
          }`}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Voice Input Button */}
              <button
                id="btn-voice-input-ai-boat"
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-amber-500 text-black border-amber-600 animate-pulse'
                    : isHighContrast
                      ? 'border-white text-white hover:bg-neutral-800'
                      : isLight
                        ? 'border-[#dcd6ca] text-[#57534e] hover:bg-[#f3efe6]'
                        : 'border-[#2d3443] text-[#d4d4d8] hover:bg-[#1e232f]'
                }`}
                title="Click to speak (Microphone)"
                aria-label="Speak query"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Text Input */}
              <input
                id="ai-boat-input-field"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask AI Boat about eligibility, dates, income..."
                className={`flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border outline-hidden transition-all focus:ring-1 ${
                  isHighContrast
                    ? 'bg-black text-white border-2 border-white focus:ring-white'
                    : isLight
                      ? 'bg-[#fcfbf9] text-[#1c1917] border-[#d8d3c7] focus:border-[#1c1917] focus:ring-[#1c1917]'
                      : 'bg-[#1b202a] text-[#f4f4f5] border-[#2e3544] focus:border-white focus:ring-white'
                }`}
                disabled={isLoading}
              />

              {/* Send Button */}
              <button
                id="btn-send-ai-boat"
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className={`p-2.5 rounded-lg font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border ${
                  isHighContrast
                    ? 'bg-white text-black border-white'
                    : isLight
                      ? 'bg-[#1c1917] text-white border-[#1c1917] hover:bg-[#2d2926]'
                      : 'bg-[#fafaf9] text-[#18181b] border-white hover:bg-white'
                }`}
                title="Send message to AI Boat"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className={`mt-2 flex items-center justify-between text-[10px] ${
              isHighContrast ? 'text-neutral-300' : isLight ? 'text-[#78716c]' : 'text-[#71717a]'
            }`}>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>AI Boat • 100% Free Public DBT Advisor</span>
              </span>
              <span>Zero Application Fees</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
