import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	code: String,
	login: String,
	display_name: String,
	email: String,
	profile_image_url: String,
	min_bits_to_wheel: Number,
	access_token: String,
	refresh_token: String,
	expires: Date,
	created_at: Date,
	updated_at: Date
});

export default mongoose.model('User', UserSchema);