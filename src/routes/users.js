const express = require('express');
const router = express.Router();

function setupUserRoutes(db, dbOps) {
    // POST /user
    router.post('/', (req, res) => {
        try {
            const result = dbOps.insertUser(db, req.body);
            res.json({ id: result.lastInsertRowid });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // GET /user
    router.get('/', (req, res) => {
        try {
            const users = dbOps.getAllUsers(db);
            res.json({ users });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET /user/:userId
    router.get('/:userId', (req, res) => {
        try {
            const user = dbOps.getUserById(db, req.params.userId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = setupUserRoutes;