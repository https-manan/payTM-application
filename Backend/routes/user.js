const express = require('express');
const jwt = require('jsonwebtoken');
const authentication = require('./ZodMiddleware');
const verifyToken = require('./verifyToken');
const { User, Account } = require('../db'); 


require('dotenv').config();
const router = express.Router();
const secret = process.env.JWT_SECRET;


router.post('/signup', async (req, res) => {
    try {
        const randomBalance = Math.random() * 10000;
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

        await Account.create({
            userId: newUser._id,
            balance: randomBalance
        });

        const token = jwt.sign(
            {
                userId: newUser._id,
                username: newUser.username,
                firstname: newUser.firstName,
                lastname: newUser.lastName,
            },
            secret,
            { expiresIn: '1d' }
        );

        res.status(200).send({
            msg: 'User created successfully',
            token,
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});


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


router.put('/update', verifyToken, async (req, res) => {
    try {
        const { password, firstname, lastname } = req.body;
        const userId = req.user.userId;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                password,
                firstName: firstname,
                lastName: lastname
            },
            { new: true }
        );

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

router.get('/bulk', verifyToken, async (req, res) => {
    try {
        const { filter } = req.query;

        const query = {};
        if (filter) {
            query.$or = [
                { firstName: { $regex: filter, $options: 'i' } },
                { lastName: { $regex: filter, $options: 'i' } }
            ];
        }

        const users = await User.find(query);

        const result = users.map((e) => ({
            username: e.username,
            firstname: e.firstName,
            lastname: e.lastName
        }));

        res.status(200).send({ users: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching users' });
    }
});

module.exports = router;
