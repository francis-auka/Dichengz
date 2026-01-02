import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import Inventory from './models/Inventory';
import Order from './models/Order';
import User from './models/User';
import Review from './models/Review';
import { initiateSTKPush } from './services/daraja';

dotenv.config();

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fashion-ecommerce')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Inventory
app.get('/inventory/:sku', async (req, res) => {
    try {
        const item = await Inventory.findOne({ sku: req.params.sku });
        res.json(item || { quantity: 0 });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Orders (Initiate Payment)
// Orders (Initiate Payment)
app.post('/orders', async (req, res) => {
    const { phoneNumber, amount, items, userId } = req.body;
    try {
        // Create pending order
        const order = new Order({
            orderId: `ORD-${Date.now()}`,
            user: userId,
            items,
            total: amount,
            status: 'pending'
        });
        await order.save();

        // Initiate STK Push
        const stkResponse = await initiateSTKPush(phoneNumber, amount, order.orderId);

        // Update order with checkout request ID
        order.paymentDetails = {
            checkoutRequestID: stkResponse.CheckoutRequestID,
            merchantRequestID: stkResponse.MerchantRequestID,
            mpesaReceiptNumber: ''
        };
        await order.save();

        res.json({ message: 'Order created and STK Push initiated', orderId: order.orderId, stkResponse });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Daraja Callback
app.post('/daraja/callback', async (req, res) => {
    const { Body } = req.body;
    const { stkCallback } = Body;
    const { CheckoutRequestID, ResultCode, CallbackMetadata } = stkCallback;

    if (ResultCode === 0) {
        // Success
        const mpesaReceiptNumber = CallbackMetadata.Item.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;

        await Order.findOneAndUpdate(
            { 'paymentDetails.checkoutRequestID': CheckoutRequestID },
            {
                status: 'paid',
                'paymentDetails.mpesaReceiptNumber': mpesaReceiptNumber
            }
        );
    } else {
        // Failed
        await Order.findOneAndUpdate(
            { 'paymentDetails.checkoutRequestID': CheckoutRequestID },
            { status: 'failed' }
        );
    }

    res.json({ message: 'Callback received' });
});

// Wishlist
app.post('/wishlist', async (req, res) => {
    // Add/remove items
    res.json({ message: 'Wishlist updated' });
});

// Reviews
app.post('/reviews', async (req, res) => {
    // Add review
    res.json({ message: 'Review added' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
