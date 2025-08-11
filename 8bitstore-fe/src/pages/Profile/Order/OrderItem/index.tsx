import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShoppingBag, 
  faCalendarAlt, 
  faReceipt, 
  faStar, 
  faTimes,
  faTruck,
  faCheckCircle,
  faClock,
  faExclamationTriangle,
  faMapMarkerAlt,
  faUser,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import "./OrderItem.scss";
import ReviewForm from "../ReviewForm";
import type { OrderItem as OrderItemType, Address } from "../../../../interfaces/interfaces";
import { formatNumber } from "../../../../utils/FormatNumber";
import formatDate from "../../../../utils/FormatDate";
import { useCancelOrderMutation } from "../../../../store/api";

interface OrderItemProps {
    items: OrderItemType[];
    orderId: string;
    total: number;
    status: string;
    createdAt: string;
    address: Address | null;
}

const OrderItem: React.FC<OrderItemProps> = ({ items, orderId, total, status, createdAt, address }) => {
    const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    // Create portal container
    useEffect(() => {
        let container = document.getElementById('modal-root');
        if (!container) {
            container = document.createElement('div');
            container.id = 'modal-root';
            document.body.appendChild(container);
        }
        setPortalContainer(container);
    }, []);

    const handleReviewClick = () => {
        setShowReviewForm(true);
    };

    const [cancelOrder, { isLoading }] = useCancelOrderMutation();
    const handleCancelOrder = async () => {
        try {
            await cancelOrder(orderId).unwrap();
          } catch (error) {
            console.log(error);
          }
        setShowCancelConfirm(false);
    };

    const handleCancelClick = () => {
        setShowCancelConfirm(true);
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case "pending":
                return {
                    text: "Đang xử lý",
                    color: "#f59e0b",
                    bgColor: "#fef3c7",
                    icon: faClock,
                    description: "Đơn hàng đang được xử lý"
                };
            case "shipped":
                console.log(status);
                return {
                    text: "Đang giao",
                    color: "#8b5cf6",
                    bgColor: "#ede9fe",
                    icon: faTruck,
                    description: "Đơn hàng đang được giao"
                };
            case "delivered":
                return {
                    text: "Hoàn thành",
                    color: "#10b981",
                    bgColor: "#d1fae5",
                    icon: faCheckCircle,
                    description: "Đơn hàng đã được giao thành công"
                };
            case "cancelled":
                return {
                    text: "Đã hủy",
                    color: "#ef4444",
                    bgColor: "#fee2e2",
                    icon: faTimes,
                    description: "Đơn hàng đã bị hủy"
                };
            default:
                return {
                    text: "Không xác định",
                    color: "#6b7280",
                    bgColor: "#f3f4f6",
                    icon: faExclamationTriangle,
                    description: "Trạng thái không xác định"
                };
        }
    };

    const statusInfo = getStatusInfo(status);
    const canReview = status === "completed";
    const canCancel = status === "pending";

    return (
        <>
            {showReviewForm && (
                <ReviewForm 
                    closeForm={() => setShowReviewForm(false)} 
                    orderItems={items} 
                />
            )}
            
            <div className="order-item-container">
                {/* Order Header */}
                <div className="order-header">
                    <div className="order-info">
                        <div className="order-id">
                            <FontAwesomeIcon icon={faReceipt} />
                            <span>Mã đơn hàng: {orderId}</span>
                        </div>
                        <div className="order-date">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span>Ngày đặt: {formatDate(createdAt)}</span>
                        </div>
                    </div>
                    <div 
                        className="status-badge"
                        style={{ 
                            backgroundColor: statusInfo.bgColor,
                            color: statusInfo.color
                        }}
                    >
                        <FontAwesomeIcon icon={statusInfo.icon} />
                        <span>{statusInfo.text}</span>
                    </div>
                </div>

                {/* Status Description */}
                <div className="status-description">
                    <p>{statusInfo.description}</p>
                </div>

                {/* Address Section */}
                {address && (
                    <div className="address-section">
                        <h4>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            Địa chỉ giao hàng
                        </h4>
                        <div className="address-info">
                            <div className="recipient-info">
                                <div className="recipient-name">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>{address?.recipent}</span>
                                </div>
                                <div className="recipient-phone">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <span>{address?.recipentPhone}</span>
                                </div>
                            </div>
                            <div className="address-detail">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <span>{address?.addressDetail}, {address?.ward}, {address?.district}, {address?.city}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products List */}
                <div className="products-section">
                    <h4>Sản phẩm đã đặt</h4>
                    <div className="products-list">
                        {items.map((item, index) => (
                            <div key={`${item.productId}-${index}`} className="product-item">
                                <div className="product-image">
                                    <img 
                                        src={item.imgUrl[0]} 
                                        alt={item.productName}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/80x80?text=No+Image";
                                        }}
                                    />
                                </div>
                                <div className="product-details">
                                    <h5 className="product-name">{item.productName}</h5>
                                    <p className="product-quantity">Số lượng: {item.quantity}</p>
                                    <p className="product-price">{formatNumber(item.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                    <div className="summary-row">
                        <span>Tổng tiền ({items.length} sản phẩm):</span>
                        <span className="total-amount">{formatNumber(total)}</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="order-actions">
                    {canReview && (
                        <button 
                            className="btn btn-primary"
                            onClick={handleReviewClick}
                        >
                            <FontAwesomeIcon icon={faStar} />
                            Đánh giá sản phẩm
                        </button>
                    )}
                    
                    {canCancel && (
                        <button 
                            className="btn btn-secondary"
                            onClick={handleCancelClick}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                            Hủy đơn hàng
                        </button>
                    )}
                    
                    <button className="btn btn-outline">
                        <FontAwesomeIcon icon={faReceipt} />
                        Xem chi tiết
                    </button>
                </div>
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelConfirm && portalContainer && createPortal(
                <div 
                    className="cancel-modal-overlay" 
                    onClick={() => setShowCancelConfirm(false)}
                >
                    <div 
                        className="cancel-modal-content" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h4>Xác nhận hủy đơn hàng</h4>
                        <p>Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể hoàn tác.</p>
                        <div className="confirmation-actions">
                            <button 
                                className="btn btn-danger"
                                onClick={handleCancelOrder}
                            >
                                Hủy đơn hàng
                            </button>
                            <button 
                                className="btn btn-outline"
                                onClick={() => setShowCancelConfirm(false)}
                            >
                                Không
                            </button>
                        </div>
                    </div>
                </div>,
                portalContainer
            )}
        </>
    );
};

export default OrderItem;