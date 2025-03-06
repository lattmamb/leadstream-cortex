
import { useState } from "react";
import { GooeyDropdown } from "@/components/ui/gooey-dropdown";
import { SparklesCore } from "@/components/ui/sparkles";
import { 
  Brain, 
  Sparkles, 
  Bot, 
  ArrowUpFromLine, 
  Wand2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AIModeSelectorProps {
  currentMode: string;
  setCurrentMode: (mode: string) => void;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

export const AIModeSelector = ({ 
  currentMode, 
  setCurrentMode, 
  isExpanded, 
  toggleExpanded 
}: AIModeSelectorProps) => {
  const modes = [
    { id: "creative", icon: <Sparkles className="w-5 h-5" />, name: "Creative", color: "#E31937" },
    { id: "balanced", icon: <Brain className="w-5 h-5" />, name: "Balanced", color: "#4f46e5" },
    { id: "precise", icon: <Bot className="w-5 h-5" />, name: "Precise", color: "#0ea5e9" },
  ];

  // Find the current mode object
  const activeMode = modes.find(mode => mode.id === currentMode) || modes[0];

  return (
    <div className="relative">
      {/* AI Mode Selector */}
      <GooeyDropdown
        triggerContent={
          <div className="flex items-center justify-center">
            {activeMode.icon}
          </div>
        }
        direction="up"
        className="absolute bottom-4 left-4 z-50"
      >
        {modes.map(mode => (
          <div 
            key={mode.id}
            onClick={() => setCurrentMode(mode.id)}
            style={{ backgroundColor: mode.color }}
          >
            {mode.icon}
          </div>
        ))}
      </GooeyDropdown>

      {/* Swipe Toggle Button */}
      <button 
        onClick={toggleExpanded} 
        className="absolute bottom-4 right-4 z-50 bg-tesla-red text-white rounded-full p-2 shadow-lg hover:bg-opacity-90 transition-transform"
      >
        <ArrowUpFromLine className={cn(
          "w-5 h-5 transition-transform",
          isExpanded ? "rotate-180" : ""
        )} />
      </button>

      {/* Mode Indicator */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 left-4 z-40 bg-black/80 text-white text-xs py-1 px-3 rounded-full"
          >
            {activeMode.name} mode
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effect for Active Mode */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence>
          {currentMode === "creative" && (
            <motion.div
              key="creative-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <SparklesCore
                background="transparent"
                minSize={0.2}
                maxSize={0.6}
                particleDensity={40}
                particleColor="#E31937"
                speed={0.8}
                className="w-full h-full"
              />
            </motion.div>
          )}
          
          {currentMode === "balanced" && (
            <motion.div
              key="balanced-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <SparklesCore
                background="transparent"
                minSize={0.2}
                maxSize={0.5}
                particleDensity={30}
                particleColor="#4f46e5"
                speed={0.5}
                className="w-full h-full"
              />
            </motion.div>
          )}
          
          {currentMode === "precise" && (
            <motion.div
              key="precise-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <SparklesCore
                background="transparent"
                minSize={0.1}
                maxSize={0.3}
                particleDensity={20}
                particleColor="#0ea5e9"
                speed={0.3}
                className="w-full h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
