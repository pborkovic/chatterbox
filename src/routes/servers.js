const express = require('express');
const router = express.Router();

function setupServerRoutes(db, dbOps) {
    // POST /server
    router.post('/', (req, res) => {
        try {
            const result = dbOps.insertServer(db, req.body);
            res.json({ id: result.lastInsertRowid });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // GET /server
    router.get('/', (req, res) => {
        try {
            const servers = dbOps.getAllServers(db);
            res.json({ servers });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // GET /server/:serverId
    router.get('/:serverId', (req, res) => {
        try {
            const server = dbOps.getServerById(db, req.params.serverId);
            if (!server) return res.status(404).json({ error: 'Server not found' });
            res.json(server);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = setupServerRoutes;