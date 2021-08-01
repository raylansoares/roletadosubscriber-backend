import mongoose from 'mongoose'

const ConfigurationSchema = new mongoose.Schema({
  code: String,
  min_bits_to_wheel: Number,
  active_sub_plans: Array,
  created_at: Date,
  updated_at: Date
})

export default mongoose.model('Configuration', ConfigurationSchema)
