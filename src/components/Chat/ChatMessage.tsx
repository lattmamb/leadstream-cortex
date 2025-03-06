
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
        "w-full px-4 py-6 animate-fade-up",
        isAI ? "bg-transparent" : "bg-[#2A2F3C]/50"
      )}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-sm md:text-base text-white/90 whitespace-pre-line">{message}</p>
        <span className="text-xs text-white/30 mt-2 block">{timestamp}</span>
      </div>
    </div>
  );
};
