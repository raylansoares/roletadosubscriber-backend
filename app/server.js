require('dotenv').config()

import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';

import routes from './routes';

import * as config from './config'

import { 
    create as createSubscriber,
    updateOne as updateSubscriber
} from './services/subscribers'

// connect to database
mongoose.connect(`${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

// parse body params
config.app.use(bodyParser.json());
config.app.use(bodyParser.urlencoded({ extended: true }));

let allowedOrigin = process.env.APP_HOST
if (process.env.APP_PORT) allowedOrigin += `:${process.env.APP_PORT}`

config.app.use(cors({
    origin : allowedOrigin
}));

config.app.use('/api', routes);

config.io.on('connection', function (socket) {

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
config.server.listen(process.env.SERVER_PORT, () => console.log(`Started server on ${process.env.SERVER_PORT}`));