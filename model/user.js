const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true,
    },
    lastName: {
        type: String, required: true,
    },
    email: {
        type: String, required: true,
    },
    password: {
        type: String, required: true,
    },

});
registerSchema.set('timestamps', true);
module.exports = mongoose.model('User', registerSchema);
