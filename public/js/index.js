document.addEventListener('DOMContentLoaded', function() {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Sample data
    const mockMessages = [
        {
            id: 1,
            username: 'John Doe',
            timestamp: '2:30 PM',
            content: 'Hello everyone! 👋',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 2,
            username: 'Jane Smith',
            timestamp: '2:31 PM',
            content: 'Hey John! Welcome to the server!',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 3,
            username: 'Alice Johnson',
            timestamp: '2:35 PM',
            content: 'How is everyone doing today?',
            avatar: '/api/placeholder/40/40'
        }
    ];

    // Render initial messages
    function renderMessages() {
        messagesContainer.innerHTML = mockMessages.map(msg => `
            <div class="message">
                <div class="avatar">
                    <img src="${msg.avatar}" alt="${msg.username}">
                </div>
                <div class="content">
                    <div class="header">
                        <span class="username">${msg.username}</span>
                        <span class="timestamp">${msg.timestamp}</span>
                    </div>
                    <div class="text">${msg.content}</div>
                </div>
            </div>
        `).join('');

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send message function
    function sendMessage() {
        const content = messageInput.value.trim();
        if (!content) return;

        // Add new message
        mockMessages.push({
            id: mockMessages.length + 1,
            username: 'You',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: content,
            avatar: '/api/placeholder/40/40'
        });

        // Clear input
        messageInput.value = '';

        // Re-render messages
        renderMessages();
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Server selection
    document.querySelectorAll('.server').forEach(server => {
        server.addEventListener('click', () => {
            document.querySelector('.server.active').classList.remove('active');
            server.classList.add('active');
        });
    });

    // Channel selection
    document.querySelectorAll('.channel').forEach(channel => {
        channel.addEventListener('click', () => {
            document.querySelector('.channel.active').classList.remove('active');
            channel.classList.add('active');
        });
    });

    // Initial render
    renderMessages();
});