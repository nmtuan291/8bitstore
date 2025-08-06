import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./PaymentResult.scss";

const PaymentResult: React.FC = () => {
  const navigate = useNavigate();

	return (
		<div className="result-container">
      <div className="result">
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

export default PaymentResult;