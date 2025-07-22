import { useState, useEffect } from "react";
import "./OrderItem.scss"
import productImg from "../../../../assets/images/switch-store-icon.png";
import ReviewForm from "../ReviewForm";
import type { OrderItem } from "../../../../interfaces/interfaces";
import { formatNumber } from "../../../../utils/FormatNumber";
import formatDate from "../../../../utils/FormatDate";

interface OrderItemProps {
    items: OrderItem[],
    orderId: string,
    total: number,
    status: string,
    createdAt: string
};

const OrderItem: React.FC<OrderItemProps> = ({ items, orderId, total, status, createdAt }) => {
    const [showReviewForm, setShowReviewForm] = useState<boolean>(false);

    const statusConvert = (status: string): string => {
        switch (status) {
            case "pending":
                return "Đang xử lý";
            default:
                return "";
        }
    }

    const statusColor = (status: string): string => {
        switch (status) {
            case "pending":
                return "green";
            default:
                return "";
        }
    }
    
    return (
        <>
            { showReviewForm && <ReviewForm closeForm={() => setShowReviewForm(false)} orderItems={items} /> }
            <div className="order-item-container">
                <div className="order-item-header">
                    <div>
                        <p>Mã đơn hàng: {orderId}</p>
                        <p className="order-date">Ngày đặt: {formatDate(createdAt)}</p>
                    </div>
                    <p style={{color: `${statusColor(status)}`}}>{statusConvert(status)}</p>
                </div>
                {
                    items.map(item => {
                        return (
                            <div className="product-image-section">
                                <img className="product-order-img" src={item.imgUrl[0]}></img>
                                <div>
                                    <p>{item.productName}</p>
                                    <p>Số lượng: {item.quantity}</p>
                                </div>
                                <p className="price">{formatNumber(item.price)}</p>
                            </div>
                        )
                    })
                }
                <p className="total-price"><span className="t-bold">Tổng tiền: </span>{formatNumber(total)}</p>
                <div className="order-btn">
                    <button onClick={() => setShowReviewForm(true)}>Đánh giá</button>
                    <button>Hủy đơn hàng</button>
                </div>
            </div>
        </>
    ); 
}

export default OrderItem;