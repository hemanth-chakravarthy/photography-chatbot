interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  const prompts = [
    { label: "Portrait settings", emoji: "📷" },
    { label: "Night photography", emoji: "🌙" },
    { label: "Get composition advice", emoji: "💡" },
    { label: "Sunset / golden hour", emoji: "🌅" },
    { label: "Street photography", emoji: "🏙️" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((p, i) => (
        <button
          key={i}
          onClick={() => onSelectPrompt(p.label)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
            i === 0
              ? "bg-[#18181b] text-white border-transparent shadow-md"
              : "bg-white text-[#374151] border-[#e5e7eb] hover:bg-gray-50"
          }`}
        >
          {p.emoji} {p.label}
        </button>
      ))}
    </div>
  );
}
