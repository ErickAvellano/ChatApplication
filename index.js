const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('pages/index');
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    io.emit('user_left', socket.username); // leaving the chat
  });

  socket.on('username', function(username) {
    socket.username = username;
    io.emit('is_online', socket.username); // joining the chat
  });
  socket.on('message', function(data) {
    if (socket.username) {
      const messageData = {
        username: socket.username,
        text: data.text,
        timestamp: Date.now(),
      };
      io.emit('message', messageData);
    }
  });
});

server = http.listen(8000, function() {
   console.log('listening on *:8000');
 });
//app.listen(port, '0.0.0.0', () => {
  //console.log(`Server is running on port ${port}`);
//});







