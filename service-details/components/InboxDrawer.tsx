"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, CheckCheck, Loader2 } from "lucide-react";
import { Conversation, Message } from "@/lib/frontend-types";

interface InboxDrawerProps {
  conversations: Conversation[];
  onClose: () => void;
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  onReceiveMessage: (conversationId: string, text: string) => void;
}

export default function InboxDrawer({
  conversations,
  onClose,
  selectedConversationId,
  onSelectConversation,
  onSendMessage,
  onReceiveMessage
}: InboxDrawerProps) {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === selectedConversationId) || conversations[0];

  // Auto-scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConv?.messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;

    const userText = inputText;
    onSendMessage(activeConv.id, userText);
    setInputText("");

    // Simulate seller typing response
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let reply = "Thanks for your response, Hasibul! Let's schedule a brief chat to align on this.";
      const textLower = userText.toLowerCase();

      // Custom Contextual Responders based on who we talk to!
      if (activeConv.sellerName.includes("Divishha")) {
        if (textLower.includes("price") || textLower.includes("cost") || textLower.includes("budget") || textLower.includes("how much")) {
          reply = "The starter launch package starts at $130, which includes 1 hot winning product. But if you want a complete niche empire, our $245 Standard pack is the best seller! What is your planned budget?";
        } else if (textLower.includes("hello") || textLower.includes("hi") || textLower.includes("hey")) {
          reply = "Hey Hasibul! Nice to hear from you again. I am checking our inventory tools right now. Are you looking to launch a fitness brand, or beauty / gadget niche?";
        } else if (textLower.includes("logo") || textLower.includes("design") || textLower.includes("brand")) {
          reply = "Perfect! If you don't have a logo or asset checklist yet, I can design a modern clean typographic brand kit for you inside our pro package. Shall I send a custom offer?";
        } else {
          reply = "That sounds like a great plan, Hasibul! Yes, I can easily integrate those features into your Shopify dropshipping store. When would you like to get started?";
        }
      } else if (activeConv.sellerName.includes("Nick")) {
        if (textLower.includes("price") || textLower.includes("cost") || textLower.includes("budget") || textLower.includes("how much")) {
          reply = "As a Vetted Pro, my custom Apex configurations start at $295. This guarantees custom high-end layout CSS and high-converting speed benchmarks. I promise it is worth every single dollar!";
        } else if (textLower.includes("zoom") || textLower.includes("consult") || textLower.includes("video") || textLower.includes("call")) {
          reply = "I would love to set up a quick 10-minute video session. I can send you a Calendly click or we can schedule directly on the Fiverr consultation hub here. What times work for you?";
        } else {
          reply = "Absolutely. We can custom build full theme code optimizations for your brand. Let us set up a custom milestones contract so you can check progress daily!";
        }
      } else if (activeConv.sellerName.includes("Sonarish")) {
        if (textLower.includes("email") || textLower.includes("marketing") || textLower.includes("klaviyo")) {
          reply = "Yes, I integrate full Klaviyo email flows (Welcome Series, Abandoned Cart, Post-Purchase) inside our Vanguard Premium Shopify suite! It is highly effective to recover 15%+ sales.";
        } else if (textLower.includes("seo") || textLower.includes("speed") || textLower.includes("optimize")) {
          reply = "Speed is vital! I implement full responsive compression, script optimization, and custom trust banners. We easily target 90+ speeds on Google Lighthouse page checks.";
        } else {
          reply = "Got it! Our Team is fully ready to take this on. We import real review widgets too to build supreme social credit instantly. Let me know if you would like me to set up a custom request draft!";
        }
      }

      onReceiveMessage(activeConv.id, reply);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end font-sans select-none">
      <div className="bg-white w-full max-w-4xl h-full flex flex-col shadow-2xl animate-slide-left relative">
        
         {/* Toggle bars */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5c00]" />
            <h2 className="text-base font-black text-gray-900">Velo Desk. Live Messages</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master details split screen */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Conversation history sidebar list */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto flex flex-col bg-white">
            <div className="p-3 border-b border-gray-100 bg-gray-50/50">
              <span className="text-[10px] text-gray-400 font-extrabold tracking-wider uppercase">Conversations</span>
            </div>
            {conversations.map((c) => {
              const isSelected = c.id === activeConv?.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectConversation(c.id)}
                  className={`flex items-start gap-3 p-4 border-b border-gray-100 text-left transition-colors cursor-pointer w-full relative ${
                    isSelected ? "bg-orange-50/30 border-l-4 border-l-[#ff5c00]" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={c.sellerAvatar}
                      alt={c.sellerName}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#ff5c00] ring-2 ring-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-baseline gap-1">
                      <span className="text-xs font-bold text-gray-900 truncate">{c.sellerName}</span>
                      <span className="text-[9px] text-gray-400/90 font-mono shrink-0">{c.timestamp}</span>
                    </div>
                    <p className={`text-xs truncate text-gray-500 mt-1 ${c.unread ? "font-bold text-gray-800" : ""}`}>
                      {c.lastMessage}
                    </p>
                  </div>
                  {c.unread && (
                    <span className="absolute top-1/2 -translate-y-1/2 right-3 block h-2 w-2 rounded-full bg-[#ff5c00] ring-1 ring-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Core Chat Box Workspace */}
          <div className="w-2/3 flex flex-col bg-slate-50 overflow-hidden h-full">
            {activeConv ? (
              <>
                {/* Active Chat Header */}
                <div className="px-6 py-3 border-b border-gray-200 bg-white flex justify-between items-center shrink-0 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={activeConv.sellerAvatar}
                        alt={activeConv.sellerName}
                        className="w-9 h-9 rounded-full object-cover border border-gray-100"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-[#ff5c00] ring-1 ring-white" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block leading-none">{activeConv.sellerName}</span>
                      <span className="text-[10px] text-[#ff5c00] font-semibold mt-1 inline-block">Online</span>
                    </div>
                  </div>
                </div>

                {/* Messages feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-none">
                  {activeConv.messages.map((m) => {
                    const isUser = m.sender === "user";
                    return (
                      <div
                        key={m.id}
                        className={`max-w-[80%] rounded-lg px-4 py-2.5 text-xs shadow-sm flex flex-col gap-1 ${
                          isUser
                            ? "bg-[#ff5c00] text-white self-end rounded-br-none"
                            : "bg-white text-gray-800 self-start rounded-bl-none border border-gray-100"
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                        <span
                          className={`text-[9px] font-mono self-end ${
                            isUser ? "text-orange-100/90" : "text-gray-400"
                          }`}
                        >
                          {m.timestamp}
                        </span>
                      </div>
                    );
                  })}

                  {/* Typing Indicator bubbles */}
                  {isTyping && (
                    <div className="bg-white border border-gray-100 max-w-[50%] rounded-lg rounded-bl-none px-4 py-3 self-start shadow-sm flex items-center gap-1.5 text-gray-500 text-xs">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#ff5c00]" />
                      <span>{activeConv.sellerName} is typing...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Send input */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 shrink-0 flex gap-3">
                  <input
                    type="text"
                    placeholder={`Write a message to ${activeConv.sellerName}...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 px-4 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#ff5c00] focus:border-[#ff5c00] bg-white transition-all text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-[#ff5c00] hover:bg-[#e04f00] text-white px-4 py-2.5 rounded text-xs font-bold transition-all disabled:opacity-50 disabled:hover:bg-[#ff5c00] cursor-pointer shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    <span>Send</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-2">
                <p className="text-sm">Select a contact to begin messaging.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
