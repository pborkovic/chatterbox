// Global state
let currentServer = null;
let currentChannel = null;
let currentUser = null; // Will be used when we add authentication
let messageUpdateInterval = null;

// Utility functions
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

const setLoading = (elementId, isLoading) => {
    const element = document.getElementById(elementId);
    if (isLoading) {
        element.classList.add('loading');
    } else {
        element.classList.remove('loading');
    }
};

const showError = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fade-in';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
};

// Server functions
async function loadServers() {
    try {
        setLoading('serverList', true);
        const response = await fetch('/server');
        const data = await response.json();
        const serverList = document.getElementById('serverList');
        serverList.innerHTML = '';

        for (const server of data.servers) {
            const serverDetails = await fetch(`/server/${server.id}`).then(r => r.json());
            const serverIcon = createServerIcon(server.id, serverDetails);
            serverList.appendChild(serverIcon);
        }

        // Load first server by default
        if (data.servers.length > 0) {
            loadChannels(data.servers[0].id);
        }
    } catch (error) {
        console.error('Error loading servers:', error);
        showError('Failed to load servers');
    } finally {
        setLoading('serverList', false);
    }
}

function createServerIcon(serverId, serverDetails) {
    const serverIcon = document.createElement('div');
    serverIcon.className = 'server-icon';
    serverIcon.textContent = serverDetails.name[0].toUpperCase();
    serverIcon.title = serverDetails.name;
    serverIcon.onclick = () => {
        document.querySelectorAll('.server-icon').forEach(icon => icon.classList.remove('active'));
        serverIcon.classList.add('active');
        loadChannels(serverId);
    };
    return serverIcon;
}

// Channel functions
async function loadChannels(serverId) {
    try {
        currentServer = serverId;
        setLoading('channelList', true);

        const serverDetails = await fetch(`/server/${serverId}`).then(r => r.json());
        const channelResponse = await fetch(`/server/${serverId}/channel`);
        const channelData = await channelResponse.json();

        document.getElementById('serverHeader').textContent = serverDetails.name;
        const channelList = document.getElementById('channelList');
        channelList.innerHTML = '';

        for (const channel of channelData.channels) {
            const channelDetails = await fetch(`/server/${serverId}/channel/${channel.id}`).then(r => r.json());
            const channelItem = createChannelItem(serverId, channel.id, channelDetails);
            channelList.appendChild(channelItem);
        }

        // Load first channel by default
        if (channelData.channels.length > 0) {
            loadMessages(serverId, channelData.channels[0].id);
        }
    } catch (error) {
        console.error('Error loading channels:', error);
        showError('Failed to load channels');
    } finally {
        setLoading('channelList', false);
    }
}

function createChannelItem(serverId, channelId, channelDetails) {
    const channelItem = document.createElement('div');
    channelItem.className = 'channel-item';
    channelItem.textContent = channelDetails.name;
    channelItem.onclick = () => {
        document.querySelectorAll('.channel-item').forEach(item => item.classList.remove('active'));
        channelItem.classList.add('active');
        loadMessages(serverId, channelId);
    };
    return channelItem;
}

// Message functions
async function loadMessages(serverId, channelId) {
    try {
        currentChannel = channelId;
        setLoading('messageList', true);

        const channelDetails = await fetch(`/server/${serverId}/channel/${channelId}`).then(r => r.json());
        const messageResponse = await fetch(`/server/${serverId}/channel/${channelId}/message?count=50`);
        const messageData = await messageResponse.json();

        document.getElementById('channelHeader').textContent = `# ${channelDetails.name}`;
        const messageList = document.getElementById('messageList');

        // Keep the message form if it exists
        const messageForm = messageList.querySelector('.message-form-container');
        messageList.innerHTML = '';
        if (messageForm) messageList.appendChild(messageForm);

        // Create message form if it doesn't exist
        if (!document.getElementById('messageForm')) {
            createMessageForm(messageList);
        }

        // Add messages in reverse chronological order
        for (const message of messageData.messages.reverse()) {
            const messageElement = await createMessageElement(message);
            messageList.insertBefore(messageElement, messageList.firstChild);
        }

        // Setup periodic message updates
        if (messageUpdateInterval) clearInterval(messageUpdateInterval);
        messageUpdateInterval = setInterval(() => updateMessages(serverId, channelId), 5000);

    } catch (error) {
        console.error('Error loading messages:', error);
        showError('Failed to load messages');
    } finally {
        setLoading('messageList', false);
    }
}

async function createMessageElement(message) {
    const userDetails = await fetch(`/user/${message.user_id}`).then(r => r.json());
    const messageElement = document.createElement('div');
    messageElement.className = 'message fade-in';
    messageElement.innerHTML = `
        <strong>${userDetails.login}</strong>
        <span class="timestamp">${formatTimestamp(message.timestamp)}</span>
        <div class="content">${message.message}</div>
    `;
    return messageElement;
}

async function updateMessages(serverId, channelId) {
    if (currentChannel !== channelId) return;

    try {
        const messageResponse = await fetch(`/server/${serverId}/channel/${channelId}/message?count=50`);
        const messageData = await messageResponse.json();
        const messageList = document.getElementById('messageList');
        const existingMessageIds = new Set(Array.from(messageList.children)
            .filter(el => el.classList.contains('message'))
            .map(el => el.dataset.messageId));

        for (const message of messageData.messages) {
            if (!existingMessageIds.has(message.id)) {
                const messageElement = await createMessageElement(message);
                messageList.insertBefore(messageElement, messageList.firstChild);
            }
        }
    } catch (error) {
        console.error('Error updating messages:', error);
    }
}

function createMessageForm(container) {
    const formContainer = document.createElement('div');
    formContainer.className = 'message-form-container';
    formContainer.innerHTML = `
        <form id="messageForm" class="message-form">
            <input 
                type="text" 
                id="messageInput" 
                placeholder="Send a message..." 
                autocomplete="off"
                required
            >
            <button type="submit">Send</button>
        </form>
    `;
    container.appendChild(formContainer);

    // Add event listener for form submission
    document.getElementById('messageForm').addEventListener('submit', sendMessage);
}

async function sendMessage(event) {
    event.preventDefault();

    if (!currentChannel) {
        showError('Please select a channel first');
        return;
    }

    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) return;

    try {
        const response = await fetch(`/server/${currentServer}/channel/${currentChannel}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: 1, // Hardcoded for now, should come from authentication
                message: message
            })
        });

        if (!response.ok) throw new Error('Failed to send message');

        // Clear input and load latest messages
        messageInput.value = '';
        await loadMessages(currentServer, currentChannel);
    } catch (error) {
        console.error('Error sending message:', error);
        showError('Failed to send message');
    }
}

// Event listeners
window.addEventListener('load', () => {
    loadServers();

    // Handle enter key in message input
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && document.activeElement.id === 'messageInput') {
            e.preventDefault();
            document.getElementById('messageForm').dispatchEvent(new Event('submit'));
        }
    });
});

// Cleanup on page unload
window.addEventListener('unload', () => {
    if (messageUpdateInterval) {
        clearInterval(messageUpdateInterval);
    }
});