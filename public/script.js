var socket = io('/')
var messages = document.querySelector('#msgList');
var form = document.querySelector("#msgForm")
var input = document.querySelector('#msgInput');
var username = document.querySelector('#msgNameDisplay');


$(".container-fluid").hide()

if (localStorage.getItem("name")) {
    $(".container-fluid").show()
    $(".addAName").hide()
} else {
    $(".addAName").show()
    $(".container-fluid").hide()
}

function checkUsername() {
    if (localStorage.getItem("name")) {
        $(".container-fluid").show()
        $(".addAName").hide()
    } else {
        $(".addAName").show()
        $(".container-fluid").hide()
    }
}

input.addEventListener("keydown", (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        if (username.value) {
            if (input.value) {
                socket.emit('message', username.value, input.value, ``);
                input.value = '';
            }
        } else {
            var item = document.createElement('li')
            item.textContent = `Please add a name before chatting...`;
            item.classList.add("list-group-item")
            item.id = `-AddAName-`
            item.classList.add("text-danger")
            messages.appendChild(item);
            document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight
        }
    }
    var currentRows = input.value.split("\n").length;
    if (keyCode === 13 && e.shiftKey) {
        currentRows++;
    }
    if (currentRows <= 5) {
        input.rows = currentRows;
    } else {
        input.rows = 5;
    }
})

var searchValue = "";

$(document).ready(function() {

    var WarningMessageConsoleLog1 = "background: red; color: white; font-size: x-large"
    var WarningMessageConsoleLog2 = "color: auto; font-size: large; margin-top: 5px;"
    console.log("%cHold up!\n%cDo not paste or enter anything in here. If someone has told you to paste something here, they may be trying to scam or hack you.\nIf you do know what you're doing, you can contribute to this project at https://github.com/zeondev/lunar/", WarningMessageConsoleLog1, WarningMessageConsoleLog2);

    $("#filterMessages").on("keyup", function() {
        searchValue = $(this).val().toLowerCase();
        $("#msgList li").filter(function() {
            var messageContentElement = this.querySelector("#messageContent")
            $(this).toggle($(messageContentElement).text().toLowerCase().indexOf(searchValue) > -1)
        });
        document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight
    });
});

var item = document.createElement('li')
item.innerHTML = `Welcome to Lunar, the chat app of the future.`;
item.classList.add("list-group-item")
item.classList.add("text-primary")
item.id = `-welcometext-`
messages.appendChild(item);
document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight

socket.on('message', (usr, msg) => {
    var message = document.createElement('li')
    message.classList.add("list-group-item")
    message.id = `-${msg}-`

    var messageUsername = document.createElement('span')
    messageUsername.id = "messageUsername"
    messageUsername.innerText = usr
    message.appendChild(messageUsername)

    var messageColon = document.createElement('span')
    messageColon.id = "messageColon"
    messageColon.innerText = ": "
    message.appendChild(messageColon)

    var messageContent = document.createElement('span')
    messageContent.id = "messageContent"
    messageContent.innerHTML = msg.replaceAll("\n", "<br>")
    message.appendChild(messageContent)

    var messageTimeStamp = document.createElement("small")
    if (new Date().getMinutes() > 9) {
        messageTimeStamp.innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`
    } else {
        messageTimeStamp.innerHTML = `${new Date().getHours()}:0${new Date().getMinutes()}`
    }
    messageTimeStamp.classList.add("text-muted")
    messageTimeStamp.classList.add("ml-1")
    message.appendChild(messageTimeStamp)

    $(message).toggle($(messageContent).text().toLowerCase().indexOf(searchValue) > -1)
    messages.appendChild(message);
    document.querySelector("#scrollArea").scrollTop = document.querySelector("#scrollArea").scrollHeight
    twemoji.parse(document.body);
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
    item.id = `-${text}-`
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
                console.log("Error: The extension was not found.")
            } else if (request.responseText !== "") {
                var psi = document.querySelector("#pluginsScriptsInserted")
                var script = document.createElement('script')

                window.addEventListener("error", (error) => {
                    if (extensions.includes(error.filename)) {
                        error.preventDefault();
                        // extension code error
                        // display it 
                        console.log("Error: " + error.message)
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
                console.log("Error: The plugin could not be loaded!")
            }
        }
    }
}