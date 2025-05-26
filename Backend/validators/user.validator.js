const joi= require('joi');

const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
const emailRegex = /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/;
const phoneRegex = /^\d{10}$/;

const userValidator = joi.object({
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
    phone: joi.string()
        .pattern(phoneRegex)
        .message('Phone number must be a valid 10-digit number.')
        .required()
        .messages({
            'any.required': 'Phone number is required.'
    }),
    address: joi.string().min(3).max(100).required().messages({
        'any.required': 'Address is required',
        'string.min': 'Address must be at least 3 characters long',
        'string.max': 'Address must be at most 100 characters long',
    }),
    password: joi.string().pattern(passwordRegex).required().messages({
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    })
});

const updateUserValidator = joi.object({
    name: joi.string().min(3).max(30).optional().messages({
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 30 characters long',
    }),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .pattern(emailRegex)
        .message('Email must be a valid email address.')
        .optional()
        .messages({
            'string.pattern.base': 'Email must be a valid email address.'
    }),
    phone: joi.string()
        .pattern(phoneRegex)
        .message('Phone number must be a valid 10-digit number.')
        .optional()
        .messages({
            'string.pattern.base': 'Phone number must be a valid 10-digit number.'
    }),
    address: joi.string().min(3).max(100).optional().messages({
        'string.min': 'Address must be at least 3 characters long',
        'string.max': 'Address must be at most 100 characters long',
    }),
});

const resetPasswordValidator = joi.object({
    password: joi.string().pattern(passwordRegex).required().messages({
        'any.required': 'Password is required',
        'string.pattern.base': 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
        'any.required': 'Confirm Password is required',
        'any.only': 'Confirm Password must match Password',
    })
});

module.exports = {
    userValidator,
    updateUserValidator,
    resetPasswordValidator
};