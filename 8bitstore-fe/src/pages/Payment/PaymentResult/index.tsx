import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./PaymentResult.scss";

const PaymentResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has('reloaded')) {
      window.location.href = `${location.pathname}?reloaded=true`;
    }
  }, [location]);

	return (
		<div className="result-container">
      <div className="result">
        <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
        <p>Thanh toán thành công</p>
        <div>
          <button onClick={() => navigate("/")}>Quay vể trang chủ</button>
          <button onClick={() => navigate("/profile/order")}>Xem đơn hàng</button>
        </div>
      </div>
		</div>
	)
}

export default PaymentResult;