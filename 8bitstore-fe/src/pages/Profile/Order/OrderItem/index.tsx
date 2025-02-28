import { useState, useEffect } from "react";
import "./OrderItem.scss"
import productImg from "../../../../assets/images/switch-store-icon.png";

interface OrderItemProps {
    imgSrc: string,
    productName: string,
    productPrice: number,
    productQuantity: number,
};

const OrderItem: React.FC<OrderItemProps> = ({ imgSrc, productName, productPrice, productQuantity }) => {
    const [productCount, setProductCount] = useState<number>(productQuantity);

    return (
        <div className="order-item-container">
            <div className="order-item-header">
                <p>Order ID: adasdadsadaasddada</p>
                <p>Status</p>
            </div>
            <div className="product-image-section">
                <img className="product-order-img" src={productImg}></img>
                <div>
                    <p>{productName}</p>
                    <p>x{productCount}</p>
                </div>
                <p className="price">price</p>
            </div>
            <p className="total-price">asdasd</p>
        </div>
    ); 
}

export default OrderItem;