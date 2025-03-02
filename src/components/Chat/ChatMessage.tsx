
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
          "max-w-[80%] px-4 py-3 rounded-2xl backdrop-blur-md",
          isAI
            ? "bg-black/20 text-white/90 border border-white/10"
            : "bg-primary text-white border border-primary/20 ml-auto"
        )}
      >
        <p className="text-sm md:text-base whitespace-pre-line">{message}</p>
        <span className="text-xs opacity-50 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
};
