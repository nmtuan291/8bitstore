import { useState, useEffect } from "react";
import "./CartItem.scss"
import productImg from "../../../assets/images/switch-store-icon.png"
import { toASCII } from "punycode";

interface CartItemProps {
    imgSrc: string,
    productName: string,
    productPrice: number,
    productQuantity: number,
};

const CartItem: React.FC<CartItemProps> = ({ imgSrc, productName, productPrice, productQuantity }) => {
    const [productCount, setProductCount] = useState<number>(productQuantity);
    const [totalPrice, setTotalPrice] = useState<number>(productCount * productPrice);

    return (
        <div className="cart-item-container">
            <div className="product-image-section">
                <input type="checkbox"/>
                <img className="product-cart-img" src={productImg}></img>
                <p>{productName}</p>
            </div>
            <p className="price">{productPrice}</p>
            <div className="product-count">
                <button>-</button>
                <p>{productCount}</p>
                <button>+</button>
            </div>
            <p className="total-price">{totalPrice}</p>
            <p className="delete-product">Xóa</p>
        </div>
    ); 
}

export default CartItem;