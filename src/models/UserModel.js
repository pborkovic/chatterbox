class UserModel {
    constructor(db) {
        this.db = db;
    }

    getAll(page = 1, limit = 10, search = '') {
        const offset = (page - 1) * limit;
        let query = 'SELECT id, login, firstName, lastName, email FROM users';

        if (search) {
            query += ` WHERE login LIKE ? OR firstName LIKE ? OR lastName LIKE ?`;
            const searchPattern = `%${search}%`;
            return this.db.prepare(query + ` LIMIT ? OFFSET ?`)
                .all(searchPattern, searchPattern, searchPattern, limit, offset);
        }

        return this.db.prepare(query + ` LIMIT ? OFFSET ?`).all(limit, offset);
    }

    getById(id) {
        return this.db.prepare('SELECT id, login, firstName, lastName, email FROM users WHERE id = ?').get(id);
    }

    create(userData) {
        const stmt = this.db.prepare(
            'INSERT INTO users (login, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)'
        );
        const result = stmt.run(userData.login, userData.firstName, userData.lastName, userData.email, userData.password);
        return result.lastInsertRowid;
    }

    update(id, userData) {
        const stmt = this.db.prepare(
            'UPDATE users SET login = ?, firstName = ?, lastName = ?, email = ? WHERE id = ?'
        );
        return stmt.run(userData.login, userData.firstName, userData.lastName, userData.email, id);
    }

    delete(id) {
        return this.db.prepare('DELETE FROM users WHERE id = ?').run(id);
    }
}

module.exports = UserModel;