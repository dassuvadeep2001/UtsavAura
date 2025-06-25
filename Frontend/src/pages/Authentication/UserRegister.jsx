import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  RefreshCw,
  UserPlus,
  Eye,
  EyeOff,
  Check,
  Zap,
  BarChart2,
  Ticket,
  Mail,
  Lightbulb,
  Smartphone,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/api_url";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

// Utility: Generate CAPTCHA
const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const UserRegister = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      captchaInput: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    trigger,
    control,
  } = methods;

  const password = watch("password");
  const phone = watch("phone");

  // Real-time validation triggers
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      // Trigger validation when password or confirmPassword changes
      if (name === "password" || name === "confirmPassword") {
        trigger("confirmPassword");
      }

      // Trigger validation when phone number changes
      if (name === "phone") {
        trigger("phone");
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const handleCaptchaRefresh = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setValue("captchaInput", "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profileImage", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data) => {
    if (data.captchaInput !== captcha) {
      alert("Invalid CAPTCHA. Please try again.");
      handleCaptchaRefresh();
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      // Clean and validate phone number
      const phone = data.phone.replace(/\D/g, ""); // Remove all non-digits
      if (phone.length !== 10) {
        throw new Error("Phone number must be exactly 10 digits");
      }

      // Append all required fields in the exact format backend expects
      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim().toLowerCase()); // Ensure lowercase email
      formData.append("phone", phone);
      formData.append("address", data.address.trim());
      formData.append("password", data.password);

      // Only append profileImage if it exists
      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }

      // Step 1: Create user in backend
      const userRes = await axiosInstance.post(endpoints.register, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (userRes.data.status !== 201) {
        throw new Error(userRes.data.message || "Registration failed");
      }

      // Step 2: Create Stripe checkout session
      const stripeResponse = await axiosInstance.post(
        "/api/stripe/create-checkout-session",
        {
          userType: "user",
          email: userRes.data.data.email, // or userRes.data.email based on your structure
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const stripeSessionId = stripeResponse.data.sessionId;

      // Step 3: Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: stripeSessionId,
      });

      if (error) {
        alert("Stripe Error: " + error.message);
      }

      // If you reach here, the redirect was successful
      // Clear form and CAPTCHA since the user will be redirected
      reset();
      setPreview(null);
      setCaptcha(generateCaptcha());
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.response && error.response.data) {
        const { message, errors: fieldErrors } = error.response.data;

        if (fieldErrors && Array.isArray(fieldErrors)) {
          errorMessage = fieldErrors
            .map((e) => `${e.field}: ${e.message}`)
            .join("<br />");
        } else if (message) {
          errorMessage = message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
      handleCaptchaRefresh();
    } finally {
      setIsLoading(false);
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
      // Show success message for valid fields
      if (fieldName === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return (
          <p className="mt-1 text-sm text-[#4ADE80] flex items-center">
            <CheckCircle size={14} className="mr-1" />
            Valid email
          </p>
        );
      }

      if (fieldName === "phone" && value.replace(/\D/g, "").length === 10) {
        return (
          <p className="mt-1 text-sm text-[#4ADE80] flex items-center">
            <CheckCircle size={14} className="mr-1" />
            Valid phone number
          </p>
        );
      }

      if (fieldName === "password" && value.length >= 8) {
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

  const features = [
    {
      icon: <Zap className="text-[#D4AF37]" size={20} />,
      title: "End-to-end event management",
      description: "Plan and execute flawless events from start to finish",
    },
    {
      icon: <BarChart2 className="text-[#D4AF37]" size={20} />,
      title: "In-depth event analytics",
      description: "Get actionable insights from your event data",
    },
    {
      icon: <Ticket className="text-[#D4AF37]" size={20} />,
      title: "OK commission event ticketing",
      description: "Sell tickets with zero commission fees",
    },
    {
      icon: <Mail className="text-[#D4AF37]" size={20} />,
      title: "Multichannel marketing tools",
      description: "Promote your events across multiple platforms",
    },
    {
      icon: <Smartphone className="text-[#D4AF37]" size={20} />,
      title: "Touchless onsite solutions",
      description: "Contactless check-ins and digital badges",
    },
  ];

  const trustedBy = ["amazon", "Discovery", "Lovis"];

  return (
    <div className="min-h-screen flex bg-[#0D0D0D]">
      {/* Left Side - Fixed Features (30%) */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex flex-col w-[30%] px-4 py-15 bg-[#0D0D0D] text-[#FFFFFF] relative overflow-hidden border-r border-[#333333]"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 15 + Math.random() * 30,
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
        <div className="relative z-10 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 mb-6 mx-auto border-2 border-[#D4AF37]/30"
          >
            <Lightbulb className="text-[#D4AF37]" size={28} />
          </motion.div>
          <h2 className="text-xl font-semibold text-center text-[#B0B0B0] mb-2">
            Why UtsavAura?
          </h2>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-center mb-6 text-[#FFFFFF]"
          >
            Everything you need{" "}
            <span className="text-[#D4AF37]">(and then some)</span>
          </motion.h1>
          <div className="space-y-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-start space-x-3 p-3 rounded-lg bg-[#1A1A1A] backdrop-blur-sm hover:bg-[#252525] transition-all"
              >
                <div className="flex-shrink-0 mt-0.5 p-1.5 bg-[#D4AF37]/50 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-base font-medium text-[#FFFFFF]">
                    {feature.title}
                  </h3>
                  <p className="text-[#B0B0B0] text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-auto relative z-10">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3 text-center"
          >
            Trusted by industry leaders
          </motion.h3>
          <motion.div
            className="flex items-center justify-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {trustedBy.map((company, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-base font-medium text-[#B0B0B0] hover:text-[#FFFFFF] transition-colors"
              >
                {company}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Scrollable Form (70%) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-[70%] overflow-y-auto py-20 px-4"
      >
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="max-w-4xl mx-auto bg-[#1A1A1A] p-10 rounded-2xl shadow-2xl border-1 border-[#D4AF37]/70 transition-all"
        >
          {/* Header with animated gradient */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center mb-8 text-center"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#D4AF37] p-3 rounded-full mb-4 shadow-lg"
            >
              <UserPlus className="text-[#0D0D0D]" size={28} />
            </motion.div>
            <h2 className="text-3xl font-bold text-[#D4AF37]">
              Create Your Account
            </h2>
            <p className="text-sm text-[#B0B0B0] mt-2">
              Join UtsavAura today and unlock exclusive features!
            </p>
          </motion.div>

          {/* Conditional Rendering Based on Registration Status */}
          {!showSuccessMessage ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Two-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="name"
                    className="block font-medium text-[#B0B0B0]"
                  >
                    Full Name <span className="text-[#FF5E5B]">*</span>
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      placeholder="John Doe"
                      className={`w-full border-2 ${
                        errors.name
                          ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                          : "border-[#333333] hover:border-[#D4AF37] focus:border-[#D4AF37]"
                      } px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all bg-[#0D0D0D] text-[#FFFFFF]`}
                    />
                  </motion.div>
                  {renderValidationMessage("name")}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="email"
                    className="block font-medium text-[#B0B0B0]"
                  >
                    Email Address <span className="text-[#FF5E5B]">*</span>
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                        validate: async (value) => {
                          try {
                            const response = await axiosInstance.get(
                              endpoints.emailCheck,
                              {
                                params: { email: value },
                              }
                            );

                            if (response.data.exists === true) {
                              return "This email is already registered.";
                            }
                            return true;
                          } catch (error) {
                            console.error("Email validation error:", error);
                            return "Error checking email.";
                          }
                        },
                      })}
                      placeholder="you@example.com"
                      className={`w-full border-2 ${
                        errors.email
                          ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                          : "border-[#333333] hover:border-[#D4AF37] focus:border-[#D4AF37]"
                      } px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all bg-[#0D0D0D] text-[#FFFFFF]`}
                    />
                  </motion.div>
                  {renderValidationMessage("email")}
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="phone"
                    className="block font-medium text-[#B0B0B0]"
                  >
                    Phone Number <span className="text-[#FF5E5B]">*</span>
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                        validate: {
                          validLength: (value) => {
                            const digits = value.replace(/\D/g, "");
                            return (
                              digits.length === 10 ||
                              "Must be exactly 10 digits"
                            );
                          },
                          validNumber: (value) => {
                            const digits = value.replace(/\D/g, "");
                            return (
                              /^\d+$/.test(digits) ||
                              "Must contain only numbers"
                            );
                          },
                        },
                      })}
                      placeholder="1234567890"
                      maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setValue("phone", value, { shouldValidate: true });
                      }}
                      className={`w-full border-2 ${
                        errors.phone
                          ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                          : "border-[#333333] hover:border-[#D4AF37] focus:border-[#D4AF37]"
                      } px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all bg-[#0D0D0D] text-[#FFFFFF]`}
                    />
                  </motion.div>
                  {renderValidationMessage("phone")}
                </motion.div>

                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="address"
                    className="block font-medium text-[#B0B0B0]"
                  >
                    Address <span className="text-[#FF5E5B]">*</span>
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <input
                      id="address"
                      {...register("address", {
                        required: "Address is required",
                        minLength: {
                          value: 3,
                          message: "Address must be at least 3 characters",
                        },
                        maxLength: {
                          value: 100,
                          message: "Address must be less than 100 characters",
                        },
                      })}
                      placeholder="New York"
                      className={`w-full border-2 ${
                        errors.address
                          ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                          : "border-[#333333] hover:border-[#D4AF37] focus:border-[#D4AF37]"
                      } px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all bg-[#0D0D0D] text-[#FFFFFF]`}
                    />
                  </motion.div>
                  {renderValidationMessage("address")}
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="password"
                    className="block font-medium text-[#B0B0B0]"
                  >
                    Password <span className="text-[#FF5E5B]">*</span>
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} className="relative">
                    <input
                      id="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                          message:
                            "Must include uppercase, lowercase, number, and special character (!@#$%^&*)",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full border-2 ${
                        errors.password
                          ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                          : "border-[#333333] hover:border-[#D4AF37] focus:border-[#D4AF37]"
                      } px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all bg-[#0D0D0D] text-[#FFFFFF] pr-12`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] hover:text-[#D4AF37]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </motion.button>
                  </motion.div>
                  {renderValidationMessage("password")}
                  <div className="text-xs text-[#B0B0B0] mt-2">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li
                        className={
                          watch("password")?.length >= 8 ? "text-[#4ADE80]" : ""
                        }
                      >
                        At least 8 characters
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
                          /[!@#$%^&*]/.test(watch("password") || "")
                            ? "text-[#4ADE80]"
                            : ""
                        }
                      >
                        One special character
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="confirmPassword"
                    className="block font-medium text-[#B0B0B0]"
                  >
                    Confirm Password <span className="text-[#FF5E5B]">*</span>
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} className="relative">
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Please confirm password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full border-2 ${
                        errors.confirmPassword
                          ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                          : "border-[#333333] hover:border-[#D4AF37] focus:border-[#D4AF37]"
                      } px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all bg-[#0D0D0D] text-[#FFFFFF] pr-12`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] hover:text-[#D4AF37]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </motion.button>
                  </motion.div>
                  {renderValidationMessage("confirmPassword")}
                </motion.div>

                {/* Profile Image Upload */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-1"
                >
                  <label className="block font-medium text-[#B0B0B0]">
                    Profile Picture{" "}
                    <span className="text-[#B0B0B0]">(Optional)</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="cursor-pointer"
                    >
                      <div className="border-2 border-dashed border-[#333333] hover:border-[#D4AF37] rounded-xl p-2 transition-all group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <div className="text-center py-2 px-4">
                          <p className="text-sm text-[#B0B0B0] group-hover:text-[#D4AF37] transition-colors">
                            {preview ? "Change Image" : "Upload Image"}
                          </p>
                        </div>
                      </div>
                    </motion.label>
                    {preview && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <img
                          src={preview}
                          alt="Profile Preview"
                          className="w-16 h-16 object-cover rounded-full border-2 border-[#D4AF37] shadow-sm"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => {
                            setPreview(null);
                            setValue("profileImage", null);
                          }}
                          className="absolute -top-2 -right-2 bg-[#FF5E5B] text-white rounded-full p-1 shadow-md hover:bg-[#FF5E5B]/90 transition-colors"
                          aria-label="Remove image"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* CAPTCHA */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-1"
                >
                  <label className="block font-medium text-[#B0B0B0]">
                    CAPTCHA <span className="text-[#FF5E5B]">*</span>
                  </label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#0D0D0D] px-4 py-3 rounded-xl text-lg font-mono tracking-wider text-[#D4AF37] flex-1 select-none border-2 border-[#333333]">
                        {captcha}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05, rotate: 180 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleCaptchaRefresh}
                        className="p-2.5 bg-[#1A1A1A] text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#252525] rounded-xl transition-all shadow-sm border-2 border-[#333333] cursor-pointer"
                        aria-label="Refresh CAPTCHA"
                      >
                        <RefreshCw size={18} />
                      </motion.button>
                    </div>
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <input
                        {...register("captchaInput", {
                          required: "Please enter the CAPTCHA",
                        })}
                        placeholder="Type the CAPTCHA above"
                        className={`w-full border-2 ${
                          errors.captchaInput
                            ? "border-[#FF5E5B] focus:border-[#FF5E5B]"
                            : "border-[#333333] hover:border-[#D4AF37] focus:border-[#D4AF37]"
                        } px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none transition-all bg-[#0D0D0D] text-[#FFFFFF]`}
                      />
                    </motion.div>
                    {renderValidationMessage("captchaInput")}
                  </div>
                </motion.div>
              </div>

              {/* Terms and Conditions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-start mt-4"
              >
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="focus:ring-[#D4AF37] h-4 w-4 text-[#D4AF37] border-[#333333] rounded bg-[#0D0D0D]"
                    {...register("terms", {
                      required: "You must accept the terms",
                    })}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-[#B0B0B0]">
                    I agree to the{" "}
                    <a
                      href="/legal"
                      className="text-[#D4AF37] hover:text-[#D4AF37]/90"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/legal"
                      className="text-[#D4AF37] hover:text-[#D4AF37]/90"
                    >
                      Privacy Policy
                    </a>
                  </label>
                  {errors.terms && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-[#FF5E5B]"
                    >
                      {errors.terms.message}
                    </motion.p>
                  )}
                </div>
              </motion.div>
              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white py-3.5 rounded-xl transition-all font-semibold shadow-lg hover:shadow-[#FF5E5B]/30 mt-4 flex items-center justify-center border-2 border-[#FF5E5B]/30 ${
                  isLoading ? "opacity-90 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <span className="drop-shadow-sm">Complete Registration</span>
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4 p-10 bg-green-500/10 border border-green-500/30 rounded-xl mt-16 mb-16"
            >
              <Check size={48} className="mx-auto text-green-400" />
              <h3 className="text-xl font-bold text-white">
                Registration Successful!
              </h3>
              <p className="text-[#B0B0B0]">
                We've sent a verification link to your email. Please verify your
                account before logging in.
              </p>
              <Link
                to="/login"
                className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white rounded-md hover:brightness-110 transition-colors"
              >
                Go to Login
              </Link>
            </motion.div>
          )}

          {/* Login Link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center text-sm text-[#B0B0B0] mt-6"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#D4AF37] hover:text-[#D4AF37]/90 hover:underline transition-colors cursor-pointer"
            >
              Log In
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserRegister;
