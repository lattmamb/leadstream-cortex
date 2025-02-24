
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AddLeadButton = () => {
  return (
    <Button className="bg-cyan-500 hover:bg-cyan-600">
      <Plus className="h-4 w-4 mr-2" />
      Add Lead
    </Button>
  );
};
