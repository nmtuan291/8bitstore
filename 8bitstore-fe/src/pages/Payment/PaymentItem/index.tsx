import "./PaymentItem.scss";

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
                <div>
                    <p>{productName}</p>
                    <p>x{productCount}</p>
                </div>
                <p className="price">{price * productCount}</p>
            </div>
        </div>
	)
}

export default PaymentItem;