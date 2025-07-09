const express = require('express');
const authentication = require('./ZodMiddleware');
const router = express.Router();
const User = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;

        const parsed = authentication.safeParse({ username, password, firstName, lastName });

        if (!parsed.success) {
            return res.status(400).send({
                message: 'Validation failed. Please provide all valid credentials.'
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists.' });
        }

        const newUser = await User.create({ username, password, firstName, lastName });

        const token = jwt.sign({ userId: newUser._id }, secret, { expiresIn: '1d' });

        res.status(200).send({
            msg: 'User created successfully in DB',
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});


//SignIn route

router.post('/signin', (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                success: false,
                message: 'Token missing or malformed'
            });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, secret);

        res.status(200).send({
            success: true,
            message: 'User signed in successfully',
            userId: decoded.userId
        });

    } catch (error) {
        console.error(error);
        res.status(401).send({
            success: false,
            message: 'Invalid or expired token'
        });
    }
});

module.exports = route;
