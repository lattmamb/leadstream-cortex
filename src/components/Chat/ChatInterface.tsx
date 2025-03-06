
import { useChat } from "@/hooks/useChat";
import { LampDemo } from "@/components/ui/lamp";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { WelcomeScreen } from "./WelcomeScreen";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
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
      {!showV0Interface && (
        <div className="absolute inset-0 z-0">
          <BackgroundBeamsWithCollision className="h-full dark:from-[#1A1F2C] dark:to-[#1A1F2C]/80 bg-gradient-to-b from-[#1A1F2C] to-[#1A1F2C]/80">
            <div className="absolute inset-0 bg-[#1A1F2C]/50 backdrop-blur-sm"></div>
          </BackgroundBeamsWithCollision>
        </div>
      )}
      
      {showV0Interface && (
        <div className="absolute inset-0 z-0">
          <LampDemo />
        </div>
      )}
      
      <InterfaceSwitcher 
        showV0Interface={showV0Interface}
        toggleChatInterface={toggleChatInterface}
      />
      
      {showV0Interface ? (
        <div className="relative z-10 flex-1 overflow-y-auto bg-transparent">
          <VercelV0Chat />
        </div>
      ) : (
        <>
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
          />
        </>
      )}
    </div>
  );
};
