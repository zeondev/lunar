var socket = io('/')
var messages = document.querySelector('#msgList');
var form = document.querySelector("#msgForm")
var input = document.querySelector('#msgInput');
var username = document.querySelector('#msgName');
var password = document.querySelector("#msgPassword")


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value && username.value) {
        socket.emit('message', username.value, input.value);
        input.value = '';
    }
});
socket.on('message', (usr, msg) => {
    var item = document.createElement('li')
    item.textContent = `${usr}: ${msg}`;
    item.classList.add("list-group-item")
    messages.appendChild(item);
    document.querySelector("#scrollArea").scrollTo(0, document.body.scrollHeight);
});