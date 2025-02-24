
import { Header } from "@/components/Layout/Header";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { useState, useEffect } from "react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {isLoading && <LoadingScreen />}
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
