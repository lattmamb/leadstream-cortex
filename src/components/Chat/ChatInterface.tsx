
import { useState, useRef, useEffect } from "react";
import { Send, SearchIcon, UsersRound, Save, Mail } from "lucide-react";
import { LampDemo } from "@/components/ui/lamp";
import { ChatMessage } from "./ChatMessage";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

interface Lead {
  name: string;
  company: string;
  email: string;
  position: string;
  status: string;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{
    text: string;
    isAI: boolean;
  }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showV0Interface, setShowV0Interface] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add initial greeting
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          text: "I'm LeadStream, your AI assistant. How can I help you generate leads today? Try asking me to 'find leads in tech industry' or 'help me with sales outreach'.",
          isAI: true
        }]);
      }, 1000);
    }
  }, []);

  const generateLeads = async (industry: string) => {
    setIsLoading(true);
    
    // Simulate API call to generate leads
    setTimeout(() => {
      const newLeads: Lead[] = [
        {
          name: "John Smith",
          company: "TechNova Inc",
          email: "john.smith@technova.com",
          position: "CTO",
          status: "New"
        },
        {
          name: "Sarah Johnson",
          company: "Quantum Solutions",
          email: "sarah.j@quantumsol.com",
          position: "VP of Operations",
          status: "New"
        },
        {
          name: "Michael Chen",
          company: "DataSphere Analytics",
          email: "m.chen@datasphere.ai",
          position: "Head of Innovation",
          status: "New"
        }
      ];
      
      setLeads([...leads, ...newLeads]);
      
      setMessages(prev => [...prev, {
        text: `I found ${newLeads.length} potential leads in the ${industry} industry:\n\n${newLeads.map(lead => `- ${lead.name}, ${lead.position} at ${lead.company}`).join('\n')}`,
        isAI: true
      }]);
      
      toast({
        title: "Leads Generated",
        description: `${newLeads.length} leads found in ${industry} industry.`,
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    const newMessage = {
      text: userMessage,
      isAI: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    // Check for lead generation requests
    const findLeadsPattern = /find\s+leads\s+in\s+(\w+)(?:\s+industry)?/i;
    const match = userMessage.match(findLeadsPattern);
    
    if (match) {
      const industry = match[1];
      await generateLeads(industry);
    } else if (userMessage.toLowerCase().includes("help") && userMessage.toLowerCase().includes("sales")) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I can help with your sales process in several ways:\n\n1. Find potential leads in specific industries\n2. Draft outreach emails\n3. Suggest follow-up strategies\n4. Help qualify leads\n\nJust tell me what you need help with!",
          isAI: true
        }]);
        setIsLoading(false);
      }, 1000);
    } else {
      // Default AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I'm your AI assistant focused on lead generation and sales. Try asking me to 'find leads in tech industry', 'help with sales outreach', or 'draft an email to a potential client'.",
          isAI: true
        }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  // Toggle between the original chat and the V0 interface
  const toggleChatInterface = () => {
    setShowV0Interface(prev => !prev);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {!showV0Interface && (
        <div className="absolute inset-0 z-0">
          <BackgroundBeamsWithCollision className="h-full dark:from-[#1A1F2C] dark:to-[#1A1F2C]/80 bg-gradient-to-b from-[#1A1F2C] to-[#1A1F2C]/80">
            <div className="absolute inset-0 bg-[#1A1F2C]/30 backdrop-blur-sm"></div>
          </BackgroundBeamsWithCollision>
        </div>
      )}
      
      {showV0Interface && (
        <div className="absolute inset-0 z-0">
          <LampDemo />
        </div>
      )}
      
      <div className="relative z-10 flex justify-end mb-2 px-4">
        <Button 
          variant="outline" 
          className="text-xs bg-white/10 text-white border-white/20 hover:bg-white/20"
          onClick={toggleChatInterface}
        >
          {showV0Interface ? "Switch to Standard Chat" : "Try V0 Interface"}
        </Button>
      </div>
      
      {showV0Interface ? (
        <div className="relative z-10 flex-1 overflow-y-auto p-4 bg-transparent">
          <VercelV0Chat />
        </div>
      ) : (
        <div className="relative z-10 flex-1 overflow-y-auto p-4 bg-transparent">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/80">
              <div className="max-w-md text-center space-y-4">
                <h2 className="text-2xl font-bold">Welcome to LeadStream AI</h2>
                <p className="text-sm opacity-80">Your AI-powered assistant for lead generation and sales automation</p>
                
                <div className="grid grid-cols-2 gap-3 mt-8">
                  <Button onClick={() => setInput("Find leads in tech industry")} className="flex items-center gap-2 backdrop-blur-md bg-white/10 hover:bg-primary text-white border border-white/10">
                    <SearchIcon size={18} />
                    Find Leads
                  </Button>
                  <Button onClick={() => setInput("Help me with sales outreach")} className="flex items-center gap-2 backdrop-blur-md bg-white/10 hover:bg-primary text-white border border-white/10">
                    <UsersRound size={18} />
                    Sales Help
                  </Button>
                  <Button onClick={() => setInput("Draft an email template")} className="flex items-center gap-2 backdrop-blur-md bg-white/10 hover:bg-primary text-white border border-white/10">
                    <Mail size={18} />
                    Email Draft
                  </Button>
                  <Button onClick={() => setInput("Show my saved leads")} className="flex items-center gap-2 backdrop-blur-md bg-white/10 hover:bg-primary text-white border border-white/10">
                    <Save size={18} />
                    Saved Leads
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message.text} isAI={message.isAI} />
              ))}
              {isLoading && (
                <div className="py-4">
                  <TextShimmerWave
                    className="text-primary font-mono text-sm"
                    duration={1}
                    spread={1}
                    zDistance={3}
                    scaleDistance={1.1}
                    rotateYDistance={15}
                  >
                    AI is thinking...
                  </TextShimmerWave>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      {!showV0Interface && (
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
      )}
    </div>
  );
};
