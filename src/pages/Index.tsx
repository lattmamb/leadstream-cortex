
import { Header } from "@/components/Layout/Header";
import { ChatInterface } from "@/components/Chat/ChatInterface";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { CarouselNavigation } from "@/components/ui/carousel-navigation";
import { Vortex } from "@/components/ui/vortex";
import { motion } from "framer-motion";

const Index = () => {
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
            baseHue={220} // Blue-based hue
            rangeY={400}
            particleCount={500}
            baseSpeed={0.1}
            rangeSpeed={1.0}
            className="flex flex-col items-center justify-start px-4 py-8 w-full h-full"
          >
            <div className="relative z-10 h-full w-full max-w-6xl mx-auto">
              <div className="h-full flex flex-col">
                <div className="flex-1 relative">
                  <ThreeDPhotoCarousel />
                  <CarouselNavigation />
                </div>
                <div className="mb-4">
                  <ChatInterface />
                </div>
              </div>
            </div>
          </Vortex>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
