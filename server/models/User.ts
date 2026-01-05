import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password?: string;
    name?: string;
    wishlist: string[];
    createdAt: Date;
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Hash this
    name: { type: String },
    wishlist: [{ type: String }], // Product IDs
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
