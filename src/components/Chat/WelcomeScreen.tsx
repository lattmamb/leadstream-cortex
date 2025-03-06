
import { SearchIcon, UsersRound, Save, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  setInput: (value: string) => void;
}

export const WelcomeScreen = ({ setInput }: WelcomeScreenProps) => {
  return (
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
  );
};
