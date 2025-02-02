const mongoose = require('mongoose');
const { applyTimestamps } = require('./User');

const productSchema = new mongoose.Schemma(
    {
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        stockNum: { type: Number, required: true },
        manufacturer: { type: String, required: true },
        platform: { type: [String]},
        description: { type: String },
        type: { type: String, required: true },
        genre: { type: [String]}
    },
    {
        timestamps: true
    }
    
);

const Product = mongoose.model('products', productSchema);
module.exports = Product;