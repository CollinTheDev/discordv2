// Function to show the profile popup
function showProfilePopup() {
    const profilePopup = document.getElementById('profile-popup');
    const profilePicture = localStorage.getItem('profilePicture');
    const username = localStorage.getItem('username');
    const bio = localStorage.getItem('bio');

    if (profilePicture) {
        document.getElementById('popup-profile-picture').src = profilePicture;
    }
    if (username) {
        document.getElementById('popup-username').textContent = username;
    }
    if (bio) {
        document.getElementById('popup-bio').textContent = bio;
    }

    profilePopup.classList.remove('hidden');
}

// Function to close the profile popup
function closeProfilePopup() {
    document.getElementById('profile-popup').classList.add('hidden');
}

// Function to send a message
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    const username = localStorage.getItem('username');

    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        const newMessage = document.createElement('div');
        newMessage.innerHTML = `<span class="username" onclick="showProfilePopup()">${username}</span>: ${message}`;
        chatMessages.appendChild(newMessage);
        input.value = '';

        // Save messages to localStorage
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(newMessage.innerHTML);
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}

// Function to change server (currently a placeholder)
function changeServer(serverName) {
    console.log(`Switched to server: ${serverName}`);
}

// Function to change channel and update the channel name
function changeChannel(channelName) {
    console.log(`Switched to channel: ${channelName}`);
    document.getElementById('channel-name').textContent = channelName;
}

// On page load, show the account settings by default
document.addEventListener('DOMContentLoaded', () => {
    // Load stored messages
    const chatMessages = document.getElementById('chat-messages');
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.forEach(message => {
        const newMessage = document.createElement('div');
        newMessage.innerHTML = message;
        chatMessages.appendChild(newMessage);
    });

    // Display username
    const usernameDisplay = document.getElementById('username-display');
    const username = localStorage.getItem('username');
    if (usernameDisplay && username) {
        usernameDisplay.innerHTML = `Logged in as: <span id="user-name">${username}</span>`;
    }

    // Load profile settings
    const profilePicturePreview = document.getElementById('profile-picture-preview');
    const bioPreview = document.getElementById('bio-preview');

    const storedProfilePicture = localStorage.getItem('profilePicture');
    const storedBio = localStorage.getItem('bio');

    if (storedProfilePicture) {
        profilePicturePreview.src = storedProfilePicture;
    }

    if (storedBio) {
        bioPreview.textContent = storedBio;
    }
});
