const express = require('express');
const router = express.Router({ mergeParams: true });

function setupChannelRoutes(controller) {
    if (!controller) {
        throw new Error('Controller not provided to setupChannelRoutes');
    }

    router.get('/', async (req, res) => {
        try {
            await controller.getChannelsByServer(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.get('/:channelId', async (req, res) => {
        try {
            await controller.getChannelById(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.post('/', async (req, res) => {
        try {
            await controller.createChannel(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = setupChannelRoutes;