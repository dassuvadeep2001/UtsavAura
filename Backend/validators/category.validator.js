const joi= require('joi');

const categoryValidator = joi.object({
    category: joi.string().min(3).max(30).required().messages({
        'any.required': 'Category is required',
        'string.min': 'Category name must be at least 3 characters long',
        'string.max': 'Category name must be at most 30 characters long',
    }),
    descriptions: joi.string().min(3).max(1000).optional().messages({
        'string.max': 'Description must be less than 1000 characters',
        'string.min': 'Description must be at least 3 characters long',
        'any.required': 'Description is required',
    }),
});

module.exports = categoryValidator;