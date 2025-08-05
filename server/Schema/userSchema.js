// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true }
});

module.exports = mongoose.model('NewUser', userSchema);
