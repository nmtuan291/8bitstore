import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrash, 
  faShoppingCart, 
  faHeart,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import "./WishlistItem.scss";
import { formatNumber } from "../../../utils/FormatNumber";

interface WishlistItemProps {
  productId: string;
  imgSrc: string;
  productName: string;
  productPrice: number;
  deleteItem: (productId: string) => void;
  viewMode?: 'grid' | 'list';
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  productId,
  imgSrc,
  productName,
  productPrice,
  deleteItem,
  viewMode = 'grid'
}) => {

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", productId);
  };

  const handleRemoveItem = () => {
    deleteItem(productId);
  };

  return (
    <div className={`wishlist-item ${viewMode}-view`}>
      <div className="item-content">
        {/* Product Image */}
        <div className="product-image">
          <img 
            src={imgSrc || "/default-product.png"} 
            alt={productName}
            onError={(e) => {
              e.currentTarget.src = "/default-product.png";
            }}
          />
          <div className="image-overlay">
            <button 
              className="overlay-btn add-to-cart"
              onClick={handleAddToCart}
              title="Thêm vào giỏ hàng"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h4 className="product-name" title={productName}>
            {productName}
          </h4>
          <p className="product-id">Mã SP: {productId}</p>
          <div className="product-price">
            <span className="price">{formatNumber(productPrice)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="product-actions">
          <button 
            className="action-btn add-cart-btn"
            onClick={handleAddToCart}
            title="Thêm vào giỏ hàng"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Thêm vào giỏ</span>
          </button>
          
          <button 
            className="action-btn remove-btn"
            onClick={handleRemoveItem}
            title="Xóa khỏi danh sách yêu thích"
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Xóa</span>
          </button>
        </div>

        {/* Wishlist Badge */}
        <div className="wishlist-badge">
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;