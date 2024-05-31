// db.js

const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Thread', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = { connectToDatabase };
