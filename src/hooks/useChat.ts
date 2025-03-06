
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export interface Lead {
  id?: string;
  name: string;
  company: string;
  email: string;
  position: string;
  status: string;
  phone?: string;
  leadSource?: string;
  createdAt?: Date;
}

export interface RecentChat {
  id: string;
  title: string;
  preview: string;
  timestamp: number;
  messages: Array<{ text: string; isAI: boolean }>;
}

interface Message {
  text: string;
  isAI: boolean;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showV0Interface, setShowV0Interface] = useState(false);
  const [recentChats, setRecentChats] = useState<RecentChat[]>([
    {
      id: "chat-1",
      title: "Finding tech leads",
      preview: "I found 3 potential leads in the tech industry",
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
      messages: [
        { text: "Find leads in tech industry", isAI: false },
        { text: "I found 3 potential leads in the tech industry", isAI: true }
      ]
    },
    {
      id: "chat-2",
      title: "Sales outreach help",
      preview: "Here are some strategies for effective follow-ups",
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
      messages: [
        { text: "Help me with sales outreach", isAI: false },
        { text: "Here are some strategies for effective follow-ups", isAI: true }
      ]
    },
    {
      id: "chat-3",
      title: "Healthcare leads",
      preview: "I found 5 potential leads in the healthcare industry",
      timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      messages: [
        { text: "Find leads in healthcare industry", isAI: false },
        { text: "I found 5 potential leads in the healthcare industry", isAI: true }
      ]
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

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
          id: `lead-${Date.now()}-1`,
          name: "John Smith",
          company: "TechNova Inc",
          email: "john.smith@technova.com",
          position: "CTO",
          status: "New",
          phone: "555-123-4567",
          leadSource: "AI Generated",
          createdAt: new Date()
        },
        {
          id: `lead-${Date.now()}-2`,
          name: "Sarah Johnson",
          company: "Quantum Solutions",
          email: "sarah.j@quantumsol.com",
          position: "VP of Operations",
          status: "New",
          phone: "555-234-5678",
          leadSource: "AI Generated",
          createdAt: new Date()
        },
        {
          id: `lead-${Date.now()}-3`,
          name: "Michael Chen",
          company: "DataSphere Analytics",
          email: "m.chen@datasphere.ai",
          position: "Head of Innovation",
          status: "New",
          phone: "555-345-6789",
          leadSource: "AI Generated",
          createdAt: new Date()
        }
      ];
      
      setLeads([...leads, ...newLeads]);
      
      const aiResponse = `I found ${newLeads.length} potential leads in the ${industry} industry:\n\n${newLeads.map(lead => `- ${lead.name}, ${lead.position} at ${lead.company}`).join('\n')}`;
      
      setMessages(prev => [...prev, {
        text: aiResponse,
        isAI: true
      }]);
      
      // If this is a new conversation, create a new chat
      if (!currentChatId) {
        createNewChatFromMessages([
          ...messages, 
          { text: input, isAI: false },
          { text: aiResponse, isAI: true }
        ], `Leads in ${industry} industry`);
      } else {
        // Update the existing chat
        updateCurrentChat([
          ...messages, 
          { text: input, isAI: false },
          { text: aiResponse, isAI: true }
        ]);
      }
      
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
        const aiResponse = "I can help with your sales process in several ways:\n\n1. Find potential leads in specific industries\n2. Draft outreach emails\n3. Suggest follow-up strategies\n4. Help qualify leads\n\nJust tell me what you need help with!";
        
        setMessages(prev => [...prev, {
          text: aiResponse,
          isAI: true
        }]);
        
        if (!currentChatId) {
          createNewChatFromMessages([
            ...messages, 
            newMessage,
            { text: aiResponse, isAI: true }
          ], "Sales assistance");
        } else {
          updateCurrentChat([
            ...messages, 
            newMessage,
            { text: aiResponse, isAI: true }
          ]);
        }
        
        setIsLoading(false);
      }, 1000);
    } else {
      // Default AI response
      setTimeout(() => {
        const aiResponse = "I'm your AI assistant focused on lead generation and sales. Try asking me to 'find leads in tech industry', 'help with sales outreach', or 'draft an email to a potential client'.";
        
        setMessages(prev => [...prev, {
          text: aiResponse,
          isAI: true
        }]);
        
        if (!currentChatId) {
          createNewChatFromMessages([
            ...messages, 
            newMessage,
            { text: aiResponse, isAI: true }
          ], userMessage.length > 20 ? userMessage.substring(0, 20) + "..." : userMessage);
        } else {
          updateCurrentChat([
            ...messages, 
            newMessage,
            { text: aiResponse, isAI: true }
          ]);
        }
        
        setIsLoading(false);
      }, 1000);
    }
  };

  const toggleChatInterface = () => {
    setShowV0Interface(prev => !prev);
  };

  const selectChat = (chat: RecentChat) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
    toast({
      title: "Chat Loaded",
      description: `Loaded "${chat.title}"`,
    });
  };

  const deleteChat = (id: string) => {
    setRecentChats(prev => prev.filter(chat => chat.id !== id));
    
    // If deleting the current chat, clear the current messages
    if (id === currentChatId) {
      setMessages([]);
      setCurrentChatId(null);
    }
    
    toast({
      title: "Chat Deleted",
      description: "The chat has been removed.",
    });
  };

  const createNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    toast({
      title: "New Chat",
      description: "Started a new conversation.",
    });
  };

  const createNewChatFromMessages = (chatMessages: Message[], title: string) => {
    const newChat: RecentChat = {
      id: `chat-${Date.now()}`,
      title,
      preview: chatMessages[chatMessages.length - 1]?.text.substring(0, 60) + "...",
      timestamp: Date.now(),
      messages: chatMessages
    };
    
    setRecentChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const updateCurrentChat = (chatMessages: Message[]) => {
    if (!currentChatId) return;
    
    setRecentChats(prev => 
      prev.map(chat => 
        chat.id === currentChatId 
          ? {
              ...chat,
              messages: chatMessages,
              preview: chatMessages[chatMessages.length - 1]?.text.substring(0, 60) + "...",
              timestamp: Date.now()
            }
          : chat
      )
    );
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    leads,
    showV0Interface,
    handleSubmit,
    toggleChatInterface,
    recentChats,
    selectChat,
    deleteChat,
    createNewChat
  };
};
