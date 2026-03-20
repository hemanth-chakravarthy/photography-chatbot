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
      <div className="flex md:hidden flex-col h-[100dvh] bg-[#fcfcfd] relative overflow-hidden">

        {/* Mobile top bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-4 pb-3 bg-white/70 backdrop-blur-xl border-b border-black/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center shadow-md">
              <span className="text-white text-sm">✦</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-[#111827]">Photo AI</span>
          </div>
          
          <div className="flex items-center gap-0.5 bg-[#f3f4f6] rounded-full p-0.5 border border-black/5 shadow-inner">
            <button
              onClick={() => setMobileTab("assistant")}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                mobileTab === "assistant" ? "bg-white text-[#111827] shadow-sm" : "text-[#6b7280]"
              }`}
            >
              Assistant
            </button>
            <button
              onClick={() => setMobileTab("edit")}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                mobileTab === "edit" ? "bg-white text-[#111827] shadow-sm" : "text-[#6b7280]"
              }`}
            >
              Editor
            </button>
          </div>
        </div>

        {/* Mobile chat area */}
        <div className="flex-1 overflow-y-auto px-4 pt-24 flex flex-col gap-4 pb-40">
          {messages.length === 0 ? (
            <div className="flex flex-col gap-6 pt-6 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div>
                <h1 className="text-[2.5rem] font-bold text-[#111827] leading-[1.05] tracking-tight">
                  Capture.<br/>
                  Create.<br/>
                  <span className="text-[#9ca3af]">Elevate.</span>
                </h1>
                <p className="text-[15px] text-[#6b7280] leading-relaxed mt-5 max-w-[280px]">
                  Ask me anything about photography — camera settings, composition, editing tips, and more.
                </p>
              </div>
              <div className="mt-2">
                <SuggestedPrompts onSelectPrompt={sendMessage} />
              </div>
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
            </>
          )}

          {/* Mobile product card */}
          {latestAssistantMessage && (
            <div className="bg-white border border-black/5 rounded-[20px] p-4 mt-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex gap-3 items-center">
                <div className="w-14 h-14 bg-[#18181b] rounded-2xl flex items-center justify-center shrink-0 shadow-inner relative overflow-hidden">
                  <span className="text-xl relative z-10 text-white">📷</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-bold text-[#111827] text-[15px] leading-tight tracking-tight">AI Settings</span>
                    <button className="text-[#111827] text-xs font-semibold shrink-0 bg-[#f3f4f6] hover:bg-[#e5e7eb] transition-colors px-2 py-1 rounded-md">View details</button>
                  </div>
                  <p className="text-[#6b7280] text-[13px] mt-0.5">Optimized for your scene</p>
                </div>
              </div>
              <button className="w-full bg-[#18181b] text-white text-[14px] py-2.5 rounded-xl font-medium tracking-wide hover:bg-black transition-all active:scale-[0.98]">
                Apply to Camera
              </button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Mobile bottom input */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-black/[0.04] pt-3 px-4 pb-6 z-50">
          <ChatInput onSend={sendMessage} disabled={isLoading} mobile />
        </div>
      </div>
    </>
  );
}
