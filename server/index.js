var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("App", {})
})

io.on('connection', (socket) => {
    socket.on('message', (usr, msg) => {
        io.emit('message', usr, msg);
        if (msg == "l!hi") {
            io.emit("message", "LunarBot", `Hello, ${usr}!`)
        }
    });
});

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});