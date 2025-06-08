const eventManagerModel = require('../models/eventManager.model');
const userModel = require('../models/user.model');
const mongoose = require('mongoose');

class EventManagerRepository {
  async isEmailExist(email) {
    return await userModel.find({ email });
  }

  async createUser(data) {
    return await userModel.create(data);
  }

  async createEventManagerDetails(data) {
    return await eventManagerModel.create(data);
  }

  async findUserById(id) {
    return await userModel.findById(id);
  }

  async updateUserById(id, updateData) {
    return await userModel.findByIdAndUpdate(id, updateData);
  }

  async updateEventManagerDetails(id, updateData) {
    return await eventManagerModel.findOneAndUpdate(
      { eventManagerId: id },
      updateData,
      { new: true }
    );
  }

async getFullDetailsById(id) {
  return await eventManagerModel.aggregate([
    { $match: { eventManagerId: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'eventManagerId',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    { $unwind: '$userDetails' },
    // Lookup for all reviews
    {
      $lookup: {
        from: 'reviews',
        localField: 'eventManagerId',
        foreignField: 'eventManagerId',
        as: 'reviews'
      }
    },
    // Lookup for average review
    {
      $lookup: {
        from: 'reviews',
        let: { eventManagerId: '$eventManagerId' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$eventManagerId', '$$eventManagerId'] }
            }
          },
          {
            $group: {
              _id: null,
              avgReview: { $avg: '$rating' }
            }
          }
        ],
        as: 'reviewStats'
      }
    },
    {
      $addFields: {
        avgReview: {
          $round: [
            { $ifNull: [ { $first: '$reviewStats.avgReview' }, 0 ] },
            1
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: '$userDetails.name',
        email: '$userDetails.email',
        phone: '$userDetails.phone',
        address: '$userDetails.address',
        profileImage: '$userDetails.profileImage',
        gender: 1,
        age: 1,
        service: 1,
        description: 1,
        previousWorkImages: 1,
        avgReview: 1,
        reviews: 1 
      }
    }
  ]);
}
}

module.exports = new EventManagerRepository();
