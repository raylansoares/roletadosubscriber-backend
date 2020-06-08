import express from 'express';
import http from 'http';
import https from 'https';
import SocketIO from 'socket.io';

const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const options = { key: privateKey, cert: certificate };

const app = express(); 
const server = http.Server(app);
const secureServer = https.Server(options, app);
const io = new SocketIO(server);

export {
    app,
    server,
    secureServer,
    io
}