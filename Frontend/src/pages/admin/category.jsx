import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { Pencil, Trash2, Plus, Sparkles } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/api_url";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get(endpoints.categories);
      setCategories(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editingId) {
        await axiosInstance.put(
          `${endpoints.updateCategory}/${editingId}`,
          data
        );
        toast.success("Category updated");
      } else {
        await axiosInstance.post(endpoints.createCategory, data);
        toast.success("Category added");
      }
      reset();
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      toast.error("Error saving category");
      console.error(err);
    }
  };

  const handleEdit = (category) => {
    setValue("category", category.category);
    setValue("descriptions", category.descriptions);
    setEditingId(category._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(
        `${endpoints.deleteCategory}/${confirmDeleteId}`
      );
      toast.success("Category deleted");
      setConfirmDeleteId(null);
      fetchCategories();
    } catch (err) {
      toast.error("Failed to delete category");
      setConfirmDeleteId(null);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A] px-4 py-20 text-white overflow-hidden relative">
      <ToastContainer position="top-center" theme="dark" />
      {/* Main Container */}
      <div className="max-w-6xl mx-auto">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#FF5E5B]/10 blur-3xl"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-15"
        >
          <div className="w-60 flex items-center justify-center bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D4AF37]/30">
            <Sparkles className="text-[#D4AF37] mr-2" size={18} />
            <span className="text-[#D4AF37] text-sm font-medium">
              UtsavAura Admin Team
            </span>
          </div>
        </motion.div>
        {/* Form Section Card - Glassmorphism Style */}
        <motion.div
          className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-lg border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Section */}
            <div className="bg-gradient-to-br from-[#0D0D0D] via-[#141414] to-[#1a1a1a] p-8 flex flex-col justify-center text-white relative">
              <div className="hidden md:block absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"></div>
              <h3 className="text-2xl w-60 font-semibold mb-4 bg-gradient-to-r from-[#D4AF37] to-[#FF5E5B] bg-clip-text text-transparent">
                {editingId ? "Edit Your Category" : "Add New Category"}
              </h3>
              <p className="text-sm leading-relaxed text-[#B0B0B0]">
                {editingId
                  ? "Update the category details below. Make sure all information is accurate before saving."
                  : "Use this form to add a new category. Categories help you organize services in a clear and professional way."}
              </p>
            </div>
            {/* Right Section - Form */}
            <div className="p-8 bg-[#0D0D0D]/20 backdrop-blur-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    {...register("category", {
                      required: "Category name is required",
                    })}
                    className="w-full bg-[#1f1f1f] border border-[#333] text-white placeholder-[#888] px-4 py-2 rounded-md focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#B0B0B0] mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="Add a description"
                    {...register("descriptions", {
                      required: "Description is required",
                    })}
                    className="w-full bg-[#1f1f1f] border border-[#333] text-white placeholder-[#888] px-4 py-2 rounded-md focus:outline-none focus:border-[#D4AF37]"
                  />
                  {errors.descriptions && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.descriptions.message}
                    </p>
                  )}
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5E5B] to-[#ff3733] text-white py-2 px-4 rounded-md font-semibold hover:brightness-110 transition-all"
                >
                  <Plus size={16} />
                  {editingId ? "Update Category" : "Add Category"}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
        {/* Divider */}
        <div className="my-10 flex items-center justify-center">
          <hr className="w-full border-t border-[#2a2a2a]" />
          <span className="mx-4 text-[#888] text-sm">Manage Categories</span>
          <hr className="w-full border-t border-[#2a2a2a]" />
        </div>
        {/* Table Section */}
        <motion.div
          className="backdrop-blur-sm bg-white/5 rounded-2xl shadow-lg border border-white/10 p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#333] border border-[#D4AF37]/20 rounded-md">
              <thead className="bg-gradient-to-r from-[#1a1a1a] to-[#111]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">
                    No.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">
                    Description
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {categories.map((category, index) => (
                  <tr
                    key={category._id}
                    className="hover:bg-gradient-to-r hover:from-[#2d2d2d] hover:to-[#1f1f1f] transition-all duration-300"
                  >
                    <td className="px-4 py-3 text-sm text-[#B0B0B0]">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {category.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#CCCCCC]">
                      {category.descriptions}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="inline-flex items-center justify-center px-3 py-1.5 bg-[#ebc54b] hover:bg-yellow-500 text-[#0D0D0D] rounded-md transition-transform transform hover:scale-105"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="inline-flex items-center justify-center px-3 py-1.5 bg-[#FF5E5B] hover:bg-red-600 text-white rounded-md transition-transform transform hover:scale-105"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-[#888] py-6 text-sm italic"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
      {/* Confirmation Modal */}
    {confirmDeleteId && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", damping: 20 }}
      className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 rounded-2xl border border-[#FF5E5B]/30 shadow-[0_0_30px_rgba(255,94,91,0.3)] max-w-md w-full"
    >
      {/* Decorative elements */}
      <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#FF5E5B] blur-md"></div>
      <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-[#D4AF37] blur-md"></div>
      
      {/* Main content */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 p-3 bg-[#FF5E5B]/10 rounded-full border border-[#FF5E5B]/30">
          <Trash2 className="text-[#FF5E5B]" size={28} />
        </div>
        
        <h3 className="text-2xl font-semibold mb-2 text-white">Delete Category</h3>
        <p className="text-[#B0B0B0] mb-6">
          This will permanently delete the category and cannot be undone. Are you sure?
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

export default Category;
