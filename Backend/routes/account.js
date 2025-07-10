const express = require('express');
const authentication = require('./ZodMiddleware'); // not used here, just keeping your structure
const { Account } = require('../db'); 
const mongoose = require('mongoose');
const verifyToken = require('./verifyToken');
const router = express.Router();

// GET /balance
router.get("/balance",verifyToken,async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({
            balance: account.balance
        });
    } catch (err) {
        console.error("Balance fetch error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST /transfer
router.post("/transfer", verifyToken, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const { amount, to } = req.body;

        if (!amount || typeof amount !== "number" || amount <= 0) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Enter a valid amount" });
        }

        if (!to || !mongoose.Types.ObjectId.isValid(to)) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid recipient ID" });
        }

        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Recipient account not found" });
        }

        // Update balances
        account.balance -= amount;
        toAccount.balance += amount;

        await account.save({ session });
        await toAccount.save({ session });
        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        console.error("Transfer error:", error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});








module.exports = router;
