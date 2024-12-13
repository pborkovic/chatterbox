const express = require('express');
const router = express.Router();

function setupUserRoutes(controller) {
    if (!controller) {
        throw new Error('Controller not provided to setupUserRoutes');
    }

    router.get('/', async (req, res) => {
        try {
            await controller.getAllUsers(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.get('/:userId', async (req, res) => {
        try {
            await controller.getUserById(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    router.post('/', async (req, res) => {
        try {
            await controller.createUser(req, res);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = setupUserRoutes;