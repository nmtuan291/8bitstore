import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./ReviewForm.scss";
import { OrderItem } from "../../../../interfaces/interfaces";
import { useAddReviewMutation } from "../../../../store/api";

interface ReviewFormProps {
  closeForm: () => void;
  orderItems: OrderItem[];
}

const ReviewForm: React.FC<ReviewFormProps> = ({ closeForm, orderItems }) => {
  const [starHover, setStarHover] = useState<number | null>(null);
  const [selectedStar, setSelectedStar] = useState<number>(-1);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  
  const ref = useRef<HTMLDivElement>(null);
  const [addReview, { isLoading }] = useAddReviewMutation();

  // Create portal container
  useEffect(() => {
    let container = document.getElementById('modal-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-root';
      document.body.appendChild(container);
    }
    setPortalContainer(container);

    return () => {
      if (container && container.children.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, []);

  const handleStarHover = (score: number) => {
    setStarHover(score);
  };

  const handleStarClick = (score: number) => {
    setSelectedStar(score);
    setErrors(prev => ({ ...prev, stars: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedProduct) {
      newErrors.product = "Vui lòng chọn sản phẩm";
    }

    if (selectedStar === -1) {
      newErrors.stars = "Vui lòng đánh giá sao";
    }

    if (!comment.trim()) {
      newErrors.comment = "Vui lòng nhập đánh giá";
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Đánh giá phải có ít nhất 10 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await addReview({
        productId: selectedProduct,
        comment: comment.trim(),
        score: selectedStar + 1
      }).unwrap();

      setIsSuccess(true);
      setTimeout(() => {
        closeForm();
      }, 1500);
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrors({ submit: "Có lỗi xảy ra, vui lòng thử lại" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeForm();
    }
  };

  useEffect(() => {
    if (orderItems.length > 0) {
      setSelectedProduct(orderItems[0].productId);
    }
  }, [orderItems]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (isSuccess) {
    return portalContainer ? createPortal(
      <div className="review-form-overlay">
        <div className="review-form-container success" ref={ref}>
          <div className="success-content">
            <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
            <h3>Đánh giá đã được gửi thành công!</h3>
            <p>Cảm ơn bạn đã chia sẻ trải nghiệm của mình.</p>
          </div>
        </div>
      </div>,
      portalContainer
    ) : null;
  }

  if (!portalContainer) return null;

  return createPortal(
    <div className="review-form-overlay" onKeyDown={handleKeyDown} onClick={closeForm}>
      <div className="review-form-container" ref={ref} onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>Đánh giá sản phẩm</h2>
          <button className="close-btn" onClick={closeForm} aria-label="Đóng">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="form-content">
          {/* Debug info */}
          {orderItems.length === 0 && (
            <div style={{ color: 'red', marginBottom: '16px' }}>
              No order items found: {JSON.stringify(orderItems)}
            </div>
          )}

          {/* Product Selection */}
          <div className="form-group">
            <label htmlFor="product-select">Chọn sản phẩm</label>
            <select
              id="product-select"
              value={selectedProduct}
              onChange={(e) => {
                setSelectedProduct(e.target.value);
                setErrors(prev => ({ ...prev, product: "" }));
              }}
              className={errors.product ? "error" : ""}
            >
              <option value="">-- Chọn sản phẩm --</option>
              {orderItems.map(item => (
                <option key={item.productId} value={item.productId}>
                  {item.productName}
                </option>
              ))}
            </select>
            {errors.product && <span className="error-message">{errors.product}</span>}
          </div>

          {/* Star Rating */}
          <div className="form-group">
            <label>Đánh giá sao</label>
            <div className="score-stars">
              {[0, 1, 2, 3, 4].map((score, index) => (
                <FontAwesomeIcon 
                  key={index}
                  icon={faStar}
                  className={`star ${(starHover !== null ? index <= starHover : index <= selectedStar) ? "active" : ""}`}
                  onMouseEnter={() => handleStarHover(index)}
                  onMouseLeave={() => setStarHover(null)}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
            {errors.stars && <span className="error-message">{errors.stars}</span>}
            {selectedStar !== -1 && (
              <span className="rating-text">
                {selectedStar === 0 && "Rất không hài lòng"}
                {selectedStar === 1 && "Không hài lòng"}
                {selectedStar === 2 && "Bình thường"}
                {selectedStar === 3 && "Hài lòng"}
                {selectedStar === 4 && "Rất hài lòng"}
              </span>
            )}
          </div>

          {/* Comment */}
          <div className="form-group">
            <label htmlFor="comment">Đánh giá chi tiết</label>
            <textarea 
              id="comment"
              name="comment" 
              rows={4} 
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..." 
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                setErrors(prev => ({ ...prev, comment: "" }));
              }}
              className={errors.comment ? "error" : ""}
              maxLength={500}
            />
            <div className="textarea-footer">
              <span className="char-count">{comment.length}/500</span>
              {errors.comment && <span className="error-message">{errors.comment}</span>}
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="error-banner">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Đang gửi...
              </>
            ) : (
              "Gửi đánh giá"
            )}
          </button>
        </div>
      </div>
    </div>,
    portalContainer
  );
};

export default ReviewForm;