import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, History,
  MessageSquare, ShieldCheck, Heart, ExternalLink,
} from "lucide-react";

/* ─── helpers ─── */
const extractString = (obj) => {
  if (typeof obj === "string") return obj;
  if (!obj) return null;
  if (Array.isArray(obj)) return extractString(obj[0]);
  if (typeof obj === "object")
    return extractString(obj.text || obj.content || obj.message);
  return String(obj);
};

const ts = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/* ─── reference renderer ─── */
const MessageContent = ({ text }) => {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  const textParts = [];
  const refParts = [];

  parts.forEach((part, i) => {
    const m = part.match(/\[(.*?)\]\((.*?)\)/);
    if (m) refParts.push({ label: m[1], url: m[2], i });
    else textParts.push(<span key={i}>{part}</span>);
  });

  return (
    <>
      <span>{textParts}</span>
      {refParts.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 flex items-center gap-1.5">
            <ExternalLink size={9} /> References
          </p>
          {refParts.map(({ label, url, i }) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-600
                         text-blue-700 hover:text-white rounded-xl border border-blue-100
                         hover:border-blue-600 transition-all duration-200 group w-full"
            >
              <div className="w-5 h-5 rounded-md bg-blue-100 group-hover:bg-white/20
                              flex items-center justify-center shrink-0 transition-colors">
                <ExternalLink size={11} />
              </div>
              <span className="text-[12px] font-bold truncate flex-1">{label}</span>
              <span className="text-[10px] opacity-50 group-hover:opacity-80 shrink-0 hidden sm:block truncate max-w-[120px]">
                {(() => { try { return new URL(url).hostname.replace("www.", ""); } catch { return ""; } })()}
              </span>
            </a>
          ))}
        </div>
      )}
    </>
  );
};

/* ─── main component ─── */
const KothaBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, role: "kotha", text: "Hello! I am KOTHA, your personal mental wellness companion. How are you feeling today?", timestamp: ts() },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHeight, setChatHeight] = useState("100%");

  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const inputAreaRef = useRef(null);

  /* ── visual viewport (mobile keyboard only) ── */
  useEffect(() => {
    if (window.innerWidth >= 1024) return; // desktop only uses CSS
    const vv = window.visualViewport;
    if (!vv) return;
    const onResize = () => {
      // Use a ref update instead of state to avoid re-render flicker
      const root = document.getElementById("kotha-mobile-root");
      if (root) root.style.height = `${vv.height}px`;
      // Keep scroll pinned to bottom — instant, no animation
      const el = chatContainerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    };
    vv.addEventListener("resize", onResize);
    return () => vv.removeEventListener("resize", onResize);
  }, []);

  /* ── lock page scroll on mobile so only the chat div scrolls ── */
  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = prev;
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  /* ── scroll ── */
  const scrollToBottom = useCallback((instant = false) => {
    const el = chatContainerRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 1024;
    if (isMobile || instant) {
      // Direct assignment — no smooth scroll, no page jump
      requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    // Use rAF so it fires after the browser has painted the new message
    const id = requestAnimationFrame(() => scrollToBottom());
    return () => cancelAnimationFrame(id);
  }, [messages, isTyping, scrollToBottom]);

  /* ── suggestions ── */
  const suggestions = [
    "I'm feeling anxious.",
    "I can't sleep well lately.",
    "I feel a bit lonely.",
    "Just wanted to chat.",
  ];

  /* ── send ── */
  const handleSend = async (text = inputValue) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    // reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg = { id: Date.now(), role: "user", text: trimmed, timestamp: ts() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputValue("");
    setIsTyping(true);

    try {
      if (!window.puter?.ai) throw new Error("Puter SDK not loaded.");

      if (window.puter?.auth) {
        const signedIn = await window.puter.auth.isSignedIn();
        if (!signedIn) {
          await window.puter.auth.signIn();
        }
      }

      const history = updated
        .map((m) => `${m.role === "kotha" ? "KOTHA" : "User"}: ${m.text}`)
        .join("\n");

      const prompt = `You are KOTHA, an empathetic, respectful mental wellness companion for older adults, built by the GeronEssence research platform.

RESPONSE STYLE:
- Match length to the user's input: short warm replies for casual chat, detailed answers for advice or complex questions.
- Do NOT use asterisks (*), bold markers, italics, or markdown bullet lists in your text.
- Write in plain, warm, readable sentences.

REFERENCE RULES (strictly follow):
- Whenever your reply includes ANY of the following, you MUST append one or more reference links at the end of your message:
  * Health statistics or prevalence figures
  * Medical or clinical facts (symptoms, diagnoses, treatments)
  * Mental health advice or coping strategies
  * Medication or therapy information
  * Crisis or emergency guidance
  * Research findings or study results
- Format each reference exactly like this on its own line: [Source: Organisation Name](https://actual-url.com)
- Use only real, reputable sources: Beyond Blue (beyondblue.org.au), Black Dog Institute (blackdoginstitute.org.au), Lifeline Australia (lifeline.org.au), Australian Government Health (health.gov.au), WHO (who.int), Mayo Clinic (mayoclinic.org), Headspace (headspace.org.au), SANE Australia (sane.org), MindSpot (mindspot.org.au).
- Do NOT invent URLs.
- Do NOT add references for pure emotional support, greetings, or general conversation.

IDENTITY:
- If asked who developed you: "I was developed by Md. Perbej Bhuiyan Akib as part of the GeronEssence research platform."

Conversation so far:
${history}

KOTHA:`;

      const response = await window.puter.ai.chat(prompt);
      const responseText = extractString(response) || "I am here for you.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "kotha", text: responseText, timestamp: ts() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "kotha", text: "I'm having trouble connecting. Please check your internet.", timestamp: ts() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 100)}px`;
    }
  };

  /* ── chat screen ── */
  return (
    <div
      id="kotha-mobile-root"
      className="bg-slate-50 font-sans flex flex-col lg:flex-row lg:gap-8 lg:px-6 lg:pt-32 lg:pb-8 lg:max-w-7xl lg:mx-auto lg:h-[100dvh]"
      style={{ height: window.innerWidth < 1024 ? "100dvh" : undefined }}
    >
      <style>{`
        .chat-scroll { -webkit-overflow-scrolling: touch; overscroll-behavior: none; }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 10px; }
        @media (max-width: 1023px) {
          .kotha-root { padding-top: 56px; }
          #kotha-mobile-root { touch-action: none; }
          .chat-scroll { touch-action: pan-y; overscroll-behavior-y: contain; }
        }
      `}</style>

      {/* ── LEFT PANEL (desktop only) ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-col gap-6 w-1/3 py-8 shrink-0"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em]">
            <div className="w-8 h-1 bg-primary rounded-full" /> Always Online
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Safe Space <br />
            <span className="text-primary italic font-serif">to Talk.</span>
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed text-lg">
            KOTHA is designed to listen without judgment. Whether you're feeling anxious, lonely, or just need to chat, I'm here for you 24/7.
          </p>
        </div>
        <div className="grid gap-4 mt-8">
          {[
            { icon: ShieldCheck, title: "Private & Secure", desc: "All conversations are end-to-end encrypted and confidential." },
            { icon: MessageSquare, title: "Empathetic AI", desc: "Focused on listening and emotional validation." },
            { icon: Heart, title: "Wellness First", desc: "Guided by professional mental health values." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary shrink-0">
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="text-slate-900 font-black text-sm uppercase tracking-wide">{item.title}</h4>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── CHAT PANEL ── */}
      <div className="kotha-root flex-1 flex flex-col min-h-0 bg-white lg:rounded-3xl lg:shadow-2xl lg:border lg:border-slate-100 overflow-hidden">

        {/* Header */}
        <div className="bg-slate-900 px-4 py-4 lg:px-8 lg:py-8 flex items-center justify-between shrink-0 border-b border-white/5">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-9 h-9 lg:w-14 lg:h-14 bg-primary rounded-xl lg:rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
              <Bot className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div>
              <h2 className="text-white text-base lg:text-xl font-black tracking-tight leading-none">KOTHA</h2>
              <div className="flex items-center gap-1.5 lg:gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-emerald-400 rounded-full animate-pulse" />
                <p className="text-slate-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest">Counselor Online</p>
              </div>
            </div>
          </div>
          <button className="p-2 lg:p-3 bg-white/5 rounded-lg lg:rounded-xl text-slate-400 hover:text-white transition-colors active:scale-95">
            <History size={20} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto chat-scroll px-3 py-4 lg:px-8 lg:py-8 space-y-4 lg:space-y-8 bg-slate-50/30"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-2 lg:gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} max-w-[88%] lg:max-w-[85%]`}>
                {/* Avatar */}
                <div className={`w-7 h-7 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shrink-0 mt-auto shadow-md
                  ${msg.role === "user" ? "bg-slate-200 text-slate-700" : "bg-primary text-white"}`}>
                  {msg.role === "user"
                    ? <User className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
                    : <Bot className="w-3.5 h-3.5 lg:w-5 lg:h-5" />}
                </div>

                {/* Bubble */}
                <div className={`px-4 py-3 lg:px-6 lg:py-4 text-sm lg:text-[15px] leading-relaxed break-words min-w-0
                  ${msg.role === "user"
                    ? "bg-slate-900 text-white rounded-2xl lg:rounded-[2rem] rounded-br-sm"
                    : "bg-white text-slate-700 border border-slate-100 rounded-2xl lg:rounded-[2rem] rounded-bl-sm shadow-sm"
                  }`}
                >
                  <MessageContent text={msg.text} />
                  <p className="text-[9px] lg:text-[10px] font-black opacity-30 mt-1.5 lg:mt-2 uppercase tracking-widest">
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2 lg:gap-4">
              <div className="w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                <Bot className="w-3.5 h-3.5 lg:w-5 lg:h-5" />
              </div>
              <div className="px-4 py-3 lg:px-6 lg:py-4 bg-white rounded-2xl lg:rounded-[2rem] rounded-bl-sm border border-slate-100 shadow-sm flex items-center gap-1">
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: d }}
                    className="w-1.5 h-1.5 bg-primary/40 rounded-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div ref={inputAreaRef} className="shrink-0 bg-white border-t border-slate-50 px-3 py-3 lg:px-6 lg:py-6">
          {/* Suggestions — only on first few messages */}
          {messages.length < 3 && (
            <div className="flex gap-2 mb-3 lg:mb-6 overflow-x-auto pb-1 scrollbar-none">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="px-3 py-1.5 lg:px-4 lg:py-2 bg-slate-50 text-slate-600 rounded-full
                             text-[11px] lg:text-xs font-bold hover:bg-primary/10 hover:text-primary
                             active:scale-95 transition-all border border-slate-100 whitespace-nowrap shrink-0"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="flex items-end gap-2 lg:gap-3 bg-slate-50 rounded-2xl lg:rounded-[2rem] px-1 py-1 lg:p-2 border border-slate-100 focus-within:border-primary/30 transition-colors">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setTimeout(() => scrollToBottom(true), 350)}
              placeholder="Type your message…"
              rows={1}
              className="flex-1 min-h-[40px] lg:min-h-[52px] max-h-[100px] lg:max-h-[120px]
                         bg-transparent border-none outline-none focus:ring-0 resize-none
                         px-3 lg:px-6 py-2.5 lg:py-3.5 text-sm lg:text-base
                         text-slate-700 placeholder-slate-400 leading-relaxed"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className={`w-9 h-9 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center
                          transition-all active:scale-90 shrink-0 mr-0.5 mb-0.5
                          ${inputValue.trim() && !isTyping
                            ? "bg-primary text-white shadow-lg"
                            : "bg-slate-200 text-slate-400"}`}
            >
              <Send className="w-4 h-4 lg:w-5 lg:h-5 ml-0.5 lg:ml-1" />
            </button>
          </div>

          <p className="text-center mt-2 lg:mt-4 text-[9px] lg:text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">
            Kotha AI · Empowering Senior Mental Wellness
          </p>
        </div>
      </div>
    </div>
  );
};

export default KothaBot;
