var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var server = app.listen(port);

//the server will serve the connected clients the contents of /public
app.use(express.static('public'), (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

console.log("Server is running.")

var socket = require('socket.io');
var io = socket(server);
var connections = new Set();

//handling events
io.sockets.on('connection', (socket) => {
    var id = socket.id;
    console.log('New client connection: ' + id);
    connections.add(socket);

    //handles disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected. ' + id);
        connections.delete(socket);
    });

    //handling chat event with accompanying message data
    socket.on('chat', (data) => {
        //broadcasting data to every other client
        socket.broadcast.emit('chat', data);
    });
});