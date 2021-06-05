import * as config from './config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import {
  create as createSubscriber,
  updateOne as updateSubscriber
} from './services/subscribers'

require('dotenv').config()

// connect to database
mongoose.connect(
    `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
)

// parse body params
config.app.use(express.json())
config.app.use(express.urlencoded({ extended: true }))

let allowedOrigin = process.env.APP_HOST
if (process.env.APP_PORT) allowedOrigin += `:${process.env.APP_PORT}`

config.app.use(cors({
  origin: allowedOrigin
}))

config.app.use('/api', routes)

config.io.on('connection', function (socket) {
  // Event from chatbot
  socket.on('requestPrize', async function (data) {
    try {
      const subscriber = await createSubscriber({
        username: data.username,
        code: data.code,
        origin: data.origin,
        quantity: data.quantity,
        message: data.message
      })
      // Event to frontend
      config.io.emit('selectPrize', {
        code: data.code,
        subscriber: subscriber
      })
    } catch (e) {}
  })

  // Event from frontend
  socket.on('retryWheel', async function (data) {
    try {
      // Event to frontend
      config.io.emit('selectPrize', {
        code: data.code,
        subscriber: data.subscriber
      })
    } catch (e) {}
  })

  // Event from frontend
  socket.on('sayPrize', async function (data) {
    try {
      await updateSubscriber(data._id, { prizes: data.prizes })
      // Event to chatbot
      config.io.emit('confirmPrize', data)
    } catch (e) {}
  })
})

// start app on PORT
config.server.listen(process.env.SERVER_PORT, () => {
  console.log(`Started server on ${process.env.SERVER_PORT}`)
})
