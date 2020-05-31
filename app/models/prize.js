import mongoose from 'mongoose';

const PrizeSchema = new mongoose.Schema({
	code: String,
	name: String,
	description: String,
	color: String,
	enabled: Boolean,
	created_at: Date,
	updated_at: Date
});

export default mongoose.model('Prize', PrizeSchema);