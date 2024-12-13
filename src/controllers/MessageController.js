class MessageController {
    constructor(db, dbOps) {
        this.db = db;
        this.dbOps = dbOps;
    }

    async getMessages(req, res) {
        try {
            const count = parseInt(req.query.count) || 100;
            const messages = await this.dbOps.getMessagesByChannel(this.db, req.params.channelId, count);
            res.json({ success: true, data: messages });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async createMessage(req, res) {
        try {
            const message = {
                ...req.body,
                channel_id: req.params.channelId,
                timestamp: Date.now() / 1000
            };
            const result = await this.dbOps.insertMessage(this.db, message);
            res.status(201).json({ success: true, data: { id: result.lastInsertRowid } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }

    async getMessageById(req, res) {
        try {
            const message = await this.dbOps.getMessageById(this.db, req.params.messageId);
            if (!message) {
                return res.status(404).json({ success: false, error: 'Message not found' });
            }
            res.json({ success: true, data: message });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}

module.exports = MessageController;