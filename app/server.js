// import express
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http';
import SocketIO from 'socket.io';

import * as constants from './constants';
import routes from './routes';

const app = express(); 
const server = http.Server(app);
const io = new SocketIO(server);

// connect to database
mongoose.connect(`mongodb://localhost:${constants.MONGO_PORT}/${constants.DB_NAME}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

// parse body params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

io.on('connection', function (socket) {
    socket.on('client-chat', function (data) { // get message from rose-chatbot
        socket.emit('server-confirm', data); // send message vonfirmatio to rose-chatbot
    });
});

// start app on PORT
server.listen(constants.PORT, () => console.log(`Started server on ${constants.PORT}`));