
import { Header } from "@/components/Layout/Header";
import { ChatInterface } from "@/components/Chat/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-tesla-gray">
      <Header />
      <main className="pt-16">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
