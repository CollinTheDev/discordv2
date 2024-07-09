// script.js

// Handle user registration
function registerUser() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (username && email && password) {
        // Simulate user registration
        localStorage.setItem('username', username);
        window.location.href = 'chat.html';
    } else {
        alert('Please fill out all fields.');
    }
}

// Handle user login
function loginUser() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (email && password) {
        // Simulate user login
        window.location.href = 'chat.html';
    } else {
        alert('Please fill out all fields.');
    }
}

// Display server and channel list
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

// Send message and display it in chat
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        const username = localStorage.getItem('username') || 'Unknown User';
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${username}: ${message}`;
        chatMessages.appendChild(messageDiv);
        messageInput.value = ''; // Clear input field
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }
}

// On page load, set the username in the chat
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').textContent = username;
    }
});
