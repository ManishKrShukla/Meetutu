var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/map-coords', function(req, res) {
    res.json({ notes: "This is your notebook. Edit this to start saving your notes!" })
})


app.get('/', function(req, res) {
    res.send("This server is up and running !. Thanks")
});

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});