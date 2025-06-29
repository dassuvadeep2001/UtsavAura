// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { endpoints, imageBaseUrl } from '../../api/api_url';
import { motion } from "framer-motion";
import { 
  Mail, MapPin, Phone, Sparkles, Settings, Calendar, 
  VenusAndMars, Pencil, Zap, CheckCircle, Clock,
  Users, MessageSquare, Layers, BarChart2, Shield, LogOut
} from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    name: "", email: "", phone: "", address: "", profileImage: "", role: "",
    description: "", age: "", gender: "", service: [], previousWorkImages: [],
    reviews: [], stats: {}
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(endpoints.profile)
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white">Loading profile...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D] text-white">Unable to load profile. Please try again later.</div>;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/30 z-0"></div>
      
      {user.role === "admin" && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#FF5E5B]/10 z-0"></div>
      )}
      {user.role === "user" && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E5B]/10 via-transparent to-[#D4AF37]/10 z-0"></div>
      )}
      {user.role === "eventManager" && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#FF5E5B]/10 z-0"></div>
      )}

      {/* Floating Particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, Math.random() * 40 - 20],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`absolute rounded-full ${
            user.role === 'admin'
              ? 'bg-[#D4AF37]/40'
              : user.role === 'user'
              ? 'bg-[#D4AF37]/40'
              : 'bg-[#D4AF37]/40'
          }`}
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Banner Section */}
      <div className="w-full h-80 relative overflow-hidden flex flex-col items-center justify-center text-center px-4 bg-[#D4AF37]/10 backdrop-blur-sm z-10">
        <div className="absolute inset-0 overflow-hidden z-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#D4AF37]/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-8"
        >
          <div className="flex items-center justify-center bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
            <Sparkles className="text-[#D4AF37] mr-2" size={18} />
            <span className="text-[#D4AF37] text-sm font-medium">
              {user.role === 'admin' ? 'Administrator' : user.role === 'eventManager' ? 'Event Manager' : 'Valued Member'}
            </span>
          </div>
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-2xl md:text-4xl font-bold text-white leading-tight mb-14"
        >
          Welcome{" "}
          <span className="bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent">
            {user.name}
          </span>{" "}
          to UtsavAura
        </motion.h3>
      </div>

      {/* Profile Content */}
      <div className="relative w-full mx-auto px-6 mb-8">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="relative w-45 h-45">
            <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-xl opacity-50 animate-pulse-glow z-0"></div>
            <img
              src={`${imageBaseUrl}${user.profileImage}`}
              alt="Profile"
              className="w-45 h-45 rounded-full shadow-xl object-cover relative z-10"
              onError={(e) => {
                e.target.src = '/src/assets/images/user.png';
                e.onerror = null; 
              }}
            />
          </div>
        </motion.div>

        <div className="pt-32">
          {/* ADMIN VIEW */}
          {user.role === "admin" && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Admin Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1 bg-[#121212]/80 backdrop-blur-md rounded-xl p-6 border border-[#D4AF37]/20 shadow-lg"
              >
                <h2 className="text-xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Admin Dashboard
                </h2>
                
                <nav className="space-y-2">
                  <Link 
                    to="/admin/dashboard" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#D4AF37]/10 text-white hover:bg-[#D4AF37]/20 transition-colors"
                  >
                    <BarChart2 className="w-5 h-5" /> Overview
                  </Link>
                  <Link 
                    to="/admin/users" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    <Users className="w-5 h-5" /> Users
                  </Link>
                  <Link 
                    to="/admin/queries" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" /> Queries
                  </Link>
                  <Link 
                    to="/admin/categories" 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    <Layers className="w-5 h-5" /> Categories
                  </Link>
                </nav>
              </motion.div>
              
              {/* Admin Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3 space-y-6"
              >
                
                {/* Profile Info */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/5 backdrop-blur-md rounded-xl shadow-lg border-t-4 border-[#D4AF37] px-6 py-10"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Admin Profile</h2>
                      <div className="w-full h-px bg-[#444444] opacity-30 mb-5"></div>
                      {user.isVerified ? (
                        <p className="flex items-center text-green-400 mb-4 text-sm border border-green-400 rounded-full w-fit px-3 py-1 font-medium">
                          <CheckCircle className="w-4 h-4 mr-2" /> Verified
                        </p>
                      ) : (
                        <p className="flex items-center text-[#B0B0B0] mb-4 text-sm border border-[#B0B0B0] rounded-full w-fit px-3 py-1 font-medium">
                          <Clock className="w-4 h-4 mr-2" /> Not Verified
                        </p>
                      )}
                      <p className="text-[#B0B0B0] mb-3 flex items-start text-lg">
                        <Mail size={22} className="text-[#D4AF37] mr-2" /> {user.email}
                      </p>
                      <p className="text-[#B0B0B0] mb-3 flex items-start text-lg">
                        <Phone size={22} className="text-[#D4AF37] mr-2" /> {user.phone}
                      </p>
                      <p className="text-[#B0B0B0] mb-5 flex items-start text-lg">
                        <MapPin size={22} className="text-[#D4AF37] mr-2" /> {user.address}
                      </p>
                    </div>
                    
                    <div className="hidden md:block w-px bg-[#444444] opacity-30"></div>
                    <div className="block md:hidden h-px w-full bg-[#444444] opacity-30 my-4"></div>
                    
                    <div className="md:w-1/2">
                      <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Manage Account</h2>
                      <div className="w-full h-px bg-[#444444] opacity-30 mb-5"></div>
                                       <p className="text-[#B0B0B0] mb-4">
                    Review and update your personal information, password, and preferences.
                  </p>
                  <Link
                    to="/manageAccount"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white font-semibold rounded-md shadow-md hover:from-[#FF5E5B] hover:to-[#D4AF37] transition-transform duration-300"
                  >
                    <Settings size={20} />
                    Manage Account
                  </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* USER VIEW */}
          {user.role === "user" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-5 mb-5 mx-auto max-w-4xl p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg border-t-4"
              style={{ borderTopColor: '#D4AF37' }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4 text-start">Contact Info</h2>
                  <div className='h-px w-full bg-[#444444] opacity-30 mb-5'></div>
                  {user.isVerified ? (
                    <p className="flex items-center text-green-400 mb-4 text-sm border border-green-400 rounded-full w-fit px-3 py-1 font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" /> Verified
                    </p>
                  ) : (
                    <p className="flex items-center text-[#B0B0B0] mb-4 text-sm border border-[#B0B0B0] rounded-full w-fit px-3 py-1 font-medium">
                      <Clock className="w-4 h-4 mr-2" /> Not Verified
                    </p>
                  )}
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
                <div className="hidden md:block w-px bg-[#444444] opacity-30"></div>
                <div className="block md:hidden h-px w-full bg-[#444444] opacity-30 my-4"></div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">Manage Account</h2>
                  <div className='h-px w-full bg-[#444444] opacity-30 mb-5'></div>
                  <p className="text-[#B0B0B0] mb-4">
                    Review and update your personal information, password, and preferences.
                  </p>
                  <Link
                    to="/manageAccount"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white font-semibold rounded-md shadow-md hover:from-[#FF5E5B] hover:to-[#D4AF37] transition-transform duration-300"
                  >
                    <Settings size={20} />
                    Manage Account
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* EVENT MANAGER VIEW */}
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
                className="w-full bg-white/5 backdrop-blur-md rounded-xl shadow-lg border-t-4 border-[#D4AF37] p-6 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-10">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="md:w-1/2"
                  >
                    <h3 className="text-2xl font-semibold text-[#D4AF37] mb-4">Profile Overview</h3>
                    <div className="w-full h-px bg-[#444444] opacity-30 mb-4"></div>
                    {user.isVerified ? (
                      <p className="flex items-center text-green-400 mb-4 text-sm border border-green-400 rounded-full w-fit px-3 py-1 font-medium">
                        <CheckCircle className="w-4 h-4 mr-2" /> Verified
                      </p>
                    ) : (
                      <p className="flex items-center text-[#B0B0B0] mb-4 text-sm border border-[#B0B0B0] rounded-full w-fit px-3 py-1 font-medium">
                        <Clock className="w-4 h-4 mr-2" /> Not Verified
                      </p>
                    )}
                    <p className="text-[#B0B0B0] mb-4 whitespace-pre-wrap text-start">{user.description}</p>
                    <div className="space-y-3 text-[#B0B0B0] text-base sm:text-lg">
                      <p className="flex items-center space-x-2">
                        <Mail size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span>{user.email}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Phone size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span>{user.phone}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <MapPin size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span>{user.address}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Calendar size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span>{user.age}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <VenusAndMars size={18} className="text-[#D4AF37] flex-shrink-0" />
                        <span>{user.gender}</span>
                      </p>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Manage Account</h2>
                      <div className="w-full h-px bg-[#444444] opacity-30 mb-5"></div>
                      <p className="text-[#B0B0B0] mb-4">
                        Review and update your personal information, password, and preferences.
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
                  <div className="hidden md:block w-px bg-[#444444] opacity-30" />
                  <div className="block md:hidden h-px w-full bg-[#444444] opacity-30 my-4"></div>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="md:w-1/2"
                  >
                    <h3 className="text-2xl font-semibold text-[#D4AF37] mb-4">Services & Work Gallery</h3>
                    <div className="w-full h-px bg-[#444444] opacity-30 mb-4"></div>
                    <div className="mb-6">
                      <h4 className="text-[#ff6d6aeb] font-light mb-5 text-xl">Services Offered</h4>
                      <ul className="grid grid-cols-3 gap-x-3 gap-y-2 text-[#d1d1d1] text-lg list-inside">
                        {user.service.map((srv, idx) => (
                          <li key={idx}>{srv}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-[#ff6d6aeb] font-light mb-5 text-xl">Events Offered</h4>
                      <ul className="grid grid-cols-4 gap-x-2 gap-y-2 text-[#d1d1d1] text-lg list-inside">
                        {user.category?.map((cat, idx) => (
                          <li key={idx}>{cat.category}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[#ff6d6aeb] font-light mb-4 text-xl">Previous Work</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
                        {user.previousWorkImages?.map((img, index) => (
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
              <div className="my-10 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="w-full bg-white/5 backdrop-blur-md rounded-xl shadow-md p-6 md:p-10 border-b-4 border-[#D4AF37]"
              >
                <h3 className="text-2xl font-semibold text-[#D4AF37] mb-4">Customer Reviews</h3>
                <div className="w-full h-px bg-[#545454] opacity-40 mb-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.reviews?.length > 0 ? (
                    user.reviews.map((review) => {
                      const initials = review.reviewerName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2);
                      return (
                        <div
                          key={review._id}
                          className="bg-[#121212] p-2 md:p-4 rounded-lg border border-[#D4AF37]/30 shadow-sm"
                        >
                          <div className="flex items-start gap-2 md:gap-4 mb-4">
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF5E5B] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {initials || "GU"}
                            </div>
                            <div className="space-y-1 text-start">
                              <p className="text-[#FF5E5B] font-semibold">{review.reviewerName || "Guest User"}</p>
                              <p className="text-xs text-[#888]">{review.reviewerEmail || "guest@example.com"}</p>
                            </div>
                          </div>
                          <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-5 h-5 ${
                                  i < review.star ? "text-yellow-400" : "text-gray-600"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-[#B0B0B0] mt-2">
                            "{review.review || 'No comment provided.'}"
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="col-span-full text-center text-[#888]">No reviews yet.</p>
                  )}
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
