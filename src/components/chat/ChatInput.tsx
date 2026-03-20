import { useState, FormEvent } from "react";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  mobile?: boolean;
}

export function ChatInput({ onSend, disabled, mobile }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  if (mobile) {
    return (
      <div className="bg-[#f9f9f9] border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[#f3f4f6]">
          <span className="text-[#111827] text-sm font-semibold">✦ Photo AI</span>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center px-3 py-2 gap-2">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-[#374151] placeholder:text-[#9ca3af] text-[15px] py-1"
            placeholder="Ask me a question or choose an option."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled}
          />
          <button type="button" className="p-2 text-[#9ca3af] hover:text-[#374151] transition-colors">
            <Paperclip className="w-4 h-4 -rotate-45" />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="w-9 h-9 flex items-center justify-center bg-[#18181b] hover:bg-black text-white rounded-xl transition-all disabled:opacity-30"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-[#f9f9f9] border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[#f3f4f6]">
          <span className="text-[#111827] text-[13px] font-semibold tracking-wide">✦ Photo AI</span>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center px-5 py-3 gap-3">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-[#374151] placeholder:text-[#9ca3af] text-[15px] py-0.5 disabled:opacity-50"
            placeholder="I want to shoot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled}
          />
          <button type="button" className="p-2 text-[#9ca3af] hover:text-[#374151] transition-colors">
            <Paperclip className="w-4 h-4 -rotate-45" />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="w-9 h-9 flex items-center justify-center bg-[#18181b] hover:bg-black text-white rounded-xl transition-all active:scale-95 disabled:opacity-30"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
      </div>
      <p className="text-center text-[12px] text-[#9ca3af] mt-3">
        If the AI assistant didn&apos;t help, you can reach out to our real{" "}
        <span className="underline cursor-pointer hover:text-[#6b7280]">support team.</span>
      </p>
    </div>
  );
}
