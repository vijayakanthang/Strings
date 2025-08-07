const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    username: { type: String, required: true },
    new_thread: { type: String, required: true },
    like: [{ type: String }],
    comment: [{
        username: { type: String, required: true },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('NewThread', threadSchema);
