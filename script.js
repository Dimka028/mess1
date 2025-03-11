const socket = new WebSocket('ws://localhost:3000');

socket.onmessage = function(event) {
    const messagesDiv = document.getElementById('messages');
    const message = event.data;

    // Проверка, является ли сообщение аудиофайлом
    if (message.startsWith('data:audio/')) {
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = message;
        messagesDiv.appendChild(audioElement);
    } else {
        messagesDiv.innerHTML += `<div>${message}</div>`;
    }
};

// Отправка текстового сообщения
document.getElementById('send-button').onclick = function() {
    const messageInput = document.getElementById('message-input');
    socket.send(messageInput.value);
    messageInput.value = '';
};

// Запись голосового сообщения
let mediaRecorder;
let audioChunks = [];

document.getElementById('record-button').onclick = async function() {
    const stream = await navigator.mediaDevices.getUser Media({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function(event) {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = function() {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        socket.send(audioUrl); // Отправляем аудиофайл
        audioChunks = [];
    };

    mediaRecorder.start();
    setTimeout(() => {
        mediaRecorder.stop(); // Останавливаем запись через 5 секунд
    }, 5000);
};

Найти еще
