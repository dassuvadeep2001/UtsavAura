// repositories/review.repository.js
const reviewModel = require('../models/review.model');

class ReviewRepository {
    async createReview(data) {
        return await reviewModel.create(data);
    }

    async getTopFiveStarReviews() {
        return await reviewModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                    rating: 5
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'eventManagerId',
                    foreignField: '_id',
                    as: 'eventManagerDetails'
                }
            },
            { $unwind: '$eventManagerDetails' },
            {
                $project: {
                    _id: 0,
                    rating: 1,
                    review: 1,
                    Name: '$userDetails.name',
                    ProfileImage: '$userDetails.profileImage',
                    EventManagerName: '$eventManagerDetails.name',
                    createdAt: 1
                }
            },
            { $sort: { createdAt: -1 } },
            { $limit: 6 }
        ]);
    }
}

module.exports = new ReviewRepository();
