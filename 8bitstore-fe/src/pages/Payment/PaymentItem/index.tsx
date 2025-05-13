import "./PaymentItem.scss";
import { formatNumber } from "../../../utils/FormatNumber";

interface PaymentItemProps {
	productName: string,
	productImg: string,
	productCount: number,
    price: number
}

const PaymentItem: React.FC<PaymentItemProps> = ({ productName, productImg, productCount, price }) => {

	return (
		<div className="payment-item-container">
            <div className="product-image-section">
                <img className="product-order-img" src={productImg}></img>
                <div className="product-info">
                    <p>{productName}</p>
                    <p>Số lượng: {productCount}</p>
                </div>
                <p className="price">{formatNumber(price * productCount)}</p>
            </div>
        </div>
	)
}

export default PaymentItem;