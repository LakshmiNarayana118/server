const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    lastName: Joi.string().required(),
});

module.exports = { registerSchema };
