
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

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
        "w-full py-5 animate-fade-up",
        isAI ? "bg-[#F7F7F8]" : "bg-white"
      )}
    >
      <div className="max-w-3xl mx-auto flex items-start gap-4 px-4 md:px-8">
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1",
          isAI ? "bg-[#19C37D] text-white" : "bg-[#9b87f5] text-white"
        )}>
          {isAI ? <Bot size={18} /> : <User size={18} />}
        </div>
        
        <div className="flex-1">
          <p className="text-sm md:text-base text-[#343541] whitespace-pre-line">{message}</p>
          <span className="text-xs text-[#8e9196] mt-2 block">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};
