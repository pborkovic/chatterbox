class UserController {
    constructor(db, dbOps) {
        this.db = db;
        this.dbOps = dbOps;
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.dbOps.getAllUsers(this.db);
            res.json({ success: true, data: users });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await this.dbOps.getUserById(this.db, req.params.userId);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
            res.json({ success: true, data: user });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }

    async createUser(req, res) {
        try {
            const result = await this.dbOps.insertUser(this.db, req.body);
            res.status(201).json({ success: true, data: { id: result.lastInsertRowid } });
        } catch (err) {
            res.status(400).json({ success: false, error: err.message });
        }
    }
}

module.exports = UserController;