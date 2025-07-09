const express = require('express');
const jwt = require('jsonwebtoken');
const authentication = require('./ZodMiddleware');
const verifyToken = require('./verifyToken');
const User = require('../db');

require('dotenv').config();
const router = express.Router();
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

        const token = jwt.sign(
            {
                userId: newUser._id,
                username: newUser.username,
                firstname: newUser.firstName,
                lastname: newUser.lastName
            },secret,{ expiresIn: '1d' });

        // Respond with token and user data
        res.status(200).send({
            msg: 'User created successfully in DB',
            token,
            username,
            password,
            firstName,
            lastName
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Signin Route

router.post('/signin', verifyToken, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'User signed in successfully',
        userId: req.user.userId,
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname
    });
});

//Info update router

router.put('/update', verifyToken, async (req, res) => {
    try {
        const { password, firstname, lastname } = req.body;
        const userId = req.user.userId;

        const updatedUser = await User.findByIdAndUpdate(userId,{password,firstName: firstname,lastName: lastname},{ new: true });

        if (updatedUser) {
            return res.status(200).send({
                message: "User updated successfully",
                firstname: updatedUser.firstName,
                lastname: updatedUser.lastName
            });
        } else {
            return res.status(404).send({
                message: "User not found"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Error while updating information"
        });
    }
});


//This route is to get all the users by first and last name





module.exports = router;
