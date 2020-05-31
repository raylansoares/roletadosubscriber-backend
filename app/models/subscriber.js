import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
	code: String,
	username: String,
	prizes: Array,
	created_at: Date,
	updated_at: Date
});

export default mongoose.model('Subscriber', SubscriberSchema);