const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/db');

// mods
const UserModel = require('./models/UserModel');
const ServerModel = require('./models/ServerModel');
const ChannelModel = require('./models/ChannelModel');
const MessageModel = require('./models/MessageModel');

// conts
const UserController = require('./controllers/UserController');
const ServerController = require('./controllers/ServerController');
const ChannelController = require('./controllers/ChannelController');
const MessageController = require('./controllers/MessageController');

// routes
const setupUserRoutes = require('./routes/userRoutes');
const setupServerRoutes = require('./routes/serverRoutes');
const setupChannelRoutes = require('./routes/channelRoutes');
const setupMessageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// init models
const db = dbConnection.getDb();
const userModel = new UserModel(db);
const serverModel = new ServerModel(db);
const channelModel = new ChannelModel(db);
const messageModel = new MessageModel(db);

// init conts
const userController = new UserController(userModel);
const serverController = new ServerController(serverModel);
const channelController = new ChannelController(channelModel);
const messageController = new MessageController(messageModel);

// routes
app.use('/users', setupUserRoutes(userController));
app.use('/servers', setupServerRoutes(serverController));
app.use('/servers/:serverId/channels', setupChannelRoutes(channelController));
app.use('/channels/:channelId/messages', setupMessageRoutes(messageController));

// err handl middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3456;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});