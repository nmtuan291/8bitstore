import { useState, useEffect } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, 
  faEye, 
  faEdit, 
  faTrash, 
  faFilter,
  faDownload,
  faRefresh,
  faClock,
  faCheckCircle,
  faTruck,
  faTimesCircle,
  faBoxOpen
} from "@fortawesome/free-solid-svg-icons";
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
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/Order/get-all");
      setOrders(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const newStatus = e.target.value;
    
    try {
      await axios.patch(`/api/Order/change-status/${orderId}`, newStatus, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return faClock;
      case "confirmed": return faCheckCircle;
      case "shipped": return faTruck;
      case "delivered": return faBoxOpen;
      case "cancelled": return faTimesCircle;
      default: return faClock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "warning";
      case "confirmed": return "info";
      case "shipped": return "primary";
      case "delivered": return "success";
      case "cancelled": return "danger";
      default: return "secondary";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  if (isLoading) {
    return (
      <div className="order-table-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải danh sách đơn hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-table-container">
      {/* Header Section */}
      <div className="table-header">
        <div className="header-title">
          <h2>📦 Quản Lý Đơn Hàng</h2>
          <p>Tổng cộng: <span className="count">{filteredOrders.length}</span> đơn hàng</p>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-outline" onClick={fetchOrders}>
            <FontAwesomeIcon icon={faRefresh} />
            Làm mới
          </button>
          <button className="btn btn-outline">
            <FontAwesomeIcon icon={faDownload} />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn, tên khách hàng, số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="shipped">Đang giao hàng</option>
            <option value="delivered">Đã giao hàng</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th>Khách Hàng</th>
              <th>Sản Phẩm</th>
              <th>Ngày Đặt</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="no-data">
                  <div className="empty-state">
                    <FontAwesomeIcon icon={faBoxOpen} className="empty-icon" />
                    <p>Không tìm thấy đơn hàng nào</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentOrders.map(order => (
                <tr key={order.orderId} className="table-row">
                  <td>
                    <div className="order-id">
                      <span className="id-text">#{order.orderId.slice(-8)}</span>
                      <span className="id-full">{order.orderId}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{order.user}</div>
                      <div className="customer-phone">📞 {order.phone}</div>
                    </div>
                  </td>
                  <td>
                    <div className="product-info">
                      <span className="product-name">{order.items[0]?.productName}</span>
                      {order.items.length > 1 && (
                        <span className="item-count">+{order.items.length - 1} sản phẩm khác</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="date-info">
                      {formatDate(order.orderDate)}
                    </div>
                  </td>
                  <td>
                    <div className="price-info">
                      {formatCurrency(order.total)}
                    </div>
                  </td>
                  <td>
                    <div className="status-section">
                      <div className={`status-badge status-${getStatusColor(order.status)}`}>
                        <FontAwesomeIcon icon={getStatusIcon(order.status)} />
                        <span>
                          {order.status === "pending" && "Chờ xác nhận"}
                          {order.status === "confirmed" && "Đã xác nhận"}
                          {order.status === "shipped" && "Đang giao"}
                          {order.status === "delivered" && "Đã giao"}
                          {order.status === "cancelled" && "Đã hủy"}
                        </span>
                      </div>
                      <select 
                        value={order.status} 
                        onChange={(e) => handleStatusChange(e, order.orderId)}
                        className="status-select"
                      >
                        <option value="pending">Chờ xác nhận</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="shipped">Đang giao hàng</option>
                        <option value="delivered">Đã giao hàng</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-icon btn-primary"
                        onClick={() => setSelectedOrder(order)}
                        title="Xem chi tiết"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button 
                        className="btn btn-icon btn-secondary"
                        title="Chỉnh sửa"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button 
                        className="btn btn-icon btn-danger"
                        title="Xóa"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="btn btn-outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            className="btn btn-outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Sau
          </button>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="order-detail-modal" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết đơn hàng #{selectedOrder.orderId.slice(-8)}</h3>
              <button onClick={() => setSelectedOrder(null)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="order-summary">
                <p><strong>Khách hàng:</strong> {selectedOrder.user}</p>
                <p><strong>Số điện thoại:</strong> {selectedOrder.phone}</p>
                <p><strong>Ngày đặt:</strong> {formatDate(selectedOrder.orderDate)}</p>
                <p><strong>Tổng tiền:</strong> {formatCurrency(selectedOrder.total)}</p>
              </div>
              <div className="order-items">
                <h4>Danh sách sản phẩm:</h4>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="item-detail">
                    <span>{item.productName}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderTable;