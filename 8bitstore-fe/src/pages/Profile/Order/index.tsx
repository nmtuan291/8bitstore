import "./Order.scss"
import OrderItem from "./OrderItem";

const Order: React.FC = () => {

    return (
        <div className="order-container">
            <div className="order-list">
                <OrderItem imgSrc="" productName="asdasaasdasdasdasdasdasdasdsadadsd" productPrice={2313} productQuantity={1312312}></OrderItem>
            </div>
        </div>
    )
}

export default Order;