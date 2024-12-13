const express = require('express');
const cors = require('cors');

const db = require('./src/database/db');
const dbInstance = db.initializeDatabase();

const UserController = require('./src/controllers/UserController');
const ServerController = require('./src/controllers/ServerController');
const ChannelController = require('./src/controllers/ChannelController');
const MessageController = require('./src/controllers/MessageController');

const setupUserRoutes = require('./src/routes/userRoutes');
const setupServerRoutes = require('./src/routes/serverRoutes');
const setupChannelRoutes = require('./src/routes/channelRoutes');
const setupMessageRoutes = require('./src/routes/messageRoutes');

const app = express();
const port = 3456;

app.use(cors());
app.use(express.json());

const userController = new UserController(dbInstance, db);
const serverController = new ServerController(dbInstance, db);
const channelController = new ChannelController(dbInstance, db);
const messageController = new MessageController(dbInstance, db);

app.use('/api/users', setupUserRoutes(userController));
app.use('/api/servers', setupServerRoutes(serverController));
app.use('/api/servers/:serverId/channels', setupChannelRoutes(channelController));
app.use('/api/channels/:channelId/messages', setupMessageRoutes(messageController));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});