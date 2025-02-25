
import { Header } from "@/components/Layout/Header";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { LeadsTable } from "@/components/Leads/LeadsTable";
import { LeadsSidebar } from "@/components/Leads/LeadsSidebar";
import { AddLeadButton } from "@/components/Leads/AddLeadButton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface Lead {
  id: string;
  fullName: string;
  companyName: string;
  jobTitle: string;
  email: string;
  phone: string;
  leadSource: string;
  leadScore: number;
  status: "New" | "Contacted" | "Interested" | "Proposal Sent" | "Won" | "Lost";
  lastContactedDate: string;
  notes: string;
  priority: "high" | "medium" | "low";
}

const Leads = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Updated mock data with Matthew Lamb and priority levels
  const mockLeads: Lead[] = [
    {
      id: "1",
      fullName: "Matthew Lamb",
      companyName: "Atlas Intelligence",
      jobTitle: "Operations Director",
      email: "matt@fleet.com",
      phone: "(217) 827-1305",
      leadSource: "Walk-in",
      leadScore: 95,
      status: "New",
      lastContactedDate: "2024-03-18",
      notes: "Initial contact made during walk-in visit. Shows high interest in enterprise solutions.",
      priority: "high"
    },
    {
      id: "2",
      fullName: "John Doe",
      companyName: "Tech Corp",
      jobTitle: "CEO",
      email: "john@techcorp.com",
      phone: "(555) 123-4567",
      leadSource: "LinkedIn",
      leadScore: 85,
      status: "Interested",
      lastContactedDate: "2024-03-15",
      notes: "Interested in enterprise plan",
      priority: "medium"
    },
    {
      id: "3",
      fullName: "Jane Smith",
      companyName: "Innovation Inc",
      jobTitle: "CTO",
      email: "jane@innovation.com",
      phone: "(555) 987-6543",
      leadSource: "Website",
      leadScore: 92,
      status: "Proposal Sent",
      lastContactedDate: "2024-03-14",
      notes: "Follow up needed on proposal",
      priority: "low"
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar />
        <div className="flex-1 p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Leads</h1>
            <AddLeadButton />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-white/10 text-white"
              />
            </div>
          </div>
          <div className="flex gap-6 h-[calc(100vh-16rem)] overflow-hidden">
            <div className="flex-1 overflow-auto">
              <LeadsTable
                leads={mockLeads}
                onLeadSelect={setSelectedLead}
                searchQuery={searchQuery}
              />
            </div>
            {selectedLead && (
              <LeadsSidebar lead={selectedLead} onClose={() => setSelectedLead(null)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
