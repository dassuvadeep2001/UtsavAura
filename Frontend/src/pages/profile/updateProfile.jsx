import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axiosInstance";
import { endpoints, imageBaseUrl } from "../../api/api_url";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { EditIcon, Sparkles } from "lucide-react";

const UpdateProfile = () => {
  const [role, setRole] = useState(""); // role will be fetched dynamically
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [serviceOptions] = useState(["Banquet", "Studio", "Caterer", "Decorator"]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [previousWorkPreviews, setPreviousWorkPreviews] = useState([]);
  const trustedBy = ["amazon", "Discovery", "Lovis"];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm();
    const selectedCategories = watch("categoryId") || [];
    const selectedServices = watch("service") || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(endpoints.categories);
        const categoriesData = response.data.data;
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(endpoints.profile);
        const profile = res.data.data;
        setProfileData(profile);
        setRole(profile.role); // dynamically set role from fetched profile
        setImagePreview(`${imageBaseUrl}${profile.profileImage}`);
        if (profile.previousWorkImages?.length > 0) {
          setPreviousWorkPreviews(
            profile.previousWorkImages.map((img) => `${imageBaseUrl}${img}`)
          );
        }
         setValue("categoryId", profile.category?.map(c => c._id) || []);
         setValue("service", profile.service || []);
        setValue("name", profile.name);
        setValue("email", profile.email);
        setValue("phone", profile.phone);
        setValue("address", profile.address);
        setValue("age", profile.age);
        setValue("gender", profile.gender ? profile.gender.toLowerCase() : "");
        setValue("description", profile.description);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name || data.eventManagerName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);

    if (data.profileImage) {
      formData.append("profileImage", data.profileImage);
    }

    if (role === "eventManager") {
      formData.append("age", data.age);
      formData.append("gender", data.gender.charAt(0).toUpperCase() + data.gender.slice(1));
      formData.append("description", data.description);
      (data.service || []).forEach(s => formData.append("service", s));
      (data.categoryId || []).forEach(id => formData.append("categoryId", id));

      if (data.previousWorkImages && data.previousWorkImages.length > 0) {
        for (let i = 0; i < data.previousWorkImages.length; i++) {
          formData.append("previousWorkImages", data.previousWorkImages[i]);
        }
      }
    }

    const endpoint =
      role === "eventManager"
        ? endpoints.managerUpdateProfile
        : endpoints.userUpdateProfile;

    try {
      const res = await axiosInstance.put(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile updated successfully:", res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profileImage", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviousWorkChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("previousWorkImages", files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviousWorkPreviews([...previousWorkPreviews, ...previews]);
  };

  const removeImage = (index) => {
    setPreviousWorkPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading)
    return (
      <div style={{ color: "#FFFFFF" }} className="text-center py-8">
        Loading...
      </div>
    );

return (
  <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-4 relative overflow-hidden">
    {/* Background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#FF5E5B]/10 blur-[120px]"></div>
      <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-[150px]"></div>
    </div>

    {/* 🌟 UtsavAura Team Badge */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-[700px] mx-auto my-8 text-center"
    >
      <div className="inline-flex items-center justify-center gap-2 bg-[#D4AF37]/10 backdrop-blur-lg px-4 py-2 rounded-full border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all hover:bg-[#D4AF37]/15 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
        <Sparkles className="text-[#D4AF37] w-5 h-5" />
        <span className="text-[#D4AF37] text-sm font-medium tracking-wide">
          UtsavAura Team
        </span>
      </div>
    </motion.div>

    {/* 💬 Welcome Message */}
    <motion.h3
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-[700px] mx-auto mb-10 text-center text-3xl md:text-4xl font-bold text-white"
    >
      <span className="bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent">
        {profileData.name} !!
      </span>{' '}
       are you want to update your profile?
    </motion.h3>

    {/* 📝 Main Container */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-6xl mb-10 bg-white/5 border border-[#D4AF37]/30 backdrop-blur-xl rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.15)] p-1 flex flex-col lg:flex-row overflow-hidden relative z-10"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#FF5E5B]/5 pointer-events-none"></div>
      
      {/* 👉 Left Part - Form Fields */}
      <div className="w-full lg:w-3/5 p-8 lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name / Event Manager Name */}
          {role === "user" || role === "admin" ? (
            <InputField label="Name" register={register("name")} />
          ) : (
            <InputField label="Event Manager Name" register={register("name")} />
          )}

          {/* Email */}
          <InputField label="Email" type="email" register={register("email")} />

          {/* Phone & Address in Row */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-1">
              <InputField label="Phone" register={register("phone")} />
            </div>
            <div className="flex-1">
              <InputField label="Address" register={register("address")} />
            </div>
          </div>
<div className="flex flex-col sm:flex-row gap-6 w-full items-stretch">
  {/* Profile Image - Takes 2/3 width on larger screens */}
  <div className="w-full sm:w-2/3">
    <FileUploadField
      label="Profile Image"
      onChange={handleImageChange}
      preview={imagePreview}
      accept="image/*"
    />
  </div>

  {/* Password Section - Takes 1/3 width on larger screens */}
  <div className="w-full sm:w-1/3 rounded-xl flex flex-col">
    <div>
      <label className="text-[#B0B0B0] text-sm font-medium mb-2 block">Password</label>
      <div className="flex items-center justify-between">
        <span className="text-white/80 text-sm">••••••••</span>
      </div>
    </div>
    <button
      type="button"
      onClick={() => navigate("/forgot-password")}
      className="mt-2 w-full text-start py-2 text-[#D4AF37] hover:text-[#FF5E5B] rounded-lg transition-all duration-200 text-sm font-medium"
    >
      Update Password
    </button>
  </div>
</div>
          {/* Event Manager Specific Fields */}
          {role === "eventManager" && (
            <>
              {/* Age & Gender */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex-1">
                  <InputField label="Age" type="number" register={register("age")} />
                </div>
                <div className="flex-1">
                  <SelectField
                    label="Gender"
                    options={["", "male", "female", "other"]}
                    labels={["Select Gender", "Male", "Female", "Other"]}
                    register={register("gender")}
                    defaultValue={profileData.gender ? profileData.gender.toLowerCase() : ""}
                  />
                </div>
              </div>

              {/* Services */}
              <ServiceCheckboxes
                label="Services"
                options={serviceOptions}
                selected={selectedServices}
                setValue={setValue}
              />

              {/* Categories */}
              <CategoryCheckboxes
                label="Category"
                categories={categories}
                selected={selectedCategories}
                setValue={setValue}
              />

              {/* Description */}
              <TextAreaField label="Description" register={register("description")} rows={3} />

              {/* Previous Work Images */}
              <MultipleImageUploadField
                label="Previous Work Images"
                onChange={handlePreviousWorkChange}
                previews={previousWorkPreviews}
                onRemove={removeImage}
                accept="image/*"
              />
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-[#FF5E5B] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FF5E5B] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,94,91,0.3)]"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* 👈 Right Part - Instructions */}
      <div className="w-full lg:w-2/5 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-lg flex flex-col items-center justify-center text-center text-white gap-10 border-t lg:border-t-0 lg:border-l border-[#D4AF37]/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-[#D4AF37]/5 to-transparent opacity-20"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#D4AF37]/10 blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-[#FF5E5B]/10 blur-[90px]"></div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 py-2">
          {/* Icon & Title */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="p-3 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#D4AF37]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-white">
              How to Update Your Profile
            </h4>
            <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] rounded-full"></div>
          </div>

          {/* Instructions List */}
          <ul className="text-left text-gray-300 space-y-4 max-w-md mx-auto px-2">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <span>Edit your personal details like name, email, phone, and address.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <span>Upload or change your profile picture.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              <span>Click "Update Password" to reset your account password.</span>
            </li>
            {role === "eventManager" && (
              <>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <span>Enter your age and gender.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold flex-shrink-0 mt-0.5">
                    5
                  </span>
                  <span>Select services you offer (e.g., catering, decoration).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold flex-shrink-0 mt-0.5">
                    6
                  </span>
                  <span>Choose event categories you specialize in.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold flex-shrink-0 mt-0.5">
                    7
                  </span>
                  <span>Add a short description about your work.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold flex-shrink-0 mt-0.5">
                    8
                  </span>
                  <span>Upload previous work images to showcase your portfolio.</span>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Footer Note */}
         <div className="mt-auto relative z-10 mb-10">
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
      </div>
    </motion.div>
  </div>
);
};

// Helper Components
// InputField.jsx
const InputField = ({ label, type = "text", register }) => (
  <div className="mb-4">
    <label className="block text-[#B0B0B0] text-sm font-medium mb-2">{label}</label>
    <input
      type={type}
      {...register}
      className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/30 transition-all duration-200 placeholder:text-[#4A4A4A]"
    />
  </div>
);

// SelectField.jsx
const SelectField = ({ label, options, labels, register, defaultValue }) => (
  <div className="mb-4">
    <label className="block text-[#B0B0B0] text-sm font-medium mb-2">{label}</label>
    <select
      {...register}
      defaultValue={defaultValue}
      className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/30 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNCMTBCMEIwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
    >
      {options.map((val, i) => (
        <option key={val} value={val} className="bg-[#0D0D0D]">
          {labels[i]}
        </option>
      ))}
    </select>
  </div>
);

// TextAreaField.jsx
const TextAreaField = ({ label, register, rows = 3 }) => (
  <div className="mb-4">
    <label className="block text-[#B0B0B0] text-sm font-medium mb-2">{label}</label>
    <textarea
      {...register}
      rows={rows}
      className="w-full px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]/30 transition-all duration-200 placeholder:text-[#4A4A4A]"
    ></textarea>
  </div>
);

// ServiceCheckboxes.jsx
const ServiceCheckboxes = ({ label, options, selected = [], setValue }) => (
  <div className="mb-6">
    <label className="block text-[#B0B0B0] text-sm font-medium mb-3">{label}</label>
    <div className="flex flex-wrap gap-3">
      {options.map((service) => (
        <label key={service} className="inline-flex items-center">
          <div className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={service}
              checked={selected.includes(service)}
              onChange={(e) => {
                let newSelected;
                if (e.target.checked) {
                  newSelected = [...selected, service];
                } else {
                  newSelected = selected.filter((s) => s !== service);
                }
                setValue("service", newSelected);
              }}
              className="sr-only peer"
            />
            <div className="w-5 h-5 bg-[#0D0D0D] border-2 border-[#D4AF37]/50 rounded-md peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] peer-focus:ring-2 peer-focus:ring-[#D4AF37]/50 transition-all duration-200 flex items-center justify-center">
              {selected.includes(service) && (
                <svg className="w-3 h-3 text-[#0D0D0D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`ml-2 text-sm ${selected.includes(service) ? "text-[#D4AF37] font-medium" : "text-white"}`}>
              {service}
            </span>
          </div>
        </label>
      ))}
    </div>
  </div>
);

// CategoryCheckboxes.jsx
const CategoryCheckboxes = ({ label, categories, selected = [], setValue }) => (
  <div className="mb-6">
    <label className="block text-[#B0B0B0] text-sm font-medium mb-3">{label}</label>
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <label key={cat._id} className="inline-flex items-center">
          <div className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={cat._id}
              checked={selected.includes(cat._id)}
              onChange={(e) => {
                let newSelected;
                if (e.target.checked) {
                  newSelected = [...selected, cat._id];
                } else {
                  newSelected = selected.filter((id) => id !== cat._id);
                }
                setValue("categoryId", newSelected);
              }}
              className="sr-only peer"
            />
            <div className="w-5 h-5 bg-[#0D0D0D] border-2 border-[#D4AF37]/50 rounded-md peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] peer-focus:ring-2 peer-focus:ring-[#D4AF37]/50 transition-all duration-200 flex items-center justify-center">
              {selected.includes(cat._id) && (
                <svg className="w-3 h-3 text-[#0D0D0D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`ml-2 text-sm ${selected.includes(cat._id) ? "text-[#D4AF37] font-medium" : "text-white"}`}>
              {cat.category}
            </span>
          </div>
        </label>
      ))}
    </div>
  </div>
);

// FileUploadField.jsx
const FileUploadField = ({ label, onChange, preview, accept }) => (
  <div className="mb-4">
    <label className="block text-[#B0B0B0] text-sm font-medium mb-2">{label}</label>
    <div className="flex flex-col sm:flex-row gap-4 items-start">
      <label className="w-full sm:w-auto flex-1 cursor-pointer">
        <div className="px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#D4AF37]/30 transition-all duration-200 flex items-center justify-between">
          <span className="text-white text-sm truncate">
            {preview ? "Change Image" : "Choose File"}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </label>
      {preview && (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-11 h-11 object-cover rounded-xl border-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37]/50 transition-all duration-200"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  </div>
);

// MultipleImageUploadField.jsx
const MultipleImageUploadField = ({ label, onChange, previews, onRemove, accept }) => (
  <div className="mb-6">
    <label className="block text-[#B0B0B0] text-sm font-medium mb-2">{label}</label>
    <label className="cursor-pointer">
      <div className="px-4 py-3 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] hover:border-[#D4AF37]/30 transition-all duration-200 flex items-center justify-between mb-3">
        <span className="text-white text-sm">
          {previews.length > 0 ? "Add More Images" : "Choose Images"}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <input
        type="file"
        multiple
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
    </label>
    <div className="flex flex-wrap gap-3 mt-3">
      {previews.map((src, index) => (
        <div key={index} className="relative group">
          <img
            src={src}
            alt={`Preview ${index}`}
            className="w-20 h-20 object-cover rounded-xl border-2 border-[#1F1F1F] group-hover:border-[#D4AF37]/30 transition-all duration-200"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center transition-all duration-200">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
              className="bg-[#FF5E5B] text-white rounded-full w-6 h-6 flex items-center justify-center p-0 hover:bg-[#FF5E5B]/90 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UpdateProfile;
