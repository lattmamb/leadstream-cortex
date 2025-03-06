
import { Button } from "@/components/ui/button";

interface InterfaceSwitcherProps {
  showV0Interface: boolean;
  toggleChatInterface: () => void;
}

export const InterfaceSwitcher = ({ showV0Interface, toggleChatInterface }: InterfaceSwitcherProps) => {
  return (
    <div className="relative z-10 flex justify-end mb-2 px-4 pt-4">
      <Button 
        variant="outline" 
        className="text-xs bg-[#2A2F3C]/50 text-white/70 border-[#2A2F3C]/80 hover:bg-[#2A2F3C]/80"
        onClick={toggleChatInterface}
      >
        {showV0Interface ? "Back to Chat" : "Try V0 Interface"}
      </Button>
    </div>
  );
};
