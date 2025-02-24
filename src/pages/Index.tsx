
import { Header } from "@/components/Layout/Header";
import { ChatInterface } from "@/components/Chat/ChatInterface";
import { LampDemo } from "@/components/ui/lamp";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="relative z-10">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
