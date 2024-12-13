# Chatterbox API Curl Commands

## Users

### Get all users
```bash
curl -X GET http://localhost:3456/api/users
```

### Create new user
```bash
curl -X POST http://localhost:3456/api/users \
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
curl -X GET http://localhost:3456/api/users/1
```

## Servers

### Get all servers
```bash
curl -X GET http://localhost:3456/api/servers
```

### Create new server
```bash
curl -X POST http://localhost:3456/api/servers \
-H "Content-Type: application/json" \
-d '{
    "name": "Test Server",
    "description": "A test server",
    "admin_user_id": 1
}'
```

### Get specific server
```bash
curl -X GET http://localhost:3456/api/servers/1
```

## Channels

### Get all channels in a server
```bash
curl -X GET http://localhost:3456/api/servers/1/channels
```

### Create new channel
```bash
curl -X POST http://localhost:3456/api/servers/1/channels \
-H "Content-Type: application/json" \
-d '{
    "name": "test-channel",
    "description": "A test channel",
    "moderator_user_id": 1
}'
```

### Get specific channel
```bash
curl -X GET http://localhost:3456/api/servers/1/channels/1
```

## Messages

### Get messages in a channel
```bash
curl -X GET http://localhost:3456/api/channels/1/messages
```

### Get limited number of messages
```bash
curl -X GET "http://localhost:3456/api/channels/1/messages?count=5"
```

### Create new message
```bash
curl -X POST http://localhost:3456/api/channels/1/messages \
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
curl -X POST http://localhost:3456/api/users \
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
curl -X POST http://localhost:3456/api/servers \
-H "Content-Type: application/json" \
-d '{
    "name": "My Server",
    "description": "A new server",
    "admin_user_id": 1
}'
```

3. Create a channel:
```bash
curl -X POST http://localhost:3456/api/servers/1/channels \
-H "Content-Type: application/json" \
-d '{
    "name": "general",
    "description": "General discussion",
    "moderator_user_id": 1
}'
```

4. Send a message:
```bash
curl -X POST http://localhost:3456/api/channels/1/messages \
-H "Content-Type: application/json" \
-d '{
    "user_id": 1,
    "message": "Hello, World!"
}'
```

5. Verify the message:
```bash
curl -X GET http://localhost:3456/api/channels/1/messages
```