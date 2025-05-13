import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../apis/axios";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { useCart } from "../../../contexts/CartProvider";

const PaymentProcess: React.FC = () => {
	const { paymentMethod } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { cart, deleteCartItems } = useCart();
	const totalAmount: number = cart.reduce((acc, item) =>  acc + item.price * item.quantity, 0);
	const orderId = crypto.randomUUID();

	if (paymentMethod === "VNPAY") {
		useEffect(() => {
			const params = new URLSearchParams(location.search);
			const request = {
				amount: params.get("vnp_Amount"),
				transactionNo: params.get("vnp_TransactionNo"),
				bankCode: params.get("vnp_BankCode"),
				bankTranNo: params.get("vnp_BankTranNo"),
				cardType: params.get("vnp_CardType"),
				payDate: params.get("vnp_PayDate"),
				responseCode: params.get("vnp_ResponseCode"),
				secureHash: params.get("vnp_SecureHash"),
				transactionStatus: params.get("vnp_TransactionStatus"),
				txnRef: params.get("vnp_TxnRef"),
				tmnCode: params.get("vnp_TmnCode"),
				orderInfo: params.get("vnp_OrderInfo"),
				orderId: orderId
			}
	
			let timer: NodeJS.Timeout;
			
			const processPayment = async () => {
				try {
					const response = await axios.post("/api/Payment/save-payment-info", request);
					
					if (response.data.status === "SUCCESS") {
						localStorage.setItem("paymentResult", JSON.stringify({
							status: "success",
							responseCode: response.data.message
						}));
	
						try {
							await axios.post("/api/Order/create-order", {
								status: "pending",
								total: totalAmount,
								orderId: orderId,
								items: cart.map((item) => ({
									productId: item.productId,
									quantity: item.quantity,
									price: item.price,
									orderId: orderId
								}))
							});
	
							await deleteCartItems();
							timer = setTimeout(() => {
								localStorage.removeItem("paymentResult");
								window.close();
							}, 3000);
	
						} catch (error) {
							console.error("Error during order creation:", error);
						}
					
					} else {
						localStorage.setItem("paymentResult", JSON.stringify({
							status: "failed",
							responseCode: response.data.message
						}));
						
						timer = setTimeout(() => {
							localStorage.removeItem("paymentResult");
						}, 3000);
					}
				} catch (error) {
					console.error("Error during payment process:", error);
				}
			};
	
			processPayment();
			return () => {
				if (timer) {
					clearTimeout(timer);
				}
			};
		}, [location]);
	}
	else if (paymentMethod === "COD") {
		useEffect(() => {
			const createCODOrder = async () => {
			try {
				await axios.post("/api/Order/create-order", {
					status: "pending",
					total: totalAmount,
					orderId: orderId,
					items: cart.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
						price: item.price,
						orderId: orderId
					}))
				});

				await deleteCartItems();
				} catch (error) {
					console.error("Error during order creation:", error);
				}
			}
			createCODOrder();

			const timer = setTimeout(() => {
				navigate("/payment-result");
			}, 3000);

			return () => {
				if (timer) {
					clearTimeout(timer);
				}
			};
		}, []);
	}
	return (
		<div style={{height: "100vh"}}>
			<LoadingOverlay />
		</div>
	);
};

export default PaymentProcess;