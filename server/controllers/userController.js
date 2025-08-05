// controllers/userController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Schema/userSchema');

const secretKey = 'V1j@y';

async function signup(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();
        res.status(200).send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(400).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ username: user.username, email: user.email }, secretKey, { expiresIn: '1d' });
        res.send({ token });
    } catch (error) {
        console.error('Error in login', error);
        res.status(500).send('Error in login');
    }
}

module.exports = { signup, login };
