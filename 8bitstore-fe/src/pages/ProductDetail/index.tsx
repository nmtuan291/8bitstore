import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery, useGetReviewsQuery, useGetCartQuery, useAddCartMutation, useUpdateCartMutation, useGetWishlistQuery, useAddWishlistMutation, useRemoveWishlistMutation } from "../../store/api";
import "./ProductDetail.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCropSimple, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Review from "../../components/Review";
import Toast from "../../components/Toast";
import { CartItem, Product } from "../../interfaces/interfaces";
import { formatNumber } from "../../utils/FormatNumber";
import type { Review as ReviewType } from "../../interfaces/interfaces";

const ProductDetail: React.FC = () => {
    
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [tabSelect, setTabSelect] = useState<number>(0);
    const [showToast, setShowToast] = useState<boolean>(false);
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
        console.log(cart);
        console.log("item: ", item);
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

        console.log("wishlist", wishlistItems);

    }

    return (
        <>
            <div className="">
                { showToast && <Toast /> }
                <div className="product-detail-container">
                    <div className="product-images">
                        <div className="sm-image">
                            {
                                productDetail?.imgUrl
                                .slice(0, 5)
                                .map((image, index) => 
                                    <img 
                                        src={image} 
                                        onClick={() => setCurrentImage(index)}/>
                                )
                            }
                        </div>
                        <div className="main-image">
                            <img 
                                key={productDetail?.imgUrl[currentImage]}
                                src={productDetail?.imgUrl[currentImage]} />
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
                        <div className="product-description">
                            <div className="product-info-select">
                                <span 
                                    className={`${tabSelect === 0 && "selected"}`}
                                    onClick={() => setTabSelect(0)}>Thông tin sản phẩm</span>
                                <span 
                                    className={`${tabSelect === 1 && "selected"} middle-border`}
                                    onClick={() => setTabSelect(1)}>Thông số kỹ thuật </span>
                                <span 
                                    className={`${tabSelect === 2 && "selected"}`}
                                    onClick={() => setTabSelect(2)}>Chính sách bảo hành</span>
                            </div>
                            <div>
                                { tabSelect === 0 && <p className="product-info">{productDetail?.description}</p> }
                                {
                                    tabSelect === 1 &&
                                    <table>
                                        <tbody>
                                        {fields.map(field => (
                                            <tr key={field.key}>
                                                <th>{field.label}</th>
                                                <td>{productDetail?.[field.key as keyof Product]}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                }
                                {
                                    tabSelect === 2 &&
                                    <ul className="warranty-policy">
                                        <li>Sản phẩm được bảo hành chính hãng trong vòng <strong>12 tháng</strong> kể từ ngày mua hàng.</li>
                                        <li>Bảo hành áp dụng cho các lỗi kỹ thuật do nhà sản xuất.</li>
                                        <li>Không áp dụng bảo hành đối với các trường hợp: rơi vỡ, vào nước, tự ý tháo lắp, sửa chữa bởi bên thứ ba không được ủy quyền.</li>
                                        <li>Khách hàng vui lòng giữ hóa đơn mua hàng hoặc phiếu bảo hành để được hỗ trợ nhanh chóng.</li>
                                        <li>Địa điểm bảo hành: Trung tâm bảo hành chính hãng hoặc tại cửa hàng 8bitstore.</li>
                                        <li>Mọi thắc mắc hoặc cần hỗ trợ, vui lòng liên hệ hotline: <strong>1900 1234</strong> hoặc email: <strong>support@8bitstore.vn</strong>.</li>
                                    </ul>
                                }
                            </div>
                        </div>
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
                            <div className="button-wrapper">
                                <button 
                                    className="product-btn cart-btn green-btn"
                                    onClick={() => {
                                        updateCart(cartItem)}}
                                        
                                        >
                                        Thêm vào giỏ hàng
                                </button>
                                <button 
                                    className="product-btn cart-btn purple-btn"
                                    onClick={() => {
                                        updateCart(cartItem);
                                        navigate("/payment");
                                    }}>
                                    Thanh toán ngay
                                </button>
                            </div>
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