document.getElementById('login-button').addEventListener('click', loginUser);
document.getElementById('register-button').addEventListener('click', registerUser);
document.getElementById('show-register').addEventListener('click', showRegisterForm);
document.getElementById('show-login').addEventListener('click', showLoginForm);

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function registerUser() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (username && password) {
        localStorage.setItem(username, password);
        alert('Registration successful!');
        showLoginForm();
    } else {
        alert('Please fill in both fields.');
    }
}

function loginUser() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (localStorage.getItem(username) === password) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', username);
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'flex';
        document.getElementById('user-info').textContent = `Logged in as ${username}`;
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
