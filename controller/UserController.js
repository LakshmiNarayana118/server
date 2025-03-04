const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
// const registerModel = require('../model/signUpModel');
const { TOKEN_SECRET } = require('../config/config.json');
const { hashPassword } = require('../helper/util');

const register = async (req, res) => {
    try {
        console.log(req.body);
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            res.status(400).send('Email already exists');
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            firstName: req.body.firstName,
            email: req.body.email,
            password: hashedPassword,
            lastName: req.body.lastName,
        });
        await user.save();
        res.status(200).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: 'Incorrect Email- ID' });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Incorrect Password');
        const token = jwt.sign({ email: user.email }, TOKEN_SECRET, { expiresIn: 86400 });
        return res.status(200).json({ token, email: user.email });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
const resetPassword = async (request, res) => {
    const { password, confirmPassword } = request.body;
    const {email} = request.user;
    const user = User.findOne({where: email});
    if (!user) return res.send({ message: "User not found" }).status(404);
    if(password !== confirmPassword) return res.send({ message: "Passwords do not match" }).status(400);
  
    // Update Password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    await User.updateOne({where: email}, user);
    return res.send({ message: "Password reset successful" }).status(200);
  };
  

module.exports = {
    register,
    login,
    resetPassword
};
