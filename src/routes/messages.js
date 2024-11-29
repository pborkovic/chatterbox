const express = require('express');
const router = express.Router();

function setupMessageRoutes(db, dbOps) {
    // POST /server/:serverId/channel/:channelId/message
    router.post('/:serverId/channel/:channelId/message', (req, res) => {
        try {
            const message = {
                ...req.body,
                channel_id: req.params.channelId,
                timestamp: Date.now() / 1000
            };
            const result = dbOps.insertMessage(db, message);
            res.json({ id: result.lastInsertRowid });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // GET /server/:serverId/channel/:channelId/message
    router.get('/:serverId/channel/:channelId/message', (req, res) => {
        try {
            const count = parseInt(req.query.count) || 100;
            const messages = dbOps.getMessagesByChannel(db, req.params.channelId, count);
            res.json({ messages });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET /server/:serverId/channel/:channelId/message/:messageId
    router.get('/:serverId/channel/:channelId/message/:messageId', (req, res) => {
        try {
            const message = dbOps.getMessageById(db, req.params.messageId);
            if (!message) return res.status(404).json({ error: 'Message not found' });
            res.json(message);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = setupMessageRoutes;