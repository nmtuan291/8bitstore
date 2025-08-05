import React, { useState, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid, faStar, faShoppingCart, faEye, faSpinner, faCheck, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Product } from '../../interfaces/interfaces';
import { useAddCartMutation, useGetWishlistQuery, useAddWishlistMutation, useRemoveWishlistMutation } from '../../store/api';
import { useToast } from '../../contexts/ToastContext';
import './ProductCard.scss';
import { formatNumber } from '../../utils/FormatNumber';

interface ProductItemProps {
    product: Product;
    viewMode?: 'grid' | 'list';
}

const ProductItem: React.FC<ProductItemProps> = ({ product, viewMode = 'grid' }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [addToCartStatus, setAddToCartStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const navigate = useNavigate();
    
    const [addToCart, { isLoading: isAddingToCart }] = useAddCartMutation();
    const { data: wishlistItems = [] } = useGetWishlistQuery();
    const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddWishlistMutation();
    const [removeFromWishlist, { isLoading: isRemovingFromWishlist }] = useRemoveWishlistMutation();
    
    const { showCartToast, showWishlistToast, showError } = useToast();

    // Check if this product is in the wishlist
    const isWishlisted = useMemo(() => {
        return wishlistItems.some(item => item.productId === product.productId);
    }, [wishlistItems, product.productId]);

    const isWishlistLoading = isAddingToWishlist || isRemovingFromWishlist;

    const score = 4; // Mock rating - you can get this from product data
    const reviewCount = 23; // Mock review count
    const formattedPrice = formatNumber(product.price);

    const handleWishlistToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        try {
            if (isWishlisted) {
                // Remove from wishlist
                await removeFromWishlist({ productId: product.productId }).unwrap();
                showWishlistToast('Đã xóa sản phẩm khỏi danh sách yêu thích');
            } else {
                // Add to wishlist
                await addToWishlist({ productId: product.productId }).unwrap();
                showWishlistToast('Đã thêm sản phẩm vào danh sách yêu thích');
            }
        } catch (error) {
            console.error('Failed to update wishlist:', error);
            showError('Không thể cập nhật danh sách yêu thích');
        }
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/product/${product.productId}`);
    };

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (product.stockNum === 0) return;
        
        const cartItemData = {
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            quantity: 1,
            imgUrl: product.imgUrl
        };
        
        try {
            setAddToCartStatus('loading');
            
            const result = await addToCart(cartItemData).unwrap();
            
            setAddToCartStatus('success');
            showCartToast('Đã thêm sản phẩm vào giỏ hàng');
            
            // Reset status after 2 seconds
            setTimeout(() => {
                setAddToCartStatus('idle');
            }, 2000);
            
        } catch (error) {
            console.error('Failed to add to cart:', error);
            setAddToCartStatus('error');
            showError('Không thể thêm sản phẩm vào giỏ hàng');
            
            // Reset status after 3 seconds
            setTimeout(() => {
                setAddToCartStatus('idle');
            }, 3000);
        }
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

    const renderAddToCartButton = () => {
        const isLoading = addToCartStatus === 'loading' || isAddingToCart;
        const isDisabled = product.stockNum === 0 || isLoading;
        
        let buttonText = 'Thêm vào giỏ';
        let icon = faShoppingCart;
        let buttonClass = 'add-to-cart-btn';
        
        if (product.stockNum === 0) {
            buttonText = 'Hết hàng';
            buttonClass += ' out-of-stock';
        } else if (isLoading) {
            buttonText = 'Đang thêm...';
            icon = faSpinner;
            buttonClass += ' loading';
        } else if (addToCartStatus === 'success') {
            buttonText = 'Đã thêm!';
            icon = faCheck;
            buttonClass += ' success';
        } else if (addToCartStatus === 'error') {
            buttonText = 'Thử lại';
            icon = faExclamationTriangle;
            buttonClass += ' error';
        }
        
        return (
            <button 
                className={buttonClass}
                onClick={handleAddToCart}
                disabled={isDisabled}
            >
                <FontAwesomeIcon 
                    icon={icon} 
                    spin={isLoading}
                />
                {buttonText}
            </button>
        );
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
            <>
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
                                className={`overlay-btn wishlist-btn ${isWishlistLoading ? 'loading' : ''}`}
                                onClick={handleWishlistToggle}
                                disabled={isWishlistLoading}
                            >
                                <FontAwesomeIcon 
                                    icon={isWishlistLoading ? faSpinner : (isWishlisted ? faHeartSolid : faHeartRegular)} 
                                    spin={isWishlistLoading}
                                />
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
                            {renderAddToCartButton()}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
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
                            className={`overlay-btn wishlist-btn ${isWishlistLoading ? 'loading' : ''}`}
                            onClick={handleWishlistToggle}
                            disabled={isWishlistLoading}
                        >
                            <FontAwesomeIcon 
                                icon={isWishlistLoading ? faSpinner : (isWishlisted ? faHeartSolid : faHeartRegular)} 
                                spin={isWishlistLoading}
                            />
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
                        {renderAddToCartButton()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductItem;