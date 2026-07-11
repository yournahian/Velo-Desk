"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Check, Sparkles } from "lucide-react";

interface LocalMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<LocalMessage[]>([
    {
      id: "bm1",
      sender: "bot",
      text: "Hello Hasibul! Welcome to Velo Desk Help Center. I am your automated Customer Support Assistant. How can I help you today?\n\nTip: You can ask me about 'Briefs', 'Gigs', 'Order statuses', or 'Updating Profile progress'.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { id: `usr-${Date.now()}`, sender: "user", text: userText, timestamp: time }
    ]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I missed that! Could you please ask specifically about posting briefs, hiring freelancers, order checkouts, or visual profiles?";
      const lowerText = userText.toLowerCase();

      if (lowerText.includes("brief") || lowerText.includes("post a brief") || lowerText.includes("project")) {
        replyText = "To post a project brief, click on the 'Post a project brief' block under the banner, or tap 'Project Briefs' on the top navbar! Once posted, our top sellers (like Divishha G. or Nick) will automatically make custom budgets proposals on your screen within a few seconds!";
      } else if (lowerText.includes("gig") || lowerText.includes("hire") || lowerText.includes("buy") || lowerText.includes("order")) {
        replyText = "Simply click on any freelancer's gig card on the dashboard! It will load a beautiful multi-tier package detail. Select Basic, Standard, or Premium tabs and hit 'Continue' to place an order!";
      } else if (lowerText.includes("profile") || lowerText.includes("progress") || lowerText.includes("percentage") || lowerText.includes("35%")) {
        replyText = "You've added 35% of your profile. To complete the remaining 100%, click the 'You've added 35% of your profile' card in the dashboard. Check off remaining bio tasks like adding professional skills or links to instantly sync the status bar!";
      } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
        replyText = "Hey there, Hasibul! Hope you are having a fantastic day on Velo Desk today. Let me know which features you want help explaining!";
      }

      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, sender: "bot", text: replyText, timestamp: time }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans select-none">
      
      {/* Green Circle Floating Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-[#ff5c00] hover:bg-[#e04f00] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-[#ff8137]/40 relative group"
          aria-label="Open support"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 block h-3 w-3 bg-[#f74b4b] rounded-full ring-2 ring-white animate-bounce" />
        </button>
      )}

      {/* Slide-Up Support Dialog Box */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-3xl w-80 sm:w-96 max-h-[500px] h-[450px] border border-gray-100 flex flex-col overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="bg-[#e04f00] p-4 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded-full">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider font-extrabold text-blue-50/90 leading-none">Velo Desk AI Assistant</h3>
                <span className="text-[10px] text-orange-100 flex items-center gap-1 font-bold mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" /> Live Support Agent
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 scrollbar-none">
            {messages.map((m) => {
              const isBot = m.sender === "bot";
              return (
                <div
                  key={m.id}
                  className={`flex gap-2 max-w-[85%] ${isBot ? "" : "ml-auto flex-row-reverse"}`}
                >
                  <div className={`p-1.5 rounded-full shrink-0 h-7 w-7 flex items-center justify-center text-xs shadow-sm ${
                    isBot ? "bg-[#e04f00] text-white" : "bg-gray-200 text-gray-700"
                  }`}>
                    {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-xl px-3.5 py-2 text-xs shadow-sm flex flex-col gap-1 ${
                    isBot
                      ? "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                      : "bg-[#ff5c00] text-white rounded-tr-none"
                  }`}>
                    <p className="leading-relaxed whitespace-pre-line text-left">{m.text}</p>
                    <span className={`text-[8px] font-mono self-end ${isBot ? "text-gray-400" : "text-orange-100"}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-2 max-w-[50%]">
                <div className="p-1.5 rounded-full shrink-0 h-7 w-7 flex items-center justify-center text-xs shadow-sm bg-[#e04f00] text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-gray-100 rounded-xl rounded-tl-none px-4 py-2.5 shadow-sm text-gray-400 text-[11px] font-medium flex items-center gap-1.5">
                  <Loader className="w-3 h-3 animate-spin text-[#ff5c00]" />
                  <span>AI typing...</span>
                </div>
              </div>
            )}

            <div ref={feedEndRef} />
          </div>

          {/* Form input messaging */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 shrink-0 flex gap-2">
            <input
              type="text"
              placeholder="Ask me a question or send greetings..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.1 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff5c00] focus:border-[#ff5c00] bg-white text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-[#ff5c00] hover:bg-[#e04f00] text-white p-2 rounded-md transition-all disabled:opacity-40 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}

function Loader({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
  );
}
