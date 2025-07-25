// verifyToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId; 
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
}

module.exports = verifyToken;
