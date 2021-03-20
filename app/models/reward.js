import mongoose from 'mongoose';

const RewardSchema = new mongoose.Schema({
	code: String,
	name: String,
	type: String,
	action: String,
	time: Number,
	created_at: Date,
	updated_at: Date
});

RewardSchema.index({ 'code': 1, 'name': 1 }, { unique: true });

export default mongoose.model('Reward', RewardSchema);