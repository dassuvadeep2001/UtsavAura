import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  LogIn,
  Shield,
  Lock,
  Cloud,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/api_url";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(endpoints.login, {
        email: data.email,
        password: data.password,
        role: isAdmin ? "admin" : "user",
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      const { token, user } = response.data;
      console.log("Login response:", response.data);
       // Store authentication data
      localStorage.setItem("token", response.data.token);
      console.log("Token:", response.data.token);
      

      if (!user || !user.role) {
        throw new Error("Invalid user data received from server");
      }

      // Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/profile");
          break;
        case "eventManager":
          navigate("/profile");
          break;
        default:
          navigate("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setError(errorMessage);

      // Show more specific error for admin/user mismatch
      if (err.response?.status === 403) {
        setError(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const carouselSlides = [
    {
      icon: <Shield className="text-[#D4AF37]" size={48} />,
      title: "Enterprise Security",
      description: "Military-grade encryption protects your data at all times.",
      features: [
        "AES-256 Encryption",
        "Zero Trust Protocol",
        "End-to-End Security Layers",
      ],
    },
    {
      icon: <Lock className="text-[#D4AF37]" size={48} />,
      title: "Multi-Factor Auth",
      description: "Secure your account with 2FA and biometric authentication.",
      features: [
        "OTP & Email Verification",
        "Token-Based Access",
        "Device Trust Control",
      ],
    },
    {
      icon: <Zap className="text-[#D4AF37]" size={48} />,
      title: "Lightning Fast",
      description: "Instant access with our high-performance infrastructure.",
      features: ["SSD-Powered Servers", "Global CDN", "1-Click Login Access"],
    },
    {
      icon: <Users className="text-[#D4AF37]" size={48} />,
      title: "Collaborate Seamlessly",
      description: "Real-time updates across all team members.",
      features: [
        "Shared Access & Roles",
        "Instant Notifications",
        "Live Event Syncing",
      ],
    },
    {
      icon: <Cloud className="text-[#D4AF37]" size={48} />,
      title: "Cloud Sync",
      description: "Access your data from anywhere, anytime.",
      features: ["Cross-device Sync", "Auto Cloud Backup", "99.99% Uptime"],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0D0D0D] px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row w-full max-w-6xl bg-[#1E1E1E]/90 backdrop-blur-lg rounded-2xl shadow-2xl shadow-[#D4AF37]/10 border-1 border-[#D4AF37]/80 overflow-hidden"
      >
        {/* Login Form */}
        <div className="w-full lg:w-3/5 p-8 sm:p-12 relative border-r-1 border-[#D4AF37]/80 ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center mb-10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2A2A2A] p-3 rounded-full shadow-lg mb-3 ring-2 ring-[#D4AF37]/50"
            >
              <LogIn className="text-[#D4AF37]" size={28} />
            </motion.div>
            <h2 className="text-3xl font-bold text-center text-white">
              Welcome Back to <span className="text-[#D4AF37]">UtsavAura</span>{" "}
              !
            </h2>
            <p className="text-sm text-[#B0B0B0] mt-1">
              {isAdmin ? "Admin Portal" : "User Login"}
            </p>
          </motion.div>

          {/* Toggle Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex bg-[#2A2A2A] rounded-xl p-1 shadow-inner border border-[#333333]">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => {
                  setIsAdmin(false);
                  reset();
                }}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  !isAdmin
                    ? "bg-[#FF5E5B] shadow-md text-white"
                    : "text-[#B0B0B0] hover:text-[#D4AF37] bg-transparent"
                }`}
              >
                User Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => {
                  setIsAdmin(true);
                  reset();
                }}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
                  isAdmin
                    ? "bg-[#FF5E5B] shadow-md text-white"
                    : "text-[#B0B0B0] hover:text-[#D4AF37] bg-transparent"
                }`}
              >
                Admin Login
              </motion.button>
            </div>
          </motion.div>
          {/* Add this below the toggle buttons */}
          <p className="text-center text-xs text-[#B0B0B0] mt-1">
            {isAdmin
              ? "Only admin accounts can login here"
              : "Users and event managers can login here"}
          </p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label className="block text-[#D4D4D4] font-medium mb-2">
                {isAdmin ? "Admin Email" : "Email"}{" "}
                <span className="text-[#FF5E5B]">*</span>
              </label>
              <motion.div whileHover={{ scale: 1.01 }}>
                <input
                  {...register("email", {
                    required: "This field is required",
                  })}
                  placeholder={
                    isAdmin ? "Enter admin email" : "Enter your email"
                  }
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

            <div>
              <label className="block text-[#D4D4D4] font-medium mb-2">
                Password <span className="text-[#FF5E5B]">*</span>
              </label>
              <motion.div whileHover={{ scale: 1.01 }} className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border-2 pr-10 ${
                    errors.password
                      ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                      : "border-[#444444] focus:border-[#D4AF37]"
                  } focus:ring-2 focus:ring-[#D4AF37]/30 outline-none text-white placeholder-[#707070] transition-all`}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="absolute right-3 top-3 text-[#B0B0B0] hover:text-[#D4AF37] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </motion.button>
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
            <p
              onClick={() => navigate("/forgot-password")}
              className="text-right text-sm text-[#B0B0B0] hover:text-[#D4AF37] cursor-pointer mt-2"
            >
              Forgot password?
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-[#FF5E5B] to-[#E74C3C] hover:from-[#E74C3C] hover:to-[#FF5E5B] text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center ${
                isLoading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin mr-3 h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <LogIn className="mr-2" size={18} />
                  Login
                </>
              )}
            </motion.button>

            {!isAdmin && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-m text-[#B0B0B0] mt-4"
              >
                New to <span className="text-[#D4AF37]">UtsavAura</span>?{" "}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="/choose-user"
                  className="text-[#D4AF37] hover:text-[#FFD700] font-medium underline transition-colors"
                >
                  Register Now
                </motion.a>
              </motion.p>
            )}
          </motion.form>
        </div>

        {/* Carousel */}
        <div className="w-full lg:w-2/5 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-8 flex items-center justify-center border-l-2 border-[#333333]/50 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 10 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute rounded-full bg-[#D4AF37]/10"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="w-full max-w-md relative z-10">
            <Carousel
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={5000}
              stopOnHover={false}
              swipeable
              emulateTouch
              className="carousel-container"
              renderIndicator={(onClickHandler, isSelected, index, label) => (
                <li
                  className={`inline-block mx-1 w-2 h-2 rounded-full transition-all ${
                    isSelected ? "bg-[#D4AF37] w-4" : "bg-[#444444]"
                  }`}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-label={`Slide ${index + 1}`}
                />
              )}
            >
              {carouselSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center p-4 h-full"
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="bg-[#2A2A2A] p-4 rounded-full mb-6 border border-[#D4AF37]/20"
                  >
                    {slide.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {slide.title}
                  </h3>
                  <p className="text-[#D4D4D4] text-sm mb-3">
                    {slide.description}
                  </p>
                  <ul className="text-[#D4D4D4] text-sm space-y-2 text-left">
                    {slide.features?.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle
                          className="text-[#D4AF37] mr-2"
                          size={16}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </Carousel>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
