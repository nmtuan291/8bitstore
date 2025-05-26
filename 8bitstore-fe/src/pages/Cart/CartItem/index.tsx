import { useState, useEffect } from "react";
import { useCart } from "../../../contexts/CartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./CartItem.scss"
import productImg from "../../../assets/images/switch-store-icon.png"
import Modal from "../../../components/Modal";
import { formatNumber } from "../../../utils/FormatNumber";

interface CartItemProps {
    productId: string
    imgSrc: string[],
    productName: string,
    productPrice: number,
    productQuantity: number,
    deleteItem: (productId: string) => void
};

const CartItem: React.FC<CartItemProps> = ({
     productId, 
     imgSrc, 
     productName, 
     productPrice, 
     productQuantity,
     deleteItem
    }) => {
    const [productCount, setProductCount] = useState<number>(productQuantity);
    const [totalPrice, setTotalPrice] = useState<number>(productCount * productPrice);
    const { updateCart } = useCart();
    
    const handleDeleteItem = (productId: string) => {
        deleteItem(productId);
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

            setTotalPrice(increasedQuantity * productPrice)

            return increasedQuantity;
        });
        
    }

    const handleQuantityDecrease = () => {
        setProductCount(prev => {
            const decreasedQuantity = prev - 1 >= 1 ? prev - 1 : 1;
            updateCart({
                productId: productId,
                quantity: decreasedQuantity,
                productName: "",
                price: 0,
                imgUrl: []
            })

            setTotalPrice(decreasedQuantity * productPrice)

            return decreasedQuantity; 
        });
        
    }

    return (
        <>
            <div className="cart-item-container">
            <div className="product-image-section">
                <img className="product-cart-img" src={imgSrc[0]}></img>
                <p>{productName}</p>
            </div>
            <p className="price">{formatNumber(productPrice)}</p>
            <div className="product-count">
                <button onClick={handleQuantityDecrease}>-</button>
                <p>{productCount}</p>
                <button onClick={handleQuantityIncrease}>+</button>
            </div>
            <p className="total-price">{formatNumber(totalPrice)}</p>
            <p 
                className="delete-product"
                onClick={() => handleDeleteItem(productId)}
            >
                <FontAwesomeIcon icon={faTrash} style={{color: "#C10000", cursor:"pointer"}}></FontAwesomeIcon>
            </p>
        </div>
        </>
        
    ); 
}

export default CartItem;