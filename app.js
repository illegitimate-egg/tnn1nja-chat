const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/preview.png', (req, res) => {
  res.sendFile(__dirname + '/preview.png');
});

io.on('connection', (socket) => {
  socket.on('user', (usr) => {
    console.log(usr + " has connected.");
    io.emit('announcment', usr + " has connected.");
  });

  socket.on('end', (usr) => {
    console.log(usr + " has disconnected.");
    io.emit('announcment', usr + " has disconnected.");
  });

  socket.on('chat message', (usr, msg) => {
    console.log(usr + ": " + msg);
    io.emit('chat message', usr, msg);
  });
});

server.listen(80, () => {
  console.log('listening on *:80');
});