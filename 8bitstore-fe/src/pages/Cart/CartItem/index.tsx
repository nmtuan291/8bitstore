import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrash, 
  faPlus, 
  faMinus, 
  faHeart,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import "./CartItem.scss";
import { formatNumber } from "../../../utils/FormatNumber";
import { useUpdateCartMutation } from "../../../store/api";

interface CartItemProps {
  productId: string;
  imgSrc: string[];
  productName: string;
  productPrice: number;
  productQuantity: number;
  deleteItem: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  productId, 
  imgSrc, 
  productName, 
  productPrice, 
  productQuantity,
  deleteItem
}) => {
  const [productCount, setProductCount] = useState<number>(productQuantity);
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();

  const totalPrice = productCount * productPrice;

  // Update local state when props change
  useEffect(() => {
    setProductCount(productQuantity);
  }, [productQuantity]);

  const handleDeleteItem = () => {
    deleteItem(productId);
  };

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await updateCart({
        productId: productId,
        quantity: newQuantity,
        productName: productName,
        price: productPrice,
        imgUrl: imgSrc
      }).unwrap();
      setProductCount(newQuantity);
    } catch (error) {
      // Revert to previous state on error
      setProductCount(productQuantity);
    }
  };

  const handleQuantityIncrease = () => {
    const newQuantity = productCount + 1;
    setProductCount(newQuantity);
    updateQuantity(newQuantity);
  };

  const handleQuantityDecrease = () => {
    if (productCount <= 1) return;
    const newQuantity = productCount - 1;
    setProductCount(newQuantity);
    updateQuantity(newQuantity);
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value > 0 && value <= 99) {
      setProductCount(value);
    }
  };

  const handleQuantityBlur = () => {
    if (productCount !== productQuantity) {
      updateQuantity(productCount);
    }
  };

  const handleMoveToWishlist = () => {
    // TODO: Implement move to wishlist functionality
    // After successful move, delete from cart
    // deleteItem(productId);
  };

  return (
    <div className="cart-item">
      <div className="item-content">
        <div className="product-section">
          <div className="product-image">
            <img 
              src={imgSrc?.[0] || "/default-product.png"} 
              alt={productName}
              onError={(e) => {
                e.currentTarget.src = "/default-product.png";
              }}
            />
          </div>
          <div className="product-info">
            <h4 className="product-name">{productName}</h4>
            <p className="product-id">Mã SP: {productId}</p>
            <div className="product-actions">
              <button 
                className="action-btn wishlist-btn"
                onClick={handleMoveToWishlist}
                title="Chuyển vào danh sách yêu thích"
              >
                <FontAwesomeIcon icon={faHeart} />
                Yêu thích
              </button>
            </div>
          </div>
        </div>
        <div className="price-section">
          <span className="price">{formatNumber(productPrice)}</span>
        </div>
        <div className="quantity-section">
          <div className="quantity-controls">
            <button 
              className="qty-btn decrease"
              onClick={handleQuantityDecrease}
              disabled={productCount <= 1 || isUpdating}
              title="Giảm số lượng"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="number"
              className="qty-input"
              value={productCount}
              onChange={handleQuantityInput}
              onBlur={handleQuantityBlur}
              disabled={isUpdating}
              min="1"
              max="99"
            />
            <button 
              className="qty-btn increase"
              onClick={handleQuantityIncrease}
              disabled={isUpdating || productCount >= 99}
              title="Tăng số lượng"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          {isUpdating && (
            <div className="updating-indicator">
              <FontAwesomeIcon icon={faSpinner} spin />
              Đang cập nhật...
            </div>
          )}
        </div>
        <div className="total-section">
          <span className="total-price">{formatNumber(totalPrice)}</span>
          <span className="savings">
            {productCount > 1 && `(${formatNumber(productPrice)} × ${productCount})`}
          </span>
        </div>
        <div className="actions-section">
          <button 
            className="delete-btn"
            onClick={handleDeleteItem}
            title="Xóa khỏi giỏ hàng"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  ); 
};

export default CartItem;