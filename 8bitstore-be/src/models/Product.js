import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true },
        price: { type: Number, required: true },
        stockNum: { type: Number, required: true },
        manufacturer: { type: String, required: true },
        platform: { type: [String]},
        description: { type: String },
        type: { type: String, required: true },
        genre: { type: [String]},
        imgUrl: { type: String, required: true },
        sales: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
    
);

const Product = mongoose.model('products', productSchema);
export default Product;