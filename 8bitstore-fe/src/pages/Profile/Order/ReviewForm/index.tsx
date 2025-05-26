import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ReviewForm.scss";
import { OrderItem } from "../../../../interfaces/interfaces";
import axios from "../../../../apis/axios";

interface ReviewFormProps {
  closeForm: () => void;
  orderItems: OrderItem[];
}

const ReviewForm: React.FC<ReviewFormProps> = ({ closeForm, orderItems }) => {
  const [starHover, setStarHover] = useState<number | null> (null);
  const [selectedStar, setSelectedStar] = useState<number>(-1);
  const scores = [0, 1, 2, 3, 4];
  const ref = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStarHover = (score: number) => {
    setStarHover(score);
  }

  const handleStarClick = async (index: number) => {
    try {
      setIsLoading(true);
      setSelectedStar(index);
      console.log(index);
      await axios.post("/api/Review/add-review", {
        productId: selectedProduct,
        comment: comment,
        score: index + 1
      })
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      closeForm();
    }
  }

  useEffect(() => {
    if (orderItems.length > 0) {
      setSelectedProduct(orderItems[0].productId);
      console.log(orderItems[0].productId);
    }
  }, [orderItems]);

  useEffect(() => {
    const overlay = document.querySelector(".review-form-overlay");

    const handleOverlayClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeForm();
      }
    };
    overlay?.addEventListener("click", handleOverlayClick)

    return () => overlay?.removeEventListener("click", handleOverlayClick);
  }, [])

  return (
    <div className="review-form-overlay">
      <div className="review-form-container" ref={ref}>
        <div>
          <h6>Chọn sản phẩm:</h6>
          <select
              value={selectedProduct}
              onChange={e => {
                setSelectedProduct(e.target.value);
                console.log(e.target.value);
              }}
            >
            {
              orderItems.map(item => {
                return <option
                  key={item.productId}  
                  value={item.productId} >
                    {item.productName}
                  </option>
              })
            }
          </select>
          <div>
            <textarea 
              name="comment" 
              rows={10} 
              cols={80} 
              placeholder="Nhập đánh giá sản phẩm..." 
              onChange={(e) => setComment(e.target.value)} />
          </div>
          <div className="score-stars">
          {
            scores.map((score, index) => {
              if (starHover !== null && index <= starHover) {
                return <FontAwesomeIcon 
                          icon={faStar}
                          style={{color: "yellow", cursor: "pointer", fontSize: "30px"}}
                           onMouseEnter={() => handleStarHover(index)}
                           onMouseLeave={() => setStarHover(null)}
                           onClick={() => handleStarClick(index)}/>
              }
              return <FontAwesomeIcon 
                        icon={faStar} 
                        onMouseEnter={() => handleStarHover(index)}
                        style={{ cursor: "pointer", fontSize: "30px", color: "#CFCFCF"}}/>
            })
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewForm;