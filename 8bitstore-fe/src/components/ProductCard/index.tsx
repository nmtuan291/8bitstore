import { useState } from 'react';
import { useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import productImage from "@/assets/images/product.png";
import { faStar } from "@fortawesome/free-regular-svg-icons"; 
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from '../../interfaces/interfaces';
import './ProductCard.scss'
import { formatNumber } from '../../utils/FormatNumber';


interface ProductItemProps {
    product: Product
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const score = 3;
    const navigate = useNavigate();

    const formattedPrice = `${formatNumber(product.price)}`;

    return (
        <div className='product-container'>
            <div className="image-container">
                <img src={product.imgUrl[0]} alt={product.productName} />
            </div>
            <div className="product-info">
                <p className='product-name'>{product.productName}</p>
                <p className='product-price'>{formattedPrice}</p>
            </div>
            <button 
                className='cart-btn'
                onClick={() => navigate(`/product/${product.productId}`)}
            >
                Mua hàng
            </button>
        </div>
    );
}

export default ProductItem;