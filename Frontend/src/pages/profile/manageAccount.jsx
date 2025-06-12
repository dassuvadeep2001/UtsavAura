import React, { useState } from "react";
import { LogOut, Trash2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API calls
import { toast, ToastContainer } from "react-toastify"; // For feedback
import "react-toastify/dist/ReactToastify.css";

const ManageAccount = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔐 LOGOUT FUNCTION - Clears token from localStorage
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/"; // Redirect to home page
    }, 2000);
  };

  // 🗑️ DELETE ACCOUNT FUNCTION
  const handleDelete = async () => {
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No authentication token found.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.delete(
        "http://localhost:8001/api/user/delete-profile",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.status === 200) {
        // Clear ALL user data from storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();

        toast.success("Your account has been deleted successfully.", {
          autoClose: 3000,
        });

        setTimeout(() => {
          window.location.href = "/"; // Force full page reload
        }, 3000);
      }
    } catch (error) {
      console.error("Full delete error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] px-4 py-10 text-white overflow-hidden relative flex justify-center items-center">
      {/* Background Glow */}
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>

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

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#1a1a1a] text-white w-full max-w-5xl rounded-2xl p-8 shadow-lg border-1 border-[#D4AF37]"
      >
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-2 text-center">
          Manage Your Account Securely
        </h2>
        <p className="text-[#B0B0B0] text-center mb-8 max-w-2xl mx-auto">
          Keep your profile up to date and secure. You can log out or choose to
          permanently delete your account. Please read the following terms
          carefully before proceeding.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 🔐 Logout Section */}
          <motion.div className="bg-[#121212] rounded-xl p-6 flex-1 shadow-inner">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              Logout from your account
            </h3>
            <ul className="list-disc pl-6 text-[#B0B0B0] text-sm mb-6 space-y-2">
              <li>Ends your session on this device.</li>
              <li>Ensures account safety if using public/shared devices.</li>
              <li>You can log back in anytime using your credentials.</li>
              <li>Active sessions on other devices will remain active.</li>
              <li>Ensure you log out from all devices.</li>
            </ul>
            <button
              onClick={handleLogout}
              className="mt-8 w-full flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] text-white font-semibold px-5 py-3 rounded-md shadow hover:from-[#FF5E5B] hover:to-[#D4AF37] transition-all duration-300"
            >
              <LogOut size={20} /> Logout
            </button>
          </motion.div>

          {/* ❌ Delete Account Section */}
          <motion.div className="bg-[#121212] rounded-xl p-6 flex-1 shadow-inner">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              Delete your account
            </h3>
            <ul className="list-disc pl-6 text-[#B0B0B0] text-sm mb-6 space-y-2">
              <li>All your uploaded content will be permanently deleted.</li>
              <li>You will lose access to saved events and settings.</li>
              <li>This action is irreversible and final.</li>
              <li>Ensure you’ve backed up anything important.</li>
            </ul>

            {/* ✅ Confirmation checkbox */}
            <div
              onClick={() => setConfirmDelete(!confirmDelete)}
              className="flex items-center gap-2 cursor-pointer mb-4"
            >
              <div
                className={`w-5 h-5 rounded border ${
                  confirmDelete
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-500"
                } flex items-center justify-center`}
              >
                {confirmDelete && (
                  <CheckCircle size={16} className="text-white" />
                )}
              </div>
              <label className="text-sm text-[#B0B0B0]">
                I understand and want to permanently delete my account.
              </label>
            </div>

            <button
              onClick={handleDelete}
              disabled={!confirmDelete || loading}
              className={`w-full flex items-center justify-center gap-2 px-5 py-3 font-semibold rounded-md shadow transition-all duration-300 ${
                confirmDelete && !loading
                  ? "bg-[#FF5E5B] text-white hover:bg-red-500"
                  : "bg-[#2a2a2a] text-[#777] cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin  mr-2">🔄</span> Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={20}  />
                  Delete Account
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageAccount;
