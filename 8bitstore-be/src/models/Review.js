const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true},
        reviewDate: { type: Date, required: true },
        reviews: [{
            score: { type: Number, required: true},
            comment: { type: String },
            userId: { type: String, required: true }
        }]
    },
    {
        timestamps: true
    }
);
reviewSchema.index({ productId: 1 }, { unique: true });
const Review = mongoose.model('reviews', reviewSchema);
export default Review;