// middleware/auth.js

const jwt = require('jsonwebtoken');
const secretKey = 'V1j@y';

function accessToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('Request denied');
    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}

module.exports = { accessToken };
