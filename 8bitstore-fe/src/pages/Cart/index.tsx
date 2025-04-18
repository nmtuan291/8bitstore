import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import CartItem from "./CartItem";
import { useCart } from "../../contexts/CartProvider";
import "./Cart.scss"
import ProductDetail from "../ProductDetail";

const Cart: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const { cart } = useCart();

    return (
        <div className="cart-container">
            <div className="cart-header">
                <label className="don-gia">Đơn giá</label>
                <label>Số lượng</label>
                <label>Số tiền</label>
                <label>Thao tác</label>
            </div>
            <div className="cart-list">
                {
                    cart.map(item => 
                        <CartItem productId={item.productId} imgSrc={item.imgUrl} productQuantity={item.quantity} productName={item.productName} productPrice={item.price}/>
                    )
                }
            </div>
            <div className="pay-btn">
                <button>Thanh toán</button>
            </div>
        </div>
    );
}

export default Cart;