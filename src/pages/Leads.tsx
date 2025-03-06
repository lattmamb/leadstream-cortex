
import { Header } from "@/components/Layout/Header";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { LeadsSidebar } from "@/components/Leads/LeadsSidebar";
import { LeadsTable } from "@/components/Leads/LeadsTable";
import { AddLeadButton } from "@/components/Leads/AddLeadButton";
import { Vortex } from "@/components/ui/vortex";
import { motion } from "framer-motion";

const Leads = () => {
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
                <AddLeadButton />
              </div>
              
              <div className="flex gap-4 h-[calc(100vh-10rem)]">
                <div className="w-64 hidden lg:block">
                  <LeadsSidebar />
                </div>
                <div className="flex-1 bg-slate-900/40 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden shadow-xl">
                  <LeadsTable />
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
