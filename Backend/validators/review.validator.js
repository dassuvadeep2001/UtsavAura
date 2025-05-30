const joi= require('joi');

const reviewValidator = joi.object({
    review: joi.string().min(3).max(100).required().messages({
        'any.required': 'Review is required',
        'string.min': 'Review must be at least 3 characters long',
        'string.max': 'Review must be at most 100 characters long',
    }),
    rating: joi.number().integer().min(1).max(5).required().messages({
        'any.required': 'Rating is required',
        'number.base': 'Rating must be a number',
        'number.integer': 'Rating must be an integer',
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating must not exceed 5',
    }),
});

module.exports = reviewValidator;