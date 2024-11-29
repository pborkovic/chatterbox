const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3456';

async function testEndpoint(method, endpoint, data = null, description) {
    console.log(`\n=== Testing: ${description} ===`);
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const json = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(json, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function runTests() {
    // Test Users
    await testEndpoint('GET', '/user', null, 'Get all users');
    await testEndpoint('POST', '/user', {
        login: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Password123'
    }, 'Create new user');
    await testEndpoint('GET', '/user/1', null, 'Get user by ID');

    // Test Servers
    await testEndpoint('GET', '/server', null, 'Get all servers');
    await testEndpoint('POST', '/server', {
        name: 'Test Server',
        description: 'A test server',
        admin_user_id: 1
    }, 'Create new server');
    await testEndpoint('GET', '/server/1', null, 'Get server by ID');

    // Test Channels
    await testEndpoint('GET', '/server/1/channel', null, 'Get all channels');
    await testEndpoint('POST', '/server/1/channel', {
        name: 'test-channel',
        description: 'A test channel',
        moderator_user_id: 1
    }, 'Create new channel');
    await testEndpoint('GET', '/server/1/channel/1', null, 'Get channel by ID');

    // Test Messages
    await testEndpoint('GET', '/server/1/channel/1/message', null, 'Get messages');
    await testEndpoint('POST', '/server/1/channel/1/message', {
        user_id: 1,
        message: 'This is a test message'
    }, 'Create new message');
}

console.log('🧪 Starting API tests...');
runTests()
    .then(() => console.log('\n✅ API testing completed!'))
    .catch(error => console.error('\n❌ Testing failed:', error));