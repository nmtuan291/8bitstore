import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./PaymentResult.scss";

const PaymentResult: React.FC = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  localStorage.removeItem("paymentResult");
  
  if (status === "success") {
    return (
      <div className="result-container">
        <div className="result success">
          <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
          <p>Thanh toán thành công</p>
          <div>
            <button onClick={() => {
              navigate("/")
              location.reload();
            }}>
              Quay vể trang chủ
            </button>
            <button onClick={() => {
                navigate("/profile/order")
                location.reload();
            }}>
              Xem đơn hàng
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="result-container">
        <div className="result failed">
          <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
          <p>Thanh toán thất bại</p>
          <p className="error-message">Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
          <div>
            <button onClick={() => {
              navigate("/")
              location.reload();
            }}>
              Quay vể trang chủ
            </button>
            <button onClick={() => {
                navigate("/cart")
                location.reload();
            }}>
              Quay lại giỏ hàng
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="result-container">
      <div className="result">
        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
        <p>Trạng thái không hợp lệ</p>
        <div>
          <button onClick={() => {
            navigate("/")
            location.reload();
          }}>
            Quay vể trang chủ
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentResult;