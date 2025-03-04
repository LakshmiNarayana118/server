const Joi = require("@hapi/joi");

  const resetPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref("password"),
  }).with("password", "confirmPassword");

module.exports = { resetPasswordSchema };