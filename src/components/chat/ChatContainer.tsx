"use client";

import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { LoadingIndicator } from "./LoadingIndicator";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { RightPanel } from "./RightPanel";
import { Message } from "@/types/chat";

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activePromptMode, setActivePromptMode] = useState<number>(0);
  const [mobileTab, setMobileTab] = useState<"assistant" | "edit">("assistant");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Scroll the container directly — more reliable than scrollIntoView
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
    // Also scroll the sentinel element as a fallback
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const [response] = await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: content, history: messages }),
        }),
        // Minimum 1s so the loading animation is always visible
        new Promise((res) => setTimeout(res, 1000)),
      ]);
      if (!response.ok) throw new Error("Failed to fetch response");
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.data.reply,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const latestAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");

  const promptModes = [
    { label: "I want to shoot a portrait", emoji: "📷" },
    { label: "Night photography", emoji: "🌙" },
    { label: "Get advice", emoji: "💡" },
  ];

  return (
    <>
      {/* ─── DESKTOP / TABLET ──────────────────────────── */}
      <div className="hidden md:flex h-[100dvh] w-full bg-[#f0f0f5]">

        {/* Left panel */}
        <div className="flex flex-col w-[61%] h-full bg-[#f7f7fb] relative">

          {/* Top nav bar */}
          <div className="flex items-center justify-between px-7 pt-5 pb-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium border border-[#e5e7eb] shadow-sm hover:bg-gray-50 transition-colors">
              <span className="text-base">≡</span> Navigation
            </button>
            <div className="w-10 h-10 rounded-full bg-[#18181b] flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">✦</span>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-medium border border-[#e5e7eb] shadow-sm hover:bg-gray-50 transition-colors">
              Fold chat <span className="text-xs">▾</span>
            </button>
          </div>

          {/* Hero text — hidden once chat starts */}
          {messages.length === 0 && !isLoading && (
            <div className="px-10 pt-6 shrink-0 animate-in fade-in duration-300">
              <h1 className="text-[2rem] font-semibold text-[#111827] leading-tight tracking-tight">Good to see you!</h1>
              <p className="text-[1.4rem] font-light text-[#9ca3af] mt-0.5 leading-tight">Let&apos;s capture stunning photos effortlessly.</p>
              <p className="text-sm text-[#9ca3af] mt-3 max-w-xs leading-relaxed">
                I can help you choose settings, get composition ideas, and answer questions about photography and shooting techniques.
              </p>
            </div>
          )}

          {/* Messages scroll area */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-10 pt-4 pb-36 flex flex-col gap-4">
            {messages.length > 0 && (
              <div className="flex flex-col gap-5 mt-2">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && <LoadingIndicator />}
                {error && (
                  <div className="text-red-500 text-sm px-4 py-2 bg-red-50 rounded-xl self-start">
                    {error}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Bottom: prompt chips + input */}
          <div className="absolute bottom-0 left-0 w-full px-8 pb-5 pt-8 bg-gradient-to-t from-[#f7f7fb] via-[#f7f7fb]/95 to-transparent">
            {messages.length === 0 && (
              <div className="flex gap-2 flex-wrap mb-3.5">
                {promptModes.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePromptMode(i)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      activePromptMode === i
                        ? "bg-[#18181b] text-white border-transparent shadow-md"
                        : "bg-white text-[#374151] border-[#e5e7eb] hover:bg-gray-50"
                    }`}
                  >
                    <span>{p.emoji}</span> {p.label}
                  </button>
                ))}
              </div>
            )}
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 bg-[#f0f0f5] p-6 flex items-stretch justify-center">
          <RightPanel latestAssistantMessage={latestAssistantMessage} />
        </div>
      </div>

      {/* ─── MOBILE ──────────────────────────────────── */}
      <div className="flex md:hidden flex-col h-[100dvh] bg-white">

        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-[#f3f4f6] bg-white shrink-0">
          <button className="w-9 h-9 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-gray-500 hover:bg-gray-50">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <div className="flex items-center gap-0.5 bg-[#f3f4f6] rounded-full px-1 py-1">
            <button
              onClick={() => setMobileTab("assistant")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                mobileTab === "assistant" ? "bg-white text-[#111827] shadow-sm" : "text-[#6b7280]"
              }`}
            >
              Assistant Mode
            </button>
            <button
              onClick={() => setMobileTab("edit")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                mobileTab === "edit" ? "bg-white text-[#111827] shadow-sm" : "text-[#6b7280]"
              }`}
            >
              Edit Mode
            </button>
          </div>
          <button className="w-9 h-9 flex items-center justify-center border border-[#e5e7eb] rounded-lg text-gray-500 hover:bg-gray-50">
            <span className="text-base">▾</span>
          </button>
        </div>

        {/* Mobile chat area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-36">
          {messages.length === 0 ? (
            <div className="flex flex-col gap-4 pt-4">
              <p className="text-[15px] text-[#374151] leading-relaxed">
                Ask me anything about photography — camera settings, composition, editing tips, and more.
              </p>
              <SuggestedPrompts onSelectPrompt={sendMessage} />
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} mobile />
              ))}
              {isLoading && <LoadingIndicator />}
              {error && (
                <div className="text-red-500 text-sm px-4 py-2 bg-red-50 rounded-xl">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
          {/* Mobile product card */}
          {latestAssistantMessage && (
            <div className="bg-white border border-[#e5e7eb] rounded-2xl p-4 mt-2 shadow-sm flex gap-3 items-center">
              <div className="w-16 h-16 bg-[#f3f4f6] rounded-xl flex items-center justify-center shrink-0 text-2xl">📸</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <span className="font-semibold text-[#111827] text-sm leading-tight">Photography Tip</span>
                  <button className="text-[#111827] text-xs font-medium shrink-0 underline">Show Details</button>
                </div>
                <p className="text-[#6b7280] text-xs mt-0.5">Professional recommendation</p>
                <button className="mt-2 w-full bg-[#18181b] text-white text-sm py-1.5 rounded-xl font-medium hover:bg-black transition-colors">
                  Apply Settings
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile bottom input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f3f4f6] pt-2 px-3 pb-6">
          <ChatInput onSend={sendMessage} disabled={isLoading} mobile />
          <p className="text-center text-[11px] text-[#9ca3af] mt-2">✦ photochat.app</p>
        </div>
      </div>
    </>
  );
}
