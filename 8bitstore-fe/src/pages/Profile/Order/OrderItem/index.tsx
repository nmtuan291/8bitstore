import { useState, useEffect } from "react";
import "./OrderItem.scss"
import productImg from "../../../../assets/images/switch-store-icon.png";
import ReviewForm from "../ReviewForm";
import type { OrderItem } from "../../../../interfaces/interfaces";

interface OrderItemProps {
    items: OrderItem[],
    orderId: string,
    total: number,
    status: string,
    createdAt: string
};

const OrderItem: React.FC<OrderItemProps> = ({ items, orderId, total, status, createdAt }) => {
    const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
    
    return (
        <>
            { showReviewForm && <ReviewForm closeForm={() => setShowReviewForm(false)} orderItems={items} /> }
            <div className="order-item-container">
                <div className="order-item-header">
                    <p>Mã đơn hàng: {orderId} - {createdAt}</p>
                    <p>{status}</p>
                </div>
                {
                    items.map(item => {
                        return (
                            <div className="product-image-section">
                                <img className="product-order-img" src={item.imgUrl[0] || productImg}></img>
                                <div>
                                    <p>{item.productName}</p>
                                    <p>x{item.quantity}</p>
                                </div>
                                <p className="price">{item.price}</p>
                            </div>
                        )
                    })
                }
                <p className="total-price">{total}</p>
                <div className="order-btn">
                    <button onClick={() => setShowReviewForm(true)}>Đánh giá</button>
                    <button>Hủy đơn hàng</button>
                </div>
            </div>
        </>
    ); 
}

export default OrderItem;