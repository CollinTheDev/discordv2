// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOK2H7XklP-_ng407mj___hy3Fy9InNtk",
  authDomain: "bettercord-e4e7d.firebaseapp.com",
  projectId: "bettercord-e4e7d",
  storageBucket: "bettercord-e4e7d.appspot.com",
  messagingSenderId: "934430756781",
  appId: "1:934430756781:web:faedd45b79251803721b24"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    const serverList = document.getElementById('server-list');
    const channelList = document.getElementById('channel-list');
    const channelName = document.getElementById('channel-name');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const joinServerButton = document.getElementById('join-server-button');
    const serverIdInput = document.getElementById('server-id-input');

    let currentServerId = ''; // Track the current server ID

    function displayServers() {
        // Dummy servers data
        const servers = {
            "Server 1": "server1",
            "Server 2": "server2",
            "Server 3": "server3"
        };

        for (const [serverName, serverId] of Object.entries(servers)) {
            const serverButton = document.createElement('div');
            serverButton.className = 'server';
            serverButton.textContent = serverName;
            serverButton.onclick = () => joinServer(serverId);
            serverList.appendChild(serverButton);
        }
    }

    async function joinServer(serverId) {
        currentServerId = serverId;
        channelList.innerHTML = ''; // Clear previous channels
        channelName.textContent = `Channels for Server ${serverId}`;
        chatMessages.innerHTML = ''; // Clear previous messages

        const messagesRef = db.collection('messages');
        const q = messagesRef.where('serverId', '==', serverId).orderBy('timestamp');

        q.onSnapshot((querySnapshot) => {
            chatMessages.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const message = doc.data();
                const messageDiv = document.createElement('div');
                messageDiv.textContent = message.text;
                chatMessages.appendChild(messageDiv);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
        });
    }

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message && currentServerId) {
            try {
                await db.collection('messages').add({
                    serverId: currentServerId,
                    text: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                messageInput.value = ''; // Clear input field
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        }
    }

    // Add event listener to the send button
    sendButton.addEventListener('click', sendMessage);

    // Add event listener for Enter key
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if inside a form
            sendMessage();
        }
    });

    // Add event listener to join server button
    joinServerButton.addEventListener('click', () => {
        const serverId = serverIdInput.value.trim();
        if (serverId) {
            joinServer(serverId);
        }
    });

    // Initialize server list on page load
    displayServers();

    // Dummy user info for demonstration
    document.getElementById('user-info').textContent = "User: ExampleUser";
});
