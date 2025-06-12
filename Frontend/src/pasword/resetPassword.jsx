import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { endpoints } from "../api/api_url";
import axiosInstance from "../api/axiosInstance";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const password = watch("password");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`${endpoints.resetPassword}/${id}`, {
        password: data.password, confirmPassword: data.confirmPassword,
      });
      console.log("Reset password response:", response.data);
      toast.success("Password updated successfully!");
      if (response.data.status === 200) {
        setPasswordUpdated(true);
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password. Try again."
      );
      setPasswordUpdated(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Dots */}
      <div className="absolute w-80 h-80 bg-[#D4AF37]/20 rounded-full top-10 left-10 blur-3xl opacity-20 animate-pulse" />
      <div className="absolute w-72 h-72 bg-[#FF5E5B]/20 rounded-full bottom-10 right-10 blur-3xl opacity-20 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_rgba(212,175,55,0.1)] p-4 lg:p-0 flex flex-col lg:flex-row overflow-hidden relative z-10"
      >
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center text-white p-8 gap-4 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/30">
          <LockKeyhole className="w-14 h-14 text-[#D4AF37]" />
          <h2 className="text-3xl font-bold">
            Reset <span className="text-[#D4AF37]">Password</span>
          </h2>
          <p className="text-[#B0B0B0] text-sm">
            Enter a new password and confirm to update.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8">
          {passwordUpdated ? (
            <p className="text-green-400 text-center">
              Password has been successfully updated!
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Password */}
              <div>
                <label className="block text-[#D4D4D4] font-medium mb-2">
                  New Password <span className="text-[#FF5E5B]">*</span>
                </label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border-2 ${
                      errors.password
                        ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                        : "border-[#444444] focus:border-[#D4AF37]"
                    } focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-white placeholder-[#707070] transition-all`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-[#B0B0B0] hover:text-[#D4AF37] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </motion.div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#FF5E5B] text-sm mt-1"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[#D4D4D4] font-medium mb-2">
                  Confirm Password <span className="text-[#FF5E5B]">*</span>
                </label>
                <motion.div whileHover={{ scale: 1.01 }} className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "This field is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border-2 ${
                      errors.confirmPassword
                        ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                        : "border-[#444444] focus:border-[#D4AF37]"
                    } focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-white placeholder-[#707070] transition-all`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-[#B0B0B0] hover:text-[#D4AF37] transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </motion.div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[#FF5E5B] text-sm mt-1"
                  >
                    {errors.confirmPassword.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FF5E5B] to-[#E74C3C] hover:from-[#E74C3C] hover:to-[#FF5E5B] text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
              >
                Update Password
              </button>
            </form>
          )}

          <p className="mt-6 text-sm text-[#B0B0B0] text-center">
            Remember your password?{" "}
            <a href="/login" className="text-[#D4AF37] hover:underline">
              Go back to login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}