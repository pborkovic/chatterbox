const Database = require('better-sqlite3');
const db = new Database('chatterbox.db');

const memeUsers = [
    {
        login: 'dankMemeKing420',
        firstName: 'Chad',
        lastName: 'Thundermeme',
        email: 'danklord@memes.com',
        password: 'password123'
    },
    {
        login: 'SpongeMemer',
        firstName: 'Bob',
        lastName: 'SquareJokes',
        email: 'spongebob@bikinibottom.com',
        password: 'password123'
    },
    {
        login: 'rickRoller',
        firstName: 'Rick',
        lastName: 'Astley',
        email: 'never@gonna.giveyouup',
        password: 'password123'
    },
    {
        login: 'dogeWisdom',
        firstName: 'Much',
        lastName: 'Wow',
        email: 'such@email.wow',
        password: 'password123'
    },
    {
        login: 'harambeForever',
        firstName: 'Rest',
        lastName: 'InPeace',
        email: 'never@forget.harambe',
        password: 'password123'
    }
];

const memeServers = [
    {
        name: '🗿 Meme Lords Paradise',
        description: 'Where memes come to ascend',
        admin_user_id: 1
    },
    {
        name: '💀 Shitposting Central',
        description: 'Quality shitposts only (just kidding, all posts welcome)',
        admin_user_id: 2
    }
];

const memeChannels = [
    {
        name: 'dank-memes',
        description: 'Only the dankest will survive',
        moderator_user_id: 1,
        server_id: 1
    },
    {
        name: 'cursed-images',
        description: 'Enter at your own risk',
        moderator_user_id: 2,
        server_id: 1
    },
    {
        name: 'dad-jokes',
        description: 'Hi hungry, Im dad',
        moderator_user_id: 3,
        server_id: 2
    },
    {
        name: 'wholesome-memes',
        description: 'Because sometimes we need to smile',
        moderator_user_id: 4,
        server_id: 2
    }
];

const memeMessages = [
    "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
    "POV: You're looking at a message in a meme server 👁👄👁",
    "This is fine 🔥🐕🔥",
    "reject humanity, return to monke 🐒",
    "No one: \nAbsolutely no one: \nMe: posting this message",
    "Heard you like old memes, so here's a vintage 'All Your Base Are Belong to Us'",
    "Instructions unclear, got stuck in the washing machine 🧺",
    "They said I could become anything, so I became a message in a database",
    "*Boss music intensifies* 🎮",
    "Is this a pigeon? 🦋",
    "Stonks 📈",
    "Not stonks 📉",
    "Tell me you're a memer without telling me you're a memer",
    "Wait, it's all memes? 👨‍🚀 Always has been 🔫👨‍🚀",
    "POV: You're debugging this seeder file",
    "I don't always seed databases, but when I do, I fill them with memes",
    "One does not simply write a seeder without meme references",
    "Do you know da wae? 🦔",
    "Perfectly balanced, as all things should be 🫰",
    "It ain't much, but it's honest work 👨‍🌾"
];

function seedDatabase() {
    console.log('Starting database seeding');

    const insertUser = db.prepare(`
        INSERT INTO users (login, firstName, lastName, email, password)
        VALUES (:login, :firstName, :lastName, :email, :password)
    `);

    console.log('Seeding users');
    for (const user of memeUsers) {
        try {
            insertUser.run(user);
        } catch (error) {
            console.error(`Failed to insert user ${user.login}:`, error.message);
        }
    }

    const insertServer = db.prepare(`
        INSERT INTO servers (name, description, admin_user_id)
        VALUES (:name, :description, :admin_user_id)
    `);

    console.log('Seeding servers');
    for (const server of memeServers) {
        try {
            insertServer.run(server);
        } catch (error) {
            console.error(`Failed to insert server ${server.name}:`, error.message);
        }
    }

    const insertChannel = db.prepare(`
        INSERT INTO channels (name, description, moderator_user_id, server_id)
        VALUES (:name, :description, :moderator_user_id, :server_id)
    `);

    console.log('Seeding channels...');
    for (const channel of memeChannels) {
        try {
            insertChannel.run(channel);
        } catch (error) {
            console.error(`Failed to insert channel ${channel.name}:`, error.message);
        }
    }

    const insertMessage = db.prepare(`
        INSERT INTO messages (timestamp, user_id, channel_id, message)
        VALUES (:timestamp, :user_id, :channel_id, :message)
    `);

    console.log('Seeding messages');
    for (let i = 0; i < 50; i++) {
        const message = {
            timestamp: Date.now() / 1000 - Math.floor(Math.random() * 86400), // 86bs -> 24 hours
            user_id: Math.floor(Math.random() * memeUsers.length) + 1,
            channel_id: Math.floor(Math.random() * memeChannels.length) + 1,
            message: memeMessages[Math.floor(Math.random() * memeMessages.length)]
        };

        try {
            insertMessage.run(message);
        } catch (error) {
            console.error(`Failed to insert message:`, error.message);
        }
    }

    console.log('Seeding completed!');
}

// Run the seeder
try {
    db.exec('BEGIN');
    seedDatabase();
    db.exec('COMMIT');
    console.log('Database successfully seeded!');
} catch (error) {
    db.exec('ROLLBACK');
    console.error('Seeding failed:', error);
    process.exit(1);
}