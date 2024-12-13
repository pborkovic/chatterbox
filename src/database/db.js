const Database = require('better-sqlite3');

function getAllTables(db) {
    const sql = `SELECT * FROM sqlite_master WHERE type = 'table'`;
    const stmt = db.prepare(sql);
    return stmt.all();
}

function hasTable(tableName, tables) {
    for (const table of tables) {
        if (table.name === tableName) {
            return true;
        }
    }
    return false;
}

function createUsers(db) {
    const sql = `
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      login VARCHAR(50) NOT NULL UNIQUE,
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL
    )
  `;
    const stmt = db.prepare(sql);
    stmt.run();
}

function createServers(db) {
    const sql = `
    CREATE TABLE servers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      admin_user_id INTEGER,
      FOREIGN KEY (admin_user_id) REFERENCES users(id)
    )
  `;
    const stmt = db.prepare(sql);
    stmt.run();
}

function createChannels(db) {
    const sql = `
    CREATE TABLE channels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      moderator_user_id INTEGER,
      server_id INTEGER,
      FOREIGN KEY (moderator_user_id) REFERENCES users(id),
      FOREIGN KEY (server_id) REFERENCES servers(id)
    )
  `;
    const stmt = db.prepare(sql);
    stmt.run();
}

function createMessages(db) {
    const sql = `
    CREATE TABLE messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp REAL NOT NULL,
      user_id INTEGER,
      channel_id INTEGER,
      message TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (channel_id) REFERENCES channels(id)
    )
  `;
    const stmt = db.prepare(sql);
    stmt.run();
}

function initializeDatabase() {
    const db = new Database('chatterbox.db');
    const tables = getAllTables(db);

    if (!hasTable('users', tables)) createUsers(db);
    if (!hasTable('servers', tables)) createServers(db);
    if (!hasTable('channels', tables)) createChannels(db);
    if (!hasTable('messages', tables)) createMessages(db);

    return db;
}

function insertUser(db, user) {
    const sql = `
    INSERT INTO users (login, firstName, lastName, email, password)
    VALUES (:login, :firstName, :lastName, :email, :password)
  `;
    const stmt = db.prepare(sql);
    return stmt.run(user);
}

function getAllUsers(db) {
    const sql = `SELECT id, login, firstName, lastName, email FROM users`;
    const stmt = db.prepare(sql);
    return stmt.all();
}

function getUserById(db, id) {
    const sql = `SELECT id, login, firstName, lastName, email FROM users WHERE id = ?`;
    const stmt = db.prepare(sql);
    return stmt.get(id);
}

function insertServer(db, server) {
    const sql = `
    INSERT INTO servers (name, description, admin_user_id)
    VALUES (:name, :description, :admin_user_id)
  `;
    const stmt = db.prepare(sql);
    return stmt.run(server);
}

function getAllServers(db) {
    const sql = `SELECT * FROM servers`;
    const stmt = db.prepare(sql);
    return stmt.all();
}

function getServerById(db, id) {
    const sql = `SELECT * FROM servers WHERE id = ?`;
    const stmt = db.prepare(sql);
    return stmt.get(id);
}

function insertChannel(db, channel) {
    const sql = `
    INSERT INTO channels (name, description, moderator_user_id, server_id)
    VALUES (:name, :description, :moderator_user_id, :server_id)
  `;
    const stmt = db.prepare(sql);
    return stmt.run(channel);
}

function getChannelsByServer(db, serverId) {
    const sql = `SELECT * FROM channels WHERE server_id = ?`;
    const stmt = db.prepare(sql);
    return stmt.all(serverId);
}

function getChannelById(db, id) {
    const sql = `SELECT * FROM channels WHERE id = ?`;
    const stmt = db.prepare(sql);
    return stmt.get(id);
}

function insertMessage(db, message) {
    const sql = `
    INSERT INTO messages (timestamp, user_id, channel_id, message)
    VALUES (:timestamp, :user_id, :channel_id, :message)
  `;
    const stmt = db.prepare(sql);
    return stmt.run(message);
}

function getMessagesByChannel(db, channelId, limit = 100) {
    const sql = `
    SELECT * FROM messages 
    WHERE channel_id = ? 
    ORDER BY timestamp DESC 
    LIMIT ?
  `;
    const stmt = db.prepare(sql);
    return stmt.all(channelId, limit);
}

function getMessageById(db, id) {
    const sql = `SELECT * FROM messages WHERE id = ?`;
    const stmt = db.prepare(sql);
    return stmt.get(id);
}

module.exports = {
    initializeDatabase,
    insertUser,
    getAllUsers,
    getUserById,
    insertServer,
    getAllServers,
    getServerById,
    insertChannel,
    getChannelsByServer,
    getChannelById,
    insertMessage,
    getMessagesByChannel,
    getMessageById
};