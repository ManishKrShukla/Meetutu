var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:9000',
    optionsSuccessStatus: 200
}));

app.get('/map-coords', function(req, res) {
    var positions = [
        { coords: { latitude: 12.9046363, longitude: 77.6272 }, teacher: false, name: 'User 1' },
        { coords: { latitude: 12.9257364, longitude: 77.6183 }, teacher: true, name: 'User 2' },
        { coords: { latitude: 12.9368365, longitude: 77.6094 }, teacher: false, name: 'User 3' },
        { coords: { latitude: 12.9179366, longitude: 77.6315 }, teacher: true, name: 'User 4' },
        { coords: { latitude: 12.9481367, longitude: 77.6426 }, teacher: false, name: 'User 5' },
        { coords: { latitude: 12.9592368, longitude: 77.6537 }, teacher: true, name: 'User 6' },
        { coords: { latitude: 12.9613369, longitude: 77.6648 }, teacher: false, name: 'User 7' },
        { coords: { latitude: 12.9724360, longitude: 77.6759 }, teacher: true, name: 'User 8' },
        { coords: { latitude: 12.9835371, longitude: 77.6860 }, teacher: false, name: 'User 9' },
    ];

    res.json(positions);
});

app.get('/', function(req, res) {
    res.send("This server is up and running !. Thanks")
});

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});

var io = require('socket.io')(server);


io.on('connection', function(socket) {

    socket.on('chat', function(userId) {
        console.log("This user joined --> ", userId);
        socket.join(userId);
    });

    socket.on('leave', function(userId) {
        console.log("This user disconnected --> ", userId);
        socket.leave(userId);
    });

    socket.on('message', function(data) {
        console.log("message recieved", data.message);
        io.to(data.id).emit("message", data.message.split("").reverse().join(""));
    });
});