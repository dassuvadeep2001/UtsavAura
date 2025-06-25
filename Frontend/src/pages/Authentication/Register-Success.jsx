import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import base_url, { endpoints } from "../../api/api_url";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isValidAccess, setIsValidAccess] = useState(false);

  useEffect(() => {
    // Check if coming from Stripe redirect or has session_id
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      // If no session_id, redirect to home or appropriate page
      navigate("/");
      return;
    }

    setIsValidAccess(true);
  }, [location, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: Math.min(
          window.innerWidth,
          document.documentElement.clientWidth
        ),
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isValidAccess) return;

    const handlePaymentSuccess = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get("session_id");

      if (!sessionId) {
        setStatus("error");
        return;
      }

      try {
        const response = await axios.post(
          `${base_url}api/stripe/confirm-payment`,
          { sessionId }
        );

        if (!response.data.success) {
          throw new Error("Payment not completed.");
        }

        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    handlePaymentSuccess();
  }, [navigate, isValidAccess]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (!isValidAccess) {
    return null; // Or a loading spinner while redirect happens
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0D0D0D] to-[#1A1A1A] text-white overflow-x-hidden">
      {/* Confetti for success state */}
      {status === "success" && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <motion.div
        className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative elements - add overflow-hidden here */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-[#D4AF37] blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-[#FF5E5B] blur-3xl"></div>
        </div>

        {/* Main content container - ensure proper width constraints */}
        <motion.div
          className="max-w-2xl w-full bg-[#121212]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-12 border border-[#D4AF37]/30 shadow-xl relative mx-auto"
          variants={itemVariants}
        >
          {/* Status indicator */}
          <div className="flex justify-center mb-6 sm:mb-8">
            {status === "loading" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#D4AF37] border-t-transparent flex items-center justify-center"
              >
                <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37] animate-spin" />
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4AF37]/20 flex items-center justify-center"
              >
                <CheckCircle
                  className="w-12 h-12 sm:w-16 sm:h-16 text-[#D4AF37]"
                  strokeWidth={1.5}
                />
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF5E5B]/20 flex items-center justify-center"
              >
                <XCircle
                  className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF5E5B]"
                  strokeWidth={1.5}
                />
              </motion.div>
            )}
          </div>

          {/* Content */}
          <motion.div variants={itemVariants}>
            {status === "loading" && (
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B]">
                  Processing Your Registration
                </h2>
                <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                  We're confirming your payment and setting up your account...
                </p>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <motion.div
                    className="bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  ></motion.div>
                </div>
              </>
            )}

            {status === "success" && (
              <>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B]">
                  Welcome to UtsavAura!
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">
                  Your registration is complete and payment has been confirmed.
                </p>
                <div className="mb-4 p-8 bg-[#1e1e1e] rounded-lg">
                  <p className="text-sm md:text-md text-[#a0a0a0] flex items-center justify-center">
                    We've sent a verification link to your email. Please verify
                    your account before login.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-center gap-4 mt-6 sm:mt-8">
                    <button
                      onClick={() => navigate("/login")}
                      className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all text-sm"
                    >
                      Go to Login Now
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Footer note */}
          <motion.p
            className="mt-6 sm:mt-8 text-gray-500 text-xs"
            variants={itemVariants}
          >
            Need help? Contact us at support@utsavaura.com
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterSuccess;
