document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    
    if (messageText !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = messageText;
        messageElement.className = 'message';
        document.getElementById('chat-messages').appendChild(messageElement);
        messageInput.value = '';
        messageInput.focus();
    }
}
