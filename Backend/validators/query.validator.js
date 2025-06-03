const joi= require('joi');
const emailRegex = /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;

const queryValidator = joi.object({
    name: joi.string().min(3).max(30).required().messages({
        'any.required': 'Name is required',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 30 characters long',
    }),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .pattern(emailRegex)
        .message('Email must be a valid email address.')
        .required()
        .messages({
            'any.required': 'Email is required.'
    }),
    message: joi.string().min(3).max(10000).required().messages({
        'any.required': 'Query is required',
        'string.min': 'Query must be at least 3 characters long',
        'string.max': 'Query must be at most 10000 characters long',
    }),
});

module.exports = queryValidator;