import './ProductItem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import productImage from './3e6784d7-b3c3-4496-a67f-ce98883be469.png'
import { useState } from 'react';
import { faStar } from "@fortawesome/free-regular-svg-icons"; 
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";




const ProductItem = ({ product }) => {
    // need to lift the state up
    const { productName, price, manufacturer } = product;
    const [ productAmount, setProductAmount ] = useState(0);
    const score = 3;
    return (
        <div className='product-container'>
            <img src={productImage} alt=""/>
            {/* <div style={{ position: 'absolute', top: "30px", backgroundColor: "#85BDB6", borderRadius: "100%", width: "20px", height: "20px"}}>
                <FontAwesomeIcon icon={faHeart} />
            </div> */}
            {/* <p style={{ fontSize: "0.5em", border:"solid black 1px"}}>{manufacturer}</p> */}
            <p className='product-name'>{productName}</p>
            {/* <FontAwesomeIcon icon={faHeart} className='m-10'/> */}
            <p>{price}</p>
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