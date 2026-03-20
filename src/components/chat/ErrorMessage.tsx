interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col gap-2 items-start py-2">
      <div className="bg-error/10 border border-error text-error p-3 rounded-md text-sm">
        {message}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
