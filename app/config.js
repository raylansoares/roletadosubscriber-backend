require('dotenv').config()

import express from 'express';
import http from 'http';
import https from 'https';
import SocketIO from 'socket.io';
import fs from 'fs'

const app = express();
let server;

if (process.env.MODE === 'prod') {
    const key  = fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/privkey.pem`, 'utf8');
    const cert = fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/cert.pem`, 'utf8');
    const ca = fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/chain.pem`, 'utf8');
    const options = { key: key, cert: cert, ca: ca };
    server = https.Server(options, app);
} else {
    server = http.Server(app);
}

const io = new SocketIO(server);

export {
    app,
    server,
    io
}