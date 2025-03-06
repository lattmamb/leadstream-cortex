
import { LampDemo } from "@/components/ui/lamp";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

interface ChatBackgroundProps {
  showV0Interface: boolean;
}

export const ChatBackground = ({ showV0Interface }: ChatBackgroundProps) => {
  // Only show background effects when in V0 interface mode
  if (!showV0Interface) return null;
  
  return (
    <div className="absolute inset-0 z-0">
      <LampDemo />
    </div>
  );
};
