import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import CartItem from "./CartItem";
import { useCart } from "../../contexts/CartProvider";
import "./Cart.scss"
import ProductDetail from "../ProductDetail";
import Modal from "../../components/Modal";

const Cart: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const { cart, updateCart } = useCart();
    const [modal, setModal] = useState<boolean>(false);
    const [deleteProduct, setDeleteProduct] = useState<string>("");

    const handleDeleteModal = (productId: string) => {
        setModal(true);
        setDeleteProduct(productId);
    }

    const handleDeleteItem = () => {
        updateCart({
            productId: deleteProduct,
            quantity: 0,
            productName: "",
            price: 0,
            imgUrl: []
        });

        setModal(false);
    }


    return (
        <>
            { modal && <Modal message="Xóa sản phẩm này khỏi giỏ hàng?" confirm={() => handleDeleteItem()} cancel={() => setModal(false)}></Modal>}
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
                            <CartItem 
                                productId={item.productId} 
                                imgSrc={item.imgUrl} 
                                productQuantity={item.quantity} 
                                productName={item.productName} 
                                productPrice={item.price} 
                                deleteItem={(productId: string) => handleDeleteModal(productId)}/>
                        )
                    }
                </div>
                <div className="pay-btn">
                    <button>Thanh toán</button>
                </div>
            </div>
        </>
    );
}

export default Cart;