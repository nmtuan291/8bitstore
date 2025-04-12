import { useState } from 'react';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import productImage from "@/assets/images/product.png";
import { faStar } from "@fortawesome/free-regular-svg-icons"; 
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from '../../interfaces/interfaces';
import './ProductCard.scss'


interface ProductItemProps {
    product: Product
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const score = 3;
    return (
        <div className='product-container'>
            <img src="" alt=""/>
            <p className='product-name'>{product.productName}</p>
            <p>{product.price}</p>
            <button 
                className='cart-btn'
            ><Link to={`/detail/${product.productId}`}>Mua hàng</Link></button>
        </div>
    );
}

export default ProductItem;