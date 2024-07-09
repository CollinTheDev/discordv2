document.addEventListener('DOMContentLoaded', () => {
    const servers = {
        "Server 1": ["# general", "# random"],
        "Server 2": ["# announcements", "# updates"],
        "Server 3": ["# lounge", "# gaming"]
    };

    const serverList = document.getElementById('server-list');
    const channelList = document.getElementById('channel-list');
    const channelName = document.getElementById('channel-name');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    function displayServers() {
        for (const [serverName, channels] of Object.entries(servers)) {
            const serverButton = document.createElement('div');
            serverButton.className = 'server';
            serverButton.textContent = serverName;
            serverButton.onclick = () => showChannels(serverName, channels);
            serverList.appendChild(serverButton);
        }
    }

    function showChannels(serverName, channels) {
        channelList.innerHTML = ''; // Clear previous channels
        channelName.textContent = `Channels for ${serverName}`;
        channelList.style.display = 'block'; // Show the channel list

        channels.forEach(channel => {
            const channelButton = document.createElement('div');
            channelButton.className = 'channel';
            channelButton.textContent = channel;
            channelButton.onclick = () => loadMessages(channel);
            channelList.appendChild(channelButton);
        });
    }

    function loadMessages(channel) {
        chatMessages.innerHTML = ''; // Clear previous messages
        channelName.textContent = channel;

        // For demo purposes, simulate loading messages
        const messages = [
            "Hello there!",
            "Welcome to the channel.",
            "Feel free to chat!"
        ];

        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
        });
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
            messageInput.value = ''; // Clear input field
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
        }
    }

    // Add event listener to the send button
    sendButton.addEventListener('click', sendMessage);

    // Optionally, add event listener for Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if inside a form
            sendMessage();
        }
    });

    // Initialize server list on page load
    displayServers();

    // Dummy user info for demonstration
    document.getElementById('user-info').textContent = "User: ExampleUser";
});
