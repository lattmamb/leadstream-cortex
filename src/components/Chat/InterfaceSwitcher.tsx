
import { Button } from "@/components/ui/button";
import { SwitchHorizontal } from "lucide-react";

interface InterfaceSwitcherProps {
  showV0Interface: boolean;
  toggleChatInterface: () => void;
}

export const InterfaceSwitcher = ({ showV0Interface, toggleChatInterface }: InterfaceSwitcherProps) => {
  return (
    <div className="relative z-10 flex justify-end pt-4 pr-4">
      <Button 
        variant="outline" 
        size="sm"
        className="text-xs bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
        onClick={toggleChatInterface}
      >
        <SwitchHorizontal size={14} className="mr-1" />
        {showV0Interface ? "ChatGPT Style" : "V0 Style"}
      </Button>
    </div>
  );
};
