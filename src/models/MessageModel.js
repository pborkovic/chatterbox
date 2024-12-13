class MessageModel {
    constructor(db) {
        this.db = db;
    }

    getAllByChannelId(channelId, page = 1, limit = 100, fromTimestamp = null, toTimestamp = null) {
        const offset = (page - 1) * limit;
        let query = 'SELECT * FROM messages WHERE channel_id = ?';
        const params = [channelId];

        if (fromTimestamp) {
            query += ' AND timestamp >= ?';
            params.push(fromTimestamp);
        }
        if (toTimestamp) {
            query += ' AND timestamp <= ?';
            params.push(toTimestamp);
        }

        query += ' ORDER BY timestamp DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        return this.db.prepare(query).all(...params);
    }

    create(messageData) {
        const stmt = this.db.prepare(
            'INSERT INTO messages (content, user_id, channel_id) VALUES (?, ?, ?)'
        );
        const result = stmt.run(
            messageData.content,
            messageData.user_id,
            messageData.channel_id
        );
        return result.lastInsertRowid;
    }

    delete(id) {
        return this.db.prepare('DELETE FROM messages WHERE id = ?').run(id);
    }
}
