// Handle login
document.getElementById('login-button')?.addEventListener('click', loginUser);
document.getElementById('register-button')?.addEventListener('click', registerUser);

// Handle page navigation
document.getElementById('show-register')?.addEventListener('click', () => {
    window.location.href = 'register.html';
});
document.getElementById('show-login')?.addEventListener('click', () => {
    window.location.href = 'login.html';
});

// Handle message sending
document.getElementById('send-button')?.addEventListener('click', sendMessage);
document.getElementById('message-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function registerUser() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (username && password) {
        localStorage.setItem(username, password);
        alert('Registration successful!');
        window.location.href = 'login.html';
    } else {
        alert('Please fill in both fields.');
    }
}

function loginUser() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (localStorage.getItem(username) === password) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'chat.html';
    } else {
        alert('Invalid username or password.');
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    const username = localStorage.getItem('loggedInUser');

    if (messageText !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${username}: ${messageText}`;
        messageElement.className = 'message';
        document.getElementById('chat-messages').appendChild(messageElement);
        messageInput.value = '';
        messageInput.focus();
    }
}

// Display user info on chat page
if (document.getElementById('user-info')) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('user-info').textContent = `Logged in as ${loggedInUser}`;
    } else {
        window.location.href = 'login.html';
    }
}
