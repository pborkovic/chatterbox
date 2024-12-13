class ServerModel {
    constructor(db) {
        this.db = db;
    }

    getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        return this.db.prepare(
            'SELECT * FROM servers LIMIT ? OFFSET ?'
        ).all(limit, offset);
    }

    getById(id) {
        return this.db.prepare(
            'SELECT * FROM servers WHERE id = ?'
        ).get(id);
    }

    create(serverData) {
        const stmt = this.db.prepare(
            'INSERT INTO servers (name, description, admin_user_id) VALUES (?, ?, ?)'
        );
        const result = stmt.run(serverData.name, serverData.description, serverData.admin_user_id);
        return result.lastInsertRowid;
    }

    update(id, serverData) {
        const stmt = this.db.prepare(
            'UPDATE servers SET name = ?, description = ?, admin_user_id = ? WHERE id = ?'
        );
        return stmt.run(serverData.name, serverData.description, serverData.admin_user_id, id);
    }

    delete(id) {
        return this.db.prepare('DELETE FROM servers WHERE id = ?').run(id);
    }
}
