export function LoadingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white border border-[#e5e7eb] rounded-2xl self-start shadow-sm max-w-max">
      <span className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-[#7c3aed] rounded-full animate-bounce"></span>
    </div>
  );
}
