
import { Header } from "@/components/Layout/Header";
import { AppSidebar } from "@/components/Layout/AppSidebar";

const Calendar = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Calendar</h1>
          <div className="grid gap-4">
            <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-lg border border-white/10">
              <p className="text-white/70">Calendar features coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
