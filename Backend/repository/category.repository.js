const categoryModel = require("../models/category.model");
const eventManagerModel = require("../models/eventManager.model");
const mongoose = require("mongoose");

class CategoryRepository {
  async createCategory(data) {
    return await categoryModel.create(data);
  }

  async findCategoryByName(category) {
    return await categoryModel.findOne({ category });
  }

  async getAllCategories() {
    return await categoryModel.find({ isDeleted: false });
  }

  async getEventManagersByCategory(categoryId) {
    return await eventManagerModel.aggregate([
      {
        $match: {
          categoryId: { $in: [new mongoose.Types.ObjectId(categoryId)] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "eventManagerId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },

      // Lookup for all reviews
      {
        $lookup: {
          from: "reviews",
          localField: "eventManagerId",
          foreignField: "eventManagerId",
          as: "reviews",
        },
      },

      // Lookup for average review
      {
        $lookup: {
          from: "reviews",
          let: { eventManagerId: "$eventManagerId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$eventManagerId", "$$eventManagerId"] },
              },
            },
            {
              $group: {
                _id: null,
                avgReview: { $avg: "$rating" },
              },
            },
          ],
          as: "reviewStats",
        },
      },

      {
        $addFields: {
          avgReview: {
            $round: [{ $ifNull: [{ $first: "$reviewStats.avgReview" }, 0] }, 1],
          },
        },
      },

      {
        $project: {
          _id: 0,
          eventManagerId: 1,
          name: "$userDetails.name",
          address: "$userDetails.address",
          profileImage: "$userDetails.profileImage",
          avgReview: 1,
          reviews: 1,
        },
      },
    ]);
  }
}

module.exports = new CategoryRepository();
