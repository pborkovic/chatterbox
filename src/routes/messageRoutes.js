const express = require('express');
const router = express.Router({ mergeParams: true });

function setupMessageRoutes(controller) {
    if (!controller) {
        throw new Error('Controller not provided to setupMessageRoutes');
    }

    router.get('/', async (req, res) => {
        try {
            await controller.getMessages(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.post('/', async (req, res) => {
        try {
            await controller.createMessage(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.get('/:messageId', async (req, res) => {
        try {
            await controller.getMessageById(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = setupMessageRoutes;