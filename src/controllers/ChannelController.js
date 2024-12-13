class ChannelController {
    constructor(db, dbOps) {
        this.db = db;
        this.dbOps = dbOps;
    }

    async getChannelsByServer(req, res) {
        try {
            const channels = await this.dbOps.getChannelsByServer(this.db, req.params.serverId);
            res.json({ success: true, data: channels });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async getChannelById(req, res) {
        try {
            const channel = await this.dbOps.getChannelById(this.db, req.params.channelId);
            if (!channel) {
                return res.status(404).json({ success: false, error: 'Channel not found' });
            }
            res.json({ success: true, data: channel });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async createChannel(req, res) {
        try {
            const channel = {
                ...req.body,
                server_id: req.params.serverId
            };
            const result = await this.dbOps.insertChannel(this.db, channel);
            res.status(201).json({ success: true, data: { id: result.lastInsertRowid } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
}

module.exports = ChannelController;