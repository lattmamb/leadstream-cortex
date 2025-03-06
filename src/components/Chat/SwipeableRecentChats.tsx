
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RecentChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { 
  Clock, 
  Plus,
  X,
  Check,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwipeableRecentChatsProps {
  isExpanded: boolean;
  recentChats: RecentChat[];
  selectChat: (chat: RecentChat) => void;
  deleteChat: (id: string) => void;
  createNewChat: () => void;
}

export const SwipeableRecentChats = ({
  isExpanded,
  recentChats,
  selectChat,
  deleteChat,
  createNewChat
}: SwipeableRecentChatsProps) => {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full overflow-hidden bg-gradient-to-b from-muted/30 to-muted/10 backdrop-blur-sm rounded-t-2xl border-t border-neutral-200"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" /> Recent Chats
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs" 
                onClick={createNewChat}
              >
                <Plus className="w-3.5 h-3.5" /> New Chat
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto pb-2">
              {recentChats.length === 0 ? (
                <div className="col-span-full flex items-center justify-center py-8 text-muted-foreground">
                  No recent chats found.
                </div>
              ) : (
                recentChats.map((chat) => (
                  <div key={chat.id} className="relative group">
                    <div 
                      className="cursor-pointer transition-transform hover:scale-105"
                      onClick={() => selectChat(chat)}
                    >
                      <TestimonialCard
                        author={{
                          name: chat.title,
                          handle: new Date(chat.timestamp).toLocaleDateString(),
                          avatar: "" // We'll use a fallback
                        }}
                        text={chat.preview}
                        className="bg-white/50 hover:bg-white/80"
                      />
                    </div>
                    
                    {/* Actions Overlay */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button 
                        onClick={() => selectChat(chat)}
                        className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => deleteChat(chat.id)}
                        className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Create New Chat Card */}
            <div 
              className="mt-4 cursor-pointer transition-all hover:scale-105 bg-white/10 hover:bg-white/30 border border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center p-6 text-center"
              onClick={createNewChat}
            >
              <div className="w-12 h-12 rounded-full bg-tesla-red flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium">Start a New Conversation</h4>
              <p className="text-sm text-muted-foreground mt-1">Ask anything to LeadStream</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
