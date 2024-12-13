const express = require('express');
const router = express.Router();

function setupServerRoutes(controller) {
    router.get('/', (req, res) => controller.getAllServers(req, res));
    router.get('/:id', (req, res) => controller.getServerById(req, res));
    router.post('/', (req, res) => controller.createServer(req, res));
    router.put('/:id', (req, res) => controller.updateServer(req, res));
    router.delete('/:id', (req, res) => controller.deleteServer(req, res));
    return router;
}

module.exports = setupServerRoutes;