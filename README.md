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
├── src/
│   ├── controllers/
│   │   ├── ChannelController.js
│   │   ├── MessageController.js
│   │   ├── ServerController.js
│   │   └── UserController.js
│   ├── database/
│   │   ├── db.js
│   │   └── seeders.js
│   ├── middleware/
│   │   ├── pagination.js
│   │   └── validators.js
│   ├── models/
│   │   ├── ChannelModel.js
│   │   ├── MessageModel.js
│   │   ├── ServerModel.js
│   │   └── UserModel.js
│   └── routes/
│       ├── channelRoutes.js
│       ├── messageRoutes.js
│       ├── serverRoutes.js
│       └── userRoutes.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── index.js
├── package.json
├── server.js
└── README.md
```

## 🔌 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get user by ID
- `POST /api/users` - Create new user

### Servers
- `GET /api/servers` - Get all servers
- `GET /api/servers/:serverId` - Get server by ID
- `POST /api/servers` - Create new server

### Channels
- `GET /api/servers/:serverId/channels` - Get all channels in server
- `GET /api/servers/:serverId/channels/:channelId` - Get channel by ID
- `POST /api/servers/:serverId/channels` - Create new channel

### Messages
- `GET /api/channels/:channelId/messages` - Get messages in channel
- `GET /api/channels/:channelId/messages/:messageId` - Get message by ID
- `POST /api/channels/:channelId/messages` - Create new message

## 💾 Database Schema

```sql
users
- id (INTEGER PRIMARY KEY)
- login (VARCHAR)
- firstName (VARCHAR)
- lastName (VARCHAR)
- email (VARCHAR)
- password (VARCHAR)

servers
- id (INTEGER PRIMARY KEY)
- name (VARCHAR)
- description (TEXT)
- admin_user_id (INTEGER FK)

channels
- id (INTEGER PRIMARY KEY)
- name (VARCHAR)
- description (TEXT)
- server_id (INTEGER FK)
- moderator_user_id (INTEGER FK)

messages
- id (INTEGER PRIMARY KEY)
- timestamp (REAL)
- user_id (INTEGER FK)
- channel_id (INTEGER FK)
- message (TEXT)
```

## 🧪 Testing

You can test the API endpoints using the provided testing script:

```bash
npm test
```

For manual API testing, a Postman collection is included in the repository.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

- Philipp Borkovic