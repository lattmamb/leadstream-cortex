
import { useRef, useState } from "react";
import { Send, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { RecentChats } from "./RecentChats";
import { RecentChat } from "@/hooks/useChat";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  recentChats: RecentChat[];
  selectChat: (chat: RecentChat) => void;
  deleteChat: (id: string) => void;
  createNewChat: () => void;
}

export const ChatInput = ({ 
  input, 
  setInput, 
  handleSubmit, 
  isLoading,
  recentChats,
  selectChat,
  deleteChat,
  createNewChat
}: ChatInputProps) => {
  const [showRecentChats, setShowRecentChats] = useState(false);
  const swipeStartY = useRef<number | null>(null);
  const threshold = 50; // Pixels to trigger the swipe action
  
  const handlePanStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    if ('touches' in event) {
      swipeStartY.current = event.touches[0].clientY;
    } else {
      swipeStartY.current = event.clientY;
    }
  };
  
  const handlePanEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -threshold) {
      setShowRecentChats(true);
    } else if (info.offset.y > threshold) {
      setShowRecentChats(false);
    }
  };
  
  return (
    <div className="relative">
      <AnimatePresence>
        <RecentChats 
          recentChats={recentChats}
          selectChat={selectChat}
          deleteChat={deleteChat}
          createNewChat={createNewChat}
          isVisible={showRecentChats}
        />
      </AnimatePresence>
      
      <form onSubmit={handleSubmit} className="relative z-10 border-t border-neutral-200 p-3 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="relative"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragStart={handlePanStart}
            onDragEnd={handlePanEnd}
          >
            <div 
              className="absolute -top-6 left-0 right-0 flex justify-center items-center h-6 cursor-pointer"
              onClick={() => setShowRecentChats(!showRecentChats)}
            >
              <div className="h-1 w-10 bg-neutral-300 rounded-full" />
              <ChevronUp 
                size={16} 
                className={`absolute text-neutral-500 transition-transform ${showRecentChats ? 'rotate-180' : ''}`} 
              />
            </div>
            
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
          </motion.div>
          
          <div className="text-xs text-center text-neutral-400 mt-2">
            LeadStream AI may produce inaccurate information about people, places, or facts.
          </div>
        </div>
      </form>
    </div>
  );
};
