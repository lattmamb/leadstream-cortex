import { Header } from "@/components/Layout/Header";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { LeadsSidebar } from "@/components/Leads/LeadsSidebar";
import { LeadsTable } from "@/components/Leads/LeadsTable";
import { AddLeadButton } from "@/components/Leads/AddLeadButton";
import { Vortex } from "@/components/ui/vortex";
import { motion } from "framer-motion";
import { useState } from "react";

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
  fullName?: string;
  companyName?: string;
  jobTitle?: string;
  lastContactedDate?: string;
}

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Smith',
      fullName: 'John Smith',
      company: 'TechNova Inc',
      companyName: 'TechNova Inc',
      email: 'john.smith@technova.com',
      position: 'CTO',
      jobTitle: 'CTO',
      status: 'New',
      phone: '(555) 123-4567',
      lastContacted: '2023-08-15',
      lastContactedDate: '2023-08-15',
      leadScore: 85,
      leadSource: 'Website',
      priority: 'High'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      fullName: 'Sarah Johnson',
      company: 'Quantum Solutions',
      companyName: 'Quantum Solutions',
      email: 'sarah.j@quantumsol.com',
      position: 'VP of Operations',
      jobTitle: 'VP of Operations',
      status: 'Contacted',
      phone: '(555) 987-6543',
      lastContacted: '2023-08-10',
      lastContactedDate: '2023-08-10',
      leadScore: 70,
      leadSource: 'LinkedIn',
      priority: 'Medium'
    },
    {
      id: '3',
      name: 'Michael Chen',
      fullName: 'Michael Chen',
      company: 'DataSphere Analytics',
      companyName: 'DataSphere Analytics',
      email: 'm.chen@datasphere.ai',
      position: 'Head of Innovation',
      jobTitle: 'Head of Innovation',
      status: 'Qualified',
      phone: '(555) 456-7890',
      lastContacted: '2023-08-05',
      lastContactedDate: '2023-08-05',
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
            baseHue={350}
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
                    deleteLead={(id) => deleteLead(id)} 
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
