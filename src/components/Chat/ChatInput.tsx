
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const ChatInput = ({ input, setInput, handleSubmit, isLoading }: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="relative z-10 border-t border-neutral-700/20 p-4 bg-[#1A1F2C]/90 backdrop-blur-md">
      <div className="flex gap-3 max-w-3xl mx-auto">
        <Input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Message LeadStream..."
          className="flex-1 py-6 px-4 rounded-md border-0 bg-[#2A2F3C] text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-neutral-500"
        />
        <Button
          type="submit"
          variant="default"
          className="bg-[#2A2F3C] hover:bg-[#3A3F4C] text-white rounded-md p-3 transition-colors"
          disabled={isLoading}
        >
          <Send size={18} className={isLoading ? "opacity-50" : ""} />
        </Button>
      </div>
    </form>
  );
};
