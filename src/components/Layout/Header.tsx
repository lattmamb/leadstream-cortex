
import { MessageSquare, Users, Calendar, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-tesla-black font-semibold text-xl">
            LeadStream
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-tesla-black transition-colors duration-200 flex items-center gap-2"
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </Link>
            <Link
              to="/leads"
              className="text-gray-600 hover:text-tesla-black transition-colors duration-200 flex items-center gap-2"
            >
              <Users size={20} />
              <span>Leads</span>
            </Link>
            <Link
              to="/calendar"
              className="text-gray-600 hover:text-tesla-black transition-colors duration-200 flex items-center gap-2"
            >
              <Calendar size={20} />
              <span>Calendar</span>
            </Link>
            <Link
              to="/settings"
              className="text-gray-600 hover:text-tesla-black transition-colors duration-200 flex items-center gap-2"
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
