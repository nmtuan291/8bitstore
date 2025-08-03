import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery, useGetReviewsQuery, useGetCartQuery, useAddCartMutation, useUpdateCartMutation, useGetWishlistQuery, useAddWishlistMutation, useRemoveWishlistMutation } from "../../store/api";
import "./ProductDetail.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faShoppingCart, faHeart, faShare, faShieldHalved, faTruck, faUndo } from "@fortawesome/free-solid-svg-icons";
import Review from "../../components/Review";
import Toast from "../../components/Toast";
import { CartItem, Product } from "../../interfaces/interfaces";
import { formatNumber } from "../../utils/FormatNumber";
import type { Review as ReviewType } from "../../interfaces/interfaces";

const ProductDetail: React.FC = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [tabSelect, setTabSelect] = useState<number>(0);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [imageLoading, setImageLoading] = useState<boolean>(true);
    const { productId } = useParams();
    const navigate = useNavigate();
    const [addCart] = useAddCartMutation();
    const [updateCart] = useUpdateCartMutation();
    const { data: cart = [] } = useGetCartQuery();
    const { data: wishlistItems = [] } = useGetWishlistQuery();
    const [addWishlist] = useAddWishlistMutation();
    const [removeWishlist] = useRemoveWishlistMutation();

    const { data: productDetail, isLoading } = useGetProductQuery(productId || "");
    const { data: reviews = [] } = useGetReviewsQuery(productId || "");

    const [cartItem, setCartItem] = useState<CartItem>({
        productId: "",
        productName: "",
        price: 0,
        imgUrl: [],
        quantity: 0
    });

    const fields = [
        { label: "Tên sản phẩm", key: "productName" },
        { label: "Nhà sản xuất", key: "manufacturer" },
        { label: "Kích thước", key: "dimension" },
        { label: "Loại sản phẩm", key: "type" },
        { label: "Cân nặng", key: "weight" },
        { label: "Màu sắc", key: "color" },
        { label: "Kích thước ổ cứng", key: "internalStorage" },
    ];
    
    useEffect(() => {
        const item = cart.find((cartItem: CartItem) => cartItem.productId === productId);
        if (item) {
            if (
                cartItem.productId !== item.productId ||
                cartItem.quantity !== item.quantity
            ) {
                setCartItem(item);
            }
        } else if (!isLoading && productDetail) {
            if (cartItem.productId !== productDetail.productId) {
                setCartItem({
                    productId: productDetail.productId,
                    productName: productDetail.productName,
                    price: productDetail.price,
                    imgUrl: productDetail.imgUrl,
                    quantity: 0
                });
            }
        }
    }, [isLoading, cart, productId, productDetail]);

    const score: number = 3;
    let remainStars = 5 - score;

    const handleWishlistClick = () => {
        const item = wishlistItems.find(i => i.productId === productId);
        if (!item && productId && productDetail) {
            addWishlist({ productId });
            setShowToast(true);
        } else if (item && productId) {
            removeWishlist({ productId });
        }
    }

    const handleImageLoad = () => {
        setImageLoading(false);
    }

    const handleQuantityChange = (action: 'increase' | 'decrease') => {
        setCartItem(prev => ({
            ...prev,
            quantity: action === 'increase' 
                ? prev.quantity + 1 
                : Math.max(0, prev.quantity - 1)
        }));
    }

    const isInWishlist = wishlistItems?.find(item => item.productId === productId);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            {showToast && <Toast />}
            
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <div className="container">
                    <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
                    <span className="breadcrumb-separator">/</span>
                    <span onClick={() => navigate('/products')} className="breadcrumb-link">Products</span>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{productDetail?.productName}</span>
                </div>
            </div>

            {/* Main Product Section */}
            <div className="product-main-section">
                <div className="container">
                    <div className="product-layout">
                        
                        {/* Product Gallery */}
                        <div className="product-gallery">
                            <div className="gallery-main">
                                {imageLoading && <div className="image-loading"></div>}
                                <img 
                                    src={productDetail?.imgUrl[currentImage]} 
                                    alt={productDetail?.productName}
                                    onLoad={handleImageLoad}
                                    className={imageLoading ? 'loading' : ''}
                                />
                                <div className="image-controls">
                                    <button className="zoom-btn">🔍</button>
                                    <button className="share-btn">
                                        <FontAwesomeIcon icon={faShare} />
                                    </button>
                                </div>
                            </div>
                            <div className="gallery-thumbnails">
                                {productDetail?.imgUrl.slice(0, 5).map((image, index) => (
                                    <div 
                                        key={index}
                                        className={`thumbnail ${index === currentImage ? 'active' : ''}`}
                                        onClick={() => setCurrentImage(index)}
                                    >
                                        <img src={image} alt={`${productDetail.productName} ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="product-info">
                            <div className="product-header">
                                <div className="product-title-section">
                                    <h1 className="product-title">{productDetail?.productName}</h1>
                                    <div className="product-meta">
                                        <span className="brand">{productDetail?.manufacturer}</span>
                                        <span className="stock-status in-stock">✓ In Stock</span>
                                    </div>
                                </div>
                                <button 
                                    className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                                    onClick={handleWishlistClick}
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                </button>
                            </div>

                            <div className="rating-section">
                                <div className="stars">
                                    {Array.from({ length: score }, (_, index) => (
                                        <FontAwesomeIcon key={index} icon={faStar} className="star filled" />
                                    ))}
                                    {Array.from({ length: remainStars }, (_, index) => (
                                        <FontAwesomeIcon key={index} icon={faStar} className="star empty" />
                                    ))}
                                </div>
                                <span className="rating-text">({score}/5) • {reviews.length} reviews</span>
                            </div>

                            <div className="price-section">
                                <div className="current-price">{productDetail && formatNumber(productDetail.price)}</div>
                                <div className="price-info">
                                    <span className="tax-info">VAT included</span>
                                </div>
                            </div>

                            <div className="purchase-section">
                                <div className="quantity-selector">
                                    <label>Quantity:</label>
                                    <div className="quantity-controls">
                                        <button 
                                            className={`qty-btn ${cartItem.quantity === 0 ? 'disabled' : ''}`}
                                            onClick={() => handleQuantityChange('decrease')}
                                            disabled={cartItem.quantity === 0}
                                        >
                                            −
                                        </button>
                                        <span className="quantity">{cartItem.quantity}</span>
                                        <button 
                                            className="qty-btn"
                                            onClick={() => handleQuantityChange('increase')}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="action-buttons">
                                    <button 
                                        className="btn btn-cart"
                                        onClick={() => updateCart(cartItem)}
                                        disabled={cartItem.quantity === 0}
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} />
                                        Add to Cart
                                    </button>
                                    <button 
                                        className="btn btn-buy"
                                        onClick={() => {
                                            updateCart(cartItem);
                                            navigate("/payment");
                                        }}
                                        disabled={cartItem.quantity === 0}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                            <div className="features-section">
                                <div className="feature-item">
                                    <FontAwesomeIcon icon={faTruck} />
                                    <span>Free shipping on orders over $50</span>
                                </div>
                                <div className="feature-item">
                                    <FontAwesomeIcon icon={faShieldHalved} />
                                    <span>12 months warranty</span>
                                </div>
                                <div className="feature-item">
                                    <FontAwesomeIcon icon={faUndo} />
                                    <span>30-day return policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="product-details-section">
                <div className="container">
                    <div className="tabs-container">
                        <div className="tabs-header">
                            <button 
                                className={`tab-btn ${tabSelect === 0 ? 'active' : ''}`}
                                onClick={() => setTabSelect(0)}
                            >
                                Description
                            </button>
                            <button 
                                className={`tab-btn ${tabSelect === 1 ? 'active' : ''}`}
                                onClick={() => setTabSelect(1)}
                            >
                                Specifications
                            </button>
                            <button 
                                className={`tab-btn ${tabSelect === 2 ? 'active' : ''}`}
                                onClick={() => setTabSelect(2)}
                            >
                                Warranty
                            </button>
                        </div>
                        
                        <div className="tabs-content">
                            {tabSelect === 0 && (
                                <div className="tab-panel description-panel">
                                    <h3>Product Description</h3>
                                    <p className="description-text">{productDetail?.description}</p>
                                </div>
                            )}
                            
                            {tabSelect === 1 && (
                                <div className="tab-panel specifications-panel">
                                    <h3>Technical Specifications</h3>
                                    <div className="specs-grid">
                                        {fields.map(field => (
                                            <div key={field.key} className="spec-row">
                                                <span className="spec-label">{field.label}</span>
                                                <span className="spec-value">{productDetail?.[field.key as keyof Product]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {tabSelect === 2 && (
                                <div className="tab-panel warranty-panel">
                                    <h3>Warranty Policy</h3>
                                    <div className="warranty-content">
                                        <div className="warranty-item">
                                            <h4>🛡️ Warranty Coverage</h4>
                                            <p>12 months official warranty from purchase date covering manufacturing defects.</p>
                                        </div>
                                        <div className="warranty-item">
                                            <h4>✅ What's Covered</h4>
                                            <ul>
                                                <li>Manufacturing defects and technical issues</li>
                                                <li>Parts replacement for defective components</li>
                                                <li>Free repair services at authorized centers</li>
                                            </ul>
                                        </div>
                                        <div className="warranty-item">
                                            <h4>❌ What's Not Covered</h4>
                                            <ul>
                                                <li>Physical damage from drops or impacts</li>
                                                <li>Water damage or liquid spills</li>
                                                <li>Unauthorized repairs or modifications</li>
                                                <li>Normal wear and tear</li>
                                            </ul>
                                        </div>
                                        <div className="warranty-contact">
                                            <p><strong>Support:</strong> 1900 1234 | support@8bitstore.vn</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <div className="container">
                    <div className="reviews-header">
                        <h2>Customer Reviews</h2>
                        <div className="reviews-summary">
                            <div className="rating-overview">
                                <div className="avg-rating">
                                    <span className="rating-number">{score}.0</span>
                                    <div className="rating-stars">
                                        {Array.from({ length: score }, (_, index) => (
                                            <FontAwesomeIcon key={index} icon={faStar} className="star filled" />
                                        ))}
                                        {Array.from({ length: remainStars }, (_, index) => (
                                            <FontAwesomeIcon key={index} icon={faStar} className="star empty" />
                                        ))}
                                    </div>
                                    <span className="review-count">Based on {reviews.length} reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="reviews-list">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <Review
                                    key={review.productId}
                                    userId={review.productId}
                                    userName={review.userName}
                                    score={review.score}
                                    comment={review.comment}
                                />
                            ))
                        ) : (
                            <div className="no-reviews">
                                <p>No reviews yet. Be the first to review this product!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;