
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import { WelcomeScreen } from "./WelcomeScreen";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { RecentChat } from "@/hooks/useChat";

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
  createNewChat
}: ChatContentProps) => {
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
        </div>
      )}
    </>
  );
};
