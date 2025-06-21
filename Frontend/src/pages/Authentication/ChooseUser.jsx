import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, CalendarCheck, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChooseUserPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0D0D0D] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="bg-[#2A2A2A] p-4 rounded-full shadow-lg mb-4 border border-[#D4AF37]"
          >
            <Users className="text-[#D4AF37]" size={36} />
          </motion.div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFD700]">
            Choose Your Account Type
          </h2>
          <p className="text-[#B0B0B0] mt-2 max-w-md">
            Select the type of account you'd like to create below.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Normal User Card */}
          <Link to="/user-register" className="group">
            <motion.div
              whileHover={{ y: -5 }}
              className="relative overflow-hidden h-full bg-[#1E1E1E] p-6 rounded-2xl shadow-lg hover:shadow-xl border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center space-y-4 z-10 relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-gradient-to-br from-[#2A2A2A] to-[#333333] p-5 rounded-full shadow-md border border-[#D4AF37] group-hover:border-[#FFD700] transition-all duration-300"
                >
                  <UserPlus className="text-[#D4AF37]" size={40} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">Normal User</h3>
                <p className="text-[#B0B0B0] text-center">
                  Register as a normal user to access basic features,
                  participate in events, and explore our platform.
                </p>
                <ul className="space-y-2 text-left mt-2 text-sm text-[#B0B0B0]">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="text-[#D4AF37]" size={16} /> View
                    upcoming events
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="text-[#D4AF37]" size={16} /> Book
                    tickets
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="text-[#D4AF37]" size={16} /> Get
                    updates
                  </motion.li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 px-5 py-2 bg-[#FF5E5B] text-white cursor-pointer font-semibold rounded-full transition-all shadow-md group-hover:shadow-[#FF5E5B]/50"
                >
                  Register as User
                </motion.button>
              </div>
            </motion.div>
          </Link>

          {/* Event Manager Card */}
          <Link to="/event-manager-register" className="group">
            <motion.div
              whileHover={{ y: -5 }}
              className="relative overflow-hidden h-full bg-[#1E1E1E] p-6 rounded-2xl shadow-lg hover:shadow-xl border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col items-center space-y-4 z-10 relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-gradient-to-br from-[#2A2A2A] to-[#333333] p-5 rounded-full shadow-md border border-[#D4AF37] group-hover:border-[#FFD700] transition-all duration-300"
                >
                  <CalendarCheck className="text-[#D4AF37]" size={40} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">Event Manager</h3>
                <p className="text-[#B0B0B0] text-center">
                  Register as an event manager to create, manage, and promote
                  your own events on our platform.
                </p>
                <ul className="space-y-2 text-left mt-2 text-sm text-[#B0B0B0]">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="text-[#D4AF37]" size={16} /> Create
                    new events
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="text-[#D4AF37]" size={16} /> Manage
                    bookings
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="text-[#D4AF37]" size={16} /> Promote
                    events
                  </motion.li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 px-5 py-2 bg-[#FF5E5B]  cursor-pointer text-white font-semibold rounded-full transition-all shadow-md group-hover:shadow-[#FF5E5B]/50"
                >
                  Register as Manager
                </motion.button>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-[#B0B0B0]"
        >
          <p className="mb-2">
            Please choose the appropriate account type based on your role.
          </p>
          <p>
            If you're unsure, contact our support team at{" "}
            <a
              href="mailto:support@utsavaura.com"
              className="text-[#D4AF37] hover:text-[#FFD700] underline transition-colors"
            >
              support@utsavaura.com
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChooseUserPage;
