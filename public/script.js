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