function seedDatabase(db) {
    // Create test users
    const userModel = new UserModel(db);
    const users = [
        { login: 'john_doe', firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' },
        { login: 'jane_smith', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password123' }
    ];
    users.forEach(user => userModel.create(user));

    // Create test servers
    const serverModel = new ServerModel(db);
    const servers = [
        { name: 'General', description: 'General discussion', admin_user_id: 1 },
        { name: 'Gaming', description: 'Gaming discussion', admin_user_id: 2 }
    ];
    servers.forEach(server => serverModel.create(server));

    // Create test channels
    const channelModel = new ChannelModel(db);
    const channels = [
        { name: 'general', description: 'General chat', server_id: 1, moderator_user_id: 1 },
        { name: 'introductions', description: 'Introduce yourself', server_id: 1, moderator_user_id: 2 }
    ];
    channels.forEach(channel => channelModel.create(channel));

    // Create test messages
    const messageModel = new MessageModel(db);
    const messages = [
        { content: 'Hello World!', user_id: 1, channel_id: 1 },
        { content: 'Welcome everyone!', user_id: 2, channel_id: 1 }
    ];
    messages.forEach(message => messageModel.create(message));
}

module.exports = seedDatabase;