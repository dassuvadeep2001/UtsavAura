// controllers/review.controller.js
const reviewValidator = require('../validators/review.validator');
const reviewRepository = require('../repository/review.repository');

class ReviewController {
    async addReview(req, res) {
        try {
            const userId = req.user?._id;
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const { eventManagerId } = req.params;
            const { error, value } = reviewValidator.validate(req.body);

            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const newReview = await reviewRepository.createReview({
                eventManagerId,
                userId,
                rating: value.rating,
                review: value.review
            });

            return res.status(201).json({
                message: 'Review added successfully',
                data: newReview
            });
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    }

    async getReviews(req, res) {
        try {
            const result = await reviewRepository.getTopFiveStarReviews();

            return res.status(200).json({
                status: 200,
                message: 'Top 6 five-star reviews fetched successfully',
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

module.exports = new ReviewController();
