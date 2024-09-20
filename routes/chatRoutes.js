const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Chat = require('../models/chatModel');
const router = express.Router();

router.get('/:receiverId', protect, async (req, res) => {
    const receiverId = req.params.receiverId;

    try {
        const messages = await Chat.find({
            $or: [
                { senderId: req.user.id, receiverId: receiverId },
                { senderId: receiverId, receiverId: req.user.id },
            ],
        }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/:receiverId', protect, async (req, res) => {
    const receiverId = req.params.receiverId;
    const { message } = req.body;

    try {
        const newMessage = await Chat.create({
            senderId: req.user.id,
            receiverId: receiverId,
            message,
        });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
