import { useState, useEffect } from "react";
import "./Order.scss"
import OrderItem from "./OrderItem";
import axios from "../../../apis/axios";
import type { OrderItem as OrderItemType } from "../../../interfaces/interfaces";

interface OrderData {
    items: OrderItemType[];
    orderId: string;
    total: number;
    status: string;
    orderDate: string;
}

const Order: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<number>(0);
    const [orders, setOrders] = useState<OrderData[]>([]);

    // Remove useEffect+axios logic

    const filteredOrders = orders;

    return (
        <div className="order-container">
            <div className="order-filter">
                <ul>
                    <li className={`${selectedFilter === 0 && "selected"}`} onClick={() => setSelectedFilter(0)}>Tất cả</li>
                    <li className={`${selectedFilter === 1 && "selected"}`} onClick={() => setSelectedFilter(1)}>Đang xử lý</li>
                    <li className={`${selectedFilter === 2 && "selected"}`} onClick={() => setSelectedFilter(2)}>Vận chuyển</li>
                    <li className={`${selectedFilter === 3 && "selected"}`} onClick={() => setSelectedFilter(3)}>Hoàn thành</li>
                    <li className={`${selectedFilter === 4 && "selected"}`} onClick={() => setSelectedFilter(4)}>Đã hủy</li>
                </ul>
            </div>
            {
                    orders.map((order, index) => (
                        <div className="order-list">
                            <OrderItem 
                                key={index} 
                                items={order.items} 
                                orderId={order.orderId} 
                                total={order.total}
                                status={order.status}
                                createdAt={order.orderDate}/>
                        </div>
                    ))
            }
            {
                filteredOrders.length === 0 &&
                <div>
                    <p>Không có đơn hàng nào</p>
                </div>
            }
        </div>
    )
}

export default Order;