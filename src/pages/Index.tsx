
import { Header } from "@/components/Layout/Header";
import { ChatInterface } from "@/components/Chat/ChatInterface";
import { LampDemo } from "@/components/ui/lamp";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useState, useEffect } from "react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 seconds total animation time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {isLoading && <LoadingScreen />}
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar />
        <div className="flex-1">
          <div className="relative z-10">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
