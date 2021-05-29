require('dotenv').config()

import express from 'express';
import http from 'http';
import https from 'https';
import { Server } from 'socket.io';
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

let allowedOrigin = process.env.APP_HOST
if (process.env.APP_PORT) allowedOrigin += `:${process.env.APP_PORT}`

const io = new Server(server, {
    cors: {
        origin: allowedOrigin,
        credentials: true
    },
    allowEIO3: true
});

export {
    app,
    server,
    io
}