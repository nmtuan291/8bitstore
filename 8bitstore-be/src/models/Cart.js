const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
                amount: { type: Number, required: true },
                productName: { type: String, required: true },
                productPrice: { type: Number, required: true },
                imgUrl: { type: String, required: true }
            }
        ]
    },
    {
        timestamps: true
    }
)

cartSchema.index({ userId: 1 }, { unique: true });
const Cart = mongoose.model('carts', cartSchema);
export default Cart;