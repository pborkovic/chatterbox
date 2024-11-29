# Chatterbox - Discord-like Chat Application

A simple chat application built with Node.js, Express, and SQLite, featuring a Discord-inspired UI. This project demonstrates a basic implementation of real-time messaging, server management, and channel organization.

## 🚀 Features

- Server creation and management
- Channel organization within servers
- Real-time messaging
- Discord-inspired UI
- SQLite database for data persistence
- RESTful API architecture

## 🛠️ Technology Stack

- **Backend:**
    - Node.js
    - Express.js
    - SQLite (better-sqlite3)
    - REST API

- **Frontend:**
    - Vanilla JavaScript
    - HTML5
    - CSS3

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chatterbox.git
cd chatterbox
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database and seed data:
```bash
node src/database/seeder.js
```

4. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3456`

## 📁 Project Structure

```
chatterbox/
├── node_modules/
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles/
│       └── main.css
├── src/
│   ├── database/
│   │   ├── db.js
│   │   └── seeder.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── servers.js
│   │   ├── channels.js
│   │   └── messages.js
│   └── utils/
│       └── validation.js
├── package.json
└── server.js
```

## 🔌 API Endpoints

### Users
- `GET /user` - Get all users
- `POST /user` - Create new user
- `GET /user/:userId` - Get specific user

### Servers
- `GET /server` - Get all servers
- `POST /server` - Create new server
- `GET /server/:serverId` - Get specific server

### Channels
- `GET /server/:serverId/channel` - Get all channels in server
- `POST /server/:serverId/channel` - Create new channel
- `GET /server/:serverId/channel/:channelId` - Get specific channel

### Messages
- `GET /server/:serverId/channel/:channelId/message` - Get messages in channel
- `POST /server/:serverId/channel/:channelId/message` - Create new message


## 🧪 Testing

You can test the API endpoints using the provided testing script using the npm command:

```bash
  npm test
```

For more test commands, see `curls.md` in the project root.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

- Philipp Borkovic
