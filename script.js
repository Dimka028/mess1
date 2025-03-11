const socket = new WebSocket('ws://localhost:3000'); // Убедитесь, что адрес совпадает с вашим сервером

socket.onmessage = function(event) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<div>${event.data}</div>`;
};

document.getElementById('send-button').onclick = function() {
    const messageInput = document.getElementById('message-input');
    socket.send(messageInput.value);
    messageInput.value = '';
};
