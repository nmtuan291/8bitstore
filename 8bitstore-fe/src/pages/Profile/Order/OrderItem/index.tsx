import { useState, useEffect } from "react";
import "./OrderItem.scss"
import productImg from "../../../../assets/images/switch-store-icon.png";

interface OrderItem {
    productId: string
    imgSrc: string,
    productName: string,
    productPrice: number,
    productQuantity: number,
}

interface OrderItemProps {
    items: OrderItem[]
};

const OrderItem: React.FC<OrderItemProps> = ({ items }) => {

    return (
        <div className="order-item-container">
            <div className="order-item-header">
                <p>Order ID: adasdadsadaasddada</p>
                <p>Status</p>
            </div>
            {
                items.map(item => 
                    <div className="product-image-section">
                        <img className="product-order-img" src={productImg}></img>
                        <div>
                            <p>{item.productName}</p>
                            <p>x{item.productQuantity}</p>
                        </div>
                        <p className="price">price</p>
                    </div>
                )
            }
            <p className="total-price">asdasd</p>
        </div>
    ); 
}

export default OrderItem;