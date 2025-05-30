const categoryModel = require('../models/category.model');
const eventManagerModel = require('../models/eventManager.model');
const mongoose = require('mongoose');

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
                    categoryId: { $in: [new mongoose.Types.ObjectId(categoryId)] }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'eventManagerId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $project: {
                    _id: 0,
                    eventManagerId: '$eventManagerId',
                    name: '$userDetails.name',
                    address: '$userDetails.address',
                    profileImage: '$userDetails.profileImage'
                }
            }
        ]);
    }
}

module.exports = new CategoryRepository();
