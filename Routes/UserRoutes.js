const app = require('express').Router();
const { userSchema } = require('../Schema/PostSchema');
const { resetPasswordSchema } = require('../Schema/resetpassword');
const { loginSchema } = require('../Schema/signIn');
const { registerSchema } = require('../Schema/signUp');
const { login, register,resetPassword} = require('../controller/UserController');
const { validate } = require('../middleware/ValidationHandle');
const { verifyAuth } = require('../middleware/VerifyAuth');

app.post('/login', validate(loginSchema, 'body'), login);
app.post('/register', validate(registerSchema, 'body'), register);
app.patch('/reset-password', validate(resetPasswordSchema, 'body'),verifyAuth, resetPassword);

module.exports = app;
