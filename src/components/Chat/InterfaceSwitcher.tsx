
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Bot, Wand2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterfaceSwitcherProps {
  showV0Interface: boolean;
  toggleChatInterface: () => void;
  currentMode: string;
  setCurrentMode: (mode: string) => void;
}

export const InterfaceSwitcher = ({ 
  showV0Interface, 
  toggleChatInterface,
  currentMode,
  setCurrentMode
}: InterfaceSwitcherProps) => {
  const modes = [
    { id: "creative", icon: <Wand2 size={14} className="mr-1" />, label: "Creative", color: "bg-tesla-red text-white" },
    { id: "balanced", icon: <Lightbulb size={14} className="mr-1" />, label: "Balanced", color: "bg-blue-600 text-white" },
    { id: "precise", icon: <Bot size={14} className="mr-1" />, label: "Precise", color: "bg-sky-500 text-white" },
  ];
  
  return (
    <div className="relative z-10 flex justify-end pt-4 pr-4 gap-2">
      {/* AI Mode Selector Buttons */}
      <div className="flex gap-1 mr-2">
        {modes.map(mode => (
          <Button 
            key={mode.id}
            variant="outline" 
            size="sm"
            className={cn(
              "text-xs border-neutral-200 transition-all",
              currentMode === mode.id 
                ? mode.color
                : "bg-white text-neutral-700 hover:bg-neutral-100"
            )}
            onClick={() => setCurrentMode(mode.id)}
          >
            {mode.icon}
            {mode.label}
          </Button>
        ))}
      </div>

      {/* Interface Toggle Button */}
      <Button 
        variant="outline" 
        size="sm"
        className="text-xs bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100"
        onClick={toggleChatInterface}
      >
        <ArrowRightLeft size={14} className="mr-1" />
        {showV0Interface ? "ChatGPT Style" : "V0 Style"}
      </Button>
    </div>
  );
};
