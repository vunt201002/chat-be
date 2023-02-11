
const Message = require("../models/Message");

const messageController = {
    addMessage: async (req, res) => {
        try {
            const { from, to, message } = req.body;
            const data = await Message.create({
                message: { text: message },
                users: [from, to],
                sender: from,
            });

            if (data) {
                return res.status(200).json("Message added successfully");
            } else {
                return res.status(403).json("Failed to add message to database");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getMessages: async (req, res) => {
        try {
            const { from, to } = req.body;

            const messages = await Message.find({
                users: {
                    $all: [from, to],
                },

            }).sort({ updatedAt: 1 });

            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text
                };
            });

            return res.status(200).json(projectedMessages);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};

module.exports = messageController;