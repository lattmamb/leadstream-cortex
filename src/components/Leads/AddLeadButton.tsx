
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export const AddLeadButton = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    jobTitle: "",
    email: "",
    phone: "",
    leadSource: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast.success("Lead added successfully!");
    setShowAddDialog(false);
    setFormData({
      fullName: "",
      companyName: "",
      jobTitle: "",
      email: "",
      phone: "",
      leadSource: "",
    });
  };

  const handleDelete = () => {
    toast.error("This feature is not implemented yet");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="h-4 w-4 mr-2" />
          Lead Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-900 border-white/10">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <DropdownMenuItem className="text-white hover:bg-slate-800">
              <Plus className="h-4 w-4 mr-2" />
              Add New Lead
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 text-white border border-white/10">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-slate-800 border-white/10"
              />
              <Input
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="bg-slate-800 border-white/10"
              />
              <Input
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="bg-slate-800 border-white/10"
              />
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-800 border-white/10"
              />
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-slate-800 border-white/10"
              />
              <Input
                placeholder="Lead Source"
                value={formData.leadSource}
                onChange={(e) => setFormData({ ...formData, leadSource: e.target.value })}
                className="bg-slate-800 border-white/10"
              />
              <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
                Add Lead
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem onClick={handleDelete} className="text-red-500 hover:bg-slate-800">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Selected Lead
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
