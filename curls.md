# Chatterbox API Curl Commands

## Users

### Get all users
```bash
curl -X GET http://localhost:3456/user
```

### Create new user
```bash
curl -X POST http://localhost:3456/user \
-H "Content-Type: application/json" \
-d '{
    "login": "testuser123",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "SecurePass123"
}'
```

### Get specific user
```bash
curl -X GET http://localhost:3456/user/1
```

## Servers

### Get all servers
```bash
curl -X GET http://localhost:3456/server
```

### Create new server
```bash
curl -X POST http://localhost:3456/server \
-H "Content-Type: application/json" \
-d '{
    "name": "Test Server",
    "description": "A test server",
    "admin_user_id": 1
}'
```

### Get specific server
```bash
curl -X GET http://localhost:3456/server/1
```

## Channels

### Get all channels in a server
```bash
curl -X GET http://localhost:3456/server/1/channel
```

### Create new channel
```bash
curl -X POST http://localhost:3456/server/1/channel \
-H "Content-Type: application/json" \
-d '{
    "name": "test-channel",
    "description": "A test channel",
    "moderator_user_id": 1
}'
```

### Get specific channel
```bash
curl -X GET http://localhost:3456/server/1/channel/1
```

## Messages

### Get messages in a channel
```bash
curl -X GET http://localhost:3456/server/1/channel/1/message
```

### Get limited number of messages
```bash
curl -X GET "http://localhost:3456/server/1/channel/1/message?count=5"
```

### Create new message
```bash
curl -X POST http://localhost:3456/server/1/channel/1/message \
-H "Content-Type: application/json" \
-d '{
    "user_id": 1,
    "message": "This is a test message"
}'
```

## Testing Flow Example

Here's a typical sequence of commands to test the full functionality:

1. Create a user:
```bash
curl -X POST http://localhost:3456/user \
-H "Content-Type: application/json" \
-d '{
    "login": "testuser",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "Password123"
}'
```

2. Create a server:
```bash
curl -X POST http://localhost:3456/server \
-H "Content-Type: application/json" \
-d '{
    "name": "My Server",
    "description": "A new server",
    "admin_user_id": 1
}'
```

3. Create a channel:
```bash
curl -X POST http://localhost:3456/server/1/channel \
-H "Content-Type: application/json" \
-d '{
    "name": "general",
    "description": "General discussion",
    "moderator_user_id": 1
}'
```

4. Send a message:
```bash
curl -X POST http://localhost:3456/server/1/channel/1/message \
-H "Content-Type: application/json" \
-d '{
    "user_id": 1,
    "message": "Hello, World!"
}'
```

5. Verify the message:
```bash
curl -X GET http://localhost:3456/server/1/channel/1/message
```