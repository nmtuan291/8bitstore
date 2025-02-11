import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { IProduct } from "../../../interfaces/interfaces";

const ProductDetail: React.FC = () => {
    const [ counter, setCounter ] = useState<number>(0);
    const [ productDetail, setProductDetail ] = useState<IProduct | null>(null);
    const { productId } = useParams();

    useEffect(() => {
        try {
            fetch(`http://localhost:8080/get-product-detail/${productId}`)
                .then(response => response.json())
                .then(data => setProductDetail(data.data))
                .catch(error => console.log(error.message))  
        } catch (error: any) {
            console.log(error.message);
        }
    });
    const score: number = 3;
    let remainStars = 5 - score;
    const testString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    return (
        <div className="">
            <div className="product-detail-container">
                <div className="product-images">
                
                </div>
                <div className="product-detail">
                    <div className="product-detail-header">
                        <p className="product-name">{productDetail && productDetail.productName}</p>
                        <div className="wishlist-icon">
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className="product-price-section">
                        <p className="product-price">{productDetail && productDetail.price}</p>
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
                                    />
                                )
                            }   
                        </div>
                    </div>  
                    <p className="product-description">{testString}</p>
                    <div className="product-btn-container">
                        <div className="cart-counter">
                            <p className={`counter-btn ${counter === 0 ? "disabled" : ""}`} onClick={() => setCounter(prev => prev - 1)}>-</p>
                            <p className="counter">{counter}</p>    
                            <p className={`counter-btn`} onClick={() => setCounter(prev => prev + 1)}>+</p>
                        </div>
                        <button className="product-btn cart-btn">Thêm vào giỏ</button>
                        <button className="product-btn buy-now-btn">MUA HÀNG NGAY</button>
                    </div>
                </div>
            </div>
           <div className="review-section">
                asdasdasda
            </div>
        </div>
         
    );
}

export default ProductDetail;