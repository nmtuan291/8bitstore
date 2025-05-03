import "./Order.scss"
import OrderItem from "./OrderItem";

const Order: React.FC = () => {
    const items = [
        {
            productId: "asdasd",
            imgSrc: "",
            productName: "asdasd",
            productPrice: 232323,
            productQuantity: 234134234
        },
        {
            productId: "asdasd",
            imgSrc: "",
            productName: "asdasd",
            productPrice: 232323,
            productQuantity: 234134234
        }
    ]

    return (
        <div className="order-container">
            <div className="order-list">
                <OrderItem items={items} ></OrderItem>
            </div>
        </div>
    )
}

export default Order;