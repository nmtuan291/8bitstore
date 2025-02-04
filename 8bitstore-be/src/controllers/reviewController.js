import Review from '../models/Review.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const reviewController = {};

reviewController.getReviews = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is missing'});
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product does not exist'});
        }

        const productReview = await Review.findOne({ productId: product._id});
        if (!productReview) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        res.status(200).json(productReview.reviews);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

reviewController.addReview = async (req, res) => {
    try {
        const { productId, userId, comment, score } = req.body;

        if (!productId || !userId || !score) {
            return res.status(400).json({ message: 'Missing values'});
        }

        const productObjectId = new mongoose.Types.ObjectId(productId);
        await Review.updateOne({
            productId: productObjectId,
            //Not done
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default reviewController;