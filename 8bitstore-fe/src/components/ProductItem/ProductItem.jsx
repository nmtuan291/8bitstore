import './ProductItem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import productImage from './3e6784d7-b3c3-4496-a67f-ce98883be469.png'
import { useState } from 'react';

const ProductItem = ({ product }) => {
    // need to lift the state up
    const [ productAmount, setProductAmount ] = useState(0);
    return (
        <div className='product-container'>
            <img src={productImage} alt=""/>
            <div className='product-info'>
                <p>{product.name}</p>
                <FontAwesomeIcon icon={faHeart} className='m-10'/>
            </div>
            <p>{product.price}</p>
            {
                productAmount === 0 ? <button 
                    className='cart-btn'
                    onClick={() => {setProductAmount(prev => prev = prev + 1)
                        console.log(productAmount);
                    }}
                >
                    Add to cart</button>
                : 
                <div className='cart-amount'>
                    <div className='cart-amount__selection'>
                        <span onClick={() => setProductAmount(prev => prev = prev - 1)}>-</span>
                        <span>{productAmount}</span>
                        <span onClick={() => setProductAmount(prev => prev = prev + 1)}>+</span>
                    </div>
                    <button 
                    className='cart-btn'
                >
                    Buy now</button>
                </div>

              
            }
            
            
        </div>
    );
}

export default ProductItem;