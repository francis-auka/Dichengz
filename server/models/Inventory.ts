import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    productId: { type: String, required: true }, // Sanity ID
    variantId: { type: String, required: true }, // Variant key/ID
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 }
});

export default mongoose.model('Inventory', InventorySchema);
