import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useGetCartQuery, useAddCartMutation, useUpdateCartMutation, useDeleteCartItemMutation } from "../../store/api";
import "./Cart.scss"
import ProductDetail from "../ProductDetail";
import Modal from "../../components/Modal";

const Cart: React.FC = () => {
    const { data: cart, isLoading, error } = useGetCartQuery();
    const [modal, setModal] = useState<boolean>(false);
    const [deleteProduct, setDeleteProduct] = useState<string>("");
    
    const [deleteCartItem] = useDeleteCartItemMutation(); 

    const navigate = useNavigate();

    const handleDeleteModal = (productId: string) => {
        setModal(true);
        setDeleteProduct(productId);
    }

    const handleDeleteItem = () => {
        deleteCartItem({ productId: deleteProduct });

        setModal(false);
    }

    return (
        <>
            { modal && <Modal message="Xóa sản phẩm này khỏi giỏ hàng?" confirm={() => handleDeleteItem()} cancel={() => setModal(false)}></Modal>}
            <div className="cart-page-bg">
              <div className="cart-container">
                  <div className="cart-header">
                      <label className="don-gia">Đơn giá</label>
                      <label>Số lượng</label>
                      <label>Số tiền</label>
                      <label>Thao tác</label>
                  </div>
                  <div className="cart-list">
                      {isLoading ? (
                        <div className="cart-empty-message">Đang tải giỏ hàng...</div>
                      ) : error ? (
                        <div className="cart-empty-message">Lỗi khi tải giỏ hàng: {error.message}</div>
                      ) : cart?.length === 0 ? (
                        <div className="cart-empty-message">Không có sản phẩm nào trong giỏ hàng</div>
                      ) : (
                        cart.map(item => 
                          <CartItem 
                            key={item.productId}
                            productId={item.productId} 
                            imgSrc={item.imgUrl} 
                            productQuantity={item.quantity} 
                            productName={item.productName} 
                            productPrice={item.price} 
                            deleteItem={(productId: string) => handleDeleteModal(productId)}/>
                        )
                      )}
                  </div>
                  <div className="pay-btn" >
                      <button onClick={() => navigate("/payment")}>Thanh toán</button>
                  </div>
              </div>
            </div>
        </>
    );
}

export default Cart;