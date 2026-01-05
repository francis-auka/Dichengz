import mongoose, { Document } from 'mongoose';

export interface IReview extends Document {
    productId: string;
    user?: mongoose.Types.ObjectId;
    rating: number;
    comment?: string;
    verified: boolean;
    createdAt: Date;
}

const ReviewSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IReview>('Review', ReviewSchema);
