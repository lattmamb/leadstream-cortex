
import { LampDemo } from "@/components/ui/lamp";
import { ParticleField } from "@/components/ui/ParticleField";

interface ChatBackgroundProps {
  showV0Interface: boolean;
  currentMode?: string;
}

export const ChatBackground = ({ showV0Interface, currentMode = "balanced" }: ChatBackgroundProps) => {
  // Only show background effects when in V0 interface mode
  if (!showV0Interface) return null;
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <LampDemo />
      <ParticleField 
        className="absolute inset-0 z-10"
        mode={currentMode as "creative" | "balanced" | "precise"}
        backgroundColor="transparent"
        particleCount={150}
        speedFactor={0.8}
        particleSize={2}
        interactionRadius={180}
        particleForce={0.2}
        particleDecay={0.96}
        darkMode={true}
      />
    </div>
  );
};
