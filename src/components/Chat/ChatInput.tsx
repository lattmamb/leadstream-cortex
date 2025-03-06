
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const ChatInput = ({ input, setInput, handleSubmit, isLoading }: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="relative z-10 border-t border-white/10 p-4 bg-background/50 backdrop-blur-md">
      <div className="flex gap-4 max-w-4xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask LeadStream about finding leads, sales outreach, or drafting emails..."
          className="flex-1 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-primary transition-colors"
        />
        <Button
          type="submit"
          variant="default"
          className="bg-primary text-white rounded-full p-3 hover:bg-primary/80 transition-colors"
          disabled={isLoading}
        >
          <Send size={20} />
        </Button>
      </div>
    </form>
  );
};
