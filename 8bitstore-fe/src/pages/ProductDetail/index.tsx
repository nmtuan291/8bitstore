import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../apis/axios";
import { useCart } from "../../contexts/CartProvider";
import { useWishlist } from "../../contexts/WishlistProvider";
import "./ProductDetail.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Review from "../../components/Review";
import Toast from "../../components/Toast";
import { CartItem, Product } from "../../interfaces/interfaces";
import { formatNumber } from "../../utils/FormatNumber";
import type { Review as ReviewType } from "../../interfaces/interfaces";

const ProductDetail: React.FC = () => {
    const [cartItem, setCartItem] = useState<CartItem>({
        productId: "",
        quantity: 0,
        productName: "",
        price: 0,
        imgUrl: []
    });
    const [productDetail, setProductDetail] = useState<Product | null>(null);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [showToast, setShowToast] = useState<boolean>(false);
    const { productId } = useParams();
    const { cart, updateCart } = useCart();
    const { wishlistItems, addItem, removeItem} = useWishlist();
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/Product/get-product?ProductId=${productId}`);
                const reviewResponse = await axios.get(`/api/Review/get-reviews?ProductId=${productId}`);
                setProductDetail(response.data);
                setReviews(reviewResponse.data);
            } catch (error) {
                console.log(error);
            }
            
        })();
    }, []);

    useEffect(() => {
        const item = cart.find(cartItem => cartItem.productId === productId)
        if (item) {
            setCartItem({...item});
        } else {
            if (productDetail) {
                const newItem: CartItem = {
                    productId: productDetail.productId,
                    productName: productDetail.productName,
                    price: productDetail.price,
                    imgUrl: productDetail.imgUrl,
                    quantity: 0
                }

                setCartItem(newItem);
            }
        }
    }, [productDetail])

    const score: number = 3;
    let remainStars = 5 - score;

    const handleWishlistClick = () => {
        const item = wishlistItems.find(i => i.productId === productId);
        if (!item && productId && productDetail) {
            addItem(productId, productDetail.productName, productDetail.imgUrl, productDetail.price);
            console.log("this");
            setShowToast(true);
        
        } else if (item && productId) {
            removeItem(productId);
        }

    }

    return (
        <>
            <div className="">
                { showToast && <Toast /> }
                <div className="product-detail-container">
                    <div className="product-images">
                        <div className="sm-image">
                            <img src={productDetail?.imgUrl[0]}></img>
                            <img src={productDetail?.imgUrl[0]}></img>
                            <img src={productDetail?.imgUrl[0]}></img>
                            <img src={productDetail?.imgUrl[0]}></img>
                        </div>
                        <div className="main-image">
                            <img src={productDetail?.imgUrl[0]}></img>
                        </div>
                    </div>
                    <div className="product-detail">
                        <div className="product-detail-header">
                            <p className="product-name">{productDetail && productDetail.productName}</p>
                            {
                                <div 
                                className={`wishlist-icon ${wishlistItems?.length && wishlistItems.find(item => item.productId === productId) && "added"}`}
                                onClick={handleWishlistClick}
                            >
                                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                            </div>
                            }
                        </div>
                        <div className="product-price-section">
                            <p className="product-price">{productDetail && formatNumber(productDetail.price)}</p>
                            <div className="review-stars">
                                {
                                Array.from({ length: score }, (_, __) => 
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                            style={{color: "yellow"}}
                                        />
                                    )
                                }
                                {
                                    Array.from({ length: remainStars }, (_, __) => 
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                            style={{color: "#CFCFCF"}}
                                        />
                                    )
                                }   
                            </div>
                        </div>  
                        <p className="product-description">{productDetail?.description}</p>
                        <div className="product-btn-container">
                            <div className="cart-counter">
                                <p 
                                    className={`counter-btn ${cartItem.quantity === 0 ? "disabled" : ""}`} 
                                    onClick={() => setCartItem(prev => ({...prev, quantity: prev.quantity - 1})
                                    )}
                                >
                                        -
                                </p>
                                <p className="counter">{cartItem.quantity}</p>    
                                <p 
                                    className={`counter-btn`} 
                                    onClick={() => setCartItem(prev => ({...prev, quantity: prev.quantity + 1}))}
                                >
                                    +
                                </p>
                            </div>
                            <button 
                                className="product-btn cart-btn"
                                onClick={() => updateCart(cartItem)}
                            >
                                    Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            <div className="review-section">
                <h4>Đánh giá sản phẩm</h4>
                    {
                        reviews.map(review => (
                            <Review
                                key={review.productId}
                                userId={review.productId}
                                userName={review.userName}
                                score={review.score}
                                comment={review.comment}
                            />
                        ))
                    }
                </div>
            </div>
        </>
        
         
    );
}

export default ProductDetail;