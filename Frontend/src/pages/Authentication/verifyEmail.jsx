import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Verified, Info } from "lucide-react";
import { endpoints } from "../../api/api_url";
import axiosInstance from "../../api/axiosInstance";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | expired | invalid

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axiosInstance.get(`${endpoints.verifyEmail}/${token}`);
        console.log("Verification response:", res.data);
        
        if (res.data.message === "Email verified successfully") {
          setStatus("success");
        } 
      } catch (err) {
        setStatus("expired");
      }
    };
    verify();
  }, [token]);

  const getContent = () => {
    switch (status) {
      case "success":
        return {
          icon: <Verified className="w-12 h-12 text-[#D4AF37] mb-4 mx-auto" />,
          title: "Email Verified Successfully",
          text: "Your email has been verified! You can now log in to your account.",
          color: "text-white",
        };
      case "expired":
        return {
          icon: <Info className="w-12 h-12 text-[#FF5E5B] mb-4 mx-auto" />,
          title: "Link Expired",
          text: "The verification link has expired. Please register again.",
          color: "text-[#FF5E5B]",
        };
      case "loading":
      default:
        return {
          icon: <Info className="w-12 h-12 text-[#D4AF37] mb-4 animate-pulse mx-auto" />,
          title: "Verifying...",
          text: "Please wait while we verify your email.",
          color: "text-[#B0B0B0]",
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-3xl backdrop-blur-md border border-[#D4AF37]/20 bg-white/5 shadow-[0_0_40px_rgba(212,175,55,0.07)] text-center"
      >
        {content.icon}
        <h2 className={`text-2xl font-bold mb-2 ${content.color}`}>{content.title}</h2>
        <p className="text-[#B0B0B0]">{content.text}</p>
                      <Link
                        to="/login"
                        className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white rounded-md hover:brightness-110 transition-colors"
                      >
                        Go to Login
                      </Link>
      </motion.div>

      {/* Background floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#D4AF37]/20"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 50 - 25],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default VerifyEmail;

