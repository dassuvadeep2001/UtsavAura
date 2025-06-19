// controllers/category.controller.js
const categoryValidator = require("../validators/category.validator");
const categoryRepository = require("../repository/category.repository");

class CategoryController {
  async createCategory(req, res) {
    try {
      const { error, value } = categoryValidator.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const existing = await categoryRepository.findCategoryByName(
        value.category
      );
      if (existing) {
        return res.status(409).json({ message: "Category already exists" });
      }

      const result = await categoryRepository.createCategory({
        category: value.category,
        descriptions: value.descriptions,
      });
      return res.status(201).json({
        status: 201,
        message: "Category created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async getCategory(req, res) {
    try {
      const result = await categoryRepository.getAllCategories();
      return res.status(200).json({
        status: 200,
        message: "Category-wise event managers fetched successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async editCategory(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = categoryValidator.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const updated = await categoryRepository.updateCategoryById(id, {
        category: value.category,
        descriptions: value.descriptions,
      });

      if (!updated) {
        return res.status(404).json({
          status: 404,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Category updated successfully",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const deleted = await categoryRepository.deleteCategoryById(id);
      if (!deleted) {
        return res.status(404).json({
          status: 404,
          message: "Category not found",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "Category deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async categoryWiseEventManager(req, res) {
    try {
      const { categoryId } = req.params;
      const result = await categoryRepository.getEventManagersByCategory(
        categoryId
      );

      return res.status(200).json({
        status: 200,
        message: "Event managers fetched by category",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

module.exports = new CategoryController();
