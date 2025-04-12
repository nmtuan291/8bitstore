import { useState, useEffect } from "react";
import { useCart } from "../../../contexts/CartProvider";
import "./CartItem.scss"
import productImg from "../../../assets/images/switch-store-icon.png"

interface CartItemProps {
    productId: string
    imgSrc: string[],
    productName: string,
    productPrice: number,
    productQuantity: number,
};

const CartItem: React.FC<CartItemProps> = ({
     productId, 
     imgSrc, 
     productName, 
     productPrice, 
     productQuantity 
    }) => {
    const [productCount, setProductCount] = useState<number>(productQuantity);
    const [totalPrice, setTotalPrice] = useState<number>(productCount * productPrice);
    const { updateCart } = useCart();
    
    const handleDeleteItem = (productId: string) => {
        updateCart({
            productId: productId,
            quantity: 0,
            productName: "",
            price: 0,
            imgUrl: []
        });
    }

    const handleQuantityIncrease = () => {
        setProductCount(prev => {
            const increasedQuantity = prev + 1;
            updateCart({
                productId: productId,
                quantity: increasedQuantity,
                productName: "",
                price: 0,
                imgUrl: []
            });

            return increasedQuantity;
        });
        
    }

    const handleQuantityDecrease = () => {
        setProductCount(prev => {
            const decreasedQuantity = prev - 1;
            updateCart({
                productId: productId,
                quantity: decreasedQuantity,
                productName: "",
                price: 0,
                imgUrl: []
            })

            return decreasedQuantity; 
        });
        
    }

    return (
        <div className="cart-item-container">
            <div className="product-image-section">
                <input type="checkbox"/>
                <img className="product-cart-img" src={imgSrc[0]}></img>
                <p>{productName}</p>
            </div>
            <p className="price">{productPrice}</p>
            <div className="product-count">
                <button onClick={handleQuantityDecrease}>-</button>
                <p>{productCount}</p>
                <button onClick={handleQuantityIncrease}>+</button>
            </div>
            <p className="total-price">{totalPrice}</p>
            <p 
                className="delete-product"
                onClick={() => handleDeleteItem(productId)}
            >
                Xóa
            </p>
        </div>
    ); 
}

export default CartItem;