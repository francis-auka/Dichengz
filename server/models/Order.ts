import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    customer: {
        name: String,
        phone: { type: String, required: true }
    },
    items: [{
        sku: String,
        quantity: Number,
        price: Number,
        name: String,
        image: String
    }],
    total: { type: Number, required: true },
    paymentMethod: {
        type: String,
        enum: ["mpesa", "whatsapp", "cash", "manual"],
        default: "mpesa"
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "failed"],
        default: "unpaid"
    },
    status: {
        type: String,
        enum: [
            "pending",
            "awaiting_payment",
            "paid",
            "in_progress",
            "ready",
            "completed",
            "cancelled"
        ],
        default: "pending"
    },
    paymentDetails: {
        checkoutRequestID: String,
        merchantRequestID: String,
        mpesaReceiptNumber: String
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
