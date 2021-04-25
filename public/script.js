var socket = io('/')
var messages = document.querySelector('#msgList');
var form = document.querySelector("#msgForm")
var input = document.querySelector('#msgInput');
var username = document.querySelector('#msgName');

$(document).ready(function () {
    $("#filterMessages").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#msgList li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

var item = document.createElement('li')
item.innerHTML = `Welcome to Lunar.<br> The chat app of the future`;
item.classList.add("list-group-item")
item.classList.add("text-primary")
messages.appendChild(item);
document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (username.value) {
        if (input.value && username.value) {
            var d = new Date();
            socket.emit('message', username.value, input.value, ``);
            input.value = '';
        }
    } else {
        var item = document.createElement('li')
        item.textContent = `Please add a name before chatting`;
        item.classList.add("list-group-item")
        item.classList.add("text-danger")
        messages.appendChild(item);
        document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight
    }
});
socket.on('message', (usr, msg, time) => {
    var item = document.createElement('li')
    item.innerText = `${usr}: ${msg}`;
    item.classList.add("list-group-item")
    var item2 = document.createElement("small")
    if (new Date().getMinutes() > 9) {
        item2.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`
    } else {
        item2.innerHTML = `${new Date().getHours()}:0${new Date().getMinutes()}`
    }
    item2.classList.add("text-muted")
    item2.classList.add("ml-2")
    item.appendChild(item2)
    messages.appendChild(item);
    document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight
});


var checkTheme = () => {
    if (sessionStorage.getItem("theme") == "dark") {
        $("body").addClass("bootstrap-dark")
    } else if (sessionStorage.getItem("theme") == "light") {
        $("body").addClass("bootstrap")
    } else {
        sessionStorage.setItem("theme", "dark")
        checkTheme()
    }
}

checkTheme()

var switchTheme = () => {
    if ($("body").hasClass("bootstrap-dark") && sessionStorage.getItem("theme") == "dark") {
        sessionStorage.setItem("theme", "light")
        $("body").removeClass("bootstrap-dark").addClass("bootstrap")
    } else if ($("body").hasClass("bootstrap") && sessionStorage.getItem("theme") == "light") {
        sessionStorage.setItem("theme", "dark")
        $("body").removeClass("bootstrap").addClass("bootstrap-dark")
    } else {
        sessionStorage.setItem("theme", "dark")
        switchTheme()
    }
}