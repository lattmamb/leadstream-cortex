
import { MessageSquare, Users, Calendar, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-white font-semibold text-xl">
            LeadStream
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white/70 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </Link>
            <Link
              to="/leads"
              className="text-white/70 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"
            >
              <Users size={20} />
              <span>Leads</span>
            </Link>
            <Link
              to="/calendar"
              className="text-white/70 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"
            >
              <Calendar size={20} />
              <span>Calendar</span>
            </Link>
            <Link
              to="/settings"
              className="text-white/70 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
