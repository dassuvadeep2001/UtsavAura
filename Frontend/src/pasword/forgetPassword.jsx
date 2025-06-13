import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { endpoints } from "../api/api_url";
import axiosInstance from "../api/axiosInstance";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [status, setStatus] = useState("idle"); // idle | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(endpoints.forgetPassword, {
        email: data.email,
      });
      if (response.status === 200) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Failed to send reset instructions. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background blur dots */}
      <div className="absolute w-80 h-80 bg-[#D4AF37]/20 rounded-full top-10 left-10 blur-3xl opacity-20 animate-pulse" />
      <div className="absolute w-72 h-72 bg-[#FF5E5B]/20 rounded-full bottom-10 right-10 blur-3xl opacity-20 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md lg:max-w-xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_rgba(212,175,55,0.1)] p-8 relative z-10 transition-all duration-300"
      >
        <motion.div
          className="flex flex-col items-center gap-2 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2A2A2A] p-3 rounded-full shadow-lg mb-3 ring-2 ring-[#D4AF37]/50"
          >
            <Mail className="text-[#D4AF37]" size={28} />
          </motion.div>
          <h2 className="text-3xl font-bold text-white text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
            Forgot/Reset Your <span className="text-[#D4AF37]">Password?</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-[#B0B0B0] text-sm text-center mb-6"
        >
          No worries! Enter your email below and we’ll send you a link to reset
          your password and regain access to your account.
        </motion.p>

        {status === "success" ? (
          <p className="text-green-400 text-center">
            ✅ Reset link has been sent to your email.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-[#D4D4D4] font-medium mb-2">
                Email <span className="text-[#FF5E5B]">*</span>
              </label>
              <motion.div whileHover={{ scale: 1.01 }}>
                <input
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border-2 ${
                    errors.email
                      ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                      : "border-[#444444] focus:border-[#D4AF37]"
                  } focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-white placeholder-[#707070] transition-all`}
                />
              </motion.div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#FF5E5B] text-sm mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {status === "error" && (
              <p className="text-[#FF5E5B] text-sm text-center -mt-2">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FF5E5B] to-[#E74C3C] hover:from-[#E74C3C] hover:to-[#FF5E5B] text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-[#B0B0B0] text-center">
          Remember your password?{" "}
          <a href="/login" className="text-[#D4AF37] hover:underline">
            Go back to login
          </a>
        </p>
      </motion.div>
    </div>
  );
}



