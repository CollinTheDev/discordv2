// Function to register a new user
function register() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;

    if (username && password) {
        localStorage.setItem('username', username);
        alert('User registered successfully.');
        window.location.href = 'login.html';
    } else {
        alert('Please enter a valid username and password.');
    }
}

// Function to login a user
function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (username && password) {
        const storedUsername = localStorage.getItem('username');

        if (username === storedUsername) {
            alert('Login successful.');
            window.location.href = 'chat.html';
        } else {
            alert('Invalid username or password.');
        }
    } else {
        alert('Please enter a valid username and password.');
    }
}

// Function to show the selected settings section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.settings-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Function to update account settings
function updateAccountSettings() {
    const newUsername = document.getElementById('new-username').value.trim();
    const newPassword = document.getElementById('new-password').value;

    if (newUsername) {
        localStorage.setItem('username', newUsername);
        alert('Username updated successfully.');
    }

    if (newPassword) {
        // Here you would handle updating the password
        alert('Password updated successfully.');
    }
}

// Function to update profile settings
function updateProfileSettings() {
    const profilePicture = document.getElementById('profile-picture').files[0];
    const bio = document.getElementById('bio').value.trim();

    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('profilePicture', e.target.result);
            document.getElementById('profile-picture-preview').src = e.target.result;
        };
        reader.readAsDataURL(profilePicture);
    }

    if (bio) {
        localStorage.setItem('bio', bio);
        document.getElementById('bio-preview').textContent = bio;
    }

    alert('Profile updated successfully.');
}

// Function to send a message
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (message) {
        const chatMessages = document.getElementById('chat-messages');
        const username = localStorage.getItem('username');
        const newMessage = document.createElement('div');
        newMessage.textContent = `${username}: ${message}`;
        chatMessages.appendChild(newMessage);
        input.value = '';

        // Save messages to localStorage
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(newMessage.textContent);
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
    showSection('account-settings');

    // Load stored messages
    const chatMessages = document.getElementById('chat-messages');
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.forEach(message => {
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        chatMessages.appendChild(newMessage);
    });

    // Display username
    const usernameDisplay = document.getElementById('username-display');
    const username = localStorage.getItem('username');
    if (usernameDisplay && username) {
        usernameDisplay.textContent = `Logged in as: ${username}`;
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
