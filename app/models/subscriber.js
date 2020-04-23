import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
	user: String,
	prize: String,
	created_at: Date,
	updated_at: Date
});

export default mongoose.model('Subscriber', SubscriberSchema);