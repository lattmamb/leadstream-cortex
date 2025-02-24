
import { type Lead } from "@/pages/Leads";
import DisplayCards from "@/components/ui/display-cards";
import { type DisplayCardProps } from "@/components/ui/display-cards";
import { User, Building2, Star } from "lucide-react";

interface LeadsTableProps {
  leads: Lead[];
  onLeadSelect: (lead: Lead) => void;
  searchQuery: string;
}

export const LeadsTable = ({ leads, onLeadSelect, searchQuery }: LeadsTableProps) => {
  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const leadCards: DisplayCardProps[] = filteredLeads.map((lead) => ({
    icon: <User className="size-4 text-white" />,
    title: lead.fullName,
    description: lead.companyName,
    date: new Date(lead.lastContactedDate).toLocaleDateString(),
    iconClassName: "text-white",
    titleClassName: "text-white",
    className: `cursor-pointer hover:-translate-y-2 ${
      lead.leadScore >= 80
        ? "border-green-500/30"
        : lead.leadScore >= 50
        ? "border-yellow-500/30"
        : "border-red-500/30"
    }`,
    onClick: () => onLeadSelect(lead),
  }));

  return <DisplayCards cards={leadCards} />;
};
