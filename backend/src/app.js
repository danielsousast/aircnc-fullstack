const express = require('express');
const path = require('path');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

require('./database');
const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    const {user} = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(express.json());
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

module.exports = server;