// app.js

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectToDatabase } = require('./db');
const { accessToken } = require('./middleware/auth');
const { signup, login } = require('./controllers/userController');

const {
    getThreads,
    addThread,
    updateThread,
    deleteThread,
    likeThread,
    commentThread
} = require('./controllers/threadsController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Auth Routes
app.post('/signup', signup);
app.post('/login', login);

// Thread Routes
app.get('/', getThreads);
app.get('/home', accessToken, getThreads);
app.post('/', addThread);
app.put('/api/update/:id', updateThread);
app.put('/api/threads/:id', likeThread);
app.post('/api/threads/:id/comment', commentThread);
app.delete('/api/threads/:id', deleteThread);


// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
