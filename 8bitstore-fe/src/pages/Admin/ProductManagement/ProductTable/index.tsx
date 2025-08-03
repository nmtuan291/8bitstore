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
  faPlus,
  faImage,
  faBoxOpen,
  faTags,
  faIndustry,
  faGamepad,
  faPalette,
  faRulerCombined,
  faHdd,
  faWeight
} from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../../../interfaces/interfaces";
import AddProductForm from "../AddProductForm";
import "./ProductTable.scss";
import { useGetAllProductsQuery } from "../../../../store/api";

const ProductTable: React.FC = () => {
  const { data: products, error, isLoading, refetch } = useGetAllProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [manufacturerFilter, setManufacturerFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    if (products) {
      filterProducts();
    }
  }, [products, searchTerm, typeFilter, manufacturerFilter, stockFilter]);

  const filterProducts = () => {
    if (!products) return;
    
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(product => product.type === typeFilter);
    }

    // Manufacturer filter
    if (manufacturerFilter !== "all") {
      filtered = filtered.filter(product => product.manufacturer === manufacturerFilter);
    }

    // Stock filter
    if (stockFilter === "in-stock") {
      filtered = filtered.filter(product => product.stockNum > 0);
    } else if (stockFilter === "out-of-stock") {
      filtered = filtered.filter(product => product.stockNum === 0);
    } else if (stockFilter === "low-stock") {
      filtered = filtered.filter(product => product.stockNum > 0 && product.stockNum <= 5);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getUniqueTypes = () => {
    if (!products) return [];
    return [...new Set(products.map(p => p.type))];
  };

  const getUniqueManufacturers = () => {
    if (!products) return [];
    return [...new Set(products.map(p => p.manufacturer))];
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { status: "Hết hàng", class: "out-of-stock" };
    if (stock <= 5) return { status: "Sắp hết", class: "low-stock" };
    return { status: "Còn hàng", class: "in-stock" };
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (isLoading) {
    return (
      <div className="product-table-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải danh sách sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-table-container">
        <div className="error-state">
          <FontAwesomeIcon icon={faBoxOpen} className="error-icon" />
          <h3>Có lỗi xảy ra khi tải dữ liệu</h3>
          <button onClick={() => refetch()} className="btn btn-primary">
            <FontAwesomeIcon icon={faRefresh} />
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-table-container">
      {/* Header Section */}
      <div className="table-header">
        <div className="header-title">
          <h2>🎮 Quản Lý Sản Phẩm</h2>
          <p>Tổng cộng: <span className="count">{filteredProducts.length}</span> sản phẩm</p>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-success" onClick={() => setShowAddProductForm(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Thêm sản phẩm
          </button>
          <button className="btn btn-outline" onClick={() => refetch()}>
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
            placeholder="Tìm kiếm theo tên, mã sản phẩm, nhà sản xuất..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <FontAwesomeIcon icon={faFilter} className="filter-icon" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả loại</option>
            {getUniqueTypes().map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <FontAwesomeIcon icon={faIndustry} className="filter-icon" />
          <select
            value={manufacturerFilter}
            onChange={(e) => setManufacturerFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả hãng</option>
            {getUniqueManufacturers().map(manufacturer => (
              <option key={manufacturer} value={manufacturer}>{manufacturer}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <FontAwesomeIcon icon={faBoxOpen} className="filter-icon" />
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả tồn kho</option>
            <option value="in-stock">Còn hàng</option>
            <option value="low-stock">Sắp hết</option>
            <option value="out-of-stock">Hết hàng</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {currentProducts.length === 0 ? (
          <div className="empty-state">
            <FontAwesomeIcon icon={faBoxOpen} className="empty-icon" />
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Thử thay đổi bộ lọc hoặc thêm sản phẩm mới</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddProductForm(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
              Thêm sản phẩm đầu tiên
            </button>
          </div>
        ) : (
          currentProducts.map(product => {
            const stockStatus = getStockStatus(product.stockNum);
            return (
              <div key={product.productId} className="product-card">
                <div className="product-image">
                  {product.imgUrl && product.imgUrl.length > 0 ? (
                    <img 
                      src={product.imgUrl[0]} 
                      alt={product.productName}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`image-placeholder ${product.imgUrl && product.imgUrl.length > 0 ? 'hidden' : ''}`}>
                    <FontAwesomeIcon icon={faImage} />
                    <span>Không có hình</span>
                  </div>
                  
                  <div className={`stock-badge stock-${stockStatus.class}`}>
                    {stockStatus.status}
                  </div>
                </div>

                <div className="product-info">
                  <div className="product-header">
                    <h3 className="product-name" title={product.productName}>
                      {product.productName}
                    </h3>
                    <div className="product-id">#{product.productId.slice(-6)}</div>
                  </div>

                  <div className="product-details">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faIndustry} />
                      <span>{product.manufacturer}</span>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faTags} />
                      <span>{product.type}</span>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faBoxOpen} />
                      <span>{product.stockNum} sản phẩm</span>
                    </div>
                  </div>

                  <div className="product-price">
                    {formatCurrency(product.price)}
                  </div>

                  <div className="product-actions">
                    <button 
                      className="btn btn-icon btn-primary"
                      onClick={() => setSelectedProduct(product)}
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
                      title="Xóa sản phẩm"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
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

      {/* Add Product Form Modal */}
      {showAddProductForm && (
        <div className="modal-overlay" onClick={() => setShowAddProductForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddProductForm showAddProductForm={() => setShowAddProductForm(false)} />
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-detail-modal" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi tiết sản phẩm</h3>
              <button onClick={() => setSelectedProduct(null)} className="close-btn">×</button>
            </div>
            <div className="modal-body">
              <div className="product-detail-grid">
                <div className="product-images">
                  <div className="main-image">
                    {selectedProduct.imgUrl && selectedProduct.imgUrl.length > 0 ? (
                      <img src={selectedProduct.imgUrl[0]} alt={selectedProduct.productName} />
                    ) : (
                      <div className="image-placeholder">
                        <FontAwesomeIcon icon={faImage} />
                        <span>Không có hình ảnh</span>
                      </div>
                    )}
                  </div>
                  {selectedProduct.imgUrl && selectedProduct.imgUrl.length > 1 && (
                    <div className="image-thumbnails">
                      {selectedProduct.imgUrl.slice(1, 4).map((img, index) => (
                        <img key={index} src={img} alt={`${selectedProduct.productName} ${index + 2}`} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="product-info-detail">
                  <h2>{selectedProduct.productName}</h2>
                  <p className="product-id">Mã sản phẩm: #{selectedProduct.productId}</p>
                  <div className="price-section">
                    <span className="price">{formatCurrency(selectedProduct.price)}</span>
                    <span className={`stock-status stock-${getStockStatus(selectedProduct.stockNum).class}`}>
                      {getStockStatus(selectedProduct.stockNum).status} ({selectedProduct.stockNum})
                    </span>
                  </div>

                  <div className="detail-sections">
                    <div className="detail-section">
                      <h4>Thông tin cơ bản</h4>
                      <div className="detail-grid">
                        <div className="detail-row">
                          <FontAwesomeIcon icon={faIndustry} />
                          <span className="label">Nhà sản xuất:</span>
                          <span className="value">{selectedProduct.manufacturer}</span>
                        </div>
                        <div className="detail-row">
                          <FontAwesomeIcon icon={faTags} />
                          <span className="label">Loại:</span>
                          <span className="value">{selectedProduct.type}</span>
                        </div>
                        <div className="detail-row">
                          <FontAwesomeIcon icon={faPalette} />
                          <span className="label">Màu sắc:</span>
                          <span className="value">{selectedProduct.color}</span>
                        </div>
                        <div className="detail-row">
                          <FontAwesomeIcon icon={faWeight} />
                          <span className="label">Khối lượng:</span>
                          <span className="value">{selectedProduct.weight}kg</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Thông số kỹ thuật</h4>
                      <div className="detail-grid">
                        <div className="detail-row">
                          <FontAwesomeIcon icon={faRulerCombined} />
                          <span className="label">Kích thước:</span>
                          <span className="value">{selectedProduct.dimension}</span>
                        </div>
                        <div className="detail-row">
                          <FontAwesomeIcon icon={faHdd} />
                          <span className="label">Bộ nhớ:</span>
                          <span className="value">{selectedProduct.internalStorage}</span>
                        </div>
                        {selectedProduct.platform && selectedProduct.platform.length > 0 && (
                          <div className="detail-row">
                            <FontAwesomeIcon icon={faGamepad} />
                            <span className="label">Nền tảng:</span>
                            <span className="value">{selectedProduct.platform.join(', ')}</span>
                          </div>
                        )}
                        {selectedProduct.genre && selectedProduct.genre.length > 0 && (
                          <div className="detail-row">
                            <FontAwesomeIcon icon={faTags} />
                            <span className="label">Thể loại:</span>
                            <span className="value">{selectedProduct.genre.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Mô tả sản phẩm</h4>
                      <p className="description">{selectedProduct.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;