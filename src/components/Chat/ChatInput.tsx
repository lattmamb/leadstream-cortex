
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
    <form onSubmit={handleSubmit} className="relative z-10 border-t border-neutral-200 p-3 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Message LeadStream..."
            className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm pr-12 focus:outline-none focus:ring-1 focus:ring-neutral-300 min-h-[56px] max-h-[200px]"
            rows={1}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            style={{
              height: 'auto',
              overflow: 'hidden'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
            }}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 rounded-full"
            disabled={isLoading || !input.trim()}
          >
            <Send size={18} className={isLoading || !input.trim() ? "opacity-50" : ""} />
          </Button>
        </div>
        <div className="text-xs text-center text-neutral-400 mt-2">
          LeadStream AI may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </form>
  );
};
