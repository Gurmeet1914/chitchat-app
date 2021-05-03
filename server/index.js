const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const app = express();
const sever = http.createServer(app);
const cors=require('cors');
const { addUsers, removeUsers, getUsers, getUsersinRoom } = require('./Users');

const io = socketio(sever, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});
const port = process.env.PORT | 5000;
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUsers({ id: socket.id, name, room });
    if (error) return callback(error);
    else {
      socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to room ${user.room}` });
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joind the room` });
      socket.join(user.room);
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersinRoom(user.room) });
      callback();
    }
  });
  socket.on('sendMessage', (message, callback) => {
    const user = getUsers(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersinRoom(user.room) });
    callback();
  })
  socket.on('disconnect', () => {
    const user = removeUsers(socket.id);
    
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })
     
    }
  })
});


app.use(router);
app.use(cors());

sever.listen(port, () => {
  console.log(`server is running on ${port}`);
})