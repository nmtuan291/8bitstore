import PaymentItem from "./PaymentItem";
import "./Payment.scss";
import PaymentMethod from "./PaymentMethod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery, useGetCurrentUserQuery, useCreatePaymentUrlMutation } from "../../store/api";
import { } from "../../store/api";
import axios from "../../apis/axios";
import LoadingOverlay from "../../components/LoadingOverlay";
import { formatNumber } from "../../utils/FormatNumber";	

interface PaymentMethod {
	method: string;
	content: string;
}

const Payment: React.FC = () => {
	const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
	const [paymentMethod, setPaymentMethod] = useState<string>("");
	const [paymentClicked, setPaymentClicked] = useState<boolean>(false);
	const navigate = useNavigate();

	const { data: cart } = useGetCartQuery();
	const { data: user } = useGetCurrentUserQuery();
	const [createPaymentUrl, { isLoading }] = useCreatePaymentUrlMutation();


	const totalAmount: number = cart?.reduce((acc, item) =>  acc + item.price * item.quantity, 0) || 0;

	
	useEffect(() => {
		setPaymentMethods([
			{
				method: "Thanh toán khi giao hàng(COD)",
				content: "8bitstore hỗ trợ ship hàng COD (giao máy thu tiền tận nơi)"
			},
			{
				method: "Thanh toán qua VNPay",
				content: "8bitstore hỗ trợ ship hàng COD (giao máy thu tiền tận nơi)"
			}
		]);
	}, []);

	const handlelPaymentClick = async () => {
		setPaymentClicked(true);
		if (paymentMethod === "VNPAY") {
			try {
			const response = await createPaymentUrl({ amount: totalAmount.toString() }).unwrap();
			window.open(response.result, "_blank");
			} catch (error) {
				console.log(error);
			}
		}
		else if (paymentMethod === "COD") {
			navigate("/payment-process/COD");
		}
	}

	useEffect(() => {
		if (!cart || cart.length === 0) {
			navigate("/");
		}
		
		const handlePaymentResult = () => {
			const storedResult = localStorage.getItem("paymentResult");
			if (storedResult) {
				const paymentResult = JSON.parse(storedResult);
				if (paymentResult.responseCode === "00") {
					navigate("/payment-result");
					console.log(paymentResult.responseCode);
				}
			}
		}
		let interval: NodeJS.Timeout;
		if (paymentClicked && paymentMethod === "VNPAY") {
			handlePaymentResult();
			interval = setInterval(handlePaymentResult, 1000);
		}
		return () => clearInterval(interval);
	}, [paymentClicked, paymentMethod, cart]);

	return (
		<>
			{isLoading && <LoadingOverlay />}
			<div className="payment-page-container">
				<div className="payment-container">
					<div className="cart-section">
						{/* <div className="header">
							Đơn hàng
						</div> */}
						<div className="product-list">
							{
								cart?.map(item => 
								<PaymentItem 
									productCount={item.quantity} 
									productName={item.productName} 
									productImg={item.imgUrl[0]} 
									price={item.price}/>)
							}
						</div>
						<div className="payment-info-section">
							<div className="payment-info">
								<p>Tạm tính</p>
								<p>{formatNumber(totalAmount)}</p>
							</div>
							<div className="payment-info">
								<p>Phí vận chuyển</p>
								<p>{formatNumber(30000)}</p>
							</div>
							<div className="payment-info">
								<p>Tổng cộng</p>
								<p>{formatNumber(totalAmount + 30000)}</p>
							</div>
						</div>
					</div>
					
					<div className="info-section">
						<div className="header">
							Thông tin giao hàng
						</div>
						<div>
							<p>{user?.fullName}</p>
							<p>{user?.address}</p>
							<p>{user?.email}</p>
							<p>{user?.phoneNumber}</p>
						</div>
						<div className="method-section">
							<div className="header">
								Thanh toán
							</div>
							<div>
								<div className="method-item">
									<input 
										type="radio" 
										id="cod" 
										name="payment"
										onChange={() => setPaymentMethod("COD")}/>
									<label htmlFor="cod">Thanh toán khi giao hàng(COD)</label>
								</div>
								<div className="method-item">
									<input 
										type="radio" 
										id="vnpay" 
										name="payment"
										onChange={() => setPaymentMethod("VNPAY")}/>
									<label htmlFor="vnpay">Thanh toán thông qua VNPay</label>
								</div>
							</div>
						</div>
						<div className="payment-btn">
								<button onClick={handlelPaymentClick}>Thanh toán</button>
						</div>
					</div>
				</div>
			</div>	
		</>
	)
}

export default Payment;