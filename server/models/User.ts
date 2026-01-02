import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Hash this
    name: { type: String },
    wishlist: [{ type: String }], // Product IDs
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
