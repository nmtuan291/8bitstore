import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import productImage from "@/assets/images/product.png";
import { useState } from 'react';
import { faStar } from "@fortawesome/free-regular-svg-icons"; 
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { IProduct } from '../../interfaces/interfaces';
import './ProductCard.scss'


interface ProductItemProps {
    product: IProduct
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    // need to lift the state up
    const [ productAmount, setProductAmount ] = useState<number>(0);
    const score = 3;
    return (
        <div className='product-container'>
            <img src={productImage} alt=""/>
            <p className='product-name'>{product.productName}</p>
            <p>{product.price}</p>
            <button 
                className='cart-btn'
                onClick={() => {setProductAmount(prev => prev = prev + 1)
                    console.log(productAmount);
                }}
            > Thêm vào giỏ</button>
        </div>
    );
}

export default ProductItem;