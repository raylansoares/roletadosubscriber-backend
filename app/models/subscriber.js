import mongoose from 'mongoose'

const SubscriberSchema = new mongoose.Schema({
  code: String,
  username: String,
  prizes: Array,
  origin: String,
  quantity: Number,
  message: String,
  created_at: Date,
  updated_at: Date
})

export default mongoose.model('Subscriber', SubscriberSchema)
