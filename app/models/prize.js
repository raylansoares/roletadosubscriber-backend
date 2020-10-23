import mongoose from 'mongoose';

const PrizeSchema = new mongoose.Schema({
	index: Number,
	code: String,
	name: String,
	message: String,
	command: String,
	delay: Number,
	color: String,
	text_color: String,
	enabled: Boolean,
	created_at: Date,
	updated_at: Date
});

export default mongoose.model('Prize', PrizeSchema);