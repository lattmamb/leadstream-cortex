
import { SearchIcon, UsersRound, Save, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  setInput: (value: string) => void;
}

export const WelcomeScreen = ({ setInput }: WelcomeScreenProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white text-[#343541]">
      <div className="max-w-md text-center space-y-6 px-4">
        <h2 className="text-3xl font-bold">LeadStream AI</h2>
        <p className="text-sm text-neutral-600">Your AI-powered assistant for lead generation and sales automation</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          <Button onClick={() => setInput("Find leads in tech industry")} className="flex items-center justify-start gap-2 h-auto py-3 px-4 bg-[#F7F7F8] hover:bg-neutral-200 text-neutral-700 border border-neutral-200">
            <SearchIcon size={18} />
            <div className="text-left">
              <div className="font-medium">Find Leads</div>
              <div className="text-xs text-neutral-500">Discover new prospects</div>
            </div>
          </Button>
          <Button onClick={() => setInput("Help me with sales outreach")} className="flex items-center justify-start gap-2 h-auto py-3 px-4 bg-[#F7F7F8] hover:bg-neutral-200 text-neutral-700 border border-neutral-200">
            <UsersRound size={18} />
            <div className="text-left">
              <div className="font-medium">Sales Help</div>
              <div className="text-xs text-neutral-500">Improve your outreach</div>
            </div>
          </Button>
          <Button onClick={() => setInput("Draft an email template")} className="flex items-center justify-start gap-2 h-auto py-3 px-4 bg-[#F7F7F8] hover:bg-neutral-200 text-neutral-700 border border-neutral-200">
            <Mail size={18} />
            <div className="text-left">
              <div className="font-medium">Email Draft</div>
              <div className="text-xs text-neutral-500">Create email templates</div>
            </div>
          </Button>
          <Button onClick={() => setInput("Show my saved leads")} className="flex items-center justify-start gap-2 h-auto py-3 px-4 bg-[#F7F7F8] hover:bg-neutral-200 text-neutral-700 border border-neutral-200">
            <Save size={18} />
            <div className="text-left">
              <div className="font-medium">Saved Leads</div>
              <div className="text-xs text-neutral-500">View your lead list</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
