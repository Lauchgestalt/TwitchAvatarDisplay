var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("busy", () => {
    io.emit("setBusy");
    console.log("Setting Busy");
  });

  socket.on("server", (data) => {
    console.log(data['type']);
    if(data['type'] == 'busy'){
      io.emit("setBusy");
      console.log("Setting Busy");
    }
  });

  socket.onAny(() => {
    io.emit("received");
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

