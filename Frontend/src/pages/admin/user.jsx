import React, { useEffect, useState } from "react";
import { Trash2, Search, RotateCcw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endpoints } from "../../api/api_url";

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(endpoints.allUser);
      setUsers(res.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    }
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`${endpoints.deleteUser}/${confirmDeleteId}`);
      toast.success("User deleted successfully");
      setConfirmDeleteId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
      setConfirmDeleteId(null);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] px-4 py-10 text-white overflow-hidden relative">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mb-8"
      >
        <div className="w-60 flex items-center justify-center bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
          <Sparkles className="text-[#D4AF37] mr-2" size={18} />
          <span className="text-[#D4AF37] text-sm font-medium">
            UtsavAura Admin Team
          </span>
        </div>
      </motion.div>
      <motion.div
        className="max-w-7xl mx-auto backdrop-blur-md bg-[#1a1a1a]/60 p-8 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-[#333]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading Section */}
        <motion.h1
          className="text-4xl font-semibold bg-gradient-to-r from-[#D4AF37] to-[#ff3c39] mb-4 pb-2 w-fit text-transparent bg-clip-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Manage Users
        </motion.h1>

        <motion.p
          className="text-[#B0B0B0] mb-6 text-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          View, search, and manage registered users below.
        </motion.p>

        {/* Search Field */}
        <motion.div
          className="flex items-center gap-2 mb-6 bg-[#121212] p-3 px-4 rounded-lg border border-[#333] focus-within:border-[#D4AF37] transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Search className="text-[#D4AF37]" size={18} />
          <input
            type="text"
            placeholder="Search by name..."
            className="bg-transparent w-full text-sm text-white focus:outline-none placeholder-[#888]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => {
              setSearchTerm("");
              fetchUsers();
            }}
            className="text-[#D4AF37] hover:text-[#FF5E5B] transition-colors duration-300"
            title="Refresh"
          >
            <RotateCcw size={18} />
          </button>
        </motion.div>

        {/* Table */}
        <motion.div
          className="overflow-x-auto rounded-xl shadow-lg border border-[#2a2a2a]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <table className="min-w-full divide-y divide-[#333] border border-[#D4AF37]/20 rounded-md">
            <thead className="bg-gradient-to-r from-[#1f1f1f] to-[#111]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-white">Serial No</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-white">Name</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-white">Role</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-white">Email</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-white">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-white">Address</th>
                <th className="px-4 py-3 text-center text-sm font-bold text-white">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a]">
              {filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gradient-to-r hover:from-[#2d2d2d] hover:to-[#1f1f1f] transition-all duration-300"
                >
                  <td className="px-4 py-3 text-sm text-[#B0B0B0]">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-[#B0B0B0] capitalize">{user.role}</td>
                  <td className="px-4 py-3 text-sm text-[#B0B0B0]">{user.email}</td>
                  <td className="px-4 py-3 text-sm text-[#B0B0B0]">{user.phone}</td>
                  <td className="px-4 py-3 text-sm text-[#B0B0B0]">{user.address}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff3e3b] to-[#ff5e5b] hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-[#888] py-6 italic">
                    No users found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      {/* Confirmation Modal */}
     {confirmDeleteId && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", damping: 25 }}
      className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 rounded-2xl border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.3)] max-w-md w-full"
    >
      {/* Decorative elements */}
      <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#FF5E5B] blur-md"></div>
      <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#D4AF37] blur-md"></div>
      
      {/* Main content */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 p-3 bg-[#FF5E5B]/10 rounded-full border border-[#FF5E5B]/30">
          <Trash2 className="text-[#FF5E5B]" size={28} />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-white">Confirm Deletion</h3>
        <p className="text-[#B0B0B0] mb-6">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        
        <div className="flex gap-4 w-full">
          <button
            onClick={() => setConfirmDeleteId(null)}
            className="flex-1 py-2.5 px-4 rounded-lg bg-transparent border border-[#333] text-[#B0B0B0] hover:bg-[#222] hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#FF5E5B] to-[#ff3c39] text-white hover:shadow-[0_0_15px_rgba(255,94,91,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  </div>
)}
    </div>
  );
};

export default User;