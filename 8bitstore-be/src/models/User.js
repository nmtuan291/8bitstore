const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true},
        password: { type: String, required: true },
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        role: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('users', userSchema);
module.exports = User;