import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShoppingCart, 
  faArrowLeft, 
  faTrash, 
  faHeart,
  faShoppingBag,
  faGift,
  faPercent,
  faLock,
  faUser,
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faCreditCard
} from "@fortawesome/free-solid-svg-icons";
import CartItem from "./CartItem";
import { 
  useGetCartQuery, 
  useDeleteCartItemMutation, 
  useGetCurrentUserQuery, 
  useCreatePaymentUrlMutation,
  useGetAddressQuery
} from "../../store/api";
import "./Cart.scss";
import Modal from "../../components/Modal";
import LoadingOverlay from "../../components/LoadingOverlay";
import { formatNumber } from "../../utils/FormatNumber";

const Cart: React.FC = () => {
  const { data: cart, isLoading, error } = useGetCartQuery();
  const { data: user } = useGetCurrentUserQuery();
  const [modal, setModal] = useState<boolean>(false);
  const [deleteProduct, setDeleteProduct] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paymentClicked, setPaymentClicked] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("1");
  
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [createPaymentUrl, { isLoading: isPaymentLoading }] = useCreatePaymentUrlMutation();

  const {data: addresses, isLoading: addressLoading} = useGetAddressQuery();

  const navigate = useNavigate();



  // Calculate totals
  const cartTotals = useMemo(() => {
    if (!cart || cart.length === 0) {
      return {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        itemCount: 0
      };
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal > 500000 ? 0 : 30000; // Free shipping over 500k VND
    const tax = Math.floor(subtotal * 0.1); // 10% tax
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
      itemCount
    };
  }, [cart]);

  const handleDeleteModal = (productId: string) => {
    setModal(true);
    setDeleteProduct(productId);
  };

  const handleDeleteItem = () => {
    deleteCartItem({ productId: deleteProduct });
    setModal(false);
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleCheckout = () => {
    if (cart && cart.length > 0) {
      navigate("/payment");
    }
  };

  const handlePaymentClick = async () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }

    setPaymentClicked(true);
    if (paymentMethod === "VNPAY") {
      try {
        const response = await createPaymentUrl({ amount: cartTotals.total.toString() }).unwrap();
        window.open(response.result, "_blank");
      } catch (error) {
        console.log(error);
      }
    } else if (paymentMethod === "COD") {
      navigate("/payment-process/COD");
    }
  };

  // Handle payment result checking for VNPay
  useEffect(() => {
    const handlePaymentResult = () => {
      const storedResult = localStorage.getItem("paymentResult");
      if (storedResult) {
        const paymentResult = JSON.parse(storedResult);
        if (paymentResult.responseCode === "00") {
          navigate("/payment-result");
          console.log(paymentResult.responseCode);
        }
      }
    };

    let interval: NodeJS.Timeout;
    if (paymentClicked && paymentMethod === "VNPAY") {
      handlePaymentResult();
      interval = setInterval(handlePaymentResult, 1000);
    }
    return () => clearInterval(interval);
  }, [paymentClicked, paymentMethod, navigate]);

  if (isLoading) {
    return (
      <div className="cart-loading">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {(isPaymentLoading) && <LoadingOverlay />}
      {modal && (
        <Modal 
          message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?" 
          confirm={handleDeleteItem} 
          cancel={() => setModal(false)}
        />
      )}
      
      <div className="cart-page">
        <div className="cart-container">
          {/* Header */}
          <div className="cart-header">
            <div className="header-content">
              <button className="back-btn" onClick={handleContinueShopping}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Tiếp tục mua sắm
              </button>
              
              <div className="header-info">
                <h1>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Giỏ hàng của bạn
                </h1>
                <p>
                  {cartTotals.itemCount > 0 
                    ? `${cartTotals.itemCount} sản phẩm trong giỏ hàng`
                    : "Giỏ hàng đang trống"
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="cart-content">
            {/* Cart Items Section */}
            <div className="cart-items-section">
              {error || cart?.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-content">
                    <FontAwesomeIcon icon={faShoppingCart} className="empty-icon" />
                    <h3>Giỏ hàng của bạn đang trống</h3>
                    <p>Khám phá các sản phẩm tuyệt vời và thêm vào giỏ hàng!</p>
                    <button className="shop-now-btn" onClick={handleContinueShopping}>
                      <FontAwesomeIcon icon={faShoppingBag} />
                      Mua sắm ngay
                    </button>
                  </div>
                </div>
              ) : (
                <div className="cart-items">
                  <div className="items-header">
                    <div className="header-grid">
                      <span className="col-product">Sản phẩm</span>
                      <span className="col-price">Đơn giá</span>
                      <span className="col-quantity">Số lượng</span>
                      <span className="col-total">Thành tiền</span>
                      <span className="col-actions">Thao tác</span>
                    </div>
                  </div>
                  
                  <div className="items-list">
                    {cart?.map(item => (
                      <CartItem 
                        key={item.productId}
                        productId={item.productId} 
                        imgSrc={item.imgUrl} 
                        productQuantity={item.quantity} 
                        productName={item.productName} 
                        productPrice={item.price} 
                        deleteItem={handleDeleteModal}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cart && cart.length > 0 && (
              <div className="order-summary">
                <div className="summary-card">
                  <h3>
                    <FontAwesomeIcon icon={faGift} />
                    Tóm tắt đơn hàng
                  </h3>

                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Tạm tính ({cartTotals.itemCount} sản phẩm)</span>
                      <span>{formatNumber(cartTotals.subtotal)}</span>
                    </div>
                    
                    <div className="summary-row">
                      <span>Phí vận chuyển</span>
                      <span className={cartTotals.shipping === 0 ? 'free-shipping' : ''}>
                        {cartTotals.shipping === 0 ? 'Miễn phí' : formatNumber(cartTotals.shipping)}
                      </span>
                    </div>
                    
                    <div className="summary-row">
                      <span>Thuế VAT (10%)</span>
                      <span>{formatNumber(cartTotals.tax)}</span>
                    </div>

                    {cartTotals.shipping === 0 && cartTotals.subtotal < 500000 && (
                      <div className="shipping-notice">
                        <FontAwesomeIcon icon={faGift} />
                        Thêm {formatNumber(500000 - cartTotals.subtotal)} để được miễn phí vận chuyển
                      </div>
                    )}
                  </div>

                  <div className="summary-total">
                    <div className="total-row">
                      <span>Tổng cộng</span>
                      <span className="total-amount">{formatNumber(cartTotals.total)}</span>
                    </div>
                  </div>

                  <div className="checkout-section">
                    <div className="payment-badges">
                      <span className="badge">🔒 Thanh toán an toàn</span>
                      <span className="badge">📱 Hỗ trợ ví điện tử</span>
                    </div>
                  </div>
                </div>

                {/* User Delivery Information - Updated CSS v2 */}
                <div className="delivery-info-card">
                  <h3>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    Chọn địa chỉ giao hàng
                  </h3>
                  
                  <div className="address-selection">
                    {(addresses ?? []).map(address => (
                      <div key={address.id} className="address-item">
                        <input 
                          type="radio" 
                          id={`addr-${address.id}`} 
                          name="delivery-address"
                          value={address.id ?? ""}
                          checked={selectedAddress === address.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                        />
                        <label htmlFor={`addr-${address.id}`} className="address-label">
                          <div className="address-header">
                            <span className="address-title">{address.title}</span>
                            {address.isDefault && <span className="default-badge">Mặc định</span>}
                          </div>
                          <div className="address-details">
                            <div className="name-phone">
                              <FontAwesomeIcon icon={faUser} />
                              <span>{address.recipent}</span>
                              <FontAwesomeIcon icon={faPhone} />
                              <span>{address.recipentPhone}</span>
                            </div>
                            <div className="address-text">
                              <FontAwesomeIcon icon={faMapMarkerAlt} />
                              <span>{address.addressDetail}</span>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="payment-methods-card">
                  <h3>
                    <FontAwesomeIcon icon={faCreditCard} />
                    Phương thức thanh toán
                  </h3>
                  
                  <div className="payment-options">
                    <div className="payment-option">
                      <input 
                        type="radio" 
                        id="cod" 
                        name="payment"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="cod">
                        <div className="payment-info">
                          <span className="payment-title">Thanh toán khi giao hàng (COD)</span>
                          <span className="payment-desc">8bitstore hỗ trợ giao hàng và thu tiền tận nơi</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="payment-option">
                      <input 
                        type="radio" 
                        id="vnpay" 
                        name="payment"
                        value="VNPAY"
                        checked={paymentMethod === "VNPAY"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="vnpay">
                        <div className="payment-info">
                          <span className="payment-title">Thanh toán qua VNPay</span>
                          <span className="payment-desc">Thanh toán trực tuyến qua ví điện tử VNPay</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="final-checkout-section">
                    <button 
                      className="final-checkout-btn" 
                      onClick={handlePaymentClick}
                      disabled={!paymentMethod || cart?.length === 0}
                    >
                      <FontAwesomeIcon icon={faLock} />
                      Hoàn tất thanh toán
                      <span className="final-amount">{formatNumber(cartTotals.total)}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;