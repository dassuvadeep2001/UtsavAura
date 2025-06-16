import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { LockKeyhole, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { endpoints } from "../api/api_url";
import axiosInstance from "../api/axiosInstance";

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm({ mode: "onChange" });

  const { id } = useParams();
  const navigate = useNavigate();
  const password = watch("password");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Real-time validation triggers
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "password" || name === "confirmPassword") {
        trigger("confirmPassword");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`${endpoints.resetPassword}/${id}`, {
        password: data.password,
        confirmPassword: data.confirmPassword,
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

  // Validation messages that appear/disappear in real-time
  const renderValidationMessage = (fieldName) => {
    const value = watch(fieldName);
    const error = errors[fieldName];

    if (error) {
      return (
        <p className="mt-1 text-sm text-[#FF5E5B] flex items-center">
          <AlertTriangle size={14} className="mr-1" />
          {error.message}
        </p>
      );
    }

    if (value && value.length > 0) {
      if (fieldName === "password" && value.length >= 6) {
        return (
          <div className="text-xs text-[#4ADE80] mt-2">
            Password strength:{" "}
            {value.length >= 12 &&
            /[A-Z]/.test(value) &&
            /\d/.test(value) &&
            /[@$!%*?&]/.test(value)
              ? "Strong"
              : value.length >= 8
              ? "Medium"
              : "Weak"}
          </div>
        );
      }

      if (fieldName === "confirmPassword" && value === watch("password")) {
        return (
          <p className="mt-1 text-sm text-[#4ADE80] flex items-center">
            <CheckCircle size={14} className="mr-1" />
            Passwords match
          </p>
        );
      }
    }

    return null;
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4 p-6 bg-green-500/10 border border-green-500/30 rounded-xl"
            >
              <CheckCircle size={48} className="mx-auto text-green-400" />
              <h3 className="text-xl font-bold text-white">
                Password Updated Successfully!
              </h3>
              <p className="text-[#B0B0B0]">
                You'll be redirected to login page shortly.
              </p>
            </motion.div>
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
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                        message:
                          "Include uppercase, lowercase, number, and special character",
                      },
                    })}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border-2 ${
                      errors.password
                        ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                        : "border-[#444444] hover:border-[#D4AF37] focus:border-[#D4AF37]"
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
                {renderValidationMessage("password")}
                <div className="text-xs text-[#B0B0B0] mt-2">
                  <p>Password must contain:</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li
                      className={
                        watch("password")?.length >= 6 ? "text-[#4ADE80]" : ""
                      }
                    >
                      At least 6 characters
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(watch("password") || "")
                          ? "text-[#4ADE80]"
                          : ""
                      }
                    >
                      One uppercase letter
                    </li>
                    <li
                      className={
                        /\d/.test(watch("password") || "")
                          ? "text-[#4ADE80]"
                          : ""
                      }
                    >
                      One number
                    </li>
                    <li
                      className={
                        /[@$!%*?&]/.test(watch("password") || "")
                          ? "text-[#4ADE80]"
                          : ""
                      }
                    >
                      One special character (@$!%*?&)
                    </li>
                  </ul>
                </div>
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
                      required: "Please confirm password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    placeholder="Confirm new password"
                    className={`w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border-2 ${
                      errors.confirmPassword
                        ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                        : "border-[#444444] hover:border-[#D4AF37] focus:border-[#D4AF37]"
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
                {renderValidationMessage("confirmPassword")}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!isValid}
                className={`w-full bg-gradient-to-r from-[#FF5E5B] to-[#E74C3C] text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 ${
                  !isValid
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:from-[#E74C3C] hover:to-[#FF5E5B]"
                }`}
              >
                Update Password
              </motion.button>
            </form>
          )}

          <p className="mt-6 text-sm text-[#B0B0B0] text-center">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-[#D4AF37] hover:underline transition-colors"
            >
              Go back to login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}