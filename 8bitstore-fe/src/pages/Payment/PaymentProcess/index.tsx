import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../apis/axios";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { useGetCartQuery, useDeleteCartItemMutation, useGetCurrentUserQuery } from "../../../store/api";

const PaymentProcess: React.FC = () => {
	const { paymentMethod } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { data: cart, isLoading: isCartLoading } = useGetCartQuery();
	const [deleteCartItem] = useDeleteCartItemMutation();
	const { data: user, isLoading: isUserLoading} = useGetCurrentUserQuery();
	const orderIdRef = useRef(crypto.randomUUID());
	const [totalAmount, setTotalAmount] = useState<number>(0);
	const hasProcessed = useRef(false);

	useEffect(() => {
		if (!isUserLoading && !user) {
			navigate("/login");
		}
	}, [user, isUserLoading, navigate]);

	useEffect(() => {
		if (isCartLoading) return;
		if (Array.isArray(cart) && cart.length > 0) {
			const calculatedTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
			setTotalAmount(calculatedTotal);
		}
	}, [cart, isCartLoading]);

	useEffect(() => {
		if (isCartLoading) return;
		if (!totalAmount) return;
		if (hasProcessed.current) return;

		hasProcessed.current = true;

		let timer: NodeJS.Timeout;
		
		const doPayment = async () => {
			if (paymentMethod === "VNPAY") {
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
					orderId: orderIdRef.current
				}
				
				const response = await axios.post("/api/Payment/save-payment-info", request);
				
				if (response.data.status === "SUCCESS") {
					try {
						await axios.post("/api/Order/add", {
							status: "pending",
							total: totalAmount,
							orderId: orderIdRef.current,
							items: (cart ?? []).map((item) => ({
								productId: item.productId,
								quantity: item.quantity,
								price: item.price,
								orderId: orderIdRef.current
							}))
						});

						localStorage.setItem("paymentResult", JSON.stringify({
							status: "success",
							responseCode: response.data.message
						}));

						await deleteCartItem({ productId: "" });

						localStorage.removeItem("paymentResult");
					} catch (error) {
						localStorage.setItem("paymentResult", JSON.stringify({
							status: "failed",
							responseCode: error
						}));
					} finally {
						window.close();
					}
				
				} else {
					localStorage.setItem("paymentResult", JSON.stringify({
						status: "failed",
						responseCode: response.data.message
					}));
					
					timer = setTimeout(() => {
						localStorage.removeItem("paymentResult");
						window.close();
					}, 3000);
				}
			} else if (paymentMethod === "COD") {
				const createCODOrder = async () => {
					try {
						await axios.post("/api/Order/add", {
							status: "pending",
							total: totalAmount,
							orderId: orderIdRef.current,
							items: (cart?? []).map((item) => ({
								productId: item.productId,
								quantity: item.quantity,
								price: item.price,
								orderId: orderIdRef.current
							}))
						});

						await deleteCartItem({ productId: "" });
					} catch (error) {
						console.error("Error during order creation:", error);
						navigate("/payment-result/failed");
					}
				}
				createCODOrder();

				timer = setTimeout(() => {
					navigate("/payment-result/success");
				}, 3000);
			}
		};

		doPayment();
	}, [isCartLoading, totalAmount, paymentMethod, location, navigate, cart, deleteCartItem]);

	if (isUserLoading || isCartLoading) {
		return <LoadingOverlay />;
	}

	return (
		<div style={{height: "100vh"}}>
			<LoadingOverlay />
		</div>
	);
};

export default PaymentProcess;