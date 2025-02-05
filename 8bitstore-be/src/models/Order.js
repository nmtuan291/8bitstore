const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true},
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
                quantity: { type: Number, required: true }
            }
        ],
        orderDate: {type: Date, required: true },
        deliveryDate: { type: Date },
        status: { type: String, required: true },
        totalPrice: { type: Number } 
    },
    {
        timestamps: true
    }

);

orderSchema.index({ userId: 1 }, { unique: true });
const Order = mongoose.model('orders', orderSchema);
export default Order;