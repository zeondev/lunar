var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var emojisData = require("./compiler/out/emojisData")

const urlRegex = /(?<=\s|^)((https?:)?\/\/)?(www\.)?[-a-zA-Z0-9:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)(?=\s|$)/g
const urlNewDomainRegex = /(https?:)?\/\//g

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("Home", {})
})

app.get("/app", (req, res) => {
    res.render("App", {})
})

app.get("/store", (req, res) => {
    res.render("PluginStore", {})
})

io.on('connection', (socket) => {
    socket.on('message', (usr, msg) => {
        if (typeof usr !== "string" || typeof msg !== "string") {
            return
        }
        if (msg.trim() === "" || usr.trim() === "") {
            return
        }
        msg = emojifyMessage(urlifyMessage(removeHtml(msg)))

        io.emit('message', usr, msg);
        var commands = "!help, !creator, !git, !bug"
        if (msg == "!hi") {
            io.emit("message", "LunarBot", `Hello, ${usr}!`)
        } else if (msg == "!creator") {
            io.emit("message", "LunarBot", "The creator of Lunar is Lap")
        } else if (msg == "!help") {
            io.emit("message", "LunarBot", `My current commands are: ${commands}`)
        } else if (msg == "!git") {
            io.emit("message", "LunarBot", `<a href="https://github.com/zeondev/lunar" target="blank">https://github.com/zeondev/lunar</a>`)
        } else if (msg == "!bug") {
            io.emit("message", "LunarBot", `<a href="https://github.com/zeondev/lunar/issues" target="blank">https://github.com/zeondev/lunar/issues</a>`)
        }
    });
});

var emojifyMessage = (message) => {
    for (var i = 0; i < emojisData.length; i++) {
        message = message.replace(new RegExp(emojisData[i].regex, "g"), emojisData[i].emoji)
    }
    return message
}

var urlifyMessage = (message) => {
    return message.replace(urlRegex, (url) => {
        var displayUrl = url
        if (!urlNewDomainRegex.test(url)) {
            url = "//" + url
        }
        return '<a href="' + url + '" target="blank">' + displayUrl + '</a>'
    })
}

var removeHtml = (text) => {
    return text.replace(/>/g, "&gt;").replace(/</g, "&lt;")
}



server.listen(port, () => {
    console.log('Server listening at port %d', port);
});