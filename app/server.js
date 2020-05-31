require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import http from 'http';
import SocketIO from 'socket.io';

import routes from './routes';

import { 
    create as createSubscriber,
    updateOne as updateSubscriber
} from './services/subscribers'

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

app.use(cors({
    origin: `${process.env.APP_HOST}:${process.env.APP_PORT}`
}));

app.use('/api', routes);

io.on('connection', function (socket) {

    // Event from rose-chatbot
    socket.on('requestPrize', async function (data) {
        const subscriber = await createSubscriber({ username: data.username, code: data.code })
        // Event to rose-panel
        socket.emit('selectPrize', { code: data.code, subscriber: subscriber });
        socket.broadcast.emit('selectPrize', { code: data.code, subscriber: subscriber });
    });

    // Event from rose-panel
    socket.on('retryWheel', async function (data) {
        // Event to rose-panel
        socket.emit('selectPrize', { code: data.code, subscriber: data.subscriber });
        socket.broadcast.emit('selectPrize', { code: data.code, subscriber: data.subscriber });
    });

    // Event from rose-panel
    socket.on('sayPrize', async function (data) {
        await updateSubscriber(data._id, { prizes: data.prizes })

        // Event to rose-chatbot
        socket.emit('confirmPrize', data);
        socket.broadcast.emit('confirmPrize', data);
    });
});

// start app on PORT
server.listen(process.env.SERVER_PORT, () => console.log(`Started server on ${process.env.SERVER_PORT}`));