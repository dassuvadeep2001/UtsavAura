import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  VenetianMask,
  Calendar,
  Camera,
  FileText,
  ChevronDown,
  ClipboardList,
  Check,
} from "lucide-react";
import { Controller } from "react-hook-form";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/api_url";
import { Link, useNavigate } from "react-router-dom";

export function EventManagerRegister() {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    setValue,
    watch,
    trigger,
    formState: { errors, isValid, isDirty },
  } = methods;

  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const steps = [
    "Personal Details",
    "Account Security",
    "Professional Details",
    "Declaration",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profileImage", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(endpoints.categories);
        const categoriesData = response.data.data;
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      // Trigger validation when age changes
      if (name === "age") {
        trigger("age");
      }

      // Trigger validation when description changes
      if (name === "description") {
        trigger("description");
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onNext = async () => {
    const fields = {
      0: ["name", "email", "phone", "address"],
      1: ["password", "confirmPassword"],
      2: [
        "age",
        "gender",
        "categoryId",
        "service",
        "description",
        "previousWorkImages",
      ],
      3: ["agree"],
    }[step];

    if (fields) {
      const isValid = await trigger(fields);
      if (!isValid) return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      const phone = data.phone.replace(/\D/g, "");

      if (phone.length !== 10) {
        throw new Error("Phone number must be exactly 10 digits");
      }

      // Basic user information
      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim().toLowerCase());
      formData.append("phone", phone);
      formData.append("address", data.address.trim());
      formData.append("password", data.password);

      // Professional details
      formData.append("gender", data.gender || "");
      formData.append("age", data.age || "");
      formData.append("description", data.description || "");

      // Handle categoryId array
      if (data.categoryId && data.categoryId.length > 0) {
        data.categoryId.forEach((category) => {
          formData.append("categoryId", category);
        });
      }

      // Handle service array
      if (data.service && data.service.length > 0) {
        data.service.forEach((service) => {
          formData.append("service", service);
        });
      }

      // Profile image
      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }

      // Handle previous work images
      if (data.previousWorkImages && data.previousWorkImages.length > 0) {
        Array.from(data.previousWorkImages).forEach((file, index) => {
          formData.append(`previousWorkImages`, file);
        });
      }

      const response = await axiosInstance.post(
        endpoints.eventManagerRegister,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status !== 201) {
        throw new Error(response.data.message || "Registration failed");
      }
      setShowSuccessMessage(true);
      methods.reset();
      setPreview(null);
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;

        if (errors && Array.isArray(errors)) {
          errorMessage = errors
            .map((e) => `${e.field}: ${e.message}`)
            .join("<br />");
        } else if (message) {
          errorMessage = message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        autoClose: false,
        dangerouslyHTMLString: true,
      });
    } finally {
      setLoading(false);
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

      if (fieldName === "age" && value >= 18 && value <= 60) {
        return (
          <p className="mt-1 text-sm text-[#4ADE80] flex items-center">
            <CheckCircle size={14} className="mr-1" />
            Age within valid range
          </p>
        );
      }

      if (fieldName === "description" && value.length >= 50) {
        return (
          <p className="mt-1 text-sm text-[#4ADE80] flex items-center">
            <CheckCircle size={14} className="mr-1" />
            Minimum 50 characters reached
          </p>
        );
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen flex bg-[#0D0D0D] text-white">
      {/* Left Sidebar - 30% width */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex flex-col w-[30%] bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] py-12 px-8 border-r border-[#333333]"
      >
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#D4AF37]">UtsavAura</h2>
          <p className="text-[#B0B0B0]">Event Manager Registration Steps</p>
        </div>

        <div className="relative h-[300px]">
          <motion.div className="absolute top-0 left-5 h-full w-0.5 bg-[#333333] pt-12 pb-8">
            <motion.div
              className="absolute top-0 left-0 w-0.5 bg-[#D4AF37]"
              initial={{ height: 0 }}
              animate={{
                height: `calc(${
                  (step / Math.max(steps.length - 1, 1)) * 100
                }%)`,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
              key={`progress-${step}`}
            />
          </motion.div>

          <ul className="space-y-10 relative z-10">
            {steps.map((label, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start space-x-4 ${
                  i <= step ? "text-white" : "text-gray-400"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 ${
                    i <= step
                      ? "bg-[#D4AF37] text-black"
                      : "border border-gray-600"
                  }`}
                >
                  {i < step ? (
                    <CheckCircle size={18} />
                  ) : i === step ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                    >
                      {i + 1}
                    </motion.div>
                  ) : (
                    i + 1
                  )}
                </div>

                <div>
                  <h3
                    className={`text-lg font-medium ${
                      i <= step ? "text-[#D4AF37]" : ""
                    }`}
                  >
                    {label}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {i === 0 && "Your basic information"}
                    {i === 1 && "Secure your account"}
                    {i === 2 && "Professional details"}
                    {i === 3 && "Terms and conditions"}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="mt-auto pt-8 border-t border-[#333333]">
          <p className="text-sm text-[#B0B0B0]">
            Already have an account?{" "}
            <a href="/login" className="text-[#D4AF37] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </motion.div>

      {/* Right Form Section - 70% width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-[70%] overflow-y-auto py-12 px-6 md:px-16"
      >
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="max-w-4xl mx-auto bg-[#1A1A1A] p-10 rounded-2xl shadow-2xl border-1 border-[#D4AF37]/70 transition-all"
        >
          {/* New Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4 flex-col md:flex-row sm:flex-row">
              <ClipboardList size={36} className="text-[#D4AF37]" />
              <h1 className="text-3xl md:text-3xl font-bold text-center bg-gradient-to-r from-[#D4AF37] to-[#F1C84C] bg-clip-text text-transparent flex items-center justify-center ">
                Event Manager Registration
              </h1>
            </div>
            <p className="text-center text-[#B0B0B0] max-w-2xl mx-auto">
              Join our platform to showcase your event management services and
              connect with clients looking for professional event organizers.
            </p>
          </motion.div>
          <FormProvider {...methods}>
            {!showSuccessMessage ? (
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Step Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#D4AF37]">
                        Step {step + 1} of {steps.length}
                      </p>
                      <h2 className="text-2xl font-bold text-white mt-1">
                        {steps[step]}
                      </h2>
                    </div>
                    <div className="lg:hidden">
                      <div className="flex items-center space-x-2 bg-[#252525] px-3 py-1 rounded-full">
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-black text-sm font-bold">
                          {step + 1}
                        </div>
                        <span className="text-sm">{steps[step]}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#B0B0B0] mt-2">
                    {step === 0 &&
                      "Please provide your personal details to get started."}
                    {step === 1 &&
                      "Create a secure password to protect your account."}
                    {step === 2 && "Tell us about your professional services."}
                    {step === 3 && "Please read and accept our terms."}
                  </p>
                </motion.div>

                {/* STEP 0: Personal Details */}
                {step === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <motion.div className="space-y-2">
                      <label className="font-medium text-[#B0B0B0] flex items-center">
                        <User size={16} className="mr-2" />
                        Full Name <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...methods.register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                          placeholder="John Doe"
                          className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white transition-all duration-200"
                        />
                      </div>
                      {renderValidationMessage("name")}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div className="space-y-2">
                      <label className=" font-medium text-[#B0B0B0] flex items-center">
                        <Mail size={16} className="mr-2" />
                        Email <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...methods.register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@([^\s@]+\.)+(com|net)$/i,
                              message: "Email must end with .com or .net",
                            },
                            validate: async (value) => {
                              try {
                                const response = await axiosInstance.get(
                                  endpoints.emailCheck,
                                  {
                                    params: { email: value },
                                  }
                                );

                                // Make sure the backend returns { exists: true } when email is found
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
                          type="email"
                          placeholder="you@example.com"
                          className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white transition-all duration-200"
                        />
                      </div>
                      {renderValidationMessage("email")}
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div className="space-y-2">
                      <label className=" font-medium text-[#B0B0B0] flex items-center">
                        <Phone size={16} className="mr-2" />
                        Phone Number{" "}
                        <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...methods.register("phone", {
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
                          className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white transition-all duration-200"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            const formatted = value.slice(0, 10);
                            methods.setValue("phone", formatted, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </div>
                      {renderValidationMessage("phone")}
                    </motion.div>

                    {/* Address Field */}
                    <motion.div className="space-y-2">
                      <label className=" font-medium text-[#B0B0B0] flex items-center">
                        <MapPin size={16} className="mr-2" />
                        Address <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...methods.register("address", {
                            required: "Address is required",
                            minLength: {
                              value: 3,
                              message: "Address must be at least 3 characters",
                            },
                          })}
                          placeholder="Street, City, State"
                          className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white transition-all duration-200"
                        />
                      </div>
                      {renderValidationMessage("address")}
                    </motion.div>

                    {/* Profile Image Upload */}
                    <motion.div className="space-y-1">
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
                                {preview
                                  ? "Change Your Profile Image"
                                  : "Upload Your Profile Image"}
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
                  </div>
                )}

                {/* STEP 1: Password Creation */}
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Password Field */}
                    <motion.div className="space-y-2">
                      <label className=" font-medium text-[#B0B0B0] flex items-center">
                        <Lock size={16} className="mr-2" />
                        Password <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...methods.register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 8,
                              message: "Minimum 8 characters",
                            },
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "Include uppercase, number & special char",
                            },
                          })}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white transition-all duration-200 pr-12"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] hover:text-[#D4AF37]"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {renderValidationMessage("password")}
                      <div className="text-xs text-[#B0B0B0] mt-2">
                        <p>Password must contain:</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                          <li
                            className={
                              methods.watch("password")?.length >= 8
                                ? "text-[#4ADE80]"
                                : ""
                            }
                          >
                            At least 8 characters
                          </li>
                          <li
                            className={
                              /[A-Z]/.test(methods.watch("password") || "")
                                ? "text-[#4ADE80]"
                                : ""
                            }
                          >
                            One uppercase letter
                          </li>
                          <li
                            className={
                              /\d/.test(methods.watch("password") || "")
                                ? "text-[#4ADE80]"
                                : ""
                            }
                          >
                            One number
                          </li>
                          <li
                            className={
                              /[@$!%*?&]/.test(methods.watch("password") || "")
                                ? "text-[#4ADE80]"
                                : ""
                            }
                          >
                            One special character
                          </li>
                        </ul>
                      </div>
                    </motion.div>

                    {/* Confirm Password Field */}
                    <motion.div className="space-y-2">
                      <label className=" font-medium text-[#B0B0B0] flex items-center">
                        <Lock size={16} className="mr-2" />
                        Confirm Password{" "}
                        <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          {...methods.register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                              value === methods.watch("password") ||
                              "Passwords do not match",
                          })}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white transition-all duration-200 pr-12"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] hover:text-[#D4AF37]"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {renderValidationMessage("confirmPassword")}
                    </motion.div>
                  </div>
                )}

                {/* STEP 2: Professional Details */}
                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Gender Field */}
                      <motion.div className="space-y-2">
                        <label className=" font-medium text-[#B0B0B0] flex items-center">
                          <VenetianMask size={16} className="mr-2" />
                          Gender <span className="text-[#FF5E5B] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <select
                            {...methods.register("gender", {
                              required: "Gender is required",
                            })}
                            className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white appearance-none transition-all duration-200"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown
                            size={16}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0]"
                          />
                        </div>
                        {renderValidationMessage("gender")}
                      </motion.div>

                      {/* Age Field */}
                      <motion.div className="space-y-2">
                        <label className="font-medium text-[#B0B0B0] flex items-center">
                          <Calendar size={16} className="mr-2" />
                          Age <span className="text-[#FF5E5B] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <input
                            {...methods.register("age", {
                              required: "Age is required",
                              min: {
                                value: 18,
                                message: "Must be at least 18 years",
                              },
                              max: {
                                value: 60,
                                message: "Must be under 60 years",
                              },
                              valueAsNumber: true,
                            })}
                            type="number"
                            placeholder="Age"
                            className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white transition-all duration-200"
                          />
                        </div>
                        {renderValidationMessage("age")}
                      </motion.div>
                    </div>

                    {/* Categories Field */}
                    <motion.div className="space-y-2">
                      <label className=" font-medium text-[#B0B0B0] flex items-center">
                        <FileText size={16} className="mr-2" />
                        Categories Provided{" "}
                        <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                        {loading ? (
                          <p className="text-sm text-[#B0B0B0] col-span-full">
                            Loading categories...
                          </p>
                        ) : categories.length > 0 ? (
                          categories.map((category) => (
                            <label
                              key={category._id}
                              className="flex items-center space-x-2 bg-[#0D0D0D] hover:bg-[#1A1A1A] px-4 py-3 rounded-lg border border-[#333333] cursor-pointer transition-colors duration-200"
                            >
                              <input
                                type="checkbox"
                                {...methods.register("categoryId", {
                                  required: "At least one category is required",
                                })}
                                value={category._id}
                                className="rounded text-[#D4AF37] focus:ring-[#D4AF37] border-[#333333]"
                              />
                              <span className="text-sm">
                                {category.category}
                              </span>
                            </label>
                          ))
                        ) : (
                          <p className="text-sm text-[#B0B0B0] col-span-full">
                            No categories found
                          </p>
                        )}
                      </div>
                      {renderValidationMessage("categoryId")}
                    </motion.div>

                    {/* Services Field */}
                    <motion.div className="space-y-2">
                      <label className=" font-medium text-[#B0B0B0] flex items-center">
                        <FileText size={16} className="mr-2" />
                        Services Provided{" "}
                        <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                        {["Banquet", "Caterer", "Decorator", "Studio"].map(
                          (service) => (
                            <label
                              key={service}
                              className="flex items-center space-x-2 bg-[#0D0D0D] hover:bg-[#1A1A1A] px-4 py-3 rounded-lg border border-[#333333] cursor-pointer transition-colors duration-200"
                            >
                              <input
                                type="checkbox"
                                {...methods.register("service", {
                                  required: "At least one service is required",
                                })}
                                value={service}
                                className="rounded text-[#D4AF37] focus:ring-[#D4AF37] border-[#333333]"
                              />
                              <span className="text-sm">{service}</span>
                            </label>
                          )
                        )}
                      </div>
                      {renderValidationMessage("service")}
                    </motion.div>

                    {/* Description Field */}
                    <motion.div className="space-y-2">
                      <label className=" font-medium text-[#B0B0B0] flex items-center">
                        <FileText size={16} className="mr-2" />
                        Description of Services{" "}
                        <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>
                      <textarea
                        {...methods.register("description", {
                          required: "Description is required", // Add this line
                          maxLength: {
                            value: 1000,
                            message:
                              "Description must be less than 1000 characters",
                          },
                          minLength: {
                            value: 50,
                            message:
                              "Description must be at least 50 characters",
                          },
                        })}
                        rows={5}
                        placeholder="Describe your services, expertise, and any specialties..."
                        className="w-full border-2 border-[#333333] hover:border-[#D4AF37]/50 focus:border-[#D4AF37] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/30 outline-none bg-[#0D0D0D] text-white transition-all duration-200"
                      />
                      {renderValidationMessage("description")}
                    </motion.div>
                    {/* Previous Work Images */}
                    <motion.div className="space-y-2">
                      <label className="font-medium text-[#B0B0B0] flex items-center">
                        <Camera size={16} className="mr-2" />
                        Upload Previous Work (Images)
                        <span className="text-[#FF5E5B] ml-1">*</span>
                      </label>

                      <Controller
                        control={methods.control}
                        name="previousWorkImages"
                        rules={{
                          required:
                            "Please upload at least one image of your previous work",
                          validate: {
                            notEmpty: (files) => files && files.length > 0,
                            maxFiles: (files) =>
                              !files ||
                              files.length <= 10 ||
                              "Maximum 10 files allowed",
                            fileSize: (files) => {
                              if (!files) return true;
                              const maxSize = 5 * 1024 * 1024; // 5MB
                              return (
                                Array.from(files).every(
                                  (file) => file.size <= maxSize
                                ) || "Each file must be less than 5MB"
                              );
                            },
                            fileType: (files) => {
                              if (!files) return true;
                              const validTypes = [
                                "image/jpeg",
                                "image/png",
                                "image/gif",
                              ];
                              return (
                                Array.from(files).every((file) =>
                                  validTypes.includes(file.type)
                                ) ||
                                "Only JPEG, PNG, and GIF images are allowed"
                              );
                            },
                          },
                        }}
                        render={({
                          field: { value, onChange },
                          fieldState: { error },
                        }) => (
                          <>
                            <div className="flex items-center justify-center w-full">
                              <label
                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#333333] hover:border-[#D4AF37] rounded-xl cursor-pointer bg-[#0D0D0D] hover:bg-[#1A1A1A] transition-all duration-200 relative"
                                onDrop={(e) => {
                                  e.preventDefault();
                                  const droppedFiles = Array.from(
                                    e.dataTransfer.files || []
                                  );
                                  onChange(droppedFiles);
                                }}
                                onDragOver={(e) => e.preventDefault()}
                              >
                                {!value || value.length === 0 ? (
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Camera
                                      size={32}
                                      className="text-[#B0B0B0] mb-3"
                                    />
                                    <p className="mb-2 text-sm text-[#B0B0B0]">
                                      <span className="text-[#D4AF37] font-medium">
                                        Click to upload
                                      </span>{" "}
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-[#666666]">
                                      PNG, JPG, GIF (MAX. 5MB each)
                                    </p>
                                  </div>
                                ) : (
                                  <div className="absolute inset-0 p-2 flex flex-wrap gap-2 overflow-auto">
                                    {value.map((file, index) => (
                                      <div
                                        key={index}
                                        className="relative group"
                                      >
                                        <img
                                          src={URL.createObjectURL(file)}
                                          alt={`Preview ${index + 1}`}
                                          className="h-24 w-24 object-cover rounded-lg border border-[#333333]"
                                        />
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const updated = [...value];
                                            updated.splice(index, 1);
                                            onChange(
                                              updated.length > 0
                                                ? updated
                                                : null
                                            );
                                          }}
                                          className="absolute -top-2 -right-2 bg-[#FF5E5B] text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <input
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={(e) => {
                                    const files = Array.from(
                                      e.target.files || []
                                    );
                                    onChange(files.length > 0 ? files : null);
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>

                            {error ? (
                              <p className="mt-1 text-sm text-[#FF5E5B] flex items-center justify-center">
                                <AlertTriangle size={14} className="mr-1" />
                                {error.message}
                              </p>
                            ) : value?.length > 0 ? (
                              <p className="text-sm text-[#4ADE80] flex items-center justify-center">
                                <CheckCircle size={14} className="mr-1" />
                                {value.length === 1
                                  ? "1 file selected"
                                  : `${value.length} files selected`}
                              </p>
                            ) : null}
                          </>
                        )}
                      />
                    </motion.div>
                  </>
                )}

                {/* STEP 3: Declaration */}
                {step === 3 && (
                  <motion.div className="space-y-8">
                    <div className="p-8 bg-[#0D0D0D] rounded-xl border border-[#333333] text-sm text-[#B0B0B0] max-h-80 overflow-auto">
                      <h3 className="text-xl font-medium text-white mb-4">
                        Terms and Conditions
                      </h3>
                      <div className="space-y-4">
                        <p>
                          <strong>1. Account Registration</strong>
                          <br />
                          You must provide accurate and complete information
                          when registering as an Event Manager on UtsavAura.
                        </p>
                        <p>
                          <strong>2. Service Listings</strong>
                          <br />
                          All services listed must be accurately described with
                          no misleading information. Prices should be
                          transparent.
                        </p>
                        <p>
                          <strong>3. Professional Conduct</strong>
                          <br />
                          You agree to maintain professional standards when
                          interacting with clients through our platform.
                        </p>

                        <p>
                          <strong>4. Cancellations</strong>
                          <br />
                          Cancellation policies must be clearly communicated to
                          clients in advance.
                        </p>
                        <p>
                          <strong>5. Data Privacy</strong>
                          <br />
                          You agree to handle client data responsibly and in
                          compliance with privacy laws.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        {...methods.register("agree", {
                          required: "You must accept the terms to continue",
                        })}
                        className="mt-1 rounded text-[#D4AF37] focus:ring-[#D4AF37] border-[#333333]"
                      />
                      <label className="ml-3 text-sm text-[#B0B0B0]">
                        I have read and agree to the UtsavAura Terms and
                        Conditions and Privacy Policy.
                      </label>
                    </div>
                    {renderValidationMessage("agree")}
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <motion.div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-[#333333]">
                  {step > 0 ? (
                    <motion.button
                      whileHover={{ scale: 1.0 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={onBack}
                      className="px-8 py-3 bg-[#252525] hover:bg-[#333333] text-white rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 w-full sm:w-auto"
                    >
                      <ArrowLeft size={18} /> Back
                    </motion.button>
                  ) : (
                    <div></div>
                  )}
                  {step < steps.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.0 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={onNext}
                      className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] hover:from-[#FF5E5B] hover:to-[#D4AF37] text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-200 w-full sm:w-auto"
                    >
                      Continue <ArrowRight size={18} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.0 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-[#FF5E5B] to-[#FF8E8C] hover:from-[#E85652] hover:to-[#FF7E7B] text-white font-medium rounded-xl flex items-center justify-center transition-all duration-200 w-full sm:w-auto ml-auto"
                    >
                      Complete Registration
                    </motion.button>
                  )}
                </motion.div>
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
                  We've sent a verification link to your email. Please verify
                  your account before logging in.
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white rounded-md hover:brightness-110 transition-colors"
                >
                  Go to Login
                </Link>
              </motion.div>
            )}
          </FormProvider>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EventManagerRegister;
