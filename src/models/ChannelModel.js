class ChannelModel {
    constructor(db) {
        this.db = db;
    }

    getAllByServerId(serverId, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        return this.db.prepare(
            'SELECT * FROM channels WHERE server_id = ? LIMIT ? OFFSET ?'
        ).all(serverId, limit, offset);
    }

    getById(id) {
        return this.db.prepare(
            'SELECT * FROM channels WHERE id = ?'
        ).get(id);
    }

    create(channelData) {
        const stmt = this.db.prepare(
            'INSERT INTO channels (name, description, server_id, moderator_user_id) VALUES (?, ?, ?, ?)'
        );
        const result = stmt.run(
            channelData.name,
            channelData.description,
            channelData.server_id,
            channelData.moderator_user_id
        );
        return result.lastInsertRowid;
    }

    update(id, channelData) {
        const stmt = this.db.prepare(
            'UPDATE channels SET name = ?, description = ?, moderator_user_id = ? WHERE id = ?'
        );
        return stmt.run(
            channelData.name,
            channelData.description,
            channelData.moderator_user_id,
            id
        );
    }

    delete(id) {
        return this.db.prepare('DELETE FROM channels WHERE id = ?').run(id);
    }
}
