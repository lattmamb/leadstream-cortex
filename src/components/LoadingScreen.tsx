
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
    >
      <div className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full absolute inset-0">
          <SparklesCore
            id="tsparticlesloader"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={1}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
          className="relative z-20"
        >
          <motion.h1
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="md:text-8xl text-5xl font-bold text-center bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-transparent"
          >
            ATLAS
          </motion.h1>
        </motion.div>
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="h-[2px] w-64 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="text-white/60 text-center"
          >
            Generating the future with AI
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
