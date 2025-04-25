
const express = require('express');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const settingsRoutes = require('./routes/settings');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));


app.use(session({
  secret: 'secret-key-chatapp',
  resave: false,
  saveUninitialized: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/settings', settingsRoutes);

const connectedUsers = {};

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('register-user', username => {
    connectedUsers[username] = socket.id;
  });

  socket.on('private-message', ({ from, to, message }) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    db.run('INSERT INTO messages (sender, receiver, message, timestamp) VALUES (?, ?, ?, ?)', [from, to, message, time]);

    const targetSocket = connectedUsers[to];
    if (targetSocket) {
      io.to(targetSocket).emit('private-message', { from, message, time });
    }
  });

  socket.on('disconnect', () => {
    for (let [username, id] of Object.entries(connectedUsers)) {
      if (id === socket.id) delete connectedUsers[username];
    }
    console.log('Socket disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
