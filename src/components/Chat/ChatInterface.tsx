
import { useChat } from "@/hooks/useChat";
import { ChatBackground } from "./ChatBackground";
import { ChatContent } from "./ChatContent";
import { InterfaceSwitcher } from "./InterfaceSwitcher";

export const ChatInterface = () => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    showV0Interface,
    handleSubmit,
    toggleChatInterface
  } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ChatBackground showV0Interface={showV0Interface} />
      
      <InterfaceSwitcher 
        showV0Interface={showV0Interface}
        toggleChatInterface={toggleChatInterface}
      />
      
      <ChatContent
        showV0Interface={showV0Interface}
        messages={messages}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
