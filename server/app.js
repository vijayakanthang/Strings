// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./db');
const { accessToken } = require('./middleware/auth');
const { signup, login } = require('./controllers/userController');
const { getThreads, addThread, updateThread, deleteThread, likeThread } = require('./controllers/threadsController');

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

app.post('/signup', signup);
app.post('/login', login);
app.get('/', getThreads);
app.get('/home', accessToken, getThreads);
app.put('/:id',likeThread)
app.post('/', addThread);
app.put('/:id', updateThread);
app.delete('/:id', deleteThread);

app.listen(8080, () => {
    console.log('Server running');
});
