class ServerController {
    constructor(db, dbOps) {
        this.db = db;
        this.dbOps = dbOps;
    }

    getAllServers(req, res) {
        try {
            const servers = this.dbOps.getAllServers(this.db);
            res.json({ servers });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    getServerById(req, res) {
        try {
            const server = this.dbOps.getServerById(this.db, req.params.serverId);
            if (!server) return res.status(404).json({ error: 'Server not found' });
            res.json(server);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    createServer(req, res) {
        try {
            const result = this.dbOps.insertServer(this.db, req.body);
            res.json({ id: result.lastInsertRowid });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = ServerController;