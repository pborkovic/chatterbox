const express = require('express');
const router = express.Router();

function setupChannelRoutes(db, dbOps) {
    // POST /server/:serverId/channel
    router.post('/:serverId/channel', (req, res) => {
        try {
            const channel = {
                ...req.body,
                server_id: req.params.serverId
            };
            const result = dbOps.insertChannel(db, channel);
            res.json({ id: result.lastInsertRowid });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // GET /server/:serverId/channel
    router.get('/:serverId/channel', (req, res) => {
        try {
            const channels = dbOps.getChannelsByServer(db, req.params.serverId);
            res.json({ channels });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET /server/:serverId/channel/:channelId
    router.get('/:serverId/channel/:channelId', (req, res) => {
        try {
            const channel = dbOps.getChannelById(db, req.params.channelId);
            if (!channel) return res.status(404).json({ error: 'Channel not found' });
            res.json(channel);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = setupChannelRoutes;