import Wishlist from '../models/Wishlist.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const wishlistController = {};

wishlistController.addProduct = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'Missing user ID or product ID'});
        }

        const [user, product] = await Promise.all([
            User.findById(userId),
            Product.findById(productId)
        ]);

        if (!user) {
            return res.status(404).json({ message: 'User does not exists'});
        }

        if (!product) {
            return res.status(404).json({ message: 'Product does not exists'});
        }

        await Wishlist.updateOne(
            { userId: userId },
            { $addToSet: { products: productId } }, // Prevents duplicates
            { upsert: true } // Creates a new document if it doesn’t exist
        );

        res.status(200).json({ message: 'Product added to wishlist successfully'});
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}

wishlistController.removeProduct = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'Missing user ID or product ID'});
        }
    
        const [user, product] = await Promise.all([
            User.findById(userId),
            Product.findById(productId)
        ]);
    
        if (!user) {
            return res.status(404).json({ message: 'User does not exists'});
        }
    
        if (!product) {
            return res.status(404).json({ message: 'Product does not exists'});
        }
    
        await Wishlist.updateOne(
            { userId: userId },
            { $pull: { products: productId } },
        );
    
        res.status(200).json({ message: 'Product removed from wishlist successfully'});
    } catch (error) {
        res.status(500).json(error.message);
    }
   
}

export default wishlistController;
