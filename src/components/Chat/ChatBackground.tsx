
import { LampDemo } from "@/components/ui/lamp";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

interface ChatBackgroundProps {
  showV0Interface: boolean;
}

export const ChatBackground = ({ showV0Interface }: ChatBackgroundProps) => {
  return (
    <>
      {!showV0Interface && (
        <div className="absolute inset-0 z-0">
          <BackgroundBeamsWithCollision className="h-full dark:from-[#1A1F2C] dark:to-[#1A1F2C]/80 bg-gradient-to-b from-[#1A1F2C] to-[#1A1F2C]/80">
            <div className="absolute inset-0 bg-[#1A1F2C]/50 backdrop-blur-sm"></div>
          </BackgroundBeamsWithCollision>
        </div>
      )}
      
      {showV0Interface && (
        <div className="absolute inset-0 z-0">
          <LampDemo />
        </div>
      )}
    </>
  );
};
