const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./src/database/db').initializeDatabase();
const dbOps = require('./src/database/db');

const setupUserRoutes = require('./src/routes/users');
const setupServerRoutes = require('./src/routes/servers');
const setupChannelRoutes = require('./src/routes/channels');
const setupMessageRoutes = require('./src/routes/messages');

const app = express();
const port = 3456;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Setup routes
app.use('/user', setupUserRoutes(db, dbOps));
app.use('/server', setupServerRoutes(db, dbOps));
app.use('/server', setupChannelRoutes(db, dbOps));
app.use('/server', setupMessageRoutes(db, dbOps));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Chatterbox server running at http://localhost:${port}`);
});