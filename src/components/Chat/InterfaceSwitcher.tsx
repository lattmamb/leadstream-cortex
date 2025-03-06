
import { Button } from "@/components/ui/button";

interface InterfaceSwitcherProps {
  showV0Interface: boolean;
  toggleChatInterface: () => void;
}

export const InterfaceSwitcher = ({ showV0Interface, toggleChatInterface }: InterfaceSwitcherProps) => {
  return (
    <div className="relative z-10 flex justify-end mb-2 px-4">
      <Button 
        variant="outline" 
        className="text-xs bg-white/10 text-white border-white/20 hover:bg-white/20"
        onClick={toggleChatInterface}
      >
        {showV0Interface ? "Switch to Standard Chat" : "Try V0 Interface"}
      </Button>
    </div>
  );
};
