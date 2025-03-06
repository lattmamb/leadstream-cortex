
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GooeyDropdownProps {
  children: React.ReactNode;
  className?: string;
  triggerContent: React.ReactNode;
  direction?: "up" | "down";
}

export const GooeyDropdown = ({
  children,
  className,
  triggerContent,
  direction = "up",
}: GooeyDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("relative z-50", className)}>
      {/* SVG Filter for Gooey Effect */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="gooey"
          />
        </filter>
      </svg>

      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className={cn(
          "relative flex items-center justify-center bg-tesla-red text-white rounded-full p-2 w-12 h-12 shadow-lg hover:bg-opacity-90 transition-transform",
          isOpen && "scale-110"
        )}
      >
        {triggerContent}
      </button>

      {/* Dropdown Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ filter: "url(#gooey)" }}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center",
              direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
            )}
          >
            {React.Children.map(children, (child, index) => (
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: direction === "up" ? -(index + 1) * 60 : (index + 1) * 60, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.05,
                }}
                className="bg-tesla-red text-white rounded-full p-2 w-11 h-11 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => {
                  setIsOpen(false);
                  if (React.isValidElement(child) && child.props.onClick) {
                    child.props.onClick();
                  }
                }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
