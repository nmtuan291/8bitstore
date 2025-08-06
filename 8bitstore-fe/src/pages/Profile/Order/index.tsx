import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, 
  faShoppingBag, 
  faSpinner,
  faBox,
  faTruck,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Order.scss";
import OrderItem from "./OrderItem";
import { useGetOrdersQuery } from "../../../store/api";
import Loader from "../../../components/LoadingOverlay/Loader";



interface OrderFilter {
  id: number;
  label: string;
  status: string[];
  icon: any;
  color: string;
}

const Order: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  const orderFilters: OrderFilter[] = [
    {
      id: 0,
      label: "Tất cả",
      status: [],
      icon: faShoppingBag,
      color: "#667eea"
    },
    {
      id: 1,
      label: "Đang xử lý",
      status: ["pending"],
      icon: faSpinner,
      color: "#ffc107"
    },
    {
      id: 2,
      label: "Đang giao",
      status: ["shipped"],
      icon: faTruck,
      color: "#17a2b8"
    },
    {
      id: 3,
      label: "Hoàn thành",
      status: ["delivered"],
      icon: faCheckCircle,
      color: "#28a745"
    },
    {
      id: 4,
      label: "Đã hủy",
      status: ["cancelled"],
      icon: faTimesCircle,
      color: "#dc3545"
    }
  ];

  const filteredOrders = useMemo(() => {
    if (!orders?.message) return [];

    let filtered = orders.message;

    // Filter by status
    if (selectedFilter > 0) {
      const filter = orderFilters.find(f => f.id === selectedFilter);
      if (filter) {
        filtered = filtered.filter(order => 
          filter.status.includes(order.status.toLowerCase())
        );
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(query) ||
        order.items.some(item => 
          item.productName.toLowerCase().includes(query)
        )
      );
    }

    return filtered;
  }, [orders?.message, selectedFilter, searchQuery, orderFilters]);

  const getOrderCounts = () => {
    if (!orders?.message) return {};
    
    const counts: { [key: number]: number } = { 0: orders.message.length };
    
    orderFilters.slice(1).forEach(filter => {
      counts[filter.id] = orders.message.filter(order =>
        filter.status.includes(order.status.toLowerCase())
      ).length;
    });

    return counts;
  };

  const orderCounts = getOrderCounts();

  if (isLoading) {
    return (
      <div className="order-loading">
        <Loader />
        <p>Đang tải danh sách đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-error">
        <div className="error-content">
          <FontAwesomeIcon icon={faTimesCircle} className="error-icon" />
          <h3>Không thể tải đơn hàng</h3>
          <p>Có lỗi xảy ra khi tải danh sách đơn hàng. Vui lòng thử lại sau.</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      {/* Header */}
      <div className="order-header">
        <div className="header-content">
          <div className="header-info">
            <h2>Đơn hàng của tôi</h2>
            <p>Theo dõi và quản lý tất cả đơn hàng của bạn</p>
          </div>
          
          {/* Search */}
          <div className="search-section">
            <div className="search-box">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Tìm theo mã đơn hàng hoặc tên sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="order-filters">
        <div className="filters-container">
          {orderFilters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
              onClick={() => setSelectedFilter(filter.id)}
              style={{ 
                '--filter-color': filter.color,
                backgroundColor: selectedFilter === filter.id ? filter.color : 'transparent',
                color: selectedFilter === filter.id ? 'white' : filter.color,
                borderColor: filter.color
              } as React.CSSProperties}
            >
              <FontAwesomeIcon icon={filter.icon} className="filter-icon" />
              <span className="filter-label">{filter.label}</span>
              {orderCounts[filter.id] !== undefined && (
                <span className="filter-count">{orderCounts[filter.id]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="orders-container">
        {filteredOrders.length > 0 ? (
          <div className="orders-list">
            {filteredOrders.map((order, index) => (
              <div key={order.orderId || index} className="order-item-wrapper">
                <OrderItem 
                  items={order.items} 
                  orderId={order.orderId} 
                  total={order.total}
                  status={order.status}
                  createdAt={order.orderDate}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-orders">
            <div className="empty-content">
              <FontAwesomeIcon icon={faBox} className="empty-icon" />
              <h3>
                {searchQuery.trim() 
                  ? "Không tìm thấy đơn hàng" 
                  : selectedFilter === 0 
                    ? "Chưa có đơn hàng nào" 
                    : `Không có đơn hàng ${orderFilters[selectedFilter]?.label.toLowerCase()}`
                }
              </h3>
              <p>
                {searchQuery.trim() 
                  ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc."
                  : selectedFilter === 0 
                    ? "Hãy mua sắm và đặt hàng để theo dõi đơn hàng tại đây."
                    : "Thử chọn bộ lọc khác để xem đơn hàng."
                }
              </p>
              {selectedFilter !== 0 && (
                <button 
                  className="clear-filter-btn"
                  onClick={() => setSelectedFilter(0)}
                >
                  Xem tất cả đơn hàng
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {orders?.message && orders.message.length > 0 && (
        <div className="order-summary">
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Tổng đơn hàng:</span>
              <span className="summary-value">{orders.message.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Hiển thị:</span>
              <span className="summary-value">{filteredOrders.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;