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
    
    // Dynamically create server buttons
    for (const [serverName, channels] of Object.entries(servers)) {
        const serverButton = document.createElement('div');
        serverButton.className = 'server';
        serverButton.textContent = serverName;
        serverButton.onclick = () => showChannels(serverName, channels);
        serverList.appendChild(serverButton);
    }

    function showChannels(serverName, channels) {
        // Clear previous channels
        channelList.innerHTML = '';
        channelName.textContent = `Select a Channel`;

        // Show the channel list for the selected server
        channelList.style.display = 'block';

        // Dynamically create channel buttons
        channels.forEach(channel => {
            const channelButton = document.createElement('div');
            channelButton.className = 'channel';
            channelButton.textContent = channel;
            channelButton.onclick = () => loadMessages(channel);
            channelList.appendChild(channelButton);
        });
    }

    function loadMessages(channel) {
        // Clear previous messages
        chatMessages.innerHTML = '';
        channelName.textContent = channel;

        // For demo purposes, we use static messages
        const messages = [
            "Hello there!",
            "Welcome to the channel.",
            "Feel free to chat!"
        ];

        // Display messages
        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
        });
    }
    
    // Dummy user info for demonstration
    document.getElementById('user-info').textContent = "User: ExampleUser";
});
