import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import Inventory from './models/Inventory.js';
import Order from './models/Order.js';
import User from './models/User.js';
import Review from './models/Review.js';
import { initiateSTKPush } from './services/daraja.js';

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

// Admin Authentication Middleware
const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const adminSecret = req.headers['x-admin-secret'];
    if (adminSecret === process.env.ADMIN_SECRET) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

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
app.post('/orders', async (req, res) => {
    const { phoneNumber, amount, items, userId, customer, paymentMethod } = req.body;
    try {
        // Create pending order
        const order = new Order({
            orderId: `ORD-${Date.now()}`,
            user: userId,
            customer: customer || { phone: phoneNumber },
            items,
            total: amount,
            paymentMethod: paymentMethod || 'mpesa',
            paymentStatus: 'unpaid',
            status: paymentMethod === 'whatsapp' ? 'pending' : 'awaiting_payment'
        });
        await order.save();

        if (paymentMethod === 'whatsapp') {
            return res.json({ message: 'Order created for WhatsApp', orderId: order.orderId });
        }

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
                paymentStatus: 'paid',
                status: 'paid',
                'paymentDetails.mpesaReceiptNumber': mpesaReceiptNumber
            }
        );
    } else {
        // Failed
        await Order.findOneAndUpdate(
            { 'paymentDetails.checkoutRequestID': CheckoutRequestID },
            { paymentStatus: 'failed', status: 'cancelled' }
        );
    }

    res.json({ message: 'Callback received' });
});

// Admin Routes
app.get('/admin/orders', adminAuth, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

app.patch('/admin/orders/:id', adminAuth, async (req, res) => {
    const { paymentStatus, status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { paymentStatus, status },
            { new: true, runValidators: true }
        );
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
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
