// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, where('serverId', '==', serverId), orderBy('timestamp'));

        onSnapshot(q, (querySnapshot) => {
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
                await addDoc(collection(db, 'messages'), {
                    serverId: currentServerId,
                    text: message,
                    timestamp: new Date()
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
