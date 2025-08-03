import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid, faStar, faShoppingCart, faEye } from "@fortawesome/free-solid-svg-icons";
import { Product } from '../../interfaces/interfaces';
import './ProductCard.scss';
import { formatNumber } from '../../utils/FormatNumber';

interface ProductItemProps {
    product: Product;
    viewMode?: 'grid' | 'list';
}

const ProductItem: React.FC<ProductItemProps> = ({ product, viewMode = 'grid' }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    const score = 4; // Mock rating - you can get this from product data
    const reviewCount = 23; // Mock review count
    const formattedPrice = formatNumber(product.price);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        // Add wishlist logic here
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Add quick view logic here
        navigate(`/product/${product.productId}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Add to cart logic here
        console.log('Add to cart:', product.productId);
    };

    const handleProductClick = () => {
        navigate(`/product/${product.productId}`);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`star ${index < score ? 'filled' : 'empty'}`}
            />
        ));
    };

    if (viewMode === 'list') {
        return (
            <div className="product-card list-view" onClick={handleProductClick}>
                <div className="product-image-container">
                    {imageLoading && <div className="image-skeleton"></div>}
                    <img 
                        src={imageError ? '/placeholder-image.png' : product.imgUrl[0]} 
                        alt={product.productName}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={imageLoading ? 'loading' : ''}
                    />
                    <div className="product-overlay">
                        <button 
                            className="overlay-btn wishlist-btn"
                            onClick={handleWishlistToggle}
                        >
                            <FontAwesomeIcon icon={isWishlisted ? faHeartSolid : faHeartRegular} />
                        </button>
                        <button 
                            className="overlay-btn quick-view-btn"
                            onClick={handleQuickView}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                    </div>
                </div>
                
                <div className="product-content">
                    <div className="product-info">
                        <h3 className="product-name" title={product.productName}>
                            {product.productName}
                        </h3>
                        <p className="product-brand">{product.manufacturer}</p>
                        
                        <div className="product-rating">
                            <div className="stars">
                                {renderStars()}
                            </div>
                            <span className="rating-text">({reviewCount} đánh giá)</span>
                        </div>
                        
                        <div className="product-price">
                            <span className="current-price">{formattedPrice}</span>
                        </div>
                    </div>
                    
                    <div className="product-actions">
                        <button 
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-card grid-view" onClick={handleProductClick}>
            <div className="product-image-container">
                {imageLoading && <div className="image-skeleton"></div>}
                <img 
                    src={imageError ? '/placeholder-image.png' : product.imgUrl[0]} 
                    alt={product.productName}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={imageLoading ? 'loading' : ''}
                />
                <div className="product-overlay">
                    <button 
                        className="overlay-btn wishlist-btn"
                        onClick={handleWishlistToggle}
                    >
                        <FontAwesomeIcon icon={isWishlisted ? faHeartSolid : faHeartRegular} />
                    </button>
                    <button 
                        className="overlay-btn quick-view-btn"
                        onClick={handleQuickView}
                    >
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                </div>
                {product.stockNum < 10 && product.stockNum > 0 && (
                    <div className="stock-badge">Chỉ còn {product.stockNum} sản phẩm</div>
                )}
                {product.stockNum === 0 && (
                    <div className="stock-badge out-of-stock">Hết hàng</div>
                )}
            </div>
            
            <div className="product-content">
                <div className="product-info">
                    <h3 className="product-name" title={product.productName}>
                        {product.productName}
                    </h3>
                    <p className="product-brand">{product.manufacturer}</p>
                    
                    <div className="product-rating">
                        <div className="stars">
                            {renderStars()}
                        </div>
                        <span className="rating-text">({reviewCount})</span>
                    </div>
                    
                    <div className="product-price">
                        <span className="current-price">{formattedPrice}</span>
                    </div>
                </div>
                
                <div className="product-actions">
                    <button 
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                        disabled={product.stockNum === 0}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {product.stockNum === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;