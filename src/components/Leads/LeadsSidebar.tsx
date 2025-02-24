
import { IconX, IconStar, IconMail, IconPhone, IconBuilding, IconUser } from "@tabler/icons-react";
import { type Lead } from "@/pages/Leads";
import { motion, AnimatePresence } from "framer-motion";

interface LeadsSidebarProps {
  lead: Lead;
  onClose: () => void;
}

export const LeadsSidebar = ({ lead, onClose }: LeadsSidebarProps) => {
  const sections = [
    {
      title: lead.fullName,
      subtitle: lead.jobTitle,
      icon: <IconUser className="h-5 w-5" />,
      details: [
        { label: "Email", value: lead.email, icon: <IconMail className="h-4 w-4" /> },
        { label: "Phone", value: lead.phone, icon: <IconPhone className="h-4 w-4" /> },
        { label: "Company", value: lead.companyName, icon: <IconBuilding className="h-4 w-4" /> },
      ],
    },
    {
      title: "Lead Details",
      subtitle: `Score: ${lead.leadScore}`,
      icon: <IconStar className="h-5 w-5" />,
      details: [
        { label: "Source", value: lead.leadSource },
        { label: "Status", value: lead.status },
        { label: "Last Contacted", value: new Date(lead.lastContactedDate).toLocaleDateString() },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="w-96 bg-slate-900/50 backdrop-blur-md border-l border-white/10 p-6 overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-white"
        >
          Lead Details
        </motion.h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <IconX className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-full bg-slate-800">
                  {section.icon}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {section.title}
                  </h3>
                  <p className="text-sm text-white/70">{section.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3 pl-12">
                {section.details.map((detail, index) => (
                  <motion.div
                    key={detail.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (index * 0.05) }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-white/70">
                      {detail.icon}
                      <span>{detail.label}</span>
                    </div>
                    <span className={cn(
                      "text-white",
                      detail.label === "Status" && getStatusColor(lead.status)
                    )}>
                      {detail.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h3 className="text-sm font-medium text-white/70">Notes</h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/70 text-sm"
            >
              {lead.notes.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.02) }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

const getStatusColor = (status: Lead["status"]) => {
  const colors = {
    New: "bg-blue-500/20 text-blue-300",
    Contacted: "bg-yellow-500/20 text-yellow-300",
    Interested: "bg-purple-500/20 text-purple-300",
    "Proposal Sent": "bg-orange-500/20 text-orange-300",
    Won: "bg-green-500/20 text-green-300",
    Lost: "bg-red-500/20 text-red-300",
  };
  return `inline-block px-2 py-1 rounded-full text-xs ${colors[status]}`;
};

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
