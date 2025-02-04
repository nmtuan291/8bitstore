import Product from '../models/Product.js';

const productController = {};

productController.getAllProducts = async (req, res) => {
    try {
        const response = await Product.find({ stockNum: { $gt: 0 }});
        return res.status(200).json({
            status: 'SUCCESS',
            data: response
        });
    } catch (error) {
            res.status(500).json({
            status: 'SERVER ERROR',
            message: error.message
        });
    }
}

productController.getFilteredProduct = async (req, res) => {
    try {
        const { maxPrice, minPrice, manufacturer, platform, type, genre } = req.query;

        let filter = {};

        if (maxPrice || minPrice) {
            filter.price = {};
            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice);
            }
            if(minPrice) {
                filter.price.$gte = parseFloat(minPrice);
            }
        }

        if (manufacturer) {
            filter.manufacturer = { $in: manufacturer.split(',') };
        }

        if (platform) {
            filter.platform = { $in: platform.split(',') };
        }

        if (type) {
            filter.type = { $in: type.split(',') };
        }

        if (genre) {
            filter.genre = { $in: genre.split(',') };
        }

        const response = await Product.find(filter).exec();
        res.status(200).json({
            status: 'SUCCES',
            data: response
        })
    } catch(error) {
            res.status(500).json({
            status: 'SERVER ERROR',
            message: error.message
        })
    }
}

export default productController;