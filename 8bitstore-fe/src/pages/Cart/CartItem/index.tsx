import { useState, useEffect } from "react";
import "./CartItem.scss"

interface CartItemProps {
    imgSrc: string,
    productName: string,
    productPrice: number,
    productCount: number,
};

const CartItem: React.FC<CartItemProps> = ({ imgSrc, productName, productPrice, productCount }) => {
    const [totalPrice, setTotalPrice] = useState<number>(productCount * productPrice);

    return (
        <div className="cart-item-container">
            <div className="product-image-section">
                <input type="checkbox"/>
                <p>Image placeholder</p>
                <p>Product name placeholder</p>
            </div>
            <p className="price">30000</p>
            <div className="product-count">
                Product count placeholder
            </div>
            <p className="total-price">total price place holder</p>
            <p className="delete-product">Xóa</p>
        </div>
    ); 
}

export default CartItem;