import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
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

  const handleSubmit = async () => {
    if (!selectedProduct || selectedStar === -1) return;
    try {
      setIsLoading(true);
      await axios.post("/api/Review/add", {
        productId: selectedProduct,
        comment: comment,
        score: selectedStar + 1
      })
      setIsLoading(false);
      closeForm();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      closeForm();
    }
  }

  useEffect(() => {
    if (orderItems.length > 0) {
      setSelectedProduct(orderItems[0].productId);
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
        <button className="close-btn" onClick={closeForm} aria-label="Đóng">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h6>Chọn sản phẩm:</h6>
        <select
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
          >
          {
            orderItems.map(item => (
              <option
                key={item.productId}  
                value={item.productId} >
                  {item.productName}
                </option>
            ))
          }
        </select>
        <textarea 
          name="comment" 
          rows={6} 
          placeholder="Nhập đánh giá sản phẩm..." 
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="score-stars">
        {
          scores.map((score, index) => (
            <FontAwesomeIcon 
              key={index}
              icon={faStar}
              style={{
                color: (starHover !== null ? index <= starHover : index <= selectedStar) ? "#FFD600" : "#CFCFCF",
                cursor: "pointer",
                fontSize: "30px"
              }}
              onMouseEnter={() => handleStarHover(index)}
              onMouseLeave={() => setStarHover(null)}
              onClick={() => setSelectedStar(index)}
            />
          ))
        }
        </div>
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={isLoading || !selectedProduct || selectedStar === -1}
        >
          {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>
    </div>
  )
}

export default ReviewForm;