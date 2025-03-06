
import { Header } from "@/components/Layout/Header";
import { ChatInterface } from "@/components/Chat/ChatInterface";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar />
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 h-full">
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <ThreeDPhotoCarousel />
              </div>
              <div className="mb-4">
                <ChatInterface />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
