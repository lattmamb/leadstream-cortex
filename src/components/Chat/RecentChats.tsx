
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { RecentChat } from "@/hooks/useChat";

interface RecentChatsProps {
  recentChats: RecentChat[];
  selectChat: (chat: RecentChat) => void;
  deleteChat: (id: string) => void;
  createNewChat: () => void;
  isVisible: boolean;
}

export const RecentChats = ({ 
  recentChats, 
  selectChat, 
  deleteChat, 
  createNewChat,
  isVisible 
}: RecentChatsProps) => {
  
  if (!isVisible) return null;
  
  return (
    <motion.div 
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200 rounded-t-xl shadow-lg z-20 overflow-hidden"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="px-4 py-3 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Recent Chats</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={createNewChat}
          >
            <Plus size={14} className="mr-1" />
            New Chat
          </Button>
        </div>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
          {recentChats.map((chat) => (
            <div 
              key={chat.id} 
              className="relative group bg-neutral-50 border border-neutral-200 rounded-lg p-3 cursor-pointer hover:bg-neutral-100 transition-colors"
              onClick={() => selectChat(chat)}
            >
              <h4 className="font-medium text-sm truncate">{chat.title}</h4>
              <p className="text-xs text-neutral-500 truncate">{chat.preview}</p>
              <p className="text-xs text-neutral-400 mt-1">{new Date(chat.timestamp).toLocaleDateString()}</p>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
              >
                <Trash2 size={14} className="text-neutral-500 hover:text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-1 w-10 bg-neutral-300 rounded-full mx-auto my-2" />
    </motion.div>
  );
};
