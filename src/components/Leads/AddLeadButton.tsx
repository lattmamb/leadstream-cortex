import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface AddLeadButtonProps {
  addLead: (lead: { name: string; company: string; position: string; email: string; phone: string; leadSource: string; }) => void;
}

export const AddLeadButton = ({ addLead }: AddLeadButtonProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    jobTitle: '',
    email: '',
    phone: '',
    leadSource: ''
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.companyName || !formData.jobTitle || !formData.email || !formData.phone || !formData.leadSource) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return;
    }

    addLead({
      name: formData.fullName,
      company: formData.companyName,
      position: formData.jobTitle,
      email: formData.email,
      phone: formData.phone,
      leadSource: formData.leadSource
    });
    setOpen(false);
    setFormData({
      fullName: '',
      companyName: '',
      jobTitle: '',
      email: '',
      phone: '',
      leadSource: ''
    });
    toast({
      title: "Success",
      description: "Lead added successfully.",
    })
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Lead</AlertDialogTitle>
          <AlertDialogDescription>
            Fill in the information for the new lead.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Full Name
            </Label>
            <Input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Company Name
            </Label>
            <Input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jobTitle" className="text-right">
              Job Title
            </Label>
            <Input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="leadSource" className="text-right">
              Lead Source
            </Label>
            <Input type="text" id="leadSource" name="leadSource" value={formData.leadSource} onChange={handleChange} className="col-span-3" />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
