import { useState } from "react";
import Payment from "..";

interface PaymentMethodProps {
	id: number,
	active: number,
	method: string,
	content: string,
	onTitleClick: () => void
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({id, active, method, content, onTitleClick}) => {

	return (
		<div className="accordion-container">
			<div className="accordion-header" onClick={onTitleClick}>
				{method}
			</div>
			{ id === active && <div>{content}</div> }
		</div>	
	);																																																																																																																																																																																																								
}

export default PaymentMethod;