const joi= require('joi');

const categoryValidator = joi.object({
    category: joi.string().min(3).max(30).required().messages({
        'any.required': 'Category is required',
        'string.min': 'Category name must be at least 3 characters long',
        'string.max': 'Category name must be at most 30 characters long',
    }),
});

module.exports = categoryValidator;