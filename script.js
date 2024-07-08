document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'chat.html';
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(u => u.username === username);

    if (userExists) {
        alert('Username already exists');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
        window.location.href = 'login.html';
    }
});

if (document.getElementById('user-info')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('user-info').textContent = `Logged in as ${currentUser.username}`;
    } else {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesContainer = document.getElementById('chat-messages');
    messages.forEach(message => {
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        messagesContainer.appendChild(newMessage);
    });
});

document.getElementById('send-button')?.addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    if (message) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));

        const messagesContainer = document.getElementById('chat-messages');
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        messagesContainer.appendChild(newMessage);

        messageInput.value = '';
    }
});
