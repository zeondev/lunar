var socket = io('/')
var messages = document.querySelector('#msgList');
var form = document.querySelector("#msgForm")
var input = document.querySelector('#msgInput');
var username = document.querySelector('#msgName');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value && username.value) {
        socket.emit('message', username.value, input.value);
        input.value = '';
    }
});
socket.on('message', (usr, msg) => {
    var item = document.createElement('li');
    item.textContent = `${usr}: ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});