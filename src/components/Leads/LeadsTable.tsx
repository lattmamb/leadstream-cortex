
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Lead } from "@/pages/Leads";

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

  return (
    <div className="rounded-md border border-white/10 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white/70">Name</TableHead>
            <TableHead className="text-white/70">Company</TableHead>
            <TableHead className="text-white/70">Email</TableHead>
            <TableHead className="text-white/70">Status</TableHead>
            <TableHead className="text-white/70">Score</TableHead>
            <TableHead className="text-white/70">Last Contacted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead) => (
            <TableRow
              key={lead.id}
              className="cursor-pointer hover:bg-slate-800/50"
              onClick={() => onLeadSelect(lead)}
            >
              <TableCell className="text-white">{lead.fullName}</TableCell>
              <TableCell className="text-white/70">{lead.companyName}</TableCell>
              <TableCell className="text-white/70">{lead.email}</TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <span
                  className={`text-sm ${
                    lead.leadScore >= 80
                      ? "text-green-400"
                      : lead.leadScore >= 50
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {lead.leadScore}
                </span>
              </TableCell>
              <TableCell className="text-white/70">
                {new Date(lead.lastContactedDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
