import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import axios from "../../../apis/axios";

const PaymentResult: React.FC = () => {
	const location = useLocation();
	const { user } = useAuth();
	const [paymentStatus, setPaymentStatus] = useState<boolean>(false);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const request = {
			transactionNo: params.get("vnp_TransactionNo"),
			bankCode: params.get("vnp_BankCode"),
			bankTranNo: params.get("vnp_BankTranNo"),
			cardType: params.get("vnp_CardType"),
			payDate: params.get("vnp_PayDate"),
			responseCode: params.get("vnp_ResponseCode"),
			secureHash: params.get("vnp_SecureHash"),
			transactionStatus: params.get("vnp_TransactionStatus")
		}
		try {
			(async () => {
				const response = await axios.post("/api/Payment/save-payment-info", request)
				console.log(request)
				if (request.responseCode === "00") {
					setPaymentStatus(true);
				}
			})();
		} catch (error) {
			console.log(error)			
		}
	}, [location]);

	return (
		<div>
			{
				paymentStatus && "asdasdasdasd"
			}
		</div>
	)
}

export default PaymentResult;