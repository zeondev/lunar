var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("Home", {})
})

app.get("/app", (req, res) => {
    res.render("App", {})
})

io.on('connection', (socket) => {
    socket.on('message', (usr, msg, time) => {
<<<<<<< HEAD
        if (typeof msg !== "string") {
            return
        }
        if (msg.trim() === "" || usr.trim() === "") {
=======
        if(typeof msg !== "string"){
            return
        }
        if(msg.trim() === "" || usr.trim() === ""){
>>>>>>> e92afd49f594a42042a16b5af290c3c4f2863c5d
            return
        }
        io.emit('message', usr, msg, time);
        var commands = {
            "cmds": [{
                "cmd": "!hi"
            }, {
                "cmd": "!creator"
            }]
        }
        console.log(JSON.parse(commands))
        if (msg == "!hi") {
            io.emit("message", "LunarBot", `Hello, ${usr}!`)
        } else if (msg == "!creator") {
            io.emit("message", "LunarBot", "The creator of Lunar is Lap")
        } else if (msg == "!help") {
            io.emit("message", "LunarBot", `My current commands are: ${JSON.parse(commands)}`)
        } else if (msg == "!git") {
            io.emit("message", "LunarBot", "https://github.com/zeondev/lunar")
        } else if (msg == "!bug") {
            io.emit("message", "LunarBot", "https://github.com/zeondev/lunar/issues")
        }
    });
});

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});
