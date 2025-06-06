// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { endpoints, imageBaseUrl } from '../../api/api_url';
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Sparkles, Settings, Calendar, VenusAndMars, Pencil } from "lucide-react";
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    name: "", email: "", phone: "", address: "", profileImage: "", role: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(endpoints.profile)
      .then((res) => {
        setUser(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>Unable to load profile. Please try again later.</div>;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* 🔥 Banner with Motion Effects */}
      <div className="w-full h-80 relative overflow-hidden flex flex-col items-center justify-center text-center px-4">
  {/* 🖼 Background Image (below motion content) */}
  <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
        >
          <source src="src/assets/videos/profile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

  {/* ✨ Motion Tagline */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 mb-2"
  >
    <div className="flex items-center justify-center bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
      <Sparkles className="text-[#D4AF37] mr-2" size={18} />
      <span className="text-[#D4AF37] text-sm font-medium">
        UtsavAura Team
      </span>
    </div>
  </motion.div>

  {/* 💬 Motion Heading */}
  <motion.h3
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative z-10 text-2xl md:text-4xl font-bold text-white leading-tight"
  >
    Welcome{" "}
    <span className="bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent">
      {user.name}
    </span>{" "}
    to UtsavAura
  </motion.h3>
</div>

      {/* 👤 Profile Section */}
      <div className="relative w-full mx-auto px-6">
        {/* 📸 Centered Profile Image */}
        <motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-20"
>
  <div className="relative w-45 h-45">
    {/* Glowing ring behind */}
    <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-xl opacity-50 animate-pulse-glow z-0"></div>

    {/* Profile Image */}
    <img
      src={`${imageBaseUrl}${user.profileImage}`}
      alt="Profile"
      className="w-45 h-45 rounded-full shadow-xl object-cover relative z-10"
    />

    {/* ✏️ Edit Icon */}
    <Link
      to="/updateProfile"
      className="absolute bottom-2 right-2 z-20 bg-[#D4AF37] hover:bg-[#FF5E5B] text-black p-1.5 rounded-full shadow-md transition duration-200"
      title="Edit Profile"
    >
      <Pencil size={18} />
    </Link>
  </div>
</motion.div>

<div className="pt-32 text-center">
  {/* 🎯 Role-specific Section */}
{user.role === "admin" && (
  <div
    className="mt-5 mb-5 mx-auto max-w-4xl p-6 rounded-xl bg-[#1a1a1a] shadow-md border-t-4"
    style={{ borderTopColor: '#D4AF37' }}
  >
    <div className="flex flex-col md:flex-row gap-6 relative">
      {/* 📥 Left Section: Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2"
      >
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4 text-start">Contact Info</h2>
        <div className="w-full h-px bg-[#444444] opacity-30 mb-5"></div>

        <p className="text-[#B0B0B0] mb-2 flex items-start text-lg">
          <Mail size={22} className="text-[#D4AF37] mr-2" />
          {user.email}
        </p>

        <p className="text-[#B0B0B0] mb-2 flex items-start text-lg">
          <Phone size={22} className="text-[#D4AF37] mr-2" />
          {user.phone}
        </p>

        <p className="text-[#B0B0B0] flex items-start text-lg">
          <MapPin size={22} className="text-[#D4AF37] mr-2" />
          {user.address}
        </p>
      </motion.div>

      {/* 🚧 Divider */}
      <div className="hidden md:block w-px bg-[#444444] opacity-30">
      <div className="block md:hidden h-px w-full bg-[#444444] opacity-30 my-4"></div>
      </div>

      {/* 🧠 Right Section: Admin Panel */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:w-1/2"
      >
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-2">Admin Panel</h2>
        <p className="text-[#B0B0B0] mb-4 text-lg">
          Access to user management and system settings. Stay in control of the platform's operations.
        </p>

        {/* 🔘 Button Stack */}
        <div className="flex flex-col gap-3">
          <a
            href="/adminDashboard"
            className="px-5 py-2 text-center bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white font-semibold rounded-md shadow-md hover:from-[#FF5E5B] hover:to-[#D4AF37] transition duration-300"
          >
            Go to Dashboard
          </a>

          <a 
            href="/manageAccount"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white font-semibold rounded-md shadow-md hover:from-[#FF5E5B] hover:to-[#D4AF37] transition duration-300"
          >
            <Settings size={20} />
            Manage Account
          </a>
        </div>
      </motion.div>
    </div>
  </div>
)}

{user.role === "user" && (
  <div className="mt-5 mb-5 mx-auto max-w-4xl p-6 rounded-xl bg-[#1a1a1a] shadow-md border-t-4" style={{ borderTopColor: '#D4AF37' }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row gap-6"
    >
      {/* Left Section: Contact Info */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4 text-start">Contact Info</h2>
        <div className='h-px w-full bg-[#444444] opacity-30 mb-5'></div>

        <p className="text-[#B0B0B0] mb-2 flex items-center text-lg">
          <Mail size={22} className="text-[#D4AF37] mr-2" />
          {user.email}
        </p>

        <p className="text-[#B0B0B0] mb-2 flex items-center text-lg">
          <Phone size={22} className="text-[#D4AF37] mr-2" />
          {user.phone}
        </p>

        <p className="text-[#B0B0B0] flex items-center text-lg">
          <MapPin size={22} className="text-[#D4AF37] mr-2" />
          {user.address}
        </p>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-[#444444] opacity-30"></div>
      <div className="block md:hidden h-px w-full bg-[#444444] opacity-30 my-4"></div>

      {/* Right Section: Manage Account */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Manage Account</h2>
        <p className="text-[#B0B0B0] mb-4">
          Review and update your personal information, password, and preferences. Keep your profile up to date for a better experience.
        </p>
        <a
          href="/manageAccount"
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white font-semibold rounded-md shadow-md hover:from-[#FF5E5B] hover:to-[#D4AF37] transition-transform duration-300"
        >
          <Settings size={20} />
          Manage Account
        </a>
      </div>
    </motion.div>
  </div>
)}

{user.role === "eventManager" && (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full px-6 md:px-12 mt-6 mb-10"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="w-full bg-[#1a1a1a] rounded-xl shadow-md border-t-4 border-[#D4AF37] p-6 md:p-10"
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* 👉 Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="md:w-1/2"
        >
          <h3 className="text-2xl font-semibold text-[#D4AF37] mb-4">Profile Overview</h3>
          <div className="w-full h-px bg-[#444444] opacity-30 mb-4"></div>

          <p className="text-[#B0B0B0] mb-4 whitespace-pre-wrap text-start">{user.description}</p>

          <div className="space-y-2 text-[#B0B0B0] text-lg text-start">
            <p className="flex items-center text-lg">
              <Mail size={22} className="text-[#D4AF37] mr-2" />
              {user.email}
            </p>
            <p className="flex items-center text-lg">
              <Phone size={22} className="text-[#D4AF37] mr-2" />
              {user.phone}
            </p>
            <p className="flex items-center text-lg">
              <MapPin size={22} className="text-[#D4AF37] mr-2" />
              {user.address}
            </p>
            <p className="flex items-center text-lg">
              <Calendar size={22} className="text-[#D4AF37] mr-2" />
              {user.age}
            </p>
            <p className="flex items-center text-lg">
              <VenusAndMars size={22} className="text-[#D4AF37] mr-2" />
              {user.gender}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Manage Account</h2>
            <p className="text-[#B0B0B0] mb-4">
              Review and update your personal information, password, and preferences. Keep your profile up to date for a better experience.
            </p>
            <Link
              to="/manageAccount"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white font-semibold rounded-md shadow-md hover:from-[#FF5E5B] hover:to-[#D4AF37] transition-transform duration-300"
            >
              <Settings size={20} />
              Manage Account
            </Link>
          </div>
        </motion.div>

        {/* 🚧 Divider */}
        <div className="hidden md:block w-px bg-[#444444] opacity-30" />
        <div className="block md:hidden h-px w-full bg-[#444444] opacity-30 my-4"></div>

        {/* 👉 Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="md:w-1/2"
        >
          <h3 className="text-2xl font-semibold text-[#D4AF37] mb-4">Services & Work Gallery</h3>
          <div className="w-full h-px bg-[#444444] opacity-30 mb-4"></div>

          {/* 🔧 Services */}
          <div className="mb-6">
            <h4 className="text-[#ff6d6aeb] font-semibold mb-5 text-xl">Services Offered</h4>
            <ul className="grid grid-cols-3 gap-x-3 gap-y-2 text-[#d1d1d1] text-lg list-inside">
              {user.service.map((srv, idx) => (
                <li key={idx}>{srv}</li>
              ))}
            </ul>
          </div>

          {/* 🖼 Previous Work Images */}
          <div>
            <h4 className="text-[#ff6d6aeb] font-semibold mb-4 text-xl">Previous Work</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
              {user.previousWorkImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={`${imageBaseUrl}${img}`}
                  alt={`Previous work ${index + 1}`}
                  className="rounded-md object-cover h-40 w-full shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
)}

</div>
</div>

      </div>
  );
};

export default Profile;
