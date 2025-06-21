import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/api_url";
import { Sparkles } from "lucide-react";

const Queries = () => {
  const [queries, setQueries] = useState([]);

  const fetchQueries = async () => {
    try {
      const res = await axiosInstance.get(endpoints.query);
      setQueries(res.data.data);
    } catch (err) {
      console.error("Error fetching queries:", err);
      toast.error("Failed to load queries");
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] px-4 py-20 text-white overflow-hidden relative">
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-15"
        >
            <div className="w-60 flex items-center justify-center bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
            <Sparkles className="text-[#D4AF37] mr-2" size={18} />
            <span className="text-[#D4AF37] text-sm font-medium">
              UtsavAura Admin Team
            </span>
          </div>
          </motion.div>
      <motion.div
        className="max-w-6xl mx-auto backdrop-blur-sm bg-[#1a1a1a]/70 p-8 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-[#2a2a2a]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}
        <motion.h1
          className="text-3xl w-50 font-semibold bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          User Queries
        </motion.h1>

        <motion.p
          className="text-[#B0B0B0] mb-6 text-sm max-w-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Below are the queries submitted by users. Please address them as soon as possible.
        </motion.p>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {queries.length === 0 ? (
            <p className="col-span-full text-center text-[#888] py-6 italic">
              No queries found at the moment.
            </p>
          ) : (
            queries.map((query) => (
              <motion.div
                key={query._id}
                className="bg-[#121212] border border-[#2a2a2a] hover:border-[#D4AF37] rounded-xl p-5 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#FF5E5B]/20 text-[#D4AF37] font-bold text-lg flex items-center justify-center shadow-inner">
                    {getInitials(query.name)}
                  </div>

                  {/* Name + Email */}
                  <div>
                    <p className="text-[#D4AF37] font-semibold text-base sm:text-lg">
                      {query.name}
                    </p>
                    <p className="text-[#B0B0B0] text-xs truncate w-48">{query.email}</p>
                  </div>
                </div>

                {/* Query Message */}
                <div className="bg-[#1f1f1f] text-[#E0E0E0] text-sm p-4 rounded-lg leading-relaxed border border-[#2b2b2b] shadow-inner">
                  {query.message}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Queries;


