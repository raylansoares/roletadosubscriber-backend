import mongoose from 'mongoose';

const RewardSchema = new mongoose.Schema({
	name: String,
	descriptio: String,
	enabled: Boolean
});

export default mongoose.model('Reward', RewardSchema);