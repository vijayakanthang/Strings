const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // not needed if you're already using express.json()
const { connectToDatabase } = require('./db');
const { accessToken } = require('./middleware/auth');
const { signup, login } = require('./controllers/userController');
const {
    getThreads,
    addThread,
    updateThread,
    deleteThread,
    likeThread
} = require('./controllers/threadsController');

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

// Auth routes
app.post('/signup', signup);
app.post('/login', login);

// Thread routes
app.get('/', getThreads);
app.get('/home', accessToken, getThreads);
app.post('/', addThread);
app.put('/api/update/:id', updateThread);     // <-- updated
app.put('/api/threads/:id', likeThread);      // <-- updated
app.delete('/:id', deleteThread);

// Start server
app.listen(8080, () => {
    console.log('Server running ');
});
