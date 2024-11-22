const express = require('express');
const path = require('path');
const { generateData } = require('./data/generator');
const app = express();
const port = 3456;

app.use(express.static('public'));

const { users, servers, channels, messages } = generateData();

app.get('/user', (req, res) => {
    res.json({ users: Object.keys(users) });
});

app.get('/user/:userId', (req, res) => {
    const user = users[req.params.userId];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

app.get('/server', (req, res) => {
    res.json({ servers: Object.keys(servers) });
});

app.get('/server/:serverId', (req, res) => {
    const server = servers[req.params.serverId];
    if (!server) return res.status(404).json({ error: 'Server not found' });
    res.json(server);
});

app.get('/server/:serverId/channel', (req, res) => {
    const server = servers[req.params.serverId];
    if (!server) return res.status(404).json({ error: 'Server not found' });
    res.json({ channels: server.channels });
});

app.get('/server/:serverId/channel/:channelId', (req, res) => {
    const channel = channels[req.params.channelId];
    if (!channel) return res.status(404).json({ error: 'Channel not found' });
    res.json(channel);
});

app.get('/server/:serverId/channel/:channelId/message', (req, res) => {
    const channel = channels[req.params.channelId];
    if (!channel) return res.status(404).json({ error: 'Channel not found' });

    const count = parseInt(req.query.count) || 100;
    const messageIds = channel.messages.slice(-count);
    res.json({ messages: messageIds });
});

app.get('/server/:serverId/channel/:channelId/message/:messageId', (req, res) => {
    const message = messages[req.params.messageId];
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
});

app.listen(port, () => {
    console.log(`Chatterbox server running at http://localhost:${port}`);
});

