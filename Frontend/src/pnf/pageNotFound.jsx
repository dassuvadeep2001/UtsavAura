import React from "react";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <Info className="w-16 h-16 text-[#D4AF37] mb-4" />

        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          404 – Page <span className="text-[#D4AF37]">Not Found</span>
        </h1>

        <p className="text-[#b0b0b0d5] text-base md:text-md mb-6 max-w-md">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <a
          href="/"
           className="inline-block px-3 py-3 bg-gradient-to-r from-[#FF5E5B] to-[#E74C3C] hover:from-[#E74C3C] hover:to-[#FF5E5B] text-white rounded-lg font-semibold shadow-lg transition-all duration-300"
        >
          Go Back Home
        </a>
      </motion.div>
    </div>
  );
}

