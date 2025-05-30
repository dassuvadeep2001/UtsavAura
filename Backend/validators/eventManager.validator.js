const joi= require('joi');

const eventManagerValidator = joi.object({
    gender: joi.string().valid('Male', 'Female', 'Other').required().messages({
        'any.required': 'Gender is required',
        'any.only': 'Gender must be "Male", "Female", or "Other"',
    }),
    categoryId: joi.array().items(
  joi.string().length(24).hex().required() // assuming MongoDB ObjectId
).required().messages({
  'any.required': 'Category is required',
  'string.length': 'Category ID must be a valid ObjectId',
  'string.hex': 'Category ID must be a valid ObjectId'
}),
    service: joi.array().items(joi.string().valid('Banquet', 'Caterer', 'Decorator', 'Studio')).required().messages({
        'any.required': 'Service is required',
        'any.only': 'Service must be one of "Banquet", "Caterer", "Decorator", or "Studio"',
    }),
    description: joi.string().max(1000).optional().messages({
        'string.max': 'Description must be less than 1000 characters',
    }),
    age: joi.number().integer().min(18).max(100).optional().messages({
        'number.base': 'Age must be a number',
        'number.integer': 'Age must be an integer',
        'number.min': 'Age must be at least 18',
        'number.max': 'Age must not exceed 60',
    }),
previousWorkImages: joi.array().items(joi.string()).optional(),
});

module.exports = eventManagerValidator;