import { useState, useEffect } from "react"; 
import { Table } from "react-bootstrap"
import axios from "../../../../apis/axios";
import { OrderItem } from "../../../../interfaces/interfaces";
import "./OrderTable.scss"

interface OrderData {
  items: OrderItem[];
  orderId: string;
  total: number;
  status: string;
  orderDate: string;
  user: string,
  phone: string
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("/api/Order/get-all");
        setOrders(response.data.message);
			} catch (error) {
				console.log(error);
			}
		}
		
		fetchProducts();
	}, []);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const value = e.target.value;

    try {
      console.log("status to send:", value);
      await axios.patch(`/api/Order/change-status/${orderId}`, value, {
        headers: {
          "Content-Type": "application/json"
        }
      }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="order-table-container ">
      <Table className="product-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Tên người đặt</th>
            <th>Số  điện thoại người đặt</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>
                <p>{order.items[0].productName}</p>
              </td>
              <td>
                <p>{order.user}</p>
              </td>
              <td>
                <p>{order.phone}</p>
              </td>
              <td>
                <select defaultValue={order.status} onChange={(e) => handleSelectChange(e, order.orderId)}>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="shipped">Đang giao hàng</option>
                  <option value="delivered">Đã giao hàng</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </td>
              <td>
                <button>Delete</button>
                <button>Modify</button>
                <button>Description</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={`order-detail ${selectedOrder === null && "hidden"}`}>

      </div>
    </div>
  )
}

export default OrderTable;