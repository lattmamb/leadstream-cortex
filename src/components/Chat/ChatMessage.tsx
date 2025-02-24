
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isAI?: boolean;
  timestamp?: string;
}

export const ChatMessage = ({
  message,
  isAI = false,
  timestamp = new Date().toLocaleTimeString(),
}: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-fade-up",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isAI
            ? "bg-gray-100 text-tesla-black"
            : "bg-tesla-black text-white ml-auto"
        )}
      >
        <p className="text-sm md:text-base">{message}</p>
        <span className="text-xs opacity-50 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
};
