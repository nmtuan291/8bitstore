const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: { type: [mongoose.Schema.Types.ObjectId], ref: 'products', required: true }
    },
    {
        timestamps: true
    }
);

wishlistSchema.index({ userId: 1 }, { unique: true });
const Wishlist = mongoose.model('wishlists', wishlistSchema);
module.exports = Wishlist;