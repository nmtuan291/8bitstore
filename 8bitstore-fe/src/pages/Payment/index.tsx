import PaymentItem from "./PaymentItem";
import "./Payment.scss";
import PaymentMethod from "./PaymentMethod";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useCart } from "../../contexts/CartProvider";

const paymentMethods = [
	{
		method: "Thanh toán khi giao hàng(COD)",
		content: "8bitstore hỗ trợ ship hàng COD (giao máy thu tiền tận nơi)"
	},
	{
		method: "Thanh toán qua VNPay",
		content: "8bitstore hỗ trợ ship hàng COD (giao máy thu tiền tận nơi)"
	}
]

const Payment: React.FC = () => {
	const [activeAccorion, setActiveAccorion] = useState<number>(-1);
	const { cart } = useCart();
	const { user } = useAuth();

	const handleAccordionClick = (id: number) => {
		setActiveAccorion(prev => 
			prev === id ? -1 : id
		);
	}
	
	return (
		<div className="payment-container">
			<div className="cart-section">
				<div className="header">
					Đơn hàng
				</div>
				<div className="product-list">
					{
						cart.map(item => 
						<PaymentItem 
						 	productCount={item.quantity} 
							productName={item.productName} 
							productImg="" 
							price={item.price}/>)
					}
				</div>
				<div className="payment-info">
					<p>Tạm tính</p>
					<p>121124512</p>
				</div>
				<div className="payment-info">
					<p>Phí vận chuyển</p>
					<p>121124512</p>
				</div>
				<div className="payment-info">
					<p>Tổng cộng</p>
					<p>{ cart.reduce((acc, item) =>  acc + item.price * item.quantity, 0) }</p>
				</div>
			</div>
			<div className="method-section">
				<div className="header">
					Thanh toán
				</div>
				<div>
					{ paymentMethods.map((method, index) => 
					<PaymentMethod 
						id={index} 
						active={activeAccorion} 
						method={method.method} 
						content={method.content}
						onTitleClick={() => handleAccordionClick(index)}/>)}
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
			</div>
		</div>
	)
}

export default Payment;