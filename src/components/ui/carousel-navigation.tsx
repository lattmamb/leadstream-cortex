
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  Settings,
  ChevronRight
} from "lucide-react";

const navItems = [
  { name: "Chat", path: "/", icon: <MessageSquare className="h-5 w-5" /> },
  { name: "Leads", path: "/leads", icon: <Users className="h-5 w-5" /> },
  { name: "Calendar", path: "/calendar", icon: <Calendar className="h-5 w-5" /> },
  { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
];

export const CarouselNavigation = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
      <div className="bg-slate-900/70 backdrop-blur-lg rounded-full p-2 flex items-center justify-center shadow-lg border border-white/10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.name}
              className="relative px-3"
              onHoverStart={() => setHoveredItem(item.name)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <Link to={item.path} className="block relative z-10">
                <motion.div
                  className={`flex items-center gap-2 py-2 px-3 rounded-full transition-colors ${
                    isActive ? "text-white" : "text-white/60 hover:text-white/90"
                  }`}
                >
                  <span className="relative z-10">{item.icon}</span>
                  
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: hoveredItem === item.name || isActive ? "auto" : 0,
                      opacity: hoveredItem === item.name || isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                </motion.div>
              </Link>
              
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-cyan-600/30 rounded-full border border-cyan-500/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      
      <motion.div 
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <ChevronRight size={20} className="text-white/70 rotate-90" />
        </motion.div>
      </motion.div>
    </div>
  );
};
