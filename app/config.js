import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

const app = express(); 
const server = http.Server(app);
const io = new SocketIO(server);

export {
    app,
    server,
    io
}