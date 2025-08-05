import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeart, 
  faArrowLeft, 
  faShoppingCart,
  faShoppingBag,
  faTh,
  faList,
  faSearch,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import WishlistItem from "./WishlistItem";
import { useGetWishlistQuery, useRemoveWishlistMutation } from "../../store/api";
import Modal from "../../components/Modal";
import "./Wishlist.scss";
import Loader from "../../components/LoadingOverlay/Loader";

const Wishlist: React.FC = () => {
  const { data: wishlistItems, isLoading, isError } = useGetWishlistQuery();
  const [removeWishlist] = useRemoveWishlistMutation();
  const [modal, setModal] = useState<boolean>(false);
  const [deleteProduct, setDeleteProduct] = useState<string>("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const handleDeleteModal = (productId: string) => {
    setModal(true);
    setDeleteProduct(productId);
  };


  const handleDeleteItem = async () => {
    try {
      await removeWishlist({ productId: deleteProduct }).unwrap();
      setModal(false);
    } catch (error) {
      setModal(false);
    }
  };
  const handleContinueShopping = () => {
    navigate("/product");
  };

  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return wishlistItems || [];
    
    return (wishlistItems || []).filter(item =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [wishlistItems, searchQuery]);

  if (isLoading) {
    return (
      <div className="wishlist-loading">
        <Loader />
        <p>Đang tải danh sách yêu thích...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wishlist-error">
        <div className="error-content">
          <FontAwesomeIcon icon={faHeart} className="error-icon" />
          <h3>Không thể tải danh sách yêu thích</h3>
          <p>Có lỗi xảy ra khi tải danh sách. Vui lòng thử lại sau.</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {modal && (
        <Modal 
          message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?" 
          confirm={handleDeleteItem} 
          cancel={() => setModal(false)}
        />
      )}
      
      <div className="wishlist-page">
        <div className="wishlist-container">
          {/* Header */}
          <div className="wishlist-header">
            <div className="header-content">
              <button className="back-btn" onClick={handleContinueShopping}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Tiếp tục mua sắm
              </button>
              
              <div className="header-info">
                <h1>
                  <FontAwesomeIcon icon={faHeart} />
                  Danh sách yêu thích
                </h1>
                <p>
                  {filteredItems.length > 0 
                    ? `${filteredItems.length} sản phẩm trong danh sách yêu thích`
                    : "Chưa có sản phẩm yêu thích nào"
                  }
                </p>
              </div>
            </div>
          </div>
          {wishlistItems && wishlistItems.length > 0 && (
            <div className="wishlist-controls">
              <div className="controls-content">
                <div className="search-section">
                  <div className="search-box">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm yêu thích..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>

                <div className="view-controls">
                  <span className="view-label">Hiển thị:</span>
                  <div className="view-buttons">
                    <button
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Hiển thị dạng lưới"
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      title="Hiển thị dạng danh sách"
                    >
                      <FontAwesomeIcon icon={faList} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="wishlist-content">
            {filteredItems.length > 0 ? (
              <div className={`wishlist-items ${viewMode}-view`}>
                {filteredItems.map(item => (
                  <WishlistItem 
                    key={item.productId}
                    productId={item.productId} 
                    productName={item.productName} 
                    productPrice={item.price} 
                    imgSrc={item.imgUrl?.[0] || ""}
                    deleteItem={handleDeleteModal}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : wishlistItems && wishlistItems.length > 0 ? (
              // No search results
              <div className="no-results">
                <div className="no-results-content">
                  <FontAwesomeIcon icon={faSearch} className="no-results-icon" />
                  <h3>Không tìm thấy sản phẩm</h3>
                  <p>Không có sản phẩm nào phù hợp với từ khóa "{searchQuery}"</p>
                  <button 
                    className="clear-search-btn"
                    onClick={() => setSearchQuery("")}
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            ) : (
              // Empty wishlist
              <div className="empty-wishlist">
                <div className="empty-content">
                  <FontAwesomeIcon icon={faHeart} className="empty-icon" />
                  <h3>Danh sách yêu thích đang trống</h3>
                  <p>Thêm các sản phẩm bạn yêu thích để dễ dàng theo dõi và mua sắm sau!</p>
                  <button className="shop-now-btn" onClick={handleContinueShopping}>
                    <FontAwesomeIcon icon={faShoppingBag} />
                    Khám phá sản phẩm
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {filteredItems.length > 0 && (
            <div className="quick-actions">
              <div className="actions-content">
                <div className="action-stats">
                  <FontAwesomeIcon icon={faStar} />
                  <span>Bạn có {filteredItems.length} sản phẩm yêu thích</span>
                </div>
                
                <button 
                  className="add-all-to-cart-btn"
                  onClick={() => {
                    // TODO: Implement add all to cart functionality
                    console.log("Add all to cart");
                  }}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  Thêm tất cả vào giỏ hàng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;