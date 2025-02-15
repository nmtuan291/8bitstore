import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import CartItem from "./CartItem";
import "./Cart.scss"

const Cart: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <label className="don-gia">Đơn giá</label>
                <label>Số lượng</label>
                <label>Số tiền</label>
                <label>Thao tác</label>
            </div>
            <div className="cart-list">
                <CartItem imgSrc="" productCount={3} productName="asda" productPrice={1231}/>
            </div>
        </div>
    );
}

export default Cart;