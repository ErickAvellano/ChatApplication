const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/chat', function(req, res) {
  res.render('pages/index');
});

  // Server-side code
io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    io.emit('user_left', socket.username); // Notify all clients about the user leaving the chat
  });

  socket.on('username', function(username) {
    socket.username = username;
    io.emit('is_online', socket.username); // Notify all clients about the user joining the chat
  });
});

server = http.listen(8000, function() {
  console.log('listening on *:8000');
});
