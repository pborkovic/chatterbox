let currentServer = null;
let currentChannel = null;

async function loadServers() {
    const response = await fetch('/server');
    const data = await response.json();
    const serverList = document.getElementById('serverList');

    // Iterate through each server id
    for (const serverId of data.servers) {
        const serverDetails = await fetch(`/server/${serverId}`).then(r => r.json());
        const serverIcon = document.createElement('div');
        serverIcon.className = 'server-icon';
        serverIcon.textContent = serverDetails.name[0];
        serverIcon.onclick = () => loadChannels(serverId);
        serverList.appendChild(serverIcon);
    }

    // If there are any servers, load the channels for the first one
    if (data.servers.length > 0) {
        loadChannels(data.servers[0]);
    }
}

// Function to load and display channels for a selected server
async function loadChannels(serverId) {
    currentServer = serverId;
    const serverDetails = await fetch(`/server/${serverId}`).then(r => r.json());
    const channelResponse = await fetch(`/server/${serverId}/channel`);
    const channelData = await channelResponse.json();

    document.getElementById('serverHeader').textContent = serverDetails.name;
    const channelList = document.getElementById('channelList');
    channelList.innerHTML = '';

    // Iterate through each channel id
    for (const channelId of channelData.channels) {
        const channelDetails = await fetch(`/server/${serverId}/channel/${channelId}`).then(r => r.json());
        const channelItem = document.createElement('div');
        channelItem.className = 'channel-item';
        channelItem.textContent = `# ${channelDetails.name}`;
        channelItem.onclick = () => loadMessages(serverId, channelId);
        channelList.appendChild(channelItem);
    }

    // If there are any channels - load messages for the first one
    if (channelData.channels.length > 0) {
        loadMessages(serverId, channelData.channels[0]);
    }
}

// Function to load and display messages for a selected channel
async function loadMessages(serverId, channelId) {
    currentChannel = channelId;
    const channelDetails = await fetch(`/server/${serverId}/channel/${channelId}`).then(r => r.json());
    const messageResponse = await fetch(`/server/${serverId}/channel/${channelId}/message?count=100`);
    const messageData = await messageResponse.json();

    document.getElementById('channelHeader').textContent = `# ${channelDetails.name}`;
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    // Iterate through each message id
    for (const messageId of messageData.messages) {
        const messageDetails = await fetch(`/server/${serverId}/channel/${channelId}/message/${messageId}`).then(r => r.json());
        const userDetails = await fetch(`/user/${messageDetails.userId}`).then(r => r.json());

        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `
            <strong>${userDetails.login}</strong>
            <span style="color: #72767d; font-size: 0.8em">${new Date(messageDetails.date).toLocaleString()}</span>
            <div>${messageDetails.content}</div>
        `;
        messageList.appendChild(messageElement);
    }
}

window.onload = loadServers;