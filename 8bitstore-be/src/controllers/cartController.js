import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const cartController = {};

cartController.getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'FAILURE',
                message: 'USER DOES NOT EXIST'
            });
        }
        
        const cart = await Cart.find({ userId: userId });
        if (cart.length === 0) {
            return res.status(404).json({
                status: 'FAILURE',
                message: 'CART DOES NOT EXIST'
            }); 
        }

        return res.status(200).json(cart);
        
    } catch(error) {
        return res.status(500).json({
            status: 'SERVER ERROR',
            message: error.message
        });
    }
}

cartController.addProduct = async (req, res) => {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
        return res.status(400).json({
            status: 'BAD REQUEST',
            message: 'Product ID or user ID is missing'
        });
    }

    const product = await Product.findById(productId).exec();
    if (!product) {
        return res.status(404).json({
            status: 'FAILURE',
            message: 'Product not found'
        });
    }

    const cart = await Cart.findOne({ userId: userId })
    if (!cart) {
        const newCart = new Cart({
            userId: userId,
            products: [{
                productId: productId,
                amount: 1
            }]
        });
        await newCart.save();        
    } else {
        const productIndex = cart.products.findIndex(product => product.productId.toString() === productId);
        if (product !== -1) {
            cart.products[productIndex].amount++;
        } else {
            cart.products.push({ productId: productId, amount: 1});
        } 
        await cart.save();
    }

    res.status(200).json({
        status: 'SUCCESS',
        message: 'PRODUCT ADDED TO CART'
    });
}

cartController.removeProduct = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'FAILURE',
                message: 'USER DOES NOT EXIST'
            });
        }

        const product = await Product.findById(productId).exec();
        if (!product) {
            return res.status(404).json({
                status: 'FAILURE',
                message: 'Product not found'
            });
        }

        const cart = await Cart.find({ userId: userId });
        if (cart.length === 0) {
            return res.status(404).json({
                status: 'FAILURE',
                message: 'CART NOT FOUND'
            });
        }

        const productIndex = cart.products.findIndex(product => product.productId.toString() === productId);
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.status(200).json({ message: 'Remove product from cart successfully'});

    } catch (error) {
            res.status(500).json({
            status: 'SERVER ERROR',
            message: error.message
        })
    }
}

export default cartController;