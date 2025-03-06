
import { useChat } from "@/hooks/useChat";
import { ChatBackground } from "./ChatBackground";
import { ChatContent } from "./ChatContent";
import { InterfaceSwitcher } from "./InterfaceSwitcher";
import { useState } from "react";

export const ChatInterface = () => {
  const {
    messages,
    input,
    setInput,
    isLoading,
    showV0Interface,
    handleSubmit,
    toggleChatInterface,
    recentChats,
    selectChat,
    deleteChat,
    createNewChat
  } = useChat();
  
  const [currentMode, setCurrentMode] = useState("balanced");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white relative overflow-hidden">
      <ChatBackground showV0Interface={showV0Interface} />
      
      <InterfaceSwitcher 
        showV0Interface={showV0Interface}
        toggleChatInterface={toggleChatInterface}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatContent
          showV0Interface={showV0Interface}
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          recentChats={recentChats}
          selectChat={selectChat}
          deleteChat={deleteChat}
          createNewChat={createNewChat}
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
        />
      </div>
    </div>
  );
};
