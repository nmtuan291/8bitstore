const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true},
        comment: { type: String },
        reviewDate: { type: Date, required: true },
        score: { type: Number, required: true}
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;