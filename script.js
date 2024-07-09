function registerUser() {
    // Simulate user registration
    window.location.href = 'chat.html';
}

function loginUser() {
    // Simulate user login
    window.location.href = 'chat.html';
}

function selectServer(serverName) {
    document.getElementById('channel-list').innerHTML = `
        <h2>Channels</h2>
        <ul>
            <li onclick="selectChannel('${serverName}', 'Channel1')">Channel 1</li>
            <li onclick="selectChannel('${serverName}', 'Channel2')">Channel 2</li>
        </ul>
    `;
}

function selectChannel(serverName, channelName) {
    document.getElementById('channel-name').textContent = `${serverName} - ${channelName}`;
    document.getElementById('chat-messages').innerHTML = ''; // Clear previous messages
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        messageInput.value = ''; // Clear input field
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }
}
