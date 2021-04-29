var socket = io('/')
var messages = document.querySelector('#msgList');
var form = document.querySelector("#msgForm")
var input = document.querySelector('#msgInput');
var username = document.querySelector('#msgName');

$(document).ready(function() {
    $("#filterMessages").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#msgList li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight
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
        if (input.value) {
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
    if (localStorage.getItem("theme") == "dark") {
        $("body").addClass("bootstrap-dark")
    } else if (localStorage.getItem("theme") == "light") {
        $("body").addClass("bootstrap")
    } else {
        localStorage.setItem("theme", "dark")
        checkTheme()
    }
}

checkTheme()

var switchTheme = () => {
    if ($("body").hasClass("bootstrap-dark") && localStorage.getItem("theme") == "dark") {
        localStorage.setItem("theme", "light")
        $("body").removeClass("bootstrap-dark").addClass("bootstrap")
    } else if ($("body").hasClass("bootstrap") && localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark")
        $("body").removeClass("bootstrap").addClass("bootstrap-dark")
    } else {
        localStorage.setItem("theme", "dark")
        switchTheme()
    }
}

var addLocalMessage = (text, classcolor) => {
    var item = document.createElement('li')
    item.innerHTML = `${text}`;
    item.classList.add("list-group-item")
    item.classList.add(`${classcolor}`)
    messages.appendChild(item);
    document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight
}
var extensions = [];
var extensionAdd = () => {

    var request = new window.XMLHttpRequest();
    var extension = `${$("#addExtensionInput").val()}`;

    request.open('GET', extension)

    request.send()

    request.onreadystatechange = (ev) => {
        if (request.readyState === 4) {
            if (request.status === 404) {
                //error: the extension was not found
                // display the error    
                console.log("error: the extension was not found")
            } else if (request.responseText !== "") {
                var psi = document.querySelector("#pluginsScriptsInserted")
                var script = document.createElement('script')

                window.addEventListener("error", (error) => {
                    if (extensions.includes(error.filename)) {
                        error.preventDefault();
                        // extension code error
                        // display it 
                        console.log("error: " + error.message)
                    }

                })
                script.type = 'text/javascript'
                var code = `try{
${request.responseText};
}
catch(error){
    // write here code that will execute if there is an error in the plugin 
    // error variable is the plugin error
    console.log("plugin error: " + error)
}`
                try {
                    script.appendChild(document.createTextNode(code))


                } catch (error) {
                    script.text = code
                }
                extensions.push(request.responseURL)
                psi.prepend(script)
            } else {
                // error: the plugin could not be loaded
                // display the error
                console.log("error: the plugin could not be loaded")
            }
        }
    }
}
