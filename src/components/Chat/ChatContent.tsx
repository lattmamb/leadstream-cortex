
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import { WelcomeScreen } from "./WelcomeScreen";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { RecentChat } from "@/hooks/useChat";
import { SwipeableRecentChats } from "./SwipeableRecentChats";
import { AIModeSelector } from "./AIModeSelector";
import { useState } from "react";

interface ChatContentProps {
  showV0Interface: boolean;
  messages: Array<{ text: string; isAI: boolean }>;
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  recentChats: RecentChat[];
  selectChat: (chat: RecentChat) => void;
  deleteChat: (id: string) => void;
  createNewChat: () => void;
  currentMode: string;
  setCurrentMode: (mode: string) => void;
}

export const ChatContent = ({
  showV0Interface,
  messages,
  input,
  setInput,
  isLoading,
  handleSubmit,
  recentChats,
  selectChat,
  deleteChat,
  createNewChat,
  currentMode,
  setCurrentMode
}: ChatContentProps) => {
  const [isSwipeableExpanded, setIsSwipeableExpanded] = useState(false);

  const toggleSwipeableExpanded = () => {
    setIsSwipeableExpanded(!isSwipeableExpanded);
  };

  return (
    <>
      {showV0Interface ? (
        <div className="relative z-10 flex-1 overflow-y-auto bg-transparent">
          <VercelV0Chat />
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {messages.length === 0 ? (
            <WelcomeScreen setInput={setInput} />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
          
          <div className="relative">
            {/* Swipeable Recent Chats */}
            <SwipeableRecentChats
              isExpanded={isSwipeableExpanded}
              recentChats={recentChats}
              selectChat={selectChat}
              deleteChat={deleteChat}
              createNewChat={createNewChat}
            />
            
            {/* Chat Input with AI Mode Selector */}
            <div className="relative">
              <ChatInput 
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                recentChats={recentChats}
                selectChat={selectChat}
                deleteChat={deleteChat}
                createNewChat={createNewChat}
              />
              
              <AIModeSelector
                currentMode={currentMode}
                setCurrentMode={setCurrentMode}
                isExpanded={isSwipeableExpanded}
                toggleExpanded={toggleSwipeableExpanded}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
