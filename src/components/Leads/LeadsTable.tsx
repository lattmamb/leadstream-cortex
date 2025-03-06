import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Lead {
  id: string;
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  leadSource: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  priority: 'High' | 'Medium' | 'Low';
  createdAt: Date;
}

interface LeadsTableProps {
  data: Lead[];
  deleteLead: (id: string) => void;
  leads?: Lead[];
  onLeadSelect?: (lead: Lead) => void;
  searchQuery?: string;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ 
  data, 
  deleteLead, 
  leads = [], 
  onLeadSelect, 
  searchQuery = "" 
}) => {
  const tableData = leads.length > 0 ? leads : data;
  
  const filteredData = searchQuery 
    ? tableData.filter(lead => 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tableData;

  const columns: ColumnDef<Lead>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const lead = row.original;
        return (
          <div 
            className="cursor-pointer hover:text-blue-500" 
            onClick={() => onLeadSelect && onLeadSelect(lead)}
          >
            {lead.name}
          </div>
        );
      }
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
    {
      accessorKey: 'position',
      header: 'Position',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'leadSource',
      header: 'Lead Source',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const lead = row.original;
        let priorityColor = 'text-gray-500';
        if (lead.priority === "High") {
          priorityColor = 'text-red-500';
        } else if (lead.priority === "Medium") {
          priorityColor = 'text-yellow-500';
        } else if (lead.priority === "Low") {
          priorityColor = 'text-green-500';
        }
        return <div className={priorityColor}>{lead.priority}</div>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const value = row.getValue('createdAt');
        return value instanceof Date ? value.toLocaleDateString() : '';
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button
          onClick={() => deleteLead(row.original.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
