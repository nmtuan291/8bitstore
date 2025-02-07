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
        const { maxPrice, 
            minPrice, 
            manufacturer, 
            platform, 
            type, 
            genre, 
            sortBy, 
            topNum } = req.query;

        let filter = {stockNum: { $gt: 0 }};
        
        // Price filter
        if (maxPrice || minPrice) {
            filter.price = {};
            if (maxPrice) {
                filter.price.$lte = parseFloat(maxPrice);
            }
            if(minPrice) {
                filter.price.$gte = parseFloat(minPrice);
            }
        }

        // Manufacturer filter
        if (manufacturer) {
            filter.manufacturer = { $in: manufacturer.split(',') };
        }

        // Platform filter
        if (platform) {
            filter.platform = { $in: platform.split(',') };
        }

        // Type filter
        if (type) {
            filter.type = { $in: type.split(',') };
        }

        // Genre filter
        if (genre) {
            filter.genre = { $in: genre.split(',') };
        }


        let sortCriteria = {};
        if (sortBy) {
            switch(sortBy) {
                case 'new': 
                    sortCriteria = { createdAt: -1 };
                    break;
                case 'best-seller':
                    sortCriteria = { sales: -1 };
                    break;
                case 'charasc':
                    sortCriteria = { productName: 1 };
                    break;
                case 'chardesc':
                    sortCriteria = { productName: -1 };
                    break;
                case 'priceasc':
                    sortCriteria = { price: 1 };
                    break;
                case 'pricedesc':
                    sortCriteria = { price: -1 };
                    break;
                default:
                    break;
            }            
        }

        const limit = topNum ? parseInt(topNum) : 0;
        const response = await Product.find(filter)
            .sort(sortCriteria)
            .limit(limit)
            .exec();

        res.status(200).json({
            status: 'SUCCES',
            data: response
        });
    } catch(error) {
            res.status(500).json({
            status: 'SERVER ERROR',
            message: error.message
        })
    }
}

export default productController;