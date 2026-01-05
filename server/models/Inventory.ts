import mongoose, { Document } from 'mongoose';

export interface IInventory extends Document {
    sku: string;
    productId: string;
    variantId: string;
    size: string;
    color: string;
    quantity: number;
}

const InventorySchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    productId: { type: String, required: true }, // Sanity ID
    variantId: { type: String, required: true }, // Variant key/ID
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 }
});

export default mongoose.model<IInventory>('Inventory', InventorySchema);
