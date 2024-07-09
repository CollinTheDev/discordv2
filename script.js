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

    // Initialize server list on page load
    displayServers();

    // Dummy user info for demonstration
    document.getElementById('user-info').textContent = "User: ExampleUser";
});
