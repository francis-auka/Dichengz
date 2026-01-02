import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        sku: String,
        quantity: Number,
        price: Number,
        name: String,
        image: String
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'shipped'], default: 'pending' },
    paymentDetails: {
        checkoutRequestID: String,
        merchantRequestID: String,
        mpesaReceiptNumber: String
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
