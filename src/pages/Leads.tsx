
import { Header } from "@/components/Layout/Header";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { LeadsSidebar } from "@/components/Leads/LeadsSidebar";
import { LeadsTable } from "@/components/Leads/LeadsTable";
import { AddLeadButton } from "@/components/Leads/AddLeadButton";
import { Vortex } from "@/components/ui/vortex";
import { motion } from "framer-motion";
import { useState } from "react";

// Define the Lead interface to match what's being used in the components
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  position: string;
  status: "New" | "Contacted" | "Qualified" | "Proposal" | "Negotiation" | "Closed" | "Lost";
  lastContacted?: string;
  notes?: string;
  leadScore?: number;
  leadSource?: string;
  priority?: "Low" | "Medium" | "High";
  // Aliases for backward compatibility
  fullName?: string; // alias for name
  companyName?: string; // alias for company
  jobTitle?: string; // alias for position
  lastContactedDate?: string; // alias for lastContacted
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Smith',
      fullName: 'John Smith', // For backward compatibility
      company: 'TechNova Inc',
      companyName: 'TechNova Inc', // For backward compatibility
      email: 'john.smith@technova.com',
      position: 'CTO',
      jobTitle: 'CTO', // For backward compatibility
      status: 'New',
      phone: '(555) 123-4567',
      lastContacted: '2023-08-15',
      lastContactedDate: '2023-08-15', // For backward compatibility
      leadScore: 85,
      leadSource: 'Website',
      priority: 'High'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      fullName: 'Sarah Johnson', // For backward compatibility
      company: 'Quantum Solutions',
      companyName: 'Quantum Solutions', // For backward compatibility
      email: 'sarah.j@quantumsol.com',
      position: 'VP of Operations',
      jobTitle: 'VP of Operations', // For backward compatibility
      status: 'Contacted',
      phone: '(555) 987-6543',
      lastContacted: '2023-08-10',
      lastContactedDate: '2023-08-10', // For backward compatibility
      leadScore: 70,
      leadSource: 'LinkedIn',
      priority: 'Medium'
    },
    {
      id: '3',
      name: 'Michael Chen',
      fullName: 'Michael Chen', // For backward compatibility
      company: 'DataSphere Analytics',
      companyName: 'DataSphere Analytics', // For backward compatibility
      email: 'm.chen@datasphere.ai',
      position: 'Head of Innovation',
      jobTitle: 'Head of Innovation', // For backward compatibility
      status: 'Qualified',
      phone: '(555) 456-7890',
      lastContacted: '2023-08-05',
      lastContactedDate: '2023-08-05', // For backward compatibility
      leadScore: 65,
      leadSource: 'Referral',
      priority: 'Low'
    }
  ]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddLead = (lead: Lead) => {
    setLeads([...leads, lead]);
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar />
        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Vortex
            backgroundColor="#1A1F2C"
            baseHue={350} // Tesla red hue
            rangeY={300}
            particleCount={600}
            baseSpeed={0.2}
            rangeSpeed={1.2}
            className="flex flex-col items-center justify-start px-4 py-8 w-full h-full"
          >
            <div className="w-full max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Leads</h1>
                <AddLeadButton 
                  onAddLead={handleAddLead} 
                  onDeleteLead={handleDeleteLead} 
                  selectedLead={selectedLead} 
                />
              </div>
              
              <div className="flex gap-4 h-[calc(100vh-10rem)]">
                <div className="w-64 hidden lg:block">
                  <LeadsSidebar 
                    lead={selectedLead} 
                    onClose={() => setSelectedLead(null)} 
                  />
                </div>
                <div className="flex-1 bg-slate-900/40 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden shadow-xl">
                  <LeadsTable 
                    leads={leads} 
                    onLeadSelect={handleLeadSelect} 
                    searchQuery={searchQuery} 
                  />
                </div>
              </div>
            </div>
          </Vortex>
        </motion.div>
      </div>
    </div>
  );
};

export default Leads;
