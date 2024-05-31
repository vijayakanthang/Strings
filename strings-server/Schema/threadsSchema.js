// models/thread.js

const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    date: { type: String, required: true },
    username: { type: String, required: true },
    new_thread: { type: String, required: true },
    like :[{type:String}],
    comment :[{type:String}],
});

module.exports = mongoose.model('NewThread', threadSchema);