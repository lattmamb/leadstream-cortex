
import { X } from "lucide-react";
import { type Lead } from "@/pages/Leads";
import { motion } from "framer-motion";

interface LeadsSidebarProps {
  lead: Lead;
  onClose: () => void;
}

export const LeadsSidebar = ({ lead, onClose }: LeadsSidebarProps) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="w-96 bg-slate-900/50 backdrop-blur-md border-l border-white/10 p-6 overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Lead Details</h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-white/70 mb-2">Contact Information</h3>
          <div className="space-y-2">
            <p className="text-white">{lead.fullName}</p>
            <p className="text-white/70">{lead.jobTitle}</p>
            <p className="text-white/70">{lead.companyName}</p>
            <p className="text-white/70">{lead.email}</p>
            <p className="text-white/70">{lead.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white/70 mb-2">Lead Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-white/70">Source</span>
              <span className="text-white">{lead.leadSource}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Score</span>
              <span
                className={`${
                  lead.leadScore >= 80
                    ? "text-green-400"
                    : lead.leadScore >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {lead.leadScore}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Status</span>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs ${
                  {
                    New: "bg-blue-500/20 text-blue-300",
                    Contacted: "bg-yellow-500/20 text-yellow-300",
                    Interested: "bg-purple-500/20 text-purple-300",
                    "Proposal Sent": "bg-orange-500/20 text-orange-300",
                    Won: "bg-green-500/20 text-green-300",
                    Lost: "bg-red-500/20 text-red-300",
                  }[lead.status]
                }`}
              >
                {lead.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Last Contacted</span>
              <span className="text-white">
                {new Date(lead.lastContactedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white/70 mb-2">Notes</h3>
          <p className="text-white/70 text-sm">{lead.notes}</p>
        </div>
      </div>
    </motion.div>
  );
};
