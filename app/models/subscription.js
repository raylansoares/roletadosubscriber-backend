import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema({
  id: String,
  status: String,
  type: String,
  condition: {
    broadcaster_user_id: String,
  },
  code: String,
  created_at: Date
})

export default mongoose.model('Subscription', SubscriptionSchema)
