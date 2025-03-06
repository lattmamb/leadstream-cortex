
import { useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";

interface Message {
  text: string;
  isAI: boolean;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative z-10 flex-1 overflow-y-auto p-4 bg-transparent">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message.text} isAI={message.isAI} />
      ))}
      {isLoading && (
        <div className="py-4">
          <TextShimmerWave
            className="text-primary font-mono text-sm"
            duration={1}
            spread={1}
            zDistance={3}
            scaleDistance={1.1}
            rotateYDistance={15}
          >
            AI is thinking...
          </TextShimmerWave>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
