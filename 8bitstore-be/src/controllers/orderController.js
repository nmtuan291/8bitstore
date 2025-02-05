import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const orderController = {};

orderController.getOrder = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Cannot find the user' });
        }
    
        const order = await Order.find({ userId: userId });
        if (order.length === 0) {
            return res.status(404).json('User does not have any order')
        }
    
        res.status(200).json({ message: 'Get orders successfullys', data: order});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//not done
orderController.createOrder = async (req, res) => {
    try {
        const { userId, products, quantity } = req.body;

        const [ user, product ] = await Promise.all([
            User.findById(userId),
            Product.findById()
        ]);

        if (!user) {
            return res.status(404).json({ message: 'Cannot find the user' });
        }

        if (!product) {
            return res.status(404).json({ message: 'Product does not exists'});
        }

        if (product.quantity < 1) {
            return res.status(404).json({ message: 'Product is out of stock'}); 
        }
        
        const currentDate = new Date();
        const order = new Order({
            userId: userId,
            productId: productId,
            quantity: quantity,
            orderDate: currentDate,
            deliveryDate: null,
            status: pending,
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}