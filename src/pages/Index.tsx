
import { Header } from "@/components/Layout/Header";
import { ChatInterface } from "@/components/Chat/ChatInterface";
import { LampDemo } from "@/components/ui/lamp";
import { AppSidebar } from "@/components/Layout/AppSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
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
