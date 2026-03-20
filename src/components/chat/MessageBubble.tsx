import ReactMarkdown from "react-markdown";
import { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
  mobile?: boolean;
}

export function MessageBubble({ message, mobile }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className={`bg-[#18181b] text-white ${mobile ? "px-4 py-2.5" : "px-5 py-3"} rounded-[20px] rounded-br-[5px] text-[15px] max-w-[80%] leading-relaxed`}>
          {message.content}
        </div>
      </div>
    );
  }

  // Photography-contextual quick-reply chips (mobile)
  const mobileChips = mobile
    ? ["Show me settings", "Explain further", "Different approach", "Give me examples", "What lens should I use?"]
    : [];

  return (
    <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="w-7 h-7 rounded-full bg-[#18181b] flex items-center justify-center shrink-0 mt-1">
        <span className="text-white text-[11px]">✦</span>
      </div>
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        {mobile && <span className="text-sm font-semibold text-[#111827]">AI Assistant</span>}

        {/* Render markdown — handles bullet lists, bold, newlines automatically */}
        <div className="prose prose-sm prose-slate max-w-none
          prose-p:text-[#374151] prose-p:leading-relaxed prose-p:my-1
          prose-li:text-[#374151] prose-li:my-0.5
          prose-ul:my-2 prose-ul:pl-4
          prose-ol:my-2 prose-ol:pl-4
          prose-strong:text-[#111827] prose-strong:font-semibold
          prose-headings:text-[#111827] prose-headings:font-semibold prose-headings:mt-3 prose-headings:mb-1
          [&_p]:my-1.5
        ">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        {mobile && mobileChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {mobileChips.map((chip) => (
              <button
                key={chip}
                className="px-3.5 py-1.5 text-sm text-[#374151] border border-[#d1d5db] rounded-full hover:bg-[#f3f4f6] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
