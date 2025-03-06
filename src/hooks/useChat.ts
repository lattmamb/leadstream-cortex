
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface Message {
  text: string;
  isAI: boolean;
}

interface Lead {
  name: string;
  company: string;
  email: string;
  position: string;
  status: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showV0Interface, setShowV0Interface] = useState(false);

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

  const toggleChatInterface = () => {
    setShowV0Interface(prev => !prev);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    leads,
    showV0Interface,
    handleSubmit,
    toggleChatInterface
  };
};
