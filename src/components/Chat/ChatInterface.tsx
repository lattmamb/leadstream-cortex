
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { LampDemo } from "@/components/ui/lamp";
import { ChatMessage } from "./ChatMessage";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isAI: boolean }>>(
    []
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { text: input, isAI: false };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm your AI assistant. How can I help you generate leads today?",
          isAI: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 z-0">
        <LampDemo />
      </div>
      
      <div className="relative z-10 flex-1 overflow-y-auto p-4 bg-transparent">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p className="text-white/80">Start a conversation to generate leads</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isAI={message.isAI}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="relative z-10 border-t border-white/10 p-4 bg-slate-950/50 backdrop-blur-md"
      >
        <div className="flex gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            type="submit"
            className="bg-cyan-500 text-white rounded-full p-3 hover:bg-cyan-400 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
