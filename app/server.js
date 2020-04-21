require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import SocketIO from 'socket.io';

import routes from './routes';

const app = express(); 
const server = http.Server(app);
const io = new SocketIO(server);

// connect to database
mongoose.connect(`${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

// parse body params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

io.on('connection', function (socket) {

    // Event from rose-chatbot
    socket.on('requestPrize', function (data) {
        // Event to rose-panel
        socket.emit('selectPrize', data);
        socket.broadcast.emit('selectPrize', data);
    });

    // Event from rose-panel
    socket.on('sayPrize', function (data) {
        // Event to rose-chatbot
        socket.emit('confirmPrize', data);
        socket.broadcast.emit('confirmPrize', data);
    });
});

// start app on PORT
server.listen(process.env.SERVER_PORT, () => console.log(`Started server on ${process.env.SERVER_PORT}`));